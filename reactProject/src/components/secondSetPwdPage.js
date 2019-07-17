/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-21 17:50:06
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-02-20 10:17:32
 * @Note 校验密码
 */
import React from 'react'
import '../sass/secondSetPwdPage.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import KeyBoard from './common/keyBoard'
import { toast, showload } from './common/toast'
import { checkResult, secondNewPassword } from '../common/api/api'
import { setToken, finishPage } from '../common/setToken'
import { ROUTE_PSW_FIRST_SET } from '../common/route/routeName'
import { routeGoBack } from '../common/route/routeAction'
export default class secondSetPwdPage extends BaseComponent<Props> {
  constructor(props: any) {
    super(props)

    this.alterTradePwdIdentified = this.getParam('alterTradePwdIdentified')
    this.firstPwd = this.getParam('inputNum')

    this.state = {
      display: true, //键盘的显示与隐藏
      inputNum: '' //二次输入的密码
    }
  }
  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  /**
   * 输入行为
   *
   * @memberof changePassword
   */
  onInputText = num => {
    let { inputNum } = this.state
    if (inputNum.length == 6) {
      return
    }
    inputNum += String(num)
    this.setState(
      {
        inputNum: inputNum
      },
      () => {
        if (inputNum.length == 6 && this.state.inputNum != this.firstPwd) {
          toast('两次密码不一致')
          routeGoBack()
          this.setState({
            inputNum: ''
          })
        }
      }
    )
  }

  /**
   * 键盘的删除事件
   *
   * @memberof changePassword
   */
  delateNumbers = () => {
    let inputNum = this.state.inputNum
    let inpurnumbers = String(inputNum)
    if (inputNum.length !== 0) {
      let strlen = inpurnumbers.substring(0, inputNum.length - 1)
      this.setState({ inputNum: strlen })
      return
    }
  }
  /**
   *空白区域的点击键盘隐藏
   *
   * @memberof changePassword
   */
  emptyBoxUnShow = () => {
    let display = this.state.display
    this.setState({
      display: !display
    })
  }
  /**
   * ul区域点击键盘显示
   *
   * @memberof changePassword
   */
  emptyBoxShow = () => {
    let display = this.state.display
    this.setState({
      display: true
    })
  }
  /**
   * 完成按钮的点击事件
   *
   * @memberof secondSetPwdPage
   */
  clickFinish = () => {
    if (this.state.inputNum == this.firstPwd) {
      this.getData()
    } else {
      toast('两次密码不一致')
      routeGoBack()
      this.setState({
        inputNum: ''
      })
    }
  }
  async getData() {
    let inputNum = this.state.inputNum
    showload(true)
    let result = await secondNewPassword(inputNum, this.alterTradePwdIdentified)
    showload(false)
    if (checkResult(result)) {
      toast('修改成功')
    }
    setTimeout(() => {
      finishPage()
      this.setState({
        inputNum: ''
      })
    }, 2000)
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let pswlen = this.state.inputNum.length
    return (
      <div className="secondSetPwdPage">
        <BackTitle
          titleName={'设置交易密码'}
          hasPostion={true}
          from={this.props.location.query.from}
        />

        <p className="verification">请再次输入密码</p>
        <div>
          <ul className="pwdInput" onClick={this.emptyBoxShow}>
            <li>{pswlen >= 1 ? <span /> : null}</li>
            <li>{pswlen >= 2 ? <span /> : null}</li>
            <li>{pswlen >= 3 ? <span /> : null}</li>
            <li>{pswlen >= 4 ? <span /> : null}</li>
            <li>{pswlen >= 5 ? <span /> : null}</li>
            <li>{pswlen >= 6 ? <span /> : null}</li>
          </ul>
        </div>
        <div className="emptyBox" onClick={this.emptyBoxUnShow} />
        {this.state.inputNum == this.firstPwd && pswlen == 6 ? (
          <p className="finishBtnBlue" onClick={this.clickFinish}>
            完成
          </p>
        ) : (
          <p className="finishBtn">完成</p>
        )}

        <KeyBoard
          onInputNum={this.onInputText}
          delateNumber={this.delateNumbers}
          display={this.state.display}
        />
      </div>
    )
  }
}
