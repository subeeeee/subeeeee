
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'
import commonStore from '@/store/store'
let ParentStore = new commonStore('sskccx');
/*实时库存查询*/
const state = {
	...ParentStore.state,
	depot:[],//仓库
	depotData:[],//仓库数据
	category:[],//类别
	categoryData:[],//类别数据
	goods:'',//物品
	BillType:[],//单据类型
	BillTypeData:[{
		id:'purchase_rcpt',
		text:'采购收货单'
	},{
		id:'purchase_retn',
		text:'采购退货单'
	}],//单据类型数据
	BillNumber:'',//单号
	Frozen:'冻结',
	Thaw:'解冻',
}
const getters = {
	...ParentStore.getters,
	depot: state => state.depot,
	depotData: state => state.depotData,
	category: state => state.category,
	DateTimelimit: state => state.DateTimelimit,
	DateTimeplaceholder: state => state.DateTimeplaceholder,
	categoryData: state => state.categoryData,
	goods: state => state.goods,
	BillType: state => state.BillType,
	BillTypeData: state => state.BillTypeData,
	BillNumber: state => state.BillNumber,
	Frozen: state => state.Frozen,
	Thaw: state => state.Thaw,
}
const mutations = {
	...ParentStore.mutations,
    setdepot(state, value){
    	state.depot = value;
    }, 
    setdepotData(state, value){
    	state.depotData = value;
    },
    setcategory(state, value){
    	state.category = value;
    },
    setcategoryData(state, value){
    	state.categoryData = value;
    },
    setgoods(state, value){
    	state.goods = value;
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
    setqueryText(state, value){
    	state.queryText = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
		state.Store=[];//机构
		state.depot=[];//仓库
		state.category=[];//类别
		state.goods='';//物品
		state.BillType=[];//单据类型
		state.BillNumber='';//单号
    }
    
}
const actions = {
	...ParentStore.actions('sskccx'),
	/*
     * 查询机构
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
	getdepotData({commit},options){
    	return getAjax(config['SCMWarehouseUrl'], options).then((res) => {
    		if(!res.success){
    			commit('setdepotData', res);
    		}
            return res;
       })
	},
	/*
     * 物品类别
     * @param options
     * @returns {*}
     */
	getcategoryData({commit},options){
    	return getAjax(config['SCMCategoryUrl'], options).then((res) => {
    		if(!res.success){
    			commit('setcategoryData', res);
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
//  			commit('setBillTypeData', res);
//  		}
//          return res;
//     })
//	}
}

export default {
	namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}