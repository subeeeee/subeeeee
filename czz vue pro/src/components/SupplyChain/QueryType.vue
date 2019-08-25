<template>
	<div class="QueryType">
		<el-select 
			ref="QueryType"
			v-model="QueryType" 
			@change="changeFun"
			placeholder="请选择查询方式">
		    <el-option
		      v-for="item in QueryTypeList"
		      :key="item.id"
		      :label="item.text"
		      :value="item.id">
		    </el-option>
		</el-select>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:'QueryType',
		data() {
			return {
				QueryType:1,
				QueryTypeList:[
					{'id':1,'text':'按交易日期查询'},{'id':2,'text':'按交易机构查询'}
				]
			};
		},
		created(){
			if(this.Report_num=='SAAS_BI_2017_170'){
				this.QueryTypeList=[
				  {'id':1,'text':'按物品汇总'},
				  {'id':2,'text':'按供应商汇总'}
				];
			}
		},
		computed:{
			...mapGetters(['Report_num']),
		},
		methods: {
			changeFun(value){
				let QueryText = '';
				this.QueryTypeList.forEach((item,_)=>{
					if(item.id == value){
						QueryText = item.text;
					}
				});
				this.$emit('QueryTypeChange',value);
			},
		},

	}
</script>

<style>
</style>