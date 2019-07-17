import React from 'react'
import { hashHistory } from 'react-router'
import RedText from './RedText'
import '../../sass/common/evaluatingCard.scss'
import ReactDom from 'react-dom'
export class EvaluatingCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: props.type || 0, //0风险评测入口,1风险提示
      isShow: props.isShow,
      data: props.data,
      url: props.url,
      reverse: props.reverse || 0
    }
  }

  // componentDidMount() {
  //     this.regScroll(this.handler.bind(this));
  // }

  // componentWillUnmount() {
  //     this.looseBody()
  //     window.onscroll = '';
  // }

  handler() {
    if (this.state && this.state.isShow) {
      this.fixedBody()
    }
  }
  //添加事件监听
  regScroll = myHandler => {
    if (window.onscroll === null) {
      window.onscroll = myHandler
    } else if (typeof window.onscroll === 'function') {
      var oldHandler = window.onscroll
      window.onscroll = function() {
        myHandler()
        oldHandler()
      }
    }
  }

  spClick = () => {
    this.props.spClick()
  }

  hide = () => {
    this.props.hideCard && this.props.hideCard()
    // this.looseBody()
    this.setState({ isShow: 0 })
  }

  goTest = () => {
    hashHistory.push(`/test?url=${this.state.url}`)
  }

  componentWillReceiveProps(newProps) {
    if (this.props != newProps) {
      this.setState(
        {
          isShow: newProps.isShow,
          data: newProps.data,
          reverse: newProps.reverse,
          url: newProps.url
        },
        () => {
          if (this.refs['evaluating-prompt-card-text']) {
            let height = this.refs['evaluating-prompt-card-text'].offsetHeight
            this.refs['evaluating-prompt-card'].style.marginTop =
              -(36 + 70 + 21 + 15 + height) / 2 + 'px'
          } else if (this.refs['evaluating-card-text']) {
            let height = this.refs['evaluating-card-text'].offsetHeight
            this.refs['evaluating-card'].style.marginTop = -(94 + 60 + 35 + height) / 2 + 'px'
          }
          if (this.state.isShow && this.refs['black-bg']) {
            this.refs['black-bg'].onTouchMove = function(e) {
              e.preventDefault()
            }
            // this.fixedBody()
          }
        }
      )

      if (this.refsDom) {
        this.refsDom.onTouchMove = function(e) {
          e.preventDefault()
        }
      }
    }
  }

  fixedBody = () => {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;'
  }

  looseBody = () => {
    var body = document.body
    body.style.position = ''
    var top = body.style.top
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
    body.style.top = ''
  }

  /**
   * dom回调
   *
   * @memberof Password
   */
  refsCallBack = dom => {
    this.refsDom = ReactDom.findDOMNode(dom)
    if (this.refsDom) {
      // 截取移动事件
      this.refsDom.ontouchmove = function(e) {
        e.preventDefault()
      }
    }
  }

  render() {
    const { isShow, type, data, url, reverse } = this.state
    return (
      <div
        className="cover-container"
        style={{ display: isShow ? 'block' : 'none' }}
        ref={this.refsCallBack}
        onClick={this.hide}>
        {/* {data && (
          <div className="black-bg" ref="black-bg" onClick={this.hide} />
        )} */}
        {type == 0
          ? data && (
              <div
                className="evaluating-card"
                ref="evaluating-card"
                style={{ display: data.riskPopup.isPopup ? 'block' : 'none' }}>
                <div className="card-title">{data.riskPopup.title}</div>
                <div className="card-content">
                  <div className="text" ref="evaluating-card-text">
                    {data.riskPopup.describe}
                  </div>
                  <div
                    className="sgbtn"
                    onClick={() => {
                      url ? hashHistory.push(`/test?url=${url}`) : hashHistory.push('/test')
                    }}>
                    {data.riskPopup.buttonText}
                  </div>
                </div>
                <img
                  className="close-btn"
                  src={require('../../asset/active-close.png')}
                  onClick={this.hide}
                />
              </div>
            )
          : ''}

        {type == 1
          ? data && (
              <div
                className="evaluating-prompt-card"
                style={{ display: isShow ? 'block' : 'none' }}
                ref="evaluating-prompt-card">
                <div className="card-content">
                  <h1>{data.title}</h1>
                  <div
                    className="text"
                    style={{ textAlign: data.btn ? 'center' : 'left' }}
                    ref="evaluating-prompt-card-text">
                    <RedText text={data.text} />
                    {data.intoRiskText && (
                      <span
                        style={{
                          color: '#1C82DE',
                          textDecoration: 'underline'
                        }}
                        onClick={() => {
                          hashHistory.push(`/test?url=${url}`)
                        }}>
                        {data.intoRiskText}
                      </span>
                    )}
                  </div>
                </div>
                <div className="btn-box clearfloat">
                  <div className="cancel-btn" onClick={reverse ? this.spClick : this.hide}>
                    放弃
                  </div>
                  {data.isCompel ? (
                    <div className="sure-btn" onClick={this.goTest}>
                      重新测评
                    </div>
                  ) : (
                    <div className="sure-btn" onClick={reverse ? this.hide : this.spClick}>
                      {data.btn ? data.btn : '继续购买'}
                    </div>
                  )}
                </div>
                <img
                  className="close-btn"
                  src={require('../../asset/active-close.png')}
                  onClick={this.hide}
                />
              </div>
            )
          : ''}
      </div>
    )
  }
}
