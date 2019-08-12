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
				   			<template v-if="Report_num == 'SAAS_BI_2017_164'">
					   		    <el-col :span="10" :offset="0" >
					   		    	<span>物品分类:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'dishesType'"
											:multiple="true"
											:placeholder="'请选择物品分类'"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>菜品名称:</span>
							    	<span>
							    		<inputRpt
											:inputId="'dishesName'"
											:placeholder="'请输入菜品名称'"></inputRpt>
							    	</span>
							    </el-col> 
							    <el-col :span="10" :offset="0" >
					   		    	<span>业务状态:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'BusinessState'"
											:multiple="true"
											:placeholder="'请选择业务状态'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>仓库信息:</span>
							    	<span>
							    		<CheckboxRpt 
											:checkboxId="'checkcondition2'"
											ref="CheckboxRpt2"></CheckboxRpt>
							    	</span>
							    </el-col> 
							    <el-col :span="10" :offset="0" class="width100">
					   		    	<span>基本信息:</span>
							    	<span>
							    		<CheckboxRpt 
											:checkboxId="'checkcondition1'"
											ref="CheckboxRpt1"></CheckboxRpt>
							    	</span>
							    </el-col>
				   			</template>
				   			
				   			<template v-if="Report_num == 'SAAS_BI_2017_165'">
				   				<el-col :span="10" :offset="0" >
					   		    	<span>操作日期:</span>
							    	<span>
							    		<QueryDatatime
											:DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>菜品分类:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'dishesType'"
											:multiple="true"
											:placeholder="'请选择菜品分类'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col> 
							    
				   				<el-col :span="10" :offset="0" >
					   		    	<span>业务状态:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'BusinessState'"
											:multiple="true"
											:placeholder="'请选择业务状态'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
								<el-col :span="10" :offset="0" >
					   		    	<span>菜品名称:</span>
							    	<span>
							    		<inputRpt
											:inputId="'dishesName'"
											:placeholder="'请输入菜品名称'"
											ref="inputRpt"></inputRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>操作人:</span>
							    	<span>
							    		<inputRpt
											:inputId="'Operator'"
											:placeholder="'支持按姓名/登录账号进行搜索'"></inputRpt>
							    	</span>
							    </el-col> 
								<el-col :span="10" :offset="0" class="width100">
					   		    	<span>物品属性:</span>
							    	<span>
							    		<CheckboxRpt 
											:checkboxId="'goodsAttr'"
											ref="CheckboxRpt1"></CheckboxRpt>
							    	</span>
							    </el-col>
				   			</template>
				   			
				   			
				   			<template v-if="Report_num == 'SAAS_BI_2017_166'">				   				
				   				<el-col :span="10" :offset="0">
					   		    	<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime
											:DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0">
					   		    	<span>机构:</span>
							    	<span>
							    		<MultiTree
											:StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="10" :offset="0">
					   		    	<span>仓库:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'depot'"
											:multiple="true"
											:placeholder="'请选择仓库'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0">
					   		    	<span>类别:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'category'"
											:multiple="true"
											:placeholder="'请选择类别'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0">
					   		    	<span>物品:</span>
							    	<span>
							    		<inputRpt
											:inputId="'goods'"
											:placeholder="'支持按菜品编码和名称搜索'"></inputRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>单据类型:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'BillType'"
											:multiple="true"
											:placeholder="'请选择单据类型'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
			                    <el-col :span="10" :offset="0" >
					   		    	<span>单号:</span>
							    	<span>
							    		<inputRpt
											:inputId="'BillNumber'"
											:placeholder="'支持模糊搜索'"></inputRpt>
							    	</span>
							    </el-col>
				   			</template>
				   			
				   			<template v-if="Report_num == 'SAAS_BI_2017_170'">
				   				<el-col :span="10" :offset="0">
					   		    	<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime
											:DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
				   				<el-col :span="10" :offset="0">
					   		    	<span>收货机构:</span>
							    	<span>
							    		<MultiTree
											:StoreId="'StoreId'"></MultiTree>
							    	</span>
							    </el-col>
								<el-col :span="10" :offset="0">
					   		    	<span>收货仓库:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'receiptDepot'"
											:multiple="true"
											:placeholder="'请选择仓库'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
								<el-col :span="10" :offset="0">
					   		    	<span>供应商:</span>
							    	<span>
							    		<SelectRpt 
										:selectId="'Supplier'"
										:multiple="true"
										:placeholder="'请选择供应商'"
										ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>单号:</span>
							    	<span>
							    		<inputRpt
											:inputId="'BillNumber'"
											:placeholder="'支持模糊搜索'"></inputRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>物品类别:</span>
							    	<span>
							    		<SelectRpt 
											:selectId="'goodsType'"
											:multiple="true"
											:placeholder="'请选择物品类别'"
											ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col> 
							    <el-col :span="10" :offset="0" >
					   		    	<span>物品:</span>
							    	<span>
							    		<inputRpt
											:inputId="'goods'"
											:placeholder="'支持模糊搜索'"></inputRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>查询方式:</span>
							    	<span>
							    		<QueryType 
							    			@QueryTypeChange="QueryTypeChange" 
							    			ref="QueryType"></QueryType>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" class="width100">
					   		    	<span>分列方式:</span>
							    	<span>
							    		<RadioRpt 
											:radioId="'BreakdownType'"
											ref="BreakdownType"></RadioRpt>
							    	</span>
							    </el-col>
				   			</template>
				   			
				   			<template v-if="Report_num == 'SAAS_BI_2017_163'">
				   				<el-col :span="10" :offset="0">
					   		    	<span>交易日期:</span>
							    	<span>
							    		<QueryDatatime
											:DateTimeId="'DateTime'"></QueryDatatime>
							    	</span>
							    </el-col>
								<el-col :span="10" :offset="0">
					   		    	<span>供应商:</span>
							    	<span>
							    		<!--<MultiTree
											:StoreId="'Supplier'"></MultiTree>-->
										<SelectRpt 
										:selectId="'Supplier'"
										:multiple="true"
										:placeholder="'请选择供应商'"
										ref="SelectRpt"></SelectRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>物品:</span>
							    	<span>
							    		<inputRpt
											:inputId="'goods'"
											:placeholder="'支持模糊搜索'"></inputRpt>
							    	</span>
							    </el-col>
							    <el-col :span="10" :offset="0" >
					   		    	<span>单号:</span>
							    	<span>
							    		<inputRpt
											:inputId="'BillNumber'"
											:placeholder="'支持模糊搜索'"></inputRpt>
							    	</span>
							    </el-col>
				   			</template>
						   <!-- <el-col :span="10" :offset="0" 
						     	v-if="Report_num == 'SAAS_BI_2017_170'">
						    	<span>查询方式</span>
						    	<span>
						    		<QueryType 
						    			@QueryTypeChange="QueryTypeChange" 
						    			ref="QueryType">
						    		</QueryType>
						    	</span>
						   </el-col>-->
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
		<el-button @click="gjcx" v-popover:popover2 type="text">高级查询</el-button>
		<customRpt
			@GetReportCustomFun="GetReportCustomFun"
			:CustomVisible="CustomVisible"
			ref="customRpt"
			:report_num="Report_num"></customRpt>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import customAjax from "@/components/custom/custom.js"
	import QueryDatatime from './../public/QueryDatatime'
	import MultiTree from './../public/MultiTree'
	import customRpt from './../custom/custom.vue'
	import SelectTree from '@/components/public/SelectTree'
	import SelectRpt from '@/components/public/SelectRpt'
	import inputRpt from '@/components/public/inputRpt'
	import CheckboxRpt from '@/components/public/CheckboxRpt'
	import RadioRpt from '@/components/public/RadioRpt'
	import QueryType from '@/components/public/QueryType'
	
	export default {
		name:'SeniorQuery',
		components:{
			QueryDatatime,
			MultiTree, 
			customRpt,
			SelectTree,
			QueryType,
			SelectRpt,
			inputRpt,
			CheckboxRpt,
			RadioRpt
		},
		computed:{
			...mapGetters(['pageid']),
			Report_num:{
				get:function(){
					let ids = this.pageid+"/Report_num";
					return this.$store.getters[ids];
				},
			}
		},
		data() {
			return {
				CustomVisible:false,
				placeholder:'选择仓库',
				QueryType:1,//查询方式
		        operate_date: '',//操作日期
		        goodsproperty:[],//物品属性
		        operate_name:'',//操作人
		        convenient_date:'',//快速日期
		        
			};
		},
		methods: {
			gjcx(){
				//高级查询点击
				try{
					this.$refs.MultiTree.showPopover();
				}catch(e){}
			},
			SeniorQueryClick(){
				//确认
				this.$el.click();
				this.$emit('BtnClick','SeniorQuery',this.QueryType);
			},
			SeniorQueryClose(){
				//取消
				this.$el.click();
			},
			ResetFun(){
				//重置
				let ids = this.pageid+"/setDefault";
				this.$store._mutations[ids][0](0);
			},
			GetReportCustomFun(headerArr){
				this.$emit('GetReportCustomFun',headerArr);
			},
			QueryTypeChange(value){
				//查询方式
				this.QueryType = value;
				this.$refs.customRpt.StartPage(value);
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
	.SeniorQuery-item .wholerow{
		margin-left:0px !important;
		clear: both;
		width:85% !important;
	}
	.SeniorQuery-icon .el-input__icon{
		line-height: 20px;
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
	@media only screen and (max-width: 1100px) {
		.SeniorQuery-children>.el-col{
			margin-right: 1%;
			width: 95%!important;
			margin-left: 0px!important;
		}
	}
	@media only screen and (max-width: 1000px) {
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