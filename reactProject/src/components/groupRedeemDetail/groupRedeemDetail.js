/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-15 18:27:49
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-05-16 15:06:09
 * @Note 组合赎回详情
 */

import React from 'react'
import './groupRedeemDetail.scss'
import BaseComponent from '../baseComponent'
import { showload } from '../common/toast'
import {
  FundRedeemDetailApi,
  checkResult,
  FundCancelApi,
  FundGroupRedeemDetailApi
} from '../../common/api/api'
import { routePush } from '../../common/route/routeAction'
import { BackTitle } from '../common/baseTitle'
import { finishPage, isShowTitle, isIphoneX } from '../../common/setToken'
import Password from '../common/Password'
import { YingmiHeader } from '../common/Multi'
import RedText from '../common/RedText'
import { Steps } from 'antd-mobile'

export default class GroupRedeemDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let orderId = this.getParam('orderId')
    this.state = {
      orderId: orderId, //订单号
      orderNo: '', //订单号
      message: '',
      step: [], //详情步骤
      fundList: [], //赎回基金列表
      fareSx: '--',
      orderStatus: '', //订单状态
      failureCause: '', //失败原因
      hide: 0,
      msgCause: '', //特殊原因
      isCancellations: 0, //是否可撤单1是 0否
      dealPasswords: '', //交易密码
      showBtn: this.props.location.query.showBtn
        ? this.props.location.query.showBtn
        : 0
    }
  }

  getTitle() {
    return '赎回详情'
  }

  componentDidMount() {
    this.gotData()
  }

  gotData = async () => {
    showload(true)
    let result = await FundGroupRedeemDetailApi(this.state.orderId)
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
        msgCause: tmp.msgCause,
        orderStatus: tmp.orderStatus,
        failureCause: tmp.failureCause,
        isCancellations: tmp.isCancellations
      })
    } else if (result.code == 10001) {
      routePush('/login')
      return
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

  /**
   * 撤销
   *
   * @memberof SellDetail
   */
  cancelReed = async () => {
    showload(true)
    let result = await FundCancelApi(
      this.state.orderId,
      this.state.dealPasswords
    )
    showload(false)
    if (checkResult(result)) {
      this.gotData()
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
        return require(`./images/fail-trade-stage-b.png`)
      } else {
        return require(`./images/trade-stage-${index + 1}-b.png`)
      }
    } else {
      //等待
      // stepStatus：0.失败 1.等待中 2.完成
      if (item.stepStatus == 0) {
        return require(`./images/fail-trade-stage.png`)
      } else {
        return require(`./images/trade-stage-${index + 1}.png`)
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
                  {item.statusText}
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

  /**
   *
   * 渲染
   * @returns
   * @memberof SellDetail
   */
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
      msgCause,
      isCancellations
    } = this.state
    return (
      <div className="groupRedeemDetail">
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
        <div
          className="stage-map"
          style={{ paddingLeft: orderStatus == 5 ? '0px' : '26px' }}
        >
          <div className="mess">{message}</div>
          {orderStatus == 5 ? (
            <div className="cancelOrdel">
              <p className="picName">
                <img src={require('./images/purchage.png')} />
              </p>
              <p className="purchse">撤单成功</p>
              <p className="purWord">您已成功申请撤单功能，当前交易已终止</p>
              <p className="purWord">没有产生任何费用</p>
            </div>
          ) : (
            this.renderStep()
          )}
        </div>
        {msgCause && msgCause != '' ? (
          <div
            className="msg-cause"
            dangerouslySetInnerHTML={{
              __html: msgCause
            }}
          />
        ) : (
          <div className="line10" />
        )}

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
          <div className="list-1 small-size">基金名称</div>
          <div className="list-2 small-size">赎回金额(元)</div>
          <div className="list-2 small-size">赎回份额(份)</div>
          <div className="list-3 small-size">手续费(元)</div>
          <div className="list-4 small-size">状态</div>
        </div>
        {fundList.map((item, index) => {
          return (
            <div key={index}>
              <div className="from-line">
                <div className="list-1">{item.fundName}</div>
                <div className="list-2">{item.confirmBalance}</div>
                <div className="list-2">{item.confirmShares}</div>
                <div className="list-3">{item.fareSx}</div>
                {item.orderStatus == '0' ? (
                  <div className="list-4 red">{item.orderStatusText}</div>
                ) : (
                  <div className="list-4">{item.orderStatusText}</div>
                )}
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
              {item.hintMsg && item.hintMsg != '' ? (
                <div className="tips">{item.hintMsg}</div>
              ) : null}
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
