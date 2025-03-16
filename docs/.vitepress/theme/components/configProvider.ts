import { computed, defineComponent, h, InjectionKey, provide, Ref, unref, type Component } from "vue";
import { useAnchorScroll, useViewTransition } from "../hooks";
import type { Post } from "../post/types";
import { useData } from "vitepress";
import { emptyPost } from "../post/helper";

export const postsSymbol: InjectionKey<Post> = Symbol("posts");

/**
 * 创建 Layout 组件
 */
const createConfigProvider = (Layout: Component) => {
  return defineComponent({
    name: "ConfigProvider",
    setup(_, { slots }) {
      const { theme } = useUnrefData();

      // 往主题注入数据
      provide(postsSymbol, theme.posts || emptyPost);

      useAnchorScroll().startWatch();
      useViewTransition();

      return () => h(Layout, null, slots);
    },
  });
};

export const configProvider = (Layout: Component) => {
  return createConfigProvider(Layout);
};

/**
 * 返回非响应式的 useDate() 对象
 */
export const useUnrefData = () => {
  const { theme, frontmatter, site, page } = useData();
  return { theme: unref(theme), frontmatter: unref(frontmatter), site: unref(site), page: unref(page) };
};

/**
 * 返回全部 Posts 数据
 */
export const useAllPosts = (): Post => {
  const { theme } = useData();
  const posts = unref(theme).posts;

  if (!posts) return emptyPost;

  return posts;
};

/**
 * 返回 Posts 数据，当处于国际化环境时，返回对应语言的 Posts 数据，否则返回全部 Posts 数据
 */
export const usePosts = (): Ref<Post> => {
  const { localeIndex } = useData();
  const posts = useAllPosts();

  // 兼容国际化功能，先从多语言下获取 posts 数据，获取不到说明没有使用多语言功能，则获取所有 posts 数据。因为多语言可以随时切换，因此使用 computed
  return computed(() => posts.locales?.[unref(localeIndex)] || posts);
};

/**
 * 是否为首页
 */
export const isHomePage = () => {
  const { frontmatter } = useData();
  return !isCategoriesPage() && !isTagsPage() && unref(frontmatter).layout === "home";
};

/**
 * 是否为分类页
 */
export const isCategoriesPage = () => {
  const { frontmatter } = useData();
  return unref(frontmatter).categoriesPage;
};
/**
 * 是否为标签页
 */
export const isTagsPage = () => {
  const { frontmatter } = useData();
  return unref(frontmatter).tagsPage;
};

/**
 * 是否为归档页
 */
export const isArchivesPage = () => {
  const { frontmatter } = useData();
  return unref(frontmatter).archivesPage;
};

/**
 * 是否为目录页
 */
export const isCataloguePage = () => {
  const { frontmatter } = useData();
  return unref(frontmatter).catalogue;
};

/**
 * 获取默认背景色
 */
export const getBgColor = () => {
  const { theme, frontmatter } = useData();
  return (
    unref(frontmatter).frontmatter ||
    unref(theme).bgColor || [
      "#e74c3c",
      "#409EFF",
      "#DAA96E",
      "#0C819F",
      "#27ae60",
      "#ff5c93",
      "#fd726d",
      "#f39c12",
      "#9b59b6",
    ]
  );
};
