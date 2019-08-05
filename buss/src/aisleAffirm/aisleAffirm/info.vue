<template>
  <div class="public">
    <h2>通道确认</h2>
    <el-row class="module_margin_bottom bussNo">
      <el-col :span="2">订单编号:</el-col>
      <el-col :span="3">{{$route.query.bussNo}}</el-col>
      <el-col :span="3" :offset="1">借款人姓名:</el-col>
      <el-col :span="2">{{$route.query.custName}}</el-col>
      <el-col :span="2" :offset="1">渠道简称:</el-col>
      <el-col :span="2">{{$route.query.orgName}}</el-col>
      <el-col :span="4" :offset="1">最高批贷金额(万元):</el-col>
      <el-col :span="2">{{maxLoanAmount}}</el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>通道信息确认</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">放款通道</el-col>
        <el-col :span="21" class="table_td" style="text-align: left;text-indent: 30px">
          {{busPassageConfirmVO.passageName}} &nbsp;{{busPassageConfirmVO.trustPlan}} &nbsp; {{busPassageConfirmVO.subAccountName}}
        </el-col>
      </el-col>
    </el-row>

  <!--  <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>在途放款额度统计</span></h3>
    </div>
    <el-table :data="statisticsList" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="passageName"  label="放款通道" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="trustPlan" label="信托计划名称" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="subAccountNo" label="子账户" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="quota" label="占用额度（万元）" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" label="占用额度+本单最高批贷额（万元）" min-width="200">
        <template slot-scope="scope">{{(scope.row.quota *1) + (maxAppAmount *1)}}</template>
      </el-table-column>
    </el-table>
-->
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>通道确认历史</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="batNo"  label="申请编号" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime"  label="提交时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="passageName" label="放款通道" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="account" label="债转公司/还款账户" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="审批结果" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="dealDesc" label="审批描述" min-width="200"></el-table-column>
    </el-table>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn">
          <el-button type="primary" @click="gobackRisk" v-if="$route.query.backRisk == '1'">打回风控终审</el-button>
          <el-button type="primary" @click="goback" v-if="$route.query.backRisk == '0'">返回</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "info",
    data(){
      return {
        passageList:[{code:'12',name:'22'}],
        passageName:'',
        trustListtrustList:[{code:'12',name:'22'}],
        trustCode:"",
        accountNo:'',
        accountNoList:[{code:'12',name:'22'}],
        tableList:[],
        busPassageConfirmVO:{},
        tableData:[],
        maxLoanAmount:"",
        statisticsList:[],
      }
    },
    methods:{
      goback(){
        this.$router.push({
          path:'/aisleAffirmList',
        })
      },
      gobackRisk(){
        this.$confirm('请确认是否打回？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url:'/busPassageConfirm/insertPassageConfirmReturn',
            data:{bussNo:this.$route.query.bussNo,id:this.$route.query.id},
            callback:res=>{
              this.$router.push({
                path:'/aisleAffirmList',
              })
            }
          })
        })
      },
      queryMaxAppAmount(){
        this.$http({
          url:'/busPassageConfirm/getMaxAppAmount',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.maxAppAmount = res.data.maxAppAmount;
          }
        });
      },
      // 途放款额度统计
      queryStatisticsList(){
        this.$http({
          url:'/busPassageConfirm/quotaStatistics',
          // data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.statisticsList = res.data.quotaStatisticsVOList
          }
        })
      }
    },
    created(){
      this.queryStatisticsList();
      this.queryMaxAppAmount();
      this.$http({
        url:'/busPassageConfirm/queryELog',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.tableData = res.data.busELogVOList
        }
      });
      this.$http({
        url:'/busPassageConfirm/queryMaxLoanAmountByBussNo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.maxLoanAmount = res.data.maxLoanAmount
        }
      });
      $.post(this._path + '/busPassageConfirm/selectBusPassageConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.busPassageConfirmVO = res.data.busPassageConfirmVO
        }else{
          this.requestError(res,this)
        }
      });
    }
  }
</script>

<style scoped>

</style>
