/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2018-12-22 14:40:26
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 10:25:49
 * @Note 公告列表
 */
import React from 'react'
import '../sass/adv.scss'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import { checkResult, advAllList } from '../common/api/api'
import { ROUTE_ADV_DETAIL } from '../common/route/routeName'
export default class advList extends BaseComponent<Props> {
  constructor(props: any) {
    super(props)
    this.state = {
      advList: [], //列表的数据,
      page: 1, //页码
      limit: 20, //每页查询的条
      moreText: '加载更多' //加载更多
    }
  }

  /**
   *显示数据
   *
   * @memberof componentName
   */
  componentDidMount() {
    this.getData()
  }

  async getData() {
    let { page, limit } = this.state
    showload(true)
    let result = await advAllList(page, limit)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        advList: result.data.list,
        moreText: result.data.list.length < limit ? '没有更多了' : '加载更多',
        page: page + 1
      })
    }
  }

  /**
   *
   * 列表的点击事件
   * @memberof advList
   */
  clickAdvlist = item => () => {
    hashHistory.push({
      pathname: ROUTE_ADV_DETAIL,
      query: {
        infoId: item.infoId
      }
    })
  }
  /**
   * 渲染列表
   *
   * @memberof advList
   */
  renderList = (item, index) => {
    return (
      <div key={index} className="uls">
        {item.readStatus == 0 ? (
          <ul onClick={this.clickAdvlist(item)}>
            <li className="advTitle">{item.title}</li>
            <li>
              {item.isTop == 1 ? <span className="roofPlace">置顶</span> : ''}
              <span className="marketInter">公告通知</span>
              <span className="newsSource">{item.author}</span>
              <span className="specificTime">{item.issueDate}</span>
            </li>
          </ul>
        ) : (
          <ul onClick={this.clickAdvlist(item)}>
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
    let { limit, page, moreText, advList } = this.state
    if (moreText == '没有更多了') {
      return
    }
    showload(true)
    toApi.advAllList({ page: page, limit: limit }).then(data => {
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
        selfState.advList = advList.concat(data.data.list)
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
    let { advList, moreText } = this.state
    return (
      <div className="advList">
        <BackTitle
          titleName={'公告列表'}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        {advList.length > 0 ? (
          <div>
            <div>{this.state.advList.map(this.renderList)}</div>
            {moreText ? (
              <p className="loadMore" onClick={this.loadMore}>
                {moreText}
              </p>
            ) : null}
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
