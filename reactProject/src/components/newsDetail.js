import React, { Component } from 'react'
import { BackTitle } from './common/baseTitle'
import ajax from '../common/api'
import { hashHistory } from 'react-router'
import { toast, showload } from './common/toast'
import { isShowTitle, changeTitle, isIphone } from '../common/setToken'
import '../sass/newsDetail.scss'
import BaseComponent from './baseComponent'
import { checkResult, NewsDetailApi } from '../common/api/api'

export default class NewsDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.newsId = props.location.query.newsId
    this.state = {
      newsName: '资讯详情', //资讯标题
      newsType: [], //市场资讯
      title: '', //资讯标题
      infoPublDate: '', //日期
      media: '', //作者
      // author: '',
      content: '' //内容
    }
  }

  /**
   * 获取标题信息
   *
   */
  getTitle() {
    return '资讯详情'
  }

  /**
   * 第一次渲染结束
   *
   */
  componentDidMount() {
    this.getData()
  }

  /**
   * 获取后端数据
   *
   */
  getData() {
    this.NewsDetailData()
  }

  /**
   *资讯详情
   *
   * @memberof NewsDetail
   */
  async NewsDetailData() {
    showload(true)
    let result = await NewsDetailApi(this.newsId)
    showload(false)
    if (checkResult(result)) {
      this.setState({ ...result.data }, () => {
        // 设置title
        document
          .getElementsByTagName('head')[0]
          .getElementsByTagName('title')[0].innerText = this.state.newsName
        // 判断是否显示标题
        if (!isShowTitle()) {
          changeTitle(this.state.newsName)
        }
      })
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    let { newsName, newsType, title, infoPublDate, media, content } = this.state
    return (
      <div>
        <BackTitle
          titleName={newsName}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <div className="news-detail">
          <p className="title-txt">{title}</p>

          <div className="news-info">
            {newsType &&
              newsType.map((item, index) => {
                return (
                  <span key={index} className="label-back">
                    {item}
                  </span>
                )
              })}
            <span className="span-info mr10">{media}</span>
            <span className="span-info">{infoPublDate}</span>
          </div>
          <div className="bigBoxs">
            <pre className="content-info">{content}</pre>
          </div>

          <p className="thin-line" />
        </div>
      </div>
    )
  }
}
