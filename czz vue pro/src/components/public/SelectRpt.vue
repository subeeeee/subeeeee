<template>
	<div class="select-item">
		<el-select 
			:multiple="multiple" 
			:popper-class="clseeItem"
			v-model="SelectVal" 
			clearable
			:placeholder="placeholder">
		    <el-option
		      v-for="item in SelectData"
		      :key="item.id"
		      :label="item.text"
		      :value="item.id">
		    </el-option>
		</el-select>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default{
		name :'SelectRpt',
		data(){
			return{
				
			}
		},
		props:{
			selectId:{
				type:String,
				default:'SelectVal'
			},
			placeholder:{
				type:String,
				default:'请选择'
			},
			multiple:{
				type:Boolean,
				default:false,
			},
			clseeItem:{
				type:String,
				default:''
			}
		},
		computed:{
			...mapGetters(['pageid']),
			SelectVal:{
				get:function(){
					let ids = this.pageid+"/"+this.selectId;
					return this.$store.getters[ids];
				},
				set:function(value){
					try{						
						let kks = this.pageid+"/set"+this.selectId;
						this.$store.commit(kks,value);
					}catch(e){}
				}
			},
			SelectData:{
				get:function(){
					let ids = this.pageid+"/"+this.selectId+"Data";
					return this.$store.getters[ids];
				},
				set:function(value){
					try{
						
					}catch(e){}
					let kks = this.pageid+"/set"+this.selectId+"Data";
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