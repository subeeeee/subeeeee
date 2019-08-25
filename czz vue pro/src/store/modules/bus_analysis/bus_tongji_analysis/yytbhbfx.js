

import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'
import commonStore from '@/store/store'
let ParentStore = new commonStore('yytbhbfx');
/*营业同比环比分析*/
const state = {
	...ParentStore.state,
	name:'yytbhbfx',
    DataType:'date',
    DataTypeData:[
    	{id:'date',text:'按日期'},{id:'week',text:'按周期'},{id:'month',text:'按月份'},
    	{id:'quarter',text:'按季度'},{id:'year',text:'按年份'}
    ],
    begin_data:new Date().setDate(1),
    end_data:new Date(),
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
	include_target:0,//包含目标
	include_targetData:[
		{id:0,text:'不包含'},{id:1,text:'包含'}
	],
	include_refer:0,//包含均值
    include_referData:[
    	{id:0,text:'不包含'},{id:1,text:'包含'}
    ],
    
    
    
    query_type:1,//查询方式
    query_typeData:[//查询方式数据
        {id:1,text:'按交易日期汇总'},{id:2,text:'按交易机构汇总'},
    ],
}
const getters = {
	...ParentStore.getters,
	DataType: state => state.DataType,
	begin_data: state => state.begin_data,
	end_data: state => state.end_data,
    include_target: state => state.include_target,
    include_targetData: state => state.include_targetData,
    include_refer: state => state.include_refer,
    include_referData: state => state.include_referData,
    shang: state => state.shang,
    tong: state => state.tong,
    shangtitle: state => state.shangtitle,
    tongtitle: state => state.tongtitle,
    shangData: state => state.shangData,
    tongData: state => state.tongData,
    shangDate: state => state.shangDate,
    tongDate: state => state.tongDate,
    query_type :state => state.query_type,
    query_typeData: state => state.query_typeData,
}
const mutations = {
	...ParentStore.mutations,
    setDataType(state, value){
        state.DataType = value;
    },
    setbegin_data(state, value){
    	state.begin_data = value;
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
    setinclude_target(state, value){
        state.include_target = value;
    },
    setinclude_refer(state, value){
        state.include_refer = value;
    },
    setend_data(state, value){
        state.end_data = value;
    },
    setquery_type(state, value){
        state.query_type = value;
    },
    setquery_typeData(state, value){
        state.query_typeData = value;
    },
}
const actions = {
	...ParentStore.actions('yytbhbfx'),
    GetStoreIdData({commit}, options) {
		return getAjax(config['StoreUrl'], options).then((res) => {
			commit('setStoreIdData', res);
			return res.data;
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
