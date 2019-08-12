<template>
	<div class="RptConfig">
		<el-row>
		    <el-col :span="24" :offset="0">
    	    	<el-input class="combox" size="small" v-model="ReportCodeNum">
    	    	    <template slot="prepend">报表编码</template>
    	    	    <template slot="append">
    	    	    	<el-select 
    	    	    		v-model="ReportCodeNum" 
    	    	    		size="small" 
    	    	    		placeholder="请选择"
    	    	    		@change = "changeData">
    	    	    	    <el-option
    	    	    	      v-for="item in ReportCode"
    	    	    	      :key="item.id"
    	    	    	      :label="item.text"
    	    	    	      :value="item.id">
    	    	    	    </el-option>
    	    	    	  </el-select>
    	    	    </template>
    	    	</el-input>
    	    	<el-input class="combox" size="small" v-model="QueryType">
    	    	    <template slot="prepend">查询方式</template>
    	    	    <template slot="append">
    	    	    	<el-select 
    	    	    		v-model="QueryType" 
    	    	    		size="small" 
    	    	    		placeholder="请选择" >
    	    	    	    <el-option
    	    	    	      v-for="item in inquiry_mode"
    	    	    	      :key="item.key"
    	    	    	      :label="item.value"
    	    	    	      :value="item.key">
    	    	    	    </el-option>
    	    	    	  </el-select>
    	    	    </template>
    	    	</el-input>
    	    	<el-button type="primary" class="rptdictionnarybtn" @click="queryReportData">
    	    		查询
    	    	</el-button>
    	    	<el-button @click="dialogVisible = true" class="rptdictionnarybtn">
    	    		+&nbsp;新增报表
    	    	</el-button>
    	    	<el-dialog
				  title="新增报表"
				  :visible.sync="dialogVisible"
				  class="newReportDialog">
				  <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
					  <el-form-item label="报表编号：">
					    <el-input v-model="form.reportNum" class="reportNum"></el-input>*必填项
					  </el-form-item>
					  <el-form-item
						    v-for="(querytype, index) in form.querytypes"
						    :label="'查询方式' + index"
						    :key="querytype.key"
						    :prop="'querytypes.' + index + '.value'"
						    :rules="{
						      required: true, message: '查询方式不能为空', trigger: 'blur'
						    }"
						  >
						    <el-input v-model="querytype.value"></el-input>&nbsp;&nbsp;<el-button @click.prevent="removeQuerytype(querytype)">删除</el-button>
					  </el-form-item>
					</el-form>
				  <span slot="footer" class="dialog-footer">
				  	<el-button @click="addQuerytype">新增查询方式</el-button>
				    <el-button @click="dialogVisible = false">取 消</el-button>
				    <el-button type="primary" @click="onSubmit">确 定</el-button>
				  </span>
				</el-dialog>
		    </el-col>
		</el-row>
		<el-row>
			<el-col :span="4" class="leftBlock">
				<a href="#" @click="getFirstL">{{ReportCodeNum}}</a>
				<el-tree
				  :data="treeData"
				  highlight-current
				  node-key="id"
				  @node-click="changeDataList"
				  :props="defaultProps">
				</el-tree>
			</el-col>
			<el-col :span="20" class="rightBlock">
				<el-button type="primary" icon="plus" class="rptdictionnarybtn" @click="addData">新增字段</el-button>
				<el-button icon="check" class="rptdictionnarybtn" @click="saveData">保存</el-button>
				<el-button icon="minus" class="rptdictionnarybtn" @click="delData">删除</el-button>
				<p style="clear: both;padding-top:10px;">&nbsp;&nbsp;报表编号：{{ReportCodeNum}}&nbsp;&nbsp;父级节点：{{parentName}}&nbsp;&nbsp;父节点id：{{parentId}}</p>
                 <el-alert
				    title="别得瑟！该节点不能添加子节点！！！"
				    type="error"
				    v-if="showAlert"
				    >
				  </el-alert>
                 <el-table
				    border
				    :data="dataList"
				    style="width: 100%"
				    class="tableData"
				    :height="660"
				    ref="multipleTable"
                    @selection-change="handleSelectionChange">
				    <el-table-column type="selection" width="55"></el-table-column>
				    <el-table-column prop="field_name" label="字段名称" width="160">
				      <template slot-scope="scope">
				      	<el-input size="small" placeholder="字段名称" v-model="scope.row.field_name"></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column prop="defaul_name" label="默认名称" width="160">
				      <template slot-scope="scope">
				      	<el-input size="small" placeholder="默认名称" v-model="scope.row.defaul_name"></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column prop="modify_name" label="显示名称" width="160">
				      <template slot-scope="scope">
				      	<el-input size="small" placeholder="显示名称" v-model="scope.row.modify_name"></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column prop="forbid_edit" label="是否禁止修改" width="100">
				      <template slot-scope="scope">
				      	  <el-tooltip 
				      	  	class="item" 
				      	  	effect="dark" 
				      	  	:content="scope.row['forbid_edit'] == 1?'允许修改名称':'禁止修改名称'" 
				      	  	placement="right">
		                    <el-switch size="small" :width='44'
		                               v-show="!scope.row['new']"
		                               on-color="#13ce66"
		                               off-color="#ff4949"
		                               active-value=1
		                               inactive-value=0
		                               on-text="是"
		                               off-text="否"
		                               v-model="scope.row['forbid_edit']">
		                    </el-switch>
					      </el-tooltip>
		                </template>
				    </el-table-column>
				    <el-table-column prop="forbid_sort" label="是否禁止排序" width="100">
				      <template slot-scope="scope">
				      	 <el-tooltip 
				      	  	class="item" 
				      	  	effect="dark" 
				      	  	:content="scope.row['forbid_sort'] == 1?'允许排序':'禁止排序'" 
				      	  	placement="right">
		                    <el-switch size="small" :width='44'
		                               v-show="!scope.row['new']"
		                               on-color="#13ce66"
		                               off-color="#ff4949"
		                               active-value=1
		                               inactive-value=0
		                               on-text="是"
		                               off-text="否"
		                               v-model="scope.row['forbid_sort']">
		                    </el-switch>
		                  </el-tooltip>
		                </template>
				    </el-table-column>
				    <el-table-column prop="place_sort" label="排序序号" width="100">
				      <template slot-scope="scope">
				      	<el-input size="small" placeholder="排序序号" v-model="scope.row.place_sort"></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column prop="field_type" label="字段类型" width="100" >
				      <template slot-scope="scope">
				      	<el-select size="small" v-model="scope.row.field_type" placeholder="字段类型" class="selectType">
					      <el-option
    	    	    	      v-for="item in field_type"
    	    	    	      :key="item.id"
    	    	    	      :label="item.text"
    	    	    	      :value="item.value">
    	    	    	  </el-option>
					    </el-select>
				      </template>
				    </el-table-column>
				    <el-table-column prop="field_state" label="字段状态" width="100">
				      <template slot-scope="scope">
				      	<el-select size="small" v-model="scope.row.field_state" placeholder="字段状态" class="selectType">
					      <el-option
    	    	    	      v-for="item in field_state"
    	    	    	      :key="item.id"
    	    	    	      :label="item.text"
    	    	    	      :value="item.value">
    	    	    	  </el-option>
					    </el-select>
				      </template>
				    </el-table-column>
				    <el-table-column prop="data_type" label="数据类型"  width="100">
				      <template slot-scope="scope">
				      	<el-select size="small" v-model="scope.row.data_type" placeholder="数据类型" class="selectType">
					      <el-option
    	    	    	      v-for="item in data_type"
    	    	    	      :key="item.id"
    	    	    	      :label="item.text"
    	    	    	      :value="item.value">
    	    	    	  </el-option>
					    </el-select>
				      </template>
				    </el-table-column>
				    <el-table-column prop="cell_width" label="字段宽度" width="100">
				      <template slot-scope="scope">
				      	<el-input size="small" placeholder="字段宽度" v-model="scope.row.cell_width"></el-input>
				      </template>
				    </el-table-column>
				    <el-table-column prop="alignment" label="对齐方式" width="100">
				      <template slot-scope="scope">
				      	<el-select size="small" v-model="scope.row.alignment" placeholder="对齐方式" class="selectType">
					      <el-option
    	    	    	      v-for="item in alignment"
    	    	    	      :key="item.id"
    	    	    	      :label="item.text"
    	    	    	      :value="item.value">
    	    	    	  </el-option>
					    </el-select>
				      </template>
				    </el-table-column>
				    <el-table-column prop="enabled" label="是否开启" width="100">
				        <template slot-scope="scope">
				    	 <el-tooltip 
				      	  	class="item" 
				      	  	effect="dark" 
				      	  	content="开启后将在前端展示该字段" 
				      	  	placement="right">
		                    <el-switch size="small" :width='44'
		                               v-show="!scope.row['new']"
		                               on-color="#13ce66"
		                               off-color="#ff4949"
		                               active-value=1
		                               inactive-value=0
		                               on-text="是"
		                               off-text="否"
		                               v-model="scope.row.enabled">
		                    </el-switch>
		                  </el-tooltip>
		                </template>
				    </el-table-column>
				    <el-table-column prop="is_sort" label="是否排序" width="100">
				        <template slot-scope="scope">
				    	 <el-tooltip 
				      	  	class="item" 
				      	  	effect="dark" 
				      	  	content="开启后将可对此列排序" 
				      	  	placement="right">
		                    <el-switch size="small" :width='44'
		                               v-show="!scope.row['new']"
		                               on-color="#13ce66"
		                               off-color="#ff4949"
		                               active-value=1
		                               inactive-value=0
		                               on-text="是"
		                               off-text="否"
		                               v-model="scope.row.is_sort">
		                    </el-switch>
		                  </el-tooltip>
		                </template>
				    </el-table-column>
				    <el-table-column prop="is_fixed" label="是否冻结" width="100">
				        <template slot-scope="scope">
				    	 <el-tooltip 
				      	  	class="item" 
				      	  	effect="dark" 
				      	  	content="开启后将可对此列进行冻结" 
				      	  	placement="right">
		                    <el-switch size="small" :width='44'
		                               v-show="!scope.row['new']"
		                               on-color="#13ce66"
		                               off-color="#ff4949"
		                               active-value=1
		                               inactive-value=0
		                               on-text="是"
		                               off-text="否"
		                               v-model="scope.row.is_fixed">
		                    </el-switch>
		                  </el-tooltip>
		                </template>
				    </el-table-column>
				    <el-table-column prop="inquiry_mode" label="查询方式" width="160" >
				      <template slot-scope="scope">
				      	<el-select size="small" v-model="scope.row.inquiry_mode" placeholder="查询方式" class="selectType">
					      <el-option
    	    	    	      v-for="item in inquiry_mode"
    	    	    	      :key="item.key"
    	    	    	      :label="item.value"
    	    	    	      :value="item.key">
    	    	    	  </el-option>
					    </el-select>
				      </template>
				    </el-table-column>
				  </el-table>
				</el-col>
			</el-row>
		</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				title:'报表表头数据维护',
				ReportCodeNum:'',//报表编码
				QueryType:1,//查询方式
				fieldName:'',//字段名称
				dialogVisible:false,//新增报表
				dataList:[],
				multipleSelection: [],//选择项
				parentId:0,//当前右侧table的parentid
				parentName:'',//当前右侧table的父节点的名称
				showAlert:false,//是否显示提示
				addchild:true,//是否可以添加字节点标识
				inquiry_mode:[
				  {
				  	key:1,
				  	value:'按日期查询',
				  },
				  {
				  	id:2,
				  	value:'按交易门店查询',
				  },
				],
				ReportCode:[],
				treeNodes:[],//查询出来的所有记录
				 form: {
			          reportNum: '',
			          selectType: '',
			          querytypes: [{
			            value: ''
			          }],
			        },
			     rules: {
		          reportNum: [
		            { required: true, message: '请输入报表编号', trigger: 'blur' }
		          ]},
		        field_type:[//字段类型
                    {'id':1,'text':'仅读','value':'read'},
					{'id':2,'text':'隐藏','value':'edit'},
					{'id':3,'text':'显示','value':'active'},
					{'id':4,'text':'双向','value':'twoway'}
		        ],
		        field_state:[//字段状态
                    {'id':1,'text':'仅读','value':'read'},
					{'id':2,'text':'隐藏','value':'edit'},
					{'id':3,'text':'显示','value':'active'},
					{'id':4,'text':'双向','value':'twoway'}
		        ],
		        data_type:[//字段数据类型
                    {'id':1,'text':'整型','value':'integer'},
					{'id':2,'text':'小数点2位','value':'float'},
					{'id':3,'text':'时间','value':'time'},
					{'id':4,'text':'字符串','value':'classify'},
					{'id':5,'text':'百分比符号','value':'percentage'},
					{'id':6,'text':'美元符号','value':'$symbol'},
					{'id':7,'text':'绝对值','value':'abslutevalue'}
		        ],
		        alignment:[//对齐方式
                    {'id':1,'text':'左对齐','value':'left'},
					{'id':2,'text':'居中对齐','value':'center'},
					{'id':3,'text':'右对齐','value':'right'}
		        ],
			    treeData: [],
		        defaultProps: {
		          children: 'children',
		          label: 'label'
		        },
			    newItem:{
			    	inquiry_mode:1,
			    	alignment:'right',
			    	cell_width:120,
			    	data_type:'float',
			    	field_type:'active',
			    	field_state:'edit',
			    	enabled:'1',
			    	is_sort:'1',
			    	is_fixed:'0'
			    }
			}
		},
		created(){
			document.title = this.title;
			let _self = this;
			//查询方式
//			this.getResult.getResult('/report/CommonMethodAreaRest/getSearchMethods',{},function(result){
//				result.forEach((re)=>{
//					let item ={};
//					item.id= re.id;
//					item.value= re.id;
//					item.text= re.class_item;
//					_self.inquiry_mode.push(item);
//				})
//			})
			//报表编码
			this.getResult.getResult('/report/CommonMethodAreaRest/getReportNumList',{},function(result){
				result.forEach((re)=>{
					let item ={};
					item.id= re.report_num;
					item.text= re.report_num;
					_self.ReportCode.push(item);
				})
			})
		},
		 methods: {
	      onSubmit() {
	        this.dialogVisible=false;
	        this.ReportCode.push({
	        	 'id':this.form.reportNum,
	        	 'text':this.form.reportNum
	        });
	        this.ReportCodeNum = this.form.reportNum;//新增报表的编号
	        this.inquiry_mode =[];
	        if(this.form.querytypes.length==0){
	        	this.inquiry_mode=[
	        	  {
	        	  	'key':1,
	        	  	'value':'默认查询方式'
	        	  }
	        	];
	        }else{
	        	this.form.querytypes.forEach((item,index)=>{
	        	let obj ={};
	        	obj.key= index+1;
	        	obj.value = item.value;
	        	this.inquiry_mode.push(obj);
	           });
	        }
	        this.QueryType = this.inquiry_mode[0]['key'];//新增报表的第一种查询方式
	        console.log(this.inquiry_mode);
	        this.dataList=[];
	        this.treeData=[];
	      },
	      //删除查询方式
	       removeQuerytype(item) {
	        var index = this.form.querytypes.indexOf(item)
	        if (index !== -1) {
	          this.form.querytypes.splice(index, 1)
	        }
	      },
	      //新增查询方式
	      addQuerytype() {
	        this.form.querytypes.push({
	          value: '',
	          key: Date.now()
	        });
	      },
	      //新增一行数据
	      addData(index){
	      	console.log(this.addchild);
	      	//this.dataList.push(JSON.parse(JSON.stringify(this.newItem)));
	      	if(this.addchild){
	      		this.dataList.push(JSON.parse(JSON.stringify(this.newItem)));
	      	}else{
	      		this.$message({
				          message: '该节点不能添加子节点！',
				          type: 'warning'
				        });
	      	   }    
            },
          //删除添加的行
          delData(){
          	   let newDataList = [];
          	   this.dataList.forEach((item1)=>{
			    let item3 = this.multipleSelection.findIndex(item2=>item1 == item2);
			    if (item3 > -1) delete this.multipleSelection[item3];
			    else newDataList.push(item1);
			});
          	  this.dataList =  newDataList;
          },
           //保存数据
           saveData(){
           	 let arrayData =[{
           	 	alignment:"center",
				cell_width:170,
				colspan:1,
				data_type:"classify",
				defaul_name:"修改字段1",
				enabled:1,
				field_name:"report_date",
				field_state:"read",
				field_type:"read",
				forbid_edit:0,
				forbid_sort:0,
				frpt_id:0,
				inquiry_mode:1,
				modify_name:"修改字段1",
				parentid:0,
				place_sort:1,
				pid:2003,
				report_num:"SAAS_BI_2016_13",
				rowspan:1,
				tenancy_id:"rlyhbi"
           	 },
           	 {
           	 	alignment:"center",
				cell_width:170,
				colspan:1,
				data_type:"classify",
				defaul_name:"修改字段2",
				enabled:1,
				field_name:"report_date",
				field_state:"read",
				field_type:"read",
				forbid_edit:0,
				forbid_sort:0,
				frpt_id:0,
				inquiry_mode:1,
				modify_name:"修改字段2",
				parentid:0,
				pid:2004,
				place_sort:1,
				report_num:"SAAS_BI_2016_13",
				rowspan:1,
				tenancy_id:"rlyhbi"
           	 }
           	 ];
          	 console.log(this.multipleSelection);
          	 let newrows = [];//新增的行
          	 let oldrows = [];//修改的行
          	 let addparams ={};//新增的参数数组
          	 let editparams ={};//修改的参数数据
          	 let _self = this;
          	 if(this.multipleSelection.length==0){//如果用户没有选择任何数据行
          	 	this.$message({
				          message: '请选择要保存的数据！',
				          type: 'warning'
				        });
				return false; 
          	 }else{
          	 	if(this.ReportCodeNum==''){//如果用户没有选择报表编码
          	 	this.$message({
				          message: '请选择一个报表编号！',
				          type: 'warning'
				        });
				return false; 
	          	 }else{
	          	 	this.multipleSelection.forEach((lst)=>{
		          	 	lst.report_num = this.ReportCodeNum;
		          	 	if(lst.id){//如果有id 说明是修改
		          	 		if("children" in lst){//如果存在子节点则先删除，否则修改报错！
		          	 			delete lst.children;
		          	 		}
		          	 		oldrows.push(lst);
		          	 	}else{//如果没有id 说明是新增的行
		          	 		lst.frpt_id = 0;
		          	 		lst.rowspan = 1;
		          	 		lst.colspan = 1;
		          	 		if(this.parentId!=0){//如果是为一级节点增加子节点
		          	 			lst.parentid = this.parentId;
		          	 		}else{
		          	 			lst.parentid = 0;
		          	 		}
		          	 		if(!lst.inquiry_mode){
		          	 			lst.inquiry_mode =1;
		          	 		}
		          	 		newrows.push(lst);
		          	 	}
	          	    })
	          	 }
          	 }
          	 if(newrows.length>0){//如果有新增的行
          	 	addparams.type="add";
          	 	addparams.array = newrows;
          	 	addparams = JSON.stringify(addparams);
          	 	console.log('新增行：',addparams);
          	 	//新增记录
                this.getAction('/report/CommonMethodAreaRest/addOrUpdateTH',addparams,function(result){
              	if(result.success){
              		_self.$message({
				          message: '数据保存成功！',
				          type: 'success'
				        });
              	 }else{
              	 	_self.$message({
				          message: '数据保存失败！',
				          type: 'error'
				        });
              	 }
				});
          	 }
          	 if(oldrows.length>0){//修改记录
          	 	editparams.type="upd";
          	 	editparams.array = oldrows;
          	 	editparams = JSON.stringify(editparams);
          	 	console.log('修改行：',editparams);
          	 	//修改记录
                this.getAction('/report/CommonMethodAreaRest/addOrUpdateTH',editparams,function(result){
	              	if(result.success){
	              		_self.$message({message: '数据保存成功！',type: 'success'});
	              	 }else{
	              	 	_self.$message({message: '数据保存失败！',type: 'error'});
	              	 }
				});
          	 }
             this.getFirstL(); 
           },
           //AJAX请求
           getAction(server, par, fun1, fun2) {
				$.ajax({
					url: axios.defaults.baseURL+server+'?_s='+axios.defaults.token,
					data: par,
					type: 'post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					success: function(data) {
						if(fun1) {
							fun1(data);
						}
					},
					error: function(a, b, c) {
						if(fun2) {
							fun2(a);
						}
					}
				});
			},
           //点击编码获取一级菜单
           getFirstL(){
           	  this.parentId = 0;
           	  this.dataList = this.treeData;
           },
           //点击树节点的响应事件
           changeDataList(data){
           	let nodeArr = [];
           	if(data.parentid==0){//说明是一级菜单
           		if("children" in data){
           		nodeArr=data.children;
	           	}
           		this.parentName = data.defaul_name;
           		this.parentId = data.id;
           		this.addchild = true;//可以添加子节点
           	}else{//如果是第二级菜单
           		this.parentId = data.parentid;
           		this.parentName = '';
           		this.addchild = false;//不能添加子节点
           	}
           	
            this.dataList = nodeArr;
           },
           //切换报表时的相应事件
           changeData(){
           	this.dataList=[];
           	this.treeData=[];
           	this.parentId =0;
           	this.parentName='';
           },
           //查询的点击事件
           queryReportData(){
           	  this.dataList=[];
           	  this.treeData=[];
           	  let queryParams = {};
           	      queryParams.report_num = this.ReportCodeNum;//报表编号
           	      queryParams.inquiry_mode = this.QueryType;//查询方式
           	      this.newItem.inquiry_mode = this.QueryType;
           	      this.parentName = '';
           	      this.parentId=0;
           	  let _self = this;
			this.getResult.getResult('/report/CommonMethodAreaRest/getReportTH',queryParams,function(result){
				if(result.length>0){
					_self.treeNodes = result;
					result.forEach((re)=>{
						re.label = re.defaul_name;
						re.enabled = ""+re.enabled+"";
						re.is_sort = ""+re.is_sort+"";
						re.is_fixed = ""+re.is_fixed+"";
						re.forbid_edit = ""+re.forbid_edit+"";
						re.forbid_sort = ""+re.forbid_sort+"";
						if(re.parentid==0){//左侧一级菜单
							re.children = [];
							_self.treeData.push(re);
						}
				  });
				  //遍历一级tree节点查找二级节点
					_self.treeData.forEach((firstNode)=>{
						 _self.treeNodes.forEach((leafNode)=>{
						 	if(leafNode.parentid==firstNode.id){
						 		firstNode.children.push(leafNode);
						 	}
						 });
						
					})
				}else{
					_self.$message.error('数据请求发生错误！'); 
				}
				_self.getFirstL();
			})

			console.log(_self.treeData);
           },
           //复选框点击事件
          handleSelectionChange(val) {
	        this.multipleSelection = val;
	      }
	    }
	}
</script>

<style>
    .RptConfig{
    	margin: 10px;
    }
    .newReportDialog  .el-dialog{
    	width: 600px;
    }
    .rptdictionnarybtn{
    	float: left;
    	height: 30px;
    	line-height: 10px;
    }
    .selectType{
    	float: left;
    }
    .reportNum{
    	float: left;
    	width: 215px;
    }
	.combox,
	.comipt{
		margin: 0px 5px;
		float: left;
		width: 280px;
	}
	.combox>.el-input__inner{
		width: 0px;
		border: 0px;
		padding: 0px!important;
	}
	.combox>.el-input-group__append{
		width: auto;
		background-color: transparent;
		border-left: 1px solid #d8dce5;
	}
	.combox .el-input__inner{
		border-color: transparent!important;
	}
	.el-select-dropdown__item.selected{
		font-weight: normal;
	}
	.leftBlock,.rightBlock{
		border:1px solid #ccc;
		padding:10px;
		margin-top: 8px;
		text-align: left;
	}
	.leftBlock{
		height: 750px;
		overflow: auto;
	}
	.leftBlock .el-tree{
		border:0px !important;
	}
	.rightBlock .el-table{
        margin-top:10px;
	}
	.tableData div.cell .el-input__inner{
		height: 30px;
		border-radius: 2px !important;
	}
	.tableData .el-table__body-wrapper{
		height:700px;
	}
	.rightBlock .cell{
		padding: 0px 5px;
	}
	.rightBlock .cell>.el-input{
		width: 90%;
		margin: 5px;
	}
	.rightBlock .cell>.el-switch{
		margin: 5px;
	}
	.rightBlock .el-table td, 
	.rightBlock .el-table th{
		padding:0px;
	}
</style>