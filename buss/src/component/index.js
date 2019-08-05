import ownership from './com/ownershipNo.vue'  // 房产证号
import appraisementInfo from './com/appraisementInfo.vue';  //估值详情
import appraisementContent from './com/appraisement.vue';  //估值处理
import packageData from './com/packageData.vue';  //资料包导出
import searchValues from './com/searchValues.vue';  //资料包导出
import flowPath from './com/flowPath.vue';  //高亮流程框

const component = {
    install:function (vue) {
      vue.component('ownershipNo',ownership)
      vue.component('appraisement-Info',appraisementInfo)
      vue.component('appraisement-content',appraisementContent)
      vue.component('packageData',packageData)
      vue.component('searchValues',searchValues)
      vue.component('flowPath',flowPath)
    }
};

export default component
