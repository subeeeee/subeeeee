<template>
	<div class="context">
		<el-row>
			<el-col :span="24">
				<ParamsBusiness 
		    		@ParamsBusinessFun="ParamsBusinessFun"
		    		@SetCustomData="SetCustomData"
		    		ref="ParamsBusiness">
		    	</ParamsBusiness>
		    </el-col>
			<el-col :span="24" class="querycontext">
				<table1 
					v-on:SetDateGrid="SetDateGrid" 
					:datagridOne="datagridOne" 
					:datagridTwo="datagridTwo" 
					:datagridThree="datagridThree">
				</table1>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import customAjax from "@/components/custom/custom.js"
	import table1 from '@/components/datagrid/table1'
	import ParamsBusiness from '@/components/businesssummary/paramsbusiness1'

	export default {
		name: 'yyzqtjfx',
		components: {
			table1,
			ParamsBusiness
		},
		data() {
			return {
				title: '营业周期统计分析',
				report_num: 'SAAS_BI_2016_27',
				hierarchytype: 1, //级别
				DateGridParams: {},
				week_id:0,//当展开的周期
				TaxRate:false,//是否开启税价分离
				PaymentType:false,//是否选择了付款方式明细
				PaymentZero:false,//是否过滤付款0值
				datagridOne: {
					loading: true,
					rows: [],
					open: true,
					fixed: false,
					selection: true,
					selectionfixed:false,
					columns: [],
					footer: [],
					total: 1,
					PageIndex:1,
					PageSize:20,
				},
				datagridTwo: {
					loading: true,
					rows: [],
					open: true,
					total: 1
				},
				datagridThree: {
					loading: true,
					rows: [],
					open: false,
					total: 1
				},
			}
		},
		created(){
			this.setseniorquery(false);
			this.setexplainText(this.title);
			this.setReport_num(this.report_num);
		},
		computed:{
			...mapGetters('yyzqtjfx',['DateTime','StoreId','query_type']),
		},
		methods: {
			...mapMutations('yyzqtjfx',['setseniorquery','setexplainText','setReport_num']),
			SetCustomData(CustomData){
				let seft = this;
				this.datagridOne.rows = [];
				let columns = customAjax.GetTableHeader(CustomData);
				//获取开关
				let CustomDate = customAjax.getCustomDate();
				this.TaxRate = CustomDate.TaxRate;//是否开启税价分离
				this.PaymentType = CustomDate.PaymentType;//是否选择了付款方式明细
				this.PaymentZero = CustomDate.PaymentZero;//是否过滤付款0值数据
				if(this.PaymentType){					
					//获取付款方式明细
					columns = customAjax.GetPaymentData(columns);
				}
				this.$set(this.datagridOne,'columns',[]);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{					
					seft.$set(seft.datagridOne,'columns',columns);
					seft.datagridOne.open = !seft.datagridOne.open;
					seft.datagridOne.selection = !seft.datagridOne.selection;
					seft.datagridOne.loading = false;
				},100);
			},
			ParamsBusinessFun(value){
				if(value == 'export'){
					this.exportFun();
				}else{
					this.DateGridParams['key'] = 'datagridOne';
					this.hierarchytype = 1;
					this.FindFun();
				}
			},
			SetDateGrid(params){
				this.DateGridParams = params;
				console.log('SetDateGrid',params)
				if(params['type'] == 'export'){
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				let pps = {};
				let weekday = this.getResult.GetWeekList(this.DateTime[0],this.DateTime[1]);
				if(params['hierarchytype'] == 2){
					//保存周期，查询三级时需要使用
					this.week = params['rows']['week_id'];
				}
				if(params['hierarchytype'] != 1){
					pps['week'] = this.week;
					pps['week_dates'] = weekday['week'+this.week+'_dates'].join(',');
					pps['week_dates'] = "'" + pps['week_dates'].replace(/,/gi,"','") + "'";
				}
				
				if(params['hierarchytype'] == 3){
					if(this.query_type == 2){
						pps['store_id'] = params['rows']['store_id'];
					}else{
						pps['report_date'] = params['rows']['report_date'];
					}
				}
				this.hierarchytype = params.hierarchytype;//查询级别
				this.FindFun(pps);
			},
			FindFun(pps = {}) {
				let params = {
					begin_date:this.getResult.getTime(this.DateTime[0]),
					end_date: this.getResult.getTime(this.DateTime[1]),
					store_ids:this.StoreId.join(','),
					selectType:this.query_type,
					hierarchytype:this.hierarchytype,
					exportdataexpr:"''",
					page:this.DateGridParams['PageIndex'],
					rows:this.DateGridParams['PageSize'],
				};
				if(params['hierarchytype'] == 1){
					params['selectExpor'] = '88888888';
				}
				let weekday = this.getResult.GetWeekList(params.begin_date, params.end_date);
				for(let item in weekday) {
					params[item] = "'" + weekday[item].join(',').replace(/,/gi, "','") + "'";
				}
				for (let item in pps) {
					params[item] = pps[item];
				}
				params['sort']= '';
				if(this.hierarchytype == 1){					
					this.exporDataParams = params;
				}
				console.log('params',params);
				this.getBusinessSummaryWeek(params);
			},
			getBusinessSummaryWeek(pps) {
				let seft = this;
				let SummaryStatisticsUrl = 'report/businessSummaryWeekReportRest/getBusinessSummaryWeek';
				seft[seft.DateGridParams['key']]['loading'] = true;
				this.getResult.getResult(SummaryStatisticsUrl, pps, function(result) {
					if(result.success != false){	
						if(seft.PaymentZero && pps['hierarchytype'] == 1){
							let _columns = seft.datagridOne.columns;
							let columns = customAjax.getPaymentZeroData(result.rows,_columns);
							seft.$set(seft.datagridOne,'columns',[]);
							seft.datagridOne.open = !seft.datagridOne.open;
							seft.datagridOne.selection = !seft.datagridOne.selection;
							console.log('columns',columns);
							setTimeout(() => {
								seft.$set(seft.datagridOne,'columns',columns);
								seft.datagridOne.open = !seft.datagridOne.open;
								seft.datagridOne.selection = !seft.datagridOne.selection;
							},100);
						}
						if(pps['hierarchytype'] == 2 && pps['selectType'] == 2){
							result.rows.forEach((itemA, indexA) => {
								//itemA['report_date'] = '';
							});
						}
						seft[seft.DateGridParams['key']]['loading'] = false;
						seft[seft.DateGridParams['key']]['rows'] = result.rows;
						seft[seft.DateGridParams['key']]['footer'] = result.footer;
						seft[seft.DateGridParams['key']]['total'] = result.total;
					}else{
						seft[seft.DateGridParams['key']]['loading'] = false;
					}
				});
			},
			
			exportFun() {
				//导出
				var week_id = [];
				this.exportDateResult.forEach((item, index) => {
					week_id.push(item.week_id == 7 ? 0 : item.week_id == 7);
				});

				let result = customAjax.GetexportHeader(this.datagridOne.columns);
				let exportDateUrl = 'report/CommonMethodAreaRest/exportDateNew';
				let exportDateResult = this.exportDateResult; //导出的数据
				let exporDataParams = this.exporDataParams; //查询的参数
				let keys = "";
				let keys1 = "";
				let sortKey = "";
				let sortKey1 = "";
				let parametertype = "";
				let parametertype1 = "";
				let level = "";
				let level1 = "";
				let order = "";
				let order1 = "";
				if(this.query_type == 1){
					keys = "week_id";
					parametertype = "Int";
					sortKey = "week_id";
					level = "1";
					order = "asc";
					
					keys1 = "report_date";
					parametertype1 = "String";
					sortKey1 = "report_date";
					level1 = "2";
					order1 = "asc";
				}else{
					keys = "week_id";
					parametertype = "Int";
					sortKey = "week_id";
					level = "1";
					order = "asc";
					
					keys1 = "store_id";
					parametertype1 = "Int";
					sortKey1 = "store_id";
					level1 = "2";
					order1 = "asc";
				}
				let params = {
					"exportUrl": exportDateUrl, //请求导出路径
					"exporData": exporDataParams, //当前界面选中的所有查询参数
					"exportName": this.title, //报表名称
					'result': result, //表头
					'fes': exportDateResult, //用户选择的导出的数据行
					"className": "com.tzx.report.bo.imp.boh.BusinessSummaryWeekReportServiceImp",//导出类路径
					"methodName": "getBusinessSummaryWeek", //导出方法名

					"key": keys, //根据某字段查询第一层
					"parametertype": parametertype, //第一次传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey": sortKey, //第一层排序 
					"level": level, //排序第一层等级
					"order": order, //第一层倒序还是升序 

					"key1": keys1, //根据某字段查询第二层 不存在可以不传
					"parametertype1": parametertype1, //第二层传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey1": sortKey1, //第二层排序 不存在可以不传
					"level1":level1, //排序第二层等级
					"order1": order1, //第二层倒序还是升序

					"hierarchy": 3, //当前是否分层 分为几层
					"hierarchytype": 1,
					"derivedtype": 2, //默认传1分页，2不分页
					"groupRow": 1 //导出是否展开层级  1展开 2不展开
				};
				let weekday = this.getResult.GetWeekList(params.begin_date, params.end_date);
				for(let item in weekday) {
					params[item] = "'" + weekday[item].join(',').replace(/,/gi, "','") + "'";
				}
				this.getResult.getexportFun(params, this);
			},

			
		},
	}
</script>

<style>
	.MultiTreeInput .el-input__inner{
      width: 180px !important;
      height: 30px !important;
      border:1px solid #bfcbd9 !important;
      border-radius: 3px;
      color:#97a8be;
	}
	.query_btn{
		float: right;
	}
	.el-button{
		border:1px solid #D8E5EC;
		color:#6C7D8E;
	}
	.grid-content{
		margin-right: 15px;
	}

 .QueryModel .el-icon-caret-top{
    right: 8px !important;
 }
 .QueryModel .el-input__inner{
    padding-left: 24px;
 }
.params.queryitems>.query_condition>.QueryModel .el-input.el-input--small{
	width:100%;
}
.QueryModel .el-input-group__append>.el-select{
	margin: 0px;
}
.QueryModel .el-input-group__append>.el-select .el-input__inner{
	padding-left: 8px;
}
.QueryModel .el-input-group__append>.el-select .el-input__icon{
	right: 0px!important;
}

</style>