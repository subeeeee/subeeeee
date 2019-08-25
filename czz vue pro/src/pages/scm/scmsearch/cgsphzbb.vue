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
	    	<el-col :span="24" :offset="0">
	    		<div v-if="QueryType == 1" id="pieRpt_Purchasegoods"></div>
	    		<div v-if="QueryType == 2" id="lineRpt_Purchasegoods"></div>
	    	</el-col>
	    	<el-col :span="24" :offset="0">
	    		<datagrid 
	    			@SetDateGrid="SetDateGrid"
		    		:datagridOne="datagridOne"
		    		:datagridTwo="datagridTwo"
		    		:datagridThree="datagridThree"
		    		ref="datagrid">
	    		</datagrid>
	    	</el-col>
	    	
	    </el-col>
	</el-row>
</div>
</template>

<script>
	import {pieRpt} from '@/components/echarts/pieRpt'
	import {barRpt} from '@/components/echarts/barRpt'
	import customAjax from "@/components/custom/custom.js"
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import ParamsSupply from '@/components/SupplyChain/ParamsSupply'
	import datagrid from '@/components/datagrid/table1'
	export default{
		name:'cgsphzbb',
		title:'采购商品汇总报表',
		components:{
			ParamsSupply,
			datagrid
		},
		computed:{
			...mapGetters('cgsphzbb',['DateTime','StoreId','receiptDepot','Supplier','BillType','BillNumber','goodsType','goods','BreakdownType','query_type']),
			QueryType:{
				get:function(){
					return this.query_type;
				}
			}
		},
		data(){
			return {
				report_num:'SAAS_BI_2017_170',
				title:'采购商品汇总报表',
				hierarchytype:1,
				DateGridParams:{
					'key':'datagridOne'
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
			this.getreceiptDepotData();
			this.getgoodsTypeData();
			//this.getBillTypeData();
			this.getStoreData();
			this.getSupplierData();
		},
		mounted(){
			this.GetEcharts();
		},
		methods:{
			...mapMutations('cgsphzbb',['setexplainText','setReport_num']),
			...mapActions('cgsphzbb',['getStoreData','getreceiptDepotData','getgoodsTypeData','getSupplierData']),
			GetEcharts(){
				if(this.query_type == 1){
					let data = {data1:[],data2:[],seriesName:'物品类型'};
                    data['data1']=[
                    {
                     value:1334,
                     name:'蔬菜类'
                    },
                    {
                     value:853,
                     name:'鲜肉类'
                    },
                    {
                     value:1204,
                     name:'冻品类'
                    },
                    {
                     value:455,
                     name:'粮油类'
                    },
                    {
                     value:346,
                     name:'其他'
                    }
                    ];
                    data['data2']=['物品1','物品2','物品3','物品4','其他'];
					data['id'] = 'pieRpt_Purchasegoods';
					pieRpt(data);
				}else{
					let dt = [
					    {
					      name:'进货金额',
					      stack:1,
					      data:[234,134,133,467,13]
					    },
					    {
					      name:'退货金额',
					      stack:2,
					      data:[134,234,103,267,83]
					    }
					 ];
					let ldata = ['进货金额','退货金额',];//供应商;
					let xAxisData = ['供应商A','供应商B','供应商C','供应商D','供应商E'];
					let data = {
						id:'lineRpt_Purchasegoods',
						xAxisData:xAxisData,
						yinverse:false,
						xname:'供应商',
						ldata:ldata,
						data:dt,
					}
					//barRpt(data);
				}
			},
			ParamsBusinessFun(value){
				//this.GetEcharts();
				//this.getRow();
				let params = {
					'begin_date': this.getResult.getTime(this.DateTime[0]),
					'end_date': this.getResult.getTime(this.DateTime[1]),
					'store_id':this.StoreId.join(','),//收货机构
					'warehouse':this.receiptDepot,//收货仓库
					'supplier_code':this.Supplier,//供应商
					'billscategory':this.BillType,//单据类型
					'billnum':this.BillNumber,//单号
					'categorys':this.goodsType,//物品类别
					'item_name':this.goods,//物品名称
					'class_type':99999999,//分类方式
					'selectType':this.query_type,//查询方式
					'hierarchytype': this.hierarchytype,
					'page': this.DateGridParams.PageIndex,
					'rows': this.DateGridParams.PageSize
				};
//				let params = {
//					'begin_date': '2017-01-01',
//					'end_date': '2019-01-01',
//					'store_id':'1',//收货机构
//					'warehouse':'一号仓',//收货仓库
//					'supplier_code':'001',//供应商
//					'billscategory':'bill_status_has_audit',//单据类型
//					'billnum':'DH0101027512201612110001',//单号
//					'categorys':'316',//物品类别
//					'item_name':'东北五常大米1',//物品名称
//					'class_type':'AAAAA',//分类方式
//					'selectType':this.query_type,//查询方式
//					'hierarchytype': 1
//				};
				
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
					"className":"com.tzx.report.po.scm.dao.impl.PurchaseCommoditySummaryDaoImpl",//导出类路径
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
				_this[_this.DateGridParams['key']]['rows']=[];
				_this[_this.DateGridParams['key']]['footer']=[];
				let SummaryStatisticsUrl = 'report/PurchaseCommoditySummaryRest/purchaseCommoditySummary';
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
					if(_this.query_type == 1){
						let data = {data1:[],data2:[],seriesName:'物品类型'};
	                    data['data1']=result.chartData.data1;
	                    data['data2']=result.chartData.data2;
						data['id'] = 'pieRpt_Purchasegoods';
						pieRpt(data);
					}else{
						let data = {
							id:'lineRpt_Purchasegoods',
							xAxisData:result.chartData.xAxisData,
							yinverse:false,
							xname:'供应商',
							ldata:result.chartData.ldata,
							data:result.chartData.dt,
						}
						barRpt(data);
					   }
					}else{
						_this[_this.DateGridParams['key']]['loading'] = false;
						_this.$message({message: '暂无数据！',type: 'warning'});
					}
				});
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
		}
	}
</script>

<style>
	#pieRpt_Purchasegoods,
	#lineRpt_Purchasegoods{
		width: 95%;
		height: 300px;
	}
</style>