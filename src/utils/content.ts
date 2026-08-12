export const getDescription = (data: { description?: string; summary?: string }) =>
  data.description ?? data.summary ?? "";

export const isImportant = (data: { important?: boolean; pinned?: boolean }) =>
  data.important ?? data.pinned ?? false;

export const getAssetUrl = (path?: string) => {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
};

export const getPostUrl = (collection: "notices" | "activities", slug: string) =>
  `${import.meta.env.BASE_URL}${collection}/${slug}/`;

export const getTagUrl = (tag: string) =>
  `${import.meta.env.BASE_URL}tags/${encodeURIComponent(tag)}/`;

export const getRelatedPosts = <T extends { id: string; data: { tags: string[]; date: Date } }>(currentPost: T, posts: T[], limit = 3) => {
  const currentTags = new Set(currentPost.data.tags);
  return posts.filter((post) => post.id !== currentPost.id)
    .map((post) => ({ post, score: post.data.tags.filter((tag) => currentTags.has(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit).map(({ post }) => post);
};
