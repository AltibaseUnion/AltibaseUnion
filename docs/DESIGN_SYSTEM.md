# DESIGN_SYSTEM.md

이 문서는 Altibase Union 홈페이지의 디자인 기준입니다.

## 디자인 철학

핵심 키워드:

- Corporate
- Clean
- Trust
- Readability
- Simplicity

홈페이지는 노동운동 단체의 강한 투쟁 이미지보다, IT 기업과 조화를 이루는 공식 포털의 신뢰감을 우선합니다.

## 색상

기본 색상:

```css
--union-navy: #0F2747;
--union-blue: #174EA6;
--union-bg: #F6F8FC;
--union-surface: #FFFFFF;
--union-ink: #182233;
--union-muted: #667085;
--union-border: #D9E2EF;
--union-accent: #FFB21A;
```

사용 원칙:

- Navy는 Header, Footer, Hero overlay, 주요 텍스트 강조에 사용
- Blue는 링크, 버튼, 카드 hover, accent border에 사용
- Background는 `#F6F8FC` 중심
- Accent는 아이콘이나 작은 강조에만 제한적으로 사용

## Typography

기본 폰트:

```css
-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", "Apple SD Gothic Neo", Arial, sans-serif
```

원칙:

- 제목은 명확하고 굵게
- 본문은 과하게 작지 않게
- 메타 정보는 작고 차분하게
- 긴 문단은 line-height를 충분히 확보

Article 본문 권장:

- font-size: 18px
- line-height: 1.8 이상
- max-width: 720px ~ 760px

## Spacing

권장 기준:

- Section padding: 44px ~ 64px
- Card padding: 20px ~ 26px
- Card gap: 12px ~ 20px
- Button min-height: 40px 이상
- Mobile section padding: 30px ~ 40px

## Border Radius

기본:

```css
--radius: 8px;
--radius-lg: 10px;
```

원칙:

- 카드 radius는 8px 전후
- Hero나 full-width 영역을 카드처럼 과하게 감싸지 않음
- nested card는 피함

## Shadow

기본:

```css
--shadow: 0 12px 28px rgba(15, 39, 71, 0.08);
--shadow-soft: 0 8px 22px rgba(15, 39, 71, 0.07);
```

원칙:

- Shadow는 미세하게 사용
- Hover 시 shadow를 약간만 증가
- 과한 elevation, popup처럼 보이는 CTA는 피함

## Hero

현재 Hero 이미지:

```text
public/images/hero-union-participation.webp
```

원칙:

- 참여, 소통, 공동결정 이미지를 전달
- 과도하게 기업 홍보물처럼 보이지 않게 함
- 텍스트 가독성을 위해 navy overlay 사용
- Hero 높이는 과하게 길지 않게 유지
- 상담 및 제보 CTA는 Hero 안의 보조 CTA로 표시

현재 Hero 문구:

```text
Altibase Union
함께 만드는 더 나은 내일, 알티베이스 노동조합
```

## Cards

공지사항/활동보고 카드 원칙:

- 흰색 배경
- 연한 border
- 왼쪽 accent border
- hover 시 border와 shadow 변화
- 제목은 semi-bold 이상
- 날짜와 메타 정보는 작고 차분하게
- 카드 전체가 클릭 가능한 영역처럼 보여야 함

## Quick Links

원칙:

- 모든 항목에 아이콘 표시
- 아이콘 크기와 배경 통일
- 항목명은 짧고 명확하게
- 외부 링크는 새 창으로 열기

현재 주요 항목:

- 화섬식품노동조합 홈페이지
- 화섬식품노조 YouTube
- 법률 상담
- 노사협의회 안건 수집
- 네이버 카페
- 카카오 채널

## Article Layout

상세 페이지 구성:

1. Breadcrumb
2. Category Badge
3. Title
4. Meta
5. Summary
6. Optional Hero Image
7. Markdown Body
8. Tags
9. 목록으로
10. 이전글/다음글 카드

Markdown Typography:

- H2는 section 구분이 분명해야 함
- H3는 하위 섹션 구분
- table, blockquote, list, code block은 공통 스타일 적용
- 이미지에는 radius와 soft shadow 적용

## 금지 또는 지양

- 과도한 투쟁 이미지
- 장식적 gradient/orb 남용
- 과한 애니메이션
- 보라색 중심 팔레트
- 불필요한 nested card
- 전체 섹션을 floating card처럼 만드는 구조
- Markdown 본문에 불필요한 HTML 삽입
