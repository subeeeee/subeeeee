
<template>
  <div class="borrowLink inspectBorrowLink">
    <!-- 有利于贷款审批的额外信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>有利于贷款审批的额外信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="5" taskType="138" class="module_margin_bottom"/>
    <!--  其他强调或补充信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 其他强调或补充信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">其他强调或补充信息</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" @blur="promiseFn"  v-model="addInfo"  placeholder="请输入内容，最多1000字。" maxlength="1000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr promise">
        <el-col :span="22" :offset="1">
          <el-checkbox v-model="promise"></el-checkbox>
          <i class="importent">*</i>
          本人承诺 : 家访调查流程已按照公司规定，遵循“诚实守信，尽职尽责”原则完成，如存在协助借款人欺瞒公司，导致贷款审批决策失误造成的相关损失，本人愿意承担一切责任。
        </el-col>
      </el-col>
    </el-row>

    <!--<div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 补充影像历史</span></h3>
    </div>
    <picModule dataType="7" :bussNo="$route.query.bussNo" taskType='136' :details="false" class=" module_margin_bottom addImg"/>

    <el-row class="tableInfo module_margin_bottom">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">是否需要补充材料<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-radio class="radio" v-model="isMaterial" label="1">是</el-radio>
          <el-radio class="radio" v-model="isMaterial" label="0">否</el-radio>
        </el-col>
      </el-col>
      &lt;!&ndash;<el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td"> 补充材料 </el-col>
        <el-col :span="21" class="table_td">
          <el-input v-model="material"></el-input>
        </el-col>
      </el-col>&ndash;&gt;
      <el-col :span="24" class="table_tr textarea_module"  v-if="isMaterial == '1'">
        <el-col :span="3" class="table_td textarea_title">补充材料</el-col>
        <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10"  v-model="material"  placeholder="请输入内容，最多2000字。" maxlength="2000"></textarea></div></el-col>
      </el-col>
    </el-row>

    <div class="show_list_title" v-if="isMaterial == '0'">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>

    <el-row class="tableInfo module_margin_bottom" v-if="isMaterial == '0'">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">核查结论<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
            <el-radio :disabled="!!$route.query.proName||$route.query.taskStatus=='初审打回'||$route.query.taskStatus=='终审打回'||$route.query.taskStatus=='初审打回，终审打回'" class="radio" v-model="checkStatus" label="1">核查通过</el-radio>
          <el-radio :disabled="!!$route.query.proName||$route.query.taskStatus=='初审打回'||$route.query.taskStatus=='终审打回'||$route.query.taskStatus=='初审打回，终审打回'" class="radio" v-model="checkStatus" label="0">拒单</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-if="checkStatus == '0'">
        <el-col :span="3" class="table_td"> 拒绝原因 <span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-input :disabled="!!$route.query.proName||$route.query.taskStatus=='初审打回'||$route.query.taskStatus=='终审打回'||$route.query.taskStatus=='初审打回，终审打回'" v-model="checkReject"></el-input>
        </el-col>
      </el-col>
    </el-row>-->

  <!--  <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 风控信息记录</span></h3>
    </div>
    <el-table :data="tableData2" border stripe style="width: 100%" class="module_margin_bottom">
     <el-table-column header-align="center" align="center" label="选择" width="100">
        <tamplate slot-scope="scope">
          <el-checkbox v-if="!scope.row.taskTime" disabled v-model="scope.row.isChoose"></el-checkbox>
        </tamplate>
      </el-table-column>
     <el-table-column header-align="center" align="center" prop="taskName" label="任务名称" width="180"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="proName" label="产品名称" width="180"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="lastEditName" label="风控任务员" width="180"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="lastEditTime" label="风控操作时间" min-width="180"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="riskOpinion" label="风控意见" min-width="200"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="taskTime" label="核查时间" min-width="180"> </el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="核查任务员" width="180"> </el-table-column>
    </el-table>-->
    <el-col :span="24" class="buttom_btn_warp">
      <el-col :span="6" :offset="12"><el-button @click="btnClick('save')" size="small" class="buttom_btn">保存</el-button></el-col>
      <!--<el-col :span="6" v-if="isMaterial == 1"><el-button @click="btnClick('attach')" size="small" class="buttom_btn">补充材料</el-button></el-col>-->
      <!--<el-col :span="6"  v-if="isMaterial == 0"><el-button @click="btnClick('submit')" size="small"  class="buttom_btn">提交</el-button></el-col>-->
        <!--<el-col :span="6"><packageData :gridList="gridData" :taskType="'138'" :custName="$route.query.custName" :packageType="'01包'" :bussNo="$route.query.bussNo" ></packageData></el-col>-->
        <!--<el-col :spa  n="6"><packageData :gridList="gridData" :taskType="'138'" :custName="$route.query.custName" :packageType="'01包'" :bussNo="$route.query.bussNo" ></packageData></el-col>-->
    </el-col>
  </div>
</template>

<script>
  import './../../style/borrowLink.css'

  export default {
    name:'inspectBorrowLink',
    data () {
      return{
        dialogTableVisible:false,
          gridData:[],
        addInfo:'',
        promise:'',
        dialogVisible:false,
        picTypes:[],
        tableData2:[],
        params : {},
        isMaterial : '',
        material:'',
        isFullCust:'',
        isFullGua:'',
        isFullLoan:'',
        //保存返回时默认勾选的
        productFlowVoList:[],
        productList:[],

        checkStatus:"",
        checkReject:"",
      }
    },
    methods : {
      promiseFn(){

      },
      btnClick (type,fn,str) {
        this.params = {
          promise : this.promise ? '1' : '0',
          supplement : this.addInfo,
          isFullSurvey :this.promise?'1':'0',
          bussNo: this.$route.query.bussNo,
        };

        $.post(this._path + '/dataCheck/saveSummaryInfo',this.params,res=>{
          if(res.resultCode == '0000') {
            window.bus.$emit("isFullSurveyR", this.params.isFullSurvey);
            this.$message({
              type:'success',
              message:'保存成功',
              duration:1500,
              showClose:true
            })
            if(!!fn && !!str){
              fn(str)
            }
          }
        });
/*

        switch (type) {

          case "save":
            $.post(this._path + '/dataCheck/insertCheckSaveOrSubmit',this.params,res=>{
              if(res.resultCode == '0000') {
                this.$message({
                  type:'success',
                  message:'保存成功',
                  duration:1500,
                  showClose:true
                })
                if(!!fn && !!str){
                  fn(str)
                }
              }
            });
            break;
          case "attach":
            this.$confirm('是否确认提交?', '提示', {
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
              $.post(this._path + '/dataCheck/insertCheckSaveOrSubmit',this.params,res=>{
                loading.close();
                if(res.resultCode == '0000'){
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });
                  this.$router.push('/infoInspectList')
                }else{
                  this.$message({
                    type: 'error',
                    message: res.resultMsg
                  });
                }
              })

            });
            break;
          case "submit":
            let proList = ''
            if (this.isMaterial != '0') {
              this.$message({
                type: 'info',
                message: '请补充完整材料后提交!',
                duration:1500,
                showClose:true
              });
              return
            }
            if(!this.promise){
              this.$message({
                type: 'info',
                message: '请确认勾选本人承诺',
                duration:1500,
                showClose:true
              });
              return
            }

            if(this.isMaterial == '0'&&!this.checkStatus){
              this.$message({
                type: 'info',
                message: '请选择核查结论',
                duration:1500,
                showClose:true
              });
              return
            }

            if(this.checkStatus == '1'){

            }
            if(this.checkStatus == '0'){
              if(!this.checkReject){
                this.$message({
                  type: "error",
                  message: "拒绝原因不可为空",
                  duration: 1500,
                  showClose: true
                })
                return
              }
            }
            let message = '';

            if(this.$route.query.taskStatus=='初审打回'||this.$route.query.taskStatus=='终审打回'||this.$route.query.taskStatus=='初审打回，终审打回'){
              let tableDataListBol = false;
              tableDataList.forEach((item)=>{
                if(item.isChoose=='1'){
                  tableDataListBol = true
                }
              });
              if(!tableDataListBol){
                this.$alert('请勾选您补充材料所对应的风控任务', '提示', {
                  confirmButtonText: '我知道了',
                  callback: action => {}
                });
                return
              }
            }

            /!*if(proList){
              message = '您未输出申报产品' + proList + '的资料核查结论，是否确认提交'
            }else{

            }*!/
            message = '是否确认提交';
            this.$confirm(message, '提示', {
              confirmButtonText: '确定提交',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.checkStatus == '1'){
                if(this.params.isFullCust == '0'||this.params.isFullLoan == '0'||this.params.isFullGua!="11"){
                  this.$message({
                    type: "error",
                    message: "请完成选项卡有小红点下的必填项",
                    duration: 1500,
                    showClose: true
                  });
                  return
                }
              }
              let loading = this.$loading({
                lock: true,
                text: "正在加载...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.5)"
              });
              $.post(this._path + '/dataCheck/insertCheckSaveOrSubmit',this.params,res=>{
                loading.close();
                if(res.resultCode == '0000'){
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });
                  this.$router.push('/infoInspectList')
                }else{
                  this.$message({
                    type: 'error',
                    message: res.resultMsg
                  });
                }
              })
            });
            break;

        }*/
      }
    },
    created () {
      window.bus.$on('/infoInspect/inspectBorrowLink',(fn,str) => {
        this.btnClick('save',fn,str);
      });




      $.post(this._path + '/dataCheck/querySummaryInfo',{bussNo:this.$route.query.bussNo},res=>{
        this.addInfo = res.data.dataCheckSummaryInfo.supplement;
        this.isMaterial = res.data.dataCheckSummaryInfo.isMaterial;
        if(res.data.dataCheckSummaryInfo.promise){
          this.promise = res.data.dataCheckSummaryInfo.promise == "1" ? true : false;
        }else{
          this.promise = true
        }


        this.isFullCust= res.data.dataCheckSummaryInfo.isFullCust
        this.isFullGua= res.data.dataCheckSummaryInfo.isFullGua
        this.isFullLoan= res.data.dataCheckSummaryInfo.isFullLoan

        /*!this.isFullGua?this.isFullGua = '00':this.isFullGua = this.isFullGua
        !this.isFullCust?this.isFullCust = '0':this.isFullCust = this.isFullCust
        !this.isFullLoan?this.isFullLoan = '0':this.isFullLoan = this.isFullLoan

        window.bus.isFullLoanR  =  this.isFullLoan
        window.bus.isFullCustR = this.isFullCust
        window.bus.isFullGuaR  = this.isFullGua*/
      });
    },
    beforeDestroy () {
      window.bus.$off('/infoInspect/inspectBorrowLink');
    }
  }

</script>

