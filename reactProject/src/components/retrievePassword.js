import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import '../sass/retrievePassword.scss'
import Copyright from './common/copyright'
import toApi from '../common/api'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle
} from '../common/setToken'
import BaseComponent from './baseComponent'
import { checkResult, RetrieveTelApi, RetrievePswApi } from '../common/api/api'
import { ROUTE_TRANSACTION_PSW } from '../common/route/routeName'

export default class retrievePassword extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      clientName: '', //真实姓名
      idNo: '', //身份证号
      mobileTel: '', //手机号码
      empty0: '', //真实姓名的空位置
      empty1: '', //身份证号的正则校验位置
      empty2: '', //手机号码的正则校验位置
      clientNamebol: false, //真实姓名的bol
      idNobol: false, //身份证号的bol
      mobileTelbol: false //手机号码的bol值
    }
  }

  getTitle() {
    return '找回密码'
  }

  // 真实姓名的聚焦事件
  clientNameonFocus = e => {
    this.setState({
      empty0: ''
    })
  }
  // 真实姓名失焦事件
  clientNameBlur = e => {
    let val = e.target.value.replace(/ /g, '')
    // let len = val.length
    const reg = /^([\u4e00-\u9fa5]){2,7}$/
    const clientNamebol = false
    const clientName = this.state.clientName
    if (val == '') {
      this.setState({
        clientNamebol: false,
        empty0: '姓名不能为空'
      })
    } else if (!reg.test(val)) {
      this.setState({
        clientNamebol: false,
        empty0: '请输入您姓名全称'
      })
    } else {
      this.setState({
        clientNamebol: true,
        empty0: ''
      })
    }
  }
  // 真实姓名的监听事件
  clientNameChange = e => {
    this.setState({
      clientName: e.target.value.replace(/ /g, '')
    })
  }

  // 身份证号的聚焦事件
  idNoFocus = e => {
    this.setState({
      empty1: ''
    })
  }
  // 身份证号的失焦事件
  idNoBlur = e => {
    let val = e.target.value.replace(/ /g, '')
    let len = val.length
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    let idNobol = false
    let idNo = this.state.idNo
    if (val == '') {
      this.setState({
        idNobol: false,
        empty1: '身份证号不能为空'
      })
    } else if (!reg.test(val)) {
      this.setState({
        idNobol: false,
        empty1: '请输入正确的身份证号'
      })
    } else {
      this.setState({
        idNobol: true,
        empty1: ''
      })
    }
  }
  // 身份证号的监听事件
  idNoChange = e => {
    this.setState({
      idNo: e.target.value.replace(/ /g, '')
    })
  }
  componentDidMount() {
    this.RetrieveTelData()
  }

  /**
   *默认电话号码
   *
   * @memberof retrievePassword
   */
  async RetrieveTelData() {
    let result = await RetrieveTelApi()
    if (checkResult(result)) {
      this.setState({ mobileTel: result.data.mobileTel })
    }
  }

  // 找回密码按钮的点击事件
  backPwdClick = () => {
    if (!this.state.clientName) {
      toast('姓名不能为空')
      return
    }

    let nameReg = new RegExp('^([\u4e00-\u9fa5]){2,7}$', 'g')
    if (!nameReg.test(this.state.clientName)) {
      toast('请输入您姓名全称')
      return
    }

    if (!this.state.idNo) {
      toast('身份证号不能为空')
      return
    }

    let idNoReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!idNoReg.test(this.state.idNo)) {
      toast('请输入正确的身份证号')
      return
    }
    this.RetrievePswData()
  }

  /**
   * 找回密码
   *
   * @memberof retrievePassword
   */
  async RetrievePswData() {
    let { clientName, idNo, mobileTel } = this.state

    showload(true)
    let result = await RetrievePswApi(clientName, idNo)
    showload(false)
    if (checkResult(result)) {
      hashHistory.push({
        pathname: ROUTE_TRANSACTION_PSW,
        query: {
          from: 'forgetpwd'
        },
        state: {
          clientName: clientName,
          idNo: idNo,
          mobileTel: mobileTel
        }
      })
    }
  }

  render() {
    let { clientName, idNo, mobileTel, empty0, empty1, empty2 } = this.state
    return (
      <div className="retrievePassword">
        <BackTitle
          titleName="找回密码"
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <p className="safeVertical">身份安全验证</p>
        <p className="realNames">
          真实姓名
          <input
            type="text"
            value={clientName}
            placeholder="请输入您姓名全称"
            onChange={e => this.clientNameChange(e)}
            onFocus={e => this.clientNameonFocus(e)}
            onBlur={e => this.clientNameBlur(e)}
            maxLength="10"
          />
        </p>
        <p className="empty0">{empty0}</p>
        <p className="realNames">
          身份证号
          <input
            type="text"
            value={idNo}
            placeholder="请输入个人身份证号"
            onChange={e => this.idNoChange(e)}
            onFocus={e => this.idNoFocus(e)}
            onBlur={e => this.idNoBlur(e)}
            maxLength="18"
          />
        </p>
        <p className="empty1">{empty1}</p>
        <p className="realNames">
          手机号码
          <input
            type="tel"
            value={mobileTel}
            placeholder="请输入手机号"
            maxLength="11"
            readOnly
          />
        </p>
        <p className="empty2">{empty2}</p>

        <p className="backPwd" onClick={this.backPwdClick}>
          找回密码
        </p>
        <Copyright className={'mt30 mb20'} />
      </div>
    )
  }
}
