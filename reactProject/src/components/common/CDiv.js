/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-08-10 15:07:40
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-10-23 14:35:13
 * @Note 带防重复点击的div
 */
import React, { Component } from 'react'

const CLICK_INTERVAL = 300 //点击间隔

/**
 * 组件
 *
 * @export
 * @class CButton
 * @extends {Component}
 */
export default class CDiv extends React.Component {
  /**
   * 组件属性类型
   *
   * @static
   */
  static propTypes = {}

  /**
   * 组件默认属性
   *
   * @static
   */
  static defaultProps = {}

  constructor(props: any) {
    super(props)

    this.lastClickTime = 0 //上次点击时间
  }

  /**
   * 点击事件 防止重复点击
   *
   * @memberof CButton
   */
  onClickEvent = () => {
    if (this.props.onClick) {
      let time = new Date().getTime()
      if (time - this.lastClickTime >= CLICK_INTERVAL) {
        this.lastClickTime = time

        this.props.onClick()
      }
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    return (
      <div {...this.props} onClick={this.onClickEvent}>
        {this.props.children}
      </div>
    )
  }
}
