import fs from 'fs/promises';
import path from 'path';
import { AutoPostConfig } from './config';
import { GeneratedContent } from './content-generator';

export class MdxWriter {
  private config: AutoPostConfig;

  constructor(config: AutoPostConfig) {
    this.config = config;
  }

  async writePost(content: GeneratedContent): Promise<string> {
    const slug = this.generateSlug(content.title);
    const filePath = path.join(this.config.postsDirectory, `${slug}.mdx`);

    // 중복 확인
    await this.ensureUniqueSlug(filePath);

    // Front matter + 본문 생성
    const mdxContent = this.buildMdxContent(content);

    // 파일 쓰기
    await fs.writeFile(filePath, mdxContent, 'utf-8');

    return slug;
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '') // 특수문자 제거 (영숫자, 한글, 공백, 하이픈만)
      .replace(/\s+/g, '-') // 공백을 하이픈으로
      .replace(/-+/g, '-') // 연속 하이픈 제거
      .replace(/^-|-$/g, ''); // 시작/끝 하이픈 제거
  }

  private async ensureUniqueSlug(filePath: string): Promise<void> {
    try {
      await fs.access(filePath);
      throw new Error(
        `Post with this slug already exists: ${path.basename(filePath)}`
      );
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      // 파일이 없으면 정상 (ENOENT)
    }
  }

  private buildMdxContent(content: GeneratedContent): string {
    const today = new Date().toISOString().split('T')[0];

    const frontMatter = `---
title: '${this.escapeYaml(content.title)}'
excerpt: '${this.escapeYaml(content.excerpt)}'
date: '${today}'
category: '${content.category}'
tags: [${content.tags.map((tag) => `'${this.escapeYaml(tag)}'`).join(', ')}]
featured: false
---

`;

    return frontMatter + content.content;
  }

  private escapeYaml(text: string): string {
    return text.replace(/'/g, "''");
  }
}
