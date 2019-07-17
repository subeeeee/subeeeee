import React from 'react'
import 'rmc-picker/assets/index.css'
import 'rmc-date-picker/assets/index.css'
import 'rmc-picker/assets/popup.css'
import zh_CN from 'rmc-date-picker/lib/locale/zh_CN'
import DatePicker from 'rmc-date-picker/lib/DatePicker'
import PopPicker from 'rmc-date-picker/lib/Popup'
import '../sass/cerData.scss'
import { BackTitle } from './common/baseTitle'
import { hashHistory } from 'react-router'
import { setToken, changeTitle, isShowTitle } from '../common/setToken'
import cot from 'cookie.js'
import BaseComponent from './baseComponent'

export default class textPage extends BaseComponent {
  constructor(props) {
    super(props)
    this.setBackGroundColor('#EFEFF4')
    let showValue = (props.location.state && props.location.state.value) || ''
    showValue &&
      (showValue =
        showValue.substring(0, 4) +
        '-' +
        showValue.substring(4, 6) +
        '-' +
        showValue.substring(6, showValue.length))

    this.state = {
      title: props.location.query.title,
      paramKey: props.location.query.paramKey,
      value: (props.location.state && props.location.state.value) || '',
      showValue: showValue,
      isShow: new RegExp('^9999').test((props.location.state && props.location.state.value) || ''),
      date: '',
      index: props.location.query.index,
      parentIndex: props.location.query.parentIndex
    }
  }

  getTitle() {
    return '证件有效期'
  }

  onChange = date => {
    this.setState({
      date,
      showValue: this.formatValue(date),
      value: this.format(date),
      isShow: false
    })
  }

  onDismiss = () => {
    console.log('onDismiss')
  }

  formatValue = date => {
    let mday = date.getDate()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    mday = mday < 10 ? `0${mday}` : mday
    return `${date.getFullYear()}-${month}-${mday}`
  }

  format = date => {
    let mday = date.getDate()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    mday = mday < 10 ? `0${mday}` : mday
    return `${date.getFullYear()}${month}${mday}`
  }

  getMaxDate = () => {
    let date = new Date()
    return new Date(date.getFullYear() + 20, 11, 31)
  }

  rightBack = () => {
    //储存信息
    let { index, parentIndex } = this.state
    let result = JSON.parse(cot.get('perInformation_data'))
    if (result) {
      result.personalList[parentIndex][index].value = this.state.value
      cot.set('perInformation_data', JSON.stringify(result))
    }
    hashHistory.goBack()
  }

  render() {
    const datePicker = (
      <DatePicker
        rootNativeProps={{ 'data-xx': 'yy' }}
        mode={'date'}
        minDate={new Date()}
        maxDate={this.getMaxDate()}
        defaultDate={new Date()}
        locale={zh_CN}
      />
    )
    const { date, isShow, showValue } = this.state

    return (
      <div className="textPage">
        <BackTitle
          titleName={'证件有效期'}
          hasPostion={true}
          from={this.props.location.query.from}
          rightTitle={'完成'}
          rightBack={this.rightBack}
        />
        <p
          className="longTime"
          onClick={() => {
            this.setState({ isShow: true, value: '99991231' })
          }}>
          <span>长期</span>
          <span>
            {isShow == 1 ? (
              <img className="imgs" src={require('../asset/check-bonus.png')} />
            ) : null}
          </span>
        </p>
        <p className="thin-line" />
        <PopPicker
          datePicker={datePicker}
          transitionName="rmc-picker-popup-slide-fade"
          maskTransitionName="rmc-picker-popup-fade"
          title={'选择日期'}
          date={date}
          okText={'确认'}
          dismissText={'取消'}
          onDismiss={this.onDismiss}
          onChange={this.onChange}>
          <p className="longTime">
            <span>请选择具体日期</span>
            <span>
              {isShow ? '' : showValue}
              <img src={require('../asset/small_right.png')} />
            </span>
          </p>
        </PopPicker>
      </div>
    )
  }
}
