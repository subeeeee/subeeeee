import React, { Component } from 'react'
import './wave.scss'

export default class Ware extends Component {
  constructor(props) {
    super(props)
    // 定时器
    this.timers = []
  }

  componentDidMount() {
    this.wave('wave1', 100, 'rgba(255, 255, 255, 0.1)', 1600)
    this.wave('wave2', 90, 'rgba(255, 255, 255, 0.1)', 1600, -500)
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.timers.forEach(timer => {
      clearInterval(timer)
    })
  }

  /**
   * 底部波浪
   * @param $canvasID     canvasID
   * @param $progress     波浪位置的高度
   * @param $maveColor    波浪颜色
   * @param $time         运动周期
   * @param $startX       开始x位置
   * @param $startY       开始y位置
   */
  wave(canvasID, progress, maveColor, time, startX = -1000, startY = 212) {
    let waveWidth = 375 * 4,
      offset = 0,
      waveHeight = 30, // 波浪高度
      waveCount = 4, // 波浪个数
      d2 = waveWidth / waveCount, // 单个波浪的宽度
      d = d2 / 2,
      hd = d / 2,
      c = document.getElementById(canvasID)
    if (!c) {
      return
    }

    c.width = 375 * 4
    c.height = 160

    let ctx = c.getContext('2d')

    if (!ctx) {
      return
    }

    function move() {
      offset -= 5
      if (-1 * offset === d2) offset = 0
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.fillStyle = maveColor
      // let gradient = ctx.createLinearGradient(0, 0, 300, 0)
      // gradient.addColorStop(0, maveColor)
      // gradient.addColorStop(0, '#fff')
      // gradient.addColorStop(1, '#00f')
      // ctx.fillStyle = gradient
      ctx.beginPath()
      let offsetY = startY - progress
      ctx.moveTo(startX - offset, offsetY)
      for (let i = 0; i < waveCount; i++) {
        let dx = i * d2
        let offsetX = dx + startX - offset
        ctx.quadraticCurveTo(
          offsetX + hd,
          offsetY + waveHeight,
          offsetX + d,
          offsetY
        )
        ctx.quadraticCurveTo(
          offsetX + hd + d,
          offsetY - waveHeight,
          offsetX + d2,
          offsetY
        )
      }
      ctx.lineTo(startX + waveWidth, 3000)
      ctx.lineTo(startX, 3000)
      ctx.fill()

      // setTimeout(move, time / 60) //速度
    }

    let timer = setInterval(() => {
      move()
    }, time / 60)

    this.timers.push(timer)
  }

  /**
   * 组件渲染
   *
   */
  render() {
    return (
      <div className="wave" style={this.props.style}>
        <div className="vwave1">
          <canvas id="wave1" width="100%" height="160px" />
        </div>
        <div className="vwave2">
          <canvas id="wave2" width="100%" height="160px" />
        </div>
      </div>
    )
  }
}
