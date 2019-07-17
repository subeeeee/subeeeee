/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2019-03-20 17:42:44
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 16:57:31
 * @Note 基金公告详情页
 */

import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import '../sass/fundInformationDetail.scss'
import toApi from '../common/api'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle
} from '../common/setToken'
import BaseComponent from './baseComponent'
import {
  fundInfoNoticeApi,
  checkResult,
  fundInfoNoticeExApi
} from '../common/api/api'

export default class FundInformationDetail extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      infoTitle: '', //公告标题
      infoPublDate: '', //公告日期
      content: '', //公告内容
      fundAnnouncementId: this.getParam('fundAnnouncementId'), //客户id
      from: this.getParam('from'),
      title: this.getParam('title'),
      textId: this.getParam('textId'),
      textType: this.getParam('textType')
    }

    if (!isShowTitle()) {
      changeTitle(this.state.title)
    }
  }

  componentDidMount() {
    this.getInfoData()
  }

  async getInfoData() {
    if (this.state.from == 'fundSituation') {
      showload(true)
      let result = await fundInfoNoticeApi(
        this.state.textId,
        this.state.textType
      )
      showload(false)
      if (checkResult(result)) {
        this.setState({
          content: result.data.content,
          infoTitle: result.data.title
        })
      }
    } else {
      showload(true)
      let result = await fundInfoNoticeExApi(this.state.fundAnnouncementId)
      showload(false)
      if (checkResult(result)) {
        this.setState({ ...result.data })
      }
    }
  }

  render() {
    let { infoTitle, infoPublDate, content, from, title } = this.state
    return (
      <div className="advDetail">
        <BackTitle titleName={title} hasPostion={true} />
        {from == 'fundSituation' ? '' : <p className="advTitle">{infoTitle}</p>}
        {from == 'fundSituation' ? (
          ''
        ) : (
          <p className="advData">{infoPublDate}</p>
        )}
        <div className="bigBoxs">
          <pre className="advContent">{content}</pre>
        </div>
      </div>
    )
  }
}
