/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-08-28 22:49:32
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 13:56:54
 * @Note api
 */

import { http_post } from '../net/http'
import { toast } from '../../components/common/toast'

const NET_STATUS_OK = '0' //网络状态码 成功

/**
 * 校验返回数据
 *
 * @param {Object} jsonData http返回的json数据
 * @param {boolean} [toastShow=true] 验证不通过 是否弹出提示 默认弹出
 * @returns
 */
export const checkResult = (jsonData: Object, toastShow: boolean = true) => {
  if (jsonData == null) return false

  let status = jsonData.status
  let msg = jsonData.msg
  let data = jsonData.data

  if (status !== NET_STATUS_OK) {
    // console.log('error status: ' + status + ' msg:' + msg)
    if (msg != null && msg != '' && toastShow) {
      toast(msg)
    }
    return false
  }

  return true
}

/**
 * 测试模板接口
 *
 * @returns
 */
export const TestTemplateApi = async () => {
  const jsonData = await http_post('/api/asset/my', {})
  return jsonData
}

/**
 * 我的组合资产信息
 *
 * @returns
 */
export const GroupAssetInfoApi = async () => {
  const jsonData = await http_post('/api/user/MyGroup')
  return jsonData
}

/**
 * 组合预申购信息
 *
 * @param {*} fundGroupId
 * @returns
 */
export const GroupPreBuyInfoApi = async fundGroupId => {
  const jsonData = await http_post('/api/buy/GroupPrepare', {
    fundGroupId: fundGroupId
  })
  return jsonData
}

/**
 *
 *组合申购费率
 * @param {*} fundGroupId
 * @param {*} money
 * @returns
 */
export const groupEstimatedFeeApi = async (fundGroupId, money) => {
  const jsonData = await http_post('/api/buy/GroupBuyFee', {
    fundGroupId,
    money
  })
  return jsonData
}
/**
 * 组合申购
 *
 * @param {*} fundGroupId 组合id
 * @param {*} bankCardId 银行卡
 * @param {*} money 申购金额
 * @param {*} dealPasswords 密码
 * @returns
 */
export const GroupBuyApi = async (fundGroupId, bankCardId, money, dealPasswords) => {
  const jsonData = await http_post('/api/buy/GroupBuy', {
    fundGroupId,
    bankCardId,
    money,
    dealPasswords
  })
  return jsonData
}

/**
 * 组合资产详情
 *
 * @param {*} fundGroupId 组合id
 * @param {*} groupShareId 组合共享id
 * @returns
 */
export const GroupAssetDetailApi = async fundGroupId => {
  const jsonData = await http_post('/api/user/MyGroupInfo', {
    fundGroupId
  })
  return jsonData
}

/**
 * 单只基金交易记录
 *
 * @param {*} fundCode 基金id
 * @param {*} combCode 组合id
 * @returns
 */
export const FundDealRecordApi = async (fundCode, lastId, limit = 10) => {
  const jsonData = await http_post('/api/asset/fundDealRecord', {
    fundCode,
    lastId,
    limit
  })
  return jsonData
}

/**
 * 申购交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordBuyListApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/buyList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 申购组合交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordGroupBuyListApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/BuyGroupList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 赎回交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordRedeemApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/redeemList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 赎回交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordGroupRedeemApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/RedeemGroupList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 分红交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordBonusApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/bonusList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 进行交易记录
 *
 * @param {*} productType 类型 1 基金 2组合
 * @returns
 */
export const TradeRecordDoingApi = async (productType, lastId = null) => {
  const jsonData = await http_post('/api/trade/underwayOrderList', {
    productType,
    lastId
  })
  return jsonData
}

/**
 * 组合详情信息
 *
 * @param {*} fundGroupId 组合id
 * @returns
 */
export const GroupInfoApi = async fundGroupId => {
  const jsonData = await http_post('/api/group/info', { fundGroupId })
  return jsonData
}

/**
 * 组合详情图表信息
 *
 * @param {*} fundGroupId 组合id
 * @param {*} type 类型
 * @returns
 */
export const GroupInfoChartApi = async (fundGroupId, type) => {
  const jsonData = await http_post('/api/curve/groupInfo', {
    fundGroupId,
    type
  })
  return jsonData
}

/**
 * 单只基金收益明细
 *
 * @param {*} fundCode 基金代码
 * @returns
 */
export const FundDayIncomeListApi = async fundCode => {
  const jsonData = await http_post('/api/asset/fundDayIncomeList', { fundCode })
  return jsonData
}

/**
 * 组合收益明细
 *
 * @param {*} fundGroupId
 * @returns
 */
export const GroupDayIncomeListApi = async fundGroupId => {
  const jsonData = await http_post('/api/asset/fundDayGroupIncomeList', {
    fundGroupId
  })
  return jsonData
}

/**
 * 组合赎回信息
 *
 * @param {*} fundGroupId 组合id
 * @returns
 */
export const GroupRedeemInfoApi = async fundGroupId => {
  const jsonData = await http_post('/api/redeem/GroupPrepare', { fundGroupId })
  return jsonData
}

/**
 * 组合赎回时判断是否有申购中订单
 *
 * @param {*} fundGroupId
 * @returns
 */
export const GroupRedeemAllApi = async fundGroupId => {
  const jsonData = await http_post('/api/redeem/GroupPrepareProcessing', {
    fundGroupId
  })
  return jsonData
}

/**
 * 组合赎回
 *
 * @param {*} fundGroupId 组合id
 * @param {*} dealPasswords 密码
 * @param {*} userBankCardId 用户银卡
 * @param {*} ratio 赎回比例
 * @returns
 */
export const GroupRedeemApi = async (fundGroupId, dealPasswords, userBankCardId, ratio) => {
  const jsonData = await http_post('/api/redeem/RedeemGroup', {
    fundGroupId,
    dealPasswords,
    userBankCardId,
    ratio
  })
  return jsonData
}

/**
 * 赎回比例信息
 *
 * @param {*} fundGroupId 组合id
 * @param {*} userBankCardId 银行卡
 * @param {*} ratio 比例
 * @returns
 */
export const GroupRedeemFeeApi = async (fundGroupId, userBankCardId, ratio) => {
  const jsonData = await http_post('/api/redeem/RedeemGroupFee', {
    fundGroupId,
    userBankCardId,
    ratio
  })
  return jsonData
}

/**
 * 组合落地页曲线
 *
 * @returns
 */
export const GroupIntelCurveApi = async () => {
  const jsonData = await http_post('/api/curve/smartCurve', {})
  return jsonData
}

/**
 * 查询订单支付状态
 *
 * @param {*} orderId
 * @returns
 */
export const BuyStatusApi = async orderId => {
  const jsonData = await http_post('/api/buy/getBuyStatus', { orderId }, 5000)
  return jsonData
}

/**
 * 查询组合订单支付状态
 *
 * @param {*} orderId
 * @returns
 */
export const BuyGroupStatusApi = async orderId => {
  const jsonData = await http_post('/api/buy/GetBuyGroupStatus', { orderId }, 3000)
  return jsonData
}

/**
 * 申购详情
 *
 * @param {*} orderId 订单id
 * @returns
 */
export const BuyDetailApi = async orderId => {
  const jsonData = await http_post('/api/trade/buyDetails', { orderId })
  return jsonData
}

/**
 * 申购详情
 *
 * @param {*} orderId 订单id
 * @returns
 */
export const BuyGroupDetailApi = async orderId => {
  const jsonData = await http_post('/api/trade/BuyGroupDetails', { orderId })
  return jsonData
}

/**
 * 撤销订单
 *
 * @param {*} orderId 订单id
 * @param {*} dealPasswords 交易密码
 * @returns
 */
export const FundCancelApi = async (orderId, dealPasswords) => {
  const jsonData = await http_post('/api/trade/fundCancellations', {
    orderId,
    dealPasswords
  })
  return jsonData
}

/**
 * 基金赎回详情
 *
 * @param {*} orderId 订单id
 * @returns
 */
export const FundRedeemDetailApi = async orderId => {
  const jsonData = await http_post('/api/trade/redeemDetails', { orderId })
  return jsonData
}

/**
 * 基金赎回详情（组合）
 *
 * @param {*} orderId 订单id
 * @returns
 */
export const FundGroupRedeemDetailApi = async orderId => {
  const jsonData = await http_post('/api/trade/redeemGroupDetails', { orderId })
  return jsonData
}
/**
 * 通过组合落地页进入组合详情
 *
 * @returns
 */
export const IntelConfigReadApi = async () => {
  const jsonData = await http_post('/api/account/isRead', {})
  return jsonData
}

/**
 * 我的资产
 *
 * @returns
 */
export const MyAssetApi = async () => {
  const jsonData = await http_post('/api/asset/my', {})
  return jsonData
}

/**
 * 资产详情
 *
 * @param {*} fundCode 基金代码
 * @returns
 */
export const MyAssetDetailApi = async fundCode => {
  const jsonData = await http_post('/api/asset/fundDetails', { fundCode })
  return jsonData
}

/**
 * 基金认购前准备信息
 *
 * @param {*} fundCode 基金代码
 * @returns
 */
export const FundBuyPrepareApi = async fundCode => {
  const jsonData = await http_post('/api/buy/fundBuyPrepare', { fundCode })
  return jsonData
}

/**
 * 申购
 *
 * @param {*} preventResubmit 重复提交验证码
 * @param {*} fundCode 基金代码
 * @param {*} userBankCardId 开户卡
 * @param {*} money 金额
 * @param {*} dealPasswords 交易密码
 * @returns
 */
export const FundBuyApi = async (
  preventResubmit,
  fundCode,
  userBankCardId,
  money,
  dealPasswords
) => {
  const jsonData = await http_post('/api/buy/fundBuy', {
    preventResubmit,
    fundCode,
    userBankCardId,
    money,
    dealPasswords
  })
  return jsonData
}

/**
 * 手续费预估
 *
 * @param {*} fundCode 基金代码
 * @param {*} money 金额
 * @returns
 */
export const FundEstimatedFeeApi = async (fundCode, money) => {
  const jsonData = await http_post('/api/buy/fundEstimatedFee', {
    fundCode,
    money
  })
  return jsonData
}

/**
 * 基金赎回准备信息
 *
 * @param {*} fundCode
 * @returns
 */
export const FundRedeemPrepareApi = async fundCode => {
  const jsonData = await http_post('/api/redeem/fundRedeemPrepare', {
    fundCode
  })
  return jsonData
}

/**
 * 基金赎回
 *
 * @param {*} preventResubmit 校验信息
 * @param {*} fundCode 基金代码
 * @param {*} shares 份额
 * @param {*} dealPasswords 交易密码
 * @returns
 */
export const FundRedeemApi = async (preventResubmit, fundCode, shares, dealPasswords) => {
  const jsonData = await http_post('/api/redeem/fundRedeem', {
    preventResubmit,
    fundCode,
    shares,
    dealPasswords
  })
  return jsonData
}

/**
 * 分红详情
 *
 * @param {*} bonusId 分红id
 * @returns
 */
export const BonusDetailApi = async bonusId => {
  const jsonData = await http_post('/api/trade/bonusDetails', { bonusId })
  return jsonData
}

/**
 * 获取风险测评问题
 *
 * @returns
 */
export const GetTestQuestionsApi = async () => {
  const jsonData = await http_post('/api/account/getQuestionnaire', {})
  return jsonData
}

/**
 * 风险测评回复
 *
 * @param {*} evaluationIdentification
 * @param {*} reply
 * @returns
 */
export const TestAnswerSurveyApi = async (evaluationIdentification, reply) => {
  const jsonData = await http_post('/api/account/answerSurvey', {
    evaluationIdentification,
    reply
  })
  return jsonData
}

/**
 * 风险测评检查
 *
 * @param {*} reply
 * @returns
 */
export const TestAnswerSurveyPreCheckApi = async reply => {
  const jsonData = await http_post('/api/account/answerSurveyPreCheckFlag', {
    reply
  })
  return jsonData
}

/**
 * 获取测评状态
 *
 * @returns
 */
export const EvaluationStatusApi = async () => {
  const jsonData = await http_post('/api/account/evaluationStatus', {})
  return jsonData
}

/**
 * 查看风险测评等级
 *
 * @returns
 */
export const LookRiskLevelApi = async () => {
  const jsonData = await http_post('/api/account/lookRiskGrade', {})
  return jsonData
}

/**
 * 非货币基金详情
 *
 * @param {*} fundCode 基金代码
 * @returns
 */
export const FloatFundDetailApi = async fundCode => {
  const jsonData = await http_post('/api/product/floatFundDetails', {
    fundCode
  })
  return jsonData
}

/**
 * 货币基金详情
 *
 * @param {*} fundCode 基金代码
 * @returns
 */
export const CurrencyFundDetailApi = async fundCode => {
  const jsonData = await http_post('/api/product/currencyFundDetails', {
    fundCode
  })
  return jsonData
}

/**
 * 实名认证
 *
 * @returns
 */
export const BankCheckApi = async () => {
  const jsonData = await http_post('/api/account/getAwaitOpenAccout', {})
  return jsonData
}

/**
 * 绑卡信息
 *
 * @param {*} userBankCardId 银行卡
 * @param {*} mobileTel 电话
 * @returns
 */
export const BankSendMsgApi = async (userBankCardId, mobileTel) => {
  const jsonData = await http_post('/api/account/sendOpenAccoutMessage', {
    userBankCardId,
    mobileTel
  })
  return jsonData
}

/**
 * 开户
 *
 * @param {*} userBankCardId 银行卡
 * @param {*} authcode 验证码
 * @param {*} mobileTel 电话
 * @param {*} isbadIntegrity 无不良
 * @param {*} beneficiaryIsSelf
 * @param {*} beneficiary
 * @param {*} beneficiaryIdNo
 * @param {*} holdingIsSelf
 * @param {*} holdingName
 * @param {*} holdIdNo
 * @returns
 */
export const BankInformationApi = async (
  userBankCardId,
  authcode,
  mobileTel,
  isbadIntegrity,
  beneficiaryIsSelf,
  beneficiary,
  beneficiaryIdNo,
  holdingIsSelf,
  holdingName,
  holdIdNo
) => {
  const jsonData = await http_post('/api/account/openAccoutMessageVerify', {
    userBankCardId,
    authcode,
    mobileTel,
    isbadIntegrity,
    beneficiaryIsSelf,
    beneficiary,
    beneficiaryIdNo,
    holdingIsSelf,
    holdingName,
    holdIdNo
  })
  return jsonData
}

/**
 * 设置交易密码
 *
 * @param {*} userBankCardId 银卡
 * @param {*} tradePwds 交易密码
 * @param {*} mobileTel 电话
 * @returns
 */
export const TransactionPswApi = async (userBankCardId, tradePwds, mobileTel) => {
  const jsonData = await http_post('/api/account/openAccount', {
    userBankCardId,
    tradePwds,
    mobileTel
  })
  return jsonData
}

/**
 * 找回密码
 *
 * @param {*} clientName 名字
 * @param {*} idNo  身份证号
 * @returns
 */
export const RetrievePswApi = async (clientName, idNo) => {
  const jsonData = await http_post('/api/account/sendTradePwdVerifyCode', {
    clientName,
    idNo
  })
  return jsonData
}

/**
 * 默认电话号码
 *
 * @returns
 */
export const RetrieveTelApi = async () => {
  const jsonData = await http_post('/api/account/getBankCard', {})
  return jsonData
}

/**
 * 设置密码
 *
 * @param {*} clientName
 * @param {*} idNo
 * @param {*} tradePwds
 * @param {*} verifyCode
 * @returns
 */
export const SetTradePswApi = async (clientName, idNo, tradePwds, verifyCode) => {
  const jsonData = await http_post('/api/account/setTradePwd', {
    clientName,
    idNo,
    tradePwds,
    verifyCode
  })
  return jsonData
}

/**
 * 撤销订单
 *
 * @param {*} orderId 订单id
 * @param {*} dealPasswords 密码
 * @returns
 */
export const PurchaseCancelApi = async (orderId, dealPasswords) => {
  const jsonData = await http_post('/api/trade/fundCancellations', {
    orderId,
    dealPasswords
  })
  return jsonData
}

/**
 * 设置分红方式
 *
 * @param {*} fundCode 基金代码
 * @param {*} bonusType 分红方式
 * @param {*} dealPasswords 交易密码
 * @returns
 */
export const SetBonusTypeApi = async (fundCode, bonusType, dealPasswords) => {
  const jsonData = await http_post('/api/trade/setBonusType', {
    fundCode,
    bonusType,
    dealPasswords
  })
  return jsonData
}

/**
 * 获得历史记录
 *
 * @param {*} limit
 * @param {*} fundCode 基金代码
 * @param {*} lastId
 * @returns
 */
export const GetHistoryApi = async (limit, fundCode, lastId) => {
  const jsonData = await http_post('/api/product/getHistory', {
    limit,
    fundCode,
    lastId
  })
  return jsonData
}

/**
 * 获取非货基历史记录
 *
 * @param {*} limit
 * @param {*} fundCode
 * @param {*} lastId
 * @returns
 */
export const GetNotCurrencyHistoryApi = async (limit, fundCode, lastId) => {
  const jsonData = await http_post('/api/product/getNotCurrencyHistory', {
    limit,
    fundCode,
    lastId
  })
  return jsonData
}

/**
 * 获取常见问题列表
 *
 * @returns
 */
export const GetFundQuestionListApi = async () => {
  const jsonData = await http_post('/api/product/fundQuestionList', {})
  return jsonData
}

/**
 * 获取问题详情
 *
 * @param {*} questionId 问题id
 * @returns
 */
export const GetQuestionDetailApi = async questionId => {
  const jsonData = await http_post('/api/product/questionDetails', {
    questionId
  })
  return jsonData
}

// /**
//  * 获取收益明细
//  *
//  * @param {*} fundCode 基金代码
//  * @returns
//  */
// export const GetProfitDetailApi = async fundCode => {
//   const jsonData = await http_post('/api/asset/fundDayIncomeList', { fundCode })
//   return jsonData
// }

/**
 * 个人信息
 *
 * @returns
 */
export const GetPersonInformationApi = async () => {
  const jsonData = await http_post('/api/user/getInformation', {})
  return jsonData
}

/**
 * 设置个人信息
 *
 * @returns
 */
export const SetPerInformationApi = async params => {
  const jsonData = await http_post('/api/user/improveInformation', params)
  return jsonData
}

/**
 * 基金单页，单位净值数据走势
 *
 * @param {*} fundCode
 * @returns
 */
export const FloatFundCurveApi = async fundCode => {
  const jsonData = await http_post('/api/curve/floatFundCurve', { fundCode })
  return jsonData
}

/**
 * 身份确认页
 *
 * @returns
 */
export const IdentityInformationApi = async () => {
  const jsonData = await http_post('/api/account/power', {})
  return jsonData
}

/**
 * 申购失败时获取验证码的接口
 *
 * @param {*} userBankCardId
 * @returns
 */
export const PowerSendMsgApi = async userBankCardId => {
  const jsonData = await http_post('/api/account/PowerSendShortMessage', {
    userBankCardId
  })
  return jsonData
}

/**
 * 申购失败时获取验证吗的下一步的按钮
 *
 * @param {*} userBankCardId
 * @param {*} authcode
 * @returns
 */
export const PowerNoteVerifyApi = async (userBankCardId, authcode) => {
  const jsonData = await http_post('/api/account/PowerNoteVerify', {
    userBankCardId,
    authcode
  })
  return jsonData
}

/**
 * 查询申购订单状态
 *
 * @param {*} orderId
 * @returns
 */
export const CheckBuyStatusApi = async orderId => {
  const jsonData = await http_post('/api/buy/getBuyStatus', { orderId })
  return jsonData
}

/**
 * 历史持仓
 *
 * @returns
 */
export const HistoryShareApi = async () => {
  const jsonData = await http_post('/api/asset/historyShare', {})
  return jsonData
}

/**
 * 资讯详情
 *
 * @param {*} newsId
 * @returns
 */
export const NewsDetailApi = async newsId => {
  const jsonData = await http_post('/api/news/newsFind', { newsId })
  return jsonData
}

/**
 * 基金策略介绍
 *
 * @param {*} policyRecommendId
 * @returns
 */
export const WisdomElectDetailsApi = async policyRecommendId => {
  const jsonData = await http_post('/api/product/wisdomElectDetails', {
    policyRecommendId
  })
  return jsonData
}

/**
 * 添加自选
 *
 * @param {*} fundCode 基金代码
 * @param {*} isOptional 类型 remove add
 * @returns
 *
 *
 */
export const AddOptionalApi = async (fundCode, isOptional) => {
  const jsonData = await http_post('/api/optional/addOptional', {
    fundCode,
    isOptional
  })
  return jsonData
}

/**
 * 检查开户状态
 *
 * @returns
 */
export const CheckBankStatusApi = async () => {
  const jsonData = await http_post('/api/account/getBankCard', {})
  return jsonData
}

/**
 * 验证旧密码
 *
 * @param {*} tradePwdOld
 * @returns
 */
export const oldPassword = async tradePwdOld => {
  const jsonData = await http_post('/api/account/alterTradePwdOld', {
    tradePwdOld
  })
  return jsonData
}

/**
 * 设置密码
 *
 * @param {*} tradePwdNew 新密码
 * @param {*} alterTradePwdIdentified 验证id
 * @returns
 */
export const newPassword = async (tradePwdNew, alterTradePwdIdentified) => {
  const jsonData = await http_post('/api/account/alterTradePwdNew', {
    tradePwdNew,
    alterTradePwdIdentified
  })
  return jsonData
}

/**
 * 校验密码
 *
 * @returns
 */
export const secondNewPassword = async (tradePwdNew, alterTradePwdIdentified) => {
  const jsonData = await http_post('/api/account/alterTradePwd', {
    tradePwdNew,
    alterTradePwdIdentified
  })
  return jsonData
}

/**
 * 公告总列表
 *
 * @param {*} page 页码
 * @param {*} limit 每页的条数
 * @returns
 */
export const advAllList = async (page, limit) => {
  const jsonData = await http_post('/api/fundNotice/noticeList', {
    page,
    limit
  })
  return jsonData
}

/**
 * 公告详情页
 *
 * @param {*} fundNoticeId 公告id
 * @returns
 */
export const advDetails = async fundNoticeId => {
  const jsonData = await http_post('/api/fundNotice/noticeInfo', {
    fundNoticeId
  })
  return jsonData
}

/**
 * 基金自动抓取公告信息
 *
 * @param {*} textId
 * @param {*} textType
 * @returns
 */
export const fundInfoNoticeApi = async (textId, textType) => {
  const jsonData = await http_post('/api/product/textDetails', {
    textId,
    textType
  })
  return jsonData
}

/**
 * 基金自动抓取公告信息
 *
 * @returns
 */
export const fundInfoNoticeExApi = async fundAnnouncementId => {
  const jsonData = await http_post('/api/product/announceDetails', {
    fundAnnouncementId
  })
  return jsonData
}

/**
 * 基金公告列表
 *
 * @param {*} fundCode 基金代码
 * @param {*} page 页码
 * @param {*} limit 每页的条数
 * @returns
 */
export const fundListDetail = async (fundCode, page, limit) => {
  const jsonData = await http_post('/api/fundNotice/fundNoticeList', {
    fundCode,
    page,
    limit
  })
  return jsonData
}
/**
 * 获得公告数据
 *
 * @param {*} fundCode 基金代码
 * @param {*} lastId   id
 * @param {*} limit    每页的条数
 * @returns
 */
export const announceListApi = async (fundCode, lastId, limit) => {
  const jsonData = await http_post('/api/product/announceList', {
    fundCode,
    lastId,
    limit
  })
  return jsonData
}
/**
 * 基金分红列表
 *
 * @param {*} fundCode 基金代码
 * @param {*} lastId    id
 * @param {*} limit    每页的条数
 * @returns
 */
export const fundDividendListApi = async (fundCode, lastId, limit) => {
  const jsonData = await http_post('/api/product/fundDividendList', {
    fundCode,
    lastId,
    limit
  })
  return jsonData
}
/**
 *
 * 定投设置准备接口
 * @param {*} fundCode
 * @returns
 */
export const investFixedApi = async (type, fundCode, fixedInvestId) => {
  const jsonData = await http_post('/api/fixedInvest/fundPrepare', {
    type: 'add',
    fundCode,
    fixedInvestId
  })
  return jsonData
}
/**
 *
 * 定投设置提交接口
 * @param {*} fundCode
 * @param {*} money
 * @param {*} unit
 * @param {*} fixDate
 * @param {*} dealPasswords
 * @param {*} preventResubmit
 * @returns
 */
export const fixedInvestAddApi = async (
  type,
  fundCode,
  fixedInvestId,
  money,
  unit,
  fixDate,
  dealPasswords,
  preventResubmit
) => {
  const jsonData = await http_post('/api/fixedInvest/fundAdd', {
    type: 'add',
    fundCode,
    fixedInvestId,
    money,
    unit,
    fixDate,
    dealPasswords,
    preventResubmit
  })
  return jsonData
}

/**
 *
 * 定投预估手续费和费率
 * @param {*} fundCode
 * @param {*} money
 * @returns
 */
export const fundEstimatedFeeApi = async (fundCode, money) => {
  const jsonData = await http_post('/api/fixedInvest/fundEstimatedFee', {
    fundCode,
    money
  })
  return jsonData
}

/**
 *预估定投设置或修改后的首次交易日（创建时的接口）
 *
 * @param {*} fundCode
 * @param {*} unit
 * @param {*} fixDate
 * @returns
 */
export const fundEstimatedDateApi = async (type, fundCode, fixedInvestId = null, unit, fixDate) => {
  const jsonData = await http_post('/api/fixedInvest/fundEstimatedDate', {
    type: 'add',
    fundCode,
    fixedInvestId,
    unit,
    fixDate
  })
  return jsonData
}

/**
 *预估定投设置或修改后的首次交易日（修改时的接口）
 *
 * @param {*} fundCode
 * @param {*} unit
 * @param {*} fixDate
 * @returns
 */
export const ChangeFundEstimatedDateApi = async (
  type,
  fundCode = null,
  fixedInvestId,
  unit,
  fixDate
) => {
  const jsonData = await http_post('/api/fixedInvest/fundEstimatedDate', {
    type,
    fundCode,
    fixedInvestId,
    unit,
    fixDate
  })
  return jsonData
}

/**
 *
 *定投协议详情
 * @returns
 */
export const fundProtocolInfoApi = async fixedInvestId => {
  const jsonData = await http_post('/api/fixedInvest/fundProtocolInfo', {
    fixedInvestId
  })
  return jsonData
}

/**
 *
 * 定投申购订单列表
 * @param {*} fixedInvestId
 * @param {*} limit
 * @param {*} lastId
 * @returns
 */
export const fundProtocolBuyListApi = async (fixedInvestId, limit, lastId) => {
  const jsonData = await http_post('/api/fixedInvest/fundProtocolBuyList', {
    fixedInvestId,
    limit,
    lastId
  })
  return jsonData
}

/**
 * 定投协议列表
 *
 * @param {*} fundCode
 * @param {*} limit
 * @param {*} lastId
 * @returns
 */
export const fundProtocolListApi = async (fundCode, page, limit) => {
  const jsonData = await http_post('/api/fixedInvest/fundProtocolList', {
    fundCode,
    page,
    limit
  })
  return jsonData
}
/**
 *
 * 定投设置准备(修改)接口
 * @param {*} fundCode
 * @returns
 */
export const changeApi = async (type, fundCode, fixedInvestId) => {
  const jsonData = await http_post('/api/fixedInvest/fundPrepare', {
    type,
    fundCode,
    fixedInvestId
  })
  return jsonData
}

/**
 *
 * 暂停
 * @param {*} fixedInvestId
 * @returns
 */
export const fundPauseApi = async (fixedInvestId, dealPasswords) => {
  const jsonData = await http_post('/api/fixedInvest/fundPause', {
    fixedInvestId,
    dealPasswords
  })
  return jsonData
}

/**
 *
 * 恢复
 * @param {*} fixedInvestId
 * @returns
 */
export const fundOpenApi = async (fixedInvestId, dealPasswords) => {
  const jsonData = await http_post('/api/fixedInvest/fundOpen', {
    fixedInvestId,
    dealPasswords
  })
  return jsonData
}

/**
 *
 * 终止
 * @param {*} fixedInvestId
 * @returns
 */
export const fundTerminationApi = async (fixedInvestId, dealPasswords) => {
  const jsonData = await http_post('/api/fixedInvest/fundTermination', {
    fixedInvestId,
    dealPasswords
  })
  return jsonData
}
/**
 *
 * 定投修改提交接口
 * @param {*} fundCode
 * @param {*} money
 * @param {*} unit
 * @param {*} fixDate
 * @param {*} dealPasswords
 * @param {*} preventResubmit
 * @returns
 */
export const changeSubmintApi = async (
  type,
  fundCode,
  fixedInvestId,
  money,
  unit,
  fixDate,
  dealPasswords,
  preventResubmit
) => {
  const jsonData = await http_post('/api/fixedInvest/fundAdd', {
    type: 'update',
    fundCode,
    fixedInvestId,
    money,
    unit,
    fixDate,
    dealPasswords,
    preventResubmit
  })
  return jsonData
}

/**
 * 交易记录总列表(单只基金)
 *
 * @param {*} orderType 订单类型 1申购 2赎回 3定投 4分红 0全部 -1进行中
 * @param {*} fundCode 基金代码
 * @param {*} lastId   接收最后一条记录
 * @param {*} limit    每页的查询数 默认10
 * @returns
 */
export const GetOrderListApi = async (orderType, fundCode, lastId, limit) => {
  const jsonData = await http_post('/api/trade/getOrderList', {
    orderType,
    fundCode,
    lastId,
    limit
  })
  return jsonData
}

/**
 * 交易记录列表(组合)
 *
 * @param {*} lastId 分页用，最后一条数据的id
 * @param {*} limit  每页条数
 * @param {*} orderType  订单类型 1申购 2赎回  0默认 -1进行中
 * @param {*} fundGroupCode 组合代码
 * @returns
 */
export const GetGroupOrderListApi = async (lastId, limit, orderType, fundGroupCode) => {
  const jsonData = await http_post('/api/trade/getGroupOrderList', {
    lastId,
    limit,
    orderType,
    fundGroupCode
  })
  return jsonData
}
/**
 *待办事项处理接口
 *
 * @param {*} eventNo
 * @param {*} type
 * @param {*} fixedInvestId
 * @returns
 */
export const disposeBacklogApi = async (eventNo, type, fixedInvestId, dealPasswords) => {
  const jsonData = await http_post('/api/fixedInvest/disposeBacklog', {
    eventNo,
    type,
    fixedInvestId,
    dealPasswords
  })
  return jsonData
}

/**
 *
 * 组合历史调仓列表
 * @returns
 */
export const adjustListApi = async fundGroupCode => {
  const jsonData = await http_post('/api/group/adjustList', { fundGroupCode })
  return jsonData
}

/**
 * 组合历史调仓展开列表
 *
 * @param {*} fundGroupCode
 * @param {*} adjustDate
 * @returns
 */
export const adjustInfoApi = async (fundGroupCode, adjustDate) => {
  const jsonData = await http_post('/api/group/adjustInfo', {
    fundGroupCode,
    adjustDate
  })
  return jsonData
}

/**
 * 组合规则详情和费率
 *
 * @param {*} fundGroupCode
 * @returns
 */
export const tradingRulesApi = async fundGroupCode => {
  const jsonData = await http_post('/api/group/TradingRules', { fundGroupCode })
  return jsonData
}

/**
 * 获取组合数据
 *
 * @param {*} groupId 组合id
 * @param {*} fundType 类型  0半年  1一年 2三年  3五年 4十年
 * @returns
 */
export const GetGroupChartInfoApi = async (groupId, fundType) => {
  const jsonData = await http_post('/api/curve/mygroupInfo', {
    groupId,
    fundType
  })
  return jsonData
}

/**
 * 检查是否可申购赎回
 *
 * @param {*} fundGroupId 组合id
 * @returns
 */
export const CheckGroupCanBuyOrRedeemApi = async fundGroupId => {
  const jsonData = await http_post('/api/buy/GroupClick', { fundGroupId })
  return jsonData
}

/**
 * 组合曲线title
 *
 * @param {*} groupId
 * @returns
 */
export const GetGroupInfoChartTitleApi = async groupId => {
  const jsonData = await http_post('/api/curve/mygroupInfoTitle', { groupId })
  return jsonData
}

/**
 * 赎回比例验证
 *
 * @param {*} fundGroupId 组合id
 * @param {*} ratio 赎回比例
 * @returns
 */
export const GroupPrepareRatioApi = async (fundGroupId, ratio) => {
  const jsonData = await http_post('/api/redeem/GroupPrepareRatio', {
    fundGroupId,
    ratio
  })
  return jsonData
}

/**
 * 组合中更多的常见问题
 *
 * @returns
 */
export const GroupQuestionListApi = async () => {
  const jsonData = await http_post('/api/group/groupQuestionList', {})
  return jsonData
}
// export const GetGroupInfoApi = async () => {
//   const jsonData = await http_post('/api/open/WisdomElect', {})
//   return jsonData
// }
