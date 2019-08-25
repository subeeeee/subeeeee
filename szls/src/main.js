// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './style/font/iconfont.css'
import './style/style.css'
import './style/font/style.css'
import 'font-awesome/css/font-awesome.min.css'
import VueQuillEditor from 'vue-quill-editor'
import Print from '@/utils/print.js'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css';//iVew主题样式



// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.use(Print);
import '@/permission'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileWord } from '@fortawesome/free-solid-svg-icons'

//1.引入时间处理函数
import utils from './utils/index'
//2.将时间处理函数方法绑定到全局

Vue.prototype.$utils = utils

Vue.use(ElementUI)
Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
