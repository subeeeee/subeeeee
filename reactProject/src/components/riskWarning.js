import React, { Component } from 'react'
import '../sass/riskWarning.scss'
import { BackTitle } from './common/baseTitle'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle,
  finishPage,
  isIphoneX
} from '../common/setToken'
import { hashHistory } from 'react-router'
import { toast, showload } from './common/toast'
import ajax from '../common/api'
import { checkResult, TestAnswerSurveyApi } from '../common/api/api'
import { ROUTE_TEST, ROUTE_TEST_RESULT } from '../common/route/routeName'
import BaseComponent from './baseComponent'
import { routeReplace } from '../common/route/routeAction'
/**
 * 组件
 *
 * @export
 * @class RiskWarning  风险结果告知书
 * @extends {Component}
 */
export default class RiskWarning extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')

    this.state = {
      confrim: 1,
      from: props.location.query.from,
      fromPage: this.getParam('fromPage', null), //风险测评页面来源
      showResult: (props.location.query && props.location.query.showResult) || 0,
      formType: (props.location.query && props.location.query.fromPageType) || 0,
      investorType: (props.location.state && props.location.state.investorType) || '',
      riskTolerance: (props.location.state && props.location.state.riskTolerance) || '',
      matchingProduct: (props.location.state && props.location.state.matchingProduct) || '',
      evaluationIdentification:
        (props.location.state && props.location.state.evaluationIdentification) || '',
      reply: (props.location.state && props.location.state.reply) || {}
    }
    if (!isShowTitle()) {
      changeTitle(this._getTitle())
    }
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
  }

  _changeConfrim = () => {
    if (this.state.confrim == 1) {
      this.setState({ confrim: 0 })
    } else {
      this.setState({ confrim: 1 })
    }
  }

  toGoBack = () => {
    if (this.state.from && this.state.from == 'wx') {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }

  /**
   * 重新测评
   */
  againTest = () => {
    routeReplace(ROUTE_TEST, {
      from: this.state.from,
      fromPage: this.state.fromPage,
      isFromTest: true
    })
  }

  /**
   * 确认同意
   */
  sureResult = () => {
    if (this.state.confrim === 0) {
      toast('请勾选我已阅读并同意上述《投资者类型及风险匹配告知书》和《投资者确认函》')
      return
    }
    this.TestAnswerSurveyData()
  }

  /**
   *风险测评回复
   *
   * @memberof RiskWarning
   */
  async TestAnswerSurveyData() {
    let { evaluationIdentification, reply } = this.state
    showload(true)
    let result = await TestAnswerSurveyApi(evaluationIdentification, reply)
    showload(false)
    if (checkResult(result)) {
      if (this.state.showResult == 0) {
        routeReplace(ROUTE_TEST_RESULT, {
          showResult: 2,
          showBtn: 1,
          from: this.state.from,
          fromPage: this.state.fromPage,
          isFromTest: this.getParam('isFromTest', false)
        })
      } else {
        routeReplace(ROUTE_TEST_RESULT, {
          showResult: 2,
          from: this.state.from,
          fromPage: this.state.fromPage,
          isFromTest: this.getParam('isFromTest', false)
        })
      }
    }
  }

  _getTitle = () => {
    if (this.state.formType == 0) {
      return '投资者风险结果告知书'
    } else if (this.state.formType == 1) {
      return '投资者类型及风险匹配告知书'
    } else {
      return '投资者确认函'
    }
  }

  render() {
    return (
      <div className="riskWarning">
        <BackTitle titleName={this._getTitle()} back={this.toGoBack} hasPostion={true} />

        <div className="main pt15">
          {this.state.formType == 0 || this.state.formType == 1 ? (
            <div>
              <p className="top-title">投资者类型及风险匹配告知书</p>

              <p className="txt-content mt12">
                根据您填写的投资基本信息表，依据相关法律、法规的规定，我司将您认定为
                <span className="red">{this.state.investorType}</span>。
              </p>
              <p className="txt-content mt10">
                结合您填写的风险评测问卷以及其他相关信息，我司对您的风险承受能力进行了综合评估，现得到评估结果如下：
              </p>

              <p className="txt-content mt10">
                您的风险承受能力为：
                <span className="red">{this.state.riskTolerance}</span>
                ，依据我司的投资者与产 品、服务风险等级匹配规则，您的风险承受能力等级与我司
                <span className="red">{this.state.matchingProduct}</span>
                风险等级产品相匹配。
              </p>

              <p
                className={this.state.formType == 1 ? 'txt-content mt10 pb20' : 'txt-content mt10'}>
                我司在此郑重提醒，我司向您销售的产品或提供的服务将以您的风险承受能力等级和投资品种、期限为基础，若您提供的信息发生任何重大变化，您应当及时以书面方式通知我司。我司建议您审慎评判自身风险承受能力、结合资深投资行为，认真填写投资品种、期限，并做出审慎的投资判断。
              </p>
            </div>
          ) : (
            ''
          )}

          {this.state.formType == 0 || this.state.formType == 2 ? (
            <div>
              <p className="top-title mt10">投资者确认函</p>
              <p className="txt-content mt10 pb20">
                本人已仔细阅读贵司的《投资者类型及风险匹配告知书》，已充分知晓并理解贵司对本人的风险承受能力评估及产品、服务风险等级匹配结果。本人对该《投资者类型及风险匹配告知书》内容没有异议，愿意遵守法律、法规及贵司有关规定，通过贵司购买产品或者服务。本人承诺，将及时以书面方式如实地向贵司告知本人的重大信息变更。本确认函系本人独立、自主、真实的意思表示。特此确认。
              </p>
            </div>
          ) : (
            ''
          )}
        </div>

        {this.state.formType == 0 ? (
          <div>
            <p className="checks">
              <span
                className={`confrim-place ${this.state.confrim ? 'confrim-pre' : 'confrim-nor'}`}
                onClick={this._changeConfrim}
              />
              我已阅读并同意上述
              <span className="red">《投资者类型及风险匹配告知书》</span>和
              <span className="red">《投资者确认函》</span>
            </p>

            <div
              style={{ width: '100%', height: '50px' }}
              style={isIphoneX() ? { height: '84px' } : { height: '50px' }}
            />
            <div
              className="input-output-container-sp"
              style={
                isIphoneX()
                  ? { borderBottom: '34px solid #EFEFF4', height: '78px' }
                  : { height: '44px' }
              }>
              <div
                className="input-btn"
                style={{
                  width: '27%',
                  fontWeight: '400',
                  color: '#4D4F51',
                  fontSize: '17px'
                }}
                onClick={this.againTest}>
                重新评测
              </div>
              <div
                className="output-btn"
                style={{ width: '73%', fontSize: '17px', fontWeight: '400' }}
                onClick={this.sureResult}>
                确认同意
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
