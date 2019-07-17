/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-15 14:12:45
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 16:52:27
 * @Note 基金详情
 */
import React from 'react'
import { Link, hashHistory } from 'react-router'
import cot from 'cookie.js'
import F2LineNotC from './common/F2LineNotCurrency'
import F2LineC from './common/F2LineCurrency'
import RedText from './common/RedText'
import ConfirmWindow from './common/PhoneConfirm'
import { toast, showload } from './common/toast'
import classnames from 'classnames'
import { Rule, PopWindow } from './common/Multi'
import GiveStyle from './common/GiveStyle'
import Copyright from './common/copyright.js'
import { EvaluatingCard } from './common/evaluatingCard'
import {
  setToken,
  changeTitle,
  isIphoneX,
  isIphone,
  isShowTitle,
  setAppVerion,
  openNewPage
} from '../common/setToken'
import { BackTitle, BackSubTitle } from './common/baseTitle'
import toApi from '../common/api'
import '../sass/fundDetail.scss'
import AssetPortfolio from './common/AssetPortfolio.js'
import { createFundAchievementInfo } from '../common/objBean'
import { Line, Line14 } from './common/Line'
import BaseComponent from './baseComponent'
import { isNewVersion } from '../common/globelFunc'
import {
  checkResult,
  FloatFundDetailApi,
  CurrencyFundDetailApi,
  EvaluationStatusApi,
  FloatFundCurveApi,
  announceListApi,
  fundDividendListApi,
  AddOptionalApi
} from '../common/api/api'
import {
  ROUTE_ANSWER,
  ROUTE_IFRAME,
  ROUTE_FUND_BUY,
  ROUTE_ADV_DETAIL,
  ROUTE_FUND_LIST,
  ROUTE_FUND_INFORMATION_DETAIL,
  ROUTE_FIXED_INVEST,
  ROUTE_TEST
} from '../common/route/routeName'
import { NO_TOKEN } from './iframe'
import DialogBox from './common/alertBox/DialogBox'
import { routePush } from '../common/route/routeAction'

const SERVER_STATUS_FOR_LIMIT = 1 //风险测评是否过期 1过期 0 未过期
const DATA_LIMIT_NUM = 6 //数据限制条数

class FundDetail extends BaseComponent {
  constructor(props) {
    super(props)

    // 是否隐藏下方按钮
    this.isHideBtn = this.getParam('isHideBtn')

    this.state = {
      init: false, //初始化
      fundType: this.getParam('fundType') - 0, //基金类型 0非货币基金 1货币基金
      fundCode: this.getParam('fundCode'), //基金代码
      ruleTabIndex: 0, //交易规则tab 0申购 1赎回
      bondPortfolio: [], //债券持仓
      questionList: [], //常见问题
      stockPortfolio: [], //股票持仓
      showConfirm: false, //显示客服电话
      optionTabIndex: 0, //基金概括选项
      announceList: [], //公告list
      lastfundAnnouncementId: 0, //公告最后一条公告id
      announceMoreHint: '加载更多', //公告hint
      diviMoreHint: '加载更多', //分红hint
      fundDividendList: [], //分红数据
      lastfundDiviId: 0, //最后一条分红记录
      ruleList: null, //交易规则
      curve: {}, //图表数据
      curveArr: null, //图表数据
      dealRules: null, //交易规则数据
      fundSituation: null, //基金形式
      testData: null, //风险测评数据
      testShow: 0, //风险测评弹窗
      assetPortfolio: [], //资产配置
      fundRanking: [], //业绩排行
      rankMore: false, //是否加载更多
      select: false, //是否添加自选
      noticeInfo: '', // 公告内容
      isFixedInvest: 0, //是否显示定投按钮 1是0否
      boxShow: false //风险测评是否过期
    }
  }

  /**
   * 第一次渲染结束
   *
   * @memberof FundDetail
   */
  componentDidMount = () => {
    if (this.state.fundType === 0) {
      this.FloatFundDetailData()
    } else {
      this.CurrencyFundDetailData()
    }
    this.isTest()
  }

  /**
   * title
   *
   * @returns
   * @memberof FundDetail
   */
  getTitle() {
    return '基金详情'
  }

  /**
   *非货基基金详情
   *
   * @memberof fundDetail
   */
  async FloatFundDetailData() {
    const { fundType, fundCode } = this.state
    showload(true)
    let result = await FloatFundDetailApi(fundCode)
    showload(false)
    if (checkResult(result)) {
      let _data = result.data
      let _lastfundAnnouncementId = 0
      let _lastfundDiviId = 0
      let _noticeInfo = result.data.noticeInfo

      _data.announceList = []
      _data.fundDividendList = []
      this.setState(
        {
          init: true,
          lastfundAnnouncementId: _lastfundAnnouncementId,
          lastfundDiviId: _lastfundDiviId,
          ruleList: _data.dealRules.buy,
          bondPortfolio: _data.shigekura.bondPortfolio,
          stockPortfolio: _data.shigekura.stockPortfolio,
          assetPortfolio: _data.shigekura.assetPortfolio,
          noticeInfo: _noticeInfo,
          select: _data.optionalStatus == 'add' ? false : true,

          ..._data
        },
        () => {
          document
            .getElementsByTagName('head')[0]
            .getElementsByTagName('title')[0].innerText = this.state.fundName
          if (!isShowTitle()) {
            changeTitle('基金详情')
          }
          if (this.refs) {
            let ptext = this.refs
            _data.questionList &&
              _data.questionList.map((item, index) => {
                if (index == 3) {
                  return
                }
                if (ptext['ptext' + index].offsetHeight > 57) {
                  ptext['ptext' + index].setAttribute('class', 'ellipsis-3')
                  ptext['ptext' + index].addEventListener(
                    'click',
                    this.moreQuestion
                  )
                }
              })
          }
        }
      )
      this.getAnnouncementData(DATA_LIMIT_NUM, '')
      this.getdiviMore(DATA_LIMIT_NUM, '')
    }
    this.getCurveArr()
    this.setScrollTop()
  }

  /**
   * 货币基金详情
   *
   * @memberof fundDetail
   */
  async CurrencyFundDetailData() {
    const { fundType, fundCode } = this.state
    showload(true)
    let result = await CurrencyFundDetailApi(fundCode)
    showload(false)
    if (checkResult(result)) {
      let _data = result.data
      let _lastfundAnnouncementId = 0
      _data.announceList = []
      this.setState(
        {
          init: true,
          lastfundAnnouncementId: _lastfundAnnouncementId,
          ruleList: _data.dealRules.buy,
          assetPortfolio: _data.shigekura.assetPortfolio,
          bondPortfolio: _data.shigekura.bondPortfolio,
          stockPortfolio: _data.shigekura.stockPortfolio,
          select: _data.optionalStatus == 'add' ? false : true,
          ..._data
        },
        () => {
          document
            .getElementsByTagName('head')[0]
            .getElementsByTagName('title')[0].innerText = this.state.fundName
          if (!isShowTitle()) {
            changeTitle('基金详情')
          }
          if (this.refs) {
            let ptext = this.refs
            _data.questionList &&
              _data.questionList.map((item, index) => {
                if (index == 3) {
                  return
                }
                if (ptext['ptext' + index].offsetHeight > 57) {
                  ptext['ptext' + index].setAttribute('class', 'ellipsis-3')
                  ptext['ptext' + index].addEventListener(
                    'click',
                    this.moreQuestion
                  )
                }
              })
          }
        }
      )
      this.getAnnouncementData(DATA_LIMIT_NUM, '')
    }
  }

  showLi = n => {
    return n <= 2 ? 'block' : 'none'
  }

  /**
   * 显示更多问题
   *
   * @memberof FundDetail
   */
  moreQuestion = event => {
    event.stopPropagation()
    if (event.target.className == 'ellipsis') {
      let p = event.target.parentNode
      event.target.parentNode.setAttribute('class', 'ellipsis-0')
      //ellipsis_hide
      event.target.setAttribute('class', 'ellipsis_hide')
      event.target.previousSibling.setAttribute('class', 'ellipsis_hide')
      let emstr = event.target.parentNode.getElementsByTagName('em')
      let temphtml = event.target.parentNode.innerHTML

      event.target.parentNode.innerHTML =
        temphtml +
        "<div style='text-align:right;'><em style='color:#3f3f3f;font-weight:200;'>收起</em></div>"
      p.getElementsByTagName('em')[0].addEventListener('click', this.moreUp)
    } else {
      let emstr = event.target.getElementsByTagName('em')
      if (emstr.length > 0) {
        return
      }

      var allchild = event.target.getElementsByTagName('i')
      if (allchild.length > 0) {
        for (let i = 0; i < allchild.length; i++) {
          allchild[i].setAttribute('class', 'ellipsis_hide')
        }
      }

      event.target.setAttribute('class', 'ellipsis-0')
      let temphtml = event.target.innerHTML
      //event.target.setAttribute('class', 'ellipsis-3');
      event.target.innerHTML =
        temphtml +
        "<div style='text-align:right;'><em style='color:#5694F0;'>收起</em></div>"
      event.target
        .getElementsByTagName('em')[0]
        .addEventListener('click', this.moreUp)
    }
  }

  /**
   * 收起
   *
   * @param {*} event
   */
  moreUp = event => {
    if (event && event.stopPropagation) {
      event.stopPropagation()
      event.target.parentNode.parentNode.setAttribute('class', 'ellipsis-3')
      //previousSibling获得兄弟节点
      if (event.target.parentNode.previousSibling) {
        event.target.parentNode.previousSibling.setAttribute(
          'class',
          'ellipsis'
        )
        event.target.parentNode.previousSibling.previousSibling.setAttribute(
          'class',
          'gradients'
        )
      }

      event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    } else {
      window.event.cancelBubble = true
      window.event.target.parentNode.parentNode.setAttribute(
        'class',
        'ellipsis-3'
      )
      if (event.target.parentNode.previousSibling) {
        event.target.parentNode.previousSibling.setAttribute(
          'class',
          'ellipsis'
        )
        event.target.parentNode.previousSibling.previousSibling.setAttribute(
          'class',
          'gradients'
        )
      }

      window.event.target.parentNode.parentNode.removeChild(
        event.target.parentNode
      )
    }
  }

  /**
   * 选择交易规则
   *
   * @memberof fundDetail
   */
  ruleChange = rule => () => {
    const dealRules = this.state.dealRules
    let ruleList = rule == 'buy' ? dealRules.buy : dealRules.redeem
    let index = rule == 'buy' ? 0 : 1
    this.setState({
      ruleList: ruleList,
      ruleTabIndex: index
    })
  }

  /**
   * 选择tab
   *
   * @memberof fundDetail
   */
  optionChange = index => () => {
    this.setState({
      optionTabIndex: index
    })
  }

  /**
   * 风险测评信息
   *
   * @memberof fundDetail
   */
  isTest = () => {
    this.EvaluationStatusData()
  }

  /**
   *获取测评状态
   *
   * @memberof fundDetail
   */
  async EvaluationStatusData() {
    let result = await EvaluationStatusApi()
    if (checkResult(result)) {
      this.setState({
        testData: result.data
      })
    }
  }

  /**
   * 获取非货基曲线
   *
   * @memberof fundDetail
   */
  getCurveArr = () => {
    this.FloatFundCurveData()
  }

  /**
   * 基金单页，单位净值数据走势
   *
   * @memberof fundDetail
   */
  async FloatFundCurveData() {
    let fundCode = this.state.fundCode
    let result = await FloatFundCurveApi(fundCode)
    if (checkResult(result)) {
      this.setState({
        curveArr: result.data
      })
    }
  }

  /**
   * 立即购买
   *
   * @memberof fundDetail
   */
  next = () => {
    let { isBuy, cannotBuyReason, fundCode, testData } = this.state
    if (isBuy) {
      if (testData) {
        // 未风险测评
        if (testData.isEvaluation == 0 && testData.riskPopup.isPopup == 1) {
          this.setState({
            testShow: 1
          })
        } else {
          if (testData.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
            this.setState({
              boxShow: true
            })
          } else {
            hashHistory.push({
              pathname: ROUTE_FUND_BUY,
              query: {
                fundCode: fundCode
              }
            })
          }
        }
      } else {
        toast('正在检测测评状态，稍后再试')
        this.isTest()
      }
    } else {
      toast(cannotBuyReason)
    }
  }

  /**
   * 数字颜色
   *
   * @memberof fundDetail
   */
  handleColor = num => {
    if (typeof num == 'undefined' || num == '' || num == '--') {
      return 'num'
    }
    if (num != '') {
      let tempNum = num.replace('%', '')
      if (tempNum == 0) {
        return 'num num-grey'
      } else if (tempNum > 0) {
        return 'num num-red'
      } else if (tempNum < 0) {
        return 'num num-green'
      }
    } else {
      return 'num'
    }
  }

  /**
   * 数字符号
   *
   * @memberof fundDetail
   */
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

  /**
   * 显示客户电话
   *
   * @memberof fundDetail
   */
  callCompany = () => {
    this.setState({
      showConfirm: true
    })
  }

  /**
   * 公告详情
   *
   * @memberof fundDetail
   */
  announceOnItemClick = item => () => {
    hashHistory.push({
      pathname: ROUTE_FUND_INFORMATION_DETAIL,
      query: {
        title: '公告详情',
        fundAnnouncementId: item.fundAnnouncementId
      }
    })
  }

  /**
   * 获取公告数据
   *
   * @memberof fundDetail
   */
  getAnnouncementData = (limit, lastId) => {
    this.announceListData(lastId, limit)
  }

  /**
   * 获得公告的数据
   *
   * @param {*} lastId
   * @param {*} limit
   * @memberof fundDetail
   */
  async announceListData(lastId, limit) {
    let fundCode = this.state.fundCode
    showload(true)
    let result = await announceListApi(fundCode, lastId, limit)
    showload(false)
    if (checkResult(result)) {
      let _data = result.data
      let _lastfundAnnouncementId = this.state.lastfundAnnouncementId
      let hint = '加载更多'
      let newList = []
      hint = _data.list.length < limit ? '没有更多了' : '加载更多'
      if (_data.list && _data.list.length > 0) {
        if (_data.list.length == limit) {
          _data.list.pop()
        }
        newList = _data.list
        _lastfundAnnouncementId = newList[newList.length - 1].fundAnnouncementId
      }
      this.setState({
        announceMoreHint: hint,
        lastfundAnnouncementId: _lastfundAnnouncementId,
        announceList: this.state.announceList.concat(newList)
      })
    }
  }

  /**
   * 获取分红数据
   *
   * @memberof fundDetail
   */
  getdiviMore = (limit, lastId) => {
    this.fundDividendListData(lastId, limit)
  }

  /**
   * 就能分红列表
   *
   * @param {*} lastId
   * @param {*} limit
   * @memberof fundDetail
   */
  async fundDividendListData(lastId, limit) {
    let fundCode = this.state.fundCode
    showload(true)
    let result = await fundDividendListApi(fundCode, lastId, limit)
    showload(false)
    if (checkResult(result)) {
      let _data = result.data
      let _lastfundDiviId = this.state.lastfundDiviId
      let hint = '加载更多'
      let newList = []

      hint = _data.list.length < limit ? '没有更多了' : '加载更多'
      if (_data.list && _data.list.length > 0) {
        if (_data.list.length == limit) {
          _data.list.pop()
        }
        newList = _data.list
        _lastfundDiviId = newList[newList.length - 1].fundDividendId
      }

      this.setState({
        diviMoreHint: hint,
        lastfundDiviId: _lastfundDiviId,
        fundDividendList: this.state.fundDividendList.concat(newList)
      })
    }
  }

  /**
   * 公告显示更多
   *
   * @memberof fundDetail
   */
  announceMoreClick = () => {
    if (this.state.announceMoreHint == '没有更多了') {
      return
    }
    this.getAnnouncementData(6, this.state.lastfundAnnouncementId)
  }

  /**
   * 分红显示更多
   *
   * @memberof fundDetail
   */
  diviMoreClick = () => {
    if (this.state.diviMoreHint == '没有更多了') {
      return
    }
    this.getdiviMore(6, this.state.lastfundDiviId)
  }

  /**
   * 隐藏客服电话
   *
   * @memberof fundDetail
   */
  onHideConfirm = () => {
    this.setState({
      showConfirm: false
    })
  }

  /**
   * 确定
   *
   * @memberof fundDetail
   */
  onConfirm = () => {
    this.setState({
      showConfirm: false
    })
  }

  /**
   * 右边箭头的点击事件
   *
   * @memberof fundDetail
   */
  arrowRightClick = data => () => {
    if (data.type == 3) {
      if (data.url == '') {
        toast('该基金暂时没有基金公司详情')
        return
      } else {
        hashHistory.push({
          pathname: '/iframe',
          query: {
            url: data.url,
            rule: NO_TOKEN,
            name: data.title,
            noTitle: true
          }
        })
      }
    } else {
      hashHistory.push({
        pathname: ROUTE_FUND_INFORMATION_DETAIL,
        query: {
          from: 'fundSituation',
          title: data.title,
          textId: data.textId,
          textType: data.textType
        }
      })
    }
  }

  /**
   * 跳转历史详情
   *
   * @memberof fundDetail
   */
  gotoHistor = () => {
    let url = ''
    if (this.state.fundType === 0) {
      //浮动基金
      url = '/notCurrencyHistory'
    } else if (this.state.fundType === 1) {
      //货币
      url = '/historicalDetails'
    }
    hashHistory.push({
      pathname: url,
      query: {
        token: cot.get('token'),
        from: 'fundDetail',
        fundCode: this.state.fundCode
      }
    })
  }

  /**
   * 选择自选模式
   *
   * @memberof fundDetail
   */
  onClickSelect = () => {
    this.AddOptionalData()
  }

  /**
   * 添加自选
   *
   * @memberof fundDetail
   */
  async AddOptionalData() {
    let fundCode = this.state.fundCode
    let select = this.state.select
    let isOptional = select ? 'remove' : 'add'

    showload(true)
    let result = await AddOptionalApi(fundCode, isOptional)
    showload(false)
    if (checkResult(result)) {
      toast(select ? '取消成功' : '添加成功')
      this.setState({ select: !select })
    }
  }

  /**
   *更多的点击事件
   *
   * @memberof fundDetail
   */
  moreAdd = () => {
    hashHistory.push({
      pathname: ROUTE_FUND_LIST,
      query: {
        fundCode: this.state.fundCode
      }
    })
  }

  /**
   *定投
   *
   * @memberof fundDetail
   */
  investFixed = () => {
    let { isFixedInvest, cannotBuyReason, fundCode, testData } = this.state
    if (isFixedInvest) {
      if (testData) {
        if (testData.isEvaluation == 0 && testData.riskPopup.isPopup == 1) {
          this.setState({
            testShow: 1
          })
        } else {
          if (testData.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
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
        this.isTest()
      }
    } else {
      toast(cannotBuyReason)
    }
  }

  /**
   * 渲染
   *
   * @returns
   * @memberof FundDetail
   */
  render() {
    const {
      fundType,
      cannotBuyReason,
      fundCode,
      fundName,
      fundCurrRatio,
      dayIncrease,
      nav,
      isBuy,
      ofundRisklevelName,
      ofundType,
      ofundTypeName,
      ofundRisklevel,
      perMyriadIncome,
      bondPortfolio,
      stockPortfolio,
      minBuyBalance,
      feeRateDescribe, //申购费率
      quondamFeeRate, //原费率
      discountRate, //折扣率
      curve,
      curveArr,
      dealRules,
      ruleList,
      questionList,
      announceMoreHint,
      announceList,
      fundDividendList,
      diviMoreHint,
      ruleTabIndex,
      optionTabIndex,
      fundSituation,
      riskLevel,
      testShow,
      testData,
      assetPortfolio,
      investorCondition,
      navDate,
      riskWarning,
      noticeInfo,
      isFixedInvest
    } = this.state
    //资产配置
    let assetChart
    if (assetPortfolio == null || assetPortfolio.length == 0) {
      assetChart = (
        <div className="no-data-list">
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无数据</span>
        </div>
      )
    } else {
      assetChart = <AssetPortfolio assetPortfolio={assetPortfolio} />
    }

    //股票持仓列表
    let stockPortList
    if (stockPortfolio == null || stockPortfolio.length == 0) {
      //持仓数据为空则显示空空如也的img
      stockPortList = (
        <div className="no-data-list">
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无持仓</span>
        </div>
      )
    } else {
      //持仓数据不为空则循环绑定股票持仓数据
      stockPortList = stockPortfolio.map((item, index) => {
        if (index == 0) {
          return (
            <div>
              <div className="table-tr">
                <div className="fundDiv">股票名称</div>
                <div className="codeDiv">代码</div>
                <div className="zcDiv">持仓市值(万元)</div>
                <div className="zbDiv">占净值比例</div>
              </div>
              <div className="table-trs">
                <div className="fundDiv">{item.name}</div>
                <div className="codeDiv">{item.code}</div>
                <div className="zcDiv">{item.value}</div>
                <div className="zbDiv">
                  {item.ratio != '' ? item.ratio + '%' : '--'}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="table-trs">
              <div className="fundDiv">{item.name}</div>
              <div className="codeDiv">{item.code}</div>
              <div className="zcDiv">{item.value}</div>
              <div className="zbDiv">
                {item.ratio != '' ? item.ratio + '%' : '--'}
              </div>
            </div>
          )
        }
      })
    }

    //债券持仓列表
    let bondPortList
    if (bondPortfolio == null || bondPortfolio.length == 0) {
      //持仓数据为空则显示空空如也的img
      bondPortList = (
        <div className="no-data-list">
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无持仓</span>
        </div>
      )
    } else {
      //持仓数据不为空则循环绑定债券持仓
      bondPortList = bondPortfolio.map((item, index) => {
        if (index == 0) {
          //第一行数据绑定表头
          return (
            <div key={index}>
              <div className="table-tr">
                <div className="fundDiv">债券名称</div>
                <div className="codeDiv">代码</div>
                <div className="zcDiv">持仓市值(万元)</div>
                <div className="zbDiv">占净值比例</div>
              </div>
              <div className="table-trs">
                <div className="fundDiv">{item.name}</div>
                <div className="codeDiv">{item.code}</div>
                <div className="zcDiv">{item.value}</div>
                <div className="zbDiv">
                  {item.ratio != '' ? item.ratio + '%' : '--'}
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="table-trs">
              <div className="fundDiv">{item.name}</div>
              <div className="codeDiv">{item.code}</div>
              <div className="zcDiv">{item.value}</div>
              <div className="zbDiv">
                {item.ratio != '' ? item.ratio + '%' : '--'}
              </div>
            </div>
          )
        }
      })
    }

    let selectDiv
    if (optionTabIndex == 0) {
      selectDiv =
        fundSituation &&
        fundSituation.map((item, index) => {
          if (item.type == 1) {
            return (
              <div
                className="line-box"
                key={index}
                onClick={this.arrowRightClick(item)}
              >
                <span className="line-box-span">{item.title}</span>
                <span>
                  {item.value} <img src={require('../asset/small_right.png')} />
                </span>
              </div>
            )
          } else if (item.type == 3 && item.url) {
            return (
              <a href={item.url} style={{ textDecoration: 'none' }}>
                <div className="line-box" key={index}>
                  <span className="line-box-span">{item.title}</span>
                  <span>
                    {item.value}
                    <img src={require('../asset/small_right.png')} />
                  </span>
                </div>
              </a>
            )
          } else {
            return (
              <div className="line-box" key={index}>
                <span className="line-box-span">{item.title}</span>
                <span>{item.value}</span>
              </div>
            )
          }
        })
    } else if (optionTabIndex == 1) {
      selectDiv = (
        <BulletinList
          list={announceList}
          hint={announceMoreHint}
          onItemClick={this.announceOnItemClick}
          moreClick={this.announceMoreClick}
        />
      )
    } else if (optionTabIndex == 2) {
      selectDiv = (
        <div className="zcTopDiv">
          <div
            className="fund_info_title"
            style={{ borderBottom: '1px solid #e6e6e6' }}
          >
            资产配置
          </div>

          {assetChart}

          <div
            className="r1pxline"
            style={{ background: '#E6E6E6', transform: 'scaleY(1)' }}
          />
          <div className="fund_info_title">股票持仓</div>
          {stockPortList}

          <div className="r10pxline" />
          <div className="fund_info_title">债券持仓</div>

          {bondPortList}
        </div>
      )
    } else if (optionTabIndex == 3) {
      selectDiv = (
        <FundDiviList
          list={fundDividendList}
          hint={diviMoreHint}
          moreClick={this.diviMoreClick}
        />
      )
    }

    return (
      <div>
        <meta name="format-detection" content="telephone=yes" />
        <BackSubTitle
          titleName={fundName}
          subTitle={fundCode}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <EvaluatingCard
          isShow={testShow}
          data={testData}
          hideCard={() => {
            this.setState({ testShow: 0 })
          }}
        />
        <ConfirmWindow
          show={this.state.showConfirm}
          onHideConfirm={this.onHideConfirm}
          onConfirm={this.onConfirm}
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
        <div
          className="fund-detail"
          hidden={!this.state.init}
          style={
            isIphoneX() ? { paddingBottom: '88px' } : { paddingBottom: '54px' }
          }
        >
          <div className="topline" />
          <div className="top-box-center">
            <div className="target-num-box-left">
              <div className="left-box">
                <p className="text">
                  {fundType == 0 ? '日涨跌幅' : '近7日年化'}
                </p>
                <p
                  className={
                    fundType == 0
                      ? this.handleColor(dayIncrease)
                      : this.handleColor(fundCurrRatio)
                  }
                >
                  {fundType == 0
                    ? (dayIncrease && this.handleNumSign(dayIncrease)) || '--'
                    : fundCurrRatio || '--'}
                </p>
              </div>
            </div>

            <div className="division-line" />

            <div className="target-num-box-right">
              <div className="left-box">
                <p className="text">
                  {fundType == 0
                    ? '单位净值' + '(' + (navDate || '--') + ')'
                    : '万份收益' + '(' + (navDate || '--') + ')'}
                </p>
                <p className="num">
                  {fundType == 0 ? nav || '--' : perMyriadIncome || '--'}
                </p>
              </div>
            </div>
          </div>
          <div className="tag-list-box">
            <label
              className={classnames(
                {
                  low:
                    ofundRisklevel - 0 === 0 || ofundRisklevel - 0 === 1
                      ? true
                      : false
                },
                { middle: ofundRisklevel - 0 === 2 ? true : false },
                {
                  high:
                    ofundRisklevel - 0 === 3 || ofundRisklevel - 0 === 4
                      ? true
                      : false
                }
              )}
            >
              {ofundRisklevelName}
            </label>
            <span className="text-tab">{ofundTypeName}</span>
            <span className="text-tab">{minBuyBalance}</span>
          </div>
          <div className="division-line-row" />

          {/* <div className="r10pxline" /> */}

          <div className="line_risk">
            <span className="line_risk_span">投资人条件</span>
            <span className="line_risk_span line_risk_span_r">
              {this.state.investorCondition}
            </span>
          </div>
          {noticeInfo == '' || noticeInfo == null ? null : (
            <div>
              <div className="grayColor" />
              <div className="notice" onClick={this.moreAdd}>
                <img src={require('../asset/notice.png')} />
                <p className="marketRead">公告通知</p>
                {noticeInfo.infoType == 2 ? (
                  <p className="noticeContent">{noticeInfo.title}</p>
                ) : (
                  <p className="noticeContents" />
                )}

                <p className="line45" />
                <p className="moreAdd">更多 ></p>
              </div>
            </div>
          )}

          <div className="r10pxline" />
          {fundType === 0 ? (
            <F2LineNotC data={!curveArr ? 0 : curveArr} />
          ) : null}

          {fundType === 1 ? curve && <F2LineC data={curve} /> : null}
          <span className="more-link">
            <span onClick={this.gotoHistor}>查看历史详情&gt;</span>
          </span>

          <div className="r10pxline" />

          {this.renderFundRank()}

          <div className="rule">
            <div className="count-list-title">
              <sapn className="left">交易规则</sapn>
            </div>
            <div className="tab-border">
              <div
                className={ruleTabIndex == 0 ? 'left tab active' : 'left tab'}
                onClick={this.ruleChange('buy')}
              >
                申购
              </div>
              <div
                className={ruleTabIndex == 1 ? 'right tab active' : 'right tab'}
                onClick={this.ruleChange('redeem')}
              >
                赎回
              </div>
            </div>
            <Rule list={ruleList && ruleList.step} type={0} />
            <div className="rule-text">
              <div
                style={{
                  padding: '0 4px 16px 4px',
                  float: 'left',
                  color: '#909090',
                  fontSize: '12px',
                  lineHeight: '16px'
                }}
              >
                {ruleList && ruleList.hint}
              </div>
            </div>
          </div>
          {ruleList && ruleList.webUrl && (
            <Link
              className="more-link"
              to={`/iframe?name=${'交易详情和费率'}&url=${ruleList.webUrl}`}
            >
              查看交易详情和费率
            </Link>
          )}
          {
            <div className="info-div">
              <div className="r10pxline" />
              <div className="count-list-title">
                <sapn className="left">风险提示</sapn>
              </div>
              <p>{riskWarning}</p>
            </div>
          }
          {/*<div className="bottom-text " ><div style={{ textAlign: 'center', color: '#ccc', fontSize: '12px' }}>组合历史表现不预示其未来收益，市场有风险，投资需谨慎</div></div>*/}

          <div className="r10pxline" />
          <div
            className={fundType == 1 ? 'rule tab-border3' : 'rule tab-border4'}
          >
            <div
              className={optionTabIndex == 0 ? 'left tab active' : 'left tab'}
              onClick={this.optionChange(0)}
            >
              基金概况
            </div>
            <div
              className={optionTabIndex == 2 ? 'left tab active' : 'left tab'}
              onClick={this.optionChange(2)}
            >
              重仓
            </div>
            {fundType == 1 ? (
              <div
                className={
                  optionTabIndex == 1 ? 'right tab active' : 'right tab'
                }
                onClick={this.optionChange(1)}
              >
                公告
              </div>
            ) : (
              <div>
                <div
                  className={
                    optionTabIndex == 1 ? 'left tab active' : 'left tab'
                  }
                  onClick={this.optionChange(1)}
                >
                  公告
                </div>
                <div
                  className={
                    optionTabIndex == 3 ? 'right tab active' : 'right tab'
                  }
                  onClick={this.optionChange(3)}
                >
                  分红
                </div>
              </div>
            )}
          </div>
          {selectDiv}

          <div className="r10pxline" />
          <div className="count-list-title">
            <sapn className="left">常见问题</sapn>
          </div>
          <ul className="question-list">
            {questionList.map((item, index) => {
              if (index == 3) {
                return
              }
              return (
                <li
                  key={index}
                  style={{
                    padding: '11px 16px 16px 16px',
                    fontSize: '12px',
                    display: this.showLi(index)
                  }}
                >
                  <p
                    style={{
                      marginBottom: '10px',
                      color: '#666',
                      lineHeight: '19px'
                    }}
                  >
                    <span>Q</span>
                    {item.question}
                  </p>
                  <p>
                    <span className="inverse">A</span>
                    <p
                      className="ellipsis-0"
                      ref={'ptext' + index}
                      style={{
                        color: '#666',
                        lineHeight: '19px',
                        paddingLeft: '0px'
                      }}
                    >
                      {item.answer}
                      <i className="gradients" />
                      <i className="ellipsis">全文</i>
                    </p>
                  </p>
                </li>
              )
            })}
          </ul>
          <Link
            className="more-link"
            to={`/simple-problem`}
            style={{ paddingBottom: '10px' }}
          >
            更多常见问题
          </Link>
          <div className="thin-line" />
          <Copyright className="pb20 pt10" />
          <div style={{ height: '25px' }} />
          {this.isHideBtn ? null : (
            <BottomInfo
              select={this.state.select}
              onClickCallCompany={this.callCompany}
              onClickBuy={this.next}
              onClickSelect={this.onClickSelect}
              quondamFeeRate={quondamFeeRate}
              feeRateDescribe={feeRateDescribe}
              discountRate={discountRate}
              fixedInvest={this.investFixed}
              isFixedInvest={this.state.isFixedInvest}
            />
          )}
        </div>
      </div>
    )
  }

  /**
   * 渲染item
   *
   * @memberof fundDetail
   */
  renderItem = (item, index) => {
    return (
      <div key={index}>
        <div className="rankListItem">
          <p className="time">{item.title}</p>
          <p
            className={
              item.ratio == '0.00'
                ? 'ratioZero'
                : item.ratio > '0'
                ? 'ratioAdd'
                : 'ratioRemove'
            }
          >
            {item.ratio > 0 ? '+' + item.ratio + '%' : item.ratio + '%'}
          </p>
          {/* <p className="rank">{item.ranking}</p> */}
        </div>
        <Line14 />
      </div>
    )
  }

  /**
   * 点击更多
   *
   * @memberof fundDetail
   */
  onClickMore = () => {
    this.setState({ rankMore: !this.state.rankMore })
  }

  /**
   * 基金排行组件
   *
   * @memberof FundDetail
   */
  renderFundRank = () => {
    let list = this.state.fundRanking
    if (!list || list.length <= 0) {
      return null
    }
    let moreClick = this.state.rankMore
    let data = moreClick ? list : list.slice(0, 4)
    return (
      <div className="rank">
        <p className="rankTitle">历史业绩</p>
        <div className="rankTab">
          <p className="tab"> 时间区间</p>
          <p className="tab"> 涨跌幅</p>
          {/* <p className="tab">同类排名</p> */}
        </div>

        {data.map(this.renderItem)}

        {list && list.length <= 4 ? null : (
          <div className="rankMore" onClick={this.onClickMore}>
            <p className="more">{moreClick ? '收起' : '展开更多'}</p>
            <img
              className="img"
              src={
                moreClick
                  ? require('../asset/arrow-up-blue.png')
                  : require('../asset/arrow-down-blue.png')
              }
            />
          </div>
        )}

        <div className="r10pxline" />
      </div>
    )
  }
}

/**
 * 公告
 *
 * @param {*} { list, hint, onItemClick, moreClick }
 * @returns
 */
const BulletinList = ({ list, hint, onItemClick, moreClick }) => {
  if (list == null || list.length == 0) {
    return (
      <div className="no-data">
        <img src={require('../asset/income-details-bg.png')} />
        <span>暂无数据</span>
      </div>
    )
  } else {
    return (
      <div className="announce-list">
        {list.map((item, index) => {
          return (
            <p key={index} className="item-p" onClick={onItemClick(item)}>
              <span className="left-span">
                {item.infoPublDate
                  ? item.infoPublDate.slice(5)
                  : item.infoPublDate}
              </span>
              <span
                className={
                  isMoreLine(item.infoTitle)
                    ? 'right-span'
                    : 'right-span signline'
                }
              >
                {item.infoTitle}
              </span>
            </p>
          )
        })}
        <p className="txt-more" onClick={moreClick}>
          {hint}
        </p>
      </div>
    )
  }
}

/**
 * 底部组件
 *
 * @param {*} {onClickCallCompany,onClickBuy,onClickSelect,quondamFeeRate,feeRateDescribe}
 * @returns
 */
const BottomInfo = ({
  onClickCallCompany,
  onClickBuy,
  onClickSelect,
  quondamFeeRate, //手续费
  feeRateDescribe, //申购费率
  select,
  discountRate, //折扣率
  fixedInvest, //定投
  isFixedInvest
}) => {
  return (
    <div className="bottom-contianer">
      <div className="bottom-buy-info">
        {!quondamFeeRate ? (
          <div className="fee-rate">
            <p className="fee-label">申购费率 : </p>
            <p className="rate-describe">{feeRateDescribe}</p>
          </div>
        ) : (
          <div className="fee-rate">
            <p className="fee-label">
              申购费
              {discountRate}折 :
            </p>
            <p className="rate-describe">{feeRateDescribe}</p>
            <span className="fee-quondam">{'(原' + quondamFeeRate + ')'}</span>
          </div>
        )}
      </div>

      <div
        className="bottom-fun-contianer"
        style={
          isIphoneX()
            ? { borderBottom: '34px solid #EFEFF4', height: '84px' }
            : { height: '50px' }
        }
      >
        {/* <div className="r1pxline"></div> */}

        {isIphone() ? (
          <a
            style={{
              backgroundColor: 'white',
              width: '20%',
              height: '100%',
              float: 'left'
            }}
            className="tel"
            href="tel:4007-903-688"
          >
            <img className="img" src={require('../asset/tel.png')} />
            <span className="txt">客服</span>
          </a>
        ) : (
          <p
            style={{
              backgroundColor: 'white',
              width: '18.7%',
              height: '100%',
              float: 'left'
            }}
            className="tel"
            onClick={onClickCallCompany}
          >
            <img className="img" src={require('../asset/tel.png')} />
            <span className="txt">客服</span>
          </p>
        )}

        {isNewVersion() ? (
          <div className="select" onClick={onClickSelect}>
            <p className="imgPic">
              <img
                className="img"
                src={
                  select
                    ? require('../asset/icon_select_add.png')
                    : require('../asset/icon_select_remove.png')
                }
              />
            </p>

            <p className="text">{select ? '取消自选' : '加自选'}</p>
          </div>
        ) : null}
        {isFixedInvest == 1 ? (
          <div className="investFixed" onClick={fixedInvest}>
            定投
          </div>
        ) : null}

        <div className="output-btn" onClick={onClickBuy}>
          <p>立即购买</p>
        </div>
      </div>
    </div>
  )
}

/**
 * 分红记录
 *
 * @param {*} { list, hint, moreClick }
 * @returns
 */
const FundDiviList = ({ list, hint, moreClick }) => {
  if (list == null || list.length == 0) {
    return (
      <div className="no-data">
        <img src={require('../asset/income-details-bg.png')} />
        <span>暂无分红</span>
      </div>
    )
  } else {
    return (
      <div className="dividend-list">
        {list.map((item, index) => {
          return (
            <div
              className={
                index == list.length - 1 ? 'item-p item-p-bottom' : 'item-p'
              }
            >
              <span className="valueSpan">
                每10份派息
                {item.dividendRatioBeforeTax}元
              </span>
              <span className="exRightDateSpan">
                分红日:
                {item.exRightDate}
              </span>
              <span className="executeDateSpan">
                派息日:
                {item.executeDate}
              </span>
            </div>
          )
        })}
        <p className="txt-more" onClick={moreClick}>
          {hint}
        </p>
      </div>
    )
  }
}

const isMoreLine = str => {
  let flag = true
  if (str) {
    if (
      str.length * 12 >
      (document.documentElement.clientWidth - 0) * 0.67 - 43
    ) {
    } else {
      flag = false
    }
  }
  return flag
}

export default FundDetail
