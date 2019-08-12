<template>
	<div class="querystore">
		 <ul>
		 	<li>
		 		<!--<el-input size="small" class="QueryStoreItem">
				    <template slot="append">
				    	<span class="openstore">-->
				 			<el-popover
							  ref="popover2"
							  placement="bottom"
							  title="交易门店"
							  trigger="click"
							  popper-class="StoreTreeItem"
							  content="">
							  	<div class="store_Array">
							  		<div class="store_header">
							  			<span>当前共选择了:</span>
							  			<span class="select_store">
							  				<template v-for="item in sum_store_list">
							  					<a>{{item}}</a>,
							  				</template>
							  			</span>
							  			<span>(总计{{sum_store_count}}家门店)</span>
							  		</div>
							  		<div class="store_body">
							  			<ul>
							  				<li v-if="store_index >= 1">
							  					<span>机构级别1</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value1" 
							  							size="small"
							  							@visible-change="VisibleChangeFun1"
							  							placeholder="机构级别一">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data1"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree1"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value1_1"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 2">
							  					<span>机构级别2</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value2" 
							  							size="small"
							  							@visible-change="VisibleChangeFun2"
							  							placeholder="机构级别二">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data2"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree2"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value2_2"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 3">
							  					<span>机构级别3</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value3" 
							  							size="small"
							  							@visible-change="VisibleChangeFun3"
							  							placeholder="机构级别三">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data3"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree3"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value3_3"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  			</ul>
							  			<ul>
							  				<li v-if="store_index >= 4">
							  					<span>机构级别4</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value4" 
							  							size="small"
							  							@visible-change="VisibleChangeFun4"
							  							placeholder="机构级别一">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data4"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree4"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value4_4"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 5">
							  					<span>机构级别5</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value5" 
							  							size="small"
							  							@visible-change="VisibleChangeFun5"
							  							placeholder="机构级别二">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data5"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree5"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value5_5"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 6">
							  					<span>机构级别6</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value6" 
							  							size="small"
							  							@visible-change="VisibleChangeFun6"
							  							placeholder="机构级别三">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data6"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree6"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value6_6"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 7">
							  					<span>机构级别7</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value7" 
							  							size="small"
							  							@visible-change="VisibleChangeFun7"
							  							placeholder="机构级别七">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data7"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree6"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value7_7"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 8">
							  					<span>机构级别8</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value8" 
							  							size="small"
							  							@visible-change="VisibleChangeFun8"
							  							placeholder="机构级别八">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data8"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree8"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value8_8"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  				<li v-if="store_index >= 9">
							  					<span>机构级别9</span>
							  					<span>
							  						<el-select 
							  							popper-class="store_pop" 
							  							v-model="value9" 
							  							size="small"
							  							@visible-change="VisibleChangeFun9"
							  							placeholder="机构级别九">
													    <el-option label="" value="">
													    	<template>
													    		<div class="tree_select">
													    			<el-tree
																	  :data="tree_data9"
																	  :props="defaultProps"
																	  :default-expand-all="true"
																	  show-checkbox
																	  node-key="id"
																	  ref="tree9"
																	  :filter-node-method="FilterNodeMethodFun"
																	  @check-change="CheckChangeFun"
																	  @node-click="NodeClickFun"
																	  v-model="value9_9"
																	  default-expand-all
																	  :expand-on-click-node="false">
																	</el-tree>
													    		</div>
													    	</template>
													    </el-option>
													</el-select>
							  					</span>
							  				</li>
							  			</ul>
							  		</div>
							  		<div class="store_footer">
							  			<span class="dimension_tag">维度标签：</span>
							  			<ul>
							  				<li class="management_type">
							  					<span>经营方式:</span>
							  					<el-checkbox-group v-model="checked_management_type" @change="handleCheckedCitiesChange">
												    <el-checkbox v-for="management in management_type_list" :label="management" :key="management">{{management}}</el-checkbox>
												</el-checkbox-group>
							  				</li>
							  				<li class="store_lv">
							  					<span>店面级别:</span>
							  					<el-checkbox-group v-model="checked_store_lv" @change="handleCheckedCitiesChange">
												    <el-checkbox v-for="store in store_lv_list" :label="store" :key="store">{{store}}</el-checkbox>
												</el-checkbox-group>
							  				</li>
							  				<li class="area_lv">
							  					<span>地区级别:</span>
							  					<el-checkbox-group v-model="checked_area_lv" @change="handleCheckedCitiesChange">
												    <el-checkbox v-for="area in area_lv_list" :label="area" :key="area">{{area}}</el-checkbox>
												</el-checkbox-group>
							  				</li>
							  			</ul>
							  		</div>
							  		<div class="store_btn">
							  			<el-button type="primary" @click="SaveStore" size="small" class="my-el-icon-save">保存</el-button>
							  			<el-button type="primary" @click="CloseStore" size="small" class="my-el-icon-close">关闭</el-button>
							  		</div>
							  	</div>
							</el-popover>
							<el-input 
								v-popover:popover2 
								v-model="select_store"
								size="small"
								class="storeItem"
								placeholder="请选择交易门店">
							</el-input>
				 		<!--</span>
				    </template>
				</el-input>-->
		 	</li>
		 </ul>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		
		props:{
			storeId:{
				type:String,
				default:'StoreId'
			}
		},
		data() {
			return {
				store_index:6,//门店级别个数
				store_key:0,//当前展开的门店级别
				management_List:[],//
				store_lv_List:[],
				city_arr_List:[],
				area_lv_List:[],
				sum_store_list:[],//选择的门店集合
				sum_store_count:0,//选择的门店数量
				management_type_list:['合作','加盟','直营'],
				store_lv_list:['旗舰店','商业区','社区店'],
				area_lv_list:['一线城市','二线城市','三线城市','四线城市'],
				city_arr_list:['北京','上海','广州','深圳','南京'],
				checked_management_type:[],
				checked_store_lv:[],
				checked_area_lv:[],
				checked_city_arr:[],
				select_store: '',//选中的交易门店
				value1: '',
				value1_1:'',
				value2:'',
				value2_2:'',
				value3:'',
				value3_3:'',
				value4:'',
				value4_4:'',
				value5:'',
				value5_5:'',
				value6:'',
				value6_6:'',
				value7:'',
				value7_7:'',
				value8:'',
				value8_8:'',
				value9:'',
				value9_9:'',
				Tree_Node:[],
				tree_data1:[],
				tree_data2:[],
				tree_data3:[],
				tree_data4:[],
				tree_data5:[],
				tree_data6:[],
				tree_data7:[],
				tree_data8:[],
				tree_data9:[],
				tree_data: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		computed:{
			...mapGetters(['pageid']),
			...mapGetters('layout',['MultiStore','BrandId']),
			StoreData:{
				get:function(){
					let val = this.$store.getters["layout/MultiStore"];
					return this.MultiStore;
				}
			},
			StoreValue:{
				get:function(){
					let ids = this.pageid+"/"+this.storeId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set"+this.storeId;
					this.$store.commit(ids,value);
				}
			}
		},
		created(){
			this.createTree();
		},
		methods:{
			SetDefualtStore(){
				this.select_store = ''
				//设置selecttree默认
				for(let i=1;i<=9;i++){
					this['value'+i] = '';
					this['value'+i+'_'+i] = '';
					this['tree_data'+i] = [];
				}
				this.createTree();
			},
			SaveStore(){
				let num = this.store_index;
				let arr = [];
				if(this.store_key <= 0){
					return false;
				}
				let array1 = this.$refs['tree'+this.store_key].getCheckedNodes();
				if(array1.length == 0){
					if(this.store_key > 1){
						while(array1.length == 0 && this.store_key >= 1){
							this.store_key -= 1;
							array1 = this.$refs['tree'+this.store_key].getCheckedNodes();
						}
					}
				}
                 array1.forEach((item,k)=>{
					if(!item['disabled'] && item['hide'] != false){
						arr.push(item['id']);
					}
				});
				let Tarr = [];
				let ArrIds = [];
				//获取当前选择的节点的集合
                function GetTreeNode(TreeArr){
                	TreeArr.forEach((itemA, indexA) => {
                		if(arr.indexOf(itemA['id']) > -1){
                			Tarr.push(itemA);
                		}else{
                			if(itemA['children']){
                				GetTreeNode(itemA['children']);
                			}
                		}
                	});
                }
                //获取当前选择的节点的集合的所有门店
                function GetTreeNodeId(TreeArr){
                	TreeArr.forEach((itemA, indexA) => {
                		if(itemA['children'] && itemA['children'].length > 0){
                			GetTreeNodeId(itemA['children']);
                		}else{
                			ArrIds.push(itemA['id']);
                		}
                	});
                }
                GetTreeNode(this.StoreData);
                GetTreeNodeId(Tarr);
				console.log(ArrIds);
				this.StoreValue = ArrIds;
				$('.querystore input').click();
			},
			//获取最后一级门店的id
			GetStoreId(storearr){
				//通过选择的门店区域id，递归寻找该区域下的所有门店
				if (this.store_key != this.store_index) {

					//如果当前选择门店级别不是最后一级门店级别
					let storelist = [];
					let getNodeStoreId = (sid, storelst) => {
						storelst.forEach((item, index) => {
							if(sid == item.id){
								storelist.push(item);
							}else{
								getNodeStoreId(sid, item.children);
							}
						});
					};
					let sid = [];
					//深度递归获取门店id
					let getstoreids = (arr) => {
						arr.forEach((item, index) => {
							item['children'].length > 0 && getstoreids(item['children']);
							item['children'].length == 0 && sid.push(item);
						});
					}
					//循环选择的级别
					storearr.forEach((item, index) => {
						let store_id = item.id;
						getNodeStoreId(store_id, this.tree_data);
					});
					getstoreids(storelist);

					return sid;
				}
				
			},
			CloseStore(){
				$('.querystore input').click();
			},
			createTree(){
				let tree = [];
				let treeNode = [];
				this.StoreData.forEach((item,index) => {
					tree.push(item);
					
					if(item['children']){
						this.SplitTreeNode(item['children'],tree);
					}
					
				});
				
				tree.forEach((item,index) => {
					item['label'] = item['text'].replace(item['code'],'');
					delete item['children'];
				});
				tree.forEach((item,index) => {
					if(item['id'] == this.BrandId){
						item['children'] = [];
						item['lv'] = 1;
						treeNode.push(item);
						this.RecombinationTreeNode(item,tree,2);
					}
				});
				this.tree_data = treeNode;
				console.log(this.tree_data);
				//由于门店接口数据的level级别不对，所以需要把tree结构重组tree结
				this.StartPage();
				
			},
			SplitTreeNode(TreeNode,treeArr){
				let seft = this;
				//拆分tree节点
				TreeNode.forEach((item,index) => {
					treeArr.push(item);
					if(item['children'] && item['children'].length > 0){
						seft.SplitTreeNode(item['children'],treeArr);
					}
				});
			},
			RecombinationTreeNode(obj,list,lv){
				let seft = this;
				list.forEach((item, index) => {
					if(item['fatherId'] === obj['id'] && !item['children']){
						item['children'] = [];
						item['lv'] = lv;
						seft.store_index = lv + 1;
						obj['children'].push(item);
						item['orgType'] != 3 && seft.RecombinationTreeNode(item,list,lv + 1);
					}
				});
			},
			StartPage(){
				//对门店做逻辑处理
				this.treeNode = {};
				let seft = this;
				for(let index = 1; index <= this.store_index; index++){
					this.treeNode['tree_data'+index] = [];
				}
				let GetNodeChildrenLv = (list) => {
					list.forEach((item, index) => {
						if(item['lv'] == 1 && item['lv'] <= this.store_index){
							this.treeNode['tree_data1'] && this.treeNode['tree_data1'].push(JSON.parse(JSON.stringify(item)));
							this.treeNode['tree_data2'] && this.treeNode['tree_data2'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 2 && item['lv'] <= this.store_index){
							this.treeNode['tree_data3'] && this.treeNode['tree_data3'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 3 && item['lv'] <= this.store_index){
							this.treeNode['tree_data4'] && this.treeNode['tree_data4'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 4 && item['lv'] <= this.store_index){
							this.treeNode['tree_data5'] && this.treeNode['tree_data5'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 5 && item['lv'] <= this.store_index){
							this.treeNode['tree_data6'] && this.treeNode['tree_data6'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 6 && item['lv'] <= this.store_index){
							this.treeNode['tree_data7'] && this.treeNode['tree_data7'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 7 && item['lv'] <= this.store_index){
							this.treeNode['tree_data8'] && this.treeNode['tree_data8'].push(JSON.parse(JSON.stringify(item)));
						}else if(item['lv'] == 8 && item['lv'] <= this.store_index){
							this.treeNode['tree_data9'] && this.treeNode['tree_data9'].push(JSON.parse(JSON.stringify(item)));
						}
						if(item['children'] && item['children'].length > 0){
							GetNodeChildrenLv(item['children']);
						}
					});
				}
				GetNodeChildrenLv(this.tree_data);  
				for (let item in this.treeNode) {
					let arr = this.treeNode[item];
					arr.forEach((v,k) => {
						if(item != 'tree_data1'){
							v['disabled'] = true;
							v['children'] && v['children'].forEach((vv,kk) => {
								vv['children'] && (vv['_children'] = vv['children'].slice(0));
								vv['children'] = [];
							});
						} 
						if(item == 'tree_data1' && v['children']){
							v['_children'] = v['children'].slice(0);
							v['children'] = [];
						}
					});
					this[item] = arr; 
				}

			},
			FilterNodeMethodFun(value, data, node){
				//tree筛选过滤
				/*
				 * 经营方式 manage_type
				 * 店面级别  storelevel
				 * 地区级别 arealevel
				 * 城市 address(需要检索)
				 */
				let istrue = false;
				let array3 = [];
				if(this.store_key > 1){
					let array2 = this.$refs['tree'+(this.store_key - 1)].getCheckedNodes();
					array2.forEach((v,k) => {
						array3.push(v['id']);
						v['_children'] && v['_children'].forEach((vv,kk) => {
							array3.push(vv['id']);
						});
					});
					if((value.length ==0 || value.indexOf(data['address']) > -1 || value.indexOf(data['arealevel']) > -1 || value.indexOf(data['storelevel']) > -1 || value.indexOf(data['manage_type']) > -1) && array3.indexOf(data['id']) > -1){
						istrue = true;
					}else{
						istrue = false;
					}
				}else{
					if(value.length ==0 || value.indexOf(data['address']) > -1 || value.indexOf(data['arealevel']) > -1 || value.indexOf(data['storelevel']) > -1 || value.indexOf(data['manage_type']) > -1){
						istrue = true;
					}else{
						istrue = false;
					}
				}
				data['hide'] = istrue; 
				this.CheckChangeFun(true);
				return istrue;
			},
			handleCheckedCitiesChange(value) {
				let arr = this.checked_management_type.concat(this.checked_store_lv).concat(this.checked_area_lv).concat(this.checked_city_arr);
				//门店级别
				if(this.store_key > 0){
					this.$refs['tree'+this.store_key].filter(arr);
				}
		    },
			VisibleChangeFun(changed,type){
				if(changed){
					this.store_key = type;
					//门店下拉模板显示隐藏触发方法
					this.handleCheckedCitiesChange();
				}
			},
			VisibleChangeFun1(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,1);
			},
			VisibleChangeFun2(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,2);
			},
			VisibleChangeFun3(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,3);
			},
			VisibleChangeFun4(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,4);
			},
			VisibleChangeFun5(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,5);
			},
			VisibleChangeFun6(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,6);
			},
			VisibleChangeFun7(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,7);
			},
			VisibleChangeFun8(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,8);
			},
			VisibleChangeFun9(changed){
				//门店下拉模板显示隐藏触发方法
				this.VisibleChangeFun(changed,9);
			},
			CheckChangeFun(loadtype){
				//节点选中状态变化
				let array1 = this.$refs['tree'+this.store_key].getCheckedNodes();
				let array2 = [];
				array1.forEach((item,index) => {
					//hide 属性在筛选时追加上去的,目的是表示道歉节点是否被过滤掉了
					if(!item['disabled'] && item['hide'] != false){
						array2.push(item.label);
					}
				});
				//改变父级选项清空后面的子机构的选项
				if(loadtype!==true){
                   for(let i = this.store_key+1;i<this.store_index+1;i++){
                    this['value'+i]='';//清空所选子机构的赋值
                    let nodesMap = this.$refs['tree'+i].root.store.nodesMap;
                        for(let item in nodesMap){
                           nodesMap[item]['checked']=false;//取消该节点的选中状态
                           nodesMap[item]['indeterminate']=false;//取消该节点的父节点选打开状态
                        }
				  }
                 
				}
				this['value'+this.store_key] = array2.join(',');
				let array3 = [];
				for(let index = 1; index < this.store_index; index++){
					let array4 = this.$refs['tree'+index].getCheckedNodes();
					array4.forEach((v,k)=>{
						if(!v['disabled'] && v['hide'] != false){
							array3.push(v['label']);
						}
					});
				}
				array3.push('共计'+array3.length+'家门店')
				this.sum_store_list = array3;
				/*if(loadtype != true){		
					console.log('zzz');
					this.handleCheckedCitiesChange();
				}*/
			},

			NodeClickFun(data,node,seft){
				//点击节点行
				if(node.disabled){
					return false;
				}
				if(node.checked){
					node.checked = false;
					node.indeterminate = false;
				}else{
					node.checked = true;
					node.indeterminate= false;
				}
				//设置子节点状态
				let SetChildNodesChecked = (children) => {
					children.forEach((v,k) => {
						v.checked = node.checked;
						SetChildNodesChecked(v.childNodes)
					});
				}
				//设置父节点状态
				let SetParentNodesChecked = (parent = {}) => {
					if(!parent || !parent.childNodes){
						return false;
					}
					let num = 0;
					parent.childNodes.forEach((item,index) => {
						if(item.checked == node.checked){
							num += 1;
						}
					});
					if(parent.childNodes.length == num){
						parent.checked = node.checked;
						parent.indeterminate = false;
					}else{
						parent.indeterminate = true;
					}
					SetParentNodesChecked(parent.parent);
				}
				SetChildNodesChecked(node.childNodes);
				SetParentNodesChecked(node.parent);
			}
		}
	}
</script>

<style>
	.querystore {
		float: left;
		width: auto;
		height: 28px;
		margin-left: 10px;

	}
	
	.storeItem.el-input>.el-input__inner{
		margin-left: 0px!important;
	}
	
	.StoreTreeItem.el-popper[x-placement^=bottom]{
		margin-top:3px;
	}
	.StoreTreeItem>.popper__arrow{
		display: none;
	}
	.StoreTreeItem .store_body .el-select>.el-input>.el-input__inner{
		margin-left: 0px!important;
		height: 28px;
	}
	.StoreTreeItem .store_footer .el-checkbox{
		width: auto;
		height: auto;
		margin-left: 10px;
	}
	
	
	input[name="input_name"]{
		width: 0px;
		padding: 0px;
		border-bottom: 0px;
		border-top: 0px;
		border-right: 0px;
	}
	.store_Array {
		width: 600px;
		height: 300px;
	}
	
	.store_header,
	.store_body,
	.store_footer,
	.store_btn,
	.store_footer>ul,
	.store_footer>ul>li,
	.store_body>ul {
		float: left;
		width: 100%;
	}
	.store_body>ul{
		margin-top: 20px;
	}
	.store_body>ul>li {
		width: 33%;
		float: left;
	}
	
	.store_body>ul>li>span {
		width: 98%;
		height: auto;
		padding: 5px;
		float: left;
	}
	.store_pop{
		height: 250px;
    	width: 300px;
	}
	.store_pop>.el-scrollbar{
		width: 100%;
		height: 100%;
	}
	.store_pop>.el-scrollbar>.el-scrollbar__wrap{
		margin: 0px!important;
		overflow: hidden;
    	height: 100%;
	}
	.store_pop>.el-scrollbar>.el-scrollbar__wrap>.el-select-dropdown__list{
		width: 100%;
		height: 100%;
		padding: 0px;
		margin: 0px;
	}
	.el-select-dropdown.el-popper.store_pop .el-select-dropdown__item span{
		line-height: normal!important;
		min-width: 14px;
		min-height: 14px;
	    float: left;
		border-radius: 3px;
	}
	.store_pop .el-select-dropdown__list>li{
		width: 100%;
		padding: 0px;
		height: 100%;
		overflow: hidden;
	}
	.tree_select{
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		background-color: white;
	}
	.tree_select>.el-tree{
		border:0px;
	}
	.tree_select .el-tree-node__label{
		color: #48576a;
	}
	.dimension_tag{
		float: left;
		width: 100%;
		padding: 10px 0px;
		font-size: 16px;
	}
	.store_footer>ul>li{
		margin: 5px 0px;
		font-size: 14px;
	}
	.store_footer>ul>li>span{
		float: left;
		margin-right: 10px;
	}
	.store_btn{
		text-align: right;
	}
	.store_btn>.el-button>span{
		padding: 0px 5px;
    	font-size: 14px;
	}
	.select_store>a{
		padding: 0px 2px;
	}
	.querystore .el-input-group__append .el-input__inner{
		border: 0px;
	}
	.el-input-group__append{
		width: 170px!important;
	}
	.el-input>.el-input__inner{
		margin-left: 10px !important;
	}
.el-input-group__append>div:nth-child(2) .el-input__inner {
		margin-left: 20px !important;
		border-left: 1px solid #ccc;
	}
	.StoreTreeItem{
		padding: 10px!important;
	}
</style>