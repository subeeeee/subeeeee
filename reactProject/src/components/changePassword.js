/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-19 18:03:53
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-04-28 14:16:45
 * @Note 修改交易密码
 */
import React from 'react'
import '../sass/changePassword.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import Copyright from './common/copyright'
import KeyBoard from './common/keyBoard'
import { toast, showload } from './common/toast'
import DialogBox from './common/alertBox/DialogBox'
import { checkResult, oldPassword } from '../common/api/api'
import { ROUTE_PSW_FIRST_SET, ROUTE_RETRIEVE_PSW } from '../common/route/routeName'

export default class changePassword extends BaseComponent<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      inputNum: '', //密码
      isShow: false, //超过次数的变量
      display: true //键盘的显示与隐藏
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
    let inputNum = this.state.inputNum
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
  async getData() {
    let inputNum = this.state.inputNum
    let tradePwdOld = inputNum
    showload(true)
    let result = await oldPassword(tradePwdOld)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      hashHistory.push({
        pathname: ROUTE_PSW_FIRST_SET,
        query: {
          alterTradePwdIdentified: result.data.alterTradePwdIdentified
        }
      })
    } else {
      if (result.code == '11001') {
        this.setState({ isShow: true })
      } else {
        this.setState({
          inputNum: ''
        })
      }
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
   * 组件渲染
   *
   */
  render() {
    let pswlen = this.state.inputNum.length

    return (
      <div className="changePassword">
        <BackTitle
          titleName={'修改交易密码'}
          hasPostion={true}
          from={this.props.location.query.from}
        />

        <p className="verification">请输入旧密码以验证身份</p>
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
        <DialogBox
          isShow={this.state.isShow}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ isShow: false, inputNum: '' })
          }}
          confirmCallBack={() => {
            hashHistory.push({
              pathname: ROUTE_RETRIEVE_PSW,
              query: {
                fundCode: this.state.fundCode
              }
            })
          }}
        />
      </div>
    )
  }
}
