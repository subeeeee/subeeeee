<template>
	<div class="monmIndex">
		<el-checkbox-group 
			v-model="CheckboxValue">
    		<el-checkbox 
    			v-for="item in momData" 
    			:label="item.id" 
    			:value="item.id"
    			:key="item.id">{{item.text}}</el-checkbox>
    			<el-tooltip class="item" effect="dark" :content="title" placement="right">
					<el-button
						class="dateList" 
						v-show="CheckboxValue.length > 0"
						 size="small" type="text">设置时期时段
						<template v-if="DateType == 'date'">
							<el-date-picker
						      v-model="beginDate"
						      type="date"
						      size="small"
						      placeholder="选择日期"
						      :picker-options="pickerOptions0">
						    </el-date-picker>
						</template>
						<template v-else-if="DateType == 'week'">
							<el-date-picker
						      v-model="beginDate"
						      type="week"
						      size="small"
						      placeholder="选择周期"
						      format="yyyy 年第 WW 周"
						      :picker-options="pickerOptions0">
						    </el-date-picker>
						</template>
						<template v-else-if="DateType == 'month'">
							<el-date-picker
						      v-model="beginDate"
						      type="month"
						      size="small"
						      @focus="focusFun"
						      popper-class="no_quarter"
						      placeholder="选择月份"
						      format="yyyy 年 MM 月"
						      :picker-options="pickerOptions1">
						    </el-date-picker>
						</template>
						<template v-else-if="DateType == 'quarter'">
							<el-date-picker
						      v-model="beginDate"
						      type="month"
						      size="small"
						      @focus="focusFun"
						      format="yyyy 年第 MM 季度"
						      popper-class="no_quarter"
						      placeholder="选择季度"
						      :picker-options="pickerOptions1">
						    </el-date-picker>
						</template>
						<template v-else-if="DateType == 'year'">
							<el-date-picker
						      v-model="beginDate"
						      type="year"
						      size="small"
						      format="yyyy 年"
						      placeholder="选择季度"
						      :picker-options="pickerOptions0">
						    </el-date-picker>
						</template>
					</el-button>
				</el-tooltip>
  		</el-checkbox-group>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default{
		name:'momRpt',
		data(){
			let seft = this;
			return{
				pickerOptions0:{
					disabledDate(time) {
						let timer = new Date().getTime();
						let time1 = seft.begin;
						let time2 = seft.end;
						let time3 = new Date(time1).getTime();//开始
						let time4 = new Date(time2).getTime();//结束
						let time5 = (time4 - time3);//最早的时间
						return time.getTime() + time5 > timer;
					},
				},
				pickerOptions1:{
					disabledDate(time) {
						if(seft.DateType == 'month' && seft.end_data){
							let t = new Date(seft.begin_data);
							let t1 = t.setMonth(t.getMonth() + 2);
							return time.getTime() > t1 ;
						}else if(seft.DateType == 'month'){
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
		props:{
			momId:{
				type:String,
				default:'mom'
			}
		},
		computed:{
			...mapGetters(['pageid']),
			GetDateType() {
				let seft = this;
				if(this.DateType == 'quarter') {
					this.timeType = 'date';
					setTimeout(() => {
						seft.timeType = 'quarter';
					}, 10);
					return 'month';
				} else if(this.DateType == 'month') {
					this.timeType = 'date';
					setTimeout(() => {
						seft.timeType = 'month';
					}, 10);
					return 'month';
				} else {
					this.timeType = 'nodate';
					return this.DateType;
				}
			},
			momData:{
				get:function(){
					let ids = this.pageid + '/' + this.momId + 'Data';
					return this.$store.getters[ids];
				}
			},
			begin:{
				get:function(){
					let ids = this.pageid + '/begin_data';
					return this.$store.getters[ids];
				}
			},
			end:{
				get:function(){
					let ids = this.pageid + '/end_data';
					return this.$store.getters[ids];
				}
			},
			beginDate:{
				get:function(){
					let ids = this.pageid + '/' + this.momId + 'Date';
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set" + this.momId + 'Date';
					this.$store.commit(ids,value);
				}
			},
			title:{
				get:function(){
					let ids = this.pageid + '/' + this.momId + 'title';
					return this.$store.getters[ids];
				}
			},
			DateType:{
				get:function(){
					let ids = this.pageid + '/DataType';
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid + '/setDataType';
					this.$store.commit(ids,value);
				}
			},
			CheckboxValue:{
				get:function(){
					let ids = this.pageid + '/' + this.momId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set" + this.momId;
					this.$store._mutations[ids][0](value);
					let tm = new Date(this.begin);
					if(this.momId == 'shang'){
						if(this.CheckboxValue.length > 0){							
							this.beginDate = tm.setMonth(new Date(this.begin).getMonth() -1);
						}else{
							this.beginDate = '';
						}
						
					}else{
						if(this.CheckboxValue.length > 0){		
							this.beginDate = tm.setFullYear(new Date(this.begin).getFullYear() -1);
						}else{
							this.beginDate = '';
						}
					}
				}
			}
		},
		methods:{
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
		}
	}
</script>

<style>
	.SeniorQuery-children .monmIndex>.el-checkbox-group{
		margin-top: 0px!important;
		line-height: 30px;
		height: 28px;
	}
	.dateList.el-button{
		margin-right: 0px!important;
		position: relative;
	}
	.dateList.el-button .el-date-editor{
		width: 80px!important;
		left: 10px;
		right: 0px;
		position: absolute;
		opacity: 0;
	}
	.monmIndex>.el-checkbox-group>.el-checkbox{
		height: 100%;
		float: left;
		margin-left: 10px;
	}
	.monmIndex>.el-checkbox-group>.el-button>span{
		margin-top: 0px;
	    line-height: 28px;
    	display: inline-block;
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