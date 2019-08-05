<template>

  <div class="public">
    <h2>初次回访</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="taskStatus" placeholder="请选择" @change="productsListFn" class="select_width"  size='small'>
            <el-option :label="'全部'" :value="''"></el-option>
            <el-option :label="'待处理'" :value="'10'"></el-option>
            <el-option :label="'进行中'" :value="'30'"></el-option>
            <el-option :label="'已完成'" :value="'90'"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>

    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>

    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="passageName" label="放款通道" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="cityName" label="城市" min-width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="creatTime" label="任务创建时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="btnClick(scope.row,'处理')" v-if="scope.row.taskStatus === '待处理' && currentUserPermissions.indexOf('business:callback:list:handle') !== -1">处理</el-button>
          <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:callback:list:query') !== -1">详情</el-button>
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
    name: "first-call-back-list",
    data(){
      return{
        bussNo:'',
        custName:'',
        taskStatus:'',
        tableData:[{}],
        page: {
          currentPage: 1,
          numPerPage: 10,
          totalCount: 1
        },
        params:{}
      }
    },
    methods:{
      btnClick(row, type) {
        let path = '';
        if('处理' === type){
          path = '/firstCallBack';
          this.$http({
            url:'/busLoanCallback/dealCallback',
            data:{
              bussNo:row.bussNo
            },
            callback:res=>{
              this.$router.push({
                path,
                query:row
              })
            }
          })
        }else{
          path = '/firstCallBackInfo';
          this.$router.push({
            path,
            query:row
          })
        }

      },
      pageSizeChange(val) {
        this.page.numPerPage = val;
        this.ajaxData();
        this.ajax();
      },
      pageCurrentChange(val) {
        this.page.currentPage = val;
        this.ajaxData();
        this.ajax();
      },
      //请求参数
      ajaxData() {
        this.params = {
          currentPage: this.page.currentPage,
          numPerPage: this.page.numPerPage,
          bussNo: this.bussNo,
          custName: this.custName,
          taskStatus: this.taskStatus,
        }
      },
      //ajax请求
      ajax() {
        this.$http({
          url:'/busLoanCallback/busLoanCallbackPageList',
          data:this.params,
          callback:res=>{
            this.tableData = res.data.busLoanCallbackVoList;
            this.page.totalCount = res.data.totalCount;
          }
        })
      },
      //查询
      inquire() {

        this.ajaxData();
        this.ajax();
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
    created(){
      this.inquire()
    }
  }
</script>

<style scoped>

</style>
