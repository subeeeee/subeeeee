/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-24 18:34:02
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-02-19 18:24:45
 * @Note 基金管理公司
 */
import React, { Component } from 'react'
import '../sass/fundList.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import { checkResult, fundListDetail } from '../common/api/api'
import { ROUTE_ADV_DETAIL } from '../common/route/routeName'
export default class fundList extends BaseComponent<Props> {
  constructor(props: any) {
    super(props)
    this.fundCode = props.location.query.fundCode
    this.state = {
      fundList: [], //基金列表
      moreText: '加载更多', //底部加载更多
      page: 1, //页码
      limit: 20 //查询每条信息的条数
    }
  }
  /**
   * 接口数据
   *
   * @memberof fundList
   */
  componentDidMount() {
    this.getData()
  }

  async getData() {
    let { fundList, moreText, page, limit } = this.state
    showload(true)
    let result = await fundListDetail(this.fundCode, page, limit)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        fundList: result.data.list,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多',
        page: page + 1
      })
    }
  }
  /**
   *
   * 点击要跳转的详情页
   * @memberof fundList
   */
  clickFundList = item => () => {
    hashHistory.push({
      pathname: ROUTE_ADV_DETAIL,
      query: {
        infoId: item.infoId
      }
    })
  }
  /**
   * 公司列表
   *
   * @memberof fundList
   */
  fundRenderList = (item, index) => {
    return (
      <div key={index} className="uls">
        {item.readStatus == 0 ? (
          <ul onClick={this.clickFundList(item)}>
            <li className="advTitle">{item.title}</li>
            <li>
              {item.isTop == 1 ? <span className="roofPlace">置顶</span> : ''}
              <span className="marketInter">公告通知</span>
              <span className="newsSource">{item.author}</span>
              <span className="specificTime">{item.issueDate}</span>
            </li>
          </ul>
        ) : (
          <ul onClick={this.clickFundList(item)}>
            <li className="advTitles">{item.title}</li>
            <li>
              {item.isTop == 1 ? <span className="roofPlace">置顶</span> : ''}
              <span className="marketInter">公告通知</span>
              <span className="newsSources">{item.author}</span>
              <span className="specificTimes">{item.issueDate}</span>
            </li>
          </ul>
        )}
      </div>
    )
  }
  /**
   *
   * 加载更多
   * @memberof advList
   */
  loadMore = () => {
    let { limit, page, moreText, fundList } = this.state
    if (moreText == '没有更多了') {
      return
    }
    showload(true)
    toApi
      .fundListDetail({ fundCode: this.fundCode, page: page, limit: limit })
      .then(data => {
        showload(false)
        if (data.data.list.length > 0) {
          if (data.data.list.length < limit) {
            this.setState({ moreText: '没有更多了', limit: limit, page: page })
            if (data.data.list.length == 0) {
              moreText = null
            }
          } else {
            this.setState({
              moreText: '加载更多',
              limit: limit,
              page: page + 1
            })
          }
          let selfState = {}
          selfState.fundList = fundList.concat(data.data.list)
          this.setState(selfState)
        } else {
          this.setState({
            moreText: '没有更多了'
          })
        }
      })
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let { moreText, fundList } = this.state
    return (
      <div className="fundList">
        <BackTitle
          titleName={'内容列表'}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        {fundList.length > 0 ? (
          <div>
            <div>{fundList.map(this.fundRenderList)}</div>
            <p className="loadMore" onClick={this.loadMore}>
              {moreText}
            </p>
          </div>
        ) : (
          <p className="no-data">
            <img src={require('../asset/income-details-bg.png')} />
            <span>暂无公告</span>
          </p>
        )}
      </div>
    )
  }
}
