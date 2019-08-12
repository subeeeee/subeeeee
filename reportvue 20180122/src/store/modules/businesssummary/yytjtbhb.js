import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yytjtbhb');
/*营业统计同比环比*/
const state = {
	...ParentStore.state,
	name:'yytjtbhb',
	query_type:1,//查询方式
	query_typeData:[
		{id:1,text:'按交易日期查询'},{id:2,text:'按交易机构查询'}
	],
}
const getters = {
	...ParentStore.getters,
	query_type: state => state.query_type,
	query_typeData: state => state.query_typeData,
}
const mutations = {
	...ParentStore.mutations,
    setquery_type(state, value){
     	state.query_type = value;
    },
    setquery_typeData(state, value){
     	state.query_typeData = value;
    },
    setDefault(state, value){
        let dt = new Date();
		let y = dt.getFullYear();
		let m = dt.getMonth();
		let d = dt.getDate();
		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.query_type = 1;
    }
   
}
const actions = {
	...ParentStore.actions('yytjtbhb'),
	/*
     * 查询营业区域
     * @param options
     * @returns {*}
     */
	getBusinessAreaData({commit},options){
    	return post(config['BusinessAreaUrl'], options).then((res) => {
            commit('setBusinessAreaData', res.data.data);
            return res.data;
       })
	}
}

export default {
	namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}