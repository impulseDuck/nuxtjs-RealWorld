// nuxt.config 路由配置表
module.exports =  {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve){
      // console.log(routes, 1);
      routes.splice(0) //清除routes
      routes.push(...[
        {
          name: '',
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              name: 'home',
              path: '',
              component: resolve( __dirname, 'pages/home/')
            },
            {
              name: 'login',
              path: '/login',
              component: resolve( __dirname, 'pages/login/')
            },
            {
              name: 'register',
              path: '/register',
              component: resolve( __dirname, 'pages/login/')
            },
            {
              name: 'settings',
              path: '/settings',
              component: resolve( __dirname, 'pages/settings/')
            },
            {
              name: 'profile',
              path: '/profile/:username',
              component: resolve( __dirname, 'pages/profile/')
            },
            {
              name: 'article',
              path: '/article/:slug',
              component: resolve( __dirname, 'pages/article/')
            },
            {
              name: 'editor',
              path: '/editor',
              component: resolve( __dirname, 'pages/editor/')
            }
          ]
        }
      ])
      
    }
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],
  // 部署
  server: {
    host: '0.0.0.0 ',
    port: 3000
  }
}

