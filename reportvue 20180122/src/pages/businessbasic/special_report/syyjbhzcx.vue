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
		name:'syyjbhzcx',
		components:{
			ParamsBusiness,
			datagrid
		},
		computed:{
			...mapGetters('syyjbhzcx',['DateTime','StoreId','shiftId','Cashier','query_type']),
		},
		data() {
			return {
				title:'收银员交班汇总查询',
				report_num: 'SAAS_BI_2017_02',
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
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.GetshiftId();
			this.GetCashier();
		},
		methods: {
			...mapMutations('syyjbhzcx',['setexplainText','setReport_num']),
			...mapActions('syyjbhzcx',['GetshiftId','GetCashier']),
			SetCustomData(CustomData){
				this.$set(this.datagridOne,'rows',[]);
				this.$set(this.datagridOne,'columns',[]);
				let columns = customAjax.GetTableHeader(CustomData);
				let arrayA = customAjax.GetPaymentData(columns);
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
					let pps ={
						p_shift_id:params['rows']['shift_id'],
					};
					this.ppsTwo = pps;
					this.FindFun(pps);
				}else if(params['key'] == 'datagridThree'){
					if(this.query_type == 2){
						this.ppsTwo['store_id'] = params['rows']['store_id'];
						this.ppsTwo['p_cashier_num'] = params['rows']['cashier_num'];
					}else{
						this.ppsTwo['p_report_date_begin'] = "'"+params['rows']['report_date']+"'";
						this.ppsTwo['p_report_date_end'] = "'"+params['rows']['report_date']+"'";
					}
					this.FindFun(this.ppsTwo);
				}
				
			},
			ParamsBusinessFun(value){
				console.log('参数',value);
				if(this.StoreId.length>1 || this.StoreId.length ==0){
					this.$message({
			          showClose: true,
			          message: '请选择1个门店！',
			          type: 'warning'
			        });
					return false;
				}
				if(value == 'export'){
					this.exportFun();
				}else{
					this.DateGridParams= {
						key:'datagridOne',
						PageIndex:1,
						PageSize:20,
					};
					this.hierarchytype =1;
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
				let key1 = this.query_type==1?'report_date':'cashier_num';//区分不同查询方式下导出时的key1
				let key2 = this.query_type==1?'cashier_num':'report_date';//区分不同查询方式下导出时的key2
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.po.boh.impl.CashierShiftVerticalReportDaoImpl",//导出类路径
					"methodName":"getCashierShift",//导出方法名
					"key":"shift_id",// 第一层与第二层关联字段 且此值唯一标识第一层
					"key1":key1,//第二层与第三层关联字段 且此值唯一标识第二层
					"key2":key2,//此值唯一标识第三层
					"parametertype":"String",//选中列的类型字符串传String
					//"parametertype1":"Int",
					"sort":"shift_id",//导出第一层的排序
					"sortKey":"shift_id",//导出第二层排序
					"sortKey1":key1,//导出第三层排序
					"sortKey2":key2,//导出第三层排序
					"order":"asc",//第一层的排序规则
					"order1":"asc",//第二层的排序规则
					"order2":"asc",//第三1层的排序规则
					"level":"1",//如果只有一层则加此固定值
					"level1":"2",//如果有两层加此固定值
					"level2":"2",//如果有三层加此固定值
					"derivedtype":2,//第二层是否需要分页
					"groupRow": 2,//导出是否展开层级  1展开 2不展开
					"hierarchy":3,//共导出几级数据
					"hierarchytype":1,
			   }
				this.getResult.getexportFun(param,this);
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
				let type_columns1 = parseInt(this.query_type);
				let params = {
					p_report_date_begin: "'"+this.getResult.getTime(this.DateTime[0])+"'",
					p_report_date_end: "'"+this.getResult.getTime(this.DateTime[1])+"'",
					p_store_id: this.StoreId.join(','),//门店
					p_shift_id:this.shiftId.join(','),//选择的营业班次
					p_cashier_num:_this.Cashier.join(','),//选择的收银员
					selectType: _this.query_type,
					hierarchytype: _this.hierarchytype,
					page: _this.DateGridParams.PageIndex,
					rows: _this.DateGridParams.PageSize
				};
				if(params['p_shift_id'] == ''){
					params['p_shift_id'] = '99999999';
				}
				if(params['p_cashier_num'] == ''){
					params['p_cashier_num'] = '99999999';
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
				let SummaryStatisticsUrl = 'report/CashierShiftVerticalReportRest/getCashierShift';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					if(p['hierarchytype'] == 2){
						result.rows.forEach((v, k) => {
							v['shift_name'] = '';
						});
					}
					if(p['hierarchytype'] == 3){
						result.rows.forEach((v, k) => {
							if(_this.query_type==1){
								v['shift_name'] = '';
							    v['report_date'] = '';
							}else{
								v['shift_name'] = '';
							    v['cashier_num'] = '';
							}
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