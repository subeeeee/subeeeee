<template>
  <div class="putInPoint public" >
    <h2>合同准备</h2>
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
        <el-col class="table_td" :span="18">{{custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>
    <el-tabs v-model="approveActive" :value="0" @tab-click="tabClick" type="card">
      <el-tab-pane v-for="(item, index) in approveVerdicts" :key="index" :label="item.proName" :name="index">
      </el-tab-pane>
    </el-tabs>
    <el-row class="module_margin_bottom tableInfo" v-for="(item, index) in approveVerdicts" v-show="index == approveActive">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">产品类型<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.proName}}
        </el-col>
        <el-col :span="4" class="table_td">最高批贷金额(万元)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.maxAppAmount}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">最高批贷期限(月)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.maxAppTerm}}
        </el-col>
        <el-col :span="4" class="table_td">月利率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.interest}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">年化保险费率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.insuranceService}}
        </el-col>
        <el-col :span="4" class="table_td">年化服务费率(%)<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.serviceCharge}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">审批意见<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          {{item.approvalResult}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">审批信息<span class="importent">*</span></el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.capitalOpinion" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注<span class="importent">*</span></el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.remark" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
    </el-row>

    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>合同准备</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">产品类型<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="proCode" :disabled="reCheck" placeholder="请选择" class="select_width"  size='small' @change="chooseProType">
              <el-option v-for="item in proArr" :key="item.proCode" :label="item.proName" :value="item.proCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9"></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款金额(万元)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <!--:placeholder="'请输入'+ minAmount + '~'+ maxAmount+'的金额'"-->
            <el-input v-model="amount" size="small" :disabled="reCheck" @blur="count('借款金额')" @change="requiredFields()" :placeholder="'请输入借款金额（例如：123）'"></el-input>
          </el-col>
          <el-col :span="9" v-if="isShowCountError" class="importent">请完善信息!</el-col>
        </el-col>
        <el-col :span="3" class="table_td">借款期限(月)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select v-model="term" :disabled="reCheck" @change="verification('term')" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in termList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" v-if="termBol" class="importent">请完善信息!</el-col>
        </el-col>
      </el-col>
    </el-row>
    <p v-if="amountShow" style="color: red;margin-bottom: 10px">预计月最高还息：{{monthMaxInterest}}元（请保证还款代扣银行卡扣款单笔限额充足）</p>
    <div class="show_list_title">
      <h3>
        <card-limit v-if="amountShow" :bussNo="$route.query.bussNo"></card-limit>
        <img src="./../../assets/message.png" class="listTitleImg"><span>客户放款银行卡信息</span>
      </h3>
    </div>
    <!--<p class="importent" v-if="!bankCardAuthentication">银行三要素验证失败</p>-->
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">户名<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select   placeholder="请选择" :disabled="reCheck" v-model="accName" class="select_width" @change="custNameFn"  size='small'>
              <el-option v-for="item in busLoanInfoVoList" :key='item.custName' :label='item.custName' :value='item.custName'></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" v-if="accNameBol" class="importent">请完善信息!</el-col>
        </el-col>
        <el-col :span="4" class="table_td">账号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" :disabled="reCheck" @blur="verification('account')" @keyup.native="clearNum('account')" v-model="account"></el-input>
          </el-col>
          <el-col :span="9" v-if="accountBol" class="importent">请完善信息!</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">开户行<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input :disabled="reCheck" size="small" :maxlength="40" @blur="verification('accBank')" v-model="accBank"></el-input></el-col>
          <el-col :span="9" v-if="accBankBol" class="importent">请完善信息!</el-col>
        </el-col>
        <el-col :span="4" class="table_td">银行预留手机号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input :disabled="reCheck" size="small" @blur="verification('accMobile')" :maxlength="11" v-model="accMobile"></el-input></el-col>
          <el-col :span="9" v-if="accMobileBol" class="importent">请完善信息!</el-col>
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">银行简称<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input :disabled="reCheck" size="small" :maxlength="20" @blur="checkMust('bankName')" v-model="bankName"></el-input></el-col>
          <el-col :span="9" v-if="errorShow.bankName" class="importent">请输入银行简称!</el-col>
        </el-col>
        <el-col :span="4" class="table_td">支行地址<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input :disabled="reCheck" size="small" @blur="checkMust('bankAdress')" :maxlength="60" v-model="bankAdress"></el-input></el-col>
          <el-col :span="9" v-if="errorShow.bankAdress" class="importent">请输入支行地址!</el-col>
        </el-col>
      </el-col>
    </el-row>
    <!--图片-->
    <picModule dataType="1" :bussNo="$route.query.bussNo"  taskType="210"  />
    <br/>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>预约公证</span></h3>
    </div>
    <p class="error_title" style="line-height: 20px; background: yellow;">请在公证前务必保证以下资料齐全，否则无法公证。</p> <br/>
    <el-row>
      <el-col :span="24">
        <el-col :span="7" :offset="1" class="bg_title">
          <h3>证件类</h3>
          <p> 1.身份证原件及复印件</p>
          <p> 2.户口本原件及复印件</p>
          <p> 3.婚姻证明原件及复印件</p>
          <p> 4.房产证原件及复印件</p>
          <p> 5.央行征信原件</p>
          <p> 6.购房合同原件</p>
        </el-col>
        <el-col :span="7" :offset="1" class="bg_title">
          <h3>下户签署文件</h3>
          <p> 1.个人借款申请表（1份）</p>
          <p> 2.个人信息授权书（2份/人）</p>
          <p> 3.下户面谈笔录（1份）</p>
          <p> 4.婚姻状况说明书（1份/人）</p>
          <p> 5.借款用途承诺书（1份/人）</p>
          <p> 6.未出租声明/承租人承诺书（1份）</p>
          <p> 7.查勘表</p>
        </el-col>
        <el-col :span="7" :offset="1" class="bg_title">
          <h3>备用房资料
            <el-tooltip placement="top">
              <div slot="content" style="width: 400px">备用房、保证住所要求<br/>备用房：借款人夫妻双方名下除本次抵押房产以外的其他可居住型房产（备用房可以是全国范围内）；
                保证住所（第二居所）：为借款人以外的第三者提供可居住型保障居住型房产（要求提供第三者身份证、房产证等复印件）并签署保证住所提供人承诺。</div>
              <el-button class="tooltip">!</el-button>
            </el-tooltip>
          </h3>
          <p> 备用房房产证复印件（1份）</p><br>
          <h3>如果无备用房，请提供保证住所材料：</h3><br>
          <p> 1.保证住所提供人承诺（2份）</p>
          <p> 2.保证住所提供人身份证复印件（1份）</p>
          <p> 3.保证住所房产证复印件（1份）</p>
        </el-col>
      </el-col>
    </el-row>
    <br/>
    <el-row v-if="isCityShow" class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">预约时间<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select   placeholder="请选择日期" v-model="timestamp" class="select_width" @change="appointmentTimeFn"  size='small'>
              <el-option v-for="item in appointmentTimeList" :key='index' :label='item.date' :value='JSON.stringify(item.timeList)'></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" v-if="timestampBol" class="importent">请完善信息!</el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row v-if="isCityShow">
      <el-col v-if="timestamp" :span="5" :offset="1"  class="make" :class="makeConditionNative == (index+'')?'makeConditionNative':''"  v-for="(item,index) in makeCondition">
        <div @click="makeConditionFn(index,item)" class="mackNative" :class="item.num == 0?'make_div':''">
          {{item.time}} <br> {{item.num == '0'?'已约满': '可约' + item.num + '单'}}
        </div>
      </el-col>
    </el-row>
    <br/>
    <div v-if="isCityShow" class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>联系人信息</span></h3>
    </div>
    <el-row v-if="isCityShow" class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" @blur="verification('contactName')" placeholder="请输入渠道方跟进此订单的联系人" :maxlength="10" v-model="contactName"></el-input>
          </el-col>
          <el-col :span="9" v-if="contactNameBol" class="importent">请完善信息!</el-col>
        </el-col>
        <el-col :span="4" class="table_td">联系方式<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" @blur="contactMobileFn('contactMobile')" @keyup.native="clearNum('contactMobile')" placeholder="请输入联系方式" :maxlength="11" v-model="contactMobile"></el-input>
          </el-col>
          <el-col :span="9" v-if="contactMobileBol" class="importent">请完善信息!</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea placeholder="可补充预约公证相关事项"  v-model="remark" :rows="5" ></textarea></div></el-col>
      </el-col>
    </el-row>
    <p class="error_title"  style="line-height: 20px;background: yellow" v-if="isCityShow">借款金额和期限审核通过后不可修改，提交前请核对借款金额和借款期限</p> <br/>
    <el-col :offset="11" :span="2"><el-button class="bottom_condition_btn" size="small" @click="btncilck('submit')">提 交</el-button></el-col>


    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
     <div>
       <el-row style="margin: 0 auto;width:90%;line-height:30px">
         <el-col :span="24" style="margin-bottom: 10px" v-if="!reCheck||!isCityShow">
           <el-col :span="4" :offset="5" style="text-align: right">借款金额:</el-col>
           <el-col :span="12" :offset="1" style="text-align: left">{{amount}} 万元</el-col>
         </el-col>
         <el-col :span="24" style="margin-bottom: 10px" v-if="!reCheck||!isCityShow">
           <el-col :span="4" :offset="5" style="text-align: right">借款期限:</el-col>
           <el-col :span="12" :offset="1" style="text-align: left">{{term}} 月</el-col>
         </el-col>
         <el-col :span="24" style="margin-bottom: 10px" v-if="isCityShow">
           <el-col :span="4" :offset="5" style="text-align: right">预约公证时间:</el-col>
           <el-col :span="12" :offset="1" style="text-align: left">{{_utils.timestampToTime(this.interviewTime)}}</el-col>
         </el-col>
         <p style="margin-bottom: 10px;color: red;text-align: center" v-if="isCityShow&&reCheck"> 请核对预约时间是否正确？</p>
         <p style="margin-bottom: 10px;color: red;text-align: center" v-if="!(reCheck&&isCityShow)">借款金额和期限审核通过后不可修改 ,请核对以上信息是否正确？ </p>
         <p style="margin-bottom: 10px;color: red;text-align: center" v-if="noteBol">请校验以上信息无误后，并输入短信验证码</p>
         <el-col :span="24" style="margin-bottom: 10px" v-if="noteBol">
           <el-col :span="5" :offset="4" style="text-align: right">银行预留手机号:</el-col>
           <el-col :span="12" :offset="1" style="text-align: left">{{accMobile | accMobileFilter}}</el-col>
         </el-col>
         <el-col :span="24" style="margin-bottom: 10px" v-if="noteBol">
           <el-col :span="7" :offset="4" style="text-align: right">
             <el-input size="small" :maxlength="6" @keyup.native="verificationNumber" placeholder="请输入验证码" v-model="verificationCode"></el-input>
           </el-col>
           <el-col :span="5" :offset="1" style="text-align: left">
             <el-button size="small" :disabled="verificationNum != 60"  @click="ajaxverificationCodeFn">{{verificationCodeName}}</el-button>
           </el-col>
         </el-col>
       </el-row>
     </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
  import CardLimit from "../../component/com/CardLimit";

  export default {
    components: {CardLimit},
    name:'putInPoint',
    data () {
      return {
        verificationNum:60,
        verificationCodeName:'获取验证码',
        verificationCode:"",
        noteBol:false,
        dialogVisible:false,
        contactMobile:"",
        contactMobileBol:false,
        contactName:"",
        contactNameBol:false,
        makeConditionNative:"",
        timestamp:"",
        timestampBol:false,
        accName:"",
        errorShow:{
          bankName:false,
          bankAdress:false,
        },
        account:"",
        accBank:"",
        accMobile:"",
        bankName:"",
        bankAdress:"",
        accountBol:false,
        accNameBol:false,
        accBankBol:false,
        accMobileBol:false,
        termBol:false,
        identityNo:"",
        bankCardAuthentication:false,
        makeCondition:[{time:'12312',num:'1'},{time:'12312',num:'2'},{time:'1232',num:'56'},{time:'1232',num:'0'}],
        isCityShow:true,

        approveActive:"0",
        mounthArr:['1','2','3','4','5','6','7','8','9','10','11','12'],
        //预约面签时间列表
        appointmentTimeList:[{timeStr:'123',timestamp:123124123}],
        isShowBondError:false,
        isShowCountError:false,
        amount:'',
        bond:'',
        loanAmount:'',
        term:'',
        interest:'',
        serviceCharge:'',
        brancheInterestRate:'',
        brancheServiceRate:'',
        approveVerdicts:[],
        proCode:'',
        proArr:[],
        custName:'',
        // mouth:[],
        appointmentTime:'',
        maxAmount : '',
        amountBol:false,
        brancheRateBol:false,
        serviceRateBol:false,
        minAmount:'',
        cityCode:'',
        termList:[],
        remark:'',
        appointTime:"",
        reCheck:false,
        interviewTime:"",
        numTime:null,
        serialNo:'123123',
        boHai:false,
        outTradeNo:"",
        trustProjectCode:'',
        smsSeq:'',
        passageBol:true,
        amountShow:false,
        monthMaxInterest:'',
      }
    },
    filters: {
      filterNull (val) {
        if(val == 'null'){
          return '0.000'
        }
        return val
      },
      accMobileFilter(val){
        return val.replace(/(\d{3})\d*(\d{4})/,'$1****$2');
      }
    },
    computed: {
      totalRate() {
        if(!/^\d{0,}\.?\d{0,}$/.test(this.brancheInterestRate)||!/^\d{0,}\.?\d{0,}$/.test(this.brancheServiceRate)){
          return ''
        }
        let b = this.interest * 1 + this.serviceCharge * 1 + this.brancheInterestRate * 1 + this.brancheServiceRate * 1
        let c = b.toFixed(3);
        return c==='NaN'?0:c;
      }
    },
    methods: {
      verificationNumber(){
        this.verificationCode = this.verificationCode.replace(/[^0-9]/g,'')
      },
      ajaxverificationCodeFn(){
        if(this.verificationNum !== 60){
          return
        }
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        let path = '',data={
          bussNo:this.$route.query.bussNo,
          account:this.account,
          proCode:this.proCode,
        };
        if(this.boHai){
          path = '/capitalSale/isNeedSigning';
          let custNo = '';
          for(let i = 0;i<this.busLoanInfoVoList.length;i++){
            if(this.busLoanInfoVoList[i].custName == this.accName){
              custNo = this.busLoanInfoVoList[i].id
            }
          }
          data.mobile = this.accMobile;
          data.bankName = this.accBank;
          data.custNo = custNo;
        }else{
          path = '/capitalSale/refreshMsgCode';
          data.reqSerialNo = this.serialNo;
        }
        //
        this.$http({
          url:path,
          data:data,
          callback:res=>{
            loading.close();
            if(res.data.ifSend == '01'){
              this.$message.success('发送成功请稍后');
              this.verificationCodeFn();
            }else{
              this.$message.error('发送失败请重试')
            }
            this.serialNo = res.data.serialNo
          },
          callback9999:res=>{
            this.$message.error(res.resultMsg);
          },
          callback1234:res=>{
            loading.close();
            this.$message.error(res.resultMsg);
            this.$router.push('/contractPreparingList')
          }
        });

      },
      verificationCodeFn(){
        // 点击获取验证码
        clearInterval(this.numTime)
        if(this.verificationNum === 60){
          this.numTime = setInterval(()=>{
            if(this.verificationNum === 0){
              this.verificationNum = 60;
              this.verificationCodeName = '获取验证码';
              clearInterval(this.numTime)
            }else{
              this.verificationNum--;
              this.verificationCodeName = `重新获取（${this.verificationNum}s）`
            }
          },1000)
        }
      },
      contactMobileFn(str){
        // contactMobile
        if(!this[str]){
          this[str + 'Bol'] = true
        }else{
          this[str + 'Bol'] = false
        }
        if(str == 'contactMobile'){
          if(this[str].length != '11'){
            this[str + 'Bol'] = true
          }else{
            this[str + 'Bol'] = false
          }
        }
      },
      makeConditionFn(index,item){
        if(item.num != '0'){
          this.makeConditionNative = index;
          this.interviewTime = item.timestamp
        }
      },
      appointmentTimeFn(type){
        !this.timestamp?this.timestampBol = true:this.timestampBol = false;
        if(!this.timestampBol){
          //发请求
          if(type == '1'){
            return
          }
          $.post(this._path + "/visaInterview/getAppointmentNum", {cityCode:this.cityCode,timeListStr:this.timestamp}, res => {
            if (res.resultCode == "0000") {
              this.makeConditionNative = '';
              this.interviewTime = '';
              this.makeCondition = res.data.appointmentNumDTOList
            } else {
              this.requestError(res, this);
            }
          });
        }
      },
      clearNum(str){
        this[str] = this[str].replace(/[^0-9]/g,'')
      },
      checkMust(name){
        switch (name){
          case "":
            break;
          default:
            if(!this[name]){
              this.errorShow[name] = true;
            }else{
              this.errorShow[name] = false
            }
        }
      },
      verification(str,i){
        this[str + "Bol"] = !this[str]? true:false;
        if(str == 'accMobile'){
          if(!this._utils.isMobile(this[str])){
            this[str + "Bol"] = true
          }else{
            this[str + "Bol"] = false
          }
        }
        if(!i){
          if(str == 'accName'||str == 'account'||str == 'accMobile'){
            this.bankCardFn()
          }
        }
      },
      custNameFn(){
        this.verification('accName');
        console.log(this.accNameBol);
        this.bankCardFn()
      },
      // 四要素验证
      bankCardFn(){
        for(let i = 0;i<this.busLoanInfoVoList.length;i++){
          if(this.busLoanInfoVoList[i].custName == this.accName){
            this.identityNo = this.busLoanInfoVoList[i].certNo
          }
        }
        let params = {
          accountNo:this.account,
          name:this.accName,
          identityNo:this.identityNo,
          mobile:this.accMobile
        };
        if(!params.accountNo||!params.name||!params.identityNo||!params.mobile){
          return
        }
        $.post(this._path + "/business/bankCardAuthentication", params, res => {
          if (res.resultCode == "0000") {
            // this.busLoanInfoVoList = res.data.busLoanInfoVoList;
            if(!res.data.authResult){
              this.$message({
                type: "warning",
                message: "银行四要素验证失败",
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
      //算产品期限
      mounthFn () {
        let obj = {};
        for(let i = 0;i < this.proArr.length;i++) {
          if(this.proCode == this.proArr[i].proCode){
            obj =  this.proArr[i]
          }
        }
        let arr = [];
        arr = this.tool.getTerms(obj.minTerm,obj.maxTerm,obj.termRule);
        // alert(`${obj.minTerm}--${obj.maxTerm}--${obj.termRule}`)
        return arr
      },
      rateFn(val,index){
        if(!index){
          if(val!=''&&val>=0){
            val = val*1;
            this.brancheInterestRate = val.toFixed(3);
            this.brancheRateBol = false
          }else{
            this.brancheRateBol = true
          }
        }else{
          if(val!=''&&val>=0){
            val = val*1;
            this.brancheServiceRate = val.toFixed(3);
            this.serviceRateBol = false
          }else{
            this.serviceRateBol = true
          }
        }
      },
      chooseProType () {
        for(let o = 0;o<this.proArr.length;o++){
          if(this.proCode == this.proArr[o].proCode){
            this.termList = this.proArr[o].termList
          }
        }
        if(!this.amountBol){
          this.amountBol = true;
          return
        }
        this.amount = '';
        for(let i = 0 ,j = this.approveVerdicts.length; i < j; i++){
          if(this.proCode == this.approveVerdicts[i].proCode){
            this.interest = this.approveVerdicts[i].interest;
            this.serviceCharge = this.approveVerdicts[i].serviceCharge;
            this.maxAmount =  this.approveVerdicts[i].maxAppAmount * 1;
          }
        }
        this.appointmentTime = '';
        this.term = ''
      },
      // 必填项
      requiredFields () {
        // if(this.amount > this.maxAmount){
        //   this.$message({
        //     type:'error',
        //     message:'借款金额大于最高批贷额',
        //     duration:1500,
        //     showClose:1
        //   })
        // }

        if(!/^([1-9][0-9]*)+(.[0-9]{1,2})?$/g.test(this.amount)){
          this.amount = this.amount.substring(0,this.amount.indexOf(0)+3);
        }
        console.log(this.amount)
      },
      count(type) {
        if(type === '借款金额'){
          if(this.amount * 1 != NaN){
            if(this.amount*1 < this.minAmount*1 || this.amount*1 > this.maxAmount*1){
              this.isShowCountError = true;
            }else{
              this.isShowCountError = false;
              this.expecteInterest()
            }
          }
        }
      },
      expecteInterest(){
        this.$http({
          url:'/visaInterview/expecteInterest',
          data:{
            bussNo:this.$route.query.bussNo,
            proCode:this.proCode,
            loanAmount:this.amount,
          },
          callback:res=>{
            this.amountShow = res.data.isShow == '1'?true:false;
            this.monthMaxInterest = res.data.interest
          }
        });
      },
      submit(){
        if(this.noteBol&&!this.verificationCode){
          this.$message.error("请填写验证码")
          return
        }
        if(this.noteBol){
          this.$http({
            url:'/capitalSale/msgCodeSubmit',
            data:{
              serialNo:this.serialNo,
              account:this.account,
              msgCode:this.verificationCode,
              bussNo:this.$route.query.bussNo,
              proCode:this.proCode,
              outTradeNo:this.outTradeNo,
              trustProjectCode:this.trustProjectCode,
              smsSeq:this.smsSeq,
            },
            callback:res=>{
              if(res.data.agreeCode){
                this.sub()
              }
            },
            callback9999:res=>{
              this.$message.error('签约失败，请重新提交或更换银行卡信息');
              this.dialogVisible = false;
            }
          });
        }else{
          this.sub()
        }
      },
      sub(){
        let proName = '';
        for(let i = 0,j = this.proArr.length;i < j;i++){
          if(this.proCode === this.proArr[i].proCode){
            proName = this.proArr[i].proName
          }
        }
        let loading = this.$loading({
          lock: true,
          text: "loading...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        let riskBussProductInfoVosList = JSON.parse(JSON.stringify(this.approveVerdicts));
        for(let i = 0; i < riskBussProductInfoVosList.length; i++){
          if(riskBussProductInfoVosList[i].approvalResult === '不同意'){
            riskBussProductInfoVosList[i].capitalOpinion = '';
          }
        }

        $.get(this._path + "/business/userChannel",{bussNo:this.$route.query.bussNo}, res => {
          if (res.resultCode == "0000") {
            let path = '';
            if(res.data.busModel=='01'){
              path = '/capitalSale/capitalSaleConPreSubmit';
            }else{
              path = '/visaInterview/insertBussProductInfoByBussNo';
            }
            let params = {
              riskBussProductInfoVosString:JSON.stringify(riskBussProductInfoVosList),
              bussNo:this.$route.query.bussNo
            };
            $.post(this._path + '/visaInterview/checkContract',params,res => {
              if(res.resultCode === '0000'){
                if(res.data.check === '审批结论已修改'){
                  loading.close();
                  this.$alert('审批结论已修改，请关注。', '提示', {
                    confirmButtonText: '我知道了',
                    type: 'info'
                  }).then(() => {
                    this.$router.push('/contractPreparingList')
                  })
                }else{
                  let subParams = {
                    appointmentOrCancel:'appointment',
                    interviewTime:this.interviewTime,
                    proCode:this.proCode,
                    proName,
                    amount:this.amount,
                    bond:this.bond,
                    loanAmount:this.amount,
                    term:this.term,
                    interest:this.interest,
                    serviceCharge:this.serviceCharge,
                    brancheInterestRate:this.brancheInterestRate,
                    brancheServiceRate:this.brancheServiceRate,
                    totalRate:this.totalRate,
                    bussNo:this.$route.query.bussNo,
                    accName:this.accName,
                    accCert:this.identityNo,
                    accBank:this.accBank,
                    bankName:this.bankName,
                    bankAdress:this.bankAdress,
                    accMobile:this.accMobile,
                    account:this.account,
                    remark:this.remark,
                    contactName:this.contactName,
                    contactMobile:this.contactMobile,
                  };
                  let loading = this.$loading({
                    lock: true,
                    text: "loading...",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.5)"
                  });
                  $.post(this._path + path,subParams,res=>{
                    if(res.resultCode == '0000'){
                      loading.close();
                      this.$message({
                        type:'success',
                        message:'提交成功',
                        duration:1500,
                        showClose:1
                      });
                      this.$router.push('/contractPreparingList')
                    }else if(res.resultCode == '8888'){
                      loading.close();
                      this.requestError(res,this)
                      this.$router.push('/contractPreparingList')
                    }else if(res.resultCode == '1234'){
                      loading.close();
                      this.requestError(res,this);
                      this.$router.push('/contractPreparingList')
                    }  else{
                      loading.close();
                      this.requestError(res,this)
                    }
                  })
                }
              }
            })
          }
        })
      },
      btncilck (type) {
        if('submit' === type){
          if(this.isCityShow){
            if(!this.reCheck){
              this.count('借款金额');
              this.verification('term');
              this.verification('accName','1');
              this.verification('account','1');
              this.verification('accBank');
              this.verification('accMobile','1');
              this.verification('contactName');
              this.verification('contactMobile');
              this.appointmentTimeFn('1');
              if( this.amount*1 > this.maxAmount*1){
                this.$message.error('借款金额不得大于最高批贷金额');
                return
              }
              if(this.checkMust('bankName')||this.checkMust('bankAdress')||this.isShowCountError||this.termBol||this.accNameBol||this.accountBol||this.accBankBol||this.accMobileBol||this.contactNameBol||this.contactMobileBol||this.timestampBol){
                this.$message.error('请完善信息');
                return
              }
              if(!this.interviewTime){
                this.$message.error('请选择预约时间点');
                return
              }
              if(this.amount * 1 && this.amount < 30){
                this.$message({
                  type:'error',
                  message:'借款金额不可小于30万',
                  duration:1500,
                  showClose:1
                });
                return false
              }
              if(!this.bankCardAuthentication){
                this.$message({
                  type:'error',
                  message:'银行四要素验证失败',
                  duration:1500,
                  showClose:1
                });
                return
              }
            }else{
              this.verification('contactName');
              this.verification('contactMobile');
              if(this.contactNameBol||this.contactMobileBol||this.timestampBol){
                this.$message.error('请完善信息');
                return
              }
            }
          }else{
            if(!this.reCheck){
              this.count('借款金额');
              this.verification('term');
              this.verification('accName','1');
              this.verification('account','1');
              this.verification('accBank');
              this.verification('accMobile','1');
              if( this.amount*1 > this.maxAmount*1){
                this.$message.error('借款金额不得大于最高批贷金额');
                return
              }
              if(this.checkMust('bankName')||this.checkMust('bankAdress')||this.isShowCountError||this.termBol||this.accNameBol||this.accountBol||this.accBankBol||this.accMobileBol){
                this.$message.error('请完善信息');
                return
              }
              if(!this.bankCardAuthentication){
                this.$message({
                  type:'error',
                  message:'银行四要素验证失败',
                  duration:1500,
                  showClose:1
                });
                return
              }
            }
          }
          let custNo = '';
          for(let i = 0;i<this.busLoanInfoVoList.length;i++){
            if(this.busLoanInfoVoList[i].custName == this.accName){
              custNo = this.busLoanInfoVoList[i].id
            }
          }
          let loading = this.$loading({
            lock: true,
            text: "正在加载...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          this.$http({
            url:'/capitalSale/isNeedSigning',
            data:{
              bussNo:this.$route.query.bussNo,
              account:this.account,
              mobile:this.accMobile,
              proCode:this.proCode,
              bankOpenName:this.accBank,
              bankName:this.bankName,
              bankAdress:this.bankAdress,
              custNo,
            },
            callback:res=>{
              /*this.dialogVisible  = true;
              this.verificationCodeFn();*/
              loading.close();
              this.serialNo = res.data.serialNo;
              if(res.data.boHai){
                this.boHai = res.data.boHai
              }
              !res.data.outTradeNo?'':this.outTradeNo = res.data.outTradeNo;
              !res.data.trustProjectCode?'':this.trustProjectCode = res.data.trustProjectCode;
              !res.data.smsSeq?'':this.smsSeq = res.data.smsSeq;

              if(res.data.isNeedSign == '0'){
                this.noteBol = false;
              }else{
                if(res.data.ifSend == '01'){
                  this.verificationCode = "";
                  this.verificationNum = 60;
                  this.verificationCodeName = '获取验证码';
                  this.verificationCodeFn();
                }else if(res.data.ifSend == '02'){
                  this.$message.error('发送失败请重试')
                }
                this.noteBol = true;
              }
              this.dialogVisible  = true;
            },
            callback9999:res=>{
              loading.close();
              this.noteBol = false;   //真值为false
              this.$message.error(res.resultMsg);
            },
            callback1234:res=>{
              loading.close();
              this.$message.error(res.resultMsg);
              this.$router.push('/contractPreparingList')
            }
          });
          /*const h = this.$createElement;
          let dataMessage;
          if(this.isCityShow){
            if(!this.reCheck){
              dataMessage = h('div',null,[
                h('p', null, `借款金额: ${this.amount}万元;`),
                h('p', null, `借款期限: ${this.term}月;`),
                h('p', null, `预约公证时间: ${this._utils.timestampToTime(this.interviewTime)};`),
                h('p', { style: 'color: red' }, `借款金额和期限审核通过后不可修改 ,请确核对以上信息是否正确？`)
              ])
            }else{
              dataMessage = h('div',null,[
                h('p', null, `预约公证时间: ${this._utils.timestampToTime(this.interviewTime)};`),
                h('p', { style: 'color: red' }, `请核对预约时间是否正确？`)
              ])
            }
          }else{
            dataMessage = h('div',null,[
              h('p', null, `借款金额: ${this.amount}万元;`),
              h('p', null, `借款期限: ${this.term}月;`),
              h('p', { style: 'color: red' }, `借款金额和期限审核通过后不可修改 ,请确核对以上信息是否正确？`)
            ])
          }
          this.$msgbox({
            title: '请确认以下信息',
            message: dataMessage,
            showCancelButton: true,
            confirmButtonText: '是',
            cancelButtonText: '否',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                done();
                this.sub();
              } else {
                done();
              }
            }
          });*/
        }
      },
      initProCode(proCode,proCodeList) {
        if(!proCodeList.length){
          return
        }
        if(proCode){
          this.proCode = proCode;
          for(let i = 0;i < proCodeList.length; i++){
            if(proCode === proCodeList[i].proCode){
              this.interest = proCodeList[i].interest;
              this.serviceCharge = proCodeList[i].serviceCharge;
              this.maxAmount = proCodeList[i].maxAppAmount * 1;
              this.amount = proCodeList[i].maxAppAmount;
            }
          }
        }else{
          for(let i = 0;i < proCodeList.length; i++){
            if(proCodeList[i].approvalResult === '同意'){
              this.amountBol = false;
              this.proCode = proCodeList[i].proCode;
              this.interest = proCodeList[i].interest;
              this.serviceCharge = proCodeList[i].serviceCharge;
              this.maxAmount = proCodeList[i].maxAppAmount * 1;
              this.amount = proCodeList[i].maxAppAmount;
              this.term = proCodeList[i].maxAppTerm;
              break
            }
          }
        }
        for(let o = 0;o<this.proArr.length;o++){
          if(this.proCode == this.proArr[o].proCode){
            this.termList = this.proArr[o].termList
          }
        }
        $.post(this._path + "/visaInterview/getAppointmentTimeList",{cityCode:this.cityCode}, res => {
          if(res.resultCode == '0000'){
            //获取预约事件list //
            this.isCityShow = res.data.appointmentTimeVO.appointment;
            this.appointmentTimeList = res.data.appointmentTimeVO.dateList
          }else{
            this.requestError(res,this)
          }
        });
        this.expecteInterest()
      }
    },
    beforeCreate () {
      $.post(this._path + "/custInfo/selectCustInfo",{bussNo:this.$route.query.bussNo}, res => {
        this.busLoanInfoVoList = res.data.busLoanInfoVoList;
      });

      // 大部分信息
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          let data = res.data.contractPreInfoVos;
          this.custName = data.custName;

          this.accMobile = data.accMobile;
          this.loanAmount = data.loanAmount;
          this.interest =  data.interest * 1 == 0 ? '' :data.interest;
          this.serviceCharge =  data.serviceCharge * 1 == 0 ? '' :data.serviceCharge;
          this.cityCode = data.areaCode;
          let isPass = res.data.isPass;

          this.$route.query.type == 'mark'?this.proCode = data.proCode:'';

          // 拥有产品查询
          $.post(this._path + '/visaInterview/selectProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.proArr = res.data.bussProductInfoVosList;
              if(this.$route.query.type == 'mark'){
                this.proArr.forEach((item)=>{
                  if(item.proCode == this.proCode){
                    this.termList = item.termList
                  }
                });
              }
              // 审批结论查询
              $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
                if(res.resultCode == '0000'){
                  for(let i = 0;i < res.data.bussProductInfoVoList.length;i++){
                    if(res.data.bussProductInfoVoList[i].approvalResult ==='不同意'){
                      // 审批结论 同意/不同意更改字段 显示到列表
                      res.data.bussProductInfoVoList[i].capitalOpinion =res.data.bussProductInfoVoList[i].refuseDetail
                    }
                    if(this.$route.query.type == 'mark'){
                      if(res.data.bussProductInfoVoList[i].proCode == this.proCode){
                        this.maxAmount = res.data.bussProductInfoVoList[i].maxAppAmount * 1;
                      }
                    }
                  }
                  this.approveVerdicts = res.data.bussProductInfoVoList;
                  if(this.$route.query.type != 'mark'){
                    this.term = this.approveVerdicts[0].maxAppTerm;
                    this.initProCode(data.proCode,res.data.bussProductInfoVoList);
                  }else{
                    //初始数据 包含合同准备 和 客户放款银行卡信息
                    this.reCheck = isPass == '1'?false:true;
                    this.accName = data.accName;
                    this.account = data.account;
                    this.accMobile = data.accMobile;
                    this.identityNo = data.accCert;
                    this.accBank = data.accBank;
                    this.amount = data.amount;
                    this.term = data.term;
                    this.bankName = data.bankName;
                    this.bankAdress = data.bankAdress;

                    if(!this.proCode){
                      this.initProCode(data.proCode,res.data.bussProductInfoVoList);
                    }

                    $.post(this._path + "/visaInterview/getAppointmentTimeList",{bussNo:this.$route.query.bussNo,proCode:this.proCode,cityCode:this.cityCode}, res => {
                      if(res.resultCode == '0000'){
                        //获取预约事件list //
                        this.isCityShow = res.data.appointmentTimeVO.appointment;
                        this.appointmentTimeList = res.data.appointmentTimeVO.dateList
                      }else{
                        this.requestError(res,this)
                      }
                    });
                  }
                }else{
                  this.requestError(res,this)
                }
              });

            }else{
              this.requestError(res,this)
            }
          });


          //查询最小可贷款金额
          $.post(this._path + '/configuration/getAmountByParam',{parType:'LOAN_AMOUNT',parCode:'MIN_LOAN',cityCode:data.areaCode},res=>{
            if(res.resultCode == '0000'){
              this.minAmount = res.data.configurationApparVo.parValue;
            }else{
              this.requestError(res,this)
            }
          })
        }else{
          this.requestError(res,this)
        }
      });



    }
  }
</script>


