<template>
	<div class="QueryBtn">
		<el-button 
			type="primary" 
			size="small" 
			v-if="Showquery"
			@click="QueryFind" 
			class="query">{{queryText}}</el-button>
		<el-button 
			size="small" 
			@click="ExplainFun" 
			v-if="ShowExplain"
			class="my-el-icon-shuoming">说明</el-button>
		<el-button 
			size="small" 
			v-if="showExport"
			@click="ExportFun" 
			class="my-el-icon-daochu">导出</el-button>
		<el-button 
			size="small" 
			v-if="ShowCustom" 
			@click="CustomFun" 
			class="my-el-icon-zidingyibiaoge">自定义报表</el-button>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		name:'QueryBtn',
		data(){
			return {
				explainContext: ''
			};
		},
		computed:{
			...mapGetters(['pageid']),
			...mapGetters('layout',['showBtn']),
			queryText:{
				get:function(){
					let ids = this.pageid+"/queryText";
					let val = this.$store.getters[ids];
					return (val || '查询');
				}
			},
			Showquery:{
				get:function(){
					let ids = this.pageid+"/query";
					let val = this.$store.getters[ids];
					return val;
				}
			},
			ShowExplain:{
				get:function(){
					let ids = this.pageid+"/Explain";
					let val = this.$store.getters[ids];
					return val;
				}
			},
			showExport:{
				get:function(){
					let ids = this.pageid+"/Export";
					let val = this.$store.getters[ids];
					return val;
				}
			},
			ShowCustom:{
				get:function(){
					let ids = this.pageid+"/Custom";
					let val = this.$store.getters[ids];

					return val;
				}
			},
			explainText: {
				get: function() {
					let ids = this.pageid + "/explainText";
					return this.$store.getters[ids];
				}
			},
			Report_num: {
				get: function() {
					let ids = this.pageid + "/Report_num";
					return this.$store.getters[ids];
				}
			},
		},
		created(){
			let ids = this.pageid+"/GetshowBtn";
			this.$store.dispatch(ids);
			this.Getexplain();
		},
		methods:{
			Getexplain() {
				let seft = this;
				this.getResult.getExplain(this.Report_num, function(result) {
					if(result[0]) {
						seft.explainContext = result[0]['text'];
					}
				});
			},
			CheckAbnormal(){
				//检测物品异常信息
				this.$emit('BtnClick','CheckAbnormal');
			},
			QueryFind(){
				//查询
				this.$emit('BtnClick','queryfind');
			},
			ExplainFun(){
				//说明
				this.$alert(this.explainContext, (this.explainText || '', '说明'), {
					cancelButtonText: '关闭',
					customClass:'ExplainCustomClass',
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					showCancelButton:true
				});
			},
			ExportFun(){
				//导出
				this.$emit('BtnClick','export');
			},
			CustomFun(){
				//自定义
				this.$emit('BtnClick','custom');
			}
		}
	}
</script>

<style>
	.QueryBtn{
		float: right!important;
		margin-right: 8px!important;
	}
	.QueryBtn>.el-button{
		float: left;
	}
	.QueryBtn>.el-button:last-child{
		margin-right: 0px!important;
	}
</style>