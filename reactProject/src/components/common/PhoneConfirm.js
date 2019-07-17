/**
 * Created by shuis on 2017/4/13.
 */
import React from 'react'
import RedText from './RedText'
import '../../sass/common/phone-confirm.scss'

class PhoneConfirm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.show != newProps.show) {
      this.setState({
        show: newProps.show
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

  delayHide = () => {
    setTimeout(() => {
      this.cancel()
    }, 1500)
  }

  render() {
    if (this.state.show) {
      return (
        <div className="confirm-Phone">
          <div
            className="pop1"
            style={this.state.show ? {} : { display: 'none' }}
          />
          <div
            className="pop-Phone"
            style={this.state.show ? {} : { display: 'none' }}
          >
            <div className="main1">4007-903-688</div>
            <div className="r1pxline" />
            <div className="btn-place2">
              <div className="button-21" onClick={this.cancel}>
                取消
              </div>
              <div className="button-22">
                <a href="tel:4007-903-688" onClick={this.delayHide}>
                  呼叫
                </a>
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

export default PhoneConfirm
