<script setup lang="ts">
import type { CatalogueItem } from "vitepress-plugin-catalogue";
import { useNamespace } from "../../../hooks";

defineOptions({ name: "CatalogueItem" });

const nsSub = useNamespace("subCatalogue");
const nsItem = useNamespace("catalogueItem");

defineProps<{ item: CatalogueItem; index: number | string }>();
</script>

<template>
  <li :class="item.children ? nsSub.b() : nsItem.b()">
    <a v-if="!item.children" :href="item.link">{{ index }}. {{ item.title }}</a>

    <template v-else>
      <div :id="item.title" :class="nsSub.e('title')">
        <a :href="`#${item.title}`" class="anchor">#</a>
        <span>{{ `${index}. ${item.title}` }}</span>
      </div>

      <ul v-if="item.children" :class="`${nsSub.e('inline')} flx-wrap-between`">
        <!-- 递归自己 -->
        <CatalogueItem v-for="(item, i) in item.children" :key="i" :item :index="`${index}-${i + 1}`" />
      </ul>
    </template>
  </li>
</template>
