import React, { Component } from 'react'
import './barnerStrategy.scss'
import BaseComponent from '../baseComponent'
import { WisdomElectDetailsApi, checkResult } from '../../common/api/api'
import { showload } from '../common/toast'
import CopyrightStrategy from '../common/copyrightStrategy'
import { changeTitle } from '../../common/setToken'

const HeadTypeShow = 1 //头部显示
const HeadTypeHide = 0 //头部隐藏
const BottomTypeShow = 1 //底部显示
const BottomTypeHide = 0 //底部隐藏
const TemplateTypeMore = 2 //多基金类型

/**
 * 组件
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class BarnerStrategy extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.policyRecommendId = this.getParam('policyRecommendId')
    this.state = {
      policyRecommendId: '', //推荐id
      title: '', //标题
      templateType: '', //模版类型 1 单基金 2多基金
      bannerImg: '', //banner图片
      describeImg: '', //策略图片
      fundList: [], //基金列表
      headShow: '', //头部是否显示
      bottomShow: '' //底部是否显示
    }
  }

  /**
   * 获取标题信息
   *
   */
  getTitle() {
    return ''
  }

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取后端数据
   *
   */
  getData() {
    this.WisdomElectDetailsData()
  }
  /**
   * 基金策略介绍
   *
   * @memberof fundStrategy
   */
  async WisdomElectDetailsData() {
    showload(true)
    let result = await WisdomElectDetailsApi(this.policyRecommendId)
    showload(false)
    if (checkResult(result)) {
      this.setState({ ...result.data }, () => {
        // 设置title
        changeTitle(this.state.title)
        this.setRealTitle(this.state.title)
      })
    }
  }

  /**
   * 渲染单只基金
   *
   * @memberof fundStrategy
   */
  renderItem = (item, index) => {
    let value = item.yieldRate.value

    return (
      <div>
        <div className="fund-item" key={index} onClick={this.onClickFundetail(item)}>
          <p className="fund-title">{item.fundName}</p>
          {item.labelList ? (
            <p className="label-layout">
              {item.labelList.map((_item, _index) => {
                return (
                  <span
                    key={_index}
                    className={`label ${
                      _index != item.labelList.length - 1 ? 'margin-right' : ''
                    }`}>
                    {_item}
                  </span>
                )
              })}
            </p>
          ) : (
            ''
          )}
          <div className="value-num">
            {value > 0 ? (
              <p className="red">
                <span className="sign">+</span>

                {value}
                <span className="percent">%</span>
              </p>
            ) : value == 0 ? (
              <p className="grey">
                {value}
                <span className="percent">%</span>
              </p>
            ) : (
              <p className="green">
                <span className="sign">-</span>
                {Math.abs(value)}
                <span className="percent">%</span>
              </p>
            )}
          </div>

          <p className="date-info">{item.yieldRate.name}</p>

          <div className="next-btn" onClick={this.onClickFunbuy(item)}>
            立即购买
          </div>
        </div>
        {index != this.state.fundList.length - 1 ? <div className="line10" /> : ''}
      </div>
    )
  }

  /**
   * 基金详情
   *
   * @memberof fundStrategy
   */
  onClickFundetail = item => () => {
    // hashHistory.push({
    //   pathname: ROUTE_FUND_DETAIL,
    //   query: {
    //     fundType: item.isCurrencyFund,
    //     fundCode: item.fundCode
    //   }
    // })
  }

  /**
   *立即购买的点击事件
   *
   * @memberof fundStrategy
   */
  onClickFunbuy = item => event => {
    // let isBuy = item.isBuy
    // let cannotBuyReason = item.cannotBuyReason
    // let { testData } = this.state
    // event && event.stopPropagation()
    // // this.getData()
    // if (isBuy) {
    //   if (testData) {
    //     if (testData.isEvaluation == 0 && testData.riskPopup.isPopup == 1) {
    //       this.setState({
    //         testShow: 1
    //       })
    //     } else {
    //       hashHistory.push({
    //         pathname: ROUTE_FUND_BUY,
    //         query: {
    //           fundCode: item.fundCode
    //         }
    //       })
    //     }
    //   } else {
    //     toast('正在检测测评状态，稍后再试')
    //     this.isTest()
    //   }
    // } else {
    //   toast(cannotBuyReason)
    // }
  }

  /**
   * 渲染多基金策略
   *
   * @memberof fundStrategy
   */
  renderItemMore = (item, index) => {
    let value = item.yieldRate.value
    return (
      <div>
        <div className="fund-item-more" key={index} onClick={this.onClickFundetail(item)}>
          <div className="first-layout">
            <div className="left-layout">
              <div className="value-num">
                {value > 0 ? (
                  <p className="red">
                    <span className="sign">+</span>

                    {value}
                    <span className="percent">%</span>
                  </p>
                ) : value == 0 ? (
                  <p className="grey">
                    {value}
                    <span className="percent">%</span>
                  </p>
                ) : (
                  <p className="green">
                    <span className="sign">-</span>
                    {Math.abs(value)}
                    <span className="percent">%</span>
                  </p>
                )}
              </div>

              <p className="date-info">{item.yieldRate.name}</p>
            </div>

            <div className="middle-line" />
            <div className="right-layout">
              <p className="fund-title">{item.fundName}</p>
              {item.labelList ? (
                <p className="label-layout">
                  {item.labelList.map((_item, _index) => {
                    return (
                      <span
                        key={_index}
                        className={`label ${
                          _index != item.labelList.length - 1 ? 'margin-right' : ''
                        }`}>
                        {_item}
                      </span>
                    )
                  })}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="next-btn" onClick={this.onClickFunbuy(item)}>
            立即购买
          </div>
        </div>
        {index != this.state.fundList.length - 1 ? <div className="line10" /> : ''}
      </div>
    )
  }

  /**
   * 图片错误
   *
   * @memberof fundStrategy
   */
  onImgError = img => {
    if (this.img) {
      this.img.src = require('./images/fund_trade_fail.jpg')
      this.errorTimes = this.errorTimes ? this.errorTimes : 0
      this.errorTimes++
      if (this.errorTimes > 5) {
        this.img.style.display = 'none'
      }
    }
  }

  /**
   * 组件渲染
   *
   */
  render() {
    let {
      title,
      bannerImg,
      headShow,
      bottomShow,
      fundList,
      describeImg,
      templateType,
      testShow,
      testData
    } = this.state
    return (
      <div className="fund-strategy">
        {bannerImg ? (
          <img
            src={bannerImg}
            ref={img => {
              this.banner = img
            }}
            onError={() => {
              if (this.banner) {
                this.banner.src = require('./images/banner_fail.jpg')
              }
            }}
            className="top-img"
          />
        ) : (
          <div />
        )}
        {headShow == HeadTypeShow &&
          fundList &&
          fundList.map(templateType == TemplateTypeMore ? this.renderItemMore : this.renderItem)}
        {headShow == HeadTypeShow ? <div className="line10" /> : ''}
        {describeImg ? (
          <img
            src={describeImg}
            ref={img => {
              this.img = img
            }}
            className="describeimg-info"
            onError={this.onImgError}
          />
        ) : (
          <div className="describeimg-load" />
        )}
        {bottomShow == BottomTypeShow ? <div className="line10" /> : ''}
        {bottomShow == BottomTypeShow &&
          fundList &&
          fundList.map(templateType == TemplateTypeMore ? this.renderItemMore : this.renderItem)}

        <CopyrightStrategy className="mt30 pb30" />
      </div>
    )
  }
}
