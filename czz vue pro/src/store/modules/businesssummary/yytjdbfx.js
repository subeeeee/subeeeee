
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yytjdbfx');
/*营业统计对比分析*/
const state = {
	...ParentStore.state,
	name:'yytjdbfx',
    Report_num:'SAAS_BI_2016_29',//报表编码
    ContrastId:[],//交易门店
    ContrastIdText:'',
    ContrastIdData:[],//交易门店数据
    ContrastIdplaceholder:'对比门店',
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
}
const getters = {
	...ParentStore.getters,
    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
    ContrastId: state => state.ContrastId,
    ContrastIdplaceholder: state => state.ContrastIdplaceholder,
    ContrastIdData: state => state.ContrastIdData,
    ContrastIdText: state => state.ContrastIdText,
}
const mutations = {
	...ParentStore.mutations,
    setquery_type(state, value){
        state.query_type = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
    setContrastId(state, value){
        state.ContrastId = value;
    },
    setContrastIdText(state, value){
        state.ContrastIdText = value;
    },
    setContrastIdData(state, value){
        state.ContrastIdData = value;
    },
    setDefault(state, value){
        let dt = new Date();
		let y = dt.getFullYear();
		let m = dt.getMonth();
		let d = dt.getDate();
		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.ContrastId = [];
    	state.ContrastIdText = '';
    	state.query_type = 1;
    },
}
const actions = {
   ...ParentStore.actions('yytjdbfx'),
}

export default {
    namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}