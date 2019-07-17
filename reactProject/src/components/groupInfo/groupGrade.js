/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-27 15:26:01
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-11-27 16:44:22
 * @Note 组合业绩表现
 */

import React, { Component } from 'react'
import chartF from './chartF2'

export default class GroupGrade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartTab: 0 //当前tab
    }
  }

  /**
   * 点击页签
   *
   * @memberof GroupGrade
   */
  onClickChartTab = index => () => {
    this.setState({ chartTab: index })
  }

  /**
   * 组件渲染
   *
   */
  render() {
    let { chartTab } = this.state
    let { chartData, chartTable } = this.props

    return (
      <div>
        <div className="panelName">业绩表现</div>
        <div className="tab-list">
          <div
            className={chartTab == 0 ? 'active' : ''}
            onClick={this.onClickChartTab(0)}>
            组合收益表现
          </div>
          <div
            className={chartTab == 1 ? 'active' : ''}
            onClick={this.onClickChartTab(1)}>
            组合回撤走势
          </div>
        </div>
        <chartF
          data={!chartData ? 0 : chartData}
          dataTable={!chartTable ? 0 : chartTable}
          tab={chartTab}
        />

        <div style={{ backgroundColor: '#fff', height: '15px' }} />
      </div>
    )
  }
}
