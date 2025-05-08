<script setup lang="ts" >
import { unref, onMounted, ref } from "vue";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { useNamespace } from "../../../hooks";
import { HomeCardProps } from "./homeCard";
import Icon from "../../Icon";

defineOptions({ name: "HomeCard" });

const ns = useNamespace("homeCard");

const {
  title = "",
  titleLink,
  page = false,
  pageSize = 4,
  total = 0,
  autoPage = false,
  pageSpeed = 4000,
} = defineProps<HomeCardProps>();

const emit = defineEmits<{ pagination: [to: number, "prev" | "next"] }>();

const pageNum = defineModel<number>({ default: 1 });
const pageTotalNum = Math.ceil(total / pageSize);
const hasNextData = total !== 0 && pageTotalNum !== 1;
// Vue 动画名
const transitionName = ref("scroll");

/**
 * 分页
 * @param to 前往第几页
 * @param type 前往类型，prev：上一页，next：下一页
 */
const pagination = (to: number, type: "prev" | "next") => {
  emit("pagination", to, type);
  // 修改为分页动画名
  transitionName.value = `slide-${type}`;

  if (page && autoPage) startAutoPage();
  const index = unref(pageNum) % pageTotalNum;
  const res = (index + to) % pageTotalNum;

  // 修改页码，对超出或低出的页码进行调整
  if (res < 1) pageNum.value = pageTotalNum + res;
  else if (res > pageTotalNum) pageNum.value = 1;
  else pageNum.value = res;
};

let timer: NodeJS.Timeout;

/**
 * 开启自动翻页
 */
const startAutoPage = () => {
  // 先关闭自动翻页
  closeAutoPage();
  if (pageSpeed > 0) {
    timer = setTimeout(() => {
      pagination(1, "next");
    }, pageSpeed);
  }
};
/**
 * 关闭自动翻页
 */
const closeAutoPage = () => {
  if (timer) clearTimeout(timer);
};

onMounted(() => {
  if (page && autoPage) startAutoPage();
});
</script>

<template>
  <div :class="`${ns.b()} card`">
    <div v-if="title" :class="`${ns.e('header')} flx-justify-between`">
      <slot name="title">
        <a v-if="titleLink" :href="titleLink">
          <span class="title flx-align-center" v-html="title"></span>
        </a>
        <span v-else class="title flx-align-center" v-html="title"></span>
      </slot>

      <slot name="page" v-bind="{ pagination }">
        <div v-if="page">
          <slot name="page-left" v-bind="{ pagination }">
            <span :class="['page-button', hasNextData ? 'pointer' : 'disabled']" @click="pagination(-1, 'prev')">
              <Icon :size="14"><ArrowLeft /></Icon>
            </span>
          </slot>

          <slot name="page-right" v-bind="{ pagination }">
            <span :class="['page-button', hasNextData ? 'pointer' : 'disabled']" @click="pagination(1, 'next')">
              <Icon :size="14"><ArrowRight /></Icon>
            </span>
          </slot>
        </div>
      </slot>

    </div>

    <slot v-bind="{ transitionName, startAutoPage, closeAutoPage }" />
  </div>
</template>
