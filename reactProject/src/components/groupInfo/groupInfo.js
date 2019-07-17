/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-07 18:24:47
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-10 11:00:18
 * @Note 组合详情
 */

import React from 'react'
import cot from 'cookie.js'
import { Link, hashHistory } from 'react-router'
import GiveStyle from '../common/GiveStyle'
import ajax from '../../common/api'
import { toast, showload } from '../common/toast'
import RedText from '../common/RedText'
import { Rule, PopWindow } from '../common/Multi'
import Copyright from '../common/copyright.js'
import { EvaluatingCard } from '../common/evaluatingCard.js'
import './groupInfo.scss'
import F2toLine from './chartF2'
import { BackTitle, BackSubTitle } from '../common/baseTitle'
import BaseComponent from '../baseComponent'
import {
  GroupInfoApi,
  GroupInfoChartApi,
  checkResult,
  EvaluationStatusApi,
  CheckGroupCanBuyOrRedeemApi,
  GroupQuestionListApi
} from '../../common/api/api'
import GroupBaseInfo from './groupBaseInfo'
import { isIphoneX, isIphone } from '../../common/setToken'
import ConfirmWindow from '../common/ConfirmWindow'
import PhoneConfirm from '../common/PhoneConfirm'
import { routePush } from '../../common/route/routeAction'
import {
  ROUTE_HISTORICAL_POSITION_DETAIL,
  ROUTE_RULE_AND_RATE,
  ROUTE_TEST,
  ROUTE_GROUP_INFO
} from '../../common/route/routeName'
import DialogBox from '../common/alertBox/DialogBox'

const SERVER_STATUS_FOR_LIMIT = 1 //风险测评是否过期 1是 2未过期

const TAB_ONE = 0 //近半年
const TAB_TWO = 1 //近一年
const TAB_THR = 2 //近三年
const TAB_FOUR = 3 //近五年
const TAB_FIVE = 4 //近十年
const QUESTION_TYPE = 2 //组合中更多常见问题

const BTN_IS_SHOW = 1 //当前最优配置中单支基金路由跳转判断的字段
class GroupInfo extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')

    const { fundGroupId, from } = this.props.location.query

    this.from = from
    this.state = {
      init: false, //初始化
      currentIndex: TAB_FIVE, //赚钱概率当前下标的值
      groupId: fundGroupId,
      model: {
        adjustmentsHint: null,
        ruleUrl: null,
        isPlay: false, //是否有音频在播放
        presentationVoice: '', //音频播放地址
        presentationVoiceName: '', //音频名称
        presentationVoiceSize: '', //音频大小
        presentationImg: [], //策略的图文详情
        question: [],
        deployExplain: {},
        banner: null,
        bottomTips: '',
        label: null,
        fundGroupId: fundGroupId,
        groupName: '',
        riskLevel: 0,
        curve: null,
        curveArr: null,
        list: null,
        dregulation: null,
        riskPreference: null,
        mobility: {},
        opinion: [],
        // feeRate: '',
        feeRates: {
          rate: '', //实际费率
          discount: '', //折扣
          originalRate: '' //原费率
        }, //预估申购手续费
        throng: [],
        buyUserTale: [],
        newDiscount: '',
        historyMaxDrawDown: '',
        historyMaxDrawDownCol: '',
        historyRatio: '',
        historyRatioCol: '',
        yearRatio: '',
        yearRatioCol: '',
        yearMaxDrawDown: '',
        yearCurveImg: '',
        bottomTips: '',
        establishHint: null,
        withdrawHint: null,
        maxDrawDownFaq: null,
        sharp: null,
        sharpRatio: null,
        activity: null,
        canBuy: null,
        canBuyReason: null,
        duringData: null,
        yieldRate: {
          name: '', //近一年收益
          ratio: '' // 近一年收益的值
        }, //近一年收益
        dailyIncreases: '', //日涨幅
        groupNavDate: '', //净值日期
        groupNav: '', //净值
        duringList: [], //赚钱概率
        adjust: {
          date: '', //日期
          describe: '' //持仓原因
        },
        fundGroupCode: '', //组合基金代码
        risk: '', //风险等级
        starting: '' //起投金额
      },
      tableDataList: [], //赚钱概率表格的数据
      // describeReason: '', //赚钱概率中文案说明
      opinionLength: null,
      definContent: null,
      ruleList: null,
      tabIndex: 0,
      showPop: false,
      chartTab: 0,
      testData: null,
      testShow: 0,
      showConfirm: false, //显示客服电话
      isShow: false, //调整风险
      boxShow: false //风险测评是否过期
    }
  }

  componentDidMount() {
    this.getData()
  }

  getTitle() {
    return '组合详情'
  }

  processQuestion = () => {
    let { question } = this.state.model
    if (this.refs) {
      let ptext = this.refs

      question &&
        question.map((item, index) => {
          if (index == 3) {
            return
          }
          if (ptext['ptext' + index].offsetHeight > 57) {
            ptext['ptextall' + index].setAttribute('class', 'ellipsis')
            ptext['ptext' + index].setAttribute('class', 'ellipsis-3')
            ptext['ptext' + index].addEventListener('click', this.moreQuestion)
          } else {
            ptext['ptextall' + index].setAttribute('class', 'ellipsis_hide')
          }
        })
    }
  }

  //显示更多
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
        "<div style='text-align:right;'><em style='color:#3f3f3f;'>收起</em></div>"
      event.target
        .getElementsByTagName('em')[0]
        .addEventListener('click', this.moreUp)
    }
  }
  //收起
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

  async getData() {
    const { fundGroupId, type } = this.props.location.query

    showload(true)

    let result = await GroupInfoApi(fundGroupId)

    showload(false)

    if (!checkResult(result)) {
      return
    }

    let data = result.data
    this.setState(
      {
        init: true,
        model: data,
        opinionLength: data.opinion.length,
        ruleList: data.dregulation.buy.content
      },
      () => {
        this.clickMonth(
          data.duringList.length > TAB_FIVE ? data.duringList[TAB_FIVE] : null,
          TAB_FIVE
        )()
        this.processQuestion()
      }
    )
    this.setScrollTop()
  }

  onDetailsClick = () => {
    // let url = `/positions-detail?groupId=${
    //   this.props.location.query.groupId
    // }&limit=${20}`
    // hashHistory.push(url)
  }

  getLevel = risk => {
    let r = risk - 0
    if (r <= 2) {
      return 1
    }
    if (r <= 4) {
      return 2
    }
    if (r <= 6) {
      return 3
    }
    if (r <= 8) {
      return 4
    }
    return 5
  }

  ruleChange = rule => () => {
    let ruleList =
      rule == 'buy'
        ? this.state.model.dregulation.buy.content
        : this.state.model.dregulation.redeem.content
    let index = rule == 'buy' ? 0 : 1
    this.setState({
      ruleList: ruleList,
      tabIndex: index
    })
  }

  clearOperator = v => {
    return v.replace('-', '')
  }

  isTest = async () => {
    showload(true)
    let result = await EvaluationStatusApi()
    showload(false)
    if (checkResult(result)) {
      if (result.data.isEvaluation == '0') {
        this.setState({
          testData: result.data,
          testShow: !result.data.isEvaluation
        })
      } else {
        if (result.data.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
          this.setState({
            boxShow: true
          })
        } else {
          this.next()
        }
      }
    }
  }

  next = async () => {
    let { canBuy, canBuyReason, fundGroupId, fundGroupCode } = this.state.model
    showload(true)
    let result = await CheckGroupCanBuyOrRedeemApi(fundGroupId)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (Number(data.canBuy)) {
        routePush('/groupBuy', {
          groupId: fundGroupId,
          fundGroupCode: fundGroupCode
        })
      } else {
        toast(data.cannotBuyReason)
      }
    }
  }

  toLink = url => () => {
    hashHistory.push(`/iframe?name=${'网信智投'}&url=${url}`)
  }

  hidePop = () => {
    this.setState({
      showPop: false
    })
  }

  showPop = data => () => {
    this.setState({
      showPop: true,
      definContent: data
    })
  }

  showLi = n => {
    return n <= 2 ? 'block' : 'none'
  }

  //播放音频文件
  plays = obj => {
    this.setState({
      isPlay: obj
    })
  }

  chartTabClick = index => () => {
    this.setState({ chartTab: index })
  }

  setTimeoutClose = () => {
    setTimeout(() => {
      this.refs['floatBox'].style.display = 'none'
    }, 3000)
  }

  /**
   * 配置基金详情
   *
   * @memberof GroupInfo
   */
  tofundInfor = (fundCode, fundName, isCurrency) => {
    hashHistory.push({
      pathname: '/fundDetail',
      query: {
        fundCode: fundCode,
        fundName: fundName,
        fundType: isCurrency,
        isHideBtn: BTN_IS_SHOW
      }
    })
  }

  //跳转到投友故事详情页面，参数为故事ID（暂定）
  toStoryDet = strID => {
    // hashHistory.push(`/fund-infor?fundCode=${fundCode}`)
  }

  fundOpen = (name, length) => () => {
    let display = this.refs[name].style.display

    if (display == 'block') {
      this.refs[name].style.display = 'none'
      this.refs[name + '-img'].src = require('./images/open-down.png')
    } else {
      for (var i = 0; i < length; i++) {
        this.refs['fund-' + i].style.display = 'none'
        this.refs['fund-' + i + '-img'].src = require('./images/open-down.png')
      }
      this.refs[name].style.display = 'block'
      this.refs[name + '-img'].src = require('./images/open-up.png')
    }
  }

  onHideConfirm = () => {
    this.setState({
      showConfirm: false
    })
  }

  onConfirm = () => {
    this.setState({
      showConfirm: false
    })
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

  //显示客户电话
  callCompany = () => {
    this.setState({
      showConfirm: true
    })
  }

  /**
   *历史持仓的点击事件
   *
   * @memberof GroupInfo
   */
  clickHistoricalPosition = () => {
    routePush(ROUTE_HISTORICAL_POSITION_DETAIL, {
      fundGroupCode: this.state.model.fundGroupCode,
      groupName: this.state.model.groupName
    })
  }

  /**
   *
   *规则详情和费率的点击事件
   * @memberof GroupInfo
   */
  clickRuleAndRate = () => {
    routePush(ROUTE_RULE_AND_RATE, {
      fundGroupCode: this.state.model.fundGroupCode
    })
  }

  /**
   *持有月份和年份点击事件
   *
   * @memberof GroupInfo
   */
  clickMonth = (item, index) => () => {
    if (!item) {
      return
    }
    let { tableDataList } = this.state
    let tableList = item.duringData.data && item.duringData.data
    let describeReason = item.duringData.describe

    this.setState({
      currentIndex: index,
      tableDataList: tableList,
      describeReason: describeReason
    })
  }
  /**
   *赚钱概率的展示中tab切换
   *
   * @memberof GroupInfo
   */

  renderTabItem = (item, index) => {
    let { currentIndex } = this.state
    if (
      this.state.model.duringList &&
      this.state.model.duringList.length - 1 == index
    ) {
      return (
        <p
          className={currentIndex == index ? 'threeMons active' : 'threeMons'}
          onClick={this.clickMonth(item, index)}
          key={index}
        >
          {item.name}
        </p>
      )
    }

    if (index == 0) {
      return (
        <p
          className={currentIndex == index ? 'threeMoned active' : 'threeMoned'}
          onClick={this.clickMonth(item, index)}
          key={index}
        >
          {item.name}
        </p>
      )
    }

    return (
      <p
        className={currentIndex == index ? 'threeMon active' : 'threeMon'}
        onClick={this.clickMonth(item, index)}
        key={index}
      >
        {item.name}
      </p>
    )
  }

  /**
   * 赚钱概率中table表格的数据的显示
   *
   * @memberof GroupInfo
   */
  renderTableItem = () => {
    let { tableDataList, describeReason } = this.state

    if (tableDataList.length != 5) {
      return null
    }

    return (
      <div>
        <div className="content">
          <div className="contentBox">
            <p className="profit">盈利</p>
            <p className="percentSign">{tableDataList[0].sectionVal}</p>
          </div>
          <div className="rightLine" />
          <div className="contentBox">
            <p className="profit">盈利</p>
            <p className="percentSign">{tableDataList[1].sectionVal}</p>
          </div>
          <div className="rightLine" />
          <div className="contentBox">
            <p className="profit">盈利</p>
            <p className="percentSign">{tableDataList[2].sectionVal}</p>
          </div>
          <div className="rightLine" />
          <div className="contentBox">
            <p className="profits">亏损</p>
            <p className="percentSigns">{tableDataList[3].sectionVal}</p>
          </div>
          <div className="rightLine" />
          <div className="contentBox">
            <p className="profits">亏损</p>
            <p className="percentSigns">{tableDataList[4].sectionVal}</p>
          </div>
        </div>
        <div className="bottomBox">
          <p className="percentData">{tableDataList[0].rate}</p>
          <div className="rightLine1" />
          <p className="percentData">{tableDataList[1].rate}</p>
          <div className="rightLine1" />
          <p className="percentData">{tableDataList[2].rate}</p>
          <div className="rightLine1" />
          <p className="percentData">{tableDataList[3].rate}</p>
          <div className="rightLine1" />
          <p className="percentData">{tableDataList[4].rate}</p>
        </div>
        <div
          className="describe"
          dangerouslySetInnerHTML={{
            __html: describeReason
          }}
        />
      </div>
    )
  }
  /**
   *调整风险的点击事件
   *
   * @memberof GroupInfo
   */
  clickAdjustRisk = () => {
    this.setState({
      isShow: true
    })
  }

  clickMore = () => {
    hashHistory.push({
      pathname: '/simple-problem',
      query: { questionType: QUESTION_TYPE }
    })
  }

  render() {
    const {
      bottomTips,
      adjustmentsHint,
      ruleUrl,
      throng,
      isPlay,
      presentationImg,
      presentationVoice,
      presentationVoiceName,
      presentationVoiceSize,
      buyUserTale,
      groupName,
      banner,
      label,
      riskLevel,
      list,
      curve,
      curveArr,
      feeRate,
      newDiscount,
      yearRatio,
      historyRatio,
      historyMaxDrawDown,
      yearMaxDrawDown,
      opinion,
      // feeRateDescribe, //申购费率
      // quondamFeeRate, //原费率
      // discountRate, //折扣率
      dregulation,
      question,
      deployExplain,
      establishHint,
      withdrawHint,
      sharp,
      sharpRatio,
      activity,
      duringData,
      duringList,
      adjust,
      feeRates,
      risk
    } = this.state.model

    const fundList = list && list[0] ? list[0].fundList : []
    const curveName = curve && curve.name ? curve.name : {}
    const groupId = this.props.location.query.groupId
    const definContent = this.state.definContent
    const { type } = this.props.location.query
    activity && activity.type == 1 ? this.setTimeoutClose() : ''

    return (
      <div className="main-ui">
        <BackSubTitle
          titleName={groupName}
          subTitle={this.state.model.fundGroupCode}
          hasPostion={true}
          from={this.from}
          rightTitle={'调整风险'}
          rightBack={() => {
            this.clickAdjustRisk()
          }}
        />
        <DialogBox
          isShow={this.state.isShow}
          text={'您确定要重新风险测评？'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'确定'}
          cancelCallBack={() => {
            this.setState({ isShow: false })
          }}
          confirmCallBack={() => {
            routePush(ROUTE_TEST, {
              fromPage: ROUTE_GROUP_INFO
            })
          }}
        />
        <EvaluatingCard
          isShow={this.state.testShow}
          data={this.state.testData}
          url={`/input?groupId=${this.props.location.query.groupId}&site=${
            this.props.location.query.site
          }`}
        />
        <PhoneConfirm
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
        <div className="person-post" hidden={!this.state.init}>
          <GroupBaseInfo {...this.state.model} />

          <div className="r10pxline" />
          <div className="panelNames">业绩走势</div>

          <F2toLine groupId={this.state.groupId} />

          <div style={{ backgroundColor: '#fff', height: '15px' }} />

          <div className="r10pxline" />
          <div
            className="panelNames"
            style={{ display: this.state.chartTab == 1 ? 'none' : '' }}
          >
            赚钱概率
          </div>
          {duringList.length > 0 ? (
            <div className="earingProbability">
              <div className="holdingYears">
                {duringList && duringList.map(this.renderTabItem)}
              </div>

              <div className="tableBox">{this.renderTableItem()}</div>
            </div>
          ) : null}

          <div
            className="r10pxline"
            style={{ display: this.state.chartTab == 1 ? 'none' : '' }}
          />
          <div className="count-list-title">
            <sapn className="left panelName">组合当前配置</sapn>
          </div>
          <p className="shareProportion">
            <sapn className="leftName">组合持仓基金</sapn>
            <sapn className="right">持仓比例</sapn>
          </p>
          <div className="count-list-place">
            {(fundList || []).map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className="count-detail-line"
                    key={index}
                    onClick={() => {
                      this.tofundInfor(
                        item.fundCode,
                        item.fundName,
                        item.isCurrency
                      )
                    }}
                  >
                    <div style={{ width: '100%', display: 'inline-block' }}>
                      <div className="k-v">
                        <div className="left">
                          <span>{item.fundName}</span>
                          {item.fundTypePic ? (
                            <img src={item.fundTypePic} />
                          ) : (
                            <label className="tag-box">{item.fundType}</label>
                          )}
                        </div>
                        <div className="right">{item.percent}</div>
                      </div>
                      <div className="void-line">
                        <div
                          className="display-line"
                          style={{ width: item.percent }}
                        />
                      </div>
                    </div>

                    <img
                      style={{
                        width: '6px',
                        height: '12px'
                      }}
                      src={require('./images/small_right.png')}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div
            className="r1pxline"
            style={{ display: !deployExplain ? 'none' : 'block' }}
          />
          <div
            className="count-list-title"
            style={{ display: !deployExplain ? 'none' : 'block' }}
          >
            <sapn className="left panelName">
              {deployExplain && deployExplain.title}
            </sapn>
            <sapn className="right">{deployExplain && deployExplain.date}</sapn>
          </div>
          <div
            className="text-box"
            style={{ display: !deployExplain ? 'none' : 'block' }}
          >
            {deployExplain && deployExplain.comment}
          </div>

          {adjustmentsHint && (
            <div className="count-list-tag">
              <span className="left panelName">调仓记录</span>
            </div>
          )}
          {adjustmentsHint && (
            <div
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              onClick={this.onDetailsClick}
            >
              {adjustmentsHint ? (
                <div className="text-box">
                  <RedText text={adjustmentsHint} />
                </div>
              ) : null}
            </div>
          )}
          <div className="r10pxline" />

          <div className="pepolCrowd">
            <p className="topTitle" onClick={this.clickHistoricalPosition}>
              <span className="leftName">
                最近调仓<span>({adjust.date})</span>
              </span>
              <span className="rightName">
                历史调仓
                <img src={require('../../asset/small_right.png')} />
              </span>
            </p>
            <p className="contentText">
              <span className="adjustmentReason">调仓原因</span>
              {adjust.describe}
            </p>
          </div>

          <div className="r10pxline" />
          <div className="rule">
            <div className="count-list-title">
              <sapn className="left panelName">交易规则</sapn>
              <sapn className="right" onClick={this.clickRuleAndRate}>
                规则详情和费率
                <img src={require('../../asset/small_right.png')} />
              </sapn>
            </div>
            <div style={{ marginBottom: '-1px' }} className="tab-list">
              <div
                className={this.state.tabIndex == 0 ? 'active' : ''}
                onClick={this.ruleChange('buy')}
              >
                {dregulation && dregulation.buy.title}
              </div>
              <div
                className={this.state.tabIndex == 1 ? 'active' : ''}
                onClick={this.ruleChange('redeem')}
              >
                {dregulation && dregulation.redeem.title}
              </div>
            </div>
            <Rule
              list={this.state.ruleList && this.state.ruleList[0].details}
              type={0}
            />

            <div className="rule-text">
              {this.state.ruleList &&
              this.state.ruleList[1].details[0] != '' ? (
                <div
                  style={{
                    padding: '10px ',
                    float: 'left',
                    color: '#718499',
                    fontSize: '10px',
                    background: '#f2f7fe'
                  }}
                >
                  {this.state.ruleList[1].details[0]}
                </div>
              ) : null}
            </div>
          </div>
          <div className="r10pxline" />

          <div className="count-list-title">
            <sapn className="left panelName">常见问题</sapn>
            <span className="right" onClick={this.clickMore}>
              更多 <img src={require('../../asset/small_right.png')} />
            </span>
          </div>
          <ul className="question-list">
            {question.map((item, index) => {
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
                      lineHeight: '19px',
                      wordBreak: 'break-all'
                    }}
                  >
                    <span>Q</span>
                    {item.ask}
                  </p>
                  <p>
                    <span className="inverse">A</span>
                    <p
                      className="ellipsis-0"
                      ref={'ptext' + index}
                      style={{
                        color: '#666',
                        lineHeight: '19px',
                        paddingLeft: '0px',
                        wordBreak: 'break-all'
                      }}
                    >
                      {item.reply}
                      <i className="gradients" />
                      <i ref={'ptextall' + index} className="ellipsis">
                        全文
                      </i>
                    </p>
                  </p>
                </li>
              )
            })}
          </ul>

          <div className="r10pxline" />
          <Copyright className="mt20 mb50" />
          <div style={{ height: '25px' }} />
          <BottomInfo
            onClickCallCompany={this.callCompany}
            onClickBuy={this.isTest}
            // quondamFeeRate={quondamFeeRate}
            // feeRateDescribe={newDiscount}
            // discountRate={discountRate}
            rate={feeRates.rate}
            discount={feeRates.discount}
            originalRate={feeRates.originalRate}
          />
        </div>
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
  rate, //实际费率
  discount, //折扣
  originalRate, //原费率
  // quondamFeeRate, //手续费
  // feeRateDescribe, //申购费率
  select
  // discountRate //折扣率
}) => {
  return (
    <div className="bottom-contianer">
      <div className="bottom-buy-info">
        <div className="fee-rate">
          {discount != 0 ? (
            <p className="fee-label">
              预估申购费率<span style={{ color: 'red' }}>{discount}</span>折起 :
            </p>
          ) : (
            <p className="fee-label">预估申购费率 : </p>
          )}

          <p className="rate-describe">{rate}</p>
          {discount != 0 ? (
            <span className="fee-quondam">{'(原' + originalRate + ')'}</span>
          ) : null}

          <p className="noManagement"> ；免组合资产管理费</p>
        </div>
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
              width: '28%',
              height: '100%',
              float: 'left'
            }}
            className="tel"
            href="tel:4007-903-688"
          >
            <img className="img" src={require('../../asset/tel.png')} />
            <span className="txt">客服</span>
          </a>
        ) : (
          <p
            style={{
              backgroundColor: 'white',
              width: '28%',
              height: '100%',
              float: 'left'
            }}
            className="tel"
            onClick={onClickCallCompany}
          >
            <img className="img" src={require('../../asset/tel.png')} />
            <span className="txt">客服</span>
          </p>
        )}

        <div className="output-btn" onClick={onClickBuy}>
          <p>立即购买</p>
        </div>
      </div>
    </div>
  )
}

export default GroupInfo
