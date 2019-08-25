import axios from 'axios'
import { MessageBox,Message } from 'element-ui'
import store from '../store'
import { getToken,setToken } from '@/utils/auth'


// 创建axios实例
const service = axios.create({
 
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // baseURL: process.env.BASE_API,
  // timeout: 5000 // 请求超时时间
})
 
// request拦截器
if(!window.flag){
  service.interceptors.request.use(config => {
    let token = window.localStorage.getItem("token");
    if (sessionStorage.getItem('TOKENL')) {
      config.headers['token'] = sessionStorage.getItem('TOKENL') // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //config.headers['token']='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJ1c2VyQWNjb3VudCI6InhpYW9sYiIsImV4cCI6MTU2NTk0NDM0MywidXNlcklkIjoiVTAwMDAyNTgiLCJpYXQiOjE1NjU4NTc5NDMsImp0aSI6IjhiMjI4ZWZhLWU0MTQtNGE2Zi05ZDkzLTdiZjgzOTQyY2YzNSJ9.JeFx4k0P0h9VZEcp_kxwyUuME1E-tHAWyWQnYptYs40'
    return config
  }, error => {
    Promise.reject(error)
  })
}

 
axios.defaults.withCredentials = true // 请求携带cookie
// respone拦截器
service.interceptors.response.use(response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
  let token = window.localStorage.getItem('token');
  if(response.headers.token){
    window.flag = true;
    window.localStorage.removeItem('token')
    window.localStorage.setItem("token",response.headers.token);
    setToken(response.headers.token)
    window.flag = false;
  }
 
  const res = response.data
  if (res.infoCode === 200) {
    
    return res
  } else {
    if(res.infoCode === 401){
      window.location.href = 'http://218.241.206.66:8097/web/total/#/login'
    }
    // Message({
    //   message: res.message,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return res
  }
}, error => {
  let code = error.message.substr(error.message.length - 3)
    if (code === '401') {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      })
     return Promise.reject('error');
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 1000
      });
    }
})
 
export default service
