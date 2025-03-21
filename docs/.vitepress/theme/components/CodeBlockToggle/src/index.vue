<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import { useRouter } from "vitepress";
import { useNamespace } from "../../../hooks";

defineOptions({ name: "CodeBlockToggle" });

const ns = useNamespace("");

const foldClass = "fold";
const arrowClass = "arrow";

/**
 * 初始化代码块
 */
const initCodeBlock = () => {
  const modes = document.querySelectorAll(".vp-doc div[class*='language-']") as unknown as HTMLElement[];

  Array.from(modes).forEach(item => {
    // 获取箭头元素，箭头元素已经在 src/markdown/plugins/codeArrow.ts 中通过 MD 插件添加
    const arrowElement: HTMLElement | null = item.querySelector(`.${arrowClass}`);
    if (!arrowElement) return;
    addClickEvent(arrowElement, item);
  });
};

/**
 * 给箭头图标添加点击事件（折叠/展开）
 *
 * @param arrowDom 箭头元素
 * @param codeDom 代码块元素
 */
const addClickEvent = (arrowDom: HTMLElement, codeDom: HTMLElement) => {
  // 获取代码块原来的高度
  const modeHeight = getElementHeight(codeDom);
  // 初始化代码块高度，确保第一次折叠时就有动画
  codeDom.style.height = `${modeHeight}px`;
  // 获取代码块的元素
  const preDom: HTMLElement | null = codeDom.querySelector("pre");
  const lineNumbersWrapperDom: HTMLElement | null = codeDom.querySelector(".line-numbers-wrapper");

  const codeBlockState = {
    expand: { height: `${modeHeight}px`, display: "block", speed: 80 },
    fold: { height: ns.cssVar("code-block-fold-height"), display: "none", speed: 400 },
  };

  let timeoutId: NodeJS.Timeout | null = null;

  // 箭头点击事件
  const clickEvent = () => {
    const isFold = arrowDom.classList.contains(foldClass);
    // 如果是折叠状态，则需要展开
    const state = codeBlockState[isFold ? "expand" : "fold"];

    codeDom.style.height = state.height;

    if (timeoutId) clearTimeout(timeoutId);

    if (preDom || lineNumbersWrapperDom) {
      timeoutId = setTimeout(() => {
        if (preDom) preDom.style.display = state.display;
        if (lineNumbersWrapperDom) lineNumbersWrapperDom.style.display = state.display;
        if (timeoutId) clearTimeout(timeoutId);
      }, state.speed);
    }

    arrowDom.classList.toggle(foldClass);
  };

  arrowDom.addEventListener("click", clickEvent);
};

/**
 * 获取元素的高度
 */
const getElementHeight = (item: HTMLElement) => {
  const parentElementClass = item.parentElement?.className || "";
  // blocks 代表是代码组
  if (!parentElementClass.includes("blocks")) return item.offsetHeight;
  if (parentElementClass.includes("blocks") && item.className.includes("active")) return item.offsetHeight;

  // 如果元素 display none ，则 display block 后获取高度再 display none
  item.style.display = "block";
  const height = item.offsetHeight;
  item.style.display = "";
  return height;
};

const router = useRouter();

const initRoute = () => {
  const selfOnAfterRouteChange = router.onAfterRouteChange;
  // 路由切换后的回调
  router.onAfterRouteChange = (href: string) => {
    selfOnAfterRouteChange?.(href);
    // 路由切换后初始化代码块
    initCodeBlock();
  };
};

onMounted(() => {
  nextTick(() => {
    initCodeBlock();
    initRoute();
  });
});
</script>

<template></template>