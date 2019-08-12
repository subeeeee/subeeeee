import { get, getAjax, put, del } from '../../api/util'
import axios from 'axios'
import config from '../../utils/config'

const state = {
	MultiStore: [], //门店数据
	showBtn: {}, //是否显示自定义按钮
	BtnPermission:0,//设置按钮权限
	MenuData: [], //菜单数据
	BrandItem:{},//当前选择的品牌
	whiteList:[],
	BrandData:[],//品牌数据
	IsBrand:false,//是否多品牌
	UserInfo:[],//用户信息
	ConfigData:[],//配置中心数据
	ConfigItem:{},//多终端查看
	posData:[],//pos数据
	IsLogin:false,//是否登录或者登录是否超时
	BrandName:'',//当前品牌名称+-
	BrandId:'',//当前品牌id
	TzxId:'',//商户号、
	UserName:'',//用户名
	UserId:'',//用户编号
	version:'',//版本号
	MenuDataAll:[],
}
const getters = {
	MultiStore: state => state.MultiStore,
	showBtn: state => state.showBtn,
	BtnPermission: state => state.BtnPermission,
	MenuData: state => state.MenuData,
	BrandName: state => state.BrandName,
	BrandId: state => state.BrandId,
	BrandItem: state => state.BrandItem,
	BrandData: state => state.BrandData,
	IsBrand: state => state.IsBrand,
	UserInfo: state => state.UserInfo,
	IsLogin: state => state.IsLogin,
	TzxId: state => state.TzxId,
	UserName: state => state.UserName,
	UserId: state => state.UserId,
	ConfigData: state => state.ConfigData,
	ConfigItem: state => state.ConfigItem,
	MenuDataAll: state => state.MenuDataAll,
	whiteList: state => state.whiteList,
	version: state => state.version,
	posData: state => state.posData,
}
const mutations = {
	setMultiStore(state, value = []) {
		if(value.length > 0){
			if(state.IsBrand){				
				value.forEach((itemA, indexA) => {
					if(itemA['id'] == state.BrandId){
						value = [itemA];
					}
				});
				let GetChidrenVal = (lst = []) =>{
					lst.forEach((itemA, indexA) => {
						itemA['label'] = itemA['orgFullName'];
						itemA['labelc'] = itemA['orgFullName'];
						itemA['children'] && GetChidrenVal(itemA['children']);
					});
				}
				GetChidrenVal(value);
			}
			state.MultiStore = value;
		}
	},
	setposData(state, value) {
		state.posData = value;
	},
	setMenuDataAll(state, value) {
		state.MenuDataAll = value;
	},
	setshowBtn(state, value) {
		state.showBtn[value[0]] = value[1];
	},
	setshowExportBtn(state, value) {
		//state.showExportBtn = value;
		state.showExportBtn[value[0]] = value[1];
		
	},
	setBtnPermission(state, value) {
		state.BtnPermission= value;
		
	},
	set_MenuData(state, value) {
		let kks = ['ReportStore', 'unselectedReport', 'unselected', 'unelectedMembers', 'unselectedReports','unselectedReport', 'unselected', 'unelectedMembers', 'unselectedReports'];
		let idx = 0;
		let treeNode = [];
		let RecombinationTreeNode = (obj,lv) => {
			let seft = this;
			value['data'].forEach((itemA, indexA) => {
				if(itemA['fatherModulId'] === obj['modulId']){
					itemA['childs'] = [];
					itemA['lv'] = lv;
					itemA['module_name'] = itemA['modulName'];
					if(itemA['modulIdLinkUrl']){						
						itemA['modulIdLinkUrl'] = itemA['modulIdLinkUrl'].replace(':','');
					}
					itemA['new_url'] = itemA['modulIdLinkUrl'];
					itemA['id'] = itemA['modulId'];
					seft.store_index = lv + 1;
					obj['childs'].push(itemA);
					state.whiteList.push(itemA['modulIdLinkUrl']);
					RecombinationTreeNode(itemA,lv + 1);
				}
			});
		};
		value['data']&&value['data'].forEach((itemA,indexA) => {
			if(itemA['fatherModulId'] == 107){
				itemA['childs'] = [];
				itemA['lv'] = 1;
				itemA['module_name'] = itemA['modulName'];
				itemA['new_url'] = itemA['modulIdLinkUrl'];
				itemA['id'] = itemA['modulId'];
				treeNode.push(itemA);
				state.whiteList.push(itemA['modulIdLinkUrl']);
				RecombinationTreeNode(itemA,2);
			}
		});
		let arrA = [];
		treeNode&&treeNode.forEach((itemA, indexA) => {
			if(itemA['module_name'] == '配置中心'){
				state.ConfigData = itemA['childs'];
			}else if(itemA['module_name'] == 'pos报表'){
				state.posData = itemA['childs'];
				sessionStorage.setItem('posData',JSON.stringify(itemA['childs']));
				window.GetposData = function(){
					return state.posData;
				}
			}else{
				itemA['iconClass'] = kks[idx];
				arrA.push(itemA);
				idx += 1;
			}
		});
		
		let arrB = [];
		state.ConfigData.forEach((itemA, indexA) => {
			itemA['childs'].forEach((itemB, indexB) => {
				if(itemB['modulName'] == '多终端查看'){
					state.ConfigItem = itemB;
				}else{
					arrB.push(itemB);
				}
			});
		});
		state.ConfigData = arrB;
		state.MenuData = arrA;
	},
	setMenuData(state, value) {},
	setBrandName(state, value){
		state.BrandName = value;
		sessionStorage.setItem('BrandName',value);
	},
	setBrandId(state, value){
		state.BrandId = value;
		sessionStorage.setItem('BrandId',value);
	},
	setIsBrand(state, value){
		state.IsBrand = value == 1?true:false;
		sessionStorage.setItem('IsBrand',value);
	},
	setBrandItem(state, value){
		state.BrandItem = value;
	},
	_setBrandData(state, value){
		if(value.length > 0){
			let GetChidrenVal = (lst) =>{
				lst.forEach((itemA, indexA) => {
					itemA['label'] = itemA['orgFullName'];
					itemA['labelc'] = itemA['orgFullName'];
					itemA['children'] && GetChidrenVal(itemA['children']);
				});
			}
			GetChidrenVal(value);
			state.MultiStore = value[0]['children'];
			sessionStorage.setItem('MultiStore',JSON.stringify(state.MultiStore));
			window.GetMultiStore = function(){
				return state.MultiStore;
			}
		}
	},
	setBrandData(state, value){
		if(value.length > 0){
			//获取默认品牌名称
			value[0]['children']&&value[0]['children'].forEach((itemA, indexA) => {
				if(itemA['id'] == state.BrandId){
					state.BrandName = itemA['orgFullName'];
					sessionStorage.setItem('BrandId',itemA['id']);
					sessionStorage.setItem('BrandName',itemA['orgFullName']);
				}
			});
			state.BrandData = value[0]['children'];
		}
	},
	setUserInfo(state, value){
		if(value['code'] == 0){
			let userinfo = value.data[0];
			state.UserInfo = userinfo;
		}
	},
	setIsLogin(state, value){
		state.IsLogin = value;
	},
	setTzxId(state, value){
		state.TzxId = value;
		sessionStorage.setItem('tenentid',value);
	},
	setUserId(state, value){
		state.UserId = value;
		sessionStorage.setItem('employeeId',value);
	},
	setUserName(state, value){
		state.UserName = value;
		sessionStorage.setItem('employeeName',value);
	},
	setversion(state, value){
		state.version = value;
	},
	setUserAuthority(state, value){
		if(value.code == '0'){		
			let sessnioInfo = value.data.sessnioInfo;
			state.IsBrand = sessnioInfo.valid_state == 1?true:false;
			state.TzxId = sessnioInfo.tenentid;
			state.UserId = sessnioInfo.e_id;
			state.IsLogin = sessnioInfo.isLogin ? true :false;
			state.UserName = sessnioInfo.employeeName;
			state.BrandId = sessnioInfo.defaultBrand;
			sessionStorage.setItem('tenentid',sessnioInfo.tenentid);
			sessionStorage.setItem('employeeName',sessnioInfo.employeeName);
			sessionStorage.setItem('employeeId',sessnioInfo.e_id);
			sessionStorage.setItem('valid_state',sessnioInfo.valid_state);
			//window.parent.GetBrandResult();
			window.GetBrandResult = function(){
				return {
					tenentid:state.TzxId,
					employeeName:state.UserName,
					employeeId:state.UserId,
					valid_state:state.IsBrand,
					BrandName:state.BrandName,
					BrandId:state.BrandId
				}
			}
		}
	},
}
const actions = {
	/***
	 * 查询门店信息
	 * @param options
	 * @returns {*}
	 */
	GetMultiStore({commit}, options) {
		return getAjax(config['MultiStoreUrl'], options).then((res) => {
			//commit('setMultiStore', res.data);
			return res;
		})
	},
	
	/***
	 * 获取自定义/导出按钮权限
	 * @param options
	 * @returns {*}
	 */
	GetBtnPermission({commit},options){
		return getAjax(config['GetBtnPermissionUrl'],options).then((res)=>{
			commit('setBtnPermission',res);
			return res;
		})
		
	},
	/***
	 * 左侧菜单
	 * @param options
	 * @returns {*}
	 */
	GetMenuData({commit}, options) {
		return getAjax(config['MenuUrl'], options).then((res) => {
			commit('setMenuData', res);
			return res;
		})
	},
	/***
	 * 左侧菜单(新)
	 * @param options
	 * @returns {*}
	 */
	GetMenuModuleData({commit, dispatch, getters}, options) {
		let pps = {
			tenancyId:getters['TzxId'],//商户号
			userName:getters['UserName'],//用户名
			modulType:'RPT',//模块类型
			storeId:'',//商户ID
			version:'2.0',//版本号
		};
		return getAjax(config['rolemoduleinfoUrl'], pps).then((res) => {
			commit('set_MenuData', res);
			//valid_state 1 是多品牌 0 非多品牌
			return res;
		})
	},
	/***
	 * 品牌数据
	 * @param options
	 * @returns {*}
	 */
	GetBrandData({commit, dispatch, getters}, options = ''){
		console.log('获取品牌['+options+']的机构树');
		let pps = {
			tenancyId:getters['TzxId'],//商户号
			brandId:options,//品牌ID
			employeeId:getters['UserId'],//用户ID
		};
		return getAjax(config['BrandUrl'], pps).then((res) => {
			if(options != ''){
				commit('_setBrandData', res);
			}else{
				commit('setBrandData', res);
				
			}
			return res;
		})
	},
	/***
	 * 拉取用户信息
	 * @param options
	 * @returns {*}
	 */
	GetUserInfoData({commit, dispatch, getters}, options){
		let pps = {
			tenancyId:getters['TzxId'],//商户号
			userName:getters['UserName'],//用户名
			storeId:''//商户ID
		};
		return getAjax(config['UserInfoUrl'], pps).then((res) => {
			commit('setUserInfo', res);
			return res;
		})
	},
	/***
	 * 用户登录验证
	 * @param options
	 * @returns {*}
	 */
	GetUserAuthority({commit}, options){
		let pps = {
			tenancyId:'',//商户号
			userName:'',//用户名
			storeId:'',//商户ID
			version:'',//版本号
		};
		return getAjax(config['authenticationUrl'], pps).then((res) => {
			commit('setUserAuthority', res);
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