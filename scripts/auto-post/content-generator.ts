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
      max_tokens: 16384, // 매우 긴 콘텐츠를 위한 충분한 토큰 수
      temperature: 0.7, // 균형잡힌 창의성
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = this.extractTextContent(message);
    const parsed = this.parseDelimitedResponse(responseText);

    // 단어 수 검증
    const wordCount = this.countWords(parsed.content);
    if (wordCount < this.config.minWordCount) {
      throw new Error(
        `Generated content too short: ${wordCount} words (minimum: ${this.config.minWordCount})`
      );
    }

    return {
      ...parsed,
      category: topic.category,
      tags: topic.tags,
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

CRITICAL LENGTH REQUIREMENT:
⚠️  This article MUST be at least ${this.config.minWordCount} words (excluding code blocks)
⚠️  Target length: ${this.config.targetWordCount} words
⚠️  Write a COMPREHENSIVE, DETAILED article - not a brief overview
⚠️  Each section should have multiple paragraphs with deep technical explanations

REQUIREMENTS:

1. STRUCTURE (Each section should be substantial):
   - Engaging introduction with a hook (200+ words)
   - Clear section headings (use ##, ###)
   - Deep technical explanations with examples (300+ words per major section)
   - Multiple code examples with syntax highlighting (use \`\`\`language)
   - Real-world use cases with detailed scenarios
   - Performance considerations with actual benchmarks
   - Best practices with explanations
   - Thoughtful conclusion with future outlook (150+ words)

2. WRITING STYLE:
   - Technical but accessible
   - Use concrete, detailed examples
   - Include multiple code snippets (at least 5-7 code blocks)
   - Reference actual libraries/tools/versions with specific details
   - Cite benchmarks and performance numbers if discussing performance
   - Add blockquotes for important notes
   - Explain WHY, not just WHAT

3. CODE EXAMPLES:
   - Use realistic, production-quality code
   - Include proper error handling
   - Add detailed comments for complex logic
   - Show both basic and advanced patterns
   - Provide complete, runnable examples when possible

4. MARKDOWN FORMAT:
   - Use proper MDX syntax
   - Code blocks with language specifiers
   - Tables for comparisons
   - Lists for key points
   - Blockquotes for important notes

RESPONSE FORMAT - Use delimiters (easier to parse than JSON):
===TITLE===
Your final polished title here
===EXCERPT===
Compelling 1-2 sentence summary (max 200 chars)
===CONTENT===
Your full markdown content here (MUST be ${this.config.minWordCount}+ words)

CRITICAL REMINDERS:
- Write AT LEAST ${this.config.minWordCount} words (excluding code blocks)
- Be comprehensive and detailed - this is an in-depth technical article
- Include substantial explanations, not just code
- Each section should teach something valuable
- Do not rush to the conclusion - explore the topic thoroughly

Begin writing now.`;
  }

  private countWords(text: string): number {
    // 코드 블록 제외하고 단어 수 계산
    const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, '');
    const words = withoutCodeBlocks.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }

  private parseDelimitedResponse(responseText: string): {
    title: string;
    excerpt: string;
    content: string;
  } {
    // 구분자를 사용하여 파싱
    const titleMatch = responseText.match(/===TITLE===\s*([\s\S]*?)\s*===EXCERPT===/);
    const excerptMatch = responseText.match(/===EXCERPT===\s*([\s\S]*?)\s*===CONTENT===/);
    const contentMatch = responseText.match(/===CONTENT===\s*([\s\S]*?)$/);

    if (!titleMatch || !excerptMatch || !contentMatch) {
      throw new Error(
        'Invalid response format from Claude. Expected ===TITLE===, ===EXCERPT===, ===CONTENT=== delimiters.'
      );
    }

    return {
      title: titleMatch[1].trim(),
      excerpt: excerptMatch[1].trim(),
      content: contentMatch[1].trim(),
    };
  }

  private extractTextContent(message: Anthropic.Message): string {
    const content = message.content[0];
    if (content.type === 'text') {
      let text = content.text.trim();
      // markdown 코드 블록 제거
      if (text.startsWith('```')) {
        text = text.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
      }
      return text;
    }
    throw new Error('Unexpected response format from Claude');
  }
}
