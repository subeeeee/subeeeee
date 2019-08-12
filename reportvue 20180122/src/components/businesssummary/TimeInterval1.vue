<template>
	<div class="TimeInterval">
		<div class="el-time-picker-item">
			<span><a class="visibility">时</a>时段{{index}}:</span>
			<span>
				<el-select 
					@change="changeFun" 
					popper-class="intervalList" 
					v-model="interval[0]" 
					placeholder="起始时段">
				    <el-option
				      v-for="item in TimeIntervalData"
				      :key="item.end_time"
				      :label="item.end_time"
				      :value="item.end_time">
				    </el-option>
				 </el-select>
				<el-select 
					@change="changeFun" 
					popper-class="intervalList" 
					v-model="interval[1]" 
					placeholder="结束时段">
				    <el-option
				      v-for="item in TimeIntervalData"
				      :key="item.end_time"
				      :label="item.end_time"
				      :value="item.end_time">
				    </el-option>
				 </el-select>
			</span>
			<a @click="AddTimeInterval" class="my-el-icon-jia add-TimeInterval"></a>
			<a v-if="index > 1" @click="RemoveTimeInterval(index)" class="my-el-icon-jian remove-TimeInterval"></a>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default{
		name:'TimeInterval',
		data(){
			return {
				interval:[]
			};
		},
		props:{
			id:{
				type:String,
				default:'TimeInterval'
			},
			index:{
				type:Number,
				default:1
			}
		},
		computed:{
			...mapGetters(['pageid']),
			...mapGetters('yysdzbfx',['TimeIntervalindex','TimeInterval','TimeIntervalData']),
		},
		methods:{
			...mapMutations('yysdzbfx',['setTimeIntervalindex']),
			AddTimeInterval(){
				let idx = this.TimeIntervalindex;
				if(idx < 8){					
					//增加
					this.setTimeIntervalindex(idx + 1);
				}
			},
			RemoveTimeInterval(index){
				let idx = this.TimeIntervalindex;
				//减少
				this.setTimeIntervalindex(idx - 1);
			},
			SetDefault(){
				this.interval = [];
			},
			changeFun(value){
				  //TimeInterval
				//let kks = this.pageid+"/set"+this.id+this.index;
				//this.$store._mutations[kks][0](this.interval);
				let kks = this.pageid+"/set"+this.id;
				this.$store._mutations[kks][0]([this.index,this.interval]);
			},
		}
	}
</script>

<style>
	.TimeInterval>.el-time-picker-item>span{
		display: inline-block;
    	float: left;
	}
	.TimeInterval>.el-time-picker-item>span:nth-child(1){
		width: 60px;
	    height: 30px;
	    line-height: 30px;
	    max-width: 125px;
	    color: #576D7A;
	    cursor: default;
	    text-align: right;
	    padding-right: 7px;
	}
	.TimeInterval-picker .el-time-spinner__wrapper:nth-child(3){
		display: none;
	}
	.add-TimeInterval,
	.remove-TimeInterval{
		font-size: 16px;
		color: #666666;
		cursor: pointer;
		display: inline-block;
    	margin: 3px 5px;
	}
	.add-TimeInterval:hover,
	.remove-TimeInterval:hover{
		color: #0C9AFF;
	}
	.TimeInterval .el-select,
	.TimeInterval .el-select>.el-input {
		width: 110px!important;
	}
	.TimeInterval .el-select .el-input__inner{
		width: 100%!important;
		min-width: 0px;
	}
	.intervalList{
		min-width: 110px!important;
	}
</style>