# CODEX_HANDOFF.md

이 문서는 새 Codex 스레드가 Altibase Union 홈페이지 작업을 바로 이어받기 위한 최신 상태 문서입니다.

## 현재 목적

Altibase Union 홈페이지는 GitHub Pages에서 운영되는 정적 홈페이지입니다. 노동조합 공식 포털 역할을 하며, 공지사항과 활동보고를 Markdown으로 관리합니다.

핵심 목표:

- Altibase 공식 홈페이지와 어울리는 Corporate Style 유지
- 공지사항과 활동보고를 Markdown 기반으로 관리
- DBMS, 로그인, 관리자 페이지 없이 무료 운영
- GPTS + Codex + GitHub 기반 콘텐츠 운영 흐름 구축

## 현재 주요 브랜치

```text
feature/union-publisher-lite
```

이 브랜치에는 Union Publisher Lite 기능이 구현되어 있습니다. `main` 병합 전 리뷰가 필요합니다.

## 현재 구현 상태

홈페이지:

- Home
- 공지사항 목록
- 공지사항 상세
- 활동보고 목록
- 활동보고 상세
- Quick Links
- 상담 및 제보 Hero CTA
- Footer
- Article Design System
- GitHub Pages 배포 workflow

콘텐츠:

- `content/notices/` 공지사항 Markdown
- `content/activities/` 활동보고 Markdown
- `draft: true` 비공개 처리
- `pinned: true` 우선 정렬

Union Publisher Lite:

- `npm run content:app` 로컬 관리 화면
- Markdown/Notion ZIP 업로드
- Notion 중첩 ZIP 처리
- 제목, 날짜, 요약, 태그, slug 자동 제안
- 활동보고 Markdown 초안 생성
- 원문/변환본 비교
- 콘텐츠 검증
- `npm run check`, `npm run build` 실행 버튼
- 콘텐츠 브랜치 생성과 Draft PR 준비 기능

## 최근 변경 사항

- Astro 기반 정적 사이트로 전환
- 공지사항/활동보고 Content Collections 구성
- Article Layout 컴포넌트 분리
- Hero 이미지를 조합원 참여 이미지로 교체
- Hero CTA를 상담 및 제보 링크로 정리
- Quick Links에 네이버 카페와 카카오 채널 반영
- Footer 외부 링크 최소화
- 파비콘을 심볼 로고 기반 큰 버전으로 갱신
- 2026년 5월 활동보고 추가
- Union Publisher Lite 구현
- Publisher Lite에서 Notion 중첩 ZIP 처리 보완
- Publisher Lite form reload 문제 수정
- Publisher Lite 포트 충돌 안내 추가

## 미완료 작업

- `feature/union-publisher-lite` PR 생성 및 리뷰
- Publisher Lite 실제 브라우저 업로드 플로우 최종 확인
- Publisher Lite가 생성하는 Markdown 문체와 구조 품질 개선
- 생성된 활동보고를 검토 후 `draft: false`로 공개하는 운영 절차 확정
- GitHub CLI 또는 GitHub 통합 권한 문제로 Draft PR 자동 생성 실패 가능성 대응

## 알려진 문제

Publisher Lite:

- 반드시 `http://localhost:4177`로 접속해야 합니다.
- `localhost`만 입력하거나 URL에 `?file=...`을 직접 넣는 방식은 지원하지 않습니다.
- 브라우저가 오래된 JS를 캐시하면 버튼이 반응하지 않을 수 있습니다. 이 경우 `Ctrl + F5`로 강력 새로고침합니다.
- 4177 포트가 이미 사용 중이면 기존 Node 프로세스를 종료하거나 이미 열린 앱을 사용합니다.
- 원문 URL은 선택값입니다. Notion 공개 게시 URL 또는 네이버 카페 원문 글 URL을 넣는 것을 권장합니다.
- 원문 URL을 비우면 검증 결과에 안내 메시지가 나올 수 있으나 변환 실패는 아닙니다.

## 다음 작업자가 먼저 볼 파일

1. `AGENTS.md`
2. `README.md`
3. `docs/CODEX_HANDOFF.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/CONTENT_GUIDE.md`
6. `docs/DECISIONS.md`
7. `scripts/content/server.mjs`
8. `tools/publisher/index.html`
9. `tools/publisher/app.js`
10. `tools/publisher/style.css`
11. `config/content/publisher.config.json`
12. `src/data/site.ts`

## 새 스레드 시작 문장 예시

```text
이 저장소의 AGENTS.md와 docs/CODEX_HANDOFF.md를 먼저 읽고,
feature/union-publisher-lite 브랜치에서 Publisher Lite 업로드 플로우를 이어서 점검해줘.
```
