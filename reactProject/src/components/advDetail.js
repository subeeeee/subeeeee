import React from 'react'
import { Router, Route } from 'react-router'
import '../sass/advDetail.scss'
import toApi from '../common/api'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import BaseComponent from './baseComponent'
import { checkResult, advDetails } from '../common/api/api'

export default class AdvDetail extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      author: '', //作者
      content: '', //内容
      isTop: '', //是否置顶
      issueDate: '', //时间
      title: '' //标题
    }
    this.infoId = props.location.query.infoId
  }
  /**
   *
   * 数据显示
   * @memberof AdvDetail
   */
  componentDidMount() {
    this.getData()
  }

  async getData() {
    showload(true)
    let result = await advDetails(this.infoId)
    showload(false)
    if (checkResult(result)) {
      this.setState({
        ...result.data
      })
    }
  }
  render() {
    let { author, content, isTop, issueDate, title } = this.state
    return (
      <div className="advDetail">
        <BackTitle titleName={'公告详情'} hasPostion={true} from={this.props.location.query.from} />
        <p className="titleBack">{title}</p>
        <p className="time">
          {isTop == 1 ? <span className="roofPlace">置顶</span> : ''}

          <span className="marketRead">公告通知</span>
          <span className="author">{author}</span>
          <span className="yearAndMonth">{issueDate}</span>
        </p>
        <div className="bigBoxs">
          <pre>{content}</pre>
        </div>
      </div>
    )
  }
}
