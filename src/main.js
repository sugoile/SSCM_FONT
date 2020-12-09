import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "@/assets/style/base.css"
import "@/assets/style/element.css"
import "@/assets/style/common.css"
import "@/utils/element.js"
import "@/components"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
