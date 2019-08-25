<template>
	<div class="params SupplyChain">
		
		<template v-if="Report_num == 'SAAS_BI_2017_163'">
			<QueryDatatime
				:DateTimeId="'DateTime'"></QueryDatatime>
			<!--<MultiTree
				:StoreId="'Supplier'"></MultiTree>-->
				<SelectRpt 
				:selectId="'Supplier'"
				:multiple="true"
				:placeholder="'请选择供应商'"
				ref="SelectRpt"></SelectRpt>
			<inputRpt
				:inputId="'BillNumber'"
				:placeholder="'请输入单号/支持模糊搜索'"
				ref="inputRpt"></inputRpt>
		</template>
		
		<template v-if="Report_num == 'SAAS_BI_2017_164'">
			<SelectRpt 
				:selectId="'dishesType'"
				:multiple="true"
				:placeholder="'请选择物品分类'"
				ref="SelectRpt"></SelectRpt>
			<inputRpt
				:inputId="'dishesName'"
				:placeholder="'请输入菜品名称'"
				ref="inputRpt"></inputRpt>
			<SelectRpt 
				:selectId="'BusinessState'"
				:multiple="true"
				:placeholder="'请选择业务状态'"
				ref="SelectRpt"></SelectRpt>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2017_165'">
			<QueryDatatime
				:DateTimeId="'DateTime'"></QueryDatatime>
			<SelectRpt 
				:selectId="'dishesType'"
				:multiple="true"
				:placeholder="'请选择菜品分类'"
				ref="SelectRpt"></SelectRpt>
			<inputRpt
				:inputId="'dishesName'"
				:placeholder="'支持按菜品编码/名称模糊搜索'"
				ref="inputRpt"></inputRpt>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2017_166'">
			<QueryDatatime
				:DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree
				:StoreId="'StoreId'"></MultiTree>
			<SelectRpt 
				:selectId="'depot'"
				:multiple="true"
				:placeholder="'请选择仓库'"
				ref="SelectRpt"></SelectRpt>
		</template>
		
		<template v-if="Report_num == 'SAAS_BI_2017_170'">
			<QueryDatatime
				:DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree
				:StoreId="'StoreId'"></MultiTree>
			<SelectRpt 
				:selectId="'receiptDepot'"
				:multiple="true"
				:placeholder="'请选择仓库'"
				ref="SelectRpt"></SelectRpt>
		</template>
		
		<SeniorQuery 
			v-if="seniorquery"
			@BtnClick="BtnClick" 
			@GetReportCustomFun="GetReportCustomFun"
			ref="SeniorQuery"></SeniorQuery>
		<QueryBtn 
			@BtnClick="BtnClick" 
			ref="QueryBtn"></QueryBtn>
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
	import QueryDatatime from '@/components/public/QueryDatatime'
	import MultiTree from '@/components/public/MultiTree'
	import SelectTree from '@/components/public/SelectTree'
	import SelectRpt from '@/components/public/SelectRpt'
	import inputRpt from '@/components/public/inputRpt'
	import SeniorQuery from './SeniorQuery'
	import SearchInput from './SearchInput'
	import QueryBtn from '../public/QueryBtn'
	import customRpt from './../custom/custom.vue'
	export default{
		name:'SupplyChain',
		components:{
			QueryDatatime,
			MultiTree,
			SelectTree,
			SeniorQuery,
			SearchInput,
			QueryBtn,
			customRpt,
			SelectRpt,
			inputRpt
		},
		data(){
			return{
				CustomVisible:false,
			}
		},
		created(){
			
		},
		computed:{
			...mapGetters(['pageid']),
			...mapGetters('SupplyChain',['FirmValue']),
			Report_num:{
				get:function(){
					let ids = this.pageid+"/Report_num";
					return this.$store.getters[ids];
				}
			},
			seniorquery:{
				get:function(){
					let ids = this.pageid+"/seniorquery";
					return this.$store.getters[ids];
				}
			}
		},
		created(){

		},
		methods:{
			...mapMutations('SupplyChain',['setFirmValue']),
			DatatimeFun(value){
				
			},
			getMultiStore(value){
				
			},
			GetReportCustomFun(headerArr){
				this.CustomVisible = false;
				if(headerArr != 'close'){					
					this.$emit('SetCustomData',headerArr);
				}
			},
			BtnClick(type,querytype = 1){
				//按钮点击
				if(type == 'custom'){
					this.CustomVisible = true;
				}else if(type == 'SeniorQuery'){
					//高级查询
					try{
						this.$refs.MultiTree.showPopover();
					}catch(e){}
				}
				this.$emit('ParamsBusinessFun',type,querytype);
			}
		}
	}
</script>

<style>

</style>