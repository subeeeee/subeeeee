import React from 'react'
import { hashHistory } from 'react-router'
import 'rmc-picker/assets/index.css'
import 'rmc-date-picker/assets/index.css'
import 'rmc-picker/assets/popup.css'
import zh_CN from 'rmc-date-picker/lib/locale/zh_CN'
import DatePicker from 'rmc-date-picker/lib/DatePicker'
import PopPicker from 'rmc-date-picker/lib/Popup'
import '../sass/perInformation.scss'
import { BackTitle } from './common/baseTitle'
import { toast, showload } from './common/toast'
import {
  setToken,
  finishPage,
  changeTitle,
  setAppVerion,
  isShowTitle,
  isIphone
} from '../common/setToken'
import toApi from '../common/api'
import cot from 'cookie.js'
import Password from './common/Password'
import CP from './common/CP'
import DialogBox from './common/alertBox/DialogBox'
import {
  checkResult,
  GetPersonInformationApi,
  SetPerInformationApi
} from '../common/api/api'
import {
  ROUTE_PERSON_INFO_FORM,
  ROUTE_PERSON_CER_DATA,
  ROUTE_PERSON_RESULT,
  ROUTE_RETRIEVE_PSW
} from '../common/route/routeName'
import {
  ActionSheetCannel,
  ActionSheetClose
} from './common/actionSheet/wxActionSheet'
import BaseComponent from './baseComponent'

export default class perInformation extends BaseComponent {
  constructor(props) {
    super(props)

    this.setBackGroundColor('#EFEFF4')
    this.state = {
      className: '', //姓名
      beneficiaryShow: false, //交易实际收益人的变量
      beneficiaryName: '', //交易实际收益人的姓名
      beneficiaryIdNum: '', //交易实际受益人的身份证号
      beneficiaryIsSelf: 1, //交易实际收益人 1是本人 0 是他人
      beneficiary: {
        beneficiary: '',
        selfName: ''
      }, //实际收益人
      holdingShow: false, //交易实际实际控制人的
      holdingName: '', //交易实际控制人的的名字
      holdingIdNum: '', //交易实际控制人的身份证号
      holdingIsSelf: 1, //交易实际控制人  1是本人 0是他人
      holding: {
        holdingName: '',
        selfName: ''
      }, //实际控制人
      personalList: [], //个人所有信息的数组
      specialInfo: '',
      badIntegrityList: [], //有无诚信记录的数组
      specialInfoList: [], //资产规模是否满足条件的的数组
      badIntegrity: '', //是否有不良记录
      badIntegrityShow: '', //是否有不良记录的变量
      birthday: '', //出生日期
      checkout: true, //最后一个单选框是否是选中的状态
      hide: 0, //密码框的显示和隐藏
      dealPasswords: '', //密码
      isShow: false //交易密码是否超过三次以后的变量
    }
    if (!isShowTitle()) {
      changeTitle('个人信息')
    }
  }

  componentWillUnmount = () => {
    this.setBackGroundColor('#fff')
    ActionSheetClose()
  }

  componentDidMount() {
    this.GetPersonInformationData()
    document.body.addEventListener('focusin', () => {
      //软键盘弹出的事件处理
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      isIphone() &&
        scrollTop > 0 &&
        this.setState({ className: 'postion-absolute' })
    })
    document.body.addEventListener('focusout', () => {
      //软键盘收起的事件处理
      isIphone() && this.setState({ className: '' })
    })
  }

  /**
   *个人信息
   *
   * @memberof perInformation
   */
  async GetPersonInformationData() {
    showload(true)
    let result = await GetPersonInformationApi()
    showload(false)
    if (checkResult(result)) {
      let specialInfoList = result.data.specialInfoList
      let personalList = result.data.personalList

      let checkout = true
      let specialInfo = result.data.specialInfo
      console.log(result.data.specialInfo)
      console.log(888)

      // 是否有不良记录
      let badIntegrityList = result.data.badIntegrityList
      let badIntegrityShow = ''
      let badIntegrity = result.data.badIntegrity

      //实际控制人 1是本人  0 他人
      let holdingIsSelf = result.data.holdingIsSelf
      let holdingShow = holdingIsSelf == 0
      let holdingName = holdingShow ? result.data.holding.holdingName : ''
      let holdingIdNum = holdingShow ? result.data.holding.holdIdNo : ''

      //实际受益人 1是本人  0 他人
      let beneficiaryIsSelf = result.data.beneficiaryIsSelf
      let beneficiaryShow = beneficiaryIsSelf == 0
      let beneficiaryName = beneficiaryShow
        ? result.data.beneficiary.beneficiary
        : ''
      let beneficiaryIdNum = beneficiaryShow
        ? result.data.beneficiary.beneficiaryIdNo
        : ''

      if (cot.get('perInformation_data')) {
        let result = JSON.parse(cot.get('perInformation_data'))
        personalList = personalList.map((item, index) => {
          let newItem = item.map((cell, _index) => {
            return {
              ...cell,
              value: result.personalList[index][_index].value
            }
          })
          return newItem
        })

        result.hasOwnProperty('checkout') && (checkout = result.checkout)
        result.specialInfo && (specialInfo = result.specialInfo)
        result.badIntegrity && (badIntegrity = result.badIntegrity)

        result.holdingShow && (holdingShow = result.holdingShow)
        result.holdingName && (holdingName = result.holdingName)
        result.holdingIdNum && (holdingIdNum = result.holdingIdNum)

        result.beneficiaryShow && (beneficiaryShow = result.beneficiaryShow)
        result.beneficiaryName && (beneficiaryName = result.beneficiaryName)
        result.beneficiaryIdNum && (beneficiaryIdNum = result.beneficiaryIdNum)
      }
      if (specialInfoList) {
        specialInfoList = specialInfoList.map((item, index) => {
          return { ...item, checked: specialInfo.indexOf(item.value) != -1 }
        })
      }
      if (badIntegrityList) {
        for (let i = 0, l = badIntegrityList.length; i < l; i++) {
          if (badIntegrity == badIntegrityList[i].value) {
            badIntegrityShow = badIntegrityList[i].name
            break
          }
        }
      }
      this.setState({
        ...result.data,
        holdingShow: holdingShow,
        holdingName: holdingName,
        holdingIdNum: holdingIdNum,
        beneficiaryShow: beneficiaryShow,
        beneficiaryName: beneficiaryName,
        beneficiaryIdNum: beneficiaryIdNum,
        specialInfoList: specialInfoList,
        personalList: personalList,
        checkout: checkout,
        specialInfo: specialInfo,
        badIntegrity: badIntegrity,
        badIntegrityShow: badIntegrityShow
      })
    }
  }

  getResult = () => {
    let personalList = this.state.personalList.map((item, index) => {
      let newItem = item.map((cell, _index) => {
        return { value: cell.value }
      })
      return newItem
    })
    return {
      personalList: personalList,
      checkout: this.state.checkout,
      specialInfo: this.state.specialInfo,
      badIntegrity: this.state.badIntegrity,
      holdingShow: this.state.holdingShow,
      holdingName: this.state.holdingName,
      holdingIdNum: this.state.holdingIdNum,
      beneficiaryShow: this.state.beneficiaryShow,
      beneficiaryName: this.state.beneficiaryName,
      beneficiaryIdNum: this.state.beneficiaryIdNum
    }
  }

  onChange = (index, parentIndex) => date => {
    let personalList = this.state.personalList
    personalList[parentIndex][index].value = this.format(date)
    this.setState({
      birthday: date,
      personalList: personalList
    })
  }

  onDismiss = () => {}

  format = date => {
    let mday = date.getDate()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    mday = mday < 10 ? `0${mday}` : mday
    return `${date.getFullYear()}${month}${mday}`
  }

  _itemClick = (item, index, parentIndex) => () => {
    if (item.isUp == 1) {
      if (item.type == 0) {
        cot.set('perInformation_data', JSON.stringify(this.getResult()))
        hashHistory.push({
          pathname: ROUTE_PERSON_INFO_FORM,
          query: {
            title: item.title,
            paramKey: item.paramKey,
            index: index,
            parentIndex: parentIndex
          },
          state: {
            value: item.value
          }
        })
      } else if (item.type == 1) {
        let options = item.optionList.map((cel, _cIndex) => {
          return cel.name
        })

        ActionSheetCannel('选择' + item.title, options, i => {
          let personalList = this.state.personalList
          personalList[parentIndex][index].value = item.optionList[i].value
          this.setState({ personalList: personalList })
        })
      } else if (item.type == 2 && item.paramKey == 'idEnddate') {
        cot.set('perInformation_data', JSON.stringify(this.getResult()))
        hashHistory.push({
          pathname: ROUTE_PERSON_CER_DATA,
          query: {
            title: item.title,
            paramKey: item.paramKey,
            index: index,
            parentIndex: parentIndex
          },
          state: {
            value: item.value
          }
        })
      }
    }
  }

  _mapChildItem = parentIndex => (cell, index) => {
    //type 0 文本  1 选择   2 日期 ; isUp  1 可写 0 不可写 ；  isMust 1 必需
    if (cell.type == 2 && cell.paramKey == 'birthday') {
      const datePicker = (
        <DatePicker
          rootNativeProps={{ 'data-xx': 'yy' }}
          mode={'date'}
          minDate={new Date(1900, 8, 15)}
          maxDate={new Date()}
          defaultDate={new Date(1990, 0, 1)}
          locale={zh_CN}
        />
      )
      let showValue = cell.value
      showValue =
        showValue.substring(0, 4) +
        '-' +
        showValue.substring(4, 6) +
        '-' +
        showValue.substring(6, showValue.length)

      const { birthday } = this.state
      return (
        <PopPicker
          key={index}
          datePicker={datePicker}
          transitionName="rmc-picker-popup-slide-fade"
          maskTransitionName="rmc-picker-popup-fade"
          title={'选择日期'}
          date={birthday}
          okText={'确认'}
          dismissText={'取消'}
          onDismiss={this.onDismiss}
          onChange={this.onChange(index, parentIndex)}
        >
          <div>
            <p className="perName">
              <span>
                {cell.isMust == 1 ? <em>*</em> : ''}

                {cell.title}
              </span>
              <span>
                {showValue}
                {cell.isUp == 1 ? (
                  <img
                    className="img"
                    src={require('../asset/small_right.png')}
                  />
                ) : (
                  ''
                )}
              </span>
            </p>

            <div className="thin-line" />
          </div>
        </PopPicker>
      )
    } else {
      let showValue = cell.value
      if (cell.type == 2 && cell.paramKey == 'idEnddate') {
        if (showValue) {
          let reg = new RegExp('^9999')
          if (reg.test(cell.value)) {
            showValue = '长期'
          } else {
            showValue =
              showValue.substring(0, 4) +
              '-' +
              showValue.substring(4, 6) +
              '-' +
              showValue.substring(6, showValue.length)
          }
        }
      } else if (cell.type == 1) {
        for (let i = 0, l = cell.optionList.length; i < l; i++) {
          if (showValue == cell.optionList[i].value) {
            showValue = cell.optionList[i].name
            break
          }
        }
      }
      return (
        <div key={index}>
          <p
            className="perName"
            key={index}
            onClick={this._itemClick(cell, index, parentIndex)}
          >
            <span>
              {cell.isMust == 1 ? <em>*</em> : ''}

              {cell.title}
            </span>
            <span>
              {showValue}
              {cell.isUp == 1 ? (
                <img
                  className="img"
                  src={require('../asset/small_right.png')}
                />
              ) : (
                ''
              )}
            </span>
          </p>
          <div className="thin-line" />
        </div>
      )
    }
  }

  _mapItem = (item, index) => {
    return (
      <div key={index}>
        {item.map(this._mapChildItem(index))}
        <p className="grayEmpty" />
      </div>
    )
  }

  onRequestClose = () => {
    this.setState({ sheetShow: false })
  }

  // 复选框的页面
  checkBigBox = (lied, index) => {
    return (
      <p className="checkBox" key={index}>
        <img
          onClick={this.checkoutBox(lied)}
          src={
            lied.checked
              ? require('../asset/checked.png')
              : require('../asset/unchecked.png')
          }
          className="clearfix"
        />
        <span className="clearfix">{lied.describe}</span>
      </p>
    )
  }

  // 图片的点击事件
  checkoutBox = item => () => {
    let specialInfoList = this.state.specialInfoList
    let valueArr = ''
    specialInfoList = specialInfoList.map((_item, index) => {
      if (_item.value == item.value) {
        if (!_item.checked) {
          valueArr += _item.value + ','
        }
        return { ..._item, checked: !_item.checked }
      } else {
        if (_item.checked) {
          valueArr += _item.value + ','
        }
        return _item
      }
    })
    if (valueArr) {
      valueArr = valueArr.substring(0, valueArr.length - 1)
    }
    this.setState({ specialInfoList: specialInfoList, specialInfo: valueArr })
  }
  // 本人保证（最后一个复选框的点击事件）
  _clicks = () => {
    this.setState({
      checkout: !this.state.checkout
    })
  }

  // 密码框
  onEndPwd = value => {
    this.setState(
      {
        dealPasswords: value,
        hide: 0
      },
      this._submit
    )
  }

  //点击提交按钮
  submit = () => {
    //校验 填写
    let personalList = this.state.personalList
    for (let i = 0, l = personalList.length; i < l; i++) {
      for (let j = 0, sl = personalList[i].length; j < sl; j++) {
        let cell = personalList[i][j]
        if (cell.isUp == 1) {
          if (cell.isMust == 1 && !cell.value) {
            toast(`${cell.title}项不能为空`)
            return
          }
        }
      }
    }

    if (this.state.holdingShow) {
      if (!this.state.holdingName) {
        toast('请输入交易的实际控制人')
        return
      }
      if (!this.state.holdingIdNum) {
        toast('请输入控制人身份证号')
        return
      }
      var regholdIdNo = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regholdIdNo.test(this.state.holdingIdNum)) {
        toast('控制人身份证号填写有误')
        return
      }
    }
    if (this.state.beneficiaryShow) {
      if (!this.state.beneficiaryName) {
        toast('请输入交易的实际受益人')
        return
      }
      if (!this.state.beneficiaryIdNum) {
        toast('请输入受益人身份证号')
        return
      }
      var regbeneficiaryIdNo = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!regbeneficiaryIdNo.test(this.state.beneficiaryIdNum)) {
        toast('受益人身份证号填写有误')
        return
      }
    }
    //  if(!this.state.specialInfo){
    //     toast('请确认您在资产规模与投资经验上是否满足以下条件')
    //     return;
    //  }
    if (!this.state.checkout) {
      toast('请勾选本人保证提供的信息真实、准确、完整、知晓')
      return
    }
    this.setState({ hide: 1 })
  }

  // 保存信息按钮的接口
  _submit = () => {
    //拼接参数
    let parms = {
      beneficiaryIsSelf: this.state.beneficiaryShow ? 0 : 1,
      beneficiaryIdNo: this.state.beneficiaryIdNum,
      beneficiary: this.state.beneficiaryShow
        ? this.state.beneficiaryName
        : this.state.beneficiary.selfName,
      holdingIsSelf: this.state.holdingShow ? 0 : 1,
      holdIdNo: this.state.holdingIdNum,
      holdingName: this.state.holdingShow
        ? this.state.holdingName
        : this.state.holding.selfName,
      badIntegrity: this.state.badIntegrity,
      specialInfo: this.state.specialInfo,
      dealPasswords: this.state.dealPasswords
    }
    let personalList = this.state.personalList
    for (let i = 0, l = personalList.length; i < l; i++) {
      for (let j = 0, sl = personalList[i].length; j < sl; j++) {
        let cell = personalList[i][j]
        if (cell.isUp == 1) {
          cell.value && (parms[cell.paramKey] = cell.value)
        }
      }
    }
    this.SetPerInformationData()
  }

  /**
   * 设置个人信息
   *
   * @memberof perInformation
   */
  async SetPerInformationData() {
    let parms = {
      beneficiaryIsSelf: this.state.beneficiaryShow ? 0 : 1,
      beneficiaryIdNo: this.state.beneficiaryIdNum,
      beneficiary: this.state.beneficiaryShow
        ? this.state.beneficiaryName
        : this.state.beneficiary.selfName,
      holdingIsSelf: this.state.holdingShow ? 0 : 1,
      holdIdNo: this.state.holdingIdNum,
      holdingName: this.state.holdingShow
        ? this.state.holdingName
        : this.state.holding.selfName,
      badIntegrity: this.state.badIntegrity,
      specialInfo: this.state.specialInfo,
      dealPasswords: this.state.dealPasswords
    }
    let personalList = this.state.personalList
    for (let i = 0, l = personalList.length; i < l; i++) {
      for (let j = 0, sl = personalList[i].length; j < sl; j++) {
        let cell = personalList[i][j]
        if (cell.isUp == 1) {
          cell.value && (parms[cell.paramKey] = cell.value)
        }
      }
    }
    showload(true)
    let result = await SetPerInformationApi(parms)
    showload(false)
    if (checkResult(result, result.code != '11001')) {
      cot.remove('perInformation_data')
      hashHistory.push({
        pathname: ROUTE_PERSON_RESULT
      })
    } else {
      if (result.data.loadPassword == 0 && result.code == '11001') {
        this.setState({ isShow: true })
      }
    }
  }

  myBack = () => {
    cot && cot.remove('perInformation_data')
    if (
      this.props.location.query.from &&
      this.props.location.query.from == 'wx'
    ) {
      finishPage()
    } else {
      hashHistory.goBack()
    }
  }

  //点击不良记录按钮
  badRecord = () => {
    const { badIntegrityList } = this.state
    let options = badIntegrityList.map((cel, _cIndex) => {
      return cel.name
    })

    ActionSheetCannel('选择不良诚信记录', options, (i, text) => {
      this.setState({
        badIntegrityShow: text,
        badIntegrity: badIntegrityList[i].value
      })
    })
  }

  // 交易的实际控制人
  Acontroller = () => {
    ActionSheetCannel('选择交易的实际控制人', ['本人', '他人'], index => {
      if (index == 0) {
        this.setState({
          holdingShow: false
        })
      } else {
        this.setState({
          holdingShow: true
        })
      }
    })
  }

  //交易的实际受益人
  Abeneficiary = () => {
    ActionSheetCannel('选择交易的实际受益人', ['本人', '他人'], index => {
      if (index == 0) {
        this.setState({
          beneficiaryShow: false
        })
      } else {
        this.setState({
          beneficiaryShow: true
        })
      }
    })
  }

  onChangeText = type => event => {
    if (type == 0) {
      this.setState({
        holdingName: event.target.value
      })
    } else if (type == 1) {
      this.setState({
        beneficiaryName: event.target.value
      })
    } else if (type == 3) {
      this.setState({
        beneficiaryIdNum: event.target.value
      })
    } else if (type == 2) {
      this.setState({
        holdingIdNum: event.target.value
      })
    }
  }

  render() {
    const {
      beneficiaryName,
      beneficiaryIdNum,
      beneficiaryShow,
      holdingShow,
      holdingName,
      holdingIdNum,
      personalList,
      specialInfoList,
      checkout,
      hide,
      badIntegrityShow
    } = this.state
    return (
      <div className="perInformation">
        <BackTitle
          titleName={'个人信息'}
          hasPostion={true}
          back={this.myBack}
          classname={this.state.className}
        />
        {personalList && personalList.map(this._mapItem)}
        <div>
          <p className="perName" onClick={this.Acontroller}>
            <span>
              <em>*</em>
              交易的实际控制人
            </span>
            <span>
              {holdingShow ? '他人' : '本人'}
              <img className="img" src={require('../asset/small_right.png')} />
            </span>
          </p>
          {holdingShow ? (
            <input
              placeholder="请输入交易的实际控制人"
              onChange={this.onChangeText(0)}
              value={holdingName}
              type="text"
              maxLength={16}
            />
          ) : (
            ''
          )}
          {holdingShow ? <p className="thin-line" /> : ''}
          {holdingShow ? (
            <input
              placeholder="请输入控制人身份证号码"
              onChange={this.onChangeText(2)}
              value={holdingIdNum}
              type="text"
              maxLength={18}
            />
          ) : (
            ''
          )}
          <p className="thin-line" />

          <p className="perName" onClick={this.Abeneficiary}>
            <span>
              <em>*</em>
              交易的实际受益人
            </span>
            <span>
              {beneficiaryShow ? '他人' : '本人'}
              <img className="img" src={require('../asset/small_right.png')} />
            </span>
          </p>
          {beneficiaryShow ? (
            <input
              placeholder="请输入交易的实际受益人"
              onChange={this.onChangeText(1)}
              value={beneficiaryName}
              type="text"
              maxLength={16}
            />
          ) : (
            ''
          )}
          {beneficiaryShow ? <p className="thin-line" /> : ''}
          {beneficiaryShow ? (
            <input
              placeholder="请输入受益人身份证号码"
              onChange={this.onChangeText(3)}
              value={beneficiaryIdNum}
              type="text"
              maxLength={18}
            />
          ) : (
            ''
          )}
          <p className="thin-line" />

          <p className="perName" onClick={this.badRecord}>
            <span>
              <em>*</em>
              不良诚信记录
            </span>
            <span>
              {badIntegrityShow}
              <img className="img" src={require('../asset/small_right.png')} />
            </span>
          </p>
          <p className="grayEmpty" />
        </div>
        <div className="checkContent">
          <p className="checkOne">
            请确认您在资产规模与投资经验上是否满足以下条件
          </p>
          {specialInfoList && specialInfoList.map(this.checkBigBox)}
          <p className="checkBox red">
            <img
              onClick={this._clicks}
              src={
                checkout
                  ? require('../asset/checked.png')
                  : require('../asset/unchecked.png')
              }
              className="clearfix"
            />{' '}
            <span className="clearfix">
              本人保证提供的信息真实、准确、完整、知晓并确认若提供的信息不真实/不准确/不完整，应该依法承担相应的法律责任，基金销售机构将不承担由此导致的相关适应性不匹配的任何结果，且有权拒绝销售产品或提供服务，本人已知晓并确认提供信息发生重要变化、可能影响投资者分类的，应当及时进行更新并告知基金销售机构
            </span>
          </p>
        </div>
        <CP className="botBtn" onClick={this.submit}>
          保存信息
        </CP>
        <Password
          show={hide}
          onEnd={this.onEndPwd}
          onHide={() => {
            this.setState({ hide: 0 })
          }}
        />
        <DialogBox
          isShow={this.state.isShow}
          text={'交易密码已被锁定，请24小时后再试！'}
          title={'温馨提示'}
          cancelText={'取消'}
          confirmText={'找回密码'}
          cancelCallBack={() => {
            this.setState({ isShow: false })
          }}
          confirmCallBack={() => {
            hashHistory.push({
              pathname: ROUTE_RETRIEVE_PSW,
              query: {
                fundCode: this.state.fundCode
              }
            })
          }}
        />
      </div>
    )
  }
}
