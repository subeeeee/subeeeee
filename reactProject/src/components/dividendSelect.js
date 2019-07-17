/*
 * @Author: Jone.Lin
 * @Date: 2018-05-30 18:23:58
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-01-08 13:54:11
 * @Note 修改分红方式页面
 */

import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import toApi from '../common/api'
import AlertBox from './common/alert-box'
import { toast, showload } from './common/toast'
import { changeTitle, isShowTitle } from '../common/setToken'
import '../sass/dividendSelect.scss'
import DefineVal from '../common/defineVal'
import Password from './common/Password'
import { Dialog } from './common/dialog'
import BaseComponent from './baseComponent'
import DialogBox from './common/alertBox/DialogBox'
import { checkResult, SetBonusTypeApi } from '../common/api/api'
import { ROUTE_RETRIEVE_PSW } from '../common/route/routeName'

export default class DividendSelect extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.state = {
      bonusType: props.location.query.bonusType, //分红方式
      bonusList:
        (props.location.state && props.location.state.bonusTypeList) || [], //分红列表
      showPwd: false, //显示密码
      dialogShow: false, //分红弹框的显示与隐藏
      isShow: false //显示框的变量
    }
    this.pwd = ''
    this.willType = null
    this.willName = null
    this.fundCode = props.location.query.fundCode
  }

  getTitle() {
    return '修改分红方式'
  }

  /**
   * 选择分红方式
   *
   * @memberof DividendSelect
   */
  onClickDividendType = (type, name) => () => {
    //相同类型不处理
    if (this.state.bonusType == type) {
      return
    }
    this.willType = type
    this.willName = name
    this.setState({
      dialogShow: true
    })
  }

  /**
   * 设置分红方式
   *
   * @memberof DividendSelect
   */
  onSetBonusType = type => {
    this.getData()
  }

  /**
   *
   *  修改分红方式的接口数据
   * @memberof DividendSelect
   */
  async getData() {
    showload(true)
    let result = await SetBonusTypeApi(this.fundCode, this.willType, this.pwd)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      hashHistory.goBack()
    } else {
      if (result.data.loadPassword == 0 && result.code == '11001') {
        this.setState({ isShow: true })
      }
    }
  }
  /**
   * 输入交易秘密
   *
   * @memberof DividendSelect
   */
  onShowPassword = () => {
    this.pwd = ''
    this.setState({
      showPwd: true
    })
  }

  /**
   * 密码输入完成
   *
   * @memberof DividendSelect
   */
  onEndPwd = value => {
    this.pwd = value
    this.setState({
      showPwd: false
    })
    this.onSetBonusType(this.willType)
  }
  /**
   *隐藏密码输入框
   *
   * @memberof DividendSelect
   */
  onHidePwd = () => {
    this.setState({
      showPwd: false
    })
  }
  /**
   * 渲染分红方式
   *
   * @memberof DividendSelect
   */
  renderGroupItem = (item, index) => {
    return (
      <div>
        <div
          className="content"
          onClick={this.onClickDividendType(item.value, item.name)}
        >
          <p
            className={`confrim-place ${
              item.value == this.state.bonusType ? 'confrim-pre' : 'confrim-nor'
            }`}
          />
          <div className="text-body">
            <p className="text-bonus">{item.name}</p>
            <p className="text-include">{item.describe}</p>
          </div>
        </div>
        <div className="line10" />
      </div>
    )
  }

  render() {
    return (
      <div className="dividend-main">
        <BackTitle titleName={'修改分红方式'} hasPostion={true} />
        <Dialog
          isShow={this.state.dialogShow}
          textSize={'14px'}
          text={
            '您正在将分红方式修改为“' +
            this.willName +
            '"，分红方式修改确认前不能再次修改'
          }
          title={'温馨提示'}
          canceltext={'取消'}
          btntext={'确定'}
          hide={() => {
            this.setState({ dialogShow: 0 })
          }}
          next={this.onShowPassword}
        />
        <DialogBox
          isShow={this.state.isShow}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ isShow: false })
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
        <Password
          show={this.state.showPwd}
          onEnd={this.onEndPwd}
          onHide={this.onHidePwd}
        />
        {this.state.bonusList.map(this.renderGroupItem)}
      </div>
    )
  }
}
