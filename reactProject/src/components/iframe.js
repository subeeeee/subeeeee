import React from 'react'
import cot from 'cookie.js'
import '../sass/positions-detail.scss'
import { BackTitle } from './common/baseTitle'
import { changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'
import { getToken } from '../common/globelFunc'

export const NO_TOKEN = 'noToken'

class Iframe extends BaseComponent {
  constructor(props) {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden'

    super(props)

    cot.set('page', 'iframe', { maxAge: 60 * 60 })
    const url = this.getParam('url')
    const name = this.getParam('name', '')
    const token = this.getParam('token', getToken())
    const rule = this.getParam('rule')
    const marketId = this.getParam('marketId')
    const noTitle = this.getParam('noTitle')
    console.log(url)
    if (!isShowTitle()) {
      changeTitle(name)
    }
    this.state = {
      name: name,
      url: url,
      token: token,
      isSafe: 0,
      rule: rule,
      marketId: marketId,
      height: window.screen.height - 44,
      noTitle: noTitle ? noTitle : false
    }
  }

  componentWillMount = () => {
    this.urlFilter()
  }

  componentWillUnmount = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  }

  urlFilter = () => {
    let url = this.state.url
    let safeUrl = [
      'dev.hnlidev.ncfgroup.com',
      'apps.huiniulicai.com',
      'm.huiniulicai.com',
      'asset.yingmi.cn',
      'testapi1.hnlidev.ncfgroup',
      'pre-testapi1.corp.ncfgroup.com',
      '10.20.88.30:8013',
      'testm2.hnlidev.ncfgroup',
      'testm1.hnlidev.ncfgroup',
      'wx.fundying.com',
      'h5.fundying.com',
      '10.20.69.108:3033',
      '10.20.88.30:8081'
    ]
    let flag = 0
    for (let i = 0, l = safeUrl.length; i < l; i++) {
      if (url.indexOf(safeUrl[i]) != -1) {
        flag = 1
        break
      }
    }
    this.setState({
      isSafe: flag
    })
  }

  handleRule = (rule, marketId) => {
    let isParam = this.state.url.split('?')[1] ? '&' : '?'
    let token = this.state.token

    if (rule == 'noToken' && !marketId) {
      return this.state.url
    } else {
      return (
        this.state.url + isParam + 'marketId=' + marketId + '&token=' + token
      )
    }
  }

  render() {
    const { isSafe, rule, name, height, noTitle } = this.state
    let url = this.handleRule(rule, this.state.marketId)
    let iframeStyle = {
      width: '100%',
      height: height,
      border: 'none'
    }

    return (
      <div>
        {noTitle ? null : <BackTitle titleName={name} hasPostion={true} />}
        {isSafe ? (
          <iframe id="iframe-box" name="a" style={iframeStyle} src={url} />
        ) : (
          <div style={{ margin: '10px', color: 'red' }}>地址错误</div>
        )}
      </div>
    )
  }
}

export default Iframe
