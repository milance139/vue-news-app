import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$apiKey = "9cd715788d1b40c2828d38a9d5c197d6"

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  store,
  router,
  render: h => h(App)
})
