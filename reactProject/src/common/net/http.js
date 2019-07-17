/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-07-03 16:01:06
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-04-28 21:06:20
 * @Note http网络封装
 * @flow
 */

import cot from 'cookie.js'
import { DEV, PRE, PROD } from '../../config/config'

let hostName = document.location.hostname

let preLineSwitch = hostName.indexOf('10.100.69.21') >= 0 || hostName.indexOf('pre-') >= 0

let onlineSwitch = hostName.indexOf('fundying') >= 0

const ENV = {
  DEV: DEV,
  PRE: PRE,
  PROD: PROD
}

const debugSwicth = true
/***
 * 生成HTTP请求函数
 * @param method
 */
const http_factory = method => {
  return async (url: string, params: any, timeout = 30 * 1000) => {
    url = url_mapper(url)

    let myHeaders = new Headers()
    myHeaders.set('Content-Type', 'application/x-www-form-urlencoded')

    const requestOptions = {
      method: method || 'POST',
      headers: myHeaders,
      timeout: timeout
    }

    let token = cot.get('token')
    const newParams = {
      ...params,
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

    /**
     * 发送http请求
     * @returns {*}
     */
    const send_request = () => {
      return new Promise((resolve, reject) => {
        // console.log(url, requestOptions)

        fetch(url, requestOptions)
          .then(response => {
            resolve(response)
          })
          .catch(e => {
            console.log('网络错误', e.message, '--------', e)
            resolve({
              status: -100,
              code: '10000',
              data: [],
              msg: '网络信息弱，暂时无法刷新，请您稍后再试'
            })
          })
      })
    }

    try {
      const http_result = await send_request()
      console.log(url + paramsToGet(newParams))

      if (http_result.status === 200) {
        const text = await http_result.text()
        const json = JSON.parse(text)

        console.log(json)
        return json
      } else {
        console.log(http_result)
        return {
          status: -100,
          code: '10000',
          data: [],
          msg: '网络信息弱，暂时无法刷新，请您稍后再试'
        }
      }
    } catch (e) {
      console.log(e + ':' + url)
      return {
        status: -100,
        code: '10000',
        data: [],
        msg: '网络信息弱，暂时无法刷新，请您稍后再试'
      }
    }
  }
}

//将json对象拼接成 key=val&key=val 的字符串形式
const obj2params = obj => {
  var result = ''
  var item
  for (item in obj) {
    if (typeof obj[item] === 'object') {
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

/**
 * 参数转换Get
 *
 * @param {*} params
 * @returns
 */
function paramsToGet(params) {
  let param = null
  for (let key in params) {
    if (!param) {
      param = key + '=' + params[key]
    } else {
      param = param + '&' + key + '=' + params[key]
    }
  }

  if (param) {
    param = '?' + param
  }

  return param
}

/**
 * URL 计算请求Url
 * @param api
 */
export const url_mapper = (api: string) => {
  let baseUrl = onlineSwitch ? ENV.PROD : preLineSwitch ? ENV.PRE : ENV.DEV
  let fullUrl = baseUrl + api
  return fullUrl
}

export const contains = (arr: any, obj: any) => {
  var i = arr.length
  while (i--) {
    if (url_mapper(arr[i]) === obj) {
      return true
    }
  }
  return false
}

export const http_get = (api, params) => {
  let url = url_mapper(api) + paramsToGet(params)
  return url
}

export const http_post = http_factory('POST')
