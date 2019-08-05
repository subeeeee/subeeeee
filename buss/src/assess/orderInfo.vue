<template>
  <div class="public orderInfo">
			<h2>订单信息</h2>
      <p class="title">订单编号 ：{{$route.query.bussNo}}</p>
			<div class="show_list_title">
				<h3><img src="./../assets/task.png" class="listTitleImg"><span>订单流转信息</span></h3>
			</div>
			<!-- 订单信息列表展示 -->
      <el-row>
        <el-col :span="20">
          <el-table :data="tableData" border class="table">
           <el-table-column header-align="center" align="center" prop="taskType" label="订单状态" width="150"></el-table-column>
           <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
           <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
           <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
           <el-table-column header-align="center" align="center" v-if="$route.query.orgNameBol=='1'" prop="finishPerName" label="任务员姓名" width="200"></el-table-column>
           <el-table-column header-align="center" align="left" label="备注" min-width="250">
              <template slot-scope="scope">
              <span v-html="scope.row.remark"></span>
            </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4">
          <flowPath v-if="linkNumBol" :linkNum="linkNum"></flowPath>
        </el-col>
      </el-row>
      <br>
			<div class="show_list_title">
				<h3><img src="./../assets/task.png" class="listTitleImg"><span>借款人信息</span></h3>
			</div>
			<!-- 借款人信息表格 -->
			<table class="_table">
				<tr><td>借款人姓名</td><td>{{custBaseInfo.custName}}</td><td>性别</td><td>{{custBaseInfo.sex=='1'?'男':'女'}}</td></tr>
        <tr><td>婚姻状况</td><td>{{custBaseInfo.marStatus | marStatusFun}}</td><td>年龄</td><td>{{custBaseInfo.age}}</td></tr>
				<tr><td>订单来源</td><td>{{busLoanInfo.custSource | sustSourceFn}}</td><td>渠道简称</td><td>{{busLoanInfo.orgName}}</td></tr>
        <tr><td>经纪人姓名</td><td>{{busLoanInfo.brokerName}}</td><td>经纪人手机号</td><td>{{busLoanInfo.brokerMobile}}</td></tr>
			</table>
			<!-- 抵押物信息 -->
			<div class="show_list_title">
				<h3><img src="./../assets/task.png" class="listTitleImg"><span>抵押物信息</span></h3>
			</div>
			<table class="_table">
					<tr><td>房产证号</td><td>{{guaInfoVo.ownershipNo}}</td><td>所在区域</td><td>{{guaInfoVo.guaProper}}</td></tr>
					<tr><td>抵押物坐落</td><td>{{guaInfoVo.guaAddress + guaInfoVo.guaBuilding + guaInfoVo.guaNumber}}</td><td>社区名称</td><td>{{guaInfoVo.plotName}}</td></tr>
			</table>
			<!--  -->
			<div class="show_list_title">
					<h3><img src="./../assets/task.png" class="listTitleImg"><span>借款信息</span></h3>
			</div>
			<!-- 借款信息 -->
			<table class="_table">
					<tr><td>产品类型</td><td>{{contractPreInfoVos.proName}}</td><td>城市</td><td>{{busLoanInfo.areaName}}</td></tr>
          <tr><td>放款通道</td><td>{{busChannelConfirmInfoVo.passageName}}{{busChannelConfirmInfoVo.trustPlan}}{{busChannelConfirmInfoVo.subAccount}}</td><td>借款金额(万元)</td><td>{{contractPreInfoVos.amount}}</td></tr>
          <tr><td>借款期限(月)</td><td>{{contractPreInfoVos.term}}</td><td>月利率(%)</td><td>{{contractPreInfoVos.interestRate}}</td></tr>
          <tr><td>年化保险费率(%)</td><td>{{contractPreInfoVos.insuranceService}}</td><td>年化服务费率(%)</td><td>{{contractPreInfoVos.serviceRate}}</td></tr>
          <tr><td>合计费率(%)</td><td>{{contractPreInfoVos.totalService}}</td><td>户名</td><td>{{contractPreInfoVos.accName}}</td></tr>
					<tr><td>账号</td><td>{{contractPreInfoVos.account}}</td><td>开户行</td><td>{{contractPreInfoVos.accBank}}</td></tr>
			</table>

			<!-- 还款计划表 -->
			<div v-if="createRefundPlanList">
					<div class="show_list_title">
							<h3><img src="./../assets/task.png" class="listTitleImg"><span>还款信息</span></h3>
					</div>

					<div class="refundPlanList">
            <el-tabs v-model="activeCard" type="card">
              <!--<el-tab-pane label="借款人" name="1">-->
              <el-table class="module_margin_bottom" border stripe :data="billsList" style="width: 100%">
               <el-table-column header-align="center" align="center" id="tableTitle_fontnormal" prop="billDate" :label="'借款人:'+ hqListTitle.custName">
                  <!--<el-table-column :label="'放款日期:' + hqListTitle.grantDate">-->
                 <el-table-column header-align="center" align="center" prop="period"  label="还款期数"></el-table-column>
                  <!--</el-table-column>-->
                </el-table-column>
               <el-table-column header-align="center" align="center" prop="billDate" :label="'借款金额(万元):' + hqListTitle.loanAmount">
                  <!--<el-table-column prop="billDate" :label="'借款利率(%/月):'+ hqListTitle.interestRate">-->
                 <el-table-column header-align="center" align="center" prop="billDate" label="还款日期"></el-table-column>
                  <!--</el-table-column>-->
                </el-table-column>
               <el-table-column header-align="center" align="center" prop="days" :label="'借款期限(月):'+hqListTitle.term" >
                  <!--<el-table-column prop="days" :label="'服务费率(%/月):'+hqListTitle.serviceRate" >-->
                 <el-table-column header-align="center" align="center" prop="interest" label="应付利息(元)"></el-table-column>
                  <!--</el-table-column>-->
                </el-table-column>
               <el-table-column header-align="center" align="center" prop="amount" :label="'年利率(%):'+hqListTitle.capitalIntY">
                  <!--<el-table-column prop="amount" :label="'借款期限(月):'+hqListTitle.term">-->
                 <el-table-column header-align="center" align="center" prop="capital" label="应付本金(元)"></el-table-column>
                  <!--</el-table-column>-->
                </el-table-column>
               <el-table-column header-align="center" align="center" prop="amount" :label="'放款日期:'+hqListTitle.grantDate">
                  <!--<el-table-column prop="amount" :label="'借款期限(月):'+hqListTitle.term">-->
                 <el-table-column header-align="center" align="center" prop="capitalLast" label="剩余本金(元)"></el-table-column>
                  <!--</el-table-column>-->
                </el-table-column>
              </el-table>

            </el-tabs>
						</div >
            <el-row class="module_margin_bottom tableInfo">
              <el-col :span="24" class="table_tr">
                <el-col :span="24" class="table_tr textarea_module" >
                  <el-col :span="4" class="table_td textarea_title">还款备注</el-col>
                  <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10" v-model="grantRemark" class="textarea_disabled" disabled maxlength="2000"></textarea></div></el-col>
                </el-col>
              </el-col>
            </el-row>
			</div>

      <el-col :offset='10' :span='4' class="inquireBtn_warp"><el-button class="inquireBtn" @click="goback">返回列表</el-button></el-col>
	</div>
</template>
<style>
  .kua{
    width: 60%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #000000;
    text-align: center;
    padding: 5px 10px;
  }
  .downArrow{
    width: 60%;
    padding: 5px 10px;
  }
  .downArrow img{
    display: block;
    margin: auto;
  }
</style>
<script>

export default{
	name:'orderInfo',
	data () {
		return {
			tableData:[],
			borrowerInfo:'asdf',
			activeCard:'1',

			custBaseInfo:{},
			guaInfoVo:{},
			busLoanInfo:{},
			dealBusNotarizationVo:{accName:'',account:''},
			createBillsResultDTO:{},
			contractPreInfoVos:{},

			// 还款计划表
			grantDate:'',
			repayType:'',
			intType:'1',
			intTypeM:'',
      capitalIntY:'',
			repayDateType:'1',
			repayDay:'',
			isRepayInGrantMonth:'',
			grantRemark:'',
			principalDate:"",
			hqList:[],
			comList:[],
			hqListTitle:{},
			userBillsList:[],
			innerBillss:[],
			SN_Disabled:false,
			S_Disabled:false,
      createRefundPlanList:false,
      linkNum:'',
      billsList:[],
      linkNumBol:false,
      busChannelConfirmInfoVo:{},
      orgNameBol:false
		}
	},
	methods : {
    goback () {
			this.$router.push({
				path:'/orderList'
			})
		}
	},
	beforeCreate(){
		// 借款人
		$.post(this._path + '/custInfo/selectCustInfo',{bussNo:this.$route.query.bussNo},res=>{
			if(res.resultCode== "0000"){
				this.custBaseInfo = res.data.busLoanInfoVoList[0]
			}else{
				this.requestError(res,this)
			}
		})


		//抵押物
		$.post(this._path + '/guaInfo/selectGuaInfo',{bussNo:this.$route.query.bussNo},res=>{
			if(res.resultCode== "0000"){
				this.guaInfoVo = res.data.guaInfoVo
			}else{
				this.requestError(res,this)
			}
		})
		// 贷款相关
		$.post(this._path + '/loanInfo/selectLoanInfo',{bussNo:this.$route.query.bussNo},res=>{
			if(res.resultCode== "0000"){
				this.busLoanInfo = res.data.busLoanInfo
			}else{
				this.requestError(res,this)
			}
		})

			$.post(this._path + '/loanConfirm/queryLoanConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
				if(res.resultCode== "0000"){
          let data = res.data.loanConfirmVo;
          this.grantRemark = data.grantRemark;
          if(!!res.data.createBillsResultDTO.billsList){
            if(res.data.createBillsResultDTO.billsList.length > 0){
              this.hqListTitle.loanAmount = res.data.createBillsResultDTO.loanAmount;
              this.hqListTitle.capitalIntY = res.data.createBillsResultDTO.capitalIntY;
              this.hqListTitle.custName = res.data.createBillsResultDTO.custName;
              this.hqListTitle.grantDate = res.data.createBillsResultDTO.grantDate;
              this.hqListTitle.term = res.data.createBillsResultDTO.term;
              this.billsList = res.data.createBillsResultDTO.billsList;

              this.createRefundPlanList = true
            }
          }
				}else{
					this.requestError(res,this)
				}
			})
		//产品
		$.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
			if(res.resultCode== "0000"){
				this.contractPreInfoVos = res.data.contractPreInfoVos
			}else{
				this.requestError(res,this)
			}
		});

		// 放款通道
    // /busChannelConfirmInfo/selectChannelConfirmInfo
    $.post(this._path + '/busChannelConfirmInfo/selectChannelConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
      if(res.resultCode== "0000"){
        this.busChannelConfirmInfoVo = res.data.busChannelConfirmInfoVo;
      }else{
        this.requestError(res,this)
      }
    });

		$.post(this._path + '/business/selectBusOrdersFlow',{bussNo:this.$route.query.bussNo},res=>{
			if(res.resultCode== "0000"){
				this.tableData = res.data;
				this.linkNum = this.tableData[this.tableData.length-1].taskType;
				this.linkNumBol = true;

        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].proName){
            let endIndex = this.tableData[i].proName.lastIndexOf('；');
            if(endIndex > -1){
              this.tableData[i].proName = this.tableData[i].proName.substr(0,endIndex);
            }

          }
        }
			}else{
				this.requestError(res,this)
			}
		})
	},
	filters:{
				marStatusFun(value){
          if (value) {
            if (value == "10") {
              value = "未婚";
            } else if (value == "20") {
              value = "已婚无子女";
            } else if (value == "22") {
              value = "离异";
            }else if(value == '21'){
              value = "已婚有子女";
            } else if(value=='30'){
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
						}else if(val == '03'){
							val = '一抵转单'
						}else{
							val = '二抵转单'
						}
						return val
					}
				},
				sustSourceFn(val){
					if(val){
							if(val == '3'){
								val = '系统'
							}else if(val == '2'){
								val = 'app'
							}else{
								val = '微信'
							}
						}
						return val
				}
		},

}

</script>
