<script setup lang="ts">
import { computed, unref, ref, watch, onMounted } from "vue";
import { useRoute, useData } from "vitepress";
import { useNamespace } from "../../../hooks";
import { usePosts, useUnrefData } from "../../configProvider";
import { HomeCard } from "../../";
import categorySvg from "../../../assets/svg/category";
import { isFunction } from "../../../helper";
import { Category } from "../../../config/types";

defineOptions({ name: "HomeCategoryCard" });

const ns = useNamespace("category");

const { categoriesPage = false } = defineProps<{ categoriesPage?: boolean }>();

const { frontmatter, theme, site } = useUnrefData();
const route = useRoute();
const pageNum = ref(1);
// 分类配置项
const {
  path = "/categories",
  pageTitle = `${categorySvg}全部分类`,
  homeTitle = `${categorySvg}文章分类`,
  limit = 5,
  autoPage = false,
  pageSpeed = 4000,
}: Category = { ...theme.category, ...frontmatter.tk?.category };

const posts = usePosts();
const { localeIndex } = useData();
const categories = computed(() => unref(posts).groupCards.categories);

// 当前显示的分类，如果是在分类页，则显示所有分类，如果在首页，则分页显示
const currentCategories = computed(() => {
  const c = unref(categories);
  const p = unref(pageNum);
  return categoriesPage ? c : c.slice((p - 1) * limit, p * limit);
});

const finalTitle = computed(() => {
  let pt = isFunction(pageTitle) ? pageTitle(categorySvg) : pageTitle;
  let ht = isFunction(homeTitle) ? homeTitle(categorySvg) : homeTitle;
  return { pt, ht };
});

// 当前选中的分类，从 URL 查询参数中获取
const category = ref("");

onMounted(() => {
  if (typeof document !== "undefined") {
    watch(
        route,
        () => {
          const c = new URL(window.location.href).searchParams.get("category");
          if (c && c != unref(category)) category.value = c;
        },
        { immediate: true }
    );
  }
});


const itemRefs = ref<HTMLLIElement[]>([]);

const categoriesPageLink = computed(() => {
  const localeIndexConst = unref(localeIndex);
  const localeName = localeIndexConst !== "root" ? `/${localeIndexConst}` : "";
  // 兼容国际化功能，如果没有配置多语言，则返回 '/categories'
  return `${localeName}${path}${site.cleanUrls ? "" : ".html"}`;
});
</script>

<template>
  <HomeCard
    :page="!categoriesPage"
    v-model="pageNum"
    :pageSize="limit"
    :total="categories.length"
    :title="finalTitle[categoriesPage ? 'pt' : 'ht']"
    :title-link="categoriesPageLink"
    :autoPage
    :pageSpeed
    :class="ns.b()"
  >
    <template #default="{ transitionName }">
      <TransitionGroup
        v-if="categories.length"
        :name="transitionName"
        tag="div"
        mode="out-in"
        :class="`${ns.e('list')} flx-column`"
      >
        <a
          ref="itemRefs"
          v-for="(item, index) in currentCategories"
          :key="item.name"
          :href="`${categoriesPageLink}?category=${encodeURIComponent(item.name)}`"
          :class="[{ active: item.name === category }, 'hover-color']"
          :style="`top: ${index * itemRefs?.[index]?.getBoundingClientRect().height || 0}px`"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.length }}</span>
        </a>

        <a v-if="!categoriesPage && limit < categories.length" :href="categoriesPageLink">更多 ...</a>
      </TransitionGroup>

      <div v-else :class="ns.m('empty')">暂无热门文章</div>
    </template>
  </HomeCard>
</template>
