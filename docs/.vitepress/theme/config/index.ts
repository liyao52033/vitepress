import { TkThemeConfig } from "./types";
import Permalink from "vitepress-plugin-link";
import Sidebar from "vitepress-plugin-sidebar-depth";
import MdH1 from "vitepress-plugin-md-h1";
import Catalogue from "vitepress-plugin-catalogue";
import DocAnalysis from "vitepress-plugin-doc-analysis";
import FileContentLoader, { FileContentLoaderOptions } from "vitepress-plugin-file-content-loader";
import AutoFrontmatter, { FileInfo } from "vitepress-plugin-setfrontmatter";
import { UserConfig } from "vitepress";
import { PluginOption } from "vite";
import { transformData, transformRaw } from "../post";
import { Post, TkContentData } from "../post/types";
import { codeArrowPlugin, imgCardPlugin, navCardPlugin, todoPlugin, shareCardPlugin } from "../markdown";
import { containerPlugins, createContainersThenUse } from "../markdown/plugins/container";
import { createCategory, createPermalink } from "../utils/addFrontmatter";

export default function tkThemeConfig(config: TkThemeConfig = { tkTheme: true }): UserConfig {
  const { vitePlugins, markdownPlugins = [], markdownContainers = [], containerLabel, ...tkThemeConfig } = config;
  const {
    sidebar=true,
    sidebarOption,
    permalink = true,
    permalinkOption,
    mdH1 = true,
    catalogueOption,
    docAnalysisOption = {},
    fileContentLoaderIgnore = [],
    autoFrontmatter = true,
    autoFrontmatterOption = {},
  } = vitePlugins || {};

  const plugins: PluginOption[] = [];
  const { tkTheme = true } = config;

  // 定义各插件扫描时忽略的目录
  const ignoreDir = {
    autoFrontmatter: ["**/@pages/**", ".vite-cache"],
    sidebar: ["@pages", "@fragment", ".vite-cache"],
    categories: ["@fragment", "articles", ".vite-cache"],
    docAnalysis: ["@pages", /目录页/, ".vite-cache"],
    fileContentLoader: ["**/components/**", "**/.vitepress/**", "**/public/**", "**/*目录页*/**", ".vite-cache"],
  };

  // 自动生成 frontmatter 插件
  if (autoFrontmatter) {
    const {
      pattern,
      globOptions = {},
      transform,
      permalinkPrefix = "pages",
      categories = true,
    } = autoFrontmatterOption;

    // 默认扫描全部 MD 文件
    if (!pattern) autoFrontmatterOption.pattern = "**/*.md";

    autoFrontmatterOption.globOptions = {
      ...autoFrontmatterOption.globOptions,
      ignore: [...ignoreDir.autoFrontmatter, ...(globOptions.ignore || [])],
    };

    // 自定义 frontmatter 内容，添加永久链接和分类
    autoFrontmatterOption.transform = (frontmatter, fileInfo: FileInfo) => {
      let transformResult = transform?.(frontmatter, fileInfo) || {};

     if ((permalink && !frontmatter.permalink) || !frontmatter.author) {
        transformResult = { ...transformResult, ...createPermalink(permalinkPrefix) };
      }
      if (categories && !frontmatter.categories) {
        transformResult = { ...transformResult, ...createCategory(fileInfo, ignoreDir.categories) };
      }

      return Object.keys(transformResult).length ? { ...frontmatter, ...transformResult } : undefined;
    };

    plugins.push(AutoFrontmatter(autoFrontmatterOption));
  }

  // 自动添加侧边栏插件
  if (sidebar) {
    sidebarOption.ignoreList = [...(sidebarOption?.ignoreList || []), ...ignoreDir.sidebar];
    plugins.push(Sidebar(sidebarOption));
  }

  // 自动生成永久链接插件
  if (permalink) {
    plugins.push(Permalink(permalinkOption));
  }
  // 自动给 MD 添加一级标题插件
  if (mdH1) plugins.push(MdH1());
  // 文档内容分析插件
  docAnalysisOption.ignoreList = [...(sidebarOption?.ignoreList || []), ...ignoreDir.docAnalysis];
  plugins.push(DocAnalysis(docAnalysisOption));

  // 主题强内置插件
  if (tkTheme) {
    // 目录页插件
    plugins.push(Catalogue(catalogueOption));

    const fileContentLoaderOptions: FileContentLoaderOptions<TkContentData, Post> = {
      pattern: ["**/*.md"],
      // 指定摘录格式
      excerpt: "<!-- more -->",
      includeSrc: true,
      transformData,
      transformRaw,
      themeConfigKey: "posts",
      globOptions: {
        ignore: [...ignoreDir.fileContentLoader, ...fileContentLoaderIgnore],
      },
    };

    // Post 数据处理插件
    plugins.push(FileContentLoader<TkContentData, Post>(fileContentLoaderOptions));
  }

  return {
    // 使用永久链接插件需要忽略死链提醒
    ignoreDeadLinks: true,
    vite: {
      plugins: plugins as any,
      // 解决项目启动后终端打印 Scss 的废弃警告：The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
      css: { preprocessorOptions: { scss: { api: "modern" } } },
      optimizeDeps: {
        include: ["element-plus", "@giscus/vue", "@waline/client"],
      },
    },
    markdown: {
      config: md => {

        md.use(containerPlugins, containerLabel);

        [imgCardPlugin, navCardPlugin, todoPlugin, shareCardPlugin, codeArrowPlugin].forEach(plugin => md.use(plugin, containerLabel));

        // 创建用户配置的自定义容器
        createContainersThenUse(md, markdownContainers);

        // 用户配置的 markdown 插件
        markdownPlugins.forEach(plugin => md.use(plugin));
      },
    },
    themeConfig: tkThemeConfig,
  };
}
