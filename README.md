# Observatory Blog

**기술의 깊은 곳을 탐험하는 개인 블로그**

Next.js 15 + TypeScript + Tailwind CSS로 구축된 현대적인 기술 블로그입니다.

## ✨ 주요 기능

- 📝 **MDX 기반 블로그 포스팅** - 마크다운으로 글 작성, Git으로 버전 관리
- 🎨 **Observatory 다크 테마** - 별 애니메이션 배경과 세련된 UI
- 🔍 **실시간 검색** (⌘K) - 제목, 내용, 태그 검색
- 🏷️ **태그 & 카테고리** - 글 분류 및 필터링
- 💬 **Giscus 댓글** - GitHub Discussions 기반
- 📰 **RSS 피드** - `/rss.xml`
- 🚀 **정적 생성** - 빠른 로딩과 SEO 최적화
- 🎯 **코드 하이라이팅** - Syntax highlighting

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 빌드

```bash
npm run build
npm start
```

## 📝 글 작성하기

1. `posts/` 디렉토리에 `.mdx` 파일 생성
2. Front matter 추가:

```mdx
---
title: '글 제목'
excerpt: '글 요약'
date: '2024-12-10'
category: 'RUST'
tags: ['Rust', 'Performance']
featured: true
---

# 내용 시작

여기에 마크다운 내용을 작성하세요...
```

3. 저장하면 자동으로 반영됩니다.

## 📁 프로젝트 구조

```
blog/
├── app/                    # Next.js App Router
│   ├── posts/[slug]/      # 글 상세 페이지
│   ├── category/[cat]/    # 카테고리 페이지
│   ├── tag/[tag]/         # 태그 페이지
│   ├── rss.xml/           # RSS 피드
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── Header.tsx         # 헤더
│   ├── Footer.tsx         # 푸터
│   ├── StarField.tsx      # 별 배경
│   ├── PostCard.tsx       # 포스트 카드
│   ├── SearchModal.tsx    # 검색 모달
│   ├── MDXContent.tsx     # MDX 렌더러
│   └── Comments.tsx       # Giscus 댓글
├── lib/                   # 유틸리티
│   └── posts.ts           # 포스트 관련 함수
├── posts/                 # MDX 블로그 글
│   └── example-post.mdx
└── public/                # 정적 파일
```

## 🎨 커스터마이징

### 테마 색상 변경

`tailwind.config.ts`에서 색상을 수정하세요:

```typescript
colors: {
  bg: '#12100f',
  bgCard: '#1a1816',
  accent: '#7eb8ff',
  // ...
}
```

### Giscus 설정

`components/Comments.tsx`에서 GitHub 저장소 정보를 업데이트하세요:

```typescript
script.setAttribute('data-repo', 'YOUR_USERNAME/YOUR_REPO');
script.setAttribute('data-repo-id', 'YOUR_REPO_ID');
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID');
```

[Giscus 설정](https://giscus.app)에서 정보를 얻을 수 있습니다.

### RSS 피드 URL 수정

`app/rss.xml/route.ts`에서 도메인을 변경하세요:

```typescript
site_url: 'https://yourdomain.com',
```

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + React)
- **Syntax Highlighting**: react-syntax-highlighter
- **Comments**: Giscus (GitHub Discussions)
- **RSS**: rss library

## 📦 배포

### Vercel (권장)

```bash
npm install -g vercel
vercel
```

### 정적 빌드

```bash
npm run build
```

`out/` 디렉토리를 Netlify, Cloudflare Pages 등에 배포

## ⌨️ 단축키

- `⌘ + K` (Mac) / `Ctrl + K` (Windows/Linux): 검색 열기
- `ESC`: 검색 닫기

## 📝 라이센스

MIT

## 🙏 Credits

디자인 영감: Observatory Theme

---

**Made with ❤️ and Next.js**
