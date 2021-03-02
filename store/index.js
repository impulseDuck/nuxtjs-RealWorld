// token配置
const cookieparser = process.server ? require('cookieparser') : undefined
// state
// 为了防止数据冲突，必须把state定义成一个函数
export const state = () => {
  return {
    user: null
  }
}
// mutations
export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

// actions
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}