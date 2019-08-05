<template>
  <div class="public" >
    <h2>费用确认</h2>
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款人姓名</el-col>
          <el-col class="table_td" :span="16">{{custBaseInfo.custName}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">身份证号</el-col>
          <el-col class="table_td" :span="16">{{custBaseInfo.certNo}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">渠道简称</el-col>
          <el-col class="table_td" :span="16">{{orgName}}</el-col>
        </el-col>
      </el-col>

      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">产品类型</el-col>
          <el-col class="table_td" :span="16">{{proName}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款金额(万元)</el-col>
          <el-col class="table_td" :span="16">{{amount}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款期限(月)</el-col>
          <el-col class="table_td" :span="16">{{term}}</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">月利率(%)</el-col>
          <el-col class="table_td" :span="16">{{interestRate}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">年化保险费率(%)</el-col>
          <el-col class="table_td" :span="16">{{insuranceService}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">年化服务费率(%)</el-col>
          <el-col class="table_td" :span="16">{{serviceRate}}</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">合计费率(%)</el-col>
          <el-col class="table_td" :span="16">{{totalService}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">签约服务费(元)</el-col>
          <el-col class="table_td" :span="16">{{contractService}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="1" taskType="214" :details="false"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/pic.png" class="listTitleImg"><span>影像</span></h3>
    </div>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="1" taskType="216" :details="false"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>备注信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">备注<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10"  v-model="reRemark"  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="goback()">返 回</el-button></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "costAffirm_details",
    data () {
      return{
        reRemark:'',
        custBaseInfo:{},
        orgName:'',
        proName :'',
        amount :'',
        term :'',
        interestRate :'',
        insuranceService :'',
        serviceRate :'',
        totalService :'',
        contractService :'',
      }
    },
    methods : {
      goback () {
        this.$router.push({
          path:'/costAffirmList'
        })
      },

      queryBaseInfo () {
        $.get(this._path + '/business/businessMessage',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.busBusinessInfo;
            this.orgName = data.orgName
          }else{
            this.requestError(res,this)
          }
        })
        $.post(this._path + '/business/queryCustBaseInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.custBaseInfo;
            this.custBaseInfo = data
          }else{
            this.requestError(res,this)
          }
        })
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
        $.post(this._path + '/busCostConfirmInfo/selectCostConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            this.reRemark = res.data.busCostConfirmInfoVo.reRemark
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    created () {
      this.queryBaseInfo()
    }
  }
</script>

<style scoped>

</style>
