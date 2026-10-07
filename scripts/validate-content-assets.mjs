import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const contentRoot = join(root, "content");
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const collection of ["notices", "activities"]) {
  const misplaced = join(contentRoot, collection, "public");
  if (existsSync(misplaced) && walk(misplaced).length > 0) {
    errors.push(`${relative(root, misplaced)}: 이미지는 content가 아니라 저장소의 public 폴더에 저장해야 합니다.`);
  }
}

const markdownFiles = walk(contentRoot).filter((path) => path.endsWith(".md"));
const assetPattern = /(?:thumbnail:\s*["']?([^\r\n"']+)|!\[[^\]]*\]\((\/AltibaseUnion\/(?:images|files)\/[^\s)"']+))/g;

for (const file of markdownFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(assetPattern)) {
    const url = (match[1] || match[2] || "").trim();
    if (!url || /^(https?:)?\/\//.test(url)) continue;
    if (!url.startsWith("/AltibaseUnion/")) {
      errors.push(`${relative(root, file)}: 지원하지 않는 로컬 이미지 경로 ${url}`);
      continue;
    }
    const publicPath = join(root, "public", decodeURIComponent(url.slice("/AltibaseUnion/".length)));
    if (!existsSync(publicPath)) {
      errors.push(`${relative(root, file)}: 이미지 파일이 없습니다: ${relative(root, publicPath)}`);
    }
  }
}

if (errors.length) {
  console.error("콘텐츠 이미지 검증 실패:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log("콘텐츠 이미지 경로 검증 완료");
