import Anthropic from '@anthropic-ai/sdk';
import { AutoPostConfig } from './config';

export interface TopicSuggestion {
  title: string;
  category: string;
  tags: string[];
  outline: string[];
  rationale: string;
}

export class TopicGenerator {
  private client: Anthropic;
  private config: AutoPostConfig;

  constructor(config: AutoPostConfig) {
    this.config = config;
    this.client = new Anthropic({
      apiKey: config.anthropicApiKey,
    });
  }

  async generateTopic(): Promise<TopicSuggestion> {
    const prompt = this.buildTopicPrompt();

    const message = await this.client.messages.create({
      model: this.config.model,
      max_tokens: 2048,
      temperature: 0.9, // 높은 창의성
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // 응답 파싱
    const responseText = this.extractTextContent(message);
    return JSON.parse(responseText);
  }

  private buildTopicPrompt(): string {
    const today = new Date().toISOString().split('T')[0];
    const categories = this.config.categories.join(', ');

    return `You are a technical blog content strategist. Today is ${today}.

Your task: Suggest ONE compelling, in-depth technical topic for a blog post.

NOTE: This blog will be translated to Korean later, but generate the topic in ENGLISH first.

Categories available: ${categories}

Requirements:
1. Topic must be:
   - Currently trending or highly relevant in 2025
   - Deep technical content (not beginner-level)
   - Practical and applicable to real-world scenarios
   - Something that would take 2000+ words to cover properly

2. Consider recent developments:
   - New framework releases
   - Performance breakthroughs
   - Architecture patterns
   - Security vulnerabilities
   - Tool comparisons
   - Best practices evolution

3. Return your suggestion as JSON with this exact structure:
{
  "title": "Engaging title in English that promises value",
  "category": "One of: RUST, GO, FRONTEND, DEVOPS, DATABASE",
  "tags": ["3-5 specific tags in English"],
  "outline": [
    "Introduction section",
    "Main point 1",
    "Main point 2",
    "Main point 3",
    "Conclusion"
  ],
  "rationale": "Why this topic is timely and important now"
}

Important: Return ONLY valid JSON, no markdown formatting, no explanations.`;
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
