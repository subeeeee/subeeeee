<template>
  <div class="putInPoint public">
    <h2>详情</h2>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
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
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>审批结论</span></h3>
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
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>提交历史</span></h3>
    </div>
    <el-table :data="busContractPreFlowVoList" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="opTime"  label="提交时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="amount"  label="借款金额(万元)" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="term"  label="借款期限" ></el-table-column>
    </el-table>

    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>预约历史</span></h3>
    </div>
    <el-table :data="putInHistory" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="notaryName"  label="面签员" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="appointTime"  label="预约时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactName"  label="联系人" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactMobile"  label="联系方式" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态"></el-table-column>
      <el-table-column header-align="center" align="center" prop="remark" label="备注"></el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="btncilck">返回</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "info",
    data(){
      return {
        adjustmentBol:false,
        contractPreInfoVos:{},
        busContractPreFlowVoList:[],
        putInHistory:[],
        custName:"",
        time:"",
        adjustment:"0",
        adjustmentTime:"",
        adjustmentTimeBol:false,
        taskNameBol:false,
        taskName:"",
        taskNameList:[{label:'a',value:'123'}],
        proCode:"",
        approveVerdicts:[],
      }
    },
    methods:{
      btncilck(){
       this.$router.go(-1);
      }
    },
    created(){
      //审批结论
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          let data = res.data.contractPreInfoVos;
          this.proCode = data.proCode;
          $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.approveVerdicts = res.data.bussProductInfoVoList;
              this.approveVerdicts.forEach((item)=>{
                if(item.proCode == this.proCode) this.contractPreInfoVos = item
              })
            }else{
              this.requestError(res,this)
            }
          });
        }else{
          this.requestError(res,this)
        }
      });
      //预约历史
      $.post(this._path + '/notaryDistribution/queryNotaryDistributionFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.putInHistory = res.data.notaryAppointFlowVOList;
        }else{
          this.requestError(res,this)
        }
      });
      //提交历史
      $.post(this._path + '/visaInterview/selectContractPreFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.busContractPreFlowVoList = res.data.busContractPreFlowVoList;
        }else{
          this.requestError(res,this)
        }
      });
    }
  }
</script>

<style scoped>

</style>
