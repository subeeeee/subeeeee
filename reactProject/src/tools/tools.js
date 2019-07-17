/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-10-11 10:43:37
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-14 13:58:56
 * @Note 工具类
 * @flow
 */
import { toast, showload } from '../components/common/toast'
/**
 * 保留指定小数位数
 *
 * @returns
 */
export function getDecimal(num, v) {
  var vv = Math.pow(10, v)
  return Math.round(num * vv) / vv
}

/**
 * 保留3位小数
 *
 * @param {*} num
 * @returns
 */
export function keepDecimal(num) {
  num = Number.parseFloat(num)
  if (!num) {
    return 0
  }
  let result = parseFloat(num)
  result = Math.round(num * 1000) / 1000
  return result
}

/**
 * 四舍五入保留3位小数（不够位数，则用0替补）
 *
 * @param {*} num
 * @returns
 */
export function keepDecimalFull(num, bit = 2) {
  let result = parseFloat(num)

  let value = Math.pow(10, bit)

  result = Math.round(num * value) / value
  let s_x = result.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + bit) {
    s_x += '0'
  }
  return s_x
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} dateTime
 */
export function formatDate(dateTime) {
  let date = new Date(Number(dateTime))
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate()
}

/**
 * 反向格式化时间
 *
 * @export
 * @param {*} dateTime
 * @returns
 */
export function reFormatDate(dateTime) {
  if (!dateTime) {
    return ''
  }
  let date = replaceString(dateTime, '-', '')
  return date
}

/**
 * 检查时间
 *
 * @export
 * @param {*} sDate 开始时间
 * @param {*} eDate 结束时间
 */
export function checkDate(sDate, eDate) {
  sDate = reFormatDate(sDate)
  eDate = reFormatDate(eDate)
  let date = new Date()

  date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate()
  date = reFormatDate(date)
  if (!checkDateEx(sDate) || !checkDateEx(eDate)) {
    toast('时间不能大于今天')
    return false
  }

  if (sDate >= eDate) {
    toast('开始时间不能大于结束时间')
    return false
  }

  return true
}

/**
 * 检查时间
 *
 * @export
 * @param {*} date
 * @returns
 */
export function checkDateEx(date) {
  date = reFormatDate(date)
  let now = new Date()
  now = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getUTCDate()
  now = reFormatDate(now)

  if (date >= now) {
    toast('时间应小于当前时间')
    return false
  }

  return true
}

/**
 * 时间格式化
 *
 * @export
 * @param {*} date
 */
export function formatDateEx(date) {
  let year = date.substring(0, 4)

  let mon = date.substring(4, 6)

  let day = date.substring(6, 8)

  return year + '-' + mon + '-' + day
}

/**
 * 格式化百分比
 *
 * @export
 * @param {*} num 要格式化百分比的数值
 * @param {*} sign 是否需要符号
 */
export function formatPercent(num, sign = false) {
  let value = getDecimal(num, 2)
  if (sign) {
    return value > 0 ? '+' + value + '%' : value + '%'
  }

  return value + '%'
}

/**
 * 格式化百分比 乘100
 *
 * @export
 * @param {*} num 要格式化百分比的数值
 * @param {boolean} [sign=false] 是否需要符号
 * @returns
 */
export function formatPercentEx(num, sign = false) {
  let value = getDecimal(num * 100, 2)
  if (sign) {
    return value > 0 ? '+' + value + '%' : value + '%'
  }

  return value + '%'
}

/**
 * 拼接字符串
 *
 * @export
 * @param {*} strings 字符串数组
 * @param {string} [sign=''] 间隔符
 * @returns
 */
export function catString(strings, sign = '') {
  let value = ''
  strings &&
    strings.length > 0 &&
    strings.forEach((element, index) => {
      if (index + 1 === strings.length) {
        value += element
      } else {
        value += element + sign
      }
    })

  return value
}

/**
 * 替换字符串
 *
 * @export
 * @param {*} string 字符串
 * @param {*} char 要替换的字符串
 * @param {*} sign 替换的字符
 * @returns
 */
export function replaceString(string, char, sign) {
  let subStr = new RegExp(char, 'ig')
  let result = string.replace(subStr, sign)

  return result
}

/**
 * 数字月份返回汉字月份
 *
 * @returns
 */
export function getMonth(m) {
  let mstr = ''

  switch (m) {
    case '01':
      mstr = '一月'
      break
    case '02':
      mstr = '二月'
      break
    case '03':
      mstr = '三月'
      break
    case '04':
      mstr = '四月'
      break
    case '05':
      mstr = '五月'
      break
    case '06':
      mstr = '六月'
      break
    case '07':
      mstr = '七月'
      break
    case '08':
      mstr = '八月'
      break
    case '09':
      mstr = '九月'
      break
    case '10':
      mstr = '十月'
      break
    case '11':
      mstr = '十一月'
      break
    case '12':
      mstr = '十二月'
      break
    default:
      mstr = ''
  }
  return mstr
}

/**
 * 定时器
 *
 * @param {*} callBack 回调
 * @param {*} timeInterval 时间间隔
 * @param {boolean} [immediately=true] 立刻执行
 */
export const intervalTime = (callBack, timeInterval, immediately = true) => {
  if (immediately) {
    callBack()
  }
  return setInterval(callBack, timeInterval)
}
