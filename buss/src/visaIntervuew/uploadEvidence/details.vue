<template>
  <div class="putInPoint public" >
    <h2>上传凭证</h2>
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
        <el-col class="table_td" :span="18">{{custBaseInfo.custName}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">经纪人姓名</el-col>
        <el-col class="table_td" :span="18">{{custBaseInfo.brokerName}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">经纪人手机号</el-col>
        <el-col class="table_td" :span="18">{{custBaseInfo.brokerMobile}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>合同信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col class="table_td" :span="4">产品名称</el-col>
        <el-col class="table_td" :span="8">{{proName}}</el-col>
        <el-col class="table_td" :span="4">借款金额(万元)</el-col>
        <el-col class="table_td" :span="8">{{amount}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="4">借款期限(月)</el-col>
        <el-col class="table_td" :span="8">{{term}}</el-col>
        <el-col class="table_td" :span="4">月利率(%)</el-col>
        <el-col class="table_td" :span="8">{{interestRate}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="4">年化保险费率(%)</el-col>
        <el-col class="table_td" :span="8">{{insuranceService}}</el-col>
        <el-col class="table_td" :span="4">年化服务费率(%)</el-col>
        <el-col class="table_td" :span="8">{{serviceRate}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <!-- <el-col class="table_td" :span="4">合计费率(%)</el-col>
         <el-col class="table_td" :span="8">{{totalService}}</el-col>-->
        <el-col class="table_td" :span="4">签约服务费(元)</el-col>
        <el-col class="table_td" :span="8">{{contractService}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>影像</span></h3>
    </div>

    <picModule class="module_margin_bottom" dataType="1" :bussNo="$route.query.flowId" taskType='214' :details="false"/>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn" v-if="$route.query.type !== 'withdraw'"><el-button @click="goback" >返 回</el-button></li>
        <li class="last_btn" v-else><el-button @click="withdraw" >撤 回</el-button></li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default {
    name:'uploadEvidence_details',
    data () {
      return {
        custBaseInfo:{},
        proCode :'',
        proName :'',
        amount :'',
        term :'',
        interestRate :'',
        insuranceService :'',
        serviceRate :'',
        totalService :'',
      }
    },
    computed: {

    },
    methods: {
      goback() {
        this.$router.push({
          path:'/uploadEvidenceList'
        })
      },
      withdraw(){
        this.$confirm('请确认是否撤回？', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$http({
            url:"/uploadCertificateInfo/uploadCertificateRevocation",
            data:{
              bussNo:this.$route.query.bussNo
            },
            callback:res=>{
              this.$message.success('撤回成功');
              this.$router.push('/uploadEvidenceList')
            }
          })
        })
      },
      selectBaseInfo () {
        $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.contractPreInfoVos;
            this.proName = data.proName;
            this.term = data.term;
            this.amount = data.amount;
            this.totalService = data.totalService;
            this.insuranceService = data.insuranceService;
            this.interestRate = data.interestRate;
            this.serviceRate = data.serviceRate;
            this.contractService = data.contractService
          }else{
            this.requestError(res,this)
          }
        })
      },
      selectContractInfo () {
        $.post(this._path + '/business/queryCustBaseInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.custBaseInfo;
            this.custBaseInfo = data
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    created () {
      this.selectBaseInfo();
      this.selectContractInfo()
    }
  }
</script>


