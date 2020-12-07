import api from '@/api'

function save(name, data, remember = false) {
  if (remember) {
    localStorage.setItem(name, JSON.stringify(data))
  } else {
    sessionStorage.setItem(name, JSON.stringify(data))
  }
}

function get(name) {
  const data = localStorage.getItem(name) || sessionStorage.getItem(name)
  return data ? JSON.parse(data) : null
}

export default {
  state: {
    token: get('USER_TOKEN'),
    tokenTime: get('USER_TOKEN_TIME'),
    forgetValidation: null,
    account: {}
  },
  mutations: {
    // 登录成功将, token保存在localStorage中
    setToken: (state, data) => {
      save('USER_TOKEN', data.token, data.remember)
      save('USER_TOKEN_TIME', new Date().getTime(), data.remember)
      state.token = data.token
    },
    setForgetValidation: (state, data) => {
      state.forgetValidation = data
    },
    setAccount: (state, data) => {
      state.account = data
    },
    // 退出登录将, token清空
    logout: state => {
      localStorage.clear()
      sessionStorage.clear()
      state.token = null
      state.tokenTime = null
    }
  },
  actions: {
    getLoginUserDate({ commit }) {
      api.user.personInfo().then(res => {
        commit('setAccount', res.data)
      })
    }
  }
}
