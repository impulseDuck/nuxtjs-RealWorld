<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>
        <articleMeta :article="article"> </articleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <articleMeta :article="article"> </articleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
         <articleComments :article="article"></articleComments> 

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesDetail } from "@/api/article.js";
import articleComments from './components/article-comments'
import MarkdownIt from 'markdown-it'
import articleMeta from './components/article-meta'
export default {
  name: "article",
  middleware: "authenticated",
  components: {
    articleMeta,
    articleComments
  },
  async asyncData({ params }) {
    // 获取文章详情
    const { data } = await getArticlesDetail(params.slug);
    console.log(params, 'params.slug');
    const {article} = data;
    // 将内容转化为html格式
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    // console.log(article);
    return {
      article,
      
    };
  },
  // 页面标题SEO
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
};
</script>

<style></style>
