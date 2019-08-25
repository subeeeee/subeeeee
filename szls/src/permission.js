import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {Message} from 'element-ui'
import {getToken} from '@/utils/auth' // 验权
import {
  userInfo, getAllmenus
} from '@/api/login/login.js'

const whiteList = ['/login', '/userinfo','/rotationPlanMan'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
// console.log(to)
  if (sessionStorage.getItem('TOKENL')) {
    //   console.log(token)
    //  首先走else 获取用户信息，然后不清空用户信息token，还是会跳转到首页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
      // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      let codes = sessionStorage.getItem("userRole")
      getAllmenus(codes).then(res => {
        const xzdata = res.data[0].children[0]
        sessionStorage.setItem('xzdata', JSON.stringify(xzdata))
        // commit('SET_XZDATA', xzdata)
        next()
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again')
          if(from.path!='/login'){
            next({
              path: '/'
            })
          }
          return
        })
      })
      /* if (store.getters.data.length === 0) {
           store.dispatch('GetInfo').then(res => {
             const codes = res.data.userRole
             getAllmenus(codes).then(res => {
               const xzdata = res.data[0].children[0]
               sessionStorage.setItem('xzdata', JSON.stringify(xzdata))
               // commit('SET_XZDATA', xzdata)
               next()

             })
           }).catch((err) => {
             store.dispatch('FedLogOut').then(() => {
               Message.error(err || 'Verification failed, please login again')
               if(from.path!='/login'){
                 next({
                   path: '/'
                 })
               }
               return
             })
           })
         } else {
         next()
         }*/
      // next()

    }
  } else {
    //   console.log(login)
    // next('/login')
    if (whiteList.indexOf(to.path) !== -1) {

      if (to.path == "/userinfo") {
        userInfo().then(res => {
          const LoginCode = {
            loginCode: '1',
            username: res.data.username,
            password: res.data.password
          }
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('countyCode', res.data.countyCode)
          sessionStorage.setItem('TOKENL', res.data.token)
          sessionStorage.setItem('LoginCode', JSON.stringify(LoginCode))
          sessionStorage.setItem('orgName', res.data.orgName)
          sessionStorage.setItem('orgCode', res.data.orgCode)
          sessionStorage.setItem('userName', res.data.userName)
          sessionStorage.setItem('deptName', res.data.deptName)
          sessionStorage.setItem('userCode', res.data.userCode)
          sessionStorage.setItem('userType', res.data.userType)
          sessionStorage.setItem('userTitle', res.data.userTitle)
          sessionStorage.setItem('userRole', res.data.userRole)
          sessionStorage.setItem('userNodeLevel', res.data.userNodeLevel)
          next('/login')
        })
      } else {
        next()
      }

    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
