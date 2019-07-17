/**
 * Created by shuis on 2017/4/12.
 */
import React from 'react'

class RedText extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      add: this.props.add,
      margin: this.props.margin || '0 4px'
    }
  }

  _parseText = text => {
    if (!text) {
      return [text]
    }
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

  render() {
    let list = this._parseText(this.props.text)
    let add = this.props.add
    return (
      <span>
        {list.map((item, index) => {
          return index % 2 == 0 ? (
            <span key={index} className={this.props.className}>
              {item}
            </span>
          ) : (
            <span
              className={this.props.className}
              key={index}
              style={{ color: '#FA5E4A', margin: this.state.margin }}>
              {item}
            </span>
          )
        })}
        {add != '' ? add : ''}
      </span>
    )
  }
}

export default RedText
