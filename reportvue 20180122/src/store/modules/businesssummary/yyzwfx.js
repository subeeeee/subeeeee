import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yyzwfx');
/*营业桌位分析*/
const state = {
	...ParentStore.state,
	name:'yyzwfx',
	shiftId:[],//营业班次
    shiftIdData:[],//营业班次数据
	StoreIdData:[],
	BusinessArea:[],//营业区域
	BusinessAreaData:[],//营业区域数据
	BusinessTable:[],//营业桌位
	BusinessTableData:[],//营业桌位数据
	Businessmeal:[],//营业餐位
	BusinessmealData:[],//营业餐位数据
	Businessshift:[],//营业班次
    BusinessshiftData:[],//营业班次数据
    ZeroValue:0,//是否包含0值
    ZeroValueData:[{id:1,text:'包含'},{id:0,text:'不包含'}],
    DrillTwo:true,//是否存在二级钻取
    DrillField:'bill_num',//二级钻取字段
    HeaderTableOneUrl:'/report/billingQueryRest/getBillingQuery',
}
const getters = {
	...ParentStore.getters,
	shiftId: state => state.shiftId,
	shiftIdData: state => state.shiftIdData,
	BusinessArea: state => state.BusinessArea,
	BusinessAreaData: state => state.BusinessAreaData,
	BusinessTable: state => state.BusinessTable,
	BusinessTableData: state => state.BusinessTableData,
	HeaderTypeOne: state => state.HeaderTypeOne,
	HeaderTypeTwo: state => state.HeaderTypeTwo,
	HeaderTableOneUrl: state => state.HeaderTableOneUrl,
	HeaderTableTwoUrl: state => state.HeaderTableTwoUrl,
	DrillTwo: state => state.DrillTwo,
	DrillField: state => state.DrillField,
	Businessmeal: state => state.Businessmeal,
	BusinessmealData: state => state.BusinessmealData,
	Businessshift: state => state.Businessshift,
	BusinessshiftData: state => state.BusinessshiftData,
	ZeroValue: state => state.ZeroValue,
	ZeroValueData: state => state.ZeroValueData,
}
const mutations = {
	...ParentStore.mutations,
    setBusinessArea(state, value){
    	state.BusinessArea = value;
    },
    setBusinessAreaData(state, value){
    	state.BusinessAreaData = value;
    },
    setBusinessTable(state, value){
    	state.BusinessTable = value;
    },
    setBusinessTableData(state, value){
    	state.BusinessTableData = value;
    },
    setBusinessmeal(state, value){
    	state.Businessmeal = value;
    	this._actions['table/getBusinessTable'][0](value.join(','));
    },
    setBusinessmealData(state, value){
    	state.BusinessmealData = value;
    },
    setBusinessshift(state, value){
    	state.Businessshift = value;
    },
    setBusinessshiftData(state, value){
    	state.BusinessshiftData = value;
    },
    setshiftId(state, value){
    	state.shiftId = value;
    },
    setshiftIdData(state, value){
    	state.shiftIdData = value;
    },
    setZeroValue(state, value){
    	state.ZeroValue = value;
    },
    setZeroValueData(state, value){
    	state.ZeroValueData = value;
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
    	state.shiftId = [];
    	state.BusinessArea = [];
    	state.BusinessTable = [];
    	state.Businessmeal = [];
    	state.Businessshift = [];
    	state.ZeroValue = 0;
    }
}
const actions = {
	...ParentStore.actions('yyzwfx'),
	/*
     * 查询营业区域
     * @param options
     * @returns {*}
     */
	getBusinessAreaData({commit},options){
    	return getAjax(config['BusinessAreaUrl'], options).then((res) => {
    		let data = res;
    		data.forEach((itemA, indexA) => {
    			itemA['text'] = itemA['class_item'];
    		});
            commit('setBusinessAreaData', data);
            return res;
       })
	},
	/*
	 * 查询营业桌位
     * @param options
     * @returns {*}
	 */
	getBusinessTable({commit},options){
		let obj = {mealType:options?options:''}
    	return getAjax(config['BusinessTableUrl'], obj).then((res) => {
    		if(res.success != false){
	    		let data = res;
	    		let obj = {};
	    		data.forEach((itemA, indexA) => {
	    			obj[itemA['table_code']] = itemA['table_name'];
	    		});
	    		let arr = [];
	    		for (let item in obj) {
	    			arr.push({id:item,text:obj[item]})
	    		}
	            commit('setBusinessTableData', arr);
    		}
            return res;
       })
	},
	/*
	 * 查询营业餐位
     * @param options
     * @returns {*}
	 */
	getBusinessmeal({commit},options){
    	return getAjax(config['BusinessmealUrl'], options).then((res) => {
    		if(res.success != false){
	    		let data = res;
	    		data.forEach((itemA, indexA) => {
	    			itemA['text'] = itemA['class_item'];
	    		});
	            commit('setBusinessmealData', data);
    		}
            return res;
       })
	},
	/*
	 * 查询营业班次
     * @param options
     * @returns {*}
	 */
	GetshiftId({commit},options){
        return getAjax(config['shiftIdUrl'], options).then((res) => {
            commit('setshiftIdData', res);
            return res;
        })
    },
}

export default {
	namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}