import React from 'react'
import F2 from '@antv/f2'
import '../../sass/common/F2LineNotCss.scss'
// 关闭 F2 的体验改进计划打点请求
F2.track(false)

export default class F2LineNotCurrency extends React.Component {
  constructor(props) {
    super(props)
    this.state = { originData: null, data: null, timetab: 0, tab: 0 }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data == 0) {
      return
    }
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

  //画出曲线图
  draw_chart = index => {
    if (!this.state.data) {
      return
    }
    let tab = this.state.timetab || 0
    let that = this
    let data = []
    if (index == 0) {
      data = this.state.data.navCurve.curve[tab].list
    } else {
      data = this.state.data.navTotalCurve.curve[tab].list
    }

    if (!data || data.length == 0) {
      return
    }

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
          return parseFloat(val).toFixed(4)
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
        return parseFloat(val).toFixed(4)
      }
    })
    //设置坐标
    this.chart.axis('value', {
      label: function label(text, idx, total) {
        console.log(text, idx, total)
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

  chartClick = index => () => {
    this.setState({ tab: index }, () => {
      this.draw_chart(index)
    })
  }
  //单击时间事件
  bind_chart = (index, event) => {
    let btnList = document.querySelectorAll('.tab_p button')
    for (let i = 0, l = btnList.length; i < l; i++) {
      btnList[i].setAttribute('class', '')
    }
    btnList[index].setAttribute('class', 'active')
    //判断当前点击下标是不是小于长度减2，如果小于等于的话就加下一个的左边框
    if (index <= btnList.length - 2) {
      btnList[index + 1].setAttribute('class', 'left_border')
    }
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
    let timetab = this.state.timetab
    let listchart = []
    let navCurve = list ? list.navCurve : null //单位净值
    let navTotalCurve = list ? list.navTotalCurve : null //累计净值

    let index = this.state.tab
    let name = '单位净值'

    if (index == 0 && list) {
      name = '单位净值'
      listchart = list.navCurve.curve
    } else if (index == 1 && list) {
      name = '累计净值'
      listchart = list.navTotalCurve.curve
    }
    //let bfb="%";
    //let name="涨幅："

    //let rate=listchart&&listchart[timetab].rate!=""?listchart[timetab].rate.replace('%',''):"";
    //console.log(list);
    return (
      <div className="detailChartNotCurrency">
        <div className="currency">
          <div className="rule">
            <div className="tab-border">
              <div
                className={this.state.tab == 0 ? 'left tab active' : 'left tab'}
                onClick={this.chartClick(0)}>
                {navCurve ? navCurve.title : '单位净值'}
              </div>
              <div
                className={this.state.tab == 1 ? 'right tab active' : 'right tab'}
                onClick={this.chartClick(1)}>
                {navTotalCurve ? navTotalCurve.title : '累计净值'}
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
                      ? '+' + this.state.originData.value
                      : this.state.originData.value
                    : ''}
                </span>
              </span>
            </div>
            {/*
        <div className='line_time_date' style={!this.state.originData?{display:'flex'}:{display:'none'}}>
            <span > {listchart&&'近'+listchart[timetab].title}涨幅:<span className={rate!=""?rate>0?"sy_red":"sy_green":""}>{rate!=""?rate>0?'+'+rate+bfb:rate+bfb:"--"}</span></span>
        </div>
        */}
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
                    {item.title}
                  </button>
                )
              } else if (index == listchart.length - 1) {
                return (
                  <button
                    className={index == 1 ? 'right left_border' : 'right'}
                    key={index}
                    onClick={this.bind_chart.bind(this, index)}>
                    {item.title}
                  </button>
                )
              } else {
                return (
                  <button
                    className={index == 1 ? 'left_border' : ''}
                    key={index}
                    onClick={this.bind_chart.bind(this, index)}>
                    {item.title}
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
