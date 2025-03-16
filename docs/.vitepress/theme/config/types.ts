import type { PermalinkOption} from "vitepress-plugin-link";
import type { SidebarOption } from "vitepress-plugin-sidebar-depth";
import type { CatalogueOption } from "vitepress-plugin-catalogue";
import type { DocAnalysisOption } from "vitepress-plugin-doc-analysis";
// @ts-ignore
import type { AutoFrontmatterOption } from "vitepress-plugin-auto-frontmatter";
import type { ImageViewerProps, PaginationProps } from "element-plus";
import type { Ref, VNode } from "vue";
import type { Route } from "vitepress";

export interface TkThemeConfig {
  /**
   * 是否启用主题，如果为 false，则不会主题的 99% 功能，只保留永久链接、锚点滚动、深色、浅色模式过渡动画这三个功能，支持在首页 index.md 的 frontmatter 配置 tk.tkTheme
   *
   * @default true
   */
  tkTheme?: boolean;
  /**
   * 是否启用主题的首页风格，如果为 false，则首页还原到 vitepress 的默认首页，其他功能不变，支持在首页 index.md 的 frontmatter 配置 tk.tkHome
   *
   * @default true
   */
  tkHome?: boolean;
  /**
   * 是否启用锚点滚动功能，即阅读文章时，自动将 h1 ~ h6 标题添加到地址栏 # 后面
   *
   * @default true
   */
  anchorScroll?: boolean;
  /**
   * 深色、浅色模式切换时是否开启过渡动画
   *
   * @default true
   */
  viewTransition?: boolean;
  /**
   * 是否使用新版代码块样式，如果为 false 则使用官方默认样式。新版代码块支持折叠
   *
   * @default true
   */
  codeBlock?: boolean;
  /**
   * 首页卡片的位置排序，当设置了 `homeCardSort` 但没有全部补全，则剩余内容默认按照 `homeCardSort` 的顺序进行排序，支持在首页 index.md 的 frontmatter 配置 tk.homeCardSort
   *
   * @default '["topArticle", "category", "tag", "friendLink", "docAnalysis"]'
   */
  homeCardSort?: ("topArticle" | "category" | "tag" | "friendLink" | "docAnalysis")[];
  /**
   * 主题背景色，用于精选文章卡片的 top + sticky 功能和标签卡片的背景色，支持在首页 index.md 的 frontmatter 配置 tk.bgColor
   *
   * @default '["#e74c3c", "#409EFF", "#DAA96E", "#0C819F", "#27ae60", "#ff5c93", "#fd726d", "#f39c12", "#9b59b6"]'
   */
  bgColor?: string[];
  /**
   * 文章页的样式风格，default 为 Vitepress 原生风格，card 为单卡片风格，segment 为片段卡片风格，card-nav 和 segment-nav 会额外修改导航栏样式
   *
   * 支持在文章页的 frontmatter 配置 pageStyle，因此可以针对不同的文章页开启不同的样式风格
   *
   * @default 'default'
   */
  pageStyle?: "default" | "card" | "segment" | "card-nav" | "segment-nav";
  /**
   *  body 背景大图配置
   */
  bodyBgImg?: BodyBgImg;
  /**
   * 右下角的主题设置配置
   */
  themeSetting?: ThemeSetting;
  /**
   * 文章默认的作者信息，支持在文章页的 frontmatter 配置 author.[key]
   */
  author?: Author;
  /**
   * 首页 Banner 配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.banner.[key]
   */
  banner?: Banner;
  /**
   * 壁纸模式，在首页最顶部进入全屏后开启，仅当 (banner.bgStyle = 'bigImg' && banner.imgSrc 不存在) 或 bodyBgImg.imgSrc 存在才生效，支持在首页 index.md 的 frontmatter 配置，格式为 tk.wallpaper.[key]。
   */
  wallpaper?: Wallpaper;
  /**
   * 文章列表配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.post.[key]
   */
  post?: Post;
  /**
   * 首页 Post 文章列表的分页配置，完全是 ElPagination 的 props，支持在首页文档 index.md 的 frontmatter 配置，格式为 tk.page.[key]
   */
  page?: Partial<PaginationProps>;
  /**
   * 博主信息，显示在首页左边第一个卡片，支持在首页 `index.md` 的 `frontmatter` 配置，格式为 `tk.blogger.[key]`
   */
  blogger?: Blogger;
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
   * 友情链接卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.friendLink.[key]
   */
  friendLink?: FriendLink;
  /**
   * 站点信息卡片配置，支持在首页 index.md 的 frontmatter 配置，格式为 tk.docAnalysis.[key]
   */
  docAnalysis?: DocAnalysis;
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
   * 公告配置
   */
  notice?: Notice;
  /**
   * 评论配置
   */
  comment?:
    | CommentConfig<"twikoo">
    | CommentConfig<"waline">
    | CommentConfig<"giscus">
    | CommentConfig<"artalk">
    | CommentConfig<"render">;
  /**
   * 内置 Vite 插件配置
   */
  vitePlugins?: Plugins;
  /**
   * markdown 插件列表，请不要在使用 vitepress.markdown.config 配置 md 插件，因为 config 是一个函数，vitepress 并没有做多个 config 合并，因此使用 vitepress.markdown.config 配置会覆盖主题内置 md 插件
   */
  markdownPlugins?: any[];
}

export interface BodyBgImg {
  /**
   * body 背景大图链接。单张图片 string | 多张图片 string[], 多张图片时每隔 imgInterval 秒换一张
   */
  imgSrc?: string | string[];
  /**
   * body 背景图透明度，选值 0.1 ~ 1.0
   *
   * @default 1
   */
  imgOpacity?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
  /**
   * body 当多张背景图时（imgSrc 为数组），设置切换时间，单位：毫秒
   *
   * @default 15000 (15秒)
   */
  imgInterval?: number;
  /**
   * body 背景图遮罩
   *
   * @default false
   */
  mask?: boolean;
  /**
   * body 背景图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。mask 为 true 时生效
   *
   * @default 'rgba(0, 0, 0, 0.2)'
   */
  maskBg?: string | number;
}

export interface ThemeSetting {
  /**
   * 是否启用主题风格，如果为 false，则不会显示切换按钮
   *
   * @default true
   */
  useThemeStyle?: boolean;
  /**
   * 设置当前主题风格
   *
   * @default 'vp-default'
   */
  themeStyle?:
    | "vp-default"
    | "vp-green"
    | "vp-yellow"
    | "vp-red"
    | "el-blue"
    | "el-green"
    | "el-yellow"
    | "el-red"
    | string;
  /**
   * 自定义主题风格，将会追加到内置主题风格后面
   */
  themeStyleAppend?: {
    /**
     * 主题组名称
     */
    label: string;
    /**
     * 主题组提示信息，鼠标悬停时显示
     */
    tip?: string;
    /**
     * 主题组内容
     */
    options: {
      /**
       * 主题名称，用于页面文字渲染
       */
      name: string;
      /**
       * 主题标识，在 html 标签的 theme 属性添加该标识
       */
      theme: string;
    }[];
  }[];
  /**
   * 是否使用主题尺寸切换功能
   *
   * @default true
   */
  useThemeSize?: boolean;
  /**
   * 设置当前主题尺寸
   *
   * @default 'default'
   */
  themeSize?: "small" | "default" | "large" | string;
  /**
   * 自定义主题尺寸，将会追加到内置主题尺寸后面
   */
  themeSizeAppend?: {
    /**
     * 主题尺寸名称，用于页面文字渲染
     */
    name: string;
    /**
     * 主题尺寸标识，在 html 标签的 size 属性添加该标识
     */
    size: string;
  }[];
}

export interface Author {
  /**
   * 作者名称，作用在首页的 PostItem 和文章页
   */
  name: string;
  /**
   * 点击作者名称后跳转的链接
   */
  link?: string;
}

export interface Banner {
  /**
   * 是否启用 Banner
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Banner 背景风格：default 为纯色背景，bigImg 为大图背景，grid 为网格背景
   *
   * @default 'default'
   */
  bgStyle?: "default" | "bigImg" | "grid";
  /**
   * Banner 背景色。bgStyle 为 default 时生效
   *
   * @default '#e5e5e5'
   */
  defaultBgColor?: string;
  /**
   * Banner 大图链接。bgStyle 为 bigImg 时生效
   *
   * @default []
   */
  imgSrc?: string | string[];
  /**
   * 当多张大图时（imgSrc 为数组），设置切换时间，单位：毫秒
   *
   * @default 15000 (15秒)
   */
  imgInterval?: number;
  /**
   * Banner 大图遮罩，bgStyle 为 bigImg 时生效
   *
   * @default true
   */
  mask?: boolean;
  /**
   * Banner 遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色。bgStyle 为 bigImg 且 mask 为 true 时生效
   *
   * @default 'rgba(0, 0, 0, 0.4)'
   */
  maskBg?: string | number;
  /**
   * Banner 字体颜色
   *
   * @default bgStyle 为 default 时为 '#000000'，其他为 '#ffffff'
   */
  textColor?: string;
  /**
   * Banner 功能列表
   */
  features?: { title: string; description?: string; link?: string; imgUrl?: string }[];
  /**
   * 标题字体大小
   *
   * @default '3.2rem'
   */
  titleFontSize?: string;
  /**
   * 描述字体大小
   *
   * @default '1.4rem'
   */
  descFontSize?: string;
  /**
   * 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
   *
   * @default 'default'
   */
  descStyle?: "default" | "types" | "switch";
  /**
   * 描述信息，在首页 index.md 的 frontmatter 中，除了 tk.banner.description 设置，也可以使用 tk.description 设置
   *
   * @default ''
   */
  description?: string | string[];
  /**
   * 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
   *
   * @default 4000 (4秒)
   */
  switchTime?: number;
  /**
   * 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 200 (0.2秒)
   */
  typesInTime?: number;
  /**
   * 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 100 (0.1秒)
   */
  typesOutTime?: number;
  /**
   * 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
   *
   * @default 800 (0.8秒)
   */
  typesNextTime?: number;
}

export interface Wallpaper {
  /**
   * 是否启用壁纸模式
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner
   *
   * @default false
   */
  hideBanner?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner 或 bodyBgImage 的遮罩层，则确保 banner.mask 和 bodyBgImage.mask 为 true 才生效
   *
   * @default false
   */
  hideMask?: boolean;
  /**
   * 开启壁纸模式后，是否隐藏 Banner 波浪组件，仅 banner.bgStyle = 'bigImg' 生效
   *
   * @default false
   */
  hideWaves?: boolean;
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

export interface FriendLink {
  /**
   * 是否启用友情链接卡片
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * 友情链接数据列表
   */
  list?: {
    /**
     * 友链名称
     */
    name: string;
    /**
     * 友链头像
     */
    avatar?: string;
    /**
     * 友链描述
     */
    desc?: string;
    /**
     * 友链链接
     */
    link?: string;
    /**
     * img 标签的 alt
     *
     * @default name
     */
    alt?: string;
  }[];
  /**
   * 首页卡片标题
   *
   * @default '${svg}友情链接'
   */
  title?: string | ((svg: string) => string);
  /**
   * 一页显示的数量
   *
   * @default 5
   */
  limit?: number;
  /**
   * 是否自动滚动
   *
   * @default false
   */
  autoScroll?: boolean;
  /**
   * 滚动间隔时间，单位：毫秒。autoScroll 为 true 时生效
   *
   * @default 2500 (2.5秒)
   */
  scrollSpeed?: number;
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

export interface Notice {
  /**
   * 是否启用公告功能
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * 公告自定义全局样式
   *
   * @example
   * ```css
   * .tk-notice a {
   *    color: var(--vp-c-brand-2);
   * }
   * ```
   */
  noticeStyle?: string;
  /**
   * 公告图标样式
   */
  iconStyle?: Record<string, any>;
  /**
   * 公告弹窗样式
   */
  popoverStyle?: Record<string, any>;
  /**
   * 公告标题，函数式需要和国际化搭配使用，根据不同语言环境返回不同标题
   *
   * @default '公告'
   */
  title?: string | ((localeIndex: string) => string);
  /**
   * 第一次进入页面，是否默认打开公告弹框
   *
   * @default true
   */
  initOpen?: boolean;
  /**
   * 弹框定时自动关闭，0 不自动消失
   *
   * @default 0
   */
  duration?: number;
  /**
   * 移动端自动最小化
   *
   * @default false
   */
  mobileMinify?: boolean;
  /**
   * 关闭公告弹框后，是否支持重新打开，如果为 false，则代表公告只显示一次
   *
   * @default true
   */
  reopen?: boolean;
  /**
   * 是否使用 localStorage 存储公告状态，如：当打开公告弹框后，下次进来则自动打开弹框
   */
  useStorage?: boolean;
  /**
   * 公告图标是否打开闪烁提示
   *
   * @default false
   */
  twinkle?: boolean;
  /**
   * 公告弹框出现位置
   *
   * @default top
   */
  position?: "top" | "center";
  /**
   * 公告图标地址
   *
   * @remark 与 noticeIconType 配合使用
   *
   * 1、noticeIconType 为 svg 时，需要填写 svg 代码
   * 2、noticeIconType 为 iconfont 时，需要填写 class 名
   * 3、noticeIconType 为 img 时，需要填写图片链接
   * 4、noticeIconType 为 el 时，需要传入 ElIcon 的组件
   */
  noticeIcon?: string;
  /**
   * 图标类型
   *
   * @default 'svg'
   */
  noticeIconType?: "svg" | "iconfont" | "img" | "el";
  /**
   * 公告弹框关闭图标地址，与 noticeIcon 配置一致
   */
  closeIcon?: string;
  /**
   * 图标类型，与 noticeIconType 配置一致
   *
   * @default 'svg'
   */
  closeIconType?: "svg" | "iconfont" | "img" | "el";
  /**
   * 路由切换后的自定义回调
   *
   * @param to 切换到的目标路由
   */
  onAfterRouteChange?: (to: Route, noticeShow: Ref<boolean>, showPopover: Ref<boolean>) => void;
  /**
   * 自定义内容组件，返回一个 VNode，比如一个 vue 组件
   */
  render?: () => VNode;
}

export type CommentConfig<T extends keyof CommentProvider = "twikoo" | "waline" | "giscus" | "artalk" | "render"> = {
  /**
   * 评论区提供者
   * twikoo 官网：https://twikoo.js.org/
   * waline 官网：https://waline.js.org/
   * giscus 官网：https://giscus.app/zh-CN
   * artalk 官网：https://artalk.js.org/
   * render 需要自定义评论区组件
   */
  provider: T;
  /**
   * 评论区配置项，根据 provider 不同而不同，具体看对应官网的使用介绍
   */
  options?: CommentProvider[T];
  /**
   * 自定义评论区组件，如果 provider 不满足，则可以自定义组件，返回一个 VNode，比如一个 vue 组件。当自定义组件时，请将 provider 设为 render
   *
   * @remark 例：{ provider: "render", render: () => <MyCommentVueComponent /> }
   */
  render?: () => VNode;
};

export type CommentProvider = {
  /**
   * twikoo 评论区配置项
   */
  twikoo: {
    /**
     * 官网其他配置项
     */
    [key: string]: any;
    envId: string;
    /**
     * twikoo.js 在线链接
     * @default 'https://cdn.jsdelivr.net/npm/twikoo@{version}/dist/twikoo.min.js'
     */
    link?: string;
    /**
     * twikoo 版本号，不定期更新为最新版
     *
     * @default '1.6.41'
     */
    version?: string;
    /**
     * 页面渲染后多少毫秒开始渲染 twikoo，如果设置太短，可能获取的 DOM 还没加载完成
     *
     * @default 700 (0.7秒)
     */
    timeout?: number;
    /**
     * katex 配置项，如果设置，则加载 katex
     */
    katex?: {
      /**
       * katex 的 css、core、render 的在线链接
       */
      cssLink: string;
      coreJsLink: string;
      renderJsLink: string;
      /**
       * katex 的 css、core、render 的 integrity
       */
      cssIntegrity?: string;
      coreJsIntegrity?: string;
      renderJsIntegrity?: string;
    };
  };
  /**
   * waline 评论区配置项
   */
  waline: {
    /**
     * 官网其他配置项
     */
    [key: string]: any;
    /**
     * waline 后台服务器地址
     */
    serverURL: string;
    /**
     * waline.js 在线链接，在线链接和依赖二选一，依赖安装为：`pnpm install @waline/client`。如果两个都设置，则优先使用 jsLink
     */
    jsLink?: string;
    /**
     * waline.css 在线链接，在线链接和依赖二选一，和 jsLink 搭配使用。如果安装了依赖则不需要传入，如果两个都设置，则优先使用 cssLink
     */
    cssLink?: string;
    /**
     * waline.css 的 integrity
     */
    cssIntegrity?: string;
    /**
     * 暗黑模式，具体使用请看 waline 官网
     *
     * @default "html[class='dark']"
     */
    dark?: string;
  };
  /**
   * giscus 评论区配置项
   */
  giscus: {
    [key: string]: any;
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname";
    strict?: "0" | "1";
    reactionsEnabled?: "0" | "1";
    emitMetadata?: "0" | "1";
    inputPosition?: "top" | "bottom";
    lang?: string;
    theme?: string;
    loading?: "lazy" | "eager";
    /**
     * 是否使用在线链接，如果不打算安装依赖，则设为 true
     *
     * @default false
     */
    useOnline?: boolean;
    /**
     * giscus.js 在线链接，useOnline 为 false 时生效
     *
     * @default 'https://giscus.app/client.js'
     */
    link?: string;
    /**
     * giscus.js 的 integrity
     */
    integrity?: string;
  };
  /**
   * artalk 评论区配置项
   */
  artalk: {
    [key: string]: any;
    /**
     * artalk 后台服务器地址
     */
    server: string;
    /**
     * artalk 站点名称
     */
    site: string;
  };
  /**
   * 自定义评论组件
   */
  render: Record<string, any>;
};

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
   * 是否启用 docAnalysis 插件
   *
   * @default true
   */
  docAnalysis?: boolean;
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
