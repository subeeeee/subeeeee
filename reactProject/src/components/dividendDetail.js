/**
 * Created by ihavedream on 17/11/14.
 */
import React from 'react'
import { hashHistory } from 'react-router'
import ajax from '../common/api'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import '../sass/dividendDetail.scss'
import { setToken, changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'
import { checkResult, BonusDetailApi } from '../common/api/api'

class DividendDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')

    this.state = {
      value: null, //单位值
      unit: null, //单位
      name: null, //名字
      bonusTypeName: null, //分红方式的名字
      bonusDate: null //发放日期
    }
  }

  componentDidMount() {
    this.getData()
  }

  /**
   *分红详情的数据
   *
   * @memberof DividendDetail
   */
  async getData() {
    const { bonusId } = this.props.location.query
    showload(true)
    let result = await BonusDetailApi(bonusId)
    showload(false)
    if (checkResult(result)) {
      this.setState({ ...result.data })
    }
  }

  getTitle() {
    return '分红详情'
  }

  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  render() {
    let { unit, value, name, fundName, bonusTypeName, bonusDate } = this.state

    return (
      <div className="fh-detail">
        <BackTitle titleName={'分红详情'} hasPostion={true} />
        <div className="my-count">
          <div className="unit">
            单位(
            {unit})
          </div>
          {value && <div className="num">{value}</div>}
          <div className="name">{name}</div>
        </div>
        <div className="line1px" />
        <div className="line10px" />
        <div className="line1px" />
        <div className="text-row">
          <span>分红方式</span>
          <span>{bonusTypeName}</span>
        </div>
        <div className="line1px" />
        <div className="text-row">
          <span>发放日期</span>
          <span>{bonusDate}</span>
        </div>
        <div className="line1px" />
        <div className="space20px" />
      </div>
    )
  }
}

export default DividendDetail
