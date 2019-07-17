/**
 * Created by ihavedream on 17/5/10.
 */
import G2 from 'g2-mobile'
import React from 'react'
import RedText from './RedText'

import '../../sass/common/G2line.scss'

const getWidth = (text, size) => {
  let len = text.split('').length
  return len * parseInt(size) - 20
}

const legendOp = {
  position: 'top',
  dx: 0,
  dy: -10,
  marker: 'circle'
}

const xAxisOp = {
  line: {
    lineWidth: 1,
    stroke: '#b0b0b0'
  },
  tickLine: null,
  grid: {
    stroke: '#f2f2f2',
    line: {
      lineWidth: 1,
      lineDash: [0, 0]
    }
  }
}

const yAxisOp = {
  line: null,
  tickLine: null,
  tickCount: 3,
  label: {
    fill: '#666',
    fontSize: '10',
    fontWeight: '400' // 文本粗细
  },
  grid: {
    stroke: '#f2f2f2',
    line: {
      lineWidth: 1,
      lineDash: [0, 0]
    }
  }
}

class G2line extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nowTab: 0,
      defaultData: this.props.data,
      data: this.props.data,
      timeList: this.props.data,
      nameList: null,
      rateList: null,
      width: window.screen.width,
      forceFit: true,
      height: 140,
      margin: [10, 10, 10, 30],
      index: 0,
      yMin: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.data != nextProps.data) {
      let idx = this.state.index
      this.setState(
        {
          defaultData: nextProps.data,
          // nameList: nextProps.data[idx].curve.name,
          // rateList: nextProps.tab ? '' : nextProps.data[idx].curve.rate,
          timeList: nextProps.data[idx].time,
          // notice: nextProps.data[idx].curve.notice,
          nowTab: nextProps.tab,
          yMin: Math.min.apply(null, nextProps.data[idx]) - 1
        },
        () => {
          this.defs = {
            time: {
              tickCount: 3,
              range: [0, 1.2]
            },
            value: {
              tickCount: 3,
              range: [0, 1],
              minLimit: this.state.yMin,
              formatter:
                this.state.nowTab == 1
                  ? function(item) {
                      return item * 100 + '%'
                    }
                  : function(item) {
                      return item
                    }
            }
          }
          this.render_chart(this.state.index)
        }
      )
    }
  }

  processData = data => {
    let tab = this.state.nowTab || 0
    let dataArr = data.fund
    let backData = []
    if (tab == 0) {
      for (let i = 0; i < dataArr.length; i++) {
        backData.push({
          time: i,
          value: dataArr[i].value,
          name: 'wxzt'
        })
      }
    } else {
      for (let i = 0; i < dataArr.data.fundDraw.length; i++) {
        backData.push({
          time: i,
          value: dataArr.data.fundDraw[i].value,
          name: dataArr.data.name.fund
        })
      }
    }
    return backData
  }

  updateData = index => () => {
    let tab = this.state.nowTab
    // let btnList = $('.chart-box p button')
    let btnList = document.querySelectorAll('.chart-box p button')
    G2.Global.pixelRatio = 10
    for (let i = 0; i < btnList.length; i++) {
      btnList[i].setAttribute('class', '')
    }
    btnList[index].setAttribute('class', 'active')
    this.props.changeTitle &&
      this.props.changeTitle(this.state.defaultData[index].title)

    this.setState(
      {
        data: this.processData(this.state.defaultData[index]),
        timeList: this.state.defaultData[index].time,
        // nameList: this.state.defaultData[index].curve.name,
        // rateList: tab ? '' : this.state.defaultData[index].curve.rate,
        // notice: this.state.defaultData[index].curve.notice,
        index: index,
        yMin: Math.min.apply(null, this.state.defaultData[index]) - 1
      },
      () => {
        this.defs = {
          time: {
            tickCount: 3,
            range: [0, 1.2]
          },
          value: {
            tickCount: 3,
            range: [0, 1],
            minLimit: this.state.yMin,
            formatter:
              this.state.nowTab == 1
                ? function(item) {
                    return item * 100 + '%'
                  }
                : function(item) {
                    return item
                  }
          }
        }
        this.render_chart(index)
      }
    )
  }

  render_chart = index => {
    if (this.chart) {
      this.chart = null
    }
    G2.Global.pixelRatio = 10
    this.chart = new G2.Chart({
      id: 'g0',
      width: this.state.width,
      height: this.state.height,
      margin: this.state.margin
      // forceFit: this.state.forceFit,
    })
    this.chart.source(
      this.processData(this.state.defaultData[index]),
      this.defs
    )
    this.chart
      .line()
      .position('time*value')
      .color('name', ['#1C82DE', '#A3B6CD'])
      .size(1)
    this.chart.axis('time', xAxisOp)
    this.chart.axis('value', yAxisOp)
    this.chart.render()
  }

  render() {
    const list = this.props.data
    const { timeList, nameList, rateList, notice, nowTab } = this.state
    const fontScale = 'scale(0.9, 0.9)'
    const ib = 'inline-block'

    return (
      <div className="g2-box">
        <div className="chart-box">
          <canvas id="g0" style={{ width: '100%' }} />
          <ul>
            {(timeList || []).map((item, index) => {
              return <li key={index}>{item}</li>
            })}
          </ul>
          <p>
            {(list || []).map((item, index) => {
              if (index == 0) {
                return (
                  <button
                    className="left active"
                    onClick={this.updateData(index)}
                  >
                    {item.title}
                  </button>
                )
              } else if (index == list.length - 1) {
                return (
                  <button className="right" onClick={this.updateData(index)}>
                    {item.title}
                  </button>
                )
              } else {
                return (
                  <button onClick={this.updateData(index)}>{item.title}</button>
                )
              }
            })}
          </p>
        </div>
      </div>
    )
  }
}

export default G2line
