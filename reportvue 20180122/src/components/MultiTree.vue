<template>
	<!--选择门店开始 -->
<div class="MultiTree">
<el-popover
	  placement="bottom"
	  width="650"
	  trigger="click"
	  popper-class="popper-Multitree"
	  @show="showPopover"
	  v-model="MultiTreeVisible"
	  ref="MultiTree">
	 <div class="mendian">
		<div class="mendian_left">
			<el-input placeholder="请输入门店名称" v-model="filterText"></el-input>
			<div class="fangdajing">
				<img src="../assets/mendian_fadajing.svg" />
			</div>
			<el-tree 
				class="filter-tree" 
				:data="data2" 
				:default-expand-all=false
				:default-expanded-keys="[0]" 
				:filter-node-method="filterNode" 
				:empty-text="notree" 
				show-checkbox 
				@check-change="boxChange" 
				:render-content="renderContent"
				:default-checked-keys="treecheckedids"
				node-key="id" 
				ref="tree2">
			</el-tree>
		</div>
		<div class="mytree_result">
			<h1>已选择<span v-model="totalcount">{{totalcount}}</span>个门店
				<em @click="qingkong"><i class="iconfont icon-shanchu"></i>清空</em>
				
			</h1>
			<ul id="mychoice" >
				<li v-for="item in this.nodes">
					<em v-bind:id="item.id">{{item.label }}
						<span >{{item.lable }}</span><span>{{item.plabels }}</span>
						<!-- <img class="mychoiceimg" src="../assets/close.svg" @click="deleteChoiceItem" />   -->  
				</em>
				</li>
			</ul>
			<div class="qxqd">
				<el-button size="small" @click="mendianGuanbi" class="btn-default">取消</el-button>
				<el-button type="primary" size="small" @click="mendianQueding">确定</el-button>
			</div>
		</div>
	</div>
</el-popover>
<!--选择门店 结束 -->
<el-input v-popover:MultiTree 
	 v-model="MultiTreeValue" 
	 :placeholder="placeholder" 
	 class="font10"
	 icon="arrow-down" readonly>
	 </el-input>
</div>
</template>

<script>
	
	export default {
		watch: {
	      filterText(val) {
	        this.$refs.tree2.filter(val);
	      }
	   },
	    props:{
	    	placeholder:{
	    		type:String,
	    		default:'请选择门店',
	    	},
	    	defaultStore:{
	    		type:String,
	    		default:''
	    	}
	    },
		data() {
			return {
				NodeCount:0,
				MultiTreeValue:'',//选择的门店
				MultiTreeVisible:false,//初始化隐藏门店多选框
				treecheckedids:[],//默认展开树的节点
				filterText: '',
				totalcount:0,
				total:0,
				scroll1:false,
		      	scroll2:false,
		      	scroll3:false,
		      	scroll4:false,
		      	data2:[],//门店数据
				nodes:[],//门店选中值
				nodes_temp:[],//门店选中值 过程变量
				notree:"没有数据",
			}
		},
		
		methods: {
			filterNode(value, data) {
		        if (!value) return true;
		        return data.label.indexOf(value) !== -1;
		    },
		    loadTree(){
				let _this = this;
				//let _TreeUrl ='framework/organContraller/getOrgansTreeByConditionsV2';
				let _TreeUrl = '/report/CommonMethodAreaRest/getOrgansTreeByConditionsV2';
				this.getResult.getResult(_TreeUrl, {}, function(response) {
					if(response.success){
						 _this.data2 = response.data;
					}
				})
			},
			showPopover(){
				if(this.defaultStore!= ''){
					let treecheckedids = this.defaultStore.split(',');
					treecheckedids.forEach((v, k) => {
						this.treecheckedids.push(parseInt(v));
					});
					this.$refs.tree2.setCheckedKeys(this.treecheckedids);
				}
			},
			renderContent(h, { node, data, store }){
				return (
					<span>
		              <span>{data.labelc}({data.count?data.count:0})</span>
		            </span>
				);
			},
			qubumendianFunction:function(){//全部门店
				this.totalcount = 0;
				this.nodes.forEach(item =>{
					this.$refs.tree2.setChecked(item.id,false,false);
			    });
			    this.nodes=[]
			    this.nodes_temp = [];
			},
			//门店选择
	    	boxChange:function(e){
	    		this.nodes = this.$refs.tree2.getCheckedNodes(true);
	    		this.totalcount = this.nodes.length;
			},
			//门店组件点击确定按钮事件
			mendianQueding:function(e){
	    		//this.nodes = this.$refs.tree2.getCheckedNodes(true);
	    		this.nodes_temp = this.nodes;
	    		this.$emit('getMultiStore',this.nodes_temp);//父组件的回调函数
	    		this.MultiTreeVisible = false;
	    		let store_values = [];
                 this.nodes_temp.forEach(function(item, index) {
					store_values.push(item['label']);
				});
			   this.MultiTreeValue=store_values.join(',');//获取选中的门店名称
			   
			},
			//门店组件点击取消按钮事件
			mendianGuanbi:function(){
              this.MultiTreeVisible = false;
			},
			//删除当前选中的门店
		   	deleteChoiceItem:function(e){
		      let id =  e.target.parentNode.getAttribute("id");
		      this.nodes.forEach(item =>{
					if(item.id == id){
						this.nodes.shift(item);
						this.totalcount = this.totalcount-1;
						this.$refs.tree2.setChecked(item.id,false,false);
					}
			  });
			  //处理左侧树选中的节点
		   	},//删除所选项
		   
		    xianshiDelete:function(e){
			   	e.currentTarget.getElementsByTagName("img")[0].style.display="block";
		   	},
			noxianshiDelete:function(e){
			   		e.currentTarget.getElementsByTagName("img")[0].style.display="none";
			},
		   	qingkong:function(){//清空选择的数据
				document.getElementById("mychoice").innerHTML=""
				this.totalcount = 0;
				this.nodes.forEach(item =>{
					this.$refs.tree2.setChecked(item.id,false,false);
			  	});
			},
			 //监听门店数的滚动条
		  	handleScroll2() {
				/*var el = e.currentTarget;*/
				if(this.scroll2 != true)
				{
					this.scroll2 = true;
					var _this = this;
					setTimeout(function(){_this.scrollfun2();},2000);
				}
		   	}
		}
		,created() {//下面的是boss 请求地址
			// let _s = Assist.GetPageArguments();
			// this.$store.dispatch('setSession', _s).then(() => {
			// }).catch(() => {
	        
	  //        });
			this.loadTree();
			
	    }
	}
</script>

<style>
  .popper-Multitree{
  	padding:0 !important;  
  	}
  .MultiTreeNode .el-select-dropdown__item{
  	height: 250px !important;
  	background: #ffffff;
  	padding:0px;
  }
  .MultiTreeNode .el-select-dropdown__list{
  	padding:0px;
  }
  .MultiTreeInput .el-input__inner{
 	padding-left:10px;
 	border:1px solid #D8E5EC !important;
  }
  .mendian_left{
  	width: 50%;
  	height: 250px;
  	float: left;
  	position: relative;
  	background: #F5FBFE;
  }
  .mendian_left h1{
        width:100%;
        height:42px;
    }
   .mendian_left div.el-input{
	   	border:0px;
	   	height:auto;
	   	position: absolute;
	   	left: 0px;
	   	right: 0px;
	   	width: 100%;
	   	border-radius:inherit;
   }
   .mendian_left .el-checkbox{
   		float: right;
   }
   .mendian_left .el-input__inner{
	   	width: 90%;
	   	height: 28px;
	   	margin: 10px;
	   	border-radius: 3px;
   }
   .mendian_left .el-tree {
   	height: 200px;
   	overflow-y: auto;
   	color:#666;
   	background: #F5FBFE;
   	border:0px !important;
   	position: absolute;
   	top: 48px;
   	left: 0px;
   	width: 100%;
   }
   .mendian_left .el-tree .el-tree-node__content:hover{
   	background: #F5FBFE !important;
   }
  .mytree_result{
   width: 47%;
   float: left;
   background: #ffffff;
   height: 397px;
  }
  .mendian .botton_text {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #0C9AFF;
		line-height: 14px;
		margin-left: 16px;
		font-style: normal;
	}
	
	.mendian .quxiao_and_tijiao {
		height: 82px;
		margin-left: 50px;
		margin-right: 40px;
		border-top: 1px dashed #EAF1F6;
	}
	
	.mendian .quxiao_and_tijiao .bottom_64_32 {
		margin-left: 91px;
	/*	margin-top: 30px;*/
		margin-bottom: 20px;
	}
	
	.mendian .querenbox {
		height: 360px;
		width: 200px;
		background: red;
		box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.20);
		border-radius: 3px;
		position: absolute;
		z-index: 10000px;
	}
	.mytree_result{
        width:50%;
        height:250px;
        float:left;
        background: #FFFFFF;
        float:left;
    }
    .mytree_result h1{
        font-size: 12px;
        font-weight: normal;
        text-indent: 16px;
        display: block;
        height: 40px;
        line-height: 40px;
        font-style: normal;
        color: #34495E;
        border-bottom: 1px #EAF1F6 solid;
    }
    .mytree_result h1 img{
        margin-right: 5px;
        float: right;
        margin-top: 19px;
        cursor:pointer;
    }
    .mytree_result h1 em{
        margin-right:16px;
        float:right;
        line-height: 40px;
        font-style:normal;
        color:#CBD4DA;
        cursor:pointer;
    }
    .mytree_result h1 span{
        color: #FF7171;
    }
    .mytree_result ul{
        height: 170px;
        overflow-y: auto;
        padding: 0px;
    }
    .mytree_result ul li{
        /*width:230px;*/
        list-style: none;
    }
    .mytree_result ul li:hover{
        /*width:230px;*/
        background-color:#F5FBFE;
    }
    .mytree_result ul li em{
        height:32px;
        line-height: 32px;
        font-size:14px;
        border-bottom: 1px #EAF1F6 solid;
        font-style: normal;
        display:block;
        color: #34495E;
        width: 100%;
        cursor: default;
        text-indent: 16px;
    }
    .mytree_result ul li em img{
        margin-top:10px;
        float:right;
    }
    .mytree_result ul li.nostore{
    	font-size: 12px;
		color: #9AABB8;
		text-align: center;
		letter-spacing: 0;
		line-height: 170px;
		cursor: default;
    }
    .mytree_result ul li.nostore:hover{
    	background-color: transparent!important;
    }
    .mytree_result ul li span{
        line-height: 32px;
        font-size:12px;
        color:#9AABB8;
    }
    .qxqd{ 
        height: 42px;
        line-height: 42px;
        text-align: right;
        padding-right: 10px;
    }
    .fangdajing{
        /*border:1px red solid;*/
        position:absolute;
        z-index:2019;
        top:18px;
        right: 35px;
        height:12px;
        width:12px;
    }
    .filter-tree .el-tree-node__content{
    	position: relative;
    }
    .filter-tree .el-tree-node__content span{
    	font-size: 14px;
		color: #34495E;
		letter-spacing: 0;
		line-height: 14px;
    }
    .filter-tree .el-tree-node__content:hover{
    	background-color: #EAF5FC!important;
    }
    .filter-tree .el-tree-node__content .el-checkbox{
    	margin-right: 0px;
    	position: absolute;
    	right: 8px;
    	top: 3px;
    }
    .filter-tree .el-checkbox__inner::after{
    	left: 4px!important;
    	top: 2px!important;
    }
</style>