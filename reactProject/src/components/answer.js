import React from 'react'
import { Link, hashHistory } from 'react-router'
import ajax from '../common/api'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import '../sass/simple-problem.scss'
import { changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'
import { checkResult, GetQuestionDetailApi } from '../common/api/api'

class Answer extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      questionDetails: [] //问题详情的数组
    }
    this.questionId = props.location.query.questionId
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.getAnserData()
  }

  /**
   * 获取问题详情的数据
   *
   * @memberof Answer
   */
  async getAnserData() {
    showload(true)
    let result = await GetQuestionDetailApi(this.questionId)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        questionDetails: result.data
      })
    }
  }

  getTitle() {
    return '常见问题'
  }

  render() {
    let question = this.state.questionDetails
    return (
      <div className="simple-problem">
        <div style={{ paddingBottom: '51px' }}>
          <BackTitle
            titleName="常见问题"
            hasPostion={true}
            from={this.props.location.query.from}
          />
          <div className="dian">
            <img src={require('../asset/question_dian.png')} />
            {question && question.title}
          </div>
          <div className="bd-t" />
          <div className="answeritem">
            <div className="answer">答案</div>
            <div className="answercontent">
              <pre>{question && question.content}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Answer
