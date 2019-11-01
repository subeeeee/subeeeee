import axios from 'axios'
import qs from 'query-string'
import loading from './loading'
export class BaseRequest {
  constructor() {
    this.request = axios.create({
      baseURL: 'http://192.168.2.150:3000/api',
      timeout: 10 * 1000
    });
    this.dataMethodDefaults = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [data => qs.stringify(data)]
    }
    this.request.interceptors.request.use(config => {
      console.log(config)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      return config
    })
  }
}