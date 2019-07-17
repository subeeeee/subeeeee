/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-26 18:42:09
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-11 14:48:38
 * @Note 单只基金交易记录
 */

import React from 'react'
import { BackTitle } from '../common/baseTitle'
import { showload } from '../common/toast'
import './groupTradeRecord.scss'
import BaseComponent from '../baseComponent'
import {
  FundDealRecordApi,
  checkResult,
  FundDealRecordGroupApi,
  GetGroupOrderListApi
} from '../../common/api/api'
import {
  ROUTE_GROUP_BUY_DETAIL,
  ROUTE_GROUP_REDEEM_DETAIL
} from '../../common/route/routeName'
import { routePush } from '../../common/route/routeAction'

// 服务器单只基金类型
const SERVER_TYPE_BUY = 1 //申购
const SERVER_TYPE_REDEEM = 2 //赎回
const SERVER_TYPE_ORDER = 3 //定投
const SERVER_TYPE_BONUS = 4 //分红
const SERVER_TYPE_ALL = 0 //全部
const SERVER_TYPE_DOING = -1 //进行中

export default class GroupTradeRecord extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.groupId = this.getParam('groupId')
    this.fundGroupCode = this.getParam('fundGroupCode')

    this.state = {
      fundCode: this.fundGroupCode,
      fundName: '',
      list: [
        // {
        //   tradeId:'',//订单id
        //   productName:'',//产品名称
        //   assetVal:'',//操作资产
        //   assetText:'',//操作资产描述
        //   unit:'',//单位
        //   orderStatus:'',// 订单状态
        //   orderStatusText:'',//订单状态名
        //   orderType:'',//订单类型
        //   productType:'',//产品类型 1基金 2组合
        //   tradeTime:'',//下单时间
        // }
      ],
      lastId: '',
      limit: 10,
      moreText: '加载更多',
      residueCount: null //剩余条数
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
  async getData() {
    showload(true)

    let result = await GetGroupOrderListApi(
      this.state.lastId,
      this.state.limit,
      '',
      this.fundGroupCode
    )

    showload(false)
    if (checkResult(result)) {
      let fundName = result.data.fundGroupName

      let list = result.data.list

      let lastId = list.length > 0 && list[list.length - 1].totalOrderId
      this.setState({
        list: list,
        fundName: fundName,
        lastId: lastId,
        moreText:
          parseInt(result.data.residueCount) <= 0 ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   * 加载更多
   *
   * @memberof FundtradeRecord
   */
  loadMore = async () => {
    if (this.state.moreText == '没有更多了') {
      return
    }
    showload(true)
    let result = await GetGroupOrderListApi(
      this.state.lastId,
      this.state.limit,
      '',
      this.fundGroupCode
    )

    showload(false)
    if (parseInt(result.data.residueCount) <= 0) {
      this.setState({
        moreText: '没有更多了',
        limit: this.state.limit,
        lastId:
          result.data.list.length > 0 &&
          result.data.list[result.data.list.length - 1].totalOrderId
      })
    } else {
      this.setState({
        moreText: '加载更多',
        limit: this.state.limit,
        lastId:
          result.data.list.length > 0 &&
          result.data.list[result.data.list.length - 1].totalOrderId
      })
    }
    let selfState = {}
    selfState.list = this.state.list.concat(result.data.list)
    this.setState(selfState)
  }

  /**
   * 点击记录
   *
   * @memberof FundtradeRecord
   */
  onClickItem = item => () => {
    // 1：申购 2：赎回 4：分红
    switch (item.orderType - 0) {
      case 1:
        routePush(ROUTE_GROUP_BUY_DETAIL, {
          orderId: item.tradeId
        })
        break
      case 2:
        routePush(ROUTE_GROUP_REDEEM_DETAIL, {
          orderId: item.tradeId
        })
        break
      case 4:
        routePush('/dividendDetail', { bonusId: item.tradeId })
        break
      default:
        break
    }
  }

  /**
   * 渲染交易记录
   *
   * @memberof FundtradeRecord
   */
  renderItem = (item, index) => {
    let {
      productName,
      assetVal,
      assetText,
      orderStatusText,
      tradeTime,
      orderStatus,
      tradeId,
      unit,
      orderType,
      totalApplyShare
    } = item
    return (
      <div key={index}>
        <div className="item-detail" onClick={this.onClickItem(item)}>
          <div className="left-layout">
            <div
              className={`fund-name ${orderStatus == 0 ? 'fail-color' : ''}`}
            >
              {item.orderStatusText}
            </div>
            <div className="date-txt">{tradeTime}</div>
          </div>
          {item.orderType == SERVER_TYPE_REDEEM ? (
            <div
              className={
                Number(orderType) == SERVER_TYPE_REDEEM
                  ? 'value-name green'
                  : 'value-name red'
              }
            >
              {assetText}
              {unit + '（' + totalApplyShare + '份）'}
            </div>
          ) : (
            <div
              className={
                Number(orderType) == SERVER_TYPE_REDEEM
                  ? 'value-name green'
                  : 'value-name red'
              }
            >
              {assetText}
              {unit}
            </div>
          )}

          <div className="img-layout">
            <img className="img" src={require('./images/small_right.png')} />
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
    let { fundCode, fundName, list, moreText } = this.state

    return (
      <div className="fundtrade-record">
        <BackTitle titleName="交易记录" hasPostion={true} />

        <div hidden={list && list.length > 0 ? false : true}>
          <p className="top-fundName">
            <span className="first-span">
              {fundName
                ? fundCode
                  ? `${fundName} (${fundCode})`
                  : `${fundName}`
                : ''}
            </span>
          </p>
          <p className="thin-line" />
          {list.map(this.renderItem)}
          {moreText ? (
            <div className="more" onClick={this.loadMore}>
              {moreText}
            </div>
          ) : null}
        </div>

        <div
          className="no-data"
          style={{ display: list.length == 0 ? 'block' : 'none' }}
        >
          <img src={require('./images/income-details-bg.png')} />
          <span>暂无数据</span>
        </div>
      </div>
    )
  }
}
