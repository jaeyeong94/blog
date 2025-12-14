# Claude 자동 포스팅 시스템

Claude Opus API를 사용하여 매일 1개의 심층 기술 분석 글을 자동으로 생성하고 GitHub에 발행하는 시스템입니다.

## 주요 기능

- 🤖 **자동 주제 선정**: Claude가 최신 기술 트렌드를 분석하여 주제 선정
- ✍️ **고품질 콘텐츠**: 2000+ 단어의 심층 기술 분석 글 자동 생성
- 📝 **MDX 형식**: 코드 예제, 구조화된 헤딩, 마크다운 포맷팅
- 🔄 **Git 자동화**: 자동 커밋 및 GitHub 푸시
- 📊 **상세 로깅**: JSON Lines 형식의 구조화된 로그
- 🔁 **재시도 로직**: API 실패 시 자동 재시도 (최대 3회)

## 시스템 요구사항

- Node.js 18+
- TypeScript
- Linux/macOS (크론잡 지원)
- Anthropic API 키

## 설치 및 설정

### 1. 의존성 설치

```bash
npm install
```

필요한 패키지:
- `@anthropic-ai/sdk`: Claude API 클라이언트
- `dotenv`: 환경 변수 관리
- `tsx`: TypeScript 실행

### 2. API 키 설정

`.env.local` 파일에 Anthropic API 키를 추가하세요:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-...
```

API 키는 [Anthropic Console](https://console.anthropic.com)에서 발급받을 수 있습니다.

### 3. Git 설정 확인

로컬 git 설정을 확인하세요:

```bash
git config user.name
git config user.email
```

## 사용 방법

### 수동 실행

#### Git 통합 (커밋 + 푸시)

```bash
npm run auto-post
```

전체 프로세스:
1. 주제 생성
2. 콘텐츠 생성
3. MDX 파일 작성
4. Git 커밋
5. GitHub 푸시

#### Git 없이 실행 (테스트용)

```bash
npm run auto-post:no-git
```

Git 커밋/푸시 없이 MDX 파일만 생성합니다.

### 자동 실행 (크론잡)

매일 오전 9시에 자동으로 실행되도록 설정:

```bash
./scripts/setup-cron.sh
```

크론잡 확인:

```bash
crontab -l
```

크론잡 로그 확인:

```bash
tail -f logs/cron.log
```

크론잡 제거:

```bash
crontab -e
# 'auto-post' 라인 삭제
```

## 프로젝트 구조

```
scripts/auto-post/
├── index.ts                 # 메인 실행 파일
├── config.ts                # 설정 관리
├── topic-generator.ts       # 주제 선정 (Claude API)
├── content-generator.ts     # 콘텐츠 생성 (Claude API)
├── mdx-writer.ts            # MDX 파일 생성
├── git-automation.ts        # Git 커밋/푸시
├── utils/
│   ├── logger.ts            # JSON Lines 로깅
│   └── retry.ts             # 재시도 로직
└── tsconfig.json            # TypeScript 설정
```

## 설정 옵션

`scripts/auto-post/config.ts`에서 설정 가능:

```typescript
{
  model: 'claude-opus-4-5-20251101',           // Claude 모델
  categories: ['RUST', 'GO', 'FRONTEND', 'DEVOPS', 'DATABASE'],
  minWordCount: 2000,                          // 최소 단어 수
  targetWordCount: 2500,                       // 목표 단어 수
  maxRetries: 3,                               // 최대 재시도 횟수
  retryDelay: 2000,                            // 재시도 대기 시간 (ms)
}
```

환경 변수로 제어:

- `AUTO_COMMIT=false`: Git 커밋/푸시 비활성화

## 로그

### 실행 로그

위치: `logs/auto-post/YYYY-MM-DDTHH-MM-SS.log`

형식: JSON Lines

```json
{"timestamp":"2025-12-14T05:34:47.478Z","level":"INFO","message":"=== Starting Auto-Post Generation ==="}
{"timestamp":"2025-12-14T05:34:57.658Z","level":"INFO","message":"Topic generated","data":{...}}
```

### 크론잡 로그

위치: `logs/cron.log`

크론잡 실행 내역이 저장됩니다.

## 생성되는 MDX 형식

```yaml
---
title: '제목'
excerpt: '요약 (200자 이내)'
date: 'YYYY-MM-DD'
category: 'RUST'
tags: ['tag1', 'tag2']
featured: false
---

# 제목

## 섹션 1

내용...

```rust
코드 예제
```

## 섹션 2

...
```

## API 비용

Claude Opus 4.5 기준:
- 1회 포스트 생성: 약 $0.53
- 월간 비용 (매일 1회): 약 $15.90

## 트러블슈팅

### 1. API 키 오류

```
Error: ANTHROPIC_API_KEY is not set in .env.local
```

**해결**: `.env.local`에 `ANTHROPIC_API_KEY` 추가

### 2. Git 푸시 실패

Git 푸시가 실패해도 로컬 커밋은 완료됩니다. 수동으로 푸시:

```bash
git push origin main
```

### 3. 단어 수 부족

```
Error: Generated content too short: 1165 words (minimum: 2000)
```

**해결**: 재시도 로직이 자동으로 작동합니다 (최대 3회)

### 4. 중복 Slug

```
Error: File already exists
```

**해결**: 이미 같은 제목의 포스트가 존재합니다. 기존 파일을 확인하세요.

## 성능

- **주제 생성**: ~5초
- **콘텐츠 생성**: ~30-60초
- **파일 쓰기 + Git**: ~5초
- **총 실행 시간**: ~1-2분

## 보안

- API 키는 `.env.local`에 저장 (`.gitignore`에 포함됨)
- 로그 파일도 `.gitignore`에 포함됨
- Git credentials는 시스템 설정 사용

## 향후 개선 사항

- [ ] 다양한 카테고리 로테이션
- [ ] Featured 포스트 자동 선정
- [ ] 이미지 생성 통합
- [ ] 다국어 버전 동시 생성
- [ ] 웹 UI 대시보드

## 라이선스

MIT
