/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-26 18:42:09
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 17:00:18
 * @Note 单只基金交易记录
 */

import React from 'react'
import { hashHistory } from 'react-router'
import ajax from '../common/api'
import '../sass/fundtradeRecord.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import { checkResult, FundDealRecordApi } from '../common/api/api'
import {
  ROUTE_BUY_DETAIL,
  ROUTE_SELL_DETAIL,
  ROUTE_DIVIDEND_DETAIL
} from '../common/route/routeName'
export default class FundtradeRecord extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.fundCode = this.getParam('fundCode')
    this.limit = 10
    this.state = {
      fundCode: '', //基金代码
      fundName: '', //基金名称
      recordList: [], //就能列表
      lastId: '', //最后一条的id
      moreText: '加载更多' //加载更多
    }
  }

  /**
   * 获取标题信息
   *
   */
  getTitle() {
    return '交易记录'
  }

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取后端数据
   *
   */
  getData() {
    this.FundDealRecordData()
  }
  /**
   * 单只基金交易记录
   *
   * @memberof FundtradeRecord
   */
  async FundDealRecordData() {
    showload(true)
    let result = await FundDealRecordApi(
      this.fundCode,
      this.state.lastId,
      this.limit
    )
    showload(false)
    if (checkResult(result)) {
      this.setState({
        ...result.data,
        lastId:
          result.data.recordList.length > 0 &&
          result.data.recordList[result.data.recordList.length - 1]
            .totalOrderId,
        moreText:
          result.data.recordList.length < this.limit ? '没有更多了' : '加载更多'
      })
    }
  }
  /**
   * 加载更多
   *
   * @memberof TradeRecord
   */
  loadMore = () => {
    if (this.state.moreText == '没有更多了') {
      return
    }
    this.FundDealRecordDataMore()
  }

  /**
   * 加载更多的数据
   *
   * @memberof FundtradeRecord
   */
  async FundDealRecordDataMore() {
    showload(true)
    let result = await FundDealRecordApi(
      this.fundCode,
      this.state.lastId,
      this.limit
    )
    showload(false)
    if (result.data.recordList.length > 0) {
      if (result.data.recordList.length < this.limit) {
        this.setState({
          moreText: '没有更多了',
          limit: this.limit,
          lastId:
            result.data.recordList.length > 0 &&
            result.data.recordList[result.data.recordList.length - 1]
              .totalOrderId
        })
      } else {
        this.setState({
          moreText: '加载更多',
          limit: this.limit,
          lastId:
            result.data.recordList.length > 0 &&
            result.data.recordList[result.data.recordList.length - 1]
              .totalOrderId
        })
      }
      let selfState = {}
      selfState.recordList = this.state.recordList.concat(
        result.data.recordList
      )
      this.setState(selfState)
    } else {
      this.setState({
        moreText: '没有更多了'
      })
    }
  }

  onClickItem = item => () => {
    let parm = {
      pathname: '',
      query: {}
    }
    // 1：申购 2：赎回 4：分红
    switch (item.orderType - 0) {
      case 1:
        parm.pathname = ROUTE_BUY_DETAIL
        parm.query['orderId'] = item.totalId
        break
      case 2:
        parm.pathname = ROUTE_SELL_DETAIL
        parm.query['orderId'] = item.totalId
        break
      case 4:
        parm.pathname = ROUTE_DIVIDEND_DETAIL
        parm.query['bonusId'] = item.totalId
        break
      case 3:
        parm.pathname = ROUTE_BUY_DETAIL
        parm.query['orderId'] = item.totalId
      default:
        null
    }

    hashHistory.push(parm)
  }

  renderItem = (item, index) => {
    return (
      <div key={index}>
        <div className="item-detail" onClick={this.onClickItem(item)}>
          <div className="left-layout">
            <div
              className={`fund-name ${
                item.orderStatus == 0 ? 'fail-color' : ''
              }`}
            >
              {item.statusName}
            </div>
            <div className="date-txt">{item.date}</div>
          </div>
          <div className="value-name">
            {item.balance}
            {item.unit}
          </div>
          <div className="img-layout">
            <img className="img" src={require('../asset/small_right.png')} />
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let { fundCode, fundName, recordList, moreText } = this.state

    return (
      <div className="fundtrade-record">
        <BackTitle titleName="交易记录" hasPostion={true} />
        <div hidden={recordList && recordList.length > 0 ? false : true}>
          {fundName ? (
            <p className="top-fundName">
              <span className="first-span">{fundName}</span>
              <span>({fundCode})</span>
            </p>
          ) : (
            ''
          )}
          <p className="thin-line" />
          {recordList && recordList.map(this.renderItem)}
          {moreText ? (
            <div className="more" onClick={this.loadMore}>
              {moreText}
            </div>
          ) : null}
        </div>

        <div
          className="no-data"
          style={{ display: recordList.length == 0 ? 'block' : 'none' }}
        >
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无数据</span>
        </div>
      </div>
    )
  }
}
