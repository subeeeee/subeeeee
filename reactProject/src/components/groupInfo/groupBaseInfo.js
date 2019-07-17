/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-27 15:28:00
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-14 18:08:46
 * @Note 组合基本信息
 */
import React, { Component } from 'react'
import './groupInfo.scss'
import { PopWindow } from '../common/Multi'
import DialogConfirmBox from '../common/alertBox/DialogConfirmBox'

export default class GroupBaseInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowHelpDes: false //是否显示帮助信息
    }
  }

  clearOperator = v => {
    return v.replace('-', '')
  }

  /**
   * 显示符号数字
   *
   * @memberof GroupBaseInfo
   */
  showSignNum = num => {
    let sign = typeof num == 'string' ? num.indexOf('-') : String(num).indexOf('-')
    if (parseFloat(num) == 0) {
      return num
    } else {
      if (sign >= 0) {
        return num
      } else {
        return '+' + num
      }
    }
  }

  /**
   * 隐藏帮助
   *
   * @memberof GroupBaseInfo
   */
  hidePop = () => {
    this.setState({
      showPop: false
    })
  }

  /**
   * 显示帮助
   *
   * @memberof GroupBaseInfo
   */
  showPop = data => () => {
    this.setState({
      showPop: true,
      definContent: data
    })
  }

  /**
   * 显示help
   *
   * @memberof GroupBaseInfo
   */
  onShowHelp = () => {
    this.setState({ isShowHelpDes: true })
  }

  /**
   * 组件渲染
   *
   */
  render() {
    let {
      historyRatio, //累计收益
      establishHint, //累计收益说明
      historyMaxDrawDown, //最大回撤
      withdrawHint, //回撤说明
      sharp, //夏普比例
      sharpRatio, //夏普比例说明
      yieldRate, //收益
      dailyIncreases, //日涨幅
      groupNavDate, //净值日期
      groupNav, //净值
      risk, //风险类型
      starting //起投金额
    } = this.props

    let { showPop, definContent, isShowHelpDes } = this.state
    return (
      <div>
        <DialogConfirmBox
          isShow={this.state.isShowHelpDes}
          title={yieldRate.title}
          text={yieldRate.content}
          textAlign="justify"
          cancelCallBack={() => {
            this.setState({ isShowHelpDes: false })
          }}
        />
        <div className="group-base">
          <div className="head-left">
            <div className="head-title-l">
              <span>{yieldRate.name}</span>
              <img src={require('./images/question-des.png')} onClick={this.onShowHelp} />
            </div>

            <span
              className="head-value-l"
              style={
                yieldRate.ratio == 0
                  ? { color: '#909090' }
                  : yieldRate.ratio > 0
                  ? { color: '#fe3824' }
                  : { color: '#45b18b' }
              }>
              {yieldRate.ratio}%
            </span>
          </div>
          <div className="division-line" />

          <div className="head-right" onClick={withdrawHint && this.showPop(withdrawHint)}>
            <div className="head-right-v">
              <span className="head-title-r">日涨幅({groupNavDate})</span>
              <span
                className="head-value-r"
                style={
                  dailyIncreases == 0
                    ? { color: '#909090' }
                    : dailyIncreases > 0
                    ? { color: '#fe3824' }
                    : { color: '#45b18b' }
                }>
                {dailyIncreases}%
              </span>
            </div>
          </div>
        </div>
        <div className="riskAndMoney">
          <p className="riskType">{risk}</p>
          <p className="purchaseAmount">{starting}元起购</p>
        </div>
      </div>
    )
  }
}
