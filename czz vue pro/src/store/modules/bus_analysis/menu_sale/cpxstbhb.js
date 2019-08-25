

import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('cpxstbhb');
/*菜品销售同比环比分析*/
const state = {
	...ParentStore.state,
	name:'cpxstbhb',
    DataType:'date',
    begin_data:'',//交易时间
    end_data:'',
    itme_type:'',//类别选择
    itme_typeData:[],//类别选择数据
    DishesType:[],//菜品类别
    DishesTypeData:[],//菜品类别数据
    item_name:[],//菜品名称
    item_nameData:[],
    business_area:[],//营业区域
    business_areaData:[],
    chanel_type:[],//销售渠道
    chanel_typeData:[],
    type_of_meal:[],//餐位类型
    type_of_mealData:[],
    item_property:['SETMEAL,SINGLE'],//餐品属性
    item_propertyData:[
    	{id: "SETMEAL,SINGLE",text: '套餐+单品'},{id: "MEALLIST,SINGLE",text: '明细+单品'},
    	{id: "SETMEAL",text: '套餐'},{id: "SINGLE",text: '单品'}
    ],
    price_system:[],//价格体系
    price_systemData:[],
    class_id:[],//班次
    class_idData:[],
    start_time_interval:'',// 开始时段
    end_time_interval:'',//结束时段
    shang:[],
	shangDate:'',
	shangtitle:'默认情况下,上期范围为当前所选时间段-1个月',
	shangData:[
		{id:'上期',text:'上期'},{id:'上期绝对值',text:'上期绝对值'},{id:'上期率',text:'上期率'},
	],
	tongData:[
		{id:'同期',text:'同期'},{id:'同期绝对值',text:'同期绝对值'},{id:'同期率',text:'同期率'},
	],
	tong:[],
	tongDate:'',
	tongtitle:'默认情况下,同期范围为去年同时段数据',
	is_recommendation:1,//仅推荐菜
	is_recommendationData:[
		{id:0,text:'开启'},{id:1,text:'关闭'}
	],
	m_flag:0,//合并显示
	m_flagData:[
		{id:0,text:'不合并'},{id:1,text:'合并'}
	],
	yes_vip:0,//会员菜价格
    yes_vipData:[
    	{id:0,text:'全部'},{id:1,text:'会员价菜品'}
    ],
    class_interval:'class',//班次类型
    class_intervalData:[
  	 	{id:'class',text:'班次'},
  	 	{id:'interval',text:'时段'}
    ],
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
}
const getters = {
	...ParentStore.getters,

    begin_data: state => state.begin_data,
    end_data: state => state.end_data,
    DataType: state => state.DataType,
    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
    shang: state => state.shang,
    tong: state => state.tong,
    shangtitle: state => state.shangtitle,
    tongtitle: state => state.tongtitle,
    shangData: state => state.shangData,
    tongData: state => state.tongData,
    shangDate: state => state.shangDate,
    tongDate: state => state.tongDate,
    is_recommendation: state => state.is_recommendation,
    is_recommendationData: state => state.is_recommendationData,
    itme_type: state => state.itme_type,
    itme_typeData: state => state.itme_typeData,
    DishesType: state => state.DishesType,
    DishesTypeData: state => state.DishesTypeData,
    yes_vip: state => state.yes_vip,
    yes_vipData: state => state.yes_vipData,
    m_flag: state => state.m_flag,
    m_flagData: state => state.m_flagData,
    item_name: state => state.item_name,
    item_nameData: state => state.item_nameData,
    business_area: state => state.business_area,
    business_areaData: state => state.business_areaData,
    chanel_type: state => state.chanel_type,
    chanel_typeData: state => state.chanel_typeData,
    type_of_meal: state => state.type_of_meal,
    type_of_mealData: state => state.type_of_mealData,
    item_property: state => state.item_property,
    item_propertyData: state => state.item_propertyData,
    price_system: state => state.price_system,
    price_systemData: state => state.price_systemData,
    class_id: state => state.class_id,
    class_idData: state => state.class_idData,
    start_time_interval: state => state.start_time_interval,
    end_time_interval: state => state.end_time_interval,
    class_interval: state => state.class_interval,
    class_intervalData: state => state.class_intervalData,
}
const mutations = {
	...ParentStore.mutations,
    setbegin_data(state, value){
         state.begin_data = value;
    }, 
    setm_flag(state, value){
         state.m_flag = value;
    }, 
    setyes_vip(state, value){
         state.yes_vip = value;
    }, 
    setend_data(state, value){
         state.end_data = value;
    },
    setStoreId(state, value){
         state.StoreId = value;
    },
    setStoreIdData(state, value){
         state.StoreIdData = value;
    },
    setDataType(state, value){
        state.DataType = value;
    },
    setquery_type(state, value){
        state.query_type = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
    setshang(state, value){
        state.shang = value;
    },
    settong(state, value){
        state.tong = value;
    },
     setshangDate(state, value){
        state.shangDate = value;
    },
    settongDate(state, value){
        state.tongDate = value;
    },
    setis_recommendation(state, value){
        state.is_recommendation = value;
    },
    setclass_interval(state, value){
        state.class_interval = value;
    },
    setclass_intervalData(state, value){
        state.class_intervalData = value;
    },
    setitme_type(state, value){
        state.itme_type = value;
        state.DishesType = [];
        this._actions['cpxstbhb/GetDishesTypeData'][0](value == ''?0:value);
    },
    setDishesType(state, value){
    	if(value.length != undefined){    		
    		state.DishesType = value;
    		state.item_name = [];
    		let ids = [];
    		value.forEach((itemA, indexA) => {
    			ids.push(itemA['id']);
    		});
    		this._actions['cpxstbhb/GetItemNameData'][0](ids.join(','));
    	}
    },
    setDishesTypeData(state, value){
    	if(value.length != undefined){
	    	let dataFun = (arr) => {
	    		arr.forEach((itemA, indexA) => {
	    			itemA['label'] = itemA['text'];
	    			itemA['children'] && dataFun(itemA['children']);
	    		});
	    	}
	    	dataFun(value);
	    	state.DishesTypeData = value;
    	}
    },
    setitme_typeData(state, value){
    	if(value.length != undefined){
	    	let arr = [{id:'',text:'默认类别'}];
	    	value.forEach((item,index) => {
	    		arr.push(item);
	    	});
	        value.length && (state.itme_typeData = arr);
    	}
    },
    setitem_name(state, value){
        state.item_name = value;
    },
    setitem_nameData(state, value){
        state.item_nameData = value;
    },
    setbusiness_area(state, value){
        state.business_area = value;
    },
    setbusiness_areaData(state, value){
    	if(value.length != undefined){
	    	value.forEach((itemA, indexA) => {
	    		itemA['text'] = itemA['class_item'];
	    	});
	        state.business_areaData = value;
    	}
    },
    setchanel_type(state, value){
        state.chanel_type = value;
    },
    setchanel_typeData(state, value){
        state.chanel_typeData = value;
    },
    settype_of_meal(state, value){
        state.type_of_meal = value;
    },
    settype_of_mealData(state, value){
    	if(value.length != undefined){
	    	value.forEach((itemA, indexA) => {
	    		itemA['text'] = itemA['class_item'];
	    	});
	        state.type_of_mealData = value;
    	}
    },
    setitem_property(state, value){
        state.item_property = value;
    },
    setitem_propertyData(state, value){
        state.item_propertyData = value;
    },
    setprice_system(state, value){
        state.price_system = value;
    },
    setprice_systemData(state, value){
    	if(value.length != undefined){
	    	value.forEach((itemA, indexA) => {
	    		itemA['text'] = itemA['name'];
	    	});
	        state.price_systemData = value;
    	}
    },
    setclass_id(state, value){
        state.class_id = value;
    },
    setclass_idData(state, value){
        state.class_idData = value;
    },
    setstart_time_interval(state, value){
        state.start_time_interval = value;
    },
    setend_time_interval(state, value){
        state.end_time_interval = value;
    },
    setDefault(state, value){
    	state.DataType = 'date';
    	state.begin_data = '';
    	state.end_data = '';
    	state.StoreId = [];
    	state.itme_type = '';
    	state.DishesType = [];
    	state.item_name = [];
    	state.business_area = [];
    	state.chanel_type= [];
    	state.type_of_meal = [];
    	state.item_property = ['SETMEAL,SINGLE'];
    	state.price_system=  [];
    	state.class_id = [];
    	state.start_time_interval = '';
    	state.end_time_interval = '';
    	state.shang = [];
    	state.tong = [];
    	state.shangDate = '';
    	state.tongDate = '';
    	state.is_recommendation = 1;
    	state.m_flag = 0;
    	state.yes_vip = 0;
    	state.class_interval = 'class';
    	state.query_type = 1;
    	this._actions['cpxstbhb/GetDishesTypeData'][0](0);
    }
}
const actions = {
	...ParentStore.actions('cpxstbhb'),
	/*
	 * 类别选择
	 */
    GetItmeTypeData({commit}, options) {
		return getAjax(config['CategorySelectUrl'], options).then((res) => {
			commit('setitme_typeData', res);
			return res;
		})
	},
	/*
	 * 菜品类别
	 */
	GetDishesTypeData({commit}, options) {
		let uri = 'customizeUrl';
		if(options != 0){
			uri = 'CategoryTreeUrl';
		}
		let pps = {
			with_sub:1,
			type:options,
			id:options
		};
		return getAjax(config[uri], pps).then((res) => {
			commit('setDishesTypeData', res);
			return res;
		})
	},
	/*
	 * 菜品名称
	 */
	GetItemNameData({commit}, options = '') {
		let pps = {};
		if(options == ''){
			pps['type'] = 0;
		}else{
			pps['id'] = options;
		}
		return getAjax(config['DishesNameTreeUrl'], pps).then((res) => {
			commit('setitem_nameData', res);
			return res;
		})
	},
	/*
	 * 营业区域
	 */
	GetBusinessAreaData({commit}, options) {
		return getAjax(config['BusinessAreaUrl'], options).then((res) => {
			commit('setbusiness_areaData', res);
			return res;
		})
	},
	/*
	 * 餐位类型
	 */
	GetMealPositionTypeData({commit}, options) {
		return getAjax(config['BusinessmealUrl'], options).then((res) => {
			commit('settype_of_mealData', res);
			return res;
		})
	},
	/*
	 * 价格体系
	 */
	GetPriceSystemData({commit}, options) {
		return getAjax(config['PriceSystemUrl'], options).then((res) => {
			commit('setprice_systemData', res);
			return res;
		})
	},
	/*
	 * 销售渠道
	 */
	GetChanelTypeData({commit}, options) {
		options = {
			code:'chanel',
			type:0,
			y:1
		};
		return getAjax(config['ChanelTypeUrl'], options).then((res) => {
			commit('setchanel_typeData', res);
			return res;
		})
	},
	/*
	 * 营业班次
	 */
	GetshiftData({commit}, options) {
		return getAjax(config['shiftIdUrl'], options).then((res) => {
			commit('setclass_idData', res);
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