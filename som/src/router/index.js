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
];

const axios = [
  {
    path: '/axios/:pagename/learn',
    name: 'axios_learn',
    component: ()=>import('@/pages/request/axios')
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
    ...axios
  ]
})
