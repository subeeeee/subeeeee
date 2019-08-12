<template>
	<div :class="[datagrid2]">
		<el-table
			ref="datagrid2"
			v-loading="datagridTwo.loading"
			:element-loading-text="loadingText"
			:show-header="false"
	    	:data="datagridTwo.rows"
	    	:border="true"
	    	@cell-mouse-enter="CellMouseEnterFunTwo"
	    	@cell-mouse-leave="CellMouseLeaveFunTwo"
	    	@expand="expandTwoFun"
	    	style="width: 100%">
    			<el-table-column
		    		v-if="datagridTwo.open"
		    		type="expand"
		    		prop="expand"
	    			label="expand"
	    			:fixed="datagridTwo.fixed"
		    		:resizable="false"
		    		width="50">
		    		<template scope="props">
		    			<table3 
		    				ref="datagrid3"
		    				v-on:SetDateGrid="SetDateGrid"
		    				:expandTwo_row="expandTwo_row"
		    				:datagridThree="datagridThree"
		    				:PageSizeList="PageSizeList"
		    				:columns="columns"></table3>
		    		</template>
		    	</el-table-column>
	    		<template v-for="(item1, index1) in columns">
	    			<el-table-column
	    				v-if="!item1.hide"
	    				:prop="item1.prop"
	    				:label="item1.label"
	    				:resizable="false"
	    				:align="item1.align"
	    				:formatter="item1.formatter"
	    				:width="(index1 == 0 && !datagridTwo.open)?(item1.width + 50) : item1.width"
	    				:type="item1.type">
	    					<template v-for="(item2, index2) in item1.children">
				    			<el-table-column
				    				v-if="!item2.hide"
				    				:prop="item2.prop"
				    				:label="item2.label"
				    				:width="item2.width"
				    				:align="item2.align"
				    				:formatter="item2.formatter"
				    				:resizable="false">
				    					<template v-for="(item3, index3) in item2.children">
							    			<el-table-column
							    				v-if="!item3.hide"
							    				:prop="item3.prop"
							    				:label="item3.label"
							    				:resizable="false"
							    				:align="item3.align"
							    				:formatter="item3.formatter"
							    				:width="item3.width">
							    			</el-table-column>
							    		</template>
				    			</el-table-column>
				    		</template>
	    			</el-table-column>
	    		</template>
	   </el-table>
	   <div class="pager">	   	
		   	<el-pagination
		   	  v-if="datagridTwo.total > PageSizeTwo"
		   	  @size-change="PageSizeChangeTwo"
		   	  @current-change="PageIndexChangeTwo"
		   	  :current-page="PageIndexTwo"
		   	  :page-sizes="PageSizeList"
		   	  :page-size="PageSizeTwo"
		   	  layout="total, sizes, prev, pager, next, jumper"
		   	  :total="datagridTwo.total">
		   	</el-pagination>
	   </div>
	</div>
</template>


<script>
	import table3 from '@/components/FixedTable/table3'
	export default {
		name:'table1',
		components:{
			table3
		},
		computed:{
			GetDataRow(){
				return this.rows.data;
			},
			GetDataRowLoading(){
				return this.rows.loading == undefined ? true : this.rows.loading;
			}
		},
		props:{
			expandTwo:{
				type:Boolean,
				default:false
			},
			PageSizeList:{
				type:Array,
				default:[10,30,200]
			},
			datagridTwo:{
				type:Object,
				default:{
					'rows': [],
					'total': 1,
					'open':false,
					'loading': true,
				}
			},
			datagridThree:{
				type:Object,
				default:{
					'rows': [],
					'total': 1,
					'loadingOne': true,
				}
			},
			columns:{
				type:Array,
				default:[]
			},
			expandOne_row:{
				type:Object,
				default:{}
			},
			PageSizeTwo:{
				type:Number,
				default:10
			}
		},
		data() {
			return {
				PageIndexTwo:1,
				timer:0,
				hierarchytype:1,//当前table的级别
				loadingText:'拼命加载中',
				open:false,
				expandIndex:-1,//展开的行index
				expandCount : 0,//展开的个数
				expandTwo_row : {},//展开的行数据(当前二级表格的展开行数据),
				datagrid2:'datagrid2',//二级表格默认的样式
                paddingleft50:'paddingleft50',//不可展开三级时加载此样式
			}
		},
		updated(){
			let seft = this;
			//获取当前body可用的最大宽度
			let width = $('#app').width();
			//获取分页区域的宽度
			let width1 = $('.datagrid2>.pager>.el-pagination').width();
			//计算表格的最大宽度
			let maxwidth = $('.datagrid1>.el-table>.el-table__body-wrapper>.el-table__body').width();
			if(width > maxwidth){
				width = maxwidth;
			}
			$('.datagrid2>.pager>.el-pagination').css('left',(width - width1 - 50)+'px');
			
			/*$('.datagrid2').off('click','.el-table__expand-icon');
			$('.datagrid2').on('click','.el-table__expand-icon',function(e){
				if(!$(this).has('el-table__expand-icon--expanded')){					
					console.log(1,this);
					//关闭
				}else{
					console.log(2,seft);
					//点开
				}
			});*/
			
		},
		methods:{
			SetDateGrid(params = []){
				let seft = this;
				let pps = {
					'key':'datagridTwo',
					'rows':seft.expandOne_row,
		    		'PageIndex':seft.PageIndexTwo,
		    		'PageSize':seft.PageSizeTwo,
		    		'hierarchytype':seft.hierarchytype
				};
				for(let item in params){
		    		pps[item] = params[item];
		    }
				this.$emit('SetDateGrid',pps);
			},
			PageSizeChangeTwo(val) {
				this.PageSizeTwo = val;
				this.PageIndexTwo == 1 && this.PageIndexChangeTwo(this.PageIndexTwo);
				this.PageIndexTwo != 1 && (this.PageIndexTwo = 1);
		    },
		    PageIndexChangeTwo(val) {
		    	this.hierarchytype = 2;
		    	this.PageIndexTwo = val;
		        this.SetDateGrid();
		    },
			expandTwoFun(row,expanded){
				/*let _this = this;
				let el_table = $('.datagrid1>.el-table');
				let el_table__wrapper= el_table.children('.el-table__body-wrapper');
				let center_datagrid2 = el_table__wrapper.find('.datagrid2');
				let center_table__body = center_datagrid2.find('.el-table__body');

				$(center_table__body).each((k,v) => {
					if($(v).parents('.datagrid3')[0] == undefined){
						if($(v).parent().parent().hasClass('el-table__fixed') && _this.expand_index != -1){
							let tbody = $(v).children('tbody');
							let tr = tbody.children('tr');
							let span = tr.eq(_this.expand_index).find('.el-table__expand-icon');
							if(span[0]){								
								span.click();
								for(let i = 0; i<tr.length; i++){
									if(i != _this.expand_index){										
										let _span = $(tr.eq(i)).find('.el-table__expand-icon--expanded');
										if(_span[0]){											
											_span.click();
										}
									}
								}
							}
						}
					}
				});*/
				
				if(expanded) {
					if($('.datagrid1').attr('open') != 'open'){
						$('.datagrid1').attr('open','open');
						setTimeout(() => {
							$('.datagrid1').removeAttr('open');
						},1000 * 3);
						this.hierarchytype = 3;
						this.expandTwo_row = row;
						this.SetDateGrid({
							'type':'expand',
							'rows':row,
							'PageIndex':1,
		    				'PageSize':10,
							'key':'datagridThree',
						});
					}
					
					//展开后，关闭其他已经展开的
					
					/*let left_el_table__fixed = el_table.children('.el-table__fixed');
					
					let left_datagrid2 = left_el_table__fixed.find('.datagrid2');
					
					let tr = left_datagrid2.find('tr');
					
					$(tr).each((k,v) => {
						if($(v).parents('.datagrid3')[0] == undefined){
							//需要关闭的二级,需要排除三级
							let span = $(v).find('.el-table__expand-icon');
							if(span.hasClass('el-table__expand-icon--expanded')){
								span.click();
								$(center_table__body).each((k,v) => {
									if($(v).parents('.datagrid3')[0] == undefined){
										if($(v).parent().parent().hasClass('el-table__fixed') && _this.expand_index != -1){
											let tbody = $(v).children('tbody');
											let tr = tbody.children('tr');
											let span = tr.eq($(v).index()).find('.el-table__expand-icon');
											span.click();
										}
									}
								});
							}
						}
					});*/
				}
			},
			SetExpandRowsTwo(rows){
				this.expandTwo_row = rows;
			},
			expandTwoCenterAndRightFun(){
				let seft = this;
				let left_table__fixed = $('.datagrid1>.el-table>.el-table__fixed');
		    	let center_table__body = $('.datagrid1>.el-table>.el-table__body-wrapper');
		    	let right_table__fixed = $('.datagrid1>.el-table>.el-table__fixed-right');
		    	
		    	let left_tr = left_table__fixed.find('.datagrid2>.el-table>.el-table__body-wrapper>.el-table__body>tbody>tr');
		    	let center_tr = center_table__body.find('.datagrid2>.el-table>.el-table__body-wrapper>.el-table__body>tbody>tr');
		    	let right_tr = right_table__fixed.find('.datagrid2>.el-table>.el-table__body-wrapper>.el-table__body>tbody>tr');
		    	$(left_tr).each((k, v) => {
		    		let expanded = $(v).find('.el-table__expand-icon').hasClass('el-table__expand-icon--expanded');
		    		if(expanded && k != seft.expandIndex){
		    			left_tr.eq(k).find('.el-table__expand-icon').click();
		    			center_tr.eq(k).find('.el-table__expand-icon').click();
		    			right_tr.eq(k).find('.el-table__expand-icon').click();
		    		}
		    	});
		    	center_tr.eq(this.expandIndex).find('.el-table__expand-icon').click();
		    	right_tr.eq(this.expandIndex).find('.el-table__expand-icon').click();
	    		$(left_tr).off('click','.el-table__expand-icon');
		    	$(left_tr).on('click','.el-table__expand-icon',function(){
		    		$(left_tr).off('click','.el-table__expand-icon');
		    		let expand = $(this).hasClass('el-table__expand-icon--expanded');
		    		seft.expandTwoCenterAndRightFun();
		    	});
			},
			
		    CellMouseEnterFunTwo(row, column, cell, event){
		    	if($(cell).hasClass('el-table__expand-column')){
					this.expand_index = $(cell).parent().index();
				}
				setTimeout(function() {
					let index = $(cell).parent().index();
					$('tr').removeClass('active-row');
					let tbs = $('.datagrid2 .el-table__body');
					$(tbs).each((k,v)=>{
						if($(v).parents('.datagrid3')[0] == undefined){
							let tbody = $(v).children('tbody');
							let tr1 = tbody.children('tr');
							//let tr2 = $(cell).parent().prevAll();
							//let tr3 = $(cell).parent().prevAll('.el-table__row');
							tr1.eq(index).addClass('active-row');
						}
					});
				}, 10);
		    },
		    CellMouseLeaveFunTwo(row, column, cell, event){
		    	//hover 离开事件
		    	$('.datagrid1 tr').removeClass('active-row');
		    }
		}
	}
</script>

<style>
   .paddingleft50{/****如果没有展开图标左侧留白50像素*****/
   	padding-left:50px;
   }
</style>