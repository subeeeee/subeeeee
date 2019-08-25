import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
  },
	baseURL: process.env.BASE_API,
  // timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (sessionStorage.getItem('TOKENL')) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

axios.defaults.withCredentials = true // 请求携带cookie
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
		 * code为非20000是抛错 可结合自己业务进行修改*/
    //		console.log(response)
    const res = response.data
    if (res.infoCode !== 200) {
      Message({
        message: '请求失败，请刷新页面后重试',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    const code = error.message.substr(error.message.length - 3)
    if (code === '401') {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
          // window.location.href="http://baidu.com"
        })
      })
      return Promise.reject('error')
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
