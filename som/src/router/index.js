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
const route_son = [
  {
    path: 'router_son1/:name',
    name: 'router_son1',
    component: ()=>import('@/pages/router/son/son1'),
  },
  {
    path: 'router_son2/:name',
    name: 'router_son2',
    component: ()=>import('@/pages/router/son/son2'),
  },
  {
    path: 'router_son3/:name',
    name: 'router_son3',
    component: ()=>import('@/pages/router/son/son3'),
  }
]

const route = [
  {
    path: '/router_father/:f_name',
    name: 'router_father',
    component: ()=>import('@/pages/router/father'),
    children:[ ...route_son ]


  }
]
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: ()=>import('@/pages/main')
    },
    ...vuex,
    ...axios,
    ...route
  ]
})

router.beforeEach((t,f,n)=>{
  console.log(t,f,n)
  n()
})







export default router
