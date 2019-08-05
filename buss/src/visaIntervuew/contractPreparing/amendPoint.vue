<template>
  <div class="putInPoint public">
    <h2>合同准备</h2>
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
        <el-col class="table_td" :span="18">{{custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>
    <el-table :data="approveVerdicts" border stripe class="module_margin_bottom">
      <el-table-column prop="proName" label="产品类型" width="150"></el-table-column>
      <el-table-column prop="maxAppAmount" label="最高批贷金额(万元)" width="190"></el-table-column>
      <el-table-column prop="maxAppTerm" label="最高批贷期限(月)" width="150"></el-table-column>
      <el-table-column prop="interest" label="月利率(%)" width="150"></el-table-column>
      <el-table-column prop="insuranceService" label="年化保险费率(%)" width="150"></el-table-column>
      <el-table-column prop="serviceCharge" label="年化服务费率(%)" width="150"></el-table-column>
      <!--<el-table-column prop="totalService" label="合计费率(%)" width="150"></el-table-column>-->
      <el-table-column prop="approvalResult" label="审批意见" width="150"></el-table-column>
      <el-table-column prop="capitalOpinion" label="风控审批结论" min-width="300"></el-table-column>
      <el-table-column header-align="center" align="center" prop="remark" label="备注" width="300"></el-table-column>
    </el-table>

    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>提交历史</span></h3>
    </div>
    <el-table :data="busContractPreFlowVoList" border stripe class="module_margin_bottom">
      <el-table-column prop="opTime"  label="提交时间" min-width="200"></el-table-column>
      <!--<el-table-column prop="opName"  label="任务员姓名" width="150"></el-table-column>-->
      <!--<el-table-column prop="proName"  label="产品类型" width="150"></el-table-column>-->
      <el-table-column prop="amount"  label="借款金额(万元)" min-width="150"></el-table-column>
      <!--<el-table-column prop="bond"  label="保证金(万元)" width="150"></el-table-column>-->
      <!--<el-table-column prop="loanAmount"  label="客户贷款金额(万元)" width="150"></el-table-column>-->
      <el-table-column prop="term"  label="借款期限" min-width="150"></el-table-column>
      <!--<el-table-column prop="interestRate"  label="月利率(%)" width="150"></el-table-column>-->
      <!--<el-table-column prop="serviceRate"  label="月服务费率(%)" width="150"></el-table-column>-->
      <!--<el-table-column prop="brancheInterestRate"  label="分公司月利率(%)" width="150"></el-table-column>-->
      <!--<el-table-column prop="brancheServiceRate"  label="分公司月服务费率(%)" width="170"></el-table-column>-->
      <!--<el-table-column prop="totalRate"  label="综合利率(%)" width="150"></el-table-column>-->
    </el-table>


    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>合同准备</span></h3>
    </div>
    <!-- 抵押物基本信息 -->
    <!--<el-row class="module_margin_bottom tableInfo table_height">
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">产品类型<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">
                        <el-select v-model="proCode" placeholder="请选择" class="select_width" size='small' @change="chooseProType">
                            <el-option v-for="item in proArr" :key="item.proCode" :label="item.proName" :value="item.proCode"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="9"></el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">借款金额(万元)<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                        <el-col :span="14" :offset="1">
                            <el-input v-model="amount" size="small" @blur="count('借款金额')" @change="requiredFields()" :placeholder="'请输入'+ minAmount +'~' + maxAmount+'的金额'"></el-input>
                        </el-col>
                        <el-col :span="9" v-if="isShowCountError" class="importent">请按提示输入</el-col>
                </el-col>
                <el-col :span="3" class="table_td">保证金(万元)<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                        <el-col :span="14" :offset="1"><el-input v-model="bond" size="small" @blur="count('保证金')" placeholder="请输入大于等于0的数"></el-input></el-col>
                        <el-col :span="9" v-if="isShowBondError" class="importent">请按提示输入</el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">客户贷款金额(万元)</el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">{{loanAmount}}&ensp;</el-col>
                    <el-col :span="9"></el-col>
                </el-col>
                <el-col :span="3" class="table_td">借款期限(月)<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">
                        <el-select v-model="term" placeholder="请选择" class="select_width" size='small'>
                            <el-option v-for="item in mounthFn()" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="9"></el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">月利率(%)</el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">{{interestRate}}&ensp;</el-col>
                    <el-col :span="9"></el-col>
                </el-col>
                <el-col :span="3" class="table_td">月服务费率(%)</el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">{{serviceRate}}&ensp;</el-col>
                    <el-col :span="9"></el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">分公司月利率(%)<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">
                        <el-input placeholder="请输入分公司月利率" v-model="brancheInterestRate" size="small"></el-input>
                    </el-col>
                    <el-col :span="9"></el-col>
                </el-col>
                <el-col :span="3" class="table_td">分公司月服务费率(%)<span class="importent">*</span></el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">
                        <el-input placeholder="请输入分公司月服务费率" v-model="brancheServiceRate" size="small"></el-input>
                    </el-col>
                    <el-col :span="9"></el-col>
                </el-col>
            </el-col>
            <el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">综合利率(%)</el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="14" :offset="1">{{totalRate}}&ensp;</el-col>
                    <el-col :span="9"></el-col>
                </el-col>
            </el-col>
        </el-row>-->
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">产品类型<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small' @change="chooseProType">
              <el-option v-for="item in proArr" :key="item.proCode" :label="item.proName" :value="item.proCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9"></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款金额(万元)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <!--:placeholder="'请输入'+ minAmount + '~'+ maxAmount+'的金额'"-->
            <el-input v-model="amount" size="small" @blur="count('借款金额')" @change="requiredFields()" :placeholder="'请输入借款金额（例如：123）'"></el-input>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">借款期限(月)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="term" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in termList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>预约历史</span></h3>
    </div>
    <el-table :data="putInHistory" border stripe class="module_margin_bottom">
      <el-table-column prop="opName" label="任务员姓名"></el-table-column>
      <el-table-column prop="flowType" label="任务状态"></el-table-column>
      <el-table-column prop="opTime" label="预约/取消预约时间"></el-table-column>
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>预约面签</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">预约/取消预约<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-col :offset="1" :span="6" class="table_td">
            <el-radio v-model="isAppointment" label="1">预约</el-radio>
            <el-radio v-model="isAppointment" label="0">取消预约</el-radio>
          </el-col>
        </el-col>
      </el-col>
      <!--<el-col :span="24" class="table_tr" v-if="isAppointment == '1'">
        <el-col :span="3" class="table_td">预约面签时间<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td">
          <el-select v-model="appointmentTime" placeholder="请选择" class="input_width_80"  size='small'>
            <el-option v-for="(item,index) in appointmentTimeList" :key="index" :label="item.timeStr" :value="item.timestamp"></el-option>
          </el-select>
        </el-col>
      </el-col>-->
    </el-row>
    <el-col :offset="11" :span="2">
      <el-button class="bottom_condition_btn" size="small" @click="btncilck('submit')">提 交</el-button>
    </el-col>

  </div>
</template>
<script>
  export default {
    name: 'putInPoint',
    data() {
      return {
        //预约面签时间列表
        appointmentTimeList:[],
        putInHistory:[],
        isAppointment: '1',
        accMobile: '',
        amount: '',
        bond: '',
        loanAmount: '',
        term: '',
        interestRate: '',
        serviceRate: '',
        brancheInterestRate: '',
        brancheServiceRate: '',
        approveVerdicts: [],
        proCode: '',
        proArr: [],
        custName: '',
        appointmentTime: '',
        amountBol:false,
        busContractPreFlowVoList:[],
        isShowBondError:false,
        isShowCountError:false,
        maxAmount:'',
        minAmount:'',
        cityCode:'',
        termList:[],
      }
    },
    computed: {
      totalRate() {
        if(!/^\d{0,}\.?\d{0,}$/.test(this.brancheInterestRate)||!/^\d{0,}\.?\d{0,}$/.test(this.brancheServiceRate)){
          return ''
        }
        let b = this.interestRate * 1 + this.serviceRate * 1 + this.brancheInterestRate * 1 + this.brancheServiceRate * 1
        b = b.toFixed(3);
        return b==='NaN'?0:b;
      }
    },
    methods: {
      //算产品期限
      mounthFn () {
        let obj = {};
        for(let i = 0;i < this.proArr.length;i++) {
          if(this.proCode == this.proArr[i].proCode){
            obj =  this.proArr[i]
          }
        }
        let arr = [];
        arr = this.tool.getTerms(obj.minTerm,obj.maxTerm,obj.termRule)
        return arr
      },
      chooseProType () {
        for(let o = 0;o<this.proArr.length;o++){
          if(this.proCode == this.proArr[o].proCode){
            this.termList = this.proArr[o].termList
          }
        }
        if(!this.amountBol){
          this.amountBol = true
          return
        }
        this.amount = '';
        this.bond = '';
        this.brancheInterestRate = '';
        this.brancheServiceRate = '';
        for(let i = 0 ,j = this.approveVerdicts.length; i < j; i++){
          if(this.proCode == this.approveVerdicts[i].proCode){
            this.interestRate = this.approveVerdicts[i].interest
            this.serviceRate = this.approveVerdicts[i].serviceCharge;
            this.maxAmount =  this.approveVerdicts[i].maxAppAmount * 1;
            this.mouth = this.tool.mounth(1,this.approveVerdicts[i].maxAppTerm,1);
            this.term = this.mouth[this.mouth.length - 1]
          }
        }
        //请求系统预约面签时间
        $.post(this._path + '/visaInterview/getOrderTimeList',{cityCode:this.cityCode,bussNo:this.$route.query.bussNo,proCode:this.proCode},res=>{
          if(res.resultCode == '0000'){
            this.appointmentTimeList = res.data
          }else{
            this.requestError(res,this)
          }
        });
        this.appointmentTime = '';
      },
      count(type) {
        if(type == '借款金额'){
          if(this.amount * 1 != NaN){
            if(this.amount/1 < this.minAmount/1 || this.amount/1 > this.maxAmount/1){
              this.isShowCountError = true;
            }else{
              this.isShowCountError = false;
            }
          }
        }
        if(type == '保证金'){
          // if(!/^[0-9]+$/.test(this.bond)){
          // this.isShowBondError = true;
          // }else{
          // this.isShowBondError = false;
          // }
          if(!this.bond){
            this.isShowBondError = true;
          }else if((this.bond/1<0||!(this.bond/1))&&this.bond/1 !='0'){
            this.isShowBondError = true;
          }else{
            this.isShowBondError = false;
          }
        }
        if(!this.amount || !this.bond){
          return
        }
        if(this.isShowBondError||this.isShowBondError){
          this.loanAmount = ''
          return
        }
        this.loanAmount = this.amount - this.bond;
      },
      requiredFields () {
        if(this.amount > this.maxAmount){
          this.$message({
            type:'error',
            message:'借款金额大于最高批贷额',
            duration:1500,
            showClose:1
          })
        }
        if(!/^([1-9][0-9]*)+(.[0-9]{1,2})?$/g.test(this.amount)){
          this.amount = this.amount.substring(0,this.amount.length-2);
        }
      },
      request (url,subParams) {
        this.$confirm('请认真核对信息后提交!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let loading = this.$loading({
            lock: true,
            text: "loading...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          let riskBussProductInfoVosList = JSON.parse(JSON.stringify(this.approveVerdicts));
          for(let i = 0; i < riskBussProductInfoVosList.length; i++){
            if(riskBussProductInfoVosList[i].approvalResult === '不同意'){
              riskBussProductInfoVosList[i].capitalOpinion = '';
            }
          }
          let params = {
            bussNo:this.$route.query.bussNo,
            riskBussProductInfoVosString:JSON.stringify(riskBussProductInfoVosList)
          };
          $.post(this._path + '/visaInterview/checkContract',params,res=>{
            if(res.resultCode === '0000'){
              loading.close()
              if(res.data.check === '审批结论已修改'){
                this.$alert('审批结论已修改，请关注。', '提示', {
                  confirmButtonText: '我知道了',
                }).then(() => {
                  this.$router.push('/contractPreparingList')
                })
              }else{
                let loading = this.$loading({
                  lock: true,
                  text: "loading...",
                  spinner: "el-icon-loading",
                  background: "rgba(255, 255, 255, 0.5)"
                });
                $.post(this._path + url, subParams, res => {
                  loading.close();
                  if (res.resultCode === '0000') {
                    this.$message({
                      type: 'success',
                      message: '提交成功',
                      duration: 1500,
                      showClose: 1
                    })
                    this.$router.push('/contractPreparingList')
                  } else if(res.resultCode == '8888'){
                    this.requestError(res,this);
                    this.$router.push('/contractPreparingList')
                  }else if(res.resultCode == '1234'){
                    this.requestError(res,this);
                    this.$router.push('/contractPreparingList')
                  }else {
                    this.requestError(res, this)
                  }
                })
              }
            }
          })

        });
      },
      btncilck(type) {
        if ('submit' == type) {
          let proName = '';
          for (let i = 0, j = this.proArr.length; i < j; i++) {
            if (this.proCode == this.proArr[i].proCode) {
              proName = this.proArr[i].proName
            }
          }

          // this.count('保证金')
          if (!proName) {
            this.$message({
              type: 'warning',
              message: '请选择产品类型',
              duration: 1500,
              showClose: 1
            })
            return
          }
          if(!this.amount){
            this.$message({
              type:'error',
              message:'请输入借款金额',
              duration:1500,
              showClose:1
            })
            return false
          }
          if(this.amount * 1 && this.amount < 50){
            this.$message({
              type:'error',
              message:'借款金额不可小于50万',
              duration:1500,
              showClose:1
            })
            return false
          }
          if(!this.term){
            this.$message({
              type:'error',
              message:'请选择借款期限',
              duration:1500,
              showClose:1
            })
            return false
          }
          if(this.amount > this.maxAmount){
            this.$message({
              type:'error',
              message:'借款金额大于最高批贷额',
              duration:1500,
              showClose:1
            })
            return
          }
          let appointmentOrCancel = '';
          if (this.isAppointment == '1') {
            appointmentOrCancel = 'appointment';
            /*if (!this.appointmentTime) {
                            this.$message({
                                type: 'warning',
                                message: '请选择预约面签时间',
                                duration: 1500,
                                showClose: 1
                            });
                            return
                        }*/
          } else if (this.isAppointment == '0') {
            appointmentOrCancel = 'cancel'
          }
          let subParams = {
            appointmentOrCancel,
            interviewTime:this.appointmentTime,
            proCode: this.proCode,
            proName,
            amount: this.amount,
            bond: this.bond,
            loanAmount: this.loanAmount,
            term: this.term,
            interestRate: this.interestRate,
            bankName:this.bankName,
            bankAdress:this.bankAdress,
            serviceRate: this.serviceRate,
            brancheInterestRate: this.brancheInterestRate,
            brancheServiceRate: this.brancheServiceRate,
            totalRate: this.totalRate,
            bussNo: this.$route.query.bussNo
          };
          /*if(!subParams.amount||!subParams.bond||!subParams.term||!subParams.brancheInterestRate||!subParams.brancheServiceRate){
                        this.$message({
                            type: 'warning',
                            message: '请输入必填项',
                            duration: 1500,
                            showClose: 1
                        })
                        return
                    };*/
          $.get(this._path + "/business/userChannel", {bussNo:this.$route.query.bussNo},res => {
            if (res.resultCode == "0000") {
              let path = '';
              if (res.data.busModel == '01') {
                path = '/capitalSale/capitalSaleConPreSubmit'
              } else {
                path = '/visaInterview/insertBussProductInfoByBussNo'
              }
              this.request(path,subParams)
            }
          })
        }
      },
      initProCode(proCode,proCodeList) {
        if(!proCodeList.length){
          return
        }
        if(proCode){
          this.proCode = proCode;
          for(let i = 0;i < proCodeList.length; i++){
            if(proCode === proCodeList[i].proCode){
              this.interest = proCodeList[i].interest;
              this.serviceCharge = proCodeList[i].serviceCharge;
              this.maxAmount = proCodeList[i].maxAppAmount * 1;
            }
          }
        }else{
          for(let i = 0;i < proCodeList.length; i++){
            if(proCodeList[i].approvalResult === '同意'){
              this.proCode = proCodeList[i].proCode;
              this.interest = proCodeList[i].interest;
              this.serviceCharge = proCodeList[i].serviceCharge;
              this.maxAmount = proCodeList[i].maxAppAmount * 1;
              this.term = proCodeList[i].maxAppTerm
              break
            }
          }
        }
        for(let o = 0;o<this.proArr.length;o++){
          if(this.proCode == this.proArr[o].proCode){
            this.termList = this.proArr[o].termList
          }
        }
        //请求系统预约面签时间
        $.post(this._path + '/visaInterview/getOrderTimeList',{cityCode:this.cityCode,bussNo:this.$route.query.bussNo,proCode:this.proCode},res=>{
          if(res.resultCode == '0000'){
            this.appointmentTimeList = res.data
          }else{
            this.requestError(res,this)
          }
        });
      }
    },
    beforeCreate() {
      // 大部分信息
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo', { bussNo: this.$route.query.bussNo }, res => {
        if (res.resultCode == '0000') {

          let data = res.data.contractPreInfoVos;
          this.accMobile = data.accMobile;
          if(this.$route.query.taskStatus != '已取消预约'){
            this.amount = data.amount;
            this.bond = data.bond;
            this.brancheInterestRate = data.brancheInterestRate;
            this.brancheServiceRate = data.brancheServiceRate;
            this.term = data.term;
            this.mouth = this.tool.mounth(1,this.term,1)
          }
          this.custName = data.custName;
          this.proCode = data.proCode;
          // this.initProCode(data.proCode,this.approveVerdicts);
          this.cityCode = data.areaCode
          // 拥有产品查询
          $.post(this._path + '/visaInterview/selectProductInfoByBussNo', { bussNo: this.$route.query.bussNo }, res => {
            if (res.resultCode == '0000') {
              this.proArr = res.data.bussProductInfoVosList;
              // 审批结论查询
              $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo', { bussNo: this.$route.query.bussNo }, res => {
                if (res.resultCode == '0000') {
                  for(let i = 0;i < res.data.bussProductInfoVoList.length;i++){
                    if(res.data.bussProductInfoVoList[i].approvalResult ==='不同意'){
                      res.data.bussProductInfoVoList[i].capitalOpinion =res.data.bussProductInfoVoList[i].refuseDetail
                    }
                  }
                  this.approveVerdicts = res.data.bussProductInfoVoList;
                  this.initProCode(this.proCode,res.data.bussProductInfoVoList);

                } else {
                  this.requestError(res, this)
                }
              })
            } else {
              this.requestError(res, this)
            }
          })

          this.interestRate = data.interestRate;
          this.serviceRate = data.serviceRate;
          // this.bond = data.bond;
          this.loanAmount = data.loanAmount;

          //查询最小可贷款金额
          $.post(this._path + '/configuration/getAmountByParam',{parType:'LOAN_AMOUNT' ,parCode:'MIN_LOAN',cityCode:data.areaCode},res=>{
            if(res.resultCode == '0000'){
              this.minAmount = res.data.configurationApparVo.parValue;
            }else{
              this.requestError(res,this)
            }
          })
        } else {
          this.requestError(res, this)
        }
      })


      // 查询历史信息
      $.post(this._path + '/visaInterview/queryBusNotarOrderFlowByBussNo',{bussNo:this.$route.query.bussNo},res => {
        if (res.resultCode == '0000') {

          this.putInHistory = res.data.busNotarOrderFlowVoList
        } else {
          this.requestError(res, this)
        }
      })
      // 提交历史
      $.post(this._path + '/visaInterview/selectContractPreFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.busContractPreFlowVoList = res.data.busContractPreFlowVoList;
        }else{
          this.requestError(res,this)
        }
      })
    }
  }

</script>
