# 블로그 프로젝트 TODO

## 📊 프로젝트 개요

Next.js 기반 기술 블로그와 Claude Opus API를 활용한 자동 포스팅 시스템

- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS, MDX
- **자동화**: Claude Opus 4.5 API, 2단계 생성 (영어 → 한글 번역)
- **배포**: GitHub Pages (예정)
- **도메인**: http://localhost:3001 (개발)

---

## ✅ 완료된 기능

### 1. Next.js 블로그 기본 기능 ✅
- [x] 메인 페이지 (포스트 목록)
- [x] 포스트 상세 페이지
- [x] MDX 파일 지원 (gray-matter + next-mdx-remote)
- [x] 코드 하이라이팅 (rehype-highlight)
- [x] 반응형 디자인 (Tailwind CSS)
- [x] 다크모드 지원 (별 배경 애니메이션)

### 2. 포스트 상세 페이지 기능 ✅
- [x] **목차 (TOC)** - 자동 생성, 스크롤 추적, 하이라이트
- [x] **코드 복사 버튼** - 모든 코드 블록에 복사 기능
- [x] **공유 버튼** - Twitter, Facebook, 링크 복사
- [x] **댓글 시스템** - Giscus 통합 (GitHub Discussions)

### 3. 추가 페이지 ✅
- [x] Articles 페이지 (전체 글 목록)
- [x] Snippets 페이지 (코드 스니펫 모음)
- [x] About 페이지 (소개)

### 4. 자동 포스팅 시스템 ✅

#### 4.1 핵심 기능
- [x] **Claude Opus API 통합**
  - Model: claude-opus-4-5-20251101
  - 스트리밍 API 지원
  - 재시도 로직 (최대 3회)

- [x] **2단계 생성 방식** (영어 → 한글)
  - Step 1: 영어로 2000+ 단어 작성 (max_tokens: 16384)
  - Step 2: 한글 전문 번역 (max_tokens: 32768)
  - 코드 블록 유지, 주석만 번역

- [x] **주제 자동 생성**
  - 카테고리: RUST, GO, FRONTEND, DEVOPS, DATABASE
  - 2025년 트렌드 반영
  - JSON 형식 반환 (title, tags, outline, rationale)

- [x] **MDX 파일 생성**
  - Front matter 자동 생성
  - Slug 생성 (한글 지원)
  - 중복 체크

- [x] **Git 자동화**
  - 자동 커밋
  - 자동 푸시 (실패 시 non-fatal)
  - 커밋 메시지 템플릿

#### 4.2 유틸리티
- [x] **로깅 시스템**
  - JSON Lines 형식
  - 타임스탬프별 로그 파일
  - 콘솔 + 파일 동시 출력

- [x] **재시도 로직**
  - 설정 가능한 횟수/딜레이
  - API 호출 실패 처리

- [x] **단어 수 계산**
  - 한글/영어 모두 지원
  - 코드 블록 제외

#### 4.3 실행 방법
```bash
npm run auto-post         # Git 통합 (커밋 + 푸시)
npm run auto-post:no-git  # Git 없이 테스트
```

#### 4.4 성능 지표
- **주제 생성**: ~5초
- **영어 콘텐츠 생성**: ~30-60초 (2000+ 단어)
- **한글 번역**: ~60-90초
- **총 실행 시간**: ~2-3분
- **생성 단어 수**: 2000-3000 단어
- **API 비용**: ~$0.53/포스트, ~$15.90/월 (매일 1회)

---

## 🚧 진행 중

### 크론잡 설정
- [ ] macOS Cron Job 테스트
- [ ] 매일 오전 9시 자동 실행 검증
- [ ] 크론 로그 모니터링 설정

---

## 📋 향후 개선 사항

### 우선순위: 높음 🔴

#### 1. 블로그 배포
- [ ] **GitHub Pages 배포**
  - `next export` 설정
  - GitHub Actions 워크플로우
  - 커스텀 도메인 연결 (선택)

- [ ] **Vercel 배포** (대안)
  - 환경 변수 설정
  - 자동 빌드/배포

#### 2. SEO 최적화
- [ ] **메타 태그 추가**
  - Open Graph 태그
  - Twitter Card
  - Description, Keywords

- [ ] **Sitemap 생성**
  - 동적 sitemap.xml
  - robots.txt

- [ ] **RSS Feed**
  - 전체 포스트 RSS
  - 카테고리별 RSS

#### 3. 자동 포스팅 안정화
- [ ] **에러 알림**
  - 실패 시 이메일/Slack 알림
  - 로그 분석 도구

- [ ] **백업 시스템**
  - 생성된 포스트 백업
  - 실패한 시도 복구

### 우선순위: 중간 🟡

#### 4. 콘텐츠 품질 개선
- [ ] **카테고리 로테이션**
  - 카테고리별 포스트 수 추적
  - 균형잡힌 주제 선정

- [ ] **Featured 포스트 자동 선정**
  - 월 1회 featured 태그 자동 설정
  - 품질 기반 선정 로직

- [ ] **포스트 품질 검증**
  - 링크 유효성 검사
  - 코드 문법 검사
  - 이미지 존재 여부 확인

#### 5. 이미지 지원
- [ ] **AI 이미지 생성**
  - DALL-E/Midjourney 통합
  - 포스트별 커버 이미지 자동 생성

- [ ] **이미지 최적화**
  - Next.js Image 컴포넌트
  - 자동 압축/리사이징
  - WebP 변환

#### 6. 검색 기능
- [ ] **전체 검색**
  - 제목, 본문, 태그 검색
  - Algolia/Elasticsearch 통합 (선택)

- [ ] **태그 필터링**
  - 태그별 포스트 목록
  - 태그 클라우드

### 우선순위: 낮음 🟢

#### 7. 분석 및 모니터링
- [ ] **Google Analytics 통합**
  - 페이지뷰 추적
  - 사용자 행동 분석

- [ ] **포스트 통계 대시보드**
  - 조회수, 댓글 수
  - 인기 포스트 순위
  - 카테고리별 분포

#### 8. 다국어 지원
- [ ] **영어 버전 동시 생성**
  - 한글 번역을 역으로 영어도 제공
  - 언어 선택 UI

- [ ] **i18n 설정**
  - next-intl 통합
  - 다국어 라우팅

#### 9. 웹 UI 대시보드
- [ ] **관리자 페이지**
  - 포스트 수동 생성 UI
  - 기존 포스트 편집
  - 주제 제안 목록

- [ ] **통계 페이지**
  - 생성된 포스트 수
  - API 사용량/비용
  - 성공/실패율

#### 10. 고급 기능
- [ ] **시리즈 포스트**
  - 연관 포스트 그룹화
  - 다음/이전 글 네비게이션

- [ ] **독자 참여**
  - 포스트 평가 (좋아요/별점)
  - 북마크 기능
  - 읽은 글 표시

---

## 🐛 알려진 이슈

### 자동 포스팅 시스템
1. ✅ ~~한글 직접 작성 시 200-400단어만 생성~~ (해결: 2단계 방식)
2. ✅ ~~단어 수 계산 오류 (한글 미지원)~~ (해결: 정규식 변경)
3. ✅ ~~JSON 파싱 오류 (마크다운 래핑)~~ (해결: 구분자 방식)
4. ✅ ~~스트리밍 타임아웃~~ (해결: 스트리밍 API)

### 블로그 UI
- 현재 알려진 이슈 없음

---

## 📁 프로젝트 구조

```
blog/
├── app/                        # Next.js App Router
│   ├── page.tsx               # 메인 페이지
│   ├── posts/[slug]/          # 포스트 상세
│   ├── articles/              # 전체 글 목록
│   ├── snippets/              # 코드 스니펫
│   └── about/                 # 소개 페이지
├── components/                 # React 컴포넌트
│   ├── BlogPost.tsx           # 포스트 카드
│   ├── CodeBlock.tsx          # 코드 블록
│   ├── TableOfContents.tsx    # 목차
│   ├── ShareButtons.tsx       # 공유 버튼
│   └── Comments.tsx           # Giscus 댓글
├── lib/
│   └── posts.ts               # 포스트 처리 유틸
├── posts/                      # MDX 포스트 파일
│   └── *.mdx
├── scripts/
│   ├── auto-post/             # 자동 포스팅 시스템
│   │   ├── index.ts           # 메인
│   │   ├── config.ts          # 설정
│   │   ├── topic-generator.ts # 주제 생성
│   │   ├── content-generator.ts # 콘텐츠 생성
│   │   ├── mdx-writer.ts      # MDX 작성
│   │   ├── git-automation.ts  # Git 자동화
│   │   └── utils/
│   │       ├── logger.ts      # 로깅
│   │       └── retry.ts       # 재시도
│   └── setup-cron.sh          # 크론잡 설정
├── logs/
│   └── auto-post/             # 자동 포스팅 로그
├── .env.local                  # 환경 변수
│   └── ANTHROPIC_API_KEY
└── package.json
```

---

## 🔧 개발 가이드

### 환경 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3001)
npm run dev

# 프로덕션 빌드
npm run build
npm run start
```

### 자동 포스팅 테스트
```bash
# Git 없이 테스트
npm run auto-post:no-git

# 전체 테스트 (Git 포함)
npm run auto-post

# 크론잡 설정
./scripts/setup-cron.sh

# 로그 확인
tail -f logs/auto-post/*.log
tail -f logs/cron.log
```

### 환경 변수
`.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3001
ANTHROPIC_API_KEY=sk-ant-api03-...
```

---

## 📚 참고 문서

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Giscus Documentation](https://giscus.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📞 문제 해결

### 자주 발생하는 문제

**Q: 자동 포스팅이 실패합니다**
- `.env.local`에 `ANTHROPIC_API_KEY`가 설정되어 있는지 확인
- `logs/auto-post/` 디렉토리의 로그 파일 확인
- API 사용량 제한 확인

**Q: Git 푸시가 실패합니다**
- Git 인증 설정 확인 (`git config user.name`, `user.email`)
- SSH 키 또는 Personal Access Token 설정 확인
- 푸시 실패는 non-fatal이므로 수동으로 `git push` 실행

**Q: 한글 파일명이 깨집니다**
- 정상입니다. Git은 한글 파일명을 URL 인코딩으로 표시
- 실제 파일시스템에서는 한글로 정상 표시됨

**Q: 포스트가 메인 페이지에 안 보입니다**
- `posts/` 디렉토리에 `.mdx` 파일이 있는지 확인
- Front matter 형식이 올바른지 확인
- 개발 서버 재시작 (`npm run dev`)

---

## 🎯 다음 마일스톤

### Milestone 1: 배포 (1주)
- [ ] GitHub Pages 배포
- [ ] 커스텀 도메인 설정
- [ ] SEO 기본 설정

### Milestone 2: 안정화 (2주)
- [ ] 크론잡 모니터링
- [ ] 에러 알림 시스템
- [ ] 백업 시스템

### Milestone 3: 기능 확장 (1개월)
- [ ] 검색 기능
- [ ] 이미지 자동 생성
- [ ] 통계 대시보드

---

**Last Updated**: 2025-12-15
**Version**: 1.0.0
**Status**: ✅ 자동 포스팅 시스템 완성, 배포 준비 중
