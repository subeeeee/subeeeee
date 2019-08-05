<template>
  <div class="firstCheck public">
    <h2>放款终审</h2>
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
    <!--<div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>借款人账户信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">户名</el-col>
        <el-col :span="9" class="table_td">
          {{accName}}&emsp;
        </el-col>
        <el-col :span="3" class="table_td">账号</el-col>
        <el-col :span="9" class="table_td">
          {{account}}&emsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">开户行</el-col>
        <el-col :span="9" class="table_td">
          {{accBank}}&emsp;
        </el-col>
        <el-col :span="3" class="table_td">银行预留手机号</el-col>
        <el-col :span="9" class="table_td">
          {{accMobile}}&emsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款人常用手机号</el-col>
        <el-col :span="9" class="table_td">
          {{useMobile}}&emsp;
        </el-col>
      </el-col>
    </el-row>-->
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
        <!--{{passagewayName}}-->
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
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="riskRemark" maxlength="1000"></textarea></div></el-col>
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
            {{trustPlan}}&nbsp;
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
            <el-select disabled  placeholder="请选择" v-model="dealBusNotarizationVo.accName" class="select_width" @change="custNameFn"  size='small'>
              <el-option v-for="item in busLoanInfoVoList" :key='item.custName' :label='item.custName' :value='item.custName'></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" @blur="ifaccount"  v-model="dealBusNotarizationVo.account"></el-input>
          </el-col>
          <el-col :span="9"></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small"  @blur="isaccBank" :maxlength="40"  v-model="dealBusNotarizationVo.accBank"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @blur="isaccMobile('1',dealBusNotarizationVo.accMobile)" v-model="dealBusNotarizationVo.accMobile"></el-input></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">借款人常用手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @blur="isaccMobile('2',dealBusNotarizationVo.useMobile)" v-model="dealBusNotarizationVo.useMobile"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">借款合同编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace('loanNumber')" maxlength="50" v-model="dealBusNotarizationVo.loanNumber"></el-input></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">抵押合同编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace('mortgageNumber')" maxlength="50" v-model="dealBusNotarizationVo.mortgageNumber"></el-input></el-col>
        </el-col>
        <el-col :span="4" class="table_td">债转协议编号</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input disabled size="small" @keyup.native="clearSpeace('transferNumber')" maxlength="50" v-model="dealBusNotarizationVo.transferNumber"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom"  :bussNo="$route.query.bussNo" dataType="1" taskType="312" :details="false"/>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>公证书影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col  class="table_td" :span="4" >借款公证书编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input disabled size='small' v-model="visaNumber" class="input_width_80"></el-input>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col  class="table_td" :span="4" >抵押公证书编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input disabled size='small' v-model="pledgeNumber" class="input_width_80"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="2" taskType="312" :details="false"/>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled class="textarea_disabled" :rows="10" v-model="notarizationRemake" maxlength="1000"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>进抵信息</span></h3>
    </div>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="3" taskType="312" :details="false"/>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="4" taskType="312" :details="false"/>






    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>他证影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col  class="table_td" :span="4" >抵押登记权证编号</el-col>
        <el-col  class="table_td" :span="6">
          <el-input disabled size='small' v-model="warrantNumber" class="input_width_80"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="5" taskType="312" :details="false"/>
    <div v-if="$route.query.inSurance =='1'">
      <div class="show_list_title">
        <h3><img src="./../../assets/task.png" class="listTitleImg"><span>贷前保相关影像</span></h3>
      </div>
      <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="6" taskType="312" :details="false"/>
    </div>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>放款终审意见</span></h3>
    </div>
    <!--<el-row class="module_margin_bottom ">
      <el-col :span="4" :offset="19">
        <packageData :gridList="gridData" :taskType="'312'" :custName="custName" :packageType="'02包'" v-if="currentUserPermissions.indexOf('business:loan:final:download') != -1" :bussNo="$route.query.bussNo" ></packageData>
      </el-col>
        </el-row>-->

    <picModule class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="6" taskType="312" :details="true"/>



    <p class="module_margin_bottom importent">如需重新生成（18文件和40文件），请退回“放款初审”，重新提交</p>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">放款初审是否同意该笔放款申请<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-radio-group v-model="isFirstAgree">
            <el-radio disabled :label="'1'">是</el-radio>
            <el-radio disabled :label="'0'">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isFirstAgree === '1'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款初审意见</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="loanFirstCheckOpinion" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr"  v-show="isFirstAgree === '0'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">放款初审拒绝原因</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="firstRefuseReason" class="textarea_disabled" disabled  maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">放款终审意见<i class="importent">*</i></el-col>
        <el-col :span="8" class="table_td">
          <el-radio-group v-model="isAgreement">
            <el-radio :label="'1'">同意放款初审意见</el-radio>
            <el-radio :label="'2'">打回放款初审修改</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-show="isAgreement == '2'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">打回说明<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="reject" placeholder="请输入打回说明" maxlength="200"></textarea></div></el-col>
        </el-col>
      </el-col>
      <!--<el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" v-show="isAgreement == '1'">
          <el-col :span="4" class="table_td textarea_title">放款终审意见<i class="importent">*</i></el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="loanLastCheckOpinion" placeholder="请输入放款终审意见，或其他备注信息" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>-->
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>打回记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="fromName"  label="任务员" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="打回时间"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回说明" ></el-table-column>
    </el-table>

    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>外网审批记录</span></h3>
    </div>
    <el-table :data="applyHistory" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="batNo"  label="申请编号" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="file18"  label="18文件名称" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime"  label="申请时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="status" label="审批结果" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="dealDesc" label="审批描述" min-width="300"></el-table-column>
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
        notarizationRemake:'',
        applyHistory:[],
        companyAlias:'',
        passageName:'',
        subAccount:'',
        trustPlan:'',
        riskRemark:'',
        busLoanInfoVoList:[],
        dealBusNotarizationVo:{},
        warrantNumber:'',
        visaNumber:'',
        pledgeNumber:'',
        firstRefuseReason:'',
        firstConclusion:'',
        isFirstAgree:'',
        isFirstAgreement:'',
        borrowerTable:[],
        isAgreement:'0',
        riskReault:'',
        reject:'',
        loanLastCheckOpinion:'',
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
        passagewayName:'',
        commonInfo:'',
        custIntRate:'',
        capitalIntRate:'',
        hqIntRate:'',
        branchIntRate:'',
        custServiceRate:'',
        capitalServiceRate:'',
        hqServiceRate:'',
        branchServiceRate:'',
        loanFirstCheckOpinion:'',
        proCode:'',
        dialogTableVisible:false,
        gridData:[{
          proCode:'',
          proName:'',
          size:''
        }],
        custName:'',

        accMobile:'',
        useMobile:'',
        finalEvaluation:'',
        maxAppAmount:'',
        maxAppTerm:'',
        loanMortgageRate:'',
        totalService:'',
        interestRate:'',
        insuranceService:'',
        serviceRate:'',
      }
    },
    methods: {
      notarizefn(name,name2){
        $('#' + name).slideToggle(200)
        $('#'+ name2).toggleClass('arrows_top')
      },
      getHis(){
        this.$http({
          url:'/loanFinalInfo/queryELog',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.applyHistory = res.data.busELogVOList
          }
        })
      },
      btnClick (type) {
        if(type == 'submit'){
          if(this.isAgreement == '2'){
            if(!this.reject){
              this.$message({
                type:'warning',
                message:'请填写打回原因!',
                duration:1500,
                showClose:1
              })
              return
            }
          }else{
            /*this.reject = '';
            if(!this.loanLastCheckOpinion){
              this.$message({
                type:'warning',
                message:'请填写放款终审意见!',
                duration:1500,
                showClose:1
              })
              return
            }*/
          }

        }
        let params = {
          approvalConclusion:this.riskReault,
          returnOpinion:this.isAgreement,
          returnExplain : this.reject,
          finalConclusion:this.loanLastCheckOpinion,
          bussNo:this.$route.query.bussNo,
          saveOrSubmit:type
        }
        let msg = ''
        if(type == 'submit'){
          msg = '提交成功'
        }
        else{
          msg = '保存成功'
        }
        if(type == 'submit'){
          this.$confirm('是否确认提交', '提示', {
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
            $.post(this._path + '/loanFinalInfo/busLoanFinalInfoSaveOrSubmit',params,res=>{
              loading.close();
              if(res.resultCode == '0000'){
                this.$message({
                  type:'success',
                  message:msg,
                  duration:1500,
                  showClose:1
                })
                if(type == 'submit'){
                  this.$router.push('/lastCheckList')
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
          $.post(this._path + '/loanFinalInfo/busLoanFinalInfoSaveOrSubmit',params,res=>{
            loading.close();
            if(res.resultCode == '0000'){
              this.$message({
                type:'success',
                message:msg,
                duration:1500,
                showClose:1
              })
              if(type == 'submit'){
                this.$router.push('/lastCheckList')
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
      queryBaseInfo () {






        // 放款终审意见
        $.post(this._path + "/loanFinalInfo/selectLoanFinalInfo",{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            /*if(res.data.isAgree){
              this.isAgreement = res.data.isAgree ?this.isAgreement : '0'
            }else{
              this.isAgreement = '1'
            }*/
            this.firstRefuseReason = res.data.firstRefuseReason;
            this.isAgreement = res.data.returnOpinion;
            this.isFirstAgree = res.data.isFirstAgree;
            this.riskReault = res.data.approvalConclusion;
            this.riskRemark = res.data.riskRemark;
            this.reject = res.data.returnExplain;
            this.loanLastCheckOpinion = res.data.finalConclusion;
            this.loanFirstCheckOpinion = res.data.firstConclusion
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
        $.post(this._path + '/busPassageConfirm/selectBusPassageConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.passageName = res.data.busPassageConfirmVO.passageName;
            this.subAccount = res.data.busPassageConfirmVO.subAccountName;
            this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
          }else{
            this.requestError(res,this)
          }
        });
        $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){

            this.companyAlias = res.data.busChannelConfirmInfoVo.companyAlias;
          }else{
            this.requestError(res,this)
          }
        })
        // 借款人账户信息
        $.post(this._path + '/visaInterview/selectBusNotarizationInfo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.accName = res.data.dealBusNotarizationVo.accName;
            this.accBank = res.data.dealBusNotarizationVo.accBank;
            this.account = res.data.dealBusNotarizationVo.account;
            // this.passagewayName = res.data.dealBusNotarizationVo.passagewayName;

            this.useMobile = res.data.dealBusNotarizationVo.useMobile;
            this.accMobile = res.data.dealBusNotarizationVo.accMobile;
          }else{
            this.requestError(res,this)
          }
        })
        // 抵押物信息
        $.post(this._path + '/guaInfo/selectGuaInfo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.ownershipNo  = res.data.guaInfoVo.ownershipNo;
            this.address = res.data.guaInfoVo.guaAddress + res.data.guaInfoVo.guaBuilding + res.data.guaInfoVo.guaNumber;
            this.guaArea = res.data.guaInfoVo.guaArea;
            this.determinationValue = res.data.guaInfoVo.determinationValue;
          }else{
            this.requestError(res,this)
          }
        })
        // 借款信息
        $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
          if (res.resultCode == "0000") {
            this.proCode = res.data.contractPreInfoVos.proCode;
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

            //资料包
            this.$set(this.gridData[0],'proName',this.proName);
            this.$set(this.gridData[0],'proCode',this.proCode);
            this.custName = res.data.contractPreInfoVos.custName
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
        })
      }
    },
    created () {
      this.querynotarytionInfo();
      this.queryarrivalInfo();
      this.getHis();
      this.queryBaseInfo();

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
