/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-21 11:48:07
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-06-11 16:38:23
 * @Note 初始化脚本
 * @flow
 */

const file = require('fs-extra')
const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

// 项目修改过后的文件文职
const node_project = resolveApp('project/node_modules_ex')
// 资源路径
const node_dir = resolveApp('node_modules')

/**
 * 拷贝资源文件夹
 *
 */
function copyAssetFolder() {
  file.copySync(node_project, node_dir, {
    dereference: true
    // filter: file => file !== paths.appHtml
  })
  console.log('copy init success ')
}

copyAssetFolder()
