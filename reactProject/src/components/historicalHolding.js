/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-08-31 15:45:42
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 17:03:18
 * @Note 历史持仓的数据展示页
 */
import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import toApi from '../common/api'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle
} from '../common/setToken'
import Copyright from './common/copyright'
import '../sass/historicalHolding.scss'
import { checkResult, HistoryShareApi } from '../common/api/api'
import { ROUTE_ASSET_DETAIL } from '../common/route/routeName'

export default class HistoricalHolding extends React.Component {
  constructor(props) {
    super(props)
    document.body.style.backgroundColor = '#EFEFF4'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#EFEFF4'
    document
      .getElementsByTagName('head')[0]
      .getElementsByTagName('title')[0].innerText = '历史持仓'

    if (props.location.query.token) {
      setToken(props.location.query.token)
    }
    if (props.location.query.version) {
      setAppVerion(props.location.query.version)
    }
    if (!isShowTitle()) {
      changeTitle('历史持仓')
    }
    this.state = {
      fundSharList: [] //历史持仓的数据
    }
  }
  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  /**
   *调接口
   *
   * @memberof HistoricalHolding
   */
  componentDidMount() {
    this.HistoryShareData()
  }

  /**
   * 历史持仓
   *
   * @memberof HistoricalHolding
   */
  async HistoryShareData() {
    showload(true)
    let result = await HistoryShareApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({
        ...result.data
      })
    }
  }
  //点击列表页
  _onFundGroup = item => () => {
    if (item.type == '1') {
      //大组合
      hashHistory.push({
        pathname: ROUTE_ASSET_DETAIL,
        query: {
          fundCode: item.fundCode,
          fundName: item.fundName
        }
      })
    } else if (item.type == '-1') {
      //慧牛宝
      // hashHistory.push(`/bao-detail?groupId=${item.groupId}&type=${item.type}`)
      hashHistory.push({
        pathname: ROUTE_ASSET_DETAIL,
        query: {
          groupId: item.groupId,
          type: item.type
        }
      })
    } else {
      //其他类型
    }
  }
  // /**
  //  *
  //  *遍历数组的方法
  //  * @memberof HistoricalHolding
  //  */
  _historyList(items, index) {
    return (
      <div>
        <div
          className={'group-div'}
          key={index}
          onClick={this._onFundGroup(items)}
        >
          <p className="text">{items.fundName}</p>
          <div className="group-name">
            <p className="p">
              <span className="label-text">金额：</span>
              <span className="asset-text">{items.worthValue}元</span>
            </p>
            <p className="p">
              <span className="label-text">昨日收益：</span>
              <span
                className={
                  'profit-text ' +
                  (parseFloat(items.todayIncome) > 0
                    ? ' red'
                    : parseFloat(items.todayIncome) < 0
                    ? 'green'
                    : ' gray')
                }
              >
                {this.handleNumSign(items.todayIncome)}元
              </span>
            </p>
          </div>
        </div>
        <p className="thin-line" />
      </div>
    )
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

  /**
   *
   *页面渲染
   * @returns
   * @memberof HistoricalHolding
   */
  render() {
    let { fundSharList } = this.state
    console.log(fundSharList)
    return (
      <div className="historicalHolding">
        <BackTitle
          titleName="历史持仓"
          hasPostion={true}
          from={this.props.location.query.from}
        />
        {fundSharList.map(this._historyList.bind(this))}
        {fundSharList && fundSharList.length == 0 ? (
          <div className="null-data">
            <img src={require('../asset/income-details-bg.png')} />
            <span>暂无历史持仓</span>
          </div>
        ) : (
          ''
        )}
        <Copyright className={'mt50 mb40'} />
      </div>
    )
  }
}
