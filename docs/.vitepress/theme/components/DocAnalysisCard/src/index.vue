<script setup lang="ts">
import { computed, Ref, unref } from "vue";
import { useData } from "vitepress";
import { usePosts, useUnrefData } from "../../configProvider";
import { useNamespace } from "../../../hooks";
import { dayDiff, getNowDate, isFunction, timeDiff } from "../../../helper";
import { HomeCard } from "../../";
import docAnalysisSvg from "../../../assets/svg/docAnalysis";
import { DocAnalysis, DocAnalysisInfo } from "../../../config/types";

defineOptions({ name: "DocAnalysisCard" });

const ns = useNamespace("docAnalysis");

const { frontmatter, theme } = useUnrefData();
// 使用 useData 的 theme 是为了监听国际化切换来动态修改站点信息的内容
const { theme: themeRef } = useData();
// 站点信息配置项
const {
  createTime,
  siteView = true,
  title = `${docAnalysisSvg}站点信息`,
  overrideInfo = [],
  appendInfo = [],
}: DocAnalysis = { ...theme.webSiteInfo, ...frontmatter.tk?.docAnalysis };

const docAnalysisInfo = computed(() => unref(themeRef).docAnalysisInfo || {});

const finalTitle = computed(() => {
  if (isFunction(title)) return title(docAnalysisSvg);
  return title;
});

const createToNowDay = dayDiff(createTime || getNowDate());

const posts = usePosts();

/**
 * 本周新增的文章数
 */
const postAddNum = computed(() => {
  const sortPostsByDate = unref(posts).sortPostsByDate;
  let weekAddNum = 0;
  let monthAddNum = 0;

  const currentDate = new Date(getNowDate());

  for (const item of sortPostsByDate) {
    if (!item.date) continue;

    const postDate = new Date(item.date);

    if (postDate.getTime() > currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) weekAddNum++;
    if (postDate.getTime() > currentDate.getTime() - 30 * 24 * 60 * 60 * 1000) monthAddNum++;
    else return { weekAddNum, monthAddNum }; // sortPostsByDate 本身已经对时间排好序了，因此不满足近一月，也就不需要遍历了
  }

  return { weekAddNum, monthAddNum };
});

/**
 * 格式化字数
 */
const formatWordCount = (wordCount: number) => {
  if (wordCount < 1000) return wordCount + "";
  if (wordCount < 1000000) return Math.round(wordCount / 100) / 10 + "k";
  return Math.round(wordCount / 10000) / 10 + "w";
};

type DocAnalysisResolve = DocAnalysisInfo & { originValue?: string | number | Ref<string> };

const docAnalysisList = computed<DocAnalysisResolve[]>(() => [
  {
    key: "totalPosts",
    label: "文章数目",
    originValue: unref(docAnalysisInfo).fileList.length,
    value: `${unref(docAnalysisInfo).fileList.length} 篇`,
  },
  {
    key: "weekAddNum",
    label: "近一周新增",
    originValue: unref(postAddNum)?.weekAddNum,
    value: `${unref(postAddNum)?.weekAddNum} 篇`,
  },
  {
    key: "monthAddNum",
    label: "近一月新增",
    originValue: unref(postAddNum)?.monthAddNum,
    value: `${unref(postAddNum)?.monthAddNum} 篇`,
  },
  {
    key: "runtime",
    label: "已运行时间",
    originValue: createTime,
    value: `${createToNowDay === 0 ? "不到一天" : `${createToNowDay} 天`}`,
  },
  {
    key: "totalWordCount",
    label: "本站总字数",
    originValue: unref(docAnalysisInfo).totalFileWords,
    value: `${formatWordCount(unref(docAnalysisInfo).totalFileWords)} 字`,
  },
  {
    key: "lastActiveTime",
    label: "最后活动时间",
    originValue: unref(docAnalysisInfo).lastCommitTime,
    value: timeDiff(unref(docAnalysisInfo).lastCommitTime),
  },
  {
    key: "viewCount",
    label: "本站被访问了",
    value: `<span id="busuanzi_site_pv" ></span>次`,
    show: siteView,
  },
  {
    key: "visitCount",
    label: "本站曾来访过",
    value: `<span id="busuanzi_site_uv" ></span>人`,
    show: siteView,
  },
  ...appendInfo,
]);

if (overrideInfo.length) {
  unref(docAnalysisList).forEach((item: DocAnalysisResolve) => {
    const override = overrideInfo.find(overrideItem => overrideItem.key === item.key);
    if (override) {
      item.label = override.label || item.label;
      item.value = override.value ? override.value(item.originValue || "", item.value) : item.value;
      item.show = override.show !== false;
    }
  });
}
</script>

<template>
  <HomeCard :title="finalTitle" :class="ns.b()">
      <div v-for="item in docAnalysisList" :key="item.key">
        <div v-if="item.show !== false" :class="ns.e('item')">
          <span v-html="item.label" />
          <span v-html="item.value" />
        </div>
      </div>
  </HomeCard>
</template>
