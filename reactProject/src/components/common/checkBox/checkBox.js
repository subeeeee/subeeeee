/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-09-03 17:44:31
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-09-04 14:41:59
 * @Note 选择框组件
 */

import React, { Component } from 'react'
import './checkBox.scss'

//属性定义，对外提供属性
type Props = {
  check: true, //是否选择
  style: null, //样式
  onChangeCheck: null //选择框发生改变
}

/**
 * 组件
 *
 * @export
 * @class CheckBox
 * @extends {Component}
 */
export default class CheckBox extends Component {
  constructor(props: any) {
    super(props)
    let check = props.check //是否选择

    this.state = {
      check: check //当前是否选择状态
    }

    this.style = props.style //样式

    this.onChangeCheck = props.onChangeCheck //选择框回调
  }

  /**
   * 点击选择框
   *
   * @memberof CheckBox
   */
  onClickCheck = () => {
    let currentCheck = this.state.check
    this.setState({ check: !currentCheck })
    // 回调选择框改变
    if (this.onChangeCheck) {
      this.onChangeCheck(!currentCheck)
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    return (
      <div className="checkBox" style={this.style}>
        <img
          className="confrim-place"
          src={
            this.state.check
              ? require('../../asset/checked.png')
              : require('../../asset/unchecked.png')
          }
          onClick={this.onClickCheck}
        />
      </div>
    )
  }
}
