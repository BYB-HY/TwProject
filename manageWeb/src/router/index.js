import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerMap'
Vue.use(VueRouter)


const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
