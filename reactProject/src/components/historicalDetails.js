import React from 'react'
import { BackTitle } from './common/baseTitle'
import '../sass/historicalDetails.scss'
import { showload } from './common/toast'
import { isIphone, isIphoneX, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'
import { checkResult, GetHistoryApi } from '../common/api/api'

export default class historicalDetails extends BaseComponent {
  constructor(props) {
    super(props)
    this.loadData = this.loadData.bind(this)
    this.state = {
      list: [],
      moreText: '加载更多',
      lastId: null,
      getDataIng: false
    }
  }

  getTitle() {
    return '历史详情'
  }

  //加载数据
  getdata = (limit, lastId) => {
    let getDataIng = this.state.getDataIng
    if (getDataIng) {
      return
    } else {
      this.setState({
        getDataIng: true
      })
    }
    this.GetHistoryData(limit, lastId)
  }
  /**
   * 获得历史记录
   *
   * @memberof historicalDetails
   */
  async GetHistoryData(limit, lastId) {
    let fundCode = this.props.location.query.fundCode
    showload(true)
    let result = await GetHistoryApi(limit, fundCode, lastId)
    showload(false)
    if (checkResult(result)) {
      let hint = '加载更多'
      hint = result.data.list.length < limit ? '没有更多数据' : '加载更多'
      if (result.data.list && result.data.list.length > 0) {
        if (result.data.list.length == limit) {
          result.data.list.pop()
        }
      }
      this.setState(
        {
          list: this.state.list.concat(result.data.list),
          moreText: hint,
          lastId:
            result.data.list.length > 0
              ? result.data.list[result.data.list.length - 1].fundNavId
              : '',
          getDataIng: false
        },
        () => {
          let sHeight =
            document.body.scrollHeight || document.documentElement.scrollHeight
          let cHeight = document.documentElement.clientHeight
          if (sHeight <= cHeight) {
            console.log('加载第二页数据')
            this.moreData()
          } else {
            console.log('数据渲染完成！', sHeight, cHeight)
          }
        }
      )
    }
  }

  moreData = () => {
    if (this.state.moreText == '没有更多数据') {
      return
    }
    this.getdata(21, this.state.lastId)
  }
  loadData() {
    let sHeight =
      document.body.scrollHeight || document.documentElement.scrollHeight
    let sTop = document.body.scrollTop || document.documentElement.scrollTop
    let cHeight = document.documentElement.clientHeight
    if (cHeight + sTop === sHeight) {
      this.moreData()
    }
  }
  componentDidMount() {
    this.getdata(21, '')
    window.addEventListener('scroll', this.loadData, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadData, false)
  }

  render() {
    let list = this.state.list
    console.log(list)
    return (
      <div className="history">
        <BackTitle
          titleName="历史详情"
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <div className="hTable">
          <div className="interval" />
          <div
            className="hTh"
            style={{
              top: isShowTitle()
                ? isIphoneX()
                  ? '88px'
                  : isIphone()
                  ? '64px'
                  : '44px'
                : '0px'
            }}>
            <span>日期</span>
            <span>万份收益（元）</span>
            <span>七日年化收益率</span>
          </div>
          {(list || []).map((items, index) => {
            return (
              <div className="hTd" key={index}>
                <span>{items.date}</span>
                <span>
                  {items.perMyriadIncome == '' ? '--' : items.perMyriadIncome}
                </span>
                <span>
                  {items.fundCurrRatio == '' ? '--' : items.fundCurrRatio + '%'}
                </span>
              </div>
            )
          })}
          <div
            className="more"
            style={{ display: this.state.lastId ? 'block' : 'none' }}>
            {this.state.moreText}
          </div>
        </div>

        <div
          className="no-data"
          style={{ display: list == '' ? 'block' : 'none' }}>
          <img src={require('../asset/income-details-bg.png')} />
          <span>暂无数据</span>
        </div>
      </div>
    )
  }
}
