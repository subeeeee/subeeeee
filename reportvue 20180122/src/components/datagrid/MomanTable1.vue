<template>
	<div class="datagrid1">
		<el-table
			ref="datagrid1"
			v-loading="datagridOne.loading"
			:border="true"
			:element-loading-text="loadingText"
	    	:data="datagridOne.rows"
	    	:height="tableHeight"
	    	:summary-method="getSummaries"
			show-summary
	    	@selection-change="SelectionChangeFun"
	    	@cell-mouse-enter="CellMouseEnterFunOne"
	    	@cell-mouse-leave="CellMouseLeaveFunOne"
	    	@expand-change="expandOneFun"
	    	style="width: 100%;">
    			<el-table-column 
    				v-if="datagridOne.open"
		    		type="expand"
		    		header-align="center"
		    		prop="expand"
	    			:resizable="false"
	    			:fixed="datagridOne.fixed"
		    		width="30">
		    		<template slot-scope="props">
		    			<table2 
		    				ref="datagrid2"
		    				v-on:SetDateGrid="SetDateGrid"
		    				:columns="datagridOne.columns"
		    				:datagridTwo="datagridTwo"
		    				:expandOne_row="expandOne_row"
		    				:PageSizeTwo="datagridOne.PageSize"
		    				:PageSizeList="PageSizeList"
		    				:datagridThree="datagridThree"></table2>
		    		</template>
		    	</el-table-column>
		    	<el-table-column 
    				v-if="datagridOne.selection"
		    		type="selection"
		    		:resizable="false"
		    		header-align="center"
		    		:fixed="datagridOne.selectionfixed"
		    		width="30">
		    	</el-table-column>
	    		<template v-for="(item1, index) in datagridOne.columns">
	    			<el-table-column
	    				v-if="!item1.hide"
	    				:prop="item1.prop"
	    				:label="item1.label"
	    				:class-name="item1.prop+'-item'"
	    				:label-class-name="item1.prop+'-label'"
	    				:width="item1.width"
	    				:resizable="false"
	    				:fixed="item1.fixed"
	    				:align="item1.align"
						:formatter="item1.formatter"
	    				:sortable="item1.is_sort && item1.children.length == 0"
	    				:show-overflow-tooltip="true"
	    				:type="item1.type"
	    				:header-align="item1.children.length == 0?'':'center'">
	    				<template slot-scope="scope">
	    					
	    					<span v-if="item1.prop == 'store_name' || item1.prop == 'report_date' || !scope.row.selectType">
	    						{{scope.row[item1.prop]}}
	    					</span>
	    					<span 
	    						class="bqq_btq_"
	    						v-if="item1.prop != 'store_name' && item1.prop != 'report_date' && scope.row.selectType == 2">
	    						<a class="bqq_" :style="'text-align:'+item1.align">
	    							<i v-if="scope.row['bqq_'+item1.prop+'_'] != 2 && item1.fist">比上期</i>
	    							<i 
	    								:class="scope.row['bqq_'+item1.prop+'_'] == 1 ?'up':''"
	    								v-if="scope.row['bqq_'+item1.prop+'_'] == 1">↑</i>
	    							<i 
	    								:class="scope.row['bqq_'+item1.prop+'_'] == 0 ?'down':''"
	    								v-if="scope.row['bqq_'+item1.prop+'_'] == 0">↓</i>
	    							<i
	    								:class="scope.row['bqq_'+item1.prop+'_'] == 1 ?'up':scope.row['bqq_'+item1.prop+'_'] == 0?'down':''">{{scope.row['bqq_'+item1.prop]}}</i>
	    						</a>
	    						<a class="btq_" :style="'text-align:'+item1.align">
	    							<i v-if="scope.row['btq_'+item1.prop+'_'] != 2  && item1.fist" >比同期</i>
	    							<i 
	    								:class="scope.row['btq_'+item1.prop+'_'] == 1 ?'up':''"
	    								v-if="scope.row['btq_'+item1.prop+'_'] == 1">↑</i>
	    							<i 
	    								:class="scope.row['btq_'+item1.prop+'_'] == 0 ?'down':''"
	    								v-if="scope.row['btq_'+item1.prop+'_'] == 0">↓</i>
	    							<i
	    								:class="scope.row['btq_'+item1.prop+'_'] == 1 ?'up':scope.row['btq_'+item1.prop+'_'] == 0?'down':''">{{scope.row['btq_'+item1.prop]}}</i>
	    						</a>
	    					</span>
	    				</template>
	    					<template v-for="(item2, index2) in item1.children">
				    			<el-table-column
				    				v-if="!item2.hide"
				    				:prop="item2.prop"
				    				:label="item2.label"
				    				:width="item2.width"
				    				:resizable="false"
				    				:fixed="item2.fixed"
				    				:align="item2.align"
				    				:show-overflow-tooltip="true"
				    				:header-align="item2.children.length == 0?'':'center'"
				    				:formatter="item2.formatter"
				    				:sortable="item2.is_sort && item2.children.length == 0">
				    				<template slot-scope="scope">
				    					<span v-if="item2.prop == 'store_name' || item2.prop.prop == 'report_date' || !scope.row.selectType">
				    						{{scope.row[item2.prop]}}
				    					</span>
				    					
				    					<span class="bqq_btq_" v-if="scope.row[item2.prop] == undefined">
				    						<a class="bqq_" :style="'text-align:'+item2.align">无上期数据</a>
				    						<a class="btq_" :style="'text-align:'+item2.align">无同期数据</a>
				    					</span>
				    					<span 
				    						class="bqq_btq_"
				    						v-if="item2.prop != 'store_name' && item2.prop != 'report_date' && scope.row.selectType == 2">
				    						<a class="bqq_" :style="'text-align:'+item2.align">
				    							<i v-if="scope.row['bqq_'+item2.prop+'_'] != 2  && item2.fist">比上期</i>
				    							<i 
				    								:class="scope.row['bqq_'+item2.prop+'_'] == 1 ?'up':''"
				    								v-if="scope.row['bqq_'+item2.prop+'_'] == 1">↑</i>
				    							<i 
				    								:class="scope.row['bqq_'+item2.prop+'_'] == 0 ?'down':''"
				    								v-if="scope.row['bqq_'+item2.prop+'_'] == 0">↓</i>
				    							<i
				    								:class="scope.row['bqq_'+item2.prop+'_'] == 1 ?'up':scope.row['bqq_'+item2.prop+'_'] == 0?'down':''">{{scope.row['bqq_'+item2.prop]}}</i>
				    						</a>
				    						<a class="btq_" :style="'text-align:'+item2.align">
				    							<i v-if="scope.row['btq_'+item2.prop+'_'] != 2  && item2.fist">比同期</i>
				    							<i 
				    								:class="scope.row['btq_'+item2.prop+'_'] == 1 ?'up':''"
				    								v-if="scope.row['btq_'+item2.prop+'_'] == 1">↑</i>
				    							<i 
				    								:class="scope.row['btq_'+item2.prop+'_'] == 0 ?'down':''"
				    								v-if="scope.row['btq_'+item2.prop+'_'] == 0">↓</i>
				    							<i
				    								:class="scope.row['btq_'+item2.prop+'_'] == 1 ?'up':scope.row['btq_'+item2.prop+'_'] == 0?'down':''">{{scope.row['btq_'+item2.prop]}}</i>
				    						</a>
				    					</span>
				    				</template>
				    			</el-table-column>
				    		</template>
	    			</el-table-column>
	    		</template>
	   </el-table>
	   <div class="pager" v-if="datagridOne.total > PageSizeOne">	   	
		   	<el-pagination 
		   	  @size-change="PageSizeChangeOne"
		   	  @current-change="PageIndexChangeOne"
		   	  :current-page="PageIndexOne"
		   	  :page-sizes="PageSizeList"
		   	  :page-size="PageSizeOne"
		   	  layout=" sizes,prev, sizes, total, pager, next,jumper"
		   	  :total="datagridOne.total">
		   	</el-pagination>
	   </div>
	</div>
</template>


<script>
	import table2 from './table2'
	export default {
		name:'table1',
		components:{
			table2
		},
		props:{
			datagridOne:{
				type:Object,
				default:{
					'rows': [],
					'footer': [],
					'total': 1,
					'selection': false,
					'open': true,
					'fixed':false,
					'selectionfixed':false,
					'loading': true,
					'columns': [],
					'PageIndex':1,
					'PageSize':20,
				}
			},
			datagridTwo:{
				type:Object,
				default:{
					'rows': [],
					'total': 1,
					'open':true,
					'loading': true,
				}
			},
			datagridThree:{
				type:Object,
				default:{
					'rows': [],
					'total': 1,
					'open':false,
					'loading': true,
				}
			},
		},
		data() {
			return {
				PageIndexOne:1,
				PageSizeOne:10,
				tableHeight:1000,//初始化table的高度
				hierarchytype:1,//当前table的级别
				loadingText:'拼命加载中',
				expandOne_row:{},//展开行数据
				expandIndex:-1,//展开行的位置-1表示不存在，没有展开
				PageSizeList:[20,30,50]
			}
		},
		created(){
			this.PageSizeOne = this.datagridOne.PageSize;
			let seft = this;
			setTimeout(() => {
				seft.CalculatedHeight();
			},0)
			$(window).off('resize');
			$(window).on('resize',function(){
				seft.CalculatedHeight();
			});
			this.SetDateGrid({
				type:'export',
				selections:[],
				desc:'此次调用是在表格created之后调用,目的是给主界面设置页数和条数,不走查询方法'
			});
		},
		updated(){
			$('.datagrid1>.el-table>.el-table__body-wrapper').scroll(function(evt){
				let sleft = $(this).scrollLeft();
				let pager1 = $('.datagrid1>.pager>.el-pagination');
				let pager2 = $('.datagrid2>.pager>.el-pagination');
				let pager3 = $('.datagrid3>.pager>.el-pagination');
				let width = $('#app').width();
				//计算表格的最大宽度
				let maxwidth = $('.datagrid1>.el-table>.el-table__body-wrapper>.el-table__body').width();
				let width1 = pager1.width();
				let width2 = pager2.width();
				let width3 = pager3.width();
				let left1 = width - width1 + 20;
				let left2 = width - width2 - 50;
				let left3 = width - width3 - 100;
				if(width < maxwidth){
					pager2.css('left',sleft + left2);
					pager3.css('left',sleft + left3);
				}

			});
			
			this.CalculatedHeight();
			let seft = this;
			$('.datagrid1 .el-table__expand-icon').off('click');
			$('.datagrid1 .el-table__expand-icon').on('click',(event) => {
				let div = $(event.currentTarget);
				setTimeout(() => {					
					if(div.hasClass('el-table__expand-icon--expanded')){					
						let tr = div.parents('tr.el-table__row');
						let tbody = tr.parent();
						let tr_arr = tbody.children('tr.el-table__row');
						this.expandIndex = tr.index();
						$(tr_arr).each(function(index, item){
							let _index = $(item).index();
							if(_index != seft.expandIndex){
								let table__expand = $(item).find('.el-table__expand-icon');
								if(table__expand.hasClass('el-table__expand-icon--expanded')){
									table__expand.click();
								}
							}
						});
					}
				},0);
			})
		},
		methods:{
			SetFiexd(){
				//设置冻结情况下的滚动条
				//冻结只考虑一级
				let fixedcount = 0;
				let fixedwidth = 0;
				this.datagridOne.columns.forEach((item, index) => {
					if(item['fixed']){
						fixedcount += 1;
						fixedwidth += item['width'];
					}
				})
				if(this.datagridOne.fixed){
					fixedcount += 1;
					fixedwidth += 50;
				}
				if(this.datagridOne.selectionfixed){
					fixedcount += 1;
					fixedwidth += 50;
				}
				let width = $('.datagrid1').width();
				$('.datagrid1>.el-table>.el-table__body-wrapper').css({
					'left':fixedwidth,
					'right':'0px',
					'width':width - fixedwidth,
				});
				$('.datagrid1>.el-table>.el-table__body-wrapper>.el-table__body').css('margin-left',0-fixedwidth);
			},
			CalculatedHeight(){
				this.SetFiexd();
				//视图更新完成
				//获取当前body可用的最大高度
				let height = $('.el-main').height();
				//获取当前body可用的最大宽度
				let width = $('#app').width();
				//获取参数区域的高度
				let height1 = $('.params').height() + 10;
				//获取分页区域的高度(+20是因为它有个margin-top贺margin-bottom值)
				let height2 = $('.datagrid1>.pager').height() + 0;
				//获取分页区域的宽度
				let width1 = $('.datagrid1>.pager>.el-pagination').width();
				//计算表格的最大宽度
				let maxwidth = $('.datagrid1>.el-table>.el-table__body-wrapper>.el-table__body').width();
				//计算表格高度
				let height3 = height - height1;
				this.tableHeight = height3 - height2;
				$('.datagrid1').css('height',height3 + 'px');
				$('.datagrid1>.pager>.el-pagination').css('right','40px');
				$('.datagrid2>.pager>.el-pagination').css('right','40px');
				$('.datagrid3>.pager>.el-pagination').css('right','40px');
				 
			},
			getSummaries(param) {
				//单元格合计
				if(param.data.length == 0) {
					return '';
				} else {
					const {columns,data} = param;
					const footer = this.datagridOne.footer[0];
					
					const sums = [];
					columns.forEach((column, index) => {
						if(index == 0 || !column['property']) {
							sums[index] = '';
						} else{
							let field_type =  this.GetDateType(column['property']);
							if(field_type == 'float'){
								let itemprop = parseFloat(footer[column['property']] || 0).toFixed(2);
								let intnum = 0; //整数部分数值初始化
								let floatnum = "00"; //小数部分数值初始化
								if(itemprop.indexOf(".")) { //如果是小数
									intnum = itemprop.split('.')[0]; //取整数部分
									floatnum = itemprop.split('.')[1]; //取小数部分
								}
								intnum = this.ThousandsNum(intnum); //整数部分加千位符
								sums[index] = "￥" + intnum + "." + floatnum;
							}else if(field_type == 'integer'){
								let itemprop = parseInt(footer[column['property']]||0).toFixed(2);
								let intnum = 0; //整数部分数值初始化
								let floatnum = "00"; //小数部分数值初始化
								if(itemprop.indexOf(".")) { //如果是小数
									intnum = itemprop.split('.')[0]; //取整数部分
									floatnum = itemprop.split('.')[1]; //取小数部分
								}
								sums[index]  = this.ThousandsNum(intnum); //整数部分加千位符
							}else if(field_type == 'percentage'){
								sums[index] = (parseFloat(footer[column['property']]||0)*100).toFixed(2) + '%';
							}else{
								sums[index] = footer[column['property']];
							}
						}
					});
					return sums;
				}
			},
			ThousandsNum(num) {
				//数据格式化-千分位符
				var num = (num || 0).toString(),
					re = /\d{3}$/,
					result = '';
				while(re.test(num)) {
					result = RegExp.lastMatch + result;
					if(num !== RegExp.lastMatch) {
						result = ',' + result;
						num = RegExp.leftContext;
					} else {
						num = '';
						break;
					}
				}
				if(num) {
					result = num + result;
				}
				return result;
			},
			GetDateType(field){
				const columns = this.datagridOne.columns;
				 let lst = {};
				 columns.forEach((a,b)=> {
				 	lst[a['prop']] = a;
				 	if(a['children'].length > 0){
				 		a['children'].forEach((c,d)=> {
						 	lst[c['prop']] = c;
						 	if(c['children'].length > 0){
						 		c['children'].forEach((e,f)=> {
								 	lst[e['prop']] = e;
								});
						 	}
						});
				 	}
				 }); 
				 if(lst[field]){
				 	return lst[field]['data_type'];
				 }else{
				 	return '';
				 }
				
				
			},
			SetDateGrid(params = []){
				let pps = {
		    		'key':'datagridOne',
		    		'PageIndex':this.PageIndexOne,
		    		'PageSize':this.PageSizeOne,
		    		'hierarchytype':this.hierarchytype
		    	};
		    	for(let item in params){
		    		pps[item] = params[item];
		    	}
		    	if(params['type'] != 'export'){
		    		//如果是导出,则不显示加载状态
		    		this[pps['key']]['loading'] = true;
		    		this.$set(this[pps['key']],'loading',true);
		    		//this.$set('需要设置的对象/集合'，'该对象(集合)中具体的属性/下标'，'更新后的属性/数据');
		    	}
				this.$emit('SetDateGrid',pps);
			},
			//当选择项发生变化时会触发该事件
			SelectionChangeFun(selection){
				let params = {
					'type':'export',
					'rows':selection,
					'selections':selection,
				};
				this.SetDateGrid(params);
			},
			expandOneFun(rows,expanded){
				console.log('PageSizeOne',this.PageSizeOne);
				if(expanded){
					//展开了行
					setTimeout(() => {	
						//展开查询的是二级数据，所以级别是二级
						this.hierarchytype = 2;
						this.SetDateGrid({
							'type':'expand',
							'rows':rows,
							'PageIndex':1,
		    				'PageSize':this.PageSizeOne,
							'key':'datagridTwo',
						});
					}, 0);
					this.expandOne_row = rows;
				}
			},
			PageSizeChangeOne(val) {
				this.PageSizeOne = val;
				this.PageIndexOne == 1 && this.PageIndexChangeOne(this.PageIndexOne);
				this.PageIndexOne != 1 && (this.PageIndexOne = 1);
		    },
		    PageIndexChangeOne(val) {
		    	this.PageIndexOne = val;
		    	//点击了当前table的分页，恢复级别为一级
		    	this.hierarchytype = 1;
		        this.SetDateGrid();
		    },
		    CellMouseEnterFunOne(row, column, cell, event){
		    	//hover事件
		    	if($(cell).hasClass('el-table__expand-column')){
					//说明鼠标悬壶的位置是展开按钮
					let tr = $(cell).parent();
					this.expand_index = tr.index();
				}
				setTimeout(function() {
					let index = $(cell).parent().index();
					$(cell).parent().removeClass('active-row');
					$('tr').removeClass('active-row');
					let tbs = $('.datagrid1 .el-table__body');
					$(tbs).each((k,v)=>{
						if($(v).parents('.datagrid2')[0] == undefined){
							let tbody = $(v).children('tbody');
							let tr1 = tbody.children('tr');
							let tr2 = $(cell).parent().prevAll();
							let tr3 = $(cell).parent().prevAll('.el-table__row');
							tr1.eq(index).addClass('active-row')
						}
					});
				}, 10);
		    },
		    CellMouseLeaveFunOne(row, column, cell, event){
		    	//hover 离开事件
		    	$('.datagrid1 tr').removeClass('active-row');
		    }
		}
	}
</script>

<style>
html,body,#app{
	width: 100%;
	height: 100%;
	padding: 0px;
	margin: 0px;
}
.datagrid{
	display: inline-block;
	width: 100%;
}
.pager{
	padding: 10px 0px;
	text-align: left;
	height: 35px;
}
.pager>.el-pagination{
	position: absolute;
}
.datagrid1{
	width: 100%;
	height: 100%;
}

.datagrid1 .el-table__expanded-cell{
	padding: 0px;
	padding-left: 50px;
}
.datagrid1 .el-table .cell, .el-table th>div{
	padding: 0px 5px;
	padding-left: 14px;
	padding-right: 14px;
}

.datagrid2 .el-table__body-wrapper{
	overflow: hidden;
}
.datagrid1 .el-table .cell, 
.el-table th>div{
	padding: 0px 5px;
}
.datagrid2>.el-table>.el-table__fixed,
.datagrid2>.el-table>.el-table__fixed-right,
.datagrid3>.el-table>.el-table__fixed,
.datagrid3>.el-table>.el-table__fixed-right{
	overflow: hidden;
	height: 100%!important;
}
.el-table td, .el-table th{
	padding: 0px;
}
.el-table__fixed-right{
	overflow: hidden;
}
.datagrid3 .el-table__fixed{
	overflow: hidden;
}
.el-table__fixed{
	height: 100%!important;
	overflow: hidden;
}
.el-table__row.hover-row>td{
	background-color: transparent!important;
}
.el-table__row.active-row>td{
	background-color: #eef1f6!important;
}

.el-table td, 
.el-table th.is-leaf, 
.el-table--border th, 
.el-table__fixed-right-patch{
	border-bottom: 1px solid #dfe6ec!important;
	font-size: 12px;
	color: #243546;
	line-height: 18px;
}
.el-table--border td, 
.el-table--border th{
	border-right: 1px solid #dfe6ec!important;
}
.datagrid1>.el-table{
	border-top: 1px solid #dfe6ec;
}
.el-table-column--selection>.cell{
	text-align: center;
}
.el-table .sort-caret.descending{
	bottom: 8px!important;
}
/*比上期==比同期*/
.bqq_btq_{
	display: inline-block;
    width: 100%;
    padding-top: 5px;
}
.bqq_btq_>.bqq_ ,
.bqq_btq_>.btq_{
    display: inline-block;
    width: 100%;
    float: left;
    text-align: center;
}
.bqq_btq_>.bqq_>i,
.bqq_btq_>.btq_>i{
	font-style: normal;
}
.bqq_>.down,
.btq_>.down{
	color: green;
}
.bqq_>.up,
.btq_>.up{
	color: red;
}
</style>