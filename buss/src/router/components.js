
import welcome from './../welcome/welcome'
import orderList from './../assess/orderList'
import orderInfo from './../assess/orderInfo'
//添加订单
import enquiryList from './../assess/enquiry/enquiryList'
import enquiry from './../assess/enquiry/enquiry'
import enquiryInfo from './../assess/enquiry/enquiryInfo'



import addOrderList from './../assess/addOrder/addOrderList'
import addOrder from './../assess/addOrder/addOrder'
import uploadTrialMaterials from './../assess/addOrder/uploadTrialMaterials'
import uploadTrialMaterialsDetails from './../assess/addOrder/uploadTrialMaterialsDetails'

import initialConsummate from './../assess/initialConsummate'
import completeInfo from './../assess/completeInfo'
import accessToValueList from './../assess/accessToValueList'
import accessToValue from './../assess/accessToValue'
import accessDetail from './../assess/accessDetail'

import preliminaryInfo from './../assess/preliminaryInfo'

// 面审环节
import trialPhaseList from './../assess/TrialPhase/TrialPhaseList'
import trialPhase from './../assess/TrialPhase/TrialPhase'
import trialPhaseDetails from './../assess/TrialPhase/TrialPhaseDetails'
/**
 *  下户
 * */
//  下户员管理
import surveyerManage from './../shimodo/view/surveyerManage/surveyerManage'
//  下户员分配
import surveyerAllotList from './../shimodo/view/surveyerAllot/list'
import surveyerAllotDispatch from './../shimodo/view/surveyerAllot/dispatch'
import surveyerAllotBreakAppoint from './../shimodo/view/surveyerAllot/breakAppoint'
import surveyerAllotInfo from './../shimodo/view/surveyerAllot/info'
import breakInfo from './../shimodo/view/surveyerAllot/breakInfo'


//  下户费凭证上传
import surveyEvidenceUploadList from './../shimodo/view/surveyEvidenceUpload/list'
import surveyEvidenceUpload from './../shimodo/view/surveyEvidenceUpload/surveyEvidenceUpload'
import surveyEvidenceUpRecordInfo from './../shimodo/view/surveyEvidenceUpload/innerInfo'



//  回传
import infoPassHaulList from './../shimodo/view/dataReturn/dataReturnList'
import infoPassHaul from './../shimodo/view/dataReturn/dataReturnNav'
// 回传借款信息
import borrowMoney from './../shimodo/view/dataReturn/borrow'
// 回传借款人
import borrowMoneyPerson from './../shimodo/view/dataReturn/borrower'
// 回传抵押物
import pledge from './../shimodo/view/dataReturn/gua'
// 回传调查环节
import borrowLink from './../shimodo/view/dataReturn/borrowLink'

// 资料上传详情
import infoPassHaul_detail from './../shimodo/view/dataReturn_details/dataReturnNav_details'
import borrowMoney_detail from './../shimodo/view/dataReturn_details/borrow_detail'
import borrowMoneyPerson_detail from './../shimodo/view/dataReturn_details/borrower_detail'
import borrowLink_detail from './../shimodo/view/dataReturn_details/borrowLink_detail'
import pledge_detail from './../shimodo/view/dataReturn_details/gua_detail'


// 资料上传补充材料
import dataReturn_add from './../shimodo/view/dataReturn_add/dataReturn'
import borrow_add from './../shimodo/view/dataReturn_add/borrow'
import borrower_add from './../shimodo/view/dataReturn_add/borrower'
import borrowLink_add from './../shimodo/view/dataReturn_add/borrowLink'
import gua_add from './../shimodo/view/dataReturn_add/gua'

import supplement_add from './../shimodo/view/dataReturn_add/supplement'
import supplementHistory from './../shimodo/view/dataReturn_add/supplementHistory'

// 资料核查列表
import infoInspectList from './../shimodo/view/dataCheck/dataCheckList'
import infoInspect from './../shimodo/view/infoInspect'

// 资料核查
import dataCheckList from './../visaIntervuew/dataCheck/dataCheckList'
import dataChack from './../visaIntervuew/dataCheck/dataCheck'
import dataCheckDetails from './../visaIntervuew/dataCheck/dataCheckDetails'

//资料核查处理页
//借款信息
import inspectBorrowMoney from './../shimodo/view/dataCheck/inspectBorrowMoney'
//借款人
import inspectbmPerson from "./../shimodo/view/dataCheck/inspectbmPerson"
//抵押物
import inspectPledge from './../shimodo/view/dataCheck/inspectPledge'
import inspectBorrowLink from './../shimodo/view/dataCheck/inspectBorrowLink'
import infoInspect_details from './../shimodo/view/infoInspect_details'

//核查结论和打回历史
import inspectConclusion from './../shimodo/view/dataCheck/inspectConclusion'
import inspectHistory from './../shimodo/view/dataCheck/inspectHistory'

import inspectConclusion_details from "./../shimodo/view/dataCheck/inspectConclusion_details"
//资料核查处理页
//借款信息
import inspectBorrowMoney_details from './../shimodo/view/dataCheck/inspectBorrowMoney_details'
//借款人
import inspectbmPerson_details from "./../shimodo/view/dataCheck/inspectbmPerson_details"

//抵押物
import inspectPledge_details from './../shimodo/view/dataCheck/inspectPledge_details'
import inspectBorrowLink_details from './../shimodo/view/dataCheck/inspectBorrowLink_details'

// 终审打回的信息
import again from './../shimodo/view/inspectAgain/again'
import borrowerInfoAgain from './../shimodo/view/inspectAgain/borrowerInfoAgain'
import borrowInfoAagin from './../shimodo/view/inspectAgain/borrowInfoAagin'
import guaInfoAgain from './../shimodo/view/inspectAgain/guaInfoAgain'
import surveyLinkInfoAgain from './../shimodo/view/inspectAgain/surveyLinkInfoAgain'

// 下户资料包列表
import packageList from './../shimodo/view/package/packageList'



// 面签环节
// 合同准备
import contractPreparingList from './../visaIntervuew/contractPreparing/contractPreparingList'
import putInPoint from './../visaIntervuew/contractPreparing/putInPoint'
import amendPoint from './../visaIntervuew/contractPreparing/amendPoint'
import contractPreparingListDetails from './../visaIntervuew/contractPreparing/details'

//面签员
import greffierManage from './../visaIntervuew/greffierManage/greffierManage'
import greffierDistribution from './../visaIntervuew/greffierDistribution/greffierDistribution'
//调度 爽约
import failAppointment from './../visaIntervuew/greffierDistribution/dispose/failAppointment'
import dispatch from './../visaIntervuew/greffierDistribution/dispose/dispatch'
import greffierDistributionInfo from './../visaIntervuew/greffierDistribution/info/info'

import putintAmend from  './../visaIntervuew/contractPreparing/putintAmend'
// 合同管理
import contractManageList from './../visaIntervuew/contractManage/contractManageList'
//合同核查
import contractReviewList from './../visaIntervuew/contractReview/contractReviewList'
import contractReview from './../visaIntervuew/contractReview/contractReview'
import contractReview_detail from './../visaIntervuew/contractReview/contractReview_detail'


//合同信息确认


import contractConfirmList from './../visaIntervuew/contractConfirmation/list'

import contractConfirmTab from './../visaIntervuew/contractConfirmation/dispose/tab'
import contractConfirmBorrow from './../visaIntervuew/contractConfirmation/dispose/borrow'
import contractConfirmMortgage from './../visaIntervuew/contractConfirmation/dispose/mortgage'
import contractConfirmAffirm from './../visaIntervuew/contractConfirmation/dispose/affirm'

import contractConfirmInfoTab from './../visaIntervuew/contractConfirmation/info/tab'
import contractConfirmInfoAffirm from './../visaIntervuew/contractConfirmation/info/affirm'



//合同制作
import contractMakeList from './../visaIntervuew/contractMake/contractMakeList'
import contractMake from './../visaIntervuew/contractMake/contractMake'
import contractMake_detail from './../visaIntervuew/contractMake/contractMake_detail'

// 陪打征信上传
import creditUploadList from './../visaIntervuew/creditUpload/list'
import creditUpload from './../visaIntervuew/creditUpload/creditUpload'
import creditUploadInfo from './../visaIntervuew/creditUpload/info'



// 陪打征信审核
import creditCheckList from './../visaIntervuew/creditCheck/list'
import creditCheck from './../visaIntervuew/creditCheck/creditCheck'
import creditCheckInfo from './../visaIntervuew/creditCheck/info'



//面审
import faceTrialList from './../visaIntervuew/faceTrial/faceTrialList'
import faceTrial from './../visaIntervuew/faceTrial/faceTrial'
import faceTrialDetails from './../visaIntervuew/faceTrial/faceTrialDetails'
// 公证登记
import notrizationRegusterList from './../visaIntervuew/notarizationRegister/notrizationRegusterList'
import notaryRegistration from './../visaIntervuew/notarizationRegister/notaryRegistration'
import addNotaryRegistration from './../visaIntervuew/notarizationRegister/addNotaryRegistration'
import notaryRegistrationDetails from './../visaIntervuew/notarizationRegister/details'

// 上传凭证
import uploadEvidenceList from './../visaIntervuew/uploadEvidence/uploadEvidenceList'
import uploadEvidence from './../visaIntervuew/uploadEvidence/uploadEvidence'
import uploadEvidence_details from './../visaIntervuew/uploadEvidence/details'
// 费用确认
import costAffirmList from './../visaIntervuew/costAffirm/costAffirmList'
import costAffirm from './../visaIntervuew/costAffirm/costAffirm'
import costAffirm_details from './../visaIntervuew/costAffirm/details'
// 通道确认
/*import aisleAffirmList from './../visaIntervuew/aisleAffirm/aisleAffirmList'
import aisleAffirm from './../visaIntervuew/aisleAffirm/aisleAffirm'
import aisleAffirm_details from './../visaIntervuew/aisleAffirm/details'*/

/**
 *  进抵
 * */
//进抵分配
import distributionList from './../warrantArrived/distribution/distributionList'
//分配
import distributionDispose from './../warrantArrived/distribution/distributionDispose'
//详情
import distributionInfo from './../warrantArrived/distribution/distributionInfo'
//进抵登记
import registerList from './../warrantArrived/register/registerList'
//登记，失败
import registerDispose from './../warrantArrived/register/registerDispose'
//登记详情
import registerInfo from './../warrantArrived/register/registerInfo'
//补冲材料
import supplement from './../warrantArrived/register/supplement'
//完成下 补冲材料
import comSupplement from './../warrantArrived/register/comSupplement'




/**
 * 放款环节
 */
// 放款任务列表
import firstCheckList from './../loan/firstCheck/firstCheckList'
import lastCheckList from './../loan/lastCheck/lastCheckList'
import loanApplyList from './../loan/loanApply/loanApplyList'
import loanList from './../loan/loan/loanList'
import loanAffirmList from './../loan/loanAffirm/loanAffirmList'

// 放款任务
import loanFirstCheck from './../loan/firstCheck/firstCheck'
import loanLastCheck from './../loan/lastCheck/lastCheck'
import loanApply from './../loan/loanApply/loanApply'
import loan from './../loan/loan/loan'
import loanAffirm from './../loan/loanAffirm/loanAffirm'
// 放款任务
import loanFirstCheckDetails from './../loan/firstCheck/firstCheckDetails'
import loanLastCheckDetails from './../loan/lastCheck/lastCheckDetails'
import loanApplyDetails from './../loan/loanApply/loanApplyDetails'
import loanDetails from './../loan/loan/loanDetails'
import loanAffirmDetails from './../loan/loanAffirm/loanAffirmDetails'

//资料包tree
import dataPackage from './../dataPackage/dataPackage.vue'
import addDataPackage from './../dataPackage/addDataPackage.vue'
import compileDataPacjage from './../dataPackage/compileDataPacjage.vue'
// updateDataPackage
import updateDataPackage from './../dataPackage/updateDataPackage.vue'



//pdf资料包
import pdfPackage from './../pdfPackage/pdfPackage.vue'
import addPdfPackage from './../pdfPackage/addPdfPackage.vue'
import compilePdfPacjage from './../pdfPackage/compilePdfPacjage.vue'
import upPdfDataPackage from './../pdfPackage/upPdfDataPackage.vue'

// 图片浏览
import browseImage from './../picModule/browseImage'


//解抵押

import declareList from './../solutionMortgage/declare/list'
import declare from './../solutionMortgage/declare/declare'
import declareInfo from './../solutionMortgage/declare/info'

//通道确认
import aisleAffirmList from './../aisleAffirm/aisleAffirm/aisleAffirmList'
import aisleAffirm from './../aisleAffirm/aisleAffirm/aisleAffirm'
import aisleAffirm_info from './../aisleAffirm/aisleAffirm/info'


//下户预约
import appointmentList from './../assess/appointment/appointmentList'
import appointment from './../assess/appointment/appointment'
import appointmentInfo from './../assess/appointment/appointmentInfo'

//初次回访

import firstCallBackList from './../firstCallBack/firstCallBack/list'
import firstCallBack from './../firstCallBack/firstCallBack/firstCallBack'
import firstCallBackInfo from './../firstCallBack/firstCallBack/info'
import firstCallBackAffirmList from './../firstCallBack/firstCallBackAffirm/list'
import firstCallBackAffirm from './../firstCallBack/firstCallBackAffirm/firstCallBackAffirm'
import firstCallBackAffirmInfo from './../firstCallBack/firstCallBackAffirm/info'


export default {
  welcome,
  orderList,
  orderInfo,
  enquiryList, //询价
  enquiry,
  enquiryInfo,
  addOrderList,
  addOrder,
  uploadTrialMaterials,
  uploadTrialMaterialsDetails,
  initialConsummate,
  completeInfo,
  accessToValueList,
  accessToValue,
  accessDetail,
  preliminaryInfo,
  trialPhaseList,
  trialPhase,
  trialPhaseDetails,

  /*下户员管理*/
  surveyerManage,












  infoPassHaulList,
  infoPassHaul,
  borrowMoney,
  borrowMoneyPerson,
  pledge,
  borrowLink,
  infoPassHaul_detail,
  borrowMoney_detail,
  borrowMoneyPerson_detail,
  borrowLink_detail,
  pledge_detail,
  dataReturn_add,
  borrow_add,
  borrower_add,
  borrowLink_add,
  gua_add,

  supplement_add,
  supplementHistory,

  infoInspectList,
  infoInspect,
  dataCheckList,
  dataChack,
  dataCheckDetails,
  inspectBorrowMoney,
  inspectbmPerson,
  inspectPledge,
  inspectBorrowLink,
  infoInspect_details,
  inspectBorrowMoney_details,
  inspectbmPerson_details,
  inspectPledge_details,
  inspectBorrowLink_details,

  inspectConclusion,
  inspectHistory,
  inspectConclusion_details,

  again,
  borrowerInfoAgain,
  borrowInfoAagin,
  guaInfoAgain,
  surveyLinkInfoAgain,
  packageList,
  contractPreparingList,
  putInPoint,
  amendPoint,
  contractPreparingListDetails,
  contractManageList,
  contractReviewList,
  contractReview,
  contractReview_detail,
  contractMakeList,
  contractMake,
  contractMake_detail,
  faceTrialList,
  faceTrial,
  faceTrialDetails,
  notrizationRegusterList,
  notaryRegistration,
  addNotaryRegistration,
  notaryRegistrationDetails,
  distributionList,
  distributionDispose,
  distributionInfo,
  registerList,
  registerDispose,
  registerInfo,
  supplement,
  comSupplement,
  firstCheckList,
  lastCheckList,
  loanApplyList,
  loanList,
  loanAffirmList,
  loanFirstCheck,
  loanLastCheck,
  loanApply,
  loan,
  loanAffirm,
  loanFirstCheckDetails,
  loanLastCheckDetails,
  loanApplyDetails,
  loanDetails,
  loanAffirmDetails,
  dataPackage,
  addDataPackage,
  compileDataPacjage,
  updateDataPackage,
  pdfPackage,
  addPdfPackage,
  compilePdfPacjage,
  upPdfDataPackage,
  browseImage,
  uploadEvidenceList,
  uploadEvidence,
  uploadEvidence_details,
  costAffirmList,
  costAffirm,
  costAffirm_details,



  putintAmend,
  greffierManage,
  greffierDistribution,
  failAppointment,
  dispatch,
  greffierDistributionInfo,

  contractConfirmList,
  contractConfirmTab,
  contractConfirmBorrow,
  contractConfirmMortgage,
  contractConfirmAffirm,

  contractConfirmInfoTab,
  contractConfirmInfoAffirm,


  declareList,
  declare,
  declareInfo,

  aisleAffirmList,
  aisleAffirm,
  aisleAffirm_info,

  appointmentList,
  appointment,
  appointmentInfo,

  surveyerAllotList ,
  surveyerAllotDispatch,
  surveyerAllotBreakAppoint,
  surveyerAllotInfo,
  breakInfo,


  surveyEvidenceUploadList,
  surveyEvidenceUpload,
  surveyEvidenceUpRecordInfo,







  firstCallBackList,
  firstCallBack,
  firstCallBackInfo,
  firstCallBackAffirmList,
  firstCallBackAffirm,
  firstCallBackAffirmInfo,


  // 陪打征信
  creditUploadList,
  creditUpload,
  creditUploadInfo,
  creditCheckList,
  creditCheck,
  creditCheckInfo,

}

