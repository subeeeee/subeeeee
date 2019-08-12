<template>
	<div class="inputRpt">
		<el-input 
			:placeholder="placeholder" 
			v-model="Value" 
			clearable></el-input>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		name:'inputRpt',
		data(){
			return {
				
			}
		},
		props:{
			inputId:{
				type:String,
				default:'inputValue'
			},
			placeholder:{
				type:String,
				default:'请输入内容'
			},
		},
		computed:{
			...mapGetters(['pageid']),
			Value:{
				get:function(){
					let ids = this.pageid+"/"+this.inputId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set"+this.inputId;
					this.$store.commit(ids,value);
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>