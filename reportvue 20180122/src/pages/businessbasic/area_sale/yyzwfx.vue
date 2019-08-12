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
	    			@SetCellClick="SetCellClick"
		    		:datagridOne="datagridOne"
		    		:datagridTwo="datagridTwo"
		    		:datagridThree="datagridThree"
		    		ref="datagrid">
		    	</datagrid>
		    </el-col>
		</el-row>
		<drilltable ref="drilltable"></drilltable>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import customAjax from "@/components/custom/custom.js"
	import ParamsBusiness from '@/components/businesssummary/paramsbusiness1'
	import datagrid from '@/components/datagrid/table1'
	import drilltable from '@/components/drilltable/drilltable'
	
	export default {
		name:'yyzwfx',
		components:{
			ParamsBusiness,
			datagrid,
			drilltable
		},
		data(){
			return{
				title:'营业桌位分析',
				report_num:'SAAS_BI_2016_25',
				hierarchytype: 1,//级别
				DateGridParams:{
					'key':'datagridOne',
					PageIndex:1,
					PageSize:20,
				},
				dialogVisible:false,
				datagridOne: {
					loading: false,
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
			}
		},
		computed:{
			...mapGetters('yyzwfx',['DateTime','StoreId','shiftId','BusinessArea','BusinessTable','Businessmeal','Businessshift','ZeroValue']),
		},
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.getBusinessAreaData();
			this.getBusinessTable();
			this.getBusinessmeal();
			this.GetshiftId();
		},
		methods:{
			...mapMutations('yyzwfx',['setReport_num','setexplainText']),
			...mapActions('yyzwfx',['getBusinessAreaData','getBusinessTable','getBusinessmeal','GetshiftId']),
			SetCustomData(CustomData){
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
			SetCellClick(params){
				//钻取
				if(params.column['property'] == 'bill_num'){					
					console.log(params);
					let pps = {
						p_date_begin:"'" + this.exporDataParams['report_date_begin'] + "'",
						p_date_end:"'" + this.exporDataParams['report_date_end'] + "'",
						p_store_id:"'" + params['rows']['id'] + "'",
						p_shift:"'" + this.Businessshift.join(',') + "'",//营业班次
						p_area:"'" + this.BusinessArea.join(',') + "'",//营业区域
						p_location_type:"'" + this.Businessmeal.join(',') + "'",//餐位类型
						p_cashier_num:"''",//收银人员
						p_payment_way:"''",//付款方式
						p_bill_num:"''",//账单编号
						p_pos_num:"''",//收款机号
						p_order_num:"''",//预定单号
						p_interval:"''", //时间长隔
						type:1,//查询类型
						p_table_code:"'" + this.BusinessTable.join(',') + "'",//桌位
						p_zero_bill:"'" + this.ZeroValue + "'",//包含0值
						pageTotal:params['rows']['bill_num'],
						exportdataexpr:"''"
					};
					this.$refs.drilltable.Show(params['rows'],pps);
				}
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
						store_ids:params['rows']['id'],
						prenttotal:'0',
						sort:'table_code'
					};
					this.ppsTwo = pps;
					this.FindFun(pps);
				}else if(params['key'] == 'datagridThree'){
					let pps = this.ppsTwo;
					pps['table_codes'] ="'" + params['rows']['table_code'] +  "'",
					this.FindFun(pps);
				}
			},
			ParamsBusinessFun(value){
				let pps = {
					'DateTime':this.DateTime,
					'StoreId':this.StoreId,
					'shiftId':this.shiftId,
					'BusinessArea':this.BusinessArea,
					'BusinessTable':this.BusinessTable,
					'Businessmeal':this.Businessmeal,
					'Businessshift':this.Businessshift,
					'ZeroValue':this.ZeroValue
				};
				console.log('参数',pps);
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
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.bo.imp.operate.BusinessTaleAnalysisServiceImp",//导出类路径
					"methodName":"find",//导出方法名
					"key":"store_ids",// key的别名 第一层根据某列导出（列必须唯一）
					"key1":"table_code",//第二层根据某列导出
					"parametertype":"Int",//选中列的类型字符串传String
					"parametertype1":"String",
					"sortKey":"store_ids",//导出第一层排序
					"sortKey1":"table_code",//导出第二层排序
					"order":"asc",//？？？
					"order1":"asc",//？？？
					"level":"1",//？？？
					"level1":"2",
					"hierarchytype": 1,
					"derivedtype":2,//第二层是否需要分页
					"groupRow": 1,//导出是否展开层级  1展开 2不展开
					"hierarchy":3//共导出几级数据
			   }
				this.getResult.getexportFun(param,this);
			},
			startpage(){
				let _this = this;
				this.getDutyOrders();
			},
			FindFun(pps ={}){
				//查询数据
				let _this = this;
				_this[_this.DateGridParams['key']]['loading'] = true;
				let params = {
					report_date_begin:this.getResult.getTime(_this.DateTime[0]),
					report_date_end:this.getResult.getTime(_this.DateTime[1]),
					store_ids:this.StoreId.join(','),
					business_area_ids:this.BusinessArea.join(','),//营业区域
					table_property_ids:this.Businessmeal.join(','),//营业餐位
					table_codes:"'" +this.BusinessTable.join(',') + "'",//营业桌位
					duty_order_ids:"'" + this.shiftId.join(',') + "'",//选择的营业班次
					sort:"id",
					order:"ASC",
					prenttotal:"000000",
					iszore:this.ZeroValue,//是否包含零值
					report_type:"TABLE",
					exportdataexpr:"",
					hierarchytype:this.hierarchytype,
					page: _this.DateGridParams.PageIndex,
					rows: _this.DateGridParams.PageSize
				};
				if(params['business_area_ids'] == ''){
					params['business_area_ids'] = '888888';
				}
				if(params['table_property_ids'] == ''){
					params['table_property_ids'] = '888888';
				}
				for(let itemA in pps){
					params[itemA] = pps[itemA];
				}
				if(params.hierarchytype == 1) {
					params['exportdataexpr']="''";
					this.exporDataParams = params;
				}
				console.log(params);
				this.BusinessSummaryStatistics(params);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				let SummaryStatisticsUrl = 'report/BusinessTaleAnalysisRest/find';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					result.rows.forEach((v, k) => {
						if(p['hierarchytype'] >= 2){
							v['store_name'] = '';
						}
						if(p['hierarchytype'] == 3){
							v['table_code'] = '';
							v['table_name'] = '';
						}
					});
					_this[_this.DateGridParams['key']]['loading'] = false;
					_this[_this.DateGridParams['key']]['rows'] = result.rows; 
					_this[_this.DateGridParams['key']]['footer'] = result.footer;
					_this[_this.DateGridParams['key']]['total'] = result.total;
				});
			},
		}
	}
</script>

<style>
	td.bill_num-item{
		cursor: pointer;
	}
	td.bill_num-item>div.cell{
		width: auto!important;
	    color: #0C9AFF;
	    min-width: 0px!important;
	    display: initial!important;
	}
</style>