/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-13 13:45:22
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-06-11 11:11:30
 * @Note 组合赎回
 */

import React from 'react'
import ReactDom from 'react-dom'
import { toast, showload } from '../common/toast'
import { Router, Route, hashHistory } from 'react-router'
import { YingmiHeader } from '../common/Multi'
import AlertBox from '../common/alert-box'
import Password from '../common/Password'
import './groupRedeem.scss'
import Copyright from '../common/copyright.js'
import BaseComponent from '../baseComponent'
import {
  GroupRedeemInfoApi,
  checkResult,
  GroupRedeemApi,
  GroupRedeemFeeApi,
  GroupPrepareRatioApi,
  GroupRedeemAllApi,
  CheckGroupCanBuyOrRedeemApi
} from '../../common/api/api'
import {
  routePush,
  routeGoBack,
  routeReplace
} from '../../common/route/routeAction'
import { BackTitle } from '../common/baseTitle'
import DialogBox from '../common/alertBox/DialogBox'
import DialogConfirmBox from '../common/alertBox/DialogConfirmBox'
import { ROUTE_RULE_AND_RATE } from '../../common/route/routeName'
import { Slider } from 'antd-mobile'
import LoadingTxt from '../common/LoadingTxt'
import { BuyGroupStatusApi } from '../../common/api/api'
import { isIphone } from '../../common/setToken'
import { intervalTime } from '../../tools/tools'

export default class GroupRedeem extends BaseComponent {
  constructor(props) {
    super(props)
    this.fundGroupCode = this.getParam('fundGroupCode')
    this.groupName = this.getParam('groupName')
    let groupId = this.getParam('fundGroupId')
    this.setBackGroundColor('#f6f5fc')
    this.state = {
      fee: '',
      money: '',
      ratioTitle: '',
      receivedDate: '',
      timeBtn: 0,
      words: null,
      bankCard: '',
      buyType: 0,
      needShow: 0,
      isTrandePwd: 0,
      groupList: [
        {
          fundCode: '', //基金代码
          fundName: '', //基金名称
          shareType: '', //份额类型
          applyShare: '', //赎回份额
          time: '' //赎回日期
        }
      ],
      showPop: 0,
      ratioText: '',
      pwd: '',
      showPwd: false,
      userBankCardId: '',
      fundGroupId: groupId,
      ratio: 0.5,
      isLoading: 0,
      percent: 10,
      showPswLock: false, //交易密码锁定
      causeBoxShow: false, //显示异常提示框
      causeMsg: '', //异常消息
      maxRatio: 1, //最大赎回比例
      minRatio: 0.1, //最小赎回比例
      showRatio: false, //显示比例对话框
      showRatioTips: '', //显示比例对话框内容
      mustRedeemAll: false, //必须全部赎回
      mustRedeemResean: '', //必须全部赎回原因
      showMustRedeemDialog: false, //显示全部赎回原因
      showLoading: false, //显示查询状态loding
      orderId: '' //
    }
    this.timer = null
  }

  /**
   * 获取标题信息
   *
   * @memberof BaseComponent
   */
  getTitle() {
    return '我要提现'
  }

  /**
   * 获取数据
   *
   * @memberof GroupRedeem
   */
  async getData() {
    showload(true)
    let resultAll = await GroupRedeemAllApi(this.state.fundGroupId)
    //是否全部赎回
    let mustRedeemAll = false
    if (checkResult(resultAll, false)) {
      mustRedeemAll = resultAll.data.status == 0
      this.setState({
        mustRedeemAll: mustRedeemAll,
        mustRedeemResean: resultAll.data.str,
        showMustRedeemDialog: mustRedeemAll
      })
    }
    let result = await GroupRedeemInfoApi(this.state.fundGroupId)
    showload(false)
    if (checkResult(result, false)) {
      if (mustRedeemAll) {
        // 全部赎回
        this.setState({ ...result.data, ratio: 1.0 }, () => {
          this.getRedeemGroupFee()
        })
      } else {
        this.setState({ ...result.data }, () => {
          this.getRedeemGroupFee()
        })
      }
    } else if (result.code == 11000) {
      // 当前可赎回份额为0
      this.setState({ causeBoxShow: true, causeMsg: result.msg })
    } else {
      toast(result.msg)
    }
  }

  //组合赎回的接口
  componentDidMount() {
    this.getData()
  }

  /**
   * 赎回
   *
   * @memberof GroupRedeem
   */
  go = async () => {
    let { ratio, minRatio, maxRatio, fundGroupId } = this.state
    // 是否能赎回
    showload(true)
    let result = await CheckGroupCanBuyOrRedeemApi(fundGroupId)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (!Number(data.canRedeem)) {
        toast(data.cannotRedeemReason)
        return
      }
    }

    showload(true)
    result = await GroupPrepareRatioApi(fundGroupId, ratio)
    showload(false)
    if (checkResult(result)) {
      let data = result.data
      if (data.status) {
        // 验证成功
        this.setState({
          showPwd: true
        })
      } else {
        this.setState({ showRatio: true, showRatioTips: data.ratioStr })
      }
    }
  }

  componentWillUnmount = () => {
    this.redeemInterval && clearInterval(this.redeemInterval)
  }
  /**
   * 提现
   *
   * @memberof GroupCombinedPage
   */
  post = async () => {
    showload(true)
    let result = await GroupRedeemApi(
      this.state.fundGroupId,
      this.state.pwd,
      this.state.userBankCardId,
      this.state.ratio
    )
    showload(false)
    if (checkResult(result)) {
      this.checkTimes = 0 //查询次数
      this.setState(
        {
          showLoading: true,
          orderId: result.data.orderId
        },
        () => {
          this.redeemInterval = intervalTime(() => {
            if (this.checkTimes >= 3) {
              this.toGroupRedeemDetail()
            } else {
              this.checkRedeemStatus()
              this.checkTimes++
            }
          }, 2000)
        }
      )
    } else if (result.code == 11001) {
      this.setState({ showPswLock: true })
    }
  }

  /**
   *赎回详情页
   *
   * @memberof GroupRedeem
   */
  toGroupRedeemDetail = () => {
    this.redeemInterval && clearInterval(this.redeemInterval)
    this.setState({
      showLoading: false
    })
    routeReplace('/GroupRedeemDetail', {
      orderId: this.state.orderId,
      showBtn: 1
    })
  }

  /**
   *订单查询状态
   *
   * @memberof GroupRedeem
   */
  checkRedeemStatus = async () => {
    let result = await BuyGroupStatusApi(this.state.orderId)
    if (checkResult(result, false)) {
      if (result.data.orderStatus == 1 || result.data.orderStatus == 2) {
        if (result.data.deductStatus == 1 || result.data.deductStatus == 2) {
          this.toGroupRedeemDetail()
        }
      } else {
        this.toGroupRedeemDetail()
      }
    }
  }

  /**
   * 输入密码
   *
   * @memberof GroupRedeem
   */
  onEndPwd = value => {
    this.setState(
      {
        pwd: value,
        showPwd: false
      },
      this.post
    )
  }

  /**
   * 隐藏密码
   *
   * @memberof GroupRedeem
   */
  onHidePwd = () => {
    this.setState({
      showPwd: false
    })
  }

  /**
   * 改变赎回比例
   *
   * @memberof GroupRedeem
   */
  changeRatio = value => {
    this.setState(
      {
        ratio: value / 100,
        isLoading: 1
      },
      () => {
        this.getRedeemGroupFee()
      }
    )
  }

  /**
   * 组合费率
   *
   * @memberof GroupRedeem
   */
  getRedeemGroupFee = async () => {
    showload(true)
    let result = await GroupRedeemFeeApi(
      this.state.fundGroupId,
      this.state.userBankCardId,
      this.state.ratio
    )
    showload(false)

    if (checkResult(result)) {
      this.setState({ groupList: result.data.data })
    }
  }

  /**
   *赎回详情的点击事件
   *
   * @memberof GroupRedeem
   */
  clickRedeemDetail = () => {
    routePush(ROUTE_RULE_AND_RATE, {
      fundGroupCode: this.fundGroupCode,
      groupName: this.groupName
    })
  }

  /**
   * 渲染赎回基金信息
   *
   * @memberof GroupRedeem
   */
  renderGroupFundItem = (item, index) => {
    return (
      <div key={index} className="names">
        <span
          className="left"
          style={{ width: '50%', textAlign: 'left', lineHeight: '20px' }}
        >
          <span>{item.fundName}</span>
        </span>
        <span style={{ width: '25%', textAlign: 'center' }}>
          {item.applyShare}
        </span>

        <span style={{ flex: 1, textAlign: 'center' }}>{item.time}</span>
      </div>
    )
  }

  /**
   * dom 回调
   *
   * @memberof GroupRedeem
   */
  domCallBack = dom => {
    this.dialogDom = ReactDom.findDOMNode(dom)
    if (this.dialogDom && isIphone()) {
      //截取侧滑返回
      this.dialogDom.ontouchstart = e => {
        this.startMoveX = e.targetTouches[0].pageX
      }
      this.dialogDom.ontouchmove = e => {
        let moveX = e.targetTouches[0].pageX
        if (moveX - this.startMoveX > 10) {
          e.preventDefault()
        }
      }
      this.dialogDom.ontouchend = e => {}
    }
  }

  /**
   * 渲染
   *
   * @returns
   * @memberof GroupRedeem
   */
  render() {
    let {
      fee,
      money,
      receivedDate,
      timeBtn,
      bottomText,
      words,
      bankCard,
      buyType,
      needShow,
      groupList,
      showPop,
      ratioText,
      pwds,
      ratioTitle,
      causeBoxShow,
      causeMsg,
      showRatio,
      minRatio,
      maxRatio,
      ratio,
      showRatioTips,
      mustRedeemAll,
      mustRedeemResean,
      showMustRedeemDialog
    } = this.state

    return (
      <div className="groupCombinedPage" ref={this.domCallBack}>
        <BackTitle titleName={this.getTitle()} hasPostion={true} />
        <Password
          show={this.state.showPwd}
          onEnd={this.onEndPwd}
          onHide={this.onHidePwd}
          text={'您将赎回<span style=color:red>' + ratio * 100 + '%</span>'}
        />
        <YingmiHeader />
        <DialogBox
          isShow={this.state.showPswLock}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ showPswLock: false })
          }}
          confirmCallBack={() => {
            routePush('/retrievePassword', {
              fundCode: this.state.groupId
            })
          }}
        />
        <DialogBox
          isShow={showMustRedeemDialog}
          text={mustRedeemResean}
          title={'温馨提示'}
          cancelText={'放弃'}
          confirmText={'全部赎回'}
          cancelCallBack={() => {
            routeGoBack()
          }}
          confirmCallBack={() => {
            this.setState({ showMustRedeemDialog: false })
          }}
        />
        <DialogConfirmBox
          isShow={showRatio}
          text={showRatioTips}
          textAlign="justify"
          confirmCallBack={() => {
            this.setState({ showRatio: false })
          }}
        />
        <DialogConfirmBox
          isShow={showPop}
          title={ratioTitle}
          text={ratioText}
          textAlign="justify"
          confirmText="知道了"
          confirmCallBack={() => {
            this.setState({ showPop: false })
          }}
        />
        <DialogConfirmBox
          text={causeMsg}
          isShow={causeBoxShow}
          confirmCallBack={() => {
            routeGoBack()
          }}
        />
        <div className="retesBox">
          {mustRedeemAll && (
            <p className="mustAllRedeem">
              该组合有申购中订单，仅支持全部赎回。
            </p>
          )}
          <p
            className="rates"
            onClick={() => {
              this.setState({ showPop: 1 })
            }}
          >
            {ratioTitle}
            <img src={require('./images/help-yellow.png')} />
          </p>
          <p className="proportion">请选择赎回比例</p>
          <p className="tvRatio">{ratio * 100 + '%'}</p>
          <Slider
            className="slider"
            trackStyle={{
              height: '10px',
              borderRadius: '41px'
            }}
            railStyle={{
              height: '10px',

              borderRadius: '41px'
            }}
            handleStyle={{
              height: '30px',
              width: '30px'
            }}
            disabled={mustRedeemAll}
            defaultValue={ratio * 100}
            value={ratio * 100}
            min={10}
            max={100}
            step={10}
            onChange={this.changeRatio}
          />
        </div>
        <div className="wordBig">
          <p
            className="word-one"
            hidden={receivedDate == null || receivedDate == ''}
          >
            预计
            <span>{receivedDate}</span>
          </p>
        </div>
        <div className="scopic-btn">
          <div style={{ display: timeBtn ? 'block' : 'none' }}>
            <div className="tableBar">
              <ul className="named">
                <li
                  style={{ width: '50%', fontSize: '11px', textAlign: 'left' }}
                >
                  基金名称
                </li>
                <li
                  style={{
                    width: '25%',
                    fontSize: '11px',
                    textAlign: 'center'
                  }}
                >
                  赎回份额(份)
                </li>
                <li style={{ flex: 1, fontSize: '11px', textAlign: 'center' }}>
                  赎回确认
                </li>
              </ul>
              {groupList && groupList.map(this.renderGroupFundItem)}
            </div>
            <div className="bottom-text">
              *每只基金赎回费率与持有期有关，实际费用收取以基金公司确认为准。
              <p className="redeemDetail" onClick={this.clickRedeemDetail}>
                赎回规则
              </p>
              {words && words.length !== 0 ? (
                <span
                  className="link"
                  onClick={() => {
                    hashHistory.push({
                      pathname: '/free-intro',
                      query: { data: JSON.stringify(words) }
                    })
                  }}
                >
                  详情
                </span>
              ) : null}
            </div>
          </div>
          <div
            className="moreBtn"
            onClick={() => {
              this.setState({ timeBtn: !this.state.timeBtn })
            }}
          >
            {!timeBtn ? '查看组合内各基金具体赎回时间与费率' : '收起'}
            {!timeBtn ? (
              <img src={require('./images/open-down.png')} />
            ) : (
              <img src={require('./images/open-up.png')} />
            )}
          </div>
        </div>
        <div className="empty" />
        <div className="redeem">赎回至</div>
        <p className="bankCard">
          <img src={require('./images/round-checked.png')} />
          <span>{bankCard}</span>
        </p>
        <Copyright className="mt30 mb60" />
        <div
          className="bottomBtn"
          onClick={
            needShow
              ? () => {
                  this.setState({ needShow: 1 })
                }
              : this.go
          }
        >
          <p className="rightNow">马上提现</p>
        </div>
        <LoadingTxt msg={'正在查询赎回状态...'} show={this.state.showLoading} />
      </div>
    )
  }
}
