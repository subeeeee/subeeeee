<template>
	<div class="">
		<el-dialog
		  title=""
		  :visible.sync="dialogVisible"
		  width="30%"
		  @close="Hide"
		  custom-class="dialogItem">
		  <div>
		  	<el-row>
		  		<el-col :span="20" :offset="1" style="padding: 5px 0px;">
		  			<el-input 
		  				size="small"
		  				placeholder="支持按编码/名称模糊搜索" 
		  				v-model="goodsValue"></el-input>
		  			<el-button size="small" type="primary">查询</el-button>
		  		</el-col>
			    <el-col :span="24" :offset="0">
			    	<div class="drill_Table">
			    		<el-table 
			    			border
			    			:data="rows" 
			    			style="width: 100%">
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
	import dictionary from '@/utils/dictionary'
	export default{
		name:'PurchaseOrderDrill',
		data(){
			return{
				HeaderData:[],
				goodsValue:'',//物品
				rows:[],
				HeaderType:'PurchaseOrderDrill',
				dialogVisible:false,
			}
		},
		methods:{
			Show(){
				this.HeaderData = dictionary[this.HeaderType];
				console.log(dictionary,this.HeaderData);
				this.dialogVisible = true;
				this.getRow();
			},
			Hide(){
				this.dialogVisible = false;
			},
			getRow(){
				let columns = this.HeaderData;
				this.rows = [];
				for(let i = 1; i< 20; i++){
					let obj = {};
					columns.forEach((itemA, indexA) => {
						obj[itemA['prop']] = parseInt(Math.random()*1000);
					});
					this.rows.push(obj);
				}
			}
		}
	}
</script>

<style>
	.dialogItem{
		width: 75%!important;
		height: 65%;
	}
	.dialogItem>.el-dialog__header{
		width: 95%;
	    height: 40px;
	    padding: 0px;
	    margin-left: 2.5%;
	    line-height: 40px;
	    font-size: 16px;
	    color: #34495E;
	    letter-spacing: 0;
	}
	.drill_Table{
		width: 95%;
		margin-left: 2.5%;
	}
</style>