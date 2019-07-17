/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-22 14:05:37
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 13:57:56
 * @Note 资产详情
 */

import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle, BackSubTitle } from './common/baseTitle'
import toApi from '../common/api'
import AlertBox from './common/alert-box'
import { toast, showload } from './common/toast'
import { EvaluatingCard } from './common/evaluatingCard.js'
import Copyright from './common/copyright'
import { Dialog } from './common/dialog.js'
import {
  setToken,
  changeTitle,
  isShowTitle,
  isIphoneX
} from '../common/setToken'
import '../sass/assetDetail.scss'
import DefineVal from '../common/defineVal'
import BaseComponent from './baseComponent'
import {
  checkResult,
  MyAssetDetailApi,
  EvaluationStatusApi
} from '../common/api/api'
import {
  ROUTE_FUND_DETAIL,
  ROUTE_PROFIT_DETAIL,
  ROUTE_FUND_TRADE_RECORD,
  ROUTE_DIVIDEND_SELECT,
  ROUTE_FUND_REDEEM,
  ROUTE_FUND_BUY,
  ROUTE_ALL_INVEST_LIST,
  ROUTE_TEST
} from '../common/route/routeName'
import { routePush } from '../common/route/routeAction'
import { ROUTE_FIXED_INVEST } from '../common/route/routeName'
import Ware from './common/wave/wave'
import DialogBox from './common/alertBox/DialogBox'

const SERVER_STATUS_FOR_INVEST = 1 //是否有定投
const SERVER_STATUS_FOR_LIMIT = 1 //风险测评是否过期 1过期    0未过期
export default class AssetDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    const { fundCode, type, fundName } = props.location.query
    this.state = {
      dialogShow: 0, //是否可赎回弹框的显示与隐藏
      testShow: 0, //是否进行风险测评弹框的显示与隐藏
      riskData: null, //测评状态的数据
      fundCode: fundCode, //基金代码
      fundName: fundName, //基金名称
      type: type, //基金类型
      alertOpen: 0, //分红方式弹框的显示与隐藏
      alertTitle: '', //分红方式弹框的标题
      alertText: '--', //分红方式弹框的内容
      showShare: false, //是否显示份额
      boxShow: false, //是否过期
      model: {
        holdAccumIncome: '--', //持仓收益
        accumIncome: '--', //累计收益
        fundList: [], //持有份额
        isBuy: 0, //是否可购买
        isRedeem: 0, //是否可赎回
        isCurrency: 0, //是否为非货基
        cannotBuyReason: '', //不能购买原因
        cannotRedeemReason: '', //不能赎回的原因
        todayIncome: '--', //昨日收益
        todayIncomeDate: '--',
        worthValue: '--', //金额
        redeemHint: null,
        awaitAsset: '', //买入待确认
        orderList: [], //买入和赎回基金的列表
        bonusType: 0, //修改分红方式
        bonusTypeName: '', //修改分红方式的名称
        isBonusType: DefineVal.DividentStateFixNo, //分红方式类型
        bonusTypeList: [], //分红类型的列表
        isFixedInvest: 0, //0不可以定投 1可以定投
        showMyFixedInvest: 0, //1显示我的定投 0不显示
        fixedInvestNum: '' //定投计划数量
      }
    }
  }

  getTitle() {
    return '资产详情'
  }

  componentDidMount() {
    this.getEvaluationData()
    this.getData()
  }

  /**
   *
   * 获取测评状态的数据
   * @memberof AssetDetail
   */
  async getEvaluationData() {
    let result = await EvaluationStatusApi()
    if (checkResult(result)) {
      this.setState({ riskData: result.data })
    }
  }

  /**
   *接口数据
   *
   * @memberof AssetDetail
   */
  async getData() {
    let fundCode = this.props.location.query.fundCode
    showload(true)
    let result = await MyAssetDetailApi(fundCode)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        model: { ...this.state.model, ...result.data }
      })
    }
  }

  handleNumSign = num => {
    let sign =
      typeof num == 'string' ? num.indexOf('-') : String(num).indexOf('-')
    if (parseFloat(num) == 0) {
      return num
    } else {
      if (sign >= 0) {
        return num
      } else {
        return '+' + num
      }
    }
  }

  getColor = val => {
    if (val > 0) {
      return 'red'
    } else if (val < 0) {
      return 'green'
    } else {
      return 'grey'
    }
  }

  /**
   * 渲染持有份额
   *
   * @param {*} item
   * @param {*} k
   * @memberof AssetDetail
   */
  _renderFundItemEx = (item, k) => {
    return (
      <div className="text">
        持有份额：
        {item.currentShare} 份
      </div>
    )
  }

  /**
   * 购买记录
   *
   * @param {*} item
   * @param {*} k
   * @returns
   * @memberof AssetDetail
   */
  buying = (item, k) => {
    let { orderList } = this.state.model
    if (orderList && orderList.length - 1 == k) {
      return (
        <div key={k}>
          <p className="isPurchased">
            <span>{item.t1}</span>
            <span>{item.t2}</span>
          </p>
        </div>
      )
    } else {
      return (
        <div key={k}>
          <p className="isPurchase">
            <span>{item.t1}</span>
            <span>{item.t2}</span>
          </p>
        </div>
      )
    }
  }
  /**
   *分红方式的弹框
   *
   * @memberof AssetDetail
   */
  alertText = text => () => {
    if (typeof text == 'object') {
      this.setState({
        alertOpen: 1,
        alertText: text.text,
        alertTitle: text.title
      })
    } else {
      this.setState({
        alertOpen: 1,
        alertText: text
      })
    }
  }

  btnOnclick = clickType => () => {
    switch (clickType) {
      case 'buy':
        if (this.state.model.isBuy == 1) {
          if (this.state.riskData) {
            if (
              this.state.riskData.isEvaluation == 0 &&
              this.state.riskData.riskPopup.isPopup == 1
            ) {
              this.setState({
                testShow: 1
              })
            } else {
              if (this.state.riskData.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
                this.setState({
                  boxShow: true
                })
              } else {
                hashHistory.push({
                  pathname: ROUTE_FUND_BUY,
                  query: {
                    fundCode: this.state.fundCode
                  }
                })
              }
            }
          } else {
            toast('正在检测测评状态，稍后再试')
            this.getEvaluationData()
          }
        } else {
          toast(this.state.model.cannotBuyReason)
        }
        break
      case 'redeem':
        if (this.state.model.isRedeem == 1) {
          if (
            this.state.model.redeemHint &&
            this.state.model.redeemHint.isPopup == 1
          ) {
            this.setState({ dialogShow: 1 })
          } else {
            hashHistory.push({
              pathname: ROUTE_FUND_REDEEM,
              query: {
                fundCode: this.state.fundCode
              }
            })
          }
        } else {
          toast(this.state.model.cannotRedeemReason)
        }
        break
      case 'fixedInvest':
        if (this.state.model.isFixedInvest == 1) {
          if (this.state.riskData) {
            if (
              this.state.riskData.isEvaluation == 0 &&
              this.state.riskData.riskPopup.isPopup == 1
            ) {
              this.setState({
                testShow: 1
              })
            } else {
              if (this.state.riskData.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
                this.setState({
                  boxShow: true
                })
              } else {
                hashHistory.push({
                  pathname: ROUTE_FIXED_INVEST,
                  query: {
                    fundCode: this.state.fundCode
                  }
                })
              }
            }
          } else {
            toast('正在检测测评状态，稍后再试')
            this.getEvaluationData()
          }
        } else {
          toast(this.state.model.cannotBuyReason)
        }
      default:
        null
    }
  }

  /**
   * 点击分红方式
   *
   * @memberof AssetDetail
   */
  onClickDividendType = () => {
    if (this.state.model.isBonusType == DefineVal.DividentStateFixNo) {
      //不可以修改分红方式
      this.alertText('当前基金仅支持' + this.state.model.bonusTypeName)()
    } else if (this.state.model.isBonusType == DefineVal.DividentStatePauseNo) {
      this.alertText('分红方式暂不支持修改')()
    } else if (this.state.model.isBonusType == DefineVal.DividendStateFixing) {
      this.alertText('分红方式修改中')()
    } else {
      //修改分红方式
      hashHistory.push({
        pathname: ROUTE_DIVIDEND_SELECT,
        query: {
          fundCode: this.state.fundCode,
          bonusType: this.state.model.bonusType
        },
        state: {
          bonusTypeList: this.state.model.bonusTypeList
        }
      })
    }
  }

  /**
   * 渲染基金业绩徘徊
   *
   * @memberof AssetDetail
   */
  renderFundRank = index => {}

  // 点击收益明细
  profit = () => {
    hashHistory.push({
      pathname: ROUTE_PROFIT_DETAIL,
      query: {
        fundCode: this.state.fundCode
      }
    })
  }

  /**
   * 交易记录
   *
   * @memberof AssetDetail
   */
  onClickIncomeRecord = () => {
    hashHistory.push({
      pathname: ROUTE_FUND_TRADE_RECORD,
      query: {
        fundCode: this.state.fundCode
      }
    })
  }

  /**
   * 点击详情
   *
   * @memberof AssetDetail
   */
  onClickRightTitle = () => {
    hashHistory.push({
      pathname: ROUTE_FUND_DETAIL,
      query: {
        fundCode: this.state.fundCode,
        fundType: this.state.model.isCurrency
      }
    })
  }

  /**
   * 点击份额
   *
   * @memberof AssetDetail
   */
  onClickShare = () => {
    this.setState({ showShare: !this.state.showShare })
  }
  /**
   *我的定投
   *
   * @memberof AssetDetail
   */
  clickInvestFixed = () => {
    routePush(ROUTE_ALL_INVEST_LIST, { fundCode: this.state.fundCode })
  }

  render() {
    let {
      fundList,
      worthValue,
      accumIncome,
      todayIncome,
      todayIncomeDate,
      redeemHint,
      bonusTypeName,
      awaitAsset,
      orderList,
      holdAccumIncome,
      isFixedInvest,
      showMyFixedInvest,
      fixedInvestNum,
      isInvest
    } = this.state.model

    let { fundName, fundCode, showShare } = this.state
    return (
      <div className="assetDetail-main">
        <BackSubTitle
          titleName={fundName}
          subTitle={fundCode}
          hasPostion={true}
          rightTitle="详情"
          rightBack={this.onClickRightTitle}
          style={{ background: 'linear-gradient(to right, #294ab4, #659eff)' }}
          childStyle={{ color: '#FFFFFF' }}
        />
        <EvaluatingCard
          isShow={this.state.testShow}
          data={this.state.riskData}
          hideCard={() => {
            this.setState({ testShow: 0 })
          }}
        />
        <Dialog
          isShow={this.state.dialogShow}
          text={redeemHint ? redeemHint.content : '内容'}
          title={redeemHint ? redeemHint.title : '提示'}
          canceltext={'我再想想'}
          btntext={'坚持赎回'}
          hide={() => {
            this.setState({ dialogShow: 0 })
          }}
          next={() => {
            hashHistory.push({
              pathname: ROUTE_FUND_REDEEM,
              query: {
                fundCode: this.state.fundCode
              }
            })
          }}
        />
        <DialogBox
          isShow={this.state.boxShow}
          text={
            '您的风险测评等级已过期。根据相关规定，您需要重新风险测评才可继续进行基金交易。'
          }
          title={'温馨提示'}
          cancelText={'暂不测评'}
          confirmText={'去测评'}
          cancelCallBack={() => {
            this.setState({ boxShow: false })
          }}
          confirmCallBack={() => {
            routePush(ROUTE_TEST)
          }}
        />
        <div className="bigBox">
          <Ware style={{ height: '185px', top: '21px' }} />
          <div className="top-content">
            <p className="title-text">金额(元)</p>
            <p className="toasset-num">{worthValue}</p>
            {awaitAsset ? (
              <p className="purchase">
                买入待确认
                {awaitAsset}元
              </p>
            ) : (
              ''
            )}
            <div className="count-num">
              <div className="li">
                <div className="text">累计收益(元)</div>
                <div className="num">
                  {accumIncome && this.handleNumSign(accumIncome)}
                </div>
              </div>
              <div className="divider-line-div">
                <p className="line1" />
              </div>
              <div className="li">
                <div className="text">持仓收益(元)</div>
                <div className="num">
                  {holdAccumIncome && this.handleNumSign(holdAccumIncome)}
                </div>
              </div>
              <div className="divider-line-div">
                <p className="line1" />
              </div>
              <div className="li">
                <div className="text">昨日收益(元)</div>
                <div className="num">
                  {todayIncome && this.handleNumSign(todayIncome)}
                </div>
              </div>
            </div>
            <div className="holdControl" onClick={this.onClickShare}>
              <img
                className="img"
                src={
                  showShare
                    ? require('../asset/up.png')
                    : require('../asset/down.png')
                }
              />

              {showShare ? (
                <img
                  className="img"
                  src={require('../asset/arrow-up_black.png')}
                />
              ) : (
                <div className="img" />
              )}
            </div>
          </div>
        </div>

        {showShare ? (
          <div className="hold" onClick={this.onClickShare}>
            {fundList.map(this._renderFundItemEx.bind(this))}
          </div>
        ) : null}
        <div className="line10" />
        <div className="middle">
          <div className="btn2" onClick={this.profit}>
            <img className="img" src={require('../asset/ic_income.png')} />
            <p className="text">收益明细</p>
          </div>
          <div className="divider-line-div" />
          <div className="btn2" onClick={this.onClickIncomeRecord}>
            <img className="img" src={require('../asset/ic_record.png')} />
            <p className="text">交易记录</p>
          </div>

          {showMyFixedInvest == SERVER_STATUS_FOR_INVEST ? (
            <div className="lineBox">
              <div className="divider-line-div" />
              <div className="btn2" onClick={this.clickInvestFixed}>
                <img className="img" src={require('../asset/invest.png')} />
                <p className="text">我的定投({fixedInvestNum})</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="list">
          <div className="isShowed">{orderList.map(this.buying)}</div>
        </div>
        <div className="dividend">
          <p className="left">分红方式</p>
          <div className="right" onClick={this.onClickDividendType}>
            <img className="img" src={require('../asset/small_right.png')} />
            <p className="text">
              {this.state.model.isBonusType == DefineVal.DividendStateFixing
                ? '修改中(' + bonusTypeName + ')'
                : bonusTypeName}
            </p>
          </div>
        </div>
        <Copyright className={'mt50 mb40'} />
        <div
          style={{
            width: '100%',
            height: '50px'
          }}
          style={isIphoneX() ? { height: '84px' } : { height: '50px' }}
        />
        <div
          className="bottomBtn"
          style={
            isIphoneX()
              ? { borderBottom: '34px solid #EFEFF4', height: '84px' }
              : { height: '50px' }
          }
        >
          <div className="redeem-btn" onClick={this.btnOnclick('redeem')}>
            赎回
          </div>
          {isFixedInvest == SERVER_STATUS_FOR_INVEST ? (
            <div
              className="invest-btn"
              onClick={this.btnOnclick('fixedInvest')}
            >
              定投
            </div>
          ) : null}

          <div className="output-btn" onClick={this.btnOnclick('buy')}>
            追加投入
          </div>
        </div>
        <AlertBox
          isOpen={this.state.alertOpen}
          title={this.state.alertTitle}
          text={this.state.alertText}
          hide={() => {
            this.setState({ alertOpen: 0 })
          }}
        />
      </div>
    )
  }
}
