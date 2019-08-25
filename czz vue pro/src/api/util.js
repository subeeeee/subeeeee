import Vue from 'vue'
import store from './../store/index'
import resource from 'vue-resource'
import axios from 'axios'
import ElementUI from 'element-ui'

Vue.use(resource)
Vue.use(ElementUI)
const headersObj = {"headers": {'role': 'tester'}}
axios.defaults.withCredentials = true
try{
	axios.defaults.baseURL = process.env.API_ROOT;
	axios.defaults.baseURL = process.env.API_ROOT(); // "http://172.18.96.113:8002/tzxsaas/";
}catch(e){
	//TODO handle the exception
}
//axios.defaults.baseURL = 'http://172.18.79.89:8080/tzxsaas/';
const pref = axios.defaults.baseURL;
axios.interceptors.request.use(
    config => {
    	if(!config['params']){
			config['params']={};
		}
		
		axios.defaults.token = store.getters['Token'];
		config['params']['_s'] = axios.defaults.token;
		config['params']['noOrderBy']='noOrderBy';
		config['params']['sort']='';
    	
        return config
    }, function (error) {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    function (response) {
    // 出现错误，显示错误提示

    return response

},
    function (error) {
    // Do something with response error
    return Promise.reject(error)
})

export function getAjax(_url,p) {
	let params = new URLSearchParams();
	if(p){
		for(let item in p){
			params.append(item, p[item]);
		}
	}
	return axios.post(_url,params)
		.then(function(response) {

			return response.data;
		})
		.catch(function(error) {

			return error;
		});
}

export function getAjaxAll(ajaxall,fun1) {
	axios.all(ajaxall).then(axios.spread(function () {
    		// 只有两个请求都完成才会成功，否则会被catch捕获
    		fun1(arguments) ;
  		}
	));
}

export function get(url, option) {

    return axios.get(`${pref}${url}`, {
        ...headersObj,
        emulateJSON: true,
        ...option
    })

}

export function post(url, body, option) {
    //
    return axios.post(`${pref}${url}`, body, {
        ...headersObj,
        emulateJSON: true,
        ...option,
        withCredentials: true
    }).catch(function (error) {
        if(error.code>0) {
            // alert(error.msg);
        }
        throw 0;
    }.bind(this))

}

export function put(url, body, option) {

    return axios.put(`${pref}${url}`, body, {
        ...headersObj,
        emulateJSON: true,
        ...option
    })

}

export function del(url, option) {
    return axios.delete(`${pref}${url}`, {
        ...headersObj,
        emulateJSON: true,
        ...option
    })

}


