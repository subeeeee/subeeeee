<template>
  <div class="contractPreparingList public">
    <h2>详情</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">订单编号</el-col>
        <el-col class="table_td" :span="18">{{$route.query.bussNo}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">借款人姓名</el-col>
        <el-col class="table_td" :span="18">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>征信</span></h3>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="imageBol">
        <el-tab-pane :label="cust.custName" :name="index" v-for="(cust,index) in custList">
          <picModule class="module_margin_bottom" dataType="1"  :bussNo="$route.query.bussNo" :custId="cust.id" v-if="cust.id"  taskType='160' :details="false"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>审核打回记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="previousTime" label="上传操作时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="previousName" label="上传操作任务员" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="打回操作时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromName" label="打回操作任务员" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回原因" min-width="200"></el-table-column>
    </el-table>

    <el-row>
      <el-col :offset="11" :span="2">
        <el-button class="bottom_condition_btn" size="small" @click="btnClick">返回</el-button>
      </el-col>
    </el-row>

  </div>
</template>
<script>

  export default {
    name: 'contractPreparingList',
    data() {
      return {
        custList: [],
        imageBol: true,
        tableData:[],
      }
    },
    methods: {
      btnClick() {
        this.$router.push({
          path:'/creditUploadList'
        })
      },

    },
    beforeCreate() {
      // 查询
      this.$http({
        url: '/custInfo/selectCustInfo',
        data: {
          bussNo: this.$route.query.bussNo
        },
        callback: res => {
          this.custList = res.data.busLoanInfoVoList
        }
      });
      this.$http({
        url: '/loanFinalInfo/queryBusOpinionFlow',
        data: {
          bussNo: this.$route.query.bussNo,
          fromType:'162',
        },
        callback: res => {
          this.tableData = res.data.busOpinionFlowVOList
        }
      });

    }
  }
</script>
<style scoped>

</style>


