<template>
<div class="contractPreparingList public">

    <h2>合同管理列表</h2>
    <div class="show_list_title">
			<h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
		</div>
     <el-row :getters='30' class="module_margin_bottom">
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
          <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">城市</el-col>
          <el-col :span="6">
						<el-select v-model="areaCodeArr" multiple placeholder="全部" class="select_width"  size='small' @change="productsListFn">
							<el-option :key="''" :label="'全部'" :value="''"> </el-option>
							<el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
						</el-select>
          </el-col>
          <el-col :span="4" class="condition">产品类型</el-col>
          <el-col :span="6">
						<el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small'>
							<el-option key='' label='全部' value=''></el-option>
							<el-option v-for="item in proCodeArr" :key='item.proCode' :label='item.proName' :value='item.proCode'></el-option>
						</el-select>
          </el-col>
        </el-col>
        <el-col class="condition_space_between">
          <!--<el-col :span="4" :offset="1" class="condition">预约面签时间</el-col>-->
          <!--<el-col :span="6"><el-date-picker :editable="false" size="small" class="select_width" v-model="interviewTime" type="daterange" placeholder="选择时间范围" ></el-date-picker></el-col>-->
          <el-col :span="4" :offset="1" class="condition">任务创建时间</el-col>
          <el-col :span="6">
             <el-date-picker  :editable="false" size="small" class="select_width" v-model="createTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
          </el-col>
          <el-col :span="4"  class="condition">任务状态</el-col>
          <el-col :span="6">
            <el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
              <el-option label='全部' value=''></el-option>
              <el-option label='未匹配' value='02'></el-option>
              <el-option label='已匹配' value='01'></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col class="condition_space_between">
        </el-col>
        <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查 询</el-button></el-col>
      </el-row>
      <el-row v-if="currentUserPermissions.indexOf('business:contract:manage:match') != -1">
        <el-col :offset='22' :span='2'   class="inquireBtn_warp"><el-button @click="dialogVisible = true" class="inquireBtn">匹 配</el-button></el-col>
      </el-row>
        <div class="show_list_title">
          <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
        </div>
        <el-table ref="multipleTable" border stripe :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange" class="module_margin_bottom">
         <el-table-column header-align="center" align="center" type="selection" :selectable="selectFn"  width="55"></el-table-column>
         <el-table-column header-align="center" align="center" prop="bussNo" label="订单编号" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="proName" label="产品类型" width="200"></el-table-column>
          <!--<el-table-column prop="interviewTime" label="预约面签时间" width="200"></el-table-column>-->
         <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="matchStatus" label="任务状态" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="matchPerName" label="任务员姓名" width="200"></el-table-column>

        </el-table>
        <el-pagination
		      class="pageBtn"
					@size-change="pageSizeChange"
					@current-change="pageCurrentChange"
					:current-page="pagecurrentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pagenumPerPage"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount">
				</el-pagination>
        <el-dialog
          title="确定匹配以下合同?"
          :visible.sync="dialogVisible"
          size="tiny">
          <el-row class="tableInfo" v-if="matchingArr.length >0">
            <el-col v-for="(item,index) in matchingArr" :key="index"  class="table_tr">
              <el-col :span="12" class="table_td">{{item.custName}}</el-col><el-col :span="12" class="table_td">{{item.proName}}</el-col>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="matching">确 定</el-button>
          </span>
        </el-dialog>
</div>
</template>
<script>
export default {
	name:'contractPreparingList',
	data () {
		return {
      dialogVisible:false,
      currentUserPermissions:this.currentUserPermissions,
      proCodeArr:[],
      totalCount:1,
			condition:{},
			tableData:[{}],
			pagecurrentPage:1,
			pagenumPerPage:10,
      pagetotalCount:1,
      params:{},
      areaCodeArr:[],
      bussNo:'',
      custName:'',
      citys:[],
      proCode:'',
      interviewTime:[],
      createTime:[],
      taskStatus:'',
      matchingArr:[]
		}
	},
	methods: {
    productsListFn(){
      $.post(this._path + "/loanInfo/selectProductInfo",{cityCode:this.areaCodeArr},res => {
        if (res.resultCode == "0000") {
          this.proCodeArr = res.data.productInfoVoList
        }else{
          this.requestError(res,this)
        }
      });
    },
    selectFn(row,index){
      return row.matchStatus !== '已匹配'
    },
		requestQuery() {
			let interviewTime = Date.parse(this.interviewTime[0])?Date.parse(this.interviewTime[0]):'';
			let interviewTimeEnd = Date.parse(this.interviewTime[1])?Date.parse(this.interviewTime[1]):'';
			let createTime = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
			let createTimeEnd = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
			this.params = {
				currentPage:this.pagecurrentPage,
				numPerPage:this.pagenumPerPage,
				bussNo:this.bussNo,
				custName:this.custName,
        areaCode:JSON.stringify(this.areaCodeArr),
        proCode:this.proCode,
				interviewTime,
				interviewTimeEnd,
				createTime,
				createTimeEnd,
				taskStatus:this.taskStatus
      }
		},
    //全选按钮
    handleSelectionChange(val) {
      this.matchingArr = val;
    },
		pageSizeChange (val) {
			this.pagenumPerPage = val;
			this.requestQuery();
			this.request()
		},
		pageCurrentChange (val) {
			this.pagecurrentPage = val;
			this.requestQuery();
			this.request()
		},
		inquire () {
      this.requestQuery();
			this.request()
		},
		btnClick (row,url) {
			this.$router.push(url)
    },
		request () {
			$.post(this._path + '/visaInterview/contractManagePageList',this.params,res=>{
				if(res.resultCode == '0000'){
        this.tableData = res.data.contractManageVoList;
        this.totalCount = res.data.totalCount;
				}else{
					this.requestError(res,this)
				}
			})
    },
    matching () {
      let params = [];
      for(let i = 0 ,j = this.matchingArr.length; i < j ; i++){
        params.push(this.matchingArr[i].id)
      }
      if(params.length < 1){
        this.$message({
          type:'warning',
          message:'请选择匹配订单',
          duration:1500,
          showClose:1
        })
        return
      }
      $.post(this._path + '/visaInterview/contractManageMatch',{id:JSON.stringify(params)},res=>{
        if(res.resultCode == '0000'){
          this.$message({
            type:'success',
            message:'匹配成功',
            duration:1500,
            showClose:1
          })
          this.dialogVisible = false;
          this.inquire()
        }else{
          this.requestError(res,this)
        }
      })
    }
  },
  mounted () {
    $(document).on('keydown',(e)=>{
      if(e.which === 13){
        this.inquire()
      }
    })
  },
  watch:{
    $route () {
      $(document).off('keydown')
    }
  },
  activated(){
    $(document).on('keydown',(e)=>{
      if(e.which === 13){
        this.inquire()
      }
    })
    this.inquire()
  },
  beforeCreate () {
    $.post(this._path + '/visaInterview/contractManagePageList',{},res=>{
      if(res.resultCode == '0000'){
        this.tableData = res.data.contractManageVoList;
        this.totalCount = res.data.totalCount;
      }else{
        this.requestError(res,this)
      }

    })
    // 产品类型
    $.post(this._path + '/loanInfo/selectProductInfo',{},res=>{
      if(res.resultCode == '0000'){
        this.proCodeArr = res.data.productInfoVoList
      }else{
        this.requestError(res,this)
      }
    });
    $.post(this._path + '/business/getAreaCode',{},res=>{
      if(res.resultCode == '0000'){
        this.citys = res.data.permissionVoList
      }else{
        this.requestError(res,this)
      }
    })
  }

}
</script>
<style scoped>

</style>


