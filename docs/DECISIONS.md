# DECISIONS.md

이 문서는 Altibase Union 홈페이지의 중요한 기술·디자인 결정과 이유를 기록합니다.

## 1. Astro 기반 정적 사이트 사용

결정:

- Astro를 사용한다.
- GitHub Pages에 정적 사이트로 배포한다.

이유:

- 무료 운영 가능
- DBMS 없이 유지 가능
- Markdown Content Collections와 잘 맞음
- GitHub Actions로 자동 배포 가능
- 향후 게시물이 늘어나도 구조화 관리 가능

## 2. Markdown을 콘텐츠 원본으로 사용

결정:

- 공지사항과 활동보고는 Markdown 파일로 관리한다.

이유:

- Git으로 변경 이력을 추적할 수 있음
- Codex와 GPTS 기반 운영 흐름에 적합
- 별도 CMS나 DB가 필요 없음
- PR 리뷰를 통해 공개 전 검토 가능

## 3. Content Collections 사용

결정:

- `content/notices`
- `content/activities`

두 컬렉션만 사용한다.

이유:

- 정보 구조가 단순함
- 공지사항과 활동보고의 운영 목적이 명확함
- 태그 페이지, 카테고리 페이지, 검색은 현재 범위에서 제외

## 4. `draft` 기반 공개 제어

결정:

- 새 게시물은 `draft: true`로 생성한다.
- 검토 완료 후 `draft: false`로 변경한다.

이유:

- 공개 전 검토 흐름을 보장
- 잘못된 내용이 운영 사이트에 바로 노출되는 것을 방지
- Publisher Lite 초안 생성과 잘 맞음

## 5. Corporate Style 유지

결정:

- 디자인은 Altibase 공식 홈페이지와 어울리는 Corporate Style을 따른다.

이유:

- 노동조합 공식 포털로서 신뢰감과 안정감이 중요
- 과도한 투쟁 이미지보다 조합원 소통과 권익 보호 메시지가 적합
- 회사 공식 홈페이지와 함께 보아도 어색하지 않아야 함

## 6. Hero 이미지 방향

결정:

- Hero는 조합원 참여, 회의, 공동 의사결정 이미지를 사용한다.
- 현재 파일은 `public/images/hero-union-participation.webp`이다.
- 이전 이미지는 `public/images/hero-previous.png`로 백업한다.

이유:

- 조합의 참여성과 소통을 보여줌
- 기업 홍보물처럼 보이는 이미지를 피함
- 과도한 투쟁 이미지를 피하면서 노동조합 정체성을 표현

## 7. 상담 및 제보 CTA 배치

결정:

- 상담 및 제보는 Hero 내부 CTA로 노출한다.
- 상단 메뉴에서는 중복 노출하지 않는다.

이유:

- 중요한 행동을 첫 화면에서 찾기 쉽게 함
- 메뉴 구조를 단순하게 유지
- CTA가 팝업처럼 보이지 않도록 보조 링크 스타일로 정리

## 8. Quick Links 집중 관리

결정:

- 외부 링크는 `src/data/site.ts`의 `quickLinks` 배열에서 관리한다.
- Footer에는 외부 링크를 최소화한다.

이유:

- 링크 추가와 수정이 쉬움
- Footer가 복잡해지는 것을 방지
- 사용자에게 필요한 외부 채널을 한곳에서 제공

## 9. Union Publisher Lite 구현

결정:

- 로컬 관리 도구인 Union Publisher Lite를 저장소 안에 구현한다.
- 실행 명령은 `npm run content:app`이다.
- Electron, Tauri, CMS, OpenAI API는 사용하지 않는다.

이유:

- 운영자가 로컬에서 Notion Markdown/ZIP을 활동보고 초안으로 변환할 수 있음
- 별도 서버나 계정 체계가 필요 없음
- GitHub 저장소 기반 운영 흐름을 유지
- 작은 도구로 시작해 필요 시 확장 가능

## 10. Notion ZIP 지원

결정:

- Markdown 파일과 Notion ZIP을 지원한다.
- Notion ZIP 안에 다시 ZIP이 들어 있는 구조도 처리한다.

이유:

- 실제 Notion 내보내기 파일이 중첩 ZIP 구조로 생성될 수 있음
- 운영자가 압축을 수동으로 풀지 않고 바로 업로드할 수 있어야 함

## 11. 원문 URL은 선택값

결정:

- Publisher Lite의 원문 URL은 필수가 아니다.
- 가능한 경우 Notion 공개 URL 또는 네이버 카페 원문 게시글 URL을 기록한다.

이유:

- 초안 작성 단계에서는 원문 URL이 없을 수 있음
- 원문 추적성은 중요하지만 변환 자체를 막을 필요는 없음

## 12. 구현하지 않는 기능

현재 구현하지 않음:

- 검색
- RSS
- 태그 페이지
- 카테고리 페이지
- 로그인
- 관리자 페이지
- DB
- CMS
- 네이버 카페 자동 연동
- Apps Script
- OpenAI API 자동 작성
- 예약 게시
- 다중 사용자

이유:

- 현재 목표는 단순하고 안정적인 정적 홈페이지 운영
- 기능 확장보다 콘텐츠 관리와 공개 흐름 안정화가 우선
