<template>
  <div class="public completeInfo addOrder">
    <h2>审 核</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class="borrowerInfo module_margin_bottom showBorrowerInfo">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">订单编号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.bussNo}}</el-col>
        <el-col :span="3" class="borrowerInfTd">城市</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.areaName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">借款人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.custName}}	</el-col>
        <el-col :span="3" class="borrowerInfTd">身份证号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.certNo}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">性别</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.sex | sexFilter}}</el-col>
        <el-col :span="3" class="borrowerInfTd">出生日期</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.birthday}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">年龄</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.age}}</el-col>
        <el-col :span="3" class="borrowerInfTd">机构代码</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.orgCode}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">经纪人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.brokerName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">经纪人手机号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.brokerMobile}}</el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/house.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>
      <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='120' :details="false"/>

    <!-- 抵押物基本信息 -->
    <el-row class="module_margin_bottom wz_table_border doNotChange">
      <el-col class="borrowerInfTr" :span="24">
        <el-col class="borrowerInfTd" :span="3">房产证号</el-col>
        <el-col class="borrowerInfTd" :span="21">{{assessGuaInfoVo.ownershipNo}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr doNotChange" :span="24">
        <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
        <el-col class="borrowerInfTd" :span="3" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
        <el-col class="borrowerInfTd" :span="9" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/house.png" class="listTitleImg"><span>基本材料影像</span></h3>
    </div>
    <picModule dataType="2"  :bussNo="$route.query.bussNo" taskType='120' :details="false"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/house.png" class="listTitleImg"><span>审核结论</span></h3>
    </div>
    <el-row class="module_margin_bottom wz_table_border">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="4" class="borrowerInfTd">审核结论 <span class="importent">*</span></el-col>
        <el-col :span="10" class="borrowerInfTd">
          <el-radio-group v-model="faceResult">
            <el-radio disabled label="1">通过</el-radio>
            <el-radio disabled label="0">拒绝</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr" v-if="faceResult == '0'">
        <el-col :span="4" class="borrowerInfTd refuse">拒绝原因 <span class="importent">*</span></el-col>
        <el-col :span="20" class="borrowerInfTd">
          <el-col :span="24" class="borrowerInfTr">
            <el-input disabled placeholder="请填写拒绝原因(最多200字符)" :maxlength="2000" v-model="refuseDetail"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr"  v-if="faceResult == '1'">
        <el-col :span="4" class="borrowerInfTd">审核综述</el-col>
        <el-col :span="20" class="borrowerInfTd">
          <el-input disabled placeholder="请输入审核综述" :maxlength="2000" v-model="overview"></el-input>
        </el-col>
      </el-col>
    </el-row>

    <picModule dataType="3"  :bussNo="$route.query.bussNo" taskType='120' :details="false"/>
    <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="goback ">返回</el-button></el-col>
  </div>
</template>

<script>
  export default {
    name: "trial-phase",
    data(){
      return {
        bussNo:'',
        houseOwnershipDTOList:[],
        custBaseInfo:{},
        areas:[],
        assessGuaInfoVo:{},
        faceResult:'1',
        refuseDetail:'',
        overview:'',
      }
    },
    methods:{
      goback () {
        this.$router.push('/trialPhaseList')
      }
    },
    beforeCreate(){
      // 查询借款人基本信息
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
        this.custBaseInfo = res.data.custBaseInfo;
      });

      // 抵押物信息
      $.post(this._path + '/consummate/selectConsummateInfo',{bussNo:this.$route.query.bussNo },(res)=>{
        this.assessGuaInfoVo.firstPledge = res.data.firstPledge;
        this.assessGuaInfoVo = res.data.assessGuaInfoVo;
        this.ownershipNo = res.data.assessGuaInfoVo.ownershipNo
      });

      $.post(this._path + '/faceApproval/selectFaceApproval',{bussNo:this.$route.query.bussNo},(res)=>{
        if(res.resultCode == '0000'){
          this.overview = res.data.faceApprovalInfoVo.overview;
          this.faceResult = res.data.faceApprovalInfoVo.faceResult;
          this.refuseDetail = res.data.faceApprovalInfoVo.refuseDetail
        }else{
          this.requestError(res,this)
        }
      });
    }
  }
</script>

<style scoped>

</style>
