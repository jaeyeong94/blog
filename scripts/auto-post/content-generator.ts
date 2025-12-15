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
    console.log('[INFO] Step 1: Generating content in English...');
    const englishContent = await this.generateEnglishContent(topic);

    console.log('[INFO] Step 2: Translating to Korean...');
    const koreanContent = await this.translateToKorean(englishContent, topic);

    return koreanContent;
  }

  private async generateEnglishContent(topic: TopicSuggestion): Promise<{
    title: string;
    excerpt: string;
    content: string;
  }> {
    const prompt = this.buildContentPrompt(topic);

    // 스트리밍 방식으로 변경 (긴 콘텐츠 생성을 위해 필요)
    const stream = await this.client.messages.create({
      model: this.config.model,
      max_tokens: 16384, // 영어 콘텐츠 생성
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      stream: true,
    });

    // 스트리밍 응답을 모두 수집
    let fullText = '';
    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        fullText += chunk.delta.text;
      }
    }

    const parsed = this.parseDelimitedResponse(fullText);

    // 단어 수 검증
    const wordCount = this.countWords(parsed.content);
    if (wordCount < this.config.minWordCount) {
      throw new Error(
        `Generated content too short: ${wordCount} words (minimum: ${this.config.minWordCount})`
      );
    }

    console.log(`[INFO] English content generated: ${wordCount} words`);
    return parsed;
  }

  private async translateToKorean(
    englishContent: { title: string; excerpt: string; content: string },
    topic: TopicSuggestion
  ): Promise<GeneratedContent> {
    const translationPrompt = `You are a professional technical translator specializing in software engineering content.

Translate the following technical blog post from English to Korean.

⚠️ CRITICAL: THIS IS A FULL TRANSLATION, NOT A SUMMARY!
⚠️ Translate EVERY SINGLE SENTENCE and paragraph
⚠️ Do NOT skip, condense, or summarize any content
⚠️ The translated version should be approximately the SAME LENGTH as the original

CRITICAL REQUIREMENTS:
- Translate THE ENTIRE article word-for-word
- Maintain ALL technical accuracy
- Keep ALL code blocks UNCHANGED (do NOT translate code)
- Keep ALL markdown formatting UNCHANGED
- Translate code comments to Korean
- Use natural Korean technical writing style
- Maintain the EXACT same level of detail and depth
- If the original has 10 paragraphs, the translation MUST have 10 paragraphs

ORIGINAL TITLE:
${englishContent.title}

ORIGINAL EXCERPT:
${englishContent.excerpt}

ORIGINAL CONTENT:
${englishContent.content}

Return the translation in this format:
===TITLE===
Translated title in Korean
===EXCERPT===
Translated excerpt in Korean
===CONTENT===
Translated content in Korean (keep code blocks unchanged, translate comments)

Begin translation now.`;

    const stream = await this.client.messages.create({
      model: this.config.model,
      max_tokens: 32768, // 한글 번역은 더 많은 토큰 필요
      temperature: 0.3, // 낮은 temperature로 정확한 번역
      messages: [
        {
          role: 'user',
          content: translationPrompt,
        },
      ],
      stream: true,
    });

    let fullText = '';
    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        fullText += chunk.delta.text;
      }
    }

    const parsed = this.parseDelimitedResponse(fullText);
    const wordCount = this.countWords(parsed.content);

    console.log(`[INFO] Korean translation completed: ${wordCount} words`);

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

1. STRUCTURE (Each section MUST be substantial):
   - Introduction: MINIMUM 200 words, 3-4 paragraphs
   - Each main section: MINIMUM 300-400 words, 4-5 paragraphs
   - Clear section headings (use ##, ###)
   - Deep technical explanations with step-by-step examples
   - Multiple code examples with syntax highlighting (use \`\`\`language)
   - Real-world use cases with detailed scenarios
   - Performance considerations with actual benchmarks
   - Best practices with WHY explanations
   - Conclusion: MINIMUM 150 words, 2-3 paragraphs

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
⚠️ MINIMUM ${this.config.minWordCount} WORDS (excluding code blocks)
⚠️ This is a FULL article, NOT a summary
⚠️ Each paragraph should be 3-5 sentences minimum
⚠️ Explain concepts step-by-step, don't skip details
⚠️ Include extensive examples and explanations

Begin writing now. Remember: DETAILED, COMPREHENSIVE, MINIMUM ${this.config.minWordCount} WORDS.`;
  }

  private countWords(text: string): number {
    // 코드 블록 제외하고 단어 수 계산
    const withoutCodeBlocks = text.replace(/```[\s\S]*?```/g, '');

    // 한글과 영어 모두 지원하는 단어 카운트
    // 공백, 구두점으로 분리된 단위를 세기
    const tokens = withoutCodeBlocks
      .split(/[\s\n\r\t,.!?;:()[\]{}'"]+/)
      .filter(token => token.length > 0);

    return tokens.length;
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
