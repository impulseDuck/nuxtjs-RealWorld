import { request } from '@/plugins/request'

// 获取文章详情
export const getArticles = params => {
  return request ({
    url: '/api/articles',
    method: 'GET',
    params
  })
}
// 获取关注的用户文章列表
// Authorization: Token jwt.token.here
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 点赞
export const favorite = slug => {
  return request ({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
    slug
  })
}

// 取消点赞
export const unFavorite = slug => {
  return request ({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
    slug
  })
}

// 获取tags
export const getTags = () => {
  return request ({
    url: '/api/tags',
    method: 'GET'
  })
}

// 获取文章详情
export const getArticlesDetail = slug => {
  return request ({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const geArticleComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 发表文章
export const createArticle = data => {
  return request ({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}