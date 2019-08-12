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
		name:'yybctjbb',
		components:{
			ParamsBusiness,
			datagrid
		},
		computed:{
			...mapGetters('yybctjbb',['DateTime','StoreId','shiftId','query_type']),
		},
		data() {
			return {
				title:'营业班次统计报表',
				report_num:'SAAS_BI_2016_38',//报表编码
				hierarchytype: 1,//级别
				DateGridParams:{
					'key':'datagridOne',
					PageIndex:1,
					PageSize:20,
				},
				paramsObj:{
					QueryDatatime:true,
					MultiTree:true,
					QueryType:true,
					DutyOrders:[],//拉取的班次信息
			    },
				dialogVisible:false,
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
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.GetshiftId();
		},
		methods: {
			...mapMutations('yybctjbb',['setexplainText','setReport_num']),
			...mapActions('yybctjbb',['GetshiftId']),
			SetCustomData(CustomData){
				this.$set(this.datagridOne,'rows',[]);
				this.$set(this.datagridOne,'columns',[]);
				let columns = customAjax.GetTableHeader(CustomData);
				let arrayA = customAjax.GetPaymentData(columns);
				console.log('arrayA',arrayA);
				this.$set(this.datagridOne,'columns',[]);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',arrayA);
					this.datagridOne.loading = false;
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
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
					let pps={};
					
						if(this.query_type == 1){
							pps ={
							store_ids:this.StoreId,
							sort:'report_date',
							shift_id:params['rows']['id'],//班次id
							}
						}else{
							pps ={
							store_ids:params['rows']['store_id'],
							sort:'report_date',
							shift_id:params['rows']['id'],//班次id
							}
						}
					this.ppsTwo = pps;
					this.FindFun(pps);
				}else if(params['key'] == 'datagridThree'){
					if(this.query_type == 1){
						this.ppsTwo['report_date'] = params['rows']['report_date'];
					}else{
						this.ppsTwo['store_id'] = params['rows']['store_id'];
					}
					this.FindFun(this.ppsTwo);
				}
				
			},
			ParamsBusinessFun(type){
				let pps = {
					'DateTime':this.DateTime,
					'StoreId':this.StoreId,
					'shiftId':this.shiftId,
					'query_type':this.query_type
				};
				console.log('参数',pps);
				if(type == 'export'){
					this.exportFun();
				}else if(type == 'custom'){
					this.dialogVisible = true;
					this.customFun1();
				}else{
					//this.data_time = value['Datatime'];
				//	this.store_list = value['Store']||'';
					//this.shift_ids = value['shift_ids']||'';//营业班次
					//查询
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
				let sortKey2 = "";
				let parametertype = "";
				let parametertype1 = "";
				let level = "";
				let level1 = "";
				let level2 = "";
				let order = "";
				let order1 = "";
				let order2 = "";
				if(this.query_type == 1){
					keys = "shift_id";
					parametertype = "Int";
					sortKey = "shift_id";
					level = "1";
					order = "asc";
					
					keys1 = "report_date";
					parametertype1 = "String";
					sortKey1 = "report_date";
					level1 = "2";
					order1 = "asc";
				}else{
					keys = "shift_id";
					parametertype = "Int";
					sortKey = "shift_id";
					level = "1";
					order = "asc";
					
					keys1 = "store_id";
					parametertype1 = "Int";
					sortKey1 = "store_id";
					level1 = "2";
					order1 = "asc";
					
					sortKey2 = "report_date";
					level2 = "3";
					order2 = "asc";
				}
				
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.bo.imp.boh.BusinessSummaryClassReportServiceImp",//导出类路径
					"methodName":"getBusinessSummaryClass",//导出方法名
					
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
					
					"sortKey2": sortKey2, //第二层排序 不存在可以不传
					"level2":level2, //排序第二层等级
					"order2": order2, //第二层倒序还是升序
					
					"hierarchy": 3, //当前是否分层 分为几层
					"hierarchytype": 1,
					"derivedtype": 2, //默认传1分页，2不分页
					"groupRow": 1 //导出是否展开层级  1展开 2不展开
			   }
				this.getResult.getexportFun(param,this);
			},
			startpage(){
				let _this = this;
				this.getDutyOrders();
			},
			getDutyOrders(){
				//拉取班次信息
				let seft = this;
				this.getResult.getResult('report/CommonMethodAreaRest/getloadDutyOrderNew', {},function(result){
					result.forEach((item, index) => {
				        seft.paramsObj.DutyOrders.push(item);
					});
				});
			},
			FindFun(pps ={}){
				//查询数据
				let _this = this;
				_this[_this.DateGridParams['key']]['loading'] = true;
				let type_columns1 = parseInt(_this.query_type);
				let params = {
					begin_date: _this.getResult.getTime(_this.DateTime[0]),
					end_date: _this.getResult.getTime(_this.DateTime[1]),
					store_ids: _this.StoreId.join(','),//门店
					shift_ids:_this.shiftId.length > 0?_this.shiftId.join(','):88888888,//选择的营业班次
					selectType: _this.query_type,
					exportdataexpr:"''",
					hierarchytype: _this.hierarchytype,
					page: _this.DateGridParams.PageIndex,
					rows: _this.DateGridParams.PageSize
				};
				for(let itemA in pps){
					params[itemA] = pps[itemA];
				}
				if(params.hierarchytype == 1) {
					//params['selectDataReportDate']='1';
					//params['selectexpordata']='';
					if(params.selectType == 1) {
					   // params['exportdataexpr']="'1111-11-11'";
						//params['sort'] = 'report_date';
					} else if(params.selectType ==2) {
						//params['exportdataexpr']="''";
						//params['sort'] = 'store_name';
					}
				}
				
				this.exporDataParams = params;
				console.log(params);
				this.BusinessSummaryStatistics(params);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				let SummaryStatisticsUrl = 'report/businessSummaryClassReportRest/getBusinessSummaryClass';
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