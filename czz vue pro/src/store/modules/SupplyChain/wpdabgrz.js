
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'
import commonStore from '@/store/store'

let ParentStore = new commonStore('wpdabgrz');
/*物品档案变更日志*/
const state = {
	...ParentStore.state,
	dishesName:'',//菜品名称
	dishesType:[],//菜品分类
	dishesTypeData:[],//物品分类数据
	BusinessState:[],//业务状态
	BusinessStateData:[
		{id:1,text:'正常'},{id:2,text:'停购'},
		{id:3,text:'停售'},{id:4,text:'淘汰'}
	],//业务状态数据
	goodsAttr:['原材料','半成品','固定资产','低值易耗品'],//物品属性
	goodsAttrData:[//物品属性数据
		{id:'原材料',text:'原材料'},{id:'半成品',text:'半成品'},
		{id:'固定资产',text:'固定资产'},{id:'低值易耗品',text:'低值易耗品'},
	],
	Operator:'',//操作人
}
const getters = {
	...ParentStore.getters,
	dishesName: state => state.dishesName,
	BusinessState: state => state.BusinessState,
	BusinessStateData: state => state.BusinessStateData,
	goodsAttr: state => state.goodsAttr,
	dishesType: state => state.dishesType,
	dishesTypeData: state => state.dishesTypeData,
	goodsAttrData: state => state.goodsAttrData,
	Operator: state => state.Operator,
}
const mutations = {
	...ParentStore.mutations,
    setdishesType(state, value){
    	state.dishesType = value;
    },
    setdishesTypeData(state, value){
    	state.dishesTypeData = value;
    },
    setgoodsAttr(state, value){
    	state.goodsAttr = value;
    },
    setgoodsAttrData(state, value){
    	state.goodsAttrData = value;
    },
    setOperator(state, value){
    	state.Operator = value;
    },
    setdishesName(state, value){
    	state.dishesName = value;
    },
    setBusinessState(state, value){
    	state.BusinessState = value;
    },
    setBusinessStateData(state, value){
    	state.BusinessStateData = value;
    },
    setexplainText(state, value){
    	state.explainText = value;
    },
    setqueryText(state, value){
    	state.queryText = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
		state.dishesName='';//菜品名称
		state.dishesType=[];//菜品分类
		state.BusinessState=[];//业务状态
		state.Operator='';//操作人
		state.goodsAttr=[1,2,3,4];//物品属性
    }
    
}
const actions = {
	...ParentStore.actions('wpdabgrz'),
	  /*
     * 物品类别
     * @param options
     * @returns {*}
     */
	getdishesTypeData({commit},options){
    	return getAjax(config['SCMCategoryUrl'], options).then((res) => {
    		if(!res.success){
    			commit('setdishesTypeData', res);
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