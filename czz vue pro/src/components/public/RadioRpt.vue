<template>
	<div class="CheckboxRpt">
		<el-radio-group 
			v-model="radioValue">
    		<el-radio 
    			v-for="item in radioData" 
    			:label="item.id" 
    			:value="item.id"
    			:key="item.id">{{item.text}}</el-radio>
  		</el-radio-group>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		name:'RadioRpt',
		data(){
			return{
				
			}
		},
		props:{
			radioId:{
				type:String,
				default:'radioValue'
			}
		},
		computed:{
			...mapGetters(['pageid']),
			radioData:{
				get:function(){
					let ids = this.pageid+"/"+this.radioId+'Data';
					return this.$store.getters[ids];
				}
			},
			radioValue:{
				get:function(){
					let ids = this.pageid+"/"+this.radioId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let kks = this.pageid+"/set"+this.radioId;
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