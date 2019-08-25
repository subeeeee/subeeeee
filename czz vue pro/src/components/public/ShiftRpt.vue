<template>
	<div class="shiftItem">
		<el-input>
		    <template slot="prepend">
		    	<el-select v-model="ShiftType">
		    	    <el-option
		    	      v-for="item in ShiftData"
		    	      :key="item.id"
		    	      :label="item.text"
		    	      :value="item.id">
		    	    </el-option>
		    	  </el-select>
		    </template>
		    <template slot="append">
		    	<template v-if="ShiftType == 'class'">
		    		<el-select :multiple="true" v-model="shiftValue" placeholder="请选择">
		    		    <el-option
		    		      v-for="item in ShiftValueData"
		    		      :key="item.id"
		    		      :label="item.text"
		    		      :value="item.id">
		    		    </el-option>
		    		  </el-select>
		    	</template>
		    	<template v-if="ShiftType == 'interval'">
		    		<el-time-select
			    		slot="append"
					    placeholder="起始时间"
					    v-model="start_time_interval"
					    :picker-options="{start: '00:00',step: '00:30',end: '23:30'}">
					</el-time-select>
					<el-time-select
						slot="append"
					    placeholder="结束时间"
					    v-model="end_time_interval"
					    :picker-options="{start: '00:00',step: '00:30',end: '23:30',minTime: start_time_interval}">
					</el-time-select>
		    	</template>
		    </template>
		</el-input>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name:'ShiftRpt',
		data(){
			return {
				title:'营业班次查询'
			}
		},
		props:{
			shiftId:{
				type:String,
				default:'class_id'
			}
		},
		computed:{
			...mapGetters(['pageid']),
			ShiftType:{
				get:function(){
					let ids = this.pageid+"/class_interval";
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/setclass_interval";
					this.$store.commit(ids,value);
				}
			},
			ShiftData:{
				get:function(){
					let ids = this.pageid+"/class_intervalData";
					return this.$store.getters[ids];
				}
			},
			ShiftValueData:{
				get:function(){
					let ids = this.pageid+"/"+this.shiftId+'Data';
					return this.$store.getters[ids];
				}
			},
			shiftValue:{
				get:function(){
					let ids = this.pageid+"/"+this.shiftId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set"+this.shiftId;;
					this.$store.commit(ids,value);
				}
			},
			start_time_interval:{
				get:function(){
					let ids = this.pageid+"/start_time_interval";
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/setstart_time_interval";;
					this.$store.commit(ids,value);
				}
			},
			end_time_interval:{
				get:function(){
					let ids = this.pageid+"/end_time_interval";
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/setend_time_interval";;
					this.$store.commit(ids,value);
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.shiftItem>.el-input>.el-input__inner{
		display: none;
	}
	.shiftItem>.el-input>.el-input-group__prepend{
		padding: 0px;
		min-height: 0px;
		height: 28px!important;
		border-right: 0px!important;
		border-top-right-radius: 0!important;
    	border-bottom-right-radius: 0!important;
	}
	.shiftItem>.el-input>.el-input-group__prepend>.el-select{
		margin: 0px;
		float: left;
	}
	.shiftItem>.el-input>.el-input-group__prepend>.el-select>.el-input{
		width: 100px!important;
	}
	.shiftItem>.el-input>.el-input-group__prepend>.el-select>.el-input>.el-input__inner{
		border: 0px!important;
		width:100%!important;
		min-width: 0px;
		padding: 0px 10px;
	}
	.shiftItem>.el-input>.el-input-group__append{
		padding: 0px;
		height: 28px;
		width: 180px!important;
		overflow: hidden;
		float: left;
		border-top-left-radius: 0!important;
    	border-bottom-left-radius: 0!important;
	}
	.shiftItem>.el-input>.el-input-group__append>.el-select{
		margin: 0px;
		float: left;
		width: 180px!important;
	}
	.shiftItem>.el-input>.el-input-group__append>.el-select>.el-input{
		width: 180px!important;
	}
	.shiftItem>.el-input>.el-input-group__append>.el-select>.el-input>.el-input__inner{
		border: 0px!important;
		width: 180px!important;
	}
	
	.shiftItem>.el-input>.el-input-group__append>.el-date-editor{
		width: 90px!important;
	}
	.shiftItem>.el-input>.el-input-group__append>.el-date-editor>.el-input__inner{
		width: 90px!important;
		min-width: 0px!important;
		padding: 0px;
		margin: 0px!important;
		border:0px!important;
		padding-left: 25px;
	}
	.shiftItem>.el-input>.el-input-group__append>.el-date-editor:nth-child(1){
		border-right: 1px solid #D8E5EC;
	}
</style>