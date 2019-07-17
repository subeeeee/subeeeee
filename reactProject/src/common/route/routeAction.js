/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-08 14:30:11
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 14:51:58
 * @Note 路由行为定义
 */

import { hashHistory } from 'react-router'

/**
 * push路由
 *
 * @export
 * @param {*} routeName
 * @param {*} params
 */
export function routePush(routeName, params, state = null) {
  global.isAndroidBack = false
  hashHistory.push({ pathname: routeName, query: params, state: state })
}
/**
 * replace路由
 *
 * @export
 * @param {*} routeName
 * @param {*} params
 */
export function routeReplace(routeName, params, state = null) {
  global.isAndroidBack = false
  hashHistory.replace({ pathname: routeName, query: params, state: state })
}

/**
 * 回退
 *
 * @export
 */
export function routeGoBack() {
  global.isAndroidBack = false
  hashHistory.goBack()
}

/**
 * 回退
 *
 * @export
 * @param {*} index 位置
 */
export function routeGo(index) {
  global.isAndroidBack = false
  hashHistory.go(index)
}
