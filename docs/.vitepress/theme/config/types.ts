import type { PermalinkOption} from "vitepress-plugin-link";
import type { SidebarOption } from "vitepress-plugin-sidebar-depth";
import type { CatalogueOption } from "vitepress-plugin-catalogue";
import type { DocAnalysisOption } from "vitepress-plugin-doc-analysis";
// @ts-ignore
import type { AutoFrontmatterOption } from "vitepress-plugin-auto-frontmatter";
import type { ImageViewerProps, PaginationProps } from "element-plus";
import type { ContainerLabel, ContainerOption } from "../markdown/plugins/container";
import type { Ref } from "vue";

export interface TkThemeConfig {

  /**
   * 文章列表配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.post.[key]
   */
  post?: Post;
  /**
   * 首页 Post 文章列表的分页配置，完全是 ElPagination 的 props，支持在首页文档 index.md 的 frontmatter 配置，格式为 tk.page.[key]
   */
  page?: Partial<PaginationProps>;

  /**
   * 精选文章卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.topArticle.[key]
   */
  topArticle?: TopArticle;
  /**
   * 分类卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.category.[key]
   */
  category?: Category;
  /**
   * 标签卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.tag.[key]
   */
  tag?: Tag;

  /**
   * 站点信息卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.docAnalysis.[key]
   */
  webSiteInfo?: DocAnalysis;
  /**
   * 社交信息配置
   */
  social?: Social[];
  /**
   * 页脚配置
   */
  footerInfo?: FooterInfo;
  /**
   * 文章信息配置，支持在 frontmatter 配置，如果在首页（index.md），格式为 tk.article.[key]，如果在文章页（非 index.md），格式为 article.[key]
   */
  article?: Article;
  /**
   * 面包屑配置，支持在文章页的 frontmatter 配置 breadcrumb.[key]
   */
  breadcrumb?: Breadcrumb;


  /**
   * 内置 Vite 插件配置
   */
  vitePlugins?: Plugins;
  /**
   * markdown 插件列表，请不要在使用 vitepress.markdown.config 配置 md 插件，因为 config 是一个函数，vitepress 并没有做多个 config 合并，因此使用 vitepress.markdown.config 配置会覆盖主题内置 md 插件
   */
  markdownPlugins?: any[];

  /**
   * 内置 markdown 容器的 Label 配置
   */
  containerLabel?: ContainerLabel;

  /**
   * 自定义 markdown 容器配置
   */
  markdownContainers?: ContainerOption[];
}



export interface Post {
  /**
   * 文章摘要位置
   *
   * @default bottom
   */
  excerptPosition?: "top" | "bottom";
  /**
   * 是否显示更多按钮
   *
   * @default true
   */
  showMore?: boolean;
  /**
   * 更多按钮文字
   *
   * @default '阅读全文 >'
   */
  moreLabel?: string;
  /**
   * 文章封面图模式
   *
   * @default 'default'
   */
  coverImgMode?: "default" | "full";
  /**
   * 是否在摘要位置显示文章部分文字，当为 true 且不使用 frontmatter.describe 和 <!-- more --> 时，会自动截取前 400 个字符作为摘要
   *
   * @default false
   */
  showCapture?: boolean;
  /**
   * 首页的图片查看器配置，完全是 ElImageViewer 的 props
   */
  imageViewer?: Partial<ImageViewerProps>;
}

export interface Blogger {
  /**
   * 博主昵称
   */
  name: string;
  /**
   * 博主头像
   */
  avatar: string;
  /**
   * 博主签名
   */
  slogan?: string;
  /**
   * 头像风格：radius 为圆形头像，可支持鼠标悬停旋转，full 为方形头像
   *
   * @default 'full'
   */
  avatarStyle?: "radius" | "full";
}

export interface TopArticle {
  /**
   * 是否启用精选文章卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 首页卡片标题
   *
   * @default '${svg}精选文章'
   */
  title?: string | ((svg: string) => string);
  /**
   * 一页显示的数量
   *
   * @default 5
   */
  limit?: number;
  /**
   * 是否自动翻页
   *
   * @default false
   */
  autoPage?: boolean;
  /**
   * 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
   *
   * @default 4000 (4秒)
   */
  pageSpeed?: number;
}

export interface Category {
  /**
   * 是否启用分类卡片
   *
   * @default true
   */
  enable?: boolean;
  /**
   * 分类页访问地址
   *
   * @default '/categories'
   */
  path?: string;
  /**
   * 分类页卡片标题
   *
   * @default '${svg}全部分类'
   */
  pageTitle?: string | ((svg: string) => string);
  /**
   * 首页卡片标题
   *
   * @default '${svg}文章分类'
   */
  homeTitle?: string | ((svg: string) => string);
  /**
   * 一页显示的数量
   *
   * @default 5
   */
  limit?: number;
  /**
   * 是否自动翻页
   *
   * @default false
   */
  autoPage?: boolean;
  /**
   * 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
   *
   * @default 4000 (4秒)
   */
  pageSpeed?: number;
}

export interface Tag {
  /**
   * 是否启用标签卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 标签页访问地址
   *
   * @default '/tags'
   */
  path?: string;
  /**
   * 标签页页卡片标题
   *
   * @default '${svg}全部标签'
   */
  pageTitle?: string | ((svg: string) => string);
  /**
   * 首页卡片标题
   *
   * @default '${svg}热门标签'
   */
  homeTitle?: string | ((svg: string) => string);
  /**
   * 一页显示的数量
   *
   * @default 21
   */
  limit?: number;
  /**
   * 是否自动翻页
   *
   * @default false
   */
  autoPage?: boolean;
  /**
   * 翻页间隔时间，单位：毫秒。autoPage 为 true 时生效
   *
   * @default 4000 (4秒)
   */
  pageSpeed?: number;
  /**
   * 自定义 tag 的背景颜色，默认取 theme.bgColor
   */
  bgColor?: string[];
}


export interface DocAnalysis {
  /**
   * 是否启用站点信息卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 首页卡片标题
   *
   * @default '${svg}站点信息'
   */
  title?: string | ((svg: string) => string);
  /**
   * 项目创建时间
   */
  createTime?: string;
  /**
   * 是否开启首页的访问量和排名统计
   *
   * @default true
   */
  siteView?: boolean;
  /**
   * 是否开启文章页的浏览量统计
   *
   * @default true
   */
  pageView?: boolean;
  /**
   * 是否开启文章页的字数统计
   *
   * @default true
   */
  wordCount?: boolean;
  /**
   * 是否开启文章页的阅读时长统计
   *
   * @default true
   */
  readingTime?: boolean;
  /**
   * 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 5 次后
   *
   * @default 2000 (2秒)
   */
  siteIteration?: number;
  /**
   * 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 5 次后
   *
   * @default 2000 (2秒)
   */
  pageIteration?: number;
  /**
   * 自定义现有信息
   * originValue 为计算前的数据，currentValue 为计算后的数据（加单位的数据），针对 lastActiveTime 这些需要判断 N 分、N 时、N 天的 key，originValue 为具体的时间，需要自行计算
   */
  //@ts-ignore
  overrideInfo?: (Omit<PartialKey<DocAnalysisInfo, "label">, "value"> & {
    value?: (
      originValue: string | number | Ref<string>,
      currentValue?: string | number | Ref<string>
    ) => string | Ref<string>;
  })[];
  /**
   * 自定义额外信息，类型和 overrideInfo 一样
   * @default []
   */
  appendInfo?: (Omit<DocAnalysisInfo, "key"> & { key: string })[];
}

export interface DocAnalysisInfo {
  /**
   * 站点信息唯一标识
   */
  key:
    | "totalPosts"
    | "weekAddNum"
    | "monthAddNum"
    | "runtime"
    | "totalWordCount"
    | "lastActiveTime"
    | "viewCount"
    | "visitCount"
    | string;
  /**
   * 站点信息标签
   */
  label: string;
  /**
   * 站点信息值的描述
   */
  value: string | Ref<string>;
  /**
   * 是否显示在站点信息
   * @default true
   */
  show?: boolean;
}

export interface Social {
  /**
   * 名称，如果作用在 a 标签，则鼠标悬停显示名称，否则在页面文字显示
   */
  name?: string;
  /**
   * 图标地址
   *
   * @remark 与 iconType 配合使用
   *
   * 1、iconType 为 svg 时，需要填写 svg 代码
   * 2、iconType 为 iconfont 时，需要填写 class 名
   * 3、iconType 为 img 时，需要填写图片链接
   * 4、iconType 为 component 时，需要传入 SVG 组件
   */
  icon?: string;
  /**
   * 图标类型
   *
   * @default 'svg'
   */
  iconType?: "svg" | "iconfont" | "img" | "component";
  /**
   * 链接，点击后跳转到新窗口，如果不设置，则无法点击
   */
  link?: string;
  /**
   * img 标签的 alt，当 iconType 为 img 时生效
   */
  imgAlt?: string;
}

export interface FooterInfo {
  /**
   * 页脚信息
   */
  message?: string | string[];
  /**
   * 主题版权配置
   */
  theme?: Social;
  /**
   * 博客版权配置
   */
  copyright?: Social & {
    /**
     * 创建年份
     */
    createYear: number | string;
    /**
     * 后缀
     */
    suffix: string;
  };
  /**
   * ICP 备案信息配置
   */
  icpRecord?: Social;
  /**
   * 网络安全备案信息配置
   */
  securityRecord?: Social;
  /**
   * 自定义 HTML 片段到 footer 最底部
   */
  customerHtml?: string;
}

export interface Article {
  /**
   * 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
   *
   * @default true
   */
  showIcon?: boolean;
  /**
   * 文章日期格式，首页和文章页解析日期时使用
   *
   * @default 'yyyy-MM-dd'
   */
  dateFormat?: "yyyy-MM-dd" | "yyyy-MM-dd hh:mm:ss" | ((date: string) => string);
  /**
   * 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
   * 如果 showInfo 为数组，则控制在哪里显示，如 ["post"] 只在首页的 Post 列表显示基本信息；如果为 boolean 值，则控制基本信息是否展示，如 false 则在首页和文章页都不显示基本信息
   *
   * @default true
   */
  showInfo?: boolean | ("post" | "article")[];
  /**
   * 是否展示作者
   *
   * @default true
   */
  showAuthor?: boolean;
  /**
   * 是否展示日期
   *
   * @default true
   */
  showDate?: boolean;
  /**
   * 是否展示分类
   *
   * @default false
   */
  showCategory?: boolean;
  /**
   * 是否展示标签
   *
   * @default false
   */
  showTag?: boolean;
  /**
   * 指定文章信息的传送位置，仅限在文章页生效，默认在文章页顶部
   */
  teleport?: {
    /**
     * 指定需要传送的元素选择器
     */
    selector?: string;
    /**
     * 指定传送到元素的位置，before 在元素前，after 在元素后
     *
     * @default 'after'
     */
    position?: "before" | "after";
    /**
     * 指定一个 class 名，如果传送的位置和其他元素太接近，可以利用 class 来修改 margin
     *
     * @default teleport
     */
    className?: string;
  };
}

export interface Breadcrumb {
  /**
   * 是否启用面包屑
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 面包屑最后一列是否显示当前文章的文件名
   *
   * @default false
   */
  showCurrentName?: boolean;
  /**
   * 面包屑分隔符
   *
   * @default '/'
   */
  separator?: string;
}


export interface Plugins {
  /**
   * 是否启用 sidebar 插件
   *
   * @default true
   */
  sidebar?: boolean;
  /**
   * sidebar 插件配置项
   */
  sidebarOption?: SidebarOption;
  /**
   * 是否启用 permalink 插件
   *
   * @default true
   */
  permalink?: boolean;
  /**
   *
  * permalinks 插件配置项
  */
  permalinkOption?: PermalinkOption ;
  /**
   * 是否启用 mdH1 插件
   *
   * @default true
   */
  mdH1?: boolean;
  /**
   * catalogues 插件配置项
   */
  catalogueOption?: CatalogueOption;
  /**
   * docAnalysis 插件配置项
   */
  docAnalysisOption?: DocAnalysisOption;
  /**
   * fileContentLoader 插件扫描 markdown 文档时，指定忽略路径，格式为 glob 表达式，如 test/**
   *
   * @default []
   */
  fileContentLoaderIgnore?: string[];
  /**
   * 是否启用 autoFrontmatter 插件
   *
   * @default false
   */
  autoFrontmatter?: boolean;
  /**
   * autoFrontmatter 插件配置项，并拓展出其他配置项
   *
   * permalinkPrefix 为自动生成 permalink 的固定前缀，如 pages、pages/demo。当禁用 permalink 插件后，不会自动生成 permalink
   * categories 为是否自动生成 categories
   *
   * @default '{ permalinkPrefix: "pages", categories: true }'
   */
  autoFrontmatterOption?: AutoFrontmatterOption & { permalinkPrefix?: string; categories?: boolean};
}
