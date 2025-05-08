<script setup lang="ts">
import { unref, watch, computed, ref, onMounted } from "vue";
import { useData, useRoute } from "vitepress";
import { useNamespace } from "../../../hooks";
import { usePosts, useUnrefData, getBgColor } from "../../configProvider";
import { HomeCard } from "../../";
import tagSvg from "../../../assets/svg/tag";
import { isFunction } from "../../../helper";
import { Tag } from "../../../config/types";

defineOptions({ name: "HomeTagCard" });

const ns = useNamespace("tag");

const { tagsPage = false } = defineProps<{ tagsPage?: boolean }>();

const { frontmatter, theme, site } = useUnrefData();
const route = useRoute();
const pageNum = ref(1);
// 标签配置项
const {
  path = "/tags",
  pageTitle = `${tagSvg}全部标签`,
  homeTitle = `${tagSvg}热门标签`,
  limit = 21,
  autoPage = true,
  pageSpeed = 4000,
  bgColor,
}: Tag = { ...theme.tag, ...frontmatter.tk?.tag };

const posts = usePosts();
const { localeIndex } = useData();
const tags = computed(() => unref(posts).groupCards.tags);

// 当前显示的标签，如果是在标签页，则显示所有标签，如果在首页，则显示前 limit 个标签
const currentTags = computed(() => {
  const t = unref(tags);
  const p = unref(pageNum);
  return tagsPage ? t : t.slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  let pt = isFunction(pageTitle) ? pageTitle(tagSvg) : pageTitle;
  let ht = isFunction(homeTitle) ? homeTitle(tagSvg) : homeTitle;
  return { pt, ht };
});

const tag = ref("");

// 当前选中的标签，从 URL 查询参数中获取

onMounted(() => {
  if (typeof document !== "undefined") {
    watch(
        route,
        () => {
          const t = new URL(window.location.href).searchParams.get("tag");
          if (t && t != unref(tag)) tag.value = t;
        },
        { immediate: true }
    );
  }
});

const tagBgColor = bgColor || getBgColor();

const getTagStyle = (index: number) => {
  // 标签背景色
  const color = tagBgColor[index % tagBgColor.length];
  return { backgroundColor: color, "--home-tag-color": color };
};

const tagsPageLink = computed(() => {
  // 兼容国际化功能，如果没有配置国际化，则返回 '/tags'
  const localeIndexConst = unref(localeIndex);
  const localeName = localeIndexConst !== "root" ? `/${localeIndexConst}` : "";
  return `${localeName}${path}${site.cleanUrls ? "" : ".html"}`;
});
</script>

<template>
  <div>
    <HomeCard
        :page="!tagsPage"
        v-model="pageNum"
        :pageSize="limit"
        :total="tags.length"
        :title="finalTitle[tagsPage ? 'pt' : 'ht']"
        :title-link="tagsPageLink"
        :autoPage
        :pageSpeed
        :class="ns.b()"
    >

    <template #default="{ transitionName }">
      <TransitionGroup v-if="tags.length" :name="transitionName" tag="div" mode="out-in" :class="ns.e('list')">
        <a
            v-for="(item, index) in currentTags"
            :key="item.name"
            :style="getTagStyle(index)"
            :href="`${tagsPageLink}?tag=${encodeURIComponent(item.name)}`"
            :class="{ active: item.name === tag }"
        >
          {{ item.name }}
        </a>

        <a v-if="!tagsPage && limit < tags.length" :href="tagsPageLink" class="more">更多 ...</a>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')">暂无热门标签</div>
    </template>
  </HomeCard>
  </div>


</template>



