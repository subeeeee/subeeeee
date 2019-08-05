<template>
  <div class="public completeInfo addOrder preliminaryInfo">
    <h2>完善信息详情</h2>
    <!-- 借款人信息 -->
    <div class="show_list_title ">
      <h3><img src="./../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
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
      <h3><img src="./../assets/house.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>
    <picModule dataType="1" :bussNo="$route.query.params" taskType='112' :details="false" class="addImg"/>
    <el-row class="module_margin_bottom borrowerInfo doNotChange">
      <el-col class="borrowerInfTr" :span="24">
        <el-col class="borrowerInfTd" :span="3">图片是否清晰<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="21">
          <el-col :span="4"><el-radio :disabled="true" class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="1">清晰</el-radio></el-col>
          <el-col :span="4"><el-radio :disabled="true" class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="0">不清晰</el-radio></el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">抵押物地理位置</el-col>
        <el-col class="borrowerInfTd" :span="21">{{assessGuaInfoVo.location}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">抵押物坐落</el-col>
        <el-col class="borrowerInfTd" :span="21">{{assessGuaInfoVo.guaAddress + assessGuaInfoVo.guaBuilding  + assessGuaInfoVo.guaNumber==0?'':assessGuaInfoVo.guaAddress + assessGuaInfoVo.guaBuilding  + assessGuaInfoVo.guaNumber}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">所在区域</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaProperName}}</el-col>
        <el-col class="borrowerInfTd" :span="3">社区名称</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.plotName}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">房产证号</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.ownershipNo}}</el-col>
        <!-- 房产证号类型 -->
        <el-col class="borrowerInfTd" v-if="1" :span="12"></el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">建筑面积(m²)</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaArea}}</el-col>
        <el-col class="borrowerInfTd" :span="3">有效面积(m²)</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaEffectiveArea}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">所在楼层</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.floorIn}}</el-col>
        <el-col class="borrowerInfTd" :span="3">总楼层</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.floorSum}}</el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">规划用途</el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-select v-model="assessGuaInfoVo.houseType" disabled class="select_width" size='small'>
            <el-option v-for="item in houseTypeList" :label="item.typeName" :value="item.typeCode"></el-option>
          </el-select>
        </el-col>
        <el-col class="borrowerInfTd" :span="3">房屋性质</el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-select v-model="assessGuaInfoVo.houseNature" disabled class="select_width" size='small'>
            <el-option v-for="item in conHouseNatureVoList" :label="item.natureName" :value="item.natureCode"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr " :span="24" v-if="assessGuaInfoVo.ownershipIsClear != '0'">
        <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
        <el-col class="borrowerInfTd" :span="3" v-if="assessGuaInfoVo.firstPledge != '01'&&assessGuaInfoVo.firstPledge != '03'">已抵押金额(万元)</el-col>
        <el-col class="borrowerInfTd" :span="9" v-if="assessGuaInfoVo.firstPledge != '01'&&assessGuaInfoVo.firstPledge != '03'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
      </el-col>
    </el-row>
    <!-- 备注信息 -->
    <div class="show_list_title ">
      <h3><img src="./../assets/task.png" class="listTitleImg"><span>备注</span></h3>
    </div>
    <el-row class="module_margin_bottom borrowerInfo doNotChange" >
      <el-col class="borrowerInfTr" :span="24" >
        <el-col class="borrowerInfTd housePhoto" :span="3">备注</el-col>
        <el-col class="borrowerInfTd housePhoto remark" :span="21"> {{remark}}</el-col>
      </el-col>
    </el-row>
    <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button class="inquireBtn" @click="goback">返回</el-button></el-col>

  </div>
</template>
<script>
  import './../style/preliminaryInfo.css'
  export default {
    name:'preliminaryInfo',
    data () {
      return{
        msg:'preliminaryInfo',
        isImgClear:'1',
        assessGuaInfoVo :{},
        custBaseInfo:{},
        remark:'',
        houseTypeList:[],
        conHouseNatureVoList:[],
        positionList:[],
      }
    },
    filters:{

    },
    methods : {
      goback () {
        this.$router.push('/initialConsummate')
      },
      getCityConfig(){
        this.$http({
          url:'/business/selectCityConfigByCityCode',
          data:{
            cityCode:this.$route.query.cityCode
          },
          callback:res=>{
            this.positionList = res.data.conLocationDTOList
          }
        })
      },
    },
    created(){
      this.getCityConfig()
    },
    beforeCreate () {
      // 抵押物信息
      $.post(this._path + '/consummate/selectConsummateInfo',{bussNo:this.$route.query.params},(res)=>{
        this.assessGuaInfoVo.firstPledge = res.data.firstPledge
        this.assessGuaInfoVo = res.data.assessGuaInfoVo;
        this.remark = res.data.ConsummateInfoVo.remark
        // 初始化包过单子的房产证号
        let guaInfo = res.data.assessGuaInfoVo;
        if(guaInfo.guaProper){
          this.area = guaInfo.guaProper;
        }
        if(guaInfo.plotName){
          this.communityName = guaInfo.plotName;
        }
        if(guaInfo.guaArea){
          this.guaArea = guaInfo.guaArea;
        }
        if(guaInfo.guaEffectiveArea){
          this.guaEffectiveArea = guaInfo.guaEffectiveArea;
        }
        if(guaInfo.houseType){
          this.houseType = guaInfo.houseType;
        }
        if(guaInfo.houseNature){
          this.houseNature = guaInfo.houseNature;
        }
        if(guaInfo.guaAddress){
          this.address = guaInfo.guaAddress;
        }
        if(guaInfo.guaBuilding){
          this.building = guaInfo.guaBuilding;
        }
        if(guaInfo.guaNumber){
          this.houseNumber = guaInfo.guaNumber;
        }


      });

      // 查询借款人基本信息
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.params},(res)=>{
        this.custBaseInfo = res.data.custBaseInfo
        this.cityCongif(this,'/configuration/selectHouseTypeConf',this.custBaseInfo.areaCode,(res)=>{
          this.houseTypeList = res.data.conHouseTypeVoList
        })
        this.cityCongif(this,'/configuration/selectHouseNatureConf',this.custBaseInfo.areaCode,(res)=>{
          this.conHouseNatureVoList = res.data.conHouseNatureVoList
        })
      })
    }
  }
</script>

