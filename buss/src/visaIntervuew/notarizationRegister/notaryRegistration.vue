<template>
  <div class="contractPreparingList public">
    <h2>公证登记</h2>
    <p class="ele_title">订单编号 ：{{$route.query.bussNo}} <span class="font_red" v-if="titleBol">提示：本订单为见公证书放款，请尽快上传公证书相关信息，否则无法流转至放款审批环节！</span></p>
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
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>风控审批结论</span></h3>
    </div>
    <el-row class="tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="24" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="tableData.approvalConclusion" class="textarea_disabled textarea_bh" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="tableData.remark" ></textarea></div></el-col>
        </el-col>
      </el-col>
      <br>
      <!-- <picModule :bussNo="$route.query.num" dataType="7" taskType="250"/> -->
    </el-row>
    <br/><br/>
    <el-row class="module_margin_top">
      <el-col class="module_margin_bottom" :span="3" :offset="1">公证结果:</el-col>
      <el-col :span="3"><el-radio v-model="notarizationResult" class="radio" label="1" >公证成功</el-radio></el-col>
      <el-col :span="3"><el-radio  v-model="notarizationResult" class="radio" label="0">公证失败</el-radio></el-col>
    </el-row>
    <div class="success" v-if="notarizationResult == '1'">
      <div class="show_list_title">
        <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>公证登记</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">放款通道<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="20" class="font_left" :offset="1">
              {{passageName}}&nbsp;
              {{trustPlan}}&emsp;
              {{subAccount}}
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">债转公司<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="20" class="font_left" :offset="1">
              {{companyAlias}}&nbsp;
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">户名<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-select   placeholder="请选择" disabled v-model="dealBusNotarizationVo.accName" class="select_width"   size='small'>
                <el-option v-for="item in busLoanInfoVoList" :key='item.custName' :label='item.custName' :value='item.custName'></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" @blur="ifaccount" disabled v-model="dealBusNotarizationVo.account"></el-input>
            </el-col>
            <el-col :span="9"></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" disabled  :maxlength="40"  v-model="dealBusNotarizationVo.accBank"></el-input></el-col>
          </el-col>
          <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" disabled  v-model="dealBusNotarizationVo.accMobile"></el-input></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">借款人常用手机号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" @blur="isaccMobile('2',dealBusNotarizationVo.useMobile)" v-model="dealBusNotarizationVo.useMobile"></el-input></el-col>
          </el-col>
          <el-col :span="4" class="table_td">借款合同编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('loanNumber')" maxlength="50" v-model="loanNumber"></el-input></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">抵押合同编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('mortgageNumber')" maxlength="50" v-model="mortgageNumber"></el-input></el-col>
          </el-col>
          <el-col :span="4" class="table_td">债转协议编号</el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('transferNumber')" maxlength="50" v-model="transferNumber"></el-input></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">公证受理单编号<span class="importent">*</span></el-col>
          <el-col :span="8" class="table_td">
            <el-col :span="14" :offset="1"><el-input size="small"   v-model="accePtance"></el-input></el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <picModule dataType="1" :bussNo="$route.query.bussNo"  taskType="250"  v-if="notarizationResult == '1'"/>
    <br>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>公证书影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">借款公证书编号</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small"  :maxlength="30" v-model="visaNumber"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">抵押公证书编号</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small"  :maxlength="30" v-model="pledgeNumber"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule dataType="2" :bussNo="$route.query.bussNo"  taskType="250"  v-if="notarizationResult == '1'"/>
    <br>
    <div class="err" >
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr" v-if="notarizationResult == '0'">
          <el-col :span="5" class="table_td">失败原因<span class="importent">*</span></el-col>
          <el-col :span="19" class="table_td">
            <el-col :span="14" class="bmp_selectleft" :offset="1">
              <el-select v-model="fialCode" size="small" placeholder="请选择" @change="failResultChange">
                <el-option v-for="(item,index) in fialCodeList" :value="item.code" :label="item.value" :key="index"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" v-if="notarizationResult == '0' && fialCode == '99'">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="5" class="table_td textarea_title">其他原因<span class="importent">*</span></el-col>
            <el-col :span="19" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="dealBusNotarizationVo.fialReason" placeholder="请填写其他原因。" maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="24" class="table_tr textarea_module">
            <el-col :span="5" class="table_td textarea_title">备注</el-col>
            <el-col :span="19" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="dealBusNotarizationVo.remark" placeholder="请输入备注信息。" maxlength="2000"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick('save')" >保 存</el-button></li>
        <li class="last_btn"><el-button @click="btnClick('submit')">提 交</el-button></li>
      </ul>
    </div>
  </div>
</template>
<script>

  export default {
    name: "contractPreparingList",
    data() {
      return {
        accePtance:"",
        fialCodeList:[
          {code:'1',value:'产权不清晰,拒单'},
          {code:'99',value:'其他原因'}
        ],
        fialCode:'',
        riskRemark:"",
        tableData: [],
        busLoanInfoVoList: [],
        notarizationResult: "1",
        ownershipNo: "",
        busLoanInfo: "",
        dealBusNotarizationVo: {},
        capitalOpinion: "",
        passagewayName:'',
        passageWayList: [],
        identityNo:'',
        bankCardAuthentication:false,
        mobileBol:false,
        borrowMobileBol:false,
        loanNumber:'',
        mortgageNumber:'',
        transferNumber:'',
        passageName:"",
        subAccount:"",
        trustPlan:"",
        companyAlias:'',
        titleBol:false,
        visaNumber:"",
        pledgeNumber:"",
      };
    },
    methods: {
      clearSpeace(str){
        this[str] = this._utils.clearSpeace(this[str])
      },
      failResultChange () {
        switch (this.fialCode) {
          case '1':
            this.dealBusNotarizationVo.fialReason = '产权不清晰,拒单';
            break;
          case "99":
            this.dealBusNotarizationVo.fialReason = '';
        }
      },
      custNameFn(){
        this.bankCardFn()
      },
      // 四要素验证
      bankCardFn(){
        for(let i = 0;i<this.busLoanInfoVoList.length;i++){
          if(this.busLoanInfoVoList[i].custName == this.dealBusNotarizationVo.accName){
            this.identityNo = this.busLoanInfoVoList[i].certNo
          }
        }
        let params = {
          accountNo:this.dealBusNotarizationVo.account,
          name:this.dealBusNotarizationVo.accName,
          identityNo:this.identityNo,
        };
        if(!params.accountNo||!params.name||!params.identityNo){
          return
        }
        $.post(this._path + "/business/bankCardAuthentication", params, res => {
          if (res.resultCode == "0000") {
            // this.busLoanInfoVoList = res.data.busLoanInfoVoList;
            if(!res.data.authResult){
              this.$message({
                type: "warning",
                message: "银行三要素验证失败",
                duration: 1500,
                showClose: true
              });
              this.bankCardAuthentication = false
            }else{
              this.bankCardAuthentication = true
            }
          } else {
            this.requestError(res, this);
          }
        });
      },
      isaccName() {
        if (!this.dealBusNotarizationVo.accName) {
          this.$message({
            type: "warning",
            message: "户名不可为空",
            duration: 1500,
            showClose: true
          });
          return false;
        } else if (/\s+/g.test(this.dealBusNotarizationVo.accName)) {
          this.$message({
            type: "warning",
            message: "户名不可输入空格",
            duration: 1500,
            showClose: true
          });
          return false;
        }
      },

      ifaccount() {
        if (!this.dealBusNotarizationVo.account) {
          this.$message({
            type: "warning",
            message: "账号不可为空",
            duration: 1500,
            showClose: true
          });
          return false;
        } else if (!/^[1-9]{1}\d{15,20}$/.test(this.dealBusNotarizationVo.account)) {
          this.$message({
            type: "warning",
            message: "账号输入错误",
            duration: 1500,
            showClose: true
          });
          return false;
        }else{
          this.bankCardFn()
        }
      },

      isaccBank() {
        if (!this.dealBusNotarizationVo.accBank) {
          this.$message({
            type: "warning",
            message: "开户行不可为空",
            duration: 1500,
            showClose: true
          });
          return false;
        } else if (/\s+/g.test(this.dealBusNotarizationVo.accBank)) {
          this.$message({
            type: "warning",
            message: "开户行不可输入空格",
            duration: 1500,
            showClose: true
          });
          return false;
        }else{
          this.bankCardFn()
        }
      },

      isaccMobile(type,mobileStr) {
        let message = ''
        if('1' == type){
          message = '银行预留手机号'
        }else{
          message = '借款人常用手机号'
        }
        if (!mobileStr) {
          this.$message({
            type: "warning",
            message: message + "不可为空",
            duration: 1500,
            showClose: true
          });
          if('1' == type){
            this.mobileBol = true;
          }else{
            this.borrowMobileBol = true
          }
        } else if (/\s+/g.test(mobileStr)) {
          this.$message({
            type: "warning",
            message: message + "不可输入空格",
            duration: 1500,
            showClose: true
          });
          if('1' == type){
            this.mobileBol = true;
          }else{
            this.borrowMobileBol = true
          }
        } else if (
          !this._utils.isMobile(mobileStr)
        ) {
          this.$message({
            type: "warning",
            message: message +  "不正确",
            duration: 1500,
            showClose: true
          });
          if('1' == type){
            this.mobileBol = true;
          }else{
            this.borrowMobileBol = true
          }
        }else{
          if('1' == type){
            this.mobileBol = false;
          }else{
            this.borrowMobileBol = false
          }
        }
      },
      mustWrite () {
        if(this.notarizationResult == "1"){
          if(!this.dealBusNotarizationVo.accName){
            this.$message.warning('请选择户名');
            return false
          }
          if(!this.dealBusNotarizationVo.account){
            this.$message.warning('请填写账号');
            return false
          }
          if(!this.dealBusNotarizationVo.accBank){
            this.$message.warning('请填写开户行');
            return false
          }
          if(!this.dealBusNotarizationVo.accMobile){
            this.$message.warning('请填写银行预留手机号');
            return false
          }
          if(!this.dealBusNotarizationVo.useMobile){
            this.$message.warning('请填写借款人常用手机号');
            return false
          }
          if(!this.loanNumber){
            this.$message.warning('请填写借款合同编号');
            return false
          }
          if(!this.mortgageNumber){
            this.$message.warning('请填写抵押合同编号');
            return false
          }
          if(!this.accePtance){
            this.$message.warning('请填公证受理单编号');
            return false
          }


        }else if (this.notarizationResult == "0") {
          if(this.fialCode == ''){
            this.$message.warning('请选择失败原因');
            return false
          }else if(this.fialCode == '99'){
            if (!this.dealBusNotarizationVo.fialReason) {
              this.$message.warning('请填写其他原因');
              return false
            }
          }
        }





        return true
      },
      btnClick(type) {
        $.get(this._path + "/business/userChannel", {bussNo:this.$route.query.bussNo},res => {
          if (res.resultCode == "0000") {
            let path = ''
            if(res.data.busModel=='01'){
              path = '/capitalSale/capitalSaleNotaSaOrSu'
            }else{
              path = '/visaInterview/busNotarizationSaveOrSubmit'
            }
            let params = {
              fialCode:this.fialCode,
              result: this.notarizationResult,
              fialReason: this.dealBusNotarizationVo.fialReason,
              // passagewayCode: this.dealBusNotarizationVo.passagewayCode,
              accName: this.dealBusNotarizationVo.accName,
              accCert:this.dealBusNotarizationVo.accCert,
              account: this.dealBusNotarizationVo.account,
              accBank: this.dealBusNotarizationVo.accBank,
              accMobile: this.dealBusNotarizationVo.accMobile,
              remark: this.dealBusNotarizationVo.remark,
              bussNo: this.$route.query.bussNo,
              useMobile:this.dealBusNotarizationVo.useMobile,
              // passagewayName,
              loanNumber:this.loanNumber, //借款合同编号
              mortgageNumber:this.mortgageNumber,
              transferNumber:this.transferNumber,
              visaNumber:this.visaNumber,
              pledgeNumber:this.pledgeNumber,
              accePtance:this.accePtance
            };
            if (params.result == "0") {
              // params.passagewayCode = "";
              params.accName = "";
              params.account = "";
              params.accBank = "";
              params.accMobile = "";
            } else {
              params.fialReason = "";
              // params.remark = "";
            }

            if (type == "save") {
              params.saveOrSubmit = "save";
              let loading = this.$loading({
                lock: true,
                text: "正在加载...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.5)"
              });
              $.post(
                this._path + path,
                params,
                res => {
                  loading.close();
                  if (res.resultCode == "0000") {
                    // this.busLoanInfoVoList = res.data.busLoanInfoVoList
                    this.$message({
                      type: "success",
                      message: "保存成功",
                      duration: 1500,
                      showClose: true
                    });
                  } else {
                    this.requestError(res, this);
                  }
                }
              );
            } else {
              params.saveOrSubmit = "submit";
              if(!this.mustWrite()){
                return
              }
              if(this.notarizationResult!='0'){
               /* if(!this.bankCardAuthentication){
                  this.$message({
                    type: "warning",
                    message: "银行三要素验证失败",
                    duration: 1500,
                    showClose: true
                  });
                  return
                }*/
               /* this.isaccMobile('1',params.accMobile);
                if(this.mobileBol){
                  return
                }*/
                //这是新增的借款人常用手机号的验证
                this.isaccMobile('2',params.useMobile);
                if(this.borrowMobileBol){
                  return
                }
              }

              this.$confirm("是否确定提交?提交后订单将进入预约进抵环节。", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let loading = this.$loading({
                  lock: true,
                  text: "正在加载...",
                  spinner: "el-icon-loading",
                  background: "rgba(255, 255, 255, 0.5)"
                });
                $.post(
                  this._path + path,
                  params,
                  res => {
                    loading.close();
                    if (res.resultCode == "0000") {
                      // this.busLoanInfoVoList = res.data.busLoanInfoVoList
                      this.$message({
                        type: "success",
                        message: "提交成功",
                        duration: 1500,
                        showClose: true
                      });
                      this.$router.push("/notrizationRegusterList");
                    } else {
                      this.$message({
                        type: "warning",
                        message: "提交失败",
                        duration: 1500,
                        showClose: true
                      });
                      this.requestError(res, this);
                    }
                  }
                );
              })
            }
          }else {

          }
        });
      }
    },
    beforeCreate() {
      // 查询放款通道
      /*$.post(this._path + "/visaInterview/selectPassageWay", {}, res => {
        if (res.resultCode == "0000") {
          this.passageWayList = res.data.passageWayVoList;
        } else {
          this.requestError(res, this);
        }
      });*/
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
          this.companyAlias = data.companyAlias;
          this.loanNumber = res.data.busChannelConfirmInfoVo.jkCompact;
          this.mortgageNumber = res.data.busChannelConfirmInfoVo.dyCompact;
          this.transferNumber = res.data.busChannelConfirmInfoVo.thCompact;

        }else{
          this.requestError(res,this)
        }
      })
      let params = { bussNo: this.$route.query.bussNo };
      $.post(
        this._path + "/visaInterview/selectContractPreInfoByBussNo",
        params,
        res => {
          if (res.resultCode == "0000") {
            this.tableData = res.data.contractPreInfoVos;
          } else {
            this.requestError(res, this);
          }
        }
      );



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
      });

      $.post(
        this._path + "/visaInterview/selectBusNotarizationInfo",
        params,
        res => {
          if (res.resultCode == "0000") {
            this.dealBusNotarizationVo = res.data.dealBusNotarizationVo;
            this.accePtance = res.data.dealBusNotarizationVo.accePtance;
            if (!res.data.dealBusNotarizationVo.result) {
              res.data.dealBusNotarizationVo.result = "1";
            }
            // this.dealBusNotarizationVo.passagewayCode = '0';
            this.notarizationResult = res.data.dealBusNotarizationVo.result;
            // 拒绝原因的code
            this.fialCode = res.data.dealBusNotarizationVo.fialCode;
            // this.loanNumber = res.data.dealBusNotarizationVo.loanNumber;
            // this.mortgageNumber = res.data.dealBusNotarizationVo.mortgageNumber;
            // this.transferNumber = res.data.dealBusNotarizationVo.transferNumber;
            this.visaNumber = res.data.dealBusNotarizationVo.visaNumber;
            this.pledgeNumber = res.data.dealBusNotarizationVo.pledgeNumber;
            this.titleBol = res.data.isPass=='0'?false:true

          /*  $.post(this._path + "/custInfo/selectCustInfo", params, res => {
              if (res.resultCode == "0000") {
                this.busLoanInfoVoList = res.data.busLoanInfoVoList;
                for(let i = 0;i<this.busLoanInfoVoList.length;i++){
                  if(this.busLoanInfoVoList[i].custName == this.dealBusNotarizationVo.accName){
                    this.identityNo = this.busLoanInfoVoList[i].certNo
                  }
                }
                let paramsData = {
                  accountNo:this.dealBusNotarizationVo.account,
                  name:this.dealBusNotarizationVo.accName,
                  identityNo:this.identityNo,
                };
                if(!paramsData.accountNo||!paramsData.name||!paramsData.identityNo){
                  this.bankCardAuthentication = false;
                  return
                }
                $.post(this._path + "/business/bankCardAuthentication", paramsData, res => {
                  if (res.resultCode == "0000") {
                    // this.busLoanInfoVoList = res.data.busLoanInfoVoList;
                    if(!res.data.authResult){
                      this.bankCardAuthentication = false
                    }else{
                      this.bankCardAuthentication = true
                    }
                  } else {
                    this.requestError(res, this);
                  }
                });
              } else {
                this.requestError(res, this);
              }
            });*/
          } else {
            this.requestError(res, this);
          }
        }
      );

      // 放款通道值带入


      $.post(
        this._path + "/visaInterview/queryBussProductInfoByBussNo",
        params,
        res => {
          if (res.resultCode == "0000") {
            this.capitalOpinion = res.data.bussProductInfoVoList.capitalOpinion;
          } else {
            this.requestError(res, this);
          }
        }
      );
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
      bussTypeFn(val){
        if(val){
          if(val == '01'){
            val = '一抵'
          }else if(val == '02'){
            val = '二抵'
          }
          else if(val == '03'){
            val = '一抵转单'
          }else{
            val = '二抵转单'
          }
          return val
        }
      }
    }
  };
</script>
<style scoped>

</style>


