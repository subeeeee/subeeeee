/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-03-11 14:12:15
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 14:49:55
 * @Note 定投详情页
 */
import React, { Component } from 'react'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import { toast, showload } from './common/toast'
import '../sass/fixedInvestDetail.scss'
import { ROUTE_BUY_DETAIL, ROUTE_RETRIEVE_PSW, ROUTE_TEST } from '../common/route/routeName'
import Explain from './common/explain.js'
import {
  fundProtocolInfoApi,
  checkResult,
  fundProtocolBuyListApi,
  changeApi,
  fundPauseApi,
  fundOpenApi,
  fundTerminationApi,
  disposeBacklogApi
} from '../common/api/api'
import { routePush, routeGoBack, routeGo } from '../common/route/routeAction'
import Password from './common/Password'
import { ROUTE_FIXED_INVEST } from '../common/route/routeName'
import Copyright from './common/copyright'
import { ROUTE_FUND_DETAIL } from '../common/route/routeName'
import { isIphoneX } from '../common/setToken'
import DialogBox from './common/alertBox/DialogBox'
import textPage from './textPage'
import LoadingTxt from './common/LoadingTxt'

const STATE_NONE = 0 //无状态
const STATE_PAUSE = 1 //暂停
const STATE_RESUME = 2 //恢复
const STATE_STOP = 3 // 停止
const STATE_STOP_PLAN = 4 //终止计划

const SERVER_STATE_SUSPEND = 2 //暂停（后端返回值）
const SERVER_STATE_TERMINATION = 3 //终止（后端返回值）

const SERVER_STATE_BUY = 2 //申购中
const SERVER_STATE_FAILER = 0 //定投失败

const STATE_LOCAL_STOP = 2 //终止计划的变量
const STATE_LOCAL_CONTINUE = 1 //继续定投的变量

const CLICK_TO_DO_LIST = 1 //记录待办事项的变量

export default class fixedInvestDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#efeff4')
    this.fixedInvestId = this.getParam('fixedInvestId')

    this.state = {
      fixedInvestStatus: 1, //定投协议状态 0 创建失败 1正常 2是暂停 3是终止
      scheduledProtocolNo: '', //协议号
      fundCode: '', //基金代码
      fundName: '', //基金名称
      bankName: '', //开户行
      bankIcon: '', //开户行图标
      bankAccountTail: '', //银行尾号
      applySum: '', //定投金额
      cycle: '', //定投周期
      hint: '', //下次交易日期提示文案
      isDealDay: '', //是否是定投发生交易日
      isOvertopRisk: '', //是否超出风险:1.是
      isPwd: '', //是否需要密码 1是
      riskPopup: {}, //合规弹出提醒数据
      limit: 10, //每页查询条数
      lastId: '', //分页参数，前一组数据最后题条数据的id，
      moreText: '加载更多',
      list: [], //列表
      showed: false, //说明图标的按钮
      hide: 0, //密码框的显示与隐藏
      title: '', //头部
      minMoney: '', //起投金额
      amount: false, //起投金额的bol值
      money: '', //定投金额
      pay: '', //费率
      redPay: '', // 打折后的费率
      investWhen: '', //定投周期
      deductionDate: '', //扣款日期
      showed: false, //非交易日的弹框默认不出来
      confirmBtn: false, // 确认按钮
      userBankCardId: '', //账户id
      limitPerPayment: '', //银行卡单笔限额
      limitPerDay: '', //银行卡单日限额
      displayed: false, //风险提示框的显示与隐藏
      preventResubmit: '', //防止重复提交
      version: '', //版本号
      dealPasswords: '', //交易密码
      unit: '', //周期
      fixDate: '', //日期
      type: 'update', //add是新增 //update是修改
      variousState: STATE_NONE, //1是暂停2是恢复3是终止
      isShowed: false, //密码超过三次以后的显示与隐藏
      textWrite: '', //密码框里的文本
      residueCount: '', //剩余条数
      backlogPopup: {
        eventNo: '' //待办事项的编号
      }, //待办事项的内容
      isBacklog: 0, //待办事项框的显示与隐藏
      showLoading: true
    }
  }

  componentDidMount() {
    this.fundProtocolInfoData()
    this.fundProtocolBuyListData()
  }
  /**
   *数据显示的接口
   *
   * @memberof fixedInvestDetail
   */
  async fundProtocolInfoData() {
    showload(true)
    let result = await fundProtocolInfoApi(this.fixedInvestId)
    showload(false)

    if (checkResult(result)) {
      let allData = result.data
      this.setState({
        fixedInvestStatus: allData.fixedInvestStatus, //定投协议状态 0 创建失败 1正常 2是暂停
        scheduledProtocolNo: allData.scheduledProtocolNo, //协议号
        fundCode: allData.fundCode, //基金代码
        fundName: allData.fundName, //基金名称
        bankName: allData.bankName, //开户行
        bankIcon: allData.bankIcon, //开户行图标
        bankAccountTail: allData.bankAccountTail, //银行尾号
        applySum: allData.applySum, //定投金额
        cycle: allData.cycle, //定投周期
        hint: allData.hint, //下次交易日期提示文案
        isDealDay: allData.isDealDay, //是否是定投发生交易日
        isOvertopRisk: allData.isOvertopRisk, //是否超出风险:1.是
        isPwd: allData.isPwd, //是否需要密码 1是
        riskPopup: allData.riskPopup,
        backlogPopup: allData.backlogPopup,
        isBacklog: allData.isBacklog ? allData.isBacklog : 0,
        showLoading: false
      })
    }
  }

  /**
   *列表的数据
   *
   * @memberof fixedInvestDetail
   */
  async fundProtocolBuyListData() {
    let fixedInvestId = this.fixedInvestId
    let { limit, lastId, list, moreText, residueCount } = this.state
    // showload(true)
    let result = await fundProtocolBuyListApi(fixedInvestId, limit, lastId)
    // showload(false)
    if (checkResult(result)) {
      this.setState({
        list: result.data.list,
        moreText: parseInt(result.data.residueCount) <= 0 ? '没有更多了' : '加载更多',
        lastId: result.data.list.length > 0 && result.data.list[result.data.list.length - 1].orderId
      })
    }
  }
  /**
   * 列表的点击事件
   *
   * @memberof fixedInvestDetail
   */
  onClickListItem = item => () => {
    routePush(ROUTE_BUY_DETAIL, {
      orderId: item.orderId
    })
  }
  /**
   * 加载更多
   *
   * @memberof fixedInvestDetail
   */
  moreTexted = () => {
    this.fundProtocolBuyListApiData()
  }

  async fundProtocolBuyListApiData() {
    let fixedInvestId = this.fixedInvestId
    let { limit, lastId, list, moreText, residueCount } = this.state
    if (moreText == '没有更多了') {
      return
    }

    showload(true)
    let result = await fundProtocolBuyListApi(fixedInvestId, limit, lastId)
    showload(false)

    if (parseInt(result.data.residueCount) <= 0) {
      this.setState({
        moreText: '没有更多了',
        limit: limit,
        lastId: result.data.list.length > 0 && result.data.list[result.data.list.length - 1].orderId
      })
    } else {
      this.setState({
        moreText: '加载更多',
        limit: limit,
        lastId: result.data.list.length > 0 && result.data.list[result.data.list.length - 1].orderId
      })
    }
    let selfState = {}
    selfState.list = list.concat(result.data.list)
    this.setState(selfState)
  }
  /**
   *
   * 列表的渲染
   * @memberof fixedInvestDetail
   */
  renderLists = (item, index) => {
    return (
      <div className="flexsData" onClick={this.onClickListItem(item)} key={index}>
        <p>
          <span className="dateCer">{item.applyDate}</span>
          <span className="moneyDate">
            {item.moneyText}
            {item.unit}
          </span>
        </p>
        <p className="secondFixed">
          {item.orderStatus == SERVER_STATE_FAILER ? (
            <span className="statusDataRed">{item.orderStatusText}</span>
          ) : (
            <span className="statusData">{item.orderStatusText}</span>
          )}
          <img src={require('../asset/arrow-right.png')} />
        </p>
      </div>
    )
  }
  /**
   *图标的点击事件
   *
   * @memberof fixedInvestDetail
   */
  explains = () => {
    this.setState({
      showed: true
    })
  }

  /**
   *修改
   *
   * @memberof fixedInvestDetail
   */
  change = () => {
    let { type, fundCode, unit, fixDate } = this.state
    routePush(ROUTE_FIXED_INVEST, {
      type: type,
      fixedInvestId: this.fixedInvestId,
      fundCode: fundCode
    })
  }

  /**
   *暂停定投后点击修改
   *
   * @memberof fixedInvestDetail
   */
  clickAlertToast = () => {
    let { fixedInvestStatus, isDealDay } = this.state
    if (fixedInvestStatus == SERVER_STATE_SUSPEND) {
      toast('暂停状态下定投计划无法修改')
    } else {
      if (isDealDay == 1) {
        toast('定投扣款当日无法对定投计划进行修改')
      }
    }
  }
  /**
   *密码框的结束
   *
   * @memberof fixedInvest
   */
  onEndPwd = value => {
    let variousState = this.state.variousState
    this.setState(
      {
        dealPasswords: value,
        hide: 0
      },
      () => {
        if (this.state.variousState == STATE_PAUSE) {
          this.fundPauseApiData()
        } else if (this.state.variousState == STATE_RESUME) {
          this.fundOpenApiData()
        } else if (this.state.variousState == STATE_STOP) {
          this.fundTerminationApiData()
        } else if (this.state.variousState == STATE_STOP_PLAN) {
          this.disposeBacklogData(this.state.continueBtn)
        }
      }
    )
  }

  /**
   *暂停
   *
   * @memberof fixedInvestDetail
   */
  suspend = () => {
    let { isDealDay } = this.state
    if (isDealDay == 1) {
      toast('定投扣款当日无法对定投计划进行暂停')
    } else {
      this.setState({
        hide: 1,
        variousState: STATE_PAUSE,
        showIsBacklog: 0,
        textWrite: '暂停计划后将不再执行定投扣款'
      })
    }
  }
  /**
   *暂停接口的数据
   *
   * @memberof fixedInvestDetail
   */
  async fundPauseApiData() {
    let { dealPasswords } = this.state
    showload(true)
    let result = await fundPauseApi(this.fixedInvestId, dealPasswords)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      toast('定投计划已暂停')
      this.fundProtocolInfoData()
    } else {
      if (result.code == '11001') {
        this.setState({
          isShowed: true
        })
      }
    }
  }
  /**
   *恢复
   *
   * @memberof fixedInvestDetail
   */
  recovery = () => {
    this.setState({
      hide: 1,
      variousState: STATE_RESUME,
      showIsBacklog: 0,
      textWrite: '恢复定投计划后将执行定时扣款，请注意下一次扣款时间'
    })
  }
  /**
   *恢复接口的数据
   *
   * @memberof fixedInvestDetail
   */
  async fundOpenApiData() {
    let { dealPasswords } = this.state
    showload(true)
    let result = await fundOpenApi(this.fixedInvestId, dealPasswords)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      toast('定投计划已恢复')
      this.fundProtocolInfoData()
    } else {
      if (result.code == '11001') {
        this.setState({
          isShowed: true
        })
      }
    }
  }
  /**
   *终止
   *
   * @memberof fixedInvestDetail
   */
  termination = () => {
    let { isDealDay } = this.state
    if (isDealDay == 1) {
      toast('定投扣款当日无法对定投计划进行终止')
    } else {
      this.setState({
        hide: 1,
        variousState: STATE_STOP,
        textWrite: '终止后不再继续定投扣款，且定投计划将不可恢复',
        showIsBacklog: 0
      })
    }
  }

  /**
   *终止接口的数据
   *
   * @memberof fixedInvestDetail
   */
  async fundTerminationApiData() {
    let { dealPasswords } = this.state
    showload(true)
    let result = await fundTerminationApi(this.fixedInvestId, dealPasswords)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      toast('定投计划已终止')
      this.fundProtocolInfoData()
    } else {
      if (result.code == '11001') {
        this.setState({
          isShowed: true
        })
      }
    }
  }

  /**
   *
   *返回的点击事件
   * @memberof fixedInvestDetail
   */
  clickBack = () => {
    routeGoBack()
  }

  /**
   *终止计划和继续定投的点击事件
   *
   * @memberof fixedInvestDetail
   */
  clickDisposeBacklog = type => {
    this.setState({
      hide: 1,
      isBacklog: 0,
      variousState: STATE_STOP_PLAN,
      continueBtn: type,
      showIsBacklog: CLICK_TO_DO_LIST
    })
  }

  /**
   *终止计划和继续定投的的数据
   *
   * @memberof fixedInvestDetail
   */
  async disposeBacklogData(type) {
    let { backlogPopup, eventNo, continueOrStopType, dealPasswords } = this.state
    showload(true)
    let result = await disposeBacklogApi(
      backlogPopup.eventNo,
      type,
      this.fixedInvestId,
      dealPasswords
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      if (this.state.continueBtn == STATE_LOCAL_STOP) {
        toast('定投计划已终止')
      } else {
        toast('定投计划已恢复')
      }
      this.fundProtocolInfoData()
    } else {
      if (result.code == '11001') {
        this.setState({
          isShowed: true
        })
      } else {
        this.setState({
          isBacklog: 1
        })
      }
    }
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let {
      fixedInvestStatus, //定投协议状态 0 创建失败 1正常 2是暂停
      scheduledProtocolNo, //协议号
      fundCode, //基金代码
      fundName, //基金名称
      bankName, //开户行
      bankIcon, //开户行图标
      bankAccountTail, //银行尾号
      applySum, //定投金额
      cycle, //定投周期
      hint, //下次交易日期提示文案
      isDealDay, //是否是定投发生交易日
      isOvertopRisk, //是否超出风险:1.是
      isPwd, //是否需要密码 1是
      riskPopup, //合规弹出提醒数据
      list,
      moreText,
      hide,
      variousState,
      backlogPopup,
      isBacklog
    } = this.state
    return (
      <div className="fixedInvestDetail">
        <BackTitle
          titleName={'定投计划'}
          hasPostion={true}
          from={this.props.location.query.from}
          back={this.clickBack}
        />

        <div hidden={this.state.showLoading}>
          <div className="topContented">
            <div className="firstBox">
              <p>
                <img className="icon-user" src={bankIcon} />
              </p>
              <p className="backName">{bankName}</p>
              <p className="lastNumber">(尾号{bankAccountTail})</p>
            </div>
            <div className="secondBox">
              <p className="weekday">{cycle}</p>
              <p className="line" /> <p className="moneys">{applySum}元</p>
            </div>
            <div className="thirdBox">
              <p>
                <img className="icon-users" src={require('../asset/trends.png')} />
              </p>
              <p className="backName">{fundName}</p>
              <p className="lastNumber">({fundCode})</p>
            </div>
          </div>
          {fixedInvestStatus == SERVER_STATE_TERMINATION ||
          fixedInvestStatus == SERVER_STATE_SUSPEND ? null : (
            <div className="weeksAndMoney">
              <div className="leftImg" onClick={this.explains}>
                <img src={require('../asset/explain.png')} />
              </div>
              <div className="rightBox">
                <p className="dateMoney">{hint}</p>
                <p className="capital">扣款日期遇非交易日顺延，请保持银行卡资金充足</p>
              </div>
            </div>
          )}

          <div className="agreement">
            <img src={require('../asset/lamp.png')} />
            <p className="agreementNumber">协议号:{scheduledProtocolNo}</p>
          </div>
          <div className="fixedInvestList">
            <p className="record">定投记录</p>
            {list.length > 0 ? (
              <div className="recordList">
                {list.map(this.renderLists)}
                {moreText == '加载更多' ? (
                  <p className="moreText" onClick={this.moreTexted}>
                    {moreText}
                  </p>
                ) : (
                  <p className="moreTexts">{moreText}</p>
                )}
              </div>
            ) : (
              <p className="no-data">
                <img src={require('../asset/income-details-bg.png')} />
                <span>暂无定投</span>
              </p>
            )}
          </div>

          {fixedInvestStatus == SERVER_STATE_TERMINATION ? (
            <div
              className="bottomBtns"
              style={
                isIphoneX()
                  ? { borderBottom: '34px solid #EFEFF4', height: '84px' }
                  : { height: '50px' }
              }>
              已终止
            </div>
          ) : (
            <div
              className="bottomBtn"
              style={
                isIphoneX()
                  ? { borderBottom: '34px solid #EFEFF4', height: '84px' }
                  : { height: '50px' }
              }>
              {fixedInvestStatus == SERVER_STATE_SUSPEND || isDealDay == 1 ? (
                <p className="unChange" onClick={this.clickAlertToast}>
                  修改
                </p>
              ) : (
                <p className="change" onClick={this.change}>
                  修改
                </p>
              )}
              {fixedInvestStatus == SERVER_STATE_SUSPEND ? (
                <p className="suspend" onClick={this.recovery}>
                  恢复
                </p>
              ) : (
                <p className="suspend" onClick={this.suspend}>
                  暂停
                </p>
              )}

              <p className="termination" onClick={this.termination}>
                终止
              </p>
            </div>
          )}

          <Explain
            isShow={this.state.showed}
            text={
              '扣款日如果是非交易日，会顺延至下一个交易日；如果T日15点后设置明日扣款，将顺延一个扣款周期；设置定投的当日不会执行扣款'
            }
            title={'扣款日期说明'}
            cancelText={'取消'}
            cancelCallBack={() => {
              this.setState({ showed: false })
            }}
          />

          <Password
            show={hide}
            onEnd={this.onEndPwd}
            text={this.state.textWrite}
            onHide={() => {
              if (this.state.showIsBacklog == CLICK_TO_DO_LIST) {
                this.setState({
                  hide: 0,
                  isBacklog: 1
                })
              } else {
                this.setState({
                  hide: 0
                })
              }
            }}
          />

          <DialogBox
            isShow={this.state.isShowed}
            text={'交易密码已被锁定，请24小时后再试！'}
            title={'温馨提示'}
            cancelText={'取消'}
            confirmText={'找回密码'}
            cancelCallBack={() => {
              this.setState({ isShowed: false })
            }}
            confirmCallBack={() => {
              hashHistory.push({
                pathname: ROUTE_RETRIEVE_PSW,
                query: {
                  fundCode: this.fundCode
                }
              })
            }}
          />
          <DialogBox
            isShow={this.state.isBacklog}
            text={backlogPopup.content}
            title={'风险提示'}
            cancelText={'终止计划'}
            confirmText={backlogPopup.type == 1 ? '继续定投' : '重新风险测评'}
            cancelCallBack={() => {
              this.clickDisposeBacklog(STATE_LOCAL_STOP)
            }}
            confirmCallBack={() => {
              if (backlogPopup.type == 1) {
                this.clickDisposeBacklog(STATE_LOCAL_CONTINUE)
              } else {
                routePush(ROUTE_TEST, { isFromTest: true })
              }
            }}
          />
          <Copyright className="mt20 mb60" />
        </div>
      </div>
    )
  }
}
