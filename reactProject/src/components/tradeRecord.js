import React from 'react'
import { hashHistory, withRouter } from 'react-router'
import { BackTitle } from './common/baseTitle'
import cot from 'cookie.js'
import ajax from '../common/api'
import { toast, showload } from './common/toast'
import Promise from 'promise-polyfill'
import '../sass/tradeRecord.scss'
import {
  setToken,
  finishPage,
  isIphone,
  isIphoneX,
  changeTitle,
  setAppVerion,
  isShowTitle
} from '../common/setToken'
import BaseComponent from './baseComponent'
import {
  checkResult,
  TradeRecordBuyListApi,
  TradeRecordRedeemApi,
  TradeRecordBonusApi,
  TradeRecordDoingApi,
  GetOrderListApi
} from '../common/api/api'
import {
  ROUTE_BUY_DETAIL,
  ROUTE_SELL_DETAIL,
  ROUTE_DIVIDEND_DETAIL
} from '../common/route/routeName'
import { routePush } from '../common/route/routeAction'

const PRODUCTTYPE_FUND = 1 //基金
const PRODUCTTYPE_GROUP = 2 //组合

const TRADETYPE_ALLLIST = 1 //全部
export const TRADETYPE_DOING = 2 //进行中
const TRADETYPE_BUG = 3 //申购
const TRADETYPE_REDEEM = 4 //赎回
const TRADETYPE_BONUS = 5 //分红
const TRADETYPE_INVESTFIXED = 6 //定投

const ORDERTYPE_BUY = 1 //申购订单类型
const ORDERTYPE_REDEEM = 2 //赎回订单类型
const ORDERTYPE_INVEST = 3 //定投订单类型
const ORDERTYPE_BONUS = 4 //分红订单类型

/**
 * 交易记录页面
 *
 * @class TradeRecord
 * @extends {React.Component}
 */
class TradeRecord extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let tabIndex = this.getParam('tabIndex')

    if (cot && cot.get('trade-tabIndex')) {
      tabIndex = cot.get('trade-tabIndex')
    }

    tabIndex = parseInt(tabIndex)

    this.state = {
      tab: tabIndex || TRADETYPE_ALLLIST,
      buyList: [], //购买
      redeemList: [], //赎回
      tcList: [],
      fhList: [], //分红
      investFIxed: [], //定投
      doingList: [], //进行中
      list: [], //全部
      lastId: null,
      name: '',
      classic: '分类', //分类
      purchase: '申购',
      redeem: '赎回',
      bonus: '分红',
      fixInvest: '定投',
      moreText: '加载更多',
      isShow: false, //分类的显示和隐藏
      orderType: 0, //订单类型1.申购2.赎回3.定投4.分红0默认全部
      fundCode: '', //基金代码
      limit: 10 //每页查询的数
    }
  }

  getTitle() {
    return '交易记录'
  }

  /**
   * 第一次渲染结束
   *
   */
  componentDidMount() {
    this.getData()
    this.props.router.setRouteLeaveHook(this.props.route, nextLocation => {
      if (nextLocation && nextLocation.action == 'POP') {
        cot && cot.remove('trade-tabIndex')
      }
      return true
    })
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  /**
   * 获取数据
   *
   * @memberof TradeRecord
   */
  getData() {
    this.loadData()
  }

  /**
   * 加载数据
   * loadMore 加载更多
   * @memberof TradeRecord
   */
  loadData = loadMore => {
    let tab = this.state.tab
    if (tab == TRADETYPE_ALLLIST) {
      this.onLoadAllData(loadMore)
    } else if (tab == TRADETYPE_DOING) {
      this.tradeRecordDoingData(loadMore)
    } else if (tab == TRADETYPE_BUG) {
      this.tradeRecordBuyListData(loadMore)
    } else if (tab == TRADETYPE_REDEEM) {
      this.tradeRecordRedeemListData(loadMore)
    } else if (tab == TRADETYPE_BONUS) {
      this.tradeRecordBounsListData(loadMore)
    } else if (tab == TRADETYPE_INVESTFIXED) {
      this.tradeRecordInvestFixedListData(loadMore)
    }
  }

  /**
   *全部
   *
   * @memberof TradeRecord
   */
  async onLoadAllData(loadMore) {
    let { fundCode, lastId, limit, list, totalOrderId, tab } = this.state
    showload(true)
    let result = await GetOrderListApi(0, fundCode, loadMore ? lastId : null, limit)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? list : []
      this.setState({
        list: oldList.concat(result.data.list),
        lastId:
          result.data.list.length > 0 && result.data.list[result.data.list.length - 1].totalOrderId,
        // name: result.data.name,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   *进行中
   *
   * @memberof TradeRecord
   */
  async tradeRecordDoingData(loadMore) {
    let { doingList, limit, lastId } = this.state
    showload(true)
    let result = await TradeRecordDoingApi(PRODUCTTYPE_FUND, loadMore ? lastId : null)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? doingList : []
      this.setState({
        doingList: oldList.concat(result.data.orderList),
        lastId:
          result.data.orderList.length > 0 &&
          result.data.orderList[result.data.orderList.length - 1].orderId,
        moreText: result.data.orderList.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   *申购
   *
   * @returns
   * @memberof TradeRecord
   */
  async tradeRecordBuyListData(loadMore) {
    let { fundCode, lastId, limit, buyList, tab } = this.state
    showload(true)
    let result = await GetOrderListApi(1, fundCode, loadMore ? lastId : null, limit)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? buyList : []

      this.setState({
        buyList: oldList.concat(result.data.list),
        lastId:
          result.data.list.length > 0 && result.data.list[result.data.list.length - 1].totalOrderId,
        // name: result.data.name,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   *赎回
   *
   * @memberof TradeRecord
   */
  async tradeRecordRedeemListData(loadMore) {
    let { fundCode, lastId, limit, redeemList, tab } = this.state
    showload(true)
    let result = await GetOrderListApi(2, fundCode, loadMore ? lastId : null, limit)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? redeemList : []

      this.setState({
        redeemList: oldList.concat(result.data.list),
        lastId:
          result.data.list.length > 0 && result.data.list[result.data.list.length - 1].totalOrderId,
        // name: result.data.name,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   *分红
   *
   * @param {*} loadMore
   * @memberof TradeRecord
   */
  async tradeRecordBounsListData(loadMore) {
    let { fundCode, lastId, limit, fhList, tab } = this.state
    showload(true)
    let result = await GetOrderListApi(4, fundCode, loadMore ? lastId : null, limit)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? fhList : []

      this.setState({
        fhList: oldList.concat(result.data.list),
        lastId:
          result.data.list.length > 0 && result.data.list[result.data.list.length - 1].totalOrderId,
        // name: result.data.name,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   *定投
   *
   * @param {*} loadMore
   * @memberof TradeRecord
   */
  async tradeRecordInvestFixedListData(loadMore) {
    let { fundCode, lastId, limit, investFIxed, tab } = this.state
    showload(true)
    let result = await GetOrderListApi(3, fundCode, loadMore ? lastId : null, limit)
    showload(false)
    if (checkResult(result)) {
      let oldList = loadMore ? investFIxed : []
      this.setState({
        investFIxed: oldList.concat(result.data.list),
        lastId:
          result.data.list.length > 0 && result.data.list[result.data.list.length - 1].totalOrderId,
        // name: result.data.name,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多'
      })
    }
  }

  /**
   * 保存当前标签
   *
   * @memberof TradeRecord
   */
  saveTabIndex = index => () => {
    cot && cot.set('trade-tabIndex', index)
  }

  /**
   * 渲染列表
   *
   * @memberof TradeRecord
   */
  renderGroup = () => {
    let tab = this.state.tab
    switch (tab) {
      case TRADETYPE_BUG: {
        return this.renderBuyGroup()
      }
      case TRADETYPE_REDEEM: {
        return this.renderRedeemGroup()
      }
      case TRADETYPE_BONUS: {
        return this.renderBonusGroup()
      }
      case TRADETYPE_INVESTFIXED: {
        return this.renderInvestFixedGroup()
      }
      case TRADETYPE_ALLLIST: {
        return this.renderAllGroup()
      }
      case TRADETYPE_DOING: {
        return this.renderDoingGroup()
      }
      default:
        return null
    }
  }

  /**
   *进行中渲染申购Item
   *
   * @memberof TradeRecord
   */
  renderBuyItems = (item, index) => {
    let {
      orderId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      addTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_BUY_DETAIL,
              query: {
                orderId: orderId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num red">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>

            <div className="small-txt time">{addTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   *进行中渲染赎回Item
   *
   * @memberof TradeRecord
   */
  renderRedeemItems = (item, index) => {
    let {
      orderId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      addTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_SELL_DETAIL,
              query: {
                orderId: orderId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num green">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>
            <div className="small-txt time">{addTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   *渲染定投Item
   *
   * @memberof TradeRecord
   */
  renderInvestFixedItems = (item, index) => {
    let {
      orderId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      addTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_BUY_DETAIL,
              query: {
                orderId: orderId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num red">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>
            <div className="small-txt time">{addTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  // 点击申购
  onPressTabBuy = () => {
    this.setState({ tab: TRADETYPE_BUG, isShow: false, classic: '申购' }, () => {
      this.loadData()
    })
  }
  /**
   *渲染申购列表
   *
   * @memberof TradeRecord
   */
  renderBuyGroup = () => {
    let { buyList } = this.state
    return (
      buyList &&
      buyList.map((item, index) => {
        return this.renderBuyItem(item, index)
      })
    )
  }

  /**
   *渲染定投列表
   *
   * @memberof TradeRecord
   */
  renderInvestFixedGroup = () => {
    let { investFIxed } = this.state
    return (
      investFIxed &&
      investFIxed.map((item, index) => {
        return this.renderInvestFixedItem(item, index)
      })
    )
  }

  /**
   *渲染申购Item
   *
   * @memberof TradeRecord
   */
  renderBuyItem = (item, index) => {
    let {
      tradeId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      tradeTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_BUY_DETAIL,
              query: {
                orderId: tradeId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num red">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>

            <div className="small-txt time">{tradeTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   *渲染定投Item
   *
   * @memberof TradeRecord
   */
  renderInvestFixedItem = (item, index) => {
    let {
      tradeId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      tradeTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_BUY_DETAIL,
              query: {
                orderId: tradeId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num red">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>
            <div className="small-txt time">{tradeTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   *赎回
   *
   * @memberof TradeRecord
   */
  onPresssRedeem = () => {
    this.setState(
      {
        tab: TRADETYPE_REDEEM,
        classic: '赎回',
        isShow: false
      },
      () => {
        this.loadData()
      }
    )
  }

  /**
   *分红
   *
   * @memberof TradeRecord
   */
  onPressBonous = () => {
    this.setState(
      {
        tab: TRADETYPE_BONUS,
        classic: '分红',
        isShow: false
      },
      () => {
        this.loadData()
      }
    )
  }
  /**
   *定投
   *
   * @memberof TradeRecord
   */
  onPressFixInvest = () => {
    this.setState(
      {
        tab: TRADETYPE_INVESTFIXED,
        classic: '定投',
        isShow: false
      },
      () => {
        this.loadData()
      }
    )
  }
  /**
   *
   * 分类
   * @memberof TradeRecord
   */
  renderClassicGroup = () => {
    let { isShow } = this.state
    return (
      <div className="classicData">
        {isShow ? (
          <div className="fixedBox">
            <p className="firstLie">
              <span className="purchase" onClick={this.onPressTabBuy}>
                申购
              </span>
              <span className="redeem" onClick={this.onPresssRedeem}>
                赎回
              </span>
              <span className="bonous" onClick={this.onPressBonous}>
                分红
              </span>
            </p>
            <p className="firstLie">
              <span className="purchase" onClick={this.onPressFixInvest}>
                定投
              </span>
              <span className="redeem" />
              <span className="bonous" />
            </p>
          </div>
        ) : null}
      </div>
    )
  }

  /**
   *全部
   *
   * @memberof TradeRecord
   */
  renderAllGroup = () => {
    let list = this.state.list
    return (
      list &&
      list.map((item, index) => {
        let {
          tradeId,
          productName,
          assetVal,
          assetText,
          unit,
          orderStatus,
          orderStatusText,
          orderType,
          productType,
          tradeTime
        } = item
        return (
          <div key={index}>
            <div className="new-detail-item" onClick={this.clickType(orderType, tradeId)}>
              <div className="row-layout">
                <div className="fund-name">{productName}</div>
                <div className="num red">
                  {assetText}
                  <span className="rmb">{unit}</span>
                </div>
              </div>
              <div className="row-layout mt2">
                {orderStatus == 0 ? (
                  <div className="small-txt red">{orderStatusText}</div>
                ) : (
                  <div className="small-txt gray">{orderStatusText}</div>
                )}

                <div className="small-txt time">{tradeTime}</div>
              </div>
            </div>
            <p className="thin-line" />
          </div>
        )
      })
    )
  }

  /**
   *每一条列表的点击事件
   *
   * @memberof TradeRecord
   */
  clickType = (orderType, tradeId) => () => {
    if (orderType == 1) {
      routePush(ROUTE_BUY_DETAIL, { orderId: tradeId })
    } else if (orderType == 2) {
      routePush(ROUTE_SELL_DETAIL, { orderId: tradeId })
    } else if (orderType == 3) {
      routePush(ROUTE_BUY_DETAIL, { orderId: tradeId })
    } else if (orderType == 4) {
      routePush(ROUTE_DIVIDEND_DETAIL, { bonusId: tradeId })
    }
  }

  /**
   * 渲染赎回列表
   *
   * @memberof TradeRecord
   */
  renderRedeemGroup = () => {
    let { redeemList } = this.state
    return (
      redeemList &&
      redeemList.map((item, index) => {
        return this.renderRedeemItem(item, index)
      })
    )
  }

  /**
   *渲染赎回Item
   *
   * @memberof TradeRecord
   */
  renderRedeemItem = (item, index) => {
    let {
      tradeId,
      productName,
      assetVal,
      assetText,
      unit,
      orderStatus,
      orderStatusText,
      orderType,
      productType,
      tradeTime
    } = item
    return (
      <div key={index}>
        <div
          className="new-detail-item"
          onClick={() => {
            hashHistory.push({
              pathname: ROUTE_SELL_DETAIL,
              query: {
                orderId: tradeId
              }
            })
          }}>
          <div className="row-layout">
            <div className="fund-name">{productName}</div>
            <div className="num green">
              {assetText}
              <span className="rmb">{unit}</span>
            </div>
          </div>
          <div className="row-layout mt2">
            <div className={`small-txt ${orderStatus == 0 ? 'fail-color' : ''}`}>
              {orderStatusText}
            </div>
            <div className="small-txt time">{tradeTime}</div>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
  }

  /**
   *渲染分红列表
   *
   * @memberof TradeRecord
   */
  renderBonusGroup = () => {
    let { fhList } = this.state
    return (
      fhList &&
      fhList.map((item, index) => {
        let {
          tradeId,
          productName,
          assetVal,
          assetText,
          unit,
          orderStatus,
          orderStatusText,
          orderType,
          productType,
          tradeTime
        } = item
        return (
          <div key={index}>
            <div
              className="new-detail-item"
              onClick={() => {
                hashHistory.push({
                  pathname: ROUTE_DIVIDEND_DETAIL,
                  query: {
                    bonusId: tradeId
                  }
                })
              }}>
              <div className="row-layout">
                <div className="fund-name">{productName}</div>
                <div className="num red">
                  {assetText}
                  <span className="rmb">{unit}</span>
                </div>
              </div>
              <div className="row-layout mt2">
                <div className="small-txt grey">{orderStatusText}</div>
                <div className="small-txt time">{tradeTime}</div>
              </div>
            </div>
            <p className="thin-line" />
          </div>
        )
      })
    )
  }
  /**
   *渲染进行中列表
   *
   * @memberof TradeRecord
   */
  renderDoingGroup = () => {
    let doingList = this.state.doingList
    return (
      doingList &&
      doingList.map((item, index) => {
        if (item.orderType == ORDERTYPE_BUY) {
          //申购进行中
          return this.renderBuyItems(item, index)
        } else if (item.orderType == ORDERTYPE_REDEEM) {
          //赎回进行中
          return this.renderRedeemItems(item, index)
        } else if (item.orderType == ORDERTYPE_INVEST) {
          // 定投进行中
          return this.renderInvestFixedItems(item, index)
        }
      })
    )
  }

  /**
   * 渲染标签
   *
   * @memberof TradeRecord
   */
  renderTab = (currentTabType, type, name) => {
    return (
      <div
        className={currentTabType == type ? 'tab active' : 'tab'}
        onClick={() => {
          this.setState({ tab: type, isShow: false }, () => {
            this.loadData()
          })
        }}>
        {name}
      </div>
    )
  }

  /**
   * 渲染标签
   *
   * @memberof TradeRecord
   */
  renderClassisTab = () => {
    let { isShow, classic, tab } = this.state
    let isActive =
      tab == TRADETYPE_BUG ||
      tab == TRADETYPE_REDEEM ||
      tab == TRADETYPE_BONUS ||
      tab == TRADETYPE_INVESTFIXED
    return (
      <div
        className={isActive ? 'tab active' : 'tab'}
        onClick={() => {
          this.setState({ isShow: !isShow })
        }}>
        {isActive ? classic : '分类'}
        {isActive ? (
          <img src={require('../asset/arrow-down-blue.png')} />
        ) : (
          <img src={require('../asset/open-down.png')} />
        )}
      </div>
    )
  }

  myBack = () => {
    cot && cot.remove('trade-tabIndex')
    if (this.props.location.query.from && this.props.location.query.from == 'wx') {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }
  /**
   *加载更多
   *
   * @memberof TradeRecord
   */
  loadMores = () => {
    let { moreText } = this.state
    if (moreText == '没有更多了') {
      return
    }
    this.loadData(true)
  }

  /**
   * 渲染没有数据组件
   *
   * @memberof TradeRecord
   */
  renderNoData() {
    let tab = this.state.tab
    let list = null
    switch (tab) {
      case TRADETYPE_BUG: {
        list = this.state.buyList
        break
      }
      case TRADETYPE_REDEEM: {
        list = this.state.redeemList
        break
      }
      case TRADETYPE_BONUS: {
        list = this.state.fhList
        break
      }
      case TRADETYPE_INVESTFIXED: {
        list = this.state.investFIxed
        break
      }
      case TRADETYPE_ALLLIST: {
        list = this.state.list
        break
      }
      case TRADETYPE_DOING: {
        list = this.state.doingList
        break
      }
      default:
        list = null
        break
    }

    return !list || list.length <= 0 ? (
      <div className="no-data" style={{ display: 'block' }}>
        <img src={require('../asset/income-details-bg.png')} />
        <span>暂无数据</span>
      </div>
    ) : (
      <MoreTexted clickMore={this.loadMores} moreText={this.state.moreText} />
    )
  }

  render() {
    let {
      tab,
      buyList,
      redeemList,
      fhList,
      name,
      lastId,
      moreText,
      doingList,
      list,
      classic,
      isShow,
      display
    } = this.state

    return (
      <div className="trade-log">
        <BackTitle titleName="交易记录" hasPostion={true} back={this.myBack} />
        <div
          className={`top-layout ${
            isShowTitle()
              ? isIphoneX()
                ? 'topiosx-layout'
                : isIphone()
                ? 'topios-layout'
                : ''
              : 'top-hide'
          }`}>
          {name && <div className="type-title">{name}</div>}
          <div className="switch-tab">
            {this.renderTab(tab, TRADETYPE_ALLLIST, '全部')}
            {this.renderTab(tab, TRADETYPE_DOING, '进行中')}
            {this.renderClassisTab()}
          </div>
        </div>
        <div className="top-height" />
        {this.renderClassicGroup()}
        {this.renderGroup()}

        {this.renderNoData()}
      </div>
    )
  }
}

/**
 *
 *加载更多
 * @memberof TradeRecord
 */
const MoreTexted = ({ clickMore, moreText }) => {
  return (
    <div className="moreText" onClick={clickMore}>
      {moreText}
    </div>
  )
}

export default withRouter(TradeRecord)
