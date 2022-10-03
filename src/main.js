import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$apiKey = "cac12746dc2d424eb45f467aa07d7f18"

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  store,
  router,
  render: h => h(App)
})
