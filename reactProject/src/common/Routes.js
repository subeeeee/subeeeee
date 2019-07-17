/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-08 11:05:31
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 12:01:38
 * @Note 路由表
 */

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import {
  ROUTE_GROUP_INFO,
  ROUTE_GROUP_BUY_DETAIL,
  ROUTE_GROUP_ASSET,
  ROUTE_GROUP_BUY,
  ROUTE_GROUP_ASSET_DETAIL,
  ROUTE_GROUP_REDEEM,
  ROUTE_TRADE_RECORD_NEW,
  ROUTE_GROUP_REDEEM_DETAIL,
  ROUTE_RULE_AND_RATE,
  ROUTE_HISTORICAL_POSITION_DETAIL,
  ROUTE_GROUP_TRADE_RECORD,
  ROUTE_TEST_RESULT,
  ROUTE_BARNER_STRATEGY,
  ROUTE_ALL_INVEST_LIST
} from './route/routeName'

/**
 * 异步加载
 *
 * @param {*} routeName
 * @param {*} routeComponet
 */
const LoadAsyncRoute = (routeName, routeComponet) => {
  let componet = (location, callback) => {
    require.ensure([], function(require) {
      callback(null, routeComponet)
    })
  }

  return { name: routeName, path: '/' + routeName, componet: componet }
}

// 测评
const Test = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/test').default)
  })
}

// 我的资产
const MyAsset = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/myAsset').default)
  })
}

// 机器配置
const IntelConfig = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/intelConfig').default)
  })
}

// 基金详情
const FundDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundDetail').default)
  })
}

// 资产详情
const AssetDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/assetDetail').default)
  })
}

// 申购详情
const BuyDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/buyDetail').default)
  })
}

// 赎回详情
const SellDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/sellDetail').default)
  })
}

// 交易详情
const TransferDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/transferDetail').default)
  })
}

// 分红详情
const DividendDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/dividendDetail').default)
  })
}

// 申购
const FundBuy = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundBuy').default)
  })
}

const Iframe = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/iframe').default)
  })
}

// 银行检验
const BankCheck = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/bankCheck').default)
  })
}

// 交易密码
const TransactionPassword = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/transactionPassword').default)
  })
}

// 赎回界面
const FundRedeem = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundRedeem').default)
  })
}
// 错误页面
const ErrorPage = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/errorPage').default)
  })
}
//公告详情
const AdvDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/advDetail').default)
  })
}
//找回密码
const RetrievePassword = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/retrievePassword').default)
  })
}

//修改分红方式
const DividendSelect = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/dividendSelect').default)
  })
}

//货基历史详情
const HistoricalDetails = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/historicalDetails').default)
  })
}

//非货基详情页增加历史净值
const notCurrencyHistory = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/notCurrencyHistory').default)
  })
}

//更多问题
const SimpleProblem = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/simpleProblem').default)
  })
}

//问题详情
const Answer = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/answer').default)
  })
}

//盈信基金
const yxFundDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/yxFundDetail').default)
  })
}

//基金详情页中收益明细
const ProfitDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/profitDetail').default)
  })
}

// 个人信息页面
const PerInformation = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/perInformation').default)
  })
}

// 个人信息的文本页面
const TextPage = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/textPage').default)
  })
}
// 个人信息的证件有效日期页面
const CerData = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/cerData').default)
  })
}
// 个人信息修好结果页面
const ModifyResolt = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/modifyResolt').default)
  })
}
//申购失败身份信息确认页面
const RightInformation = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/rightInformation').default)
  })
}

//申购失败身份信息确认页
const IdentityInformation = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/identityInformation').default)
  })
}

//申购失败时发送验证码的页面
const YzmPage = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/yzmPage').default)
  })
}
//投资权益须知
const NoticeofRights = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/noticeofRights').default)
  })
}

//组合基金赎回页面
const GroupRedeem = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupRedeem/groupRedeem').default)
  })
}
//组合资产页面
const GroupAsset = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupAsset').default)
  })
}
// 组合资产详情页面
const GroupAssetDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupAssetDetail').default)
  })
}

//组合购买
const GroupBuy = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupBuy/groupBuy').default)
  })
}

//查看基金详情
const FundInfor = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundInfor').default)
  })
}

//组合详情
const GroupInfo = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupInfo/groupInfo').default)
  })
}

// 组合购买详情页
const GroupBuyDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupBuyDetail/groupBuyDetail').default)
  })
}

//基金策略
const FundStrategy = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundStrategy').default)
  })
}
// 多只基金策略
const FundStrategyMore = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundStrategyMore').default)
  })
}
// 历史持仓
const HistoricalHolding = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/historicalHolding').default)
  })
}
//风险提示
const RiskWarning = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/riskWarning').default)
  })
}
//单只基金交易记录
const FundtradeRecord = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundtradeRecord').default)
  })
}
//资讯详情
const NewsDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/newsDetail').default)
  })
}
// 修改交易密码(旧密码页)
const ChangePassword = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/changePassword').default)
  })
}
// 设置交易密码（第一次输入新密码）
const FirstSetPwdPage = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/firstSetPwdPage').default)
  })
}
// 校验密码（二次输入密码）
const SecondSetPwdPage = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/secondSetPwdPage').default)
  })
}
// 公告列表
const AdvList = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/advList').default)
  })
}
// 基金管理公司
const FundList = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundList').default)
  })
}
// 资讯详情页
const FundInformationDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fundInformationDetail').default)
  })
}
//我的定投
const AllInvestList = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/allInvestList').default)
  })
}

/**
 * barner策略
 *
 * @param {*} location
 * @param {*} callback
 */
const BarnerStrategy = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/barnerStrategy/barnerStrategy').default)
  })
}

//设置定投
const FixedInvest = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fixedInvest').default)
  })
}

//设置定投
const FixedInvestDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/fixedInvestDetail').default)
  })
}

// 交易记录
const TradeRecordNew = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/tradeRecordNew/tradeRecordNew').default)
  })
}
// 组合赎回详情
const GroupRedeemDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupRedeemDetail/groupRedeemDetail').default)
  })
}
//历史持仓的详情页
const GroupHistoricalDetail = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupHistoricalDetail').default)
  })
}

//组合中规则详情和费率
const RuleAndRate = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/ruleAndRate').default)
  })
}

//单只组合交易记录
const GroupTradeRecord = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/groupRecord/groupTradeRecord').default)
  })
}

/**
 *
 *风险测评结果页
 * @param {*} location
 * @param {*} callback
 */
const TestResult = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/testResult').default)
  })
}

/**
 *定投协议的页面
 *
 * @param {*} location
 * @param {*} callback
 */
const InvestAgreenment = (location, callback) => {
  require.ensure([], function(require) {
    callback(null, require('../components/investAgreenment').default)
  })
}

const Routes = () => (
  <Router history={hashHistory}>
    <Route name="app" path="/" getComponent={MyAsset} />
    <Route name="iframe" path="/iframe" getComponent={Iframe} />
    <Route name="test" path="/test" getComponent={Test} />
    <Route name="myAsset" path="/myAsset" getComponent={MyAsset} />
    <Route name="assetDetail" path="/assetDetail" getComponent={AssetDetail} />
    <Route name="tradeRecord" path="/tradeRecord" getComponent={TradeRecordNew} />
    <Route name="intelConfig" path="/intelConfig" getComponent={IntelConfig} />
    <Route name="fundDetail" path="/fundDetail" getComponent={FundDetail} />
    <Route name="dividendDetail" path="/dividendDetail" getComponent={DividendDetail} />
    <Route name="transferDetail" path="/transferDetail" getComponent={TransferDetail} />
    <Route name="sellDetail" path="/sellDetail" getComponent={SellDetail} />
    <Route name="buyDetail" path="/buyDetail" getComponent={BuyDetail} />
    <Route name="bankCheck" path="/bankCheck" getComponent={BankCheck} />
    <Route
      name="transactionPassword"
      path="/transactionPassword"
      getComponent={TransactionPassword}
    />
    <Route name="fundBuy" path="/fundBuy" getComponent={FundBuy} />
    <Route name="fundRedeem" path="/fundRedeem" getComponent={FundRedeem} />
    <Route name="errorPage" path="/errorPage" getComponent={ErrorPage} />
    <Route name="advDetail" path="/advDetail" getComponent={AdvDetail} />
    <Route name="retrievePassword" path="/retrievePassword" getComponent={RetrievePassword} />
    <Route name="dividendSelect" path="/dividendSelect" getComponent={DividendSelect} />
    <Route name="historicalDetails" path="/historicalDetails" getComponent={HistoricalDetails} />
    <Route name="notCurrencyHistory" path="/notCurrencyHistory" getComponent={notCurrencyHistory} />
    <Route name="SimpleProblem" path="/simple-problem" getComponent={SimpleProblem} />
    <Route name="Answer" path="/answer" getComponent={Answer} />
    <Route name="yxFundDetail" path="/yxFundDetail" getComponent={yxFundDetail} />
    <Route name="profitDetail" path="/profitDetail" getComponent={ProfitDetail} />
    <Route name="perInformation" path="/perInformation" getComponent={PerInformation} />
    <Route name="textPage" path="/textPage" getComponent={TextPage} />
    <Route name="cerData" path="/cerData" getComponent={CerData} />
    <Route name="modifyResolt" path="/modifyResolt" getComponent={ModifyResolt} />
    <Route name="rightInformation" path="/rightInformation" getComponent={RightInformation} />
    <Route
      name="identityInformation"
      path="/identityInformation"
      getComponent={IdentityInformation}
    />
    <Route name="yzmPage" path="/yzmPage" getComponent={YzmPage} />
    <Route name="noticeofRights" path="/noticeofRights" getComponent={NoticeofRights} />

    <Route name="fundStrategy" path="/fundStrategy" getComponent={FundStrategy} />

    <Route name="fundStrategyMore" path="/fundStrategyMore" getComponent={FundStrategyMore} />
    <Route name="historicalHolding" path="/historicalHolding" getComponent={HistoricalHolding} />
    <Route name="riskWarning" path="/riskWarning" getComponent={RiskWarning} />
    <Route name="fundtradeRecord" path="/fundtradeRecord" getComponent={FundtradeRecord} />
    <Route name="newsDetail" path="/newsDetail" getComponent={NewsDetail} />
    <Route name="changePassword" path="/changePassword" getComponent={ChangePassword} />
    <Route name="firstSetPwdPage" path="/firstSetPwdPage" getComponent={FirstSetPwdPage} />
    <Route name="secondSetPwdPage" path="/secondSetPwdPage" getComponent={SecondSetPwdPage} />
    <Route name="advList" path="/advList" getComponent={AdvList} />
    <Route name="fundList" path="/fundList" getComponent={FundList} />
    <Route
      name="fundInformationDetail"
      path="/fundInformationDetail"
      getComponent={FundInformationDetail}
    />
    <Route
      name={ROUTE_BARNER_STRATEGY}
      path={'/' + ROUTE_BARNER_STRATEGY}
      getComponent={BarnerStrategy}
    />

    <Route name={ROUTE_GROUP_REDEEM} path={'/' + ROUTE_GROUP_REDEEM} getComponent={GroupRedeem} />
    <Route name="groupAsset" path="/groupAsset" getComponent={GroupAsset} />
    <Route name="groupAssetDetail" path="/groupAssetDetail" getComponent={GroupAssetDetail} />
    <Route name="groupBuy" path="/groupBuy" getComponent={GroupBuy} />
    <Route name="groupInfo" path="/groupInfo" getComponent={GroupInfo} />
    <Route
      name={ROUTE_GROUP_BUY_DETAIL}
      path={'/' + ROUTE_GROUP_BUY_DETAIL}
      getComponent={GroupBuyDetail}
    />

    <Route
      name={ROUTE_GROUP_REDEEM_DETAIL}
      path={'/' + ROUTE_GROUP_REDEEM_DETAIL}
      getComponent={GroupRedeemDetail}
    />

    <Route name="fundInfor" path="/fundInfor" getComponent={FundInfor} />
    <Route
      name={ROUTE_HISTORICAL_POSITION_DETAIL}
      path={'/' + ROUTE_HISTORICAL_POSITION_DETAIL}
      getComponent={GroupHistoricalDetail}
    />
    <Route name={ROUTE_RULE_AND_RATE} path={'/' + ROUTE_RULE_AND_RATE} getComponent={RuleAndRate} />
    <Route
      name={ROUTE_GROUP_TRADE_RECORD}
      path={'/' + ROUTE_GROUP_TRADE_RECORD}
      getComponent={GroupTradeRecord}
    />
    <Route name={ROUTE_TEST_RESULT} path={'/' + ROUTE_TEST_RESULT} getComponent={TestResult} />

    <Route name={ROUTE_ALL_INVEST_LIST} path="/allInvestList" getComponent={AllInvestList} />
    <Route name="fixedInvest" path="/fixedInvest" getComponent={FixedInvest} />
    <Route name="fixedInvestDetail" path="/fixedInvestDetail" getComponent={FixedInvestDetail} />
    <Route name="investAgreenment" path="/investAgreenment" getComponent={InvestAgreenment} />
  </Router>
)

export default Routes
