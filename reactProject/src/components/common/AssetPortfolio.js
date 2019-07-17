import React from 'react'
import F2 from '@antv/f2'

class AssetPortfolio extends React.Component {
  constructor(props) {
    super(props)
    //this.state={originData:null,data: null,oneTab: 0,index:0}
  }
  componentWillReceiveProps(nextProps) {}

  componentDidMount() {
    this.draw_chart(this.props.assetPortfolio)
  }

  //将浮点数四舍五入，取小数点后2位
  toDecimal = x => {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return
    }
    f = parseFloat(f).toFixed(2)
    return f
  }

  toDecimal2 = x => {
    var f = parseFloat(x)
    if (isNaN(f)) {
      return
    }
    return f
  }
  //画出曲线图
  draw_chart = assetPortfolioData => {
    let map = {}
    let that = this
    //取得图形数据
    let data = assetPortfolioData.percent
    //单位
    let dw = '亿元'

    //取得资产净值
    let TotalAsset = assetPortfolioData.totalSize.marketValue
    // let TotalAsset=that.toDecimal(assetPortfolioData.totalSize.marketValue);
    // if (!isNaN(TotalAsset))
    // {
    //   if (TotalAsset>100000000)
    //   {
    //      TotalAsset=that.toDecimal(TotalAsset/100000000)
    //      dw='亿元'
    //   }
    //   else
    //   {
    //      TotalAsset=that.toDecimal(TotalAsset/10000)
    //      dw='万元'
    //   }
    // }

    let i = 0
    //整理标注内容并格式化成数值型
    data.map(function(obj) {
      let percent = that.toDecimal2(obj.ratioInTotalAsset)
      map[obj.assetType] = parseFloat(percent).toFixed(2) + '%'
      data[i]['a'] = 1 //添加一个字段
      data[i]['ratioInTotalAsset'] = percent
      i++
    })

    //实例化一个图形
    var chart = new F2.Chart({
      id: 'mountNode1',
      width: window.innerWidth,
      //height: window.innerWidth > window.innerHeight ? window.innerHeight - 54 : window.innerWidth * 0.557,
      height: 136,
      pixelRatio: window.devicePixelRatio,
      padding: [20, 0, 20, -150]
    })

    chart.source(data, {
      ratioInTotalAsset: {
        formatter: function formatter(val) {
          return val + '%'
        }
      }
    })
    chart.tooltip(false)
    chart.legend({
      position: 'right',
      offsetY: 8,
      offsetX: -30,
      itemFormatter: function itemFormatter(val) {
        return val + ':' + map[val]
      },
      clickable: false,
      marker: function marker(x, y, r, ctx) {
        ctx.lineWidth = 1
        ctx.strokeStyle = ctx.fillStyle
        ctx.arc(x, y, 4, 0, Math.PI * 2, false)
        ctx.fill()

        //画白色实心圆
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2, false)
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.closePath()
      }
    })
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.85,
      radius: 1
    })
    chart.axis(false)
    chart
      .interval()
      .position('a*ratioInTotalAsset')
      .color('assetType', ['#1C82DE', '#45B18B', '#EE4634', '#A3B6CD'])
      .adjust('stack')

    chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="width:250px;height:30px;text-align: center;">' +
        '<div style="font-size:12px;line-height:14px;color:#4D4F51">总规模(' +
        dw +
        ')</div>' +
        '<div style="font-size:13px;font-weight:700;font-family:Arial, Helvetica, sans-serif;color:#000000">' +
        TotalAsset +
        '</div>' +
        '</div>'
    })
    chart.render()
  }
  render() {
    return (
      <div className="assetPortfolio">
        <canvas id="mountNode1" style={{ display: 'block' }} />
      </div>
    )
  }
}

export default AssetPortfolio
