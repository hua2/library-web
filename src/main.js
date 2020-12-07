import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './api' // 导入api接口

import bootstrap from './utils/bootstrap'

import './plugins/element.js'

import './assets/css/base.css'
import './assets/css/utilities.css'
import './assets/scss/app.scss'
import './assets/scss/form.scss'

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

Vue.prototype.$api = api // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
