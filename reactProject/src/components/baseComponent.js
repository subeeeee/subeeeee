/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-08-23 21:25:45
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 14:22:44
 * @Note 基类组件
 */

import React, { Component } from 'react'
import { isShowTitle, setToken, setAppVerion, changeTitle } from '../common/setToken'
import { toast } from './common/toast'
import { parse } from 'querystring'

/**
 * 组件
 *
 * @export
 * @class BaseComponent
 * @extends {Component}
 */
export default class BaseComponent extends Component {
  constructor(props: any) {
    super(props)
    // 设置title
    document
      .getElementsByTagName('head')[0]
      .getElementsByTagName('title')[0].innerText = this.getTitle()
    // 设置默认背景色
    this.setBackGroundColor('#fff')
    // 设置页面的高度
    this.setScrollTop()
    // 设置token
    if (props.location.query.token) {
      setToken(props.location.query.token)
    }

    //  设置版本
    if (props.location.query.version) {
      setAppVerion(props.location.query.version)
    }

    // 判断是否显示标题
    if (!isShowTitle()) {
      changeTitle(this.getTitle())
    }
  }

  /**
   * 设置背景颜色
   *
   * @param {*} color
   * @memberof BaseComponent
   */
  setBackGroundColor(color) {
    document.body.style.backgroundColor = color
    document.getElementsByTagName('html')[0].style.backgroundColor = color
  }
  /**
   * 设置页面距title的高度
   *
   * @memberof BaseComponent
   */
  setScrollTop() {
    document.body.scrollTop = '0px'
    document.documentElement.scrollTop = '0px'
  }
  /**
   * 设置title
   *
   * @param {*} title
   * @memberof BaseComponent
   */
  setTitle(title) {
    // 判断是否显示标题
    if (!isShowTitle()) {
      changeTitle(title)
    }
  }

  /**
   * 设置title
   *
   * @param {*} title
   * @memberof BaseComponent
   */
  setRealTitle(title) {
    document.getElementsByTagName('head')[0].getElementsByTagName('title')[0].innerText = title
  }

  /**
   * 获取标题信息
   *
   * @memberof BaseComponent
   */
  getTitle() {
    return ''
  }

  /**
   * 获取路由参数
   *
   * @param {*} key key值
   * @param {*} [defaultValue=null] 默认值
   * @returns
   * @memberof BasePage
   */
  getParam(key, defaultValue = null) {
    if (!this.props.location) {
      toast('当前页面没有location,请检查')
      return defaultValue
    }

    let value = null

    if (this.props.location.query) {
      value = this.props.location.query[key]
    }

    // // 查找search
    // if (!value) {
    //   value = this.getQueryUrlParam(key)
    // }

    if (value == 'false') {
      value = false
    } else if (value == 'true') {
      value = true
    }

    // 如果为空则设置默认值
    if (value == null || value == undefined) {
      return defaultValue
    }
    return value
  }

  /**
   * 获取url Query参数
   *
   * @param {*} key  参数key
   * @returns
   * @memberof BasePage
   */
  getQueryUrlParam(key) {
    if (!this.props.location) {
      toast('当前页面没有location,请检查')
      return null
    }
    const data = parse(this.props.location.search)
    if (data) {
      return data[key]
    }

    return null
  }

  /**
   * 参数转换Get
   *
   * @param {*} params
   * @returns
   */
  paramsToGet(params) {
    let param = null
    for (let key in params) {
      if (!param) {
        param = key + '=' + params[key]
      } else {
        param = param + '&' + key + '=' + params[key]
      }
    }

    if (param) {
      param = '?' + param
    }

    return param
  }

  /**
   * 获取路由参数
   *
   * @param {*} key key值
   * @param {*} [defaultValue=null] 默认值
   * @returns
   * @memberof BasePage
   */
  getParam(key, defaultValue = null) {
    if (!this.props.location) {
      toast('当前页面没有location,请检查')
      return defaultValue
    }

    let value = null

    if (this.props.location.query) {
      value = this.props.location.query[key]
    }

    // // 查找search
    // if (!value) {
    //   value = this.getQueryUrlParam(key)
    // }

    if (value == 'false') {
      value = false
    } else if (value == 'true') {
      value = true
    }

    // 如果为空则设置默认值
    if (value == null || value == undefined) {
      return defaultValue
    }
    return value
  }

  /**
   * 获取url Query参数
   *
   * @param {*} key  参数key
   * @returns
   * @memberof BasePage
   */
  getQueryUrlParam(key) {
    if (!this.props.location) {
      toast('当前页面没有location,请检查')
      return null
    }
    const data = parse(this.props.location.search)
    if (data) {
      return data[key]
    }

    return null
  }

  /**
   * 参数转换Get
   *
   * @param {*} params
   * @returns
   */
  paramsToGet(params) {
    let param = null
    for (let key in params) {
      if (!param) {
        param = key + '=' + params[key]
      } else {
        param = param + '&' + key + '=' + params[key]
      }
    }

    if (param) {
      param = '?' + param
    }

    return param
  }
}
