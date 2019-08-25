
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'
import commonStore from '@/store/store'
let ParentStore = new commonStore('wpycxx');
/*物品异常信息*/
const state = {
	...ParentStore.state,
	dishesType:[],//物品分类
	dishesTypeData:[],//物品分类数据
	dishesName:'',//菜品名称
	BusinessState:[],//业务状态
	BusinessStateData:[
		{id:1,text:'正常'},{id:2,text:'停购'},
		{id:3,text:'停售'},{id:4,text:'淘汰'}
	],//业务状态数据
	checkcondition1:[],//检查条件
	checkcondition1Data:[
		{id:1,text:'规格型号为空'},{id:2,text:'单位体积为空'},
		{id:3,text:'单位重量为空'},{id:4,text:'税率为空'},
		{id:5,text:'附加条码为空'},{id:6,text:'保质期为空'},
		{id:7,text:'未上传图片'}
	],//检查条件数据
	checkcondition2:[],//检查条件
	checkcondition2Data:[
		{id:1,text:'未分配仓库'},{id:2,text:'多仓库存储'}
	],//检查条件数据
}
const getters = {
	...ParentStore.getters,
	dishesType: state => state.dishesType,
	dishesTypeData: state => state.dishesTypeData,
	dishesName: state => state.dishesName,
	BusinessState: state => state.BusinessState,
	BusinessStateData: state => state.BusinessStateData,
	checkcondition1: state => state.checkcondition1,
	checkcondition1Data: state => state.checkcondition1Data,
	checkcondition2: state => state.checkcondition2,
	checkcondition2Data: state => state.checkcondition2Data,
	queryText: state => state.queryText,
}
const mutations = {
	...ParentStore.mutations,
    setdishesType(state, value){
    	state.dishesType = value;
    },
    setdishesTypeData(state, value){
    	state.dishesTypeData = value;
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
    setcheckcondition1(state, value){
    	state.checkcondition1 = value;
    },
    setcheckcondition1Data(state, value){
    	state.checkcondition1Data = value;
    },
    setcheckcondition2(state, value){
    	state.checkcondition2 = value;
    },
    setcheckcondition2Data(state, value){
    	state.checkcondition2Data = value;
    },
    setqueryText(state, value){
    	state.queryText = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
		state.dishesType=[];//物品分类
		state.dishesName='';//菜品名称
		state.BusinessState=[];//业务状态
		state.checkcondition1=[];//基础信息
		state.checkcondition2=[];//仓库信息
    }
}
const actions = {
	...ParentStore.actions('wpycxx'),
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