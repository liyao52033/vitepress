import type MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import { Token } from "markdown-it";

export type ContainerArgs = [typeof container, string, { render: (tokens: Token[], idx: number) => string }];

export interface ContainerOption {
    name: string; // 容器名称
    useTitle?: boolean; // 是否使用标题
    defaultTitle?: string; // 默认标题
    className?: string; // 容器类名
}

export interface ContainerLabel {
    noteLabel?: string;
}

/**
 * 创建 Teeker 内置的 markdown-it-container 插件
 * @param md markdown-it 实例
 * @param containerLabel
 */
export const containerPlugins = (md: MarkdownIt, containerLabel?: ContainerLabel) => {
    const markdownContainer = [
        { name: "center", useTitle: false, className: `tk-center-container` },
        { name: "right", useTitle: false, className: `tk-right-container` },
        { name: "note", useTitle: true, defaultTitle: containerLabel?.noteLabel || "NOTE", className: `custom-block` },
    ];

    createContainersThenUse(md, markdownContainer);
};

/**
 * 创建一个自定义的容器，并使用
 *
 * @param md markdown-it 实例
 * @param option 容器配置项
 */
export const createContainerThenUse = (md: MarkdownIt, option: ContainerOption) => {
    md.use(...createContainerThenGet(md, option));
};

/**
 * 创建一个自定义的容器，并返回
 *
 * @param md markdown-it 实例
 * @param option 容器配置项
 */
export const createContainerThenGet = (md: MarkdownIt, option: ContainerOption): ContainerArgs => {
    const { name, useTitle, defaultTitle, className } = option;
    return [
        container,
        name,
        {
            render(tokens: Token[], idx: number) {
                const token = tokens[idx];
                const info = token.info.trim().slice(name.length).trim();

                if (token.nesting === 1) {
                    const title = useTitle ? md.renderInline(info || defaultTitle || "") : "";
                    return `<div class="${name} ${className}">${useTitle ? `<p class="title ${name}-title ${className ? `${className}-title` : ""}">${title}</p>` : ""}\n`;
                } else return `</div>\n`;
            },
        },
    ];
};

/**
 * 创建多个自定义的容器，并使用
 *
 * @param md markdown-it 实例
 * @param options 容器配置项
 */
export const createContainersThenUse = (md: MarkdownIt, options: ContainerOption[]) => {
    options.forEach(option => {
        md.use(...createContainerThenGet(md, option));
    });
};

/**
 * 创建多个自定义的容器，并返回
 *
 * @param md markdown-it 实例
 * @param options 容器配置项
 */
export const createContainersThenGet = (md: MarkdownIt, options: ContainerOption[]) => {
    const containers: ContainerArgs[] = [];

    options.forEach(option => {
        containers.push(createContainerThenGet(md, option));
    });

    return containers;
};