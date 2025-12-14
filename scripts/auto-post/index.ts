import { loadConfig } from './config';
import { TopicGenerator } from './topic-generator';
import { ContentGenerator } from './content-generator';
import { MdxWriter } from './mdx-writer';
import { GitAutomation } from './git-automation';
import { Logger } from './utils/logger';
import { withRetry } from './utils/retry';

async function main() {
  const config = loadConfig();
  const logger = new Logger(config.logsDirectory);
  await logger.init();

  try {
    await logger.info('=== Starting Auto-Post Generation ===');

    // 1. Git 상태 확인
    const gitAutomation = new GitAutomation(config);
    const isClean = await gitAutomation.checkGitStatus();
    if (!isClean) {
      await logger.warn(
        'Git working directory is not clean. Proceeding anyway...'
      );
    }

    // 2. 주제 생성 (재시도 포함)
    await logger.info('Generating topic...');
    const topicGenerator = new TopicGenerator(config);
    const topic = await withRetry(() => topicGenerator.generateTopic(), {
      maxRetries: config.maxRetries,
      delay: config.retryDelay,
      operationName: 'Topic generation',
    });
    await logger.info('Topic generated', { topic });

    // 3. 콘텐츠 생성 (재시도 포함)
    await logger.info('Generating content...');
    const contentGenerator = new ContentGenerator(config);
    const content = await withRetry(
      () => contentGenerator.generateContent(topic),
      {
        maxRetries: config.maxRetries,
        delay: config.retryDelay,
        operationName: 'Content generation',
      }
    );
    await logger.info('Content generated', {
      title: content.title,
      wordCount: content.wordCount,
    });

    // 4. MDX 파일 생성
    await logger.info('Writing MDX file...');
    const mdxWriter = new MdxWriter(config);
    const slug = await mdxWriter.writePost(content);
    await logger.info('MDX file written', { slug });

    // 5. Git 커밋 & 푸시
    if (config.autoCommit) {
      await logger.info('Committing to git...');
      await gitAutomation.commitAndPush(slug, content.title);
      await logger.info('Git operations completed');
    }

    // 6. 완료
    await logger.info(
      '=== Auto-Post Generation Completed Successfully ===',
      {
        slug,
        title: content.title,
        category: content.category,
        wordCount: content.wordCount,
      }
    );

    console.log('\n✅ Success! New post created:');
    console.log(`   Title: ${content.title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Category: ${content.category}`);
    console.log(`   Word count: ${content.wordCount}`);
    console.log(`   File: posts/${slug}.mdx`);
  } catch (error) {
    await logger.error('Auto-post generation failed', error);
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

// 실행
main();
