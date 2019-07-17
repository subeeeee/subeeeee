/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-10 15:02:26
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-12 11:48:23
 * @Note 组合申购页
 */

import React from 'react'
import ReactDom from 'react-dom'
import cot from 'cookie.js'

import ajax from '../../common/api'
import { toast, showload } from '../common/toast'
import RedText from '../common/RedText'
import Copyright from '../common/copyright.js'
import { EvaluatingCard } from '../common/evaluatingCard.js'
import './groupBuy.scss'
import { BackTitle } from '../common/baseTitle'
import BaseComponent from '../baseComponent'
import { hashHistory } from 'react-router'
import {
  GroupPreBuyInfoApi,
  GroupBuyApi,
  checkResult,
  BuyStatusApi,
  BuyGroupStatusApi,
  TestTemplateApi,
  CheckGroupCanBuyOrRedeemApi
} from '../../common/api/api'
import {
  routePush,
  routeGoBack,
  routeReplace
} from '../../common/route/routeAction'
import {
  ROUTE_GROUP_BUY_DETAIL,
  ROUTE_RULE_AND_RATE
} from '../../common/route/routeName'
import LoadingTxt from '../common/LoadingTxt'
import DialogBox from '../common/alertBox/DialogBox'
import Password from '../common/Password'
import { groupEstimatedFeeApi } from '../../common/api/api'
import { intervalTime } from '../../tools/tools'
import { Line, Line15Ex } from '../common/Line'
import FinishKeyBoard from '../common/finishKeyBoard'
import MoneyInput from '../common/moneyInput/moneyInput'

let cir = num => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push('1')
  }
  return arr
}

export default class GroupBuy extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    const fGroupId = this.props.location.query.groupId
    this.fundGroupCode = this.getParam('fundGroupCode')

    // 保存从费率明细中返回时 当时所填写的份额
    let money = cot.get('page') == 'iframe' ? cot.get('money') : ''

    this.state = {
      groupId: fGroupId, //组合id
      showGroupList: false, //是否查看组合配置信息
      discountText_: null, //折扣
      fundList: [], //配置基金泪飙
      discountText: [], //描述文本
      title: '--',
      fundRuleUrl: '', //交易规则地址
      pwd: '', //交易密码
      showPsw: false, //显示密码框
      userBankCardId: '', //银行卡
      bankName: '', //银行名
      cardNames: '', //卡的类型
      minMoney: 2000, //最小额度
      money: money, //额度
      goBtn: 0,
      rightValue: false,
      cardName: '',
      isRisk: 0,
      confrim: false, //是否同意购买超过风险偏好的产品
      quotaDaily: '--',
      quotaPer: '--',
      isLoading: false,
      riskHint: null,
      testData: {},
      testShow: 0, //风险测评变量的显示与隐藏
      needDeal: 0,
      from: this.props.location.query.from || 0,
      showAgreement: 0,
      agreementConfrim: false, //是否同意组合协议
      showPswLock: false, //显示密码锁定
      showLoading: false, //显示查询状态Loading
      fundGroupCode: '', //组合基金代码
      imgBtn: false //组合服务协议图片的点击事件
      // keyBoardShow: false //键盘的控制按钮
    }

    this.timer = null
    // 表单引用
    this.inputRef = null
  }

  getTitle() {
    return '组合投入'
  }

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取数据
   *
   * @memberof GroupBuy
   */
  async getData() {
    const fGroupId = this.props.location.query.groupId

    showload(true)
    let result = await GroupPreBuyInfoApi(fGroupId)
    showload(false)

    if (result.code == 11000) {
      // 未开户
      toast('您现在还未绑卡，请先绑定银行卡')
      routePush('/bankCheck')
      // hashHistory.push('/bankCheck')
      return
    } else if (result.code == 10002) {
      // 未风险测评
      toast(result.msg)
      routePush('/test')
      return
    } else if (result.code != 0) {
      toast(result.msg)
      routeGoBack()
      return
    }

    let tmp = result.data
    this.setState(
      {
        fGroupId: fGroupId,
        title: tmp.title,
        userBankCardId: tmp.userBankCardId,
        bankName: tmp.bankName,
        minMoney: tmp.minMoney,
        cardNames: tmp.cardName,
        cardName: tmp.paymentNoMantissa,
        isRisk: tmp.isRisk,
        quotaDaily: tmp.quotaDaily,
        quotaPer: tmp.quotaPer,
        riskHint: tmp.riskHint,
        testData: tmp.riskPopup,
        discountText_: tmp.discountText,
        // fundRuleUrl: tmp.buyRuleUrl,
        fundList: tmp.fundList,
        showAgreement: tmp.showAgreement,
        testShow:
          tmp.riskPopup && tmp.riskPopup.isPopup ? tmp.riskPopup.isPopup : 0
      },
      () => {
        if (this.state.testShow == 0) {
          this.inputRef.showKeyBoard()
        }
      }
    )
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
    cot.set('page', '', { maxAge: 60 * 60 })

    this.buyInterval && clearInterval(this.buyInterval)
  }

  hidePwd = () => {
    this.setState({
      pwd: '',
      showPsw: false
    })
  }

  pop = params => {
    this.setState({
      showPsw: true
    })
  }

  /**
   * 申购
   *
   * @memberof GroupBuy
   */
  go = () => {
    //密码
    this.setState({
      testShow: 0,
      needDeal: 0
    })
    this.pop()
    return null
  }

  hideCard = () => {
    this.setState({
      testShow: 0,
      needDeal: 0
    })
  }

  isSafe = async () => {
    if (this.state.goBtn == 0) {
      return
    }
    if (this.state.imgBtn != false) {
      toast('请先同意基金组合服务协议')
      return
    }

    // 是否能申购
    showload(true)
    let result = await CheckGroupCanBuyOrRedeemApi(this.state.groupId)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (Number(data.canBuy)) {
        this.go()
      } else {
        toast(data.cannotBuyReason)
      }
    }
  }

  /**
   * 输入金额
   *
   * @memberof GroupBuy
   */
  lqbMoneyChange = money => {
    // let money = this.chkPrice(event.target.value)

    if (
      money - 0 >= this.state.minMoney - 0 &&
      money - 0 <= this.state.quotaPer * 10000
    ) {
      this.setState(
        {
          money: money,
          goBtn: 1,
          rightValue: true
        },
        () => {
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.getDayliyProfit(money)
          }, 600)
        }
      )
    } else {
      this.setState({
        money: money,
        goBtn: 0,
        rightValue: false
      })
    }
  }

  /**
   * 获取手续费
   *
   * @memberof GroupBuy
   */
  getDayliyProfit = money => {
    this.setState({
      isLoading: 1
    })
    this.groupEstimatedFeeData(money)
  }

  /**
   * 获取预估手续费
   *
   * @param {*} money
   * @memberof GroupBuy
   */
  async groupEstimatedFeeData(money) {
    let fundGroupId = this.state.groupId
    // showload(true)
    let result = await groupEstimatedFeeApi(fundGroupId, money)

    // showload(false)
    if (checkResult(result)) {
      this.setState({
        ...result.data,
        isLoading: false
      })
    }
  }
  /**
   * 勾选
   *
   * @memberof GroupBuy
   */
  _changeConfrim = type => () => {
    if (type == 1) {
      if (this.state.agreementConfrim) {
        this.setState({ agreementConfrim: false })
      } else {
        this.setState({ agreementConfrim: true })
      }
    } else if (type == 2) {
      if (this.state.confrim) {
        this.setState({ confrim: false })
      } else {
        this.setState({ confrim: true })
      }
    }
  }

  /**
   * 组合申购
   *
   * @memberof GroupBuy
   */
  post = async params => {
    showload(true)
    let result = await GroupBuyApi(
      this.state.groupId,
      this.state.userBankCardId,
      this.state.money - 0,
      this.state.pwd
    )
    showload(false)
    if (checkResult(result)) {
      this.checkTimes = 0 //查询次数
      this.setState({ showLoading: true, orderId: result.data.orderId }, () => {
        this.buyInterval = intervalTime(
          () => {
            if (this.checkTimes >= 3) {
              this.toBuyDetail()
            } else {
              this.checkBuyStatus()
              this.checkTimes++
            }
          },
          2000,
          true
        )
      })
    } else if (result.code == 11001) {
      // 密码锁定
      this.setState({ showPswLock: true })
    }

    this.setState({
      showPsw: false,
      pwd: ''
    })
  }

  /**
   * 跳转订单详情
   *
   * @memberof GroupBuy
   */
  toBuyDetail = () => {
    this.buyInterval && clearTimeout(this.buyInterval)
    this.setState({ showLoading: false })

    routeReplace(ROUTE_GROUP_BUY_DETAIL, {
      orderId: this.state.orderId,
      showBtn: 1
    })
  }

  /**
   * 检查订单状态
   *
   * @memberof GroupBuy
   */
  checkBuyStatus = async () => {
    let result = await BuyGroupStatusApi(this.state.orderId)
    if (checkResult(result, false)) {
      if (result.data.orderStatus == 1 || result.data.orderStatus == 2) {
        if (result.data.deductStatus == 1 || result.data.deductStatus == 2) {
          this.toBuyDetail()
        }
      } else {
        this.toBuyDetail()
      }
    }
  }

  /**
   * 输入完密码
   *
   * @memberof GroupBuy
   */
  onEndPsw = value => {
    this.setState({ pwd: value, showPsw: false })
    setTimeout(() => {
      this.post()
    }, 100)
  }

  /**
   * 点击组合配置信息
   *
   * @memberof GroupBuy
   */
  groupList = () => {
    this.setState({
      showGroupList: !this.state.showGroupList
    })
  }

  /**
   *协议的点击事件
   *
   * @memberof GroupBuy
   */
  clickAgreement = () => {
    routePush('/riskWarning', { fromPageType: 2 })
  }

  /**
   *组合协议图片的点击事件
   *
   * @memberof GroupBuy
   */
  clickimgBtn = () => {
    if (this.state.imgBtn == false) {
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
   *input输入事件
   *
   * @memberof GroupBuy
   */
  inputMoney = text => {
    let money = text
    this.lqbMoneyChange(money)
  }

  render() {
    let {
      title,
      goBtn,
      showGroupList,
      fundList,
      isLoading,
      pwd,
      showPsw,
      minMoney,
      money,
      quotaPer,
      quotaDaily,
      riskHint,
      showAgreement,
      groupId,
      discountText_,
      rightValue,
      discountText,
      fundRuleUrl,
      bankName,
      cardName,
      testData,
      cardNames,
      fare
    } = this.state
    return (
      <div className="group-buy">
        <BackTitle titleName="组合投入" hasPostion={true} />
        <Password
          show={this.state.showPsw}
          onEnd={this.onEndPsw}
          onHide={this.hidePwd}
        />
        <div className="buy-rule">
          <div className="titleName">{title}</div>
          <div
            className="feeTitleName"
            onClick={() => {
              routePush(ROUTE_RULE_AND_RATE, {
                fundGroupCode: this.fundGroupCode
              })
            }}
          >
            交易规则
            <img
              style={{
                width: '6px',
                height: '12px',
                marginLeft: '8px'
              }}
              src={require('./images/small_right.png')}
            />
          </div>
        </div>

        <div className="wholePay-line">
          <div className="line" />
        </div>

        <DialogBox
          isShow={this.state.testShow}
          text={this.state.testData.text}
          title={this.state.testData.title}
          cancelText={'取消'}
          confirmText={'确定'}
          textAlign="justify"
          cancelCallBack={() => {
            routeGoBack()
          }}
          confirmCallBack={() => {
            this.setState({ testShow: 0 }, () => {
              this.inputRef.showKeyBoard()
            })
          }}
        />

        <LoadingTxt msg={'正在查询支付状态...'} show={this.state.showLoading} />

        <DialogBox
          isShow={this.state.showPswLock}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ showPswLock: false })
          }}
          confirmCallBack={() => {
            routePush('/retrievePassword', {
              fundCode: this.state.groupId
            })
          }}
        />

        <div className="white">
          <div className="money-input" ref="money-input">
            <MoneyInput
              className="inputed"
              placeholder={'至少投入' + minMoney + '元'}
              onChange={this.inputMoney}
              maxLength={10}
              ref={ref => {
                this.inputRef = ref
              }}
            />
          </div>
        </div>
        <div className="alert-text">
          {rightValue ? (
            <div>
              {isLoading || !fare ? (
                <img
                  src={require('./images/loading.gif')}
                  style={{ marginLeft: '25px' }}
                />
              ) : (
                <div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: fare.text
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: fare.time
                    }}
                  />
                </div>
              )}
            </div>
          ) : null}
          {money - 0 < minMoney - 0 && money ? (
            <p>
              最低
              <span className="red">{minMoney}</span>
              元起购
            </p>
          ) : null}
          {money - 0 > quotaPer * 10000 && money ? (
            <p>
              {bankName}单笔限额
              <span className="red">{quotaPer}</span>万 单日限额
              <span className="red">{quotaDaily}</span>万
            </p>
          ) : null}
          {!money && discountText_ ? (
            <div>
              {discountText_.map((item, index) => {
                return (
                  <p key={index}>
                    <RedText text={item} margin="0 0px" />
                  </p>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="pay-line">
          <div className="line" />
        </div>
        <div
          className={!showGroupList ? 'showList' : 'hideList'}
          onClick={this.groupList}
        >
          查看组合配置详情
          <img className="listImg" src={require('./images/open-down.png')} />
        </div>
        <div className={!showGroupList ? 'hideGroupList' : 'showGroupList'}>
          <table className="listTable">
            <thead className="theadClass">
              <tr>
                <th className="theadFundName">基金名称</th>
                <th className="theadOther">配置比例</th>
                <th className="theadOther">金额(元)</th>
                <th className="theadOther">申购费率</th>
                <th className="theadOther">预估申购费(元)</th>
              </tr>
            </thead>

            <tbody>
              {fundList &&
                fundList.map((item, index) => {
                  return (
                    <tr className="bodyTr" key={index}>
                      <td className="tbodyFundName">{item.fundName}</td>
                      <td className="tbodyOther">{item.percent}</td>
                      <td className="tbodyOthers">{item.tradeAmount}</td>
                      <td className="tbodyOther">{item.feeRatio}</td>
                      <td className="tbodyOther">{item.fee}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <div className="tipsClass">
            *由于基金净值每天受市场波动影响,申购成功后,实际手续费以基金公司公布为准
          </div>
          <div className="showList" onClick={this.groupList}>
            收起
            <img className="listImg" src={require('./images/open-up.png')} />
          </div>
        </div>

        <div className="line10" />
        <div className="pay-title">支付方式</div>

        <div className="wholePay-line">
          <div className="line" />
        </div>
        <div className={'pay-bank select-pay'} onClick={this.payBank}>
          <p>
            <img src={require('./images/round-checked.png')} />
            <em>
              {bankName}
              {cardNames} (尾号
              {cardName})
            </em>
          </p>
          <p className="bottom-info">
            单笔限额
            {quotaPer}
            万，单日限额
            {quotaDaily}万
          </p>
        </div>

        <div className="checkBoxDiv">
          {this.state.imgBtn == false ? (
            <img
              src={require('./images/checked.png')}
              onClick={this.clickimgBtn}
            />
          ) : (
            <img
              src={require('./images/unchecked.png')}
              onClick={this.clickimgBtn}
            />
          )}

          <span className="agreenment">我已阅读并同意</span>
          <span className="caifu" onClick={this.clickAgreement}>
            《基金组合服务协议》
          </span>
        </div>
        <div
          className="next-btn"
          style={goBtn ? {} : { background: '#979797' }}
          onClick={this.isSafe}
        >
          立即申购
        </div>

        <Copyright className="mt30 pb30" />
      </div>
    )
  }
}
