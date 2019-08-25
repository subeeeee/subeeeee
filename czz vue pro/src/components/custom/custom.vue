<template>
	<div class="Report_Custom">
		<el-dialog
		  title="自定义表字段"
		  @open="dialogOpen"
		  @close="Report_CustomCloseFun"

		  :close-on-click-modal="false"
		  :close-on-press-escape="false"
		  :visible="CustomVisible">
		  <div class="Custom_context" v-loading="LoadCustom">
		  	<div class="templateName">
		  		<el-input class="combox" size="small">
		  		    <template slot="prepend">当前模板:</template>
		  		    <template slot="append">
		  		    	<el-select 
		  		    		size="small" 
		  		    		popper-class="UserTemplate-item"
		  		    		@change="UserTemplateChange"
		  		    		v-model="frpt_id" 
		  		    		placeholder="请选择">
		  		    	    <el-option
		  		    	      v-for="item in UserTemplateList"
		  		    	      :key="item.id"
		  		    	      :label="item.text"
		  		    	      :value="item.id">
		  		    	      	<span>{{ item.text }}</span>
		  		    	      	<span v-if="item.id != 0">
		  		    	      		<i @click="EditUserTemplateName(item)" class="el-icon-edit"></i>
		  		    	      		<i @click="RemoveUserTemplate(item)" class="el-icon-delete"></i>
		  		    	      	</span>
		  		    	    </el-option>
		  		    	  </el-select>
		  		    </template>
		  		</el-input>
		  		<el-button 
		  			type="text" 
		  			v-if="!IsAddUserTemplate" 
		  			@click="AddUserTemplateFun"
		  			size="small">添加模板</el-button>
		  		<el-input 
		  			v-if="IsAddUserTemplate"
		  			placeholder="请输入模板名称" 
		  			size="small"
		  			v-model="UserTemplateName"
		  			clearable></el-input>
		  		<i 
		  			v-if="IsAddUserTemplate" 
		  			class="el-icon-circle-close"
		  			@click="CloseAddUserTemplateFun"></i>
		  		<i 
		  			v-if="IsAddUserTemplate" 
		  			class="el-icon-circle-check"
		  			@click="SaveAddUserTemplateFun"></i>
		  	</div>
		  	<div class="field_context">
		  		<div class="hidden_field">
		  			<span class="title">隐藏字段</span>
		  			<div class="hidden_field_context">
		  				<el-tree 
		  					:data="HideTreeData" 
		  					ref="HideTree"
		  					node-key="pid"
		  					:render-content="renderContent"
		  					:default-expand-all="true"
		  					:expand-on-click-node="false"
		  					:props="HideProps" ></el-tree>
		  			</div>
		  		</div>
		  		<div class="field_edit">
		  			<el-button size="small" @click="AllToRightFun" icon="el-icon-d-arrow-right"></el-button>
		  			<el-button size="small" @click="ToRightFun" icon="el-icon-arrow-right"></el-button>
		  			<el-button size="small" @click="ToLeftFun" icon="el-icon-arrow-left"></el-button>
		  			<el-button size="small" @click="AllToLeftFun" icon="el-icon-d-arrow-left"></el-button>
		  		</div>
		  		<div class="show_field">
		  			<span class="title">显示字段</span>
		  			<div class="show_field_context">
		  			<el-tree 
	  					:data="ShowTreeData" 
	  					ref="ShowTree"
	  					node-key="pid"
	  					:render-content="renderContent"
	  					:default-expand-all="true"
	  					:expand-on-click-node="false"
	  					:props="ShowProps"></el-tree>
		  			</div>
		  		</div>
		  		<div class="field_sort">
		  			<el-button @click="ToUp" size="small" icon="el-icon-arrow-up"></el-button>
		  			<el-button @click="ToDown" size="small" icon="el-icon-arrow-down"></el-button>
		  		</div>
		  	</div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		  	<el-button :disabled="LoadCustom" @click="ThisApply">本次应用</el-button>
		    <el-button :disabled="LoadCustom" @click="Report_CustomCloseFun">取 消</el-button>
		    <el-button :disabled="LoadCustom" type="primary" @click="SaveCustomData">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import '@/assets/css/custom.less'
	import customAjax from "./custom.js"
	
	export default{
		name:'custom',
		props:{
			CustomVisible:{
				type:Boolean,
				default:false,
			},
			report_num:{
				type:String,
				default:''
			}
		},
		created(){
			this.StartPage();
			
		},
		computed:{
			...mapGetters(['pageid']),
			/*report_num:{
				get:function(){
					let ids = this.pageid+"/Report_num";
					return this.$store.getters[ids];
				}
			}*/
		},
		data(){
			return {
				LoadCustom:false,//是否显示加载中
				dialogVisible:true,
				UserTemplateMultiple:true,//用户模板是否多选
				IsAddUserTemplate:false,//是否点击了添加模板操作
				UserTemplateName:'',//输入的模板名称
				kkmd:[],
				frpt_id:0,
				UserTemplateList:[],//模板集合
				HideTreeData:[],//隐藏的字段集合
				ShowTreeData:[],//显示的字段集合
				AllFieldList:[],//所有字段集合
				SortItem:{},//点击的节点
				result:[],//数据对象
				ShowProps: {
		          children: 'show_list',
		          label: 'modify_name'
		        },
		        HideProps: {
		          children: 'hide_list',
		          label: 'modify_name'
		        }
			}
		},
		methods:{
			StartPage(queryType){
				this.LoadCustom = true;
				this.IsAddUserTemplate = false;
				let seft = this;
				let pps = {
					'report_num':this.report_num,
					'inquiry_mode':queryType?queryType:1,
					'frpt_id':this.frpt_id
				};
				customAjax.getCustomConfiguration(pps,function(result){
					console.log('result',result);
					seft.result = result;
					seft.LoadCustom = false;
					seft.frpt_id = result.frpt_id;
					//seft.CustomData = result['show_list'];
					seft.$emit('GetReportCustomFun',result['show_list']);
				});
			},
			dialogOpen(){
				this.HideTreeData = this.result['hide_list'];
				this.ShowTreeData = this.result['show_list'];
				this.AllFieldList = this.result['ArrArray'];
				this.UserTemplateList = this.result['UserTemplateList'];
			},
			Report_CustomCloseFun(){
				this.$emit('GetReportCustomFun','close');
			},
			EditUserTemplateName(item){
				//修改模板名称
				this.$prompt('请输入模板名称', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPlaceholder:'请输入模板名称',
			          closeOnClickModal:false,
			          closeOnPressEscape:false,
			          showCancelButton: true,
			          type:'warning',
			          customClass:'CustomClass',
			          beforeClose:(action, instance,done) => {
			          	if(action == 'confirm'){
	             		 	let val = $('.CustomClass .el-input__inner').val();
	             		 	if(val == ''){
	             		 		this.$message({message: '还没输入模板名称哦',type: 'warning'});
	             		 	}else{
	             		 		this.UserTemplateName = val;
	             		 		this.UserTemplateList.forEach((itemA, indexA) => {
									if(itemA['id'] == this.frpt_id){
										itemA['text'] = val;
									}
								});
								this.Save(() => {
									done();
								});
	             		 	}
			          	}else{
			          		done();
			          	}
			          }
			      });
				
			},
			RemoveUserTemplate(item){
				//删除模板
				this.$confirm('确认删除当前选择的模板?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          customClass:'customClass-warning',
		          type: 'warning'
		        }).then(() => {
		        	this.DeleteCustomData();
		        });
			},
			ThisApply(){
				//本次应用
				this.$emit('GetReportCustomFun',this.ShowTreeData);
			},
			DeleteCustomData(){
				if(this.frpt_id == -1){
					let arr = [];
					this.UserTemplateList.forEach((itemA, indexA) => {
						if(itemA['id'] != this.frpt_id){
							arr.push(itemA);
						}
					});
					this.IsAddUserTemplate = false;
					this.frpt_id = 0;
					this.UserTemplateList = arr;
				}else{
					//删除模板
					let seft = this;
					let delCustomConfigurationUrl = 'report/customConfigurationRest/delCustomConfiguration';
					var json = {
						'frpt_id':this.frpt_id,//模板ID
						'template_tableName':'rpt_free_template',//模板表名
						'template_recordTableName':'rpt_free_template_log',//模板日志表名
						'detail_tableName':'rpt_free_use_log',//模板明细表名
						'detail_recordTableName':'rpt_free_use',//模板明细日志表名
						'authority_detailtableName':'rpt_free_authority',//权限表名
						'authority_detailrecordTableName':'rpt_free_authority_log',//权限日志表名
					};
					console.log('customAjax',customAjax);
					var _json = JSON.stringify(json);
					customAjax.GetAction(delCustomConfigurationUrl,_json,function(result){
						if(result.success){
							let arrA = [];
							seft.UserTemplateList.forEach((itemA, indexA) => {
								if(itemA['id'] != seft.frpt_id){
									arrA.push(itemA);
								}
							});
							seft.UserTemplateName = '';
							seft.UserTemplateList = arrA;
							seft.frpt_id = 0;
							seft.StartPage();
							seft.$message({type: 'success',message: '删除成功!'});
						
						}else{
							seft.$message.error('修改失败');
						}
					});
				}
			},
			SaveCustomData(){
				let seft = this;
				if(this.UserTemplateList.length == 1 && this.HideTreeData.length > 0 && this.UserTemplateName == ''){
					//只有默认模板并且操作了默认模板，但是却没有输入模板名称，
					//可能由于忘记等原因，需要提示是否保存，如果选择保存需要输入模板名称
					 this.$prompt('请输入模板名称', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPlaceholder:'请输入模板名称',
			          closeOnClickModal:false,
			          closeOnPressEscape:false,
			          showCancelButton: true,
			          type:'warning',
			          customClass:'CustomClass',
			          beforeClose:(action, instance,done) => {
			          	if(action == 'confirm'){
	             		 	let val = $('.CustomClass .el-input__inner').val();
	             		 	if(val != ''){
	             		 		seft.UserTemplateList.push({id:-1,text:val});
	             		 		seft.frpt_id = -1;
	             		 		seft.UserTemplateName = val;
	             		 		instance.confirmButtonLoading = true;
	             		 		instance.confirmButtonText = '保存中';
	             		 		seft.Save(function(){
	             		 			instance.confirmButtonLoading = false;
	             		 			done();
	             		 			seft.ThisApply();
	             		 		});
	             		 	}
			          	}else{
			          		done();
			          	}
			          }
			      });
				} else{
					//输入 了模板名称，直接保存
					seft.Save(function(){
     		 			seft.ThisApply();
     		 		});
				}
				
				
				
			},
			Save(fun){
				//保存模板
				let seft = this;
				this.LoadCustom = true;
				let type = this.frpt_id == -1? 'add' : 'upd';
				let CustomArray = this.AllFieldList;
				let saveUrl = 'report/customConfigurationRest/save';
				let template = [];
				CustomArray.forEach((item, index) => {
					item['is_sort'] = item['is_sort'] ? 1 : 0;
					item['enabled'] = item['enabled'] ? 1 : 0;
					item['forbid_edit'] = item['forbid_edit'] ? 1 : 0;
					item['forbid_sort'] = item['forbid_sort'] ? 1 : 0;
					item['is_fixed'] = item['is_fixed'] ?  1: 0;
					item['status'] = type;
					item['children'].forEach((items, key) =>{
						items['is_sort'] = items['is_sort'] ? 1 : 0;
						items['enabled'] = items['enabled'] ? 1 : 0;
						items['forbid_edit'] = items['forbid_edit'] ? 1 : 0;
						items['forbid_sort'] = items['forbid_sort'] ? 1 : 0;
						items['is_fixed'] = items['is_fixed'] ?  1: 0;
						items['status'] = type;
						template.push(items);
					});
					delete item['show_list'];
					delete item['hide_list'];
					template.push(item);
				});
				let templet = {
					'templet': template,
					'tableName': 'rpt_free_use',
					'recordTableName': 'rpt_free_use_log',
				};
				
				let TzxUser = customAjax.GetTzxUser();
				let TzxId = customAjax.GetTzxtId();
				let time = customAjax.GetTime();
				
				var usertemplate = {
					'usertemplate': [{
						'tenancy_id':TzxId,
						'report_num':this.report_num,
						'template_name':this.UserTemplateName,
						'status':type
					 }], //模板对象
					'tableName': 'rpt_free_template', //表
					'recordTableName': 'rpt_free_template_log' //日志	
				};
				if(type == 'upd'){
					usertemplate['usertemplate'][0]['id'] = this.frpt_id;
				}
				var authority = {
						'authority': [{ //权限数据
						'tenancy_id': TzxId, //商户号
						'user_id': TzxUser.Id, //用户id
						'user_name': TzxUser.UserName, //用户名称
						'available': 1, //开启,关闭
						'create_date': time, //创建时间
						'report_num': this.report_num, //报表编号
						'is_default': 1,
						'status': type //状态[add|upd];type
				     }],
					'tableName': 'rpt_free_authority', //表
					'recordTableName': 'rpt_free_authority_log', //日志
				};
				var jsons = {
					'templet': templet,
					'authority': authority,
					'usertemplate': usertemplate
				};
				let pop = JSON.stringify(jsons);
				customAjax.GetAction(saveUrl,pop,function(result){
					seft.LoadCustom = false;
					if(result.success){
						fun();
						if(result['add']){
							seft.frpt_id = result['add'][0];
							seft.UserTemplateList.forEach((item, index) => {
								if(item['id'] == -1){
									item['id'] = seft.frpt_id;
								}
							});
							
						}
					}
				});
			},
			renderContent(h, { node, data, store }) {
		        return (
		          <span on-dblclick={() => this.dblclickOpen(node)} title={node.data.defaul_name}>
			            <span><div>{node.label}</div></span>
			            <span data-label={node.label} data-id={"tree_" + node.id} class= {!node.data.forbid_edit ? "custom_edit_tree" :"custom_edit_tree edit_tree"}>
			            	<a class="iconfont icon-bianji" on-click={()=> this.EditCustomTreeName({node})}></a>
			            </span>
		          </span>);
		    },
		   EditCustomTreeName(obj){
		    	let did = 'span[data-id="tree_'+obj.node.id+'"]';
		    	let span = $(did);
		    	let val = span.attr('data-label');
		    	let label = span.prev();
		    	span.removeClass('edit_tree');
		    	label.empty().append('<input type="text" id="updtreename" style="width:70%" placeholder="'+val+'"/>');
		    	label.append('<span class="UpName"><i class="el-icon-circle-check SaveUpName"></i><i class="el-icon-circle-close CloseUpName"></i></span>');
		    	label.find('input').focus();
		    	$('.CloseUpName').off('click');
		    	$('.CloseUpName').on('click',function(){
		    		let value = $(this).parent().parent().parent().attr('title');
		    		let _label = $(this).parent().parent();
		    		_label.empty().append('<div>'+value+'</div>');
		    		_label.next().addClass('edit_tree');
		    	});
		    	$('.SaveUpName').off('click');
		    	$('.SaveUpName').on('click',function(){
		    		let value = $(this).parent().parent().parent().attr('title');
		    		let _val = $(this).parent().prev().val() || value;
		    		let _label = $(this).parent().parent();
		    		_label.empty().append('<div>'+_val+'</div>');
		    		_label.next().addClass('edit_tree');
		    		obj.node.data.modify_name = _val;
		    	});
		    },
		    dblclickOpen(nodes){
		    	if(nodes.data.field_type == 'read'){
					return false;
				}else if(nodes.data.field_type == 'active'){
					//隐藏
					let obj = customAjax.SetFieldState(nodes.data,'edit',this.AllFieldList);
					this.HideTreeData = obj['hide_list'];
					this.ShowTreeData = obj['show_list'];
				}else{
					//显示
					let obj = customAjax.SetFieldState(nodes.data,'active',this.AllFieldList);
					this.HideTreeData = obj['hide_list'];
					this.ShowTreeData = obj['show_list'];
				}
		    },
		    ToUp(){
		    	let node = this.$refs.ShowTree.currentNode.node;
		    	let nodeData = node.data;
		    	if(nodeData['forbid_sort']){
			    	let obj = customAjax.GetTranspositionSort(nodeData,'up',this.AllFieldList);
			    	this.HideTreeData = obj['hide_list'];
					this.ShowTreeData = obj['show_list'];
			    	this.$refs.ShowTree.setChecked([nodeData['pid']]);
		    	}
		    },
		    ToDown(){
		    	let node = this.$refs.ShowTree.currentNode.node;
		    	let nodeData = node.data;
		    	if(nodeData['forbid_sort']){		    		
		    		let obj = customAjax.GetTranspositionSort(nodeData,'down',this.AllFieldList);
		    		this.HideTreeData = obj['hide_list'];
		    		this.ShowTreeData = obj['show_list'];
		    	}
		    },
			AllToRightFun(){
				let obj = customAjax.SetAllFieldState('active',this.AllFieldList);
				this.HideTreeData = obj['hide_list'];
				this.ShowTreeData = obj['show_list'];
			},
			ToRightFun(){
				let node = this.$refs.HideTree.currentNode.node;
				let data = node.data;
				let obj = customAjax.SetFieldState(data,'active',this.AllFieldList);
				this.HideTreeData = obj['hide_list'];
				this.ShowTreeData = obj['show_list'];
			},
			ToLeftFun(){
				let node = this.$refs.ShowTree.currentNode.node;
				let data = node.data;
				let obj = customAjax.SetFieldState(data,'edit',this.AllFieldList);
				this.HideTreeData = obj['hide_list'];
				this.ShowTreeData = obj['show_list'];;
			},
			AllToLeftFun(){
				let obj = customAjax.SetAllFieldState('edit',this.AllFieldList);
				this.HideTreeData = obj['hide_list'];
				this.ShowTreeData = obj['show_list'];
			},
			UserTemplateChange(value){
				//用户模板切换
				this.StartPage();
			},
			AddUserTemplateFun(){
				//点击添加模板按钮，判断是否存在模板
				if(this.UserTemplateName != '' || this.UserTemplateList.length >= 2){
					this.$message({message: '当前只能添加一套模板',type: 'warning'});
				}else{
					this.IsAddUserTemplate = true;
				}
			},
			CloseAddUserTemplateFun(){
				//关闭输入模板输入框
				this.UserTemplateName = '';
				this.IsAddUserTemplate = false;
			},
			SaveAddUserTemplateFun(){
				//保存输入模板中输入的模板
				this.IsAddUserTemplate = false;
				this.frpt_id = -1;
				this.UserTemplateList.push({id:-1,text:this.UserTemplateName});
			}
		}
	}
</script>

<style>
	
</style>