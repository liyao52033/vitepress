import { defineConfig } from 'vitepress'
import { nav } from "./theme/config/nav"
import tkThemeConfig from "./theme/config/index";

const tkConfig = tkThemeConfig({
    webSiteInfo: {
        createTime: "2025-03-08",
    },
    vitePlugins: {
        permalinkOption: { path: "docs",  ignoreList: ["login.md"], },
        sidebarOption: {
            path: "docs",
            collapsed: true,
            depth: 2,
            ignoreIndexMd: true,
            ignoreList: ["login.md", "@pages", "utils", "@fragment"],
        },
        autoFrontmatterOption: {
            pattern: "**/*.md",
            globOptions: { ignore: ["utils", "index.md", "login.md"] }
        },
        catalogueOption:{
            path: "docs"
        },
        docAnalysisOption:{
            path: "docs",
            ignoreList: ["login.md"]
        }
    }
});

export default defineConfig({
    extends: tkConfig,
    title: "VitePress",
    description: "A VitePress Site",
    head: [
        ['link', { rel: 'icon', href: '/img/logo.png' }],
        [
            "meta",
            {
                name: "viewport",
                content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0",
            },
        ],
    ],
    vite: {
        plugins: [

        ],
    },
    markdown: {
        lineNumbers: true,
        externalLinkIcon: true,
        image: {
            lazyLoading: true
        },
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息",
        },
    },
    rewrites: {
        'articles/login.md': 'login.md',
    },
    cleanUrls: true,
    cacheDir: '.vite-cache',
    sitemap: {
        hostname: 'https://vitepress.xiaoying.org.cn/'
    },
    themeConfig: {
        logo: '/img/logo.png',
        nav,
        search: {
            provider: 'local',
            options: {
                 _render(src, env, md) {
                    const html = md.render(src, env)
                    if (env.frontmatter?.search === false) return ''
                    return html
                }
            }
        },
        loginInfo: {
            isLogin: true, // 是否开启登录
            token: Math.random().toString(32).slice(2) + Math.round(new Date().getTime() / 1000),
            List: [
                '/pages/bbd1d8/',
                '/pages/2fcd29/',
                '/pages/b972ff/',
                '/pages/617ec1/',
                '/pages/7a1d12/'
            ], //加密文章列表
            expiration: 0.5  // token过期时间，单位：天
        },
        outline: {
            level: [2, 3],
            label: "页面导航",
        },
        docFooter: {
            prev: "上一页",
            next: "下一页",
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/liyao52033/liyao-vue-common' }
        ],
        lastUpdated: {
            text: '上次更新时间',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },



    }
})
