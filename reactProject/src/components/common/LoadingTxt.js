/**
 * Created by shuis on 2017/4/12.
 */
import React from 'react'
import '../../sass/loadingTxt.scss'

class LoadingTxt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: this.props.show,
      msg: this.props.msg
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.show != newProps.show) {
      this.setState({
        show: newProps.show,
        msg: newProps.msg
      })
    }
  }

  render() {
    if (this.state.show) {
      return (
        <div className="loadingTxt">
          <div className="pwd-bg" />
          <div className="app-loading-box">
            <div className="loading-img" />
            <p className="loadingtips">{this.state.msg}</p>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default LoadingTxt
