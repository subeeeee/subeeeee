import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import store from './../store/index'

import kks from '@/components/custom/kks'
import rptdictionary from '@/pages/rptdictionary'
import updateLog from '@/components/updateLog'
import newsDetail from '@/components/newsDetail'
import NoLogin from '@/pages/error/NoLogin'
import error404 from '@/pages/error/404'

import llhzb from '@/pages/store/storedealings/llhzb'
import lrflhzb from '@/pages/store/storedealings/lrflhzb'
import pdhzbb from '@/pages/store/storedealings/pdhzbb'
import chhzbb from '@/pages/store/storedealings/chhzbb'
import pshzb from '@/pages/store/storedealings/pshzb'
import jgdbb from '@/pages/store/storedealings/jgdbb'
import wpsfcbb from '@/pages/store/storedealings/wpsfcbb'
import lbjehzb from '@/pages/store/storedealings/lbjehzb'
import dpsfchzbb from '@/pages/store/storedealings/dpsfchzbb'
import gysspmxcx from '@/pages/store/providerdeal/gysspmxcx'
import gyswlcx from '@/pages/store/providerdeal/gyswlcx'
import ghhzbb from '@/pages/store/providerdeal/ghhzbb'
import ddhzbb from '@/pages/store/providerdeal/ddhzbb'
import gysjgqsfx from '@/pages/store/providerdeal/gysjgqsfx'
import gysjscx from '@/pages/store/providerdeal/gysjscx'
import employee_dimission from '@/pages/store/personnel/employee_dimission'
import bzcbhz from '@/pages/store/stock/bzcbhz'
import chcx from '@/pages/store/stock/chcx'
import yclbb from '@/pages/store/stock/yclbb'
import shcybb from '@/pages/store/stock/shcybb'
import gqchcx from '@/pages/store/stock/gqchcx'
import zkwpb from '@/pages/store/stock/zkwpb'
import pdhzb from '@/pages/store/stock/pdhzb'
import bomcxb from '@/pages/store/stock/bomcxb'
import ywlhyfxbb from '@/pages/store/stock/ywlhyfxbb'
import cpcbfx from '@/pages/store/stock/cpcbfx'
import cpcbzcfx from '@/pages/store/stock/cpcbzcfx'
import sccybb from '@/pages/store/stock/sccybb'
import cyzzbb from '@/pages/store/stock/cyzzbb'
import ygxstc from '@/pages/store/cashreport/ygxstc'
import mdxjbg1 from '@/pages/store/cashreport/mdxjbg1'
import nyxhmxbb from '@/pages/store/cashreport/nyxhmxbb'
import cpxsslcx1 from '@/pages/store/menu_search/cpxsslcx1'
import cpxsph1 from '@/pages/store/menu_search/cpxsph1'
import cpxsslcx2 from '@/pages/store/menu_search_fastfood/cpxsslcx2'
import cpxsph2 from '@/pages/store/menu_search_fastfood/cpxsph2'
import yytcmxcx1 from '@/pages/store/business_special/yytcmxcx1'
import yygsmxcx1 from '@/pages/store/business_special/yygsmxcx1'
import hfzdmxcx1 from '@/pages/store/business_special/hfzdmxcx1'
import yygsmxcx2 from '@/pages/store/business_special_fast/yygsmxcx2'
import hfzdmxcx2 from '@/pages/store/business_special_fast/hfzdmxcx2'
import yytcmxcx2 from '@/pages/store/business_special_fast/yytcmxcx2'
import yybctjcx from '@/pages/store/summeal/yybctjcx'
import yysdtjcx from '@/pages/store/summeal/yysdtjcx'
import yyhztjcx from '@/pages/store/summeal/yyhztjcx'
import yysdtjcx_fastfood from '@/pages/store/summeal_fast/yysdtjcx_fastfood'
import yyhztjcx_fastfood from '@/pages/store/summeal_fast/yyhztjcx_fastfood'
import yybctjcx_fastfood from '@/pages/store/summeal_fast/yybctjcx_fastfood'
import zdlscx1 from '@/pages/store/bus_search/zdlscx1'
import syyjbcx from '@/pages/store/bus_search/syyjbcx'
import yybcsscx1 from '@/pages/store/bus_search/yybcsscx1'
import yysdsscx1 from '@/pages/store/bus_search/yysdsscx1'
import hykrtjcx1 from '@/pages/store/bus_search/hykrtjcx1'
import zwkpqkcx1 from '@/pages/store/bus_search/zwkpqkcx1'
import yyhzsscx1 from '@/pages/store/bus_search/yyhzsscx1'
import zwkpqkcx2 from '@/pages/store/bus_search_fastfood/zwkpqkcx2'
import yysdsscx2 from '@/pages/store/bus_search_fastfood/yysdsscx2'
import zdlscx2 from '@/pages/store/bus_search_fastfood/zdlscx2'
import syyjbcx_fast from '@/pages/store/bus_search_fastfood/syyjbcx_fast'
import hykrtjcx2 from '@/pages/store/bus_search_fastfood/hykrtjcx2'
import yyhzsscx2 from '@/pages/store/bus_search_fastfood/yyhzsscx2'
import yybcsscx2 from '@/pages/store/bus_search_fastfood/yybcsscx2'

import mdzftjbb from '@/pages/businessbasic/third_pay/mdzftjbb'

import mdxjrbb from '@/pages/businessbasic/cash/mdxjrbb'
import mdxjbg2 from '@/pages/businessbasic/cash/mdxjbg2'
import xjckbb from '@/pages/businessbasic/cash/xjckbb'
import mdxjhzbb from '@/pages/businessbasic/cash/mdxjhzbb'
import yyfsmxcx3 from '@/pages/businessbasic/discount/yyfsmxcx3'
import yyfshzcx from '@/pages/businessbasic/discount/yyfshzcx'
import yyzkhzcx from '@/pages/businessbasic/discount/yyzkhzcx'
import zkfahzcx from '@/pages/businessbasic/discount/zkfahzcx'
import hfzdhzcx from '@/pages/businessbasic/special_report/hfzdhzcx'
import cjzdzxcx from '@/pages/businessbasic/special_report/cjzdzxcx'
import yyfkfstjb from '@/pages/businessbasic/special_report/yyfkfstjb'
import hfzdmxcx3 from '@/pages/businessbasic/special_report/hfzdmxcx3'
import syyjbhzcx from '@/pages/businessbasic/special_report/syyjbhzcx'
import zdztcx from '@/pages/businessbasic/special_report/zdztcx'
import yymdhzcx from '@/pages/businessbasic/special_report/yymdhzcx'
import mddyqkcx from '@/pages/businessbasic/special_report/mddyqkcx'
import cpztcx from '@/pages/businessbasic/special_report/cpztcx'
import yymdmxcx from '@/pages/businessbasic/special_report/yymdmxcx'
import yytchzcx from '@/pages/businessbasic/special_report/yytchzcx'
import yytcmxcx3 from '@/pages/businessbasic/special_report/yytcmxcx3'
import tcxshzbb from '@/pages/businessbasic/menu_reports/tcxshzbb'
import cpgqbb from '@/pages/businessbasic/menu_reports/cpgqbb'
import cplbxsbb from '@/pages/businessbasic/menu_reports/cplbxsbb'
import cpxshzbb from '@/pages/businessbasic/menu_reports/cpxshzbb'
import cpxsssbb from '@/pages/businessbasic/menu_reports/cpxsssbb'
import cpxsssdbb from '@/pages/businessbasic/menu_reports/cpxsssdbb'
import yyzwfx from '@/pages/businessbasic/area_sale/yyzwfx'
import yycwfx from '@/pages/businessbasic/area_sale/yycwfx'
import yyqyfx from '@/pages/businessbasic/area_sale/yyqyfx'
import ttgzlscx from '@/pages/businessbasic/groupbillings/ttgzlscx'
import ttzwdzbb from '@/pages/businessbasic/groupbillings/ttzwdzbb'
import ttczlscx from '@/pages/businessbasic/groupbillings/ttczlscx'
import ttczhilscx from '@/pages/businessbasic/groupbillings/ttczhilscx'
import yyhztjbb from '@/pages/businessbasic/statics/yyhztjbb'
import yybctjbb from '@/pages/businessbasic/statics/yybctjbb'
import yysdtjbb from '@/pages/businessbasic/statics/yysdtjbb'

import dzyxzhbg from '@/pages/bus_analysis/bus_special/dzyxzhbg'
import zkfazxfx from '@/pages/bus_analysis/bus_special/zkfazxfx'
import yyzkzxfx from '@/pages/bus_analysis/bus_special/yyzkzxfx'
import yyfkzxfx from '@/pages/bus_analysis/bus_special/yyfkzxfx'
import yyzbzhfx from '@/pages/bus_analysis/analysisreport/yyzbzhfx'
import yyydzhfx from '@/pages/bus_analysis/analysisreport/yyydzhfx'
import yytjtbhb from '@/pages/bus_analysis/bus_tongji_analysis/yytjtbhb'
import yyzqtjfx from '@/pages/bus_analysis/bus_tongji_analysis/yyzqtjfx'
import yysdzbfx from '@/pages/bus_analysis/bus_tongji_analysis/yysdzbfx'
import yytjdbfx from '@/pages/bus_analysis/bus_tongji_analysis/yytjdbfx'
import smlxtjfx from '@/pages/bus_analysis/bus_tongji_analysis/smlxtjfx'
import yytbhbfx from '@/pages/bus_analysis/bus_tongji_analysis/yytbhbfx'
import cpxssdfx from '@/pages/bus_analysis/menu_sale/cpxssdfx'
import cpxsbcfx from '@/pages/bus_analysis/menu_sale/cpxsbcfx'
import cpxstbhb from '@/pages/bus_analysis/menu_sale/cpxstbhb'
import cpxszbfx from '@/pages/bus_analysis/menu_sale/cpxszbfx'
import zdnfgfx from '@/pages/bus_analysis/menu_sale/zdnfgfx'
import cpddlfx from '@/pages/bus_analysis/menu_sale/cpddlfx'
import dptczbfx from '@/pages/bus_analysis/menu_sale/dptczbfx'
import cpbctbhb from '@/pages/bus_analysis/menu_sale/cpbctbhb'
import cpxsphfx from '@/pages/bus_analysis/menu_sale/cpxsphfx'

import ptddhzcx from '@/pages/bus_analysis/orderreport/ptddhzcx'
import ptddlscx from '@/pages/bus_analysis/orderreport/ptddlscx'
import ptdddzbb from '@/pages/bus_analysis/orderreport/ptdddzbb'

import jgjejsyb from '@/pages/crmsearch/crmmonth/jgjejsyb'
import jfcdybtj from '@/pages/crmsearch/crmmonth/jfcdybtj'
import jgktcbb from '@/pages/crmsearch/crm_special/jgktcbb'
import xsygktcbb from '@/pages/crmsearch/crm_special/xsygktcbb'
import yhqsmsyls from '@/pages/crmsearch/crm_special/yhqsmsyls'
import yhqfssyhz from '@/pages/crmsearch/crm_special/yhqfssyhz'
import czfkfstjb from '@/pages/crmsearch/crmanalysis/czfkfstjb'
import hykrtjbb from '@/pages/crmsearch/crmanalysis/hykrtjbb'
import kczlshzbb from '@/pages/crmsearch/crmanalysis/kczlshzbb'

import hyjyzhcx from '@/pages/crmsearch/crm_deal_search/hyjyzhcx'
import jgskmxcx from '@/pages/crmsearch/crm_deal_search/jgskmxcx'
import hyczxfbb from '@/pages/crmsearch/crm_deal_search/hyczxfbb'
import kjylscx from '@/pages/crmsearch/crm_deal_search/kjylscx'
import jfjylscx from '@/pages/crmsearch/crm_deal_search/jfjylscx'

import qzlscx from '@/pages/crmsearch/money_water/qzlscx'
import rhslhdbg from '@/pages/crmanalysis/activityreport/rhslhdbg'
import yxhdzhbg from '@/pages/crmanalysis/activityreport/yxhdzhbg'
import hxhyhdbg from '@/pages/crmanalysis/activityreport/hxhyhdbg'
import sryxhdbg from '@/pages/crmanalysis/activityreport/sryxhdbg'
import xfzqhdbg from '@/pages/crmanalysis/activityreport/xfzqhdbg'
import czyxhdbg from '@/pages/crmanalysis/activityreport/czyxhdbg'
import scqyxhdbg from '@/pages/crmanalysis/activityreport/scqyxhdbg'
import gmhjhdbg from '@/pages/crmanalysis/activityreport/gmhjhdbg'
import jecdztfx from '@/pages/crmanalysis/crmtrade/jecdztfx'
import hyjyztfx from '@/pages/crmanalysis/crmtrade/hyjyztfx'
import jecdqjfx from '@/pages/crmanalysis/crmtrade/jecdqjfx'
import hyskqsfx from '@/pages/crmanalysis/crmtrade/hyskqsfx'
import hyxfcsyb from '@/pages/crmanalysis/crmtrade/hyxfcsyb'
import hyczfxbg from '@/pages/crmanalysis/crmtrade/hyczfxbg'
import hyjyfxbg from '@/pages/crmanalysis/crmtrade/hyjyfxbg'
import hyczdjdb from '@/pages/crmanalysis/crmtrade/hyczdjdb'
import hysxxqfx from '@/pages/crmanalysis/crmtotal/hysxxqfx'
import hyzzqsfx from '@/pages/crmanalysis/crmtotal/hyzzqsfx'
import hyxfxgfx from '@/pages/crmanalysis/crmtotal/hyxfxgfx'
import hyxfqsfx from '@/pages/crmanalysis/crmtotal/hyxfqsfx'
import hyzhphfx from '@/pages/crmanalysis/crmtotal/hyzhphfx'
import crm_month_reports from '@/pages/crmanalysis/monthly_reports/crm_month_reports'
import hysxfx from '@/pages/crmanalysis/crmtotal/hysxfx'
import hymxfx from '@/pages/crmanalysis/crmtotal/hymxfx'

import sskccx from '@/pages/scm/scmsearch/sskccx'
import cgddzxjg from '@/pages/scm/scmsearch/cgddzxjg'
import wpycxx from '@/pages/scm/scmsearch/wpycxx'
import wpdabgrz from '@/pages/scm/scmsearch/wpdabgrz'
import cgsphzbb from '@/pages/scm/scmsearch/cgsphzbb'

/*配置中心*/
import switchControl from '@/pages/settings/report_set/switchControl'//开关配置
import operation_index from '@/pages/settings/index_set/operation_index'//运营指标配置
import crm_index from '@/pages/settings/index_set/crm_index'//会员指标配置
import special_financial from '@/pages/settings/other_set/special_financial'//特殊账务配置
import terminal_scan from '@/pages/settings/multi_terminal/terminal_scan'//多终端查看
import terminal_set from '@/pages/settings/multi_terminal/terminal_set'//多终端配置

Vue.use(Router)


export default new Router({
	routes: [{
			path: '/',
			name: '首页',
			component: Index,
			
		},{
			path: '/NoLogin',
			name: '未登录',
			component: NoLogin,
		},{
			path: '/404',
			name: '页面不存在',
			component: error404,
			
		}, {
			path: '/kks',
			name: '自定义',
			component: kks,
			
		}, {
			path: '/rptdictionary',
			name: '自定义维护',
			component: rptdictionary,
			
		},{
			path: '/updateLog',
			name: '更新日志',
			component: updateLog,
			
		},{
			path: '/newsDetail',
			name: '新闻',
			component: newsDetail,
			
		},
		{
			"path": "/store/storedealings/llhzb",
			"name": "领料汇总表",
			"component": llhzb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/picksum.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/lrflhzb",
			"name": "利润分类汇总表",
			"component": lrflhzb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/profitClassification.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/pdhzbb",
			"name": "平调汇总报表",
			"component": pdhzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/querytransfersumreport.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/chhzbb",
			"name": "存货汇总报表",
			"component": chhzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/goodstocksummary.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/pshzb",
			"name": "配送汇总表",
			"component": pshzb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/distributionsummary.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/jgdbb",
			"name": "价格对比表",
			"component": jgdbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/goopricecompare.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/wpsfcbb",
			"name": "物品收发存报表",
			"component": wpsfcbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/goodstockreport.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/lbjehzb",
			"name": "类别金额汇总表",
			"component": lbjehzb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/classstocksumreport.jsp"
			},
			
		},
		{
			"path": "/store/storedealings/dpsfchzbb",
			"name": "单品收发存汇总报表",
			"component": dpsfchzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/goodstocksumreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/gysspmxcx",
			"name": "供应商商品明细查询",
			"component": gysspmxcx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/querysupplierproductdetailreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/gyswlcx",
			"name": "供应商往来查询",
			"component": gyswlcx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/querysuppliercontactsreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/ghhzbb",
			"name": "供货汇总报表",
			"component": ghhzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/supplygoodssumreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/ddhzbb",
			"name": "订单汇总报表",
			"component": ddhzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/queryordersumreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/gysjgqsfx",
			"name": "供应商价格趋势分析",
			"component": gysjgqsfx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/supplypricetrendanalysisreport.jsp"
			},
			
		},
		{
			"path": "/store/providerdeal/gysjscx",
			"name": "供应商结算查询",
			"component": gysjscx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/querysupaccountreport.jsp"
			},
			
		},
		{
			"path": "/store/personnel/employee_dimission",
			"name": "员工离职明细表",
			"component": employee_dimission,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/posoperationstate.jsp"
			},
			
		},
		{
			"path": "/store/stock/bzcbhz",
			"name": "标准成本汇总",
			"component": bzcbhz,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/standardcost.jsp"
			},
			
		},
		{
			"path": "/store/stock/chcx",
			"name": "存货查询",
			"component": chcx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/queryinventoryreport.jsp"
			},
			
		},
		{
			"path": "/store/stock/yclbb",
			"name": "应产率报表",
			"component": yclbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/productionratereport.jsp"
			},
			
		},
		{
			"path": "/store/stock/shcybb",
			"name": "收货差异报表",
			"component": shcybb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/receiptdifferencereport.jsp"
			},
			
		},
		{
			"path": "/store/stock/gqchcx",
			"name": "过期存货查询",
			"component": gqchcx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/materialExpired.jsp"
			},
			
		},
		{
			"path": "/store/stock/zkwpb",
			"name": "在库物品表",
			"component": zkwpb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/stockingoodsumreport.jsp"
			},
			
		},
		{
			"path": "/store/stock/pdhzb",
			"name": "盘点汇总表",
			"component": pdhzb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/inventorysummary.jsp"
			},
			
		},
		{
			"path": "/store/stock/bomcxb",
			"name": "BOM查询表",
			"component": bomcxb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/bomdetailsumreport.jsp"
			},
			
		},
		{
			"path": "/store/stock/ywlhyfxbb",
			"name": "原物料耗用分析报表",
			"component": ywlhyfxbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/originalmaterialcost.jsp"
			},
			
		},
		{
			"path": "/store/stock/cpcbfx",
			"name": "菜品成本分析",
			"component": cpcbfx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/itemcostanalysis.jsp"
			},
			
		},
		{
			"path": "/store/stock/cpcbzcfx",
			"name": "菜品成本BOM组成分析",
			"component": cpcbzcfx,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/itembomanalysis.jsp"
			},
			
		},
		{
			"path": "/store/stock/sccybb",
			"name": "产品差异报表",
			"component": sccybb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/productdifference.jsp"
			},
			
		},
		{
			"path": "/store/stock/cyzzbb",
			"name": "差异追踪报表",
			"component": cyzzbb,
			"props": {
				"NewSrc": "../../../pages/reportcenter/scmreport/storereport/querytrackdifferent.jsp"
			},
			
		},
		{
			"path": "/store/cashreport/ygxstc",
			"name": "员工销售提成报表",
			"component": ygxstc,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/staffcommissioninquiry.jsp"
			},
			
		},
		{
			"path": "/store/cashreport/mdxjbg1",
			"name": "门店现金报告",
			"component": mdxjbg1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/storecashreport.jsp"
			},
			
		},
		{
			"path": "/store/cashreport/nyxhmxbb",
			"name": "能源消耗明细报表",
			"component": nyxhmxbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/energyconsumptionreport.jsp"
			},
			
		},
		{
			"path": "/store/menu_search/cpxsslcx1",
			"name": "菜品销售数量查询",
			"component": cpxsslcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/foodsalesrankingquery.jsp"
			},
			
		},
		{
			"path": "/store/menu_search/cpxsph1",
			"name": "菜品销售排行查询",
			"component": cpxsph1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/salesoffooddishesranking.jsp"
			},
			
		},
		{
			"path": "/store/menu_search_fastfood/cpxsslcx2",
			"name": "菜品销售数量查询",
			"component": cpxsslcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/foodsalesrankingquery.jsp"
			},
			
		},
		{
			"path": "/store/menu_search_fastfood/cpxsph2",
			"name": "菜品销售排行查询",
			"component": cpxsph2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/salesoffooddishesranking.jsp"
			},
			
		},
		{
			"path": "/store/business_special/yytcmxcx1",
			"name": "营业退菜明细查询",
			"component": yytcmxcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessbackdishindetails.jsp"
			},
			
		},
		{
			"path": "/store/business_special/yygsmxcx1",
			"name": "营业奉送明细查询",
			"component": yygsmxcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessindetails.jsp"
			},
			
		},
		{
			"path": "/store/business_special/hfzdmxcx1",
			"name": "恢复账单明细查询",
			"component": hfzdmxcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/restorebillingdetailsquery.jsp"
			},
			
		},
		{
			"path": "/store/business_special_fast/yygsmxcx2",
			"name": "营业奉送明细查询",
			"component": yygsmxcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessindetails.jsp"
			},
			
		},
		{
			"path": "/store/business_special_fast/hfzdmxcx2",
			"name": "恢复账单明细查询",
			"component": hfzdmxcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/restorebillingdetailsquery.jsp"
			},
			
		},
		{
			"path": "/store/business_special_fast/yytcmxcx2",
			"name": "营业退菜明细查询",
			"component": yytcmxcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessbackdishindetails.jsp"
			},
			
		},
		{
			"path": "/store/summeal/yybctjcx",
			"name": "营业班次统计查询",
			"component": yybctjcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryfrequencyofdinner.jsp"
			},
			
		},
		{
			"path": "/store/summeal/yysdtjcx",
			"name": "营业时段统计查询",
			"component": yysdtjcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryperiodofdinner.jsp"
			},
			
		},
		{
			"path": "/store/summeal/yyhztjcx",
			"name": "营业汇总统计查询",
			"component": yyhztjcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummarystatisticsdinner.jsp"
			},
			
		},
		{
			"path": "/store/summeal_fast/yysdtjcx_fastfood",
			"name": "营业时段统计查询",
			"component": yysdtjcx_fastfood,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryperiodoffastfood.jsp"
			},
			
		},
		{
			"path": "/store/summeal_fast/yyhztjcx_fastfood",
			"name": "营业汇总统计查询",
			"component": yyhztjcx_fastfood,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummarystatisticsfastfood.jsp"
			},
			
		},
		{
			"path": "/store/summeal_fast/yybctjcx_fastfood",
			"name": "营业班次统计查询",
			"component": yybctjcx_fastfood,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryfrequencyoffastfood.jsp"
			},
			
		},
		{
			"path": "/store/bus_search/zdlscx1",
			"name": "账单流水查询",
			"component": zdlscx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/billingquery.jsp"
			},
			
		},
		{
			"path": "/store/bus_search/syyjbcx",
			"name": "收银员交班查询",
			"component": syyjbcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/thecashieroverdinnerreport.jsp"
			},
			
		},
		{
			"path": "/store/bus_search/yybcsscx1",
			"name": "营业班次实时查询",
			"component": yybcsscx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesshoursrealtimedinnerfastquery.jsp?p_report_type=v2"
			},
			
		},
		{
			"path": "/store/bus_search/yysdsscx1",
			"name": "营业时段实时查询",
			"component": yysdsscx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/realtimemealsduringbusinesshours.jsp?p_report_type=v2"
			},
			
		},
		{
			"path": "/store/bus_search/hykrtjcx1",
			"name": "会员卡日统计查询",
			"component": hykrtjcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/memberdailybusinessreportnew.jsp"
			},
			
		},
		{
			"path": "/store/bus_search/zwkpqkcx1",
			"name": "账务开票情况查询",
			"component": zwkpqkcx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/billinginquiriesreport.jsp"
			},
			
		},
		{
			"path": "/store/bus_search/yyhzsscx1",
			"name": "营业汇总实时查询",
			"component": yyhzsscx1,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryrealtimedinnerfastquery.jsp?p_report_type=v2"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/zwkpqkcx2",
			"name": "账务开票情况查询",
			"component": zwkpqkcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/billinginquiriesreport.jsp"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/yysdsscx2",
			"name": "营业时段实时查询",
			"component": yysdsscx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/realtimemealsduringbusinesshours.jsp?p_report_type=v2"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/zdlscx2",
			"name": "账单流水查询",
			"component": zdlscx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/billingquery.jsp"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/syyjbcx_fast",
			"name": "收银员交班查询",
			"component": syyjbcx_fast,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/thecashieroverdinnerreportk.jsp"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/hykrtjcx2",
			"name": "会员卡日统计查询",
			"component": hykrtjcx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/memberdailybusinessreportnew.jsp"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/yyhzsscx2",
			"name": "营业汇总实时查询",
			"component": yyhzsscx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesssummaryrealtimedinnerfastquery.jsp?p_report_type=v2"
			},
			
		},
		{
			"path": "/store/bus_search_fastfood/yybcsscx2",
			"name": "营业班次实时查询",
			"component": yybcsscx2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/businesshoursrealtimedinnerfastquery.jsp?p_report_type=v2"
			},
			
		},

		{
			"path": "/businessbasic/cash/mdxjrbb",
			"name": "门店现金日报表",
			"component": mdxjrbb,
			"props": {
				"NewSrc": "../../../reportpages/privateproject/fuhua/storecashdaysummary.jsp"
			},
			
		},
		{
			"path": "/businessbasic/cash/mdxjbg2",
			"name": "门店现金报告",
			"component": mdxjbg2,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/storecashreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/cash/xjckbb",
			"name": "现金存款报表",
			"component": xjckbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/cashdepositstatement.jsp"
			},
			
		},
		{
			"path": "/businessbasic/cash/mdxjhzbb",
			"name": "门店现金汇总报表",
			"component": mdxjhzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/cashsummaryreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/discount/yyfsmxcx3",
			"name": "营业奉送明细查询",
			"component": yyfsmxcx3,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessindetails.jsp"
			},
			
		},
		{
			"path": "/businessbasic/discount/yyfshzcx",
			"name": "营业奉送汇总查询",
			"component": yyfshzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessinformation.jsp"
			},
			
		},
		{
			"path": "/businessbasic/discount/yyzkhzcx",
			"name": "营业折扣汇总查询",
			"component": yyzkhzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessdiscount.jsp"
			},
			
		},
		{
			"path": "/businessbasic/discount/zkfahzcx",
			"name": "折扣方案汇总查询",
			"component": zkfahzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/discountprogramme.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/hfzdhzcx",
			"name": "恢复账单汇总查询",
			"component": hfzdhzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/restorebillsummaryreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/cjzdzxcx",
			"name": "冲减账单专项查询",
			"component": cjzdzxcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/writedownbillspecialreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/yyfkfstjb",
			"name": "营业付款方式统计表",
			"component": yyfkfstjb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/dobusinesspayment.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/hfzdmxcx3",
			"name": "恢复账单明细查询",
			"component": hfzdmxcx3,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/restorebillingdetailsquery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/syyjbhzcx",
			"name": "收银员交班汇总查询",
			"component": syyjbhzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/cashiershiftverticalreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/zdztcx",
			"name": "账单转台查询",
			"component": zdztcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/billingturntablequery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/yymdhzcx",
			"name": "营业免单汇总查询",
			"component": yymdhzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/Indexallocation/toconfigure/businesssummaryfreeinquiry.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/mddyqkcx",
			"name": "门店打烊情况查询",
			"component": mddyqkcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/shopclosinginquiry.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/cpztcx",
			"name": "菜品转台查询",
			"component": cpztcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/foodchangetablequery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/yymdmxcx",
			"name": "营业免单明细查询",
			"component": yymdmxcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/Indexallocation/toconfigure/businessorderdetailsinquiries.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/yytchzcx",
			"name": "营业退菜汇总查询",
			"component": yytchzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessbackdish.jsp"
			},
			
		},
		{
			"path": "/businessbasic/special_report/yytcmxcx3",
			"name": "营业退菜明细查询",
			"component": yytcmxcx3,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/operationsummaryreport/businessbackdishindetails.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/tcxshzbb",
			"name": "套餐销售汇总报表",
			"component": tcxshzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/packagesalessummaryreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/cpgqbb",
			"name": "菜品沽清报表",
			"component": cpgqbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/foodevaluationreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/cplbxsbb",
			"name": "菜品类别销售报表",
			"component": cplbxsbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/categorysalesreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/cpxshzbb",
			"name": "菜品销售汇总报表",
			"component": cpxshzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/foodsalessummaryreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/cpxsssbb",
			"name": "菜品销售实时报表",
			"component": cpxsssbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/realtimedishessalessummaryreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/menu_reports/cpxsssdbb",
			"name": "菜品销售时段报表",
			"component": cpxsssdbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/foodsalesreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/area_sale/yyzwfx",
			"name": "营业桌位分析",
			"component": yyzwfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businesstableanalysis.jsp"
			},
			
		},
		{
			"path": "/businessbasic/area_sale/yycwfx",
			"name": "营业餐位分析",
			"component": yycwfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businessfoodseatanalysis.jsp"
			},
			
		},
		{
			"path": "/businessbasic/area_sale/yyqyfx",
			"name": "营业区域分析",
			"component": yyqyfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businessareaanalysis.jsp"
			},
			
		},
		{
			"path": "/businessbasic/groupbillings/ttgzlscx",
			"name": "团体挂账流水查询",
			"component": ttgzlscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/waterlossesquery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/groupbillings/ttzwdzbb",
			"name": "团体账务对账报表",
			"component": ttzwdzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/groupaccountreconciliationreport.jsp"
			},
			
		},{
			"path": "/businessbasic/third_pay/mdzftjbb",
			"name": "美大支付统计报表",
			"component": mdzftjbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/paymentreport/payment/meidapaymentstatistics.jsp"
			},
			
		},
		{
			"path": "/businessbasic/groupbillings/ttczhilscx",
			"name": "团体充值流水查询",
			"component": ttczhilscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/watergrouprechargequery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/groupbillings/ttczlscx",
			"name": "团体冲账流水查询",
			"component": ttczlscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/watergroupwritingquery.jsp"
			},
			
		},
		{
			"path": "/businessbasic/statics/yyhztjbb",
			"name": "营业汇总统计报表",
			"component": yyhztjbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/dist/index.html"
			},
			
		},
		{
			"path": "/businessbasic/statics/yybctjbb",
			"name": "营业班次统计报表",
			"component": yybctjbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businesssummaryclassreport.jsp"
			},
			
		},
		{
			"path": "/businessbasic/statics/yysdtjbb",
			"name": "营业时段统计报表",
			"component": yysdtjbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businesssummarytimereport.jsp"
			},
			
		},

		{
			"path": "/bus_analysis/bus_special/dzyxzhbg",
			"name": "大众营销综合报告",
			"component": dzyxzhbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/businessquiryreport/basicsettings/reportmassmarketing.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_special/zkfazxfx",
			"name": "折扣方案专项分析",
			"component": zkfazxfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/discountscheme.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_special/yyzkzxfx",
			"name": "营业折扣专项分析",
			"component": yyzkzxfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/specialdiscount.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_special/yyfkzxfx",
			"name": "营业付款专项分析",
			"component": yyfkzxfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/specialbusinesspayment.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/analysisreport/yyzbzhfx",
			"name": "营业指标综合分析",
			"component": yyzbzhfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/businessindicators.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/analysisreport/yyydzhfx",
			"name": "营业月度综合分析",
			"component": yyydzhfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/monthlybusinessanalysis.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/yytjtbhb",
			"name": "营业统计同比环比",
			"component": yytjtbhb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businesssummaryyearmomreport.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/yyzqtjfx",
			"name": "营业周期统计分析",
			"component": yyzqtjfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/dist/index.html#/businesssummaryweekreport"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/yysdzbfx",
			"name": "营业时段占比分析",
			"component": yysdzbfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/dobusinesssummarystatisticstimelnterval.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/yytjdbfx",
			"name": "营业统计对比分析",
			"component": yytjdbfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/comparativeanalysisofbusinesssummary.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/smlxtjfx",
			"name": "售卖类型统计分析",
			"component": smlxtjfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/businesssalestypesreport.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/bus_tongji_analysis/yytbhbfx",
			"name": "营业同比环比分析",
			"component": yytbhbfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/lixiansheng/dist/index.html#/businessyearonyear"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpxssdfx",
			"name": "菜品销售时段分析",
			"component": cpxssdfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/analysisofsalestimeofdishes.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpxsbcfx",
			"name": "菜品销售班次分析",
			"component": cpxsbcfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/analysisofsalesofshiftsvegetables.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpxstbhb",
			"name": "菜品销售同比环比",
			"component": cpxstbhb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/lixiansheng/dist/index.html"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpxszbfx",
			"name": "菜品销售占比分析",
			"component": cpxszbfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/analysisofsalesstructureoffood.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/zdnfgfx",
			"name": "账单内复购分析",
			"component": zdnfgfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/mealbillpurchaseanalysisreport.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpddlfx",
			"name": "菜品点单率分析",
			"component": cpddlfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/singlerate.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/dptczbfx",
			"name": "单品套餐占比分析",
			"component": dptczbfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/analysisofsalesofvegetables.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpbctbhb",
			"name": "菜品班次同比环比",
			"component": cpbctbhb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operatingreport/basicsettings/analysisoftimeupthechainofdishesquery.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/menu_sale/cpxsphfx",
			"name": "菜品销售排行分析",
			"component": cpxsphfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/foodsalesranking.jsp"
			},
			
		},
		{
			"path": "/bus_analysis/orderreport/ptddhzcx",
			"name": "平台订单汇总查询",
			"component": ptddhzcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/takeawayordersummaryquery.jsp"
			},
			
		},{
			"path": "/bus_analysis/orderreport/ptddlscx",
			"name": "平台订单流水查询",
			"component": ptddlscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/orderflowquery.jsp"
			},
			
		},{
			"path": "/bus_analysis/orderreport/ptdddzbb",
			"name": "平台订单对账报表",
			"component": ptdddzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/takeoutordersqueryreconciliation.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crmmonth/jgjejsyb",
			"name": "机构金额结算月报",
			"component": jgjejsyb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/amountofmonthlysettlementmechanism.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crmmonth/jfcdybtj",
			"name": "积分沉淀月报统计",
			"component": jfcdybtj,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/integralmonthlyprecipitation.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_special/jgktcbb",
			"name": "机构卡提成报表",
			"component": jgktcbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/commissionreport.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_special/xsygktcbb",
			"name": "销售员工卡提成报表",
			"component": xsygktcbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/salesstaffcardreport.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_special/yhqsmsyls",
			"name": "优惠券售卖使用流水",
			"component": yhqsmsyls,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/couponssalesummaryquery.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_special/yhqfssyhz",
			"name": "优惠券发售使用汇总",
			"component": yhqfssyhz,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/couponusingsummaryquery.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crmanalysis/czfkfstjb",
			"name": "充值付款方式统计表",
			"component": czfkfstjb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/operationreport/basicsettings/rechargepaymentmethodreport.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crmanalysis/hykrtjbb",
			"name": "会员卡日统计报表",
			"component": hykrtjbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/memberdaybusinessstatistics.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crmanalysis/kczlshzbb",
			"name": "卡充值流水汇总报表",
			"component": kczlshzbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/cardrechargewaterreport.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_deal_search/hyjyzhcx",
			"name": "会员交易综合查询",
			"component": hyjyzhcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/membercomprehensivetransactionquery.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_deal_search/jgskmxcx",
			"name": "机构售卡明细查询",
			"component": jgskmxcx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/agencysalecarddetailsummaryreport.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_deal_search/hyczxfbb",
			"name": "会员充值消费报表",
			"component": hyczxfbb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberrechargeconsumption.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_deal_search/kjylscx",
			"name": "卡交易流水查询",
			"component": kjylscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/cardtransactionflowquery.jsp"
			},
			
		},
		{
			"path": "/crmsearch/crm_deal_search/jfjylscx",
			"name": "积分交易流水查询",
			"component": jfjylscx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/integraltransactionqueryreport.jsp"
			},
			
		},{
			"path": "/crmsearch/money_water/qzlscx",
			"name": "签账流水查询",
			"component": qzlscx,
			"props": {
				"NewSrc": "../../../crmpages/pages/crmmanagement/membermanagement/basicsettings/debitcardflow.jsp"
			},
			
		},

		{
			"path": "/crmanalysis/activityreport/rhslhdbg",
			"name": "入会送礼活动报告",
			"component": rhslhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/membershipgiftactivityreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/yxhdzhbg",
			"name": "营销活动综合报告",
			"component": yxhdzhbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/marketactivitiesreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/hxhyhdbg",
			"name": "唤醒会员活动报告",
			"component": hxhyhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/wakeupthememberactivityreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/sryxhdbg",
			"name": "生日营销活动报告",
			"component": sryxhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/birthdaymarketingcampaignreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/xfzqhdbg",
			"name": "消费赠券活动报告",
			"component": xfzqhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/theconsumptioncouponactivityreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/czyxhdbg",
			"name": "充值营销活动报告",
			"component": czyxhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/prepaidmarketingactivityreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/scqyxhdbg",
			"name": "商城券营销活动报告",
			"component": scqyxhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/mallvolumemarketingactivitiesreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/activityreport/gmhjhdbg",
			"name": "购买会籍活动报告",
			"component": gmhjhdbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/buymembershipreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/jecdztfx",
			"name": "金额沉淀整体分析",
			"component": jecdztfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/scmreport/storereport/amountprecipitationoverallanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyjyztfx",
			"name": "会员交易整体分析",
			"component": hyjyztfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberoverallbusiness.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/jecdqjfx",
			"name": "金额沉淀区间分析",
			"component": jecdqjfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/amountofmonthlyprecipitation.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyskqsfx",
			"name": "会员售卡趋势分析",
			"component": hyskqsfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/membershipcardtrendanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyxfcsyb",
			"name": "会员消费次数月报",
			"component": hyxfcsyb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberconsumptionnumbermonth.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyczfxbg",
			"name": "会员操作分析报告",
			"component": hyczfxbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberoperationanalysisreport.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyjyfxbg",
			"name": "会员交易分析报告",
			"component": hyjyfxbg,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberconsumption.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtrade/hyczdjdb",
			"name": "会员操作店间对比",
			"component": hyczdjdb,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberoperatingroomcontrast.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hysxxqfx",
			"name": "会员属性详情分析",
			"component": hysxxqfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberexclusivespecialanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hyzzqsfx",
			"name": "会员增长趋势分析",
			"component": hyzzqsfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/membergrowthtrendanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hyxfxgfx",
			"name": "会员消费习惯分析",
			"component": hyxfxgfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/consumptionhabitanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hyxfqsfx",
			"name": "会员消费趋势分析",
			"component": hyxfqsfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/consumptiontrendanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hyzhphfx",
			"name": "会员综合排行分析",
			"component": hyzhphfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberrankinganalysis.jsp"
			},
			
		},{
			"path": "/crmanalysis/monthly_reports/crm_month_reports",
			"name": "会员运营月报",
			"component": crm_month_reports,
		},
		{
			"path": "/crmanalysis/crmtotal/hysxfx",
			"name": "会员属性分析",
			"component": hysxfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/memberpropertyanalysis.jsp"
			},
			
		},
		{
			"path": "/crmanalysis/crmtotal/hymxfx",
			"name": "会员模型分析",
			"component": hymxfx,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/crmreport/basicsettings/membermodelanalysis.jsp"
			},
			
		},

		{
			"path": "/scm/scmsearch/sskccx",
			"name": "实时库存查询",
			"component": sskccx,
			"props": {
				"NewSrc": null
			},
			
		},
		{
			"path": "/scm/scmsearch/cgddzxjg",
			"name": "采购订单执行结果",
			"component": cgddzxjg,
			"props": {
				"NewSrc": null
			},
			
		},
		{
			"path": "/scm/scmsearch/wpycxx",
			"name": "物品异常信息",
			"component": wpycxx,
			"props": {
				"NewSrc": null
			},
			
		},
		{
			"path": "/scm/scmsearch/wpdabgrz",
			"name": "物品档案变更日志",
			"component": wpdabgrz,
			"props": {
				"NewSrc": null
			},
			
		},
		{
			"path": "/scm/scmsearch/cgsphzbb",
			"name": "采购商品汇总报表",
			"component": cgsphzbb,
			"props": {
				"NewSrc": null
			},
			
		},
		{
			"path": "/settings/report_set/switchControl",
			"name": "开关配置",
			"component": switchControl,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/Indexallocation/toconfigure/switchbutton.jsp"
			},
			
		},{
			"path": "/settings/index_set/operation_index",
			"name": "运营指标配置",
			"component": operation_index,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/Indexallocation/toconfigure/indexallocation.jsp"
			},
			
		},{
			"path": "/settings/index_set/crm_index",
			"name": "会员指标配置",
			"component": crm_index,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/Indexallocation/toconfigure/memberindexallocation.jsp"
			},
			
		},{
			"path": "/settings/other_set/special_financial",
			"name": "特殊账务配置",
			"component": special_financial,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/specialfiltering.jsp"
			},
			
		},{
			"path": "/settings/multi_terminal/terminal_scan",
			"name": "多终端查看",
			"component": terminal_scan,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/screenconfig/portal.jsp"
			},
			
		},{
			"path": "/settings/multi_terminal/terminal_set",
			"name": "多终端配置",
			"component": terminal_set,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/screenconfig/index.jsp"
			},
			
		},{
			"path": "/pos/pos_report",
			"name": "POS报表中心",
			"component": terminal_set,
			"props": {
				"NewSrc": "../../../reportpages/reportcenter/posreport/storereport/categorysalesinquiries.jsp"
			},
			
		},
		{ path: '*', redirect: '/404'}
	]
});