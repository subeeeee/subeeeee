<template>
	<div class="datagrid3">
		<el-table
			ref="datagrid3"
			v-loading="datagridThree.loading"
			:element-loading-text="loadingText"
			:show-header="false"
	    	:data="datagridThree.rows"
	    	:border="true"
	    	@cell-mouse-enter="CellMouseEnterFunThree"
	    	@cell-mouse-leave="CellMouseLeaveFunThree"
	    	style="width: 100%">
	    		<template v-for="(item1, index1) in columns">
	    			<el-table-column
	    				v-if="!item1.hide"
	    				:prop="item1.prop"
	    				:label="item1.label"
	    				:width="(index1 == 0)?(item1.width ) : item1.width"
	    				:resizable="false"
	    				:type="item1.type"
	    				:align="item1.align"
	    				:formatter="item1.formatter">
	    					<template v-for="(item2, index2) in item1.children">
				    			<el-table-column
				    				v-if="!item2.hide"
				    				:prop="item2.prop"
				    				:label="item2.label"
				    				:resizable="false"
				    				:width="item2.width"
				    				:align="item2.align"
				    				:formatter="item2.formatter">
				    					<template v-for="(item3, index3) in item2.children">
							    			<el-table-column
							    				v-if="!item3.hide"
							    				:prop="item3.prop"
							    				:label="item3.label"
							    				:resizable="false"
							    				:align="item3.align"
							    				:width="item3.width"
							    				:formatter="item3.formatter">
							    			</el-table-column>
							    		</template>
				    			</el-table-column>
				    		</template>
	    			</el-table-column>
	    		</template>
	   </el-table>
	   <div class="pager">	   	
		   	<el-pagination
		      v-if="datagridThree.total > PageSizeThree"
		   	  @size-change="PageSizeChangeThree"
		   	  @current-change="PageIndexChangeThree"
		   	  :current-page="PageIndexThree"
		   	  :page-sizes="PageSizeList"
		   	  :page-size="PageSizeThree"
		   	  layout="total, sizes, prev, pager, next, jumper"
		   	  :total="datagridThree.total">
		   	</el-pagination>
	   </div>
	</div>
</template>


<script>
	export default {
		name:'table1',
		props:{
			datagridThree:{
				type:Object,
				default:{
					'rows': [],
					'total': 1,
					'loading': true,
				}
			},
			PageSizeList:{
				type:Array,
				default:[10,30,200]
			},
			expandTwo_row:{
				type:Object,
				default:{}
			},
			columns:{
				type:Array,
				default:[]
			},
			PageSizeThree:{
				type:Number,
				default:10
			}
		},
		data() {
			return {
				PageIndexThree:1,
				hierarchytype:1,//当前table的级别
				loadingText:'拼命加载中'
			}
		},
		updated(){
			//获取当前body可用的最大宽度
			let width = $('#app').width();
			//获取分页区域的宽度
			let width1 = $('.datagrid3>.pager>.el-pagination').width();
			//计算表格的最大宽度
			let maxwidth = $('.datagrid1>.el-table>.el-table__body-wrapper>.el-table__body').width();
			if(width > maxwidth){
				width = maxwidth;
			}
			$('.datagrid3>.pager>.el-pagination').css('left',(width - width1 - 100)+'px');
		},
		methods:{
			SetDateGrid(params = []){
				let pps = {
					'key':'datagridThree',
					'rows':this.expandTwo_row,
		    		'PageIndex':this.PageIndexThree,
		    		'PageSize':this.PageSizeThree,
		    		'hierarchytype':this.hierarchytype
				};
				for(let item in params){
		    		pps[item] = params[item];
		    	}
				//this.$set(this[pps['key']],'loading',true);
				this.$emit('SetDateGrid',pps);
			},
			PageSizeChangeThree(val) {
				this.PageSizeThree = val;
				this.hierarchytype = 3;
				this.PageIndexThree == 1 && this.PageIndexChangeThree(this.PageIndexThree);
				this.PageIndexThree != 1 && (this.PageIndexThree = 1);
		    },
		    PageIndexChangeThree(val) {
		    	this.PageIndexThree = val;
		    	this.hierarchytype = 3;
		    	this.SetDateGrid();
		    },
		    CellMouseEnterFunThree(row, column, cell, event){

		    	if($(cell).hasClass('el-table__expand-column')){
					this.expand_index = $(cell).parent().index();
				}
				setTimeout(function() {
					let index = $(cell).parent().index();
					$('tr').removeClass('active-row');
					let tbs = $('.datagrid3 .el-table__body');
					$(tbs).each((k,v)=>{
						let tbody = $(v).children('tbody');
						let tr1 = tbody.children('tr');
						//let tr2 = $(cell).parent().prevAll();
						//let tr3 = $(cell).parent().prevAll('.el-table__row');
						tr1.eq(index).addClass('active-row');
					});
				}, 10);
		    },
		    CellMouseLeaveFunThree(row, column, cell, event){
		    	//hover 离开事件
		    	$('.datagrid1 tr').removeClass('active-row');
		    }
		}
	}
</script>

<style>

</style>