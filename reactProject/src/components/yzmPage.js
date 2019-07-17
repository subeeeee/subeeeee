import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import '../sass/yzmPage.scss'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import Copyright from './common/copyright'
import { setToken, changeTitle } from '../common/setToken'
import CP from './common/CP'
import BaseComponent from './baseComponent'
import {
  checkResult,
  PowerNoteVerifyApi,
  PowerSendMsgApi
} from '../common/api/api'
import { ROUTE_RIGHT_INFO } from '../common/route/routeName'
export default class yzmPage extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      tel: (props.location.state && props.location.state.mobileTel) || '', //电话号码
      secondYzm: '获取验证码', //获取验证码
      isClicked: false, //点击获取验证码的变量
      seconds: 60, //秒数
      unsecondYzm: '', //
      yzm: '', //发送的验证码
      userBankCardId:
        (props.location.state && props.location.state.userBankCardId) || '', //用户id
      fromIdentityInformation:
        (props.location.state &&
          props.location.state.fromIdentityInformation) ||
        '',
      successed: false //成功获取验证码
    }
    this.timer = null
  }

  componentDidMount() {
    if (this.state.fromIdentityInformation == 1) {
      this.setState({ successed: true, fromIdentityInformation: 0 })

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
            secondYzm: this.state.seconds - 1 + 's后重新发送',
            isClicked: true,
            seconds: this.state.seconds - 1
          })
        }
      }, 1000)

      this.setState({
        secondYzm: this.state.seconds + 's后重新发送',
        isClicked: true,
        fromBankCheck: 0
      })
    }
  }
  // input框的监听事件
  changeYzm = e => {
    let obj = e.target.value.replace(/\D/g, '')
    this.setState({
      yzm: obj
    })
  }

  // 下一步按钮的点击事件
  _clicks = () => {
    if (!this.state.successed) {
      toast('请先成功获取验证码')
      return
    }
    if (this.state.yzm == '') {
      toast('验证码不能为空')
    } else {
      this.PowerNoteVerifyData()
      // showload(true)
      // toApi
      //   .nextPage({
      //     userBankCardId: this.state.userBankCardId,
      //     authcode: this.state.yzm
      //   })
      //   .then(data => {
      //     showload(false)
      //     console.log(data)
      //     if (data.status == 0) {
      //       let parm = {
      //         pathname: '/rightInformation'
      //       }
      //       hashHistory.push(parm)
      //     } else {
      //       toast(data.msg)
      //     }
      //   })
    }
  }

  /**
   *  申购失败时获取验证码的下一步按钮
   *
   * @memberof yzmPage
   */
  async PowerNoteVerifyData() {
    let { userBankCardId, yzm } = this.state
    showload(true)
    let result = await PowerNoteVerifyApi(userBankCardId, yzm)
    showload(false)
    if (checkResult(result)) {
      let parm = {
        pathname: ROUTE_RIGHT_INFO
      }
      hashHistory.push(parm)
    }
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  // 获取验证码按钮的点击事件
  yzmClick = () => {
    if (this.state.isClicked) return
    this.PowerSendMsgData()
    // showload(true)
    // toApi.yzmPage({ userBankCardId: this.state.userBankCardId }).then(data => {
    //   showload(false)
    //   console.log(data)
    //   if (data.status == 0) {
    //     toast(data.msg)
    //     this.setState({ ...data.data, successed: true })

    //     this.timer = setInterval(() => {
    //       if (this.state.seconds - 1 == 0) {
    //         clearInterval(this.timer)
    //         this.setState({
    //           secondYzm: '获取验证码',
    //           isClicked: false,
    //           seconds: 60
    //         })
    //       } else {
    //         this.setState({
    //           secondYzm: this.state.seconds - 1 + 's后重新发送',
    //           isClicked: true,
    //           seconds: this.state.seconds - 1
    //         })
    //       }
    //     }, 1000)

    //     this.setState({
    //       secondYzm: this.state.seconds + 's后重新发送',
    //       isClicked: true
    //     })
    //   } else {
    //     toast(data.msg)
    //   }
    // })
  }

  /**
   *申购失败时获取验证码的接口
   *
   * @memberof yzmPage
   */
  async PowerSendMsgData() {
    let userBankCardId = this.state.userBankCardId
    showload(true)
    let result = await PowerSendMsgApi(userBankCardId)
    showload(false)
    if (checkResult(result)) {
      this.setState({ ...result.data, successed: true })

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
            secondYzm: this.state.seconds - 1 + 's后重新发送',
            isClicked: true,
            seconds: this.state.seconds - 1
          })
        }
      }, 1000)

      this.setState({
        secondYzm: this.state.seconds + 's后重新发送',
        isClicked: true
      })
    }
  }

  render() {
    let { tel, secondYzm, isClicked, seconds, yzm } = this.state
    return (
      <div className="yzmPage">
        <BackTitle titleName={'验证银行卡信息'} hasPostion={true} />
        <p className="verificationCode">
          请输入
          {tel}
          收到的6位短信验证码
        </p>
        <p className="ipts">
          <input
            type="tel"
            placeholder="请输入验证码"
            className="yzm"
            maxLength="6"
            value={yzm}
            onChange={this.changeYzm}
          />
          <CP
            className={isClicked ? 'secondYzm unsecondYzm' : 'secondYzm'}
            onClick={this.yzmClick}
          >
            {secondYzm}
          </CP>
        </p>
        <p className="huiYzm">
          *此验证码确认为本人使用，切勿向他人泄露，以免造成资金损失
        </p>
        <div className="finish" onClick={this._clicks}>
          下一步
        </div>
        <Copyright className={'mt30 mb20'} />
      </div>
    )
  }
}
