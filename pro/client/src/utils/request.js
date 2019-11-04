import axios from 'axios'
import qs from 'query-string'
import loading from './loading'
export class BaseRequest {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://192.168.3.109:8023/api',
      timeout: 10 * 1000
    });
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [data => qs.stringify(data)]
    }
    this.request.interceptors.request.use(config => {
      loading.open()
      config.headers['Content-Type'] = 'application/json'
      return config
    })
    this.request.interceptors.response.use(config => {
      console.log(config)
      return config
    })
  }
}