<template>
  <div class="public">
    <h2>准入询值详情</h2>
    <!-- 借款人信息 -->
    <div class="show_list_title">
      <h3><img src="./../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom wz_table_border doNotChange">
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
    <div class="model_2_leave">
      <div class="show_list_title_2">
        <h3><img src="./../assets/house.png" class="listTitleImg"><span>基本信息</span></h3>
      </div>
      <picModule dataType="1":bussNo="$route.query.bussNo" taskType='114' :details="false"/>

      <!-- 抵押物基本信息 -->
      <el-row class="module_margin_bottom wz_table_border doNotChange">
        <el-col class="borrowerInfTr" :span="24">

          <el-col class="borrowerInfTd" :span="3">初评完善备注</el-col>
          <el-col class="borrowerInfTd" :span="21" >{{consummateRemark}}</el-col>
        </el-col>
        <el-col class="borrowerInfTr" :span="24">
          <el-col class="borrowerInfTd" :span="3">图片是否清晰<span class="importent">*</span></el-col>
          <el-col class="borrowerInfTd" :span="21">
            <el-col :span="4"><el-radio class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="1" disabled >清晰</el-radio></el-col>
            <el-col :span="4"><el-radio class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="0" disabled >不清晰</el-radio></el-col>
          </el-col>
        </el-col>
        <div v-if="assessGuaInfoVo.ownershipIsClear != '0'">
          <el-col class="borrowerInfTr" :span="24" >
            <el-col class="borrowerInfTd" :span="3">抵押物地理位置</el-col>
            <el-col class="borrowerInfTd" :span="21">{{assessInfoVo.location}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">抵押物坐落</el-col>
            <el-col class="borrowerInfTd" :span="21">{{assessGuaInfoVo.guaAddress + assessGuaInfoVo.guaBuilding  + assessGuaInfoVo.guaNumber}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">所在区域</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaProperName}}</el-col>
            <el-col class="borrowerInfTd" :span="3">社区名称</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.plotName}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">房产证号</el-col>
            <el-col class="borrowerInfTd" :span="21">{{assessGuaInfoVo.ownershipNo}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">建筑面积(m²)<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaArea}}</el-col>
            <el-col class="borrowerInfTd" :span="3">有效面积(m²)<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.guaEffectiveArea}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24" >
            <el-col class="borrowerInfTd" :span="3">所在楼层</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.floorIn}}</el-col>
            <el-col class="borrowerInfTd" :span="3">总楼层</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.floorSum}}</el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
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

          <el-col class="borrowerInfTr doNotChange" :span="24">
            <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
            <el-col class="borrowerInfTd" :span="3" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
            <el-col class="borrowerInfTd" :span="9" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
          </el-col>
        </div>
      </el-row>
      <!-- 初评历史 -->
      <div class="show_list_title_2">
        <h3 @click="showThree"><img src="./../assets/house.png" class="listTitleImg"><span>初评历史<i class="describe"> (点击展开全部)</i></span></h3>
      </div>
      <!-- 列表展示 -->
      <el-table :data="tableData" border stripe style="width: 100%" class="table">
        <el-table-column  header-align="center" align="center" prop="bussNo" label="订单编号" min-width="100"></el-table-column>
        <el-table-column  header-align="center" align="center" prop="orgCode" label="机构代码" min-width="120"></el-table-column>
        <el-table-column  header-align="center" align="center" prop="finishTime" label="初评时间" min-width="180"></el-table-column>
        <el-table-column  header-align="center" align="center" prop="taskPerName" label="初评任务员" min-width="130"></el-table-column>
        <!--<el-table-column header-align="center" align="center" prop="assessUnitPrice" label="单价(万元)" min-width="180"></el-table-column>-->
        <!--<el-table-column header-align="center" align="center" prop="assessTotalPrice" label="初评总价(万元)" min-width="180"></el-table-column>-->
        <el-table-column  header-align="center" align="left" prop="remark" label="初评历史" min-width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.enquiryString"></span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="remark" label="备注" ></el-table-column>
      </el-table>
      <!-- 询值 -->
      <div class="show_list_title_2">
        <h3><img src="./../assets/house.png" class="listTitleImg"><span>询值</span></h3>
      </div>

      <!--api询值-->
      <searchValues ref="searchValue" :disabled="true" :bussNo="$route.query.bussNo" :guaArea="assessGuaInfoVo.guaArea"></searchValues>

      <appraisement-Info v-if="introductionBol" :srcData="introduction" :area="this.custBaseInfo.areaCode"></appraisement-Info>

      <!--<el-row class=" module_margin_bottom wz_table_border doNotChange">
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="6" class="borrowerInfTd">世联评估单价(万元/m²)</el-col>
          <el-col :span="18" class="borrowerInfTd">{{sLprice}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="6" class="borrowerInfTd">房估估评估单价(万元/m²)</el-col>
          <el-col :span="18" class="borrowerInfTd">{{fggPrice}}</el-col>
        </el-col>
      </el-row>-->
      <picModule dataType="2" :bussNo="$route.query.bussNo" taskType='114' :details="false" />
      <!--<el-row class=" module_margin_bottom wz_table_border doNotChange">
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="4" class="borrowerInfTd">初评单价(万元/m²)</el-col>
          <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.assessUnitPrice}}</el-col>
          <el-col :span="3" class="borrowerInfTd">初评总价(万元)</el-col>
          <el-col :span="9" class="borrowerInfTd">{{assessInfoVo.assessTotalPrice}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="3" class="borrowerInfTd">抵押顺位</el-col>
          <el-col :span="9" class="borrowerInfTd">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
          <el-col :span="3" class="borrowerInfTd" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
          <el-col :span="9" class="borrowerInfTd" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="3" class="borrowerInfTd">初评抵押率(%)</el-col>
          <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.mortgageRate}}</el-col>
          <el-col :span="5" class="borrowerInfTd">最大综合可贷款额(万元)</el-col>
          <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.maxLoanAmount}}</el-col>
        </el-col>
      </el-row>-->
    </div>
    <!-- 准入审批结果 -->
    <div class="show_list_title">
      <h3><img src="./../assets/house.png" class="listTitleImg"><span>准入审批结果</span></h3>
    </div>
    <el-row class="module_margin_bottom wz_table_border doNotChange table_height">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="8" class="borrowerInfTd">准入结果 </el-col>
        <el-col :span="8" class="borrowerInfTd">
          <el-radio class="radio" v-model="isAdmittance" label="1" disabled>准入</el-radio>
        </el-col>
        <el-col :span="8" class="borrowerInfTd">
          <el-radio class="radio" v-model="isAdmittance" label="0" disabled>拒绝</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr" v-if="isAdmittance == '0'">
        <el-col :span="8" class="borrowerInfTd refuse">拒绝原因 </el-col>
        <el-col :span="16" class="borrowerInfTd">{{assessInfoVo.refusalReason}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr" v-if="isAdmittance == '1'">
        <el-col :span="8" class="borrowerInfTd">备注</el-col>
        <el-col :span="16" class="borrowerInfTd">{{assessInfoVo.remark}}
        </el-col>
      </el-col>
    </el-row>
    <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button class="inquireBtn" @click="goback">返回</el-button></el-col>
  </div>
</template>

<script>
  let tableData = []
  export default {
    name:"accessDetail",
    data() {
      return{
        isImgClear:'',
        tableData:[],
        positionList:[],
        isAdmittance:'0',
        custBaseInfo:{},
        assessGuaInfoVo:{},
        assessInfoVo:{},
        consummateRemark:'',
        assessValue:'',
        fggassessValue:'',
        fggPrice:'',
        sLprice:'',
        introduction:null,
        introductionBol:false,
        houseTypeListL:[],
        conHouseNatureVoList:[],
      }
    },
    methods : {
      goback () {
        this.$router.push('/accessToValueList')
      },
      showThree () {
        if(this.tableData.length == 3){
          this.tableData = tableData;
        }else{
          this.tableData = tableData.slice(0,3);
        }
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
    filters:{
    },
    created(){
      this.getCityConfig()
    },
    beforeCreate () {
      // 借款人信息
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.bussNo},(res)=>{
        this.custBaseInfo = res.data.custBaseInfo
        this.cityCongif(this,'/configuration/selectHouseTypeConf',this.custBaseInfo.areaCode,(res)=>{
          this.houseTypeList = res.data.conHouseTypeVoList
        })
        this.cityCongif(this,'/configuration/selectHouseNatureConf',this.custBaseInfo.areaCode,(res)=>{
          this.conHouseNatureVoList = res.data.conHouseNatureVoList
        })

      })
      // 抵押物信息
      $.post(this._path + '/assess/selectAssessInfo',{bussNo:this.$route.query.bussNo},(res)=>{
        this.assessGuaInfoVo = res.data.assessGuaInfoVo;
        this.assessInfoVo = res.data.assessInfoVo;
        this.introductionBol = true
        this.introduction = {
          assessGuaInfoVo:JSON.parse(JSON.stringify(res.data.assessGuaInfoVo)),
          assessInfoVo:JSON.parse(JSON.stringify(res.data.assessInfoVo))
        }


        this.assessInfoVo.assessUnitPrice = (this.assessInfoVo.assessUnitPrice * 1).toFixed(4);
        this.assessInfoVo.assessTotalPrice = (this.assessInfoVo.assessTotalPrice * 1).toFixed(6);
        let num = res.data.assessInfoVo.maxLoanAmount*1;
        this.assessInfoVo.maxLoanAmount = num.toFixed(0);
        this.consummateRemark = res.data.consummateRemark;
        if(this.assessInfoVo.remark){
          if(this.assessInfoVo.remark.indexOf('房估估人工录入') == -1){
            this.introduction.is98 = 0
          }else{
            this.introduction.is98 = 1
          }
        }
        // 世联询值
        if(res.data.assessValueVos.length){
          for(let i = 0; i < res.data.assessValueVos.length;i++) {
            switch (res.data.assessValueVos[i]['assessCode']) {
              case 'BJ-002':
                this.sLprice = res.data.assessValueVos[i].assessValue;
                this.introduction.sLprice = this.sLprice
                break;
              case 'BJ-001':
                this.fggPrice= res.data.assessValueVos[i].assessValue;
                this.introduction.fggPrice = this.fggPrice
                break;
              case 'HF-001':
                this.housePrice= res.data.assessValueVos[i].assessValue;
                this.introduction.housePrice = this.housePrice
                break;
            }
          }
        }
        // 初评历史
        $.post(this._path + '/assess/selectAssessInfoHis',{bussNo:this.$route.query.bussNo,ownershipNo:this.assessGuaInfoVo.ownershipNo},(res)=>{
          this.tableData = res.data.assessHisInfoVos.slice(0,3);
          tableData = res.data.assessHisInfoVos;
        })
        // 图片清晰
        this.isImgClear = res.data.assessGuaInfoVo.ownershipIsClear;
        // 是否准入
        this.isAdmittance = res.data.assessInfoVo.assessResult;
        if(this.isAdmittance=='0'){
          res.data.assessInfoVo.refusalReason = res.data.assessInfoVo.refusalReason.replace(/\d\:/g,'  ')
        }
      })

    }
  }
</script>
