/**
 * Created by shuis on 2017/4/12.
 */
import React from 'react'
import ReactDom from 'react-dom'
import '../../sass/password.scss'
import { hashHistory } from 'react-router'
import { isIphone } from '../../common/setToken'
import KeyBoard from './keyBoard'
import { ROUTE_RETRIEVE_PSW } from '../../common/route/routeName'
import { routePush } from '../../common/route/routeAction'

type Props = {
  text: string, //标题
  show: boolean
}

class Password extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pwd: '', //密码
      show: this.props.show
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.show != newProps.show) {
      this.setState({
        show: newProps.show,
        pwd: ''
      })

      this.onTouchMove(newProps.show)
    }
  }

  /**
   * 滑动监听函数
   *
   * @memberof Password
   */
  onHandler = event => {
    event.preventDefault()
  }

  /**
   * 滚动
   *
   * @param {*} inFlag
   * @memberof Password
   */
  onTouchMove(inFlag) {
    if (inFlag) {
      document.body.addEventListener('touchmove', this.onHandler, {
        passive: false
      })
    } else {
      document.body.removeEventListener('touchmove', this.onHandler, {
        passive: true
      })
    }
  }

  onClick = () => {
    this.setState({
      show: false
    })
    this.props.onHide && this.props.onHide()
  }

  cir = num => {
    let arr = []
    for (let i = 0; i < num; i++) {
      arr.push('1')
    }
    return arr
  }

  /**
   * 输入行为
   *
   * @memberof changePassword
   */
  onInputText = num => {
    let pwd = this.state.pwd
    pwd += String(num)
    this.setState(
      {
        pwd: pwd
      },
      () => {
        if (pwd.length == 6) {
          this.props.onEnd && this.props.onEnd(pwd)
        }
      }
    )
  }

  /**
   * 输入行为
   *
   * @memberof changePassword
   */
  onInputText = num => {
    let pwd = this.state.pwd
    pwd += String(num)
    this.setState(
      {
        pwd: pwd
      },
      () => {
        if (pwd.length == 6) {
          this.props.onEnd && this.props.onEnd(pwd)
        }
      }
    )
  }

  /**
   * 键盘的删除事件
   *
   * @memberof changePassword
   */
  delateNumbers = () => {
    let pwd = this.state.pwd
    let inputnumbers = String(pwd)
    if (pwd.length !== 0) {
      let strlen = inputnumbers.substring(0, pwd.length - 1)
      this.setState({ pwd: strlen })
      return
    }
  }

  render() {
    if (this.state.show) {
      return (
        <div className="pwd">
          <div className="pwd-bg" onClick={this.onClick} />
          <KeyBoard
            onInputNum={this.onInputText}
            delateNumber={this.delateNumbers}
            display={true}
          />
          <div className="pwd-window">
            {!this.props.text ? (
              <div className="tips">请输入6位基金交易密码</div>
            ) : (
              <div className="tipsAnthor">
                <p className="pwdTitle">请输入6位基金交易密码</p>
                <div
                  className="anthorText"
                  dangerouslySetInnerHTML={{
                    __html: this.props.text
                  }}
                />
              </div>
            )}

            <div
              className="pwd-band"
              onClick={() => {
                ReactDom.findDOMNode(this.refs.pwd)
              }}>
              {this.cir(6).map((item, index) => (
                <div className="pwd-block" key={index}>
                  {index < this.state.pwd.length ? '●' : ''}
                </div>
              ))}
            </div>
            <div
              className="mess"
              onClick={() => {
                routePush(ROUTE_RETRIEVE_PSW)
              }}>
              忘记密码?
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Password
