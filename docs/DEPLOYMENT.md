# DEPLOYMENT.md

이 문서는 Altibase Union 홈페이지의 빌드, 테스트, 배포 절차입니다.

## 운영 사이트

```text
https://altibaseunion.github.io/AltibaseUnion/
```

## 배포 방식

GitHub Actions가 `main` 브랜치 push를 감지하여 Astro 정적 사이트를 빌드하고 GitHub Pages에 배포합니다.

Workflow:

```text
.github/workflows/deploy.yml
```

Astro base path:

```text
/AltibaseUnion
```

## 브랜치

- `main`: 운영 배포
- `develop`: 일반 개발 통합
- `feature/*`: 기능 작업

사용자 승인 전 `main` 병합 금지.

## 로컬 준비

```bash
npm install
```

Node.js 22 이상을 권장합니다.

## 로컬 실행

개발 서버:

```bash
npm run dev
```

접속:

```text
http://localhost:4321/AltibaseUnion/
```

## 검증

Content Collections 동기화:

```bash
npm run check
```

정적 빌드:

```bash
npm run build
```

빌드 결과 미리보기:

```bash
npm run preview
```

## Publisher Lite 실행

```bash
npm run content:app
```

접속:

```text
http://localhost:4177
```

포트 충돌 정리:

```powershell
Get-NetTCPConnection -LocalPort 4177 |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```

## 운영 반영 절차

1. 작업 브랜치 생성

```bash
git switch -c feature/example-work
```

2. 작업 수행
3. 검증

```bash
npm run check
npm run build
```

4. 커밋

```bash
git status
git add .
git commit -m "작업 내용"
```

5. 원격 브랜치 push

```bash
git push origin feature/example-work
```

6. Pull Request 생성
7. 리뷰 및 승인
8. `main` 병합
9. GitHub Actions 배포 확인
10. 운영 URL 확인

## 배포 확인 항목

- Home 정상 표시
- Hero 이미지와 CTA 정상 표시
- 공지사항 목록 표시
- 활동보고 목록 표시
- 공지사항 상세 페이지 이동
- 활동보고 상세 페이지 이동
- Quick Links 새 창 열림
- 상담 및 제보 링크 정상
- 파비콘 정상 표시
- 모바일 레이아웃 깨짐 없음

## 알려진 주의사항

- GitHub 기본 Pages build 작업이 별도로 실패처럼 보일 수 있다. 실제 배포는 `Deploy Astro site to GitHub Pages` workflow 성공 여부를 기준으로 본다.
- `dist/`는 빌드 산출물이므로 Git에 커밋하지 않는다.
- `imports/`는 Publisher Lite 임시 업로드 폴더이므로 Git에 커밋하지 않는다.
- `main`에는 직접 commit하지 않는다.
