let config = {
	authenticationUrl:'/report/CommonMethodAreaRest/userloginauthentication',//用户登录验证
	BrandUrl:'/report/CommonMethodAreaRest/getMultiBrandOrganization',//多品牌机构树
	UserInfoUrl:'/report/CommonMethodAreaRest/getLoginUserInformation',//获取登入用户人员信息
	rolemoduleinfoUrl:'/report/CommonMethodAreaRest/getloginuserrolemoduleinformation',//用户模块接口
	showBtnUrl:'report/ShowButtonRest/showBtn',
	MenuUrl:'/report/UserReportRest/menu',
	StoreUrl:'/framework/organContraller/getOrgansTreeByConditions',
	MultiStoreUrl:'report/CommonMethodAreaRest/getOrgansTreeByConditionsV2',
	shiftIdUrl:'report/CommonMethodAreaRest/getloadDutyOrderNew',//营业班次
	BusinessAreaUrl:'report/BusinessTaleAnalysisRest/getBusinessArea',//营业区域
	BusinessTableUrl:'report/BusinessTaleAnalysisRest/getBusinessSeat',//营业桌位
	BusinessmealUrl:'report/BusinessTaleAnalysisRest/getMealPositionType',//营业餐位
	channelUrl:'hq/SysDictionaryController/find',//交易渠道
	OperationTypeUrl:'report/cardTransactionFlowQuery/getOperatType',//操作类型
	MembergradeUrl:'report/cardTransactionFlowQuery/getCrmLevel',//会员等级
	CashierUrl:'report/billRunningQuerykReport/loadCashierNum',//收银员信息
	TimeIntervalUrl:'report/CommonMethodAreaRest/getBusinessSummaryPeriod',//时段
	CategorySelectUrl:'report/CommonMethodAreaRest/getCategorySelect',//类别选择
	CategoryTreeUrl:'report/CommonMethodAreaRest/loadCategoryTree',//菜品类别1
	customizeUrl:'hq/DishArchivesManagementController/customize',//菜品类别2
	DishesNameTreeUrl:'report/CommonMethodAreaRest/getDishesNameTree',//菜品名称
	ChanelTypeUrl:'report/CommonParameterObtainRest/getChanelType', //销售渠道
	PriceSystemUrl:'report/CommonMethodAreaRest/getPriceSystemUrl',//价格体系
	//供应链报表参数接口
	SCMOrganTreeUrl:'report/CommonMethodAreaRest/getSCMOrganTree',//机构树
	SCMWarehouseUrl:'report/CommonMethodAreaRest/getSCMWarehouse',//仓库
	SCMCategoryUrl:'report/CommonMethodAreaRest/getSCMCategory',//物品类别
	//SCMBillsCategoryUrl:'report/CommonMethodAreaRest/getSCMBillsCategory',//单据类型
	SCMSupplyUrl:'report/CommonMethodAreaRest/getSCMSupply',//供应商
	
	//新闻数据接口
	GetNewsDataUrl:'/report/UserReportRest/news',//新闻数据
	GetNewsInfoDataUrl:'/report/UserReportRest/newsDetails',//新闻详情数据
	GetHotspotNewsUrl:'/report/UserReportRest/hotNews',//热点新闻接口
	
	//自定义/导出按钮权限接口
	GetBtnPermissionUrl:'/framework/systemModulesContraller/setFourLevelId',//按钮权限接口
    //营业汇总统计报表
    yyhztjbb: {
        //获取列表的URL
        UrlOne: 'report/businessSummaryStatisticsReportRest/getBusinessSummaryStatistics',
        UrlTwo:'report/businessSummaryStatisticsReportRest/getBusinessSummaryStatistics',
        UrlThree:'report/businessSummaryStatisticsReportRest/getBusinessSummaryStatistics',
    },
}

export default config = config;