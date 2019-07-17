/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-09 15:49:07
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-03 17:58:26
 * @Note 组合资产详情
 */

import React from 'react'
import { hashHistory } from 'react-router'
import { loadAppStorage, updateAppStorage } from '../common/storage'
import Copyright from './common/copyright'
import { showload } from './common/toast'
import AlertBox from './common/alert-box'
import '../sass/groupAsset.scss'
import { BackTitle } from './common/baseTitle'
import BaseComponent from './baseComponent'
import { routePush } from '../common/route/routeAction'
import {
  ROUTE_GROUP_BUY_DETAIL,
  ROUTE_GROUP_ASSET_DETAIL,
  ROUTE_TRADE_RECORD_NEW
} from '../common/route/routeName'
import { GroupAssetInfoApi, checkResult } from '../common/api/api'
import {
  TRADE_TYPE_GROUP,
  TRADETYPE_DOING
} from './tradeRecordNew/tradeRecordNew'
import Ware from './common/wave/wave'
import { Line } from './common/Line'

export default class GroupAsset extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let _model = {
      isButtonType: 0,
      accumIncome: '--', //累计收益
      incomeDate: '--',
      todayIncome: '--', //昨日收益
      underwayOrderNum: 0, //有几笔在途的
      totalAsset: '--', //总市值
      holdProfit: '--', //持仓收益
      groupList: [],
      incomeExplain: {}
    }
    let _localData = loadAppStorage('myAsset')
    if (_localData) _model = _localData

    this.state = {
      isLogin: 1,
      alertOpen: 0,
      alertTitle: '--',
      alertText: '--',
      from: this.getParam('from'),
      model: _model
    }
  }

  getTitle() {
    return '我的基金组合'
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  componentDidMount() {
    this.getServerData()
  }

  /**
   * 获取数据
   *
   * @memberof GroupAsset
   */
  getServerData = async () => {
    showload(true)
    let result = await GroupAssetInfoApi()
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      this.setState({
        model: { ...this.state.model, ...data, ...data.total }
      })
      updateAppStorage('myAsset', data)
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

  _onFundGroup = item => () => {
    routePush(ROUTE_GROUP_ASSET_DETAIL, {
      fundGroupId: item.fundGroupId,
      groupShareId: item.groupShareId,
      groupName: item.fundGroupName
    })
  }

  /**
   * 渲染组合列表
   *
   * @param {*} item
   * @param {*} index
   * @returns
   * @memberof GroupAsset
   */
  renderGroupItem(item, index) {
    return (
      <div key={index}>
        <div className={'group-div'} onClick={this._onFundGroup(item)}>
          <p className="text">{item.fundGroupName}</p>
          <div className="group-name">
            <p className="p">
              <span className="label-text">金额：</span>
              <span className="asset-text">{item.totalAsset}元</span>
            </p>
            <p className="p">
              <span className="label-text">昨日收益：</span>
              <span
                className={
                  'profit-text ' +
                  (parseFloat(item.todayIncome) > 0
                    ? ' red'
                    : parseFloat(item.todayIncome) < 0
                    ? 'green'
                    : ' gray')
                }
              >
                {this.handleNumSign(item.todayIncome)}元
              </span>
            </p>
          </div>
        </div>
        <Line />
      </div>
    )
  }

  alertText = (text, dayFaqTitle) => () => {
    this.setState({
      alertOpen: 1,
      alertText: text,
      alertTitle: dayFaqTitle
    })
  }

  /**
   * 响应交易确认
   *
   * @memberof MyAsset
   */
  onClickConfirmTrade = () => {
    //跳转交易记录页面
    routePush('/tradeRecord', {
      tradeType: TRADE_TYPE_GROUP,
      tabIndex: TRADETYPE_DOING
    })
  }

  render() {
    //显示按钮类型：0.不显示 1.绑卡按钮 2.投资按钮 3.测评按钮
    let { isLogin, from } = this.state
    let {
      todayIncome,
      incomeDate,
      totalAsset,
      groupList,
      isButtonType,
      incomeExplain,
      underwayOrderNum,
      accumIncome,
      holdProfit
    } = this.state.model

    return (
      <div className="groupAsset-main">
        <BackTitle
          titleName={'组合持仓'}
          hasPostion={true}
          from={from}
          style={{ background: 'linear-gradient(to right, #294ab4, #659eff)' }}
          childStyle={{ color: '#FFFFFF' }}
        />

        <div className="count-title">
          <div className="top" />
          <div
            style={{
              display: isButtonType == 0 || isButtonType == 2 ? 'block' : 'none'
            }}
          >
            <div className="title-text">总金额(元)</div>
            <div className="money-profit">
              <span className="num">
                {isButtonType == 2 ? '--' : totalAsset}
              </span>
            </div>
            <div className="count-bottom">
              <div className="li">
                <div className="text">累计收益(元)</div>
                <div className="num">
                  {isButtonType == 2
                    ? '--'
                    : accumIncome && this.handleNumSign(accumIncome)}
                </div>
              </div>
              <div className="divider-line-div">
                <div className="divider-line" />
              </div>
              <div className="li">
                <div className="text">持仓收益(元)</div>
                <div className="num">
                  {isButtonType == 2
                    ? '--'
                    : holdProfit && this.handleNumSign(holdProfit)}
                </div>
              </div>
              <div className="divider-line-div">
                <div className="divider-line" />
              </div>
              <div className="li">
                <div className="text">昨日收益(元)</div>
                <div className="num">
                  {isButtonType == 2
                    ? '--'
                    : todayIncome && this.handleNumSign(todayIncome)}
                </div>
              </div>
            </div>
          </div>

          <Ware />
        </div>
        <div className="line10" />

        {//判断是否需要显示正在确认的交易
        underwayOrderNum > 0 ? (
          <div className="under-way" onClick={this.onClickConfirmTrade}>
            <img className="oval" src={require('../asset/oval-fund.png')} />
            <p className="text">
              {'有' + underwayOrderNum + '笔交易正在确认中'}
            </p>
            <img className="img" src={require('../asset/small_right.png')} />
          </div>
        ) : (
          <div />
        )}

        {groupList.map(this.renderGroupItem.bind(this))}
        {groupList && groupList.length == 0 ? (
          <div className="no-data">
            <img src={require('../asset/income-details-bg.png')} />
            <span>这里空空如也</span>
          </div>
        ) : null}
        <Copyright className={'mt50 mb40'} />
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
