import commonStore from './store'
import layout from './modules/layout'

import wpycxx from './modules/SupplyChain/wpycxx'
import wpdabgrz from './modules/SupplyChain/wpdabgrz'
import sskccx from './modules/SupplyChain/sskccx'
import cgddzxjg from './modules/SupplyChain/cgddzxjg'
import cgsphzbb from './modules/SupplyChain/cgsphzbb'

import yyhztjbb from './modules/businesssummary/yyhztjbb'
import yyzqtjfx from './modules/businesssummary/yyzqtjfx'
import yyzwfx from './modules/businesssummary/yyzwfx'
import yytjtbhb from './modules/businesssummary/yytjtbhb'
import yybctjbb from './modules/businesssummary/yybctjbb'
import syyjbhzcx from './modules/businesssummary/syyjbhzcx'
import yytjdbfx from './modules/businesssummary/yytjdbfx'
import yysdtjbb from './modules/businesssummary/yysdtjbb'
import yysdzbfx from './modules/businesssummary/yysdzbfx'
import kjylscx from './modules/businesssummary/kjylscx'

import yytbhbfx from './modules/bus_analysis/bus_tongji_analysis/yytbhbfx'
import cpxstbhb from './modules/bus_analysis/menu_sale/cpxstbhb'

import newsinfo from './modules/newsinfo'

module.exports = {
    layout:layout,
    yyzwfx:yyzwfx,/*营业桌位分析*/
    yytjtbhb:yytjtbhb,/*营业统计同比环比*/
    yybctjbb:yybctjbb,/*营业班次统计报表*/
    syyjbhzcx:syyjbhzcx,/*收银员交班汇总查询*/
    yytjdbfx:yytjdbfx,/*营业统计对比分析*/
    yysdtjbb:yysdtjbb,/*营业时段统计报表*/
    yysdzbfx:yysdzbfx,/*营业时段占比分析*/
    kjylscx:kjylscx,/*卡交易流水查询*/
    yyzqtjfx:yyzqtjfx,/*营业周期统计分析*/
    yyhztjbb:yyhztjbb,/*营业汇总统计报表*/
    sskccx:sskccx,/*实时库存查询*/
    wpycxx:wpycxx,/*物品异常信息*/
    wpdabgrz:wpdabgrz,/*物品档案变更日志*/
    cgsphzbb:cgsphzbb,/*采购商品汇总报表*/
    cgddzxjg:cgddzxjg,/*采购订单执行结果*/
    yytbhbfx:yytbhbfx,/*营业同比环比分析*/
    cpxstbhb:cpxstbhb,/*菜品销售同比环比*/
  	newsinfo:newsinfo,
}