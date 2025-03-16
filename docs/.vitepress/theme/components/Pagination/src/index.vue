<script setup lang="ts" name="Pagination">
import { nextTick, onMounted, unref } from "vue";
import { ElPagination } from "element-plus";
import { useNamespace } from "../../../hooks";
import { scrollTo } from "../../../helper";
import { PaginationProps, PaginationEmits, Paging } from "./pagination";

defineOptions({ name: "Pagination" });

const ns = useNamespace("pagination");

const { background = true, autoScroll = true, hidden = false, reset = true } = defineProps<PaginationProps>();

const emits = defineEmits<PaginationEmits>();

const pageObj = defineModel<Paging>({ required: true });

const pageSetting = { pageNum: 1, pageSizes: [10, 20, 50, 100, 200], pageSize: 20 };

onMounted(() => {
  const { pageNum, pageSize, pageSizes } = unref(pageObj);
  if (!pageNum) unref(pageObj).pageNum = pageSetting.pageNum;
  if (!pageSizes) unref(pageObj).pageSizes = pageSetting.pageSizes;
  if (!pageSize) unref(pageObj).pageSize = pageSetting.pageSize;
});

const handleSizeChange = (value: number) => {
  if (reset) return handleCurrentChange(1);
  unref(pageObj).pageSize = value;
  afterChange();
};

const handleCurrentChange = (value: number) => {
  unref(pageObj).pageNum = value;
  afterChange();
};

const afterChange = () => {
  pageObj.value = unref(pageObj);
  emits("pagination", unref(pageObj));

  if (!(import.meta as any).env.SSR && autoScroll) {
    nextTick(() => {
      const rootStyles = getComputedStyle(document.documentElement);
      const navHeight = rootStyles.getPropertyValue("--vp-nav-height").trim().replace("px", "");
      // 滚动返回时，减去导航栏的高度
      scrollTo("html", window.innerHeight - Number(navHeight), 700);
    });
  }
};
</script>

<template>
  <div :class="[ns.b(), { hidden: hidden }]">
    <el-pagination
      :background="background"
      v-model:current-page="pageObj.pageNum"
      v-model:page-size="pageObj.pageSize"
      :page-sizes="pageObj.pageSizes"
      :total="pageObj.total || 0"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
