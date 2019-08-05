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
        <el-col :span="21" class="table_td">
          <el-col :span="8">
            <el-select v-model="passageNo"   placeholder="请选择" @change="passageNoFn"  size='small'>
              <el-option v-for="item in passageList" :key="item.passageCode" :label="item.passageName" :value="item.passageCode"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="trustPlanId"   placeholder="请选择信托计划" @change="trustPlanIdFn"  size='small'>
              <el-option v-for="item in cTrustPlanDTOS" :key="item.id" :label="item.trustPlanName" :value="item.id"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="passageId"   placeholder="请选择子账户"   size='small'>
              <el-option v-for="item in cTrustAccountDTOList" :key="item.id" :label="item.accountName" :value="item.id"> </el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <p v-if="passageBol" class="importent">请选择放款通道</p>
    <br/>

    <div class="show_list_title">
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
        <li class="last_btn"><el-button type="primary" @click="btnClick">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "aisle-affirm",
    data(){
      return {
        maxAppAmount:'',
        passageList:[{code:'12',name:'22'}],
        passageNo:'',
        cTrustPlanDTOS:[{code:'12',name:'22'}],
        trustPlanId:"",
        passageId:'',
        cTrustAccountDTOList:[{code:'12',name:'22'}],
        tableList:[],
        passageBol:false,
        tableData:[],
        maxLoanAmount:"",
        statisticsList:[],
      }
    },
    methods:{
      btnClick(){
        if(!this.passageNo||!this.trustPlanId||!this.passageId){
          this.$message.error('请完善信息');
          this.passageBol = true;
          return
        }else{
          this.passageBol = false
        }
        let params = {
          bussNo:this.$route.query.bussNo,
          id:this.$route.query.id,
        };
        this.passageList.forEach((item)=>{
          if(item.passageName == this.passageNo){
            params.passageCode = item.passageCode;
            params.passageName = item.passageName;
            params.leadingMan = item.leadingMan;
            params.socialCode = item.socialCode;
          }
        });
        this.cTrustPlanDTOS.forEach((item)=>{
          if(item.id == this.trustPlanId){
            params.trustPlan = item.trustPlanName;
          }
        });
        this.cTrustAccountDTOList.forEach((item)=>{
          if(item.id == this.passageId){
            params.subAccountName = item.accountName;
            params.subAccountNo = item.accountNo;
            params.subAccountId = item.id;
            params.subAccountBank = item.accountBank;
            params.isOrNot = item.isOrNot;
          }
        });
        this.$confirm("是否确认提交?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$http({
            url:'/busPassageConfirm/insertPassageConfirmSubmit',
            data:params,
            callback:res=>{
              this.$message.success('提交成功');
              this.$router.push({
                path:'/aisleAffirmList',
              })
            }
          });
        })
      },
      passageNoFn(){
        this.$http({
          url:'/busPassageConfirm/queryTrustPlanDTOS',
          data:{passageCode:this.passageNo},
          callback:res=>{
            this.trustPlanId = '';
            this.passageId = '';
            this.cTrustPlanDTOS = [];
            this.cTrustAccountDTOList = [];
            this.cTrustPlanDTOS = res.data.cTrustPlanDTOS;
          }
        });
      },
      queryMaxAppAmount(){
        this.$http({
          url:'/busPassageConfirm/getMaxAppAmount',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.maxAppAmount = res.data.maxAppAmount;
            this.queryStatisticsList()
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
      },
      trustPlanIdFn(){
        this.$http({
          url:'/busPassageConfirm/queryCTrustAccountDTO',
          data:{trustPlanId:this.trustPlanId},
          callback:res=>{
            this.passageId = '';
            this.cTrustAccountDTOList = [];
            this.cTrustAccountDTOList = res.data.cTrustAccountDTOList;
          }
        });
      }
    },
    created(){
      this.queryMaxAppAmount();
      this.$http({
        url:'/busPassageConfirm/selectProductPassage',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.passageList = res.data.productPassages
        }
      });
      this.$http({
        url:'/busPassageConfirm/queryMaxLoanAmountByBussNo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.maxLoanAmount = res.data.maxLoanAmount
        }
      });

      this.$http({
        url:'/busPassageConfirm/queryELog',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.tableData = res.data.busELogVOList
        }
      });
    }
  }
</script>

<style scoped>

</style>
