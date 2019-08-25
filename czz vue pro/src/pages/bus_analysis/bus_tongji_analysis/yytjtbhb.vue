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
	import datagrid from '@/components/datagrid/MomanTable1'
	
	export default {
		name:'yytjtbhb',
		names:'营业统计同比环比',
		components:{
			ParamsBusiness,
			datagrid,
		},
		computed:{
			...mapGetters('yytjtbhb',['DateTime','StoreId','query_type']),
		},
		data() {
			return {
				title:'营业统计同比环比',
				report_num: 'SAAS_BI_2016_28',
				hierarchytype: 1,//级别
				begin_date:'',
				end_date:'',
				begin_date_shang:'',
				end_date_shang:'',
				begin_date_tong:'',
				end_date_tong:'',
				queryUrl:'report/businessSummaryYearMomReportRest/getBusinessSummaryYearMom',
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
		created() {
			this.setexplainText(this.title);
			this.setReport_num(this.report_num);
			this.setseniorquery(false);
		},
		methods: {
			...mapMutations('yytjtbhb',['setReport_num','setexplainText','setseniorquery']),
			SetCustomData(CustomData){
				this.datagridOne.rows = [];
				this.$set(this.datagridOne,'columns',[]);
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
				console.log('columns',columns);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{	
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.loading = false;
				},100);
			},
			getTimeTAndS(){
				//计算上期同期时间
				let timeA = new Date(this.begin_date);
				let timeB = new Date(this.end_date);
				let yA = timeA.getFullYear();
				let mA = timeA.getMonth() + 1;
				let dA = timeA.getDate();
				let yB = timeB.getFullYear();
				let mB = timeB.getMonth() + 1;
				let dB = timeB.getDate();
				mA = mA > 10 ? mA : '0' + mA;
				dA = dA > 10 ? dA : '0' + dA;
				mB = mB > 10 ? mB : '0' + mB;
				dB = dB > 10 ? dB : '0' + dB;
				this.begin_date_shang = yA + '-' + (mA - 1) + '-' + dA;
				this.end_date_shang = yB + '-' + (mB - 1) + '-' + dB;
				this.begin_date_tong = (yA - 1) + '-' + mA + '-' + dA;
				this.end_date_tong = (yB - 1) + '-' + mB + '-' + dB;
			},
			ParamsBusinessFun(value){
				console.log('value',value);
				this.DateGridParams={
					key:'datagridOne',
					PageIndex:this.datagridOne.PageIndex,
					PageSize:this.datagridOne.PageSize
				};
				if(value == 'export'){
					this.exportFun();
				}else{
					this.hierarchytype = 1;
					this.begin_date = this.getResult.getTime(this.DateTime[0]);
					this.end_date = this.getResult.getTime(this.DateTime[1]);
					this.store_ids = this.StoreId.join(',');
					this.getTimeTAndS();
					this.queryFun();
				}
			},
			queryFun(pps = {}){
				let seft = this;
				let params = {
					begin_date:this.begin_date,
					end_date:this.end_date,
					begin_date_shang:"'" + this.begin_date_shang + "'",
					end_date_shang:"'" + this.end_date_shang + "'",
					begin_date_tong:"'" + this.begin_date_tong + "'",
					end_date_tong:"'" + this.end_date_tong + "'",
					store_ids:this.store_ids,
					selectType:this.query_type,
					hierarchytype:this.hierarchytype,
					exportdataexpr:"''",
					page:this.DateGridParams.PageIndex,
					rows:this.DateGridParams.PageSize
				};
				if(this.hierarchytype == 1){
					params['selectDataReportDate'] = "'1'";//导出第一层的所需参数
				}
				for(let itemA in pps){
					params[itemA] = pps[itemA];
				}
				if(params['hierarchytype'] == 1){
					this.exporDataParams = params;
				}
				console.log('params',params);
				seft[seft.DateGridParams['key']]['loading'] = true;
				this.getResult.getResult(this.queryUrl,params,function(result){
					if(result.success != false){						
						let _columns = seft.datagridOne.columns;
						if(seft.PaymentZero && params['hierarchytype'] == 1){
							let columns = customAjax.getPaymentZeroData(result.rows,_columns);
							seft.$set(seft.datagridOne,'columns',[]);
							seft.datagridOne.open = !seft.datagridOne.open;
							seft.datagridOne.selection = !seft.datagridOne.selection;
							if(params['selectType'] == 2){
								//查询一级并且是第二种查询方式
								//目的：找到除去交易日期和交易门店的第一个显示字段(内容字段)	
								//
								let index = 0;
								columns.forEach((itemA, indexA) => {
									if(index == 0){	
										if(itemA['prop'] != 'report_date' && itemA['prop'] != 'store_name'){
											if(itemA['hide'] == false){
												if(itemA['children'].length > 0){
													itemA['children'].forEach((itemB, indexB) => {
														if(index == 0){
															if(itemB['hide'] == false){
																itemB['fist'] = true;
																index = 1;
															}
														}
													});
												}else{
													index = 1;
													itemA['fist'] = true;
												}
											}
										}
									}
								});
							}
							setTimeout(() => {
								seft.$set(seft.datagridOne,'columns',columns);
								seft.datagridOne.open = !seft.datagridOne.open;
								seft.datagridOne.selection = !seft.datagridOne.selection;
							},100);
						}
						if(params['hierarchytype'] == 2 && params['selectType'] == 1){
							result.rows.forEach((itemA, indexA) => {
								itemA['report_date'] = '';
							});
						}
						if(params['selectType'] == 2){
							result.rows.forEach((itemA, indexA) => {
								for(let itemB in itemA){
									if(itemB != 'report_date' && itemB != 'store_name' && itemB != 'id' && itemB != 'store_id'){
										itemA['selectType'] = params['selectType'];
										let field = itemB;
										let valA = itemA[field]||0;//本期数据
										let valB = itemA['t'+field]||0;//同期数据
										let valC = itemA['q'+field]||0;//上期数据
										//比上期=(本期-上期)/上期
										//比同期=(本期-同期)/同期
										let valD = (((valA-valB)/valB)*100).toFixed(2);//比同期
										let valE = (((valA-valC)/valC)*100).toFixed(2);//比上期
										if('t35' == field){
											debugger;
										}
										itemA['btq_'+field] = valD + '%';//比同期
										itemA['btq_'+field+'_'] = parseFloat(valD)>0?1:0;
										itemA['bqq_'+field] = valE + '%';//比上期
										itemA['bqq_'+field+'_'] = parseFloat(valE)>0?1:0;
										if(valB == 0 || valD == 'NaN' || valD == 'Infinity'){
											itemA['btq_'+field] = '无同期数据';
											itemA['btq_'+field+'_'] = '2';
										}
										if(valC == 0 || valE == 'NaN' || valE == 'Infinity'){
											itemA['bqq_'+field] = '无上期数据';
											itemA['bqq_'+field+'_'] = '2';
										}
									}
								}
							});
						}
						console.log('result.rows',result.rows);
						seft[seft.DateGridParams['key']]['loading'] = false;
						seft[seft.DateGridParams['key']]['rows'] = result.rows; 
						seft[seft.DateGridParams['key']]['footer'] = result.footer;
						seft[seft.DateGridParams['key']]['total'] = result.total;
					}
				});
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
				let sortKey1 = "";
				let parametertype = "";
				let parametertype1 = "";
				if(this.query_type == 1){
					keys = "report_date";
					sortKey = "report_date";
					sortKey1 = "store_id";
					parametertype = "String";
					parametertype1 = "Int";
				}else{
					keys = "store_id";
					sortKey = "store_id";
					sortKey1 = "";
					parametertype = "Int";
					parametertype1 = "";
				}
				
				
				param={
					"exportUrl":exportDateUrl,//请求导出路径
					"exporData":exporDataParams,//当前界面选中的所有查询参数
					"exportName":this.title,//报表名称
					'result':result,//表头
					'fes':exportDateResult,//用户选择的导出的数据行
					"className":"com.tzx.report.bo.imp.boh.BusinessSummaryYearMomReportServiceImp",//导出类路径
					"methodName":"getBusinessSummaryYearMom",//导出方法名
					"key":keys,// key的别名 第一层根据某列导出（列必须唯一）
					"key1":"",//第二层根据某列导出
					"parametertype":parametertype,//选中列的类型字符串传String
					"parametertype1":parametertype1,
					"sortKey":sortKey,//导出第一层的排序do
					"sortKey1":sortKey1,//导出第二层排序l
					"order":"asc",//？？？
					"order1":"asc",//？？？
					"level":"1",//？？？
					"level1":"2",//？？？
					"derivedtype":2,//第二层是否需要分页
					"groupRow": 1,//导出是否展开层级  1展开 2不展开
					"hierarchy":2,//共导出几级数据
					"hierarchytype":1
			   }
				this.getResult.getexportFun(param,this);
			},
			SetDateGrid(params){
				console.log('SetDateGrid',params);
				if(params['type'] == 'export'){
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				this.DateGridParams = params;
				this.hierarchytype = params['hierarchytype'];
				let pps = {};
				if(this.query_type == 1 && this.hierarchytype == 2){
					let report_date = params['rows']['report_date'];
					report_date = report_date.split(' ')[0];
					pps['report_date'] = "'" + report_date + "'";
				}
				if(params.key == 'datagridTwo' && this.query_type == 2){
					//按交易日期查询 并且 查询二级
					pps['store_ids'] ="'" + params.rows['store_id'] + "'";
					pps['store_id1'] ="'" + params.rows['store_id'] + "'";
					pps['store_id'] = params.rows['store_id'];// + "'";
				}
				
				this.queryFun(pps);
			},
		}

	}
</script>

<style>

</style>