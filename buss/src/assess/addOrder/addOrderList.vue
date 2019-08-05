<template>
  <div class="initialConsummate public">
    <h2>新增订单列表<a class="help" :href="pdf" target="_blank">查看系统操作手册</a></h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='20' class="module_margin_bottom">
      <el-col class="condition_space_between" :offset="20" :span="4" v-if="currentUserPermissions.indexOf('business:accept:consummate:newbuss') != -1">
        <el-button size="small" @click="addOrder"><i class="el-icon-plus"></i> 新增订单</el-button>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small' v-model="custName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="areaCode" placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in citys" :key="item.value" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option :key="'0'" :label="'已新增'" :value="'0'"></el-option>
            <!--<el-option :key="'1'" :label="'已上传'" :value="'1'"></el-option>-->
          </el-select>
        </el-col>
      </el-col>
      <el-col :offset='10' :span='2' class="inquireBtn_wrap"><el-button type="primary" class="inquireBtn" @click="inquire">查询</el-button></el-col>
    </el-row>
    <!-- 任务列表 -->
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border class="table">
     <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间"  min-width="220"></el-table-column>
      <!--<el-table-column prop="finishTime" label="任务完成时间" min-width="220"></el-table-column>-->
     <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" width="150">
        <template scope="scope">
          <!--<el-button type="text" size="small" @click="operation('上传基本材料',scope.row)" v-if="currentUserPermissions.indexOf('business:accept:neworder:upload') != -1" v-show="scope.row.taskStatus =='已新增'">上传基本材料</el-button>-->
          <el-button type="text" size="small" @click="operation('详情',scope.row)" v-if="currentUserPermissions.indexOf('business:accept:neworder:query') != -1">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="numPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'addOrderList',
    data () {
      return {
        pdf:require('./../../assets/addOrder.pdf'),
        currentUserPermissions:this.currentUserPermissions,
        city:'',
        citys:[],
        tableData:[],
        currentPage:1,
        numPerPage:10,
        bussNo:'',
        taskStatus:'',
        custName:'',
        areaCode:'',
        totalCount:0,
        params:{},
      }
    },
    methods : {
      initParams () {
        this.params = {
          currentPage:this.currentPage,
          numPerPage:this.numPerPage,
          bussNo:this.bussNo,
          taskStatus:this.taskStatus,
          custName:this.custName,
          areaCode:this.areaCode
        }
      },
      request(){
        $.post(this._path + '/busOrderFormInfo/selectBusOrdersFormPageList',this.params,(res)=>{
          this.tableData = res.data.busOrdersFormVos;
          this.totalCount = res.data.totalCount
        })
      },
      operation (type,row) {
        switch (type) {
          case '上传基本材料':
            $.post(this._path + '/busOrderFormInfo/toBusOrdersForm',{bussNo:row.bussNo},(res)=>{
              if('0000' == res.resultCode){
                this.$router.push({
                  path : '/uploadTrialMaterials',
                  query:{
                    bussNo:row.bussNo
                  }
                })
              }else{
                this.requestError(res,this)
              }
            })
            break;
          case '详情':
            this.$router.push({
              path : '/uploadTrialMaterialsDetails',
              query:{
                bussNo:row.bussNo
              }
            })
            break;
        }
      },
      inquire () {
        this.initParams();
        this.request();
      },
      addOrder () {
        this.$router.push('/addOrder');
      },
      pageSizeChange (val) {
        this.numPerPage = val;
        this.inquire()
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.inquire();
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
    created () {
      // 请求页列表数据  初始化列表
      this.inquire();
      // 请求地区编码
      $.post(this._path + '/business/getAreaCode',(res)=>{
        this.citys = res.data.permissionVoList;
      })
    }
  }
</script>
