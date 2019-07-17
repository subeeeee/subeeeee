/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-10 15:38:03
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-17 15:31:03
 * @Note 申购详情页
 */

import React from 'react'
import { BackTitle } from './common/baseTitle'
import RedText from './common/RedText'
import { showload } from './common/toast'
import { YingmiHeader } from './common/Multi'
import { isShowTitle, isIphoneX, finishPage } from '../common/setToken'
import Password from './common/Password'
import '../sass/trade-detail.scss'
import { Link } from 'react-router'
import BaseComponent from './baseComponent'
import DialogBox from './common/alertBox/DialogBox'
import {
  checkResult,
  PurchaseCancelApi,
  BuyDetailApi,
  FundCancelApi
} from '../common/api/api'
import { ROUTE_RETRIEVE_PSW } from '../common/route/routeName'
import { routePush } from '../common/route/routeAction'
import { Steps } from 'antd-mobile'

class BuyDetail extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let orderId = this.getParam('orderId')
    let showBtn = this.getParam('showBtn', 0)
    this.state = {
      orderId: orderId, //订单id
      orderStatus: '', //订单状态
      orderNo: '', //订单号
      message: '', //信息
      fundList: [], //基金列表
      step: [], //基金步骤
      fareSx: '--', //含有手续费
      feeDescribe: '', //费用描述
      failureCause: '', //失败原因
      hide: 0, //密码的显示与隐藏
      isCancellations: 0, //是否可撤单1是 0否
      dealPasswords: '', //密码
      isPower: '', //是否鉴权
      isShow: false, //默认弹框不出来
      showBtn: showBtn, //完成按钮
      orderType: '' //1是申购 2赎回 3定投
    }
  }

  getTitle() {
    return '申购详情'
  }

  componentDidMount() {
    this.getApiData()
  }

  /**
   * 接口数据
   *
   * @returns
   * @memberof BuyDetail
   */
  async getApiData() {
    let orderId = this.state.orderId
    showload(true)
    let result = await BuyDetailApi(orderId)
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
        isCancellations: tmp.isCancellations,
        isPower: tmp.isPower,
        orderType: tmp.orderType
      })
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

  cancelOrder = () => {
    this.getPurchaseCancelData()
  }

  /**
   *  订单撤销
   *
   * @memberof BuyDetail
   */
  async getPurchaseCancelData() {
    showload(true)
    let result = await FundCancelApi(
      this.state.orderId,
      this.state.dealPasswords
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      this.getApiData()
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
      // stepStatus：0.失败 1.等待中 2.完成
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
      orderType
    } = this.state

    return (
      <div className="trade-detail">
        {orderType == 1 ? (
          <BackTitle
            titleName="申购详情"
            back={
              showBtn == 1
                ? () => {
                    finishPage()
                  }
                : null
            }
            hasPostion={true}
          />
        ) : (
          <BackTitle
            titleName="定投详情"
            back={
              showBtn == 1
                ? () => {
                    finishPage()
                  }
                : null
            }
            hasPostion={true}
          />
        )}

        <Password
          show={hide}
          onEnd={this.onEndPwd}
          onHide={() => {
            this.setState({ hide: 0 })
          }}
        />
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
            routePush(ROUTE_RETRIEVE_PSW, {
              fundCode: this.state.fundCode
            })
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
            {orderType == 1 ? <span>申购明细</span> : <span>定投明细</span>}
            <span>
              含有手续费：
              <span style={{ color: '#FA5E4A' }}>{fareSx}</span>
            </span>
          </p>
        </div>
        <div className="from-title">
          <div className="list-1 small-size">基金名称</div>
          {orderType == 1 ? (
            <div className="list-2 small-size">申购金额(元)</div>
          ) : (
            <div className="list-2 small-size">定投金额(元)</div>
          )}

          <div className="list-3 small-size">确认份额(份)</div>
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

              {item.orderStatus == '0' && item.failureCause ? (
                <div className="fail-mess">
                  失败原因：
                  {item.failureCause}
                </div>
              ) : (
                ''
              )}
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
        ) : (
          ''
        )}
        {feeDescribe ? <div style={{ height: '4px' }} /> : ''}
        {feeDescribe ? (
          <div className="p-text">
            ＊手续费将从本次申购金额里自动扣除，不需额外支付
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

export default BuyDetail
