<template>
  <div class="firstCheck public">
    <h2>放款确认</h2>
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
        <!--{{tableData.companyAlias}}&emsp;-->
        <el-col :span="4" class="table_td">
          <el-select v-model="tableData.companyAlias" placeholder="请选择" class="input_width_80" size='small' @change="deptCompanyChange">
            <el-option v-for="item in rightsNameList" :label="item.companyAlias" :value="item.companyAlias"></el-option>
          </el-select>
        </el-col>
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
          <el-col :span="16"><el-date-picker  :disabled="grantDateBol == '1'" :editable="false" class="input_width_80" size="small" v-model="grantDate" type="date" placeholder="选择日期" ></el-date-picker></el-col>
          <el-col :span="9"></el-col>
        </el-col>
        <el-col :span="4" class="table_td">年利率(%)</el-col>
        <el-col :span="8" class="table_td">{{capitalIntY}}&emsp;</el-col>
        <el-col :span="4" class="table_td"></el-col>
      </el-col>
    </el-row>

    <div class="last_btn_wrap module_margin_bottom">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="createList">生成还款计划表</el-button></li>
        <li class="last_btn" v-show="createRefundPlanList"><el-button @click="deriveList">导出还款计划表</el-button></li>
      </ul>
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
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="grantRemark" placeholder="请填写备注信息。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule :bussNo="$route.query.bussNo" dataType="1" taskType="316"/>
    <send-email :orgName="$route.query.orgName" :orgCode="$route.query.orgCode" ref="sendEmailMask" @request="emailObj=>{btnClick('submit',emailObj)}"></send-email>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick('save')">保存</el-button></li>
        <li class="last_btn"><el-button type="primary" @click="showSendEmailBox">提交并发送邮件</el-button></li>
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
        grantDateBol:'',
        ccListString:'',
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
        emailList:[
          {name:'',email:'',isChecked:false}
        ],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        tableData:{},
        rightsNameList:[]
      }
    },
    methods: {
      deptCompanyChange(val){
        this.rightsNameList.forEach((item)=>{
          if(item.companyAlias == val){
            this.tableData.companyName = item.companyName;
            this.tableData.accountName = item.accountName;
            this.tableData.accountNo = item.accountNo;
            this.tableData.accountBank = item.accountBank
          }
        })
      },
      showSendEmailBox () {
        if(!this.grantDate){
          this.$message.warning('请选择放款日期');
          return
        }
        if(!this.createRefundPlanList){
          this.$message.warning('您未生成还款计划表，请生成还款计划表后提交');
          return
        }
        this.$refs.sendEmailMask.showBox()
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
          grantDate,
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
      btnClick (type,emailObj) {
        let emailList = emailObj.emailList;
        let grantDate = Date.parse(this.grantDate)?Date.parse(this.grantDate):'';
        let principalDate = Date.parse(this.principalDate)?Date.parse(this.principalDate):'';
        let params = {
          toListString:JSON.stringify(emailList),
          ccListString:this.ccListString,
          hqAcctName:this.hqAcctName,
          hqAcctOpenbank:this.hqAcctOpenbank,
          hqAcctNo:this.hqAcctNo,
          companyAcctName:this.companyAcctName,
          companyAcctOpenbank:this.companyAcctOpenbank,
          companyAcctNo:this.companyAcctNo,
          grantDate,
          repayType:this.repayType,
          intType:this.intType,
          intTypeM:this.intTypeM,
          capitalIntY:this.capitalIntY,
          repayDateType:this.repayDateType,
          repayDay:this.repayDay,
          isRepayInGrantMonth:this.isRepayInGrantMonth?this.isRepayInGrantMonth:'1',
          principalDate,
          grantRemark:this.grantRemark,
          saveOrSubmit:type,
          bussNo:this.$route.query.bussNo,
          companyName :this.tableData.companyName,
          accountName :this.tableData.accountName,
          accountNo :this.tableData.accountNo,
          accountBank :this.tableData.accountBank,
          companyAlias:this.tableData.companyAlias
        }
        if(type == 'submit'){

          this.$confirm('提交后，客户将收到还款计划，是否确定提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let loading = this.$loading({
              lock: true,
              text: "正在加载...",
              spinner: "el-icon-loading",
              background: "rgba(255, 255, 255, 0.5)"
            });
            $.post(this._path + '/loanConfirm/LoanConfirmInfoSaveOrSubmit',params,res=>{
              loading.close();
              if (res.resultCode == "0000") {
                let msg = '';
                if(type == "submit"){
                  msg = '提交成功'
                }else{
                  msg = '保存成功'
                }
                this.$message({
                  type:'success',
                  message:msg,
                  duration:1500,
                  showClose:1
                })
                if(type == 'submit'){
                  this.$router.push('/loanAffirmList')
                }
              }else{
                this.requestError(res,this)
              }
            })
          })
        }else{
          let loading = this.$loading({
            lock: true,
            text: "正在加载...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          $.post(this._path + '/loanConfirm/LoanConfirmInfoSaveOrSubmit',params,res=>{
            loading.close();
            if (res.resultCode == "0000") {
              this.$message({
                type:'success',
                message:msg,
                duration:1500,
                showClose:1
              });
              if(type == 'submit'){
                this.$router.push('/loanAffirmList')
              }
            }else{
              this.requestError(res,this)
            }
          })
        }
      }
    },
    created () {
      $.post(this._path + '/busChannelConfirmInfo/queryComAcctInfo',{proCode:this.$route.query.proCode,bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
          this.rightsNameList = res.data;
        }else{
          this.requestError(res,this)
        }
      })
      this.$http({
        url:'/busPassageConfirm/selectTrustAccountBySubAcc',
        data:{
          bussNo:this.$route.query.bussNo
        },
        callback:res=>{
          this.grantDateBol = res.data.cTrustAccountDTO.isOrNot;
        }
      });
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


      $.post(this._path + '/loanConfirm/queryLoanConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          let data = res.data.loanConfirmVo;
          this.applyOpinion = data.applyOpinion;
          this.hqAcctName = data.hqAcctName;
          this.hqAcctOpenbank = data.hqAcctOpenbank;
          this.hqAcctNo = data.hqAcctNo;
          this.companyAcctName = data.companyAcctName;
          this.companyAcctOpenbank = data.companyAcctOpenbank;
          this.companyAcctNo = data.companyAcctNo;
          this.grantDate = data.grantDate;
          this.capitalIntY = data.capitalIntY;
          this.companyAcctNo = data.companyAcctNo;
          if(data.grantRemark){
            this.grantRemark = data.grantRemark;
          }else{
            $.post(this._path+ '/visaInterview/selectBusNotarizationInfo',{bussNo:this.$route.query.bussNo},res=>{
              if(res.resultCode === '0000'){
                this.grantRemark = `该《还款计划表》是编号${res.data.dealBusNotarizationVo.loanNumber}《借款合同》项下乙方应偿还的本息，是《借款合同》的重要组成部分。利息从该合同项下的贷款实际发放之日（即划离甲方账户之日）起，按贷款金额和期限计算，计至贷款到期日止。\r\n乙方承诺按照上述还款计划按期足额偿还；每期还款日为实际放款日后每个月的同一天；最后一期在贷款到期日还款。实际放款日与还款计划表不一致的，以实际放款日为准，还款日相应顺延，因顺延引起的还款金额与还款计划表不一致的，以实际情况做相应调整。如对应的日期在某一还款周期中无法对应或还款日是节假日，则当期还款日为对应还款日或节假日前最后一个工作日；其中第一期与最后一期的还款数额应按照实际放款日至还款计划表规定还款日确定的时间区间进行计算并执行。\r\n请您对本邮件中发送的还款通知书进行确认。若在收到还款通知书24小时内未通过邮件方式提出异议，或未电话提出异议，则我们将默认您已确认以上内容无误。`

              }else{
                this.requestError(res,this)
              }
            })
          }


          this.proCode = data.proCode;
          this.loanOpinion = data.loanOpinion;
          if(res.data.createBillsResultDTO.billsList){
            if(res.data.createBillsResultDTO.billsList.length > 0){
              this.hqListTitle.loanAmount = res.data.createBillsResultDTO.loanAmount;
              this.hqListTitle.capitalIntY = res.data.createBillsResultDTO.capitalIntY;
              this.hqListTitle.custName = res.data.createBillsResultDTO.custName;
              this.hqListTitle.grantDate = res.data.createBillsResultDTO.grantDate;
              this.hqListTitle.term = res.data.createBillsResultDTO.term;
              this.billsList = res.data.createBillsResultDTO.billsList;
              this.createRefundPlanList = true
            }
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
    }
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
