<script setup lang="ts">
import { User, Calendar, FolderOpened, CollectionTag } from "@element-plus/icons-vue";
import { useRoute } from "vitepress";
import { computed, unref } from "vue";
import { formatDate, isFunction } from "../../helper";
import { TkContentData } from "../../post/types";
import { useNamespace } from "../../hooks";
import { Article } from "../../config/types";
import { PostBaseInfoProps } from "./types";
import { Icon } from "../Icon";
import { usePosts, useUnrefData } from "../configProvider";

defineOptions({ name: "ArticleInfo" });

const ns = useNamespace("articleInfo");

// 首页会传入 post，文章页不传
const { post, scope, split = false } = defineProps<PostBaseInfoProps>();

const { frontmatter, theme } = useUnrefData();
const {
  showIcon = true,
  dateFormat = "yyyy-MM-dd",
  showAuthor = true,
  showDate = true,
  showCategory = true,
  showTag = false,
}: Article = { ...theme.article, ...frontmatter.article, ...frontmatter.tk?.article };

const posts = usePosts();
const route = useRoute();

// 文章创建时间，先读取 post.date，如果不存在，则遍历所有 md 文档获取文档的创建时间（因此建议在文档的 frontmatter 配置 date，让文章扫描耗费性能降低）
const date = computed(() => {
  // 如果 date 是函数，则调用获取返回值作为 date
  const date = post.date;
  if (date) {
    if (isFunction(dateFormat)) return dateFormat(date);
    return formatDate(date, dateFormat);
  }

  // 如果 frontmatter 没有配置 date，则从 posts 中获取文档的创建时间
  const originPosts: TkContentData[] = unref(posts).originPosts;
  const targetPost = originPosts.filter(item => [item.url, `${item.url}.md`].includes(`/${route.data.relativePath}`));

  if (isFunction(dateFormat)) return dateFormat(targetPost[0]?.date || "");
  return formatDate(targetPost[0]?.date || new Date(), dateFormat);
});

const baseInfo = [
  {
    title: "作者",
    icon: User,
    data: post.author?.name,
    href: post.author?.link,
    target: post.author?.link ? "_blank" : "_self",
    show: showAuthor,
  },
  {
    title: "创建时间",
    icon: Calendar,
    data: unref(date),
    href: "/archives",
    show: showDate,
  },
  {
    title: "分类",
    icon: FolderOpened,
    dataList: post.frontmatter?.categories || [],
    href: "/categories?category={data}",
    class: "or",
    show: scope === "home" || showCategory,
  },
  {
    title: "标签",
    icon: CollectionTag,
    dataList: post.frontmatter?.tags || [],
    href: "/tags?tag={data}",
    class: "or",
    show: scope === "home" || showTag,
  },
];
</script>

<template>
  <div :class="[ns.b(), 'flx-align-center', scope]">
    <template v-for="item in baseInfo" :key="item.title">
      <div v-if="item.show && (item.data || item.dataList?.length)" :class="['flx-center', `${scope}-item`, { split }]">
        <Icon v-if="showIcon"><component :is="item.icon" /></Icon>
        <a
          v-if="item.data"
          :title="item.title"
          :href="item.href"
          :target="item.target"
          :class="[item.class, 'hover-color']"
        >
          {{ item.data }}
        </a>
        <a
          v-else
          v-for="(data, index) in item.dataList"
          :key="index"
          :title="item.title"
          :href="item.href?.replace('{data}', encodeURIComponent(data))"
          :class="[item.class, 'hover-color']"
        >
          {{ data }}
        </a>
      </div>
    </template>

    <slot />
  </div>
</template>
