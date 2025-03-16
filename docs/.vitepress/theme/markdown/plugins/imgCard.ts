import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import yaml from "js-yaml";
import { withBase } from "../../helper/util";
import { ImgCard } from "../types";
import { SiteConfig } from "vitepress";

const imgCardName = "imgCard";
const rootClass = "img-card";

/**
 * 生成图片卡片容器
 *
 * @param md MarkdownIt 实例
 * @param base 根路径
 */
const imgCardPlugin = (md: MarkdownIt) => {
  const siteConfig: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
  const { base = "/" } = siteConfig.userConfig;

  // 注册容器
  md.use(container, imgCardName, {});

  // 注册成功后，就会监听到 container_xx_open，其中 xx 为注册的容器名
  md.renderer.rules[`container_${imgCardName}_open`] = (tokens, idx) => {
    const containerToken = tokens[idx];
    let html = `<div class="${rootClass}-container">`;

    for (let i = idx; i < tokens.length; i++) {
      const token = tokens[i];

      // 如果来到 ${imgCardName} 的结束标签，则跳出循环
      if (token.type === `container_${imgCardName}_close`) break;
      if (!["yaml", "yml"].includes(token.info)) continue;

      // 解析 yaml 内容
      const yamlContent = yaml.load(token.content.trim()) as ImgCard.Props | ImgCard.Item[];

      let data: ImgCard.Item[] = [];
      let config: ImgCard.Config = {};
      if (Array.isArray(yamlContent)) data = yamlContent;
      else {
        data = yamlContent.data || [];
        config = yamlContent.config || {};
      }

      // 获取容器名后面的卡片数量
      const cardNum = containerToken.info.trim().slice(imgCardName.length).trim();
      config.cardNum = config.cardNum || Number(cardNum || 3) || 3;

      html += renderImgCard({ config, data }, base);

      // 删除 yaml 代码块
      if (config.showCode !== true) {
        token.type = "";
        token.tag = "";
        token.hidden = true;
      }
    }

    // 返回不能有 </div> 结尾
    return html;
  };
};

/**
 * 获取图片卡片 HTML 标签
 *
 * @param imgCard 图片卡片数据
 * @param base 根路径
 */
const renderImgCard = (imgCard: ImgCard.Props, base: string) => {
  const { data = [], config = {} } = imgCard;
  if (!data.length) return "";

  const { cardGap = 20, lineClamp = 2, target = "_blank", objectFit = "cover", imgHeight = "auto" } = config;
  let { cardNum = 3 } = config;
  if (!cardNum || cardNum > 4 || cardNum < 1) cardNum = 3;

  return `
    <div
      class="${rootClass} index-${cardNum}"
      style="--row-gap: ${cardGap}px; --column-gap: ${cardGap}px; --column-min-width: calc(100% / ${cardNum} - ${cardGap * (cardNum - 1)}px);"
    >
      ${data
        .map(
          card => `
            <${card.link ? "a" : "span"}
              href="${withBase(base, card.link)}"
              target="${target}"
              class="${rootClass}__item ${cardNum ? `row-${cardNum}` : ""}"
              style="--img-height: ${imgHeight}; --img-object-fit: ${objectFit}; --desc-line-clamp: ${lineClamp}"
            >
              <div class="${rootClass}__item__img">
                <img src="${withBase(base, card.img)}">
              </div>
              <div class="${rootClass}__item__info">
                  <p class="name">${card.name}</p>
                  ${card.desc ? `<p class="desc">${card.desc}</p>` : ""}
              </div>
              ${
                card.avatar || card.author
                  ? `<div class="${rootClass}__item__footer">
                      ${card.avatar ? `<img src="${withBase(base, card.avatar)}">` : ""}
                      ${card.author ? `<span>${card.author}</span>` : ""}
                    </div>`
                  : ""
              }
            </${card.link ? "a" : "span"}>
          `
        )
        .join("")}
    </div>
  `;
};

export default imgCardPlugin;
