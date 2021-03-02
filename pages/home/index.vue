<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'your_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'global_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{active: tab === 'tag'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: tag,
                      tag: tag
                    },
                  }"
                  >{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: 'article.author.username',
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.updatedAt | date('MMM D, YYYY') }}</span>
              </div>
              <button
              @click="onFavoritesCount(article)"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled="article.articleDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 页码 -->
          <nav>
            <ul class="pagination" v-for="item in totalPage" :key="item">
              <li class="page-item" :class="{active: item === page}">
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag,
                      tab: tab
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- tags -->
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <nuxt-link
              :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag: item,
                },
              }"
              v-for="item in tags"
              :key="item"
              class="tag-pill tag-default"
              >{{ item }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getTags, getFeedArticles, favorite, unFavorite } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      article: "",
    };
  },
  async asyncData({ query, store }) {
    const limt = 20;
    const page = Number.parseInt(query.page || 1);
    // console.log(store.state.user);
    // 当为已经登录状态并且tab为your_feed，获取getArticles ，否在为获取文章
    const tab = query.tab || 'global_feed'
    const { tag } = query;
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    const [articlesRes, tagRes] = await Promise.all([
      loadArticles({
        limt,
        offset: (page - 1) * limt,
        tag
      }),
      getTags(),
    ]);
    const tags = tagRes.data.tags;
    // console.log(tagRes);
    // console.log(articlesRes);
    const { articles, articlesCount } = articlesRes.data;
    // 添加articleDisabled属性，禁用状态
    articles.forEach(article => article.articleDisabled = false)
    // console.log(data);
    return {
      articles,
      articlesCount,
      limt,
      page,
      tags,
      tag,
      tab
    };
  },
  methods: {
    async onFavoritesCount (article) {
      article.articleDisabled = true
      if (article.favorited) {
        console.log(article.slug);
        // 取消点赞
        await unFavorite(article.slug)
        article.favoritesCount += -1
        article.favorited = false
      } else{
        // 点赞
       await favorite(article.slug)
        article.favoritesCount += 1
        article.favorited = true
      }
      article.articleDisabled = false
    }
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limt);
    },
  },
};
</script>

<style></style>
