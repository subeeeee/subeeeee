
import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('yysdzbfx');

/*营业时段占比分析*/
const state = {
	...ParentStore.state,
	name:'yysdzbfx',
    HideQueryVal:[],
    QueryVal:['item_sale','item_amount','service_fee_income',
			'back_money_item','discount_money','reduction_money','free_money',
			'moling_money','coupons_ds','real_amount','sale_person_num',
			'sale_person_average','sale_billnum','sale_billaverage',
			'num_ft','num_sz','tables_num','seat_num'],//查询内容
    QueryValData:[
    	{id: 'item_sale',text: '消费流水'},{id: 'item_amount',text: '菜品消费'}
        ,{id: 'service_fee_income',text: '服务费'},{id: 'back_money_item',text: '退菜'}
        ,{id: 'discount_money',text: '折扣'},{id: 'reduction_money',text: '折让'}
        ,{id: 'free_money',text: '奉送'},{id: 'moling_money',text: '抹零'}
        ,{id: 'coupons_ds',text: '多收礼券'},{id: 'real_amount',text: '营业实收'}
        ,{id: 'sale_person_num',text: '消费客数'},{id: 'sale_person_average',text: '人均消费'}
        ,{id: 'sale_billnum',text: '消费账单'},{id: 'sale_billaverage',text: '账单均价'}
        ,{id: 'num_ft',text: '翻台率'},{id: 'num_sz',text: '上座率'}
        ,{id: 'tables_num',text: '桌台数'},{id: 'seat_num',text: '座位数'}
    ],//查询内容
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
    TimeInterval:{1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]},
    TimeInterval1:[],
    TimeInterval2:[],
    TimeInterval3:[],
    TimeInterval4:[],
    TimeInterval5:[],
    TimeInterval6:[],
    TimeInterval7:[],
    TimeInterval8:[],
    TimeIntervalindex:1,
    TimeIntervalData:[],
}
const getters = {
	...ParentStore.getters,


    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
    queryText: state => state.queryText,
    HideQueryVal: state => state.HideQueryVal,
    QueryVal: state => state.QueryVal,
	QueryValData: state => state.QueryValData,
	TimeInterval: state => state.TimeInterval,
    TimeInterval1: state => state.TimeInterval1,
    TimeInterval2: state => state.TimeInterval2,
    TimeInterval3: state => state.TimeInterval3,
    TimeInterval4: state => state.TimeInterval4,
    TimeInterval5: state => state.TimeInterval5,
    TimeInterval6: state => state.TimeInterval6,
    TimeInterval7: state => state.TimeInterval7,
    TimeInterval8: state => state.TimeInterval8,
    TimeIntervalData: state => state.TimeIntervalData,
    TimeIntervalindex: state => state.TimeIntervalindex,
}
const mutations = {
	...ParentStore.mutations,
    setquery_type(state, value){
        state.query_type = value;
    },
    setQueryVal(state, value){
        state.QueryVal = value;
    },
    setTimeInterval(state, value){
        state.TimeInterval[value[0]] = value[1];
    },
    setTimeInterval1(state, value){
        state.TimeInterval1 = value;
    },
    setTimeInterval2(state, value){
        state.TimeInterval2 = value;
    },
    setTimeInterval3(state, value){
        state.TimeInterval3 = value;
    },
    setTimeInterval4(state, value){
        state.TimeInterval4 = value;
    },
    setTimeInterval5(state, value){
        state.TimeInterval5 = value;
    },
    setTimeInterval6(state, value){
        state.TimeInterval6 = value;
    },
    setTimeInterval7(state, value){
        state.TimeInterval7 = value;
    },
    setTimeInterval8(state, value){
        state.TimeInterval8 = value;
    },
    setTimeIntervalindex(state, value){
        state.TimeIntervalindex = value;
    },
    setTimeIntervalData(state, value){
        state.TimeIntervalData = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
    setHideQueryVal(state, value){
        state.HideQueryVal = value;
    },
    setDefault(state, value){
        let dt = new Date();
		let y = dt.getFullYear();
		let m = dt.getMonth();
		let d = dt.getDate();
		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.QueryVal=['item_sale','item_amount','service_fee_income',
			'back_money_item','discount_money','reduction_money','free_money',
			'moling_money','coupons_ds','real_amount','sale_person_num',
			'sale_person_average','sale_billnum','sale_billaverage',
			'num_ft','num_sz','tables_num','seat_num'];
    	state.query_type = 1;
    	state.TimeIntervalindex = 1;
    	state.TimeInterval={1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[]};
    	state.TimeInterval1 = [];
    	state.TimeInterval2 = [];
    	state.TimeInterval3 = [];
    	state.TimeInterval4 = [];
    	state.TimeInterval5 = [];
    	state.TimeInterval6 = [];
    	state.TimeInterval7 = [];
    	state.TimeInterval8 = [];
    }
}
const actions = {
	...ParentStore.actions('yysdzbfx'),
     // 获取营业班次
    GetTimeInterval({commit},options){
        return getAjax(config['TimeIntervalUrl'], options).then((res) => {
            commit('setTimeIntervalData', res);
            return res;
        })
    },
    GetHideQueryVal({commit},options){
    	let arrA = options[0];//显示的
    	let arrB = options[1];//集合
    	let arrC = [];
    	arrB.forEach((itemA, indexA) => {
    		if(arrA.indexOf(itemA['id']) == -1){
    			arrC.push(itemA['id']);
    		}
    	});
    	commit('setHideQueryVal', arrC);
    	return arrC;
    }
}

export default {
    namespaced: true, //是否包含明名空 ，必填，有重名不为true的时候会相互影响
    state,
    actions,
    getters,
    mutations
}