/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2019-05-13 11:46:40
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-13 14:09:01
 * @Note 动作面板
 */

import React, { Component } from 'react'
import { ActionSheet } from 'antd-mobile'
import './wxActionSheet.scss'
/**
 * 带取消的动作面板
 *
 * @param {*} title
 * @param {*} options
 * @param {*} callBack
 */
export const ActionSheetCannel = (title, options, callBack) => {
  if (Array.isArray(options)) {
    let newOptions = []
    newOptions = newOptions.concat(options)
    newOptions.push('取消')
    ActionSheet.showActionSheetWithOptions(
      {
        options: newOptions,
        title: title,
        cancelButtonIndex: newOptions.length - 1,
        maskClosable: false
      },
      index => {
        if (index != newOptions.length - 1 && callBack) {
          callBack(index, newOptions[index])
        }
      }
    )
  }
}

/**
 * 关闭
 *
 */
export const ActionSheetClose = () => {
  ActionSheet.close()
}
