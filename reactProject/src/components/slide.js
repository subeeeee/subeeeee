import React, { Component } from 'react'
import _prefix from 'react-prefixer'

const transition = value => {
  return _prefix({
    transition: value
  })
}
const lightText = '#999'

export default class Slide extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ...props,
      defaultOption: props.value,
      selectIndex: 0,
      width: 0,
      touch: 0
    }
    this.state.options.map((item, index, arr) => {
      if (item.value === this.state.defaultOption) {
        this.state.selectIndex = index
        this.state.width = index / (arr.length - 1)
      }
    })

    if (props.form) {
      props.form.regRefer(props.name, this)
    }
  }

  onTouch(e) {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }

    if (e.nativeEvent.touches.length > 0) {
      const touch = e.nativeEvent.touches[0]

      if (touch.clientX >= document.body.scrollWidth - 30) {
        this.setState({
          width: 1,
          touch: 1
        })
        return null
      }
      if (touch.clientX <= 30) {
        this.setState({
          width: 0,
          touch: 1
        })
        return null
      }
      this.setState({
        width: (touch.clientX - 30) / (document.body.scrollWidth - 60),
        touch: 1
      })
    }
  }

  onTouchEnd(e) {
    this.setState({
      touch: 0
    })
    if (this.state.width === 0) {
      this.setState({ selectIndex: 0 })
      return null
    }
    if (this.state.width === 1) {
      this.setState({ selectIndex: this.state.options.length - 1 })
      return null
    }
    let length = 1,
      newSelectIndex = 0
    this.state.options.map((item, index, arr) => {
      if (length >= Math.abs(index / (arr.length - 1) - this.state.width)) {
        length = Math.abs(index / (arr.length - 1) - this.state.width)
        newSelectIndex = index
      }
    })
    this.setState({
      selectIndex: newSelectIndex,
      width: newSelectIndex / (this.state.options.length - 1)
    })
    if (this.props.onChange) {
      this.props.onChange(this.state.options[newSelectIndex].value)
    }
  }

  render() {
    let { label, width, options, selectIndex, touch } = this.state
    return (
      <div
        style={slide}
        onTouchStart={this.onTouch.bind(this)}
        onTouchMove={this.onTouch.bind(this)}
        onTouchEnd={this.onTouchEnd.bind(this)}
        onTouchCancel={this.onTouchEnd.bind(this)}>
        <div style={slideTitle}>{label}</div>
        <div style={baseLine}>
          <div
            style={{
              background: '#d0d0d0',
              borderRadius: '4px'
            }}>
            <div
              style={{
                ...activeLine,
                ...(touch ? {} : transition('width .2s cubic-bezier(0.48, -0.44, 0.54, 1.7)')),
                width: `${width * 100}%`
              }}
            />
          </div>
        </div>
        <div
          style={{
            ...point,
            ...(touch ? {} : transition('left .2s cubic-bezier(0.48, -0.44, 0.54, 1.7)')),
            background: '#5493ED',
            left: 24 + (document.body.scrollWidth - 60) * width + 'px',
            top: '64px',
            zIndex: 1
          }}>
          <div
            style={{
              height: '18px',
              width: '18px',
              margin: '2px',
              background: '#ACCEFF',
              borderRadius: '18px'
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: '34px',
              color: '#5493EE',
              top: '-10px',
              position: 'absolute',
              left: '0',
              right: '0',
              textAlign: 'center'
            }}>
            {options[selectIndex].label}
          </div>
          <div
            style={{
              ...arrow,
              ...(touch ? {} : transition('left .2s cubic-bezier(0.48, -0.44, 0.54, 1.7)')),
              left: 10 + (document.body.scrollWidth - 60) * width + 'px',
              top: '36px'
            }}
          />
        </div>
      </div>
    )
  }
}

const slide = {
  width: '100%',
  background: '#fff',
  padding: '10px 0',
  fontSize: '14px',
  position: 'relative'
}
const slideTitle = {
  height: '58px',
  lineHeight: '40px',
  color: lightText
}
const baseLine = {
  height: '20px',
  padding: '7px 30px'
}
const activeLine = {
  height: '2px',
  background: '#5493ED',
  borderRadius: '2px'
}
const point = {
  height: '22px',
  width: '22px',
  borderRadius: '22px',
  position: 'absolute'
}
const optionsLabel = {
  height: '30px',
  lineHeight: '30px',
  display: 'inline-block'
}
const arrow = {
  height: '24px',
  width: '42px',
  background: '#fff',
  position: 'absolute'
}
