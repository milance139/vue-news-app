import Vue from 'vue'
import LandingPage from '@/pages/LandingPage'
import Article from '@/pages/Article'
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
      name: 'Article',
      component: Article
    }
  ]
})

export default router
