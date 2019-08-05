<template>
  <div class="contractPreparingList public">
    <h2>面审</h2>
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
      <el-col :span="24" class="table_tr">
        <mutual-cert  ref="mutualCert" :disabled="true"></mutual-cert>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">渠道简称</el-col>
        <el-col :span="9" class="table_td">{{$route.query.orgName}}&nbsp;</el-col>
        <el-col :span="3" class="table_td">经纪人姓名</el-col>
        <el-col :span="9" class="table_td">{{custBaseInfo.brokerName}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">经纪人手机号</el-col>
        <el-col :span="9" class="table_td">{{custBaseInfo.brokerMobile}}&nbsp;</el-col>
      </el-col>
    </el-row>
    <br /><br/>
    <el-row  class="module_margin_buttom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">产品类型</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.proCode}}&nbsp;</el-col>
        <el-col :span="5" class="table_td">年利率(%)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.capitalIntY}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <!--<el-col :span="5" class="table_td">总利息(元)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.interestTotal}}&nbsp;</el-col>-->
        <el-col :span="5" class="table_td">借款金额(万元)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.amount}}&nbsp;</el-col>
        <el-col :span="5" class="table_td">月利率(%)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.interestRate}}&nbsp;</el-col>

      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">借款期限(月)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.term}}&nbsp;</el-col>
        <el-col :span="5" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.insuranceService}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.serviceRate}}&nbsp;</el-col>
        <el-col :span="5" class="table_td">合计费率(%)</el-col>
        <el-col :span="7" class="table_td">{{contractPreInfoVos.totalService}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">放款通道</el-col>
        <el-col :span="7" class="table_td">{{passageName}}&nbsp;{{trustPlan}}&nbsp;{{subAccount}}</el-col>
        <el-col :span="5" class="table_td">还款来源</el-col>
        <el-col :span="7" class="table_td">{{busLoanInfo.paymentName}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">债转公司</el-col>
        <el-col :span="7" class="table_td">{{companyAlias}}&nbsp;</el-col>
        <el-col :span="5" class="table_td">借款用途</el-col>
        <el-col :span="7" class="table_td">{{busLoanInfo.loanUseName}}&nbsp;</el-col>
      </el-col>
    </el-row>
    <br/>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>风控审批结论</span></h3>
    </div>
    <el-row class="tableInfo module_margin_buttom">
      <el-col  class="table_tr">
        <el-col :span="24" class="table_tr">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="24" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="contractPreInfoVos.approvalConclusion" class="textarea_disabled textarea_bh" disabled  maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="tableInfo module_margin_buttom">
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled :rows="3"  v-model="contractPreInfoVos.remark"  placeholder="请输入备注信息" maxlength="2000"></textarea></div></el-col>
      </el-col>
    </el-row>
    <br /><br />
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>面审影像</span></h3>
    </div>
    <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='232' :details="true"/>
    <!--图片-->
    <br />
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>备注信息</span></h3>
    </div>
    <el-row class="tableInfo module_margin_buttom">
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10"  v-model="remark"  placeholder="请输入备注信息" maxlength="2000"></textarea></div></el-col>
      </el-col>
    </el-row>
    <br /><br/>
    <el-col :offset="11" :span="2"><el-button class="bottom_condition_btn" size="small" @click="btnClick">提交</el-button></el-col>
  </div>
</template>

<script>
    import MutualCert from "../../com/mutualCert";
    export default {
      components: {MutualCert},
      name: "face-trial",
        data(){
          return {
            procode:"",
            interestTotal:"",
            amount:"",
            capitalIntY:"",
            interestRate:"",
            insuranceService:"",
            totalService:"",
            passageName:"",
            subAccount:"",
            trustPlan:"",
            payment:"",
            companyAlias:"",
            moneyUse:"",

            orgName:'',
            custBaseInfo:{},
            borrowMessage:{},
            ownershipNo:"",
            commonInfo:'',
            busLoanInfo:{},
            contractPreInfoVos:{},
            remark:""
          }
        },
        methods:{
          btnClick () {
            this.$confirm('是否确认提交', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              let params = {
                bussNo:this.$route.query.bussNo,
                remark:this.remark,
                id:this.$route.query.id,
              };
              //提交
              $.post(this._path + "/busTrialInfo/busTrialInfoSubmit", params, res => {
                if (res.resultCode == "0000") {
                 this.$message({
                   type:'success',
                   duration:1500,
                   showClose:1,
                   message:'提交成功'
                 })
                  this.$router.push('/faceTrialList')
                } else {
                  this.requestError(res, this);
                }
              });
            })
          },
        },
        beforeCreate(){
          let params = {bussNo:this.$route.query.bussNo};

          //面审信息 id
          $.post(this._path+ "/busTrialInfo/busTrialInfo",{id:this.$route.query.id},(res)=>{
            if(res.resultCode == '0000'){
              // this.borrowMessage = res.data.busLoanInfoVoList
            }else{
              this.requestError(res,this)
            }
          });


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
          //经纪人
          $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
            this.custBaseInfo = res.data.custBaseInfo;
          });
          //抵押顺位
          $.post(this._path + "/loanInfo/selectLoanInfo", params, res => {
            if (res.resultCode == "0000") {
              this.busLoanInfo = res.data.busLoanInfo;
            } else {
              this.requestError(res, this);
            }
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
          this.$http({
            url:'/busChannelConfirmInfo/selectChannelConfirmInfo',
            data:{bussNo:this.$route.query.bussNo},
            callback:res=>{
              this.companyAlias = res.data.busChannelConfirmInfoVo.companyAlias;
            }
          })
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
          marStatusFilter (val) {
            switch (val) {
              case '10':
                val = '未婚'
                break;
              case '20':
                val = '已婚无子女'
                break;
              case '21':
                val = '已婚有子女'
                break;
              case '22':
                val = '离异'
                break
              case '30':
                val = '丧偶'
                break
            }
            return val
          }
        }
    }
</script>

<style scoped>

</style>
