<script setup lang="ts">
import { computed, unref } from "vue";
import { Content, useData } from "vitepress";
import { useNamespace } from "../../../hooks";
import { CatalogueItem } from "../../";

defineOptions({ name: "CataloguePage" });

const ns = useNamespace("catalogue");

const { theme, frontmatter } = useData();

// 目录列表
const catalogues = computed(() => unref(theme).catalogues?.inv[unref(frontmatter).path]?.catalogues);
</script>

<template>
<!--  <div :class="`${ns.b()} ${ns.joinNamespace('page')}`">-->
<!--    <div :class="ns.e('header')">-->
<!--      <div :class="ns.joinNamespace('page-title-h2')">{{ frontmatter.title }}</div>-->
<!--      <div class="description">{{ frontmatter.desc || frontmatter.description }}</div>-->
<!--    </div>-->

<!--    <div :class="ns.e('wrapper')">-->
<!--      <div class="title">{{ frontmatter.pageTitle || "目录" }}</div>-->
<!--      <ul class="flx-wrap-between">-->
<!--        <template v-for="(item, index) in catalogues" :key="index">-->
<!--          <CatalogueItem :item :index="index + 1" />-->
<!--        </template>-->
<!--      </ul>-->
<!--    </div>-->

<!--    <div class="vp-doc">-->
<!--      <Content />-->
<!--    </div>-->
<!--  </div>-->
</template>
