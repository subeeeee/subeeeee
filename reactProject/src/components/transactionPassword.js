import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import '../sass/transactionPassword.scss'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import Copyright from './common/copyright'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle
} from '../common/setToken'
import cot from 'cookie.js'
import CSPan from './common/CSpan'
import CDiv from './common/CDiv'
import BaseComponent from './baseComponent'
import Shelter from './common/Shelter/Shelter'
import {
  checkResult,
  CheckBankStatusApi,
  TransactionPswApi,
  SetTradePswApi,
  RetrievePswApi
} from '../common/api/api'
import { finishPage } from '../common/setToken'
import { routeReplace } from '../common/route/routeAction'

export default class transactionPassword extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      userBankCardId: props.location.query.userBankCardId, //用户id
      pwd: '', //密码
      secondPwd: '', //第二次输入的密码
      errorWord: '', //错误提示
      pwdbol: false, //控制错误提示的变量
      to: props.location.query.to,
      from: props.location.query.from,
      fsyzm: '', //第一个验证码
      verifyCode: '发送验证码', //发送验证码
      emptyBox: '', //验证码的控制变量
      yzmbol: false,
      isClick: false, //点击事件的变量
      isShowShelter: false, //是否显示遮挡
      second: 60, //秒数
      unfsyzm: '', //非第一次验证码
      clientName:
        (props.location.state && props.location.state.clientName) || '', //客户名称
      idNo: (props.location.state && props.location.state.idNo) || '', //客户身份证号
      mobileTel: (props.location.state && props.location.state.mobileTel) || '' //电话号码
    }
    this.timer = null
  }

  getTitle() {
    return '交易密码'
  }

  // 监听input中的数据，保存到state中
  changePwd = e => {
    this.setState({
      pwd: this.checked(e.target.value.replace(/ /g, ''))
    })
  }

  //  监听重复输入密码的的事件
  changeSecondPwd = e => {
    let secondPwd = this.checked(e.target.value)
    if (secondPwd && secondPwd.length == 6 && secondPwd !== this.state.pwd) {
      this.setState({
        secondPwd: secondPwd,
        errorWord: '*您设置的交易密码不一致，请重新输入'
      })
    } else {
      this.setState({
        secondPwd: secondPwd,
        errorWord: ''
      })
    }
  }

  //  点击完成按钮事件
  finish = () => {
    if (this.state.fsyzm == '' && this.state.from == 'forgetpwd') {
      toast('验证码不能为空')
      return
    }
    if (this.state.pwd == '') {
      toast('交易密码不能为空')
      return
    }
    if (!/^\d{6}$/.test(this.state.pwd)) {
      toast('交易密码格式错误')
      return
    }
    if (this.state.secondPwd == '') {
      toast('请再次输入交易密码')
      return
    }
    if (!/^\d{6}$/.test(this.state.secondPwd)) {
      toast('交易密码格式错误')
      return
    }
    if (this.state.pwd !== this.state.secondPwd) {
      toast('您设置的交易密码不一致，请重新输入')
      return
    }

    if (this.state.from == 'forgetpwd') {
      this.forgetPsw()
    } else {
      this.openUser()
    }
  }

  /**
   * 开户
   *
   * @memberof transactionPassword
   */
  openUser() {
    this.CheckBankStatusData()
  }

  /**
   *检查开户状态
   *
   * @memberof transactionPassword
   */
  async CheckBankStatusData() {
    showload(true)
    let result = await CheckBankStatusApi()
    showload(false)
    if (checkResult(result)) {
      if (result.data.isOpenAccount == 1) {
        //以开户用户，
        this.finishOpenUser()
      } else {
        //未开户
        this.userOpen()
      }
    }
  }

  /**
   * 真实开户接口
   *
   * @memberof transactionPassword
   */
  userOpen() {
    this.TransactionPswData()
  }

  /**
   * 设置交易密码
   *
   * @memberof transactionPassword
   */
  async TransactionPswData() {
    let { userBankCardId, pwd, mobileTel } = this.state
    let result = await TransactionPswApi(userBankCardId, pwd, mobileTel)
    if (checkResult(result)) {
      this.finishOpenUser()
    } else {
      if (result.code == 13001) {
        //接口请求异常，重新请求
        this.checkUserOpen()
      }
    }
  }

  /**
   * 完成用户开户
   *
   * @memberof transactionPassword
   */
  finishOpenUser() {
    cot.remove('bankInformation_data')
    cot.remove('bankCheck_data')
    toast('开户成功')
    this.setState({ isShowShelter: true })
    setTimeout(() => {
      this.setState({ isShowShelter: false })
      if (this.state.to && this.state.from == 'wx') {
        routeReplace(this.state.to)
      } else {
        hashHistory.go(-3)
      }
    }, 1500)
  }

  /**
   * 检查用户开户状态
   *
   * @memberof transactionPassword
   */
  checkUserOpen() {
    // 延迟查询
    setTimeout(() => {
      this.CheckUserStatusData()
    }, 5000)
  }

  /**
   *检查开户状态
   *
   * @memberof transactionPassword
   */
  async CheckUserStatusData() {
    let result = await CheckBankStatusApi()
    showload(false)
    if (checkResult(result)) {
      if (result.data.isOpenAccount == 1) {
        //以开户用户
        this.finishOpenUser()
      } else {
        //未开户
        toast('开户失败')
      }
    }
  }
  /**
   * 忘记密码
   *
   * @memberof transactionPassword
   */
  forgetPsw() {
    this.SetTradePswData()
  }

  /**
   *设置密码
   *
   * @memberof transactionPassword
   */
  async SetTradePswData() {
    let { clientName, idNo, pwd, fsyzm } = this.state
    showload(true)
    let result = await SetTradePswApi(clientName, idNo, pwd, fsyzm)
    showload(false)
    if (checkResult(result)) {
      // hashHistory.go(-2)
      finishPage()
    }
  }

  // 公用方法
  checked = v => {
    let pwdreg = /^\d{6}$/
    if (v === '' || v === null) {
      this.setState({
        errorWord: '*交易密码不能为空'
      })
    } else if (v && v.length == 6 && !pwdreg.test(v)) {
      this.setState({
        errorWord: '*格式错误',
        pwdbol: false
      })
    } else {
      this.setState({
        errorWord: ''
      })
    }
    return v
  }

  // 输入验证码的聚焦事件
  yzmFocus = e => {
    this.setState({
      emptyBox: ''
    })
  }

  // 输入验证码的失焦事件
  yzmBlur = e => {
    let val = e.target.value.replace(/ /g, '')
    let reg = /^\d{6}$/
    let yzmbol = false
    let fsyzm = this.state.fsyzm
    if (val == '') {
      this.setState({
        yzmbol: false,
        emptyBox: '验证码不能为空'
      })
    } else if (!reg.test(val)) {
      this.setState({
        yzmbol: false,
        emptyBox: '请输入正确的验证码'
      })
    } else {
      this.setState({
        yzmbol: true,
        emptyBox: null
      })
    }
  }
  // 验证码的监听事件
  yzmChange = e => {
    this.setState({
      fsyzm: e.target.value.replace(/ /g, '')
    })
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }
  componentDidMount() {
    if (this.state.from == 'forgetpwd') {
      this.timer = setInterval(() => {
        if (this.state.second - 1 == 0) {
          clearInterval(this.timer)
          this.setState({
            verifyCode: '发送验证码',
            isClick: false,
            second: 60
          })
        } else {
          this.setState({
            verifyCode: this.state.second - 1 + 's后重新发送',
            isClick: true,
            second: this.state.second - 1
          })
        }
      }, 1000)
      this.setState({
        verifyCode: this.state.second + 's后重新发送',
        isClick: true
      })
    }
  }
  // 发送验证码的点击事件
  fsyzmClick = e => {
    if (this.state.isClick) return
    this.RetrievePswData()
  }

  /**
   * 找回密码
   *
   * @memberof transactionPassword
   */
  async RetrievePswData() {
    let { clientName, idNo } = this.state
    let result = await RetrievePswApi(clientName, idNo)
    if (checkResult(result)) {
      this.setState({ ...result.data })
      this.timer = setInterval(() => {
        if (this.state.second - 1 == 0) {
          clearInterval(this.timer)
          this.setState({
            verifyCode: '发送验证码',
            isClick: false,
            second: 60
          })
        } else {
          this.setState({
            verifyCode: this.state.second - 1 + 's后重新发送',
            isClick: true,
            second: this.state.second - 1
          })
        }
      }, 1000)
      this.setState({
        verifyCode: this.state.second + 's后重新发送',
        isClick: true
      })
    }
  }

  render() {
    let {
      pwd,
      secondPwd,
      errorWord,
      from,
      fsyzm,
      verifyCode,
      emptyBox,
      isClick,
      isShowShelter
    } = this.state
    return (
      <div className="transactionPassword">
        <BackTitle titleName={'交易密码'} hasPostion={true} />
        <Shelter isShow={isShowShelter} />
        <p className="setUp">交易密码设置</p>
        {from == 'forgetpwd' ? (
          <p className="ipts2 clearfix">
            <input
              type="text"
              placeholder="请输入验证码"
              value={fsyzm}
              maxLength="6"
              // className="check"
              onFocus={e => this.yzmFocus(e)}
              onBlur={e => this.yzmBlur(e)}
              onChange={e => this.yzmChange(e)}
            />
            <CSPan
              className={isClick ? 'verifyCode unfsyzm' : 'verifyCode'}
              onClick={e => this.fsyzmClick(e)}
            >
              {verifyCode}
            </CSPan>
          </p>
        ) : (
          ''
        )}
        {/* {from == 'forgetpwd' ? <p className="emptyBox">{emptyBox}</p> : ''} */}
        <p className="tipher">
          <input
            type="password"
            value={pwd}
            name=""
            placeholder="请输入6位数字交易密码"
            className="pwd"
            onChange={this.changePwd.bind(this)}
            maxLength="6"
          />
        </p>
        <p className="secondTipher">
          <input
            type="password"
            value={secondPwd}
            name="secondPwd"
            placeholder="请再次输入6位数字交易密码"
            className="secondPwd"
            onChange={this.changeSecondPwd.bind(this)}
            maxLength="6"
          />
        </p>
        <p className="errorWord">
          {emptyBox && emptyBox != '' ? emptyBox : errorWord}
        </p>
        <CDiv className="completes" onClick={this.finish}>
          完成
        </CDiv>
        <Copyright className={'mt30 mb20'} />
      </div>
    )
  }
}
