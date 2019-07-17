/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-10 15:38:03
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-05-16 15:18:25
 * @Note 组合申购详情页
 */

import React from 'react'
import { BackTitle } from '../common/baseTitle'
import RedText from '../common/RedText'
import { showload } from '../common/toast'
import { YingmiHeader } from '../common/Multi'
import { isShowTitle, isIphoneX, finishPage } from '../../common/setToken'
import Password from '../common/Password'
import './groupBuyDetail.scss'
import { Link } from 'react-router'
import BaseComponent from '../baseComponent'
import {
  BuyDetailApi,
  checkResult,
  FundCancelApi,
  BuyGroupDetailApi,
  BuyGroupStatusApi
} from '../../common/api/api'
import { routePush, routeReplace } from '../../common/route/routeAction'
import LoadingTxt from '../common/LoadingTxt'
import { ROUTE_GROUP_ASSET } from '../../common/route/routeName'
import { Steps } from 'antd-mobile'

export default class GroupBuyDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let orderId = this.getParam('orderId')
    let showBtn = this.getParam('showBtn')
    this.state = {
      orderId: orderId,
      orderStatus: '',
      orderNo: '',
      message: '',
      fundList: [],
      step: [],
      fareSx: '--',
      feeDescribe: '',
      failureCause: '',
      msgCause: '', //消息异常
      hide: 0,
      isCancellations: 0, //是否可撤单1是 0否
      dealPasswords: '',
      isPower: '', //是否鉴权
      showBtn: showBtn ? showBtn : 0,
      showLoading: true //显示查询申购状态
    }
  }

  getTitle() {
    return '申购详情'
  }

  componentDidMount() {
    this.getData()
    // this.checkBuyStatusApi()
  }

  /**
   * 检查订单状态
   *
   * @memberof GroupBuy
   */
  checkBuyStatusApi = async () => {
    let result = await BuyGroupStatusApi(this.state.orderId)
    if (checkResult(result, false)) {
      this.setState({ showLoading: false })
      this.getData()
    }
  }

  /**
   * 获取数据
   *
   * @memberof BuyDetail
   */
  getData = async () => {
    showload(true)
    let result = await BuyGroupDetailApi(this.state.orderId)
    showload(false)
    if (checkResult(result)) {
      let tmp = result.data
      this.setState({
        orderId: tmp.orderId,
        orderNo: tmp.orderNo,
        message: tmp.message,
        fundList: tmp.fundList,
        step: tmp.step,
        fareSx: tmp.fareSx,
        feeDescribe: tmp.feeDescribe,
        orderStatus: tmp.orderStatus,
        failureCause: tmp.failureCause,
        msgCause: tmp.msgCause,
        // msgCause: '你大法师地方史蒂夫收到',
        isCancellations: tmp.isCancellations,
        isPower: tmp.isPower
      })
    } else if (result.code == 10001) {
      routePush('/login')
      return
    }
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  /**
   * 输入密码
   *
   * @memberof BuyDetail
   */
  onEndPwd = value => {
    this.setState(
      {
        dealPasswords: value,
        hide: 0
      },
      this.cancelOrder
    )
  }

  /**
   * 取消订单
   *
   * @memberof BuyDetail
   */
  cancelOrder = async () => {
    showload(true)
    let result = await FundCancelApi(
      this.state.orderId,
      this.state.dealPasswords
    )
    showload(false)
    if (checkResult(result)) {
      this.getData()
    }
  }

  /**
   * 完成
   *
   * @memberof GroupBuyDetail
   */
  onFinishPage = () => {
    routeReplace(ROUTE_GROUP_ASSET, {
      from: 'wx'
    })
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
        return require(`./images/buy-trade-stage-${index + 1}-b.png`)
      }
    } else {
      //等待
      // stepStatus：0.失败 1.等待中 2.完成
      if (item.stepStatus == 0) {
        return require(`./images/fail-trade-stage.png`)
      } else {
        return require(`./images/buy-trade-stage-${index + 1}.png`)
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
                  <RedText text={item.statusText} margin="0 0px" />
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
    let {
      orderNo,
      message,
      fundList,
      step,
      fareSx,
      showBtn,
      feeDescribe,
      orderStatus,
      failureCause,
      hide,
      isCancellations,
      isPower,
      msgCause
    } = this.state

    return (
      <div className="groupBuyDetail">
        <BackTitle
          titleName="申购详情"
          back={showBtn == 1 ? this.onFinishPage : null}
          hasPostion={true}
          rightTitle={isCancellations ? '取消申购' : ''}
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
            取消申购
          </span>
        ) : (
          ''
        )}
        <div
          className="stage-map"
          style={{ paddingLeft: orderStatus == 5 ? '0px' : '26px' }}
        >
          {message && <div className="mess">{message}</div>}
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
            <span>申购明细</span>
            <span>
              含有手续费：
              <span style={{ color: '#FA5E4A' }}>{fareSx}</span>
            </span>
          </p>
        </div>
        <div className="from-title">
          <div className="list-1 small-size">基金名称</div>
          <div className="list-2 small-size">申购金额(元) </div>
          <div className="list-2 small-size">确认份额(份)</div>
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
              {item.orderStatus == '0' && item.failureCause ? (
                <div className="fail-mess">
                  失败原因：
                  {item.failureCause}
                </div>
              ) : null}
              {item.hintMsg && item.hintMsg != '' ? (
                <div className="tips">{item.hintMsg}</div>
              ) : null}
            </div>
          )
        })}

        {orderStatus == '0' && (failureCause || isPower) ? (
          <div className="fail-mess">
            失败原因：
            {isPower ? isPower : failureCause}
            {isPower ? (
              <Link className="identityInformation" to={`/identityInformation`}>
                重新鉴权可解决该支付失败问题
              </Link>
            ) : (
              ''
            )}
          </div>
        ) : null}
        {feeDescribe ? <div style={{ height: '4px' }} /> : ''}
        {feeDescribe ? (
          <div className="p-text">
            ＊手续费将从本次申购金额里自动扣除，不需额外支付
          </div>
        ) : null}
        {showBtn == 1 ? (
          <div style={isIphoneX() ? { height: '88px' } : { height: '54px' }} />
        ) : null}
        {showBtn == 1 ? (
          <div
            className="go"
            style={
              isIphoneX()
                ? { borderBottom: '34px solid #EFEFF4', height: '74px' }
                : { height: '40px' }
            }
            onClick={this.onFinishPage}
          >
            完成
          </div>
        ) : null}
      </div>
    )
  }
}
