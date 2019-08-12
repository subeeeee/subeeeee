<template>
	<div class="SeniorQuery">
		<el-popover
			ref="popover2"
			popper-class="popper-SeniorQuery"
			placement="bottom"
			width="100%"
			trigger="click">
			<div class="SeniorQuery-item">
				<el-row class="params">
				   <el-col :span="24" :offset="0">
				   		<el-row class="SeniorQuery-children">
				   			<template v-if="Report_num == 'SAAS_BI_2016_38'">
				   				<el-col :span="12" :offset="0">
				   		    		<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
				   				<el-col :span="12" :offset="0">
				   		    		<span>交易机构:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>查询方式:</span>
							    	<span>
							    		<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>营业班次:</span>
							    	<span>
							    		<CheckboxRpt :checkboxId="'shiftId'"></CheckboxRpt>
						    		<!--<SelectRpt 
						    			:multiple="true"
						    			:selectId="'shiftId'"></SelectRpt>-->
							    	</span>
							    </el-col>
					   		</template>
						   
						    <template v-if="Report_num == 'SAAS_BI_2016_25'">	
								<el-col :span="12" :offset="0">
				   		    		<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
				   				<el-col :span="12" :offset="0">
				   		    		<span>交易机构:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>营业区域:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'BusinessArea'" 
							    			:multiple="true" 
							    			:placeholder="'请选择营业区域'"></SelectRpt>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>营业餐位:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'Businessmeal'" 
							    			:multiple="true" 
							    			:placeholder="'请选择营业餐位'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>营业桌位:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'BusinessTable'" 
							    			:multiple="true" 
							    			:placeholder="'请选择营业桌位'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>包含零值:</span>
							    	<span>
							    		<RadioRpt :radioId="'ZeroValue'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>营业班次:</span>
							    	<span>
							    		<CheckboxRpt :checkboxId="'shiftId'"></CheckboxRpt>
							    	<!--<SelectRpt 
						    			:multiple="true"
						    			:selectId="'shiftId'"></SelectRpt>-->
							    	</span>
							    </el-col>
							</template>
							
							<template v-if="Report_num == 'SAAS_BI_2017_02'">	
								<el-col :span="12" :offset="0">
				   		    		<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
				   				<el-col :span="12" :offset="0">
				   		    		<span>交易机构:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>查询方式:</span>
							    	<span>
							    		<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>收银员:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'Cashier'" 
							    			:multiple="true" 
							    			:placeholder="'请选择营业桌位'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>营业班次:</span>
							    	<span>
							    		<CheckboxRpt :checkboxId="'shiftId'"></CheckboxRpt>
							    	<!--<SelectRpt 
						    			:multiple="true"
						    			:selectId="'shiftId'"></SelectRpt>-->
							    	</span>
							    </el-col>
							    </template>
							
							<template v-if="Report_num == 'SAAS_BI_2016_29'">		
							    	<el-col :span="12" :offset="0">
					   		    		<span>交易时间:</span>
								    	<span>
								    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
								    	</span>
								    </el-col>
									<el-col :span="12" :offset="0">
					   		    		<span>标准门店:</span>
								    	<span>
								    		<MultiTree :StoreId="'StoreId'"></MultiTree>
								    	</span>
								    </el-col>
									<el-col :span="12" :offset="0">
					   		    		<span>对比门店:</span>
								    	<span>
								    		<MultiTree :StoreId="'ContrastId'"></MultiTree>
								    	</span>
								    </el-col>
									<el-col :span="12" :offset="0">
					   		    		<span>查询方式:</span>
								    	<span>
								    		<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
								    	</span>
								    </el-col>
								</template>
								
							<template v-if="Report_num == 'SAAS_BI_2016_37'">	
								<el-col :span="12" :offset="0">
				   		    		<span>交易时间:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>交易门店:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>查询方式:</span>
							    	<span>
							    		<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>时间粒度:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'time_interval'" 
							    			:placeholder="'请选择营业桌位'"></SelectRpt>
							    	</span>
							    </el-col>
							</template>
								
							<template v-if="Report_num == 'SAAS_BI_2016_13'">	
								<el-col :span="12" :offset="0">
				   		    		<span>交易时间:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>交易门店:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>查询方式:</span>
							    	<span>
							    		<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>查询内容:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true" 
							    			:selectId="'QueryVal'" 
							    			:placeholder="'请选择查询内容'"></SelectRpt>
							    	</span>
							    </el-col>
							    <template v-for="item in TimeIntervalindex">
								    <el-col :span="10" :offset="0">
								    	<TimeInterval :ref="'TimeInterval'+item" :index="item" :id="'TimeInterval'"></TimeInterval>
								    </el-col>
							    </template>
							</template>
								
							<template v-if="Report_num == 'SAAS_BI_2016_07'">	
								<el-col :span="12" :offset="0">
				   		    		<span>交易时间:</span>
							    	<span>
							    		<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>交易门店:</span>
							    	<span>
							    		<MultiTree :StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>注册门店:</span>
							    	<span>
							    		<MultiTree :StoreId="'RegisterId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="12" :offset="0">
				   		    		<span>交易渠道:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true" 
							    			:selectId="'transactionChannel'" 
							    			:placeholder="'请选择交易渠道'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>交易类型:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true" 
							    			:selectId="'transactionType'" 
							    			:placeholder="'请选择交易类型'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>会员等级:</span>
							    	<span>
							    		<SelectRpt 
							    			:selectId="'MemberGrade'" 
							    			:placeholder="'请选择会员等级'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>会员信息:</span>
							    	<span>
							    		<inputRpt 
							    			:inputId="'MemberInfo'" 
							    			:placeholder="'会员名称/手机号码/卡号'"></inputRpt>
							    	</span>
							    </el-col>
							</template>
				   		
				   			<template v-if="Report_num == 'SAAS_BI_2017_125'">
							    <el-col :span="12" :offset="0">
				   		    		<span>包含目标:</span>
							    	<span>
							    		<RadioRpt :radioId="'include_target'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>包含均值:</span>
							    	<span>
							    		<RadioRpt :radioId="'include_refer'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>同期数据:</span>
							    	<span>
							    		<momRpt :momId="'tong'"></momRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>上期数据:</span>
							    	<span>
							    		<momRpt :momId="'shang'"></momRpt>
							    	</span>
							    </el-col>
				   			</template>
				   			<template v-if="Report_num == 'SAAS_BI_2017_122'">	
				   				<el-col :span="12" :offset="0">
				   		    		<span>类别选择:</span>
							    	<span>
							    		<SelectRpt :selectId="'itme_type'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>菜品类别:</span>
							    	<span>
							    		<SelectTreeRpt 
							    			:SelectId="'DishesType'"></SelectTreeRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>菜品名称:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'item_name'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>营业区域:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'business_area'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>餐位类型:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'type_of_meal'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>餐品属性:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'item_property'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>价格体系:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'price_system'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>销售渠道:</span>
							    	<span>
							    		<SelectRpt 
							    			:multiple="true"
							    			:selectId="'chanel_type'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>会员价菜:</span>
							    	<span>
							    		<RadioRpt :radioId="'yes_vip'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>合并显示:</span>
							    	<span>
							    		<RadioRpt :radioId="'m_flag'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0">
				   		    		<span>仅推荐菜:</span>
							    	<span>
							    		<RadioRpt :radioId="'is_recommendation'"></RadioRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>同期数据:</span>
							    	<span>
							    		<momRpt :momId="'tong'"></momRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
				   		    		<span>上期数据:</span>
							    	<span>
							    		<momRpt :momId="'shang'"></momRpt>
							    	</span>
							    </el-col>
							    <el-col :span="12" :offset="0" class="width100">
							    	<span>
							    		<ShiftRpt :shiftId="'class_id'"></ShiftRpt>
							    	</span>
							    </el-col>
				   			</template>
				   		</el-row>
				   </el-col>
				</el-row>
				<el-row>
				    <el-col :span="24" :offset="0" class="senior-btn">
				    	<el-button type="primary" @click="SeniorQueryClick" class="query">查询</el-button>
				    	<el-button size="small" @click="SeniorQueryClose">取消</el-button>
				    	<el-button type="text" @click="ResetFun" size="small">重置</el-button>
				    </el-col>
				</el-row>
			</div>
		</el-popover>
		<el-button v-popover:popover2 type="text">高级查询</el-button>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import customAjax from "@/components/custom/custom.js"
	import QueryDatatime from '@/components/public/QueryDatatime'
	import QueryType from '@/components/public/QueryType'
	import MultiTree from '@/components/public/MultiTree'
	import CheckboxRpt from '@/components/public/CheckboxRpt'
	import RadioRpt from '@/components/public/RadioRpt'
	import SelectRpt from '@/components/public/SelectRpt'
	import SelectTreeRpt from '@/components/public/SelectTree'
	import momRpt from '@/components/public/momRpt'
	import inputRpt from '@/components/public/inputRpt'
	import ShiftRpt from '@/components/public/ShiftRpt'
	import TimeInterval from '@/components/businesssummary/TimeInterval1'
	import customRpt from './../custom/custom.vue'
	
	export default {
		name:'SeniorQuery',
		components:{
			QueryDatatime,
			SelectTreeRpt,
			QueryType,
			MultiTree, 
			TimeInterval,
			customRpt,
			CheckboxRpt,
			RadioRpt,
			SelectRpt,
			inputRpt,
			momRpt,
			ShiftRpt,
		},
		computed:{
			...mapGetters(['pageid']),
			...mapGetters('intervalprop',['TimeIntervalindex']),
			Report_num:{
				get:function(){
					let ids = this.pageid+"/Report_num";
					return this.$store.getters[ids];
				}
			},
			TimeIntervalindex:{
				get:function(){
					let ids = this.pageid+"/TimeIntervalindex";
					return this.$store.getters[ids]; 
				},
				set:function(value){
					let ids = this.pageid+"/setTimeIntervalindex";
					this.$store._mutations[ids][0](value);
				}
			}
		},
		data() {
			return {
			
			};
		},
		created(){
			
			
		},
		methods: {
			
			QueryTypeChange(value,text){
				//查询方式改变后的回调
				try{
					this.$emit('SeniorQueryFun','custom');
				}catch(e){}
			},
			SeniorQueryClick(){
				//确定
				this.$emit('SeniorQueryFun','query');
				this.$el.click();
			},
			SeniorQueryClose(){
				//取消
				this.$el.click();
			},
			ResetFun(){
				//重置 
				let ids = this.pageid+"/setDefault";
				this.$store._mutations[ids][0](0);
				if(this.Report_num == 'SAAS_BI_2016_13'){
					this.$refs.TimeInterval1[0]['SetDefault']();
				}
			}
		},

	}
</script>

<style lang="less">
	.popper-SeniorQuery{
		width: 100% !important;
		left: 161px !important;
		padding-bottom: 20px;
		margin-top: 0px!important;
		top: 90px !important;
		height: 100% !important;
		background-color: transparent;
		padding: 0px;
		border:0px;
	}
	.col20{
		clear:both;
		margin-left:0px !important;		
		width:90% !important;	
		}
	.SeniorQuery-item{
	    position: relative;
	    z-index: 10;
		background-color: white;
	}
	.SeniorQuery-children>.el-col{
		margin: 8px 0px;
		text-align: left;
	}
	.SeniorQuery-children>.el-col>span{
		display: inline-block;
		float: left;
	}
	.SeniorQuery-children>.el-col>span:nth-child(1){
		width: 60px;
		height: 30px;
		line-height: 30px;
		max-width:125px ;
		color: #576D7A;
		cursor: default;
		text-align: right;
		padding-right: 7px;
	}
	.SeniorQuery-children>.el-col:nth-child(2n-1){
		width: 350px;
		clear:left;
	}
	.SeniorQuery-children>.el-col:nth-child(2n){
		margin-left: 220px;
		margin-right: 5%;
	}
	.SeniorQuery-children .el-input,
	.SeniorQuery-children .el-input__inner{
		width: 230px!important;
		overflow: hidden;
	}
	.SeniorQuery-children{
		div.el-checkbox-group{
			margin-top: 5px !important;
		}
		label.el-checkbox{
			width: auto !important;
		}
		
	}
	
	.SeniorQuery-item>.el-row>.el-col{
		margin-left: 20px;
		width: 100%;
	}
	.senior-btn{
		margin-bottom: 20px;
	}
	.senior-btn>.el-button:nth-child(2):hover{
		background-color: transparent;
		border: 1px solid #20a0ff;
	}
	.senior-btn>.el-button:nth-child(2):hover>span{
		color: #20a0ff!important;
	}
	@media only screen and (min-width: 1700px) {
		.SeniorQuery-children>.el-col:nth-child(2n){
			margin-right: 1%;
			width: 60%;
		}
	}
	@media only screen and (max-width: 1220px) {
		.SeniorQuery-children>.el-col:nth-child(2n){
			margin-right: 1%;
			width: auto;
		}
	}
	@media only screen and (max-width: 900px) {
		.SeniorQuery-children>.el-col:nth-child(2n){
			margin-right: 1%;
			width: 100%;
			margin-left: 0px;
		}
	}
	@media only screen and (max-width: 100px) {
		.SeniorQuery-children>.el-col:nth-child(2n){
			margin-right: 1%;
			width: 60%;
		}
	}
	.width100{
		width: 95%!important;
		margin-left: 0px!important;
	}
</style>