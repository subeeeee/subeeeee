<template>
  <div class="putInPoint public" >
    <h2>合同准备详情</h2>
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
    <el-tabs v-model="approveActive" :value="0" @tab-click="tabClick" type="card">
      <el-tab-pane v-for="(item, index) in approveVerdicts" :key="index" :label="item.proName" :name="index">
      </el-tab-pane>
    </el-tabs>
    <el-row class="module_margin_bottom tableInfo" v-for="(item, index) in approveVerdicts" v-show="index == approveActive">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">产品类型<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.proName}}
        </el-col>
        <el-col :span="4" class="table_td">最高批贷金额(万元)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.maxAppAmount}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">最高批贷期限(月)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.maxAppTerm}}
        </el-col>
        <el-col :span="4" class="table_td">月利率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.interest}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">年化保险费率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.insuranceService}}
        </el-col>
        <el-col :span="4" class="table_td">年化服务费率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.serviceCharge}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">审批意见<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.approvalResult}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">审批信息<span class="importent">*</span></el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.capitalOpinion" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注<span class="importent">*</span></el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.remark" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>合同准备</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">产品类型<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="proCode" placeholder="请选择" class="select_width"  size='small' disabled>
              <el-option v-for="item in proArr" :key="item.proCode" :label="item.proName" :value="item.proCode"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款金额(万元)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <!--:placeholder="'请输入'+ minAmount + '~'+ maxAmount+'的金额'"-->
            <el-input v-model="amount" size="small" disabled :placeholder="'请输入借款金额（例如：123）'"></el-input>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">借款期限(月)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="term" disabled placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in termList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <p v-if="amountShow" style="color: red;margin-bottom: 10px">预计月最高还息：{{monthMaxInterest}}元（请保证还款代扣银行卡扣款单笔限额充足）</p>
    <div class="show_list_title">
      <h3>
        <card-limit v-if="amountShow" :bussNo="$route.query.bussNo"></card-limit>
        <img src="./../../assets/message.png" class="listTitleImg"><span>客户放款银行卡信息</span>
      </h3>
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

      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">银行简称<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" :maxlength="20"  v-model="bankName"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">支行地址<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small"  :maxlength="60" v-model="bankAdress"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule dataType="1" :bussNo="$route.query.bussNo"  taskType="210" :details="false" class="module_margin_bottom" />
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>提交历史</span></h3>
    </div>
    <el-table :data="busContractPreFlowVoList" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="opTime"  label="提交时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="amount"  label="借款金额(万元)" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="term"  label="借款期限" ></el-table-column>
    </el-table>

    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>预约历史</span></h3>
    </div>
    <el-table :data="putInHistory" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="notaryName"  label="面签员" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="appointTime"  label="预约时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactName"  label="联系人" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactMobile"  label="联系方式" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态"></el-table-column>
      <el-table-column header-align="center" align="center" prop="remark" label="备注"></el-table-column>
    </el-table>

    <el-col :offset="11" :span="2"><el-button class="bottom_condition_btn" size="small" @click="btncilck('goback')">返 回</el-button></el-col>

  </div>
</template>
<script>
  import CardLimit from "../../component/com/CardLimit";
export default {
  components: {CardLimit},
  name:'putInPoint',
  data () {
    return {
      approveActive:"0",
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

      brokerMobile:"",
      contact:"",
      makeConditionNative:"",
      timestamp:"",
      accName:"",
      account:"",
      accBank:"",
      accMobile:"",
      identityNo:"",
      bankAdress:"",
      bankName:"",
      amountShow:false,
      monthMaxInterest:"",
    }
  },
  computed: {
    totalRate() {
      return this.interestRate * 1 + this.serviceRate * 1 + this.brancheInterestRate * 1 + this.brancheServiceRate * 1;
    }
  },
  methods: {
    expecteInterest(){
      this.$http({
        url:'/visaInterview/expecteInterest',
        data:{
          bussNo:this.$route.query.bussNo,
          proCode:this.proCode,
          loanAmount:this.amount,
        },
        callback:res=>{
          this.amountShow = res.data.isShow == '1'?true:false;
          this.monthMaxInterest = res.data.interest
        }
      });
    },
    btncilck (type) {
      if('goback' == type){
        this.$router.push('/contractPreparingList')
      }
    }
  },
  beforeCreate () {
    // 大部分信息
    $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode == '0000'){
        let data = res.data.contractPreInfoVos;
        this.custName = data.custName;
        this.proCode = data.proCode;
        this.amount = data.amount;
        this.bond = data.bond;
        this.loanAmount = data.loanAmount;
        this.term = data.term;
        this.interestRate = data.interestRate;
        this.serviceRate = data.serviceRate;
        this.brancheInterestRate = data.brancheInterestRate;
        this.brancheServiceRate = data.brancheServiceRate;
        this.accName = data.accName;
        this.account = data.account;
        this.accMobile = data.accMobile;
        this.identityNo = data.accCert;
        this.accBank = data.accBank;
        this.bankAdress = data.bankAdress;
        this.bankName = data.bankName;
        this.expecteInterest()
      }else{
        this.requestError(res,this)
      }
    })
    // 提交历史
    $.post(this._path + '/visaInterview/selectContractPreFlowList',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode == '0000'){
        this.busContractPreFlowVoList = res.data.busContractPreFlowVoList;
      }else{
        this.requestError(res,this)
      }
    });
    // 审批结论查询
    $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode == '0000'){
        this.approveVerdicts = res.data.bussProductInfoVoList;
				}else{
					this.requestError(res,this)
				}
    });
    // 查询历史信息
    $.post(this._path + '/notaryDistribution/queryNotaryDistributionFlowList',{bussNo:this.$route.query.bussNo},res => {
      if (res.resultCode == '0000') {
        this.putInHistory = res.data.notaryAppointFlowVOList;
      } else {
        this.requestError(res, this)
      }
    })
  }
}
</script>


