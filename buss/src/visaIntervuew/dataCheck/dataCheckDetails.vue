<template>
<div class="contractPreparingList public">

    <h2>资料核查</h2>
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>基本信息</span></h3>
      </div>
      <el-row class="module_margin_buttom tableInfo">
        <el-col  class="table_tr" v-for="(item,index) in borrowMessage">
          <el-col  class="table_tr" :span="24" >
            <el-col :span="3" class="table_td">关系</el-col>
            <el-col :span="9" class="table_td">
              <p v-if="item.relType == '主借款人'">房屋所有权人：{{item.relType}}</p>
              <p v-if="item.relType != '主借款人'">{{item.relType}}：{{item.relName}}{{item.relationship}}</p>
            </el-col>
            <el-col :span="3" class="table_td">借款人姓名</el-col>
            <el-col :span="9" class="table_td">{{item.custName}}</el-col>
          </el-col>
          <el-col  class="table_tr" :span="24" >
            <el-col :span="3" class="table_td">身份证号</el-col>
            <el-col :span="9" class="table_td">{{item.certNo}}</el-col>
            <el-col :span="3" class="table_td">婚姻状况</el-col>
            <el-col :span="9" class="table_td">{{item.marStatus | marStatusFilter}}&ensp;</el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">抵押顺位</el-col>
          <el-col :span="9" class="table_td">{{busLoanInfo.bussType | bussTypeFn}}&nbsp;</el-col>
          <el-col :span="3" class="table_td">房产证号</el-col>
          <el-col :span="9" class="table_td">{{ownershipNo}}&nbsp;</el-col>
        </el-col>
        <mutual-cert ref="mutualCert" :disabled="true"></mutual-cert>
      </el-row>
      <br />
      <el-row class="module_margin_buttom tableInfo table_height">
        <el-col :span="24" class="table_tr">
          <el-col :span="2" class="table_td">产品类型</el-col>
          <el-col :span="4" class="table_td">{{tableData.proName}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">年利率(%)</el-col>
          <el-col :span="4" class="table_td">{{tableData.capitalIntY}}&nbsp;</el-col>
          <!--<el-col :span="2" class="table_td">总利息（元）</el-col>-->
          <!--<el-col :span="4" class="table_td">{{tableData.interestTotal}}&nbsp;</el-col>-->
          <el-col :span="2" class="table_td">借款金额(万元)</el-col>
          <el-col :span="4" class="table_td">{{tableData.amount}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">借款期限(月)</el-col>
          <el-col :span="4" class="table_td">{{tableData.term}}&nbsp;</el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="2" class="table_td">月利率(%)</el-col>
          <el-col :span="4" class="table_td">{{tableData.interestRate}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">年化保险费率(%)</el-col>
          <el-col :span="4" class="table_td">{{tableData.insuranceService}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">年化服务费率(%)</el-col>
          <el-col :span="4" class="table_td">{{tableData.serviceRate}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">合计费率(%)</el-col>
          <el-col :span="4" class="table_td">{{tableData.totalService}}&nbsp;</el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="2" class="table_td">渠道简称</el-col>
          <el-col :span="4" class="table_td">{{orgName}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">经纪人姓名</el-col>
          <el-col :span="4" class="table_td">{{custBaseInfo.brokerName}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">经纪人手机号</el-col>
          <el-col :span="4" class="table_td">{{custBaseInfo.brokerMobile}}&nbsp;</el-col>
          <el-col :span="2" class="table_td">债转公司</el-col>
          <el-col :span="4" class="table_td">{{accountName}}&nbsp;</el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="2" class="table_td">放款通道</el-col>
          <el-col :span="4" class="table_td">{{passageName}}&nbsp;{{trustPlan}}&emsp;{{subAccount}}</el-col>

          <el-col :span="2" class="table_td"></el-col>
        </el-col>
      </el-row>
      <br /><br />
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>风控审批结论</span></h3>
      </div>
      <el-row class="tableInfo">
        <el-row class="tableInfo module_margin_buttom">
          <el-col :span="24" class="table_tr">
            <el-col :span="24" class="table_tr textarea_module" >
              <el-col :span="24" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="capitalOpinion" class="textarea_disabled textarea_bh" disabled  maxlength="2000"></textarea></div></el-col>
            </el-col>
          </el-col>
          <el-col :span="24" class="table_tr">
            <el-col :span="24" class="table_tr textarea_module" >
              <el-col :span="3" class="table_td textarea_title">备注</el-col>
              <el-col :span="21" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="riskRemark" ></textarea></div></el-col>
            </el-col>
          </el-col>
        </el-row>
      </el-row>
      <br /><br />

  <div class="show_list_title">
    <h3><img src="./../../assets/task.png" class="listTitleImg"><span>原件核验</span><el-checkbox size="small" disabled class="dataChackSmall" v-model="original"> <span class="font_red">资料齐全且属实</span> </el-checkbox> </h3>
  </div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="借款人" name="1">
      <el-tabs v-model="activeCustName" type="card">
        <el-tab-pane :label="item.custName" :name="index" v-for="(item,index) in borrowMessage" v-if="borrowMessage.length">
          <picModule v-if="activeCustName == index" dataType="1" :bussNo="$route.query.bussNo" taskType='230' :custId="item.id" :details="false"/>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="抵押物" name="2">
      <picModule  dataType="2" :bussNo="$route.query.bussNo" taskType='230'  :details="false"/>
    </el-tab-pane>
  </el-tabs>
  <br />
  <div class="show_list_title">
    <h3><img src="./../../assets/task.png" class="listTitleImg"><span>其他资料清单</span><el-checkbox size="small" disabled class="dataChackSmall" v-model="original"> <span class="font_red">资料齐全且签署无误</span> </el-checkbox> </h3>
  </div>
  <el-table :data="materialsList" border stripe class="table">
    <el-table-column header-align="center" align="center" prop="name"  label="材料名称" min-width="200"></el-table-column>
    <el-table-column header-align="center" align="center" label="数量" min-width="200">
      <template slot-scope="scope">
        {{scope.row.num}}
      </template>
    </el-table-column>
  </el-table>
  <div class="show_list_title">
    <h3><img src="./../../assets/task.png" class="listTitleImg"><span>当前合同信息</span><el-checkbox size="small" disabled class="dataChackSmall" v-model="contractBol"> <span class="font_red">借款信息已与渠道确认</span> </el-checkbox> </h3>
  </div>
  <el-row class="module_margin_bottom tableInfo">
    <el-col :span="24" class="table_tr">
      <el-col :span="3" class="table_td">借款金额(万元)<span class="importent">*</span></el-col>
      <el-col :span="9" class="table_td">
        {{tableData.amount}}&nbsp;
      </el-col>
      <el-col :span="3" class="table_td">借款期限(月)<span class="importent">*</span></el-col>
      <el-col :span="9" class="table_td">
        {{tableData.term}}&nbsp;
      </el-col>
    </el-col>
  </el-row>
  <div class="show_list_title">
    <h3><img src="./../../assets/task.png" class="listTitleImg"><span>客户放款银行卡信息</span><el-checkbox size="small" disabled class="dataChackSmall" v-model="accBol"> <span class="font_red">放款卡信息已确认无误</span> </el-checkbox> </h3>
  </div>
  <el-row class="module_margin_bottom tableInfo">
    <el-col :span="24" class="table_tr">
      <el-col :span="4" class="table_td">户名<span class="importent">*</span></el-col>
      <el-col :span="8" class="table_td">
        {{accName}}&nbsp;
      </el-col>
      <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
      <el-col :span="8" class="table_td">
        {{account}}&nbsp;
      </el-col>
    </el-col>
    <el-col :span="24" class="table_tr">
      <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
      <el-col :span="8" class="table_td">
        {{accBank}}&nbsp;
      </el-col>
      <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
      <el-col :span="8" class="table_td">
        {{accMobile}}&nbsp;
      </el-col>
    </el-col>
  </el-row>
  <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='210' :details="false"/>
  <br/>
  <div class="last_btn_wrap">
    <ul class="last_btn_box">
      <li class="last_btn"><el-button @click="btnClick">返 回</el-button></li>
    </ul>
  </div>
</div>
</template>
<script>
import MutualCert from "../../com/mutualCert";

export default {
  components: {MutualCert},
  name:'contractPreparingList',
	data () {
		return {
      custName:'',
      proName:'',
      area:'',
      orgName:'',
      capitalOpinion:'',
      city:'',
      borrowMessage:[],
      ownershipNo:"",
      busLoanInfo:[],
      inventory:[{name:'资料清单',isChoose:false},{name:'身份证',isChoose:false},{name:'户口本',isChoose:false},{name:'房本',isChoose:false},{name:'结婚证',isChoose:false},{name:'购房合同',isChoose:false}],
      remark:'',
      tableData:{},
      commonInfo:'',
      custBaseInfo:{},
      passageName:'',
      subAccount:"",
      trustPlan:"",
      accountName:"",
      riskRemark:'',

      original:false,
      elseBol:false,
      contractBol:false,
      accBol:false,
      accName:"",
      account:"",
      accBank:"",
      accMobile:'',

      activeName:'1',
      activeCustName:'0',
      materialsList:[{name:'个人借款申请表',num:'1份'},{name:'个人信息授权书',num:'2份/人'},{name:'下户面谈笔录',num:'1份'},{name:'婚姻状况说明书',num:'1份/人'},{name:'借款用途承诺书',num:'1份/人'},
        {name:'未出租声明/承租人承诺书',num:'1份'},{name:'保证住所提供人承诺（无备用房）',num:'2份'},{name:'查勘表',num:'1份'}
      ],
		}
	},
	methods: {
		btnClick () {
      this.$router.push('/dataCheckList')
    }
  },
  mounted(){
    if(this.$route.query.taskStatus == '待核查'){
      this.original = false;
      this.elseBol = false;
      this.contractBol = false;
      this.accBol = false
    }else if(this.$route.query.taskStatus == '已完成'){
      this.original = true;
      this.elseBol = true;
      this.contractBol = true;
      this.accBol = true
    }
  },
  beforeCreate(){
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
          this.accountName = data.companyAlias
        }else{
          this.requestError(res,this)
        }
      });

      $.get(this._path + '/verification/tasks/'+ this.$route.query.bussNo,{},res=>{
        if(res.code == 'SUCCESS'){
          this.custName = res.data.verification.custName;
          this.proName = res.data.verification.proName;
          this.area = res.data.verification.area;
          this.city = res.data.verification.city;
          this.capitalOpinion = res.data.verification.capitalOpinion;
          this.orgName = res.data.verification.orgName;
          // this.passageName = res.data.verification.passageName;
          // this.accountName = res.data.verification.accountName;
          this.remark = res.data.verification.remark;
          this.inventory = !res.data.verification.material?this.inventory:JSON.parse(res.data.verification.material);
          }else{
            this.requestError(res,this)
          }
      })
      let params = {bussNo:this.$route.query.bussNo}
      $.post(this._path+ "/custInfo/selectCustInfo",params,(res)=>{
            if(res.resultCode == '0000'){
                this.borrowMessage = res.data.busLoanInfoVoList
            }else{
                this.requestError(res,this)
            }
        })
      $.post(this._path + "/guaInfo/selectGuaInfo", params, res => {
          if (res.resultCode == "0000") {
            this.ownershipNo = res.data.guaInfoVo.ownershipNo;
          } else {
            this.requestError(res, this);
          }
      });
      $.post(this._path + "/loanInfo/selectLoanInfo", params, res => {
        if (res.resultCode == "0000") {
          this.busLoanInfo = res.data.busLoanInfo;
        } else {
          this.requestError(res, this);
        }
      })
      //经纪人姓名 经纪人手机号
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
        this.custBaseInfo = res.data.custBaseInfo;
      })
      //  借款金额 到 合计费率
      $.post(this._path + "/visaInterview/selectContractPreInfoByBussNo", params, (res) => {
        if (res.resultCode == '0000') {
          this.tableData = res.data.contractPreInfoVos;
          this.riskRemark = res.data.contractPreInfoVos.remark;
          this.accName = res.data.contractPreInfoVos.accName;
          this.account = res.data.contractPreInfoVos.account;
          this.accBank = res.data.contractPreInfoVos.accBank;
          this.accMobile = res.data.contractPreInfoVos.accMobile;
        } else {
          this.requestError(res, this)
        }
      });
  },
  filters:{
    bussTypeFn(val){
					if(val){
              if(val == '01'){
              val = '一抵'
              }else if(val == '02'){
                val = '二抵'
              }else if(val == '03'){
                val = '一抵转单'
              }else{
                val = '二抵转单'
              }
              return val
					}
    },
    isMan (value) {
        if (value) {
          if (value == 1) {
            return "男"
          } else {
            return "女"
          }
        }
      },
    marStatusFilter(value){
      switch(value){
        case '10':
          value = '未婚'
          break;
        case '20':
          value = '已婚无子女'
          break;
        case '21':
          value = '已婚有子女'
          break;
        case '22':
          value = '离异'
          break
        case '30':
          value = '丧偶'
          break
      }
      return value
    }
  }
}
</script>
<style scoped>

</style>


