<template>
  <div class="public">
    <h2>预约下户</h2>
    <p class="orderNo">订单编号:{{$route.query.bussNo}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom wz_table_border doNotChange">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">城市</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.cityName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">借款人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.custName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">抵押物坐落</el-col>
        <el-col :span="9" class="borrowerInfTd">{{guaAddress}}</el-col>
        <el-col :span="3" class="borrowerInfTd">所在区域</el-col>
        <el-col :span="9" class="borrowerInfTd">{{guaProperName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">经纪人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{brokerName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">经纪人手机号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{brokerMobile}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>预约下户信息</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">预约下户时间<span class="importent">*</span></el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1">{{custBaseInfo.orderTime}}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人姓名<span class="importent">*</span></el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1">{{custBaseInfo.contactName}}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人手机号<span class="importent">*</span></el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1">{{custBaseInfo.contactMobile}}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled placeholder="可填写备注信息，此条备注下户员可见，200字以内" :rows="10" v-model="custBaseInfo.remark" maxlength="200"></textarea></div></el-col>
      </el-col>
     <!-- <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">下户员姓名</el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1">{{returnPreName}}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">下户员手机号</el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1">{{returnMobile}}</el-col>
        </el-col>
      </el-col>-->
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="submit">返回列表</el-button></li>
      </ul>
    </div>


  </div>
</template>

<script>
  export default {
    name: "appointment",
    data(){
      return {
        custBaseInfo:{},
        editableTabsValue:'123',
        editableTabs:[{time:'123'},{time:'12553'},{time:'12344'},{time:'12223'}],
        makeCondition:[{timestamp:123,time:'123123'},{timestamp:123,time:'12313323'},{timestamp:123,time:'12'}],
        makeConditionNative:'',
        timestamp:true,
        contactName:"",
        contactMobile:'',
        contactMobileBol:false,
        contactNameBol:false,
        interviewTime:'',
        interviewTimeBol:false,
        remark:'',
        isDialog:false,
        isDialog2:false,
        guaAddress:'',
        guaProperName:"",
        brokerName:"",
        brokerMobile:'',
        returnPreName:"",
        returnMobile:"",
      }
    },
    methods:{
      submit(){
        this.$router.go(-1)
      },
    },
    created(){
      this.$http({
        url:'/busOrderInfo/selectOneOrder',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.custBaseInfo = res.data.busOrderInfoVO;
        }
      });
      this.$http({
        url:'/assess/selectAssessInfo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.guaAddress = res.data.assessGuaInfoVo.guaAddress + res.data.assessGuaInfoVo.guaBuilding + res.data.assessGuaInfoVo.guaNumber;
          this.guaProperName = res.data.assessGuaInfoVo.guaProperName
        }
      });
      this.$http({
        url:'/business/queryCustBaseInfoHide',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.brokerName = res.data.custBaseInfo.brokerName;
          this.brokerMobile = res.data.custBaseInfo.brokerMobile
        }
      });
      this.$http({
        url:'/busDistributionInfo/selectOneDistributionDetail',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.returnPreName = res.data.busDistributionInfoVO.returnPreName;
          this.returnMobile = res.data.busDistributionInfoVO.returnMobile;
        }
      });


    }
  }
</script>

<style scoped>
  .noAppintment{
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size:20px ;
    color: #ccc;
  }
</style>
