<template>
	<div class="CheckboxRpt">
		<el-checkbox-group 
			v-model="CheckboxValue">
    		<el-checkbox 
    			v-for="item in CheckboxData" 
    			:label="item.id" 
    			:value="item.id"
    			:key="item.id">{{item.text}}</el-checkbox>
  		</el-checkbox-group>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		name:'CheckboxRpt',
		data(){
			return{
				
			}
		},
		props:{
			checkboxId:{
				type:String,
				default:'checkboxValue'
			}
		},
		computed:{
			...mapGetters(['pageid']),
			CheckboxData:{
				get:function(){
					let ids = this.pageid+"/"+this.checkboxId+'Data';
					return this.$store.getters[ids];
				}
			},
			CheckboxValue:{
				get:function(){
					let ids = this.pageid+"/"+this.checkboxId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let kks = this.pageid+"/set"+this.checkboxId;
					this.$store.commit(kks,value);
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
</style>