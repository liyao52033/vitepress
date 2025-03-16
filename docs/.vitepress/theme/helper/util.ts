/**
 * From vitepress
 */
export const withBase = (base: string, path?: string) => {
  if (!path) return;
  return /^(?:[a-z]+:|\/\/)/i.test(path) || !path.startsWith("/") ? path : `${base}${path}`.replace(/\/+/g, "/");
};
