/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-10 15:46:26
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-10 10:58:16
 * @Note 组合资产详情
 */

import React from 'react'
import { hashHistory } from 'react-router'
import toApi from '../common/api'
import AlertBox from './common/alert-box'
import { toast, showload } from './common/toast'
import { EvaluatingCard } from './common/evaluatingCard.js'
import Copyright from './common/copyright'
import { Dialog } from './common/dialog.js'
import { setToken, changeTitle, isIphoneX } from '../common/setToken'
import '../sass/groupAssetDetail.scss'
import { BackTitle, BackSubTitle } from './common/baseTitle'
import BaseComponent from './baseComponent'
import { routePush } from '../common/route/routeAction'
import {
  ROUTE_TRADE_RECORD_NEW,
  ROUTE_GROUP_TRADE_RECORD,
  ROUTE_TEST
} from '../common/route/routeName'
import {
  GroupAssetDetailApi,
  checkResult,
  EvaluationStatusApi,
  CheckGroupCanBuyOrRedeemApi
} from '../common/api/api'
import Ware from './common/wave/wave'
import DialogBox from './common/alertBox/DialogBox'

const SERVER_STATUS_FOR_LIMIT = 1 //风险测评是否过期 1过期 0未过期

export default class GroupAssetDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    const { fundGroupId, groupShareId, groupName } = this.props.location.query

    this.state = {
      dialogShow: 0,
      testShow: 0,
      riskData: null,
      fundGroupId: fundGroupId,
      groupShareId: groupShareId,
      groupName: groupName,
      alertOpen: 0,
      alertTitle: '',
      alertText: '--',
      boxShow: false, //风险测评是否过期
      model: {
        accumIncome: '--', //累计收益
        fundList: [],
        orderList: [],
        isBuy: 1,
        isRedeem: 1,
        cannotBuyReason: '',
        cannotRedeemReason: '',
        todayIncome: '--', //昨日收益
        todayIncomeDate: '--',
        totalAsset: '--', //总市值（元）
        redeemHint: null,
        holdProfit: '--', //持仓收益
        fundGroupCode: ''
        // canBuy: 0, //是否可申购 1是可以 0是不可以
        // noBuyReason: 0, //不可申购的原因 1可以 0不可以
        // canRedeem: '', //是否可赎回
        // noRedeemReason: '' //不可赎回的原因
      }
    }

    this.setTitle(groupName)
  }

  getTitle() {
    return '资产详情'
  }

  componentWillUnmount() {
    this.setBackGroundColor('#fff')
  }

  componentDidMount() {
    this._evaluationStatus()
    this.getData()
  }

  /**
   * 获取数据
   *
   * @memberof GroupAssetDetail
   */
  async getData() {
    showload(true)
    let result = await GroupAssetDetailApi(this.state.fundGroupId)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        model: { ...this.state.model, ...result.data, ...result.data.total }
      })
    }
  }

  /**
   * 测评状态
   *
   * @memberof GroupAssetDetail
   */
  _evaluationStatus = async () => {
    let result = await EvaluationStatusApi()
    if (checkResult(result, false)) {
      this.setState({ riskData: result.data })
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

  _renderFundItem(item, k) {
    return (
      <div
        key={k}
        className="my-count-li"
        onClick={() => {
          item.hasDetail === 1 &&
            hashHistory.push({
              pathname: `/count-detail?fundCode=${item.code}`
            })
        }}
      >
        <div className="count-line">
          <div className="l1">
            <p className="left">
              <span>{item.fundName}</span>({item.fundCode})
            </p>
          </div>
          <div className="l2">
            <div className="li">
              <span>金额(元)</span>
              <em>{item.shareAsset}</em>
            </div>
            <div className="li li-right">
              <span>累计收益(元)</span>
              <em className={this.getColor(item.accumIncome)}>
                {this.handleNumSign(item.accumIncome)}
              </em>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

  /**
   * 收益明细
   *
   * @memberof GroupAssetDetail
   */
  profit = () => {
    routePush('/profitDetail', {
      fundCode: this.state.fundGroupId,
      fundType: 1
    })
  }

  /**
   * 交易记录
   *
   * @memberof AssetDetail
   */
  onClickIncomeRecord = () => {
    routePush(ROUTE_GROUP_TRADE_RECORD, {
      groupId: this.state.fundGroupId,
      fundGroupCode: this.state.model.fundGroupCode
    })
  }

  /**
   * 赎回
   *
   * @memberof GroupAssetDetail
   */
  onClickRedeem = async () => {
    showload(true)
    let result = await CheckGroupCanBuyOrRedeemApi(this.state.fundGroupId)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (Number(data.canRedeem)) {
        if (
          this.state.model.redeemHint &&
          this.state.model.redeemHint.isPopup == 1
        ) {
          this.setState({ dialogShow: 1 })
        } else {
          routePush('/groupRedeem', {
            fundGroupId: this.state.fundGroupId,
            fundGroupCode: this.state.model.fundGroupCode,
            groupName: this.state.groupName
          })
        }
      } else {
        toast(data.cannotRedeemReason)
      }
    }
  }

  /**
   * 申购
   *
   * @memberof GroupAssetDetail
   */
  onClickBuy = async () => {
    showload(true)
    let result = await CheckGroupCanBuyOrRedeemApi(this.state.fundGroupId)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (Number(data.canBuy)) {
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
              routePush('/groupBuy', {
                groupId: this.state.fundGroupId,
                fundGroupCode: this.state.model.fundGroupCode
              })
            }
          }
        } else {
          toast('正在检测测评状态，稍后再试')
          this._evaluationStatus()
        }
      } else {
        toast(data.cannotBuyReason)
      }
    }
  }

  /**
   * 点击详情
   *
   * @memberof AssetDetail
   */
  onClickRightTitle = () => {
    hashHistory.push({
      pathname: '/groupInfo',
      query: {
        fundGroupId: this.state.fundGroupId
      }
    })
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
  render() {
    let {
      fundList,
      accumIncome,
      todayIncome,
      todayIncomeDate,
      redeemHint,
      orderList,
      holdProfit,
      totalAsset
    } = this.state.model
    return (
      <div className="groupAssetDetail-main">
        <BackSubTitle
          titleName={this.state.groupName}
          // subTitle={fundCode}
          style={{ background: 'linear-gradient(to right, #294ab4, #659eff)' }}
          childStyle={{ color: '#FFFFFF' }}
          hasPostion={true}
          rightTitle="详情"
          rightBack={this.onClickRightTitle}
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
            routePush('/groupRedeem', {
              fundGroupId: this.state.fundGroupId,
              fundGroupCode: this.state.model.fundGroupCode,
              groupName: this.state.groupName
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
        <div className="top-content">
          <p className="title-text">金额(元)</p>
          <p className="toasset-num">{totalAsset}</p>
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
                {holdProfit && this.handleNumSign(holdProfit)}
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

          <Ware />
        </div>
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
        </div>

        <div className="list">
          {orderList && orderList.length > 0 ? (
            <div className="isShowed">{orderList.map(this.buying)}</div>
          ) : null}
          <div className="line10" />
          <p className="top-title borderBottom">资产成分</p>
          {fundList.map(this._renderFundItem.bind(this))}
        </div>
        <Copyright className={'mt50 mb40'} />
        <div
          style={{ width: '100%', height: '50px' }}
          style={isIphoneX() ? { height: '84px' } : { height: '50px' }}
        />
        <div
          className="input-output-container-sp"
          style={
            isIphoneX()
              ? {
                  borderBottom: '34px solid #EFEFF4',
                  height: '84px',
                  borderTop: '1px solid #EFEFF4'
                }
              : { height: '50px', borderTop: '1px solid #EFEFF4' }
          }
        >
          <div
            className="input-btn"
            style={{ width: '25%', height: '50px', lineHeight: '50px' }}
            onClick={this.onClickRedeem}
          >
            赎回
          </div>
          <div
            className="output-btn"
            style={{
              width: '75%',
              fontSize: '17px',
              height: '50px',
              lineHeight: '50px'
            }}
            onClick={this.onClickBuy}
          >
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
