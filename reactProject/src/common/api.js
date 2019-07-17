import applayFetch from './fetch'
let toApi = {}

//资产
toApi.myAsset = applayFetch('/api/asset/my')
toApi.fundAssetDetails = applayFetch('/api/asset/fundDetails')
toApi.myCount = applayFetch('/api/fund/myFund')
toApi.countDetail = applayFetch('/api/fund/fundDetail')

//单只基金
toApi.fundBuyPrepare = applayFetch('/api/buy/fundBuyPrepare')
toApi.fundBuy = applayFetch('/api/buy/fundBuy')
toApi.fundEstimatedFee = applayFetch('/api/buy/fundEstimatedFee')
toApi.buyDetails = applayFetch('/api/trade/buyDetails')
toApi.buyList = applayFetch('/api/trade/buyList')
toApi.redeemList = applayFetch('/api/trade/redeemList')
toApi.redeemDetails = applayFetch('/api/trade/redeemDetails')
toApi.fundRedeemPrepare = applayFetch('/api/redeem/fundRedeemPrepare')
toApi.fundRedeem = applayFetch('/api/redeem/fundRedeem')
toApi.bonusList = applayFetch('/api/trade/bonusList')
toApi.bonusDetails = applayFetch('/api/trade/bonusDetails')

toApi.groupProfit = applayFetch('/api/fund/groupProfit')
toApi.chartGroupDetail = applayFetch('/api/curve/groupDetail')
toApi.fundcurve = applayFetch('/api/curve/fundcurve')

// 智能配置
toApi.intelligent = applayFetch('/api/fund/intelligent')
toApi.smart = applayFetch('/api/fund/smart')
toApi.groupInfo = applayFetch('/api/fund/groupInfo')
toApi.groupInfoChart = applayFetch('/api/curve/groupInfo')
toApi.fundInfo = applayFetch('/api/fund/fundInfo')

// 风险评测页面
toApi.getQuestionnaire = applayFetch('/api/account/getQuestionnaire')
toApi.answerSurvey = applayFetch('/api/account/answerSurvey')
toApi.answerSurveyPreCheckFlag = applayFetch(
  '/api/account/answerSurveyPreCheckFlag'
)
toApi.evaluationStatus = applayFetch('/api/account/evaluationStatus')
toApi.lookRiskGrade = applayFetch('/api/account/lookRiskGrade')

// 浮动产品基金详情
toApi.floatFundDetails = applayFetch('/api/product/floatFundDetails')
// 货币基金详情
toApi.currencyFundDetails = applayFetch('/api/product/currencyFundDetails')
// 基金详情 公告列表
toApi.announceList = applayFetch('/api/product/announceList')

// 实名认证绑卡
toApi.bankCheck = applayFetch('/api/account/getAwaitOpenAccout')
// 下一步
toApi.sendMessage = applayFetch('/api/account/sendOpenAccoutMessage')
// 点击完成按钮
toApi.bankInformation = applayFetch('/api/account/openAccoutMessageVerify')
// 交易密码设置
toApi.transactionPassword = applayFetch('/api/account/openAccount')
// 公告详情
toApi.advDetail = applayFetch('/api/product/announceDetails')
// 找回密码
toApi.retrievePassword = applayFetch('/api/account/sendTradePwdVerifyCode')
// 身份验证页的发送验证码
toApi.hqyzm = applayFetch('/api/account/setTradePwd')
// 默认显示电话号码
toApi.tel = applayFetch('/api/account/getBankCard')
// 基金投资范围跳的详情页
toApi.scopeRange = applayFetch('/api/product/textDetails')
// 撤单基金的接口
toApi.purchase = applayFetch('/api/trade/fundCancellations')

// 设置分红方式接口
toApi.setBonusType = applayFetch('/api/trade/setBonusType')
// 申购赎回进行中订单列表
toApi.doingOrderList = applayFetch('/api/trade/underwayOrderList')

//基金七日年化收益率和万份收益历史
toApi.getHistory = applayFetch('/api/product/getHistory')
//基金分红列表接口
toApi.fundDividendList = applayFetch('/api/product/fundDividendList')
//更多问题
toApi.getQuesAll = applayFetch('/xxx')
// 基金详情 浮动基金历史净值数据
toApi.getNotCurrencyHistory = applayFetch('/api/product/getNotCurrencyHistory')
//单支基金常见问题列表
toApi.getfundQuestionList = applayFetch('/api/product/fundQuestionList')
//单支基金常见问题详情页
toApi.getquestionDetails = applayFetch('/api/product/questionDetails')
// 收益明细的接口
toApi.profitDetail = applayFetch('/api/asset/fundDayIncomeList')
// 个人信息的接口
toApi.perInformation = applayFetch('/api/user/getInformation')
// 个人资料中保存信息的按钮的接口
toApi.submitInformation = applayFetch('/api/user/improveInformation')
//基金单页 单位净值、累计净值走势数据
toApi.floatFundCurve = applayFetch('/api/curve/floatFundCurve')
//申购失败时身份信息确认
toApi.identityInformation = applayFetch('/api/account/power')
//申购失败时获取验证码的接口
toApi.yzmPage = applayFetch('/api/account/PowerSendShortMessage')
//申购失败时获取验证吗的下一步的按钮
toApi.nextPage = applayFetch('/api/account/PowerNoteVerify')
//及时下单
toApi.getBuyStatus = applayFetch('/api/buy/getBuyStatus')
// 获取业绩历史
toApi.getFundAchievement = applayFetch('/api/assetFund/getFundAchievement')
// 自选设置
toApi.setFundSelect = applayFetch('/api/assetFund/getFundAchievement')

//赎回中组合基金
toApi.combinedPage = applayFetch('/api/redeem/GroupPrepare')
// 组合赎回中马上提现
toApi.immediateCash = applayFetch('/api/redeem/RedeemGroup')
// 组合赎回中选择比例
toApi.ratio = applayFetch('/api/redeem/RedeemGroupFee')
//组合资产页面
toApi.groupAsset = applayFetch('/api/user/MyGroup')
//组合资产详情
toApi.groupAssetInfo = applayFetch('/api/user/MyGroupInfo')
//组合投入  基金配置详情
toApi.getGroupInfo = applayFetch('/api/buy/GroupPrepare')
//组合投入  申购下单
toApi.groupBuy = applayFetch('/api/buy/GroupBuy')
//组合投入  组合购买费率
toApi.groupEstimatedFee = applayFetch('/api/buy/GroupBuyFee')
// 组合详情
toApi.groupInfo = applayFetch('/api/group/info')
// 组合详情图表数据
toApi.groupInfoChart = applayFetch('/api/curve/groupInfo')

// 查看基金详情
toApi.fundIfor = applayFetch('/api/fund/fundinfo')
//组合常见问题列表
toApi.getGroupQuestionList = applayFetch('/api/group/groupQuestionList')
//组合常见问题详情页
toApi.getGroupQuestionDetails = applayFetch('/api/group/questionDetails')
//组合智能曲线的接口
toApi.getCurve = applayFetch('/api/curve/smartCurve')

// 历史持仓
toApi.historicalHolding = applayFetch('/api/asset/historyShare')
// 单只基金交易记录
toApi.fundDealRecord = applayFetch('/api/asset/fundDealRecord')
// 资讯详情
toApi.newsFind = applayFetch('/api/news/newsFind')
// 基金策略介绍接口
toApi.wisdomElectDetails = applayFetch('/api/product/wisdomElectDetails')
// 添加自选
toApi.addOptional = applayFetch('/api/optional/addOptional')
// 检查是否开户
toApi.checkUserStatus = applayFetch('/api/account/getBankCard')
// 验证旧密码
toApi.oldPassword = applayFetch('/api/account/alterTradePwdOld')
// 设置新密码第一个页面
toApi.newPassword = applayFetch('/api/account/alterTradePwdNew')
// 设置新密码的第二个页面
toApi.secondNewPassword = applayFetch('/api/account/alterTradePwd')
// 公告总列表
toApi.advAllList = applayFetch('/api/fundNotice/noticeList')
// 公告详情页
toApi.advDetails = applayFetch('/api/fundNotice/noticeInfo')
// 基金列表详情页
toApi.fundListDetail = applayFetch('/api/fundNotice/fundNoticeList')
export default toApi
