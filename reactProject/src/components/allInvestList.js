/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-03-04 16:54:15
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 14:22:34
 * @Note 定投总列表
 */

import React, { Component } from 'react'
import '../sass/allInvestList.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import { fundProtocolListApi, checkResult } from '../common/api/api'
import { routePush } from '../common/route/routeAction'
import { ROUTE_FIXRD_INVEST_DETAILL } from '../common/route/routeName'

const STATUS_INVEST_DOING = 1 //定投中
const STATUS_SUSPEND = 2 //暂停
const STATUS_TERMINATION = 3 //终止
const STATUS_TO_DO_LIST = 1 // 1有待办事项 0没有待办事项
/**
 * 组件
 *
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class allInvestList extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#efeff4')
    this.fundCode = this.getParam('fundCode')

    this.state = {
      fundCode: '', //基金代码
      list: [], //列表的数据
      limit: 10, //每页查询的条数
      moreText: '加载更多', //加载更多11
      page: 1,
      totalCount: null //总条数
    }
  }

  componentDidMount() {
    this.fundProtocolListData()
  }

  /**
   * 列表的数据
   *
   * @memberof allInvestList
   */
  async fundProtocolListData() {
    let { fundCode, limit, page, list, totalCount } = this.state
    showload(true)
    let result = await fundProtocolListApi(this.fundCode, page, limit)
    showload(false)
    if (checkResult(result)) {
      let allListData = result.data
      this.setState({
        moreText:
          parseInt(allListData.totalCount - this.state.page * limit) <= 0
            ? '没有更多了'
            : '加载更多',
        page: page + 1,
        list: allListData.list
      })
    }
  }
  /**
   * 列表的渲染
   *
   * @memberof allInvestList
   */
  renderList = (item, index) => {
    return (
      <div className="contentBox" key={index} onClick={this.onClickItem(item)}>
        <div className="fundNameStatus">
          <p className="fundNameStatued">
            <span className="fundName">{item.productName}</span>
            <span className="fundCode">（{item.fundCode}）</span>
          </p>
          {item.isBacklog == STATUS_TO_DO_LIST ? (
            <p className="statusStop">{item.statusName}</p>
          ) : item.fixedInvestStatus == STATUS_INVEST_DOING ? (
            <p className="status">{item.statusName}</p>
          ) : item.fixedInvestStatus == STATUS_SUSPEND ? (
            <p className="statusStop">{item.statusName}</p>
          ) : (
            <p className="statusStopAndTerm">{item.statusName}</p>
          )}
        </div>
        <div className="fixedInvest">
          <p className="cumulative">
            <span className="allInvest">累计定投（{item.unit}）</span>
            <span className="money">{item.totalCfmMoney}</span>
          </p>
          <p className="alerdyStage">
            <span className="stage">已投{item.totalSuccTime}期</span>
            <span>
              <img className="img" src={require('../asset/arrow-go-small.png')} />
            </span>
          </p>
        </div>
        {item.fixedInvestStatus == STATUS_SUSPEND ||
        item.fixedInvestStatus == STATUS_TERMINATION ? null : (
          <p className="explain">{item.nextFixrequestDescribe}</p>
        )}
      </div>
    )
  }
  /**
   *加载更多
   *
   * @memberof allInvestList
   */
  loadMore = () => {
    this.fundProtocolListDataed()
  }

  async fundProtocolListDataed() {
    let { fundCode, limit, page, list, moreText, totalCount } = this.state
    if (moreText == '没有更多了') {
      return
    }
    showload(true)
    let result = await fundProtocolListApi(this.fundCode, page, limit)
    showload(false)

    if (parseInt(result.data.totalCount - page * limit) <= 0) {
      this.setState({
        moreText: '没有更多了',
        limit: limit,
        page: page
      })
    } else {
      this.setState({
        moreText: '加载更多',
        limit: limit,
        page: page + 1
      })
    }
    let selfState = {}
    selfState.list = list.concat(result.data.list)
    this.setState(selfState)
  }

  /**
   *列表的点击事件
   *
   * @memberof allInvestList
   */
  onClickItem = item => () => {
    routePush(ROUTE_FIXRD_INVEST_DETAILL, {
      fixedInvestId: item.fixedInvestId
    })
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let { list, moreText } = this.state
    return (
      <div className="allInvestList">
        <BackTitle titleName={'我的定投'} hasPostion={true} from={this.props.location.query.from} />
        {list.length > 0 ? (
          <div>
            {list.map(this.renderList)}
            {moreText ? (
              <p className="loadMore" onClick={this.loadMore}>
                {moreText}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="no-data">
            <img src={require('../asset/income-details-bg.png')} />
            <span>暂无定投计划</span>
          </div>
        )}
      </div>
    )
  }
}
