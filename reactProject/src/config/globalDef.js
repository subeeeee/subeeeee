/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-11-09 17:26:08
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2019-05-31 14:47:54
 * @Note 全局定义
 */

import { toast } from '../components/common/toast'
import { routePush, routeGoBack, routeGo } from '../common/route/routeAction'

global.routePush = routePush
global.routeGoBack = routeGoBack
global.routeGo = routeGo
global.toast = toast

// 测评是否去确认代办事项
global.testConfirm = false
// 是否是安卓回退
global.isAndroidBack = false
