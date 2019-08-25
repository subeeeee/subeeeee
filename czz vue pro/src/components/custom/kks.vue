<template>
	<div class="custom">
		<el-button size="small" @click="OpenCustomFun" type="primary">主要按钮</el-button>
		<div>
			<ReportCustom
			@GetReportCustomFun="GetReportCustomFun"
			:CustomVisible="CustomVisible"
			:report_num="report_num">
		</ReportCustom>
		</div>
	</div>
</template>

<script>
	import ReportCustom from './custom.vue'
	export default{
		name:'kks',
		components:{
			ReportCustom
		},
		data(){
			return {
				report_num:'SAAS_BI_2016_01',
				CustomVisible:false,
			}
		},
		methods:{
			OpenCustomFun(){
				this.CustomVisible = true;
			},
			GetReportCustomFun(params){
				this.CustomVisible = false;
			}
		}
	}
</script>

<style>
</style>