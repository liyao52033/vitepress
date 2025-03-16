import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/指南/": [
        {
            text: "安装",
            collapsed: false,
            items: [
                { text: "api示例", link: "/pages/guide/api-examples" },
                { text: "md示例", link: "/pages/guide/markdown-examples" },
                { text: "使用", link: "/pages/guide/usage" },
                { text: "组件", link: "/pages/guide/common" },
            ],
        },

    ],
    "/组件/": [
        {
            text: "参数",
            collapsed: false,
            items: [
                { text: "api示例", link: "/pages/组件/api-examples" },
                { text: "md示例", link: "/pages/组件/markdown-examples" },
            ],
        },
    ],
};