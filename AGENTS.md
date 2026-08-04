# AGENTS.md

이 문서는 Codex가 Altibase Union 홈페이지 저장소에서 작업할 때 반드시 지켜야 하는 규칙입니다.

## 기본 원칙

- 이 프로젝트는 Altibase 공식 홈페이지와 톤을 맞춘 노동조합 공식 홈페이지이다.
- 기능 추가보다 안정성, 유지보수성, 콘텐츠 운영 편의성을 우선한다.
- DB, 로그인, 관리자 페이지, CMS를 도입하지 않는다.
- Markdown과 GitHub 저장소를 콘텐츠 원본으로 유지한다.
- 사용자 승인 전에는 `main`에 병합하지 않는다.

## 브랜치 규칙

- `main`: 운영 배포 브랜치
- `develop`: 일반 개발 통합 브랜치
- `feature/*`: 기능 단위 작업 브랜치

큰 기능이나 실험성 작업은 반드시 `feature/*`에서 진행한다.

권장 흐름:

```bash
git switch -c feature/example-work
npm install
npm run check
npm run build
git add .
git commit -m "작업 내용"
git push origin feature/example-work
```

## 작업 전 확인

작업 시작 시 다음을 확인한다.

```bash
git status
git branch --show-current
```

다음 파일을 우선 읽는다.

- `README.md`
- `docs/CODEX_HANDOFF.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/CONTENT_GUIDE.md`
- `docs/DECISIONS.md`

## 코드 작업 규칙

- 기존 Astro 구조와 Content Collections 구조를 유지한다.
- Bootstrap 5 CDN과 Lucide Icons CDN 사용 방식을 유지한다.
- 불필요한 새 의존성을 추가하지 않는다.
- 콘텐츠 데이터 구조를 임의로 바꾸지 않는다.
- 링크 URL은 사용자가 명시하지 않는 한 임의 변경하지 않는다.
- 기존 사용자 변경사항을 되돌리지 않는다.
- 문서와 코드가 충돌하면 함께 정리한다.

## 콘텐츠 작업 규칙

- 공지사항은 `content/notices/`에 작성한다.
- 활동보고는 `content/activities/`에 작성한다.
- 새 초안은 기본적으로 `draft: true`로 만든다.
- 공개 전 사람이 검토한 뒤 `draft: false`로 변경한다.
- 원문의 날짜, 인명, 금액, 사건 결과를 임의 변경하지 않는다.
- 홍보성 표현보다 공식 기록 문체를 우선한다.

## 디자인 작업 규칙

- Corporate Style을 유지한다.
- 과도한 투쟁 이미지, 과한 애니메이션, 강한 색상 대비를 피한다.
- 색상, 여백, 카드 스타일은 `docs/DESIGN_SYSTEM.md`를 따른다.
- Article 상세 페이지는 기업 뉴스룸과 문서형 가독성을 기준으로 한다.

## 검증 규칙

코드 또는 콘텐츠 구조를 변경하면 가능하면 다음을 실행한다.

```bash
npm run check
npm run build
```

Publisher Lite를 수정하면 다음도 확인한다.

```bash
npm run content:app
```

접속 주소:

```text
http://localhost:4177
```

## 배포 규칙

- `main` push 시 GitHub Actions가 GitHub Pages에 배포한다.
- `main` 병합 전 `npm run build` 성공을 확인한다.
- 운영 배포 후 사이트 URL에서 주요 화면을 확인한다.

운영 사이트:

```text
https://altibaseunion.github.io/AltibaseUnion/
```
