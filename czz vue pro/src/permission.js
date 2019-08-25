import Vue from 'vue'
import router from './router'
import { asyncRouterMap, constantRouterMap } from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
const _import = require('./router/_import_' + process.env.NODE_ENV)

function setNavList(item) {
	store.commit("setTabList", item);
	store.commit("setActiveTab", item.name);
	let itemA = item.router.split('/');
	let itemB = itemA[itemA.length - 1];
	store.commit("setpageid", itemB);
	if(itemB == 'newsDetail') {
		store.commit("setCollapse", false);
		store.commit("setShowFooter", true);
		
	} else if(itemB == '') {
		store.commit("setShowFooter", true);
	} else {
		store.commit("setShowFooter", false);
		document.body.removeAttribute('ContextType');
	}
	if(itemB != "") {
		store.commit("setShowMian", false);
		store.commit("setShowLeftTree", true);
		//if(!store.getters.isCollapse) {
		document.body.setAttribute('ShowMian', 'ContextBody');
		//}
	} else {

	}
}

function GetToken(params) {
	var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");
	var search = window.location.href.split('?')[1];
	search = '?' + search;
	var r = search.substr(1).match(reg);
	let token = r ? unescape(r[2]) : "";
	token = token.split('#')[0];
	token = token || '';
	return token;
}

let Matcher = [];
/*菜单集合转tree*/
function NodeTree(TreeData = []) {
	let treeNode = [];
	let RecombinationTreeNode = (obj) => {
		let seft = this;
		TreeData.forEach((itemA, indexA) => {
			if(itemA['fatherModulId'] === obj['modulId']) {
				itemA['childs'] = [];
				obj['childs'].push(itemA);
				RecombinationTreeNode(itemA);
			}
		});
	};
	TreeData && TreeData.forEach((itemA, indexA) => {
		if(itemA['fatherModulId'] == 107) {
			itemA['childs'] = [];
			treeNode.push(itemA);
			RecombinationTreeNode(itemA);
		}
	});
	console.log('treeNode', treeNode);
	GetTreeRouter(treeNode);
	
	store.commit("setrouterArray", true);
	
	//router.match = Matcher.concat(router.options.routes);
    router.addRoutes(Matcher)
}

/*菜单tree转动态路由*/
function GetTreeRouter(treeData) {
	treeData.forEach((itemA, indexA) => {
		if(itemA['childs'].length > 0) {
			GetTreeRouter(itemA['childs']);
		} else {
			Matcher.push({
				path: itemA['new_url'],
				name: itemA['modulName'],
				component: _import(itemA['modulIdLinkUrl']),
				props: {
					NewSrc: "../../../"
				},
			});
		}
	});
}

let token = GetToken('_s');
store.commit("setToken", token);

let BrowseMode = GetToken('BrowseMode');
store.commit("setBrowseMode", BrowseMode);
document.body.setAttribute('BrowseMode', BrowseMode);
let posUri = '/pos/pos_report';
// register global progress. 
const whiteList = ['/', '/index', '/NoLogin', '/newsDetail', '/404',posUri] // 不重定向白名单
const PwhiteList = ['ECSC','REPORT']; //跨项目访问白名单

router.beforeEach((to, from, next) => {
	NProgress.start() // 开启Progress
	//next();return false;
	let _whiteList = store.getters['layout/whiteList'];
	if(_whiteList && _whiteList.length > 0) {
		sessionStorage.setItem('whiteList', JSON.stringify(_whiteList));
	}
	if(sessionStorage.getItem('whiteList')) {
		try {
			_whiteList = JSON.parse(sessionStorage.getItem('whiteList'));
		} catch(e) {
			//TODO handle the exception
		}
	}
	if(to.path == posUri){
		//说明访问的是pos报表，不进行如何拦截，直接放行
		document.body.setAttribute('BrowseMode','poscenter');
		next();
		NProgress.done();
		return false;
	}
	if(to.path == '/newsDetail'){
		//访问的是新闻详情页面，不显示头和菜单
		document.body.setAttribute('ContextType', 'newsDetail');
	}
	let lst = store.getters['tabList'];
	if(to.path == '/' && lst.length > 1) {
		lst.forEach((itemA, indexA) => {
			store.commit('removeTab', itemA.name);
		});
	}
	if(to.path == '/404') {
		//页面不存在，标识起来
		document.title = '访问的页面不存在';
		store.commit("setPageState", false);
	} else {
		//PageTitle
		document.title = store.getters['PageTitle'];
		store.commit("setPageState", true);
	}

	//拉取登录验证/判断是否登录
	let IsLogin = store.getters['layout/IsLogin'];
	if(to.path == '/') {
		store.commit("setShowMian", true);
		store.commit("setShowLeftMenu", false);
		store.commit("setShowFooter", true);
		store.commit("setCollapse", true);
		document.body.removeAttribute('contexttype');
		//标识是首页[用于首页滚动条滚动时渐变头部颜色]
		document.body.setAttribute('pagetype','home');
	} else {
		//?BrowseMode=oldPage&source=ECSC
		document.body.removeAttribute('pagetype');
		let source = to.query.source;
		if(IsLogin == false && _whiteList.indexOf(to.path) === -1 && whiteList.indexOf(to.path) === -1 && PwhiteList.indexOf(source) == -1) {
			next('/404') // 否则全部重定向到未登录页
			NProgress.done();
			return false;
		}
	}

	if(IsLogin == false && to.path != posUri) {
		//拉去本地缓存数据
		let BrandId = sessionStorage.getItem('BrandId') || '';
		let BrandName = sessionStorage.getItem('BrandName') || '';
		let employeeId = sessionStorage.getItem('employeeId') || '';
		let employeeName = sessionStorage.getItem('employeeName') || '';
		let tenentid = sessionStorage.getItem('tenentid') || '';
		let valid_state = sessionStorage.getItem('valid_state') || '';
		let MultiStore = sessionStorage.getItem('MultiStore') || '[]';
		BrandId && store.commit("layout/setBrandId", BrandId);
		BrandName && store.commit("layout/setBrandName", BrandName);
		employeeId && store.commit("layout/setUserId", employeeId);
		employeeName && store.commit("layout/setUserName", employeeName);
		tenentid && store.commit("layout/setTzxId", tenentid);
		MultiStore && store.commit("layout/setMultiStore", JSON.parse(MultiStore));
		store.commit("layout/setIsLogin", valid_state ? true : false);
		//用户登录验证
		store.dispatch('layout/GetUserAuthority').then(res => {
			//验证通过
			if(res.code == '0') {
				//如果当前用户是多品牌
				if(store.getters['layout/IsBrand']) {
					//获取当前用户的品牌信息
					store.dispatch('layout/GetBrandData');
					store.dispatch('layout/GetBrandData', store.getters['layout/BrandId']);
					//获取当前用户的菜单信息 
					store.dispatch('layout/GetMenuModuleData');
					//获取用户信息
					store.dispatch('layout/GetUserInfoData');
				} else {
					//不是多品牌
				}
			} else {
				console.log('[用户登录验证]失败');
				//next('/404') // 否则全部重定向到未登录页
				NProgress.done();
				return false;
			}
		});
	}else if(IsLogin == false && to.path == posUri){
		//直接访问的是pos地址，放行，直接请求菜单
		console.log('请求pos地址放行,直接请求菜单');
		store.dispatch('layout/GetMenuModuleData');
	}
	if(whiteList.indexOf(to.path) == -1){
		setNavList({title: to.name,router: to.path,name: to.name});
	}
	next();
})

router.afterEach(() => {
	setTimeout(() => {
		NProgress.done() // 结束Progress
	}, 500);
})

/* 
 * 获取品牌等数据:window.parent.GetBrandResult(); 或者 sessionStorage.getItem('数据标识');
 * 获取品牌机构树:window.parent.GetMultiStore(); 或者 sessionStorage.getItem('MultiStore');
 * 获取 pos报表:window.parent.GetposData(); 或者 sessionStorage.getItem('posData');
 * 
 */