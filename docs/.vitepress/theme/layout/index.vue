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

     <template #home-features-after>
       <ClientOnly>
          <HomePostList></HomePostList>
       </ClientOnly>
     </template>

     <template #layout-bottom>
       <ClientOnly>
          <Footer></Footer>
       </ClientOnly>
     </template>

     <template #page-top>
       <ClientOnly>
         <archives-page />
         <catalogue-page />
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
import NotFound from "../components/NotFound.vue";
import GlobalTip from "../components/GlobalTip.vue";
import pageInfo from "../components/ArticleInfo/pageInfo.vue"
import usePermalink from "vitepress-plugin-link/usePermalink";
import {
  Footer,
  HomePostList,
  ArchivesPage,
  CataloguePage,
  ArticleImagePreview,
  ArticlePageStyle,
  CodeBlockToggle
} from "../components/index";

const { Layout } = DefaultTheme

usePermalink().startWatch();



</script>

<style scoped>

</style>