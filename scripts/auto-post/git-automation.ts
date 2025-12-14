import { exec } from 'child_process';
import { promisify } from 'util';
import { AutoPostConfig } from './config';

const execAsync = promisify(exec);

export class GitAutomation {
  private config: AutoPostConfig;

  constructor(config: AutoPostConfig) {
    this.config = config;
  }

  async commitAndPush(slug: string, title: string): Promise<void> {
    if (!this.config.autoCommit) {
      console.log('Auto-commit disabled. Skipping git operations.');
      return;
    }

    const mdxFile = `posts/${slug}.mdx`;

    try {
      // 1. 파일 추가
      await this.gitAdd(mdxFile);

      // 2. 커밋
      const commitMessage = this.config.commitMessageTemplate
        .replace('{title}', title)
        .replace('{slug}', slug);
      await this.gitCommit(commitMessage);

      // 3. 푸시
      if (this.config.autoPush) {
        await this.gitPush();
      }

      console.log('✅ Git operations completed successfully');
    } catch (error) {
      console.error('❌ Git operation failed:', error);
      throw new Error(`Git automation failed: ${error}`);
    }
  }

  private async gitAdd(filePath: string): Promise<void> {
    const { stdout, stderr } = await execAsync(`git add ${filePath}`);
    if (stderr && !stderr.includes('warning:')) {
      console.warn('Git add warning:', stderr);
    }
  }

  private async gitCommit(message: string): Promise<void> {
    // 커밋 메시지에 따옴표가 있을 수 있으므로 이스케이프
    const escapedMessage = message.replace(/"/g, '\\"');
    const { stdout, stderr } = await execAsync(
      `git commit -m "${escapedMessage}"`
    );
    console.log('Git commit output:', stdout);
    if (stderr && !stderr.includes('[main')) {
      console.warn('Git commit warning:', stderr);
    }
  }

  private async gitPush(): Promise<void> {
    try {
      const { stdout, stderr } = await execAsync('git push origin main');
      console.log('Git push output:', stdout);
      if (stderr && !stderr.includes('To https://github.com')) {
        console.warn('Git push warning:', stderr);
      }
    } catch (error) {
      // 푸시 실패해도 로컬 커밋은 완료됨
      console.error('❌ Git push failed, but local commit succeeded');
      console.error('You can manually push later with: git push origin main');
      // 푸시 실패를 치명적 에러로 간주하지 않음
    }
  }

  async checkGitStatus(): Promise<boolean> {
    try {
      const { stdout } = await execAsync('git status --porcelain');
      return stdout.trim().length === 0; // true면 clean
    } catch (error) {
      throw new Error('Failed to check git status');
    }
  }
}
