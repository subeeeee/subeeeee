/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-09-17 17:30:35
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-04-28 14:24:09
 * @Note 遮挡
 */

import React, { Component } from 'react'

import './shelter.scss'
import { Line, Line14, Line15 } from '../Line'
import ReactDom from 'react-dom'

type Props = {
  isShow: false //是否显示
}

/**
 * 组件
 *
 * @export
 * @class DialogBox
 * @extends {Component}
 */
export default class Shelter extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      isShow: this.props.isShow ? this.props.isShow : false
    }

    this.dialogDom = null
  }

  /**
   * 属性更新
   *
   * @memberof DialogBox
   */
  componentWillReceiveProps = nextProps => {
    this.setState({
      isShow: nextProps.isShow
    })

    // if (this.dialogDom) {
    //   //截取移送事件

    //   this.dialogDom.ontouchmove = function(e) {
    //     e.preventDefault()
    //   }
    // }
  }

  /**
   * dom回调
   *
   * @memberof Password
   */
  domCallBack = dom => {
    this.dialogDom = ReactDom.findDOMNode(dom)
    // if (this.dialogDom) {
    //   //截取移送事件
    //   this.dialogDom.ontouchmove = function(e) {
    //     e.preventDefault()
    //   }
    // }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    const { isShow } = this.state

    return !isShow ? null : (
      <div className="shelter" style={{ display: 'flex' }} ref={this.domCallBack} />
    )
  }
}
