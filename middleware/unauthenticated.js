// 如果已经登录，跳转到首页
export default function({store, redirect}) {
  if(store.state.user) {
    return redirect('/')
  }
}