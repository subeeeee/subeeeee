

<template>
  <div class="firstCheckList public">
		<h2>订单列表</h2>
    <div class="show_list_title">
			<h3><img src="./../assets/figure.png" class="listTitleImg"><span>筛选条件</span></h3>
		</div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
          <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">城市</el-col>
          <el-col :span="6">
              <el-select v-model="areaCode" placeholder="请选择" class="select_width"  size='small'>
                  <el-option :key="''" :label="'全部'" :value="''"> </el-option>
                  <el-option v-for="item in condition.citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
              </el-select>
          </el-col>
          <el-col :span="4"  class="condition">渠道简称</el-col>
          <el-col :span="6">
            <el-input size='small' :disabled="orgNameBol"  v-model="orgName"></el-input>
          </el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">订单状态</el-col>
          <el-col :span="6">
            <el-select v-model="taskType" @change="taskTypesChange" placeholder="请选择" class="select_width"  size='small'>
              <el-option :key="''" :label="'全部'" :value="''"> </el-option>
              <el-option v-for="item in taskTypes" :key="item.key" :label="item.value" :value="item.key"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="condition">任务状态</el-col>
          <el-col :span="6">
              <el-select v-model="taskState" placeholder="请选择" class="select_width"  size='small'>
                  <el-option :key="''" :label="'全部'" :value="''"> </el-option>
                  <el-option v-for="item in taskStates" :key="item.status" :label="item.name" :value="item.status"> </el-option>
              </el-select>
          </el-col>
        </el-col>
        <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
      </el-row>
        <!-- 列表展示 -->
        <div class="show_list_title">
          <h3><img src="./../assets/figure.png" class="listTitleImg"><span>任务列表</span></h3>
        </div>

        <el-table :data="tableData" border stripe class="table">
         <el-table-column header-align="center" align="center" prop="bussNo" width="150" label="订单编号"></el-table-column>
         <el-table-column header-align="center" align="center" prop="custName" width="150" label="借款人姓名"></el-table-column>
         <el-table-column header-align="center" align="center" prop="areaName" width="150" label="城市"></el-table-column>
         <el-table-column header-align="center" align="center" prop="orgName" width="150" label="渠道简称"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskType" width="150" label="订单状态"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskStatus" width="150" label="任务状态"></el-table-column>
         <el-table-column header-align="center" align="center" v-if="!orgNameBol" width="150" prop="taskPerName" label="任务员"></el-table-column>
         <el-table-column header-align="center" align="center" prop="createTime" min-width="200" label="任务创建时间"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" min-width="200" label="任务完成时间"></el-table-column>
         <el-table-column header-align="center" align="center" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="currentUserPermissions.indexOf('business:order:list:query') != -1" @click="btnClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页按钮 -->
        <el-pagination
        class="pageBtn"
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.numPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"></el-pagination>
	</div>
</template>

<script>
export default {
  name: "orderList",
  data() {
    return {
      currentUserPermissions:this.currentUserPermissions,
      condition: {
        citys: [],
        investigatorName: "",
        surveyTime: [],
        taskState: "",
      },
      //
      areaCode:'',
      custName:'',
      bussNo:'',
      taskType:'',
      taskTypes:[],
      taskState:'',
      taskStates:[],
      currentPage:'',
      numPerPage:'',
      orgName:'',

      // 列表数据
      tableData: [{}],
      // 分页变量
      page: {
        currentPage: 1,
        numPerPage: 10,
        totalCount: 1
      },
      params: {},
      orgNameBol:false
    };
  },
  methods: {
    taskTypesChange(val){
        $.post(this._path + "/business/getTaskStatus",{taskType:val},res => {
            if (res.resultCode == "0000") {
              this.taskStates = res.data
            }else{
              this.requestError(res,this)
            }
          }
        );
    },

    btnClick(row, type) {
        // $.post(this._path + '/loanFirstInfo/dealLoanFirstInfo',{bussNo:row.bussNo},res=>{
        //   if(res.resultCode == '0000'){
        //     this.$router.push({
        //       path:'/loanFirstCheck',
        //       query: {
        //         bussNo: row.bussNo,
        //       }
        //     });
        //   }else{
        //     this.requestError(res,this)
        //   }
        // })
        this.$router.push({
          path:'/orderInfo',
          query:{
            bussNo:row.bussNo,
            taskType:row.taskType,
            orgNameBol:this.orgNameBol?'0':'1'
          }
        })
    },
    pageSizeChange(val) {
      this.numPerPage = val;
      this.ajaxData();
      this.ajax();
    },
    pageCurrentChange(val) {
      this.currentPage = val;
      this.ajaxData();
      this.ajax();
    },
    //请求参数
    ajaxData() {
      this.params = {
        currentPage: this.currentPage,
        numPerPage: this.numPerPage,
        bussNo: this.bussNo,
        custName: this.custName,
        areaCode: this.areaCode,
        taskStatus: this.taskState,
        taskType:this.taskType,
        orgName:this.orgName,
      }
    },
    //ajax请求
    ajax() {
      $.post(
        this._path + "/business/queryBusinessInfo",
        this.params,
        res => {
          if (res.resultCode == "0000") {
            this.tableData = res.data.businessInfoVoList;
            this.page.totalCount = res.data.totalCount;
          }else{
            this.requestError(res,this)
          }
        }
      );
    },
    //查询
    inquire() {
      this.ajaxData();
      this.ajax();
    }
  },
  activated(){
    this.inquire()
  },
  beforeCreate() {
    $.post(this._path + "/business/queryBusinessInfo",{},res => {
        if (res.resultCode == "0000") {
          this.tableData = res.data.businessInfoVoList;
          this.page.totalCount = res.data.totalCount;
          if(!res.data.orgName){
            this.orgNameBol = false;
            this.orgName = res.data.orgName
          }else{
            this.orgNameBol = true;
            this.orgName = res.data.orgName
          }
        }else{
          this.requestError(res,this)
        }
      }
    );
    $.post(this._path + "/business/getAreaCode", res => {
      this.condition.citys = res.data.permissionVoList;
    });

    $.post(this._path + "/business/getTaskType",res => {
        if (res.resultCode == "0000") {
          this.taskTypes = res.data;
        }else{
          this.requestError(res,this)
        }
      }
    );
  }
};
</script>
