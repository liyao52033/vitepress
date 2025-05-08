<script setup lang="ts">
import { useNamespace } from "../../../hooks";
import { usePosts, useUnrefData } from "../../configProvider";
import { Content } from "vitepress";

defineOptions({ name: "ArchivesPage" });

const ns = useNamespace("archives");

const { frontmatter } = useUnrefData();

const posts = usePosts();
</script>

<template>
  <div :class="`${ns.b()} ${ns.joinNamespace('page')}`">
    <div :class="`${ns.e('header')} flx-justify-between`">
      <div :class="ns.joinNamespace('page-title-h1')">{{ frontmatter.title }}</div>
      <div class="count">总共 {{ posts.sortPostsByDate.length }} 篇文章</div>
    </div>
    <div :class="ns.e('timeline')">
      <template v-for="(monthPosts, year) in posts.groupPostsByYearMonth" :key="year">
        <div :class="`${ns.em('timeline', 'year')} flx-justify-between`">
          <div class="year">{{ String(year).trim() === "NaN" ? "未指定" : String(year).trim() }}年</div>
          <div class="count">{{ posts.groupPostsByYear[year].length }}篇</div>
        </div>

        <div :class="ns.e('timeline__m')">
          <template v-for="(p, month) in monthPosts" :key="month">
            <div :class="`${ns.em('timeline__m', 'month')} flx-justify-between`">
              <div class="month">{{ String(month) === "NaN" ? "未指定" : month }}月</div>
              <div class="count">{{ p.length }}篇</div>
            </div>

            <ul>
              <li v-for="item in p" :key="item.url">
                <a :href="item.url">
                  <span class="date">{{ item.date?.slice(5, 10) }}</span>
                  <span>{{ item.title }}</span>
                </a>
              </li>
            </ul>
          </template>
        </div>
      </template>
    </div>

    <div class="vp-doc">
      <Content />
    </div>
  </div>
</template>
