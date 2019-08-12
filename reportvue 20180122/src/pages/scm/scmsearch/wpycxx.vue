<template>
	<div class="">
		<el-row>
			<el-col :span="24" :offset="0">
				<ParamsSupply 
					@ParamsBusinessFun="ParamsBusinessFun" 
					@SetCustomData="SetCustomData" 
					ref="ParamsSupply"></ParamsSupply>
			</el-col>
			<el-col :span="24" :offset="0" class="querycontext">
				<datagrid 
					@SetDateGrid="SetDateGrid" 
					:datagridOne="datagridOne" 
					:datagridTwo="datagridTwo" 
					:datagridThree="datagridThree" 
					ref="datagrid"></datagrid>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import customAjax from "@/components/custom/custom.js"
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import ParamsSupply from '@/components/SupplyChain/ParamsSupply'
	import datagrid from '@/components/datagrid/table1'
	export default {
		name: 'wpycxx',
		title: '物品异常信息',
		components: {
			ParamsSupply,
			datagrid
		},
		computed: {
			...mapGetters('wpycxx',['dishesType','dishesName','BusinessState','checkcondition1','checkcondition2']),
		},
		data() {
			return {
				report_num: 'SAAS_BI_2017_164',
				title: '物品异常信息',
				hierarchytype: 1,
				DateGridParams: {
					'key': 'datagridOne',
					PageIndex: 1,
					PageSize: 20,
				},
				datagridOne: {
					loading: true,
					rows: [],
					open: false,
					fixed: false,
					selection: true,
					selectionfixed: false,
					columns: [],
					footer: [],
					total: 1,
					PageIndex: 1,
					PageSize: 20,
				},
				datagridTwo: {},
				datagridThree: {},

			}
		},
		created(){
			this.setqueryText('开始检测');
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.getdishesTypeData();
		},
		methods: {
			...mapMutations('wpycxx',['setqueryText','setReport_num','setexplainText']),
			...mapActions('wpycxx',['getdishesTypeData']),
			ParamsBusinessFun(value) {
				let params = {
					'categorys':this.dishesType,
					'goodsname':this.dishesName,
					'goodsstatus':this.BusinessState,
					'base_info':this.checkcondition1,//基本信息
					'warehouse_info':this.checkcondition2,//仓库信息
					'page': this.DateGridParams.PageIndex,
					'rows': this.DateGridParams.PageSize
				};
//              let params = {
//					'categorys':340,
//					'goodsname':'海天黄豆酱_lqq',
//					'goodsstatus':'normal',
//					'hierarchytype': 1,
//					'base_info':1,//基本信息
//					'warehouse_info':99999999//仓库信息
//				};
				console.log('params',params);
				if(value == 'export') {
					this.exportFun();
				}else {
					this.hierarchytype = 1;
					this.exporDataParams = params;
					this.datagridOne.loading = true;
					this.BusinessSummaryStatistics(params);
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
					"className":"com.tzx.report.po.scm.dao.impl.GoodsExceptionInfoDaoImpl",//导出类路径
					"methodName":"getResult",//导出方法名
					"key":"report_date",// key的别名 第一层根据某列导出（列必须唯一）
					"parametertype":"String",//选中列的类型字符串传String
					"sort":"report_date",//导出第一层的排序
					"order":"asc",//？？？
					"level":"1",//？？？
					"derivedtype":2,//第二层是否需要分页
					"groupRow": 2,//导出是否展开层级  1展开 2不展开
					"hierarchy":1,//共导出几级数据
					"hbase_export":1//供应链导出必需参数
			   }
				this.getResult.getexportFun(param,this);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				_this[_this.DateGridParams['key']]['rows'] = [];
				_this[_this.DateGridParams['key']]['footer']=[];
				let SummaryStatisticsUrl = 'report/GoodsExceptionInfoRest/goodsExceptionInfo';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					if(result!=''){
						if(result.rows.length>0){
						result.rows.forEach((r)=>{
							let obj = {};
							for(let p in r){
								let lowercasep = p.toLowerCase();//将大写转换成小写
						            obj[lowercasep]=r[p];
							}
						_this[_this.DateGridParams['key']]['rows'].push(obj);	
						})
						}
						if(result.footer.length>0){
							result.footer.forEach((r)=>{
								let obj = {};
								for(let p in r){
									let lowercasep = p.toLowerCase();//将大写转换成小写
							            obj[lowercasep]=r[p];
								}
							_this[_this.DateGridParams['key']]['footer'].push(obj);	
							})
						}
						_this[_this.DateGridParams['key']]['loading'] = false;
						_this[_this.DateGridParams['key']]['total'] = result.total;
					}else{
						_this[_this.DateGridParams['key']]['loading'] = false;
						_this.$message({message: '暂无数据！',type: 'warning'});
					};
					
				});
			},
			SetDateGrid(params) {
				console.log('SetDateGrid', params);
				this.DateGridParams = params;
				this.hierarchytype = params['hierarchytype'];
				if(params['type'] == 'export') {
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				this.ParamsBusinessFun();
			},
			SetCustomData(CustomData) {
				let columns = customAjax.GetTableHeader(CustomData);
				this.$set(this.datagridOne, 'columns', []);
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() => {
					this.$set(this.datagridOne, 'columns', columns);
					this.datagridOne.loading = false;
					this.datagridOne.selection = !this.datagridOne.selection;
				}, 100);
			},
		}
	}
</script>

<style>
	.showResult {
		height: auto;
		padding: 20px;
		background: #ffffff;
		z-index: 1000;
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		box-shadow: 2px 2px 2px #999;
	}
	
	.showResult .el-checkbox {
		width: auto;
	}
	
	.checkgrouptitle {
		display: block;
		margin-bottom: 10px;
		margin-top: 10px;
	}
	
	.okbtn {
		margin-top: 10px;
	}
</style>