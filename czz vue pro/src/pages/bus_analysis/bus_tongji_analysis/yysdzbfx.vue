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
		name:'yysdzbfx',
		components:{
			ParamsBusiness,
			datagrid
		},
		
		data() {
			return {
				title:'营业时段占比分析', 
				report_num: 'SAAS_BI_2016_13',
				hierarchytype: 1,//级别
				queryUrl:'/report/DoBusinessSummaryStatisticsTimeIntervalRest/queryBusinessTime',
				DateGridParams:{
					'key':'datagridOne'
				},
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
					open:false,
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
			...mapGetters('yysdzbfx',['DateTime','StoreId','QueryVal','query_type','TimeInterval','QueryValData','HideQueryVal']),
		},
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.GetTimeInterval();
		},
		methods: {
			...mapMutations('yysdzbfx',['setReport_num','setexplainText']),
			...mapActions('yysdzbfx',['GetTimeInterval','GetHideQueryVal']),
			SetCustomData(CustomData){
				let columns = customAjax.GetTableHeader(CustomData);
				//获取开关
				let CustomDate = customAjax.getCustomDate();
				this.TaxRate = CustomDate.TaxRate;//是否开启税价分离
				this.PaymentType = CustomDate.PaymentType;//是否选择了付款方式明细
				if(this.PaymentType){					
					//获取付款方式明细
					columns = customAjax.GetPaymentData(columns);
				}
				this.$set(this.datagridOne,'rows',[]);
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
			GetHeaderDesc(){
				//查询内容集合
				let columns = customAjax.getHeaderData();
				columns = customAjax.GetTableHeader(columns);
				
				let arr = [];
				let count = 0;
				let hidefield = ['report_date','store_name'];
				for (let item in this.TimeInterval) {	
					if(this.TimeInterval[item].length >0){	
						count += 1;
						arr.push({
							label:'时段'+item,
							prop:'',
							width:'',
							children:[]
						});
						columns.forEach((itemA, indexA) => {
							if(hidefield.indexOf(itemA['prop']) == -1){
								let itemB = JSON.parse(JSON.stringify(itemA));
								itemB['prop'] = itemB['prop']+'_'+item;
								arr[arr.length-1]['children'].push(itemB);
							}
						});
					}
				}
				if(count > 0){	
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
					arr.forEach((iten,index) => {
						columns.push(iten);
					});
					columns = customAjax.GetTableHeaderFormatter(columns);
					if(this.QueryVal.length > 0){
						this.datagridOne.open = !this.datagridOne.open;
						this.datagridOne.selection = !this.datagridOne.selection;
						this.GetHideQueryVal([this.QueryVal,this.QueryValData]);
						customAjax.GetHideField(columns,this.HideQueryVal);
						console.log('_columns',columns);
					
					}
					this.$set(this.datagridOne,'columns',[]);
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
					setTimeout(() => {
						this.datagridOne.open = !this.datagridOne.open;
						this.datagridOne.selection = !this.datagridOne.selection;
						console.log('xxxx',columns);
						this.$set(this.datagridOne,'columns',columns);
					},10);
				}
				
			},
			ParamsBusinessFun(type){
				let pps = {
					'DateTime':this.DateTime,
					'StoreId':this.StoreId,
					'QueryVal':this.QueryVal,
					'query_type':this.query_type,
					'TimeInterval':this.TimeInterval
				};
				this.hierarchytype = 1;
				console.log('pps',pps);
				if(type == 'export'){
					this.exportFun();
				}else{
					this.DateGridParams = {
						'key':'datagridOne',
						'PageIndex':1,
		    			'PageSize':20,
					};
					this.GetHeaderDesc();
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
				let sortKey = "";
				let parametertype = "";
				let level = "";
				let order = "";
				
				
				let sortKey1 = "";
				let level1 = "";
				let order1 = "";
				
				if(this.query_type == 1){
					keys = "report_date";
					parametertype = "String";
					sortKey = "report_date";
					level = "1";
					order = "asc";
					
					sortKey1 = "store_id";
					level1 = "2";
					order1 = "asc";
				}else{
					keys = "store_id";
					parametertype = "Int";
					sortKey = "store_id";
					level = "1";
					order = "asc";
					
					sortKey1 = "report_date";
					level1 = "2";
					order1 = "asc";
				}
				
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.po.boh.impl.DoBusinessSummaryStatisticsTimeIntervalDaoImpl",//导出类路径
					"methodName":"queryBusinessTime",//导出方法名
					
					"key": keys, //根据某字段查询第一层
					"parametertype": parametertype, //第一次传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey": sortKey, //第一层排序 
					"level": level, //排序第一层等级
					"order": order, //第一层倒序还是升序 
					
					"sortKey1": sortKey1, //第一层排序 
					"level1": level1, //排序第一层等级
					"orde1r": order1, //第一层倒序还是升序 
					
					"hierarchy":2,//共导出几级数据
					"hierarchytype": 1,
					"derivedtype": 2, //默认传1分页，2不分页
					"groupRow": 1 //导出是否展开层级  1展开 2不展开
			   }
				this.getResult.getexportFun(param,this);
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
						sort:'store_id',
					};
					if(this.query_type == 1){
						pps['report_date'] = "'" + params['rows']['report_date'] + "'";
						pps['store_id'] = '';
					}else{
						//按交易机构汇总，返回的 params['rows'] 里面居然神奇的没有 store_id ?!
						//也许可能是一时半会获取不到，先从  params['rows'] 获取一次，在判断是否获取到，如果依旧没有获取到，
						//就根据 report_date 定位 到store_id
						pps['report_date'] = "'null'";
						pps['store_id'] = params['rows']['store_id'];
						if(pps['store_id'] == ''){
							console.log('始终没有获取到 store_id');
							let rows = this.datagridOne.rows;
							rows.forEach((itemA, indexA) => {
							  if(itemA['report_date'] == params['rows']['report_date']){
							  	pps['store_id'] = itemA['store_id'];
							  }
							});
						}
						
					}
					this.FindFun(pps);
				}
			},
			FindFun(pps ={}){
				//查询条件
				let params = {
					report_date_begin:this.getResult.getTime(this.DateTime[0]),
					report_date_end:this.getResult.getTime(this.DateTime[1]),
					queryWay:this.query_type,//查询方式
					hierarchytype:this.hierarchytype,//查询级别
					exportdataexpr:"''",
					store_id:this.StoreId.join(','),
					sort:this.query_type==1?'report_date':'store_id',
					page:this.DateGridParams.PageIndex,
					rows:this.DateGridParams.PageSize
				};
				for (let item in this.TimeInterval) {
					params['time' + item + '_start'] = "''";
					params['time' + item + '_end'] = "''";
					let tm = this.TimeInterval[item];
					if(tm.length > 0){						
						params['time'+item+'_start'] = "'" + tm[0] + "'";
						params['time'+item+'_end'] = "'" + tm[1] + "'";
					}
				}

				for (let item in pps) {
					params[item] = pps[item];
				}
				
				let seft = this;
				this.exporDataParams = params;
				seft[seft.DateGridParams['key']]['loading'] = true;
				this.getResult.getResult(this.queryUrl,params,function(result){
					console.log('result',result);
					setTimeout(() => {						
						seft[seft.DateGridParams['key']]['loading'] = false;
						seft[seft.DateGridParams['key']]['rows'] = result.rows; 
						seft[seft.DateGridParams['key']]['footer'] = result.footer;
						seft[seft.DateGridParams['key']]['total'] = result.total;
					},10);
				});
			},
		},

	}
</script>

<style>

</style>