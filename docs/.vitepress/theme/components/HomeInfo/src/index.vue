<script setup lang="ts">
import { computed, unref } from "vue";
import { useData } from "vitepress";
import { useNamespace } from "../../../hooks";
import { useUnrefData } from "../../configProvider";
import { HomeCategoryCard, HomeTagCard, TopArticleCard, DocAnalysisCard } from "../../";

defineOptions({ name: "HomeInfo" });

const ns = useNamespace("homeInfo");

const { frontmatter: frontmatterRef } = useData();
const { theme, frontmatter } = useUnrefData();
const {  homeCardSort } = { ...theme, ...frontmatter };

// 获取用户配置 + 默认的卡片排序
const finalHomeCardSort = computed(() => {
  const configCardSort = homeCardSort || [];
  return [...new Set([...configCardSort, ...["topArticle", "category", "tag", "friendLink", "docAnalysis"]])];
});

const isCategoriesPage = computed(() => unref(frontmatterRef).categoriesPage);
const isTagsPage = computed(() => unref(frontmatterRef).tagsPage);
const isHomePage = computed(() => !unref(isCategoriesPage) && !unref(isTagsPage));

// 定义组件映射
const componentMap = computed(() => {
  const homePage = unref(isHomePage);
  const categoriesPage = unref(isCategoriesPage);
  const tagsPage = unref(isTagsPage);

  return {
    topArticle: {
      el: TopArticleCard,
      show: homePage
    },
    category: {
      el: HomeCategoryCard,
      props: { categoriesPage: categoriesPage },
      show: (homePage || categoriesPage)
    },
    tag: {
      el: HomeTagCard,
      props: { tagsPage: tagsPage },
      show: (homePage || tagsPage)
    },
    docAnalysis: {
      el: DocAnalysisCard,
      show: homePage
    },
  };
});
</script>

<template>
  <div :class="ns.b()">
    <template v-for="item in finalHomeCardSort" :key="item">
      <component v-if="componentMap[item]?.show" :is="componentMap[item]?.el" v-bind="componentMap[item]?.props" />
    </template>
  </div>
</template>
