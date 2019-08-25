<template>
	<div class="">
		<el-dialog
		  title="账单详情"
		  :visible.sync="dialogVisible"
		  width="30%"
		  @close="Hide"
		  custom-class="dialogItem">
		  <div>
		  	<el-button v-if="level == 2" size="small" type="text" @click="level = 1" class="my-el-icon-fanhui fanhui">返回</el-button>
		  	<el-row v-if="level == 1">
		  		<el-col :span="20" :offset="1" style="padding: 5px 0px;"></el-col>
			    <el-col :span="24" :offset="0">
			    	<div class="drill_Table datagrid1">
			    		<el-table 
			    			border
			    			:data="rowsOne" 
			    			v-loading="loadingOne"
			    			@cell-click="CellClickFun"
							element-loading-text="努力加载中..."
							height="100%"
			    			style="width: 100%;">
			    			<template v-for="item in HeaderData">
			    				<el-table-column 
			    				:prop="item.prop" 
			    				:label="item.label" 
			    				:formatter="item.formatter"
			    				:header-align="item.align"
			    				:class-name="(DrillTwo&&DrillField == item.prop)?item.prop+'_itemdrill itemdrill':item.prop+'_itemdrill'"
			    				:align="item.align"
			    				:sortable="item.sortable"
			    				:show-overflow-tooltip="true"
			    				:width="item.width">
			    			</el-table-column>
			    			</template>
			    		</el-table>
			    	</div>
		    		<div class="pager" v-if="totalOne > PageSizeOne">	   	
					   	<el-pagination 
					   	  @size-change="SizeChangeFun"
					   	  @current-change="CurrentChangeFun"
					   	  :current-page="PageIndexOne"
					   	  :page-sizes="PageSizeListOne"
					   	  :page-size="PageSizeOne"
					   	  layout=" sizes,prev, sizes, total, pager, next,jumper"
					   	  :total="totalOne">
						</el-pagination>
					</div>
			    </el-col>
			</el-row>
			<el-row v-if="level == 2">
				<el-col :span="22" :offset="1" style="padding: 5px 0px;" class="drilloption">
					<el-col :span="24" :offset="0" class="drilltwo-item">						
						<el-button size="small" type="text">账单编号: </el-button>
						<el-button size="small" type="text">{{paramsTwo['bill_num']}}</el-button>
						<el-button size="small" type="text">流水单号: </el-button>
						<el-button size="small" type="text">{{paramsTwo['serial_num']}}</el-button>
						<el-button size="small" type="text">开单时间: </el-button>
						<el-button size="small" type="text">{{paramsTwo['opentable_time']}}</el-button>
						<el-button size="small" type="text">结账时间: </el-button>
						<el-button size="small" type="text">{{paramsTwo['payment_time']}}</el-button>
					</el-col>
					<el-col :span="24" :offset="0" class="drilltwo-item">
						<el-button size="small" type="text">收款员: </el-button>
						<el-button size="small" type="text">{{paramsTwo['open_opt']}}</el-button>
						<el-button size="small" type="text">结账班次: </el-button>
						<el-button size="small" type="text">{{paramsTwo['shift_id']}}</el-button>
						<el-button size="small" type="text">账单应收: </el-button>
						<el-button size="small" type="text">{{paramsTwo['bill_amount']}}</el-button>
						<el-button size="small" type="text">账单实收: </el-button>
						<el-button size="small" type="text">{{paramsTwo['real_amount']}}</el-button>
					</el-col>
		  		</el-col>
		  		<el-col :span="24" :offset="0">
		  			<el-row class="drill_TableTwo">
		  			    <el-col :span="15" :offset="0">
		  			    	<div class="drill_Table datagrid1">
					    		<el-table 
					    			border
					    			:data="rowsLeft" 
					    			v-loading="loadingLeft"
									element-loading-text="努力加载中..."
									height="450"
					    			style="width: 100%;height:450px">
					    			<template v-for="item in HeaderDataLeft">
					    				<el-table-column 
					    				:prop="item.prop" 
					    				:label="item.label" 
					    				:formatter="item.formatter"
					    				:header-align="item.align"
					    				:class-name="item.prop+'_itemdrill'"
					    				:align="item.align"
					    				:sortable="item.sortable"
					    				:show-overflow-tooltip="true"
					    				:width="item.width">
					    			</el-table-column>
					    			</template>
					    		</el-table>
					    	</div>
					    	<div class="pager" v-if="totalLeft > PageSizeLeft">	   	
							   	<el-pagination 
							   	  @size-change="SizeChangeFunLeft"
							   	  @current-change="CurrentChangeFunLeft"
							   	  :current-page="PageIndexLeft"
							   	  :page-sizes="PageSizeListLeft"
							   	  :page-size="PageSizeLeft"
							   	  layout=" sizes,prev, sizes, total, pager, next,jumper"
							   	  :total="totalLeft">
								</el-pagination>
							</div>
		  			    </el-col>
		  			    <el-col :span="9" :offset="0">
		  			    	<div class="drill_Table datagrid1">
					    		<el-table 
					    			border
					    			:data="rowsRight" 
					    			height="450"
					    			v-loading="loadingRight"
									element-loading-text="努力加载中..."
					    			style="width: 100%;height:450px">
					    			<template v-for="item in HeaderDataRight">
					    				<el-table-column 
					    				:prop="item.prop" 
					    				:label="item.label" 
					    				:formatter="item.formatter"
					    				:header-align="item.align"
					    				:class-name="item.prop+'_itemdrill'"
					    				:align="item.align"
					    				:sortable="item.sortable"
					    				:show-overflow-tooltip="true"
					    				:width="item.width">
					    			</el-table-column>
					    			</template>
					    		</el-table>
					    	</div>
					    	<div class="pager" v-if="totalRight > PageSizeRight">	   	
							   	<el-pagination 
							   	  @size-change="SizeChangeFunRight"
							   	  @current-change="CurrentChangeFunRight"
							   	  :current-page="PageIndexRight"
							   	  :page-sizes="PageSizeListRight"
							   	  :page-size="PageSizeRight"
							   	  layout=" sizes,prev, sizes, total, pager, next,jumper"
							   	  :total="totalRight">
								</el-pagination>
							</div>
		  			    </el-col>
		  			</el-row>
		  		</el-col>
			</el-row>
		  </div>
		</el-dialog>
		
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import dictionary from '@/utils/dictionary'
	export default{
		name:'PurchaseOrderDrill',
		data(){
			return{
				HeaderData:[],//表头
				rowsOne:[],//一级钻取数据
				rowsLeft:[],
				rowsRight:[],
				DrillTwoLeftUrl:'/report/billingQueryRest/getBillDetails',
				DrillTwoRightUrl:'/report/billingQueryRest/getBillPayment',
				DrillTwoLeft:[],//二级左侧数据
				DrillTwoRight:[],//二级右侧数据
				totalOne:0,
				totalLeft:0,
				totalRight:0,
				PageIndexOne:1,
				PageIndexLeft:1,
				PageIndexRight:1,
				PageSizeOne:15,
				PageSizeLeft:15,
				PageSizeRight:15,
				level:1,
				paramsOne:{},
				paramsTwo:{},
				loadingOne:false,
				loadingLeft:false,
				loadingRight:false,
				PageSizeListOne:[15,30,50],
				PageSizeListLeft:[15,30,50],
				PageSizeListRight:[15,30,50],
				dialogVisible:false,
			}
		},
		computed:{
			...mapGetters(['pageid']),
			HeaderTypeOne:{
				get:function(){
					let ids = this.pageid+"/HeaderTypeOne";
					let val = this.$store.getters[ids];
					return (val||'HeaderTable');
				}
			},
			HeaderDataLeft:{
				get:function(){
					let ids = this.pageid+"/"+this.HeaderTypeOne+'Left';
					let val = this.$store.getters[ids] || 'HeaderDataLeft';
					return dictionary[val];
				}
			},
			HeaderDataRight:{
				get:function(){
					let ids = this.pageid+"/"+this.HeaderTypeOne+'Right';
					let val = this.$store.getters[ids] || 'HeaderDataRight';
					return dictionary[val];
				}
			},
			HeaderTypeTwo:{
				get:function(){
					let ids = this.pageid+"/HeaderTypeTwo";
					return this.$store.getters[ids];
				}
			},
			HeaderTypeOneUrl:{
				get:function(){
					let ids = this.pageid+"/"+this.HeaderTypeOne+'Url';
					let val = this.$store.getters[ids];
					if(!val){
						val = '/report/billingQueryRest/getBillingQuery';
					}
					return (val);
				}
			},

			DrillField:{//二级钻取字段
				get:function(){
					let ids = this.pageid+"/DrillField";
					return this.$store.getters[ids];
				}
			},
			DrillTwo:{//是否需要二级钻取
				get:function(){
					let ids = this.pageid+"/DrillTwo";
					return this.$store.getters[ids];
				}
			}
		},
		created(){
			$(window).resize(() =>{
				this.createTable();
			});
		},
		methods:{
			createTable(){
				setTimeout(() => {	
					let heightA = $('.dialogItem').height() - 120;
					$('.drill_Table.datagrid1').css('height',heightA);
					console.log(heightA,$('.drill_Table.datagrid1'));
				},0);
			},
		
			Show(row = {},params = {}){
				this.HeaderData = dictionary[this.HeaderTypeOne];
				console.log(dictionary,this.HeaderData);
				this.dialogVisible = true;
				this.level = 1;
				this.paramsOne = params;
				this.GetTableOneData();
				this.createTable();
			},
			Hide(){
				this.dialogVisible = false;
			},
			SizeChangeFun(value){
				this.PageSizeOne = value;
				this.PageIndexOne == 1 && this.CurrentChangeFun(this.PageIndexOne);
				this.PageIndexOne != 1 && (this.PageIndexOne = 1);
			},
			
			CurrentChangeFun(value){
				//点击了当前table的分页，恢复级别为一级
				this.PageIndexOne = value;
				//调用方法
				this.GetTableOneData();
			},
			SizeChangeFunLeft(value){
				this.PageSizeLeft = value;
				this.PageIndexLeft == 1 && this.CurrentChangeFunLeft(this.PageIndexLeft);
				this.PageIndexLeft != 1 && (this.PageIndexLeft = 1);
			},
			CurrentChangeFunLeft(value){
				//点击了当前table的分页，恢复级别为一级
				this.PageIndexLeft = value;
				//调用方法
				this.GetDrillTwoLeftData();
			},
			SizeChangeFunRight(value){
				this.PageSizeRight = value;
				this.PageIndexRight == 1 && this.CurrentChangeFunRight(this.PageIndexRight);
				this.PageIndexRight != 1 && (this.PageIndexRight = 1);
			},
			CurrentChangeFunRight(value){
				//点击了当前table的分页，恢复级别为一级
				this.PageIndexRight = value;
				//调用方法
				this.GetDrillTwoRightData();
			},
			GetTableOneData(){
				this.paramsOne['rows'] = this.PageSizeOne;
				this.paramsOne['page'] = this.PageIndexOne;
				this.loadingOne = true;
				let seft = this;
				this.getResult.getResult(this.HeaderTypeOneUrl, this.paramsOne, function(result) {
					seft.rowsOne = result['rows'];
					seft.totalOne = result['total'];
					seft.loadingOne = false;
				});
			},
			CellClickFun(row, column, cell, event){
				if(column['property'] == this.DrillField){
					this.level = 2;
					console.log('----------------------');
					this.paramsTwo = row;
					this.GetTableTwoData(row);
				}
			},
			GetTableTwoData(){
				this.GetDrillTwoLeftData();
				this.GetDrillTwoRightData();
			},
			GetDrillTwoLeftData(){
				let pps = {
					bill_num:"'" + this.paramsTwo['bill_num'] + "'",
					page:this.PageIndexLeft,
					rows:this.PageSizeLeft,
				};
				this.loadingLeft = true;
				let seft = this;
				this.getResult.getResult(this.DrillTwoLeftUrl, pps, function(result) {
					seft.rowsLeft = result['rows'];
					seft.totalLeft = result['total'];
					seft.loadingLeft = false;
				});
			},
			GetDrillTwoRightData(){
				let pps = {
					bill_num:"'" + this.paramsTwo['bill_num'] + "'",
					page:this.PageIndexLeft,
					rows:this.PageSizeLeft,
				};
				this.loadingRight = true;
				let seft = this;
				this.getResult.getResult(this.DrillTwoRightUrl, pps, function(result) {
					seft.rowsRight = result['rows'];
					seft.totalRight = result['total'];
					seft.loadingRight = false;
				});
			},
		}
	}
</script>

<style>
	.dialogItem{
		width: 75%!important;
		height: 65%!important;
	}
	.drill_Table{
		width: 95%;
		height: 500px;
		margin-left: 2.5%;
		overflow: hidden;
	}
	td.itemdrill>div.cell{
		width: auto!important;
	    color: #0C9AFF;
	    min-width: 0px!important;
	    display: initial!important;
	}
	.datagrid1>.el-table{
		height: 100%;
	}
	.drilltwo-item:first-child{
		border-bottom: 1px dashed #ccc;
	}
	.drilltwo-item>.el-button:nth-child(2n)>span{
		color: red;
	}
	.drill_TableTwo>.el-col:nth-child(2)>.drill_Table{
		margin-left: 0px!important;
	}
	.drill_TableTwo>.el-col>.drill_Table{
		height: 450px!important;
	}
	.drilloption .el-button{
		padding: 0px;
		margin: 0px;
	}
	.drilloption .el-button>span{
		cursor: default;
	}
	.drilloption .el-button:nth-child(2n){
		margin-right: 10px;
	}
	.fanhui.my-el-icon-fanhui{
		float: right;
		margin-top: -35px;
    	margin-right: 22px;
    	font-size: 14px;
		color: #34495E;
		cursor: pointer;
		line-height: 14px;
	}
	.fanhui.my-el-icon-fanhui>span{
		font-size: 14px;
		cursor: pointer;
		color: #34495E!important;
		line-height: 14px;
		margin-left: 2px;
	}
	.dialogItem .pager>.el-pagination{
		margin-left: 2.5%;
	}
	.dialogItem>.el-dialog__header{
		width: 100%;
	    height: 40px;
	    padding: 0px;
	    line-height: 40px;
	    border-bottom: 1px solid #EAF1F6;
	}
	.dialogItem>.el-dialog__header>span{
		display: inline-block;
		width: 90%;
		margin-left: 2.5%;
		font-size: 16px;
	    color: #34495E;
	    letter-spacing: 0;
	}
	.dialogItem>.el-dialog__header>.el-dialog__headerbtn{
		width: 12.8px;
		height: 12.8px;
	}
	.dialogItem>.el-dialog__header>.el-dialog__headerbtn>i{
	    display: inherit;
	    text-align: center;
	    margin-left: 0px;	
	    font-weight: bold;
	}
	.el-dialog__headerbtn .el-dialog__close {
	    color: #abb4bb;
	}
</style>