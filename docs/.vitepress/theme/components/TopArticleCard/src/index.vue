<script setup lang="ts">
import { computed, ref, unref } from "vue";
import { useUnrefData, usePosts, getBgColor } from "../../configProvider";
import { useNamespace } from "../../../hooks";
import { HomeCard } from "../../";
import topArticleSvg from "../../../assets/svg/topArticle";
import { TkContentData } from "../../../post/types";
import { isFunction } from "../../../helper";
import { TopArticle } from "../../../config/types";

defineOptions({ name: "TopArticleCard" });

const ns = useNamespace("topArticle");

const posts = usePosts();

const { theme, frontmatter } = useUnrefData();
// 精选文章配置项
const {
  limit = 5,
  title = `${topArticleSvg}精选文章`,
  autoPage = true,
  pageSpeed = 4000,
}: TopArticle = { ...theme.topArticle, ...frontmatter.tk?.topArticle };

const topArticleList = computed(() => {
  const sortPostsByDateAndSticky: TkContentData[] = unref(posts).sortPostsByDateAndSticky;
  return sortPostsByDateAndSticky
    .filter(p => p.frontmatter.top !== undefined)
    .sort((a, b) => (a.frontmatter.top || 0) - (b.frontmatter.top || 0))
    .map((p, index) => ({ ...p, num: index + 1}));
 // return sortPostsByDateAndSticky.filter(p => p.frontmatter.top)?.map((p, index) => ({ ...p, num: index + 1 }));
});

const pageNum = ref(1);

// 当前页的文章列表
const currentTopArticleList = computed(() => {
  const p = unref(pageNum);
  return unref(topArticleList).slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  if (isFunction(title)) return title(topArticleSvg);
  return title;
});

const bgColor = getBgColor();
const itemRefs = ref<HTMLLIElement[]>([]);

const getStyle = (num: number, index: number) => {
  return {
    [ns.cssVarName("num-bg-color")]: bgColor[num % bgColor.length],
    top: `calc(${index} * (calc(${ns.cssVar("gap1")} + ${unref(itemRefs)?.[index]?.getBoundingClientRect().height || 0}px)))`,
  };
};

</script>

<template>
  <HomeCard
    page
    v-model="pageNum"
    :pageSize="limit"
    :total="topArticleList.length"
    :title="finalTitle"
    :autoPage
    :pageSpeed
    :class="ns.b()"
  >
    <template #default="{ transitionName }">
      <TransitionGroup
        v-if="topArticleList.length"
        :name="transitionName"
        tag="ul"
        mode="out-in"
        :class="`${ns.e('list')} flx-column`"
      >
        <li
          ref="itemRefs"
          v-for="(item, index) in currentTopArticleList"
          :key="item.num"
          :class="ns.e('list__item')"
          :style="getStyle(item.num - 1, index)"
        >
          <span :class="['num', { top: item.frontmatter.top !== undefined }]">{{ item.num }}</span>
          <div :class="ns.e('list__item__info')">
            <a :href="item.url" class="hover-color flx-align-center">
              <span class="title sle">{{ item.title }}</span>
            </a>
            <div class="date">{{ item.date.split(' ')[0] }}</div>
          </div>
        </li>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')">暂无精选内容</div>
    </template>
  </HomeCard>
</template>

