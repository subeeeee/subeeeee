<template>
  <div class="contractPreparingList public">

    <h2>解抵押申报</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_buttom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4"  class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">

        <el-col :span="4"  :offset="1"  class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="status" placeholder="请选择" class="select_width"  size='small'>
            <el-option key='' label='全部' value=''></el-option>
            <el-option key='10' label='待处理' value='10'></el-option>
            <el-option key='90' label='已完成' value='90'></el-option>
          </el-select>
        </el-col>
      </el-col>

      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @keyup.enter.native="inquire" @click="inquire" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column prop="bussNo" min-width="150"  label="订单编号" ></el-table-column>
      <el-table-column prop="custName" min-width="150" label="借款人姓名" ></el-table-column>
      <el-table-column prop="cityName" min-width="150" label="城市" ></el-table-column>
      <el-table-column prop="orgName" min-width="150" label="渠道简称" ></el-table-column>
      <el-table-column prop="passageName" min-width="150" label="放款通道" ></el-table-column>
      <el-table-column prop="declarePerName" min-width="150" label="任务员" ></el-table-column>
      <el-table-column prop="createTime" min-width="200" label="任务创建时间" ></el-table-column>
      <el-table-column prop="declareTime" min-width="200" label="任务完成时间" ></el-table-column>
      <el-table-column prop="declareStatus" min-width="150" label="任务状态" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" v-if="currentUserPermissions.indexOf('business:declare:list:handle') != -1 && scope.row.declareStatus ==='待处理'" size="small" @click="btnClick(scope.row,'redact')" >处理</el-button>
          <el-button type="text" v-if="currentUserPermissions.indexOf('business:declare:list:query') != -1" size="small" @click="btnClick(scope.row,'info')" >详情</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>
<script>
  export default {
    name:'orderList',
    data () {
      return {
        tableData:[{}],
        clearTime:[],
        status:'',
        pagecurrentPage:1,
        pagenumPerPage:10,
        totalCount:1,
        bussNo:'',
        custName:'',

      }
    },
    methods: {
      requestQuery(){
        return {
          currentPage:this.pagecurrentPage,
          numPerPage:this.pagenumPerPage,
          bussNo:this.bussNo,
          custName:this.custName,
          declareStatus:this.status,
        }
      },
      inquire () {
        this.queryList()
      },
      pageSizeChange (val) {
        this.pagenumPerPage = val;
        this.queryList()
      },
      pageCurrentChange (val) {
        this.pagecurrentPage = val;
        this.queryList()
      },
      queryList() {
        this.$http({
          url: '/declare/declareList',
          data:this.requestQuery(),
          callback:res=>{
            this.tableData = res.data.plLedgerInfoVoList;
            this.totalCount = res.data.totalCount;

          }
        });



      },
      btnClick (row,type) {
        // this.$router.push({
        //   path:'/upData',
        //   query:row
        // })
        switch (type){
          case 'redact':
            this.$router.push({
              path:'/declare',
              query:row
            });
            break;
          case 'info':
            this.$router.push({
              path:'/declareInfo',
              query:row
            });
            break;
        }

      },

    },
    activated(){
      this.inquire();
    },
    mounted(){
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.inquire();
        }
      })
    },
    created(){
      this.queryList()
    }
  }
</script>


