/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-26 13:48:56
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-03-29 15:15:09
 * @Note 全局函数
 */

import cot from 'cookie.js'

//  灰度版本
const GreyVersion = '3.0.0'

/**
 * 版本比较
 *
 * @param {*} curV 当前版本
 * @param {*} reqV 请求版本
 * @returns true 是新版本  false 旧版本
 */
function VersionCompare(curV, reqV) {
  var arr1 = curV.split('.')
  var arr2 = reqV.split('.')
  //将两个版本号拆成数字
  var minL = Math.min(arr1.length, arr2.length)
  var pos = 0 //当前比较位
  var diff = 0 //当前为位比较是否相等

  //逐个比较如果当前位相等则继续比较下一位
  while (pos < minL) {
    diff = parseInt(arr1[pos]) - parseInt(arr2[pos])
    if (diff != 0) {
      break
    }
    pos++
  }

  return diff >= 0

  // if (diff > 0) {
  //   console.log('新版本')
  // } else if (diff == 0) {
  //   console.log('稳定版')
  // } else {
  //   console.log('旧版本')
  // }
}

/**
 * 是否新环境
 *
 * @export
 * @param {*} version 当前版本
 * @returns true 是新版本  false 旧版本
 * 新环境为最新版本 旧环境需要兼容
 */
export function isNewVersion(version) {
  try {
    let version = version ? version : cot.get('app-version')
    return VersionCompare(version, GreyVersion)
  } catch (e) {
    return true
  }
}

/**
 * 获取token
 *
 * @export
 */
export function getToken() {
  cot.get('token')
}
