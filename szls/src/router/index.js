import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

/** 执法人员资质管理start */
const aptitudeManage = [
  {
    path: '/applyList',
    name: 'applyList',
    component: () => import('@/page/aptitudeManage/trainingManage/applyList'),
    meta: {
      title: '执法人员资质申请'
    }
  },
  {
    path: '/reviewList',
    name: 'reviewList',
    component: () => import('@/page/aptitudeManage/trainingManage/reviewList'),
    meta: {
      title: '执法人员资质审核'
    }
  },
  {
    path: '/trainingList',
    name: 'trainingList',
    component: () => import('@/page/aptitudeManage/trainingManage/trainingList'),
    meta: {
      title: '执法人员资质培训'
    }
  },
  {
    path: '/assessmentList',
    name: 'assessmentList',
    component: () => import('@/page/aptitudeManage/trainingManage/assessmentList'),
    meta: {
      title: '执法人员资质考核'
    }
  },
  {
    path: '/certificateList',
    name: 'certificateList',
    component: () => import('@/page/aptitudeManage/trainingManage/certificateList'),
    meta: {
      title: '证书发放'
    }
  },
  {
    path: '/certificateManagementList',
    name: 'certificateManagementList',
    component: () => import('@/page/aptitudeManage/personnelCertificateMan/certificateManagement/certificateManagementList'),
    meta: {
      title: '执法人员证书管理'
    }
  },
  {
    path: '/certificateAuditList',
    name: 'certificateAuditList',
    component: () => import('@/page/aptitudeManage/personnelCertificateMan/certificateAudit/certificateAuditList'),
    meta: {
      title: '执法人员证书审核'
    }
  },


];
/** 执法人员资质管理end */

/** 任务派发管理start */
const missionDispatchManage = [
  {
    path: "/dailyinspection",
    name:"dailyinspection",
    component: () => import("@/page/missionDispatchManage/dailyinspection/dailyinspection"),
    meta:{
      title:"日常检查"
    }
  },
  {
    path: "/dailyinspectionDetail",
     name:"dailyinspectionDetail",
    component: () => import("@/page/missionDispatchManage/dailyinspection/dailyinspectionDetail"),
    meta:{
      title:"日常检查详情查看"
    }
  },
  {
    path: "/dailyinspectionDetail_see",
     name:"dailyinspectionDetail_see",
    component: () => import("@/page/missionDispatchManage/dailyinspection/dailyinspectionDetail_see"),
    meta:{
      title:"日常检查详情检查表单查看"
    }
  },
  {
    path: "/triplePreventionInspection",
    name:"triplePreventionInspection",
    component: () => import("@/page/missionDispatchManage/triplePreventionInspection/triplePreventionInspection"),
    meta:{
      title:"三防检查"
    }
  },
  {
    path: "/floodControlInspection",
    name:"floodControlInspection",
    component: () => import("@/page/missionDispatchManage/floodControlInspection/floodControlInspection"),
    meta:{
      title:"防汛检查"
    }
  },
  {
    path: "/foodStorage",
    name:"foodStorage",
    component: () => import("@/page/missionDispatchManage/foodStorage/foodStorage"),
    meta:{
      title:"粮食储备处"
    }
  },
  {
    path: "/supervisoryandInspectionOffice",
    name:"supervisoryandInspectionOffice",
    component: () => import("@/page/missionDispatchManage/supervisoryandInspectionOffice/supervisoryandInspectionOffice"),
    meta:{
      title:"监督检查处"
    }
  },
]
/** 任务派发管理end */

/** 企业信息管理start */
const enterpriseInformationManage=[
  {
    path: '/enterpriseInformationList',
    name: 'enterpriseInformationList',
    component: () => import('@/page/enterpriseInformation/enterpriseInformationList'),
    meta: {
      title: '企业信息库'
    }
  },
  {
    path: '/enterpriseInformationDetail',
    name: 'enterpriseInformationDetail',
    component: () => import('@/page/enterpriseInformation/enterpriseInformationDetail'),
    meta: {
      title: '企业信息详情'
    }
  },
  {
    path: '/WarehouseBasicInformation',
    name: 'WarehouseBasicInformation',
    component: () => import('@/page/enterpriseInformation/WarehouseBasicInformation'),
    meta: {
      title: '仓库基本信息'
    }
  },
  {
    path: '/checkTalentPoolList',
    name: 'checkTalentPoolList',
    component: () => import('@/page/checkTalentPool/checkTalentPoolList'),
    meta: {
      title: '检查人才库'
    }
  },
  {
    path: '/checkIndicatorsList',
    name: 'checkIndicatorsList',
    component: () => import('@/page/checkIndicators/checkIndicatorList'),
    meta: {
      title: '检查指标库'
    }
  },

];
/** 企业信息库管理end */

/**制定任务start */
const setATaskManage=[
  {
    path: '/setATaskManageList',
    name: 'setATaskManageList',
    component: () => import('@/page/setATask/setATaskList'),
    meta: {
      title: '制定任务'
    }
  },
  {
    path: '/setATaskManageDetails',
    name: 'setATaskManageDetails',
    component: () => import('@/page/setATask/setATaskManageDetails'),
    meta: {
      title: '制定任务'
    }
  },
];
/**
/**制定任务end */

export default new Router({
  // mode:'history',
  routes: [

    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/page/login/index'),
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () =>
        import('@/page/login/userInfo'),
    },
    {
      path: '/',
      component: () => import('@/page/index'),
      children: [{
        path: '/',
        name: 'layout',
        component: () => import('@/page/Layout/layout.vue'),
        children: [...aptitudeManage,...enterpriseInformationManage,...setATaskManage,...missionDispatchManage]
      },
      ]
    },
  ]
})
