import React from 'react'
import { Router, Route, hashHistory, Link } from 'react-router'
import Copyright from './common/copyright'
import { BackTitle } from './common/baseTitle'
import '../sass/identityInformation.scss'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import { setToken, finishPage } from '../common/setToken'
import CDiv from './common/CDiv'
import BaseComponent from './baseComponent'
import {
  checkResult,
  IdentityInformationApi,
  PowerSendMsgApi
} from '../common/api/api'
import { ROUTE_YZM_CHECK } from '../common/route/routeName'
export default class IdentityInformation extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      clientName: '请输入真实姓名', //真实姓名
      idNo: '请输入个人身份证号', //个人身份证号
      bankName: '请选择开户银行', //开户银行
      bankAccount: '请输入您本行的银行卡号', //银行卡号
      mobileTel: '请输入您的预留手机号', //预留手机
      userBankCardId: '' //用户id
    }
  }

  getTitle() {
    return '身份信息确认'
  }

  myBack = () => {
    if (
      this.props.location.query.from &&
      this.props.location.query.from == 'wx'
    ) {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }
  //调取身份信息的接口
  componentDidMount() {
    this.IdentityInformationData()
  }

  /**
   * 身份确认
   *
   * @memberof IdentityInformation
   */
  async IdentityInformationData() {
    showload(true)
    let result = await IdentityInformationApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({ ...result.data })
    }
  }

  // 点击下一步按钮的函数
  next = () => {
    if (!this.state.userBankCardId) {
      return
    }
    this.yzmClick()
  }
  // 获取验证码
  yzmClick = () => {
    this.PowerSendMsgData()
  }

  /**
   *申购失败时获取验证码的接口
   *
   * @memberof IdentityInformation
   */
  async PowerSendMsgData() {
    let userBankCardId = this.state.userBankCardId
    showload(true)
    let result = await PowerSendMsgApi(userBankCardId)
    showload(false)
    if (checkResult(result)) {
      let parm = {
        pathname: ROUTE_YZM_CHECK,
        state: {
          fromIdentityInformation: 1,
          mobileTel: this.state.mobileTel,
          userBankCardId: this.state.userBankCardId
        }
      }
      hashHistory.push(parm)
    }
  }

  render() {
    let { clientName, idNo, bankName, bankAccount, mobileTel } = this.state
    return (
      <div className="identityInformation">
        <BackTitle
          titleName="身份信息确认"
          hasPostion={true}
          back={this.myBack}
        />
        <p className="info">您的盈信基金开户时的身份和银行卡信息</p>
        <p className="trueNames">
          真实姓名
          <span className="trueName">{clientName}</span>
        </p>
        <p className="trueNames">
          身份证号
          <span className="trueName">{idNo}</span>
        </p>
        <p className="trueNames">
          银行名称
          <span className="trueName">{bankName}</span>
        </p>
        <p className="trueNames">
          {' '}
          银行卡号
          <span className="trueName">{bankAccount} </span>
        </p>
        <p className="trueNames">
          预留手机
          <span className="trueName">{mobileTel}</span>
        </p>
        <CDiv className="btn" onClick={this.next}>
          下一步
        </CDiv>
        <Copyright className={'mt30 mb20'} />
      </div>
    )
  }
}
