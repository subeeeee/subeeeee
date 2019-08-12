<template>
	<div class="selectTreeInput">	
		<el-select 
    		ref="SelectTree"
    		v-model="TreeValue1" 
    		popper-class="selectTreeNode"
    		multiple 
    		value-keys
    		@remove-tag="RemoveTagFun"
    		:placeholder="placeholder">
    		<template v-for="item in TreeValue">
		    	<el-option 
		    		v-show="1 == 2" 
		    		:key="item.id" 
		    		:label="item.text||item.label" 
		    		:value="item.id"></el-option>
		    </template>
    		<el-option key="" label="" value="">
    			<template>
    				<el-tree
    				  ref="treeNode"
    				  :data="TreeData"
    				  default-expand-all
    				  show-checkbox
    				  current-node-key
    				  node-key="id"
    				  class="TreeNode"
    				  @check-change="CheckChangeFun"
    				  @current-change="CurrentChangeFun"
    				  :props="defaultProps">
    				</el-tree>
    			</template>
    		</el-option>
    	</el-select>
	</div>
</template>


<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		props:{
			SelectId:{
				type:String,
				default:'SelectId'
			},
			placeholder:{
				type:String,
				default:'请选择'
			}
		},
		data() {
			return {
				timer:0,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
			}
		},
		computed:{
			...mapGetters(['pageid']),
			TreeData:{
				get:function(){
					let ids = this.pageid+"/"+this.SelectId+'Data';
					return this.$store.getters[ids];
				}
			},
			TreeValue1:{
				get:function(){
					let ids = this.pageid+"/"+this.SelectId;
					let val = this.$store.getters[ids];
					let kks = [];
					val.forEach((itemA, indexA) => {
						kks.push(itemA['id']);
					});
					return kks;
				},
				set:function(value){
					let idsA = this.pageid+"/"+this.SelectId;
					let arrA = this.$store.getters[idsA];
					let arrB = [];
					arrA.forEach((itemA, indexA) => {
						if( value.indexOf(itemA['id']) == -1 ){
							arrB.push(itemA);
						}
					});
					let ids = this.pageid+"/set"+this.SelectId;
					this.$store.commit(ids,value);
				}
			},
			TreeValue:{
				get:function(){
					let ids = this.pageid+"/"+this.SelectId;
					return this.$store.getters[ids];
				},
				set:function(value){
					let ids = this.pageid+"/set"+this.SelectId;
					this.$store.commit(ids,value);
				}
			},
			
		},
		created(){
			
		},
		methods:{
			SetParentChecked(ParentNode,field,state){
				ParentNode[field] = state;
				if(ParentNode['parent']){
					this.SetParentChecked(ParentNode['parent'],field,state);
				}
			},
			CheckChangeFun(){
				//节点选中状态发生变化时的回调
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.CurrentChangeFun();
				},0);
			},
			CurrentChangeFun(){
				//	当前选中节点变化时触发的事件
				setTimeout(() => {
					//获取当前tree所有的node节点
					let nodesMap = this.$refs.treeNode.root.store.nodesMap;
					//定义临时变量保存 nodesMap 中 checked=true的节点
					let nodesMap1 = [];
					//定义临时变量保存  nodesMap 中 indeterminate=true的节点
					//indeterminate=true说明当前节点的子节点未被全选（indeterminate=true时，checked=false，这是必然的）
					let nodesMap2 = [];
					//循环 nodesMap 找出2类节点
					for (let item in nodesMap) {
						nodesMap[item]['checked'] && nodesMap1.push(nodesMap[item]);
						nodesMap[item]['indeterminate'] && nodesMap2.push(nodesMap[item]);
					}
					let array2 = [];
					let array3 = [];
					//循环 nodesMap1 找出 对应的data数据
					nodesMap1.forEach((item, index) => {
						array2.push(item['data']);
						array3.push(item);
						//this.TreeValue.push(item['data']['label']);
					});
					this.TreeValue = array3;
					this.TreeValue1 = array2;
					// 选择的 data 数据赋值给select显示
					//this.setSelectTreeValue([this.SelectId,array2]);
				},0);
			},
			RemoveNodeChildrenChecked(nodelist = [], checked){
				let seft = this;
				//设置子节点的选中状态
				nodelist.forEach((item ,index) => {
					item['checked'] = checked;
					//如果当前节点是选择状态，那么它的  indeterminate 就应该是false
					checked && (item['indeterminate'] = false);
					item['childNodes'] && seft.RemoveNodeChildrenChecked(item['childNodes'], checked);
				});
			},
			RemoveTagFun(tag){
				let seft = this;
				//多选模式下移除tag时触发
				let tagid = this.$refs.SelectTree.getValueKey(tag);
				//获取tree所有的node节点
				let nodesMap = this.$refs.treeNode.root.store.nodesMap;
				//循环nodesMap节点,找到被隐藏的节点
				for (let item in nodesMap) {
					if(nodesMap[item]['data']['id'] == tagid){
						nodesMap[item]['checked'] = false;
						//如果当前节点被取消选中了，那么它的子节点都需要被取消选中
						seft.RemoveNodeChildrenChecked(nodesMap[item]['childNodes'], false);
						let SetParentNode = (node) => {
							if(node){								
								let count = 0;
								node['childNodes'].forEach((items, index) => {
									if(items['checked'] == false && items['indeterminate'] == false){
										count += 1;
									}
								});
								if(node['childNodes'].length > 0 && node['childNodes'].length == count){
									node['indeterminate'] = false;
									node['checked'] = false;
								}
								SetParentNode(node['parent']);
							}
						}
						SetParentNode(nodesMap[item]['parent']);
					}
				}
				//this.CurrentChangeFun();
			},
			GetTreeData(){
				//获取数据
				let treeData1 = this.$refs.treeNode.getCheckedNodes();
				return treeData1;
			},
			ClearSelectTree(){
				this.TreeValue = [];
				let nodesMap = this.$refs.treeNode.root.store.nodesMap;
				//循环nodesMap节点,找到被隐藏的节点
				for (let item in nodesMap) {
					nodesMap[item]['checked'] = false;
					nodesMap[item]['indeterminate'] = false;
				}
			},
		}
	}
</script>

<style>
	.selectTreeInput .el-select__tags{
		height: 30px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
    	white-space: nowrap;
	}
	.selectTreeInput>.el-input>.el-input__inner{
		width: 0px!important;
		border: 0px!important;
		padding: 0px!important;
	}
	.selectTreeInput>.el-input>.el-input__inner{
		width: 0px;
		border-right: 0px;
		padding: 0px;
	}
	.selectTreeInput>.el-input>.el-input-group__append{
		width: 160px;
		padding: 0px;
		border: 0px!important;
	}
	.selectTreeNode .el-scrollbar__wrap{
		margin: 0px!important;
		overflow: hidden;
	}
	.selectTreeNode .el-scrollbar__wrap>.el-select-dropdown__list{
		padding: 0px;
	}
	.selectTreeNode .el-scrollbar__wrap>.el-select-dropdown__list>.el-select-dropdown__item{
		height: auto;
		padding: 0px;
	}
	.el-tree.TreeNode{
		width:auto;
		height: 274px;
		border: 0px;
		overflow: hidden;
		overflow-y: auto;
	}
	.selectTreeNode{
		width: auto !important;
	}
	.el-tree.TreeNode .el-checkbox__input,
	.el-tree.TreeNode .el-tree-node__label{
		line-height:normal!important;
		float: left;
	    width: 14px;
	    height: 14px;
	}
	.el-tree.TreeNode .el-checkbox__input.is-checked{
		background-color: transparent;
	}
	.el-tree.TreeNode .el-checkbox__inner::after{
		left: 4px !important;
    	top: 1px !important;
	}
</style>