/*
 * Copyright (c) 2018-present, 网信智投, Inc.
 *
 * @Author: Jone.Lin
 * @Date: 2018-08-16 18:02:03
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-08-23 16:39:08
 * @Note 数据Bean
 */

/**
 * 创建基金业绩数据
 *
 * @export
 * @param {*} data
 */
export function createFundAchievementInfo(data) {
  let objs = []
  let obj = {}
  for (let index = 0; index < 9; index++) {
    obj = {}
    obj.title = '近' + index + '周' //时间区
    obj.ratio = '3' + index + '%' //涨跌幅
    obj.ranking = index + '/2000' //排行
    objs.push(obj)
  }

  return objs
}

/**
 *  创建策略分析组合信息
 *
 * @export
 */
export function createFundStrategyGroupInfo() {
  let objs = []
  let obj = {}
  for (let index = 0; index < 4; index++) {
    obj = {}
    obj.income = 3.44 //收益率
    obj.name = '货币三佳' //组合名称
    obj.groupId = '123123' //组合id
    obj.incomeDes = '成立以来累计收益' //组合描述
    obj.assetType = '货基' //组合类型
    obj.tabs = ['T+1赎回', '货基组合', '网信标杆'] //组合标签
    objs.push(obj)
  }
  return objs
}
