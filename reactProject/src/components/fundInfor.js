/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-13 14:21:52
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-11-13 14:54:21
 * @Note 基金信息页
 */

import React from 'react'
import '../sass/fundInfor.scss'
import toApi from '../common/api'
import { toast, showload } from './common/toast'
import Copyright from './common/copyright.js'
import BaseComponent from './baseComponent'
import { BackTitle } from './common/baseTitle'

class fundInfor extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      fundName: '--',
      market: null,
      fundCode: null,
      charge: null,
      buyVerifyTime: null,
      redeemTime: null,
      stockPortfolio: [],
      stockPortfolioDescribe: '',
      assetPortfolio: null,
      fundCodeNew: props.location.query.fundCodeNew || ''
    }
  }

  componentWillMount = () => {
    this.setBackGroundColor('#fff')
  }

  componentDidMount = () => {
    showload(true)
    toApi.fundIfor({ fundCodeNew: this.state.fundCodeNew }).then(data => {
      showload(false)

      if (data.status == 0) {
        this.setState({
          fundName: data.data.fundName,
          market: data.data.market,
          fundCode: data.data.fundCode,
          charge: data.data.charge,
          buyVerifyTime: data.data.buyVerifyTime,
          redeemTime: data.data.redeemTime,
          stockPortfolio: data.data.stockPortfolio,
          stockPortfolioDescribe: data.data.stockPortfolioDescribe,
          assetPortfolio: data.data.assetPortfolio.percent
        })
      } else {
        toast(data.msg)
      }
    })
  }

  render() {
    const {
      fundName,
      market,
      fundCode,
      charge,
      buyVerifyTime,
      redeemTime,
      stockPortfolio,
      stockPortfolioDescribe,
      assetPortfolio
    } = this.state

    return (
      <div className="fundInfor">
        <BackTitle titleName={fundName} hasPostion={true} />
        <div className="fundInfor-top">
          <div className="li">
            <span>{market && market[0].name}</span>
            <em style={{ color: '#4C4C4C' }}>{market && market[0].value}</em>
          </div>
          <div className="line" />
          <div className="li">
            <span>{market && market[1].name}</span>
            <em style={{ color: '#FF4100' }}>{market && market[1].value}</em>
          </div>
          <div className="line" />
          <div className="li">
            <span>{market && market[2].name}</span>
            <em style={{ color: '#FF4100' }}>{market && market[2].value}</em>
          </div>
        </div>
        <div className="space-row" />
        <div className="fund-row">
          <span>基金名称</span>
          <em>{fundName}</em>
        </div>
        <div className="fund-row">
          <span>基金代码</span>
          <em>{fundCode}</em>
        </div>
        <div className="fund-row">
          <span>基金公司申购费</span>
          <em style={{ color: '#FF4100' }}>{charge}</em>
        </div>
        <div className="fund-row">
          <span>认购确认</span>
          <em>{buyVerifyTime}</em>
        </div>
        <div className="fund-row">
          <span>赎回到账</span>
          <em>{redeemTime}</em>
        </div>
        <div className="fund-info-title">
          基金<span>资产配置</span>
        </div>
        <div className="space-line" />
        <div className="fund-info-ratio">
          {assetPortfolio &&
            assetPortfolio.map((item, i) => {
              const color = ['#FF4100', '#FFC100', '#1AB28C', '#999']
              return (
                <div className="li">
                  <div>
                    <span style={{ background: color[i] }} />
                    <em>{item.assetType}</em>
                    <p>{item.ratioInTotalAsset}</p>
                  </div>
                </div>
              )
            })}
        </div>
        {stockPortfolio != '' ? (
          <div>
            <div className="space-row" />
            <div className="fund-info-title">{stockPortfolioDescribe}</div>
            <div className="table-tr table-tr-head" style={{}}>
              <div>股票名称</div>
              <div style={{ textAlign: 'center' }}>持仓市值（万元）</div>
              <div style={{ textAlign: 'center' }}>占净资产比</div>
            </div>
            {stockPortfolio.map(ele => {
              return (
                <div className="table-tr">
                  <div>{ele.name}</div>
                  <div style={{ textAlign: 'center' }}>{ele.value}</div>
                  <div style={{ textAlign: 'center' }}>{ele.ratio}</div>
                </div>
              )
            })}
          </div>
        ) : null}
        <Copyright className="mt20 pb20" />
      </div>
    )
  }
}

export default fundInfor
