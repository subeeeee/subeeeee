import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from

Vue.use(Router)
const vuex = [
  {
    path: '/vuex/:name/:code/learn',
    name: 'vuex_father',
    component: ()=>import('@/pages/vuex/father')
  },
]
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=>import('@/pages/main')
    },
    ...vuex,
  ]
})
