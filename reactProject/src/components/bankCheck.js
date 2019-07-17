import React from 'react'
import { Router, Route, hashHistory, Link } from 'react-router'
import Copyright from './common/copyright'
import { BackTitle } from './common/baseTitle'
import '../sass/bankCheck.scss'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import {
  setToken,
  changeTitle,
  isShowTitle,
  finishPage,
  setAppVerion,
  isIphone
} from '../common/setToken'
import cot from 'cookie.js'
import CDiv from './common/CDiv'
import CSPan from './common/CSpan'
import BaseComponent from './baseComponent'
import Shelter from './common/Shelter/Shelter'
import {
  checkResult,
  BankCheckApi,
  CheckBankStatusApi,
  BankInformationApi,
  BankSendMsgApi
} from '../common/api/api'
import { ROUTE_TRANSACTION_PSW, ROUTE_IFRAME } from '../common/route/routeName'
export default class BankCheck extends BaseComponent {
  constructor(props) {
    super(props)
    let from = this.getParam('from')
    let to = this.getParam('to')

    this.state = {
      className: '',
      confrim: 1, //判断盈信基金电子直销服务协议
      confrimpay: 1, //判断深圳盈信基金销售有限公司快捷支付服务协议
      isbadIntegrity: 0, //是否有不良记录
      secondYzm: '获取验证码', //获取验证码
      isClicked: false, //获取验证码的点击
      successed: false, //秒数减少的变量
      seconds: 60, //秒数
      unsecondYzm: '',
      yzcode: '', //验证码
      beneficiaryIsSelf: 1, //交易受益人
      isShowShelter: false, //是否显示遮挡
      beneficiary: '', //身份证姓名
      beneficiaryIdNo: '', //身份证号码
      holdingIsSelf: 1, //交易控制人
      holdingName: '', //控制人姓名
      holdIdNo: '', //控制人身份证号码
      data: {
        userBankCardId: '',
        clientName: '请输入真实姓名', //真实姓名
        idNo: '请输入个人身份证号', //个人身份证
        bankName: '请选择开户银行', //开户行
        bankAccount: '请输入您本行的银行卡号', //开户行卡号
        mobileTel: '', //电话号码
        agreementUrl: '',
        agreementUrl2: ''
      },
      to: to,
      from: from
    }
    this.timer = null
  }

  getTitle() {
    return '身份信息确认'
  }

  // 调取数据的方法
  componentDidMount() {
    if (cot.get('bankCheck_data')) {
      this.setState(JSON.parse(cot.get('bankCheck_data')), () => {
        if (this.state.isClicked) {
          this.timer = setInterval(() => {
            if (this.state.seconds - 1 == 0) {
              clearInterval(this.timer)
              this.setState({
                secondYzm: '获取验证码',
                isClicked: false,
                seconds: 60
              })
            } else {
              this.setState({
                secondYzm: `${this.state.seconds - 1}s`,
                isClicked: true,
                seconds: this.state.seconds - 1
              })
            }
          }, 1000)
          this.setState({
            successed: true,
            secondYzm: `${this.state.seconds}s`,
            isClicked: true
          })
        }
      })
    } else {
      this.getApiData()
    }
    document.body.addEventListener('focusin', () => {
      //软键盘弹出的事件处理
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      isIphone() &&
        scrollTop > 0 &&
        this.setState({ className: 'postion-absolute' })
    })
    document.body.addEventListener('focusout', () => {
      //软键盘收起的事件处理
      isIphone() && this.setState({ className: '' })
    })
  }

  /**
   * 银行卡的接口数据
   *
   * @memberof BankCheck
   */
  async getApiData() {
    showload(true)
    let result = await BankCheckApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({ data: { ...result.data } })
    }
  }

  // 点击下一步按钮的函数
  next = () => {
    if (!this.state.data.mobileTel) {
      toast('请输入预留手机号')
      return
    }
    let reg = /^1\d{10}$/
    if (!reg.test(this.state.data.mobileTel)) {
      toast('请输入正确的手机号')
      return
    }
    if (!this.state.successed) {
      toast('请先成功获取验证码')
      return
    }
    if (!this.state.yzcode) {
      toast('请输入验证码')
      return
    }
    let authreg = /^\d{4,6}$/
    if (!authreg.test(this.state.yzcode)) {
      toast('请输入正确的验证码')
      return
    }
    if (this.state.holdingIsSelf == 0) {
      if (!this.state.holdingName) {
        toast('请输入交易的实际控制人')
        return
      }
      if (!this.state.holdIdNo) {
        toast('请输入控制人身份证号')
        return
      }
      var regholdIdNo = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regholdIdNo.test(this.state.holdIdNo)) {
        toast('控制人身份证号填写有误')
        return
      }
    }
    if (this.state.beneficiaryIsSelf == 0) {
      if (!this.state.beneficiary) {
        toast('请输入交易的实际受益人')
        return
      }
      if (!this.state.beneficiaryIdNo) {
        toast('请输入受益人身份证号')
        return
      }
      var regbeneficiaryIdNo = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regbeneficiaryIdNo.test(this.state.beneficiaryIdNo)) {
        toast('受益人身份证号填写有误')
        return
      }
    }
    if (this.state.confrim === 0) {
      toast('请同意《盈信基金电子直销服务协议》')
      return
    }
    if (this.state.confrimpay === 0) {
      toast('请同意《深圳盈信基金销售有限公司快捷支付服务协议》')
      return
    }
    if (!this.state.data.userBankCardId) {
      return
    }
    this._clicks()
  }

  // 下一步按钮的点击事件
  _clicks = () => {
    this.getNextBtn()
  }

  /**
   * 实名认证的接口
   *
   * @memberof BankCheck
   */
  async getNextBtn() {
    showload(true)
    let result = await CheckBankStatusApi()
    showload(false)
    if (checkResult(result)) {
      if (result.data.isOpenAccount == 1) {
        //以开户用户，
        toast('开户成功')
        this.setState({ isShowShelter: true })
        setTimeout(() => {
          this.setState({ isShowShelter: false })
          finishPage()
        }, 1500)
      } else {
        //未开户
        this.openUser()
      }
    }
  }

  /**
   * 开户
   *
   * @memberof BankCheck
   */
  async openUser() {
    let { userBankCardId, mobileTel } = this.state.data
    let {
      yzcode,
      isbadIntegrity,
      beneficiaryIsSelf,
      beneficiary,
      beneficiaryIdNo,
      holdingIsSelf,
      holdIdNo
    } = this.state
    showload(true)
    let result = await BankInformationApi(
      userBankCardId,
      yzcode,
      mobileTel,
      isbadIntegrity,
      beneficiaryIsSelf,
      beneficiary,
      beneficiaryIdNo,
      holdingIsSelf,
      holdIdNo
    )
    showload(false)
    if (checkResult(result)) {
      let parm = {
        pathname: ROUTE_TRANSACTION_PSW,
        query: {
          userBankCardId: this.state.data.userBankCardId,
          to: this.state.to,
          from: this.state.from
        },
        state: {
          mobileTel: this.state.data.mobileTel
        }
      }
      //现场保存数据
      let lastState = {
        ...this.state,
        secondYzm: '获取验证码',
        isClicked: false,
        seconds: 60,
        successed: false
      }
      cot.set('bankCheck_data', JSON.stringify(lastState))
      hashHistory.push(parm)
    }
  }

  // 获取验证码
  yzmClick = () => {
    if (this.state.isClicked) {
      return
    }
    if (!this.state.data.mobileTel) {
      toast('请输入预留手机号')
      return
    }
    let reg = /^1\d{10}$/
    if (!reg.test(this.state.data.mobileTel)) {
      toast('请输入正确的手机号')
      return
    }
    this.getYZMData()
  }

  /**
   * 绑卡信息
   *
   * @memberof BankCheck
   */
  async getYZMData() {
    let { userBankCardId, mobileTel } = this.state.data
    showload(true)
    let result = await BankSendMsgApi(userBankCardId, mobileTel)
    showload(false)
    if (checkResult(result)) {
      this.timer = setInterval(() => {
        if (this.state.seconds - 1 == 0) {
          clearInterval(this.timer)
          this.setState({
            secondYzm: '获取验证码',
            isClicked: false,
            seconds: 60
          })
        } else {
          this.setState({
            secondYzm: `${this.state.seconds - 1}s`,
            isClicked: true,
            seconds: this.state.seconds - 1
          })
        }
      }, 1000)
      this.setState({
        successed: true,
        secondYzm: `${this.state.seconds}s`,
        isClicked: true
      })
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  _clearTxt = () => {
    this.setState({
      data: {
        ...this.state.data,
        mobileTel: ''
      }
    })
  }

  clicks = type => () => {
    //现场保存数据
    cot.set('bankCheck_data', JSON.stringify(this.state))
    switch (type) {
      case 0:
        this.state.data.agreementUrl2 &&
          hashHistory.push({
            pathname: ROUTE_IFRAME,
            query: {
              url: this.state.data.agreementUrl2,
              name: '支付服务协议'
            }
          })
        break
      case 1:
        this.state.data.agreementUrl &&
          hashHistory.push({
            pathname: ROUTE_IFRAME,
            query: {
              url: this.state.data.agreementUrl,
              name: '直销服务协议'
            }
          })
        break
    }
  }

  _changeConfrim = type => () => {
    if (type == 0) {
      if (this.state.confrimpay == 1) {
        this.setState({ confrimpay: 0 })
      } else {
        this.setState({ confrimpay: 1 })
      }
    } else if (type == 1) {
      if (this.state.confrim == 1) {
        this.setState({ confrim: 0 })
      } else {
        this.setState({ confrim: 1 })
      }
    } else if (type == 2) {
      if (this.state.isbadIntegrity == 1) {
        this.setState({ isbadIntegrity: 0 })
      } else {
        this.setState({ isbadIntegrity: 1 })
      }
    } else if (type == 3) {
      if (this.state.beneficiaryIsSelf == 1) {
        this.setState({ beneficiaryIsSelf: 0 })
      } else {
        this.setState({ beneficiaryIsSelf: 1 })
      }
    } else if (type == 4) {
      if (this.state.holdingIsSelf == 1) {
        this.setState({ holdingIsSelf: 0 })
      } else {
        this.setState({ holdingIsSelf: 1 })
      }
    }
  }

  // 手机号的监听事件
  inputChange = type => e => {
    let val = e.target.value.replace(/ /g, '')
    if (type == 0) {
      this.setState({
        data: {
          ...this.state.data,
          mobileTel: val
        }
      })
    } else if (type == 1) {
      this.setState({
        yzcode: val
      })
    } else if (type == 2) {
      this.setState({
        beneficiary: val
      })
    } else if (type == 3) {
      this.setState({
        beneficiaryIdNo: val
      })
    } else if (type == 4) {
      this.setState({
        holdingName: val
      })
    } else if (type == 5) {
      this.setState({
        holdIdNo: val
      })
    }
  }

  myBack = () => {
    cot && cot.remove('bankCheck_data')
    if (
      this.props.location.query.from &&
      this.props.location.query.from == 'wx'
    ) {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }

  render() {
    let {
      clientName,
      idNo,
      bankName,
      bankAccount,
      mobileTel,
      caifuUrl,
      xyUrl
    } = this.state.data
    let {
      secondYzm,
      isClicked,
      yzcode,
      beneficiaryIsSelf,
      beneficiary,
      beneficiaryIdNo,
      holdingIsSelf,
      holdingName,
      holdIdNo,
      isShowShelter
    } = this.state
    return (
      <div>
        <BackTitle
          titleName="身份信息确认"
          hasPostion={true}
          back={this.myBack}
          classname={this.state.className}
        />
        <Shelter isShow={isShowShelter} />
        <p className="info">您的身份和银行卡信息</p>
        <p className="trueNames">
          真实姓名<span className="trueName">{clientName}</span>
        </p>
        <p className="trueNames">
          身份证号<span className="trueName">{idNo}</span>
        </p>
        <p className="trueNames">
          银行名称<span className="trueName">{bankName}</span>
        </p>
        <p className="trueNames">
          银行卡号<span className="trueName">{bankAccount} </span>
        </p>
        <div className="telInput">
          <p className="left">
            预留手机
            <input
              className="trueName"
              type="tel"
              placeholder=""
              maxLength="11"
              value={mobileTel}
              onChange={this.inputChange(0)}
            />
          </p>
          <div className="right">
            <span className="delete-span" onClick={this._clearTxt}>
              <img src={require('../asset/icon_input_delete.png')} />
            </span>
            <CSPan
              className={isClicked ? 'secondYzm unsecondYzm' : 'secondYzm'}
              onClick={this.yzmClick}
            >
              {secondYzm}
            </CSPan>
          </div>
        </div>
        <p className="trueNames">
          短信验证码
          <input
            className="trueName"
            type="tel"
            placeholder="请输入验证码"
            maxLength="6"
            value={yzcode}
            onChange={this.inputChange(1)}
          />
        </p>
        <p className="radio-layout">
          交易控制人
          <span className="left-img" onClick={this._changeConfrim(4)}>
            <img
              src={
                holdingIsSelf == 1
                  ? require('../asset/icon_radio_checked.png')
                  : require('../asset/icon_radio_uncheck.png')
              }
            />
            本人
          </span>
          <span className="right-img" onClick={this._changeConfrim(4)}>
            <img
              src={
                holdingIsSelf == 1
                  ? require('../asset/icon_radio_uncheck.png')
                  : require('../asset/icon_radio_checked.png')
              }
            />
            非本人
          </span>
        </p>
        {holdingIsSelf == 0 ? (
          <p className="line-input shaw-top">
            <input
              placeholder="请填写身份证姓名"
              type="text"
              value={holdingName}
              onChange={this.inputChange(4)}
              maxLength={16}
            />
          </p>
        ) : (
          ''
        )}
        {holdingIsSelf == 0 ? (
          <p className="line-input">
            <input
              placeholder="请填写身份证号码"
              type="text"
              value={holdIdNo}
              onChange={this.inputChange(5)}
              maxLength={18}
            />
          </p>
        ) : (
          ''
        )}
        <p className="radio-layout">
          交易受益人
          <span className="left-img" onClick={this._changeConfrim(3)}>
            <img
              src={
                beneficiaryIsSelf == 1
                  ? require('../asset/icon_radio_checked.png')
                  : require('../asset/icon_radio_uncheck.png')
              }
            />
            本人
          </span>
          <span className="right-img" onClick={this._changeConfrim(3)}>
            <img
              src={
                beneficiaryIsSelf == 1
                  ? require('../asset/icon_radio_uncheck.png')
                  : require('../asset/icon_radio_checked.png')
              }
            />
            非本人
          </span>
        </p>
        {beneficiaryIsSelf == 0 ? (
          <p className="line-input shaw-top">
            <input
              placeholder="请填写身份证姓名"
              type="text"
              value={beneficiary}
              onChange={this.inputChange(2)}
              maxLength={16}
            />
          </p>
        ) : (
          ''
        )}
        {beneficiaryIsSelf == 0 ? (
          <p className="line-input">
            <input
              placeholder="请填写身份证号码"
              type="text"
              value={beneficiaryIdNo}
              onChange={this.inputChange(3)}
              maxLength={18}
            />
          </p>
        ) : (
          ''
        )}
        <p className="checksBad pt8">
          {' '}
          <span
            className={`confrim-place ${
              this.state.confrim ? 'confrim-pre' : 'confrim-nor'
            }`}
            onClick={this._changeConfrim(1)}
          />
          同意
          <span className="caifu" onClick={this.clicks(1)}>
            《盈信基金电子直销服务协议》
          </span>
        </p>
        <p className="checks">
          <span
            className={`confrim-place ${
              this.state.confrimpay ? 'confrim-pre' : 'confrim-nor'
            }`}
            onClick={this._changeConfrim(0)}
          />
          同意
          <span className="caifu" onClick={this.clicks(0)}>
            《深圳盈信基金销售有限公司快捷支付服务协议》
          </span>
        </p>
        <p className="checksBad pb8">
          <span
            className={`confrim-place ${
              this.state.isbadIntegrity ? 'confrim-nor' : 'confrim-pre'
            }`}
            onClick={this._changeConfrim(2)}
          />
          <span className="caifu">无不良记录</span>
        </p>
        <CDiv className="btn" onClick={this.next}>
          下一步
        </CDiv>
        <Copyright className={'mt30 mb20'} />
      </div>
    )
  }
}
