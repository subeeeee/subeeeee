/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-03-05 15:48:48
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-04-23 11:39:33
 * @Note 非交易日的说明
 */
import React, { Component } from 'react'
import './explain.scss'
import { Line, Line14, Line15 } from './Line'
import ReactDom from 'react-dom'

type Props = {
  title: string, //标题
  text: string, //文本
  cancelText: string, //取消按钮文本
  confirmText: string, //确定按钮文本
  cancelCallBack: null, //取消按钮
  isShow: false //是否显示
}

/**
 * 组件
 *
 * @export
 * @class DialogBox
 * @extends {Component}
 */
export default class explain extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      title: props.title || '',
      text: props.text || '',
      cancelText: props.cancelText || '',
      confirmText: props.confirmText || '',
      cancelCallBack: props.cancelCallBack || null,
      isShow: false
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
      isShow: nextProps.isShow,
      title: nextProps.title || '',
      text: nextProps.text || '',
      cancelText: nextProps.cancelText || '',
      confirmText: nextProps.confirmText || '',
      cancelCallBack: nextProps.cancelCallBack || null
    })

    if (this.dialogDom) {
      //截取移送事件

      this.dialogDom.ontouchmove = function(e) {
        e.preventDefault()
      }
    }
  }

  /**
   * dom回调
   *
   * @memberof Password
   */
  domCallBack = dom => {
    this.dialogDom = ReactDom.findDOMNode(dom)
    if (this.dialogDom) {
      //截取移送事件
      this.dialogDom.ontouchmove = function(e) {
        e.preventDefault()
      }
    }
  }

  /**
   * 关闭
   *
   * @memberof DialogBox
   */
  onClose = () => {
    this.setState({ isShow: false })
  }

  /**
   * 取消
   *
   * @memberof DialogBox
   */
  onCancel = () => {
    if (this.state.cancelCallBack) {
      this.state.cancelCallBack()
    } else {
      this.setState({ isShow: false })
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    const {
      isShow,
      title,
      text,
      cancelText,
      confirmText,
      cancelCallBack
      // confirmCallBack
    } = this.state
    return !isShow ? null : (
      <div
        className="dialog-box"
        style={{ display: 'flex' }}
        ref={this.domCallBack}
      >
        <div className="box-contents">
          <div className="topContent">
            <div className="box-title">{'扣款日期说明'}</div>
            <div className="box-text">{text}</div>
          </div>

          <div
            className="box-btns"
            style={{ backgroundColor: '#FFFFFF' }}
            onClick={this.onCancel}
          >
            确认
          </div>
        </div>
      </div>
    )
  }
}
