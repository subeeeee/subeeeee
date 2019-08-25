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
		name: 'yyhztjbb',
		components: {
			table1,
			ParamsBusiness
		},

		data() {
			return {
				exportDateResult:[],
				title: '营业汇总统计报表',
				report_num: 'SAAS_BI_2016_01',
				hierarchytype: 1,//级别
				exporDataParams:{},//查询的参数
				TaxRate:false,//是否开启税价分离
				PaymentType:false,//是否选择了付款方式明细
				PaymentZero:false,//是否过滤付款0值
				DateGridParams:{},
				Store:'',
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
					open:false,
					total: 1
				},
				datagridThree: {
					loading: true,
					rows: [],
					open: false,
					total: 1
				},
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				
				
			}
		},
		created(){
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.setseniorquery(false);
		},
		computed:{
			...mapGetters('yyhztjbb',['DateTime','StoreId','query_type']),
		},
		methods: {
			...mapMutations('yyhztjbb',['setReport_num','setexplainText','setseniorquery']),
			...mapActions('yyhztjbb',['GetDataListOne']),
			SetCustomData(CustomData){
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
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
					this.datagridOne.loading = false;
				},100);
			},
			SetDateGrid(params){
				console.log('SetDateGrid',params)
				this.DateGridParams = params;
				if(params['type'] == 'export'){
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				if(params['rows']){					
					let pps = {};
					if(this.query_type == 1){
						let report_date = params['rows']['report_date'];
						pps['report_date'] = "'" + report_date + "'";
						pps['sort'] = 'store_name';
					}else if(this.query_type == 2){
						let store_id = params['rows']['store_id'];
						pps['store_id'] = store_id;
						pps['sort'] = 'report_date';
					}
					this.hierarchytype = params.hierarchytype;//查询级别
					this.FindFun(pps);
				}
			},
			ParamsBusinessFun(value){
				console.log(value);
				if(value == 'export'){
					this.exportFun();
				}else if(value == 'custom'){
					
				}else{
					this.DateGridParams['key'] = 'datagridOne';
					this.hierarchytype = 1;
					this.Datatime = this.DateTime;//交易时间
					this.Store = this.StoreId.join(',');//交易门店
					this.FindFun();
				}
			},
			exportFun() {
				if(this.exportDateResult.length <= 0){
					 this.$message.error('请先选择要导出的数据');
					 return false;
				}
				//表头数据
				let result =customAjax.GetexportHeader(this.datagridOne.columns);
				let param = {};
				//导出的url
				let exportDateUrl ='report/CommonMethodAreaRest/exportDateNew';
				/*if(this.query_type == 1){*/
					param={
						"exportUrl":exportDateUrl,//导出的url
						"exporData":this.exporDataParams,//查询的参数
						"exportName":this.title,//导出的表格的名称
						'result':result,//表头集合
						'fes':this.exportDateResult,//导出的数据
						'noOrderBy':'noOrderBy',
						"className":"com.tzx.report.bo.imp.boh.BusinessSummaryStatisticsReportServiceImp",
						"methodName":"getBusinessSummaryStatistics",
						"key":this.query_type == 1? "report_date":"store_id",
						"parametertype":"String",
						"key1":this.query_type == 1? "store_id":"report_date",
						"parametertype1":"Int",
						"sortKey":"store_id",
						"order":this.query_type == 1?"desc":"asc",
						"level1":"2",
						"derivedtype":2,
						"groupRow": 2,//导出是否展开层级  1展开 2不展开
						"hierarchy":2
				  }
				this.getResult.getexportFun(param,this);
			},

			FindFun(pps = {}) {
				let params = {
					begin_date:this.getResult.getTime(this['Datatime'][0]),
					end_date:this.getResult.getTime(this['Datatime'][1]),
					store_id:this['Store'],
					type:this.query_type,
					hierarchytype:this.hierarchytype,
					exportdataexpr:this.query_type == 1?"'1111-11-11'":"''",
					sort:'report_date',
					separate:this.query_type == 1? "report_date" :"store_name",
					typeStatus:this.TaxRate?1:0,
					customtype:this.PaymentType?1:0,
					page:this.DateGridParams['PageIndex'],
					rows:this.DateGridParams['PageSize']
				};
				
				if(params['hierarchytype'] == 1){
					this.exporDataParams = params;
				}
				for(let item in pps){
					params[item] = pps[item];
				}
				//this.GetDataListOne(params);
				this.BusinessSummaryStatistics(params);
			},
			BusinessSummaryStatistics(pps) {
				let seft = this;
				seft[seft.DateGridParams['key']]['loading'] = true;
				let SummaryStatisticsUrl = 'report/businessSummaryStatisticsReportRest/getBusinessSummaryStatistics';
				this.getResult.getResult(SummaryStatisticsUrl, pps, function(result) {
					if(result.success != false && result.rows.length > 0){
						if(pps['hierarchytype'] == 2 && pps['type'] == 1){
							result.rows.forEach((v, k) => {
								v['report_date'] = '';
							});
						}
						if(seft.PaymentZero && pps['hierarchytype'] == 1){
							let _columns = seft.datagridOne.columns;
							let columns = customAjax.getPaymentZeroData(result.rows,_columns);
							seft.$set(seft.datagridOne,'columns',[]);
							seft.datagridOne.open = !seft.datagridOne.open;
							seft.datagridOne.selection = !seft.datagridOne.selection;
							setTimeout(() => {
								seft.$set(seft.datagridOne,'columns',columns);
								seft.datagridOne.open = !seft.datagridOne.open;
								seft.datagridOne.selection = !seft.datagridOne.selection;
							},100);
						}
					}
					seft[seft.DateGridParams['key']]['loading'] = false;
					seft[seft.DateGridParams['key']]['rows'] = result.rows; 
					seft[seft.DateGridParams['key']]['footer'] = result.footer;
					seft[seft.DateGridParams['key']]['total'] = result.total;
				});
			},
		},
	}
</script>

<style>
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
	/*.el-icon-custom:before{
		content: ' ';
	    width: 20px;
	    height: 20px;
	    display: inline-block;
		background-image: url(../../assets/custom.png);
	    background-size: 20px;
	    background-repeat: no-repeat;
	    background-position: center;
	}*/
	.popper-class-select{
		width: 100px;
	}
	.context {
		height: 100%;
	}
	.el-row{
		width: 100%;
		height: 100%;
	}
	.el-input-group__append{
		border-left:1px solid;
	}
	.el-popover{
		padding:0px;
	} 
	.MultiTreeInput .el-input__inner{
      width: 180px !important;
      height: 30px !important;
      border-radius: 3px;
      color:#97a8be;
	}
	.el-input-group__append .el-button, .el-input-group__append .el-select, .el-input-group__prepend .el-button, .el-input-group__prepend .el-select{
		margin: 0px;
	}
</style>