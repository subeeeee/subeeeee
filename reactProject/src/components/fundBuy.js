import React from 'react'
import ReactDom from 'react-dom'
import cot from 'cookie.js'
import { hashHistory } from 'react-router'
import { BackTitle } from './common/baseTitle'
import ajax from '../common/api'
import { toast, showload } from './common/toast'
import LoadingTxt from './common/LoadingTxt'
import RedText from './common/RedText'
import Copyright from './common/copyright.js'
import {
  setToken,
  isIphone,
  changeTitle,
  isShowTitle,
  setAppVerion
} from '../common/setToken'
import '../sass/fundBuy.scss'
import CDiv from './common/CDiv'
import BaseComponent from './baseComponent'
import DialogBox from './common/alertBox/DialogBox'
import {
  checkResult,
  FundBuyPrepareApi,
  FundEstimatedFeeApi,
  FundBuyApi,
  CheckBuyStatusApi
} from '../common/api/api'
import Password from './common/Password'
import KeyBoard from './common/keyBoard'
import {
  ROUTE_BANK_CHECK,
  ROUTE_TEST,
  ROUTE_BUY_DETAIL,
  ROUTE_IFRAME,
  ROUTE_RETRIEVE_PSW,
  ROUTE_ASSET_DETAIL
} from '../common/route/routeName'
import MoneyInput from './common/moneyInput/moneyInput'

let cir = num => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push('1')
  }
  return arr
}

class FundBuy extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    const fundCode = this.props.location.query.fundCode
    let money = cot.get('page') == 'iframe' ? cot.get('money') : ''
    this.FundBuyPrepare()
    this.state = {
      fundCode: fundCode,
      initialHint_: null,
      initialHint: [],
      title: '--',
      fundRuleUrl: '',
      pwd: '',
      hide: 0,
      userBankCardId: '',
      bankName: '',
      bankAccountTail: '',
      minMoney: 2000,
      money: money,
      isPwd: 1,
      goBtn: 0,
      rightValue: false,
      cardName: '',
      isRisk: 0,
      confrim: 1,
      quotaDaily: '--',
      quotaPer: '--',
      isLoading: 0,
      riskHint: null,
      testData: {},
      testShow: 0,
      needDeal: 0,
      from: this.props.location.query.from || 0,
      showLoading: 0,
      preventResubmit: '',
      orderId: '',
      readyjump: false,
      loadPassword: 1, //密码输入三次以后弹框 1是正常，0是超过三次
      isShow: false,
      isShowed: 0, //高风险提示
      bankListUrl: '', //银行限额列表地址
      keyBoardShow: false //键盘的隐藏与否
    }

    this.timer = null
    this.buyTimer = null
    this.buyInterval = null
    // 表单引用
    this.inputRef = null
  }
  /**
   *基金人够前准备信息
   *
   * @returns
   * @memberof FundBuy
   */
  async FundBuyPrepare() {
    const fundCode = this.props.location.query.fundCode
    showload(true)
    let result = await FundBuyPrepareApi(fundCode)
    showload(false)
    if (result.code == 11000) {
      toast('您现在还未绑卡，请先绑定银行卡')
      hashHistory.push(ROUTE_BANK_CHECK)
      return null
    } else if (result.code == 10002) {
      hashHistory.push(ROUTE_TEST)
      return null
    } else if (checkResult(result)) {
      let tmp = result.data
      this.setState(
        {
          fundCode: fundCode,
          title: tmp.title,
          userBankCardId: tmp.userBankCardId,
          bankName: tmp.bankName,
          bankAccountTail: tmp.bankAccountTail,
          minMoney: tmp.minMoney,
          isPwd: tmp.isPwd,
          cardName: tmp.bankAccountTail,
          isRisk: tmp.isOvertopRisk,
          quotaDaily: tmp.limitPerDay,
          quotaPer: tmp.limitPerPayment,
          riskHint: tmp.riskHint,
          testData: tmp.riskPopup,
          initialHint_: tmp.initialHint,
          fundRuleUrl: tmp.fundRuleUrl,
          preventResubmit: tmp.preventResubmit,
          bankListUrl: tmp.bankListUrl,
          isShowed:
            tmp.riskPopup && tmp.riskPopup.isPopup ? tmp.riskPopup.isPopup : 0
        },
        () => {
          if (this.state.isShowed == 0) {
            this.inputRef.showKeyBoard()
          }
        }
      )
    } else {
      hashHistory.goBack()
      return null
    }
  }
  getTitle() {
    return '申购'
  }

  componentWillUnmount = () => {
    document.body.style.backgroundColor = '#fff'
    document.getElementsByTagName('html')[0].style.backgroundColor = '#fff'
    cot.set('page', '', { maxAge: 60 * 60 })
  }

  pop = params => {
    this.setState(
      {
        hide: 1
      },
      () => {
        setTimeout(() => {
          ReactDom.findDOMNode(this.refs.i1)
        }, 100)
      }
    )
  }

  go = () => {
    let { isPwd } = this.state

    if (isPwd == 1) {
      //密码
      this.setState({
        testShow: 0,
        needDeal: 0
      })
      this.pop()
      return null
    }
  }

  isSafe = () => {
    if (this.state.goBtn == 0) {
      return
    }
    this.go()
  }

  lqbMoneyChange = money => {
    if (
      money - 0 >= this.state.minMoney - 0 &&
      money - 0 <= this.state.quotaPer * 10000
    ) {
      this.setState(
        {
          money: money,
          goBtn: 1,
          rightValue: true
        },
        () => {
          this.timer && clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.getDayliyProfit(money)
          }, 600)
        }
      )
    } else {
      this.setState({
        money: money,
        goBtn: 0,
        rightValue: false
      })
    }
  }

  getDayliyProfit = money => {
    this.setState({
      isLoading: 1
    })
    this.FundEstimatedFeeData(money)
  }
  /**
   * 手续费预估
   *
   * @memberof FundBuy
   */
  async FundEstimatedFeeData(money) {
    let result = await FundEstimatedFeeApi(this.state.fundCode, money)
    if (checkResult(result)) {
      this.setState({
        ...result.data,
        isLoading: 0
      })
    }
  }

  _changeConfrim = () => {
    if (this.state.confrim === 1) {
      this.setState({ confrim: 0 })
    } else {
      this.setState({ confrim: 1 })
    }
  }

  post = pwd => {
    this.setState({
      hide: 0,
      pwd: ''
    })
    this.fundBuy(pwd)
  }

  /**
   *申购
   *
   * @memberof FundBuy
   */
  async fundBuy(pwd) {
    let { preventResubmit, fundCode, userBankCardId } = this.state
    showload(true)
    let result = await FundBuyApi(
      preventResubmit,
      fundCode,
      userBankCardId,
      this.state.money - 0,
      pwd
    )
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      this.setState({ orderId: result.data.orderId }, () => {
        this.buyTimer && clearTimeout(this.buyTimer)
        this.buyTimer = setTimeout(() => {
          this.setState({ showLoading: 0 }, () => {
            if (!this.state.readyjump) {
              this.setState({ readyjump: true })
              this.buyInterval && clearTimeout(this.buyInterval)
              hashHistory.push({
                pathname: ROUTE_BUY_DETAIL,
                query: {
                  orderId: this.state.orderId,
                  showBtn: 1
                }
              })
            }
          })
        }, 5000)

        this.setState({ showLoading: 1 })

        this.buyInterval && clearTimeout(this.buyInterval)
        this.getBuyStatus()
        this.buyInterval = setInterval(() => {
          this.getBuyStatus()
        }, 1500)
      })
    } else {
      if (result.data.loadPassword == 0 && result.code == '11001') {
        this.setState({ showLoading: 0, isShow: true })
      } else {
        this.setState({ showLoading: 0 })
      }
    }
  }

  getBuyStatus = () => {
    this.CheckBuyStatusData()
  }

  /**
   * 查询申购订单状态
   *
   * @memberof FundBuy
   */
  async CheckBuyStatusData() {
    let orderId = this.state.orderId
    let result = await CheckBuyStatusApi(orderId)
    if (checkResult(result)) {
      if (result.data.orderStatus == 1 || result.data.orderStatus == 2) {
        if (result.data.deductStatus == 1 || result.data.deductStatus == 2) {
          this.setState({ readyjump: true })
          this.buyTimer && clearTimeout(this.buyTimer)
          this.buyInterval && clearTimeout(this.buyInterval)
          hashHistory.push({
            pathname: ROUTE_BUY_DETAIL,
            query: {
              orderId: orderId,
              showBtn: 1
            }
          })
        }
      } else {
        this.setState({ readyjump: true })
        this.buyTimer && clearTimeout(this.buyTimer)
        this.buyInterval && clearTimeout(this.buyInterval)
        hashHistory.push({
          pathname: ROUTE_BUY_DETAIL,
          query: {
            orderId: orderId,
            showBtn: 1
          }
        })
      }
    }
  }

  toIframe = url => () => {
    cot.set('money', this.state.money, { maxAge: 60 * 60 })
    hashHistory.push({
      pathname: ROUTE_IFRAME,
      query: {
        name: '费率明细',
        url
      }
    })
  }

  // 密码框
  onEndPwd = value => pwd => {
    this.setState(
      {
        pwd: value,
        hide: 0
      },
      () => {
        this.post(pwd)
      }
    )
  }

  /**
   *input的输入事件
   *
   * @memberof FundBuy
   */
  inputMoney = text => {
    let money = text
    this.lqbMoneyChange(money)
  }

  render() {
    let {
      bankName,
      bankAccountTail,
      title,
      goBtn,
      isLoading,
      pwd,
      hide,
      minMoney,
      money,
      quotaPer,
      quotaDaily,
      riskHint,
      from,
      fundCode,
      initialHint_,
      rightValue,
      initialHint,
      fundRuleUrl,
      testData,
      bankListUrl
    } = this.state
    return (
      <div className="fund-buy">
        <BackTitle titleName="申购" hasPostion={true} />
        <div className="buy-rule">
          <div className="titleName">{title}</div>
          {fundRuleUrl ? (
            <spn
              className="right-text"
              onClick={() => {
                hashHistory.push({
                  pathname: ROUTE_IFRAME,
                  query: {
                    url: fundRuleUrl,
                    name: '交易规则'
                  }
                })
              }}
            >
              交易规则
            </spn>
          ) : (
            ''
          )}
        </div>
        <div className="pay-line">
          <div className="line" />
        </div>
        <LoadingTxt msg={'正在查询支付状态...'} show={this.state.showLoading} />
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
        <Password
          show={hide}
          onEnd={this.onEndPwd(pwd)}
          onHide={() => {
            this.setState({ hide: 0 })
          }}
        />

        <div className="white">
          <div className="borderall" ref="borderall" />
          <div className="money-input">
            <MoneyInput
              className="moneyInvest"
              placeholder={minMoney + '元起购'}
              ref={ref => {
                this.inputRef = ref
              }}
              onChange={this.inputMoney}
              maxLength={10}
            />
          </div>
        </div>
        <div className="alert-text">
          {rightValue ? (
            <div>
              {isLoading ? (
                <img
                  src={require('../asset/loading.gif')}
                  style={{ marginLeft: '25px' }}
                />
              ) : (
                initialHint.map((item, index) => {
                  return (
                    <p key={index}>
                      <RedText text={item} margin="0 2px" />
                    </p>
                  )
                })
              )}
            </div>
          ) : (
            ''
          )}
          {money - 0 < minMoney - 0 && money ? (
            <p>
              最低
              <span className="red">{minMoney}</span>
              元起购
            </p>
          ) : (
            ''
          )}
          {money - 0 > quotaPer * 10000 && money ? (
            <p>
              单笔限额
              <span className="red">{quotaPer}</span>万
            </p>
          ) : (
            ''
          )}
          {!money && initialHint_ ? (
            <div>
              {initialHint_.map((item, index) => {
                return (
                  <p key={index}>
                    <RedText text={item} margin="0 0px" />
                  </p>
                )
              })}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="line10" />
        <div className="pay-title">支付方式</div>
        <div className="pay-line">
          <div className="line" />
        </div>
        <div className={'pay-bank select-pay'}>
          <div>
            <p>
              <img src={require('../asset/round-checked.png')} />
              <em>
                {bankName} (尾号
                {bankAccountTail})
              </em>
            </p>
            <p className="bottom-info">
              单笔限额
              {quotaPer}
              万,单日限额
              {quotaDaily}万
            </p>
          </div>
          {bankListUrl ? (
            <div
              className="see"
              onClick={() => {
                hashHistory.push({
                  pathname: ROUTE_IFRAME,
                  query: {
                    url: bankListUrl,
                    name: '银行限额'
                  }
                })
              }}
            >
              查看限额
            </div>
          ) : null}
        </div>
        <DialogBox
          isShow={this.state.isShowed}
          text={testData.text}
          title={testData.title}
          cancelText={'放弃'}
          confirmText={'继续购买'}
          cancelCallBack={() => {
            hashHistory.goBack()
          }}
          confirmCallBack={() => {
            this.setState({ isShowed: 0 }, () => {
              this.inputRef.showKeyBoard()
            })
          }}
        />
        <CDiv
          className="next-btn"
          style={goBtn ? {} : { background: '#D8D8D8' }}
          onClick={this.isSafe}
        >
          立即申购
        </CDiv>
        <Copyright className="mt30 pb30" />
      </div>
    )
  }
}

export default FundBuy
