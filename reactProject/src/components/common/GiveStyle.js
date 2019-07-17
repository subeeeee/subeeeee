/**
 * Created by shuis on 2017/4/12.
 */
import React from 'react'

class GiveStyle extends React.Component {
  _parseText = text => {
    let arr1 = text.split('{')
    if (arr1.length <= 1) {
      return [text]
    } else {
      let arr = []
      arr1.forEach(item => {
        let arr2 = item.split('}')
        arr.push(...arr2)
      })
      return arr
    }
  }

  setStyle() {
    let style = this.props.style
    let rightValue = '2px'
    if (style == 'color') return { color: this.props.value }
    if (style == 'fontSize')
      return { fontSize: this.props.value, marginRight: rightValue }
    return { color: this.props.value }
  }

  render() {
    let list = this._parseText(this.props.text)

    return (
      <span>
        {list.map((item, index) => {
          return index % 2 == 0 ? (
            <span key={index}>{item}</span>
          ) : (
            <span key={index} style={this.setStyle()}>
              {item}
            </span>
          )
        })}
      </span>
    )
  }
}

export default GiveStyle
