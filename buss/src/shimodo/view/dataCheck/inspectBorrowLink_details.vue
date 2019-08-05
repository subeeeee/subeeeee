<template>
  <div class="borrowLink inspectBorrowLink">
    <!-- 有利于贷款审批的额外信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>有利于贷款审批的额外信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="5" taskType="138" :details="false" class="module_margin_bottom"/>
    <!--  其他强调或补充信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 其他强调或补充信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">其他强调或补充信息</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" class="textarea_disabled" disabled v-model="supplement"  placeholder="请输入内容，最多200字。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="22" :offset="1" style="padding:10px 0">
          <el-checkbox disabled v-model="promise"></el-checkbox>
        本人承诺 : 家访调查流程已按照公司规定，遵循“诚实守信，尽职尽责”原则完成，如存在协助借款人欺瞒公司，导致贷款审批决策失误造成的相关损失，本人愿意承担一切责任。
        </el-col>
		</el-row>
  </div>
</template>
<style scoped>
  .el-dialog--small {
    width: 50% !important;
  }
</style>
<script>
import './../../style/borrowLink.css'
export default {
  name:'inspectBorrowLink',
  data () {
    return{
      dialogTableVisible:false,
      gridData:[],
      dialogVisible:false,
      picTypes:[],
      chackHistoryList:[],
      tableData2:[],
      supplement:'',
      isMaterial:'',
      material:'',
      promise:false,
      productFlowVoList:[],
      checkStatus:"",
      checkReject:"",
    }
  },
  methods:{

  },
  created () {
    $.post(this._path + "/dataCheck/querySummaryInfo",{bussNo:this.$route.query.bussNo},res=>{
      this.supplement = res.data.dataCheckSummaryInfo.supplement;
      this.promise = res.data.dataCheckSummaryInfo.promise == '1' ? true :false;
      this.isMaterial = res.data.dataCheckSummaryInfo.isMaterial;
      this.material =  res.data.dataCheckSummaryInfo.material;
      this.checkStatus = res.data.dataCheckSummaryInfo.checkStatus;
      this.checkReject = res.data.dataCheckSummaryInfo.checkReject;
    });
    /*$.post(this._path + '/loanInfo/selectProductInfo',{bussNo:this.$route.query.bussNo,proCity:this.$route.query.areaCode},res=>{
      if(res.resultCode == '0000'){
        this.gridData = res.data.productInfoVoList
      }else{
        this.requestError(res,this)
      }
    })*/
  }
}
</script>
