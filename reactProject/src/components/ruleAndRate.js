/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: chenzhuanzhuan
 * @Date: 2019-04-12 11:26:58
 * @Last Modified by: chenzhuanzhuan
 * @Last Modified time: 2019-05-15 18:49:23
 * @Note 规则详情和费率
 */
import React, { Component } from 'react'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'
import '../sass/ruleAndrate.scss'
import { showload } from './common/toast'
import { tradingRulesApi, checkResult } from '../common/api/api'
/**
 * 组件
 *
 * @export
 * @class componentName
 * @extends {Component}
 */
export default class ruleAndRate extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    this.fundGroupCode = this.getParam('fundGroupCode')

    this.state = {
      currentIndex: 0, //买入卖出当前的下标0是买出1是买入
      isOpen: true, //申购费率箭头的展开与收起
      buyIsOpen: true, //买入确认时间
      InitialIsOpen: true, //申购起投金额
      sellOutOpen: true, //赎回费率箭头的展开与收起
      sellOutTime: true, //赎回确认时间箭头的展开与收起
      sellOutShare: true, //赎回份额限制箭头的展开与收起
      bugRates: [
        {
          // fundName: '先锋金1A', //申购费率中基金名称
          //   buyMoneyList: [
          //     {
          //       buyMoney: '50000', //买入金额
          //       purchaseApply: '20%' // 申购费率
          //     },
          //     {
          //       buyMoney: '50000', //买入金额
          //       purchaseApply: '20%' // 申购费率
          //     },
          //     {
          //       buyMoney: '50000', //买入金额
          //       purchaseApply: '20%' // 申购费率
          //     }
          //   ]
        }
      ], //申购费率
      time: {
        fund: [
          // {
          //   fundName: '', //基金名称，
          //   purChaseDayOne: '', //T+1
          //   purChaseDayTwo: '' //T+2
          // }
        ], //买入确认时间单支基金
        group: [
          // {
          //   fundName: '', //组合基金名称
          //   profit: '', //T+2时间
          //   share: '' //T+1时间
          // }
        ] //买入确认时间组合基金
      }, //买入确认时间
      minBalance: {
        // group: [
        //   {
        //     money: '', //起投金额
        //     fundName: '' //组合名称
        //   }
        // ], //组合名称
        // fund: [
        //   {
        //     fundName: '', //基金名称
        //     money: '' //最低起投金额
        //   }
        // ] //单支基金
      }, //申购起投金额

      redeem: [], //赎回
      remtime: { group: [], fund: [] }, //赎回确认时间
      remfund: [], //赎回份额限制
      groupInitalAmount: '' //组合的最低起投金额
    }
  }
  /**
   *买入规则
   *
   * @memberof ruleAndRate
   */
  purchase = currentIndex => () => {
    this.setState({
      currentIndex: 0
    })
  }
  /**
   *卖出规则
   *
   * @memberof ruleAndRate
   */
  sellOut = currentIndex => () => {
    this.setState({
      currentIndex: 1
    })
  }
  /**
   *申购费率箭头的点击事件
   *
   * @memberof ruleAndRates
   */
  clickRatePurchase = () => {
    let { isOpen, buyIsOpen } = this.state
    this.setState({
      isOpen: !isOpen
    })
  }

  /**
   *申购买入确认时间箭头的点击事件
   *
   * @memberof ruleAndRate
   */
  clickRatePurchased = () => {
    let { buyIsOpen } = this.state
    this.setState({
      buyIsOpen: !buyIsOpen
    })
  }
  /**
   * 申购起投金额的的点击事件
   *
   * @memberof ruleAndRate
   */
  clickRatePurchaseds = () => {
    let { InitialIsOpen } = this.state
    this.setState({
      InitialIsOpen: !InitialIsOpen
    })
  }

  /**
   *赎回费率箭头的展开与收起
   *
   * @memberof ruleAndRate
   */
  clickRedeemSellOut = () => {
    let { sellOutOpen } = this.state
    this.setState({
      sellOutOpen: !sellOutOpen
    })
  }

  /**
   *赎回确认时间箭头的展开与收起
   *
   * @memberof ruleAndRate
   */
  clickRedeemTime = () => {
    let { sellOutTime } = this.state
    this.setState({
      sellOutTime: !sellOutTime
    })
  }

  /**
   *
   *赎回份额限制箭头的展开与收起
   * @memberof ruleAndRate
   */
  clickRedeemShareLimit = () => {
    let { sellOutShare } = this.state
    this.setState({
      sellOutShare: !sellOutShare
    })
  }
  /**
   *接口数据
   *
   * @memberof ruleAndRate
   */
  componentDidMount() {
    this.tradingRulesApiData()
  }

  /**
   *组合交易规则和费率的数据显示
   *
   * @memberof ruleAndRate
   */
  async tradingRulesApiData() {
    showload(true)
    let result = await tradingRulesApi(this.fundGroupCode)
    showload(false)

    if (checkResult(result)) {
      this.setState({
        bugRates: result.data.ratio.allotRate,
        time: result.data.time,
        minBalance: result.data.minBalance,
        redeem: result.data.ratio.redeem,
        remtime: result.data.remtime,
        remfund: result.data.remfund,
        groupInitalAmount:
          result.data.minBalance.group && result.data.minBalance.group[0].money
      })
    }
  }

  /**
   *申购（赎回）费率的数据
   *
   * @memberof ruleAndRate
   */
  IntervalValue = (item, index) => {
    return (
      <div className="fundDetail" key={index}>
        <p className="fundName">{item.fundName}</p>
        {this.state.currentIndex == 0 ? (
          <div className="fundRateList">
            <ul className="buyMoney">
              <li className="buies">买入金额</li>
              <li className="line" />
              <li className="buyRates">申购费率</li>
            </ul>
            {item.tablist &&
              item.tablist.map(this.renderFundList(item.tablist))}
          </div>
        ) : (
          <div className="fundRateList">
            <ul className="buyMoney">
              <li className="buies">持有时间（天）</li>
              <li className="line" />
              <li className="buyRates">赎回费率</li>
            </ul>
            {item.tablist &&
              item.tablist.map(this.renderFundList(item.tablist))}
          </div>
        )}
      </div>
    )
  }

  /**
   * 申购费率基金列表的数据显示
   *
   * @memberof ruleAndRate
   */
  renderFundList = tablist => (item, index) => {
    if (tablist && tablist.length - 1 == index) {
      return (
        <ul className="IntervalValueNoBottom" key={index}>
          <li className="dashedLine">{item.balance}</li>
          <li>{item.ratio}</li>
        </ul>
      )
    }

    return (
      <ul className="IntervalValue" key={index}>
        <li className="dashedLine">{item.balance}</li>
        <li>{item.ratio}</li>
      </ul>
    )
  }

  /**
   *买入确认时间的组合
   *
   * @memberof ruleAndRate
   */
  buyTimeGroup = (item, index) => {
    return (
      <p className="IntervalValue" key={index}>
        <span className="fundName">{item.fundName}</span>
        <span className="confirmationShare">{item.share}</span>
        <span className="lookViewing">{item.profit}</span>
      </p>
    )
  }

  /**
   * 买入确认时间的单支基金
   *
   * @memberof ruleAndRate
   */
  buyTimeFund = (item, index) => {
    let { fund } = this.state.time
    if (fund && fund.length - 1 == index) {
      return (
        <div className="buyMoneyedNoBottom" key={index}>
          <p className="fundName">{item.fundName}</p>
          <p className="confirmationShare">{item.share}</p>
          <p className="lookViewing">{item.profit}</p>
        </div>
      )
    }
    return (
      <div className="buyMoneyed" key={index}>
        <p className="fundName">{item.fundName}</p>
        <p className="confirmationShare">{item.share}</p>
        <p className="lookViewing">{item.profit}</p>
      </div>
    )
  }

  /**
   *申购起投金额的组合渲染
   *
   * @memberof ruleAndRate
   */
  minBalanceGroup = (item, index) => {
    return (
      <ul className="IntervalValueds" key={index}>
        <li className="fundName">{item.fundName}</li>
        <li>{item.money}</li>
      </ul>
    )
  }

  /**
   *申购起投金额的单支基金的渲染
   *
   * @memberof ruleAndRate
   */
  minBalanceFund = (item, index) => {
    let { fund } = this.state.minBalance
    if (fund && fund.length - 1 == index) {
      return (
        <ul className="IntervalValueNoBottom" key={index}>
          <li className="dashedLineds">{item.fundName}</li>
          <li>{item.money}</li>
        </ul>
      )
    }
    return (
      <ul className="IntervalValue" key={index}>
        <li className="dashedLineds">{item.fundName}</li>
        <li>{item.money}</li>
      </ul>
    )
  }

  /**
   *赎回确认时间的组合渲染
   *
   * @memberof ruleAndRate
   */
  remtimeGroup = (item, index) => {
    return (
      <p className="IntervalValue" key={index}>
        <span className="fundName">{item.fundName}</span>
        <span className="confirmationShare">{item.share}</span>
        <span className="lookViewing">{item.profit}</span>
      </p>
    )
  }
  /**
   *赎回确认时间的单只基金的渲染
   *
   * @memberof ruleAndRate
   */
  remtimeFund = (item, index) => {
    let { fund } = this.state.remtime
    if (fund && fund.length - 1 == index) {
      return (
        <p className="buyMoneyedNoBottom" key={index}>
          <span className="fundName">{item.fundName}</span>
          <span className="confirmationShare">{item.share}</span>
          <span className="lookViewing">{item.profit}</span>
        </p>
      )
    }
    return (
      <p className="buyMoneyed" key={index}>
        <span className="fundName">{item.fundName}</span>
        <span className="confirmationShare">{item.share}</span>
        <span className="lookViewing">{item.profit}</span>
      </p>
    )
  }

  /**
   *
   *赎回份额限制
   * @memberof ruleAndRate
   */
  remfund = (item, index) => {
    let { remfund } = this.state
    if (remfund && remfund.length - 1 == index) {
      return (
        <ul className="redeemLimitShareBottom" key={index}>
          <li className="fundNamed">{item.fundName}</li>
          <li className="lookViewing">{item.minIndividualRedeemVol}</li>
          <li className="confirmationShare">{item.minIndividualHoldVol}</li>
        </ul>
      )
    }
    return (
      <ul className="redeemLimitShare" key={index}>
        <li className="fundNamed">{item.fundName}</li>
        <li className="lookViewing">{item.minIndividualRedeemVol}</li>
        <li className="confirmationShare">{item.minIndividualHoldVol}</li>
      </ul>
    )
  }
  /**
   * 组件渲染
   *
   */
  render() {
    let {
      currentIndex,
      isOpen,
      buyIsOpen,
      InitialIsOpen,
      bugRates,
      time,
      throwMoney,
      redeem,
      sellOutOpen,
      sellOutTime,
      sellOutShare,
      remtime,
      remfund,
      minBalance,
      groupInitalAmount
    } = this.state

    return (
      <div className="ruleAndrate">
        <BackTitle
          titleName={'交易规则'}
          hasPostion={true}
          from={this.props.location.query.from}
        />
        <ul>
          <li
            onClick={this.purchase(0)}
            className={currentIndex == 0 ? 'li active' : 'li'}
          >
            买入规则
          </li>
          <li className="line" />
          <li
            onClick={this.sellOut(1)}
            className={currentIndex == 1 ? 'li active' : 'li'}
          >
            卖出规则
          </li>
        </ul>
        {currentIndex == 0 ? (
          <div className="purchaseBox">
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRatePurchase}>
                <span>申购费率</span>
                {isOpen == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {isOpen == false ? null : (
                <div>
                  {bugRates && bugRates.map(this.IntervalValue)}
                  <p className="explain">
                    注
                    ：组合展示的申购费率仅供参考，可能存在误差。实际收取费用以基金公司计算为准。
                  </p>
                </div>
              )}
            </div>
            <p className="emptyBox" />
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRatePurchased}>
                <span>买入确认时间</span>
                {buyIsOpen == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {buyIsOpen == false ? null : (
                <div>
                  <div className="confirmTime">
                    <div className="fundRateList">
                      <p className="buyMoney">
                        <span className="fundName">基金名称</span>
                        <span className="line" />
                        <span className="confirmationShare">份额确认</span>
                        <span className="line" />
                        <span className="lookViewing">查看收益</span>
                      </p>
                      {time && time.group && time.group.map(this.buyTimeGroup)}
                      {time && time.fund && time.fund.map(this.buyTimeFund)}
                    </div>
                  </div>
                  <div className="explain">
                    注：1、T日指交易日15:00前（不包含15:00），交易日15:00后为T+1日。
                    <p className="secondText">
                      2、交易时间买入后下一个交易日开始计算收益，如遇节假日顺延。
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="emptyBox" />
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRatePurchaseds}>
                <span>申购起投金额</span>
                {InitialIsOpen == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {InitialIsOpen == false ? null : (
                <div>
                  <div className="fundDetail">
                    <div className="fundRateList">
                      <ul className="buyMoney">
                        <li>基金名称</li>
                        <li className="line" />
                        <li>最低起投金额</li>
                      </ul>
                      {minBalance &&
                        minBalance.group &&
                        minBalance.group.map(this.minBalanceGroup)}
                      {minBalance &&
                        minBalance.fund &&
                        minBalance.fund.map(this.minBalanceFund)}
                    </div>
                  </div>
                  <p className="explain">
                    注
                    ：每只基金的申购金额按照组合总申购金额乘以持仓占比计算。为防止某只基金持仓占比过低导致无法申购，本组合的最低起购金额为
                    {groupInitalAmount}元。
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="purchaseBox">
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRedeemSellOut}>
                <span>赎回费率</span>
                {sellOutOpen == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {sellOutOpen == false ? null : (
                <div>
                  {redeem && redeem.map(this.IntervalValue)}
                  <p className="explain">
                    注
                    ：由于系统调仓原因，每个投资者相同组合的持仓情况可能不同，具体赎回费率以每只基金的实际持有时间以及持仓占比确定。基金赎回按照先进先出规则，实际收费费用以基金公司计算为准。
                  </p>
                </div>
              )}
            </div>
            <p className="emptyBox" />
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRedeemTime}>
                <span>赎回确认时间</span>
                {sellOutTime == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {sellOutTime == false ? null : (
                <div>
                  <div className="confirmTime">
                    <div className="fundRateList">
                      <p className="buyMoney">
                        <span className="fundName">基金名称</span>
                        <span className="line" />
                        <span className="confirmationShare">份额确认</span>
                        <span className="line" />
                        <span className="lookViewing">资金到账</span>
                      </p>
                      {remtime &&
                        remtime.group &&
                        remtime.group.map(this.remtimeGroup)}
                      {remtime &&
                        remtime.fund &&
                        remtime.fund.map(this.remtimeFund)}
                    </div>
                  </div>
                  <div className="explain">
                    注：1、如遇周末、国家法定节假日，资金到账时间及收益截止日期顺延。
                    <p className="secondText">
                      2、普通非货币基金自赎回发起后的3-4个工作日陆续到账，QDII基金赎回到账时间较长，一般需要一周左右。具体到账时间以银行入账时间为准
                    </p>
                  </div>
                </div>
              )}
            </div>

            <p className="emptyBox" />
            <div className="purchaseRate">
              <p className="RatePurchase" onClick={this.clickRedeemShareLimit}>
                <span>赎回份额限制</span>
                {sellOutShare == false ? (
                  <img src={require('../asset/open-down.png')} />
                ) : (
                  <img src={require('../asset/open-up.png')} />
                )}
              </p>
              {sellOutShare == false ? null : (
                <div>
                  <div className="fundDetails">
                    <div className="fundRateListS">
                      <ul className="redeemLimitShared">
                        <li className="fundName">基金名称</li>
                        <li className="line" />
                        <li className="numMall">最小赎回份额</li>
                        <li className="line" />
                        <li className="numberShare">最低保留份额</li>
                      </ul>
                      {remfund && remfund.map(this.remfund)}
                    </div>
                  </div>
                  <p className="explain">
                    注
                    ：成分基金中赎回份额的限制会影响组合赎回的比例。如果赎回比例较高且未全部赎回，可能导致某只基金剩余份额小于最低保留份额而无法赎回。如果赎回比例过低，可能导致某只基金赎回的份额低于最小赎回份额。因此系统会对投资者的赎回比例进行限定，请予以理解。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}
