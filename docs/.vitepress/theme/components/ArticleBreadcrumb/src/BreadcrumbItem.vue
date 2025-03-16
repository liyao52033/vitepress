<script setup lang="ts" >
import { inject } from "vue";
import { useNamespace } from "../../../hooks";
import { breadcrumbKey } from "./breadcrumb";

defineOptions({ name: "BreadcrumbItem" });

const ns = useNamespace("breadcrumb");

const breadcrumbContext = inject(breadcrumbKey, undefined);
</script>

<template>
  <span :class="ns.e('item')">
    <span ref="link" :class="ns.e('inner')" role="link">
      <slot />
    </span>
    <span :class="ns.e('separator')" role="presentation">
      {{ breadcrumbContext?.separator }}
    </span>
  </span>
</template>
