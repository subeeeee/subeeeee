// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/layout.less'
import '@/assets/css/table.ext.css'
import '@/assets/css/ElementUI.ext.css'
import '@/assets/css/styles.css'
import '@/assets/css/custom.less'
import '@/assets/css/fonts/iconfont.css'
import '@/assets/css/iconfont/iconfont.css'
import './permission' // 权限
import $ from 'jquery'
import getResult from '@/common/GetResult';
import {dateUtil} from './utils/dateUtils'

Vue.prototype.getResult = getResult;
Vue.prototype.$echarts = echarts;
import store from './store/index'
Vue.use(ElementUI);
// Vue.filter('formatDate',dateUtils.formatDate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    store,
  template: '<App/>',
  components: { App }
})
