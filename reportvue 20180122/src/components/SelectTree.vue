<template>
	<div class="selectTreeInput">	
		<el-input placeholder="请输入内容" v-model="timer">
		    <template slot="append">
		    	<el-select 
		    		ref="SelectTree"
		    		v-model="SelectTreeValue" 
		    		popper-class="selectTreeNode"
		    		multiple 
		    		value-keys
		    		@remove-tag="RemoveTagFun"
		    		placeholder="请选择门店">
		    		<template v-for="item in SelectTreeOptions">
		    			<el-option v-show="1 == 2" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
		    				  @node-click="NodeClickFun"
		    				  @current-change="CurrentChangeFun"
		    				  :props="defaultProps">
		    				</el-tree>
		    			</template>
		    		</el-option>
		    	</el-select>
		    </template>
		</el-input>
	</div>
</template>


<script>

	export default {
		props:{
			TreeData:{
				type:Array,
				default:[]
			},
		},
		data() {
			return {
				timer:0,
				SelectTreeValue: [],
				SelectTreeOptions:[],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
			}
			
		},
		methods:{
			CheckChangeFun(){
				//节点选中状态发生变化时的回调
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.CurrentChangeFun();
				},0);
			},
			NodeClickFun(obj, node, seft){
				//节点被点击时的回调
				if(node.expanded == false){
					//点击节点阻止节点关闭子集
					node.expanded = true;
				}
				//点击节点后，触发该节点的左侧的checkbox按钮的事件,迫使CheckBox改变状态(包括父节点)
				$(seft.$el).children('.el-tree-node__content').children('.el-checkbox').click();
			},
			CurrentChangeFun(){
				//	当前选中节点变化时触发的事件
				setTimeout(() => {
					//获取当前tree所有的node节点
					let nodesMap = this.$refs.treeNode.root.store.nodesMap;
					//定义临时变量保存 nodesMap 中 checked=true的节点
					this.nodesMap1 = [];
					//定义临时变量保存  nodesMap 中 indeterminate=true的节点
					//indeterminate=true说明当前节点的子节点未被全选（indeterminate=true时，checked=false，这是必然的）
					let nodesMap2 = [];
					//循环 nodesMap 找出2类节点
					for (let item in nodesMap) {
						nodesMap[item]['checked'] && this.nodesMap1.push(nodesMap[item]);
						nodesMap[item]['indeterminate'] && nodesMap2.push(nodesMap[item]);
					}
					//定义临时变量保存 nodesMap1 中的data数据对象，赋值给select
					let array1 = [];
					let array2 = [];
					//循环 nodesMap1 找出 对应的data数据
					this.nodesMap1.forEach((item, index) => {
						array1.push({
							value:item['data']['id'],
							label:item['data']['label']
						});
						array2.push(item['data']['id']);
					});
					// 选择的 data 数据赋值给select显示
					this.SelectTreeOptions = array1;
					this.SelectTreeValue = array2;
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
					if(nodesMap[item]['key'] == tagid){
						nodesMap[item]['checked'] = false;
						//如果当前节点被取消选中了，那么它的子节点都需要被取消选中
						seft.RemoveNodeChildrenChecked(nodesMap[item]['childNodes'], false);
						let SetParentNode = (node) => {
							if(node){								
								let count = 0;
								node['childNodes'].forEach((items, index) => {
									if(items['checked'] == false){
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
				this.CurrentChangeFun();
			},
			GetTreeData(){
				//获取数据
				let treeData1 = this.$refs.treeNode.getCheckedNodes();
				return treeData1;
			},
			GetTreeNode(){
				//获取treenode节点
				return this.nodesMap1||[];
			},
			ClearSelectTree(){
				this.SelectTreeValue = [];
				this.SelectTreeOptions = [];
				let nodesMap = this.$refs.treeNode.root.store.nodesMap;
				//循环nodesMap节点,找到被隐藏的节点
				for (let item in nodesMap) {
					nodesMap[item]['checked'] = false;
					nodesMap[item]['indeterminate'] = false;
				}
				console.log(this.SelectTreeValue );
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
</style>