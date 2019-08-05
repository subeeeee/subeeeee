
<template>
  <div class="borrowLink inspectBorrowLink">
    <!-- 有利于贷款审批的额外信息 -->
		<div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>有利于贷款审批的额外信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="5" taskType="138"/>
    <!--  其他强调或补充信息 -->
		<div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 其他强调或补充信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">其他强调或补充信息</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" @blur="promiseFn" class="textarea_disabled" disabled  v-model="addInfo"  placeholder="请输入内容，最多1000字。" maxlength="1000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr promise">
        <el-col :span="22" :offset="1">
          <el-checkbox disabled v-model="promise"></el-checkbox>
          本人承诺 : 家访调查流程已按照公司规定，遵循“诚实守信，尽职尽责”原则完成，如存在协助借款人欺瞒公司，导致贷款审批决策失误造成的相关损失，本人愿意承担一切责任。
        </el-col>
      </el-col>
		</el-row>
      <div class="show_list_title">
        <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span>复核信息及补充材料历史</span></h3>
      </div>
      <!-- 表格 -->
    <el-table class="module_margin_bottom" border stripe :data="chackHistoryList" style="width: 100%">
     <el-table-column header-align="center" align="center" prop="creatName" label="核查任务员" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="creatTime" label="核查操作时间" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="material" label="补充材料" min-width="250"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="上传时间" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="上传任务员" width="150"></el-table-column>
    </el-table>


    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span> 补充影像历史</span></h3>
    </div>
    <picModule dataType="7" :bussNo="$route.query.bussNo" taskType='138' :details="false" class=" module_margin_bottom addImg"/>

      <el-row class="tableInfo module_margin_bottom">
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">是否需要补充材料<span class="importent">*</span></el-col>
          <el-col :span="21" class="table_td">
            <el-radio class="radio"  v-model="isMaterial" label="1">是</el-radio>
            <el-radio class="radio"  v-model="isMaterial" label="0">否</el-radio>
          </el-col>
        </el-col>
       <!-- <el-col :span="24" class="table_tr" v-if="isMaterial == '1'">
        <el-col :span="3" class="table_td"> 补充材料 </el-col>
          <el-col :span="21" class="table_td">
            <el-input  v-model="material" ></el-input>
          </el-col>
        </el-col>-->
        <el-col :span="24" class="table_tr textarea_module"  v-if="isMaterial == '1'">
          <el-col :span="3" class="table_td textarea_title">补充材料</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10"   v-model="material"  placeholder="请输入内容，最多2000字。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-row>

    <div class="show_list_title" v-if="isMaterial == '0'">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>

    <el-row class="tableInfo module_margin_bottom" v-if="isMaterial == '0'">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">核查结论<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-radio disabled class="radio" v-model="checkStatus" label="1">核查通过</el-radio>
          <el-radio disabled class="radio" v-model="checkStatus" label="0">拒单</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-if="checkStatus == '0'">
        <el-col :span="3" class="table_td"> 拒绝原因 <span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-input disabled v-model="checkReject"></el-input>
        </el-col>
      </el-col>
    </el-row>

      <div class="show_list_title">
        <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 风控信息记录</span></h3>
      </div>
      <el-table :data="tableData2" border stripe style="width: 100%" class="module_margin_bottom">
       <el-table-column header-align="center" align="center" prop="taskName" label="选择" width="180">
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
      </el-table>
      <el-col :span="24" class="buttom_btn_warp">
        <el-col :span="6" :offset="6"><el-button @click="btnClick('save')" size="small" class="buttom_btn">保存</el-button></el-col>
        <el-col :span="6" v-if="isMaterial == 1"><el-button @click="btnClick('attach')" size="small" class="buttom_btn">补充材料</el-button></el-col>
        <el-col :span="6"  v-if="isMaterial == 0"><el-button @click="btnClick('submit')" size="small"  class="buttom_btn">提交到风控系统</el-button></el-col>
        <!--<el-col :span="6"><el-button  size="small"  class="buttom_btn"  @click="dialogTableVisible = true">导出资料包</el-button></el-col>-->
        <!--<el-col :span="6"><packageData :gridList="gridData" :taskType="'138'" :custName="$route.query.custName" :packageType="'01包'" :bussNo="$route.query.bussNo" ></packageData></el-col>-->
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
      chackHistoryList:[],
      promise:'',
      dialogVisible:false,
      picTypes:[], tableData2:[{}],
      params : {},
      isMaterial : '',
      material:'',
      isFullCust:'',
      isFullGua:'',
      isFullLoan:'',
      productFlowVoList:[],
      productList:[],

      checkReject:'',
      checkStatus:'',
    }
  },
  methods : {
    downloadCreateFn(row){
      let params = {
        productType:row.proCode,
        bussNo:this.$route.query.bussNo,
        packageType:'01包'
      }
      $.post(this._path + '/businessImage/package',params,res=>{
        if(res.resultCode == '0000'){
          this.$alert('正在为您生成资料包，您可以2分钟后，返回此页面导出资料包')
        }else{
          this.requestError(res,this)
        }
      })
      this.dialogTableVisible = false
    },
    downloadFn(row){
      let params = {
        productType:row.proCode,
        bussNo:this.$route.query.bussNo,
        packageType:'01包'
      }
      $.get(this._path + '/businessImage/queryAccessOfPackage',params,res=>{
        if(res.resultCode == '0000'){
          if(res.data.access){
            this._download(this._path + '/businessImage/download',params)
          }else{
            this.$message({
              type:'success',
              message:'您需要先点击“生成”，两分钟后回来导出哦！',
              duration:1500,
              showClose:true
            })
          }
        }else{
          this.requestError(res,this)
        }
      })
      this.dialogTableVisible = false
    },
    promiseFn(){
				// if(/\s+/g.test(this.promise)){
				// 	this.$message({
				// 			type: "error",
				// 			message: "不可输入空格",
				// 			duration: 1500,
				// 			showClose: true
				// 	})
				// }
    },
    paramsFn (type) {
        if (this.isMaterial != '1') {
          this.material = ''
        }
        this.params = {
          promise : this.promise ? '1' : '0',
          supplement : this.addInfo,
          material : this.material,
          isMaterial : this.isMaterial,
          isFullCust : this.isFullCust,
          isFullLoan : this.isFullLoan,
          isFullGua : this.isFullGua,
          isFullSurvey :'1',
          isSaveOrSubmit : type,
          bussNo: this.$route.query.bussNo,

          checkStatus:this.checkStatus,
          checkReject:this.checkReject
        }
    },
    btnClick (type) {
      this.paramsFn(type);
      if(this.isMaterial == '1'){
        if(!this.material){
          this.$message({
            type:'warning',
            message:'请填写补充材料信息!',
            duration:1500,
            showClose:1
          })
          return
        }
      }
      let productFlowVo = JSON.parse(JSON.stringify(this.productFlowVoList));
      productFlowVo.forEach((item)=>{
        if(item.isChoose){
          item.isChoose = '1'
        }else{
          item.isChoose = '0';
        }
      });
      this.params.productFlowVoString =  JSON.stringify(productFlowVo);

      let tableData = JSON.parse(JSON.stringify(this.tableData2));
      let tableDataList = [];
      tableData.forEach((item)=>{
        if(item.isChoose){
          item.isChoose = '1';
        }else{
          item.isChoose = '0';
        }
        if(!item.taskPerName||item.taskPerName == ''){
          tableDataList.push(item)
        }
      });
      this.params.OpinionFlowSelectVoString = JSON.stringify(tableDataList);
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
            }
          })
        break;
        case "attach":
          this.$confirm('是否确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $.post(this._path + '/dataCheck/insertCheckSaveOrSubmit',this.params,res=>{
              if(res.resultCode == '0000'){
                this.$message({
                  type: 'success',
                  message: '推送成功!'
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
          if ( this.isFullLoan == '0' || this.isFullGua != "11"||this.isFullCust == '0') {
            this.$message({
              type: "error",
              message: "请完成选项卡有小红点下的必填项",
              duration: 1500,
              showClose: true
            });
            return
          }
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
          // if(/\s+/g.test(this.addInfo)){
			// 			this.$message({
			// 					type: "error",
			// 					message: "不可输入空格",
			// 					duration: 1500,
			// 					showClose: true
			// 			})
			// 			return
			// 		}

          let message = '';
          /*let bol = false; // 判断勾选状态下拒绝原因
          let isChooseBol = false; // 判断是否有勾选
          let bolIsPass = false; //判断勾选下是否选择资料核查是否通过
          this.productFlowVoList.forEach((item)=>{
            if(item.isChoose&&item.isPass=='0'&&!item.reasons){
              bol = true
            }
            if(item.isChoose&&!item.isPass){
              bolIsPass = true
            }
            if(item.isChoose&&item.isPass=='1'){
              item.reasons = ''
            }
            if(item.isChoose){
              isChooseBol = true;
            }
          });

          if(bol){
            this.$message({
              type:'warning',
              message:'所勾选产品资料核查未通过的拒绝原因不可为空',
              duration:1500,
              showClose:true
            });
            return
          }
          if(bolIsPass){
            this.$message({
              type:'warning',
              message:'所勾选产品资料核查请选择是否通过',
              duration:1500,
              showClose:true
            });
            return
          }
          if(!isChooseBol){
            this.$alert('请输出资料核查结论！', '提示', {
              confirmButtonText: '我知道了',
              callback: action => {}
            });
            return
          }*/

          if(this.$route.query.taskStatus=='初审打回'||this.$route.query.taskStatus=='终审打回'){
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
          let proList = '';
          for(let i = 0;i<this.productList.length;i++){
            for(let j = 0;j<this.productFlowVoList.length;j++){
              if(this.productList[i] == this.productFlowVoList[j].proCode){
                if(!this.productFlowVoList[j].isChoose){
                  proList = proList + this.productFlowVoList[j].proName + ','
                }
              }
            }
          }
          /*if(proList){
            message = '您未输出申报产品' + proList + '的资料核查结论，是否确认提交'
          }else{
            message = '确认提交至风控系统'
          }*/
          message = '是否确认提交';
          this.$confirm(message, '提示', {
            confirmButtonText: '确定提交',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
               if(this.params.isFullCust == '0'||this.params.isFullLoan == '0'||this.params.isFullGua!="11"){
                  this.$message({
                        type: "error",
                        message: "请完成选项卡有小红点下的必填项",
                        duration: 1500,
                        showClose: true
                      });
                  return
               }
            $.post(this._path + '/dataCheck/insertCheckSaveOrSubmit',this.params,res=>{
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
          })
        break;

      }
    }
  },
  created () {
    $.post(this._path + '/dataCheck/selectDataMaterialFlow',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode === '0000'){
        this.chackHistoryList = res.data.busDataMaterialFlowVoList;
      }else{
        this.requestError(res,this)
      }
    })
    $.post(this._path + '/dataCheck/querySummaryInfo',{bussNo:this.$route.query.bussNo},res=>{
      this.addInfo = res.data.dataCheckSummaryInfo.supplement;
      if(res.data.dataCheckSummaryInfo.promise){
						this.promise = res.data.dataCheckSummaryInfo.promise == "1" ? true : false;
      }else{
        this.promise = true
      }
      this.isMaterial = res.data.dataCheckSummaryInfo.isMaterial? res.data.dataCheckSummaryInfo.isMaterial:'1';
      this.material = res.data.dataCheckSummaryInfo.material;
      this.checkStatus = res.data.dataCheckSummaryInfo.checkStatus;
      this.checkReject = res.data.dataCheckSummaryInfo.checkReject;
      this.isFullCust= res.data.dataCheckSummaryInfo.isFullCust
      this.isFullGua= res.data.dataCheckSummaryInfo.isFullGua
      this.isFullLoan= res.data.dataCheckSummaryInfo.isFullLoan

      window.bus.isFullLoanB  =  this.isFullLoan
      window.bus.isFullCustB = this.isFullCust
      window.bus.isFullGuaB  = this.isFullGua
    });
    $.post(this._path + '/dataCheck/riskOpinionFlowList',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode == '0000'){
        this.tableData2 = res.data.riskOpinionFlowVoList;
        if(this.tableData2){
          this.tableData2.forEach((item)=>{
            // if(item.isChoose=='1'){
            //   item.isChoose = true
            // }else{
            //   item.isChoose = false
            // }
            item.isChoose = true;
            if(item.proName){
              let endIndex = item.proName.lastIndexOf('；');
              if(endIndex > -1){
                item.proName = item.proName.substr(0,endIndex)
              }
            }
          })
        }else{
          this.tableData2 = []
        }
      }else{
        this.requestError(res,this)
      }
    });
    /*$.post(this._path + '/loanInfo/selectProductInfo',{bussNo:this.$route.query.bussNo,proCity:this.$route.query.areaCode},res=>{
      if(res.resultCode == '0000'){
        this.gridData = res.data.productInfoVoList
      }else{
        this.requestError(res,this)
      }
    })*/


    // selectProductFlowList //查询产品列表


  }
}

</script>

