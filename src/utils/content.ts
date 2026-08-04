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
