/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-09-17 17:30:35
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-09-27 20:19:05
 * @Note 待选择框对话框
 */

import React, { Component } from 'react'
import './dialogBox.scss'
import { Line, Line14, Line15 } from '../Line'
import CheckBox from '../checkBox/checkBox'
import { toast } from '../toast'
import ReactDom from 'react-dom'

type Props = {
  title: string, //标题
  text: string, //文本
  textStyle: null, //文本样式
  cancelText: string, //取消按钮文本
  confirmText: string, //确定按钮文本
  cancelCallBack: null, //取消按钮
  confirmCallBack: null, //确定按钮
  isShow: false, //是否显示
  checkText: string //选择框文本
}

/**
 * 组件
 *
 * @export
 * @class DialogCheckBox
 * @extends {Component}
 */
export default class DialogCheckBox extends Component<Props> {
  constructor(props: any) {
    super(props)

    this.state = {
      title: props.title || '',
      text: props.text || '',
      textStyle: props.textStyle || null,
      cancelText: props.cancelText || '',
      confirmText: props.confirmText || '',
      cancelCallBack: props.cancelCallBack || null,
      confirmCallBack: props.confirmCallBack || null,
      isShow: false,
      checkText: props.checkText || '',
      checked: true
    }
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
      textStyle: nextProps.textStyle || null,
      checkText: nextProps.checkText || '',
      cancelText: nextProps.cancelText || '',
      confirmText: nextProps.confirmText || '',
      cancelCallBack: nextProps.cancelCallBack || null,
      confirmCallBack: nextProps.confirmCallBack || null
    })

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
    this.state.cancelCallBack && this.state.cancelCallBack()
  }

  /**
   * 确认
   *
   * @memberof DialogBox
   */
  onConfirm = () => {
    if (!this.state.checked) {
      toast('请勾选选择框')
      return
    }
    this.state.confirmCallBack && this.state.confirmCallBack()
  }

  /**
   * 改变 check
   *
   * @memberof DialogCheckBox
   */
  onChangeCheck = check => {
    this.setState({ checked: check })
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
      checkText,
      cancelCallBack,
      confirmCallBack,
      textStyle,
      checked
    } = this.state
    return !isShow ? null : (
      <div
        className="dialog-box"
        style={{ display: 'flex' }}
        ref={this.domCallBack}>
        >
        <div className="box-content">
          {/* <img
            className="close-btn"
            src={require('./images/active-close.png')}
            onClick={this.onClose}
          /> */}
          <div className="box-title">{title == '' ? '温馨提示' : title}</div>

          <Line />

          <div className="box-text" style={textStyle}>
            {text}
          </div>

          <div className="check-opt">
            <CheckBox
              check={checked}
              style={{ margin: '8px' }}
              onChangeCheck={this.onChangeCheck}
            />
            <p className="checkText"> {checkText}</p>
          </div>

          <div className="opt-layout">
            <div
              className="box-btn"
              style={{ backgroundColor: '#E6E6E6', color: '#909090' }}
              onClick={this.onCancel}>
              {cancelText == '' ? '取消' : cancelText}
            </div>
            <div
              className="box-btn"
              style={{ backgroundColor: '#1C82DE', color: '#FFFFFF' }}
              onClick={this.onConfirm}>
              {confirmText == '' ? '确认' : confirmText}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
