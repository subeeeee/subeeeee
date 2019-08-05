<template>
  <div class="firstCheck public">
    <h2>放款初审</h2>
    <el-row class="module_margin_bottom bussNo">
      <el-col :span="2">订单编号:</el-col>
      <el-col :span="2">{{$route.query.bussNo}}</el-col>
      <!-- <el-col :span="3" :offset="17"><el-button size="small">查看风控终审信息</el-button> </el-col> -->
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款人信息</span></h3>
    </div>
    <el-table class="module_margin_bottom" border stripe :data="borrowerTable" style="width: 100%">
      <el-table-column header-align="center" align="center"  label="关系">
        <template slot-scope="scope">
          <p v-if="scope.row.relType == '主借款人'">房屋所有权人：{{scope.row.relType}}</p>
          <p v-if="scope.row.relType != '主借款人'">{{scope.row.relType}}：{{scope.row.relName}}{{scope.row.relationship}}</p>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名"></el-table-column>
      <el-table-column header-align="center" align="center" prop="certNo" label="身份证号" ></el-table-column>
      <!--<el-table-column prop="mobile" label="联系电话"></el-table-column>-->
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>抵押物信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证号</el-col>
        <el-col :span="21" class="table_td">
          {{ownershipNo}}
        </el-col>
      </el-col>
      <mutual-cert ref="mutualCert" :disabled="true"></mutual-cert>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押物坐落</el-col>
        <el-col :span="21" class="table_td">
          {{address}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建筑面积(m²)</el-col>
        <el-col :span="9" class="table_td">
          {{guaArea}}
        </el-col>
        <el-col :span="3" class="table_td">抵押物评估终值(万元)</el-col>
        <el-col :span="9" class="table_td">
          {{finalEvaluation}}
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">产品类型</el-col>
        <el-col :span="7" class="table_td">
          {{proName}}
        </el-col>
        <el-col :span="5" class="table_td"></el-col>
        <!--<el-col :span="5" class="table_td">放款通道</el-col>-->
        <!--<el-col :span="7" class="table_td">-->
        <!--{{passageName}}-->
        <!--</el-col>-->
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">借款金额(万元)</el-col>
        <el-col :span="7" class="table_td">
          {{amount}}
        </el-col>
        <el-col :span="5" class="table_td">借款期限(月)</el-col>
        <el-col :span="7" class="table_td">
          {{term}}
        </el-col>
      </el-col>
    </el-row>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">综合抵押率(%)</el-col>
        <el-col :span="5" class="table_td">月利率(%)</el-col>
        <el-col :span="5" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="5" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="5" class="table_td">合计费率(%)</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">{{loanMortgageRate}}</el-col>
        <el-col :span="5" class="table_td">{{interestRate}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{insuranceService}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{serviceRate}}&emsp;</el-col>
        <el-col :span="5" class="table_td">{{totalService}}&emsp;</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>风控审批结论</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="24" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="riskReault" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="riskRemark"  class="textarea_disabled" disabled maxlength="1000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>公证信息</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo table_height">
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
            <el-select  disabled placeholder="请选择" v-model="dealBusNotarizationVo.accName" class="select_width" @change="custNameFn"  size='small'>
              <el-option v-for="item in busLoanInfoVoList" :key='item.custName' :label='item.custName' :value='item.custName'></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.accName">请选择</el-col>
        </el-col>
        <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" v-model="dealBusNotarizationVo.account" @keyup.native="clearSpeace('account')" @blur="checkErrorshow('account')"></el-input>
          </el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.account">请填写</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small"  @keyup.native="clearSpeace('accBank')"  @blur="checkErrorshow('accBank')" :maxlength="40"  v-model="dealBusNotarizationVo.accBank"></el-input></el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.accBank">请填写</el-col>
        </el-col>
        <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small"   @keyup.native="clearSpeace('accMobile')"  @blur="checkErrorshow('accMobile')" v-model="dealBusNotarizationVo.accMobile"></el-input></el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.accMobile">请填写</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">借款人常用手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace('useMobile')" @blur="checkErrorshow('useMobile')" v-model="dealBusNotarizationVo.useMobile"></el-input></el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.useMobile">请填写</el-col>
        </el-col>
        <el-col :span="4" class="table_td">借款合同编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('loanNumber')" @blur="checkErrorshow('loanNumber')" maxlength="50" v-model="dealBusNotarizationVo.loanNumber"></el-input></el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.loanNumber">请填写</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">抵押合同编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('mortgageNumber')" @blur="checkErrorshow('mortgageNumber')" maxlength="50" v-model="dealBusNotarizationVo.mortgageNumber"></el-input></el-col>
          <el-col :span="9" class="redtips"  v-show="errorShow.mortgageNumber">请填写</el-col>
        </el-col>
        <el-col :span="4" class="table_td">债转协议编号</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small" disabled @keyup.native="clearSpeace('transferNumber')" @blur="checkErrorshow('transferNumber')" maxlength="50" v-model="dealBusNotarizationVo.transferNumber"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom"  :bussNo="$route.query.bussNo" dataType="1" taskType="310"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>公证书影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col  class="table_td" :span="4" >借款公证书编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input size='small' v-model="visaNumber" :maxlength="30" class="input_width_80"></el-input>
        </el-col>
        <el-col  class="table_td" :span="4" >抵押公证书编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input size='small' v-model="pledgeNumber" :maxlength="30" class="input_width_80"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="2" taskType="310"/>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  class="textarea_disabled" disabled :rows="10" v-model="notarizationRemake" maxlength="1000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>进抵信息</span></h3>
    </div>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="3" taskType="310" :details="false"/>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="4" taskType="310"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>他证影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col  class="table_td" :span="4" >抵押登记权证编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input size='small' v-model="warrantNumber" class="input_width_80"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="5" taskType="310"/>

    <div v-if="$route.query.inSurance =='1'">
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>贷前保相关影像</span></h3>
      </div>
      <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="6" taskType="310"/>
    </div>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款初审意见</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">是否同意该笔放款申请<i class="importent">*</i></el-col>
        <el-col :span="16" class="table_td">
          <el-radio-group v-model="isAgreement">
            <el-radio :label="'1'">同意</el-radio>
            <el-radio :label="'0'">不同意</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isAgreement == '0'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">拒绝原因<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="reject" placeholder="请说明拒绝原因 " maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isAgreement == '1'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款初审意见<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="loanFirstCheckOpinion" placeholder="请输入放款初审意见。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>打回记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="fromName"  label="任务员" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="打回时间"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回说明" ></el-table-column>
    </el-table>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="btnClick('save')">保存</el-button></li>
        <li class="last_btn"><el-button type="primary" @click="btnClick('submit')">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import './../style/firstCheck.css'
  import MutualCert from "../../com/mutualCert";
  export default {
    components: {MutualCert},
    name:'',
    data () {
      return {
        tableData:[],
        clearSpeace(str){
          this.$set(this.dealBusNotarizationVo,str,this._utils.clearSpeace(this.dealBusNotarizationVo[str]))
        },
        companyAlias:'',
        notarizationRemake:'',
        riskRemark:'',
        busLoanInfoVoList:[],
        dealBusNotarizationVo:{},
        warrantNumber:'',
        visaNumber:'',
        pledgeNumber:'',
        borrowerTable:[],
        isAgreement:'0',
        riskReault:'',
        reject:'',
        loanFirstCheckOpinion:'',
        accName:'',
        accBank:'',
        account:'',
        ownershipNo:'',
        guaArea:'',
        loanAmount:'',
        proName:'',
        term:'',
        bond:'',
        amount:'',
        address:'',
        determinationValue:'',
        passageName:'',
        subAccount:"",
        trustPlan:"",
        commonInfo:'',
        custIntRate:'',
        capitalIntRate:'',
        hqIntRate:'',
        branchIntRate:'',
        custServiceRate:'',
        capitalServiceRate:'',
        hqServiceRate:'',
        branchServiceRate:'',

        accMobile:'',
        useMobile:'',
        finalEvaluation:'',
        maxAppAmount:'',
        maxAppTerm:'',
        loanMortgageRate:'',
        totalService:'',
        interestRate:'',
        serviceRate:'',
        notarizationMaterials:'',//公证材料
        jindiMaterial:'', //进抵材料
        errorShow:{
          accName:false,
          account:false,
          accBank:false,
          accMobile:false,
          useMobile:false,
          loanNumber:false,
          mortgageNumber:false,
        }
      }
    },
    methods: {
      notarizefn(name,name2){
        $('#' + name).slideToggle(200)
        $('#'+ name2).toggleClass('arrows_top')
      },
      mustWrite () {
        if(!this.dealBusNotarizationVo.accName){
          this.$message.warning('请选择户名');
          this.errorShow.accName = true;
          return false
        }
        if(!this.dealBusNotarizationVo.account){
          this.$message.warning('请填写账号');
          this.errorShow.account = true;
          return false
        }
        if(!this.dealBusNotarizationVo.accBank){
          this.$message.warning('请填写开户行');
          this.errorShow.accBank = true;
          return false
        }
        if(!this.dealBusNotarizationVo.accMobile){
          this.$message.warning('请填写银行预留手机号');
          this.errorShow.accMobile = true;
          return false
        }
        if(!this.dealBusNotarizationVo.useMobile){
          this.$message.warning('请填写借款人常用手机号');
          this.errorShow.useMobile = true;
          return false
        }
        if(!this.dealBusNotarizationVo.loanNumber){
          this.$message.warning('请填写借款合同编号');
          this.errorShow.loanNumber = true;
          return false
        }
        if(!this.dealBusNotarizationVo.mortgageNumber){
          this.$message.warning('请填写抵押合同编号');
          this.errorShow.mortgageNumber = true;
          return false
        }
        if(this.isAgreement == '0'){
          if(!this.reject){
            this.$message.warning('请填写拒绝原因');
            return false
          }
        }else if(this.isAgreement == '1'){
          if(!this.loanFirstCheckOpinion){
            this.$message.warning('请填写放款初审意见');
            return false
          }
        }
        return true
      },
      checkErrorshow (name) {
        if(this.dealBusNotarizationVo[name]){
          this.errorShow[name] = false
        }else{
          this.errorShow[name] = true
        }
      },
      btnClick (type) {


        let str = '';

        switch (this.isAgreement){
          case '1':
            str  = this.loanFirstCheckOpinion;
            break;
          case '2':
            str  = this.notarizationMaterials;
            break;
          case '3':
            str  = this.jindiMaterial;
            break
        }
        let params = {
          approvalConclusion:this.riskReault,
          isAgree:this.isAgreement,
          refuseReason : this.reject,
          firstConclusion:str,
          bussNo:this.$route.query.bussNo,
          saveOrSubmit:type,
          warrantNumber:this.warrantNumber,
          visaNumber:this.visaNumber,
          pledgeNumber:this.pledgeNumber,
          loanNumber:this.dealBusNotarizationVo.loanNumber,
          mortgageNumber:this.dealBusNotarizationVo.mortgageNumber,
          transferNumber:this.dealBusNotarizationVo.transferNumber,
          result:1
        }
        let msg = '';
        if(type == 'submit'){
          if(!this.mustWrite()){
            return
          }
          msg = '提交成功'
        }
        else{
          msg = '保存成功'
        }
        if(type == 'submit'){
          this.$confirm('是否确认提交！', '提示', {
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
            $.post(this._path + '/loanFirstInfo/busLoanFirstInfoSaveOrSubmit',params,res=>{
              loading.close();
              if(res.resultCode == '0000'){
                this.$message({
                  type:'success',
                  message:msg,
                  duration:1500,
                  showClose:1
                })
                if(type == 'submit'){
                  this.$router.push('/firstCheckList')
                }
              }else{
                this.requestError(res,this)
              }
            })
          })
        }else{
          let loading = this.$loading({
            lock: true,
            text: "正在加载...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          $.post(this._path + '/loanFirstInfo/busLoanFirstInfoSaveOrSubmit',params,res=>{
            loading.close();
            if(res.resultCode == '0000'){
              this.$message({
                type:'success',
                message:msg,
                duration:1500,
                showClose:1
              });
              if(type == 'submit'){
                this.$router.push('/firstCheckList')
              }
            }else{
              this.requestError(res,this)
            }
          })
        }
      },
      querynotarytionInfo (){
        let params = { bussNo: this.$route.query.bussNo };
        $.post(this._path + "/visaInterview/selectBusNotarizationInfo", params, res => {
          if (res.resultCode == "0000") {
            this.dealBusNotarizationVo = res.data.dealBusNotarizationVo;
            this.notarizationRemake = res.data.dealBusNotarizationVo.remark;
            this.visaNumber = res.data.dealBusNotarizationVo.visaNumber;
            this.pledgeNumber = res.data.dealBusNotarizationVo.pledgeNumber;

          }
        })
      },
      queryarrivalInfo (){
        let params = { bussNo: this.$route.query.bussNo };
        $.post(this._path + "/busArrivalInfo/busArrivalInfo", params, res => {
          if (res.resultCode == "0000") {
            this.warrantNumber = res.data.arrivalInfoVo.warrantNumber;

          }
        })
      },
      querybaseinfo(){
        // 放款初审意见
        $.post(this._path + "/loanFirstInfo/selectLoanFirstInfo",{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            if(res.data.isAgree){
              this.isAgreement = res.data.isAgree
            }else{
              this.isAgreement = '1'
            }
            this.riskReault = res.data.approvalConclusion;
            this.riskRemark = res.data.riskRemark;
            this.reject = res.data.refuseReason;
            if(this.isAgreement == '1'){
              this.loanFirstCheckOpinion = res.data.firstConclusion;
            }else if(this.isAgreement == '2'){
              this.notarizationMaterials = res.data.firstConclusion; // 公证材料
            }else if(this.isAgreement == '3'){
              this.jindiMaterial = res.data.firstConclusion //进抵材料
            }
          }else{
            this.requestError(res,this)
          }
        })
        // 借款人信息
        $.post(this._path + '/custInfo/selectCustInfo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.borrowerTable = res.data.busLoanInfoVoList
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
            this.passageName = res.data.busPassageConfirmVO.passageName;
            this.subAccount = res.data.busPassageConfirmVO.subAccountName;
            this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
          }
        });
        $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            this.companyAlias = res.data.busChannelConfirmInfoVo.companyAlias;
          }else{
            this.requestError(res,this)
          }
        })
        // 抵押物信息
        $.post(this._path + '/guaInfo/selectGuaInfo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.ownershipNo  = res.data.guaInfoVo.ownershipNo;
            this.address = res.data.guaInfoVo.guaAddress + res.data.guaInfoVo.guaBuilding  + res.data.guaInfoVo.guaNumber ;
            this.guaArea = res.data.guaInfoVo.guaArea;
            this.determinationValue = res.data.guaInfoVo.determinationValue;


          }else{
            this.requestError(res,this)
          }
        })
        // 借款信息
        $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.proName = res.data.contractPreInfoVos.proName;
            this.term = res.data.contractPreInfoVos.term;
            this.bond = res.data.contractPreInfoVos.bond;
            this.amount = res.data.contractPreInfoVos.amount;
            this.loanAmount = res.data.contractPreInfoVos.loanAmount;

            this.maxAppAmount = res.data.contractPreInfoVos.maxAppAmount;
            this.maxAppTerm = res.data.contractPreInfoVos.maxAppTerm;
            this.totalService = res.data.contractPreInfoVos.totalService;
            this.loanMortgageRate = res.data.contractPreInfoVos.loanMortgageRate;
            this.insuranceService = res.data.contractPreInfoVos.insuranceService;
            this.interestRate = res.data.contractPreInfoVos.interestRate;
            this.serviceRate = res.data.contractPreInfoVos.serviceRate;
            this.finalEvaluation = res.data.contractPreInfoVos.finalEvaluation;

          }else{
            this.requestError(res,this)
          }
        })
        // 共有情况
        $.post(this._path + '/guaInfo/selectHouseOwenByBussNo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            let owener = '',scale = '';

            let arr = res.data.houseOwershipVoList;
            for(let i = 0,j = arr.length;i < j;i++){
              if(i == j - 1){
                owener = owener + arr[i].owenName;
                scale = scale + arr[i].scale;
              }else{
                owener = owener + arr[i].owenName + ':';
                scale = scale + arr[i].scale + ':';
              }
            }
            this.commonInfo = owener + ',' + scale

          }else{
            this.requestError(res,this)
          }
        });
      }

    },
    created () {
      this.querynotarytionInfo();
      this.queryarrivalInfo();
      this.querybaseinfo();
      this.$http({
        url:"/loanFinalInfo/queryBusOpinionFlow",
        data:{bussNo:this.$route.query.bussNo,fromType:'312'},
        callback:res=>{
          this.tableData = res.data.busOpinionFlowVOList
        }
      })
    },
  }
</script>
