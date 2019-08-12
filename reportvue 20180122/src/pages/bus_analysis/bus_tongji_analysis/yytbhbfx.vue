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
		name:'yytbhbfx',
		components:{
			ParamsBusiness,
			datagrid,
		},
		computed:{
			...mapGetters('yytbhbfx',['DataType','begin_data','end_data','shang','tong','shangDate','tongDate','include_target','include_refer','StoreId','query_type']),
		},
		data() {
			return {
				title:'营业同比环比分析',
				report_num: 'SAAS_BI_2017_125',
				hierarchytype: 1,//级别
				exporDataParams:{},
				MomUrl:'report/businessSummaryYearMomReportSirLiRest/getBusinessSummaryYearMom',
				DateGridParams:{
					key:'datagridOne',
					PageIndex:1,
					PageSize:20,
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
		created() {
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			//this.GetStoreIdData();
		},
		methods: {
			...mapMutations('yytbhbfx',['setReport_num','setexplainText']),
			...mapActions('yytbhbfx',['GetStoreIdData']),
			SetCustomData(CustomData = []){
				
				
				if(CustomData.length == 0){
					CustomData = customAjax.getHeaderData();
				}
				let columns = customAjax.GetTableHeader(CustomData);
				let arrA = [];
				let benA = {'prop':'','label':'本期数据','children':JSON.parse(JSON.stringify(columns))};
				arrA.push(benA);
				this.$set(this.datagridOne,'columns',[]);
				this.$set(this.datagridOne,'rows',[]);
				this.datagridOne.open = !this.datagridOne.open;
				this.datagridOne.selection = !this.datagridOne.selection;
				
				this.shang.forEach((itemA, indexA) => {
					arrA.push({
						'prop':'',
						'label':itemA,
						'children':JSON.parse(JSON.stringify(columns))
					});
				});
				this.tong.forEach((itemA, indexA) => {
					arrA.push({
						'prop':'',
						'label':itemA,
						'children':JSON.parse(JSON.stringify(columns))
					});
				});
				
				let GetAddField = (arr, name) =>{
					arr.forEach((items, index) => {
						if(name && name != '本期数据'){
							items['prop'] = name + '$' + items['prop'];
							if(name == '上期率' || name == '同期率'){
								items['data_type'] = 'percentage';
							}
						}
						if(items['children'].length > 0){
							GetAddField(items['children'], name);
						}
					});
				};
				arrA.forEach((item, index) => {
					index > 0 && GetAddField(item['children'], item['label']);
				});
				
				//定义目标均值集合
				let hideField = [];
				this.include_target == 0 && hideField.push('目标');
				this.include_refer == 0 && hideField.push('均值');
				customAjax.GetHideField(arrA, hideField, 'indexof', 'label');
				console.log('arrA',arrA);
				let arrB = customAjax.GetTableHeaderFormatter(arrA);
				
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',arrB);
					this.datagridOne.loading = false;
					this.datagridOne.open = !this.datagridOne.open;
					this.datagridOne.selection = !this.datagridOne.selection;
				},100);
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
				this.hierarchytype = params.hierarchytype;
				if(params['key'] == 'datagridOne'){
					this.FindFun();
				}else if(params['key'] == 'datagridTwo'){
					if(this.query_type == 1){	
						//查询二级
						let pps ={
							end_date:params['rows']['report_date'],
							start_date:params['rows']['report_date']
						};
						this.FindFun(pps);
					}else{
						let pps ={
							store_ids:params['rows']['store_id']
						};
						this.FindFun(pps);
					}
				}
			},
			
			
			ParamsBusinessFun(type){
				if(type == 'export'){
					//导出
					return false;
				}
				if(this.query_type == 1){
					this.sort = 'report_date';
				}else{
					this.sort = 'store_id';
				}
				this.DateGridParams = {
					key:'datagridOne',
					PageIndex:1,
					PageSize:20,
				};
				this.hierarchytype = 1;
				//计算上期/同期时间
				this.GetTongAndShangDate();
				//重新更新表头
				this.SetCustomData();
				//查询
				this.FindFun();
			},
			getYearWeek(time) {
				time = new Date(time);
				var d = 0;
				var date2 = new Date(time.getFullYear(), 0, 1);
				var day1 = time.getDay();
				if(day1 == 0) day1 = 7;
				var day2 = date2.getDay();
				if(day2 == 0) day2 = 7;
				d = Math.round((time.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
				return time.getFullYear() + '-' + Math.ceil(d / 7);
			},
			getTime(time) {
				if(!time){
					return '';
				}
				time = new Date(time || new Date());
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				if(this.DataType == 'date') {
					return year + '-' + month + '-' + day;
				} else if(this.DataType == 'week') {
					return this.getYearWeek(time);
				} else if(this.DataType == 'month') {
					return year + '-' + month;
				} else if(this.DataType == 'quarter') {
					return year + '-' + month;
				} else if(this.DataType == 'year') {
					return year;
				}
			},
			GetTongAndShangDate(){
				//计算上期/同期时间
				this.shang_strat_date = '';//初始化上期开始时间
				this.shang_end_date = '';//初始化上期结束时间
				this.tong_strat_date = '';//初始化同期开始时间
				this.tong_end_date = '';//初始化同期结束时间
				//获取时间差
				let timeSp = this.end_data.getTime() - this.begin_data.getTime();
				if(this.shang.length > 0){
					//保证选择了上期数据，好计算上期结束时间
					//上期开始时间
					this.shang_strat_date = this.getResult.getTime(this.shangDate);
					//计算上期的结束时间
					let tmB = new Date(this.shangDate).getTime() + timeSp;
					//上期的结束时间
					this.shang_end_date = this.getResult.getTime(tmB);
				}
				if(this.tong.length > 0){
					//保证选择了同期数据，好计算同期结束时间
					//同期开始时间
					this.tong_strat_date = this.getResult.getTime(this.tongDate);
					//计算同期的结束时间
					let tmB = new Date(this.tongDate).getTime() + timeSp;
					//上期的结束时间
					this.tong_end_date = this.getResult.getTime(tmB);
				}
			},
			FindFun( params = {}){
				let seft = this;
				let pps = {
					'select_group_type':this.DataType == 'date'?'day':this.DataType,//查询类型
					'start_date':this.getTime(this.begin_data),//开始时间：2017-10-10
					'end_date':this.getTime(this.end_data),//结束时间：2017-10-10
					'store_ids':this.StoreId.join(','),//门店id：1,2,3
					'selectType':this.query_type,//日期:1 ; 门店：2
					'sq_parameter':(this.shang.indexOf('上期') == -1 ? 0 :1),//上期：不选：0；选择：1
					'sqjdz_parameter':(this.shang.indexOf('上期绝对值') == -1 ? 0 :1),//上期绝对值：不选：0；选择：1
					'sql_parameter':(this.shang.indexOf('上期率') == -1 ? 0 :1),//上期率：不选：0；选择：1
					'tq_parameter':(this.tong.indexOf('同期') == -1 ? 0 :1),//同期：不选：0；选择：1
					'tqjdz_parameter':(this.tong.indexOf('同期绝对值') == -1 ? 0 :1),//同期绝对值：：不选：0；选择：1
					'tql_parameter':(this.tong.indexOf('同期率') == -1 ? 0 :1),//同期率：不选：0；选择：1
					'shang_strat_date':this.getTime(this.shang_strat_date)||'9999-09-09',//上期开始时间
					'shang_end_date':this.getTime(this.shang_end_date)||'9999-09-09',//上期结束时间
					'tong_strat_date':this.getTime(this.tong_strat_date)||'9999-09-09',//同期开始时间
					'tong_end_date':this.getTime(this.tong_end_date)||'9999-09-09',//同期结束时间
					'hierarchytype':this.hierarchytype,//查询层级关系
					'include_target':this.include_target,//包含目标：1 是；0： 否
					'include_refer':this.include_refer,//包含均值：1： 是 0：否
					'sort':this.sort,//排序方式
					'page':this.DateGridParams['PageIndex'],
					'rows':this.DateGridParams['PageSize'],
				};
				
				for(let item in params){
					pps[item] = params[item];
				}
				if(seft.DateGridParams['key'] == 'datagridOne'){
					this.exporDataParams = pps;
				}
				
				this[this.DateGridParams['key']]['loading'] = true;
				this.getResult.getResult(this.MomUrl,pps,function(result){
					//返回主查询结果集
					console.log('主查询结果集',result);
					
					if(pps.selectType == 1 && pps.hierarchytype == 2){
						//按交易日期查询-查询二级=>需要隐藏交易日期数据
						result.rows&&result.rows.forEach((itemA, indexA) =>{
							itemA['report_date'] = '';
						});
					}
					
					//seft.datagridOne.columns
					if(result['success'] != false){
						seft[seft.DateGridParams['key']]['rows'] = result.rows;
						seft[seft.DateGridParams['key']]['footer'] = result.footer;
						seft[seft.DateGridParams['key']]['total'] = result.total;
						seft[seft.DateGridParams['key']]['loading'] = false;
					}else{
						seft[seft.DateGridParams['key']]['loading'] = false;
					}
				});
			}
		}
	}
</script>

<style>

</style>