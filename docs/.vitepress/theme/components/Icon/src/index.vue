<script setup lang="ts" name="Icon">
import { useSlots } from "vue";
import { useNamespace } from "../../../hooks";
import { isString } from "../../../helper";
import { IconProps } from "./icon";

defineOptions({ name: "Icon" });

const ns = useNamespace("icon");

const { color, hover = false, hoverColor, iconType = "svg", ...props } = defineProps<IconProps>();

const slot = useSlots();

const getStyle = () => {
  return {
    ...props.style,
    "--icon-color": color || "var(--vp-c-text-1)",
    "--icon-size": props.size && (isString(props.size) ? props.size : `${props.size}px`),
    "--icon-color-hover": hoverColor || ns.cssVar("theme-color"),
  };
};
</script>

<template>
  <i v-if="slot.default" :class="ns.b()" :style="getStyle()">
    <slot />
  </i>
  <i v-else-if="iconType === 'svg'" v-html="icon" :class="[ns.b(), ns.is('hover', hover)]" :style="getStyle()" />
  <i
    v-else-if="iconType === 'iconfont'"
    :class="[ns.b(), ns.is('hover', hover), 'iconfont', icon]"
    :style="getStyle()"
  />
  <img
    v-else-if="iconType === 'img'"
    :src="icon"
    :alt="imgAlt"
    :class="[ns.b(), ns.is('hover', hover)]"
    :style="getStyle()"
  />
  <i v-else-if="iconType === 'component'" :class="ns.b()" :style="getStyle()">
    <component :is="icon" :size :class="[ns.b(), ns.is('hover', hover)]" />
  </i>
</template>
