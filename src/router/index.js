import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user'
import empty from '@/components/empty'

import phone from '@/components/phone/phone'
import iphone from '@/components/phone/iphone/iphone'
import huawei from '@/components/phone/huawei/huawei'









import demoList from '@/demo/list'
import excel from '@/demo/excel/excel'
import readExcel from '@/demo/excel/readExcel'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: empty
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/phone',
      component: phone,
      children:[
        {path:'iphone',name:'iphone',component: iphone},
        {path:'huawei/:id/:name',name:'huawei',component: huawei},

      ]
    },
    {
      path: '/demoList',
      name:'demoList',
      component: demoList,

    },
    {
      path: '/excel',
      name:'excel',
      component: excel,

    },
    {
      path: '/readExcel',
      name:'read-excel',
      component: readExcel,

    }
  ]
})
