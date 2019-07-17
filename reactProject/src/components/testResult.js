/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-05-20 16:07:34
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-19 11:50:33
 * @Note 测评结果页
 */

import React, { Component } from 'react'
import '../sass/testResult.scss'
import {
  ROUTE_RISK_WARNING,
  ROUTE_ALL_INVEST_LIST,
  ROUTE_INTEL_CONFIG,
  ROUTE_GROUP_INFO,
  ROUTE_TEST
} from '../common/route/routeName'
import {
  routeReplace,
  routePush,
  routeGo,
  routeGoBack
} from '../common/route/routeAction'
import DialogBox from './common/alertBox/DialogBox'
import CDiv from './common/CDiv'
import { LookRiskLevelApi } from '../common/api/api'
import { showload, toast } from './common/toast'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle,
  finishPage
} from '../common/setToken'
import { BackTitle } from './common/baseTitle'
import BaseComponent from './baseComponent'
import { ROUTE_FUND_DETAIL } from '../common/route/routeName'

const TEST_RESULT = 2 //测评结果页

/**
 * 组件
 *
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class testResult extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#fff')
    this.state = {
      showResult: this.getParam('showResult', 0), //
      showBtn: this.getParam('showBtn', 0),
      isFromTest: this.getParam('isFromTest', false), //是否是从测评页进来的
      fromPage: this.getParam('fromPage', null), //从哪个内部页面进来的
      from: this.getParam('from'),
      riskGradeList: [], //风险类型对应的风险等级
      userRiskGradeName: null, //风险类型
      questionNum: 0, //问题数量
      userRiskGradeDescribe: null, //风险测评结果页的风险描述
      page: 0, //页码
      isBacklog: 0, //是否有待办事项
      showCard: 0, //是否重新测评的的弹框变量
      cardClick: null, //弹框的点击按钮
      cardData: null, //重测按钮的数据
      riskGrade: null,
      isTesting: 0, //是否是第一个问题
      isStaleDated: 0, //是否过期：1是 0否
      riskEndDate: '' //有效期
    }
    //是否android回退
    global.isAndroidBack = true
  }

  componentWillUnmount() {
    //从落地页进来的测评结果页返回直接返回基金频道页

    if (
      this.state.showResult == TEST_RESULT &&
      global.isAndroidBack &&
      this.state.fromPage &&
      this.state.fromPage == ROUTE_INTEL_CONFIG
    ) {
      finishPage()
      return
    }
  }
  componentDidMount() {
    this.LookRiskLevelData()
  }
  /**
   *查看风险测评等级
   *
   * @memberof test
   */
  async LookRiskLevelData() {
    showload(true)
    let result = await LookRiskLevelApi()
    showload(false)

    let data = result.data
    this.setState(
      {
        riskGrade: result.data.riskGrade,
        userRiskGradeDescribe: result.data.userRiskGradeDescribe,
        userRiskGradeName: result.data.userRiskGradeName,
        riskGradeList: result.data.riskGradeList,
        investorType: result.data.investorType,
        riskTolerance: result.data.riskTolerance,
        matchingProduct: result.data.matchingProduct,
        isBacklog:
          !global.testConfirm &&
          this.state.isFromTest &&
          result.data.isBacklog == 1
            ? result.data.isBacklog
            : 0,
        jumpFundGroupId: data.fundGroupId,
        isStaleDated: data.isStaleDated,
        riskEndDate: data.riskEndDate
      },
      () => {
        this.showLevel(this.state.riskGrade, this.state.riskGradeList)
      }
    )
  }

  /**
   *重测的点击事件
   *
   * @memberof testResult
   */
  resetLevel = () => {
    this.setState({
      showCard: 1
    })
  }

  /**
   *重新测评
   *
   * @memberof test
   */
  retest = () => {
    global.testConfirm = false
    this.setState({
      page: 0,
      showCard: 0,
      showResult: 0,
      isFromTest: true
    })

    routeReplace(ROUTE_TEST, {
      from: this.state.from,
      fromPage: this.state.fromPage
    })
  }

  /**
   *
   * 算风险等级的间距
   * @memberof testResult
   */
  showLevel = (riskGrade, list) => {
    let level = []
    let left = null
    let sumWidth = 0
    let space = null
    let fixNum = null
    let width = this.refs['level'].offsetWidth
    let index = null

    list.map(item => {
      let width = this.refs['level' + item.riskGrade].offsetWidth
      level.push(width)
      sumWidth = sumWidth + width
    })
    space = (width - sumWidth) / (list.length - 1) //求出单位空隙长度
    let newspace = (width - sumWidth - 4) / (list.length - 1) //求出单位空隙长度
    for (let i = 0, ln = list.length; i < ln; i++) {
      if (list[i].riskGrade < riskGrade) {
        left = left + level[i]
      }
      if (list[i].riskGrade == riskGrade) {
        index = i
      }

      if (i != ln - 1) {
        this.refs['level' + list[i].riskGrade].style.marginRight =
          newspace + 'px'
      }
    }
    if (
      riskGrade == list[list.length - 1].riskGrade ||
      riskGrade == list[0].riskGrade
    ) {
      fixNum = 6
    } else {
      fixNum = 5
    }
    left = left + level[index] / 2 + index * space + fixNum
    setTimeout(() => {
      this.refs['float'].style.left = left + 'px'
    }, 300)
  }

  /**
   *重新测评按钮的显示与隐藏
   *
   * @memberof testResult
   */
  hideCard = () => {
    this.setState({
      showCard: 0
    })
  }

  /**
   * 回退
   *
   * @memberof test
   */
  spBack = () => {
    // let isTesting = this.state.isTesting

    if (
      this.state.showResult == TEST_RESULT &&
      this.state.fromPage &&
      this.state.fromPage == ROUTE_INTEL_CONFIG
    ) {
      finishPage()
      return
    }
    if (this.state.from && this.state.from == 'wx') {
      finishPage()
    } else {
      routeGoBack()
    }
    // if (isTesting == 0) {
    //   this.toGoBack()
    // }
  }

  /**
   * 跳转
   *
   * @memberof test
   */
  toJump = () => {
    if (
      this.state.showResult == TEST_RESULT &&
      this.state.fromPage &&
      (this.state.fromPage == ROUTE_GROUP_INFO ||
        this.state.fromPage == ROUTE_INTEL_CONFIG)
    ) {
      //测评结束跳转到组合详情
      routeReplace(ROUTE_GROUP_INFO, {
        fundGroupId: this.state.jumpFundGroupId,
        from: 'wx'
      })
      return
    }
    if (this.state.from && this.state.from == 'wx') {
      finishPage()
    } else {
      routeGoBack()
    }
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let hideStyle = { display: 'none' }

    let {
      showResult,
      riskGradeList,
      groupList,
      userRiskGradeName,
      questionNum,
      userRiskGradeDescribe,
      showBtn,
      page,
      cardClick,
      cardData,
      showCard
    } = this.state
    return (
      <div>
        <BackTitle
          titleName={'风险测评'}
          hasPostion={true}
          // from={this.props.location.query.from}
          back={this.spBack}
        />
        <DialogBox
          isShow={showCard}
          text={'您确定要重新风险评测?'}
          title={'提示'}
          cancelText={'退出'}
          confirmText={'重新测评'}
          cancelCallBack={() => {
            this.setState({ showCard: 0 })
          }}
          confirmCallBack={this.retest}
        />
        <div
          className="test-page-level"
          style={
            showResult == 1 || showResult == 2 || page === questionNum + 2
              ? {}
              : hideStyle
          }
        >
          <div className="level-box">
            <div className="level-type">
              您的投资类型为
              {showResult == 1 || showResult == 2 || page == questionNum + 2 ? (
                <span className="again" onClick={this.resetLevel.bind(this)}>
                  重测
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="level-test">
              {userRiskGradeName}
              <img src={require('../asset/test-sign.png')} />
            </div>
            <div className="level-line">
              <img src={require('../asset/level-line.png')} />
              <div className="float-sign" ref={'float'} />
            </div>
            <div className="text" ref={'level'}>
              {riskGradeList &&
                riskGradeList.map((item, index) => {
                  return riskGradeList.length - 1 == index || index == 0 ? (
                    <span
                      key={index}
                      style={{ fontSize: '18px' }}
                      ref={'level' + item.riskGrade}
                    >
                      {item.text}
                    </span>
                  ) : (
                    <span key={index} ref={'level' + item.riskGrade}>
                      {item.text}
                    </span>
                  )
                })}
            </div>
            <div className="line-1px" />
            <div className="level-text">
              {/*  seeDesc ? 'open' : 'close'*/}
              <div className={'open'}>{userRiskGradeDescribe}</div>
              {/*<div className="btn" onClick={this.handleDesc}>{seeDesc ? '收起' : '更多'}</div>*/}
            </div>
          </div>
          <div className="group-box">
            {showResult == 0 || showBtn == 1 ? (
              <CDiv className="link" onClick={this.toJump}>
                {this.state.fromPage &&
                (this.state.fromPage == ROUTE_GROUP_INFO ||
                  this.state.fromPage == ROUTE_INTEL_CONFIG)
                  ? '查看我的定制组合'
                  : '完成'}
              </CDiv>
            ) : null}
            {showResult == 1 || showResult == 2 ? (
              <p className="click-urls">
                <span
                  onClick={() => {
                    routePush(
                      ROUTE_RISK_WARNING,
                      {
                        fromPageType: 1
                      },
                      {
                        investorType: this.state.investorType,
                        riskTolerance: this.state.riskTolerance,
                        matchingProduct: this.state.matchingProduct
                      }
                    )
                  }}
                >
                  《投资者类型及风险匹配告知书》
                </span>
                <span
                  onClick={() => {
                    routePush(ROUTE_RISK_WARNING, {
                      fromPageType: 2
                    })
                  }}
                >
                  《投资者确认函》
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <DialogBox
          isShow={this.state.isBacklog}
          text={
            '您的风险测评等级为:' +
            userRiskGradeName +
            '。您之前设置的定投基金风险等级与您的风险承受能力不匹配。若要继续执行定投扣款，需重新确认您的定投计划。'
          }
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'去确认'}
          cancelCallBack={() => {
            this.setState({ isBacklog: 0 })
          }}
          confirmCallBack={() => {
            global.testConfirm = true
            routePush(ROUTE_ALL_INVEST_LIST)
          }}
        />
      </div>
    )
  }
}
