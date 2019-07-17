/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-21 15:33:18
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-02-19 11:17:46
 * @Note 第一次设置交易密码
 */
import React from 'react'
import '../sass/firstSetPwdPage.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import KeyBoard from './common/keyBoard'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import DialogBox from './common/alertBox/DialogBox'
import { checkResult, newPassword } from '../common/api/api'
import { ROUTE_PSW_SEC_SET, ROUTE_PSW_INFO } from '../common/route/routeName'
import { finishPage } from '../common/setToken'

export default class firstSetPwdPage extends BaseComponent<Props> {
  constructor(props: any) {
    super(props)
    this.alterTradePwdIdentified = props.location.query.alterTradePwdIdentified
    this.state = {
      display: true, //键盘的显示与隐藏
      inputNum: '', //新输入的密码
      isShow: false //默认隐藏
    }
  }
  /**
   * 输入行为
   *
   * @memberof changePassword
   */
  onInputText = num => {
    //第一步：校验原来的密码长度
    // 第二步：拼接密码
    // 第三步：设置密码
    // 第四步：判断密码是否够六位 是请求接口 否
    let { inputNum } = this.state
    inputNum += String(num)
    this.setState(
      {
        inputNum: inputNum
      },
      () => {
        if (inputNum.length == 6) {
          this.getData()
        }
      }
    )
  }

  /**
   *
   *接口数据
   * @memberof firstSetPwdPage
   */
  async getData() {
    let inputNum = this.state.inputNum
    showload(true)
    let result = await newPassword(inputNum, this.alterTradePwdIdentified)
    showload(false)
    if (checkResult(result)) {
      hashHistory.push({
        pathname: ROUTE_PSW_SEC_SET,
        query: {
          alterTradePwdIdentified: this.alterTradePwdIdentified,
          inputNum: inputNum
        }
      })
    } else {
      if (result.code == '11002') {
        finishPage()
        this.setState({
          inputNum: ''
        })
      }
      this.setState({
        inputNum: ''
      })
    }
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
   *返回按钮的点击事件
   *
   * @memberof firstSetPwdPage
   */
  spBack = () => {
    this.setState({
      isShow: true
    })
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let pswlen = this.state.inputNum.length
    return (
      <div className="firstSetPwdPage">
        <BackTitle
          titleName={'设置交易密码'}
          hasPostion={true}
          back={this.spBack}
        />
        <DialogBox
          isShow={this.state.isShow}
          text={'您确定放弃修改密码吗？'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'确定'}
          cancelCallBack={() => {
            this.setState({ isShow: false })
          }}
          confirmCallBack={() => {
            finishPage()
          }}
        />
        <p className="verification">请设置6位数字交易密码</p>
        <p className="requirement">不能含有3个连续相同,或3个以上的连续数字</p>
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
        <KeyBoard
          onInputNum={this.onInputText}
          delateNumber={this.delateNumbers}
          display={this.state.display}
        />
      </div>
    )
  }
}
