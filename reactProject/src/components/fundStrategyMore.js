/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-08-22 17:24:26
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-06 11:58:58
 * @Note 单只基金策略分析
 */
import React, { Component } from 'react'
import { BackTitle } from './common/baseTitle'
import '../sass/fundStrategyMore.scss'
import Copyright from './common/copyright.js'
import BaseComponent from './baseComponent'
import toApi from '../common/api'
import CopyrightStrategy from './common/copyrightStrategy'

/**
 *  创建策略分析组合信息
 *
 * @export
 */
function createFundStrategyGroupInfo() {
  let objs = []
  let obj = {}
  for (let index = 0; index < 4; index++) {
    obj = {}
    obj.income = -3.44 //收益率
    obj.name = '货币三佳' //组合名称
    obj.groupId = '123123' //组合id
    obj.incomeDes = '成立以来累计收益' //组合描述
    // obj.assetType = '货基' //组合类型
    obj.tabs = ['T+1赎回', '货基组合', '网信标杆'] //组合标签
    objs.push(obj)
  }
  return objs
}

/**
 * 组件
 *
 * @export
 * @class FundStrategyMore
 * @extends {Component}
 */
export default class FundStrategyMore extends BaseComponent {
  constructor(props: any) {
    super(props)

    this.state = {
      banner: '', //标语图片
      strategyInfo: null, //策略信息
      groupInfo: [] //组合信息
    }
  }

  /**
   * 获取后端数据
   *
   * @memberof FundStrategyMore
   */
  getData = () => {
    let data = {}
    data.groupInfo = createFundStrategyGroupInfo()
    data.strategyInfo = null
    data.banner = ''

    this.setState({ ...data })
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  /**
   * 渲染组合标签
   *
   * @memberof FundStrategyMore
   */
  renderGroupItemTab = (item, index) => {
    return <span className="label margin-right">{item}</span>
  }

  /**
   * 点击购买
   *
   * @memberof FundStrategyMore
   */
  onClickBuyItem = groupId => () => {}

  /**
   * 渲染组合信息
   *
   * @memberof FundStrategyMore
   */
  renderGroupItem = (item, index) => {
    let { income, incomeDes, name, groupId, tabs } = item
    return (
      <div>
        <div className="line10" />
        <div className="fund-item">
          <div className="fund-info">
            <div className="fund-income">
              {income >= 0 ? (
                <div>
                  <span className="plus-minus red">+</span>
                  <span className="money red">{income}</span>
                  <span className="unit red">%</span>
                </div>
              ) : (
                <div>
                  <span className="plus-minus green">-</span>
                  <span className="money green">{Math.abs(income)}</span>
                  <span className="unit green">%</span>
                </div>
              )}

              <span className="income">{incomeDes}</span>
            </div>
            <div className="fund-line" />

            <div className="fund-detail-info">
              <span className="labelTitle">{name}</span>
              {tabs && tabs.length > 0 ? (
                <div className="label-layout">{tabs.map(this.renderGroupItemTab)}</div>
              ) : null}
            </div>
          </div>

          <div className="fund-buy" onClick={this.onClickBuyItem(groupId)}>
            立刻购买
          </div>
        </div>
      </div>
    )
  }

  /**
   * 组件渲染
   *
   */
  render() {
    let { groupInfo } = this.state
    return (
      <div className="fund-strategy-more">
        <BackTitle titleName="XX基金" hasPostion={true} from={this.props.location.query.from} />
        <div className="top-img" />

        <div className="fund-strategy-info">
          <p className="fund-title">概述标题</p>
          <p className="fund-subtitle">
            表形式分析当前市场趋势、推荐该类资产理由，并针对特定风险投资偏好用户对该基金进行适当性推荐。
          </p>
        </div>
        {/* <div className="line10" /> */}
        {groupInfo && groupInfo.length > 0 ? groupInfo.map(this.renderGroupItem) : null}
        <CopyrightStrategy className="mt30 pb30" />
      </div>
    )
  }
}
