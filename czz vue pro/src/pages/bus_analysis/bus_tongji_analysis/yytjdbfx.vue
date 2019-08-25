<template>
	<div class="">
		<el-row>
			<el-col :span="24" :offset="0">
				<ParamsBusiness @ParamsBusinessFun="ParamsBusinessFun" @SetCustomData="SetCustomData" ref="ParamsBusiness">
				</ParamsBusiness>
			</el-col>
			<el-col :span="24" :offset="0" class="querycontext">
				<datagrid @SetDateGrid="SetDateGrid" :datagridOne="datagridOne" :datagridTwo="datagridTwo" :datagridThree="datagridThree" ref="datagrid">
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
		name: 'yytjdbfx',
		components: {
			ParamsBusiness,
			datagrid
		},
		data() {
			return {
				title: '营业统计对比分析',
				report_num: 'SAAS_BI_2016_29',
				hierarchytype: 1, //级别
				exporDataParams:{},
				DateGridParams: {
					key: 'datagridOne',
					PageIndex: 1,
					PageSize: 20,
				},
				datagridOne: {
					loading: true,
					rows: [],
					open: true,
					fixed: false,
					selection: true,
					selectionfixed: false,
					columns: [],
					footer: [],
					total: 1,
					PageIndex: 1,
					PageSize: 20,
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
			};
		},
		computed: {
			...mapGetters('yytjdbfx', ['DateTime', 'StoreId', 'ContrastId', 'query_type']),
		},
		created(){
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
		},
		methods: {
			...mapMutations('yytjdbfx',['setReport_num','setexplainText']),
			SetCustomData(CustomData) {
				console.log('CustomData', CustomData);
				let columns = customAjax.GetTableHeader(CustomData);
				//获取开关
				let CustomDate = customAjax.getCustomDate();
				this.TaxRate = CustomDate.TaxRate; //是否开启税价分离
				this.PaymentType = CustomDate.PaymentType; //是否选择了付款方式明细
				if(this.PaymentType) {
					//获取付款方式明细
					columns = customAjax.GetPaymentData(columns);
				}
				this.$set(this.datagridOne, 'columns', []);
				this.$set(this.datagridOne, 'rows', []);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() => {
					this.$set(this.datagridOne, 'columns', columns);
					this.datagridOne.loading = false;
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
				}, 100);
			},
			SetDateGrid(params) {
				console.log('SetDateGrid', params);
				this.DateGridParams = params;
				this.hierarchytype = params['hierarchytype'];
				if(params['type'] == 'export') {
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					this.exporDataParams['report_date2'] = '';
					return false;
				}
				if(params['key'] == 'datagridOne') {
					this.FindFun();
				} else if(params['key'] == 'datagridTwo') {
					//查询二级
					this.report_date3 = params['rows']['report_date'];
					let pps = {
						report_date2: (this.query_type == 1 ? params['rows']['report_date'] : ''),
						sort: 'store_group',
					};
					if(this.query_type == 2) {
						if(params['rows']['store_group'] == '对比门店'){							
							pps['contrast'] = params['rows']['contrast_store'];
						}else{
							//说明是标准门店
							pps['contrast'] = params['rows']['standard_store'];
						}
						pps['sort'] = 'store_name';
					}
					this.FindFun(pps);
				} else if(params['key'] == 'datagridThree') {
					let pps = {};
					if(this.query_type == 2) {
						pps['store_id3'] = params['rows']['store_id'];
						pps['sort'] = 'report_date';
					} else {
						pps['report_date3'] = this.report_date3;
						pps['sort'] = 'store_name';
						if(params['rows']['store_group'] == '标准门店') { //如果展开标准门店
							pps['contrast'] = params['rows']['standard_store'];
						} else { //如果展开对比门店
							pps['contrast'] = params['rows']['contrast_store'];
						}

					}
					this.FindFun(pps);
				}
			},
			//查询
			ParamsBusinessFun(value) {
				console.log('参数', value);
				if(this.StoreId.length == 0 || this.ContrastId.length == 0) {
					this.$message({
						showClose: true,
						message: '请先选择标准门店和对比门店！',
						type: 'warning'
					});
					return false;
				}
				if(value == 'export') {
					this.exportFun();
				} else if(value == 'custom') {
					this.customFun1();
				} else {
					this.DateGridParams = {
						key: 'datagridOne',
						PageIndex: 1,
						PageSize: 20,
					};
					this.hierarchytype = 1;
					this.datagridOne.loading = true;
					this.FindFun();
				}
			},
			//导出方法
			exportFun() {
				let result = customAjax.GetexportHeader(this.datagridOne.columns);
				let param = {};
				let exportDateResult = this.exportDateResult; //导出的数据
				let exporDataParams = this.exporDataParams; //查询的参数
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
				if(this.query_type == 1) {
					keys = "report_date3";
					parametertype = "String";
					sortKey = "report_date3";
					level = "1";
					order = "asc";

					keys1 = "store_code";
					parametertype1 = "Int";
					sortKey1 = "";
					level1 = "";
					order1 = "";
				} else {
					keys = "store_code";
					parametertype = "Int";
					sortKey = "";
					level = "";
					order = "";

					keys1 = "store_id";
					parametertype1 = "Int";
					sortKey1 = "store_id";
					level1 = "2";
					order1 = "asc";

					sortKey2 = "report_date";
					level2 = "3";
					order2 = "asc";
				}

				param = {
					"exportUrl": exportDateUrl, //请求导出路径
					"exporData": exporDataParams, //当前界面选中的所有查询参数
					"exportName": this.title, //报表名称
					'result': result, //表头
					'fes': exportDateResult, //用户选择的导出的数据行
					"className": "com.tzx.report.bo.imp.boh.ComparativeAnalysisOfBusinessSummaryServiceImp", //导出类路径
					"methodName": "getComparativeAnalysisOfBusinessSummary", //导出方法名

					"key": keys, //根据某字段查询第一层
					"parametertype": parametertype, //第一次传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey": sortKey, //第一层排序 
					"level": level, //排序第一层等级
					"order": order, //第一层倒序还是升序 

					"key1": keys1, //根据某字段查询第二层 不存在可以不传
					"parametertype1": parametertype1, //第二层传参数是否需要进行拼接字符串 如果不需要传Int 需要传 String
					"sortKey1": sortKey1, //第二层排序 不存在可以不传
					"level1": level1, //排序第二层等级
					"order1": order1, //第二层倒序还是升序

					"sortKey2": sortKey2, //第二层排序 不存在可以不传
					"level2": level2, //排序第二层等级
					"order2": order2, //第二层倒序还是升序

					"hierarchy": 3, //当前是否分层 分为几层
					"hierarchytype": 1,
					"derivedtype": 2, //默认传1分页，2不分页
					"groupRow": 1, //导出是否展开层级  1展开 2不展开
					"contrast": "",
					"store_id3":""
				}
				this.getResult.getexportFun(param, this);
			},
			queryFun(isload) {
				//查询

				if(isload == true) {

				} else {
					//this.createCustom();
				}
			},
			startpage() {
				let _this = this;
				//this.createCustom();//模板
			},
			//查询数据 'DateTime','StoreId','ContrastId','query_type'
			FindFun(pps = {}) {
				let _this = this;
				this[this.DateGridParams['key']]['loading'] = true;
				let params = {
					begin_date: this.getResult.getTime(this.DateTime[0]),
					end_date: this.getResult.getTime(this.DateTime[1]),
					standard_store: this.StoreId.join(','), //标准门店
					contrast_store: this.ContrastId.join(','), //对比门店
					type: this.query_type,
					exportdataexpr: '',
					hierarchytype: this.hierarchytype,
					exportdataexpr: "''",
					page: this.DateGridParams.PageIndex,
					rows: this.DateGridParams.PageSize
				};
				for(let itemA in pps) {
					params[itemA] = pps[itemA];
				}
				if(params.hierarchytype == 1) {
					params['selectexpordata'] = "''";
					this.exporDataParams = params;
					if(params.type == 1) {
						params['sort'] = 'report_date';
					} else if(params.type == '2') {
						params['sort'] = 'store_group';
					}
				}

				//this.exporDataParams = params;
				console.log(params);
				this.BusinessSummaryStatistics(params);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				let SummaryStatisticsUrl = 'report/comparativeAnalysisOfBusinessSummaryRest/getComparativeAnalysisOfBusinessSummary';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					if(p['hierarchytype'] == 2 && p['type'] == 1) {
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