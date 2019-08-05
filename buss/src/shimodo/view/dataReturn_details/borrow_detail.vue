<template>
	<div class="borrowMoney">

		<div class="show_list_title">
			<h3><img src="../../../assets/message.png" class="listTitleImg"><span>借款信息</span></h3>
		</div>

		<div class="tableInfo">
			<el-row>
				<el-col :span="24" class="table_tr">
					<el-col :span="3" class="table_td">申请金额(万元)<span class="importent">*</span></el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1">
							<el-input disabled v-model.number="ruleForm.money" size="small" @blur="verify(1,1)"></el-input>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.money">金额为数字</el-col>
					</el-col>


					<el-col :span="3" class="table_td">申请期限(月)<span class="importent">*</span></el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" class="bmp_selectleft" :offset="1">
							<el-select disabled v-model="ruleForm.month" size="small" placeholder="申请期限">
								<el-option v-for="item in _utils.loanTermList" :value="item.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">借款用途<span class="importent">*</span></el-col>
          <el-col :span="21" class="table_td">
            <el-col :span="14" :offset="1">
              <el-select disabled v-model="ruleForm.moneyUse" @visible-change="(val)=>verify(2,val)" class="select_width" size="small" placeholder="请选择借款用途">
                <el-option v-for="item in moneyUseList" :value="item.key" :label="item.value" :key="item.key"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.moneyUse">不可输入特殊字符</el-col>
          </el-col>
        </el-col>
				<el-col :span="24" class="table_tr">
					<el-col :span="3" class="table_td">还款来源<span class="importent">*</span></el-col>
					<el-col :span="21" class="table_td">
						<el-col :span="14" :offset="1">
              <el-select disabled v-model="ruleForm.payment" @visible-change="(val)=>verify(3,val)" class="select_width" size="small" placeholder="请选择还款来源">
                <el-option v-for="item in paymentList" :value="item.key" :label="item.value" :key="item.key"></el-option>
              </el-select>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.payment">不可输入特殊字符</el-col>
					</el-col>
				</el-col>

        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">用款企业名称<span class="importent">*</span></el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled v-model="enterpriseName" :rows="3" placeholder="请输入企业名称" :maxlength="255"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">用款企业经营状况</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled v-model="stateOfBusiness" :rows="3" placeholder="请输入企业经营状况" :maxlength="255"></textarea></div></el-col>
          </el-col>
        </el-col>

				<el-col :span="24" class="table_tr">
					<el-col :span="3" class="table_td">期望放款日期</el-col>
					<el-col :span="7" class="table_td">
						<el-col :span="14" class="bmp_selectleft" :offset="1">
							<el-date-picker :editable="false" disabled v-model="ruleForm.valueDate" size="small" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-col>
					</el-col>
					<el-col :span="5" class="table_td">实际用款人与借款人关系<span class="importent">*</span></el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" class="bmp_selectleft" :offset="1">
							<el-select disabled v-model="ruleForm.relation" size="small" placeholder="实际用款人与借款人关系">
								<el-option v-for="item in relationList" :value="item.code" :label="item.relation" :key="item.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</el-col>


				<el-col :span="24" class="table_tr" v-if="!(this.ruleForm.relation == '1' || this.ruleForm.relation == '2' || this.ruleForm.relation == '')">
					<el-col :span="3" class="table_td">联系方式</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1">
							<el-input disabled v-model="ruleForm.contentWay" size="small" @blur="verify(4)" placehold="请输入联系方式"></el-input>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.contentWay">请输入正确联系方式</el-col>
					</el-col>

					<el-col :span="3" class="table_td">实际用款人</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1">
							<el-input disabled v-model="ruleForm.practical" @blur="verify(5)" size="small"></el-input>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.practical">输入正确借款人</el-col>
					</el-col>
				</el-col>

				<el-col :span="24" class="table_tr" v-if="!(this.ruleForm.relation == '1' || this.ruleForm.relation == '2' || this.ruleForm.relation == '')">
					<el-col :span="3" class="table_td">身份证号</el-col>
					<el-col :span="16" class="table_td">
						<el-col :span="14" class="bmp_selectleft idcart">
							<el-input disabled v-model="ruleForm.identityCard" size="small" @blur="verify(6)" placehold="请输入身份证号"></el-input>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.identityCard">请输入正确的身份证号码</el-col>
					</el-col>
				</el-col>


				<el-col :span="24" class="table_tr">
					<el-col :span="3" class="table_td">抵押顺位<span class="importent">*</span></el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1" class="bmp_selectleft">
							<el-select disabled v-model="ruleForm.businessType" size="small" placeholder="抵押顺位">
								<el-option value="01" label="一抵" key="01"></el-option>
								<el-option value="02" label="二抵" key="02"></el-option>
								<el-option value="03" label="一抵转单" key="03"></el-option>
								<el-option value="04" label="二抵转单" key="04"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</el-col>


				<!--<el-col :span="24" class="table_tr" v-if="this.ruleForm.businessType == '02'|| this.ruleForm.businessType == '04'">
					<el-col :span="3" class="table_td">抵押机构名称</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1">
							<el-input disabled v-model="ruleForm.LoanBankBranch"  placehold="贷款银行支行" size="small"></el-input>
						</el-col>
					</el-col>
					&lt;!&ndash;<el-col :span="3" class="table_td">银行尾款(万元)</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1">
							<el-input disabled v-model="ruleForm.finalPayment" @blur="verify(1,2)" placehold="银行尾款" size="small"></el-input>
						</el-col>
						<el-col :span="9" class="error_title" v-if="ruleFormShow.finalPayment">金额为数字</el-col>
					</el-col>&ndash;&gt;
				</el-col>-->





        <el-col :span="24" class="table_tr" v-if="ruleForm.businessType == '02'|| ruleForm.businessType == '04'">
          <el-col :span="3" class="table_td">抵押机构名称<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled v-model="ruleForm.LoanBankBranch" @blur="verify(11)" :maxlength="32" placehold="抵押机构名称" size="small"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.LoanBankBranch">请填写抵押机构名称</el-col>
          </el-col>
          <el-col :span="3" class="table_td">已抵押金额(万元)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col disabled :span="14" :offset="1">
              <el-input disabled v-model.number="ruleForm.pledgeAmount" :maxlength="20" size="small" @blur="verify(1,1)"></el-input>
            </el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr" v-if="ruleForm.businessType == '02'|| ruleForm.businessType == '04'">
          <el-col :span="3" class="table_td">实际已抵押金额(万元)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled v-model="ruleForm.actualMorted" @blur="verify('money','actualMorted')" @keyup.native="keyup('actualMorted','money')" :maxlength="32" placehold="实际已抵押金额" size="small"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.actualMorted">请输入实际已抵押金额</el-col>
          </el-col>
          <el-col :span="3" class="table_td">贷款余额(万元)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled v-model.number="ruleForm.loanedAmount" :maxlength="20" size="small" @keyup.native="keyup('loanedAmount','money')" @blur="verify('money','loanedAmount')"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.loanedAmount">请输入贷款余额</el-col>

          </el-col>
        </el-col>


        <el-col :span="24" class="table_tr" v-if="ruleForm.businessType == '02'|| ruleForm.businessType == '04'">
          <el-col :span="3" class="table_td">贷款期限(月)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled v-model="ruleForm.loanedTerm" @blur="verify('term','loanedTerm')" @keyup.native="keyup('loanedTerm','number')" :maxlength="3" placehold="请输入贷款期限" size="small"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.loanedTerm">请输入贷款期限</el-col>
          </el-col>
          <el-col :span="3" class="table_td">贷款类型<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select disabled v-model="ruleForm.loanType" size="small" placeholder="贷款类型" class="select_width" @change="verify('loanType')">
                <el-option v-for="item in loanTypeList" :value="item.key" :label="item.value" :key="item.key"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="ruleFormShow.loanType">请选择贷款类型</el-col>
          </el-col>
        </el-col>



























				<el-col :span="24" class="table_tr">
					<el-col :span="3" class="table_td">是否垫资<span class="importent">*</span></el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" class="bmp_selectleft" :offset="1">
							<el-radio disabled v-model="ruleForm.isAdvance" label="0">是</el-radio>
							<el-radio disabled v-model="ruleForm.isAdvance" label="1">否</el-radio>
						</el-col>
					</el-col>
				</el-col>

				<el-col :span="24" class="table_tr " v-if="this.ruleForm.isAdvance == '0'">
					<!--<el-col :span="3" class="table_td">垫资机构</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="14" :offset="1" class="bmp_selectleft">
							<el-radio disabled v-model="ruleForm.advanceOrg" label="0">总公司</el-radio>
							<el-radio disabled v-model="ruleForm.advanceOrg" label="1">分公司</el-radio>
							<el-radio disabled v-model="ruleForm.advanceOrg" label="2">其他</el-radio>
						</el-col>
					</el-col>-->
					<el-col :span="3" class="table_td">垫资期限</el-col>
					<el-col :span="9" class="table_td">
						<el-col :span="15">
							<el-select disabled v-model="ruleForm.advanceTerm" size="small" placeholder="垫资期限">
								<el-option v-for="item in month" :value="item.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</el-col>


				<el-col :span="24" class="table_tr" v-if="this.ruleForm.isAdvance == '0'">
					<!--<el-col :span="3" class="table_td textarea">垫资备注</el-col>
					<el-col :span="16" :offset="1" class="table_td">
						<el-col :span="15">
							<el-input disabled type="textarea" class="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.textarea">
							</el-input>
						</el-col>
					</el-col>
					<el-col :span="3" class="error_title textarea" v-if="ruleFormShow.textarea">备注字数200字内</el-col>-->
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">垫资备注</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea v-model="ruleForm.textarea" disabled :rows="3" placeholder="请输入内容，最多200字符。" :maxlength="200"></textarea></div></el-col>
          </el-col>
				</el-col>
			</el-row>
		</div>

		<div class="show_list_title titleTop">
			<h3><img src="../../../assets/message.png" class="listTitleImg"><span>借款影像信息</span></h3>
		</div>
		<picModule :bussNo="$route.query.bussNo" dataType="1" taskType="136" :details="false"/>

	</div>
</template>

<script>
	import './../../style/borrowMoney.css';
	export default {
		name: 'borrowMoney',
		data() {
			return {
        enterpriseName:'',
        stateOfBusiness:'',

				relationList: [{
					code: "1",
					relation: '本人'
				}, {
					code: '2',
					relation: '配偶'
				}, {
					code: '3',
					relation: '父母'
				}, {
					code: '4',
					relation: '子女'
				}, {
					code: '5',
					relation: '兄弟姐妹'
				}, {
					code: '6',
					relation: '亲戚朋友'
				}],
				month: [{
					code: '1'
				}, {
					code: '2'
				}, {
					code: '3'
				}, {
					code: '4'
				}, {
					code: '5'
				}, {
					code: '6'
				}, {
					code: '7'
				}, {
					code: '8'
				}, {
					code: '9'
				}, {
					code: '10'
				}, {
					code: '11'
				}, {
					code: '12'
				}],
        moneyUseList:[],
        paymentList:[],
        loanTypeList:[],
				ruleForm: {
					valueDate: '',
          pledgeAmount: '',
          loanedTerm: '',
          loanedAmount: '',
          actualMorted: '',
					month: '',
					relation: '',
					money: '',
					moneyUse: '',
					payment: '',
					contentWay: '',
					practical: '',
					identityCard: '',
					businessType: '',
					LoanBankBranch: '',
					finalPayment: '',
					// advanceOrg: '',
					date1: '',
					advanceRemark: '',
					// 单选展示
					isAdvance: 0,
					advanceExpect: '',
					advanceTerm: '',
					textarea: ''
				},
				//验证字段显示隐藏
				ruleFormShow: {
					month: '',
					money: false,
					moneyUse: '',
					payment: '',
					contentWay: '',
					practical: '',
					identityCard: '',
					businessType: '',
					LoanBankBranch: '',
					finalPayment: '',
					// advanceOrg: '',
					date1: '',
					advanceRemark: '',
					advanceExpect: '',
					textarea: ''
				}
			}
		},
		methods: {
      queryEnum(){
        this.$http({
          url:'/dataReturn/getLoanEnumList',
          callback:res=>{
            let data = res.data;
            this.moneyUseList = data.loanUseEnum;
            this.paymentList = data.paymentEnum;
            this.loanTypeList = data.loanTypeEnum;
          }
        })
      },
			save() {




				let params = {
					bussNo: this.$route.query.bussNo,
					advanceRemark: this.ruleForm.textarea,
					advanceTerm: this.ruleForm.advanceTerm,
					// advanceMechanism: this.ruleForm.advanceOrg,
					isAdvance: this.ruleForm.isAdvance,
					bankFund: this.ruleForm.finalPayment,
					loanBank: this.ruleForm.LoanBankBranch,
					bussType: this.ruleForm.businessType,
					actualCert: this.ruleForm.identityCard,
					actualName: this.ruleForm.practical,
					actualMobile: this.ruleForm.contentWay,
					actualRelation: this.ruleForm.relation,
					expectDate: this.ruleForm.valueDate,
					payment: this.ruleForm.payment,
					loanUse: this.ruleForm.moneyUse,
					loanTerm: this.ruleForm.month,
					loanAmount: this.ruleForm.money
				}





				if (params.expectDate) {
					let time = new Date(params.expectDate)
					params.expectDate = time.getTime()
				} else {
					delete params.expectDate
				}


				$.post(this._path + "/dataReturn/insertLoanLogSave", params, (res) => {
				})

			},
			verify(type, data) {
				switch (type) {
					case 1:
						var str = '', bol = null
						if (data == 1) {
							if (this._utils.isNumber(this.ruleForm.money)) {
								this.ruleFormShow.money = false
							} else if (this.ruleForm.money == ' ') {
								this.ruleFormShow.money = false
							} else {
								this.ruleFormShow.money = true
							}
						} else {
							if (this._utils.isNumber(this.ruleForm.finalPayment)) {
								this.ruleFormShow.finalPayment = false
							} else if (this.ruleForm.finalPayment == '') {
								this.ruleFormShow.finalPayment = false
							} else {
								this.ruleFormShow.finalPayment = true
							}
						}


						break
					case 2:
						if (this._utils.isSpecial(this.ruleForm.moneyUse)) {
							this.ruleFormShow.moneyUse = false
						} else if (this.ruleForm.moneyUse == '') {
							this.ruleFormShow.moneyUse = false
						} else {
							this.ruleFormShow.moneyUse = true
						}
						break
					case 3:
						if (this._utils.isSpecial(this.ruleForm.payment)) {
							this.ruleFormShow.payment = false
						} else if (this.ruleForm.payment == '') {
							this.ruleFormShow.payment = false
						} else {
							this.ruleFormShow.payment = true
						}
						break
					case 4:
						if (this._utils.isMobile(this.ruleForm.contentWay)) {
							this.ruleFormShow.contentWay = false
						} else if (this.ruleForm.contentWay == '') {
							this.ruleFormShow.contentWay = false
						} else {
							this.ruleFormShow.contentWay = true
						}
						break
					case 5:
						if (this._utils.isName(this.ruleForm.practical)) {
							this.ruleFormShow.practical = false
						} else if (this.ruleForm.practical == '') {
							this.ruleFormShow.practical = false
						} else {
							this.ruleFormShow.practical = true
						}
						break
					case 6:
						if (this._utils.checkID(this.ruleForm.identityCard)) {
							this.ruleFormShow.identityCard = false
						} else if (this.ruleForm.identityCard == '') {
							this.ruleFormShow.identityCard = false
						} else {
							this.ruleFormShow.identityCard = true
						}
						break
					case 7:
						if (this.ruleForm.textarea.length >= 200) {
							this.ruleFormShow.textarea = true
						} else {
							this.ruleFormShow.textarea = false
						}
						break
				}
			}
		},
		created() {
		  this.queryEnum()
			let params = {
				bussNo: this.$route.query.bussNo
			}

			$.post(this._path + '/dataReturn/queryBusLoanByBussNoAndtaskTypeReturn', params, (res) => {
				let data = res.data.busLoanLogVo
				this.ruleForm.textarea = data.advanceRemark;
				this.ruleForm.advanceTerm = data.advanceTerm;
				// this.ruleForm.advanceOrg = data.advanceMechanism
				this.ruleForm.isAdvance = data.isAdvance;
				this.ruleForm.finalPayment = data.bankFund;
				this.ruleForm.LoanBankBranch = data.loanBank;
				this.ruleForm.businessType = data.bussType;
				this.ruleForm.identityCard = data.actualCert;
				this.ruleForm.practical = data.actualName;
				this.ruleForm.contentWay = data.actualMobile;
				this.ruleForm.relation = data.actualRelation;
				this.ruleForm.pledgeAmount = data.pledgeAmount;
				this.ruleForm.valueDate = data.expectDate;
				this.ruleForm.payment = data.payment;
				this.ruleForm.moneyUse = data.loanUse;
				this.ruleForm.month = data.loanTerm;

				this.ruleForm.money = data.loanAmount;
        this.ruleForm.actualMorted = data.actualMorted;
        this.ruleForm.loanType = data.loanType;
        this.ruleForm.loanedAmount = data.loanedAmount;
        this.ruleForm.loanedTerm = data.loanedTerm;

        this.stateOfBusiness = data.stateOfBusiness;
        this.enterpriseName = data.enterpriseName;
			})
		},
		beforeCerate() {

		}
	}

</script>
