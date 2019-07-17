/*
 * @Author: Jone.Lin
 * @Date: 2018-05-31 10:21:09
 * @Last Modified by: Jone.Lin
 * @Last Modified time: 2018-08-17 17:48:30
 * @Note  定义全局参数变量
 */

export default class DefineVal {
  //分红再投资
  static DividendTypeInvest = 0
  //现金分红
  static DividendTypeMoney = 1

  //分红方式不可修改
  static DividentStateFixNo = 0
  //分红方式暂不可修改
  static DividentStatePauseNo = -1
  //分红方式可修改
  static DividendStateFixYes = 1
  //分红方式修改中
  static DividendStateFixing = 2
}
