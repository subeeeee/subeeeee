import React from 'react'
import { BackTitle } from './common/baseTitle'
import ajax from '../common/api'
import { toast, showload } from './common/toast'
import DialogBox from './common/alertBox/DialogBox'
import '../sass/test.scss'
import {
  setToken,
  changeTitle,
  setAppVerion,
  isShowTitle,
  finishPage
} from '../common/setToken'
import CDiv from './common/CDiv'
import BaseComponent from './baseComponent'
import { checkDateEx } from '../tools/tools'
import {
  checkResult,
  LookRiskLevelApi,
  GetTestQuestionsApi,
  TestAnswerSurveyPreCheckApi
} from '../common/api/api'
import {
  ROUTE_RISK_WARNING,
  ROUTE_FUND_DETAIL,
  ROUTE_ALL_INVEST_LIST,
  ROUTE_INTEL_CONFIG,
  ROUTE_GROUP_INFO
} from '../common/route/routeName'
import {
  routeReplace,
  routePush,
  routeGo,
  routeGoBack
} from '../common/route/routeAction'

const TEST_RESULT = 2 //测评结果页

class test extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#fff')

    this.state = {
      evaluationIdentification: '', //防止重复提交风险测评的唯一标识
      from: this.getParam('from'),
      fromPage: this.getParam('fromPage', null), //从哪个内部页面进来的
      showResult: props.location.query.showResult || 0,
      page: 0, //页码
      questionNum: 0, //问题数量
      levelData: {},
      nowQuestion: null, //当前展示的问题
      list: null, //所有问卷
      reply: null, //选项
      riskGrade: null,
      userRiskGradeDescribe: null, //风险测评结果页的风险描述
      userRiskGradeName: null, //风险类型
      groupList: null, //推荐组合
      showCard: 0, //是否重新测评的弹框变量
      url: props.location.search.split('?url=/')[1],
      isTesting: 0, //是否是第一个问题
      cardData: null, // 是否重新测评弹框里面的内容
      cardClick: null, //弹框的点击按钮
      cardReverse: 0, //重测弹框的显示与隐藏
      seeDesc: 0,
      isShowed: 0, //平衡型弹框的出现与隐藏
      isBacklog: 0, //是否有待办事项
      jumpFundGroupId: null //跳转的基金组合id
    }
    this.clickTimeout = null
    //是否android回退
    global.isAndroidBack = true
  }

  getTitle() {
    return '风险测评'
  }

  componentWillMount() {
    this.init()
  }

  componentWillUnmount() {
    //从落地页进来的测评结果页返回直接返回基金频道页
    if (
      this.state.showResult == TEST_RESULT &&
      global.isAndroidBack &&
      this.state.fromPage &&
      this.state.fromPage == ROUTE_INTEL_CONFIG
    ) {
      finishPage()
      return
    }
  }

  init = () => {
    global.testConfirm = false
    this.setState({
      page: 0,
      showCard: 0,
      showResult: 0
    })
    this.GetTestQuestionsData()
  }

  /**
   *重新测评
   *
   * @memberof test
   */
  retest = () => {
    global.testConfirm = false
    this.setState({
      page: 0,
      showCard: 0,
      showResult: 0,
      isFromTest: true
    })
    this.GetTestQuestionsData()
  }

  /**
   *获取风险测评的问题
   *
   * @memberof test
   */
  async GetTestQuestionsData() {
    showload(true)
    let result = await GetTestQuestionsApi()
    showload(false)

    if (checkResult(result)) {
      this.setState({
        evaluationIdentification: result.data.evaluationIdentification,
        questionNum: result.data.list.length - 1,
        list: result.data.list,
        nowQuestion: this.getQuestion(0, result.data.list)
      })
    }
  }

  getLevel = () => {
    this.TestAnswerSurveyPreCheckData()
  }

  /**
   *风险测评检查
   *
   * @memberof test
   */
  async TestAnswerSurveyPreCheckData() {
    let reply = this.state.reply

    showload(true)
    let result = await TestAnswerSurveyPreCheckApi(reply)
    showload(false)
    if (checkResult(result)) {
      routeReplace(
        ROUTE_RISK_WARNING,
        {
          from: this.state.from || 'test',
          isFromTest: this.state.isFromTest,
          fromPage: this.state.fromPage,
          showResult:
            (this.props.location.query &&
              this.props.location.query.showResult) ||
            0
        },
        {
          evaluationIdentification: this.state.evaluationIdentification,
          reply: this.state.reply,
          investorType: result.data.investorType,
          riskTolerance: result.data.riskTolerance,
          matchingProduct: result.data.matchingProduct
        }
      )
    } else {
      this.init()
    }
  }

  changeStateField = (field, value, index) => {
    const reply = { ...this.state.reply }
    const page = this.state.page + 1
    const _this = this
    const questionNum = this.state.questionNum

    reply[field] = value
    this.refs[index].className = 'li select'

    let func = () => {
      _this.setState(
        {
          reply,
          page: page,
          nowQuestion: this.getQuestion(page),
          isTesting: page > 0 && page < questionNum + 1 ? 1 : 0
        },
        () => {
          page == this.state.list.length ? this.getLevel() : ''
        }
      )
      for (let i in this.refs) {
        if (i != 'float' && i.indexOf('level') < 0) {
          this.refs[i].className = 'li'
        }
      }
    }

    if (page == this.state.list.length) {
      func()
    } else {
      this.clickTimeout && clearTimeout(this.clickTimeout)
      this.clickTimeout = setTimeout(func, 200)
    }
  }

  getQuestion = (page, list) => {
    let question = list ? list : this.state.list
    return question[page]
  }

  spBack = () => {
    let isTesting = this.state.isTesting
    let stopData = {
      title: '退出风险评测',
      text: '\t退出后当前评估进度将不会保存\t\t确定退出？',
      btn: '继续评测',
      cancel: '退出',
      cancelCallBack: this.toGoBack,
      confirmCallBack: this.hideCard
    }
    if (isTesting == 0) {
      this.toGoBack()
    } else {
      this.setState({
        showCard: 1,
        cardData: stopData,
        cardClick: this.toGoBack.bind(this),
        cardReverse: 1
      })
    }
  }

  /**
   * 回退
   *
   * @memberof test
   */
  toGoBack = () => {
    if (
      this.state.showResult == TEST_RESULT &&
      this.state.fromPage &&
      this.state.fromPage == ROUTE_INTEL_CONFIG
    ) {
      finishPage()
      return
    }
    if (this.state.from && this.state.from == 'wx') {
      finishPage()
    } else {
      routeGoBack()
    }
  }

  hideCard = () => {
    this.setState({
      showCard: 0
    })
  }

  resetLevel = () => {
    let resetData = {
      title: '提示',
      text: '您确定要重新风险评测?',
      btn: '重新评测',
      cancel: '退出',
      cancelCallBack: this.hideCard,
      confirmCallBack: this.retest
    }
    this.setState({
      showCard: 1,
      cardData: resetData,
      cardClick: this.retest.bind(this),
      cardReverse: 0
    })
  }

  handleDesc = () => {
    this.setState({
      seeDesc: !this.state.seeDesc
    })
  }

  render() {
    let hideStyle = { display: 'none' }
    const {
      questionNum,
      page,
      nowQuestion,
      userRiskGradeDescribe,
      userRiskGradeName,
      groupList,
      showCard,
      riskGradeList,
      url,
      cardData,
      cardClick,
      cardReverse,
      seeDesc,
      showResult
    } = this.state
    return (
      <div className="test">
        <BackTitle
          titleName="风险测评"
          back={this.spBack.bind(this)}
          hasPostion={true}
        />
        <DialogBox
          isShow={showCard}
          cancelText={cardData && cardData.cancel ? cardData.cancel : null}
          cancelCallBack={
            cardData && cardData.cancelCallBack ? cardData.cancelCallBack : null
          }
          confirmText={cardData && cardData.btn ? cardData.btn : null}
          confirmCallBack={
            cardData && cardData.confirmCallBack
              ? cardData.confirmCallBack
              : null
          }
          title={cardData && cardData.title ? cardData.title : null}
          text={cardData && cardData.text ? cardData.text : null}
          textStyle={{
            paddingLeft: '30px',
            paddingRight: '30px',
            textAlign: 'center'
          }}
        />
        {showResult == 0 && page < questionNum + 1
          ? nowQuestion && (
              <div className="question-box">
                <div className="title-page">
                  {page + 1}
                  <span>/{questionNum + 1}</span>
                </div>
                <div className="test-tile-name">{nowQuestion.title}</div>
                <div className="item-list">
                  {nowQuestion.options.map((item, index) => {
                    return (
                      <div key={item.val}>
                        <div className="border-s">
                          <div />
                        </div>
                        <div
                          onClick={() =>
                            this.changeStateField(
                              nowQuestion.value,
                              item.val,
                              index
                            )
                          }
                          className="li"
                          ref={index}
                        >
                          {item.text}
                        </div>
                        {index == nowQuestion.options.length - 1 ? (
                          <div className="border-s">
                            <div />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          : ''}

        <div
          className="test-page-loading"
          style={page === questionNum + 1 ? {} : hideStyle}
        >
          <div className="test-loading">
            <img
              className="ana-circle"
              src={require('../asset/test-loading.png')}
            />
            <img
              className="ana-force"
              src={require('../asset/test-loading-force.png')}
            />
          </div>
          <div className="text">测评中...</div>
        </div>
      </div>
    )
  }
}

export default test
