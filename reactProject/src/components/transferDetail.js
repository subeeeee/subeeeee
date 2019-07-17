/**
 * Created by ihavedream on 17/5/15.
 */
import React from 'react'
import { Link, hashHistory } from 'react-router'
import ajax from '../common/api'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import Copyright from './common/copyright.js'
import '../sass/trade-detail.scss'
import { changeTitle, isShowTitle } from '../common/setToken'
import BaseComponent from './baseComponent'

class TransferDetail extends BaseComponent {
  constructor(props) {
    super(props)

    const { adjustId } = this.props.location.query
    showload(true)
    ajax
      .trans({
        adjustId: adjustId
      })
      .then(data => {
        showload(false)
        console.log(data)
        if (data.code == 10001) {
          hashHistory.push('/login')
          return null
        }
        if (data.code != '00000') {
          toast(data.msg)
          return null
        }
        let tmp = data.data
        this.setState({
          orderNo: tmp.orderNo,
          message: tmp.message,
          processList: tmp.processList,
          fee: tmp.fee,
          errorMessage: tmp.errorMessage
        })
      })

    this.state = {
      orderNo: '',
      message: '',
      processList: [],
      fee: '--',
      errorMessage: ''
    }
  }

  getTitle() {
    return '调仓详情'
  }

  render() {
    let { orderNo, message, processList, fee, errorMessage } = this.state
    return (
      <div className="trade-detail">
        <BackTitle
          titleName="调仓详情"
          back={() => {
            hashHistory.goBack()
          }}
          hasPostion={true}
        />
        <div className="detail-title">
          订单号：
          {orderNo}
        </div>
        <div className="stage-map">
          <div className="mess">{message}</div>
          {processList.map((item, index) => {
            index += 1
            return (
              <div key={index}>
                <div
                  className={
                    parseInt(item.status)
                      ? `stage-${index} active`
                      : `stage-${index}`
                  }
                >
                  <div className="step">
                    {item.statusText ? (
                      <img
                        src={require(`../asset/trade-stage-${index}-b.png`)}
                      />
                    ) : (
                      <img src={require(`../asset/trade-stage-${index}.png`)} />
                    )}
                  </div>
                  <div className="text">
                    <span>{item.statusText}</span>
                    {item.textList.map(ele => {
                      return <em>{ele}</em>
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {errorMessage ? (
          <div className="fail-mess no-bootom">
            失败原因：
            {errorMessage}
          </div>
        ) : (
          ''
        )}
        <div style={{ height: '10px' }} />
        <div className="fee">
          调仓手续费：
          {fee}
        </div>
        <div style={{ height: '20px' }} />
        <Copyright />
      </div>
    )
  }
}

export default TransferDetail
