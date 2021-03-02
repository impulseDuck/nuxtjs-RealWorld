import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7993bc9a = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _260629a8 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _ca115880 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _70ae646c = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _d8cf9780 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _7a62778d = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _91317014 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7993bc9a,
    children: [{
      path: "",
      component: _260629a8,
      name: "home"
    }, {
      path: "/login",
      component: _ca115880,
      name: "login"
    }, {
      path: "/register",
      component: _ca115880,
      name: "register"
    }, {
      path: "/settings",
      component: _70ae646c,
      name: "settings"
    }, {
      path: "/profile/:username",
      component: _d8cf9780,
      name: "profile"
    }, {
      path: "/article/:slug",
      component: _7a62778d,
      name: "article"
    }, {
      path: "/editor",
      component: _91317014,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
