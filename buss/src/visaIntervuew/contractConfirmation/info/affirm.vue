<template>
  <div class="infoPassBaul public">
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>通道信息确认</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">放款通道</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            {{aisle}}&emsp;
            {{trustPlan}}&emsp;
            {{subAccount}}
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">债转公司</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select class="select_width" disabled v-model="companyAlias" placeholder="请选择" size='small'  >
              <el-option v-for="item in companyAliasList" :label="item.companyAlias" :value="item.companyAlias"></el-option>
            </el-select>
          </el-col>
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
              <textarea class="textarea_disabled" disabled placeholder="请输入面签地点,最多50字." :rows="5" v-model="site" :maxlength="50"></textarea>
            </div>
          </el-col>
        </el-col>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import './../style.css'
  export default {
    name: "contractConfirmInfoAffirm",
    data() {
      return {
        info:{},
        aisleList:[],
        companyAliasList:[],
        activeCompanyAlias:{},
        aisle:'',
        site:'',
        trustPlan:"",
        subAccount:"",
        companyAlias:'',
        loanAmount :'',
        accMobile :'',
        accName :'',
        term :'',
        proCode :'',
        account :'',

      }

    },

    methods: {
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
            this.queryInfo()
          }
        })
      },
      queryInfo(){
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
          url:'/busChannelConfirmInfo/selectChannelConfirmInfo',
          data:{
            bussNo:this.$route.query.bussNo
          },
          callback:res=>{
            let data = res.data.busChannelConfirmInfoVo
            this.companyAlias = data.companyAlias;
            this.site = data.facePlace;
            for(let i = 0;i < this.companyAliasList.length;i++){
              console.log(this.companyAlias , this.companyAliasList[i].companyAlias)
              if(this.companyAlias === this.companyAliasList[i].companyAlias){
                this.activeCompanyAlias =this.companyAliasList[i];
                break
              }
            }
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
      this.account = sessionStorage.getItem("account");
      this.querySelectOassageWay();

    }
  };
</script>
