/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-14 15:25:20
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-05-29 18:13:28
 * @Note 组合落地页
 */
import React from 'react'
import toApi from '../common/api'
import '../sass/intelConfig.scss'
import ChartGroup from './common/chartF2Group'
import BaseComponent from './baseComponent'
import {
  GroupIntelCurveApi,
  checkResult,
  IntelConfigReadApi,
  EvaluationStatusApi
} from '../common/api/api'
import { routePush, routeReplace } from '../common/route/routeAction'
import {
  ROUTE_GROUP_INFO,
  ROUTE_TEST,
  ROUTE_INTEL_CONFIG
} from '../common/route/routeName'
import { BackTitle } from './common/baseTitle'
import { showload } from './common/toast'

export default class IntelConfig extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#021a3c')
    let test = this.getParam('test') //是否完成风险测评
    this.groupId = this.getParam('fundGroupId') //要跳转的组合id
    this.from = this.getParam('from')
    this.state = {
      isTested: test ? test : 0 //是否完成风险测评 0 未完成 1完成
    }
  }

  /**
   * 跳转
   *
   * @memberof IntelConfig
   */
  jmp = async () => {
    if (this.state.isTested == 0) {
      routePush(ROUTE_TEST, {
        fromPage: ROUTE_INTEL_CONFIG
      })
    } else {
      let result = await IntelConfigReadApi()
      routeReplace(ROUTE_GROUP_INFO, {
        fundGroupId: this.groupId,
        from: this.from
      })
    }
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  componentDidMount() {
    this.getData()
  }

  /**
   *
   * 获取数据
   * @memberof IntelConfig
   */
  async getData() {
    showload(true)
    let result = await EvaluationStatusApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({
        isTested: result.data.isEvaluation
      })
    }
  }

  render() {
    let { isTested, groupForm, data } = this.state
    return (
      <div className="intel-main">
        <BackTitle titleName="基金组合" hasPostion={true} from={this.from} />
        <div className="topPic">
          <img className="firPic" src={require('../asset/WechatIMG811.jpeg')} />
        </div>
        <p className="goes " onClick={this.jmp}>
          {isTested == 0 ? '开始风险测评' : '查看我的定制组合'}
        </p>
      </div>
    )
  }
}
