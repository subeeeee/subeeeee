import 'whatwg-fetch'
import Promise from 'promise-polyfill'
import cot from 'cookie.js'
import { DEV, PRE, PROD } from '../config/config'

let onlineSwitch = document.location.hostname.indexOf('fundying') >= 0
const PromiseF = func => new Promise(func)
const ENV = {
  DEV: DEV,
  PRE: PRE,
  PROD: PROD
}
const debugSwicth = true
const applayFetch = (api, method) => data =>
  PromiseF((reso, reje) => {
    let url = !onlineSwitch ? ENV.DEV + api : ENV.PROD + api
    let myHeaders = new Headers()
    myHeaders.set('Content-Type', 'application/x-www-form-urlencoded')
    let requestOptions = {
      method: method || 'POST',
      headers: myHeaders,
      timeout: 30 * 1000
    }
    let token = cot.get('token')
    const newParams = {
      ...data,
      ajax: 1,
      deviceToken: '',
      client: 'Web',
      clientToken: '',
      token: token
    }
    if (method == 'GET') {
      url += '?' + obj2params(newParams)
    } else {
      requestOptions.body = obj2params(newParams)
    }
    debugSwicth && console.log('request:', url, '\n', requestOptions)

    fetch(url, requestOptions)
      .then(response => {
        if (response.status == 200) {
          try {
            reso(response.json())
          } catch (e) {
            debugSwicth && console.log('response err', e)
            reso({
              status: -100,
              code: '10000',
              data: [],
              msg: '网络信息弱，暂时无法刷新，请您稍后再试'
            })
          }
        } else {
          debugSwicth && console.log('response not ok ')
          reso({
            status: -100,
            code: '10000',
            data: [],
            msg: '网络信息弱，暂时无法刷新，请您稍后再试'
          })
        }
      })
      .catch(e => {
        debugSwicth && console.log('catch err', e)
        reso({
          status: -100,
          code: '10000',
          data: [],
          msg: '网络信息弱，暂时无法刷新，请您稍后再试'
        })
      })
  })

//将json对象拼接成 key=val&key=val 的字符串形式
const obj2params = obj => {
  var result = ''
  var item
  for (item in obj) {
    if (typeof obj[item] == 'object') {
      for (let key2 in obj[item]) {
        result += `&${item}[${key2}]=` + encodeURIComponent(obj[item][key2])
      }
    } else {
      result += `&${item}=` + encodeURIComponent(obj[item])
    }
  }
  if (result) {
    result = result.slice(1)
  }
  return result
}

export default applayFetch
