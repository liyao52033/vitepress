<script setup lang="ts">
import * as echarts from "echarts"
import { ref, watch, nextTick, computed, useTemplateRef, onMounted } from "vue";
import { useData } from "vitepress";
import { usePosts } from "../configProvider";
import { formatDate } from "../../helper";
import { useNamespace } from "../../hooks";

defineOptions({
  name: "ContributeChart",
});

const ns = useNamespace("archives");
const { isDark } = useData();
const posts = usePosts();

const today = formatDate(new Date(), "yyyy-MM-dd");
const beforeOnYear = formatDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), "yyyy-MM-dd");



const contributeList = computed(() => {
  const contributeObject = ref({});

  posts.value.sortPostsByDate.forEach(item => {
    const date = item.date?.substring(0, 10) || formatDate(new Date(), "yyyy-MM-dd");
    if (contributeObject.value[date]) contributeObject.value[date]++;
    else contributeObject.value[date] = 1;
  });

  const contributeDays = Object.keys(contributeObject.value);

  return contributeDays.map((item: string) => [item, contributeObject.value[item]]).reverse();
});

const generateFullDateRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray: [string, number][] = [];

  while (startDate <= endDate) {
    const dateStr = formatDate(startDate, "yyyy-MM-dd");
    dateArray.push([dateStr, 0]);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dateArray;
};

const fullDateRange = computed(() => {
  return generateFullDateRange(beforeOnYear, today);
});

const mergedContributeList = computed(() => {
  const fullRange = fullDateRange.value;
  const contributeData = contributeList.value;

  return fullRange.map(([date, count]) => {
    const found = contributeData.find(item => item[0] === date);
    return found ? found : [date, count];
  });
});

const chartRef = useTemplateRef("chartRef");
const contributeChart = ref()

const option = {
  tooltip: {
    formatter: function (params: any) {
      if (params.value.length > 1 && params.value[1] > 0) {
        return `${params.value[0]} <br/> ${params.value[1]} 篇文章`;
      } else {
        return `${params.value[0]}<br/> 摸鱼中，没有发布文章`;
      }
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: 5,
    inRange: {
      color: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127", "#196127"],
    },
  },
  calendar: {
    left: "center",
    itemStyle: {
      color: isDark.value ? "#787878" : "#ebedf0",
      borderWidth: 5,
      borderColor: isDark.value ? "#1b1b1f" : "#fff",
      shadowBlur: 0,
    },
    cellSize: [20, 20],
    range: [beforeOnYear, today],
    splitLine: true,
    dayLabel: {
      firstDay: 7,
      nameMap: "ZH",
      color: "#3c3c43",
    },
    monthLabel: {
      color: "#3c3c43",
    },
    yearLabel: {
      show: true,
      position: "right",
    },
    silent: {
      show: false,
    },
  },
  series: {
    type: "heatmap",
    coordinateSystem: "calendar",
    data: [],
  },
};

const renderChart = (data: any) => {
  option.calendar.itemStyle.borderColor = isDark.value ? "#1b1b1f" : "#fff";
  option.calendar.itemStyle.color = isDark.value ? "#787878" : "#ebedf0";
  if (contributeChart.value) {
    echarts.dispose(contributeChart.value);
  }
  if (chartRef.value) {
    contributeChart.value = echarts.init(chartRef.value);
  }
  option.series.data = data;
  contributeChart.value.setOption(option);
};

watch(
  mergedContributeList,
  async newVal => {
    await nextTick();
    renderChart(newVal);
  },
  { immediate: true }
);

watch(isDark, () => {
  renderChart(mergedContributeList.value);
});

onMounted(async () => {
  await nextTick();
  renderChart(mergedContributeList.value);
});

</script>

<template>
  <div :class="`${ns.b()} ${ns.joinNamespace('home')}`">
    <div class="contribute__chart">
      <div class="chart__box" ref="chartRef"></div>
    </div>
  </div>
</template>

<style>
.tk-page.tk-archives {
  max-width: 1220px;
}

.tk-archives .contribute__chart {
  width: 100%;
  height: 260px;
}

.tk-archives .contribute__chart .chart__box {
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>