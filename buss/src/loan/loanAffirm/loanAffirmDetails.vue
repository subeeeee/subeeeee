<template>
  <div class="firstCheck public">
    <h2>放款确认</h2>
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
    <!--<el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="8" class="table_td">户名</el-col>
        <el-col :span="8" class="table_td">开户行信息</el-col>
        <el-col :span="8" class="table_td">账号</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="8" class="table_td">{{companyAcctName}}&nbsp;</el-col>
        <el-col :span="8" class="table_td">{{companyAcctOpenbank}}&nbsp;</el-col>
        <el-col :span="8" class="table_td">{{companyAcctNo}}&nbsp;</el-col>
      </el-col>

    </el-row>-->
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
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>还款计划表生成</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">放款日期<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="16"><el-date-picker disabled :editable="false" class="input_width_80" size="small" v-model="grantDate" type="date" placeholder="选择日期"></el-date-picker></el-col>
          <el-col :span="9"></el-col>
        </el-col>
        <el-col :span="4" class="table_td">年利率(%)</el-col>
        <el-col :span="8" class="table_td">{{capitalIntY}}&emsp;</el-col>
        <el-col :span="4" class="table_td"></el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap module_margin_bottom">
      <ul class="last_btn_box"></ul>
    </div>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款确认意见</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款申请意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="applyOpinion" placeholder="请填写备注信息。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="loanOpinion" placeholder="请填写备注信息。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">还款备注</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="grantRemark" class="textarea_disabled" disabled maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>

    </el-row>
    <picModule :bussNo="$route.query.bussNo" dataType="1" taskType="316" :details="false"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>邮件发送纪录</span></h3>
    </div>


    <el-table :data="emailHisList" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="lastEditTime"  label="提交时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="lastEditName" label="任务员姓名"  min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="receiver" label="发送邮箱"  min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="mailStatus" label="发送状态"  min-width="200"></el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="reSendEmail" v-if="$route.query.taskStatus != '待处理' && $route.query.taskStatus != '进行中'">重新发送邮件</el-button></li>
        <li class="last_btn"><el-button @click="deriveList">导出还款计划表</el-button></li>
        <li class="last_btn"><el-button @click="btnClick">返 回</el-button></li>
      </ul>
    </div>
    <!-- 还款计划表 -->
    <div class="refundPlanList"  v-if="createRefundPlanList">
      <el-tabs v-model="activeCard" type="card">
        <!--<el-tab-pane label="借款人" name="1">-->
        <el-table class="module_margin_bottom" border stripe :data="billsList" style="width: 100%">
          <el-table-column header-align="center" align="center" id="tableTitle_fontnormal" prop="billDate" :label="'借款人:'+ hqListTitle.custName">
            <!--<el-table-column :label="'放款日期:' + hqListTitle.grantDate">-->
            <el-table-column header-align="center" align="center" prop="period"  label="还款期数"></el-table-column>
            <!--</el-table-column>-->
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="billDate" :label="'借款金额(万元):' + hqListTitle.loanAmount">
            <!--<el-table-column prop="billDate" :label="'借款利率(%/月):'+ hqListTitle.interestRate">-->
            <el-table-column header-align="center" align="center" prop="billDate" label="还款日期"></el-table-column>
            <!--</el-table-column>-->
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="days" :label="'借款期限(月):'+hqListTitle.term" >
            <!--<el-table-column prop="days" :label="'服务费率(%/月):'+hqListTitle.serviceRate" >-->
            <el-table-column header-align="center" align="center" prop="interest" label="应付利息(元)"></el-table-column>
            <!--</el-table-column>-->
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="amount" :label="'年利率(%):'+hqListTitle.capitalIntY">
            <!--<el-table-column prop="amount" :label="'借款期限(月):'+hqListTitle.term">-->
            <el-table-column header-align="center" align="center" prop="capital" label="应付本金(元)"></el-table-column>
            <!--</el-table-column>-->
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="amount" :label="'放款日期:'+hqListTitle.grantDate">
            <!--<el-table-column prop="amount" :label="'借款期限(月):'+hqListTitle.term">-->
            <el-table-column header-align="center" align="center" prop="capitalLast" label="剩余本金(元)"></el-table-column>
            <!--</el-table-column>-->
          </el-table-column>
        </el-table>

      </el-tabs>
    </div >
    <send-email :org-name="$route.query.orgName" :org-code="$route.query.orgCode" ref="sendEmailMask" @request="send"></send-email>
  </div>
</template>
<script>
  import './../style/firstCheck.css'
  import SendEmail from "../../com/sendEmail";
  export default {
    components: {SendEmail},
    name:'',
    data () {
      return {
        ccListString:'',
        emailHisList:[],
        applyOpinion:'',
        loanOpinion:'',
        createRefundPlanList:false,
        activeCard:'1',
        editableTabs2:[{},{}],
        mounth:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
        value:'',
        value1:'',
        borrowerTable:[],
        isAgreement:'0',
        reject:'',
        loanFirstCheckOpinion:'',
        accName:'',
        account:'',
        accBank:'',
        proName:'',
        passagewayName:'',
        subAccount:'',
        trustPlan:'',
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
        hqListTitle:{},
        userBillsList:[],
        innerBillss:[],
        SN_Disabled:false,
        S_Disabled:false,

        accMobile:'',
        useMobile:'',
        finalEvaluation:'',
        maxAppAmount:'',
        maxAppTerm:'',
        loanMortgageRate:'',
        totalService:'',
        interestRate:'',
        serviceRate:'',
        emailList:[
          {name:'',email:'',isChecked:false}
        ],
        tableData:[]
      }
    },
    methods: {
      reSendEmail(){
        this.$refs.sendEmailMask.showBox()
      },
      send(emailObj){
        let emailList = emailObj.emailList;
        this.$confirm('是否确认发送', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loading = this.$loading({
            lock: true,
            text: "正在发送...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          let params = {
            bussNo:this.$route.query.bussNo,
            toListString:JSON.stringify(emailList),
            ccListString:this.ccListString,
          }
          $.post(this._path + '/loanConfirm/sendLoanConfrimMal',params,res=>{
            loading.close()
            if(res.resultCode === '0000'){
              this.$message.success('发送成功');
              this.$router.push('/loanAffirmList');
            }else{
              this.requestError(res,this)
            }
          })
        })


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
          grantDate,
          repayType:this.repayType,
          intType:this.intType,
          intTypeM:this.intTypeM,
          capitalIntY:this.capitalIntY,
          repayDateType:this.repayDateType,
          repayDay:this.repayDay,
          isRepayInGrantMonth:this.isRepayInGrantMonth ? this.isRepayInGrantMonth :'1',
          principalDate,
        }
        for(let x in params){
          if(!params[x]){
            this.$message({
              type:'error',
              message:'请填写完整信息后生成还款计划表',
              duration:1500,
              showClose:1
            })
            return
          }
        }

        $.post(this._path + '/loanConfirm/createBills',params,res=>{
          if (res.resultCode == "0000"){
            this.hqListTitle.amount = res.data.createBillsResultDTO.amount;
            this.hqListTitle.branchIntTotal = res.data.createBillsResultDTO.branchIntTotal;
            this.hqListTitle.capitalIntTotal = res.data.createBillsResultDTO.capitalIntTotal;
            this.hqListTitle.custName = res.data.createBillsResultDTO.custName;
            this.hqListTitle.depositAmout = res.data.createBillsResultDTO.depositAmout;
            this.hqListTitle.depositIntTotal = res.data.createBillsResultDTO.depositIntTotal;
            this.hqListTitle.grantAmount = res.data.createBillsResultDTO.grantAmount;
            this.hqListTitle.grantDate = res.data.createBillsResultDTO.grantDate;
            this.hqListTitle.hqintTotal = res.data.createBillsResultDTO.hqintTotal;
            this.hqListTitle.interestRate = res.data.createBillsResultDTO.interestRate;
            this.hqListTitle.serviceRate = res.data.createBillsResultDTO.serviceRate;
            this.hqListTitle.term = res.data.createBillsResultDTO.term;

            this.userBillsList = res.data.createBillsResultDTO.userBillsList;
            this.innerBillss = res.data.createBillsResultDTO.innerBillsList;

            this.createRefundPlanList = true
          }else{
            this.requestError(res,this)
          }
        })
      },
      btnClick (type) {
        this.$router.push('/loanAffirmList')
      }
    },
    beforeCreate () {
      this.$http({
        url:'/busPassageConfirm/selectBusPassageConfirmInfo',
        data:{
          bussNo:this.$route.query.bussNo
        },
        callback:res=>{
          this.passagewayName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }
      });
      $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
          this.tableData = res.data.busChannelConfirmInfoVo;
        }else{
          this.requestError(res,this)
        }
      })
      //查询抄送邮箱
      $.post(this._path + '/appParController/selectAppparByType',{parType:'LOAN-CONFIRM-CC'},res=>{
        if (res.resultCode == "0000"){
          let ccList = []
          res.data.appparVoList.forEach(option=>{
            ccList.push(option. parValue)
          })
          this.ccListString = JSON.stringify(ccList)
        }else{
          this.requestError(res,this)
        }
      });
      // 借款人信息
      $.post(this._path + '/custInfo/selectCustInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.borrowerTable = res.data.busLoanInfoVoList
        }else{
          this.requestError(res,this)
        }
      })
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
      })
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

      $.post(this._path + '/loanConfirm/queryLoanConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          let data = res.data.loanConfirmVo;
          this.applyOpinion = data.applyOpinion ;
          this.loanOpinion = data.loanOpinion;
          this.hqAcctName = data.hqAcctName;
          this.hqAcctOpenbank = data.hqAcctOpenbank;
          this.hqAcctNo = data.hqAcctNo;
          this.companyAcctName = data.companyAcctName;
          this.companyAcctOpenbank = data.companyAcctOpenbank;
          this.companyAcctNo = data.companyAcctNo;
          this.grantDate = data.grantDate;
          this.repayType = data.repayType;
          this.intType = data.intType;
          this.intTypeM = data.intTypeM;
          this.capitalIntY = data.capitalIntY;
          this.repayDateType = data.repayDateType;
          this.companyAcctNo = data.companyAcctNo;
          this.repayDay = data.repayDay;
          this.isRepayInGrantMonth = data.isRepayInGrantMonth;
          // this.principalDate = data.principalDate;
          this.grantRemark = data.grantRemark;
          this.proCode = data.proCode;
          if(res.data.createBillsResultDTO.billsList.length > 0){
            this.hqListTitle.loanAmount = res.data.createBillsResultDTO.loanAmount;
            this.hqListTitle.capitalIntY = res.data.createBillsResultDTO.capitalIntY;
            this.hqListTitle.custName = res.data.createBillsResultDTO.custName;
            this.hqListTitle.grantDate = res.data.createBillsResultDTO.grantDate;
            this.hqListTitle.term = res.data.createBillsResultDTO.term;
            this.billsList = res.data.createBillsResultDTO.billsList;

            this.createRefundPlanList = true
          }
        }else{
          this.requestError(res,this)
        }
      })
      //  邮件列表  渠道
      $.post(this._path + '/business/queryOrg',{orgCode:this.$route.query.orgCode},res=>{
        if (res.resultCode == "0000") {
          this.$set(this.emailList[0],'name',this.$route.query.orgName);
          this.$set(this.emailList[0],'email',res.data.rerChannelOrg.email);
          this.$set(this.emailList[0],'isChecked',false);
        }else{
          this.requestError(res,this)
        }
      })
      //  邮件列表  借款人
      $.post(this._path + '/custInfo/selectCustInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          res.data.busLoanInfoVoList.forEach((option,index)=>{
            this.emailList.push({});
            this.$set(this.emailList[index + 1],'name','');
            this.$set(this.emailList[index + 1],'email',option.email);
            this.$set(this.emailList[index + 1],'isChecked',false);
          })
        }else{
          this.requestError(res,this)
        }
      })
      //  邮件列表
      $.post(this._path + '/loanConfirm/emailFlow',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.emailHisList = res.data.emailFlowVoList;
          this.emailHisList.forEach(option =>{
            option.receiver = JSON.parse(option.receiver).join(',')
          })
        }else{
          this.requestError(res,this)
        }
      })

    },
    mounted(){
      let vm = this
      $(".repayDayClick").click( ()=>{
        if(this.SN_Disabled){
          return
        }
        vm.repayDay = ''
      })
    },
  }
</script>
<style scoped>
  .emailHint{
    font-size: 14px;
    width: 90%;
    margin:  0 auto;
    padding-top: 10px;
    line-height: 1.5;
  }
</style>
