/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-15 15:46:39
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-18 10:22:04
 * @Note 我的持仓
 */

import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import { loadAppStorage, updateAppStorage } from '../common/storage'
import Copyright from './common/copyright'
import { toast, showload } from './common/toast'
import toApi from '../common/api'
import AlertBox from './common/alert-box'
import '../sass/myAsset.scss'
import BaseComponent from './baseComponent'
import { checkResult, MyAssetApi } from '../common/api/api'
import {
  ROUTE_ASSET_DETAIL,
  ROUTE_TRADE_RECORD,
  ROUTE_HISTORY_HOLDING
} from '../common/route/routeName'
import { TRADETYPE_DOING } from './tradeRecordNew/tradeRecordNew'
import Ware from './common/wave/wave'

export default class MyAsset extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let _model = {
      isButtonType: 0, //
      accumIncome: '--', //累计收益
      incomeDate: '--',
      todayIncome: '--', //昨日收益
      totalAsset: '--', //总金额
      assetList: [], //基金列表
      // incomeExplain: {},
      underwayOrderNum: 0, //正在确认的订单
      holdAccumIncome: '--' //持仓收益
    }
    let _localData = loadAppStorage('myAsset')
    if (_localData) _model = _localData

    this.state = {
      isLogin: 1, //显示按钮类型：0.不显示 1.绑卡按钮 2.投资按钮 3.测评按钮
      // alertOpen: 0,
      // alertTitle: '--',
      // alertText: '--',
      model: _model
    }
  }

  getTitle() {
    return '我的基金'
  }

  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  componentDidMount() {
    this.MyAssetData()
  }

  async MyAssetData() {
    showload(true)
    let result = await MyAssetApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({
        model: { ...this.state.model, ...result.data }
      })
      updateAppStorage('myAsset', result.data)
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
    if (item.type == '1') {
      //大组合
      hashHistory.push({
        pathname: ROUTE_ASSET_DETAIL,
        query: {
          fundCode: item.fundCode,
          fundName: item.productName,
          type: item.type
        }
      })
    } else if (item.type == '-1') {
      //慧牛宝
      // hashHistory.push(`/bao-detail?groupId=${item.groupId}&type=${item.type}`)
      hashHistory.push({
        pathname: ROUTE_ASSET_DETAIL,
        query: {
          groupId: item.groupId,
          type: item.type
        }
      })
    } else {
      //其他类型
    }
  }

  _renderGroupItem(item, index) {
    switch (item.type) {
      default:
        return (
          <div key={index}>
            <div className={'group-div'} onClick={this._onFundGroup(item)}>
              <p className="text">{item.productName}</p>
              <div className="group-name">
                <p className="p">
                  <span className="label-text">金额：</span>
                  <span className="asset-text">{item.worthValue}元</span>
                </p>
                <p className="p">
                  <span className="label-text">昨日收益：</span>
                  <span
                    className={
                      'profit-text ' +
                      (parseFloat(item.todayIncome) > 0
                        ? ' red'
                        : parseFloat(item.todayIncome) < 0
                        ? ' green'
                        : 'gray')
                    }
                  >
                    {this.handleNumSign(item.todayIncome)}元
                  </span>
                </p>
              </div>
            </div>
            <p className="thin-line" />
          </div>
        )
        break
    }
  }

  // alertText = (text, dayFaqTitle) => () => {
  //   this.setState({
  //     alertOpen: 1,
  //     alertText: text,
  //     alertTitle: dayFaqTitle
  //   })
  // }

  /**
   * 响应交易确认
   *
   * @memberof MyAsset
   */
  onClickConfirmTrade = () => {
    //跳转交易记录页面
    hashHistory.push({
      pathname: ROUTE_TRADE_RECORD,
      query: { tabIndex: TRADETYPE_DOING }
    })
  }

  /**
   *
   *点击历史持仓
   * @memberof MyAsset
   */
  clickHistorical = () => {
    hashHistory.push({
      pathname: ROUTE_HISTORY_HOLDING
    })
  }

  render() {
    //显示按钮类型：0.不显示 1.绑卡按钮 2.投资按钮 3.测评按钮
    let { isLogin } = this.state
    let {
      todayIncome,
      incomeDate,
      accumIncome,
      totalAsset,
      assetList,
      isButtonType,
      incomeExplain,
      underwayOrderNum,
      historyShareNum,
      holdAccumIncome
    } = this.state.model
    return (
      <div className="myAsset-main">
        <BackTitle
          titleName="基金持仓"
          hasPostion={true}
          from={this.props.location.query.from}
          style={{ background: 'linear-gradient(to right, #294ab4, #659eff)' }}
          childStyle={{ color: '#FFFFFF' }}
        />
        <div className="count-title">
          <div className="tops" />
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
                    : holdAccumIncome && this.handleNumSign(holdAccumIncome)}
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
          <div className="top" onClick={this.onClickConfirmTrade}>
            <img className="oval" src={require('../asset/oval-fund.png')} />
            <p className="text">
              {'有' + underwayOrderNum + '笔交易正在确认中'}
            </p>
            <img className="img" src={require('../asset/small_right.png')} />
          </div>
        ) : (
          <div />
        )}
        {/**        <div className="line10" />
         */}
        {assetList.map(this._renderGroupItem.bind(this))}
        {assetList && assetList.length == 0 ? (
          <div className="no-data">
            <img src={require('../asset/income-details-bg.png')} />
            <span>暂无数据</span>
          </div>
        ) : (
          <div>
            <p className="historical-holding" onClick={this.clickHistorical}>
              <span>历史持仓</span>
              <img
                className="arrowRight"
                src={require('../asset/small_right.png')}
              />
            </p>
            <Copyright className={'mt50 mb40'} />
          </div>
        )}
        {/** <AlertBox
          isOpen={this.state.alertOpen}
          title={this.state.alertTitle}
          text={this.state.alertText}
          hide={() => {
            this.setState({ alertOpen: 0 })
          }}
        />*/}
      </div>
    )
  }
}
