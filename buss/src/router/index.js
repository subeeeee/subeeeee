import Vue from 'vue'
import Router from 'vue-router'
import components from './components'
Vue.use(Router);

export default new Router({
  routes: [
    // 订单列表
    { path: '/', name: 'welcome', component: components.welcome },
    { path: '/orderList', name: 'orderList', component: components.orderList},
    // 订单详情
    { path: '/orderInfo', name: 'orderInfo', component: components.orderInfo },
    //询价
    { path: '/enquiryList', name: 'enquiryList', component: components.enquiryList },
    { path: '/enquiry', name: 'enquiry', component: components.enquiry },
    { path: '/enquiry_info', name: 'enquiryInfo', component: components.enquiryInfo },
    // 初评完善
    { path: '/initialConsummate', name: 'initialConsummate', component: components.initialConsummate },
    // 添加订单
    { path: '/addOrderList', name: 'addOrderList', component: components.addOrderList },
    { path: '/addOrder', name: 'addOrder', component: components.addOrder },
    { path: '/uploadTrialMaterials', name: 'uploadTrialMaterials', component: components.uploadTrialMaterials },
    { path: '/uploadTrialMaterialsDetails', name: 'uploadTrialMaterialsDetails', component: components.uploadTrialMaterialsDetails },
    // 完善信息
    { path: '/completeInfo', name: 'completeInfo', component: components.completeInfo },
    // 准入旬值列表
    { path: '/accessToValueList', name: 'accessToValueList', component: components.accessToValueList },
    // 准入旬值
    { path: '/accessToValue', name: 'accessToValue', component: components.accessToValue },
    // 询值详情
    { path: '/accessDetail', name: 'accessDetail', component: components.accessDetail },
    // 初评详情
    { path: '/preliminaryInfo', name: 'preliminaryInfo', component: components.preliminaryInfo },
    /* 面审环节 */
    // 面审列表
    { path: '/trialPhaseList', name: 'tralPhaseList', component: components.trialPhaseList },
    // 面审处理
    { path: '/trialPhase', name: 'tralPhase', component: components.trialPhase },
    // 面审详情
    { path: '/trialPhaseDetails', name: 'tralPhaseDetails', component: components.trialPhaseDetails },

    /* 下户路由 */

    { path: '/surveyerManage', name: 'surveyerManage', component: components.surveyerManage },
    { path: '/surveyerAllotList', name: 'surveyerAllotList', component: components.surveyerAllotList },
    { path: '/surveyerAllotDispatch', name: 'surveyerAllotDispatch', component: components.surveyerAllotDispatch },
    { path: '/surveyerAllotBreakAppoint', name: 'surveyerAllotBreakAppoint', component: components.surveyerAllotBreakAppoint },
    { path: '/surveyerAllotInfo', name: 'surveyerAllotInfo', component: components.surveyerAllotInfo },
    { path: '/surveyEvidenceUploadList', name: 'surveyEvidenceUploadList', component: components.surveyEvidenceUploadList },
    { path: '/surveyEvidenceUpload', name: 'surveyEvidenceUpload', component: components.surveyEvidenceUpload ,props:{isInfo:false}},
    { path: '/surveyEvidenceUploadInfo', name: 'surveyEvidenceUploadInfo', component: components.surveyEvidenceUpload ,props:{isInfo:true}},
    { path: '/surveyEvidenceUpRecordInfo', name: 'surveyEvidenceUpRecordInfo', component: components.surveyEvidenceUpRecordInfo },
    { path: '/breakInfo', name: 'breakInfo', component: components.breakInfo },















    // 资料上传任务列表
    { path: '/infoPassHaulList', name: 'infoPassHaulList', component: components.infoPassHaulList },
    // 资料核查任务列表
    { path: '/infoInspectList', name: 'infoInspectList', component: components.infoInspectList },
    // 资料上传
    {
      path: '/infoPassHaul', name: 'infoPassHaul', component: components.infoPassHaul,
      children: [
        //借款信息
        { path: 'borrowMoney', name: 'borrowMoney', component: components.borrowMoney },
        //借款人信息
        { path: 'borrowMoneyPerson', name: 'borrowMoneyPerson', component: components.borrowMoneyPerson },
        //抵押物信息
        { path: 'pledge', name: 'pledge', component: components.pledge },
        ///抵押环节
        { path: 'borrowLink', name: 'borrowLink', component: components.borrowLink }
      ]
    },
    // 资料上传详情
    {
      path: '/infoPassHaul_detail', name: 'infoPassHaul_detail', component: components.infoPassHaul_detail,
      children: [
        //借款信息
        { path: 'borrowMoney_detail', name: 'borrowMoney_detail', component: components.borrowMoney_detail },
        //借款人信息
        { path: 'borrowMoneyPerson_detail', name: 'borrowMoneyPerson_detail', component: components.borrowMoneyPerson_detail },
        //抵押物信息
        { path: 'pledge_detail', name: 'pledge_detail', component: components.pledge_detail },
        ///抵押环节
        { path: 'borrowLink_detail', name: 'borrowLink_detail', component: components.borrowLink_detail },
        // 补充材料及补充材料历史  通用参数判断
        { path: 'supplement_detail', name: 'supplement_add', component: components.supplement_add },
        { path: 'supplementHistory', name: 'supplementHistory', component: components.supplementHistory },
      ]
    },
    // 资料上传 补充材料
    {
      path: '/dataReturn_add', name: 'dataReturn_add', component: components.dataReturn_add,
      children: [
        //借款信息
        { path: 'borrow_add', name: 'borrow_add', component: components.borrow_add },
        //借款人信息
        { path: 'borrower_add', name: 'borrower_add', component: components.borrower_add },
        //抵押物信息
        { path: 'gua_add', name: 'gua_add', component: components.gua_add },
        ///抵押环节
        { path: 'borrowLink_add', name: 'borrowLink_add', component: components.borrowLink_add },
        // 补充材料及补充材料历史
        { path: 'supplement_add', name: 'supplement_add', component: components.supplement_add },
        { path: 'supplementHistory', name: 'supplementHistory', component: components.supplementHistory },
      ]
    },
    // 资料核查
    {
      path: '/infoInspect', name: 'infoInspect', component: components.infoInspect,
      children: [
        { path: 'inspectBorrowMoney', name: 'inspectBorrowMoney', component: components.inspectBorrowMoney },
        { path: 'inspectbmPerson', name: 'inspectbmPerson', component: components.inspectbmPerson },
        { path: 'inspectPledge', name: 'inspectPledge', component: components.inspectPledge },
        { path: 'inspectBorrowLink', name: 'inspectBorrowLink', component: components.inspectBorrowLink },
        //核查结论,补充材料历史
        { path: 'inspectConclusion', name: 'inspectConclusion', component: components.inspectConclusion },
        { path: 'inspectHistory', name: 'inspectHistory', component: components.inspectHistory },
      ]
    },
    // 终审打回
    {
      path: '/again', name: 'again', component: components.again,
      children: [
        //借款信息
        { path: 'borrowInfoAagin', name: 'borrowInfoAagin', component: components.borrowInfoAagin },
        //借款人信息
        { path: 'borrowerInfoAgain', name: 'borrowerInfoAgain', component: components.borrowerInfoAgain },
        //抵押物信息
        { path: 'guaInfoAgain', name: 'guaInfoAgain', component: components.guaInfoAgain },
        ///抵押环节
        { path: 'surveyLinkInfoAgain', name: 'surveyLinkInfoAgain', component: components.surveyLinkInfoAgain }
      ]
    },
    // 资料核查详情
    {
      path: '/infoInspect_details', name: 'infoInspect_details', component: components.infoInspect_details,
      children: [
        { path: 'inspectBorrowMoney_details', name: 'inspectBorrowMoney_details', component: components.inspectBorrowMoney_details },
        { path: 'inspectbmPerson_details', name: 'inspectbmPerson_details', component: components.inspectbmPerson_details },
        { path: 'inspectPledge_details', name: 'inspectPledge_details', component: components.inspectPledge_details },
        { path: 'inspectBorrowLink_details', name: 'inspectBorrowLink_details', component: components.inspectBorrowLink_details },
        { path: 'inspectConclusion', name: 'inspectConclusion', component: components.inspectConclusion_details },
        { path: 'inspectHistory', name: 'inspectHistory', component: components.inspectHistory },
      ]
    },
    //下户资料包
    { path: '/packageList', name: 'packageList', component: components.packageList },
    // 面签环节
    // 合同准备列表
    { path: '/contractPreparingList', name: 'contractPreparingList', component: components.contractPreparingList },
    // 提交点位
    { path: '/putInPoint', name: 'putInPoint', component: components.putInPoint },
    // 提交点位
    { path: '/putintAmend', name: 'putintAmend', component: components.putintAmend },
    // 详情
    { path: '/contractPreparingListDetails', name: 'contractPreparingListDetails', component: components.contractPreparingListDetails },
    // 合同复核列表
    { path: '/contractReviewList', name: 'contractReviewList', component: components.contractReviewList },
    // 合同复核
    { path: '/contractReview', name: 'contractReview', component: components.contractReview },
    // 合同复核详情
    { path: '/contractReview_detail', name: 'contractReview_detail', component: components.contractReview_detail },
    // 上传凭证
    { path: '/uploadEvidenceList', name: 'uploadEvidenceList', component: components.uploadEvidenceList },
    { path: '/uploadEvidence', name: 'uploadEvidence', component: components.uploadEvidence },
    { path: '/uploadEvidence_details', name: 'uploadEvidence_details', component: components.uploadEvidence_details },
    //费用确认
    { path: '/costAffirmList', name: 'costAffirmList', component: components.costAffirmList },
    { path: '/costAffirm', name: 'costAffirm', component: components.costAffirm },
    { path: '/costAffirm_details', name: 'costAffirm_details', component: components.costAffirm_details },

    //通道确认
    { path: '/aisleAffirmList', name: 'aisleAffirmList', component: components.aisleAffirmList },
    { path: '/aisleAffirm', name: 'aisleAffirm', component: components.aisleAffirm },
    { path: '/aisleAffirm_info', name: 'aisleAffirm_info', component: components.aisleAffirm_info },

    //面签员
    { path: '/greffierManage', name: 'greffierManage', component: components.greffierManage },
    { path: '/greffierDistribution', name: 'greffierDistribution', component: components.greffierDistribution },
    { path: '/failAppointment', name: 'failAppointment', component: components.failAppointment },
    { path: '/dispatch', name: 'dispatch', component: components.dispatch },
    { path: '/greffierDistributionInfo', name: 'greffierDistributionInfo', component: components.greffierDistributionInfo },

    //
    // contractConfirmList,
    // contractConfirmTab,
    // contractConfirmBorrow,
    // contractConfirmMortgage,
    // contractConfirmAffirm,
    { path: '/contractConfirmList', name: 'contractConfirmList', component: components.contractConfirmList },

    {
      path: '/contractConfirmTab', name: 'contractConfirmTab', component: components.contractConfirmTab,
      children: [
        {path: 'borrow', name: 'contractConfirmBorrow', component: components.contractConfirmBorrow},
        {path: 'mortgage', name: 'contractConfirmMortgage', component: components.contractConfirmMortgage},
        {path: 'affirm', name: 'contractConfirmAffirm', component: components.contractConfirmAffirm},
      ]
    },
    {
      path: '/contractConfirmInfoTab', name: 'contractConfirmInfoTab', component: components.contractConfirmInfoTab,
      children: [
        { path: 'borrow', name: 'contractConfirmBorrow', component: components.contractConfirmBorrow },
        { path: 'mortgage', name: 'contractConfirmMortgage', component: components.contractConfirmMortgage },
        { path: 'affirm', name: 'contractConfirmInfoAffirm', component: components.contractConfirmInfoAffirm },
      ]
    },
    // 合同制作列表
    { path: '/contractMakeList', name: 'contractMakeList', component: components.contractMakeList },
    // 合同制作
    { path: '/contractMake', name: 'contractMake', component: components.contractMake },
    // 合同制作详情
    { path: '/contractMake_detail', name: 'contractMake_detail', component: components.contractMake_detail },
    // 合同管理列表
    { path: '/contractManageList', name: 'contractManageList', component: components.contractManageList },
    // 资料核查列表
    { path: '/dataCheckList', name: 'dataCheckList', component: components.dataCheckList },
    // 核查处理
    { path: '/dataChack', name: 'dataChack', component: components.dataChack },
    // 核查详情
    { path: '/dataCheckDetails', name: 'dataCheckDetails', component: components.dataCheckDetails },
    // 面审列表
    { path: '/faceTrialList', name: 'faceTrialList', component: components.faceTrialList },
    { path: '/faceTrial', name: 'faceTrial', component: components.faceTrial },
    { path: '/faceTrialDetails', name: 'faceTrialDetails', component: components.faceTrialDetails },
    // 公证登记列表
    { path: '/notrizationRegusterList', name: 'notrizationRegusterList', component: components.notrizationRegusterList },
    { path: '/notaryRegistration', name: 'notaryRegistration', component: components.notaryRegistration },
    { path: '/addNotaryRegistration', name: 'addNotaryRegistration', component: components.addNotaryRegistration },
    { path: '/notaryRegistrationDetails', name: 'notaryRegistrationDetails', component: components.notaryRegistrationDetails },

    /**
     * 进抵
     */
    //分配
    { path: '/distributionList', name: 'distributionList', component: components.distributionList },
    //进抵分配
    { path: '/distributionDispose', name: 'distributionDispose', component: components.distributionDispose },
    //详情
    { path: '/distributionInfo', name: 'distributionInfo', component: components.distributionInfo },
    //登记
    { path: '/registerList', name: 'registerList', component: components.registerList },
    { path: '/registerDispose', name: 'registerDispose', component: components.registerDispose },
    { path: '/registerInfo', name: 'registerInfo', component: components.registerInfo },
    { path: '/supplement', name: 'supplement', component: components.supplement },
    { path: '/comSupplement', name: 'comSupplement', component: components.comSupplement },
    /**
     * 放款环节
     */
    // 放款初审任务列表
    { path: '/firstCheckList', name: 'firstCheckList', component: components.firstCheckList },
    { path: '/lastCheckList', name: 'lastCheckList', component: components.lastCheckList },
    { path: '/loanApplyList', name: 'loanApply', component: components.loanApplyList },
    { path: '/loanList', name: 'loan', component: components.loanList },
    { path: '/loanAffirmList', name: 'loanAffirmList', component: components.loanAffirmList },
    // 放款任务
    { path: '/loanFirstCheck', name: 'firstCheckList', component: components.loanFirstCheck },
    { path: '/loanLastCheck', name: 'loanLastCheck', component: components.loanLastCheck },
    { path: '/loanApply', name: 'loanApply', component: components.loanApply },
    { path: '/loan', name: 'loan', component: components.loan },
    { path: '/loanAffirm', name: 'loanAffirm', component: components.loanAffirm },
    // 放款任务详情
    { path: '/loanFirstCheckDetails', name: 'firstCheckListDetails', component: components.loanFirstCheckDetails },
    { path: '/loanLastCheckDetails', name: 'loanLastCheckDetails', component: components.loanLastCheckDetails },
    { path: '/loanApplyDetails', name: 'loanApplyDetails', component: components.loanApplyDetails },
    { path: '/loanDetails', name: 'loanDetails', component: components.loanDetails },
    { path: '/loanAffirmDetails', name: 'loanAffirmDetails', component: components.loanAffirmDetails },

    //资料包
    { path: '/dataPackage', name: 'dataPackage', component: components.dataPackage },
    { path: '/addDataPackage', name: 'addDataPackage', component: components.addDataPackage },
    { path: '/compileDataPacjage', name: 'compileDataPacjage', component: components.compileDataPacjage },
    { path: '/updateDataPackage', name: 'updateDataPackage', component: components.updateDataPackage },

    //资料包
    { path: '/pdfPackage', name: 'pdfPackage', component: components.pdfPackage },
    { path: '/addPdfPackage', name: 'addPdfPackage', component: components.addPdfPackage },
    { path: '/compilePdfPacjage', name: 'compilePdfPacjage', component: components.compilePdfPacjage },
    { path: '/upPdfDataPackage', name: 'upPdfDataPackage', component: components.upPdfDataPackage },

    { path: '/browseImage', name: 'browseImage', component: components.browseImage },

    //解抵押
    { path: '/declareList', name: 'declareList', component: components.declareList },
    { path: '/declare', name: 'declare', component: components.declare },
    { path: '/declareInfo', name: 'declareInfo', component: components.declareInfo },

    // 下户预约
    { path: '/appointmentList', name: 'appointmentList', component: components.appointmentList },
    { path: '/appointment', name: 'appointment', component: components.appointment },
    { path: '/appointmentInfo', name: 'appointmentInfo', component: components.appointmentInfo },
    //初次回访
    { path: '/firstCallBackList', name: 'firstCallBackList', component: components.firstCallBackList },
    { path: '/firstCallBack', name: 'firstCallBack', component: components.firstCallBack ,props:{isInfo:false}},
    { path: '/firstCallBackInfo', name: 'firstCallBackInfo', component: components.firstCallBack ,props:{isInfo:true}},
    //初次回访确认
    { path: '/firstCallBackAffirmList', name: 'firstCallBackAffirmList', component: components.firstCallBackAffirmList },
    { path: '/firstCallBackAffirm', name: 'firstCallBackAffirm', component: components.firstCallBackAffirm,props:{isInfo:false} },
    { path: '/firstCallBackAffirmInfo', name: 'firstCallBackAffirmInfo', component: components.firstCallBackAffirm,props:{isInfo:true}},





//陪打征信
    { path: '/creditUploadList', name: 'creditUploadList', component: components.creditUploadList },
    { path: '/creditUpload', name: 'creditUpload', component: components.creditUpload },
    { path: '/creditUploadInfo', name: 'creditUploadInfo', component: components.creditUploadInfo },
    { path: '/creditCheckList', name: 'creditCheckList', component: components.creditCheckList },
    { path: '/creditCheck', name: 'creditCheck', component: components.creditCheck },
    { path: '/creditCheckInfo', name: 'creditCheckInfo', component: components.creditCheckInfo },




  ]
})
