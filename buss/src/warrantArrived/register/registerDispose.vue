<template>
	<div class="public distributionDispose ">
		<h2>进抵登记</h2>
		<p class="ele_title">订单编号 ：{{$route.query.bussNo}}<span class="font_red" v-if="titleBol">提示：本订单为见他项权利证放款，请尽快上传他证相关信息，否则无法流转至放款审批环节！</span></p>
		<div class="show_list_title">
			<h3><img src="../../assets/message.png" class="listTitleImg"><span>订单信息</span></h3>
		</div>

    <el-row class="module_margin_buttom tableInfo">
      <el-col  class="table_tr" v-for="(item,index) in borrowMessage">
        <el-col  class="table_tr" :span="24" >
          <el-col :span="3" class="table_td">关系</el-col>
          <el-col :span="9" class="table_td">
            <p v-if="item.relType == '主借款人'">房屋所有权人：{{item.relType}}</p>
            <p v-if="item.relType != '主借款人'">{{item.relType}}：{{item.relName}}{{item.relationship}}</p>
          </el-col>
          <el-col :span="3" class="table_td">借款人姓名</el-col>
          <el-col :span="9" class="table_td">{{item.custName}}</el-col>
        </el-col>
        <el-col  class="table_tr" :span="24" >
          <el-col :span="3" class="table_td">身份证号</el-col>
          <el-col :span="9" class="table_td">{{item.certNo}}</el-col>
          <el-col :span="3" class="table_td">婚姻状况</el-col>
          <el-col :span="9" class="table_td">{{item.marStatus | marStatusFilter}}&ensp;</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押顺位</el-col>
        <el-col :span="9" class="table_td">{{busLoanInfo.bussType | bussTypeFn}}&nbsp;</el-col>
        <el-col :span="3" class="table_td">房产证号</el-col>
        <el-col :span="9" class="table_td">{{ownershipNo}}&nbsp;</el-col>
      </el-col>
      <mutual-cert ref="mutualCert" :disabled="true"></mutual-cert>
    </el-row>
    <br />
    <el-row class="module_margin_buttom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="2" class="table_td">产品类型</el-col>
        <el-col :span="4" class="table_td">{{tableData.proName}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">年利率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.capitalIntY}}&nbsp;</el-col>
      <!--  <el-col :span="2" class="table_td">总利息（元）</el-col>
        <el-col :span="4" class="table_td">{{tableData.interestTotal}}&nbsp;</el-col>-->
        <el-col :span="2" class="table_td">借款金额(万元)</el-col>
        <el-col :span="4" class="table_td">{{tableData.amount}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">借款期限(月)</el-col>
        <el-col :span="4" class="table_td">{{tableData.term}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="2" class="table_td">月利率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.interestRate}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.insuranceService}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.serviceRate}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">合计费率(%)</el-col>
        <el-col :span="4" class="table_td">{{tableData.totalService}}&nbsp;</el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="2" class="table_td">渠道简称</el-col>
        <el-col :span="4" class="table_td">{{orgName}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">经纪人姓名</el-col>
        <el-col :span="4" class="table_td">{{custBaseInfo.brokerName}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">经纪人手机号</el-col>
        <el-col :span="4" class="table_td">{{custBaseInfo.brokerMobile}}&nbsp;</el-col>
        <el-col :span="2" class="table_td">债转公司</el-col>
        <el-col :span="4" class="table_td">{{accountName}}&nbsp;</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="2" class="table_td">放款通道</el-col>
        <el-col :span="12" class="table_td">{{passageName}}&nbsp;{{trustPlan}}&emsp;{{subAccount}}</el-col>
        <el-col :span="2" class="table_td"></el-col>
      </el-col>
    </el-row>
    <br/>
    <el-row class="tableInfo module_margin_bottom">
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">风控审批结论</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled v-model="arrivalInfoVo.approvalConclusion" maxlength="2000"></textarea></div></el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea class="textarea_disabled" disabled :rows="10" v-model="tableData.remark" ></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
		<picModule dataType="1" :bussNo="$route.query.bussNo" taskType="272" :details="false" />
    <br />
		<el-row class="tableInfo module_margin_bottom">
			<el-col class="table_tr" :span="24">
				<el-col :span="4" class="table_td">进抵结果</el-col>
				<el-col :span="19" :offset="1" class="table_td" style="text-align:left">
					<el-radio-group v-model="radio">
						<el-radio  :label="'1'">进抵成功</el-radio>
						<el-radio  :label="'0'">进抵失败</el-radio>
					</el-radio-group>
				</el-col>
			</el-col>
      <el-col  class="table_tr" v-if="radio == '1'" :span="24">
        <el-col :span="4" class="table_td">期望放款日期 <span class="importent">*</span></el-col>
        <el-col :span="19" :offset="1" class="table_td" style="text-align:left">
          <el-date-picker  v-model="expectDate" :picker-options="pickerOptions0" size="small" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">抵押受理单编号<span class="importent">*</span></el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small"   v-model="regIster"></el-input></el-col>
        </el-col>
      </el-col>
		</el-row>

		<div class="show_list_title" v-if="radio == '1'">
			<h3><img src="../../assets/message.png" class="listTitleImg"><span>进抵登记</span></h3>
		</div>

		<picModule :bussNo="$route.query.bussNo" dataType="2" taskType="272" v-if="radio == '1'" />
    <br />
    <div class="show_list_title" v-if="radio == '1'">
      <h3><img src="../../assets/message.png" class="listTitleImg"><span>他证影像</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo" v-if="radio == '1'">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">抵押登记权证编号</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="14" :offset="1"><el-input size="small"  :maxlength="30" v-model="warrantNumber"></el-input></el-col>
        </el-col>
      </el-col>
    </el-row>
    <picModule dataType="3" :bussNo="$route.query.bussNo" taskType="272" v-if="radio == '1'"/>
    <br/>
		<el-row class="tableInfo module_margin_bottom">
			<el-col :span="24" class="table_tr textarea_module" v-if="radio == '0'">
				<el-col :span="4" class="table_td textarea_title">失败原因 <span class="importent">*</span></el-col>
				<el-col :span="20" class="textareawrap">
					<div class="textarea"><textarea :rows="10"  v-model="arrivalInfoVo.fialReason" @blur="textareaFn(arrivalInfoVo.fialReason)" placeholder=" 请填写失败原因。" :maxlength="2000"></textarea></div>
				</el-col>
			</el-col>
			<el-col :span="24" class="table_tr textarea_module">
				<el-col :span="4" class="table_td textarea_title">备注信息</el-col>
				<el-col :span="20" class="textareawrap">
					<div class="textarea"><textarea :rows="10"  v-model="arrivalInfoVo.remark" @blur="textareaFn(arrivalInfoVo.remark)" placeholder=" 请填写备注信息。" :maxlength="2000"></textarea></div>
				</el-col>
			</el-col>
		</el-row>

		<el-col :span="24">
			<el-col :offset='10' :span='2' class="inquireBtn_warp">
				<el-button class="inquireBtn" @click="clickBtn('save')">保 存</el-button>
			</el-col>
			<el-col :span="2" :offset="1" class="inquireBtn_warp">
				<el-button type="primary" class="inquireBtn" @click="clickBtn('submit')">提 交</el-button>
			</el-col>
		</el-col>


	</div>
</template>

<script>
import MutualCert from "../../com/mutualCert";

export default {
  components: {MutualCert},
  name: "distributionDispose",
  data() {
    return {
      regIster:"",
      radio: "1",
      arrivalInfoVo: [],
      titleBol:false,
      warrantNumber:'',
      gzBol:false,
      borrowMessage:[],
      tableData:[],
      custBaseInfo:{},
      orgName:"",
      passageName:"",
      subAccount:"",
      trustPlan:"",
      accountName:"",
      busLoanInfo:{},
      expectDate:"",
      ownershipNo:"",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    textareaFn(str){

    },
    clickBtn(type) {
      let params = {
        result: this.radio,
        remark: this.arrivalInfoVo.remark,
        fialReason: this.arrivalInfoVo.fialReason,
        approvalConclusion: this.arrivalInfoVo.approvalConclusion,
        bussNo: this.$route.query.bussNo,
        warrantNumber:this.warrantNumber,
        expectGrantDate: !this.expectDate?"":(new Date(this.expectDate)).getTime(),
        regIster:this.regIster
      };
      if ("save" == type) {
        params.saveOrSubmit = "save";
      } else {
        params.saveOrSubmit = "submit";
        if (this.radio == "0") {
          if (!this.arrivalInfoVo.fialReason) {
            this.$message({
              type: "warning",
              message: "请输入失败原因",
              duration: 1500,
              showClose: true
            });
            return;
          }
        }
      }

      if (params.result == "1") {
          params.fialReason = "";
          if (!this.expectDate) {
            this.$message({
              type: "warning",
              message: "请选择期望放款时间",
              duration: 1500,
              showClose: true
            });
            return;
          }
        if (!this.regIster) {
          this.$message({
            type: "warning",
            message: "请输入抵押受理单编号",
            duration: 1500,
            showClose: true
          });
          return;
        }
       }
      if (params.saveOrSubmit == "submit") {
        this.$confirm('是否确认提交?', "提示", {
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
              this._path + "/busArrivalInfo/busArrivalInfoSaveOrSubmit",
              params,
              res => {
              loading.close();
                if("0000" == res.resultCode){
                  this.$message({
                    type: "success",
                    message: "提交成功",
                    duration: "1500",
                    showClose: true
                  });
                  this.$router.push("/registerList");
                } else {
                  this.requestError(res, this);
                }
              }
            );
          })

      } else {
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        $.post(
          this._path + "/busArrivalInfo/busArrivalInfoSaveOrSubmit",
          params,
          res => {
            loading.close();
            if (res.resultCode == "0000") {
              this.$message({
                type: "success",
                message: "保存成功",
                duration: 1500,
                showClose: true
              });
            } else {
              this.$message({
                type: "success",
                message: "保存失敗",
                duration: 1500,
                showClose: true
              });
              this.requestError(res, this);
            }
          }
        );
      }
    }
  },
  beforeCreate() {
    let params = { bussNo: this.$route.query.bussNo };
    //  借款金额 到 合计费率
    $.post(this._path + "/visaInterview/selectContractPreInfoByBussNo", params, (res) => {
      if (res.resultCode == '0000') {
        this.tableData = res.data.contractPreInfoVos;
      } else {
        this.requestError(res, this)
      }
    });
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
        this.accountName = data.companyAlias;
        this.orgName = data.orgName
      }else{
        this.requestError(res,this)
      }
    })
    $.post(this._path + "/guaInfo/selectGuaInfo", params, res => {
      if (res.resultCode == "0000") {
        this.ownershipNo = res.data.guaInfoVo.ownershipNo;
      } else {
        this.requestError(res, this);
      }
    });
    //抵押顺位
    $.post(this._path + "/loanInfo/selectLoanInfo", params, res => {
      if (res.resultCode == "0000") {
        this.busLoanInfo = res.data.busLoanInfo;
      } else {
        this.requestError(res, this);
      }
    });
    //经纪人姓名 经纪人手机号
    $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
      this.custBaseInfo = res.data.custBaseInfo;
    })
    $.post(this._path + "/busArrivalInfo/busArrivalInfo", params, res => {
      if (res.resultCode == "0000") {
        this.arrivalInfoVo = res.data.arrivalInfoVo;
        this.warrantNumber =  res.data.arrivalInfoVo.warrantNumber;
        this.expectDate = res.data.arrivalInfoVo.expectGrantDate;
        this.regIster = res.data.arrivalInfoVo.regIster;
        this.titleBol = res.data.isPass=='0'?false:true
        if (!res.data.arrivalInfoVo.result) {
          this.radio = "1";
        } else {
          this.radio = res.data.arrivalInfoVo.result;
        }
      } else {
        this.requestError(res, this);
      }
    });
    this.$http({
      url:'/custInfo/selectCustInfo',
      data:{bussNo:this.$route.query.bussNo},
      callback:res=>{
        this.borrowMessage = res.data.busLoanInfoVoList
      }
    });
  },
  filters:{
    bussTypeFn(val){
      if(val){
        if(val == '01'){
          val = '一抵'
        }else if(val == '02'){
          val = '二抵'
        }else if(val == '03'){
          val = '一抵转单'
        }else{
          val = '二抵转单'
        }
        return val
      }
    },
    marStatusFilter (val) {
      switch (val) {
        case '10':
          val = '未婚'
          break;
        case '20':
          val = '已婚无子女'
          break;
        case '21':
          val = '已婚有子女'
          break;
        case '22':
          val = '离异'
          break
        case '30':
          val = '丧偶'
          break
      }
      return val
    }
  }
};
</script>
