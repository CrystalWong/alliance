// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'Vuex'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Mint)

Vue.config.productionTip = false
// let params = {
//   'loginName': '13000590717',
//   'password': '123456'
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    console.log('创建成功', window.sessionStorage.getItem('loginFlag'))
  }
})
