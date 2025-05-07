<script setup lang="ts" >
import { computed, nextTick, onMounted, ref, unref } from "vue";
import { useRoute, useData } from "vitepress";
import { Reading, Clock, View, PieChart } from "@element-plus/icons-vue";
import { FileInfo } from "vitepress-plugin-doc-analysis";
import { useNamespace } from "../../hooks";
import { ArticleBreadcrumb }from "../";
import ArticleInfo from "./article.vue";
import Icon from "../Icon/index"
import { Article, DocAnalysis } from "../../config/types";
import { TkContentData } from "../../post/types";
import { useUnrefData } from "../configProvider";


defineOptions({ name: "pageInfo" });

const ns = useNamespace("articleAnalyze");

const { theme, frontmatter } = useUnrefData();
const { theme: themeRef } = useData();

// 文章基本信息
const post: TkContentData = {
  author: { ...theme.author, ...frontmatter.author },
  date: frontmatter.date,
  frontmatter: frontmatter,
  url: "",
};

// 站点信息数据
const docAnalysisInfo = computed(() => unref(themeRef).docAnalysisInfo || {});
// 站点信息配置项
const {
  pageView = true,
  wordCount = true,
  readingTime = true,
  pageIteration = 2000,
}: DocAnalysis = { ...theme.docAnalysis, ...frontmatter.docAnalysis };

const route = useRoute();

// 文章阅读量、阅读时长、字数
const pageViewInfo = computed(() => {
  let pageViewInfo: Partial<FileInfo> = {};
  unref(docAnalysisInfo).eachFileWords.forEach((item: FileInfo) => {
    if (item.fileInfo.relativePath === route.data.relativePath) return (pageViewInfo = item);
  });

  return pageViewInfo;
});

// 文章信息配置项
const { showInfo = true, teleport = {} }: Article = { ...theme.article, ...frontmatter.article };

// 是否展示作者、日期、分类、标签等信息
const isShowInfo = computed(() => {
  const arr = [showInfo].flat();
  if (arr.includes(true) || arr.includes("article")) return true;
  return false;
});

const baseInfoRef = ref<HTMLDivElement>();

const teleportInfo = () => {
  const { selector, position = "after", className = "teleport" } = teleport;
  const baseInfoRefConst = unref(baseInfoRef);
  // 没有指定选择器，则不进行传送
  if (!selector || !baseInfoRefConst) return;

  const docDomContainer = window.document.querySelector("#VPContent");
  let targetDom = docDomContainer?.querySelector(selector);

  // 传送前先尝试删除传送位置的自己，避免传送重新渲染
  targetDom?.parentElement?.querySelectorAll(`.${ns.e("wrapper")}`).forEach(v => v.remove());

  baseInfoRefConst.classList.add(className);
  targetDom?.[position]?.(baseInfoRefConst);
};

onMounted(() => {
  nextTick(() => teleportInfo());
});
</script>

<template>
  <div :class="`${ns.b()} flx-justify-between`">
    <ArticleBreadcrumb />

    <div v-if="isShowInfo" ref="baseInfoRef" :class="`${ns.e('wrapper')} flx-align-center`">
      <ArticleInfo :post scope="article" />

      <div v-if="wordCount" class="flx-center">
        <Icon><Reading /></Icon>
        <span title="文章字数" class="hover-color" style="cursor: pointer">{{ pageViewInfo.wordCount }}</span>
      </div>

      <div v-if="readingTime" class="flx-center">
        <Icon><Clock /></Icon>
        <span title="预计阅读时长" class="hover-color" style="cursor: pointer">{{ pageViewInfo.readingTime }}</span>
      </div>

      <div v-if="pageView" class="flx-center">
        <Icon><View /></Icon>
         <a title="本文总阅读量" id="busuanzi_page_pv" class="hover-color" href="https://busuanzi.9420.ltd"
            target="_blank"></a>
      </div>

       <div v-if="pageView" class="flx-center">
        <Icon><PieChart /></Icon>
         <a title="本文总访客量" id="busuanzi_page_uv" class="hover-color" href="https://busuanzi.9420.ltd"
            target="_blank"></a>
      </div>
    </div>
  </div>
</template>
