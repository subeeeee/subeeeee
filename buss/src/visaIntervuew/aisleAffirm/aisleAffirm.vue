<template>
  <div class="public" >
    <h2>通道确认</h2>
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col class="table_tr">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款人姓名</el-col>
          <el-col class="table_td" :span="16">{{custBaseInfo.custName}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">身份证号</el-col>
          <el-col class="table_td" :span="16">{{custBaseInfo.certNo}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">渠道简称</el-col>
          <el-col class="table_td" :span="16">{{orgName}}</el-col>
        </el-col>
      </el-col>

      <el-col class="table_tr">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">产品类型</el-col>
          <el-col class="table_td" :span="16">{{proName}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款金额(万元)</el-col>
          <el-col class="table_td" :span="16">{{amount}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">借款期限(月)</el-col>
          <el-col class="table_td" :span="16">{{term}}</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">月利率(%)</el-col>
          <el-col class="table_td" :span="16">{{interestRate}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">年化保险费率(%)</el-col>
          <el-col class="table_td" :span="16">{{insuranceService}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">年化服务费率(%)</el-col>
          <el-col class="table_td" :span="16">{{serviceRate}}</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="8">
          <el-col class="table_td" :span="8">合计费率(%)</el-col>
          <el-col class="table_td" :span="16">{{totalService}}</el-col>
        </el-col>
        <el-col class="table_td" :span="8">
        </el-col>
        <el-col class="table_td" :span="8">
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>通道及债权转让信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col class="table_tr">
        <el-col class="table_td" :span="5">放款通道 <i class="importent">*</i></el-col>
        <el-col class="table_td" :span="19">
          <el-col class="table_td" :span="10">
            <el-select v-model="loanAisle" size="small" class="input_width_80" placeholder="放款通道">
              <el-option v-for="item in passageWayList" :value="item.passageCode" :label="item.passageName"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>

      <el-col class="table_tr">
        <el-col class="table_td" :span="5">债转公司<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="19">
          <el-col class="table_td" :span="10">

            <el-select v-model="rightsName" size="small" class="input_width_80" placeholder="债转公司">
              <el-option v-for="item in rightsNameList" :value="item.companyAlias" :label="item.companyAlias"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
    </el-row>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="submit()">提 交</el-button></li>
      </ul>
    </div>
  </div>


</template>

<script>
  export default {
    name: "aisleAffirm",
    data () {
      return{
        loanAisleList:[],
        loanAisle:'',
        rightsName:'',
        rightsNameList:[],
        custBaseInfo:{},
        orgName:'',
        proName :'',
        amount :'',
        term :'',
        interestRate :'',
        insuranceService :'',
        serviceRate :'',
        totalService :'',
        contractService :'',
        passageWayList:[]

      }
    },
    methods : {
      mustWrite () {
        if(!this.loanAisle){
          this.$message({
            type:"warning",
            message:'放款通道不可为空!',
            duration:1500,
            showClose:1
          })
          return false
        }
        if(!this.rightsName){
          this.$message({
            type:"warning",
            message:'债转公司不可为空!',
            duration:1500,
            showClose:1
          })
          return false
        }
        return true
      },
      submit () {
        if(!this.mustWrite()){
          return
        }
        let passageName = '';
        let leadingMan = ''
        this.passageWayList.forEach(option =>{
          if(this.loanAisle == option.passageCode){
            passageName = option.passageName;
            leadingMan = option.leadingMan
          }
        })
        let params = {
          bussNo:this.$route.query.bussNo,
          passageCode:this.loanAisle,
          passageName,
          leadingMan,
        };
        this.rightsNameList.forEach((item)=>{
          if(item.companyAlias == this.rightsName){
              params.accountBank= item.accountBank;
              params.accountName= item.accountName;
              params.accountNo= item.accountNo;
              params.companyAlias= item.companyAlias;
              params.companyName= item.companyName
          }
        });
        console.log(params)
        this.$confirm('是否确定提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(this._path + '/busChannelConfirmInfo/channelConfirmInfoSubmit',params,res=>{
            if(res.resultCode ==='0000'){
              this.$message({
                type:'success',
                message:"提交成功",
                duration:1500,
                showClose:1
              })
              this.$router.push({
                path:'/aisleAffirmList'
              })
            }else{
              this.requestError(res,this)
            }
          })
        })
      },
      queryBaseInfo () {
        $.get(this._path + '/business/businessMessage',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.busBusinessInfo;
            this.orgName = data.orgName
          }else{
            this.requestError(res,this)
          }
        })

        $.post(this._path + '/business/queryCustBaseInfo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.custBaseInfo;
            this.custBaseInfo = data
          }else{
            this.requestError(res,this)
          }
        })
        $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
          if(res.resultCode === '0000'){
            let data = res.data.contractPreInfoVos;
            this.proName = data.proName;
            this.term = data.term;
            this.amount = data.amount;
            this.totalService = data.totalService;
            this.insuranceService = data.insuranceService;
            this.interestRate = data.interestRate;
            this.serviceRate = data.serviceRate;
            this.contractService = data.contractService;
            $.post(this._path + '/busChannelConfirmInfo/selectPassageWay',{proCode:data.proCode,bussNo:this.$route.query.bussNo},res=>{
              if(res.resultCode === '0000'){
                this.passageWayList = res.data.passageWayVoList;
              }else{
                this.requestError(res,this)
              }
            });
            $.post(this._path + '/busChannelConfirmInfo/queryComAcctInfo',{proCode:data.proCode,bussNo:this.$route.query.bussNo},res=>{
              if(res.resultCode === '0000'){
                this.rightsNameList = res.data;
              }else{
                this.requestError(res,this)
              }
            })
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    created () {
      this.queryBaseInfo()
    }
  }
</script>

<style scoped>

</style>
