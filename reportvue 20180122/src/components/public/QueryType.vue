<template>
	<div class="QueryType">
		<el-select 
			ref="QueryType"

			v-model="query_type" 
			@change="changeFun"
			placeholder="请选择查询方式">
		    <el-option
		      v-for="item in query_typeData"
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
				index:1,
			};
		},
		computed:{
			...mapGetters(['pageid']),
			query_type:{
				get:function(){
					let val = this.$store.getters[this.pageid+"/query_type"];
					return val;
				},
				set:function(value){
					let ids = this.pageid+"/setquery_type";
					this.$store.commit(ids,value);
				}
			},
			query_typeData:{
				get:function(){
					return this.$store.getters[this.pageid+"/query_typeData"];
				}
			}
		},
		methods: {
			changeFun(value){
				this.$emit('QueryTypeChange',value);
			},
		},

	}
</script>

<style>
</style>