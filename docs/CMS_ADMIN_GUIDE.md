# Decap CMS 관리자 안내

## 1. 접속과 로그인

운영 관리자 주소는 `https://altibaseunion.github.io/AltibaseUnion/admin/`입니다. GitHub 로그인을 누르고 저장소 쓰기 권한이 있는 GitHub 계정으로 승인합니다. 로그인 전에 아래 OAuth 설정을 완료해야 합니다.

## 2. 공지 작성

`공지사항` → `새 공지`에서 제목, 요약, 게시일, 영문 URL 이름, 태그를 입력합니다. 중요 공지는 `중요 공지`를 켭니다. 새 글은 `초안`이 기본값입니다. URL 이름은 `wage-agreement`처럼 영문 소문자·숫자·하이픈만 사용합니다. 저장 파일은 `YYYY-MM-DD-slug.md` 형식입니다.

## 3. 활동보고 작성

`월별 활동보고` → `새 활동보고`에서 활동 기간, 연도, 월을 함께 입력합니다. `URL 및 파일명`은 `2026-08`처럼 반드시 `YYYY-MM`으로 입력합니다. Decap의 날짜 template tag는 게시일을 기준으로 계산되어 별도 연·월 필드와 어긋날 수 있으므로 사용하지 않습니다.

## 4. 이미지와 첨부파일

대표 이미지와 본문 이미지는 각 컬렉션의 업로드 폴더에 저장됩니다. 공지는 `public/images/uploads/notices/`, 활동보고는 `public/images/uploads/activity-reports/`입니다. 공지 첨부파일은 표시 이름과 파일을 한 쌍으로 추가하며 `public/files/notices/`에 저장됩니다. 이미지 대체텍스트를 비우면 상세 페이지에서 글 제목을 사용합니다.

## 5. 초안·검토·게시

1. 글의 `초안`을 켠 채 저장합니다.
2. `워크플로`에서 `초안` → `검토 준비`로 이동합니다.
3. 내용과 미리보기를 검토하고 실제 공개할 때 `초안`을 끕니다.
4. `게시`하면 Decap이 CMS 브랜치와 Pull Request를 squash merge하여 `main`에 반영합니다.
5. `main` push로 기존 GitHub Actions Pages 배포가 시작됩니다.

`draft: true`인 글은 production 목록·상세·홈 최근 소식에서 제외됩니다. 워크플로 상태와 frontmatter의 `초안`은 별도이므로 게시 전에 둘 다 확인하십시오.

## 6. 수정과 삭제

목록에서 기존 게시물을 열어 수정한 뒤 같은 검토·게시 절차를 사용합니다. 기존 글의 URL 이름은 외부 링크를 깨뜨릴 수 있으므로 변경하지 않습니다. 삭제도 Git 커밋으로 반영되며 게시 후 운영 URL에서 사라집니다. 삭제 전에 첨부파일을 다른 글에서 사용 중인지 확인하십시오. CMS에서 글을 삭제해도 공유 업로드 파일은 자동 정리되지 않을 수 있습니다.

## 7. 배포 확인

GitHub 저장소의 `Actions` → `Deploy Astro site to GitHub Pages`에서 build/deploy 성공을 확인한 다음 홈페이지, 공지 목록, 활동보고 목록과 해당 상세 URL을 확인합니다.

## 8. GitHub OAuth App 설정

GitHub `Settings` → `Developer settings` → `OAuth Apps`에서 앱을 만듭니다.

- Homepage URL: `https://altibaseunion.github.io/AltibaseUnion/`
- Authorization callback URL: `https://YOUR_WORKER_DOMAIN/callback`

발급된 Client ID와 Client Secret은 저장소에 넣지 않습니다.

## 9. Cloudflare Worker 설정

`workers/cms-oauth/`는 홈페이지 빌드와 분리된 최소 OAuth proxy 예제입니다. Cloudflare 계정에서 별도로 배포합니다.

```bash
cd workers/cms-oauth
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler deploy
```

필요한 값은 `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ALLOWED_ORIGIN`입니다. 운영 `ALLOWED_ORIGIN`은 `https://altibaseunion.github.io`입니다. 운영 OAuth Worker 주소는 `https://altibase-union-cms-oauth.altibaseunion.workers.dev`이며 `base_url` 끝에는 `/auth`를 붙이지 않습니다. 로컬 개발은 `.dev.vars.example`을 `.dev.vars`로 복사해 값을 채우며 `.dev.vars`는 Git에서 제외됩니다.

Decap GitHub backend가 요구하는 proxy 경로는 `/auth`와 `/callback`입니다. Worker는 OAuth secret을 Cloudflare secret으로만 읽고 저장소나 브라우저에 노출하지 않습니다.

## 10. 문제 해결

- 로그인 팝업이 멈춤: `base_url` placeholder 교체 여부, OAuth callback URL의 `/callback`, Worker secret과 `ALLOWED_ORIGIN`을 확인합니다.
- `Not Found` 또는 CORS 오류: Worker URL에 경로가 중복되지 않았는지, `auth_endpoint: auth`인지 확인합니다.
- 이미지가 깨짐: frontmatter URL이 `/AltibaseUnion/images/...`인지 확인합니다. `public_folder`에 base를 한 번만 포함합니다.
- 첨부파일이 열리지 않음: 파일이 `public/files/notices/`에 커밋됐고 URL이 `/AltibaseUnion/files/notices/...`인지 확인합니다.
- 게시했는데 글이 안 보임: `draft`가 `false`인지, GitHub Actions가 성공했는지 확인합니다.
- 배포 실패: Actions 빌드 로그와 frontmatter 필수 필드(요약, 날짜, slug, 활동보고 연·월)를 확인합니다.

로컬에서 CMS UI만 확인할 때는 `npx decap-server`와 `local_backend: true`를 별도 임시 설정으로 사용할 수 있지만 운영 `config.yml`에는 인증 우회 설정을 넣지 않습니다.

## 11. 초안과 게시 상태

콘텐츠 공개 여부는 Decap CMS의 편집 워크플로로 관리합니다. 별도의 `초안` 스위치는 관리자 화면에 표시하지 않습니다.

- `준비됨`과 `검토 준비` 상태의 콘텐츠는 CMS 작업 브랜치에만 저장되어 운영 홈페이지에 노출되지 않습니다.
- `게시`를 실행하면 CMS가 frontmatter의 `draft` 값을 자동으로 `false`로 바꾼 뒤 `main`에 반영합니다.
- 기존 콘텐츠에 `draft: true`가 남아 있더라도 다시 게시하면 자동으로 공개 상태로 정리됩니다.
