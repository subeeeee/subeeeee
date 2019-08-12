<template>
	<div class="">
		<el-row>
		    <el-col :span="24" :offset="0">
		    	<ParamsBusiness 
		    		@ParamsBusinessFun="ParamsBusinessFun"
		    		@SetCustomData="SetCustomData"
					ref="ParamsBusiness">
		    	</ParamsBusiness>
		    </el-col>
		    <el-col :span="24" :offset="0" class="querycontext">
	    		<datagrid 
	    			@SetDateGrid="SetDateGrid"
		    		:datagridOne="datagridOne"
		    		:datagridTwo="datagridTwo"
		    		:datagridThree="datagridThree"
		    		ref="datagrid">
		    	</datagrid>
		    </el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import customAjax from "@/components/custom/custom.js"
	import ParamsBusiness from '@/components/businesssummary/paramsbusiness1'
	import datagrid from '@/components/datagrid/table1'
	
	export default {
		name:'yysdtjbb',
		components:{
			ParamsBusiness,
			datagrid
		},
		data() {
			return {
				title:'营业时段统计分析',
				report_num: 'SAAS_BI_2016_37',
				hierarchytype: 1,//级别
				DateGridParams:{
					'key':'datagridOne',
					PageIndex:1,
					PageSize:20,
				},
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
					open:true,
					total: 1
				},
				datagridThree: {
					loading: true,
					rows: [],
					open: false,
					total: 1
				},
			};
		},
		computed:{
			...mapGetters('yysdtjbb',['DateTime','StoreId','time_interval','query_type']),
		},
		created() {
			this.setexplainText(this.title);
			this.setReport_num(this.report_num);
		},
		methods: {
			...mapMutations('yysdtjbb',['setexplainText','setReport_num']),
			SetCustomData(CustomData){
				let columns = customAjax.GetTableHeader(CustomData);
				//获取开关
				let CustomDate = customAjax.getCustomDate();
				this.TaxRate = CustomDate.TaxRate;  //是否开启税价分离
				this.PaymentType = CustomDate.PaymentType;//是否选择了付款方式明细
				if(this.PaymentType){					
					//获取付款方式明细
					columns = customAjax.GetPaymentData(columns);
				}
				this.$set(this.datagridOne,'columns',[]);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
					this.datagridOne.loading = false;
				},100);
			},
			SetDateGrid(params){
				console.log('SetDateGrid',params);
				this.DateGridParams = params;
				this.hierarchytype = params['hierarchytype'];
				if(params['type'] == 'export'){
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				if(params['key'] == 'datagridOne'){
					this.FindFun();
				}else if(params['key'] == 'datagridTwo'){
					//查询二级
					let pps ={
						time_area:"'"+(this.query_type == 1?params['rows']['interval']:params['rows']['time_area'])+"'",
						time_area_id:params['rows']['id'],
					};
					this.ppsTwo = pps;
					this.FindFun(pps);
				}else if(params['key'] == 'datagridThree'){
					if(this.query_type == 2){
						this.ppsTwo['store_ids1'] = params['rows']['store_id'];;
					}else{
						this.ppsTwo['report_date'] = params['rows']['report_date'];
					}
					this.FindFun(this.ppsTwo);
				}
			},
			//查询事件
			ParamsBusinessFun(value){
				console.log('高级查询参数',value);
				if(value == 'export'){
					this.exportFun();
				}else if(value == 'custom'){

				}else{
					this.DateGridParams= {
						key:'datagridOne',
						PageIndex:1,
						PageSize:20,
					};
					this.hierarchytype =1;
					this.datagridOne.loading = true;
					this.FindFun();
				}
			},
			//导出方法 
			exportFun() {
				let result = customAjax.GetexportHeader(this.datagridOne.columns);
				let param = {};
				let exportDateResult = this.exportDateResult;//导出的数据
				let exporDataParams = this.exporDataParams;//查询的参数
				let exportDateUrl = 'report/CommonMethodAreaRest/exportDateNew';
				
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
				let _time_area = [];
				if(this.query_type == 1){
					keys = "time_area";
					parametertype = "String";
					sortKey = "time_area";
					level = "1";
					order = "asc";
					
					keys1 = "report_date";
					parametertype1 = "String";
					sortKey1 = "report_date";
					level1 = "2";
					order1 = "asc";
				}else{
					
					exportDateResult.forEach((itemA, indexA) => {
						_time_area.push("'" + itemA['time_area'] + "'");
					});
					_time_area = _time_area.join(',');
					keys = "time_area";
					parametertype = "String";
					sortKey = "time_area";
					level = "1";
					order = "asc"; 
					keys1 = "store_id";
					parametertype1 = "Int";
					sortKey1 = "store_id";
					level1 = "2";
					order1 = "asc";
				}
				
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.bo.imp.boh.BusinessSummaryTimeReportServiceImp",//导出类路径
					"methodName":"getBusinessSummaryTime",//导出方法名
					
					"key": keys, //根据某字段查询第一层
					"parametertype": parametertype, //第一次传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey": sortKey, //第一层排序 
					"level": level, //排序第一层等级
					"order": order, //第一层倒序还是升序 
					"time_area":_time_area,
					"key1": keys1, //根据某字段查询第二层 不存在可以不传
					"parametertype1": parametertype1, //第二层传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey1": sortKey1, //第二层排序 不存在可以不传
					"level1":level1, //排序第二层等级
					"order1": order1, //第二层倒序还是升序

					"hierarchy": 3, //当前是否分层 分为几层
					"hierarchytype": 1,
					"derivedtype": 2, //默认传1分页，2不分页
					"groupRow": 1 //导出是 否展开层级  1展开 2不展开
			   }
				this.getResult.getexportFun(param,this);
			},
			FindFun(pps ={}){
				let _this = this; 
				this[this.DateGridParams['key']]['loading'] = true;
				let type_columns1 = parseInt(this.query_type);
				let params = {
					begin_date: this.getResult.getTime(this.DateTime[0]),
					end_date: this.getResult.getTime(this.DateTime[1]),
					store_ids: this.StoreId.join(','),//门店
					time_interval:this.time_interval,//时段
					selectType: this.query_type,
					hierarchytype: this.hierarchytype,
					exportdataexpr:"''",
					page: _this.DateGridParams.PageIndex,
					rows: _this.DateGridParams.PageSize
				};
				for(let itemA in pps){
					params[itemA] = pps[itemA];
				}
				if(params.hierarchytype == 1) {
					params['selectDataReportDate'] = 888888;
					if(params.selectType == 1) {
						params['sort'] = 'id';
					} else if(params.selectType == '2') {
						params['sort'] = 'id';
					}
				}
				this.exporDataParams = params;
				console.log(params);
				this.BusinessSummaryStatistics(params);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				let SummaryStatisticsUrl = '/report/businessSummaryTimeReportRest/getBusinessSummaryTime';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					if(p['hierarchytype'] == 2 && p['type'] == 1){
						result.rows.forEach((v, k) => {
							v['report_date'] = '';
						});
					}
					_this[_this.DateGridParams['key']]['loading'] = false;
					_this[_this.DateGridParams['key']]['rows'] = result.rows; 
					_this[_this.DateGridParams['key']]['footer'] = result.footer;
					_this[_this.DateGridParams['key']]['total'] = result.total;
				});
			},
		},

	}
</script>

<style>

</style>