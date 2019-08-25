
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('cgsphzbb');
/*采购商品汇总报表*/
const state = {
	...ParentStore.state,
	name:'cgsphzbb',
	receiptDepot:[],//收货仓库
	receiptDepotplaceholder:'收货仓库',
	receiptDepotData:[],//收货仓库数据
	receiptDepotText:'',
	Supplier:[],//供应商
	Supplierplaceholder:'供应商',
	SupplierData:[],//供应商数据
	SupplierText:'',
	BillType:[],//单据类型
	BillTypeData:[{
		id:'purchase_rcpt',
		text:'采购收货单'
	},{
		id:'purchase_retn',
		text:'采购退货单'
	}],//单据类型数据
	BillNumber:'',//单号
	goodsType:[],//物品类别
	goodsTypeData:[],//物品类型
	goods:'',//物品
	BreakdownType:4,//分列方式
	BreakdownTypeData:[
		{id:1,text:'大类'},{id:2,text:'中类'},
		{id:3,text:'小类'},{id:4,text:'物品'},
	],//分列方式数据
	query_type:1,//查询方式
	query_typeData:[//查询方式数据
		{id:1,text:'按物品汇总'},{id:2,text:'按供应商汇总'},
	],
}
const getters = {
	...ParentStore.getters,
	Depotplaceholder: state => state.receiptDepotplaceholder,
	Supplierplaceholder: state => state.Supplierplaceholder,
	receiptDepotText: state => state.receiptDepotText,
	receiptDepot: state => state.receiptDepot,
	BillNumber: state => state.BillNumber,
	receiptDepotData: state => state.receiptDepotData,
	Supplier: state => state.Supplier,
	SupplierText: state => state.SupplierText,
	SupplierData: state => state.SupplierData,
	BillType: state => state.BillType,
	BillTypeData: state => state.BillTypeData,
	goodsType: state => state.goodsType,
	goods: state => state.goods,
	goodsTypeData: state => state.goodsTypeData,
	BreakdownType: state => state.BreakdownType,
	BreakdownTypeData: state => state.BreakdownTypeData,
	query_type: state => state.query_type,
	query_typeData: state => state.query_typeData,
}
const mutations = {
	...ParentStore.mutations,
    setreceiptDepotText(state, value){
    	state.receiptDepotText = value;
    },
    setreceiptDepot(state, value){
    	state.receiptDepot = value;
    },
    setreceiptDepotData(state, value){
    	state.receiptDepotData = value;
    },
    setSupplierText(state, value){
    	state.SupplierText = value;
    },
    setSupplier(state, value){
    	state.Supplier = value;
    },
    setSupplierData(state, value){
    	state.SupplierData = value;
    },
    setBillType(state, value){
    	state.BillType = value;
    },
    setBillTypeData(state, value){
    	state.BillTypeData = value;
    },
    setBillNumber(state, value){
    	state.BillNumber = value;
    },
    setgoodsType(state, value){
    	state.goodsType = value;
    },
    setgoodsTypeData(state, value){
    	state.goodsTypeData = value;
    },
    setgoods(state, value){
    	state.goods = value;
    },
    setBreakdownType(state, value){
    	state.BreakdownType = value;
    },
    setBreakdownTypeData(state, value){
    	state.BreakdownTypeData = value;
    },
    setquery_typeData(state, value){
    	state.query_typeData = value;
    },
    setqueryText(state, value){
    	state.queryText = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
		state.Store=[];//收货机构
		state.receiptDepot=[];//收货仓库
		state.Supplier=[];//供应商
		state.BillType=[];//单据类型
		state.BillNumber='';//单号
		state.goodsType=[];//物品类别
		state.goods='';//物品
		state.BreakdownType=4;//分列方式
    }
    
}
const actions = {
	...ParentStore.actions('cgsphzbb'),
	/*
     * 收货机构
     * @param options
     * @returns {*}
     */
	getStoreData({commit},options){
    	return getAjax(config['SCMOrganTreeUrl'], options).then((res) => {
    		if(!res.success){
    			 commit('setStoreIdData', res);
    		}
            return res;
       })
	},
	/*
     * 仓库
     * @param options
     * @returns {*}
     */
	getreceiptDepotData({commit},options){
    	return getAjax(config['SCMWarehouseUrl'], options).then((res) => {
    		if(!res.success){
	            commit('setreceiptDepotData', res);
    		}
            return res;
       })
	},
	 /*
     * 物品类别
     * @param options
     * @returns {*}
     */
	getgoodsTypeData({commit},options){
    	return getAjax(config['SCMCategoryUrl'], options).then((res) => {
    		if(!res.success){
    			commit('setgoodsTypeData', res);
    		}
            return res;
       })
	},
	/*
     * 单据类别
     * @param options
     * @returns {*}
     */
//	getBillTypeData({commit},options){
//  	return getAjax(config['SCMBillsCategoryUrl'], options).then((res) => {
//  		if(!res.success){
//	            commit('setBillTypeData', res);
//  		}
//          return res;
//     })
//	},
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