<template>
	<div class="">
		<el-dialog
		  :title="(HeaderType == 'operation1'?'库存批次':'库存流动')+'详情'"
		  :visible.sync="dialogVisible"
		  width="30%"
		  @close="Hide"
		  :custom-class="'DrillCustom dialogItem '+HeaderType">
		  <div>
		  	<el-row>
		  		<el-col :span="20" :offset="1" style="padding: 5px 0px;" 
		  			v-if="HeaderType == 'operation1'">
		  			<el-radio-group v-model="FrozenValue" size="small">
				      <el-radio-button label="冻结"></el-radio-button>
				      <el-radio-button label="解冻"></el-radio-button>
				    </el-radio-group>
		  		</el-col>
		  		<el-col :span="20" :offset="1" style="padding: 5px 0px;" 
		  			v-if="HeaderType == 'operation2'">
		  			<el-input 
		  				size="small" 
		  				placeholder="请输入单号" 
		  				class="comipt"
		  				v-model="BillNumber1">
		  			    <template slot="prepend">单号</template>
		  			</el-input>
		  			<el-input 
		  				size="small" 
		  				class="comslt"
		  				placeholder="请输入单号">
		  			    <template slot="prepend">单据类型</template>
		  			     <template slot="append">
		  			     	<el-select 
		  			     		size="small" 
		  			     		multiple
		  			     		v-model="BillType1" 
		  			     		placeholder="请选择单据类型">
		  			     	    <el-option
		  			     	      v-for="item in BillTypeData"
		  			     	      :key="item.id"
		  			     	      :label="item.text"
		  			     	      :value="item.id">
		  			     	    </el-option>
		  			     	  </el-select>
		  			     </template>
		  			</el-input>
		  			<el-button size="small" type="primary">检索</el-button>
		  		</el-col>
			    <el-col :span="24" :offset="0">
			    	<div class="drill_Table">
			    		<el-table 
			    			border
			    			v-loading="table_loading"
			    			element-loading-text="拼命加载中"
			    			:data="rows">
			    			<template v-for="item in HeaderData">
			    				<el-table-column 
			    				:prop="item.prop" 
			    				:label="item.label" 
			    				:formatter="item.formatter"
			    				:header-align="item.align"
			    				:align="item.align"
			    				:sortable="item.sortable"
			    				:show-overflow-tooltip="true"
			    				:width="item.width">
			    			</el-table-column>
			    			</template>
			    		</el-table>
			    	</div>
			    </el-col>
			</el-row>
		  </div>
		 <!-- <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>-->
		</el-dialog>
		
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	import dictionary from '@/utils/dictionary'
	export default{
		name:'sskccxDirll',
		data(){
			return{
				HeaderData:[],
				goodsValue:'',//物品
				rows:[],
				FrozenValue:'冻结',
				HeaderType:'operation1',
				gid:'',//钻取的行id
				dialogVisible:false,
				table_loading:true,
			}
		},
		computed:{
			...mapGetters('sskccx',['DateTime','StoreId','depot','category','goods','BillType','BillNumber']),
			BillNumber1:{
				get:function(){
					return this.BillNumber;
				},
				set:function(value){
					this.BillNumber = value;
				}
			},
			BillType1:{
				get:function(){
					return this.BillType;
				},
				set:function(value){
					this.setBillType(value);
				}
			}
		},
		methods:{
			...mapMutations('sskccx',['setBillType']),
			...mapActions('sskccx',['getBillTypeData']),
			Show(type,gid){
				this.HeaderType = type;
				this.gid = gid;//钻取行的id
				this.HeaderData = dictionary[this.HeaderType];
				console.log(dictionary,this.HeaderData);
				this.dialogVisible = true;
				this.table_loading = true;
				this.getRow();
			},
			Hide(){
				this.dialogVisible = false;
			},
			getRow(){
				let columns = this.HeaderData;
//				for(let i = 1; i< 20; i++){
//					let obj = {};
//					columns.forEach((itemA, indexA) => {
//						obj[itemA['prop']] = parseInt(Math.random()*1000);
//					});
//					this.rows.push(obj);
//				}
                let _this = this;
                this.dialogVisible = true;
                let hierarchytype = this.HeaderType == 'operation1'?'4':'5';
                let params = {
						begin_date: this.getResult.getTime(this.DateTime[0]),
						end_date: this.getResult.getTime(this.DateTime[1]),
						hierarchytype: hierarchytype,
						gid:this.gid,//钻取行的唯一标识
                        store_id:this.StoreId.join(','),//机构
						categorys:this.depot.join(','),//物品类别
						warehouse:this.category.join(','),//仓库
						goodsname:this.goods,//物品名称
						billscategory:this.BillType.join(','),//单据类型
						billnum:this.BillNumber,//单号
						page: 1,
						rows: 20
					};
//              let params = {
//					begin_date: '2017-01-01',
//					end_date: '2019-01-01',
//					hierarchytype: hierarchytype,//钻取方式：库存批次/库存流动
//					warehouse:'大库房',//仓库名称
//					goodsname:'白菜',//物品名称
//					gid:this.gid,//钻取行的唯一标识
//					category_name:'IN_SUPPLIER',
//					billnum:'A001',
//					page: 1,
//					rows: 20
//				};
				this.rows = [];
				let SummaryStatisticsUrl = '/report/RealtimeInventoryQueryRest/realtimeInventoryQuery';
				this.getResult.getResult(SummaryStatisticsUrl, params, function(result) {

					if(result.length>0){
					  if(result.rows.length>0){
						result.rows.forEach((r)=>{
							let obj = {};
							for(let p in r){
								let lowercasep = p.toLowerCase();//将大写转换成小写
								 if(lowercasep=='yes_freeze'){
								 	r[p]=r[p]=='normal'?'否':'是';
								 }
								 if(lowercasep=='inbound_type'|| lowercasep=='item_id'){
								 	r[p]=r[p]=='IN_SUPPLIER'?'采购收货单':'采购退货单';
								 }
						            obj[lowercasep]=r[p];
							}
						_this.rows.push(obj);	
						})
						_this.table_loading=false;
					}	
					}else{
						_this.table_loading=false;
						_this.$message({message: '暂无数据！',type: 'warning'});
					};
				});
				console.log('钻取行结果',this.rows);
			}
		}
	}
</script>

<style>
	
	.drill_Table{
		max-width: 95%;
		margin-left: 2.5%;
	}
	.drill_Table>div.el-table::before{
		width: 0px;
	}
	.drill_Table>div.el-table{
		border-top: 0px;
	}
	.drill_Table>div.el-table .el-table__header{
		border-top: 1px solid #ebeef5;
	}
	.comipt>.el-input-group__prepend{
		border: 0px!important;
		padding-right: 10px!important;
	}
	.comipt>.el-input__inner{
		border-radius: 3px!important;
   	 	width: 180px;
   	 	height: 28px;
	}
	.comslt>.el-input-group__prepend{
		border: 0px!important;
		padding-right: 10px!important;
	}
	.comslt>.el-input__inner{
		padding: 0px;
		border: 0px;
		width: 0px;
	}
	.comslt>.el-input-group__append{
		border: 0px!important;
		height: 28px;
	}
	.comslt>.el-input-group__append .el-input__inner{
		border: 1px solid #D8E5EC!important;
		height: 28px!important;
		border-radius: 3px!important;
	}
</style>