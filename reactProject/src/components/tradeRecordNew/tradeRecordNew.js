/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-10 16:10:30
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-12 14:18:20
 * @Note 交易记录
 */

import React from 'react'
import { hashHistory } from 'react-router'
import cot from 'cookie.js'
import './tradeRecord.scss'
import {
  TradeRecordBuyListApi,
  TradeRecordRedeemApi,
  TradeRecordBonusApi,
  TradeRecordDoingApi,
  checkResult,
  TradeRecordGroupBuyListApi,
  TradeRecordGroupRedeemApi,
  GetGroupOrderListApi,
  GetOrderListApi
} from '../../common/api/api'
import { showload, toast } from '../common/toast'
import { BackTitle } from '../common/baseTitle'
import { routePush } from '../../common/route/routeAction'
import { finishPage } from '../../common/setToken'
import BaseComponent from '../baseComponent'
import {
  ROUTE_GROUP_BUY_DETAIL,
  ROUTE_GROUP_REDEEM_DETAIL
} from '../../common/route/routeName'
import { ActionSheet } from 'antd-mobile'
import {
  ActionSheetCannel,
  ActionSheetClose
} from '../common/actionSheet/wxActionSheet'

export const TRADE_TYPE_FUND = 0 //基金
export const TRADE_TYPE_GROUP = 1 //组合

const TRADETYPE_BUY = 0 //申购
const TRADETYPE_REDEEM = 1 //赎回
export const TRADETYPE_DOING = 2 //进行中
const TRADETYPE_BONUS = 3 //分红
const TRADETYPE_ORDER = 4 //定投

const FUNDACTION_BUY = 1 //申购
const FUNDACTION_REDEEM = 2 //赎回

// 服务器单只基金类型
const SERVER_TYPE_BUY = 1 //申购
const SERVER_TYPE_REDEEM = 2 //赎回
const SERVER_TYPE_ORDER = 3 //定投
const SERVER_TYPE_BONUS = 4 //分红
const SERVER_TYPE_ALL = 0 //全部
const SERVER_TYPE_DOING = -1 //进行中

const DATA_LIMIT = 10 //数据长度

/**
 * 交易记录页面
 *
 * @class TradeRecord
 * @extends {React.Component}
 */
export default class TradeRecordNew extends BaseComponent {
  constructor(props) {
    super(props)

    this.setBackGroundColor('#fff')
    let tradeType = this.getParam('tradeType', TRADE_TYPE_FUND)

    let tabIndex = this.getParam('tabIndex', TRADETYPE_BUY)

    if (cot) {
      tradeType = cot.get('tradeType') ? cot.get('tradeType') : tradeType
      tabIndex = cot.get('tabIndex') ? cot.get('tabIndex') : tabIndex
    }

    this.fundTypes = ['单只基金', '组合基金']

    this.state = {
      lastId: null,
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
      ], //数据
      noMore: false, //是否没有更多
      fundType: tradeType, //基金类型
      tabType: tabIndex, //标签类型
      tabTypes: this.getTabTypes(tradeType) //标签名称
    }
  }

  getTitle() {
    return '交易记录'
  }

  /**
   * 获取类型
   *
   * @returns
   * @memberof TradeRecordNew
   */
  getTabTypes(fundType) {
    let tabs = []
    if (fundType == TRADE_TYPE_FUND) {
      //基金
      tabs = ['申购', '赎回', '进行中', '分红', '定投']
    } else {
      //组合
      tabs = ['申购', '赎回', '进行中']
    }

    return tabs
  }
  /**
   * 获取数据
   *
   * @memberof TradeRecordNew
   */
  getData() {
    this.loadData(this.state.fundType, this.state.tabType)
  }

  /**
   * 加载数据
   *
   * @param fundType 基金类型
   * @param tabType 标签类型
   * @param more 是否加载更多
   * @memberof TradeRecordNew
   */
  loadData = async (fundType, tabType, more = false) => {
    showload(true)

    let result = null

    let lastId = more ? this.state.lastId : null
    // 接口请求参数 1 基金 2组合

    if (fundType == TRADE_TYPE_FUND) {
      let serverType = SERVER_TYPE_ALL
      if (tabType == TRADETYPE_BUY) {
        serverType = SERVER_TYPE_BUY
      } else if (tabType == TRADETYPE_REDEEM) {
        serverType = SERVER_TYPE_REDEEM
      } else if (tabType == TRADETYPE_BONUS) {
        serverType = SERVER_TYPE_BONUS
      } else if (tabType == TRADETYPE_DOING) {
        serverType = SERVER_TYPE_DOING
      } else if (tabType == TRADETYPE_ORDER) {
        serverType = SERVER_TYPE_ORDER
      }
      result = await GetOrderListApi(serverType, '', lastId, DATA_LIMIT)
    } else {
      let serverType = SERVER_TYPE_ALL
      if (tabType == TRADETYPE_BUY) {
        serverType = SERVER_TYPE_BUY
      } else if (tabType == TRADETYPE_REDEEM) {
        serverType = SERVER_TYPE_REDEEM
      } else if (tabType == TRADETYPE_DOING) {
        serverType = SERVER_TYPE_DOING
      }
      result = await GetGroupOrderListApi(lastId, DATA_LIMIT, serverType, '')
    }

    showload(false)

    if (checkResult(result)) {
      let list = result.data.list
      let noMore = false //是否有更多数据

      // 判空
      list = list ? list : []

      if (!list || list.length < DATA_LIMIT) {
        noMore = true
      }

      // 如果是当前页签
      if (more) {
        let oldList = this.state.list
        list = oldList.concat(list)
      }

      // 分页最后id
      lastId = list.length > 0 ? list[list.length - 1].lastId : 0

      this.setState({
        list: list,
        lastId: lastId,
        noMore: noMore,
        fundType: fundType,
        tabType: tabType
      })
    }
  }

  /**
   * 加载更多
   *
   * @memberof TradeRecord
   */
  loadMore = () => {
    if (this.state.noMore) {
      return
    }

    this.loadData(this.state.fundType, this.state.tabType, true)
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
    ActionSheetClose()
  }

  /**
   * 保存当前标签
   *
   * @memberof TradeRecord
   */
  saveTabIndex = () => {
    if (cot) {
      cot.set('tabIndex', this.state.tabType)
      cot.set('tradeType', this.state.fundType)
    }
  }

  /**
   * 移除标签
   *
   * @memberof TradeRecordNew
   */
  removeTabIndex = () => {
    if (cot) {
      cot.remove('tabIndex')
      cot.remove('tradeType')
    }
  }

  /**
   * 渲染列表
   *
   * @memberof TradeRecord
   */
  renderGroup(list, type) {
    let newType = new Number(type)

    switch (parseInt(type)) {
      case TRADETYPE_BUY: {
        return this.renderBuyGroup(list)
      }
      case TRADETYPE_REDEEM: {
        return this.renderRedeemGroup(list)
      }
      case TRADETYPE_BONUS: {
        return this.renderBonusGroup(list)
      }
      case TRADETYPE_DOING: {
        return this.renderDoingGroup(list)
      }
      case TRADETYPE_ORDER: {
        return this.renderOrderGroup(list)
      }
      default:
        break
    }
  }

  /**
   *渲染申购列表
   *
   * @memberof TradeRecord
   */
  renderBuyGroup = list => {
    return list.map((item, index) => {
      return this.renderRecordItem(item, index)(this.onClickBuyDetail)
    })
  }

  /**
   * 点击申购详情
   *
   * @memberof TradeRecordNew
   */
  onClickBuyDetail = orderId => () => {
    this.saveTabIndex()
    routePush(
      this.state.fundType == TRADE_TYPE_FUND
        ? '/buyDetail'
        : ROUTE_GROUP_BUY_DETAIL,
      {
        orderId: orderId
      }
    )
  }

  /**
   *渲染交易记录
   *
   * @memberof TradeRecord
   */
  renderRecordItem = (item, index) => clickCallBack => {
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
        <div
          className="new-detail-item"
          key={index}
          onClick={clickCallBack(tradeId)}
        >
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            {this.state.fundType == TRADE_TYPE_GROUP &&
            orderType == SERVER_TYPE_REDEEM ? (
              <div
                className={
                  Number(orderType) == SERVER_TYPE_REDEEM
                    ? 'num green'
                    : 'num red'
                }
              >
                {assetText}
                <span className="rmb">
                  {unit + '（' + totalApplyShare + '份）'}
                </span>
              </div>
            ) : (
              <div
                className={
                  Number(orderType) == SERVER_TYPE_REDEEM
                    ? 'num green'
                    : 'num red'
                }
              >
                {assetText}
                <span className="rmb">{unit}</span>
              </div>
            )}
          </div>
          <div className="row-layout mt4">
            <div
              className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}
            >
              {orderStatusText}
            </div>
            <div className="small-txt">{tradeTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   * 渲染赎回列表
   *
   * @memberof TradeRecord
   */
  renderRedeemGroup = list => {
    return list.map((item, index) => {
      return this.renderRecordItem(item, index)(this.onClickRedeemDetail)
    })
  }

  /**
   * 点击赎回详情
   *
   * @memberof TradeRecordNew
   */
  onClickRedeemDetail = orderId => () => {
    this.saveTabIndex()
    routePush(
      this.state.fundType == TRADE_TYPE_FUND
        ? '/sellDetail'
        : ROUTE_GROUP_REDEEM_DETAIL,
      {
        orderId: orderId
      }
    )
  }

  /**
   * 点击分红详情
   *
   * @memberof TradeRecordNew
   */
  onClickBonusDetail = bonusId => () => {
    this.saveTabIndex()
    routePush('/dividendDetail', { bonusId: bonusId })
  }

  /**
   * 点击定投详情
   *
   * @memberof TradeRecordNew
   */
  onClickOrderDetail = tradeId => () => {
    this.saveTabIndex()
    routePush('/buyDetail', { orderId: tradeId })
  }

  /**
   *渲染分红列表
   *
   * @memberof TradeRecord
   */
  renderBonusGroup = list => {
    return list.map((item, index) => {
      return this.renderRecordItem(item, index)(this.onClickBonusDetail)
    })
  }

  /**
   *渲染进行中列表
   *
   * @memberof TradeRecord
   */
  renderDoingGroup = list => {
    return list.map((item, index) => {
      if (item.orderType == SERVER_TYPE_BUY) {
        //申购进行中
        return this.renderRecordItem(item, index)(this.onClickBuyDetail)
      } else if (item.orderType == SERVER_TYPE_REDEEM) {
        //赎回进行中
        return this.renderRecordItem(item, index)(this.onClickRedeemDetail)
      } else if (item.orderType == SERVER_TYPE_ORDER) {
        //定投进行中
        return this.renderRecordItem(item, index)(this.onClickOrderDetail)
      }
    })
  }

  /**
   *渲染定投列表
   *
   * @memberof TradeRecord
   */
  renderOrderGroup = list => {
    return list.map((item, index) => {
      return this.renderRecordItem(item, index)(this.onClickOrderDetail)
    })
  }

  /**
   * 渲染标签
   *
   * @memberof TradeRecord
   */
  renderTab = (currentTabType, type, name, alastId) => {
    return (
      <div
        className={currentTabType == type ? 'tab active' : 'tab'}
        onClick={() => {
          this.setState({ tab: type, lastId: alastId })
          this.saveTabIndex(type)()
        }}
      >
        {name}
      </div>
    )
  }

  myBack = () => {
    this.removeTabIndex()
    if (
      this.props.location.query.from &&
      this.props.location.query.from == 'wx'
    ) {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }

  /**
   * 选择基金类型
   *
   * @memberof TradeRecordNew
   */
  onSelectFundType = () => {
    let fundTypes = this.fundTypes

    ActionSheetCannel('选择基金类型', fundTypes, index => {
      if (this.state.fundType != index) {
        // 设置状态并请求数据
        let tabs = this.getTabTypes(index)
        let defaultTab = 0 //默认标签

        this.setState(
          { fundType: index, tabTypes: tabs, tabType: defaultTab },
          () => {
            this.loadData(this.state.fundType, this.state.tabType)
          }
        )
      }
    })
  }

  /**
   * 选择记录类型
   *
   * @memberof TradeRecordNew
   */
  onSelectTabType = () => {
    let tabTypes = this.state.tabTypes

    ActionSheetCannel('选择交易类型', tabTypes, index => {
      if (this.state.tabType != index) {
        // 设置状态并请求数据
        this.setState({ tabType: index }, () => {
          this.loadData(this.state.fundType, this.state.tabType)
        })
      }
    })
  }

  /**
   * 渲染
   *
   * @returns
   * @memberof TradeRecordNew
   */
  render() {
    let { list, lastId, noMore, fundType, tabType } = this.state

    return (
      <div className="tradeRecord">
        <BackTitle titleName="交易记录" hasPostion={true} back={this.myBack} />

        <div className="topTab">
          <div className="tab" onClick={this.onSelectFundType}>
            <p className="tabName">{this.fundTypes[fundType]}</p>
            <img
              src={require('./images/arrow-dowm.png')}
              style={{ width: '11px', height: '5px', marginLeft: '5px' }}
            />
          </div>

          <div className="tabLine" />

          <div className="tab" onClick={this.onSelectTabType}>
            <p className="tabName">{this.state.tabTypes[tabType]}</p>
            <img
              src={require('./images/arrow-dowm.png')}
              style={{ width: '11px', height: '5px', marginLeft: '5px' }}
            />
          </div>
        </div>
        <div className="top-height" />
        {this.renderGroup(list, tabType)}
        <div
          className="more"
          style={{ display: lastId ? 'block' : 'none' }}
          onClick={this.loadMore}
        >
          {noMore ? '没有更多了' : '加载更多'}
        </div>
        <div
          className="no-data"
          style={{ display: !list || list.length <= 0 ? 'block' : 'none' }}
        >
          <img src={require('./images/income-details-bg.png')} />
          <span>暂无数据</span>
        </div>
      </div>
    )
  }
}
