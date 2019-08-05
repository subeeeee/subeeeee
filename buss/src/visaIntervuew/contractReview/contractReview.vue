<template>
  <div class="putInPoint public" >
    <h2>合同复核</h2>
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
        <el-col class="table_td" :span="18">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">产品类型</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.proName}}
        </el-col>
        <el-col :span="4" class="table_td">最高批贷金额(万元)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.maxAppAmount}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">最高批贷期限(月)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.maxAppTerm}}
        </el-col>
        <el-col :span="4" class="table_td">月利率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.interest}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.insuranceService}}
        </el-col>
        <el-col :span="4" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.serviceCharge}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">审批意见</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.approvalResult}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">审批信息</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="contractPreInfoVos.capitalOpinion" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="contractPreInfoVos.remark" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>提交历史</span></h3>
    </div>
    <el-table :data="busContractPreFlowVoList" border stripe class="module_margin_bottom">
     <el-table-column header-align="center" align="center" prop="opTime"  label="提交时间" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="amount"  label="借款金额(万元)" ></el-table-column>
     <el-table-column header-align="center" align="center" prop="term"  label="借款期限" ></el-table-column>
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>客户放款银行卡信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">户名<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select   placeholder="请选择" v-model="accName" class="select_width" disabled  size='small'>
              <el-option v-for="item in busLoanInfoVoList" :key='item.custName' :label='item.custName' :value='item.custName'></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small"  disabled v-model="account"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small" :maxlength="40" disabled v-model="accBank"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small" disabled :maxlength="11" v-model="accMobile"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='210' :details="false"/>
    <br/>
    <div class="show_list_title">
      <h3><img src="./../../assets/house.png" class="listTitleImg"><span>复核结论</span></h3>
    </div>
    <el-row class="module_margin_bottom wz_table_border doNotChange table_height">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="8" class="borrowerInfTd">复核结论</el-col>
        <el-col :span="16" class="borrowerInfTd">
          <el-radio class="radio" v-model="conclusion" label="1" >可公证</el-radio>
          <el-radio class="radio" v-model="conclusion" label="0" >拒单</el-radio>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr" v-show="conclusion == '0'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">拒绝原因<i class="importent">*</i></el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="refusalReason" placeholder="请说明拒绝原因" maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" v-show="conclusion == '1'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">备注</el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="remark" placeholder="请输入备注信息" maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>

    <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='212' :details="true"/>
    <br/>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick('save')">保存</el-button></li>
        <li class="last_btn"><el-button type="primary" @click="btnClick('submit')">提交</el-button></li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default {
    name:'putInPoint',
    data () {
      return {
        busContractPreFlowVoList:'',
        isAppointment:'1',
        amount:'',
        bond:'',
        loanAmount:'',
        term:'',
        interestRate:'',
        serviceRate:'',
        brancheInterestRate:'',
        brancheServiceRate:'',
        approveVerdicts:[],
        proCode:'',
        proArr:[],
        custName:'',
        putInHistory:[],
        mouth:this.tool.mounth,
        appointmentTime:'',
        conclusion:'',

        accName:"",
        account:"",
        accBank:"",
        accMobile:"",
        refusalReason:'',
        remark:'',
        contractPreInfoVos:{},
        busLoanInfoVoList:[]
      }
    },
    computed: {

    },
    methods: {
      btnClick (type) {
        let params = {
          bussNo:this.$route.query.bussNo,
          conclusion:this.conclusion,
          refusalReason:this.refusalReason,
          remark:this.remark,
        };
        let path = '';
        if('save' == type){
          path = '/contractReview/conReviewSave';
          let param = {
            riskBussProductInfoVosString:JSON.stringify(this.approveVerdicts),
            bussNo:this.$route.query.bussNo
          };
          $.post(this._path + '/visaInterview/checkContract',param,res=>{
            if(res.resultCode === '0000'){
              if(res.data.check === '审批结论已修改'){
                this.$alert('审批结论已修改，请关注。', '提示', {
                  confirmButtonText: '我知道了',
                }).then(() => {
                  this.$router.push('/contractReviewList');
                })
              }else{
                this.submit(path,type,params)
              }
            }
          });
        }else if('submit' == type){
          if(!this.conclusion){
            this.$message({
              type: 'success',
              message: '请选择复核结论',
              duration: 1500,
              showClose: true
            });
            return
          }
          if(this.conclusion == '0'){
            if(!this.refusalReason){
              this.$message({
                type: 'success',
                message: '拒绝原因不可为空',
                duration: 1500,
                showClose: true
              });
              return
            }
          }
          path = '/contractReview/conReviewSubmit'
          this.$confirm('是否确认提交','提示',{
            confirmButtonText: '提交',
            cancelButtonText: '取消',
          }).then(() => {
            let param = {
              riskBussProductInfoVosString:JSON.stringify(this.approveVerdicts),
              bussNo:this.$route.query.bussNo
            };
            $.post(this._path + '/visaInterview/checkContract',param,res=>{
              if(res.resultCode === '0000'){
                if(res.data.check === '审批结论已修改'){
                  this.$alert('审批结论已修改，请关注。', '提示', {
                    confirmButtonText: '我知道了',
                  }).then(() => {
                    this.$router.push('/contractReviewList');
                  })
                }else{
                  this.submit(path,type,params)
                }
              }
            })
          })
        }
      },
      submit(path,type,params){
        $.post(this._path + path,params,res=>{
          if(res.resultCode == '0000'){
            if('submit' == type){
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1500,
                showClose: true
              })
              this.$router.push({
                path:'/contractReviewList'
              })
            }else{
              this.$message({
                type: 'success',
                message: '保存成功',
                duration: 1500,
                showClose: true
              })
            }
          }else{
            this.requestError(res,this)
          }
        });
      }
    },
    beforeCreate () {
      $.post(this._path + "/custInfo/selectCustInfo",{bussNo:this.$route.query.bussNo}, res => {
        this.busLoanInfoVoList = res.data.busLoanInfoVoList;
      });

      // 大部分信息
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          let data = res.data.contractPreInfoVos;
          this.custName = data.custName;
          this.proCode = data.proCode;
          this.accName = data.accName;
          this.account = data.account;
          this.accMobile = data.accMobile;
          this.identityNo = data.accCert;
          this.accBank = data.accBank;
          // 审批结论查询
          $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.approveVerdicts = res.data.bussProductInfoVoList;
              this.approveVerdicts.forEach((item)=>{
                if(item.proCode == this.proCode){
                  this.contractPreInfoVos = item
                }
              })
            }else{
              this.requestError(res,this)
            }
          });
        }else{
          this.requestError(res,this)
        }
      });
      // 提交历史
      $.post(this._path + '/visaInterview/selectContractPreFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.busContractPreFlowVoList = res.data.busContractPreFlowVoList;
        }else{
          this.requestError(res,this)
        }
      });

      $.post(this._path + '/contractReview/oneConReviewByBussNo',{bussNo:this.$route.query.bussNo},res => {
        if (res.resultCode == '0000') {
          // this.putInHistory = res.data.busNotarOrderFlowVoList;
          let data = res.data.contractReviewVo;
          this.refusalReason = data.refusalReason;
          this.remark = data.remark;
          this.conclusion = !data.conclusion?'1':data.conclusion
        } else {
          this.requestError(res, this)
        }
      })
    }
  }
</script>


