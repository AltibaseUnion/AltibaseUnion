import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [index, config, extensions, previewCss, siteCss] = await Promise.all([
  read("public/admin/index.html"),
  read("public/admin/config.yml"),
  read("public/admin/editor-extensions.js"),
  read("public/admin/preview.css"),
  read("src/styles/global.css")
]);

const componentIds = [
  "text-color", "text-highlight", "text-underline", "centered-text", "callout-box",
  "formatted-table", "action-button", "article-divider", "collapsible-details", "body-image", "fenced-code"
];
const styleClasses = [
  "article-text-navy", "article-text-blue", "article-text-teal", "article-text-green",
  "article-text-amber", "article-text-red", "article-text-burgundy", "article-text-muted",
  "article-highlight-yellow", "article-highlight-blue", "article-highlight-green", "article-underline",
  "article-callout", "article-table-wrap", "article-button", "article-divider", "article-details", "article-figure"
];
const errors = [];

if (!/decap-cms@\d+\.\d+\.\d+\/dist\/decap-cms\.js/.test(index)) errors.push("Decap CMS 버전이 고정되어 있지 않습니다.");
if (!index.includes("./editor-extensions.js") || !index.includes("./editor-toolbar.css")) errors.push("에디터 확장 리소스가 index.html에 연결되지 않았습니다.");
for (const id of componentIds) {
  if (!extensions.includes(`id: "${id}"`)) errors.push(`에디터 컴포넌트 등록 누락: ${id}`);
  const occurrences = config.split(id).length - 1;
  if (occurrences < 2) errors.push(`공지·활동보고 editor_components 설정 누락: ${id}`);
}
for (const className of styleClasses) {
  if (!previewCss.includes(`.${className}`)) errors.push(`CMS 미리보기 CSS 누락: ${className}`);
  if (!siteCss.includes(`.${className}`)) errors.push(`운영 상세 CSS 누락: ${className}`);
}
if ((config.match(/sanitize_preview: true/g) || []).length < 2) errors.push("본문 미리보기 보안 설정이 두 컬렉션에 모두 적용되지 않았습니다.");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("관리자 에디터 확장 설정 검증 완료");
