
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('cgddzxjg');
/*采购订单执行结果*/
const state = {
	...ParentStore.state,
	name:'cgddzxjg',
	Supplier:[],//供应商
	SupplierText:'',//供应商
	Supplierplaceholder:'供应商',
	SupplierData:[],//供应商数据
	BillNumber:'',//单号
	goods:'',//物品
}
const getters = {
	...ParentStore.getters,
	Supplierplaceholder: state => state.Supplierplaceholder,
	Supplier: state => state.Supplier,
	SupplierText: state => state.SupplierText,
	SupplierData: state => state.SupplierData,
	goods: state => state.goods,
	BillNumber: state => state.BillNumber,

}
const mutations = {
	...ParentStore.mutations,
    setSupplier(state, value){
    	state.Supplier = value;
    },
    setSupplierText(state, value){
    	state.SupplierText = value;
    },
    setSupplierData(state, value){
    	state.SupplierData = value;
    },
    
    setBillNumber(state, value){
    	state.BillNumber = value;
    },
    setgoods(state, value){
    	state.goods = value;
    },
    setqueryText(state, value){
    	state.queryText = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
        state.Supplier=[];//供应商
	    state.BillNumber='';//单号
	    state.goods='';//物品
    }
    
}
const actions = {
	...ParentStore.actions('cgddzxjg'),
	/*
     * 供应商
     * @param options
     * @returns {*}
     */
	getSupplierData({commit},options){
    	return getAjax(config['SCMSupplyUrl'], options).then((res) => {
    		if(!res.success){
    			 commit('setSupplierData', res);
    		}
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