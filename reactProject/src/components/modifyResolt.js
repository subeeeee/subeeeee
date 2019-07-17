import React from 'react'
import '../sass/modifyResolt.scss'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import { setToken, changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'

export default class modifyResolt extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#fff')
    this.state = {}
  }

  getTitle() {
    return '个人信息修改结果'
  }

  //点击查看按钮返回到前一页
  rightBack = () => {
    hashHistory.goBack()
  }
  render() {
    return (
      <div className="modifyResolt">
        <BackTitle
          titleName={'个人信息修改结果'}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <p className="perPic">
          <img src={require('../asset/perPic.png')} />
        </p>
        <p className="perText">个人信息修改成功 ! </p>
        <p className="perSearch" onClick={this.rightBack}>
          查看
        </p>
      </div>
    )
  }
}
