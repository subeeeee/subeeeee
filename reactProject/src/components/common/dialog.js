import React from 'react'
import RedText from './RedText'
import '../../sass/common/evaluatingCard.scss'

export class Dialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: props.isShow,
      title: props.title,
      text: props.text,
      btntext: props.btntext,
      canceltext: props.canceltext,
      isCenter: props.isCenter,
      textSize: props.textSize
    }
  }

  cancelClick = () => {
    this.hide()
    this.props.cancel && this.props.cancel()
  }

  hide = () => {
    this.props.hide && this.props.hide()
    this.setState({ isShow: 0 })
  }

  sureClick = () => {
    this.hide()
    this.props.next && this.props.next()
  }

  componentWillReceiveProps(newProps) {
    if (this.props != newProps) {
      this.setState(
        {
          isShow: newProps.isShow,
          title: newProps.title,
          text: newProps.text,
          btntext: newProps.btntext,
          canceltext: newProps.canceltext,
          isCenter: newProps.isCenter
        },
        () => {
          if (this.refs['evaluating-prompt-card-text']) {
            let height = this.refs['evaluating-prompt-card-text'].offsetHeight
            this.refs['evaluating-prompt-card'].style.marginTop =
              -(36 + 70 + 21 + 15 + height) / 2 + 'px'
          }
        }
      )
    }
  }

  render() {
    const {
      isShow,
      text,
      title,
      btntext,
      canceltext,
      isCenter,
      textSize
    } = this.state
    return (
      <div
        className="cover-container"
        style={{ display: isShow ? 'block' : 'none' }}>
        <div className="black-bg" onClick={this.hide} />
        <div
          className="evaluating-prompt-card"
          ref="evaluating-prompt-card"
          style={{ display: isShow ? 'block' : 'none' }}>
          <div className="card-content">
            <h1>{title}</h1>
            {}
            <div
              className="text"
              ref="evaluating-prompt-card-text"
              style={
                textSize
                  ? {
                      textAlign: isCenter ? 'center' : 'left',
                      fontSize: textSize
                    }
                  : { textAlign: isCenter ? 'center' : 'left' }
              }>
              <RedText text={text} />
            </div>
          </div>
          <div className="btn-box clearfloat">
            <div className="cancel-middle-btn" onClick={this.cancelClick}>
              {canceltext ? canceltext : '我再想想'}
            </div>
            <div className="sure-middle-btn" onClick={this.sureClick}>
              {btntext}
            </div>
          </div>
          <img
            className="close-btn"
            src={require('../../asset/active-close.png')}
            onClick={this.hide}
          />
        </div>
      </div>
    )
  }
}
