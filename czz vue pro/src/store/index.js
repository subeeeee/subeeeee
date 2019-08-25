import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'

import defaultStore from './defaultStore'

import {get} from "../api/util";

Vue.use(Vuex);

let self = this;
const state = {
	sliderInfo:true,
    ShowMian:true,//是否显示主页
    ShowLeftMenu:false,//是否显示左侧菜单
    ShowFooter:true,//是否显示底部[新闻/资讯/首页和新闻页面需要显示，其他的不需要显示]
    ShowBrandCenter:false,//是否显示品牌中心
    PageState:true,//页面状态[true:标识页面存在，false:标识页面不存在]
    PageTitle:'报表中心',//页面标题
    BrowseMode:'newPage',/*界面的浏览模式, 兼容老报表的情况下取值为 oldPage，兼容新报表的情况下取值 newPage */
    Token:'',/**/
    routerArray:[],
    includeArr:[],//需要缓存的组件name集合
    excludeArr:[],//不需要缓存的组件的name集合
    pageid:'',
    PaymentType:false,//是否存在付款方式明细
    TaxRate:false,//是否开启了税价分离[true:开启(显示)，false:没开启(隐藏)]
    TaxRateData:['服务费','营业应收','营业实收(付款合计)'],//税价分离数据
    showCustomBtn:false,//是否显示自定义按钮
	ShowLeftTree:false,//左侧菜单二级tree(收起时)
    tabList: [],
    activeTab: '',//选中的菜单名称
    activeTabItem:{},//选中的路由菜单
    addRoute: false,
    isCollapse:true,
    routerListId: '',
}
const getters = {
	pageid:state => state.pageid,
    sliderInfo:state => state.sliderInfo,
    PaymentType:state => state.PaymentType,
    TaxRate:state =>state.TaxRate,
    Token:state =>state.Token,
    routerArray:state =>state.routerArray,
    ShowFooter:state =>state.ShowFooter,
    TaxRateData:state =>state.TaxRateData,
    TaxRate:showCustomBtn =>state.showCustomBtn,
    ShowMian: state => state.ShowMian,
    ShowLeftTree: state => state.ShowLeftTree,
    ShowLeftMenu:state => state.ShowLeftMenu,
    tabList: state => state.tabList,
    activeTab: state => state.activeTab,
    activeTabItem: state => state.activeTabItem,
    addRoute: state => state.addRoute,
    routerListId: state => state.routerListId,
    isCollapse: state => state.isCollapse,
	SelectTreeHlaceholder: state => state.SelectTreeHlaceholder,
	MultiTreeHlaceholder: state => state.MultiTreeHlaceholder,
	ShowBrandCenter: state => state.ShowBrandCenter,
	PageState: state => state.PageState,
	PageTitle: state => state.PageTitle,
	BrowseMode: state => state.BrowseMode,
	includeArr: state => state.includeArr,
	excludeArr: state => state.excludeArr,
}

const mutations = {
    setpageid(state, pageid){
    	state.pageid = pageid;
    },
    setsliderInfo(state, value){
    	state.sliderInfo = value;
    },
    setShowFooter(state, value){
    	state.ShowFooter = value;
    },
    setrouterArray(state, value){
    	state.routerArray = value;
    },
    setShowBrandCenter(state, value){
    	state.ShowBrandCenter = value;
    },
    setDateTime(state, type, time = new Date()){
    	if(type == 1){
    		let dt = new Date();
    		let y = dt.getFullYear();
    		let m = dt.getMonth();
    		let d = dt.getDate();
    		state.DateTime = [new Date(y,m,1),new Date(y,m,d)];
    	}else{
    		 state.DateTime = type;
    	}
    },
    setToken(state, value){
    	state.Token = value;
    },
    setShowLeftTree(state, value){
    	state.ShowLeftTree = value;
    },
    setStoreValue(state,StoreValue){
    	if(typeof StoreValue[0] == 'string'){
    		state.StoreValue[StoreValue[0]] = StoreValue[1];
    	}else if(StoreValue.length == 1){
    		state.StoreValue['StoreId'] = StoreValue[1];
    	}
    	
    },
    setSelectTreeValue(state,SelectTreeValue){
    	if(typeof SelectTreeValue[0] == 'string'){
    		state.SelectTreeValue[SelectTreeValue[0]] = SelectTreeValue[1];
    	}else if(SelectTreeValue.length == 1){
    		state.SelectTreeValue['SelectId'] = SelectTreeValue[1];
    	}
    },
    setTreeData(state, TreeData){
    	state.TreeData = TreeData;
    },
    setCollapse(state, collapse) {
        state.isCollapse = collapse;
    },
    setshowCustomBtn(state, showCustomBtn){
    	state.showCustomBtn = showCustomBtn;
    },
    
    setPaymentType(state, PaymentType){
    	state.PaymentType = PaymentType;
    },
    setShowMian(state, ShowMian) {
        state.ShowMian = ShowMian;
    },
    setShowLeftMenu(state, ShowLeftMenu) {
        state.ShowLeftMenu = ShowLeftMenu;
    },
    setAddRoute(state, addRoute) {
        state.addRoute = addRoute;
    },
    setRouterListId(state, routerListId) {
        state.routerListId = routerListId;
    },
    setTabList(state, item) {
    	state.activeTabItem = item;
        let curTabList = state.tabList;
        let isTab = false;
        for (let i = 0; i < curTabList.length; i++) {
            if (curTabList[i].title == item.title) {
                isTab = true;
                return false;
            }
        }
        if (!isTab) {
            state.tabList.push(item)
        }

    },
    setActiveTab(state, name) {
        state.activeTab = name;
    },
    setactiveTabItem(state, name) {
    	state.activeTabItem = name;
    },
    removeAllTab(state, name){
    	let TabList =[];
    	let curTabList = state.tabList;
    	curTabList.forEach((itemA, indexA) => {
    		if(itemA.name  == name){
    			TabList.push(itemA);
    		}
    	});
    	state.tabList = TabList;
    },
    removeTab(state, name) {
        let curTabList = state.tabList;
        if(curTabList.length == 1){
        	router.push('/');
        	state.tabList = [];
        }else{
        	//集合个数大于1
        	for (let i = 0; i < curTabList.length; i++) {
        		//如果当前第i个的tab名称是当前准备删除的标签
        	    if (curTabList[i].name == name) {
        	        state.tabList.splice(i,  1);
        	        //如果
        	        if (state.activeTab == name) {
        	            if (state.tabList[i - 1]) {
        	                state.activeTab = state.tabList[i - 1].name;
        	                router.push(state.tabList[i - 1].router);
        	            }else{
        	            	 state.activeTab = state.tabList[0].name;
        	            }
        	        }
        	    }
        	}
        }

    },
    setSelectTreeHlaceholder(state, value){
    	state.SelectTreeHlaceholder[value[0]] = value[1];
    },
    setMultiTreeHlaceholder(state, value){
    	state.MultiTreeHlaceholder[value[0]] = value[1];
    },
    setPageState(state, value){
    	state.PageState = value;
    },
    setPageTitle(state, value){
    	state.PageTitle = value;
    },
    setBrowseMode(state, value){
    	state.BrowseMode = value;
    },
    setincludeArr(state, value){
    	if(state.includeArr.indexOf(value) == -1){    		
    		state.includeArr.push(value);
    		let arrA = state.excludeArr;
    		let ArrB = [];
    		arrA.forEach((itemA, indexA) => {
	    		if(itemA != value){
	    			ArrB.push(itemA);
	    		}
	    	});
	    	state.excludeArr = ArrB;
    	}
    },
    setexcludeArr(state, value){
    	state.excludeArr.push(value);
    	let arrA = state.includeArr;
    	let ArrB = [];
    	arrA.forEach((itemA, indexA) => {
    		if(itemA != value){
    			ArrB.push(itemA);
    		}
    	});
    	state.includeArr = ArrB;
    },
}


const actions = {
    openSlider({commit, getters, dispatch}, {tf, sliderInfo}) {
        commit("setSliderInfo", sliderInfo);
        commit("setShowSlider", tf);
    },
    openDialog({commit, getters, dispatch}, {name, tf}) {
        commit("setShowDialog", tf);
    },
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        ...defaultStore,
    },
})