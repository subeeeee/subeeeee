import React, { Component } from 'react'
import { BackTitle } from './common/baseTitle'
import '../sass/fundStrategy.scss'
import ajax from '../common/api'
import { hashHistory } from 'react-router'
import { toast, showload } from './common/toast'
import { isShowTitle, changeTitle } from '../common/setToken'
import Copyright from './common/copyright.js'
import CopyrightStrategy from './common/copyrightStrategy.js'
import BaseComponent from './baseComponent'
import { EvaluatingCard } from './common/evaluatingCard'
import cot from 'cookie.js'
import {
  checkResult,
  WisdomElectDetailsApi,
  EvaluationStatusApi
} from '../common/api/api'
import {
  ROUTE_FUND_DETAIL,
  ROUTE_FUND_BUY,
  ROUTE_TEST
} from '../common/route/routeName'
import DialogBox from './common/alertBox/DialogBox'
import { routePush } from '../common/route/routeAction'

const HeadTypeShow = 1 //头部显示
const HeadTypeHide = 0 //头部隐藏
const BottomTypeShow = 1 //底部显示
const BottomTypeHide = 0 //底部隐藏
const TemplateTypeMore = 2 //多基金类型
const SERVER_STATUS_FOR_LIMIT = 1 //风险测评是否过期 1过期    0未过期

/**
 * 组件
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class fundStrategy extends BaseComponent {
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
      bottomShow: '', //底部是否显示
      testShow: 0, //风险测评框的显示与隐藏
      testData: null, //测评的数据
      boxShow: false //是否过期的显示与隐藏
    }
    this.isTest()
  }

  /**
   * 获取标题信息
   *
   */
  getTitle() {
    return '--'
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
        document
          .getElementsByTagName('head')[0]
          .getElementsByTagName('title')[0].innerText = this.state.title
        // 判断是否显示标题
        if (!isShowTitle()) {
          changeTitle(this.state.title)
        }
      })
    }
  }
  /**
   * 基金详情
   *
   * @memberof fundStrategy
   */
  onClickFundetail = item => () => {
    hashHistory.push({
      pathname: ROUTE_FUND_DETAIL,
      query: {
        fundType: item.isCurrencyFund,
        fundCode: item.fundCode
      }
    })
  }

  /**
   *风险测评的数据
   *
   * @memberof fundStrategy
   */
  isTest = () => {
    this.EvaluationStatusData()
  }

  /**
   * 风险测评的数据
   *
   * @memberof fundStrategy
   */
  async EvaluationStatusData() {
    let result = await EvaluationStatusApi()
    if (checkResult(result)) {
      this.setState({
        testData: result.data
      })
    }
  }

  /**
   *立即购买的点击事件
   *
   * @memberof fundStrategy
   */
  onClickFunbuy = item => event => {
    let isBuy = item.isBuy
    let cannotBuyReason = item.cannotBuyReason
    let { testData } = this.state
    event && event.stopPropagation()
    // this.getData()
    if (isBuy) {
      if (testData) {
        if (testData.isEvaluation == 0 && testData.riskPopup.isPopup == 1) {
          this.setState({
            testShow: 1
          })
        } else {
          if (testData.isStaleDated == SERVER_STATUS_FOR_LIMIT) {
            this.setState({
              boxShow: true
            })
          } else {
            hashHistory.push({
              pathname: ROUTE_FUND_BUY,
              query: {
                fundCode: item.fundCode
              }
            })
          }
        }
      } else {
        toast('正在检测测评状态，稍后再试')
        this.isTest()
      }
    } else {
      toast(cannotBuyReason)
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
        <div
          className="fund-item"
          key={index}
          onClick={this.onClickFundetail(item)}
        >
          <p className="fund-title">{item.fundName}</p>
          {item.labelList ? (
            <p className="label-layout">
              {item.labelList.map((_item, _index) => {
                return (
                  <span
                    key={_index}
                    className={`label ${
                      _index != item.labelList.length - 1 ? 'margin-right' : ''
                    }`}
                  >
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
        {index != this.state.fundList.length - 1 ? (
          <div className="line10" />
        ) : (
          ''
        )}
      </div>
    )
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
        <div
          className="fund-item-more"
          key={index}
          onClick={this.onClickFundetail(item)}
        >
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
                          _index != item.labelList.length - 1
                            ? 'margin-right'
                            : ''
                        }`}
                      >
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
        {index != this.state.fundList.length - 1 ? (
          <div className="line10" />
        ) : (
          ''
        )}
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
      this.img.src = require('../asset/fund_trade_fail.jpg')
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
        <BackTitle
          titleName={title}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <DialogBox
          isShow={this.state.boxShow}
          text={
            '您的风险测评等级已过期。根据相关规定，您需要重新风险测评才可继续进行基金交易。'
          }
          title={'温馨提示'}
          cancelText={'暂不测评'}
          confirmText={'去测评'}
          cancelCallBack={() => {
            this.setState({ boxShow: false })
          }}
          confirmCallBack={() => {
            routePush(ROUTE_TEST)
          }}
        />
        {bannerImg ? (
          <img
            src={bannerImg}
            ref={img => {
              this.banner = img
            }}
            onError={() => {
              if (this.banner) {
                this.banner.src = require('../asset/banner_fail.jpg')
              }
            }}
            className="top-img"
          />
        ) : (
          <div />
        )}
        {headShow == HeadTypeShow &&
          fundList &&
          fundList.map(
            templateType == TemplateTypeMore
              ? this.renderItemMore
              : this.renderItem
          )}
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
          fundList.map(
            templateType == TemplateTypeMore
              ? this.renderItemMore
              : this.renderItem
          )}

        <EvaluatingCard
          isShow={testShow}
          data={testData}
          hideCard={() => {
            this.setState({ testShow: 0 })
          }}
        />
        <CopyrightStrategy className="mt30 pb30" />
      </div>
    )
  }
}
