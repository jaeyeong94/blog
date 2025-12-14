import Anthropic from '@anthropic-ai/sdk';
import { AutoPostConfig } from './config';
import { TopicSuggestion } from './topic-generator';

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  wordCount: number;
}

export class ContentGenerator {
  private client: Anthropic;
  private config: AutoPostConfig;

  constructor(config: AutoPostConfig) {
    this.config = config;
    this.client = new Anthropic({
      apiKey: config.anthropicApiKey,
    });
  }

  async generateContent(topic: TopicSuggestion): Promise<GeneratedContent> {
    const prompt = this.buildContentPrompt(topic);

    const message = await this.client.messages.create({
      model: this.config.model,
      max_tokens: 8192, // 긴 콘텐츠를 위한 큰 토큰 수
      temperature: 0.7, // 균형잡힌 창의성
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = this.extractTextContent(message);
    const parsed = JSON.parse(responseText);

    // 단어 수 검증
    const wordCount = this.countWords(parsed.content);
    if (wordCount < this.config.minWordCount) {
      throw new Error(
        `Generated content too short: ${wordCount} words (minimum: ${this.config.minWordCount})`
      );
    }

    return {
      ...parsed,
      wordCount,
    };
  }

  private buildContentPrompt(topic: TopicSuggestion): string {
    return `You are an expert technical writer specializing in ${topic.category}.

Write a comprehensive, in-depth blog post with these specifications:

TOPIC: ${topic.title}
CATEGORY: ${topic.category}
OUTLINE:
${topic.outline.map((item, i) => `${i + 1}. ${item}`).join('\n')}

REQUIREMENTS:

1. LENGTH: Minimum ${this.config.minWordCount} words, target ${this.config.targetWordCount} words

2. STRUCTURE:
   - Engaging introduction with a hook
   - Clear section headings (use ##, ###)
   - Deep technical explanations
   - Code examples with syntax highlighting (use \`\`\`language)
   - Real-world use cases
   - Performance considerations
   - Best practices
   - Thoughtful conclusion

3. WRITING STYLE:
   - Technical but accessible
   - Use concrete examples
   - Include code snippets where relevant
   - Reference actual libraries/tools/versions
   - Cite benchmarks if discussing performance
   - Add occasional blockquotes for emphasis

4. CODE EXAMPLES:
   - Use realistic, production-quality code
   - Include proper error handling
   - Add comments for complex logic
   - Show both basic and advanced patterns

5. MARKDOWN FORMAT:
   - Use proper MDX syntax
   - Code blocks with language specifiers
   - Tables for comparisons
   - Lists for key points
   - Blockquotes for important notes

Return JSON with this structure:
{
  "title": "Final polished title",
  "excerpt": "Compelling 1-2 sentence summary (max 200 chars)",
  "content": "Full markdown content (2000+ words)",
  "category": "${topic.category}",
  "tags": ${JSON.stringify(topic.tags)}
}

CRITICAL:
- Return ONLY valid JSON
- Escape all quotes in content properly
- Use \\n for newlines in the JSON string
- Ensure content is complete and valuable

Begin writing now.`;
  }

  private countWords(text: string): number {
    // 코드 블록 제외하고 단어 수 계산
    const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, '');
    const words = withoutCodeBlocks.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  private extractTextContent(message: Anthropic.Message): string {
    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    throw new Error('Unexpected response format from Claude');
  }
}
