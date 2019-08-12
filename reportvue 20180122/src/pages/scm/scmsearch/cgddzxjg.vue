<template>
<div class="">
	<el-row style="height: 100%;overflow: auto;">
	    <el-col :span="24" :offset="0">
	    	<ParamsSupply 
	    		@ParamsBusinessFun="ParamsBusinessFun"
	    		@SetCustomData="SetCustomData"
	    		ref="ParamsSupply"></ParamsSupply>
	    </el-col>
	    <el-col :span="24" :offset="0" class="querycontext">
	    	<el-row>
	    	    <el-col :span="24" :offset="0">
	    	    	<div id="barRptItem" class="barRpt-item"></div>
	    	    </el-col>
	    	    <el-col :span="24" :offset="0" class="alignC">
	    	    	<div class="PurchasegoodsItem">
		    	    	<datagrid 
			    			@SetDateGrid="SetDateGrid"
			    			@SetCellClick="SetCellClick"
				    		:datagridOne="datagridOne"
				    		:datagridTwo="datagridTwo"
				    		:datagridThree="datagridThree"
				    		ref="datagrid"></datagrid>
	    	    	</div>
	    	    </el-col>
	    	</el-row>
	    </el-col>
	</el-row>
    <cgddzxjgDrill ref="cgddzxjgDrill"></cgddzxjgDrill>
</div>
</template>

<script>
	import {barRpt} from '@/components/echarts/barRpt'
	import customAjax from "@/components/custom/custom.js"
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import ParamsSupply from '@/components/SupplyChain/ParamsSupply'
	import datagrid from '@/components/datagrid/table1'
	import cgddzxjgDrill from './cgddzxjgDrill'
	export default{
		name:'cgddzxjg',
		title:'采购订单执行结果',
		components:{
			ParamsSupply,
			datagrid,
			cgddzxjgDrill
		},
		computed:{
			...mapGetters('cgddzxjg',['DateTime','Supplier','BillNumber','goods']),
		},
		
		mounted(){
			let dt = [
			    {
			      name:'及时率',
			      stack:1,
			      data:[34,34,33,67,13]
			    },
			    {
			      name:'到货率',
			      stack:1,
			      data:[-34,-23,-10,-27,-83]
			    }
			 ];
			let ldata = ['到货率','及时率'];//到货率/及时率;
			let xAxisData = ['供应商A','供应商B','供应商C','供应商D','供应商E'];
			let data = {
				id:'barRptItem',
				xAxisData:xAxisData,
				yinverse:true,
				xname:'供应商',
				ldata:ldata,
				data:dt,
			};
		    barRpt(data);
		},
		data(){
			return {
				report_num:'SAAS_BI_2017_163',
				title:'采购订单执行结果',
				frpt_id:0,
				hierarchytype:1,
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
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			this.getSupplierData();
		},
		methods:{
			...mapMutations('cgddzxjg',['setReport_num','setexplainText']),
			...mapActions('cgddzxjg',['getSupplierData']),
			ParamsBusinessFun(value){
				let params = {
					'begin_date': this.getResult.getTime(this.DateTime[0]),
					'end_date': this.getResult.getTime(this.DateTime[1]),
					'supplier_code':this.Supplier,
					'billnum':this.BillNumber,
					'goodsname':this.goods,
					'hierarchytype': this.hierarchytype,
					'page': this.DateGridParams.PageIndex,
					'rows': this.DateGridParams.PageSize
				};
//				let params = {
//					'begin_date': '2017-01-01',
//					'end_date': '2018-01-01',
//					'supplier_code':'001',
//					'billnum':'DH0101027512201612110001',
//					'goodsname':'东北五常大米1',
//					'hierarchytype': 1,
//					'page': this.DateGridParams.PageIndex,
//					'rows': this.DateGridParams.PageSize
//				};
				console.log('params',params);
				if(value == 'export'){
					this.exportFun();
				}else{
					if(params.hierarchytype == 1) {
						this.exporDataParams = params;
				    }
					this.datagridOne.loading = true;
					this.BusinessSummaryStatistics(params);
					//this.getRow();
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
					"className":"com.tzx.report.po.scm.dao.impl.PurchaseOrderExecuteResultDaoImpl",//导出类路径
					"methodName":"getResult",//导出方法名
					"key":"SCM_ORDER",// key的别名 第一层根据某列导出（列必须唯一）
					"parametertype":"String",//选中列的类型字符串传String
					"sort":"SCM_ORDER",//导出第一层的排序
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
				if(pps['column']['property'] == 'scm_order'){
					let scm_order = pps['rows']['scm_order'];//所点击的gid
					this.$refs.cgddzxjgDrill.Show(scm_order);
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
				this.ParamsBusinessFun();
			},
			SetCustomData(CustomData){
				let columns = customAjax.GetTableHeader(CustomData);
				this.$set(this.datagridOne,'columns',[]);
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',columns);
					this.datagridOne.loading = false;
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
					row.push(obj);
				}
				this.$set(this[this.DateGridParams['key']],'rows',row);
				this.$set(this[this.DateGridParams['key']],'footer',[row[0]]);
			},
			//请求接口
			BusinessSummaryStatistics(p) {
				let _this = this;
				_this[_this.DateGridParams['key']]['rows']=[];
				_this[_this.DateGridParams['key']]['footer']=[];
				let SummaryStatisticsUrl = '/report/PurchaseOrderExecuteResultRest/purchaseOrderExecuteResult';
				this.getResult.getResult(SummaryStatisticsUrl, p, function(result) {
					
                    if(result!=''){
                    	let chartDt = {
						id:'barRptItem',
						xAxisData:result.chartData.xAxisData,
						yinverse:true,
						xname:'供应商',
						ldata:result.chartData.ldata,
						data:result.chartData.dt,
			            };
		                barRpt(chartDt);
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
			
		}
	}
</script>

<style>
	.PurchasegoodsItem{
		width: 75%;
		display: inline-block;
	}
	.barRpt-item{
		height: 300px;
		width: 95%;
		margin-left: 3.5%;
	}
td.scm_order-item:not(:first-child)>div.cell{
	width: auto!important;
	color: #0C9AFF;
	min-width: 0px!important;
	display: initial!important;
}
</style>