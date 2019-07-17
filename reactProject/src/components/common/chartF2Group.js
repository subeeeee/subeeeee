import React from 'react'
import F2 from '@antv/f2'
import RedText from './RedText'

class chartF2Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }
  componentDidMount() {
    this.draw_chart(this.state.data)
  }
  componentWillReceiveProps(nextProps) {
    this.draw_chart(nextProps.data)

    if (this.state.data != nextProps.data) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  //画出曲线图
  draw_chart = data => {
    let that = this
    if (!data) return
    let items = data ? data[data.length - 1] : null
    that.setState({ originData: items })

    //处理数据 start
    let temp = []
    for (let i = 0; i < data.length; i++) {
      let tempObj = {}
      if (data[i].ZH01) {
        tempObj = {}
        tempObj.value = data[i].ZH01
        tempObj.type = 'ZH01'
        tempObj.date = data[i].time
        if (typeof data[i].isDrawDown != 'undefined') {
          tempObj.isDrawDown = data[i].isDrawDown
        }
        temp.push(tempObj)
      }

      if (data[i].ZH01) {
        tempObj = {}
        tempObj.value = data[i].ZH02
        tempObj.type = 'ZH02'
        tempObj.date = data[i].time
        if (typeof data[i].isDrawDown != 'undefined') {
          tempObj.isDrawDown = data[i].isDrawDown
        }
        temp.push(tempObj)
      }

      if (data[i].ZH03) {
        tempObj = {}
        tempObj.value = data[i].ZH03
        tempObj.type = 'ZH03'
        tempObj.date = data[i].time
        if (typeof data[i].isDrawDown != 'undefined') {
          tempObj.isDrawDown = data[i].isDrawDown
        }
        temp.push(tempObj)
      }

      if (data[i].ZH04) {
        tempObj = {}
        tempObj.value = data[i].ZH04
        tempObj.type = 'ZH04'
        tempObj.date = data[i].time
        if (typeof data[i].isDrawDown != 'undefined') {
          tempObj.isDrawDown = data[i].isDrawDown
        }
        temp.push(tempObj)
      }

      if (data[i].ZH05) {
        tempObj = {}
        tempObj.value = data[i].ZH05
        tempObj.type = 'ZH05'
        tempObj.date = data[i].time
        if (typeof data[i].isDrawDown != 'undefined') {
          tempObj.isDrawDown = data[i].isDrawDown
        }
        temp.push(tempObj)
      }
    }

    if (this.chart) {
      this.chart.changeData(temp)
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
        pixelRatio: window.devicePixelRatio //像素比率
      })

      //绑定数据源
      this.chart.source(temp)
      //设置数据
      this.chart.scale('date', {
        type: 'timeCat',
        tickCount: 4
      })

      this.chart.scale('value', {
        type: 'linear',
        tickCount: 7,
        alias: 'Value',
        formatter: function formatter(val) {
          return parseFloat(val).toFixed(2) + '%'
        }
      })

      //设置纵坐标
      this.chart.axis('value', {
        grid: {
          stroke: '#193051', //横网格的颜色
          lineWidth: 1,
          lineDash: null
        },
        label: function label(text, index, total) {
          return {
            stroke: 'rgb(1,99,116)'
          }
        }
      })
      // 设置横坐标
      this.chart.axis('date', {
        grid: {
          stroke: '#193051', //竖网格的颜色
          lineWidth: 1,
          lineDash: null
        },
        label: function label(text, index, total) {
          var textCfg = {
            textAlign: 'center',
            stroke: 'rgb(1,99,116)'
          }
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
      this.chart.legend(false)
      this.chart.tooltip({
        showCrosshairs: false,
        custom: true, // 自定义 tooltip 内容框
        showTooltipMarker: false,
        onChange: function onChange(obj) {
          var items = obj.items
          let tempOrigin = {}
          tempOrigin.value = items[0].origin.value
          tempOrigin.date = items[0].origin.date
          tempOrigin.hushenValue = items[1].origin.value
          that.setState({ originData: tempOrigin })
        },
        onHide: function onHide() {
          var items = data ? data[data.length - 1] : null
          that.setState({ originData: null })
        }
      })

      this.chart
        .line()
        .position(['date', 'value'])
        .color('type', function(val) {
          if (val === 'ZH01') {
            return '#BD4947' //曲线的颜色
          } else if (val === 'ZH02') {
            return '#5694F0'
          } else if (val === 'ZH03') {
            return '#99B954'
          } else if (val === 'ZH04') {
            return '#6B1A86'
          } else if (val === 'ZH05') {
            return '#F5A623'
          }
        })
        .size(1)

      this.chart.render()
    }
  }

  render() {
    return (
      <div>
        <canvas id="myChart" width="100%" height="260" />
      </div>
    )
  }
}

export default chartF2Group
