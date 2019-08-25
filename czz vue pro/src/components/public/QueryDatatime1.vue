<template>
	<div class="datetime">
		<el-input 
			style="width: 180px;"
			size="small">
			<el-select 
				slot="prepend" 
				v-model="DataType" 
				popper-class="date-picker-type"
				size="small"
				@change="changeFun"
				placeholder="请选择">
				<el-option label="按日期" value="date"></el-option>
				<el-option label="按周期" value="week"></el-option>
				<el-option label="按月份" value="month"></el-option>
				<el-option label="按季度" value="quarter"></el-option>
				<el-option label="按年份" value="year"></el-option>
			</el-select>
			<template v-if="DataType == 'date'">
				<el-date-picker 
					align="right" 
					type="date" 
					size="small"
					ref="date_time1"
					v-model="begin_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					placeholder="选择开始日期" 
					:picker-options="pickerOptions0">
				</el-date-picker>
				<el-date-picker 
					align="right" 
					type="date" 
					size="small"
					ref="date_time2"
					v-model="end_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					placeholder="选择结束日期" 
					:picker-options="pickerOptions2">
				</el-date-picker>
			</template>
			<template v-else-if="DataType == 'week'">
				<el-date-picker 
					align="right" 
					type="week" 
					size="small"
					ref="week_time1"
					v-model="begin_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					format="yyyy 年第 WW 周"
					placeholder="选择开始周期" 
					:picker-options="pickerOptions0">
				</el-date-picker>
				<el-date-picker 
					align="right" 
					type="week" 
					size="small"
					ref="week_time2"
					v-model="end_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					format="yyyy 年第 WW 周"
					placeholder="选择结束周期" 
					:picker-options="pickerOptions2">
				</el-date-picker>
			</template>
			<template v-else-if="DataType == 'month'">
				<el-date-picker 
					align="right" 
					type="month" 
					size="small"
					ref="month_time1"
					v-model="begin_data"
					slot="append"
					:editable="false"
					@focus="focusFun"
					@change="DateTimeChangeFun"
					format="yyyy 年 MM 月"
					placeholder="选择开始月份" 
					popper-class="no_quarter"
					:picker-options="pickerOptions1">
				</el-date-picker>
				<el-date-picker 
					align="right" 
					type="month" 
					size="small"
					ref="month_time2"
					v-model="end_data"
					slot="append"
					:editable="false"
					@focus="focusFun"
					@change="DateTimeChangeFun"
					format="yyyy 年 MM 月"
					placeholder="选择结束月份" 
					popper-class="no_quarter"
					:picker-options="pickerOptions3">
				</el-date-picker>
			</template>
			<template v-else-if="DataType == 'quarter'">
				<el-date-picker 
					align="right" 
					type="month" 
					size="small"
					ref="quarter_time1"
					v-model="begin_data"
					slot="append"
					:editable="false"
					@focus="focusFun"
					@change="DateTimeChangeFun"
					format="yyyy 年第 MM 季度"
					placeholder="选择开始季度" 
					popper-class="no_quarter"
					:picker-options="pickerOptions1">
				</el-date-picker>
				<el-date-picker 
					align="right" 
					type="month" 
					size="small"
					ref="quarter_time2"
					v-model="end_data"
					slot="append"
					:editable="false"
					@focus="focusFun"
					@change="DateTimeChangeFun"
					popper-class="no_quarter"
					format="yyyy 年第 MM 季度"
					placeholder="选择结束季度" 
					:picker-options="pickerOptions3">
				</el-date-picker>
			</template>
			<template v-else-if="DataType == 'year'">
				<el-date-picker 
					align="right" 
					type="year" 
					size="small"
					ref="year_time1"
					v-model="begin_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					format="yyyy 年"
					placeholder="选择开始年份" 
					:picker-options="pickerOptions0">
				</el-date-picker>
				<el-date-picker 
					align="right" 
					type="year" 
					size="small"
					ref="year_time2"
					v-model="end_data"
					slot="append"
					:editable="false"
					@change="DateTimeChangeFun"
					format="yyyy 年"
					placeholder="选择结束年份" 
					:picker-options="pickerOptions2">
				</el-date-picker>
			</template>
		</el-input>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import Vue from 'vue'
	export default {
		
		created(){
			this.SetDefualtDate();
		},
		updated(){
			let seft = this;
			$('.datatime').off('click','input');
			$('.datatime').on('click','input',function(){
				if(seft.DataType == 'quarter'){
					let picker = $('.el-picker-panel.el-date-picker');
					if(picker.hasClass('no_quarter')){
						picker.removeClass('no_quarter');
						picker.addClass('quarter');
					}
				}else if(seft.DataType == 'month'){
					let picker = $('.el-picker-panel.el-date-picker');
					if(picker.hasClass('quarter')){
						picker.removeClass('quarter');
						picker.addClass('no_quarter');
					}
				}
			});
		},
		data() {
			let seft = this;
			return {
				quarter:'',
				pickerOptions0:{
					disabledDate(time) {
						if((seft.DataType == 'date' || seft.DataType == 'week' || seft.DataType == 'year') && seft.end_data){	
							let t = new Date(seft.end_data);
							let t1 = t.setMonth(t.getMonth() - 3);
							if(seft.DataType == 'year'){
								t1 = t.setFullYear(t.getFullYear() - 2);
							}
							return time.getTime() < t1 || time.getTime() > seft.end_data || time.getTime() > Date.now();
						}else if(seft.DataType == 'date' || seft.DataType == 'week' || seft.DataType == 'year'){
							return time.getTime() > Date.getTime();
						}
					}
				},
				pickerOptions2:{
					disabledDate(time) {
						if((seft.DataType == 'date' || seft.DataType == 'week' || seft.DataType == 'year') && seft.begin_data){	
							let t = new Date(seft.begin_data);
							let t1 = t.setMonth(t.getMonth() + 3);
							if(seft.DataType == 'year'){
								t1 = t.setFullYear(t.getFullYear() + 2);
							}
							return time.getTime() > t1 || time.getTime() < seft.begin_data || time.getTime() > Date.now();
						}else if(seft.DataType == 'date' || seft.DataType == 'week' || seft.DataType == 'year'){
							return time.getTime() > Date.now();
						}
					}
				},
				pickerOptions1: {
					disabledDate(time) {
						if(seft.DataType == 'month' && seft.end_data){
							let t = new Date(seft.begin_data);
							let t1 = t.setMonth(t.getMonth() + 2);
							return time.getTime() > t1 || time.getTime() < seft.begin_data || time.getTime() > Date.now();
						}else if(seft.DataType == 'month'){
							return time.getTime() > Date.now();
						}
					},
					shortcuts :[{
						text: '第一季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-1');
						}
					}, {
						text: '第二季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-2');
						}
					}, {
						text: '第三季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-3');
						}
					}, {
						text: '第四季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-4');
						}
					}]
				},
				pickerOptions3: {
					disabledDate(time) {
						if(seft.DataType == 'month' && seft.begin_data){	
							let t = new Date(seft.begin_data);
							let t1 = t.setMonth(t.getMonth() + 2);
							return time.getTime() > t1 || time.getTime() < seft.begin_data || time.getTime() > Date.now();
						}else if(seft.DataType == 'month'){
							return time.getTime() > Date.now();
						}
					},
					shortcuts :[{
						text: '第一季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-1');
						}
					}, {
						text: '第二季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-2');
						}
					}, {
						text: '第三季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-3');
						}
					}, {
						text: '第四季度',
						onClick(picker) {
							picker.$emit('pick', picker.year + '-4');
						}
					}]
				},
			}
		},
		computed:{
			...mapGetters(['pageid']),
			DataType:{
				get:function(){
					let ids = this.pageid+"/DataType";
					let val = this.$store.getters[ids];
					return (val || 'date');
				},
				set:function(value){
					let ids = this.pageid+"/setDataType";
					this.$store.commit(ids,value);
				}
			},
			begin_data:{
				get:function(){
					let ids = this.pageid+"/begin_data";
					let val = this.$store.getters[ids];
					return (val || new Date());
				},
				set:function(value){
					let ids = this.pageid+"/setbegin_data";
					this.$store.commit(ids,value);
				}
			},
			end_data:{
				get:function(){
					let ids = this.pageid+"/end_data";
					let val = this.$store.getters[ids];
					return (val || new Date());
				},
				set:function(value){
					let ids = this.pageid+"/setend_data";
					this.$store.commit(ids,value);
				}
			}
		},
		methods:{
			changeFun(value){
				sessionStorage.setItem('dateType',value);
			},
			DateTimeChangeFun(value){
				
			},
			focusFun(){
				let type = sessionStorage.getItem('dateType');
				if(type == 'month'){
					$('.no_quarter').removeClass('quarter');
				}else{
					setTimeout(() => {						
						$('.no_quarter').addClass('quarter');
					},100);
				}
			},
			SetDefualtDate(){
				//设置默认时间当前月1号-当前日期
				this.DataType = 'date';
				let dt = new Date();
				let year = dt.getFullYear();
				let month = dt.getMonth();
				let day = dt.getDate();
				this.begin_data = new Date(year,month,1);
				this.end_data = new Date(year,month,day);
			},
			getTime(time = new Date()){
				time = new Date(time);
				let year = time.getFullYear();
				let month = time.getMonth() + 1;
				let day = time.getDate();
				let quarter = time.getMonth() + 1;
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				if(this.DataType == 'date'){
					return year + '-' + month + '-' + day;
				}else if(this.DataType == 'week'){
					return this.getYearWeek(time);
				}else if (this.DataType == 'month'){
					return year + '-' + month;
				}else if (this.DataType == 'quarter'){
					return year + '-' + quarter;
				}else if (this.DataType == 'year'){
					return year;
				}
			},
			getYearWeek(time){  
				time = new Date(time);
				var d = 0;
			    var date2=new Date(time.getFullYear(), 0, 1);  
			    var day1=time.getDay();  
			    if(day1==0) day1=7;  
			    var day2=date2.getDay();  
			    if(day2==0) day2=7;  
			    d = Math.round((time.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);    
			    return time.getFullYear() +'-'+Math.ceil(d /7);   
			},
			GetTimeData(params){
				//回调父组件方法，吧自己的参数传递给父组件
				this.$emit('GetTimeData',params);
			},
		},
		
	}
</script>

<style>
	.datetime>.el-input>.el-input-group__prepend,
	.datetime>.el-input>.el-input-group__prepend>.el-select,
	.datetime>.el-input>.el-input-group__prepend>.el-select>.el-input{
		width: 100px;
		margin: 0px;
		height: 28px;
		padding: 0px;
	}
	.datetime>.el-input>.el-input-group__prepend>.el-select>.el-input>.el-input__inner{
		min-width: 0px;
		width: 100px;
		margin-left: 0px!important;
		border: 0px!important;
	}
	.datetime>.el-input>.el-input__inner{
		width: 0px;
		min-width: 0px;
		display: none;
		width: 0px;
		padding: 0px;
		margin: 0px;
		border: 0px;
	}
	.datetime>.el-input>.el-input-group__append{
		padding: 0px;
		border-left: 0px!important;
	}
	.datetime>.el-input>.el-input-group__append>.el-date-editor{
		width: 180px;
	}
	.datetime>.el-input>.el-input-group__append>.el-date-editor>.el-input__inner{
		padding: 0px;
		padding-left: 25px!important;
		margin: 0px!important;
		width: 180px;
		border: 0px!important;
		border-right: 1px solid #D8E5EC!important;
	}
	.datetime>.el-input>.el-input-group__append>.el-date-editor:nth-child(2)>.el-input__inner{
		border-top-right-radius: 3px;
    	border-bottom-right-radius: 3px;
	}
	.no_quarter{
		width: 328px!important;
	}
	.no_quarter.quarter .el-picker-panel__sidebar{
		display: block;
		width: 100%;
		background-color: white;
		z-index: 10;
	}
	.no_quarter.quarter .el-picker-panel__sidebar>.el-picker-panel__shortcut{
		text-align: center;
		padding-left: 0px;
	}
	.no_quarter.quarter .el-picker-panel__sidebar>.el-picker-panel__shortcut:hover{
		background-color: #D8E5EC;
	}
	.no_quarter .el-picker-panel__sidebar{
		display: none;
	}
	.no_quarter .el-picker-panel__body{
		margin-left: 0px;
	}
</style>