

import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yyzqtjfx');
/*营业周期统计分析*/
const state = {
	...ParentStore.state,
	name:'yyzqtjfx',
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
}
const getters = {
	...ParentStore.getters,
    query_type :state => state.query_type,
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
}
const actions = {
    ...ParentStore.actions('yyzqtjfx'),
}

export default {
    namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}