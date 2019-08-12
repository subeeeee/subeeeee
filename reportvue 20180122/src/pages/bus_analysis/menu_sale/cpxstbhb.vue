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
	
	export default{
		name:'cpxstbhb',
		components:{
			ParamsBusiness,
			datagrid,
		},
		data(){
			return{
				title:'菜品销售同比环比',
				report_num: 'SAAS_BI_2017_122',
				hierarchytype: 1,//级别
				exporDataParams:{},
				FoodSalesSummaryUrl:'report/foodSalesSummaryReportSirLiRest/getFoodSalesSummaryReport',
				DateGridParams:{
					key:'datagridOne',
					PageIndex:1,
					PageSize:20,
				},
				datagridOne: {
					loading: false,
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
			}
		},
		computed:{
			...mapGetters('cpxstbhb',['DataType','DishesType','StoreId','begin_data','end_data','itme_type','item_name','business_area','chanel_type','type_of_meal','item_property','price_system','class_id','start_time_interval','end_time_interval','shang','shangDate','tong','tongDate','is_recommendation','m_flag','yes_vip','class_interval','query_type']),
		},
		props:{
			NewSrc:{
				type:String,
				default:''
			}
		},
		created(){
			this.setReport_num(this.report_num);
			this.setexplainText(this.title);
			
			this.GetItmeTypeData();//类别选择
			this.GetDishesTypeData(0);//菜品类别
			this.GetItemNameData();//菜品名称
			this.GetBusinessAreaData();//营业区域
			this.GetMealPositionTypeData();//餐位类型
			this.GetPriceSystemData();//价格体系
			this.GetChanelTypeData();//销售渠道
			this.GetshiftData();//营业班次
		},
		methods:{
			...mapMutations('cpxstbhb',['setReport_num','setexplainText']),
			...mapActions('cpxstbhb',['GetItmeTypeData','GetDishesTypeData','GetItemNameData','GetBusinessAreaData','GetMealPositionTypeData','GetPriceSystemData','GetChanelTypeData','GetshiftData']),
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
				
				arrA = customAjax.GetTableHeaderFormatter(arrA);
				
				let hideFieldA = [
					'上期$dl_name','上期绝对值$dl_name','上期率$dl_name',
					'上期$xl_name','上期绝对值$xl_name','上期率$xl_name',
					'上期$item_num','上期绝对值$item_num','上期率$item_num',
					'上期$item_name','上期绝对值$item_name','上期率$item_name',
					'同期$dl_name','同期绝对值$dl_name','同期率$dl_name',
					'同期$xl_name','同期绝对值$xl_name','同期率$xl_name',
					'同期$item_num','同期绝对值$item_num','同期率$item_num',
					'同期$item_name','同期绝对值$item_name','同期率$item_name',
					
				];
				customAjax.GetHideField(arrA,hideFieldA);
				//定义目标均值集合
				let hideField = [];
				this.include_target == 0 && hideField.push('目标');
				this.include_refer == 0 && hideField.push('均值');
				customAjax.GetHideField(arrA, hideField, 'indexof', 'label');
				console.log('arrA',arrA);
				let arrB = customAjax.GetTableHeaderFormatter(arrA);
				setTimeout(() =>{					
					this.$set(this.datagridOne,'columns',arrB);
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
				if(params['key'] == 'datagridOne'){
					this.FindFun();
				}
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
				let timeSp = new Date(this.end_data).getTime() - new Date(this.begin_data).getTime();
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
				this.hierarchytype = 1;
				
				//查询
				this.FindFun();
			},
			GetDishesType(){
				//计算大类/小类
				let dl_lst = [];
				let xl_lst = [];
				this.DishesType.forEach((itemA, indexA) => {
					if(itemA['level'] == 3){
						xl_lst.push(itemA['data']['id']);
						let ids = itemA['parent']['data']['id'];
						if(dl_lst.indexOf(ids) == -1){
							dl_lst.push(ids);
						}
					}else if(itemA['level'] == 2){
						dl_lst.push(itemA['data']['id']);
					}
				});
				this.dlid = dl_lst;
				this.xlid = xl_lst;
			},
			FindFun(params = {}){
				//计算上期/同期时间
				this.GetTongAndShangDate();
				//重新更新表头
				this.SetCustomData();
				//计算大类/小类
				this.GetDishesType();
				let pps = {
					'class_selection':this.itme_type,//类别选择 
					'select_group_type':this.DataType == 'date'?'day':this.DataType,//查询类型
					'start_date':this.getTime(this.begin_data),//开始时间：2017-10-10
					'end_date':this.getTime(this.end_data),//结束时间：2017-10-10
					'store_ids':this.StoreId.join(','),//门店id：1,2,3
					'itme_type':this.itme_type,//类别选择
					'dlid':this.dlid.join(','),//菜品类别:1,2,3
					'xlid':this.xlid.join(','),//菜品类别:1,2,3
					'item_name':this.item_name.join(','),//菜品名称：12,13,878
					'business_area':this.business_area.join(','),//营业区域：744,746
					'type_of_meal':this.type_of_meal.join(','),//餐位类型：744,746
					'item_property':this.item_property.join(','),//餐品属性：SETMEAL,SINGLE
					'price_system':this.price_system.join(','),//价格体系
					'class_interval':this.class_interval,//按营业班次：班次：class ,时段:interval
					'class_id':this.class_id.join(','),//班次：1,3,4
					'start_time_interva':this.start_time_interval,// 开始时段
					'end_time_interval':this.end_time_interval,//结束时段
					'shang_strat_date':this.getTime(this.shang_strat_date)||'9999-09-09',//上期开始时间
					'shang_end_date':this.getTime(this.shang_end_date)||'9999-09-09',//上期结束时间
					'tong_strat_date':this.getTime(this.tong_strat_date)||'9999-09-09',//同期开始时间
					'tong_end_date':this.getTime(this.tong_end_date)||'9999-09-09',//同期结束时间
					'sq_parameter':(this.shang.indexOf('上期') > 0 ? 1: 0),//上期
					'sqjdz_parameter':(this.shang.indexOf('上期绝对值') > 0 ? 1: 0),//上期绝对值
					'sql_parameter':(this.shang.indexOf('上期率') > 0 ? 1: 0),//上期率
					'tq_parameter':(this.tong.indexOf('同期') > 0 ? 1: 0),//同期
					'tqjdz_parameter':(this.tong.indexOf('同期绝对值') > 0 ? 1: 0),//同期绝对值
					'tql_parameter':(this.tong.indexOf('同期率') > 0 ? 1: 0),//同期率
					'm_flag':this.m_flag,//合并显示：1 合并；0 不合并
					'is_recommendation':this.is_recommendation,//仅推荐菜：开启为0 关闭为1
					'yes_vip':this.yes_vip,//会员菜价格：0 为全部 1 会员价菜品
					'chanel_type':this.chanel_type.join(','),//销售渠道：EZZ14,EL09,CC04,MD01,WX02
					'page':this.DateGridParams['PageIndex'],
					'rows':this.DateGridParams['PageSize'],
				};
				for(let item in params){
					pps[item] = params[item];
				}
				console.log(pps);
				this.GetFoodSalesSummary(pps);
			},
			GetFoodSalesSummary(pps){
				let seft = this;
				this[this.DateGridParams['key']]['loading'] = true;
				this.getResult.getResult(this.FoodSalesSummaryUrl,pps,function(result){
					//返回主查询结果集
					console.log('主查询结果集',result);

					if(result['success'] != false){						
						seft[seft.DateGridParams['key']]['rows'] = result.rows;
						
						seft[seft.DateGridParams['key']]['footer'] = result.footer;

						seft[seft.DateGridParams['key']]['total'] = result.total;
					}
					seft[seft.DateGridParams['key']]['loading'] = false;
				});
			},
		}
	}
</script>

<style>
</style>