import path from 'path';
import * as dotenv from 'dotenv';

// .env.local 로드
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

export interface AutoPostConfig {
  // API 설정
  anthropicApiKey: string;
  model: string;

  // 카테고리 설정
  categories: readonly string[];

  // 콘텐츠 설정
  minWordCount: number;
  targetWordCount: number;

  // 파일 경로
  postsDirectory: string;
  logsDirectory: string;

  // Git 설정
  autoCommit: boolean;
  autoPush: boolean;
  commitMessageTemplate: string;

  // 재시도 설정
  maxRetries: number;
  retryDelay: number;
}

export function loadConfig(): AutoPostConfig {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set in .env.local\n' +
      'Please add: ANTHROPIC_API_KEY=sk-ant-...'
    );
  }

  // AUTO_COMMIT 환경 변수로 제어 가능 (테스트용)
  const autoCommit = process.env.AUTO_COMMIT !== 'false';

  return {
    anthropicApiKey: apiKey,
    model: 'claude-opus-4-5-20251101',
    categories: ['RUST', 'GO', 'FRONTEND', 'DEVOPS', 'DATABASE'] as const,
    minWordCount: 2000,
    targetWordCount: 2500,
    postsDirectory: path.join(process.cwd(), 'posts'),
    logsDirectory: path.join(process.cwd(), 'logs', 'auto-post'),
    autoCommit,
    autoPush: autoCommit, // autoCommit이 false면 autoPush도 false
    commitMessageTemplate: 'Add automated post: {title}',
    maxRetries: 3,
    retryDelay: 2000, // 2초
  };
}
