import Vue from 'vue'
import LandingPage from '@/pages/LandingPage'
import Article from '@/components/Article'
import 'vuetify/dist/vuetify.min.css'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    }
  ]
})

