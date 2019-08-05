// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import _cityCongif from './js/cityConfig'
// import html2canvas from 'html2canvas'





// Vue.prototype.myHtml2canvas = html2canvas;

Vue.config.silent = true;
Vue.config.productionTip = false;
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);
//拖动
import VueDND from 'awe-dnd'
Vue.use(VueDND);

Vue.filter('sexFilter',function (sex) {
  if (sex == "1") {
    return "男";
  } else if (sex == "0") {
    return "女";
  }
});
Vue.filter('enquiry',function (num) {
  if (num == "1") {
    return "询价成功";
  } else if (num == "0") {
    return "询价失败";
  }else{
    return "请询价"
  }
})
Vue.filter('pledgeFilter',function (num) {
  if (num == "01") {
    return "一抵";
  } else if (num == "02") {
    return "二抵";
  }else if(num == "03"){
    return "一抵转单";
  }else if(num == "04"){
    return "二抵转单";
  }
});




// 清除浏览器默认样式
import './style/reset.css'

Vue.prototype.cityCongif = _cityCongif.cityCongif
// 图片模块
import picModule from './picModule/index'
Vue.use(picModule);

//所有组件
import component from './component/index'
Vue.use(component);
Vue.prototype.localImgUrl  = {
  txt:require('./picModule/image/txt.png'),
  word:require('./picModule/image/word.png'),
  excel:require('./picModule/image/excel.png'),
  pdf:require('./picModule/image/pdf.png'),
  audio:require('./picModule/image/audio.png'),
  video:require('./picModule/image/video.png'),
  otherFiles:require('./picModule/image/otherFiles.png'),
}
// 验证
import _utils from './js/utils'
Vue.prototype._utils = _utils;
// 路径
import path from './js/path'
Vue.prototype._path = path._path;
Vue.prototype.homePage = path.homePage;

import download from './js/download'
Vue.prototype._download = download.StandardPost2NewWindow;

import req from './js/request'
Vue.prototype.requestError = req._req;
Vue.prototype.$http = req.request;

window.bus = new Vue();

/* eslint-disable no-new */

$.ajax({
  url:path._path + '/business/permissions',
  type:'GET',
  async:false,
  success:(res)=>{
    if(res.resultCode === '0000'){
      var s = res.data.permissions;
      Vue.prototype.currentUserPermissions = res.data.permissions;
      Vue.prototype.currentUserId=res.data.loginUserId;
    }else{
      req._req(res,window.bus)
    }
  }
});
import tool from './js/tool'
Vue.prototype.tool = tool;
Vue.prototype.downloadPackage = tool.downloadPackage;




/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
