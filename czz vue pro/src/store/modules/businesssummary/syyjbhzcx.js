
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('syyjbhzcx');
/*收银员交班汇总查询*/
const state = {
	...ParentStore.state,
	name:'syyjbhzcx',
    shiftId:[],//营业班次
    shiftIdData:[],//营业班次数据
    Cashier:[],//收银员
    CashierData:[],//收银员数据
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按收银员汇总'},
    ],
}
const getters = {
	...ParentStore.getters,
    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
    queryText: state => state.queryText,
    shiftId: state => state.shiftId,
    shiftIdData: state => state.shiftIdData,
    Cashier: state => state.Cashier,
    CashierData: state => state.CashierData, 
}
const mutations = {
	...ParentStore.mutations,
    setquery_type(state, value){
        state.query_type = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
    setshiftId(state, value){
        state.shiftId = value;
    },
    setshiftIdData(state, value){
        state.shiftIdData= value;
    },
    setCashier(state, value){
        state.Cashier = value;
    },
    setCashierData(state, value){
        state.CashierData= value;
    },
    setDefault(state, value){
    	let dt = new Date();
		let y = dt.getFullYear();
		let m = dt.getMonth();
		let d = dt.getDate();
		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.shiftId = [];
    	state.Cashier = [];
    	state.query_type = 1;
    }
}
const actions = {
	...ParentStore.actions('syyjbhzcx'),
    // 获取营业班次
    GetshiftId({commit},options){
        return getAjax(config['shiftIdUrl'], options).then((res) => {
            commit('setshiftIdData', res);
            return res;
        })
    },
    GetCashier({commit},options){
        return getAjax(config['CashierUrl'], options).then((res) => {
        	res.forEach((itemA, indexA) => {
        		itemA['id'] = itemA['user_name'];
        		itemA['text'] = itemA['name'];
        	});
            commit('setCashierData', res);
            return res;
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