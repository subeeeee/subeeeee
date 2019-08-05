<template>
  <div class="contractPreparingList public">
    <h2>公证登记</h2>
    <p class="ele_title">订单编号 ：{{$route.query.bussNo}}</p>
    <br>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>


    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr" v-for="(item,index) in busLoanInfoVoList">
        <el-col :span="4" class="table_td">借款人姓名</el-col>
        <el-col :span="4" class="table_td">{{item.custName}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">身份证号</el-col>
        <el-col :span="4" class="table_td">{{item.certNo}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">婚姻状况</el-col>
        <el-col :span="4" class="table_td">{{item.marStatus|marStatusFun}}&nbsp;</el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">产品类型</el-col>
        <el-col :span="4" class="table_td">{{tableData.proName}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">借款金额(万元)</el-col>
        <el-col :span="4" class="table_td">{{tableData.amount}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">借款期限(月)</el-col>
        <el-col :span="4" class="table_td">{{tableData.term}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">月利率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.interestRate}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.insuranceService}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.serviceRate}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">合计费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.totalService}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">房产证号</el-col>
        <el-col :span="4" class="table_td">{{ownershipNo}}&nbsp;</el-col>
        <el-col :span="4" class="table_td">抵押顺位</el-col>
        <el-col :span="4" class="table_td">{{busLoanInfo.bussType | bussTypeFn }}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">借款用途</el-col>
        <el-col :span="20" class="table_td">{{busLoanInfo.loanUseName}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">还款来源</el-col>
        <el-col :span="20" class="table_td">{{busLoanInfo.paymentName}}&nbsp;</el-col>
      </el-col>
    </el-row>
    <div>
      <div class="show_list_title">
        <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>风控审批结论</span></h3>
      </div>
      <el-row class="tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="24" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="tableData.approvalConclusion" class="textarea_disabled textarea_bh" disabled  maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="tableData.remark" ></textarea></div></el-col>
        </el-col>
      </el-col>
      <br>
    </div>



    <el-row class="module_margin_top">
      <el-col class="module_margin_bottom" :span="3" :offset="1">公证结果:</el-col>
      <el-col :span="3">
        <el-radio v-model="notarizationResult" disabled class="radio" label="1">公证成功</el-radio>
      </el-col>
      <el-col :span="3">
        <el-radio v-model="notarizationResult" disabled class="radio" label="0">公证失败</el-radio>
      </el-col>
    </el-row>
    <div class="success" v-if="notarizationResult == '1'">
      <div class="show_list_title">
        <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>公证登记</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">放款通道<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="20" :offset="1">
              {{passageName}}&nbsp;
              {{trustPlan}}&nbsp;
              {{subAccount}}
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">债转公司<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="20" :offset="1">
              {{companyAlias}}&nbsp;
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">户名<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled :maxlength="40" @blur="isaccName" v-model="dealBusNotarizationVo.accName"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" @blur="ifaccount" disabled v-model.number="dealBusNotarizationVo.account" type="number"></el-input>
            </el-col>
            <el-col :span="9"></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled @blur="isaccBank" :maxlength="40" v-model="dealBusNotarizationVo.accBank"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled @blur="isaccMobile" v-model="dealBusNotarizationVo.accMobile"></el-input>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">借款人常用手机号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled  v-model="dealBusNotarizationVo.useMobile"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">借款合同编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace(loanNumber)" v-model="loanNumber"></el-input></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">抵押合同编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace(mortgageNumber)"  v-model="dealBusNotarizationVo.mortgageNumber"></el-input></el-col>
          </el-col>
          <el-col :span="4" class="table_td">债转协议编号</el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace(transferNumber)"  v-model="dealBusNotarizationVo.transferNumber"></el-input></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">公证受理单编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small"  disabled v-model="dealBusNotarizationVo.accePtance"></el-input></el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <picModule dataType="1" :bussNo="$route.query.bussNo"  taskType="250" :details="false" v-if="notarizationResult == '1'"/>
    <br />
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>公证书影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">借款公证书编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-input  size="small" maxlength="30" disabled v-model="visaNumber"></el-input>
        </el-col>
        <el-col :span="4" class="table_td">抵押公证书编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-input  size="small" maxlength="30" disabled v-model="pledgeNumber"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <picModule dataType="2" :bussNo="$route.query.bussNo"  :details="false" taskType="250"  v-if="notarizationResult == '1'"/>
    <br>
    <div class="err">
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr"  v-if="notarizationResult == '0'">
          <el-col :span="24" class="table_tr textarea_module">
            <el-col :span="5" class="table_td textarea_title">失败原因<span class="importent">*</span></el-col>
            <el-col :span="19" class="textareawrap">
              <div class="textarea"><textarea :rows="10" disabled v-model="dealBusNotarizationVo.fialReason" placeholder="请填写失败原因等。" maxlength="2000"></textarea></div>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="24" class="table_tr textarea_module">
            <el-col :span="5"  class="table_td textarea_title">备注</el-col>
            <el-col :span="19" class="textareawrap">
              <div class="textarea"><textarea :rows="10" disabled v-model="dealBusNotarizationVo.remark" placeholder="请输入备注信息。" maxlength="2000"></textarea></div>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10" class="inquireBtn_warp">
      <el-col :offset='10' :span='2'>
        <el-button class="inquireBtn" @click="goback">返 回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'contractPreparingList',
    data() {
      return {
        tableData: [],
        busLoanInfoVoList: [],
        notarizationResult: '1',
        ownershipNo: '',
        busLoanInfo: '',
        dealBusNotarizationVo: [],
        capitalOpinion: '',
        passageWayList:[],
        loanNumber:'',
        passageName:'',
        subAccount:"",
        trustPlan:"",
        companyAlias:'',
        visaNumber:'',
        pledgeNumber:'',
      }
    },
    methods: {

      isaccName() {
        if (!this.dealBusNotarizationVo.accName) {
          this.$message({
            type: 'warning',
            message: '户名不可为空',
            duration: 1500,
            showClose: true
          })
          return false
        } else if (/\s+/g.test(this.dealBusNotarizationVo.accName)) {
          this.$message({
            type: 'warning',
            message: '戶名不可输入空格',
            duration: 1500,
            showClose: true
          })
          return false
        }
      },

      ifaccount() {
        if (!this.dealBusNotarizationVo.account) {
          this.$message({
            type: 'warning',
            message: '账号不可为空',
            duration: 1500,
            showClose: true
          })
          return false
        } else if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(this.dealBusNotarizationVo.account)) {
          this.$message({
            type: 'warning',
            message: '账号輸入为錯誤',
            duration: 1500,
            showClose: true
          })
          return false
        }
      },

      isaccBank() {
        if (!this.dealBusNotarizationVo.accBank) {
          this.$message({
            type: 'warning',
            message: '開戶行不可为空',
            duration: 1500,
            showClose: true
          })
          return false
        } else if (/\s+/g.test(this.dealBusNotarizationVo.accBank)) {
          this.$message({
            type: 'warning',
            message: '開戶行不可输入空格',
            duration: 1500,
            showClose: true
          })
          return false
        }
      },

      isaccMobile() {
        if (!this.dealBusNotarizationVo.accMobile) {
          this.$message({
            type: 'warning',
            message: '银行预留手机号不可为空',
            duration: 1500,
            showClose: true
          })
          return false
        } else if (/\s+/g.test(this.dealBusNotarizationVo.accMobile)) {
          this.$message({
            type: 'warning',
            message: '银行预留手机号不可输入空格',
            duration: 1500,
            showClose: true
          })
          return false
        } else if (!this._utils.isMobile(this.dealBusNotarizationVo.accMobile)) {
          this.$message({
            type: 'warning',
            message: '预留手机号不正确',
            duration: 1500,
            showClose: true
          })
          return false
        }
      },





      goback() {
        this.$router.push('/notrizationRegusterList')
      }

    },
    beforeCreate() {
      this.$http({
        url:'/busPassageConfirm/selectBusPassageConfirmInfo',
        data:{
          bussNo:this.$route.query.bussNo
        },
        callback:res=>{
          this.passageName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }
      });
      $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
          let data = res.data.busChannelConfirmInfoVo;
          this.companyAlias = data.companyAlias
        }else{
          this.requestError(res,this)
        }
      })
      let params = { bussNo: this.$route.query.bussNo }
      $.post(this._path + "/visaInterview/selectContractPreInfoByBussNo", params, (res) => {
        if (res.resultCode == '0000') {
          this.tableData = res.data.contractPreInfoVos
        } else {
          this.requestError(res, this)
        }
      })

      /*$.post(this._path + "/visaInterview/selectPassageWay", {}, res => {
        if (res.resultCode == "0000") {
          this.passageWayList = res.data.passageWayVoList;
        } else {
          this.requestError(res, this);
        }
      });*/

      $.post(this._path + '/custInfo/selectCustInfo', params, (res) => {
        if (res.resultCode == '0000') {
          this.busLoanInfoVoList = res.data.busLoanInfoVoList
        } else {
          this.requestError(res, this)
        }
      })

      $.post(this._path + '/guaInfo/selectGuaInfo', params, (res) => {
        if (res.resultCode == '0000') {
          this.ownershipNo = res.data.guaInfoVo.ownershipNo
        } else {
          this.requestError(res, this)
        }
      })

      $.post(this._path + '/loanInfo/selectLoanInfo', params, (res) => {
        if (res.resultCode == '0000') {
          this.busLoanInfo = res.data.busLoanInfo
        } else {
          this.requestError(res, this)
        }
      })



      $.post(this._path + '/visaInterview/selectBusNotarizationInfo', params, (res) => {
        if (res.resultCode == '0000') {
          this.dealBusNotarizationVo = res.data.dealBusNotarizationVo

          if (!res.data.dealBusNotarizationVo.result) {
            res.data.dealBusNotarizationVo.result = '1'
          }
          this.notarizationResult = res.data.dealBusNotarizationVo.result;
          this.loanNumber = res.data.dealBusNotarizationVo.loanNumber;
          this.visaNumber  = res.data.dealBusNotarizationVo.visaNumber;
          this.pledgeNumber  = res.data.dealBusNotarizationVo.pledgeNumber;
        } else {
          this.requestError(res, this)
        }
      })

      //

      $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo', params, (res) => {
        if (res.resultCode == '0000') {
          this.capitalOpinion = res.data.bussProductInfoVoList.capitalOpinion
        } else {
          this.requestError(res, this)
        }
      })

    },
    filters: {
      marStatusFun(value) {
        if (value) {
          if (value == "10") {
            value = "未婚";
          } else if (value == "20") {
            value = "已婚无子女";
          } else if (value == "22") {
            value = "离异";
          }else if(value == '21'){
            value = "已婚有子女";
          } else {
            value = "丧偶";
          }
          return value;
        }
      },
      bussTypeFn(val) {
        if (val) {
          if (val == '01') {
            val = '一抵'
          } else if (val == '02') {
            val = '二抵'
          } else if (val == '03') {
            val = '一抵转单'
          } else {
            val = '二抵转单'
          }
          return val
        }
      }
    }
  }
</script>
<style scoped>

</style>
