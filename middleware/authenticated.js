// 中间件,当用户没有登录的时候，跳转到登录页面
export default function({store, redirect}){
  if(!store.state.user) {
    return redirect('/login')
  }
}