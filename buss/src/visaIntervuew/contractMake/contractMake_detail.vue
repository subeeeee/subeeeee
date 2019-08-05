<template>
    <div class="public">
      <h2>合同制作详情</h2>
      <el-row class="module_margin_bottom bussNo">
        <el-col :span="2">订单编号:</el-col>
        <el-col :span="2">{{$route.query.bussNo}}</el-col>
      </el-row>
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款人信息</span></h3>
      </div>
      <el-row class=" module_margin_bottom wz_table_border doNotChange">
        <el-col :span="24" class="borrowerInfTr" v-for="item in borrowerTable">
          <el-col :span="4" class="borrowerInfTd">借款人姓名</el-col>
          <el-col :span="4" class="borrowerInfTd">{{item.custName}}</el-col>
          <el-col :span="4" class="borrowerInfTd">身份证号</el-col>
          <el-col :span="4" class="borrowerInfTd">{{item.certNo}}</el-col>
          <el-col :span="4" class="borrowerInfTd">联系电话</el-col>
          <el-col :span="4" class="borrowerInfTd">{{item.mobile}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="4" class="borrowerInfTd">渠道简称</el-col>
          <el-col :span="4" class="borrowerInfTd">{{orgName}}</el-col>
          <el-col :span="4" class="borrowerInfTd">经纪人姓名</el-col>
          <el-col :span="4" class="borrowerInfTd">{{custBaseInfo.brokerName}}</el-col>
          <el-col :span="4" class="borrowerInfTd">经纪人手机号</el-col>
          <el-col :span="4" class="borrowerInfTd">{{custBaseInfo.brokerMobile}}</el-col>
        </el-col>
      </el-row>
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>抵押物信息</span></h3>
      </div>
      <el-row class=" module_margin_bottom wz_table_border doNotChange">
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="4" class="borrowerInfTd">抵押物坐落</el-col>
          <el-col :span="8" class="borrowerInfTd">{{assessGuaInfoVo.guaAddress + assessGuaInfoVo.guaBuilding  + assessGuaInfoVo.guaNumber}}</el-col>
          <el-col :span="4" class="borrowerInfTd">房产证号</el-col>
          <el-col :span="8" class="borrowerInfTd">{{ownershipNo}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="4" class="borrowerInfTd">抵押顺位</el-col>
          <el-col :span="4" class="borrowerInfTd">{{assessGuaInfoVo.firstPledge | firstPledgeFn}}</el-col>
        </el-col>
      </el-row>
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>风控审批结论</span></h3>
      </div>
      <el-row class="tableInfo">
        <el-col  class="table_tr">
          <el-col class="table_td">
            {{contractPreInfoVos.approvalConclusion}}&nbsp;
          </el-col>
        </el-col>
        <br>
      </el-row>
      <br>
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>合同信息</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo table_height">
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">产品名称</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.proName}}&nbsp;</el-col>
          <el-col :span="4" class="table_td">借款金额(万元)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.amount}}&nbsp;</el-col>
          <el-col :span="4" class="table_td">借款期限(月)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.term}}&nbsp;</el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">月利率(%)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.interestRate}}&nbsp;</el-col>
          <el-col :span="4" class="table_td">年化保险费率(%)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.insuranceService}}&nbsp;</el-col>
          <el-col :span="4" class="table_td">年化服务费率(%)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.serviceRate}}&nbsp;</el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">合计费率(%)</el-col>
          <el-col :span="4" class="table_td">{{contractPreInfoVos.totalService}}&nbsp;</el-col>
          <el-col :span="4" class="table_td"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="12">
          <el-button @click="goback">返回</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "contract-make_detail",
        data(){
          return {
            borrowerTable:[],
            custBaseInfo:{},
            ownershipNo:'',
            assessGuaInfoVo:{},
            contractPreInfoVos:{},
            orgName:''
          }
        },
        methods:{
          goback(){
            this.$router.push('/contractMakeList')
          }
        },
        beforeCreate(){
          $.post(this._path + '/visaInterview/selectChanelOrg',{bussNo:this.$route.query.bussNo},res=>{
            if (res.resultCode == "0000") {
              this.orgName = res.data.orgName
            }else{
              this.requestError(res,this)
            }
          })
          // 借款人信息
          $.post(this._path + '/custInfo/selectCustInfo',{bussNo:this.$route.query.bussNo},res=>{
            if (res.resultCode == "0000") {
              this.borrowerTable = res.data.busLoanInfoVoList
            }else{
              this.requestError(res,this)
            }
          })
          //经纪人姓名 经纪人手机号
          $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
            this.custBaseInfo = res.data.custBaseInfo;
          });
          // 抵押物信息
          $.post(this._path + '/consummate/selectConsummateInfo',{bussNo:this.$route.query.bussNo },(res)=>{
            this.assessGuaInfoVo.firstPledge = res.data.firstPledge;
            this.assessGuaInfoVo = res.data.assessGuaInfoVo;
            this.ownershipNo = res.data.assessGuaInfoVo.ownershipNo
          });
          //合同信息
          $.post(this._path + "/visaInterview/selectContractPreInfoByBussNo", {bussNo:this.$route.query.bussNo }, res => {
              if (res.resultCode == "0000") {
                this.contractPreInfoVos = res.data.contractPreInfoVos;
              } else {
                this.requestError(res, this);
              }
            }
          );
        },
      filters:{
        firstPledgeFn(val){
          let str = '';
          if(val == '01'){
            str = '一抵'
          }else{
            str = '二抵'
          }
          return str
        }
      }
    }
</script>

<style scoped>

</style>
