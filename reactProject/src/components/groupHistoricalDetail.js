/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-04-11 17:03:42
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-05-28 14:25:11
 * @Note历史持仓的详情页
 */
import React, { Component } from 'react'
import BaseComponent from './baseComponent'
import '../sass/groupHistoricalDetail.scss'
import { BackTitle, BackSubTitle } from './common/baseTitle'
import { showload } from './common/toast'
import { adjustListApi, checkResult, adjustInfoApi } from '../common/api/api'
import { routePush } from '../common/route/routeAction'
import { ROUTE_FUND_DETAIL } from '../common/route/routeName'

const BTN_IS_SHOW = 1 //持仓列表的路由跳转

/**
 * 组件
 *
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class groupHistoricalDetail extends BaseComponent {
  constructor(props: any) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.fundGroupCode = this.getParam('fundGroupCode')
    this.groupName = this.getParam('groupName')
    this.state = {
      holdList: [
        {
          isOpen: false, //上下箭头的展示与隐藏
          adjustDate: '2019-09-09', //时间
          reason: '', //调仓原因
          addNewPositions: [
            {
              fundname: '盈信货币基金A',
              fundCode: '000001',
              start: '0.00%',
              end: '9.91'
            },
            {
              fundname: '盈信货币基金A',
              fundCode: '000001',
              start: '0.00%',
              end: '9.91'
            }
          ], //新增持仓
          removeNewPosition: [
            {
              fundname: '先锋基金c',
              fundCode: '000002',
              start: '9.7%',
              end: '10.9'
            }
          ], //移除持仓
          addsiloRecord: [
            {
              fundName: '文件二分会看见对方',
              fundCode: '000009',
              start: '0.06%',
              end: '8.987%'
            }
          ], //持仓增加
          reduseRemove: [
            {
              fundName: '文件二分会看见对方',
              fundCode: '000009',
              start: '0.06%',
              end: '8.987%'
            }
          ], //持仓减少
          unchangedHolding: [
            {
              fundName: '文件二分会看见对方',
              fundCode: '000009',
              start: '0.06%',
              end: '8.987%'
            }
          ] //持仓不变
        }
      ]
    }
  }

  /**
   *
   *
   * @memberof groupHistoricalDetail
   */
  componentDidMount() {
    this.adjustListApiData()
  }

  /**
   *调仓的列表数据
   *
   * @memberof groupHistoricalDetail
   */
  async adjustListApiData() {
    showload(true)
    let result = await adjustListApi(this.fundGroupCode)
    showload(false)

    if (checkResult(result)) {
      let obj = {}
      let newlist = []
      result.data.list.forEach(element => {
        obj = {}
        obj.isOpen = false
        obj.adjustDate = element.adjustDate
        obj.reason = element.content
        newlist.push(obj)
      })
      this.setState({
        holdList: newlist
      })
    }
  }

  /**
   *调仓列表展开数据
   *
   * @memberof groupHistoricalDetail
   */
  async adjustInfoApiData(item, index) {
    showload(true)
    let result = await adjustInfoApi(this.fundGroupCode, item.adjustDate)
    showload(false)

    if (checkResult(result)) {
      let { holdList } = this.state
      holdList[index].addNewPositions = result.data.newFundList
      holdList[index].removeNewPosition = result.data.removeFundList
      holdList[index].addsiloRecord = result.data.increaseFundList
      holdList[index].reduseRemove = result.data.reduceFundList
      holdList[index].unchangedHolding = result.data.unchangedFundList
      this.setState({
        addNewPositions: result.data.newFundList,
        removeNewPosition: result.data.removeFundList,
        addsiloRecord: result.data.increaseFundList,
        reduseRemove: result.data.reduceFundList,
        unchangedHolding: result.data.unchangedFundList
      })
    }
  }
  /**
   *上下箭头的点击事件
   *
   * @memberof groupHistoricalDetail
   */
  clickSiloRecord = (item, index) => () => {
    let { holdList } = this.state
    holdList[index].isOpen = !item.isOpen
    this.setState(
      {
        holdList: holdList
      },
      () => {
        this.adjustInfoApiData(item, index)
      }
    )
  }

  /**
   * 新增持仓
   *
   * @memberof groupHistoricalDetail
   */
  addFundItem = (item, index) => {
    return (
      <div className="flexDireaction" key={index}>
        <div className="leftBox">
          <p className="fundName">{item.fundName}</p>
          <p className="fundCode">{item.fundCode}</p>
        </div>
        <div
          className="rightBox"
          onClick={this.clickFundDetail(
            item.fundName,
            item.fundCode,
            item.isCurrency
          )}
        >
          <span className="percent">
            {item.previousRatio}% -> {item.nowadayRatio}%
          </span>
          <img src={require('../asset/small_right.png')} />
        </div>
      </div>
    )
  }
  /**
   * 移除持仓
   *
   * @memberof groupHistoricalDetail
   */
  removeItem = (item, index) => {
    return (
      <div className="flexDireaction" key={index}>
        <div className="leftBox">
          <p className="fundName">{item.fundName}</p>
          <p className="fundCode">{item.fundCode}</p>
        </div>
        <div
          className="rightBox"
          onClick={this.clickFundDetail(
            item.fundName,
            item.fundCode,
            item.isCurrency
          )}
        >
          <span className="percent">
            {item.previousRatio}% -> {item.nowadayRatio}%
          </span>
          <img src={require('../asset/small_right.png')} />
        </div>
      </div>
    )
  }
  /**
   *持仓增加
   *
   * @memberof groupHistoricalDetail
   */
  addsiloRecord = (item, index) => {
    return (
      <div className="flexDireaction" key={index}>
        <div className="leftBox">
          <p className="fundName">{item.fundName}</p>
          <p className="fundCode">{item.fundCode}</p>
        </div>
        <div
          className="rightBox"
          onClick={this.clickFundDetail(
            item.fundName,
            item.fundCode,
            item.isCurrency
          )}
        >
          <span className="percent">
            {item.previousRatio}% -> {item.nowadayRatio}%
          </span>
          <img src={require('../asset/small_right.png')} />
        </div>
      </div>
    )
  }

  /**
   *持仓减少
   *
   * @memberof groupHistoricalDetail
   */
  reduseRemove = (item, index) => {
    return (
      <div className="flexDireaction" key={index}>
        <div className="leftBox">
          <p className="fundName">{item.fundName}</p>
          <p className="fundCode">{item.fundCode}</p>
        </div>
        <div
          className="rightBox"
          onClick={this.clickFundDetail(
            item.fundName,
            item.fundCode,
            item.isCurrency
          )}
        >
          <span className="percent">
            {item.previousRatio}% -> {item.nowadayRatio}%
          </span>
          <img src={require('../asset/small_right.png')} />
        </div>
      </div>
    )
  }

  /**
   *持仓不变
   *
   * @memberof groupHistoricalDetail
   */
  unchangedHolding = (item, index) => {
    return (
      <div className="flexDireaction" key={index}>
        <div className="leftBox">
          <p className="fundName">{item.fundName}</p>
          <p className="fundCode">{item.fundCode}</p>
        </div>
        <div
          className="rightBox"
          onClick={this.clickFundDetail(
            item.fundName,
            item.fundCode,
            item.isCurrency
          )}
        >
          <span className="percent">
            {item.previousRatio}% -> {item.nowadayRatio}%
          </span>
          <img src={require('../asset/small_right.png')} />
        </div>
      </div>
    )
  }

  /**
   *单只基金的详情页
   *
   * @memberof groupHistoricalDetail
   */
  clickFundDetail = (fundName, fundCode, isCurrency) => () => {
    routePush(ROUTE_FUND_DETAIL, {
      fundName: fundName,
      fundCode: fundCode,
      fundType: isCurrency,
      isHideBtn: BTN_IS_SHOW
    })
  }
  /**
   *列表数据的渲染
   *
   * @memberof groupHistoricalDetail
   */
  renderList = (item, index) => {
    const { holdList } = this.state
    return (
      <div className="siloRecord" key={index}>
        <p className="contentText" onClick={this.clickSiloRecord(item, index)}>
          <span className="historicalDate">{item.adjustDate} 调仓记录</span>
          <span>
            {item.isOpen == false ? (
              <img src={require('../asset/open-down.png')} />
            ) : (
              <img src={require('../asset/open-up.png')} />
            )}
          </span>
        </p>
        {item.isOpen == false ? null : (
          <div className="openBox">
            <div className="adjustReason">
              <p className="reason">调仓原因</p>
              <p className="reasonText">{item.reason}</p>
            </div>

            <div className="listBox">
              {item.addNewPositions && item.addNewPositions.length > 0 ? (
                <div>
                  <div className="addPositions">
                    <p className="addHolding">新增持仓</p>
                    {item.addNewPositions &&
                      item.addNewPositions.map(this.addFundItem)}
                  </div>
                  <div className="emptyBox" />
                </div>
              ) : null}
              {item.removeNewPosition && item.removeNewPosition.length > 0 ? (
                <div>
                  <div className="addPositions">
                    <p className="removeHolding">移除持仓</p>
                    {item.removeNewPosition &&
                      item.removeNewPosition.map(this.removeItem)}
                  </div>
                  <div className="emptyBox" />
                </div>
              ) : null}
              {item.addsiloRecord && item.addsiloRecord.length > 0 ? (
                <div>
                  <div className="addPositions">
                    <p className="addHolding">持仓增加</p>
                    {item.addsiloRecord &&
                      item.addsiloRecord.map(this.addsiloRecord)}
                  </div>
                  <div className="emptyBox" />
                </div>
              ) : null}
              {item.reduseRemove && item.reduseRemove.length > 0 ? (
                <div>
                  <div className="addPositions">
                    <p className="removeHolding">持仓减少</p>
                    {item.reduseRemove &&
                      item.reduseRemove.map(this.reduseRemove)}
                  </div>
                  <div className="emptyBox" />
                </div>
              ) : null}

              {item.unchangedHolding && item.unchangedHolding.length > 0 ? (
                <div className="addPositions">
                  <p className="addHolding">持仓不变</p>
                  {item.unchangedHolding &&
                    item.unchangedHolding.map(this.unchangedHolding)}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    )
  }
  /**
   * 组件渲染
   *
   */
  render() {
    const { holdList } = this.state

    return (
      <div className="hisitoricalDetail">
        <BackSubTitle
          titleName={this.groupName}
          subTitle={'调仓记录'}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <p className="emptyBox" />
        {holdList && holdList.map(this.renderList)}
      </div>
    )
  }
}
