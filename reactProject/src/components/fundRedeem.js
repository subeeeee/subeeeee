/**
 * Created by shuis on 2017/4/11.
 */
import React from 'react'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import ReactDom from 'react-dom'
import ajax from '../common/api'
import { toast, showload } from './common/toast'
import RedText from './common/RedText'
import Password from './common/Password'
import ConfirmWindow from './common/ConfirmWindow'
import { YingmiHeader } from './common/Multi'
import Copyright from './common/copyright'
import '../sass/fundRedeem.scss'
import {
  setToken,
  changeTitle,
  isShowTitle,
  setAppVerion,
  isIphoneX
} from '../common/setToken'
import CDiv from './common/CDiv'
import BaseComponent from './baseComponent'
import DialogBox from './common/alertBox/DialogBox'
import {
  checkResult,
  FundRedeemPrepareApi,
  FundRedeemApi
} from '../common/api/api'
import {
  ROUTE_SELL_DETAIL,
  ROUTE_RETRIEVE_PSW
} from '../common/route/routeName'
import { routePush } from '../common/route/routeAction'
import MoneyInput from './common/moneyInput/moneyInput'

class FundRedeem extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.FundRedeemPrepareData()
    const fundCode = this.props.location.query.fundCode
    //获取原始窗口的高度
    this.originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    window.onresize = () => {
      //软键盘弹起与隐藏  都会引起窗口的高度发生变化
      let resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      if (resizeHeight * 1 < this.originalHeight * 1) {
        //resizeHeight<originalHeight证明窗口被挤压了
        let ua = navigator.userAgent.indexOf('Android')
        if (ua - 0 > -1) {
          ReactDom.findDOMNode(this.refs['bottom-logo']).style.display = 'none'
          ReactDom.findDOMNode(this.refs['bottom-btn']).style.display = 'none'
        }
      } else {
        let ua = navigator.userAgent.indexOf('Android')
        if (ua - 0 > -1) {
          ReactDom.findDOMNode(this.refs['bottom-logo']).style.display = ''
          ReactDom.findDOMNode(this.refs['bottom-btn']).style.display = ''
        }
      }
    }

    this.state = {
      init: 0,
      goBtn: 0, // 0 代表不可点  1可点
      fundCode: fundCode,
      fundName: '--',
      minShare: '',
      share: '',
      userBankCardId: '',
      initialHint: '',
      bankIcon: '',
      bankName: '',
      bankCard: '',
      isPwd: 0,
      redeemShare: '',
      hide: 0,
      pwd: '',
      showPwd: false,
      showConfirm: false,
      preventResubmit: '',
      isShow: false,
      keyBoardShow: false //键盘的隐藏与否
    }
    this.inputRef = null
  }

  getTitle() {
    return '基金赎回'
  }
  /**
   *赎回信息准备信息
   *
   * @memberof FundRedeem
   */
  async FundRedeemPrepareData() {
    let fundCode = this.props.location.query.fundCode
    showload(true)
    let result = await FundRedeemPrepareApi(fundCode)
    showload(false)
    if (checkResult(result)) {
      let tmp = result.data
      this.setState(
        {
          init: 1,
          minShare: tmp.minShare,
          share: tmp.enableShares,
          fundName: tmp.fundName,
          userBankCardId: tmp.userBankCardId,
          initialHint: tmp.initialHint,
          bankIcon: tmp.bankIcon,
          bankName: tmp.bankName,
          bankCard: tmp.bankAccountTail,
          isPwd: tmp.isPwd,
          preventResubmit: tmp.preventResubmit
        },
        () => {
          this.inputRef.showKeyBoard()
        }
      )
    } else {
      hashHistory.goBack()
      return null
    }
  }
  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
  }

  moneyChange = redeemShare => {
    if (
      redeemShare.indexOf('.') != -1 &&
      redeemShare.length > redeemShare.indexOf('.') + 2 + 1
    ) {
      redeemShare = redeemShare.substring(0, redeemShare.indexOf('.') + 2 + 1)
    }
    if (
      redeemShare - 0 >= this.state.minShare - 0 &&
      redeemShare - 0 <= this.state.share - 0
    ) {
      this.setState({
        redeemShare: redeemShare,
        goBtn: 1
      })
    } else {
      this.setState({
        redeemShare: redeemShare,
        goBtn: 0
      })
    }
  }

  onEndPwd = value => {
    this.setState(
      {
        pwd: value,
        showPwd: false
      },
      this.redeem
    )
  }

  onHidePwd = () => {
    this.setState({
      showPwd: false
    })
  }

  onHideConfirm = () => {
    this.setState({
      showConfirm: false
    })
  }

  onConfirm = () => {
    this.setState(
      {
        showConfirm: false
      },
      this.redeem
    )
  }

  submit = () => {
    if (this.state.redeemShare - 0 < this.state.minShare - 0) {
      toast('最小赎回份额：' + this.state.minShare)
      return
    } else if (this.state.redeemShare - 0 > this.state.share - 0) {
      toast('最大可赎回份额：' + this.state.share)
      return
    } else if (this.state.share - 0 < this.state.minShare - 0) {
      toast('可赎回份额小于最小赎回份额')
    }

    if (this.state.goBtn == 0) {
      return
    }
    if (this.state.isPwd == 1) {
      this.setState({
        showPwd: true
      })
    }
  }

  redeemAll = () => {
    this.setState({
      redeemShare: this.state.share,
      goBtn: this.state.share - 0 >= this.state.minShare - 0
    })
  }

  redeem = () => {
    this.FundRedeemData()
  }
  /**
   * 马上赎回
   *
   * @memberof FundRedeem
   */
  async FundRedeemData() {
    let { preventResubmit, fundCode, redeemShare, pwd } = this.state
    showload(true)
    let result = await FundRedeemApi(
      preventResubmit,
      fundCode,
      redeemShare,
      pwd
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      hashHistory.push({
        pathname: ROUTE_SELL_DETAIL,
        query: {
          orderId: result.data.orderId,
          showBtn: 1
        }
      })
    } else {
      if (result.data.loadPassword == 0 && result.code == '11001') {
        this.setState({ isShow: true })
      }
    }
    this.setState({
      hide: 0,
      pwd: ''
    })
  }

  /**
   *键盘的输入
   *
   * @memberof FundRedeem
   */
  inputMoney = text => {
    let redeemShare = text
    this.moneyChange(redeemShare)
  }

  render() {
    let {
      init,
      goBtn,
      pwd,
      hide,
      share,
      fundName,
      minShare,
      redeemShare,
      bankIcon,
      bankName,
      bankCard,
      initialHint
    } = this.state
    return (
      <div className="redeem">
        <BackTitle titleName="基金赎回" hasPostion={true} />
        <Password
          show={this.state.showPwd}
          onEnd={this.onEndPwd}
          onHide={this.onHidePwd}
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
            routePush(ROUTE_RETRIEVE_PSW, { fundCode: this.state.fundCode })
          }}
        />
        <ConfirmWindow
          show={this.state.showConfirm}
          onHideConfirm={this.onHideConfirm}
          onConfirm={this.onConfirm}
          info={'您将赎回 {' + this.state.redeemShare + '} 份'}
          title={'请您确认赎回份额'}
        />
        <div className="scroll">
          <YingmiHeader />
          <div className="asset">
            <div className="name">{fundName}</div>
            <div>可赎回份额</div>
            <div className="total">{share}</div>
          </div>
          <div className="r1pxline" />
          <div className="share">
            <div className="text">赎回份额</div>
            <MoneyInput
              placeholder={'最低赎回' + minShare + '份'}
              className="inputs"
              onChange={this.inputMoney}
              maxLength={(share + '').length + 3}
              ref={ref => {
                this.inputRef = ref
              }}
              value={redeemShare}
            />
            <CDiv className="redeemAll" onClick={this.redeemAll}>
              全部赎回
            </CDiv>
          </div>
          <div className="r1pxline" />
          <div className="expectArriveDate">
            <RedText text={initialHint} />
            <p>
              <span className="bank">
                {bankName}
                &nbsp;
                {bankCard}
              </span>
            </p>
          </div>
          <Copyright
            ref="bottom-logo"
            className={isIphoneX() ? 'copyright pb59' : 'copyright pb25'}
          />
          <CDiv
            ref="bottom-btn"
            className={goBtn ? 'get-now' : 'get-now noEnable'}
            onClick={this.submit}
            style={
              isIphoneX()
                ? { borderBottom: '34px solid #EFEFF4', height: '74px' }
                : { height: '40px' }
            }
          >
            马上赎回
          </CDiv>
        </div>
      </div>
    )
  }
}

export default FundRedeem
