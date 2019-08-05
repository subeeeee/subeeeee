<template>
  <div class="contractPreparingList public">
    <h2>详情</h2>
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
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>征信</span></h3>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-if="imageBol">
        <el-tab-pane :label="cust.custName" :name="index" v-for="(cust,index) in custList">
          <picModule class="module_margin_bottom" dataType="1"  :bussNo="$route.query.bussNo" :custId="cust.id" v-if="cust.id"  taskType='160' :details="false"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>审核结论</span></h3>
    </div>
    <el-row class="module_margin_bottom wz_table_border doNotChange">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="8" class="borrowerInfTd">审核结论</el-col>
        <el-col :span="16" class="borrowerInfTd">
          <el-radio class="radio" v-model="conclusion" label="0" disabled>审核通过可继续公证</el-radio>
          <el-radio class="radio" v-model="conclusion" label="1" disabled>打回修改</el-radio>
          <el-radio class="radio" v-model="conclusion" label="2" disabled>审核未通过拒单</el-radio>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr" v-show="conclusion == '2'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">拒绝原因<i class="importent">*</i></el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled v-model="refuseReason"  placeholder="请说明拒绝原因" maxlength="200"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" v-show="conclusion == '1'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">打回原因<i class="importent">*</i></el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled v-model="returnReason"  placeholder="请说明打回原因" maxlength="200"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" v-show="conclusion == '0'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">备注</el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled v-model="remark"  placeholder="请输入备注信息" maxlength="200"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>审核打回记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="previousTime" label="上传操作时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="previousName" label="上传操作任务员" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="打回操作时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromName" label="打回操作任务员" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回原因" min-width="200"></el-table-column>
    </el-table>
    <el-row>
      <el-col :offset="11" :span="2">
        <el-button class="bottom_condition_btn" size="small" @click="btnClick">返回列表</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'contractPreparingList',
    data() {
      return {
        custList: [{custName: '张三'}],
        imageBol: true,
        tableData: [],
        conclusion:'0',
        remark:'',
        returnReason:'',
        refuseReason:'',
        returnReasonBol:false,
        refuseReasonBol:false,
      }
    },
    methods: {
      btnClick() {
        this.$router.push({
          path:'/creditCheckList'
        })
      },

    },
    beforeCreate() {
      this.$http({
        url: '/loanFinalInfo/queryBusOpinionFlow',
        data: {
          bussNo: this.$route.query.bussNo,
          fromType:'162',
        },
        callback: res => {
          this.tableData = res.data.busOpinionFlowVOList
        }
      });
      this.$http({
        url: '/custInfo/selectCustInfo',
        data: {
          bussNo: this.$route.query.bussNo
        },
        callback: res => {
          this.custList = res.data.busLoanInfoVoList
        }
      });
      this.$http({
        url: '/busPrint/selectPrintApproval',
        data: {
          bussNo: this.$route.query.bussNo
        },
        callback: res => {
          this.conclusion = res.data.busPrintApprovalInfoVO.conclusion;
          this.refuseReason = res.data.busPrintApprovalInfoVO.refuseReason;
          this.remark = res.data.busPrintApprovalInfoVO.remark;
          this.returnReason = res.data.busPrintApprovalInfoVO.returnReason
        }
      });
    }
  }
</script>
<style scoped>

</style>


