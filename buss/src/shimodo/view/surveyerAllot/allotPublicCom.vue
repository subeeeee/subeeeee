<template>
  <div>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">订单编号<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.bussNo}}</el-col>
        <el-col :span="3" class="table_td">城市<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.cityName}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押物坐落<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>预约历史</span></h3>
    </div>
    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="orderTime"  label="预约下户时间" min-width="200">
        <template scope="scope">
          {{scope.row.flowType == '预约'?scope.row.orderTime:scope.row.flowType}}
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="操作时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactName" label="联系人姓名" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactMobile" label="联系人手机号" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orderRemark" label="预约备注" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="disTime" label="分配时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="disType" label="分配方式" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskPreName" label="下户员" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="disRemark" label="分配备注" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" min-width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="btnClick(scope.row)" v-if="scope.row.breakReason">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
  export default {
    name: "allot-public-com",
    data(){
      return {
        tableData:[]
      }
    },
    methods:{
      btnClick(row){
        this.$router.push({
          path:'/breakInfo',
          query:row
        })
      }
    },
    created(){
      this.$http({
        url:'/busOrderInfo/selectOrderFlow',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.tableData = res.data.busOrderInfoVOList
        }
      })
    }
  }
</script>

<style scoped>

</style>
