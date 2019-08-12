import {get,getAjax,put,del} from '@/api/util'
import  config from '@/utils/config'

import commonStore from '@/store/store'
let ParentStore = new commonStore('kjylscx');

/*卡交易流水查询*/
const state = {
	...ParentStore.state,
	name:'kjylscx',
    RegisterId:[],//交易机构
    RegisterIdData:[],
	RegisterIdText:'',
	RegisterIdplaceholder:'注册门店',
    transactionType:[],//交易类型
    transactionTypeData:[
    	{id:1,text:'消费'},{id:2,text:'消费撤销'},
		{id:3,text:'充值'},{id:4,text:'充值撤销'},
		{id:5,text:'卡片注册'},{id:6,text:'卡片激活'},
		{id:7,text:'挂失'},{id:8,text:'补卡'},
		{id:9,text:'并卡转入'},{id:10,text:'并卡转出'},
		{id:11,text:'生日营销'},{id:12,text:'卡片唤醒'},
		{id:13,text:'退卡'},{id:14,text:'手工调账'},
    ],//交易类型数据
    transactionChannel:[],//交易渠道
    transactionChannelData:[],//交易渠道数据
    MemberInfo:'',//会员信息
    MemberInfoplaceholder:'会员名称/手机号码/卡号',
    MemberGrade:'',//会员等级
    MemberGradeData:[],//会员等级数据
}
const getters = {
	...ParentStore.getters,
    RegisterId: state => state.RegisterId,
    RegisterIdData: state => state.RegisterIdData,
    RegisterIdText: state => state.RegisterIdText,
    RegisterIdplaceholder: state => state.RegisterIdplaceholder,
    transactionType: state => state.transactionType,
    transactionTypeData: state => state.transactionTypeData,
    transactionChannel: state => state.transactionChannel,
    transactionChannelData: state => state.transactionChannelData,
    MemberInfo: state => state.MemberInfo,
    MemberGrade: state => state.MemberGrade,
    MemberGradeData: state => state.MemberGradeData,
}
const mutations = {
    ...ParentStore.mutations,
    setRegisterId(state, value){
        state.RegisterId = value;
    },
    setRegisterIdData(state, value){
        state.RegisterIdData = value;
    },
    setRegisterIdText(state, value){
        state.RegisterIdText = value;
    },
    settransactionType(state, value){
        state.transactionType = value;
    },
    settransactionTypeData(state, value){
        state.transactionTypeData = value;
    },
    settransactionChannel(state, value){
        state.transactionChannel = value;
    },
    settransactionChannelData(state, value){
        state.transactionChannelData = value;
    },
    setMemberInfo(state, value){
        state.MemberInfo = value;
    },
    setMemberGrade(state, value){
        state.MemberGrade = value;
    },
    setMemberGradeData(state, value){
        state.MemberGradeData = value;
    },
    setDefault(state, value){
        state.DateTime = [new Date(), new Date()];
    	state.StoreId = [];
    	state.StoreIdText = '';
    	state.query_type = 1;
    	state.RegisterId = [];
    	state.RegisterIdText = '';
    	state.transactionType = [];
    	state.transactionChannel = [];
    	state.MemberInfo = '';
    	state.MemberGrade = '';
    }
}
const actions = {
	...ParentStore.actions('kjylscx'),
      // 获取会员等级
    GetMembergrade({commit},options){
        return getAjax(config['MembergradeUrl'], options).then((res) => {
            commit('setMemberGradeData', res);
            return res;
        })
    },
    //交易渠道
    GettransactionChannel({commit},options ={}){
    	options['type']='0';
    	options['code']='chanel';
    	options['y']='1';
        return getAjax(config['channelUrl'], options).then((res) => {
            commit('settransactionChannelData', res);
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