/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-03-04 17:21:52
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-12 10:56:35
 * @Note 定投设置
 */
import React, { Component } from 'react'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import '../sass/fixedInvest.scss'
import Explain from './common/explain.js'
import Copyright from './common/copyright.js'
import { Picker, List, WhiteSpace, InputItem } from 'antd-mobile'
import { Flex } from 'antd-mobile'
import {
  investFixedApi,
  checkResult,
  fixedInvestAddApi,
  fundEstimatedFeeApi,
  fundEstimatedDateApi,
  changeApi,
  changeSubmintApi
} from '../common/api/api'
import DialogConfirmBoxs from './common/alertBox/DialogConfirmBox'
import Password from './common/Password'
import {
  ROUTE_PSW_FIRST_SET,
  ROUTE_RETRIEVE_PSW,
  ROUTE_TEST
} from '../common/route/routeName'
import { ROUTE_FIXRD_INVEST_DETAILL } from '../common/route/routeName'
import { routePush, routeReplace } from '../common/route/routeAction'
import DialogBox from './common/alertBox/DialogBox'
import { ChangeFundEstimatedDateApi } from '../common/api/api'
import { ROUTE_INVEST_AGREENMENT } from '../common/route/routeName'
import MoneyInput from './common/moneyInput/moneyInput'

const seasons = [
  {
    label: '每周',
    value: '1',
    children: [
      {
        label: '周一',
        value: '02'
      },
      {
        label: '周二',
        value: '03'
      },
      {
        label: '周三',
        value: '04'
      },
      {
        label: '周四',
        value: '05'
      },
      {
        label: '周五',
        value: '06'
      }
    ]
  },
  {
    label: '每月',
    value: '0',
    children: [
      {
        label: '1号',
        value: '01'
      },
      {
        label: '2号',
        value: '02'
      },
      {
        label: '3号',
        value: '03'
      },
      {
        label: '4号',
        value: '04'
      },
      {
        label: '5号',
        value: '05'
      },
      {
        label: '6号',
        value: '06'
      },
      {
        label: '7号',
        value: '07'
      },
      {
        label: '8号',
        value: '08'
      },
      {
        label: '9号',
        value: '09'
      },
      {
        label: '10号',
        value: '10'
      },
      {
        label: '11号',
        value: '11'
      },
      {
        label: '12号',
        value: '12'
      },
      {
        label: '13号',
        value: '13'
      },
      {
        label: '14号',
        value: '14'
      },
      {
        label: '15号',
        value: '15'
      },
      {
        label: '16号',
        value: '16'
      },
      {
        label: '17号',
        value: '17'
      },
      {
        label: '18号',
        value: '18'
      },
      {
        label: '19号',
        value: '19'
      },
      {
        label: '20号',
        value: '20'
      },
      {
        label: '21号',
        value: '21'
      },
      {
        label: '22号',
        value: '22'
      },
      {
        label: '23号',
        value: '23'
      },
      {
        label: '24号',
        value: '24'
      },
      {
        label: '25号',
        value: '25'
      },
      {
        label: '26号',
        value: '26'
      },
      {
        label: '27号',
        value: '27'
      },
      {
        label: '28号',
        value: '28'
      }
    ]
  }
]

/**
 * 组件
 *
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class fixedInvest extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#efeff4')
    this.fundCode = this.getParam('fundCode')
    this.type = this.getParam('type')
    this.fixedInvestId = this.getParam('fixedInvestId')

    this.state = {
      title: '', //头部
      fundName: '', //基金名称
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
      bankName: '', // 开户银行名
      bankIcon: '', //开户行图标
      bankAccountTail: '', //银行卡后四位
      limitPerPayment: '', //银行卡单笔限额
      limitPerDay: '', //银行卡单日限额
      isOvertopRisk: 0, //是否超出风险
      displayed: false, //风险提示框的显示与隐藏
      isPwd: 1, //是否需要密码
      riskPopup: {
        isPopup: 0, //是否弹出
        isCompel: 0, //是否强制测评
        title: '', //弹出标题
        text: '', //弹出内容
        intoRiskText: '' //跳转测评链接的文案
      }, //合规弹出提醒
      preventResubmit: '', //防止重复提交
      version: '', //版本号
      dealPasswords: '', //交易密码
      unit: '1', //周期
      fixDate: '02', //日期
      quondamFeeRate: '', //原费率
      feeRateDescribe: '', //当前费率
      discountRate: '', //折扣
      hide: 0, //密码框的显示与隐藏
      fundGroupId: '',
      firstExchdate: '--', //首次交易日
      isShowed: false, //  密码超过次数显示与隐藏
      contentText: '', //最低定投金额
      type: 'add' ? 'add' : 'update', //add新增，update修改
      fixedInvestId: '', //定投计划id
      applySum: '', //定投金额
      display: 0, //超过风险测评的显示与隐藏
      keyBoardShow: false, //键盘的显示与隐藏
      imgBtn: false, //定投协议同意与不同意的变量
      showLoading: true
    }

    // 表单引用
    this.inputRef = null
  }
  /**
   *非交易日的点击事件
   *
   * @memberof fixedInvest
   */
  explain = () => {
    this.setState({
      showed: true
    })
  }

  /**
   *确认按钮的点击事件
   *
   * @memberof fixedInvest
   */
  finishBtn = () => {
    let { imgBtn } = this.state
    if (imgBtn == false) {
      this.setState({
        hide: 1
      })
    } else {
      toast('请先同意盈信基金定投协议')
    }
  }
  /**
   *  input的输入事件
   *
   * @memberof fixedInvest
   */
  inputMoney = text => {
    let money = text
    this.inputMoneyChange(money)
  }

  inputMoneyChange = money => {
    let { applySum, limitPerPayment, minMoney } = this.state

    if (money == '') {
      this.setState({
        confirmBtn: false,
        amount: false,
        contentText: ''
      })
    }
    let num = parseInt(money)
    if (minMoney <= num && num <= parseFloat(limitPerPayment) * 10000) {
      this.setState({
        money: money,
        confirmBtn: true,
        amount: false,
        contentText: ''
      })
    } else if (minMoney > num) {
      this.setState({
        money: money,
        confirmBtn: false,
        amount: true,
        contentText: '最低定投金额为' + minMoney + '元'
      })
    } else if (parseFloat(limitPerPayment) * 10000 < num) {
      this.setState({
        money: money,
        confirmBtn: false,
        amount: true,
        contentText: '单笔限额' + limitPerPayment + '万元'
      })
    } else {
      this.setState({
        money: money,
        confirmBtn: false,
        amount: false,
        contentText: ''
      })
    }
  }
  /**
   * 数据显示
   *
   * @memberof fixedInvest
   */

  componentDidMount() {
    if (this.type == 'update') {
      this.changeApiData()
    } else {
      this.getFixedInvestData()
    }
  }
  /**
   *定投设置准备接口
   *
   * @memberof fixedInvest
   */
  async getFixedInvestData() {
    let fundCode = this.fundCode
    let { type, fixedInvestId } = this.state
    showload(true)
    let result = await investFixedApi(type, fundCode, fixedInvestId)
    showload(false)
    if (checkResult(result)) {
      let alldata = result.data
      this.setState(
        {
          title: alldata.title,
          fundName: alldata.fundName, //基金名称
          minMoney: alldata.minMoney, //起投金额
          userBankCardId: alldata.userBankCardId, //账户id
          bankName: alldata.bankName, // 开户银行名
          bankIcon: alldata.bankIcon, //开户行图标
          bankAccountTail: alldata.bankAccountTail, //银行卡后四位
          limitPerPayment: alldata.limitPerPayment, //银行卡单笔限额
          limitPerDay: alldata.limitPerDay, //银行卡单日限额
          isOvertopRisk: 0, //是否超出风险
          isPwd: alldata.isPwd, //是否需要密码
          riskPopup: alldata.riskPopup, //合规弹出提醒
          preventResubmit: alldata.preventResubmit, //防止重复提交
          fixedInvestId: alldata.fixedInvestId,
          applySum: alldata.applySum,
          quondamFeeRate: alldata.quondamFeeRate, //原费率
          feeRateDescribe: alldata.feeRateDescribe, //当前费率
          discountRate: alldata.discountRate, //折扣
          display:
            alldata.riskPopup && alldata.riskPopup.isPopup
              ? alldata.riskPopup.isPopup
              : 0,
          showLoading: false
        },
        () => {
          this.fundEstimatedDate()
          if (this.state.display == 0) {
            this.inputRef.showKeyBoard()
          }
        }
      )
    }
  }
  /**
   *修改设置准备接口
   *
   * @memberof fixedInvest
   */
  async changeApiData() {
    let { type, fixedInvestId } = this.state
    showload(true)
    let result = await changeApi(this.type, this.fundCode, this.fixedInvestId)
    showload(false)
    if (checkResult(result)) {
      let alldata = result.data
      this.setState(
        {
          title: alldata.title,
          fundName: alldata.fundName, //基金名称
          minMoney: alldata.minMoney, //起投金额
          userBankCardId: alldata.userBankCardId, //账户id
          bankName: alldata.bankName, // 开户银行名
          bankIcon: alldata.bankIcon, //开户行图标
          bankAccountTail: alldata.bankAccountTail, //银行卡后四位
          limitPerPayment: alldata.limitPerPayment, //银行卡单笔限额
          limitPerDay: alldata.limitPerDay, //银行卡单日限额
          isOvertopRisk: 0, //是否超出风险
          isPwd: alldata.isPwd, //是否需要密码
          riskPopup: alldata.riskPopup, //合规弹出提醒
          preventResubmit: alldata.preventResubmit, //防止重复提交
          fixedInvestId: alldata.fixedInvestId,
          money: alldata.applySum,
          applySum: alldata.applySum,
          unit: alldata.unit,
          fixDate: alldata.fixDate,
          quondamFeeRate: alldata.quondamFeeRate, //原费率
          feeRateDescribe: alldata.feeRateDescribe, //当前费率
          discountRate: alldata.discountRate, //折扣
          display:
            alldata.riskPopup && alldata.riskPopup.isPopup
              ? alldata.riskPopup.isPopup
              : 0,
          showLoading: false
        },
        () => {
          this.ChangeFundEstimatedDate()
          if (this.state.display == 0) {
            this.inputRef.showKeyBoard()
          }
        }
      )
    }
  }
  /**
   *定投设置提交接口
   *
   * @memberof fixedInvest
   */
  async investFixedData() {
    let {
      type,
      money,
      unit,
      fixedInvestId,
      fixDate,
      dealPasswords,
      preventResubmit,
      showPwd
    } = this.state
    showload(true)
    let result = await fixedInvestAddApi(
      type,
      this.fundCode,
      fixedInvestId,
      money,
      unit,
      fixDate,
      dealPasswords,
      preventResubmit
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      toast('定投计划设置成功')
      routeReplace(ROUTE_FIXRD_INVEST_DETAILL, {
        type: result.data.type,
        fixedInvestId: result.data.fixedInvestId,
        fundCode: result.data.fundCode
      })
    } else {
      if (result.code == '11001') {
        this.setState({ isShowed: true })
      }
    }
  }

  /**
   *修改定投提交接口
   *
   * @memberof fixedInvest
   */
  async changeSubmintApiData() {
    let {
      type,
      money,
      unit,
      fixedInvestId,
      fixDate,
      dealPasswords,
      preventResubmit
      // showPwd
    } = this.state
    showload(true)
    let result = await changeSubmintApi(
      this.type,
      this.fundCode,
      this.fixedInvestId,
      money,
      unit,
      fixDate,
      dealPasswords,
      preventResubmit
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      toast('定投计划修改成功')
      routeReplace(ROUTE_FIXRD_INVEST_DETAILL, {
        type: result.data.type,
        fixedInvestId: result.data.fixedInvestId,
        fundCode: result.data.fundCode
      })
    } else {
      if (result.code == '11001') {
        this.setState({ isShowed: true })
      }
    }
  }

  /**
   *  定投周期的值的处理方式
   *
   * @memberof fixedInvest
   */
  onPickerOk = v => {
    let { money } = this.state
    this.inputMoneyChange(money)
    this.setState(
      {
        unit: v[0],
        fixDate: v[1]
      },
      () => {
        if (this.type == 'update') {
          this.ChangeFundEstimatedDate()
        } else {
          this.fundEstimatedDate()
        }
      }
    )
  }
  /**
   *定投周期的接口数据(创建)
   *
   * @memberof fixedInvest
   */
  async fundEstimatedDate() {
    let fundCode = this.fundCode
    let { unit, fixDate, firstExchdate, type, fixedInvestId } = this.state
    showload(true)
    let result = await fundEstimatedDateApi(
      type,
      fundCode,
      fixedInvestId,
      unit,
      fixDate
    )
    showload(false)
    if (checkResult(result)) {
      this.setState({
        firstExchdate: result.data.firstExchdate
      })
    }
  }

  /**
   *修改定投周期的接口（修改）
   *
   * @memberof fixedInvest
   */
  async ChangeFundEstimatedDate() {
    let { unit, fixDate, firstExchdate, type, fixedInvestId } = this.state
    showload(true)
    let result = await ChangeFundEstimatedDateApi(
      this.type,
      this.fundCode,
      this.fixedInvestId,
      unit,
      fixDate
    )
    showload(false)
    if (checkResult(result)) {
      this.setState({
        firstExchdate: result.data.firstExchdate
      })
    }
  }
  /**
   *密码框的结束
   *
   * @memberof fixedInvest
   */
  onEndPwd = value => {
    this.setState({ dealPasswords: value, hide: 0 }, () => {
      if (this.type == 'update') {
        this.changeSubmintApiData()
      } else {
        this.investFixedData()
      }
    })
  }
  /**
   *定投协议中图片的点击事件
   *
   * @memberof fixedInvest
   */
  clickImg = () => {
    let { imgBtn } = this.state
    if (imgBtn == false) {
      this.setState({
        imgBtn: !false
      })
    } else {
      this.setState({
        imgBtn: !true
      })
    }
  }

  /**
   *定投协议的点击事件
   *
   * @memberof fixedInvest
   */
  investArrengment = () => {
    routePush(ROUTE_INVEST_AGREENMENT)
  }
  /**
   * 组件渲染
   *s
   */
  render() {
    let {
      fixDate,
      unit,
      title,
      minMoney,
      money,
      placeholderValue,
      confirmBtn,
      bankName,
      bankAccountTail,
      limitPerPayment,
      limitPerDay,
      bankIcon,
      riskPopup,
      displayed,
      showPwd,
      hide,
      firstExchdate,
      amount,
      contentText,
      applySum,
      quondamFeeRate, //原费率
      feeRateDescribe, //当前费率
      discountRate, //折扣
      imgBtn
    } = this.state
    return (
      <div className="fixedInvest">
        <BackTitle
          titleName={title}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        {this.state.showLoading ? null : (
          <div>
            <div className="cars">
              <span>
                <img className="img" src={bankIcon} />
              </span>
              <div>
                <p className="backCard">
                  {bankName}借记卡({bankAccountTail})
                </p>
                <p className="rules">
                  单笔限额{limitPerPayment}万，单日限额{limitPerDay}万
                </p>
              </div>
            </div>
            <div className="investMoney">
              <img
                className="icon-user"
                src={require('../asset/investMoney.png')}
              />

              <MoneyInput
                ref={ref => {
                  this.inputRef = ref
                }}
                className="moneyInvest"
                placeholder={'最少定投金额' + minMoney + '元 '}
                onChange={this.inputMoney}
                defaultValue={money}
                maxLength={10}
              />

              <p className="contentText">
                每期定投费率：
                <span className="redPay">{feeRateDescribe}</span>
                {quondamFeeRate == '' ? null : (
                  <span className="pay">(原{quondamFeeRate})</span>
                )}
                ，实际定投买入费率以各基金公司确认为准。
              </p>
            </div>
            {amount == true ? (
              <div className="minimum">
                <img src={require('../asset/redLine.png')} />
                {contentText}
              </div>
            ) : null}

            <div className="fixedPeriod">
              <div className="period">
                <Picker
                  title="定投周期"
                  data={seasons}
                  value={[unit, fixDate]}
                  onOk={this.onPickerOk}
                  format={labels => {
                    return labels.join('')
                  }}
                >
                  <List.Item arrow="horizontal" className="fixeds">
                    定投周期
                  </List.Item>
                </Picker>
              </div>
              <p className="nextTime" onClick={this.explain}>
                下次扣款时间：
                <span className="specificTime">{firstExchdate}</span>
                ，遇非交易日顺延
                <img src={require('../asset/explain.png')} />
              </p>
            </div>
            <p className="agrrenOrunGrren">
              {imgBtn == false ? (
                <img
                  src={require('../asset/checked.png')}
                  onClick={this.clickImg}
                />
              ) : (
                <img
                  src={require('../asset/unchecked.png')}
                  onClick={this.clickImg}
                />
              )}
              <span className="alreadyRead">我已阅读并同意</span>
              <span className="agreement" onClick={this.investArrengment}>
                《盈信基金定投协议》
              </span>
            </p>

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
            {confirmBtn == 0 ? (
              <p className="confirmBtn">确认</p>
            ) : (
              <p className="confirmBtns" onClick={this.finishBtn}>
                确认
              </p>
            )}
            <DialogBox
              isShow={this.state.display}
              text={riskPopup.text}
              title={riskPopup.title}
              cancelText={riskPopup.isCompel == 1 ? '取消' : '放弃'}
              confirmText={
                riskPopup.isCompel == 1 ? '重新风险测评' : '继续定投'
              }
              cancelCallBack={() => {
                hashHistory.goBack()
              }}
              confirmCallBack={() => {
                if (riskPopup.isCompel == 1) {
                  routePush(ROUTE_TEST)
                } else {
                  this.setState({ display: 0 }, () => {
                    this.inputRef.showKeyBoard()
                  })
                }
              }}
            />
            <Password
              show={hide}
              onEnd={this.onEndPwd}
              onHide={() => {
                this.setState({
                  hide: 0
                })
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

            <Copyright className="mt30 pb30" />
          </div>
        )}
      </div>
    )
  }
}
