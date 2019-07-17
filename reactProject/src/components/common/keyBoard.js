/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-19 18:44:02
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-03-13 16:13:51
 * @Note 键盘组件
 */
import React from 'react'
import '../../sass/common/keyBoard.scss'
import FastClick from 'react-fastclick-alt'
export default class keyBoard extends React.Component {
  constructor(props: any) {
    super(props)
  }

  /**
   * 数字键盘的点击事件
   *
   * @memberof keyBoard
   */
  onClickNum = num => () => {
    this.props.onInputNum && this.props.onInputNum(num)
  }
  /**
   * 删除按钮的点击事件
   *
   * @memberof keyBoard
   */
  detaleNum = () => {
    this.props.delateNumber && this.props.delateNumber()
  }
  /**
   * 组件渲染
   *
   */
  render() {
    if (this.props.display) {
      return (
        <FastClick>
          <div className="keyBoard" onClick={this.clickKeyBoard}>
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
              <li className="bg" />
              <li className="line" onClick={this.onClickNum(0)}>
                0
              </li>
              <li className="bg" onClick={this.detaleNum}>
                <img
                  src={require('../../asset/delateOne.png')}
                  className="img"
                />
              </li>
            </ul>
          </div>
        </FastClick>
      )
    } else {
      return null
    }
  }
}
