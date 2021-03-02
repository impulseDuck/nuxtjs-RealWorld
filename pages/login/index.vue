<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(message,filed) in err">
              <li v-for="(item,index) in message" :key="index">{{filed}} {{item }}</li>
            </template>
            
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input v-if="!isLogin"
                required
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                required
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, register} from '@/api/user.js'
export default {
  name: 'Login',
  // middleware: 'noauthenticated',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      err: {}
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 操作浏览器的js-cookie
        const Cookie = process.client ? require('js-cookie') : undefined
        const {data} =  this.isLogin ? await login({user: this.user}) : await register({user: this.user})
        console.log(data);
        // 将用户的登录状态存储起来
        this.$store.commit('setUser', data.user)
        // 为了防止刷新数据丢失，需要把数据持久化
        Cookie.set('user', data.user)
        this.$router.push('/')
      } catch (error) {
        // console.log(error);
        this.err = error.response.data.errors
        console.dir(this.err);
      }
      
    }
  }
};
</script>

<style></style>
