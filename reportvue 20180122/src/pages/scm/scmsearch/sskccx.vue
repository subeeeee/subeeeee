<template>
<div class="Realtimeinventoryquery">
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
    			@SetCellClick="SetCellClick"
	    		:datagridOne="datagridOne"
	    		:datagridTwo="datagridTwo"
	    		:datagridThree="datagridThree"
	    		ref="datagrid">
	    	</datagrid>
	    </el-col>
	</el-row>
	<sskccxDirll ref="sskccxDirll"></sskccxDirll>
</div>
</template>

<script>
	import customAjax from "@/components/custom/custom.js"
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import ParamsSupply from '@/components/SupplyChain/ParamsSupply'
	import datagrid from '@/components/datagrid/table1'
	import sskccxDirll from './sskccxDirll'
	export default{
		name:'sskccx',
		title:'实时库存查询',
		components:{
			ParamsSupply,
			datagrid,
			sskccxDirll
		},
		computed:{
			...mapGetters('sskccx',['DateTime','StoreId','depot','category','goods','BillType','BillNumber']),
		},
		data(){
			return {
				time:[],
				report_num:'SAAS_BI_2017_166',
				title:'实时库存查询',
				frpt_id:0,
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
			}
		},
		created(){
			this.setexplainText(this.title);
			this.setReport_num(this.report_num);
			this.getdepotData();
			this.getStoreData();
			this.getcategoryData();
		},
		methods:{
			...mapMutations('sskccx',['setexplainText','setReport_num']),
			...mapActions('sskccx',['getStoreData','getdepotData','getcategoryData']),
			ParamsBusinessFun(value){
				//console.log('params',params);
				//this.getRow();
				if(value == 'export'){
					this.exportFun();
				}else{
					this.hierarchytype =1;
					this.datagridOne.loading = true;
					let params = {
						begin_date: this.getResult.getTime(this.DateTime[0]),
						end_date: this.getResult.getTime(this.DateTime[1]),
						hierarchytype: this.hierarchytype,
						store_id:this.StoreId.join(','),//机构
						categorys:this.depot.join(','),//物品类别
						warehouse:this.category.join(','),//仓库
						goodsname:this.goods,//物品名称
						billscategory:this.BillType.join(','),//单据类型
						billnum:this.BillNumber,//单号
						page: this.DateGridParams.PageIndex,
						rows: this.DateGridParams.PageSize
					};
//					let params = {
//						begin_date: '2017-01-01',
//						end_date: '2019-01-01',
//						hierarchytype: 1,
//						store_id:'2',//机构 
//						categorys:'316',//物品类别
//						warehouse:'大库房',//仓库
//						goodsname:'白菜',//物品名称
//						billscategory:'',//单据类型
//						billnum:'',//单号
//						page: this.DateGridParams.PageIndex,
//						rows: this.DateGridParams.PageSize
//					};
					this.exporDataParams = params;
					console.log(params);
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
					"className":"com.tzx.report.po.scm.dao.impl.RealtimeInventoryQueryDaoImpl",//导出类路径
					"methodName":"getComparativeAnalysisOfBusinessSummary",//导出方法名
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
			
			SetCellClick(pps){
				//行点击
				console.log('行数据',pps);
				let gid = pps['rows']['iod.id'];//所点击的gid
				if(pps['column']['property'] == 'operation1'){
					//库存批次钻取
					this.$refs.sskccxDirll.Show('operation1',gid);
				}else if(pps['column']['property'] == 'operation2'){
					//库存流动钻取
					this.$refs.sskccxDirll.Show('operation2',gid);
				}
			},
			SetDateGrid(params){
				console.log('params',params);
				this.DateGridParams = params;
				this.hierarchytype = params['hierarchytype'];
				if(params['type'] == 'export'){
					//说明是导出
					//接受一级talbe传递过来需要导出的数据
					this.exportDateResult = params['selections'];
					return false;
				}
				this.ParamsBusinessFun();
			},

			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
					_this[_this.DateGridParams['key']]['rows'] = []; 
					_this[_this.DateGridParams['key']]['footer'] = [];
				let SummaryStatisticsUrl = '/report/RealtimeInventoryQueryRest/realtimeInventoryQuery';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
						if(result!=''){
							if(result.rows.length>0){
							result.rows.forEach((r)=>{
								let obj = {};
								for(let p in r){
									let lowercasep = p.toLowerCase();//将大写转换成小写
							            obj[lowercasep]=r[p];
								}
							obj['operation1'] = '库存批次';
						    obj['operation2'] = '库存流动';
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
					}
					
				});
			},
			SetCustomData(CustomData){
				let columns = customAjax.GetTableHeader(CustomData);
				columns.forEach((itemA, indexA) => {
					if(itemA['prop'] == 'operation'){
						itemA['children'].push({
							prop:'operation1',
							label:'z',
							width:80,
							fixed:false,
	    					align:'center',
	    					children:[],
	    					formatter:function(row, column, cellValue){return cellValue;}
						});
						itemA['children'].push({
							prop:'operation2',
							width:80,
							label:'x',
							fixed:false,
	    					align:'center',
	    					children:[],
	    					formatter:function(row, column, cellValue){return cellValue;}
						});
					}
				});
				this.$set(this.datagridOne,'columns',[]);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.loading = false;
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
				},100);
				
			},
			getRow(){
				let columns = this.datagridOne.columns;
				let row = [];
				for(let i = 1; i< 20; i++){
					let obj = {};
					columns.forEach((itemA, indexA) => {
						obj[itemA['prop']] = parseInt(Math.random()*1000);
					});
					obj['operation1'] = '库存批次';
					obj['operation2'] = '库存流动';
					row.push(obj);
				}
				this.$set(this.datagridOne,'columns',columns);
				this.$set(this[this.DateGridParams['key']],'rows',row);
				this.$set(this[this.DateGridParams['key']],'footer',[row[0]]);
			},
		}
	}
</script>

<style>
	.Realtimeinventoryquery .operation1-label>div.cell,
	.Realtimeinventoryquery .operation2-label>div.cell{
		display: none;
	}
	.Realtimeinventoryquery .operation-label{
		border-bottom: 0px!important;
		position: relative;
		overflow: visible;
	}
	.Realtimeinventoryquery .operation-label>div.cell{
		position: absolute;
		top: 15px;
		left: 0px;
		z-index: 10;
	}
	.Realtimeinventoryquery .operation1-label{
		border-right: 0px!important;
	}
	.Realtimeinventoryquery td.operation1-item>div.cell,
	.Realtimeinventoryquery td.operation2-item>div.cell{
		display: inline;
		border-bottom: 1px solid blue;
		color: blue;
	}
</style>