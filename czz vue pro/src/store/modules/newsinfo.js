import { get, getAjax, put, del } from '../../api/util'
import axios from 'axios'
import config from '../../utils/config'

const state = {
	NewsData: [], //新闻数据
	NewsInfoData:{},//新闻详情页
	HotspotNews:[],//热点新闻
}
const getters = {
	NewsData: state => state.NewsData,
	NewsInfoData: state => state.NewsInfoData,
	HotspotNews:state=>state.HotspotNews,
}
const mutations = {
	setNewsData(state, value) {
		state.NewsData = value['module_list'];
	},
	setNewsInfoData(state, value) {
		state.NewsInfoData = value;
	},
	setHotspotNews(state,value){
		state.HotspotNews = value;
	}
}
const actions = {
	/***
	 * 新闻数据
	 * @param options
	 * @returns {*}
	 */
	GetNewsData({
		commit
	}, options) {

		return getAjax(config['GetNewsDataUrl'], options).then((res) => {
			commit('setNewsData', res);
			return res.data;
		})
	},
	/***
	 * 新闻详情
	 * @param options
	 * @returns {*}
	 */
	GetNewsInfoData({
		commit
	}, options) {

		return getAjax(config['GetNewsInfoDataUrl'], options).then((res) => {
			commit('setNewsInfoData', res);
			return res.data;
		})
	},
	/***
	 * 新闻详情
	 * @param options
	 * @returns {*}
	 */
	GetHotspotNews({
		commit
	},options){
		return getAjax(config['GetHotspotNewsUrl'],options).then((res)=>{
			commit('setHotspotNews',res);
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