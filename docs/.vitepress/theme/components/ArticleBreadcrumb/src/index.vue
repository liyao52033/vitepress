<script setup lang="ts" >
import { computed, unref } from "vue";
import { useData } from "vitepress";
import { House } from "@element-plus/icons-vue";
import { useNamespace } from "../../../hooks";
import { Breadcrumb, BreadcrumbItem, Icon } from "../../";
import { useUnrefData } from "../../configProvider";
import { Breadcrumb as BreadcrumbType } from "../../../config/types";

defineOptions({ name: "ArticleBreadcrumb" });

const ns = useNamespace("articleBreadcrumb");

const { theme, frontmatter } = useUnrefData();
const { localeIndex, page } = useData();

// 面包屑配置项
const breadcrumb: BreadcrumbType = {
  enabled: true,
  showCurrentName: false,
  separator: "/",
  ...theme.breadcrumb,
  ...frontmatter.breadcrumb,
};

const relativePathArr = computed(() => unref(page).relativePath.split("/") || []);

const breadcrumbList = computed(() => {
  const classifyList: { fileName: string; filePath: string }[] = [];
  const relativePathArrConst: string[] = unref(relativePathArr);

  relativePathArrConst.forEach((item, index) => {
    // 去除「序号.」的前缀，并获取文件名
    const fileName = item.replace(/^\d+\./, "").split(".")?.[0] || "";

    // 兼容国际化功能，如果配置多语言，在面包屑去掉多语言根目录名
    if ((index !== relativePathArrConst.length - 1 || breadcrumb?.showCurrentName) && fileName !== unref(localeIndex)) {
      classifyList.push({
        fileName,
        filePath: theme.catalogues?.inv[item]?.filePath || "",
      });
    }
  });
  return classifyList;
});
</script>

<template>
  <div :class="`${ns.b()}`">
    <Breadcrumb v-if="breadcrumb?.enabled" :separator="breadcrumb.separator">
      <BreadcrumbItem>
        <a href="/" title="首页" class="hover-color">
          <Icon><House /></Icon>
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="index">
        <component
          :is="item.filePath ? 'a' : 'span'"
          :href="item.filePath ? `/${item.filePath}` : undefined"
          :title="item.fileName"
          :class="[item.filePath ? 'hover-color' : '']"
        >
          {{ item.fileName }}
        </component>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
