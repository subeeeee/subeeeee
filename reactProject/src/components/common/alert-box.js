import React from 'react'
import { hashHistory } from 'react-router'
import '../../sass/common/alert-box.scss'

export default class AlertBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: props.isOpen,
      title: '--',
      text: '--',
      type: props.type || 0,
      groupId: null,
      to: null,
      addVal: null
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      isOpen: nextProps.isOpen,
      title: nextProps.title || '',
      text: nextProps.text,
      btn: nextProps.btn || '',
      type: nextProps.type || 0,
      groupId: nextProps.groupId || null,
      to: nextProps.to,
      addVal: nextProps.addVal
    })
  }

  closeAlert = () => {
    this.props.hide ? this.props.hide() : ''
    this.setState({
      isOpen: 0,
      title: '--',
      text: '--',
      btn: '--',
      type: 0,
      groupId: null
    })
  }

  go = () => {
    let url = this.state.to ? '&type=' + this.state.to : ''
    let addVal = this.state.addVal
      ? `&totalProfit=${this.state.addVal[0]}&currentTotalProfit=${this.state.addVal[1]}`
      : ''
    hashHistory.push(`/income-details?groupId=${this.state.groupId}${url}${addVal}`)
  }

  render() {
    const { isOpen, title, text, btn, type } = this.state
    return (
      <div className="alert-all" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="alert-box">
          <img
            className="close-btn"
            src={require('../../asset/active-close.png')}
            onClick={this.closeAlert}
          />
          <div className="alert-title">{title == '' ? '温馨提示' : title}</div>
          <div className="alert-text">{text}</div>
          <div className="alert-btn" onClick={type == 0 ? this.closeAlert : this.go}>
            {type == 0 ? '我知道了' : '查看收益明细'}
          </div>
        </div>
        <div className="black-bg" onClick={this.closeAlert} />
      </div>
    )
  }
}
