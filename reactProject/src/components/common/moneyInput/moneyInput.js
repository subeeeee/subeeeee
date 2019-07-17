/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2019-06-11 11:43:24
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-06-12 18:37:14
 * @Note 金额输入框
 */

import React, { Component } from 'react'
import { InputItem } from 'antd-mobile'
import './moneyInput.scss'
import { toast } from '../toast'

export default class MoneyInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue || ''
    }
  }

  /**
   * 完成
   *
   * @memberof MoneyInput
   */
  onClickFinish = () => {
    this.hideKeyBoard()
    this.props.onClickFinish && this.props.onClickFinish()
  }

  /**
   * 引用
   *
   * @memberof MoneyInput
   */
  onRef = ref => {
    this.inputRef = ref
  }

  /**
   * 校验金额
   *
   * @param {*} value 金额
   * @returns
   * @memberof MoneyInput
   */
  checkMoney(value) {
    //方法1
    value = value.replace(/[^\d.]/g, '')
    //必须保证第一位为数字而不是.
    value = value.replace(/^\./g, '')
    //保证只有出现一个.而没有多个.
    value = value.replace(/\.{2,}/g, '.')
    // 判断小数点后保留两位
    if (value.indexOf('.') != -1 && value.length > value.indexOf('.') + 2 + 1) {
      value = value.substring(0, value.indexOf('.') + 2 + 1)
    }

    if (this.props.maxLength && value.length > this.props.maxLength) {
      return this.state.value
    }

    //保证.只出现一次，而不能出现两次以上
    value = value
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
    return value
  }

  /**
   * 隐藏键盘
   *
   * @memberof MoneyInput
   */
  hideKeyBoard() {
    this.inputRef && this.inputRef.inputRef && this.inputRef.inputRef.onKeyboardClick('hide')
  }

  /**
   * 显示键盘
   *
   * @memberof MoneyInput
   */
  showKeyBoard() {
    this.inputRef && this.inputRef.focus()
  }

  /**
   * text改变
   *
   * @param {*} text
   */
  onChange = text => {
    text = this.checkMoney(text)

    this.setState({ value: text }, () => {
      this.props.onChange && this.props.onChange(text)
    })
  }

  /**
   * 属性改变
   *
   * @param {*} newProps
   * @memberof MoneyInput
   */
  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value != this.state.value) {
      this.setState({ value: newProps.value })
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    return (
      <InputItem
        {...this.props}
        ref={this.onRef}
        style={{ width: '100%' }}
        value={this.state.value}
        onChange={this.onChange}
        type="money"
        moneyKeyboardAlign="left"
        moneyKeyboardHeader={
          <div className="vConfirm">
            <div className="vConfirmRow">
              <p className="tvConfirm" onClick={this.onClickFinish}>
                完成
              </p>
            </div>
          </div>
        }
      />
    )
  }
}
