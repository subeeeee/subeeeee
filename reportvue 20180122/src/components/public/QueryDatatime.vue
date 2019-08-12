<template>
	<div class="datatime">
		<el-date-picker 
			@change="change"
			v-model="DateTime1" 
			type="daterange" 
			class="DateTime" 
			size="small" 
			:clearable="false"
			range-separator=" 至 "
			:picker-options="pickerOptions"
			:placeholder="placeholder">
		</el-date-picker>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			let seft = this;
			return {
				pickerOptions: {
					disabledDate(time) {
						let dt = new Date();
						let year = dt.getFullYear();
						let month = dt.getMonth();
						let day = dt.getDate();
						if(seft.Report_num == 'SAAS_BI_2016_01'){
							return time.getTime() < new Date(year - 1,month,day).getTime() || time.getTime() > new Date().getTime()
						}else{
							return time.getTime() > new Date().getTime()
						}
			        },
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		props:{
			DateTimeId:{
				type:String,
				default:'DateTime'
			}
		},
		computed:{
			...mapGetters(['pageid']),
			DateTime1:{
				get:function(){
					return this.$store.getters[this.pageid+"/"+this.DateTimeId];
				},
				set:function(value){
					let kks = this.pageid+"/set"+this.DateTimeId;
					this.$store.commit(kks,value);
				}
			},
			Report_num:{
				get:function(){
					return this.$store.getters[this.pageid+"/Report_num"];
				},
			},
			placeholder:{
				get:function(){
					let _placeholder = '交易日期';
					try{
						let ids = this.pageid+"/"+this.DateTimeId+"placeholder";
						_placeholder = this.$store.getters[ids];
					}catch(e){}
					return _placeholder;
				}
			},
			limit:{
				get:function(){
					let _limit = 3;
					try{
						let ids = this.pageid+"/"+this.DateTimeId+"limit";
						_limit = this.$store.getters[ids];
					}catch(e){}
					return _limit;
				}
			}
		},
		created(){
			this.DateTime1 = 1;
		},
		methods: {
			...mapMutations(['setDateTime']),
			ToDateTime(dt = new Date(),type = '-'){
				let year = dt.getFullYear();
				let month = dt.getMonth() + 1;
				let day = dt.getDate();
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				return year + type + month + type + day;
			},
			GetDateTime(){
				let begintime = this.ToDateTime(this.DateTime[0]);
				let endtime = this.ToDateTime(this.DateTime[1]);
				return [begintime,endtime];
			},
			change(value){
				console.log(this);
				//this.$emit('DatatimeFun',this.GetDateTime());
			}
		},

	}
</script>

<style>
	.DateTime{
		padding-top: 1px!important;
	}
	.DateTime .el-date-editor .el-range__close-icon{
		width: 8px;
	}
</style>