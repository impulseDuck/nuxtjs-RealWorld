<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings -</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                /> 
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="updataInfo()">
                Update Settings
              </button>
            </fieldset>
          </form>
          <div style="margin-top: 20px">
            <button class="btn btn-lg btn-primary pull-xs-right" @click="logout()">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getInfo, updateInfo} from '@/api/settings'
import {mapState} from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'seetingsIndex',
  data () {
    return {
      user: {
        email: '',
        bio: '',
        image: '',
        username: '',
        password: ''
      }
    }
  },
  async asyncData () {
    const {data} = await getInfo()
    const {user} = data
    // 添加属性
    return {
      user
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 更新个人信息
    async updataInfo () {
      const {data} = await updateInfo({user: this.user})
      // const {user} = data
      // this.$router.push('/profile/'+ user.username)
    },
    // 退出登录
    logout () {
      const Cookie = process.client ? require('js-cookie') : undefined
      // 删除Cookie中用户登录状态
      Cookie.remove('user')
      // 删除容器中用户登录状态
      this.$store.commit('setUser',null)
      // 回到登录页面
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>