// Prefix an internal path with the Astro base (e.g. "/website") so links keep
// working on GitHub project Pages. External URLs, anchors and protocol links
// pass through untouched.
export const withBase = (url: string): string => {
  if (!url) return url;
  if (
    url.startsWith("http") ||
    url.startsWith("#") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (!base) return url;
  return base + (url.startsWith("/") ? url : `/${url}`);
};
