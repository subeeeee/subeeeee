import React from 'react'
import F2 from '@antv/f2'
import '../../sass/common/F2LineCss.scss'

// 关闭 F2 的体验改进计划打点请求
F2.track(false)

export default class F2LineCurrency extends React.Component {
  constructor(props) {
    super(props)
    this.state = { originData: null, data: null, tab: 0, timetab: 0 }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.data != nextProps.data) {
      this.setState(
        {
          data: nextProps.data
        },
        () => {
          this.draw_chart(this.state.tab)
        }
      )
    }
  }

  //通过数据获得纵坐标标注
  getTicks = (index, data) => {
    let maxValue,
      minValue,
      arrTicks = []
    for (let a in data) {
      //console.log(a);

      let tempValue = data[a].value != '' ? parseFloat(data[a].value) : data[a].value
      if (a == 0) {
        minValue = maxValue = tempValue
      }
      if (maxValue < tempValue) {
        maxValue = tempValue
      }
      if (minValue > tempValue) {
        minValue = tempValue
      }
    }
    //console.log(maxValue,minValue);
    for (let i = 0; i < 5; i++) {
      //console.log((parseFloat(minValue)+(maxValue-minValue)/4*(i+1)).toFixed(2))
      if (index == 0) {
        arrTicks.push((parseFloat(minValue) + ((maxValue - minValue) / 4) * i).toFixed(2))
      } else {
        arrTicks.push((parseFloat(minValue) + ((maxValue - minValue) / 4) * i).toFixed(4))
      }
    }
    return arrTicks
  }

  chartClick = index => () => {
    this.setState({ tab: index }, () => {
      this.draw_chart(index)
    })
  }

  //画出曲线图
  draw_chart = index => {
    if (!this.state.data || !this.state.data.fundCurrRatio || !this.state.data.perMyriadIncome) {
      return
    }
    let tab = this.state.timetab || 0
    let that = this
    let data = []
    if (index == 0) {
      data = this.state.data.fundCurrRatio.list[tab].list
    } else {
      data = this.state.data.perMyriadIncome.list[tab].list
    }
    if (data.length == 0) {
      return
    }

    //let ticksArr = this.getTicks(index,data);
    //console.log(ticksArr);

    //如果图表已经存在
    if (this.chart) {
      //设置坐标
      this.chart.axis('value', {
        label: function label(text, idx, total) {
          var textCfg = { fill: '#909090', fontSize: 10, fontWeight: 300 }
          textCfg.text = text
          return textCfg
        },
        grid: (text, index, total) => {
          if (index == total - 1) {
            return {
              stroke: '#E6E6E6',
              lineWidth: 0.8,
              lineDash: null
            }
          }
          return {
            stroke: '#E6E6E6',
            lineWidth: 0.9,
            lineDash: null
          }
        }
      })
      this.chart.scale('value', {
        type: 'linear',
        tickCount: 5,
        //ticks: ticksArr,
        formatter: function formatter(val) {
          return index == 0 ? parseFloat(val).toFixed(2) + '%' : parseFloat(val).toFixed(4)
        }
      })
      this.chart.changeData(data)
      return
    }

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
    this.chart.source(data)
    //设置数据
    this.chart.scale('date', {
      type: 'timeCat',
      tickCount: 3
      //range: [0, 1]
    })
    this.chart.scale('value', {
      type: 'linear',
      tickCount: 5,
      //ticks: ticksArr,
      formatter: function formatter(val) {
        return index == 0 ? parseFloat(val).toFixed(2) + '%' : parseFloat(val).toFixed(4)
      }
    })
    //设置坐标
    this.chart.axis('value', {
      label: function label(text, idx, total) {
        var textCfg = { fill: '#909090', fontSize: 10, fontWeight: 300 }
        textCfg.text = text
        //textCfg.text =index==0? text + '%':text;
        return textCfg
      },
      grid: (text, index, total) => {
        if (index == total - 1) {
          return {
            stroke: '#E6E6E6',
            lineWidth: 0.8,
            lineDash: null
          }
        }
        return {
          stroke: '#E6E6E6',
          lineWidth: 0.9,
          lineDash: null
        }
      }
    })

    this.chart.axis('date', {
      label: function label(text, index, total) {
        var textCfg = { fill: '#909090', fontSize: 10, fontWeight: 300 }
        if (index === 0) {
          textCfg.textAlign = 'start'
        }
        if (index > 0 && index === total - 1) {
          textCfg.textAlign = 'end'
        }
        return textCfg
      }
    })

    //设置提示
    this.chart.tooltip({
      showCrosshairs: true,
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        var items = obj.items
        that.setState({ originData: items[0].origin })
      },
      onHide: function onHide() {
        //var items=data?data[data.length-1]:null;
        that.setState({ originData: null })
      }
    })

    this.chart
      .line()
      .position(['date', 'value'])
      .color('#1C82DE')
      .size(1)
    this.chart.render()
  }

  //单击时间事件
  bind_chart = (index, event) => {
    let btnList = document.querySelectorAll('.tab_p button')
    for (let i = 0, l = btnList.length; i < l; i++) {
      btnList[i].setAttribute('class', '')
    }
    //判断当前点击下标是不是小于长度减2，如果小于等于的话就加下一个的左边框
    if (index <= btnList.length - 2) {
      btnList[index + 1].setAttribute('class', 'left_border')
    }
    btnList[index].setAttribute('class', 'active')
    this.setState({ timetab: index }, () => {
      this.draw_chart(this.state.tab)
    })
  }

  //停止触摸时执行
  TouchEnd = () => {
    var self = this
    self.setState({
      originData: false
    })
  }

  render() {
    let list = this.state.data
    let index = this.state.tab
    let listchart = []
    let name = '近七日年化'
    let bfb = '%'
    if (index == 0 && list && list.fundCurrRatio) {
      listchart = list.fundCurrRatio.list
      name = '近七日年化'
    } else if (index == 1 && list && list.perMyriadIncome) {
      listchart = list.perMyriadIncome.list
      name = '万份收益'
      bfb = ''
    }

    return (
      <div className="detailChart">
        <div className="currency">
          <div className="rule">
            <div className="tab-border">
              <div
                className={this.state.tab == 0 ? 'left tab active' : 'left tab'}
                onClick={this.chartClick(0)}>
                {list && list.fundCurrRatio ? list.fundCurrRatio.title : '七日年化收益率'}
              </div>
              <div
                className={this.state.tab == 1 ? 'right tab active' : 'right tab'}
                onClick={this.chartClick(1)}>
                {list && list.perMyriadIncome ? list.perMyriadIncome.title : '万份收益'}
              </div>
            </div>
          </div>
          <div className="tipinfo">
            <div
              className="line_date"
              style={this.state.originData ? { display: 'flex' } : { display: 'none' }}>
              <span className="line_date_span">
                {this.state.originData ? this.state.originData.date : ''}
              </span>
              <span className="line_date_span line_date_span_r">
                {name}
                <span
                  className={
                    this.state.originData
                      ? this.state.originData.value != 0
                        ? this.state.originData.value > 0
                          ? 'sy_red'
                          : 'sy_green'
                        : 'sy_grey'
                      : ''
                  }>
                  {this.state.originData
                    ? this.state.originData.value > 0
                      ? '+' + this.state.originData.value + bfb
                      : this.state.originData.value + bfb
                    : ''}
                </span>
              </span>
            </div>
          </div>
          <canvas id="myChart" style={{ marginTop: '13px' }} onTouchEnd={this.TouchEnd} />
          <p className="tab_p">
            {(listchart || []).map((item, index) => {
              if (index == 0) {
                return (
                  <button
                    className="left active"
                    key={index}
                    onClick={this.bind_chart.bind(this, index)}>
                    {item.period}
                  </button>
                )
              } else if (index == listchart.length - 1) {
                return (
                  <button
                    className={index == 1 ? 'right left_border' : 'right'}
                    key={index}
                    onClick={this.bind_chart.bind(this, index)}>
                    {item.period}
                  </button>
                )
              } else {
                return (
                  <button
                    className={index == 1 ? 'left_border' : ''}
                    key={index}
                    onClick={this.bind_chart.bind(this, index)}>
                    {item.period}
                  </button>
                )
              }
            })}
          </p>
        </div>
      </div>
    )
  }
}
