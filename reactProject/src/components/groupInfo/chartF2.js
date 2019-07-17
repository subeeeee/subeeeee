/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-13 14:41:01
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-28 14:55:11
 * @Note 图表
 */

import React from 'react'
import F2 from '@antv/f2'
import RedText from '../common/RedText'
import './chartf2.scss'
import { GetGroupChartInfoApi, checkResult, GetGroupInfoChartTitleApi } from '../../common/api/api'
import { showload } from '../common/toast'
import { replaceString } from '../../tools/tools'
import DialogConfirmBox from '../common/alertBox/DialogConfirmBox'

const TAB_ONE = 0 //近半年
const TAB_TWO = 1 //近一年
const TAB_THR = 2 //近三年
const TAB_FOUR = 3 //近五年
const TAB_FIVE = 4 //近十年

class chartF extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      groupId: this.props.groupId,
      originData: null, //选择数据
      chartData: {
        // data: [
        //   {
        //     fundDate: '', //日期
        //     combination: '', //组合收益
        //     benchmark: '', //基准收益
        //     date: '' //日期
        //   }
        // ],
        // time: [], //日期
        // name: {
        //   combinationName: '', //组合名称
        //   benchmarkName: '', //基准名称
        //   notice: '' //备注
        // },
        // keytValue: {
        //   totalEarnings: '0.1%', //累计收益率
        //   maxDownRate: '0.1%', //最大回撤
        //   yearRate: '10%', //年波动率
        //   sharpRate: '1.2', //夏普比率
        //   title: '' //标题
        // },
        // text: {
        //   retracement: '',
        //   retracementTitle: '',
        //   returnRate: '',
        //   returnRateTitle: '',
        //   sharpeRatio: '',
        //   sharpeRatioTitle: '',
        //   volatility: '',
        //   volatilityTitle: ''
        // } //描述
      },
      titles: ['近半年', '近一年', '近三年', '近五年', '近十年'], //标题
      selectTab: TAB_FIVE, //选择标签
      showTips: false, //是否显示曲线tips
      isShowHelpDes: false, //是否显示帮助
      showHelpTitle: '', //帮助title
      showHelpDes: '' //帮助描述
    }
  }

  componentDidMount() {
    this.getTitleData()
  }

  /**
   * 获取标签数据
   *
   * @memberof chartF
   */
  async getTitleData() {
    showload(true)
    let titleResult = await GetGroupInfoChartTitleApi(this.state.groupId)
    showload(false)
    if (checkResult(titleResult)) {
      let data = titleResult.data
      this.setState({ titles: data.type }, () => {
        this.getData()
      })
    }
  }

  /**
   * 获取数据
   *
   * @memberof chartF
   */
  async getData() {
    showload(true)
    let { groupId, selectTab } = this.state

    let result = await GetGroupChartInfoApi(groupId, selectTab)
    showload(false)

    if (checkResult(result)) {
      let data = result.data
      let chartData = {}
      this.setState(
        {
          chartData: {
            data: data.data,
            time: data.time,
            keytValue: {
              totalEarnings: data.bottom.profit,
              maxDownRate: data.bottom.retracement,
              yearRate: data.bottom.wave,
              sharpRate: data.bottom.sharp,
              title: data.bottom.name
            },
            text: data.bottom.text,
            name: {
              combinationName: data.name.huiniu,
              benchmarkName: data.name.hushen,
              notice: data.name.notice
            }
          }
        },
        () => {
          // 渲染曲线
          this.drawChart()
        }
      )
    }
  }

  /**
   * 点击tab
   *
   * @memberof chartF
   */
  onClickTab = index => () => {
    this.setState({ selectTab: index, originData: null }, () => {
      this.getData()
    })
  }

  /**
   * 画出曲线图
   *
   * @memberof chartF
   */
  drawChart = index => {
    // 曲线所有数据
    let chartData = this.state.chartData

    if (!chartData || !chartData.data) {
      return
    }

    // 曲线数组数据
    let data = chartData.data

    let items = data ? data[data.length - 1] : null

    this.setState({ originData: items })

    //处理数据 start
    let temp = []
    let lastDate = null
    let lastCombination = null
    let lastBenchmark = null
    let tempObj = {}

    data.forEach(element => {
      // 组合数据
      tempObj = {}
      tempObj.value = replaceString(element.combination, '%', '')
      tempObj.type = 'combination'
      tempObj.date = element.date
      if (element.isDrawDown) {
        tempObj.isDrawDown = element.isDrawDown
      }
      lastCombination = tempObj.value
      temp.push(tempObj)

      // 基准数据
      tempObj = {}
      tempObj.value = replaceString(element.benchmark, '%', '')
      tempObj.type = 'benchmark'
      tempObj.date = element.date
      if (element.isDrawDown) {
        tempObj.isDrawDown = element.isDrawDown
      }
      lastBenchmark = tempObj.value
      temp.push(tempObj)
    })

    // 获取ticks
    let ticks = null

    if (data && data.length >= 3) {
      let middle = Math.floor(data.length / 2)
      ticks = [data[0].date, data[middle].date, data[data.length - 1].date]
    }

    //处理数据 end

    if (this.chart) {
      //设置图形数据和颜色
      this.renderGuide(lastCombination, lastBenchmark)
      this.chart.animate(true)
      //设置数据
      this.chart.scale('date', {
        type: 'timeCat',
        tickCount: 3,
        ticks: ticks
      })
      this.chart.changeData(temp)
      this.chart.repaint()
      return
    } else {
      //实例化一个图形
      this.chart = new F2.Chart({
        id: 'myChart',
        width: window.innerWidth,
        height:
          window.innerWidth > window.innerHeight
            ? window.innerHeight - 100
            : window.innerWidth * 0.507,
        pixelRatio: window.devicePixelRatio
      })

      //绑定数据源
      this.chart.source(temp)
      //设置数据
      this.chart.scale('date', {
        type: 'timeCat',
        tickCount: 3,
        ticks: ticks
      })

      this.chart.scale('value', {
        type: 'linear',
        tickCount: 5,
        // alias: title1,
        formatter: function formatter(val) {
          return parseFloat(val).toFixed(2) + '%'
        }
      })

      //设置y轴
      this.chart.axis('value', {
        grid: {
          stroke: '#f2f2f2',
          line: {
            lineWidth: 1,
            lineDash: [0, 0]
          }
        },
        label: function label(text, index, total) {
          let textCfg = { fontWeight: 'normal' }

          return textCfg
        }
      })
      // 设置x轴
      this.chart.axis('date', {
        label: function label(text, index, total) {
          let textCfg = { fontWeight: 'normal' }
          if (index === 0) {
            textCfg.textAlign = 'start'
          }
          if (index > 0 && index === total - 1) {
            textCfg.textAlign = 'end'
          }
          return textCfg
        }
      })

      // 设置legend
      this.chart.legend(false)
      //设置提示
      this.chart.tooltip({
        showCrosshairs: true,
        custom: true, // 自定义 tooltip 内容框
        onChange: obj => {
          this.showToolTips = true
          let items = obj.items
          let tempOrigin = {}
          tempOrigin.combination = items[0].origin.value
          tempOrigin.date = items[0].origin.date
          tempOrigin.benchmark = items[1].origin.value

          this.renderGuide(tempOrigin.combination, tempOrigin.benchmark, tempOrigin.date)
          // 关闭图表所有动画
          this.chart.animate(false)

          this.setState({ originData: tempOrigin, showTips: true })
        },
        onHide: () => {
          if (!this.showToolTips) {
            return
          }

          this.showToolTips = false

          this.chartReset()
        }
      })

      // 设置辅助文本

      this.renderGuide(lastCombination, lastBenchmark, 'max', true)

      this.chart
        .line()
        .position(['date', 'value'])
        .color('type', function(val) {
          if (val === 'benchmark') {
            return '#0076FF'
          } else {
            return '#FE3824'
          }
        })
        .size(1)

      this.chart.render()
    }
  }

  /**
   * 曲线重置
   *
   * @memberof chartF
   */
  chartReset = () => {
    let chartData = this.state.chartData
    if (!chartData || !chartData.data) {
      return
    }

    // 曲线数组数据
    let data = chartData.data

    let items = data ? data[data.length - 1] : null

    this.setState({ originData: items, showTips: false })

    if (this.chart && items) {
      this.renderGuide(items.combination, items.benchmark)
      this.chart.animate(false)
      // this.chart.render()
    }
  }

  /**
   * 停止触摸
   *
   * @memberof chartF
   */
  onTouchEnd = () => {
    // 曲线所有数据
    if (this.delayTimer) {
      clearTimeout(this.delayTimer)
      this.delayTimer = null
    }

    //延迟处理
    this.delayTimer = setTimeout(() => {
      this.chartReset()
      setTimeout(() => {
        if (this.chart) {
          this.chart.hideTooltip()
        }
      }, 1)
    }, 3000)
  }

  /**
   * 渲染辅助文本
   *
   * @memberof chartF
   */
  renderGuide = (value, hushenValue, position = 'max', clear = false) => {
    // 设置辅助文本

    if (clear) {
      this.chart.guide().clear()
      this.guideFirst = null
      this.guideSec = null
    }

    value = value > 0 ? '+' + value : value
    hushenValue = hushenValue > 0 ? '+' + hushenValue : hushenValue

    let valueOffsetX, valueOffsetY, hushenValueOffsetX, hushenValueOffsetY

    if (Number(value) >= Number(hushenValue)) {
      valueOffsetY = -10
      hushenValueOffsetY = 20
    } else {
      valueOffsetY = 20
      hushenValueOffsetY = -10
    }

    if (this.guideFirst) {
      this.guideFirst.position = [position, value]
      this.guideFirst.content = value + '%'
      this.guideFirst.offsetX = -15
      this.guideFirst.offsetY = valueOffsetY
      this.guideFirst.repaint()
    } else {
      this.guideFirst = this.chart.guide().text({
        position: [position, value],
        content: value + '%',
        limitInPlot: true,
        offsetX: -15,
        offsetY: valueOffsetY
      })
    }

    if (this.guideSec) {
      this.guideSec.position = [position, hushenValue]
      this.guideSec.content = hushenValue + '%'
      this.guideSec.offsetX = -15
      this.guideSec.offsetY = hushenValueOffsetY
      this.guideSec.repaint()
    } else {
      this.guideSec = this.chart.guide().text({
        position: [position, hushenValue],
        content: hushenValue + '%',
        limitInPlot: true,
        offsetX: -15,
        offsetY: hushenValueOffsetY
      })
    }
  }

  /**
   * 点击帮助
   *
   * @memberof chartF
   */
  onClickHelpDes = (title, des) => () => {
    this.setState({ isShowHelpDes: true, showHelpDes: des, showHelpTitle: title })
  }

  /**
   * 渲染标签
   *
   * @memberof chartF
   */
  renderTab() {
    let list = this.state.titles
    // 当前选择索引index
    let selectIndex = this.state.selectTab

    return (
      <p className="tab_p">
        {list &&
          list.map((item, index) => {
            let active = selectIndex === index
            if (index == 0) {
              return (
                <button
                  key={index}
                  // className="left active"
                  className={'left' + ' ' + (active ? 'active' : '')}
                  onClick={this.onClickTab(index)}>
                  {item}
                </button>
              )
            } else if (index == list.length - 1) {
              return (
                <button
                  key={index}
                  className={
                    (index == 1 ? 'right left_border' : 'right') + ' ' + (active ? 'active' : '')
                  }
                  onClick={this.onClickTab(index)}>
                  {item}
                </button>
              )
            } else {
              return (
                <button
                  key={index}
                  className={(index == 1 ? 'left_border' : '') + ' ' + (active ? 'active' : '')}
                  onClick={this.onClickTab(index)}>
                  {item}
                </button>
              )
            }
          })}
      </p>
    )
  }

  /**
   * 渲染
   *
   * @returns
   * @memberof chartF
   */
  render() {
    let dataList = this.state.chartData

    // 比较信息
    let optionValue = this.state.originData ? this.state.originData.combination : '--'

    // 基准信息
    let optionBaseValue = this.state.originData ? this.state.originData.benchmark : '--'

    let { name, time, keytValue, data, text } = dataList

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DialogConfirmBox
          isShow={this.state.isShowHelpDes}
          title={this.state.showHelpTitle}
          text={this.state.showHelpDes}
          textAlign="justify"
          cancelCallBack={() => {
            this.setState({ isShowHelpDes: false })
          }}
        />
        {this.renderTab()}
        <div hidden={!this.state.showTips}>
          <div className="tipinfo">
            <div className="vline_date">
              <span className="line_date_span">
                {this.state.originData ? this.state.originData.date : ''}
              </span>

              <div className="line_tips_box">
                <div className="line_box_left">
                  <div className="line_box_legend">
                    <span />
                    <div className="line_box_legend_label">本组合</div>
                    <laber
                      className={
                        optionValue > 0
                          ? 'line_box_legend_label red ml4'
                          : optionValue < 0
                          ? 'line_box_legend_label green ml4'
                          : 'line_box_legend_label ml4'
                      }>
                      {optionValue > 0 ? '+' + optionValue + '%' : optionValue + '%'}
                    </laber>
                  </div>
                </div>
                <div className="line_box_right">
                  <div className="line_box_legend">
                    <span />
                    <laber className="line_box_legend_label">基准</laber>
                    <laber
                      className={
                        optionBaseValue > 0
                          ? 'line_box_legend_label red ml4'
                          : optionBaseValue < 0
                          ? 'line_box_legend_label green ml4'
                          : 'line_box_legend_label ml4'
                      }>
                      {optionBaseValue > 0 ? '+' + optionBaseValue + '%' : optionBaseValue + '%'}
                    </laber>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="line_box">
          <div className="line_box_left">
            <div className="line_box_legend">
              <span />
              <div className="line_box_legend_label">{name ? name.combinationName : ''}</div>
              <div
                className={
                  optionValue > 0
                    ? 'line_box_legend_label red ml4'
                    : optionValue < 0
                    ? 'line_box_legend_label green ml4'
                    : 'line_box_legend_label ml4'
                }>
                {optionValue > 0 ? '+' + optionValue + '%' : optionValue + '%'}
              </div>
            </div>
          </div>
          <div className="line_box_right">
            <div className="line_box_legend">
              <span />
              <div className="line_box_legend_label">{name ? name.benchmarkName : ''}</div>
              <div
                className={
                  optionBaseValue > 0
                    ? 'line_box_legend_label red ml4'
                    : optionBaseValue < 0
                    ? 'line_box_legend_label green ml4'
                    : 'line_box_legend_label ml4'
                }>
                {optionBaseValue > 0 ? '+' + optionBaseValue + '%' : optionBaseValue + '%'}
              </div>
            </div>
          </div>
        </div>
        <canvas id="myChart" width="100%" height="260px" onTouchEnd={this.onTouchEnd} />

        {dataList && (
          <div>
            {keytValue && (
              <div className="groupDes">
                <div className="vDesTitle">
                  <div className="leftLine">
                    <div className="line1" />
                    <div className="line2" />
                    <div className="line3" />
                  </div>
                  <span className="tvDesTitle">{keytValue.title}</span>
                  <div className="rightLine">
                    <div className="line1" />
                    <div className="line2" />
                    <div className="line3" />
                  </div>
                </div>

                <div className="vKey">
                  <GroupValue
                    text="累计收益"
                    value={keytValue.totalEarnings}
                    sign="%"
                    onClickDes={this.onClickHelpDes(text.returnRateTitle, text.returnRate)}
                  />
                  <GroupValue
                    text="最大回撤"
                    value={keytValue.maxDownRate}
                    sign="%"
                    onClickDes={this.onClickHelpDes(text.retracementTitle, text.retracement)}
                  />
                  <GroupValue
                    text="年化波动率"
                    value={keytValue.yearRate}
                    sign="%"
                    onClickDes={this.onClickHelpDes(text.volatilityTitle, text.volatility)}
                  />
                  <GroupValue
                    text="夏普比率"
                    value={keytValue.sharpRate}
                    sign=""
                    onClickDes={this.onClickHelpDes(text.sharpeRatioTitle, text.sharpeRatio)}
                  />
                </div>
              </div>
            )}

            {name && name.notice && (
              <div className="profitTips">
                <RedText text={name.notice} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

/**
 * 关键指标
 *
 * @param {*} {text,value}
 * @returns
 */
const GroupValue = ({ text, value, sign, onClickDes }) => {
  let showValue = value && value != '' ? value + sign : '--'
  return (
    <div className="vKeyValue">
      <span className="tvValue">{showValue}</span>
      <div className="vKeyDes">
        <span className="tvText">{text}</span>
        <img className="ivHelp" onClick={onClickDes} src={require('./images/question-des.png')} />
      </div>
    </div>
  )
}

export default chartF
