# Codex Handoff

이 문서는 새 Codex 스레드가 Altibase Union 홈페이지 작업을 바로 이어받기 위한 최신 인수인계 문서입니다.

## 1. 프로젝트 목적과 기술 스택

Altibase Union 홈페이지는 Altibase 공식 홈페이지와 톤을 맞춘 노동조합 공식 포털입니다. GitHub Pages에서 무료로 운영하며, DBMS 없이 Markdown과 GitHub 저장소를 원본으로 관리합니다.

기술 스택:

- Astro
- Astro Content Collections
- Bootstrap 5 CDN
- Lucide Icons CDN
- Vanilla JavaScript
- Markdown
- GitHub Pages
- GitHub Actions

운영 사이트:

```text
https://altibaseunion.github.io/altibase-union-homepage/
```

현재 주요 작업 브랜치:

```text
feature/union-publisher-lite
```

## 2. 현재 구현된 기능

홈페이지:

- Home
- 공지사항 목록
- 공지사항 상세
- 활동보고 목록
- 활동보고 상세
- Quick Links
- 상담 및 제보 Hero CTA
- Footer
- GitHub Pages 배포 workflow

콘텐츠:

- `content/notices` Markdown 기반 공지사항
- `content/activities` Markdown 기반 활동보고
- `draft: true` 게시물은 목록과 상세에 노출하지 않음
- `pinned: true` 게시물은 목록에서 우선 표시

Union Publisher Lite:

- `npm run content:app`으로 로컬 관리 화면 실행
- Markdown 또는 Notion ZIP 업로드
- Notion 중첩 ZIP 자동 처리
- 제목, 날짜, 요약, 태그, slug 자동 제안
- 홈페이지용 활동보고 Markdown 초안 생성
- 새 게시물은 `draft: true`로 생성
- 원문/변환본 비교
- 용어 정리
  - `부당 노동 행위` → `부당노동행위`
  - `근로 시간 면제자` → `근로시간면제자`
  - `노사 협의회` → `노사협의회`
- 이미지 경로 정리 및 `public/images/activities/{slug}/` 복사
- Frontmatter, 날짜 형식, slug 중복, 이미지 경로, 제목 구조, 원문 URL 검증
- `npm run check`, `npm run build` 실행 버튼
- 콘텐츠 브랜치 생성, commit, push, Draft PR 준비 기능

## 3. 주요 폴더와 파일 역할

```text
src/pages/
```

Astro 페이지 라우트입니다.

- `src/pages/index.astro`: 메인 페이지
- `src/pages/notices/index.astro`: 공지사항 목록
- `src/pages/notices/[slug].astro`: 공지사항 상세
- `src/pages/activities/index.astro`: 활동보고 목록
- `src/pages/activities/[slug].astro`: 활동보고 상세

```text
src/components/
```

공통 UI 컴포넌트입니다.

- `Hero.astro`: 메인 Hero, 상담 및 제보 CTA
- `PostList.astro`: 공지/활동 목록 카드
- `QuickLinks.astro`: 바로가기 카드
- `ConsultSection.astro`: 상담 및 제보 섹션
- `ArticleLayout.astro`: Markdown 상세 페이지 공통 레이아웃
- `ArticleHeader.astro`, `ArticleBody.astro`, `ArticleFooter.astro`, `ArticleMeta.astro`, `Breadcrumb.astro`, `TagList.astro`: Article 디자인 시스템 구성 요소

```text
src/data/site.ts
```

사이트 설정과 외부 링크를 관리합니다.

- 이메일
- 네이버 카페
- 상담/제보 Google Form
- 공지사항/활동보고 외부 게시판 URL
- Quick Links

```text
src/styles/global.css
```

전체 디자인 시스템과 반응형 스타일입니다.

```text
content/notices/
content/activities/
```

공지사항과 활동보고 Markdown 원본입니다.

```text
public/images/
```

로고, 파비콘, Hero 이미지, 외부 링크 아이콘, 활동보고 이미지가 위치합니다.

주요 이미지:

- `hero-union-participation.webp`: 현재 Hero 이미지
- `hero-previous.png`: 이전 Hero 이미지 백업
- `logo.png`: 텍스트 포함 로고
- `logo-symbol.png`: 심볼 로고
- `favicon.ico`, `favicon.png`: 브라우저 탭 아이콘
- `kctfu-symbol.png`, `youtube.svg`: Quick Links용 이미지

```text
scripts/content/server.mjs
tools/publisher/
config/content/publisher.config.json
```

Union Publisher Lite 구현입니다.

- `scripts/content/server.mjs`: 로컬 서버, ZIP/Markdown 변환, 검증, 파일 생성, Git 명령 실행
- `tools/publisher/index.html`: 관리 화면
- `tools/publisher/app.js`: 관리 화면 동작
- `tools/publisher/style.css`: 관리 화면 스타일
- `config/content/publisher.config.json`: Publisher Lite 설정

```text
docs/
```

운영 문서입니다.

- `posting-guide.md`: 게시글 작성 실무 가이드
- `content-guide.md`: 콘텐츠 작성 기준
- `design-system.md`: 디자인 기준
- `union-publisher-lite.md`: Publisher Lite 사용법
- `CODEX_HANDOFF.md`: 이 인수인계 문서

## 4. 확정된 디자인·운영 원칙

디자인 원칙:

- Altibase 공식 홈페이지와 어울리는 Corporate Style
- 신뢰, 전문성, 소통, 안정감 중심
- 과도한 투쟁 이미지, 과한 애니메이션, 과도한 색상 사용 금지
- 네이비 `#0F2747`, 블루 `#174EA6`, 배경 `#F6F8FC` 중심
- 카드 UI는 절제된 radius, border, shadow 사용
- 메인 페이지는 스크롤을 과하게 늘리지 않음
- Article 상세는 기업 뉴스룸/문서형 가독성을 유지

운영 원칙:

- `main`은 운영 배포 브랜치
- `develop`은 일반 개발 통합 브랜치
- 큰 작업은 `feature/*` 브랜치에서 진행
- 사용자 승인 전 `main` 병합 금지
- GitHub Pages는 `.github/workflows/deploy.yml`로 배포
- DB, CMS, 관리자 페이지, 로그인은 사용하지 않음
- 게시물 원본은 Markdown과 GitHub 저장소에 둠
- Notion은 콘텐츠 초안 작성 또는 내보내기 원본으로 사용 가능
- 네이버 카페 자동 연동은 현재 구현하지 않음

## 5. 최근 변경 사항

홈페이지:

- Astro 기반 정적 사이트로 전환
- Markdown Content Collections 적용
- 공지사항/활동보고 목록 및 상세 페이지 구현
- Article Design System 적용
- Hero 이미지를 조합원 참여/회의 이미지로 교체
- Hero 문구를 `Altibase Union`, `함께 만드는 더 나은 내일, 알티베이스 노동조합`으로 정리
- 상담 및 제보 CTA를 Hero 내부에 배치
- Quick Links 정리
- 네이버 카페와 카카오 채널을 Quick Links로 이동/추가
- Footer 외부 링크 최소화
- 파비콘을 심볼 로고 기반 큰 버전으로 갱신하고 캐시 버전 적용
- 2026년 5월 활동보고 Markdown 추가

Union Publisher Lite:

- `feature/union-publisher-lite` 브랜치에 구현
- `npm run content:app` 추가
- Notion 중첩 ZIP 처리 보완
- 포트 충돌 시 친절한 안내 메시지 표시
- CSS/JS가 로드되지 않은 상태 안내 표시
- `분석 및 변환` 클릭 시 form reload로 파일 선택이 사라지던 문제 수정
- `7월 활동 보고서.zip` API 분석 테스트는 통과 확인

## 6. 미완료 작업

- `feature/union-publisher-lite`를 PR로 열고 리뷰해야 함
- GitHub 통합 권한 문제로 Draft PR 자동 생성은 실패했음
- Publisher Lite의 실제 브라우저 UI 업로드 플로우는 사용자가 여전히 실패를 보고했으므로 추가 확인 필요
- Publisher Lite가 생성한 활동보고 Markdown의 문체/구조 품질 개선 필요
- 생성된 활동보고를 사람이 검토한 뒤 `draft: false`로 전환하는 운영 절차 확정 필요
- `main`에는 Union Publisher Lite가 아직 병합되지 않았을 수 있음

## 7. 알려진 문제와 주의사항

Publisher Lite:

- 반드시 아래 주소로 열어야 함.

```text
http://localhost:4177
```

- `localhost`만 입력하거나 URL에 `?file=...`을 직접 넣는 방식은 지원하지 않음
- 파일은 화면의 파일 선택 버튼으로 선택해야 함
- 버튼이 반응하지 않으면 브라우저 캐시가 오래된 JS를 잡았을 수 있음. `Ctrl + F5`로 강력 새로고침 필요
- 4177 포트 충돌 시 기존 Node 프로세스를 종료하거나 이미 열린 `http://localhost:4177`을 사용
- 원문 URL은 선택값. Notion 공개 게시 URL 또는 네이버 카페 원문 글 URL을 넣는 것을 권장
- 원문 URL을 비우면 검증 결과에 안내 메시지가 뜰 수 있으나 변환 실패는 아님
- Notion ZIP 안에 다시 ZIP이 들어 있는 구조는 처리하도록 보완됨

GitHub:

- 로컬에 GitHub CLI(`gh`)가 없거나 GitHub 통합 권한이 부족하면 Draft PR 자동 생성이 실패할 수 있음
- 이 경우 브랜치를 push한 뒤 GitHub 웹에서 Draft PR을 직접 생성

README 정리:

- 기존 README의 “모든 작업은 develop에서 진행”은 현재 운영 방식과 완전히 맞지 않음. 일반 작업은 `develop`, 큰 기능은 `feature/*`에서 진행하는 방식으로 정리 필요
- Hero 이미지 교체 안내는 현재 실제 파일 `public/images/hero-union-participation.webp` 기준으로 맞춰야 함

## 8. 빌드·테스트·배포 방법

설치:

```bash
npm install
```

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

Publisher Lite:

```bash
npm run content:app
```

Publisher Lite 접속:

```text
http://localhost:4177
```

Publisher Lite 포트 충돌 정리:

```powershell
Get-NetTCPConnection -LocalPort 4177 |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```

배포:

1. 작업 브랜치에서 변경
2. `npm run check`
3. `npm run build`
4. PR 생성 및 리뷰
5. 승인 후 `main` 병합
6. `main` push 시 GitHub Actions가 GitHub Pages 배포

GitHub Pages workflow:

```text
.github/workflows/deploy.yml
```

## 9. 다음 작업자가 먼저 확인할 파일

1. `README.md`
2. `docs/CODEX_HANDOFF.md`
3. `docs/union-publisher-lite.md`
4. `scripts/content/server.mjs`
5. `tools/publisher/index.html`
6. `tools/publisher/app.js`
7. `tools/publisher/style.css`
8. `config/content/publisher.config.json`
9. `src/data/site.ts`
10. `src/components/Hero.astro`
11. `src/styles/global.css`
12. `src/content.config.ts`

## 10. 제외한 오래된 논의

다음 논의는 현재 기준 문서에서 제외합니다.

- HTML/CSS/JS 단일 정적 사이트 시절의 구현 세부
- 네이버 카페 자동 수집 프로토타입
- Apps Script 연동
- Google Sites 기반 홈페이지 구상
- PDF/DOCX 직접 가져오기
- OpenAI API 기반 자동 작성
- 검색, RSS, 태그 페이지, 관리자, 로그인, DB, CMS
