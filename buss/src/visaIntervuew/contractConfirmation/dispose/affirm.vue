<template>
  <div class="infoPassBaul public">
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>通道信息确认</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">放款通道</el-col>
        <el-col :span="9" class="table_td">
          {{aisle}}&emsp;
          {{trustPlan}}&emsp;
          {{subAccount}}
        </el-col>
        <el-col :span="3" class="table_td">债转公司</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select class="select_width"  v-model="companyAlias" placeholder="请选择" size='small' @change="checkMustWirite('companyAlias')">
              <el-option v-for="item in companyAliasList" :label="item.companyAlias" :value="item.companyAlias"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.companyAlias">*请选择债转公司</el-col>
        </el-col>

      </el-col>
    </el-row>
    <el-card class="company-alias-info module_margin_bottom" v-if="companyAlias">
      <p class="company-alias-info-title">债转公司账户信息:</p>
      <div class="company-alias-info-item"><p class="company-alias-info-item-title">公司名称:</p><p class="company-alias-info-item-content">{{activeCompanyAlias.companyName}}</p></div>
      <div class="company-alias-info-item"><p class="company-alias-info-item-title">户名:</p><p class="company-alias-info-item-content">{{activeCompanyAlias.accountName}}</p></div>
      <div class="company-alias-info-item"><p class="company-alias-info-item-title">账号:</p><p class="company-alias-info-item-content">{{activeCompanyAlias.accountNo}}</p></div>
      <div class="company-alias-info-item"><p class="company-alias-info-item-title">开户行:</p><p class="company-alias-info-item-content">{{activeCompanyAlias.accountBank}}</p></div>
    </el-card>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>通道信息确认</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">

      <el-col :span="24" class="table_tr textarea_module">
        <el-col :span="3" class="table_td textarea_title" >面签地点<span class="importent">*</span></el-col>
        <el-col :span="21" class="textareawrap" >
          <el-col :span="20" >
            <div class="textarea">
              <textarea placeholder="请输入面签地点,最多50字." :rows="5" v-model="site"  @blur="checkMustWirite('site')"   :maxlength="50"></textarea>
            </div>
          </el-col>
          <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.site">*请输入面签地点</el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="submit">提交</el-button></li>
      </ul>
    </div>

  </div>
</template>

<script>
  import './../style.css'
  export default {
    name: "contractConfirmAffirm",
    data() {
      return {
        aisleList:[],
        companyAliasList:[],
        activeCompanyAlias:{},
        aisle:'',
        site:'',
        trustPlan:"",
        subAccount:"",
        companyAlias:'',
        errorShow:{
          aisle:false,
          companyAlias:false,
          site:false,
        },
        loanAmount :'',
        accBank :'',
        accMobile :'',
        accName :'',
        term :'',
        proCode :'',
        account :'',
      }

    },
    methods: {
      checkMustWirite(name){
        if(this[name]){
          this.errorShow[name] = false
        }else{
          this.errorShow[name] = true
        }
        if('companyAlias' === name){
          for(let i = 0;i < this.companyAliasList.length;i++){

            if(this.companyAlias === this.companyAliasList[i].companyAlias){
              this.activeCompanyAlias =this.companyAliasList[i];
              break
            }
          }

        }
      },
      mustWrite(){
        let bol = true
        if(this.aisle){
          this.errorShow.aisle = false
        }else{
          this.errorShow.aisle = true
          bol =  false
        }
        if(this.site){
          this.errorShow.site = false
        }else{
          this.errorShow.site = true
          bol =  false
        }
        if(this.companyAlias){
          this.errorShow.companyAlias = false
        }else{
          this.errorShow.companyAlias = true
          bol =  false
        }
        console.log(bol)
        return bol
      },
      submit() {
        if(!this.mustWrite()){
          return
        };
        let leadingMan = '';
        let companyAlias = '';
        let companyName = '';

        this.aisleList.forEach(option=>{
          if(option.passageCode === this.aisle){
            leadingMan = option.leadingMan
          }
        })
        this.companyAliasList.forEach(option=>{
          if(option.companyAlias === this.companyAlias){
            companyAlias = option.companyAlias;
            companyName = option.companyName
          }
        })

        this.$http({
          url:'/busChannelConfirmInfo/channelConfirmInfoSubmit',
          data:{
            bussNo:this.$route.query.bussNo,
            passageCode:this.aisle,
            passageName:this.aisle,
            facePlace:this.site,

            leadingMan,
            companyAlias,
            companyName,
            accountName:this.activeCompanyAlias.accountName,
            companyAccountName:this.activeCompanyAlias.accountName,
            companyAccountNo:this.activeCompanyAlias.accountNo,
            companyAccountBank:this.activeCompanyAlias.accountBank,
            accountNo:this.account,
            accountBank:this.accBank,
            loanAmount:this.loanAmount,
            accName:this.accName,
            accMobile:this.accMobile,
            term:this.term,

          },
          callback:res=>{
            this.$message.success('提交成功')
            this.$router.push('/contractConfirmList')
          }
        })
      },
      querySelectOassageWay(){

        this.$http({
          url:'/busChannelConfirmInfo/selectPassageWay',
          data:{
            bussNo:this.$route.query.bussNo,
            proCode:this.proCode,
          },
          callback:res=>{
            this.aisleList = res.data.passageWayVoList
          }
        })
        this.$http({
          url:'/busChannelConfirmInfo/queryComAcctInfo',
          data:{
            bussNo:this.$route.query.bussNo,
            proCode:this.proCode,
          },
          callback:res=>{
            this.companyAliasList = res.data;
          }
        })
      }
    },
    created() {
      this.loanAmount = sessionStorage.getItem("loanAmount");
      this.term = sessionStorage.getItem("term");
      this.accMobile = sessionStorage.getItem("accMobile");
      this.proCode = sessionStorage.getItem("proCode");
      this.accName = sessionStorage.getItem("accName");
      this.accBank = sessionStorage.getItem("accBank");
      this.account = sessionStorage.getItem("account");
      if(sessionStorage.getItem("bussNo") != this.$route.query.bussNo){
        this.$message.warning('请核对借款合同信息和抵押合同信息')
      }
      this.querySelectOassageWay();
      this.$http({
        url:'/busPassageConfirm/selectBusPassageConfirmInfo',
        data:{
          bussNo:this.$route.query.bussNo
        },
        callback:res=>{
          this.aisle = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
        }
      });
      this.$http({
        url:'/busChannelConfirmInfo/queryFacePlace',
        data:{
          cityCode:this.$route.query.cityCode
        },
        callback:res=>{
          this.site = res.data.facePlace;
        }
      })
    }
  };
</script>
