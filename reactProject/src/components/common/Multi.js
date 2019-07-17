/**
 * Created by shuis on 2017/4/18.
 */
import React from 'react'
import GiveStyle from './GiveStyle.js'
import '../../sass/multi.scss'

export const YingmiHeader = () => {
  //  return(
  //    <div className='yingmi-header'>
  //     <div className='lock'/>
  //      <div className='text'>
  //        您正在通过盈米财富进行基金安全交易...
  //      </div>
  //    </div>
  //  )
  return null
}

export const Rule = ({ list, type }) => {
  type = type || 0
  return (
    <div className="group">
      {list &&
        list.map((item, index) => {
          if (type == 0) {
            return (
              <div key={index} className="group-item">
                <div className="circle-line">
                  {index == 0 ? (
                    <div className="space" />
                  ) : (
                    <div className="line" />
                  )}
                  <div className="circle">{index + 1}</div>
                  {index == list.length - 1 ? (
                    <div className="space" />
                  ) : (
                    <div className="line" />
                  )}
                </div>
                <div className="rule-item">
                  <div className="item0">{item[0]}</div>
                  <div className="item1">
                    <GiveStyle
                      text={item[1]}
                      style={'color'}
                      value={'#FD765C'}
                    />
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="group-item">
                <div className="circle-line">
                  {index == 0 ? (
                    <div className="space" />
                  ) : (
                    <div className="line" />
                  )}
                  {index == 0 ? <div className="circle">1</div> : ''}
                  {index == 1 ? (
                    <div className="circle-sp">
                      <p style={{ top: '-8px', left: '0' }}>{item[0]}</p>
                      <p style={{ top: '14px', left: '0' }}>{item[1]}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {/*{*/}
                  {/*index == 1 ? <p style={{top: '-4px'}}>{item[0]}</p> : ''*/}
                  {/*}*/}
                  {/*{*/}
                  {/*index == 1 ? <p style={{top: '14px'}}>{item[1]}</p> : ''*/}
                  {/*}*/}
                  {index == 2 ? <div className="circle">2</div> : ''}
                  {index == list.length - 1 ? (
                    <div className="space" />
                  ) : (
                    <div className="line" />
                  )}
                </div>
                <div className="rule-item">
                  <div className="item0">{index == 1 ? '' : item[0]}</div>
                  <div className="item1">
                    {index == 1 ? (
                      ''
                    ) : (
                      <GiveStyle
                        text={item[1]}
                        style={'color'}
                        value={'#FD765C'}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          }
        })}
    </div>
  )
}

export class PopWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.title,
      info: this.props.info,
      show: this.props.show
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props != newProps) {
      this.setState({
        title: newProps.title,
        info: newProps.info,
        show: newProps.show
      })
    }
  }

  hide = () => {
    this.setState({
      show: false
    })
    this.props.hide && this.props.hide()
  }

  render() {
    if (this.state.show) {
      return (
        <div className="pop-window" onClick={this.hide}>
          <div className="pop-cell">
            <div className="pop-title">{this.state.info.hint}</div>
            <div className="pop-info">
              <div className="pop-info-text">{this.state.info.content}</div>
              {this.state.info.list.map(item => {
                return (
                  <ul className="pop-info-list">
                    {item.map(ele => {
                      return (
                        <li>
                          <span>{ele.k}</span>
                          <span>{ele.v}</span>
                        </li>
                      )
                    })}
                  </ul>
                )
              })}
            </div>
            <div className="r1pxline" />
            <div className="pop-btn" onClick={this.hide}>
              我知道了
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
