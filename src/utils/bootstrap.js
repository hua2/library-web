import store from '@/store'
export default function Initializer() {
  // init location by json
  // store.dispatch('getRegionData')

  // 检查token是否过期 2小时
  const now = new Date().getTime()
  const tokenTime = new Date(store.state.account.tokenTime).getTime()
  if (now - tokenTime > 2 * 60 * 60 * 1000) {
    store.commit('logout')
    return
  }
  // 已经有token 获取用户信息
  if (store.state.account.token) {
    store.dispatch('getLoginUserDate')
  }
  // last step
}
