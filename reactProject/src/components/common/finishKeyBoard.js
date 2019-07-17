/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-04-03 16:01:40
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-04-19 15:13:17
 * @Note 有完成按钮的键盘
 */
import React, { Component } from 'react'
import '../../sass/common/finishKeyboard.scss'
import FastClick from 'react-fastclick-alt'

export default class finishKeyBoard extends React.Component {
  constructor(props) {
    super(props)
  }
  /**
   * 数字键盘的点击事件
   *
   * @memberof keyBoard
   */
  onClickNum = num => e => {
    e.stopPropagation()
    this.props.onInputNum && this.props.onInputNum(num)
  }
  /**
   * 删除按钮的点击事件
   *
   * @memberof keyBoard
   */
  detaleNum = e => {
    e.stopPropagation()
    this.props.delateNumber && this.props.delateNumber()
  }

  /**
   *完成按钮的点击事件
   *
   * @memberof finishKeyBoard
   */
  finishBtns = e => {
    e.stopPropagation()
    this.props.finishBtns && this.props.finishBtns()
  }

  /**
   * 点击键盘
   *
   * @memberof finishKeyBoard
   */
  clickKeyBoard = e => {
    e.stopPropagation()
    this.props.hide && this.props.hide()
  }

  /**
   * 组件渲染
   *
   */
  render() {
    if (this.props.display) {
      return (
        <FastClick>
          <div className="keyBoards" onClick={this.clickKeyBoard}>
            <div className="vKeyBorad">
              <p className="finishBtn" onClick={this.finishBtns}>
                完成
              </p>
              <ul className="firstRow">
                <li onClick={this.onClickNum(1)}>1</li>
                <li className="line" onClick={this.onClickNum(2)}>
                  2
                </li>
                <li onClick={this.onClickNum(3)}>3</li>
              </ul>
              <ul className="firstRow">
                <li onClick={this.onClickNum(4)}>4</li>
                <li className="line" onClick={this.onClickNum(5)}>
                  5
                </li>
                <li onClick={this.onClickNum(6)}>6</li>
              </ul>
              <ul className="firstRow">
                <li onClick={this.onClickNum(7)}>7</li>
                <li className="line" onClick={this.onClickNum(8)}>
                  8
                </li>
                <li onClick={this.onClickNum(9)}>9</li>
              </ul>
              <ul className="firstRow">
                <li className="clickDot" onClick={this.onClickNum('.')}>
                  <span>.</span>
                </li>
                <li className="line" onClick={this.onClickNum(0)}>
                  0
                </li>
                <li className="bg" onClick={this.detaleNum}>
                  <img src={require('../../asset/delateOne.png')} className="img" />
                </li>
              </ul>
            </div>
          </div>
        </FastClick>
      )
    } else {
      return null
    }
  }
}
