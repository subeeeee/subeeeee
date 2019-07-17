import React from 'react'
import ReactDom from 'react-dom'
import { toast, showload } from './common/toast'
import { Router, Route, hashHistory } from 'react-router'
import { YingmiHeader } from './common/Multi'
import Slide from './slide'
import AlertBox from './common/alert-box'
import Password from './common/Password'
import '../sass/combinedPage.scss'
import Copyright from './common/copyright.js'
import toApi from '../common/api'
import { setToken, changeTitle } from '../common/setToken'

export default class combinedPage extends React.Component {
  constructor(props) {
    document
      .getElementsByTagName('head')[0]
      .getElementsByTagName('title')[0].innerText = '组合赎回'
    changeTitle('组合赎回')

    super(props)
    if (props.location.query.token) {
      setToken(props.location.query.token)
    }

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
      groupList: [],
      showPop: 0,
      ratioText: '',
      pwd: '',
      showPwd: false,
      userBankCardId: '',
      fundGroupId: props.location.query.fundGroupId || 1,
      ratio: 0,
      isLoading: 0,
      percent: 10
    }
  }

  //组合赎回的接口
  componentDidMount() {
    showload(true)
    toApi.combinedPage({ fundGroupId: this.state.fundGroupId }).then(data => {
      showload(false)
      console.log(data)
      if (data.status == 0) {
        this.setState({ ...data.data })
      } else {
        toast(data.msg)
      }
    })
  }

  go = () => {
    // if(this.setState.isTrandePwd == '1'){
    //     toast('您设置了极速交易，无需输入密码')
    //     this.post();
    //     return null;
    // }
    this.setState({
      showPwd: true
    })
  }

  post = () => {
    showload(true)
    toApi
      .immediateCash({
        fundGroupId: this.state.fundGroupId,
        dealPasswords: this.state.pwd,
        userBankCardId: this.state.userBankCardId,
        ratio: this.state.ratio
      })
      .then(data => {
        showload(false)
        console.log(data)
        if (data.status == 0) {
          hashHistory.push({
            pathname: '/sellDetail',
            query: {
              orderId: data.data.orderId,
              showBtn: 1
            }
          })
        } else {
          toast(data.msg)
        }
      })
  }

  onEndPwd = value => {
    this.setState(
      {
        pwd: value,
        showPwd: false
      },
      this.post
    )
  }

  onHidePwd = () => {
    this.setState({
      showPwd: false
    })
  }

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

  // 费率的接口
  getRedeemGroupFee = () => {
    showload(true)
    toApi
      .ratio({
        fundGroupId: this.state.fundGroupId,
        userBankCardId: this.state.userBankCardId,
        ratio: this.state.ratio
      })
      .then(data => {
        showload(false)
        console.log(data)
        if (data.status == 0) {
          this.setState({ ...data.data })
        }
      })
  }
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
      ratioTitle
    } = this.state
    const redeemGroupList = groupList || []
    return (
      <div className="combinedPage">
        <Password
          show={this.state.showPwd}
          onEnd={this.onEndPwd}
          onHide={this.onHidePwd}
        />
        <YingmiHeader />
        <div className="retesBox">
          <p
            className="rates"
            onClick={() => {
              this.setState({ showPop: 1 })
            }}
          >
            {ratioTitle}
            <img src={require('../asset/help-yellow.png')} />
          </p>
          <p className="proportion">请选择赎回比例</p>
          <Slide
            options={[
              { label: '10%', value: 10 },
              { label: '20%', value: 20 },
              { label: '30%', value: 30 },
              { label: '40%', value: 40 },
              { label: '50%', value: 50 },
              { label: '60%', value: 60 },
              { label: '70%', value: 70 },
              { label: '80%', value: 80 },
              { label: '90%', value: 90 },
              { label: '100%', value: 100 }
            ]}
            label=""
            onChange={this.changeRatio}
          />
        </div>
        <div className="wordBig">
          <p className="word-one">
            赎回手续费<span>{fee}</span>,赎回金额<span>{money}</span>
          </p>
          <p className="word-one">
            到账日期<span>{receivedDate}</span>
          </p>
        </div>
        <div className="scopic-btn">
          <div style={{ display: timeBtn ? 'block' : 'none' }}>
            <div className="tableBar">
              <ul className="names">
                <li style={{ width: '30%' }}>基金名称</li>
                <li style={{ width: '30%' }}>待赎回份额(份)</li>
                <li style={{ width: '20%' }}>赎回费率</li>
                <li style={{ width: '20%' }}>赎回天数</li>
              </ul>
              {(redeemGroupList || []).map((group, k) => {
                const fundList = group.fundList
                return (
                  <ul key={k}>
                    {(fundList || []).map((item, index) => {
                      return (
                        <ul key={index} className="names">
                          <li className="left" style={{ width: '30%' }}>
                            <span>{item.prodName}</span>
                            <span>{item.avaiShare}</span>
                          </li>
                          <li style={{ width: '30%' }}>{item.redeemShare}</li>
                          <li style={{ width: '20%' }}>{item.fee}</li>
                          <li style={{ width: '20%' }}>{item.day}</li>
                        </ul>
                      )
                    })}
                  </ul>
                )
              })}
            </div>
            <div className="bottom-text">
              *赎回时间不同费率不同，实际以基金公司为准
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
              <img src={require('../asset/arrow-down-blue.1.png')} />
            ) : (
              <img src={require('../asset/arrow-up-blue.1.png')} />
            )}
          </div>
        </div>
        <div className="empty" />
        <div className="redeem">赎回至</div>
        <p className="bankCard">
          <img src={require('../asset/round-checked.png')} />{' '}
          <span className="spanLeft">赎回至银行卡：</span>
          <span>{bankCard}</span>
        </p>
        <Copyright className="mt30 pb30" />
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
          马上提现
        </div>

        <AlertBox
          isOpen={showPop}
          text={ratioText}
          hide={() => {
            this.setState({ showPop: 0 })
          }}
          btn="我知道了"
        />
      </div>
    )
  }
}
