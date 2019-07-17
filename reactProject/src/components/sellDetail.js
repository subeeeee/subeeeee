/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-15 18:27:49
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-19 10:28:30
 * @Note 赎回详情
 */

import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import ajax from '../common/api'
import { toast, showload } from './common/toast'
import { YingmiHeader } from './common/Multi'
import RedText from './common/RedText'
import '../sass/trade-detail.scss'
import Password from './common/Password'
import { isShowTitle, isIphoneX, finishPage } from '../common/setToken'
import toApi from '../common/api'
import BaseComponent from './baseComponent.js'
import DialogBox from './common/alertBox/DialogBox'
import {
  checkResult,
  FundRedeemDetailApi,
  PurchaseCancelApi
} from '../common/api/api.js'
import { ROUTE_RETRIEVE_PSW } from '../common/route/routeName'
import { Steps } from 'antd-mobile'

class SellDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.state = {
      orderId: props.location.query.orderId, //订单id
      orderNo: '', //订单号
      message: '', //消息
      step: [], //详情步骤
      fundList: [], //赎回基金列表
      fareSx: '--', //手续费
      orderStatus: '', //订单状态
      failureCause: '', //失败原因
      hide: 0, //密码框的隐藏与显示的变量
      isCancellations: 0, //是否可撤单1是 0否
      dealPasswords: '', //交易密码
      showBtn: this.props.location.query.showBtn
        ? this.props.location.query.showBtn
        : 0, //完成按钮
      isShow: false //是否密码框的显示
    }
  }

  getTitle() {
    return '赎回详情'
  }

  componentDidMount() {
    this.gotData()
  }
  gotData = () => {
    this.FundRedeemDetailData()
  }

  /**
   * 基金赎回详情
   *
   * @memberof SellDetail
   */
  async FundRedeemDetailData() {
    let orderId = this.state.orderId
    showload(true)
    let result = await FundRedeemDetailApi(orderId)
    showload(false)
    if (checkResult(result)) {
      let tmp = result.data
      this.setState({
        orderId: tmp.orderId,
        orderNo: tmp.orderNo,
        message: tmp.message,
        step: tmp.step,
        fundList: tmp.fundList,
        fareSx: tmp.fee,
        orderStatus: tmp.orderStatus,
        failureCause: tmp.failureCause,
        isCancellations: tmp.isCancellations
      })
    }
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  onEndPwd = value => {
    this.setState(
      {
        dealPasswords: value,
        hide: 0
      },
      this.cancelReed
    )
  }
  cancelReed = () => {
    this.PurchaseCancelData()
  }

  /**
   *
   * 订单撤销
   * @memberof SellDetail
   */
  async PurchaseCancelData() {
    let { orderId, dealPasswords } = this.state
    showload(true)
    let result = await PurchaseCancelApi(orderId, dealPasswords)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      this.gotData()
    } else {
      if (result.data.loadPassword == 0) {
        this.setState({ isShow: true })
      }
    }
  }

  /**
   * 获取状态图片
   *
   * @memberof GroupRedeemDetail
   */
  getStatusImg = (item, index) => {
    if (item.status == 1) {
      //成功
      // stepStatus：0.失败 1.等待中 2.完成
      if (item.stepStatus == 0) {
        return require(`../asset/fail-trade-stage-b.png`)
      } else {
        return require(`../asset/buy-trade-stage-${index + 1}-b.png`)
      }
    } else {
      //等待
      //stepStatus：0.失败 1.等待中 2.完成
      if (item.stepStatus == 0) {
        return require(`../asset/fail-trade-stage.png`)
      } else {
        return require(`../asset/buy-trade-stage-${index + 1}.png`)
      }
    }
  }

  /**
   * 渲染步骤
   *
   * @memberof GroupRedeemDetail
   */
  renderStep = () => {
    let { step } = this.state
    let length = step.length
    return (
      <Steps>
        {step.map((item, index) => {
          return (
            <Steps.Step
              key={index}
              title={
                <span
                  className={
                    item.status == 1
                      ? 'step-title-finish ml25'
                      : 'step-title ml25'
                  }
                >
                  <RedText
                    text={item.statusText}
                    className="tv-reason"
                    margin="0 0px"
                  />
                </span>
              }
              description={
                <div className="div-reason ml25">
                  {item.textList.map((ele, _index) => {
                    return (
                      <RedText
                        text={ele}
                        className="tv-reason"
                        margin="0 0px"
                        key={_index}
                      />
                    )
                  })}
                </div>
              }
              status={item.status == 1 ? 'finish' : 'wait'}
              icon={
                <div
                  className={
                    item.status == 1 ? 'div-step-active' : 'div-step-wait'
                  }
                >
                  <img
                    // className="step-img"
                    src={this.getStatusImg(item, index)}
                  />
                </div>
              }
            />
          )
        })}
      </Steps>
    )
  }

  render() {
    let statusMap = ['init', 'fnd', 'process']
    let {
      orderNo,
      message,
      fundList,
      step,
      fareSx,
      showBtn,
      orderStatus,
      failureCause,
      hide,
      isCancellations
    } = this.state
    return (
      <div className="trade-detail">
        <BackTitle
          titleName="赎回详情"
          back={
            showBtn == 1
              ? () => {
                  finishPage()
                }
              : null
          }
          hasPostion={true}
          rightTitle={isCancellations ? '取消赎回' : ''}
          rightBack={() => {
            this.setState({ hide: 1 })
          }}
        />
        <Password
          show={hide}
          onEnd={this.onEndPwd}
          onHide={() => {
            this.setState({ hide: 0 })
          }}
        />
        {showBtn == 1 ? <YingmiHeader /> : ''}
        {isCancellations && !isShowTitle() ? (
          <span
            onClick={() => {
              this.setState({ hide: 1 })
            }}
            className="self-rightTitle"
          >
            取消赎回
          </span>
        ) : (
          ''
        )}
        <DialogBox
          isShow={this.state.isShow}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ isShow: false })
          }}
          confirmCallBack={() => {
            hashHistory.push({
              pathname: ROUTE_RETRIEVE_PSW,
              query: {
                fundCode: this.state.fundCode
              }
            })
          }}
        />
        <div
          className="stage-map"
          style={{ paddingLeft: orderStatus == 5 ? '0px' : '26px' }}
        >
          <div className="mess">{message}</div>
          {orderStatus == 5 ? (
            <div className="cancelOrdel">
              <p className="picName">
                <img src={require('../asset/purchage.png')} />
              </p>
              <p className="purchse">撤单成功</p>
              <p className="purWord">您已成功申请撤单功能，当前交易已终止</p>
              <p className="purWord">没有产生任何费用</p>
            </div>
          ) : (
            this.renderStep()
          )}
        </div>
        <div className="line10" />
        <div className="detail-title">
          <p className="item">
            订单号：
            {orderNo}
          </p>
          <p className="line1" />
          <p className="item">
            <span>赎回明细</span>
            <span style={{ fontWeight: '400', color: '#909090' }}>
              含有手续费：
              <span style={{ color: '#EE4634' }}>{fareSx}</span>
            </span>
          </p>
        </div>
        <div className="from-title">
          <div className="list-1 small-size">赎回基金名称</div>
          <div className="list-2 small-size">赎回金额(元)</div>
          <div className="list-3 small-size">赎回份数(份)</div>
          <div className="list-4 small-size">状态</div>
        </div>
        {fundList.map((item, index) => {
          return (
            <div key={index}>
              <div className="from-line">
                <div className="list-1">{item.fundName}</div>
                <div className="list-2">{item.confirmBalance}</div>
                <div className="list-3">{item.confirmShares}</div>
                <div className="list-4 red">{item.orderStatusText}</div>
              </div>
              {item.orderStatus + '' == '0' && item.failureCause ? (
                <div className="fail-mess">
                  <span>
                    失败原因：
                    {item.failureCause}
                  </span>
                </div>
              ) : (
                ''
              )}
            </div>
          )
        })}
        {orderStatus == '0' && failureCause ? (
          <div className="fail-mess">
            失败原因：
            {failureCause}
          </div>
        ) : (
          ''
        )}
        {showBtn == 1 ? (
          <div style={isIphoneX() ? { height: '88px' } : { height: '54px' }} />
        ) : (
          ''
        )}
        {showBtn == 1 ? (
          <div
            className="go"
            style={
              isIphoneX()
                ? { borderBottom: '34px solid #EFEFF4', height: '74px' }
                : { height: '40px' }
            }
            onClick={() => {
              finishPage()
            }}
          >
            完成
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default SellDetail
