/**
 * Created by shuis on 2017/4/13.
 */
import React from 'react'
import RedText from './RedText'
import '../../sass/confirm-window.scss'

class ConfirmWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show,
      info: this.props.info,
      title: this.props.title
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.show != newProps.show) {
      this.setState({
        show: newProps.show,
        info: newProps.info,
        title: newProps.title
      })
    }
  }

  cancel = () => {
    this.setState({
      show: false
    })
    this.props.onHideConfirm && this.props.onHideConfirm()
  }

  confirm = () => {
    this.setState({
      show: false
    })
    this.props.onConfirm && this.props.onConfirm()
  }

  render() {
    if (this.state.show) {
      return (
        <div className="confirm-window">
          <div
            className="pop"
            style={this.state.show ? {} : { display: 'none' }}
          />
          <div
            className="pop-window"
            style={this.state.show ? {} : { display: 'none' }}
          >
            <div className="main">
              <div className="alert-type">{this.state.title}</div>
              <RedText text={this.state.info} />
              <div className="alert-info">
                请确保银行卡有足够余额,否则会导致投资组合偏差
              </div>
            </div>
            <div className="btn-place">
              <div className="button-1" onClick={this.cancel}>
                取消
              </div>
              <div className="button-2" onClick={this.confirm}>
                确认
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default ConfirmWindow
