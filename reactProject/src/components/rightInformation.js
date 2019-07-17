import React from 'react'
import '../sass/rightInformation.scss'
import { BackTitle } from './common/baseTitle'
import { setToken, finishPage } from '../common/setToken'
import BaseComponent from './baseComponent'

export default class rightInformation extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#fff')

    this.state = {}
  }

  render() {
    return (
      <div className="rightInformation">
        <BackTitle
          titleName={'身份信息确认'}
          hasPostion={true}
          back={() => {
            finishPage()
          }}
        />
        <p className="perPic">
          <img src={require('../asset/perPic.png')} />
        </p>
        <p className="perText">您的支付问题已解决，请重新申购！</p>
        <p
          className="perSearch"
          onClick={() => {
            finishPage()
          }}>
          完成
        </p>
      </div>
    )
  }
}
