# Altibase Union 홈페이지

Altibase Union 홈페이지는 Altibase 공식 홈페이지와 톤을 맞춘 노동조합 공식 포털입니다. GitHub Pages에서 무료로 운영하며, Astro Content Collections와 Markdown을 사용해 공지사항과 활동보고를 관리합니다.

운영 사이트:

```text
https://altibaseunion.github.io/altibase-union-homepage/
```

## 기술 스택

- Astro
- Astro Content Collections
- Bootstrap 5 CDN
- Lucide Icons CDN
- Vanilla JavaScript
- Markdown
- GitHub Pages
- GitHub Actions

## 프로젝트 구조

```text
.
├─ AGENTS.md
├─ README.md
├─ astro.config.mjs
├─ package.json
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ layouts/
│  ├─ pages/
│  └─ styles/
├─ content/
│  ├─ notices/
│  └─ activities/
├─ public/
│  ├─ images/
│  └─ files/
├─ scripts/
│  └─ content/
├─ tools/
│  └─ publisher/
├─ config/
│  └─ content/
└─ docs/
   ├─ CODEX_HANDOFF.md
   ├─ DESIGN_SYSTEM.md
   ├─ CONTENT_GUIDE.md
   ├─ DEPLOYMENT.md
   └─ DECISIONS.md
```

## 설치

```bash
npm install
```

## 실행

개발 서버:

```bash
npm run dev
```

정적 빌드:

```bash
npm run build
```

Content Collections 동기화:

```bash
npm run check
```

빌드 결과 미리보기:

```bash
npm run preview
```

## Union Publisher Lite

Notion Markdown 또는 ZIP을 활동보고 초안으로 변환하는 로컬 관리 도구입니다.

```bash
npm run content:app
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:4177
```

지원 입력:

- `.md`
- `.markdown`
- Notion `.zip`
- Notion 중첩 ZIP

## 게시글 추가

공지사항:

```text
content/notices/YYYY-MM-DD-title.md
```

활동보고:

```text
content/activities/YYYY-MM-DD-title.md
```

기본 Frontmatter:

```yaml
---
title: "게시글 제목"
date: 2026-07-08
category: "공지사항"
summary: "목록에 표시될 요약"
author: "Altibase 노동조합"
thumbnail: ""
pinned: false
tags:
  - "태그"
draft: true
slug: "post-slug"
---
```

`draft: true`인 글은 목록과 상세 페이지에 표시하지 않습니다.

## 브랜치 전략

- `main`: 운영 배포 브랜치
- `develop`: 일반 개발 통합 브랜치
- `feature/*`: 기능 단위 작업 브랜치

큰 기능이나 실험성 작업은 `feature/*`에서 진행하고 PR로 검토합니다.

## 문서 안내

- `AGENTS.md`: Codex 작업 규칙
- `docs/CODEX_HANDOFF.md`: 현재 상태와 다음 작업
- `docs/DESIGN_SYSTEM.md`: 디자인 시스템
- `docs/CONTENT_GUIDE.md`: 콘텐츠 작성 규칙
- `docs/DEPLOYMENT.md`: 배포 방법
- `docs/DECISIONS.md`: 주요 결정과 이유
