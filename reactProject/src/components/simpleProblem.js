import React from 'react'
import { Link, hashHistory } from 'react-router'
import cot from 'cookie.js'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import '../sass/simple-problem.scss'
import { changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'
import {
  checkResult,
  GetFundQuestionListApi,
  GroupQuestionListApi
} from '../common/api/api'
import { ROUTE_ANSWER } from '../common/route/routeName'

class SimpleProblem extends BaseComponent {
  constructor(props) {
    super(props)
    this.questionType = this.getParam('questionType')
    this.state = {
      quesList: [] //问题列表
    }
    if (this.questionType == 2) {
      this.GroupQuestionList()
    } else {
      this.GetFundQuestionListData()
    }
  }

  /**
   *w组合更多常见问题
   *
   * @memberof SimpleProblem
   */
  async GroupQuestionList() {
    showload(true)
    let result = await GroupQuestionListApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({
        quesList: result.data.list
      })
    }
  }

  /**
   *
   *  获取常见问题列表
   * @memberof SimpleProblem
   */
  async GetFundQuestionListData() {
    showload(true)
    let result = await GetFundQuestionListApi()
    showload(false)
    if (checkResult(result)) {
      this.setState({
        quesList: result.data.list
      })
    }
  }

  getTitle() {
    return '常见问题列表'
  }

  goProblem = id => {
    return () => {
      hashHistory.push({
        pathname: ROUTE_ANSWER,
        query: { questionId: id, from: 'simple-problem' }
      })
    }
  }

  render() {
    const { quesList } = this.state
    return (
      <div className="simple-problem">
        <div style={{ paddingBottom: '51px' }}>
          <BackTitle
            titleName="常见问题列表"
            hasPostion={true}
            from={this.props.location.query.from}
          />
          <div className="dian">
            <img src={require('../asset/question_dian.png')} />
            猜你可能遇到以下问题
          </div>
          <div className="bd-t" />
          {(quesList || []).map(item => (
            <div
              className="item"
              key={item.questionId}
              onClick={this.goProblem(item.questionId)}
            >
              <div className="itemtitle">{item.title}</div>
              <div className="bd-t" />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default SimpleProblem
