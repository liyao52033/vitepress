import DefaultTheme from 'vitepress/theme'
import { Theme } from "vitepress";
import MyLayout from "./layout/index.vue"
import Login from "./components/Login/Login.vue";
import { checkAuth } from "./components/Login/helper.js";
import Busuanzi from "./helper/busuanzi";
import 'element-plus/dist/index.css'
import './styles/index.scss'

export {
    createContainerThenUse,
    createContainerThenGet,
    createContainersThenUse,
    createContainersThenGet,
} from "./markdown/plugins/container";

export default {
    extends: DefaultTheme,
    Layout: MyLayout,
    enhanceApp({ app, router, siteData }) {

        app.component('Login', Login)

        // 获取可能已有的 onAfterRouteChange
        const selfOnAfterRouteChange = router.onAfterRouteChange;
        router.onAfterRouteChange = (href: string) => {
            // 调用可能已有的 onAfterRouteChange
            selfOnAfterRouteChange?.(href);
            // 调用自己的函数
            login();
            Busuanzi()

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