import React from 'react'
import '../sass/textPage.scss'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import { toast } from './common/toast'
import cot from 'cookie.js'
import { setToken, changeTitle, isShowTitle } from '../common/setToken'

export default class textPage extends React.Component {
  constructor(props) {
    document.body.style.backgroundColor = '#EFEFF4'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#EFEFF4'
    super(props)

    if (props.location.query.token) {
      setToken(props.location.query.token)
    }
    this.state = {
      title: props.location.query.title,
      paramKey: props.location.query.paramKey,
      value: (props.location.state && props.location.state.value) || '',
      clickErr:
        ((props.location.state && props.location.state.value) || '').length > 0,
      index: props.location.query.index,
      parentIndex: props.location.query.parentIndex,
      maxLength:
        props.location.query.paramKey == 'Email'
          ? 40
          : props.location.query.paramKey == 'zipcode'
          ? 6
          : 60
    }

    if (!isShowTitle()) {
      changeTitle(this.state.title)
    }
  }
  // 在textarea中控制X的出现和隐藏
  clickErr = event => {
    let value = event.target.value
    this.setState({
      value: value,
      clickErr: value.length > 0
    })
  }
  // x的点击事件
  clickBtn = () => {
    this.setState({
      value: '',
      clickErr: false
    })
  }

  rightBack = () => {
    if (this.state.value) {
      if (this.state.paramKey == 'zipcode') {
        let reg = /^[1-9]\d{5}$/
        if (!reg.test(this.state.value)) {
          toast('请填入正确的邮编')
          return
        }
      }
      if (this.state.paramKey == 'Email') {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (!reg.test(this.state.value)) {
          toast('请输入正确的邮箱号')
          return
        }
      }
    }

    let { index, parentIndex } = this.state
    let result = JSON.parse(cot.get('perInformation_data'))
    if (result) {
      result.personalList[parentIndex][index].value = this.state.value
      cot.set('perInformation_data', JSON.stringify(result))
    }
    hashHistory.goBack()
  }

  render() {
    let { clickErr, value, title, maxLength } = this.state
    return (
      <div className="textPage">
        <BackTitle
          titleName={title}
          hasPostion={true}
          from={this.props.location.query.from}
          rightTitle={'完成'}
          rightBack={this.rightBack}
        />
        <textarea
          placeholder="请在此输入..."
          onChange={this.clickErr}
          value={value}
          rows="3"
          maxLength={maxLength}
        />
        <p className="smallErr">
          <span
            onClick={this.clickBtn}
            className={clickErr ? 'showClickErr' : 'clickErr'}>
            X
          </span>
        </p>
      </div>
    )
  }
}
