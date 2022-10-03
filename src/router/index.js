import Vue from 'vue'
import LandingPage from '@/pages/LandingPage'
import ArticlePage from '@/pages/ArticlePage'
import Router from 'vue-router'
import VueRouter from 'vue-router'

Vue.use(Router)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/article',
      name: 'ArticlePage',
      component: ArticlePage
    }
  ]
})

export default router
