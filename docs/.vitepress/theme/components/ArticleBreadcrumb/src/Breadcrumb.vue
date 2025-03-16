<script setup lang="ts">
import { onMounted, provide, ref, unref } from "vue";
import { useNamespace } from "../../../hooks";
import { breadcrumbKey, type BreadcrumbProps } from "./breadcrumb";

defineOptions({ name: "Breadcrumb" });

const ns = useNamespace("breadcrumb");

const { separator = "/" } = defineProps<BreadcrumbProps>();

const breadcrumb = ref<HTMLDivElement>();

provide(breadcrumbKey, { separator });

onMounted(() => {
  const items = unref(breadcrumb).querySelectorAll(`.${ns.e("item")}`);

  if (items.length) {
    items[items.length - 1].setAttribute("aria-current", "page");
  }
});
</script>

<template>
  <div ref="breadcrumb" :class="ns.b()" aria-label="Breadcrumb" role="navigation">
    <slot />
  </div>
</template>
