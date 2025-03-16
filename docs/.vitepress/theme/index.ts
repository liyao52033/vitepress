import DefaultTheme from 'vitepress/theme'
import { h, resolveComponent  } from "vue";
import { Theme } from "vitepress";
import NotFound from "./components/NotFound.vue";
import GlobalTip from "./components/GlobalTip.vue";
import Login from "./components/Login/Login.vue";
import CodeBlockToggle from "./components/CodeBlockToggle/index.vue"
import pageInfo from "./components/ArtickeInfo/pageInfo.vue"
import usePermalink from "vitepress-plugin-link/usePermalink";
import { checkAuth } from "./components/Login/helper.js";
import {
    Footer,
    HomePostList,
    ArchivesPage,
    CataloguePage,
    ArticleImagePreview,
    ArticlePageStyle
} from "./components/index";
import 'element-plus/dist/index.css'
import './styles/index.scss'


export default {
    extends: DefaultTheme,
    Layout() {

        // 开启监听 permalink
        usePermalink().startWatch();

        // 解析 `<ClientOnly>` 组件
        const ClientOnly = resolveComponent("ClientOnly");

        return h(DefaultTheme.Layout, null, {
            'not-found': () => h(ClientOnly, ()=> h(NotFound)),
            'doc-top': () => h(ClientOnly, () => h(GlobalTip)),
            'home-features-after': () => h(ClientOnly, () => h(HomePostList)),
            'layout-bottom': () => h(ClientOnly, () => h(Footer)),
            'page-top': () => h(ClientOnly, () => [h(ArchivesPage), h(CataloguePage)]),
            'doc-before': () => h(ClientOnly, () => [
                h(CodeBlockToggle),
                h(pageInfo),
                h(ArticleImagePreview),
                h(ArticlePageStyle)
            ])
        });
    },
    enhanceApp({ app, router, siteData }) {

        app.component('Login', Login)

        // 获取可能已有的 onAfterRouteChange
        const selfOnAfterRouteChange = router.onAfterRouteChange;
        router.onAfterRouteChange = (href: string) => {
            // 调用可能已有的 onAfterRouteChange
            selfOnAfterRouteChange?.(href);
            // 调用自己的函数
            login();
        };
        const login = () => {
            if (router.route.path !== '/') {
                let { isLogin, List } = siteData.value.themeConfig.loginInfo
                const filepath = router.route.data.relativePath.replace(/\.md$/, '')
                const currentPermalink = siteData.value.themeConfig.permalinks
                const currentPath = currentPermalink.map[filepath]

                if (List.includes(currentPath) && !checkAuth() && isLogin) {
                    router.go('/login')
                }
            }
        }
    }
} satisfies Theme