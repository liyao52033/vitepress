<script setup lang="ts">
import { onMounted, reactive, ref, unref, watch } from "vue";
import { useRoute } from "vitepress";
import { PaginationProps } from "element-plus";
import {  Pagination } from "../../";
import HomePostItem from "./HomePostItem.vue";
import { isCategoriesPage, isTagsPage, usePosts, useUnrefData } from "../../configProvider";
import { useNamespace, useWindowSize } from "../../../hooks";
import { TkContentData } from "../../../post/types";
import HomeInfo from "../../HomeInfo";
import ContributeChart from "../../common/ContributeChart.vue";

defineOptions({ name:"HomePostList" });

const ns = useNamespace("postList");

const posts = usePosts();
const { frontmatter, theme } = useUnrefData();

// 自定义一页数量 & 分页组件的 Props
const { pageSize = 10, ...pageProps }: Partial<PaginationProps> = { ...theme.page, ...frontmatter.tk?.page };

const { coverImgMode = "default" } = { ...theme.post, ...frontmatter.tk?.post };

// 分页信息
const pageInfo = ref({
  pageNum: 1,
  pageSizes: [10, 20, 50, 100, 200],
  pageSize: pageSize,
  total: 0,
});

const route = useRoute();
const currentPosts = ref<TkContentData[]>([]);
const pageNumKey = "pageNum";

const updateData = () => {
  const { frontmatter } = route.data;

  // 分页处理，如果 URL 查询参数存在 pageNum，则加载对应的 post
  const { searchParams } = new URL(window.location.href);
  const p = Number(searchParams.get(pageNumKey)) || 1;
  if (p !== unref(pageInfo).pageNum) unref(pageInfo).pageNum = p;

  let post = unref(posts).sortPostsByDateAndSticky;

  if (frontmatter.categoriesPage) {
    // 在分类页时，如果 URL 查询参数存在 category，则加载该 category 的 post，不存在则加载所有 post
    const c = searchParams.get("category");
    post = c ? unref(posts).groupPosts.categories[c] : post;
  } else if (frontmatter.tagsPage) {
    // 在标签页时，如果 URL 查询参数存在 tag，则加载该 tag 的 post，不存在则加载所有 post
    const t = searchParams.get("tag");
    post = t ? unref(posts).groupPosts.tags[t] : post;
  }

  const { pageNum, pageSize, total } = unref(pageInfo);
  // 总数处理
  if (total !== post.length) unref(pageInfo).total = post.length || 0;

  currentPosts.value = post.slice((pageNum - 1) * pageSize, pageNum * pageSize);
};


onMounted(() => {
  if (typeof document !== "undefined") {
    watch(
        route,
        () => {
          updateData();
        },
        { immediate: true }
    );
  }
});

const pagePropsRef = reactive({ ...pageProps });

if (pagePropsRef.size !== "small") {
  /**
   *  屏幕小于 768px 时切换为 small，反之切换为设置的值
   */
  useWindowSize(width => {
    if (width <= 768) pagePropsRef.size = "small";
    else if (pagePropsRef.size !== (pageProps.size || "default")) pagePropsRef.size = pageProps.size || "default";
  });
}

/**
 * 切换分页时，记录到 URL 上
 */
const handlePagination = () => {
  const { searchParams } = new URL(window.location.href!);
  // 先删除旧的再追加新的
  searchParams.delete(pageNumKey);
  searchParams.append(pageNumKey, String(unref(pageInfo).pageNum));
  // 替换 URL，但不刷新
  window.history.pushState({}, "", `${ window.location.pathname }?${ searchParams.toString() }`);
  // 更新数据
  updateData();
};


</script>

<template>
  <div :class="ns.b()">
   <contribute-chart v-if="isCategoriesPage() || isTagsPage() "/>
   <div class="Home">
      <div class="home-content__post">
        <ul>
          <li v-for="post in currentPosts" :key="post.url" :class="[{ 'full-cover-wrapper': coverImgMode === 'full' }]">
            <HomePostItem :post />
          </li>
        </ul>
        <div :class="`${ns.e('pagination')} flx-justify-center`">
          <Pagination
              v-if="posts.sortPostsByDateAndSticky.length >= pageInfo.pageSize"
              v-model="pageInfo"
              v-bind="pagePropsRef"
              @pagination="handlePagination"
        />
        </div>
      </div>
      <div :class="ns.e('home-home-content__info')"><HomeInfo /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.Home{
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: start;

  @media (max-width: 768px) {
    flex-wrap: wrap;

   .home-content__post {
      width: 100%;
    }

   .tk-postList__home-home-content__info {
      width: 100%;
      margin-top: 2rem;
    }
  }
}

.home-content__post {
  flex: 1;
  margin: 0 2rem;
  max-width: 60rem;
}

</style>