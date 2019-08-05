<template>
  <div class="firstCheck public">
    <h2>放 款</h2>
    <el-row class="module_margin_bottom bussNo">
      <el-col :span="2">订单编号:</el-col>
      <el-col :span="2">{{$route.query.bussNo}}</el-col>
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
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">产品类型</el-col>
        <el-col :span="7" class="table_td">
          {{proName}}&emsp;
        </el-col>
        <el-col :span="5" class="table_td">放款通道</el-col>
        <el-col :span="7" class="table_td">
          {{passagewayName}}&emsp;
          {{trustPlan}}&emsp;
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
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>还款账户信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">债转公司</el-col>
        <el-col :span="5" class="table_td">公司名称</el-col>
        <el-col :span="5" class="table_td">户名</el-col>
        <el-col :span="5" class="table_td">账号</el-col>
        <el-col :span="5" class="table_td">开户行</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">{{tableData.companyAlias}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{tableData.companyName}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{tableData.accountName}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{tableData.accountNo}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{tableData.accountBank}}&emsp;</el-col>
      </el-col>
    </el-row>















    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款申请信息</span></h3>
    </div>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="1" taskType="315" :details="false"/>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款申请意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="applyOpinion" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>


    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款影像</span></h3>
    </div>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="2" taskType="315" :details="false"/>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled :rows="10" v-model="loanOpinion" placeholder="请填写放款意见。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick('save')">返 回</el-button></li>
      </ul>
    </div>

  </div>
</template>
<script>
  import './../style/firstCheck.css'
  export default {
    name:'',
    data () {
      return {
        applyOpinion:'',
        loanOpinion:'',
        reimbursementAccountList:[],
        createRefundPlanList:false,
        activeCard:'1',
        editableTabs2:[{},{}],
        borrowerTable:[],
        isAgreement:'0',
        reject:'',
        loanFirstCheckOpinion:'',
        accName:'',
        account:'',
        accBank:'',
        proName:'',
        passagewayName:'',
        subAccount:"",
        trustPlan:"",
        term:'',
        bond:'',
        amount:'',
        loanAmount:'',
        custIntRate:'',
        capitalIntRate:'',
        hqIntRate:'',
        branchIntRate:'',
        custServiceRate:'',
        capitalServiceRate:'',
        hqServiceRate:'',
        branchServiceRate:'',
        // 借款人信息
        capitalAcctName:'',
        capitalAcctOpenbank:'',
        capitalAcctNo:'',
        hqAcctName:'',
        hqAcctNo:'',
        hqAcctOpenbank:'',
        companyAcctName:'',
        companyAcctOpenbank:'',
        companyAcctNo:'',
        // 还款计划表
        grantDate:'',
        repayType:'',
        intType:'1',
        intTypeM:'',
        capitalIntY:'',
        repayDateType:'1',
        repayDay:'',
        isRepayInGrantMonth:'',
        grantRemark:'',
        principalDate:"",
        hqList:[],
        comList:[],
        hqListTitle:{},
        userBillsList:[],
        billsList:[],
        SN_Disabled:false,
        S_Disabled:false,
        proCode:'',

        accMobile:'',
        useMobile:'',
        finalEvaluation:'',
        maxAppAmount:'',
        maxAppTerm:'',
        loanMortgageRate:'',
        totalService:'',
        interestRate:'',
        serviceRate:'',

        tableData:[],
      }
    },
    methods: {
      reimbursementAccountChange(val) {
        this.reimbursementAccountList.forEach((option)=>{
          if(option.key ==  val){
            this.capitalAcctOpenbank = option.openBankName;
            this.capitalAcctNo = option.accountNo;
          }
        })
      },
      clearNum(str){
        this.capitalAcctNo = this._utils.clearNum(str)
      },
      clearSpeace(str,type){
        if(!type){
          this.capitalAcctName = this._utils.clearSpeace(str)
        } else {
          this.capitalAcctOpenbank = this._utils.clearSpeace(str)
        }
      },
      deriveList(){
        let grantDate = Date.parse(this.grantDate)?Date.parse(this.grantDate):'';
        let principalDate = Date.parse(this.principalDate)?Date.parse(this.principalDate):'';
        let params = {
          bussNo:this.$route.query.bussNo,
          proCode:this.proCode,
          proName:this.proName,
          grantDate,
          repayType:this.repayType,
          intType:this.intType,
          intTypeM:this.intTypeM,
          capitalIntY:this.capitalIntY,
          repayDateType:this.repayDateType,
          repayDay:this.repayDay,
          isRepayInGrantMonth:this.isRepayInGrantMonth ? this.isRepayInGrantMonth :'1',
          principalDate
        };

        this._download(this._path + '/loanConfirm/outExcelBills',params)
      },
      createList () {
        let grantDate = Date.parse(this.grantDate)?Date.parse(this.grantDate):'';
        let principalDate = Date.parse(this.principalDate)?Date.parse(this.principalDate):'';
        let params = {
          bussNo:this.$route.query.bussNo,
          grantDate
        };
        for(let x in params){
          if(!params[x]){
            this.$message({
              type:'error',
              message:'请填写完整信息后生成还款计划表',
              duration:1500,
              showClose:1
            });
            return
          }
        }
        $.post(this._path + '/loanConfirm/createBills',params,res=>{
          if (res.resultCode == "0000"){
            this.hqListTitle.loanAmount = res.data.createBillsResultDTO.loanAmount;
            this.hqListTitle.capitalIntY = res.data.createBillsResultDTO.capitalIntY;
            this.hqListTitle.custName = res.data.createBillsResultDTO.custName;
            this.hqListTitle.grantDate = res.data.createBillsResultDTO.grantDate;
            this.hqListTitle.term = res.data.createBillsResultDTO.term;
            this.billsList = res.data.createBillsResultDTO.billsList;

            this.createRefundPlanList = true
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick(){
        this.$router.push('/loanlist')
      },
    },
    beforeCreate () {
      $.post(this._path + '/busPassageConfirm/selectBusPassageConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.passagewayName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }else{
          this.requestError(res,this)
        }
      });

      $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
          this.tableData = res.data.busChannelConfirmInfoVo;
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
      });
      // 借款人账户信息
      $.post(this._path + '/visaInterview/selectBusNotarizationInfo',{proCode:this.$route.query.proCode,bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.accName = res.data.dealBusNotarizationVo.accName;
          this.accBank = res.data.dealBusNotarizationVo.accBank;
          this.account = res.data.dealBusNotarizationVo.account;
          // this.passagewayName = res.data.dealBusNotarizationVo.passagewayName;
          this.useMobile = res.data.dealBusNotarizationVo.useMobile;
          this.accMobile = res.data.dealBusNotarizationVo.accMobile;
        }else{
          this.requestError(res,this)
        }
      });
      // 借款信息
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
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
        }else{
          this.requestError(res,this)
        }
      });
      // 还款账户信息

          $.post(this._path + '/loanFinance/queryLoanFinanceInfo',{bussNo:this.$route.query.bussNo},res=>{
            if (res.resultCode == "0000") {
              let data = res.data.loanFinanceVo;
              this.applyOpinion = data.applyOpinion;
              this.loanOpinion = data.loanOpinion;
              this.capitalAcctName = data.companyAcctName;
              this.capitalAcctOpenbank = data.companyAcctOpenbank;
              this.capitalAcctNo = data.companyAcctNo;
            }else{
              this.requestError(res,this)
            }
          })



    },
    mounted(){
      let vm = this;
      $(".repayDayClick").click( ()=>{
        if(this.SN_Disabled){
          return
        }
        vm.repayDay = ''
      })
    },
  }
</script>
