import React from 'react'
import '../sass/yxFundDetail.scss'
import { Link } from 'react-router'
import { BackTitle } from './common/baseTitle'
import { changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'

export default class yxFundDetail extends BaseComponent {
  constructor(props) {
    super(props)
  }

  getTitle() {
    return '盈信基金'
  }

  render() {
    return (
      <div>
        <BackTitle
          titleName="盈信基金"
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <div className="yxFundDetail">
          <div className="dian">
            <img src={require('../asset/question_dian.png')} />
            盈信基金简介
          </div>
          <div className="certificate">
            <img src={require('../asset/yx-1.png')} />
          </div>
          <div className="businessLicense">
            <img src={require('../asset/yx-2.png')} />
          </div>
          <div className="FundDetailFoot">
            <span>服务电话：4007-903-688</span>
            <span>官网：http://www.fundying.com</span>
            <span>
              <Link className="toyxNotice" to={`/noticeofRights`}>
                投资人权益须知
              </Link>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
