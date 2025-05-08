<template>
 <Layout>
   <template #not-found>
     <ClientOnly>
       <NotFound />
     </ClientOnly>
   </template>

   <template #doc-top>
      <ClientOnly>
         <GlobalTip />
     </ClientOnly>
   </template>

   <template #doc-footer-before>
      <ClientOnly>
         <BackTop />
     </ClientOnly>
   </template>

   <template #home-features-after>
     <ClientOnly>
       <HomePostList />
     </ClientOnly>
   </template>

   <template #layout-bottom>
     <ClientOnly>
        <Footer></Footer>
     </ClientOnly>
   </template>

   <template #page-top>
     <ClientOnly>
       <contribute-chart/>
       <archives-page />
     </ClientOnly>
   </template>

   <template #doc-before>
      <ClientOnly>
        <ArticleImagePreview />
        <ArticlePageStyle />
        <CodeBlockToggle />
        <pageInfo />
      </ClientOnly>
   </template>
 </Layout>
</template>


<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import NotFound from "../components/common/NotFound.vue";
import GlobalTip from "../components/common/GlobalTip.vue";
import pageInfo from "../components/ArticleInfo/pageInfo.vue"
import BackTop from '../components/common/BackTop.vue';
import usePermalink from "vitepress-plugin-link/usePermalink";
import {
  Footer,
  HomePostList,
  ArchivesPage,
  ArticleImagePreview,
  ArticlePageStyle,
  CodeBlockToggle
} from "../components/index";
import ContributeChart from "../components/common/ContributeChart.vue";


const { Layout } = DefaultTheme

usePermalink().startWatch();



</script>

<style scoped>

</style>