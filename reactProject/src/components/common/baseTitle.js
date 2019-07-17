import React from 'react'
import '../../sass/title.scss'
import { hashHistory } from 'react-router'
import {
  finishPage,
  isIphone,
  isIphoneX,
  isShowTitle
} from '../../common/setToken'

/**
 * 是否从网信过来的
 *
 * @param {*} from
 * @returns
 */
function isFromWx(from) {
  if (from && from == 'wx') {
    return true
  }
  return false
}

export class Title extends React.Component {
  render() {
    if (!isShowTitle()) {
      return <div />
    }

    if (this.props.hasPostion) {
      return (
        <div>
          <div className={`title postion ${getPostionClassName()}`}>
            <div className="titleName">{this.props.titleName || '---'}</div>
          </div>
          <div className={`${getBlockClassName()}`} />
        </div>
      )
    } else {
      return (
        <div className={`title ${getMarginClassName()}`}>
          <div className="titleName">{this.props.titleName || '---'}</div>
        </div>
      )
    }
  }
}

export class BackTitle extends React.Component {
  render() {
    if (!isShowTitle()) {
      return <div />
    }

    if (this.props.hasPostion) {
      return (
        <div>
          <div
            className={`title postion ${getPostionClassName()} ${
              this.props.classname
            }`}
            style={this.props.style}
          >
            <div
              className={`back ${getBackClassName()}`}
              onClick={() => {
                if (this.props.back) {
                  this.props.back()
                } else {
                  if (isFromWx(this.props.from)) {
                    finishPage()
                  } else {
                    hashHistory.goBack()
                  }
                }
              }}
            >
              {this.props.childStyle ? (
                <img src={require(`../../asset/arrow-back-white.png`)} />
              ) : (
                <img src={require(`../../asset/title-back.png`)} />
              )}

              <span style={this.props.childStyle}>返回</span>
            </div>
            <div
              className={
                this.props.rightTitle ? 'titleName-hasRight' : 'titleName'
              }
              style={this.props.childStyle}
            >
              {this.props.titleName || '---'}
            </div>
            {this.props.rightTitle && (
              <span
                className={`rightTitle ${getRightClassName()}`}
                onClick={this.props.rightBack}
              >
                {this.props.rightTitle}
              </span>
            )}
          </div>
          <div className={`${getBlockClassName()}`} />
          {this.props.childStyle ? (
            <div className={`${getTitleNOBOrderBottom()}`} />
          ) : (
            <div className={`${getTitleClassName()}`} />
          )}
        </div>
      )
    } else {
      return (
        <div>
          <div className={`title ${getMarginClassName()}`}>
            <div
              className={`back ${getBackClassName()}`}
              onClick={() => {
                if (this.props.back) {
                  this.props.back()
                } else {
                  if (isFromWx(this.props.from)) {
                    finishPage()
                  } else {
                    hashHistory.goBack()
                  }
                }
              }}
            >
              <img src={require(`../../asset/title-back.png`)} />
              <span>返回</span>
            </div>
            <div
              className={
                this.props.rightTitle ? 'titleName-hasRight' : 'titleName'
              }
            >
              {this.props.titleName || '---'}
            </div>
            {this.props.rightTitle && (
              <span
                className={`rightTitle ${getRightClassName()}`}
                onClick={this.props.rightBack}
              >
                {this.props.rightTitle}
              </span>
            )}
          </div>
          <div className="titlenopostion-line" />
        </div>
      )
    }
  }
}

/**
 *
 * 带副标题的标题栏
 * @class BackSubTitle
 * @extends {React.Component}
 */
export class BackSubTitle extends React.Component {
  render() {
    if (!isShowTitle()) {
      return <div />
    }
    if (this.props.hasPostion) {
      return (
        <div>
          <div
            className={`title postion ${getPostionClassName()}`}
            style={this.props.style}
          >
            <div
              className={`back ${getBackClassName()}`}
              onClick={() => {
                if (this.props.back) {
                  this.props.back()
                } else {
                  if (isFromWx(this.props.from)) {
                    finishPage()
                  } else {
                    hashHistory.goBack()
                  }
                }
              }}
            >
              {this.props.childStyle ? (
                <img src={require(`../../asset/arrow-back-white.png`)} />
              ) : (
                <img src={require(`../../asset/title-back.png`)} />
              )}
              <span style={this.props.childStyle}>返回</span>
            </div>
            <div className="subTitle">
              <div
                className={
                  this.props.subTitle ? 'titleName-hasSub' : 'titleName-noSub'
                }
                style={this.props.childStyle}
              >
                {this.props.titleName || '---'}
              </div>
              {this.props.subTitle && (
                <div className="subTitleName" style={this.props.childStyle}>
                  {this.props.subTitle}
                </div>
              )}
            </div>

            {this.props.rightTitle && (
              <span
                className={`rightTitle ${getRightClassName()}`}
                onClick={this.props.rightBack}
                style={this.props.childStyle}
              >
                {this.props.rightTitle}
              </span>
            )}
          </div>
          <div className={`${getBlockClassName()}`} />
          {this.props.childStyle ? (
            <div className={`${getTitleNOBOrderBottom()}`} />
          ) : (
            <div className={`${getTitleClassName()}`} />
          )}
        </div>
      )
    } else {
      return (
        <div>
          <div className={`title ${getMarginClassName()}`}>
            <div
              className={`back ${getBackClassName()}`}
              onClick={() => {
                if (this.props.back) {
                  this.props.back()
                } else {
                  if (isFromWx(this.props.from)) {
                    finishPage()
                  } else {
                    hashHistory.goBack()
                  }
                }
              }}
            >
              {this.props.childStyle ? (
                <img src={require(`../../asset/arrow-back-white.png`)} />
              ) : (
                <img src={require(`../../asset/title-back.png`)} />
              )}

              <span>返回</span>
            </div>
            <div className="subTitle">
              <div
                className={
                  this.props.subTitle ? 'titleName-hasSub' : 'titleName-noSub'
                }
              >
                {this.props.titleName || '---'}
              </div>
              {this.props.subTitle && (
                <div className="subTitleName" style={this.props.childStyle}>
                  {this.props.subTitle}
                </div>
              )}
            </div>
            {this.props.rightTitle && (
              <span
                className={`rightTitle ${getRightClassName()}`}
                onClick={this.props.rightBack}
              >
                {this.props.rightTitle}
              </span>
            )}
          </div>
          <div className="titlenopostion-line" />
        </div>
      )
    }
  }
}

const getPostionClassName = () => {
  return isIphoneX() ? 'iosx-title' : isIphone() ? 'ios-title' : ''
}

const getBlockClassName = () => {
  return isIphoneX()
    ? 'baseiosx-block'
    : isIphone()
    ? 'baseios-block'
    : 'base-block'
}

const getBackClassName = () => {
  return isIphoneX() ? 'iosx-back' : isIphone() ? 'ios-back' : ''
}
const getRightClassName = () => {
  return isIphoneX() ? 'iosx-right' : isIphone() ? 'ios-right' : ''
}
const getTitleClassName = () => {
  return isIphoneX()
    ? 'titleiosx-line'
    : isIphone()
    ? 'titleios-line'
    : 'title-line'
}

/**
 *title没有borderBottom的方法
 *
 * @returns
 */
const getTitleNOBOrderBottom = () => {
  return isIphoneX()
    ? 'titleiosx-lines'
    : isIphone()
    ? 'titleios-lines'
    : 'title-lines'
}

const getMarginClassName = () => {
  return isIphoneX() ? 'marginx-top' : isIphone() ? 'margin-top' : ''
}
