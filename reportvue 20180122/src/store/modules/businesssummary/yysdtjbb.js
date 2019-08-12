
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yysdtjbb');
/*营业时段统计报表*/
const state = {
	...ParentStore.state,
	name:'yysdtjbb',
    time_interval:0.5,//时间粒度
    time_intervalData:[
    	{id:0.5,text:'0.5'},{id:1,text:'1'},
    	{id:2,text:'2'},{id:3,text:'3'},
    	{id:4,text:'4'},{id:8,text:'8'},{id:12,text:'12'},
    ],//时间粒度数据
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
}
const getters = {
	...ParentStore.getters,
    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
    time_interval: state => state.time_interval,
    time_intervalData: state => state.time_intervalData,
}
const mutations = {
	...ParentStore.mutations,
    setquery_type(state, value){
        state.query_type = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
    settime_interval(state, value){
        state.time_interval = value;
    },
    settime_intervalData(state, value){
        state.time_intervalData = value;
    },
    setDefault(state, value){
        let dt = new Date();
		let y = dt.getFullYear();
		let m = dt.getMonth();
		let d = dt.getDate();
		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.time_interval = 0.5;
    	state.query_type = 1;
    },
}
const actions = {
    ...ParentStore.actions('yysdtjbb'),
}

export default {
    namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}