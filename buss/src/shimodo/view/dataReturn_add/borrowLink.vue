<template>
  <div class="borrowLink">
    <!-- 有利于贷款审批的额外信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>有利于贷款审批的额外信息</span></h3>
    </div>
    <el-col :span="24">
    </el-col>&emsp;
    <picModule :bussNo="$route.query.bussNo" dataType="5" taskType="136" :details="false" class="module_margin_bottom"/>

    <!--  其他强调或补充信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 其他强调或补充信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">其他强调或补充信息</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" class="textarea_disabled" disabled v-model="supplement"  placeholder="请输入内容，最多200字。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr promise">
        <el-col :span="22" :offset="1">
          <el-checkbox disabled v-model="promise"></el-checkbox>
          本人承诺 : 家访调查流程已按照公司规定，遵循“诚实守信，尽职尽责”原则完成，如存在协助借款人欺瞒公司，导致贷款审批决策失误造成的相关损失，本人愿意承担一切责任。
        </el-col>
      </el-col>
    </el-row>
  <!--  <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 补充影像</span></h3>
    </div>
    <picModule dataType="6" :bussNo="$route.query.bussNo" taskType='136'  class=" module_margin_bottom addImg"/>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea :rows="4"   v-model="remark"  placeholder="请输入内容，最多500字。" maxlength="500"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 补充影像历史</span></h3>
    </div>
    <picModule dataType="7" :bussNo="$route.query.bussNo" taskType='136' :details="false" class=" module_margin_bottom addImg"/>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 核查信息记录</span></h3>
    </div>
    <el-table class="module_margin_bottom" border stripe :data="chackHistoryList" style="width: 100%">
     <el-table-column header-align="center" align="center" prop="creatName" label="核查任务员" min-width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="creatTime" label="核查操作时间" min-width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="material" label="补充材料" min-width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="上传时间" min-width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="上传任务员" min-width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="remark" label="备注" min-width="150"></el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="submit()">提 交</el-button></li>
      </ul>
    </div>-->
  </div>
</template>

<script>
  import './../../style/borrowLink.css'
  export default {
    name:'borrowLink_add',
    data () {
      return{
        picTypes:[],
        promise:false,
        supplement:'',
        chackHistoryList:[],
        remark:'',
      }
    },
    methods : {

      submit() {
        let msg = '提交成功';
        let params = {
          promise: this.promise ? "1" : "0",
          supplement: this.supplement,
          isSaveOrSubmit: 'attach',
          bussNo: this.$route.query.bussNo,
          isFullCust: this.isFullCust,
          isFullLoan: this.isFullLoan,
          isFullGua: this.isFullGua,
          isFullSurvey: "1",
          remark:this.remark
        };
        this.$confirm('是否提交到资料核查?', '提示', {
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
          $.post(this._path + "/dataReturn/insertReturnSaveOrSubmit", params, res => {
            loading.close();
            if (res.resultCode == "0000") {
              this.$message({
                type: "success",
                message: msg,
                duration: 1500,
                showClose: true
              });
              this.$router.push('/infoPassHaulList')
            } else {
              this.$message({
                type: "error",
                message: res.resultMsg,
                duration: 1500,
                showClose: true
              });
            }
          })
        })
      },
    },
    beforeCreate () {
      $.post(this._path + '/dataReturn/queryBusDataReturnByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
          this.promise = res.data.busDataVo.promise == '1'?true:false;
          this.supplement = res.data.busDataVo.supplement;
        }else{
          this.requestError(res,this)
        }

      })
      $.post(this._path + '/dataCheck/selectDataMaterialFlow',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode === '0000'){
         this.chackHistoryList = res.data.busDataMaterialFlowVoList;
        }else{
          this.requestError(res,this)
        }
      })
    }
  }

</script>
