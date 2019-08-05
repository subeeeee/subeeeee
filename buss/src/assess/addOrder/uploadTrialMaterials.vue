<template>
  <div class="public completeInfo addOrder preliminaryInfo">
    <h2>上传基本材料</h2>
    <div class="show_list_title ">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class="borrowerInfo module_margin_bottom showBorrowerInfo doNotChange">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">订单编号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.bussNo}}</el-col>
        <el-col :span="3" class="borrowerInfTd">城市</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.areaName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">借款人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.custName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">身份证号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.certNo}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">性别</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.sex | sexFilter}}</el-col>
        <el-col :span="3" class="borrowerInfTd">出生日期</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.birthday}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">年龄</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.age}}</el-col>
        <el-col :span="3" class="borrowerInfTd">机构代码</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.orgCode}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">经纪人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.brokerName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">经纪人手机号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.brokerMobile}}</el-col>
      </el-col>
    </el-row>
    <!-- 抵押物信息 -->
    <div class="show_list_title">
      <h3><img src="./../../assets/house.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>
    <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='110' :details="false" class="addImg"/>
    <el-row class="module_margin_bottom borrowerInfo doNotChange">
      <el-col class="borrowerInfTr" :span="24">
        <el-col class="borrowerInfTd" :span="3">房产证号</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.ownershipNo}}</el-col>
        <!-- 房产证号类型 -->
        <el-col class="borrowerInfTd" v-if="1" :span="12"></el-col>
      </el-col>
      <el-col class="borrowerInfTr " :span="24">
        <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
        <el-col class="borrowerInfTd" :span="3" v-if="assessGuaInfoVo.firstPledge != '01'&&assessGuaInfoVo.firstPledge != '03'">已抵押金额(万元)</el-col>
        <el-col class="borrowerInfTd" :span="9" v-if="assessGuaInfoVo.firstPledge != '01'&&assessGuaInfoVo.firstPledge != '03'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
      </el-col>
    </el-row>
    <picModule dataType="2" :bussNo="$route.query.bussNo" taskType='116' :details="true" class="addImg"/>
    <el-col :span="24" class="buttom_btn_warp">
      <el-col :offset="11" :span="2">
        <el-button @click="sub()" size="small" class="buttom_btn">提 交</el-button>
      </el-col>

    </el-col>
  </div>
</template>

<script>
  export default {
    name: "uploadTrialMaterials",
    data(){
      return {
        custBaseInfo:{},
        assessGuaInfoVo:{}
      }
    },
    methods: {
      sub () {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submit()
        })
      },
      submit () {
        let params = {
          bussNo:this.$route.query. bussNo
        }
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        $.post(this._path + '/busOrderFormInfo/insertBusOrdersForm',params,res=>{
          loading.close();
          if(res.resultCode == '0000'){
            this.$message({
              type:'success',
              message:'提交成功',
              duration:'1500',
              showClose:1
            })
            this.$router.push('/addOrderList')
          }else{
            this.requestError(res,this)
          }
        })

      }
    },
    created() {
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
        if(res.resultCode === '0000'){
          this.custBaseInfo = res.data.custBaseInfo;
          this.cityCongif(this,'/configuration/selectHouseTypeConf',this.custBaseInfo.areaCode,(res)=>{
            this.houseTypeList = res.data.conHouseTypeVoList
          });
          this.cityCongif(this,'/configuration/selectHouseNatureConf',this.custBaseInfo.areaCode,(res)=>{
            this.conHouseNatureVoList = res.data.conHouseNatureVoList
          })
        }else{
          this.requestError(res,this)
        }

      });
      $.post(this._path + '/consummate/selectConsummateInfo',{bussNo:this.$route.query.bussNo},(res)=>{
        if(res.resultCode === '0000'){
          this.assessGuaInfoVo = res.data.assessGuaInfoVo
        }else{
          this.requestError(res,this)
        }
      })
    }


  }
</script>

<style scoped>

</style>
