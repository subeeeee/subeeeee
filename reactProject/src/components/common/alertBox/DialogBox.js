/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-09-17 17:30:35
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-10 11:03:28
 * @Note 对话框
 */

import React, { Component } from 'react'

import './dialogBox.scss'
import { Line, Line14, Line15 } from '../Line'
import ReactDom from 'react-dom'

type Props = {
  title: string, //标题
  text: string, //文本
  cancelText: string, //取消按钮文本
  confirmText: string, //确定按钮文本
  cancelCallBack: null, //取消按钮
  confirmCallBack: null, //确定按钮
  isShow: false, //是否显示
  textAlign: string //文本对齐方式
}

/**
 * 组件
 *
 * @export
 * @class DialogBox
 * @extends {Component}
 */
export default class DialogBox extends Component<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      title: props.title || '',
      text: props.text || '',
      cancelText: props.cancelText || '',
      confirmText: props.confirmText || '',
      cancelCallBack: props.cancelCallBack || null,
      confirmCallBack: props.confirmCallBack || null,
      isShow: false,
      extAlign: null
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
      cancelCallBack: nextProps.cancelCallBack || null,
      confirmCallBack: nextProps.confirmCallBack || null,
      textAlign: nextProps.textAlign || null
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
   * 确认
   *
   * @memberof DialogBox
   */
  onConfirm = () => {
    this.state.confirmCallBack && this.state.confirmCallBack()
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
      cancelCallBack,
      confirmCallBack,
      textAlign
    } = this.state
    return !isShow ? null : (
      <div
        className="dialog-box"
        style={{ display: 'flex' }}
        ref={this.domCallBack}
      >
        <div className="box-content">
          <div className="box-title">{title == '' ? '温馨提示' : title}</div>
          <Line />
          <div
            className="box-text"
            dangerouslySetInnerHTML={{
              __html: text
            }}
            style={textAlign ? { textAlign: textAlign } : null}
          />
          <div className="opt-layout">
            <div
              className="box-btn"
              style={{ backgroundColor: '#E6E6E6', color: '#909090' }}
              onClick={this.onCancel}
            >
              {cancelText == '' ? '取消' : cancelText}
            </div>
            <div
              className="box-btn"
              style={{ backgroundColor: '#1C82DE', color: '#FFFFFF' }}
              onClick={this.onConfirm}
            >
              {confirmText == '' ? '确认' : confirmText}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
