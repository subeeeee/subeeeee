<template>
    <div class="public distributionDispose " v-loading.fullscreen.lock="fullscreenLoading">
        <h2>分配权证员</h2>
        <p class="ele_title">订单编号 ：{{$route.query.bussNo}}</p>

        <div class="show_list_title">
            <h3><img src="../../assets/message.png" class="listTitleImg"><span>订单基本信息</span></h3>
        </div>

        <el-row class="tableInfo module_margin_bottom table_height">
                <el-col  class="table_tr" :span="24" v-for="(item,index) in borrowMessage">
                        <el-col :span="3" class="table_td">借款人姓名</el-col>
                        <el-col :span="5" class="table_td">{{item.custName}}</el-col>
                        <el-col :span="3" class="table_td">身份证号</el-col>
                        <el-col :span="5" class="table_td">{{item.certNo}}</el-col>
                        <el-col :span="3" class="table_td">联系电话</el-col>
                        <el-col :span="5" class="table_td">{{item.mobile}}&ensp;</el-col>
                </el-col>
                <el-col  class="table_tr">
                    <el-col :span="3" class="table_td">房产证号</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.ownershipNo}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">抵押物坐落</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.guaAddress + guaInfoVo.guaBuilding + guaInfoVo.guaNumber}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">房屋性质</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.houseNature}}&ensp;</el-col>
                </el-col>
                <el-col  class="table_tr" >
                    <el-col :span="3" class="table_td">所在区域</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.guaProper}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">建筑面积(㎡)</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.guaArea}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">贷款金额(万元)</el-col>
                    <el-col :span="5" class="table_td">{{busLoanInfo.amount}}&ensp;</el-col>
                </el-col>
                <el-col  class="table_tr" >
                    <el-col :span="3" class="table_td">贷款期限(月)</el-col>
                    <el-col :span="5" class="table_td">{{busLoanInfo.term}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">抵押顺位</el-col>
                    <el-col :span="5" class="table_td">{{guaInfoVo.firstPledge | firstPledge}}&ensp;</el-col>
                    <el-col :span="3" class="table_td">放款通道</el-col>
                    <el-col :span="5" class="table_td">{{passagewayName}}&ensp;{{trustPlan}}&emsp;{{subAccount}}</el-col>
                </el-col>
         </el-row>

         <picModule :_imageTypeArr='[{dataType: "3", name: "抵押物房产证、共有证", imageType: "32",required:"1"}]' :bussNo="$route.query.bussNo" taskType="270" :details="false"/>

        <div class="show_list_title">
                <h3><img src="../../assets/message.png" class="listTitleImg"><span>历史分配信息</span></h3>
        </div>

        <el-table :data="tableData" border stripe class="table">
               <el-table-column header-align="center" align="center" prop="opTime"  label="分配时间" ></el-table-column>
               <el-table-column header-align="center" align="center" prop="opName" label="任务员" ></el-table-column>
               <el-table-column header-align="center" align="center" prop="arrivalTime" label="预约进抵时间" ></el-table-column>
               <el-table-column header-align="center" align="center" prop="warrantName" label="权证员姓名" ></el-table-column>
               <el-table-column header-align="center" align="center" prop="disRemark" label="备注信息" ></el-table-column>
        </el-table>
        <div class="show_list_title">
                <h3><img src="../../assets/message.png" class="listTitleImg"><span>分配权证员</span></h3>
        </div>
        <el-row class="module_margin_bottom tableInfo">
            <el-col :span="24" class="table_tr">
                <el-col :span="4" class="table_td">
                    所在区域
                </el-col>
                <el-col :span="8" class="table_td">
                    {{guaInfoVo.guaProper}}
                </el-col>
                <el-col :span="4" class="table_td">
                    分配结果
                </el-col>
                <el-col :span="8" class="table_td">
                        <el-radio-group v-model="radio">
                                <el-radio :label="'1'">分配成功</el-radio>
                                <el-radio :label="'0'">分配失败</el-radio>
                        </el-radio-group>
                </el-col>
            </el-col>

          <el-col :span="24" class="table_tr textarea_module" v-if="radio == '0'">
             <el-col :span="4" class="table_td textarea_title">失败原因<i class="importent">*</i></el-col>
             <el-col :span="20" class="textareawrap"><div class="textarea"><textarea v-model="error"  @blur="errorFn" placeholder="请填写分配失败原因。" maxlength="2000"></textarea></div></el-col>
         </el-col>
          <el-col :span="24" class="table_tr textarea_module" >
                     <el-col :span="4" class="table_td textarea_title">分配备注<i class="importent" v-if="$route.query.anew=='1'">*</i></el-col>
                     <el-col :span="20" class="textareawrap"><div class="textarea"><textarea v-model="remark" @blur="remarkFn"  placeholder=" 请填写备注信息。" maxlength="2000"></textarea></div></el-col>
            </el-col>
          <el-col :span="24" class="table_tr" v-if="radio == '1'">
            <el-col :span="4" class="table_td">预约权证时间<i class="importent">*</i></el-col>
            <el-col :span="5" class="table_td">
                    <el-date-picker size="small" :editable="false"  v-model="surveyTime"  :picker-options="pickerOptions0" type="datetime" placeholder="选择日期时间" @change="dateChange" ></el-date-picker>
            </el-col>
            <el-col :span="2" class="table_td error_title"><el-button size="small" @click="serchSurveyTime">搜索</el-button></el-col>
            </el-col>
          <el-table  :data="allotClaimsmanTableDate" border stripe class="tableInfo" v-if="radio == '1'&&!isDateChange" >
           <el-table-column header-align="center" align="center" label="选择" width="150">
              <template scope="scope">
                <el-radio class="radio" v-model="radioId" :disabled="isDateChange" :label="scope.row">&emsp;</el-radio>
              </template>
            </el-table-column>
           <el-table-column header-align="center" align="center" prop="warrantName" label="权证员姓名"></el-table-column>
           <el-table-column header-align="center" align="center" prop="dayTask" label="当天任务量" ></el-table-column>>
          </el-table>
          <el-col  v-if="radio == '1'&&isDateChange" :span="24" class="allotClaimsmanChooseTime">请先选择预约进抵时间，搜索获得权证员列表</el-col>
        </el-row>

        <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" @click="submit" class="inquireBtn" >提 交</el-button></el-col>
    </div>
</template>

<script>
export default {
    name:'distributionDispose',
    data () {
        return {
          passagewayName:"",
          trustPlan:"",
          subAccount:"",
            fullscreenLoading:false,
            // is重新分配
            borrowMessage:[{}],
            tableData:[{}],
            radio:'1',
            surveyTime:'',//时间
            isDateChange:true,
            error:'',
            guaInfoVo:{},
            busLoanInfo:{},
            allotClaimsmanTableDate:[],
            radioId:'',
            dealBusNotarizationVo:[],
            remark:'',
            remarkBol:true,
            errorBol:false,
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }
        }
    },
    methods: {
            remarkFn(){
                if(/\s/g.test(this.remark)){
                    this.remarkBol = false
                }else{
                    this.remarkBol = true
                }
            },
            errorFn(){
                if(/\s/g.test(this.error)){
                    this.$message({
                        type:'error',
                        message:'失败原因不可输入空格',
                        duration:1500,
                        showClose:true
                    })
                    this.errorBol = false
                }else{
                    this.errorBol = true
                }
            },
           // 验证

           // 时间改变列表置灰
            dateChange () {
                this.isDateChange = true
            },
            serchSurveyTime () {
                let time = null;
                if(this.surveyTime == '' ){
                this.$message({
                    type:'error',
                    message:'请选择预约进抵时间！',
                    duration:1500,
                    showClose:true
                })
                return
                }else{
                    time = Date.parse(this.surveyTime)
                }


                let params = {
                    orderTime:time,
                    areaCode:this.busLoanInfo.areaCode
                };



                $.post(this._path + '/arrivalDisInfo/selectWarrant',params,res=>{
                    if(res.resultCode == '0000'){
                        this.allotClaimsmanTableDate = res.data;
                        this.isDateChange = false;
                    }else{
                        this.requestError(res,this)
                    }
                })
         },

         submit () {
                this.isDateChange = false

                let params = {
                    bussNo:this.$route.query.bussNo,
                    warrantId:this.radioId.warrantId,
                    result:this.radio,
                    remark:this.remark,
                    fialReason:this.error,
                    warrantName: this.radioId.warrantName
                }

                if(this.radio=="0"){
                   if(!this.error){
                    this.$message({
                            type:'warning',
                            message:'请输入失败原因',
                            duration:1500,
                            showClose:true
                        });
                        return
                   }
                  this.errorFn();
                   if(!this.errorBol){
                        this.$message({
                            type:'error',
                            message:'失败原因不可输入空格',
                            duration:1500,
                            showClose:true
                        });
                        return
                   }
                   params.arrivalTime = ''
                }else{
                    if(!this.surveyTime) {
                        this.$message({
                                type:'warning',
                                message:'请选择预约时间',
                                duration:1500,
                                showClose:true
                            })
                        return
                    }
                if(!this.radioId){
                        this.$message({
                            type:'warning',
                            message:'请选择任务员',
                            duration:1500,
                            showClose:true
                        })
                        return
                    }
                  this.remarkFn();
                    if(!this.remarkBol){
                        this.$message({
                            type:'error',
                            message:'分配备注不可为空格',
                            duration:1500,
                            showClose:true
                        })
                        return
                   }
                   if(!this.remark && this.$route.query.anew == '1'){
                       this.$message({
                            type:'error',
                            message:'分配备注不可为空',
                            duration:1500,
                            showClose:true
                        })
                        return
                   }
                    params.arrivalTime = Date.parse(this.surveyTime)
                    params.fialReason = ''
                }
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.fullscreenLoading = true
                    $.post(this._path + "/arrivalDisInfo/insertArrivalDisSubmit",params,res=>{
                        this.fullscreenLoading = false
                        if(res.resultCode == '0000'){
                            this.$message({
                                type:'success',
                                message:'提交成功',
                                duration:1500,
                                showClose:true
                            })
                            this.fullscreenLoading = false
                            this.$router.push('/distributionList')
                        }else{
                            this.$message({
                                type:'warning',
                                message:res.resultMsg,
                                duration:1500,
                                showClose:true
                            })
                            this.fullscreenLoading = false
                        }
                    })
                });

    }
    },
    beforeCreate(){
        let params = {bussNo:this.$route.query.bussNo}
        $.post(this._path+ "/custInfo/selectCustInfo",params,(res)=>{
            if(res.resultCode == '0000'){
                this.borrowMessage = res.data.busLoanInfoVoList
            }else{
                this.requestError(res,this)
            }
        })

        $.post(
            this._path + "/visaInterview/selectContractPreInfoByBussNo",params, (res) => {
                if (res.resultCode == "0000") {
                this.busLoanInfo = res.data.contractPreInfoVos;
                } else {
                this.requestError(res, this);
                }
            }
    );


        $.post(this._path+'/guaInfo/selectGuaInfo',params,(res)=>{
            if(res.resultCode == '0000'){
                this.guaInfoVo = res.data.guaInfoVo
            }else{
                this.requestError(res,this)
            }
        })

      this.$http({
        url:'/busPassageConfirm/selectBusPassageConfirmInfo',
        data:{
          bussNo:this.$route.query.bussNo
        },
        callback:res=>{
          this.passagewayName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }
      });
        // $.post(this._path+'/loanInfo/selectLoanInfo',params,(res)=>{
        //     if(res.resultCode == '0000'){
        //         this.busLoanInfo = res.data.busLoanInfo
        //     }else{
        //         this.requestError(res,this)
        //     }
        // })
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
        $.post(this._path+'/visaInterview/selectBusNotarizationInfo',params,(res)=>{
            if(res.resultCode == '0000'){
                this.dealBusNotarizationVo = res.data.dealBusNotarizationVo
            }else{
                this.requestError(res,this)
            }
        })

        $.post(this._path+'/arrivalDisInfo/selectArrivalDisFlow',params,(res)=>{
            if(res.resultCode == '0000'){
                this.tableData = res.data
            }else{
                this.requestError(res,this)
            }
        });

        let anew = this.$route.query.anew;

        $.post(this._path+'/arrivalDisInfo/selectOneArrivalDisInfo',params,(res)=>{
            if(res.resultCode == '0000'){
                this.surveyTime = res.data.arrivalTime;
                this.radio = !res.data.result?'1':res.data.result;
                this.error = res.data.fialReason;
                this.remark = res.data.remark;
                if(!this.surveyTime == ''){
                    this.serchSurveyTime()
                }

            }else{
                this.requestError(res,this)
            }
        })


    },
    filters:{
        //抵押顺位
        firstPledge(value){
            if(value == '01'){
                value = '一抵'
            }else{
                value = '二抵'
            }
            return value
        }
    }
}
</script>


