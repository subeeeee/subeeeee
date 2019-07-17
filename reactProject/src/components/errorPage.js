import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import '../sass/errorPage.scss'
import {
  changeTitle,
  isShowTitle,
  finishPage,
  setToken,
  setAppVerion
} from '../common/setToken'
import { BackTitle } from './common/baseTitle'
import BaseComponent from './baseComponent'

export default class ErrorPage extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.state = {
      msg: props.location.query.msg || '授权登录出问题了'
    }
  }
  // 点击返回按钮的函数
  clickBack = () => {
    finishPage()
  }

  getTitle() {
    return '温馨提示'
  }

  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  render() {
    return (
      <div className="errorPage">
        <BackTitle
          titleName="温馨提示"
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <p className="pic">
          <img src={require('../asset/error.png')} />
        </p>
        <p className="question">{this.state.msg}</p>
        <p className="returns" onClick={this.clickBack}>
          返回
        </p>
      </div>
    )
  }
}
