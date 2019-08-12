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
			    			v-loading="table_loading"
			    			element-loading-text="拼命加载中"
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
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import dictionary from '@/utils/dictionary'
	export default{
		name:'cgddzxjgDrill',
		data(){
			return{
				HeaderData:[],
				goodsValue:'',//物品
				gid:'',//钻取行的id
				rows:[],
				HeaderType:'PurchaseOrderDrill',
				dialogVisible:false,
				table_loading:true,
			}
		},
		computed:{
			...mapGetters(['pageid']),
		},
		methods:{
			Show(gid){
				this.HeaderData = dictionary[this.HeaderType];
				console.log(dictionary,this.HeaderData);
				this.dialogVisible = true;
				this.gid = gid;//钻取行的id
				this.getRow();
			},
			Hide(){
				this.dialogVisible = false;
			},
			getRow(){
				let columns = this.HeaderData;
				this.rows = [];
//				for(let i = 1; i< 20; i++){
//					let obj = {};
//					columns.forEach((itemA, indexA) => {
//						obj[itemA['prop']] = parseInt(Math.random()*1000);
//					});
//					this.rows.push(obj);
//				}
                let _this = this;
                let begin_date = this.$store.getters[this.pageid+"/DateTime"][0];
                let end_date = this.$store.getters[this.pageid+"/DateTime"][1];
                let supply_ids= this.$store.getters[this.pageid+"/Supplier"];
                let billnum= this.$store.getters[this.pageid+"/BillNumber"];
                let goodsname= this.$store.getters[this.pageid+"/goods"];
                let params = {
					'begin_date': this.getResult.getTime(begin_date),
					'end_date': this.getResult.getTime(end_date),
					'supply_ids':supply_ids,
					'billnum':billnum,
					'goodsname':goodsname,
					'gid':this.gid,
					'hierarchytype': 4,
					'page': 1,
					'rows': 20
				};
//              let params = {
//					'begin_date': '2017-01-01',
//					'end_date': '2018-01-01',
//					'supplier_code':'001',
//					'billnum':'DH0101027512201612110001',
//					'goodsname':'东北五常大米1',
//					'hierarchytype': 4,
//					'page': 1,
//					'rows': 20
//				};
				_this.rows=[];
				let SummaryStatisticsUrl = '/report/PurchaseOrderExecuteResultRest/purchaseOrderExecuteResult';
				this.getResult.getResult(SummaryStatisticsUrl, params, function(result) {
					//_this.rows = result.rows; 
					
					if(result.length>0){
						if(result.rows.length>0){
						result.rows.forEach((r)=>{
							let obj = {};
							for(let p in r){
								let lowercasep = p.toLowerCase();//将大写转换成小写
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
			}
		}
	}
</script>

<style>
	.dialogItem{
		width: 75%!important;
		height: 65%;
	}
	.drill_Table{
		width: 95%;
		margin-left: 2.5%;
	}
</style>