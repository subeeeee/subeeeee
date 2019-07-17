/**
 * Created by ihavedream on 17/5/10.
 */
import G2 from 'g2-mobile'
import React from 'react'

const getWidth = (text, size) => {
  let len = text.split('').length
  return len * parseInt(size) - 20
}

const xAxisOp = {
  line: {
    lineWidth: 1,
    stroke: '#E6E6E6'
  },
  tickLine: null,
  label: {
    fill: '#979797',
    fontSize: '10'
  },
  grid: {
    stroke: '#F5F5F5',
    line: {
      lineWidth: 1,
      lineDash: [0, 0]
    }
  }
}

const yAxisOp = {
  line: null,
  tickLine: null,
  tickCount: 4,
  label: {
    textAlign: 'left',
    textBaseline: 'bottom',
    fill: '#979797',
    fontSize: '10'
  },
  grid: {
    stroke: '#F5F5F5',
    line: {
      lineWidth: 1,
      lineDash: [0, 0]
    }
  }
}

class G2tolineBg extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      width: '100%',
      height: '100px',
      margin: [16, 10, 25, 20],
      data: this.props.data,
      yMin: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.data != nextProps.data) {
      var minList = []
      for (var i in nextProps.data) {
        minList.push(nextProps.data[i].value)
      }
      this.setState(
        {
          data: nextProps.data,
          yMin: Math.min.apply(null, minList) - 0.1
        },
        this.render_chart
      )
    }
  }

  render_chart = () => {
    if (this.chart) {
      this.chart = null
    }
    G2.Global.pixelRatio = 8
    this.chart = new G2.Chart({
      id: 'g0',
      width: this.state.width,
      height: this.state.height,
      margin: this.state.margin
    })

    console.log(this.state.data)
    this.chart.source(this.state.data, {
      date: {
        tickCount: 7
      },
      value: {
        tickCount: 5,
        minLimit: this.state.yMin,
        formatter: function formatter(val) {
          let newV = val + ''
          if (newV.indexOf('.') == -1) {
            return newV + '.0'
          } else {
            return newV
          }
        }
      }
    })
    this.chart
      .area()
      .position('date*value')
      .color('#D2E7FF')
      .style({
        opacity: 0.7
      })
    this.chart
      .line()
      .position('date*value')
      .size(1)
    this.chart.axis('date', xAxisOp)
    this.chart.axis('value', yAxisOp)
    this.chart.render()
  }

  render() {
    return (
      <div className="chart-box">
        <canvas id="g0" style={{ width: '100%' }} />
      </div>
    )
  }
}

export default G2tolineBg
