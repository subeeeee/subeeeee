/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-13 15:12:23
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-18 15:16:37
 * @Note 收益明细
 */

import React from 'react'
import { BackTitle } from './common/baseTitle'
import { showload } from './common/toast'
import SpaceRow from './common/SpaceRow'
import '../sass/income-details.scss'
import BaseComponent from './baseComponent'
import {
  FundDayIncomeListApi,
  GroupDayIncomeListApi,
  checkResult
} from '../common/api/api'

const FUNDTYPE_FUND = 0 //基金类型 单只基金
const FUNTTYPE_GROUP = 1 //基金类型 组合

class profitDetail extends BaseComponent {
  constructor(props) {
    super(props)

    this.fundType = this.getParam('fundType')
      ? this.getParam('fundType')
      : FUNDTYPE_FUND

    this.state = {
      maxVal: null, //最大值
      list: null, //列表
      fundCode: this.props.location.query.fundCode //基金代码
    }
  }

  getTitle() {
    return '收益明细'
  }

  componentWillMount = () => {
    this.setBackGroundColor('#eee')
    document.body.scrollTop = '0px'
    document.documentElement.scrollTop = '0px'
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  // 调接口
  componentDidMount() {
    this.getData()
  }

  /**
   * 获取数据
   *
   * @memberof profitDetail
   */
  async getData() {
    showload(true)
    let result = null
    if (this.fundType == FUNDTYPE_FUND) {
      result = await FundDayIncomeListApi(this.state.fundCode)
    } else {
      result = await GroupDayIncomeListApi(this.state.fundCode)
    }

    showload(false)

    if (checkResult(result)) {
      this.setState({
        maxVal: result.data.absMax,
        list: result.data.list
      })
    }
  }

  getWidth = (val, maxVal) => {
    val = Math.abs(val)
    maxVal = Math.abs(maxVal)
    if (val <= 0.4 * maxVal) {
      return '40%'
    }
    if (val == maxVal) {
      return 'auto'
    }
    if (val > 0.4 * maxVal && maxVal > val) {
      return (val / maxVal) * 100 + '%'
    }
  }

  getClass = val => {
    if (val == 0) {
      return ''
    } else if (val > 0) {
      return 'bgRed'
    } else {
      return 'bgGreen'
    }
  }

  handleNumSign = num => {
    let sign =
      typeof num == 'string' ? num.indexOf('-') : String(num).indexOf('-')
    if (parseFloat(num) == 0) {
      return num
    } else {
      if (sign >= 0) {
        return num
      } else {
        return '+' + num
      }
    }
  }

  handleChange = list => {
    if (list == '') {
      document.body.style.backgroundColor = '#fff'
      document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
    }
  }

  render() {
    const { list, maxVal } = this.state
    let miHeight = 0
    if (list && list.length > 0) {
      miHeight =
        document.documentElement.clientHeight -
        38 * list.length -
        44 -
        28 -
        (20 + 30)
      if (miHeight < 0) {
        miHeight = 20
      } else if (miHeight < 20) {
        miHeight = 20
      }
    }
    return (
      <div className="income-details">
        <BackTitle titleName={'收益明细'} hasPostion={true} />
        <SpaceRow h="14" />
        {list &&
          list.map((item, index) => {
            return (
              <div className="detail-li" key={index}>
                <div
                  className={this.getClass(item.income)}
                  style={{ width: this.getWidth(item.income, maxVal) }}
                >
                  <span>{item.incomeDate}</span>
                  <span>{this.handleNumSign(item.income)}</span>
                </div>
              </div>
            )
          })}
        <SpaceRow h="14" />
        <div
          className="no-data"
          style={{ display: !list || list.length == 0 ? 'flex' : 'none' }}
          onChange={this.handleChange(list)}
        >
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无收益明细</span>
        </div>
        {list && list.length > 0 ? (
          <div style={{ height: miHeight + 'px' }} />
        ) : (
          ''
        )}
        <div
          className="bottomText"
          style={{ display: list && list.length > 0 ? 'flex' : 'none' }}
        >
          <span />
          <span>只展示最近三月的收益明细</span>
          <span />
        </div>
      </div>
    )
  }
}

export default profitDetail
