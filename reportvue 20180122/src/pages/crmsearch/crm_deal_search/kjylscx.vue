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
		name:'kjylscx',
		components:{
			ParamsBusiness,
			datagrid
		},
		data() {
			return {
				title:'交易卡流水查询',
				report_num: 'SAAS_BI_2016_07',
				hierarchytype: 1,//级别
				TaxRate:0,//默认没有开启价税分离
				DateGridParams:{
					'key':'datagridOne',
					PageIndex:1,
					PageSize:20,
				},
				datagridOne: {
					loading: true,
					rows: [],
					open: false,
					fixed: false,
					selection: true,
					selectionfixed:false,
					columns: [],
					footer: [],
					total: 1,
					PageIndex:1,
					PageSize:20,
				},
				datagridTwo: {},
				datagridThree: {},
			};
		},
		computed:{
			...mapGetters('kjylscx',['DateTime','StoreId','RegisterId','transactionType','transactionChannel','MemberInfo','MemberGrade']),
		},
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.GetMembergrade();
			this.GettransactionChannel();
		},
		methods: {
			...mapMutations('kjylscx',['setReport_num','setexplainText']),
			...mapActions('kjylscx',['GetMembergrade','GettransactionChannel']),
			SetCustomData(CustomData){
				this.$set(this.datagridOne,'columns',[]);
				let columns = customAjax.GetTableHeader(CustomData);
				//获取开关
				let CustomDate = customAjax.getCustomDate();
				this.TaxRate = CustomDate.TaxRate;//是否开启税价分离
				this.PaymentType = CustomDate.PaymentType;//是否选择了付款方式明细
				if(this.PaymentType){					
					//获取付款方式明细
					columns = customAjax.GetPaymentData(columns);
				}
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.loading = false;
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
				}
			},
			//查询
			ParamsBusinessFun(value){
				console.log('参数',value);
				let _this= this;
				if(value == 'export'){
					this.exportFun();
				}else if(value == 'custom'){

				}else{
					this.DateGridParams= {
						key:'datagridOne',
						PageIndex:1,
						PageSize:20,
					};
					this.FindFun();
				}
			},
			FindFun(pps ={}){
				this[this.DateGridParams['key']]['loading'] = true;
				let type_columns1 = parseInt(this.query_type);
				let params = {
					date1: this.getResult.getTime(this.DateTime[0]),
					date2: this.getResult.getTime(this.DateTime[1]),
					exportdataexpr:  "''",
					chanel:"'" + this.transactionChannel.join(',') + "'",//交易渠道
					ids: this.StoreId.join(','),//交易门店
					rids:"'" + this.RegisterId.join(',') + "'",//注册门店
					level:"'" + this.MemberGrade + "'",//会员等级
					operat_type:"'" + this.transactionType.join("','") + "'",//交易类型
					customer:"'" + this.MemberInfo + "'",//会员信息
					select:1,
					page: this.DateGridParams.PageIndex,
					rows: this.DateGridParams.PageSize
				};
				for(let itemA in pps){
					params[itemA] = pps[itemA];
				}
				this.exporDataParams = params;
				console.log(params);
				this.BusinessSummaryStatistics(params);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				let SummaryStatisticsUrl = 'report/cardTransactionFlowQuery/find';
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
			//导出方法
			exportFun() {
				let result = customAjax.GetexportHeader(this.datagridOne.columns);
				let param = {};
				let exportDateResult = this.exportDateResult;//导出的数据
				let exporDataParams = this.exporDataParams;//查询的参数
				let exportDateUrl = 'report/CommonMethodAreaRest/exportDateNew';
				param={
					"exportUrl":exportDateUrl,
					"exporData":exporDataParams,
					"exportName":this.title,
					'result':result,
					'fes':exportDateResult,
					"className":"com.tzx.report.bo.imp.crm.CardTransactionFlowQueryServiceImp",
					"methodName":"find",
					"key":"bill_code",
					"parametertype":"String",
					"key1":"store_id",
					"parametertype1":"Int",
					"sortKey1":"store_id",
					"order1":"desc",
					"level1":"2",
					"derivedtype":2,
					"groupRow": 2,//导出是否展开层级  1展开 2不展开
					"hierarchy":1
			   }
				this.getResult.getexportFun(param,this);
			},
			
		},

	}
</script>

<style>

</style>