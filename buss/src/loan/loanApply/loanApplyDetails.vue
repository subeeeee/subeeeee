<template>
  <div class="firstCheck public">
    <h2>放款申请</h2>
    <el-row class="module_margin_bottom bussNo">
      <el-col :span="2">订单编号:</el-col>
      <el-col :span="2">{{$route.query.bussNo}}</el-col>
      <!-- <el-col :span="3" :offset="17"><el-button size="small">查看风控终审信息</el-button> </el-col> -->
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款人信息</span></h3>
    </div>
    <el-table class="module_margin_bottom" border stripe :data="borrowerTable" style="width: 100%">
      <el-table-column header-align="center" align="center"  label="关系">
        <template slot-scope="scope">
          <p v-if="scope.row.relType == '主借款人'">房屋所有权人：{{scope.row.relType}}</p>
          <p v-if="scope.row.relType != '主借款人'">{{scope.row.relType}}：{{scope.row.relName}}{{scope.row.relationship}}</p>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名"></el-table-column>
      <el-table-column header-align="center" align="center" prop="certNo" label="身份证号" ></el-table-column>
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款人账户信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">户名</el-col>
        <el-col :span="9" class="table_td">
          {{accName}}&emsp;
        </el-col>
        <el-col :span="3" class="table_td">账号</el-col>
        <el-col :span="9" class="table_td">
          {{account}}&emsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">开户行</el-col>
        <el-col :span="9" class="table_td">
          {{accBank}}&emsp;
        </el-col>
        <el-col :span="3" class="table_td">银行预留手机号</el-col>
        <el-col :span="9" class="table_td">
          {{accMobile}}&emsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款人常用手机号</el-col>
        <el-col :span="9" class="table_td">
          {{useMobile}}&emsp;
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>抵押物信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证号</el-col>
        <el-col :span="21" class="table_td">
          {{ownershipNo}}
        </el-col>
      </el-col>
      <mutual-cert ref="mutualCert" :disabled="true"></mutual-cert>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押物坐落</el-col>
        <el-col :span="21" class="table_td">
          {{address}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建筑面积(m²)</el-col>
        <el-col :span="9" class="table_td">
          {{guaArea}}
        </el-col>
        <el-col :span="3" class="table_td">抵押物评估终值(万元)</el-col>
        <el-col :span="9" class="table_td">
          {{finalEvaluation}}
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">产品类型</el-col>
        <el-col :span="7" class="table_td">
          {{proName}}
        </el-col>
        <el-col :span="5" class="table_td">放款通道</el-col>
        <el-col :span="7" class="table_td">
          {{passagewayName}}&nbsp;
          {{trustPlan}}&nbsp;
          {{subAccount}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">借款金额(万元)</el-col>
        <el-col :span="7" class="table_td">
          {{amount}}
        </el-col>
        <el-col :span="5" class="table_td">借款期限(月)</el-col>
        <el-col :span="7" class="table_td">
          {{term}}
        </el-col>
      </el-col>
    </el-row>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">综合抵押率(%)</el-col>
        <el-col :span="5" class="table_td">月利率(%)</el-col>
        <el-col :span="5" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="5" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="5" class="table_td">合计费率(%)</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">{{loanMortgageRate}}</el-col>
        <el-col :span="5" class="table_td">{{interestRate}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{insuranceService}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{serviceRate}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{totalService}}&emsp;</el-col>
      </el-col>
    </el-row>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">借款合同编号</el-col>
        <el-col :span="7" class="table_td">
          {{dealBusNotarizationVo.loanNumber}}&nbsp;
        </el-col>
        <el-col :span="5" class="table_td">抵押合同编号</el-col>
        <el-col :span="7" class="table_td">
          {{dealBusNotarizationVo.mortgageNumber}}&nbsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">债转协议编号</el-col>
        <el-col :span="7" class="table_td">
          {{dealBusNotarizationVo.transferNumber}}&nbsp;
        </el-col>
        <el-col :span="5" class="table_td">借款公证书编号</el-col>
        <el-col :span="7" class="table_td">
          {{visaNumber}}&nbsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">抵押登记权证编号</el-col>
        <el-col :span="7" class="table_td">
          {{warrantNumber}}
        </el-col>
        <el-col :span="7" class="table_td">&emsp;</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>资方放款意见</span></h3>
    </div>
    <!--<el-row class="module_margin_bottom ">
      <el-col :span="4" :offset="19">
        <packageData :gridList="gridData" :custName="custName" :taskType="'314'" :packageType="'02包'" v-if="currentUserPermissions.indexOf('business:loan:final:download') != -1" :bussNo="$route.query.bussNo" ></packageData>
      </el-col>
        </el-row>-->
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">风控审批结论</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="riskReault" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">放款初审是否同意该笔放款申请<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-radio-group v-model="isFirstAgree">
            <el-radio disabled :label="'1'">是</el-radio>
            <el-radio disabled :label="'0'">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isFirstAgree === '1'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款初审意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="loanFirstCheckOpinion" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isFirstAgree === '0'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款初审拒绝原因</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="firstRefuseReason" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">放款终审意见<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-radio-group v-model="agreement">
            <el-radio disabled :label="'1'">同意放款初审意见</el-radio>
            <el-radio disabled :label="'2'">打回放款初审修改</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <<!--el-col :span="24" class="table_tr" v-show="isFinalAgree == '1'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款终审意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="loanLastCheckOpinion" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isFinalAgree == '0'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款终审拒绝原因</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="finalRefuseReason" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>-->
      <!--<el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">是否同意该笔放款申请<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-radio-group v-model="isAgreement">
            <el-radio disabled :label="'1'">是</el-radio>
            <el-radio disabled :label="'0'">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>-->
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款申请意见<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" class="textarea_disabled" disabled v-model="applyConclusion" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <!--<el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">拒绝原因<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" class="textarea_disabled" disabled  v-model="reject" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>-->
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款申请影像</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="1" taskType="314" :details="false"/>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick">返 回</el-button></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import './../style/firstCheck.css'
  import MutualCert from "../../com/mutualCert";
  export default {
    components: {MutualCert},
    name:'',
    data () {
      return {
        agreement:"1",
        visaNumber:'',
        warrantNumber:'',
        dealBusNotarizationVo:{},
        refuseFinalReason:'',
        isFinalAgree:'',
        refuseFirstReason:'',
        isFirstAgree:'',
        firstConclusion:'',
        borrowerTable:[],
        isAgreement:'0',
        riskReault:'',
        reject:'',
        loanFirstCheckOpinion:'',
        accName:'',
        accBank:'',
        account:'',
        ownershipNo:'',
        guaArea:'',
        loanAmount:'',
        proName:'',
        term:'',
        bond:'',
        amount:'',
        address:'',
        determinationValue:'',
        passagewayName:'',
        subAccount:"",
        trustPlan:"",
        commonInfo:'',
        custIntRate:'',
        capitalIntRate:'',
        hqIntRate:'',
        branchIntRate:'',
        custServiceRate:'',
        capitalServiceRate:'',
        hqServiceRate:'',
        branchServiceRate:'',
        applyConclusion:'',
        loanLastCheckOpinion:'',
        proCode:'',

        dialogTableVisible:false,
        gridData:[{
          proCode:'',
          proName:'',
          size:''
        }],
        custName:'',

        accMobile:'',
        useMobile:'',
        finalEvaluation:'',
        maxAppAmount:'',
        maxAppTerm:'',
        loanMortgageRate:'',
        totalService:'',
        interestRate:'',
        serviceRate:'',

        finalRefuseReason:'',
        firstRefuseReason:''
      }
    },
    methods: {
      btnClick () {
        this.$router.push('/loanApplyList')
      },
      queryarrivalInfo (){
        let params = { bussNo: this.$route.query.bussNo };
        $.post(this._path + "/busArrivalInfo/busArrivalInfo", params, res => {
          if (res.resultCode == "0000") {
            this.warrantNumber = res.data.arrivalInfoVo.warrantNumber;

          }
        })
      },
    },
    created () {
      this.queryarrivalInfo();
      // 放款申请
      $.post(this._path + "/busLoanApplyInfo/selectLoanApplyInfoByBusNo",{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.isFinalAgree = res.data.busLoanApplyInfoVo.isFinalAgree;
          this.isFirstAgree = res.data.busLoanApplyInfoVo.isFirstAgree;
          this.refuseFirstReason = res.data.busLoanApplyInfoVo.refuseFirstReason;
          this.refuseFinalReason = res.data.busLoanApplyInfoVo.refuseFinalReason;
          this.isAgreement = res.data.busLoanApplyInfoVo.isAgree;
          this.riskReault = res.data.busLoanApplyInfoVo.approvalConclusion;
          this.reject = res.data.busLoanApplyInfoVo.refuseReason;
          this.applyConclusion = res.data.busLoanApplyInfoVo.applyConclusion;
          this.loanFirstCheckOpinion = res.data.busLoanApplyInfoVo.firstConclusion;
          this.loanLastCheckOpinion = res.data.busLoanApplyInfoVo.finalConclusion;

          this.firstRefuseReason = res.data.busLoanApplyInfoVo.firstRefuseReason;
          this.finalRefuseReason = res.data.busLoanApplyInfoVo.finalRefuseReason;
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

      $.post(this._path + '/busPassageConfirm/selectBusPassageConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.passagewayName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }else{
          this.requestError(res,this)
        }
      });
      // 借款人账户信息
      $.post(this._path + '/visaInterview/selectBusNotarizationInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.dealBusNotarizationVo = res.data.dealBusNotarizationVo;
          this.notarizationRemake = res.data.dealBusNotarizationVo.remark;
          this.visaNumber = res.data.dealBusNotarizationVo.visaNumber;

          this.accName = res.data.dealBusNotarizationVo.accName;
          this.accBank = res.data.dealBusNotarizationVo.accBank;
          this.account = res.data.dealBusNotarizationVo.account;
          // this.passagewayName = res.data.dealBusNotarizationVo.passagewayName;

          this.useMobile = res.data.dealBusNotarizationVo.useMobile;
          this.accMobile = res.data.dealBusNotarizationVo.accMobile;

        }else{
          this.requestError(res,this)
        }
      })
      // 抵押物信息
      $.post(this._path + '/guaInfo/selectGuaInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.ownershipNo  = res.data.guaInfoVo.ownershipNo;
          this.address = res.data.guaInfoVo.guaAddress + res.data.guaInfoVo.guaBuilding + res.data.guaInfoVo.guaNumber;
          this.guaArea = res.data.guaInfoVo.guaArea;
          this.determinationValue = res.data.guaInfoVo.determinationValue;

        }else{
          this.requestError(res,this)
        }
      })
      // 借款信息
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.proCode = res.data.contractPreInfoVos.proCode
          this.proName = res.data.contractPreInfoVos.proName;
          this.term = res.data.contractPreInfoVos.term;
          this.bond = res.data.contractPreInfoVos.bond;
          this.amount = res.data.contractPreInfoVos.amount;
          this.loanAmount = res.data.contractPreInfoVos.loanAmount;

          this.maxAppAmount = res.data.contractPreInfoVos.maxAppAmount;
          this.maxAppTerm = res.data.contractPreInfoVos.maxAppTerm;
          this.totalService = res.data.contractPreInfoVos.totalService;
          this.loanMortgageRate = res.data.contractPreInfoVos.loanMortgageRate;
          this.insuranceService = res.data.contractPreInfoVos.insuranceService;
          this.interestRate = res.data.contractPreInfoVos.interestRate;
          this.serviceRate = res.data.contractPreInfoVos.serviceRate;
          this.finalEvaluation = res.data.contractPreInfoVos.finalEvaluation;



          //资料包
          this.$set(this.gridData[0],'proName',this.proName);
          this.$set(this.gridData[0],'proCode',this.proCode);
          this.custName = res.data.contractPreInfoVos.custName
        }else{
          this.requestError(res,this)
        }
      })
      /*$.post(this._path + '/loanConfirm/queryRatePart',{bussNo:this.$route.query.bussNo},res=>{
              if (res.resultCode == "0000") {
                  let data = res.data.ratePartVo
                  this.custIntRate = data.custIntRate;
                  this.capitalIntRate = data.capitalIntRate;
                  this.hqIntRate = data.hqIntRate;
                  this.branchIntRate = data.branchIntRate;
                  this.custServiceRate = data.custServiceRate;
                  this.capitalServiceRate = data.capitalServiceRate;
                  this.hqServiceRate = data.hqServiceRate;
                  this.branchServiceRate = data.branchServiceRate;
              }else{
                  this.requestError(res,this)
              }
          })*/
      // 共有情况
      $.post(this._path + '/guaInfo/selectHouseOwenByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          let owener = '',scale = '';

          let arr = res.data.houseOwershipVoList;
          for(let i = 0,j = arr.length;i < j;i++){
            if(i == j - 1){
              owener = owener + arr[i].owenName;
              scale = scale + arr[i].scale;
            }else{
              owener = owener + arr[i].owenName + ':';
              scale = scale + arr[i].scale + ':';
            }
          }
          this.commonInfo = owener + ',' + scale

        }else{
          this.requestError(res,this)
        }
      })


    },
  }
</script>
