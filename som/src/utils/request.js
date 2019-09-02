import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.token = 'header-token';
axios.defaults.timeout = 3000;

axios.interceptors.request.use(config=>{
  // 一般在此判断登录状态
    console.log(config)
    return config
  },
  error => console.log(error)
);
axios.interceptors.response.use(res=>{
  // 在此刷新登陆状态(改变token)
    console.log(res);
  },
  error => console.log(error)
);



export function get(url,body) {
  return axios.get(`${url}`,body)
}

