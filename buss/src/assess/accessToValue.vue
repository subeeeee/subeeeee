<template>
  <div class="accessToValue public">
    <h2>准入询值</h2>
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
      <h3><img src="./../assets/house.png" class="listTitleImg"><span>抵押物信息</span></h3>
    </div>
    <div class="model_2_leave">
      <div class="show_list_title_2">
        <h3><img src="./../assets/house.png" class="listTitleImg"><span>基本信息</span></h3>
      </div>

      <!-- 抵押物基本信息 -->
      <picModule dataType="1" :bussNo="$route.query.bussNo" taskType='114' :details="false" />

      <el-row class="module_margin_bottom wz_table_border table_height">
        <el-col class="borrowerInfTr" :span="24">

          <el-col class="borrowerInfTd" :span="3">初评完善备注</el-col>
          <el-col class="borrowerInfTd" :span="21">{{consummateRemark}}</el-col>
        </el-col>
        <el-col class="borrowerInfTr" :span="24">
          <el-col class="borrowerInfTd" :span="3">图片是否清晰<span class="importent">*</span></el-col>
          <el-col class="borrowerInfTd" :span="21">
            <el-col :span="4">
              <el-radio class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="1" disabled>清晰</el-radio>
            </el-col>
            <el-col :span="4">
              <el-radio class="radio" v-model="assessGuaInfoVo.ownershipIsClear" label="0" disabled>不清晰</el-radio>
            </el-col>
          </el-col>
        </el-col>
        <div v-if="assessGuaInfoVo.ownershipIsClear ==='1'">
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">抵押物地理位置<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="21">
              <el-col :span="15"  class="addordertableselect">
                <el-select v-model="location" placeholder="请选择抵押物地理位置" class="select_width"  size='small'  @change="andatoryVerification('抵押物地理位置')">
                  <el-option v-for="item in positionList" :key="item.value" :label="item.locationName" :value="item.locationCode"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9" class="error_title" v-if="errorShow.location">请选择抵押物地理位置</el-col>
            </el-col>
          </el-col>

          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">抵押物坐落<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="21">
              <el-col :span="3">地址</el-col>
              <el-col :span="8">
                <el-input size="small" v-model="address" @blur="andatoryVerification('地址')"></el-input>
              </el-col>
              <el-col :span="3">楼栋</el-col>
              <el-col :span="3">
                <el-input size="small" v-model="building" @blur="andatoryVerification('楼栋')"></el-input>
              </el-col>
              <el-col :span="3">门牌号</el-col>
              <el-col :span="3">
                <el-input size="small" v-model="houseNumber" @blur="andatoryVerification('门牌号')"></el-input>
              </el-col>
            </el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">所在区域<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="15" class="addordertableselect">
                <el-select v-model="area" placeholder="请选择" class="select_width" size='small' @blur="andatoryVerification('所在区域')">
                  <el-option v-for="item in areas" :label="item.areaName" :value="item.areaCode"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9" class="error_title" v-if="isArea"> *请选择所在区域</el-col>
            </el-col>
            <el-col class="borrowerInfTd" :span="3">社区名称<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="15">
                <el-input size="small" class="input_width" placeholder="请输入社区名称" @blur="andatoryVerification('社区名称')" v-model="communityName"></el-input>
              </el-col>
              <el-col :span="9" class="error_title" v-if="isCommunityName"> *社区名称不可为空</el-col>
            </el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">房产证号<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="15" class="addordertableselect">
                <el-select v-model="ownershipType" placeholder="请选择" class="select_width"  size='small' @change="ownershipTypeChange">
                  <el-option v-for="item in houseOwnershipDTOList" :label="item.ownershipType" :value="item.ownershipCode"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9" class="error_title" v-if="isHouseCardType"> *请选择房产证号类型</el-col>
            </el-col>
            <!-- 房产证号类型 -->
            <el-col class="borrowerInfTd" :span="12">
              <ownership-no :ownershipList="houseOwnershipDTOList" :changeValue="false" @valueChange="valueChange" :ownershipNo="ownershipNo" :ownershipType="ownershipType" ref="changeOwnershipType" @finish="finish"></ownership-no>
            </el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">建筑面积(m²)<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="10" class="addordertableselect">
                <el-input size="small" placeholder="请输入建筑面积" @blur="andatoryVerification('建筑面积')" v-model="guaArea"></el-input>
              </el-col>
              <el-col :span="14" class="error_title" v-if="isGuaArea"> *请输入大于0的数</el-col>
              <el-col :span="14" class="error_title" v-if="isGuaAreaGTEArea"> *有效面积不能大于建筑面积</el-col>
            </el-col>
            <el-col class="borrowerInfTd" :span="3">有效面积(m²)<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="10" class="addordertableselect">
                <el-input size="small" placeholder="请输入有效面积" @blur="andatoryVerification('有效面积')" v-model="guaEffectiveArea"></el-input>
              </el-col>
              <el-col :span="14" class="error_title" v-if="isGuaEffectiveArea"> *请输入大于0的数</el-col>
              <el-col :span="14" class="error_title" v-if="isEAreaLTGuaArea"> *有效面积不能大于建筑面积</el-col>
            </el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">所在楼层<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入所在楼层" @keyup.native="number('floorIn')" @blur="andatoryVerification('所在楼层')" v-model="floorIn"></el-input></el-col>
              <el-col :span="11" class="error_title" v-if="floorInBol"> *请输入大于0的数</el-col>
            </el-col>
            <el-col class="borrowerInfTd" :span="3">总楼层<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入总楼层" @keyup.native="number('floorSum')" @blur="andatoryVerification('总楼层')" v-model="floorSum"></el-input></el-col>
              <el-col :span="11" class="error_title" v-if="floorSumBol"> *请输入大于0的数</el-col>
            </el-col>
          </el-col>
          <el-col class="borrowerInfTr" :span="24">
            <el-col class="borrowerInfTd" :span="3">规划用途<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="15" class="addordertableselect">
                <el-select v-model="houseType" placeholder="请选择" class="select_width" size='small' @change="andatoryVerification('规划用途')">
                  <el-option v-for="item in houseTypeList" :label="item.typeName" :value="item.typeCode"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9" class="error_title" v-if="isHouseType"> *请选择规划用途</el-col>
            </el-col>
            <el-col class="borrowerInfTd" :span="3">房屋性质<span class="importent">*</span></el-col>
            <el-col class="borrowerInfTd" :span="9">
              <el-col :span="15" class="addordertableselect">
                <el-select v-model="houseNature" placeholder="请选择" class="select_width" size='small' @change="andatoryVerification('房屋性质')">
                  <el-option v-for="item in conHouseNatureVoList" :label="item.natureName" :value="item.natureCode"></el-option>
                </el-select>
              </el-col>
              <el-col :span="9" class="error_title" v-if="isHouseNature"> *请选择规房屋性质</el-col>
            </el-col>
          </el-col>

          <el-col class="borrowerInfTr doNotChange" :span="24">
            <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
            <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
            <el-col class="borrowerInfTd" :span="3"  v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
            <el-col class="borrowerInfTd" :span="9"  v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
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
        <!--<el-table-column v-if="custBaseInfo.areaCode == '340100'" prop="assessUnitPrice" label="房屋价值(万元)" min-width="200"></el-table-column>-->
        <!--<el-table-column header-align="center" align="center" prop="assessUnitPrice" label="单价(万元)" min-width="180"></el-table-column>-->
        <!--<el-table-column header-align="center" align="center" prop="assessTotalPrice" label="初评总价(万元)" min-width="180"></el-table-column>-->
        <el-table-column  header-align="center" align="left" prop="remark" label="初评历史" min-width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.enquiryString"></span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="remark" label="备注" min-width="130"></el-table-column>
      </el-table>
      <!-- 询值 -->
      <div class="show_list_title_2">
        <h3><img src="./../assets/house.png" class="listTitleImg"><span>询值</span></h3>
      </div>
      <!--api询值-->
      <searchValues ref="searchValue" :disabled="false" :areaCode="custBaseInfo.areaCode" :srcData="introduction"  :keyword="communityName" :bussNo="$route.query.bussNo" :guaArea="guaArea" @messageValue="messageValue" @average="average" @getEnquiryInfo="present"></searchValues>
      <appraisement-content ref="appraisement"  v-if="introductionBol" @message="message($event)" @priceBol="chuPriceBol($event)" :srcData="introduction" ></appraisement-content>
      <picModule  :bussNo="$route.query.bussNo" taskType='114' dataType="2" class="module_margin_bottom"/>
    </div>
    <!-- 准入审批结果 -->
    <div class="show_list_title">
      <h3><img src="./../assets/house.png" class="listTitleImg"><span>准入审批结果</span></h3>
    </div>
    <el-row class="module_margin_bottom wz_table_border">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="4" class="borrowerInfTd">准入结果 <span class="importent">*</span></el-col>
        <el-col :span="10" class="borrowerInfTd">
          <el-radio-group v-model="isAdmittance">
            <el-radio label="1">准入</el-radio>
            <el-radio label="0">拒绝</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr" v-if="isAdmittance == '0'">
        <el-col :span="4" class="borrowerInfTd refuse">拒绝原因 <span class="importent">*</span></el-col>
        <el-col :span="20" class="borrowerInfTd">
          <el-col :span="24" class="borrowerInfTr">
            <el-checkbox v-for="item in refusalCause" v-model="item.isChecked">{{item.content}}</el-checkbox>
          </el-col>
          <el-col :span="24" class="borrowerInfTr" v-if="refusalCause[8].isChecked">
            <el-input placeholder="请填写拒绝原因。" :maxlength="2000" v-model="refusalCauseText"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr"  v-if="isAdmittance == '1'">
        <el-col :span="4" class="borrowerInfTd">备注</el-col>
        <el-col :span="20" class="borrowerInfTd">
          <el-input placeholder="请输入备注信息。" :maxlength="2000" v-model="remark"></el-input>
        </el-col>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="inquireBtn_warp">
      <el-col :offset='10' :span='2'>
        <el-button class="inquireBtn" @click="save">保 存</el-button>
      </el-col>
      <el-col :span='2'>
        <el-button class="inquireBtn" @click="submit">提 交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let tableData = [];
  import "./../style/accessToValue.css";
  export default {
    name: "accessToValue",
    data() {
      return {
        //传入的对象
        introduction:{},
        houseTypeList:[],
        conHouseNatureVoList:[],

        floorIn:'',
        floorSum:'',
        floorSumBol:false,
        floorInBol:false,

        loading1:false,
        loading2:false,

        fggPrice:'',
        fggPriceVisible:false,
        fggPriceBol:false,
        /* fgg:{   // 房估估所需字段
           keyword:'',//抵押物坐落
           city:'',//市
           pawnKeyword:'', //抵押物坐落关键字
           uptownName:'',//小区名称
           buildingId:'',//楼栋
           builds:[],//楼栋数组
           unit:'',//单元
           units:[],//单元数组
           floor:'',//所在层
           allFloor:'',//总层
           houseId:'',//门牌号
           houses:[],// 门牌号数组
           tenementType:'',//物业类型
           tenementTypeList:[],//物业类型数组
           orientation:'无',//朝向
           orientationList:[],//朝向数组
           completedTime:'',//建成年代
           special:'无',//特殊因素
           specialList:[],//特殊因素数组
           area:'',//房屋面积
           buildsName:'',//楼名
           unitsName:'',//单元名
           houseName:'',
         },*/

        isHouseNumChange:false,
        dialogVisible: false,
        cities: [],
        citie: "",
        keyword: "",
        constructions: [],
        buildings: [],
        slArea: "",
        houseId: "",
        buildingId: "",
        constructionId: "",
        builds: [],
        houses: [],
        sLprice: "",
        sLpriceBol: false,
        sLBol: false,
        // 初评单价
        unitPrice: '',
        refuse: '',
        refuses: [],
        isAdmittance: '',
        tableData: [],
        address: '',
        building: '',
        houseNumber: '',
        area: '',
        assessTotalPrice: '',
        areas: [],
        communityName: "",
        houseCardNumberStyle: '',
        houseCardNumberStyles: [],
        houseType: '',
        houseNature: '',
        guaArea: '',
        guaEffectiveArea: '',
        pawnAmount: '',
        isArea: false,
        isCommunityName: false,
        isHouseCardType: false,
        isPurpose: false,
        isRoomType: false,
        isPawnAmount: false,
        isGuaArea: false,
        isGuaEffectiveArea: false,
        isHouseNature: false,
        isHouseType: false,
        isUnitPrice: false,
        isGuaAreaGTEArea: false,
        isEAreaLTGuaArea: false,
        custBaseInfo: {},
        consummateRemark: {},
        assessGuaInfoVo: {},
        ownershipType: '?',
        location:"",
        errorShow:{
          location:false,
        },
        refusalCause: [
          { isChecked: false, content: '借款人年龄不符合要求', id: 0 },
          { isChecked: false, content: '抵押物所在区域不符合要求', id: 1 },
          { isChecked: false, content: '面积不符合要求', id: 2 },
          { isChecked: false, content: '规划用途不符合要求', id: 3 },
          { isChecked: false, content: '房屋性质不符合要求', id: 4 },
          { isChecked: false, content: '可贷款金额不足', id: 5 },
          { isChecked: false, content: '图片不清晰', id: 6 },
          { isChecked: false, content: '房龄不符合要求', id: 7 },
          { isChecked: false, content: '其他', id: 8 },
          { isChecked: false, content: '询不到值', id: 9 },
          { isChecked: false, content: '房本照片提供信息不足', id: 10 },
        ],
        refusalCauseText: '',
        remark: '',
        collateralRate: 0,
        // 房产证号
        // 新
        newHouse0:"",
        newHouse1: "",
        newHouse2: "",
        // 旧
        oldHouse1: "",
        oldHouse2: "",
        oldHouse3: "",

        cityCode: "",
        isConstructionId: false,
        isBuildingId: false,
        isHouseId: false,
        isSlArea: false,
        priceBol: true,
        fggConstructions:[],
        constructionsBol:false,
        introductionBol:false,

        housePrice:'',
        houseOwnershipDTOList:[],
        ownershipNo:'',
        ownershipTypeBol:false,
        assessOrgValueVoList:[], //城市配置list

        systemList:[],
        systemBol:false,
      };
    },
    computed:{
      maxLoanAmountFn(){
        let n = ''
        n = this.guaEffectiveArea * this.unitPrice * this.collateralRate / 100 - this.assessGuaInfoVo.pledgeAmount
        n = n.toFixed(0)
        return n
      },
      fggKeyword(){
        return (this.address + this.building + this.houseNumber)
      }
    },
    methods: {
      finish(obj){
        this.ownershipNo = obj.ownershipNo;
        this.ownershipNoBol = obj.ownershipNoBol
      },
      valueChange(obj){
        this.$alert("房产证号已修改，请核对清楚后提交！",'提示信息',{
          confirmButtonText:'确认',
          callback:action => {
            let params = {
              bussNo: this.$route.query.bussNo,
              ownershipNo:obj.ownershipNoStr
            }
            $.post(this._path + '/assess/selectAssessInfoHis', params, (res) => {
              this.tableData = res.data.assessHisInfoVos.slice(0,3);
              tableData = res.data.assessHisInfoVos;
            })
          }
        })
      },
      ownershipTypeChange () {
        console.log('外部change:'+this.ownershipType)
        this.$refs.changeOwnershipType.initOwnershipNo(this.ownershipType)
      },
      chuPriceBol(obj){
        this.isUnitPrice = obj.isUnitPrice;
        this.unitPrice = obj.price;
        //区分城市的写法
        /*switch (this.custBaseInfo.areaCode){
          case '110100':

            break;
          case '340100':
            this.housePrice = obj.price;
            break
        }*/
      },
      message(obj){
        this.fggPrice = obj.fggPrice;
        this.sLprice = obj.sLprice;
        this.unitPrice = obj.unitPrice;
        if(this.remark){
          if(this.remark.indexOf(obj.remark) == -1){
            this.remark =   this.remark + '；'+ obj.remark
          }
        }else{
          this.remark = obj.remark
        }
      },
      messageValue(obj){
        this.systemList = obj.systemList;
        this.systemBol = obj.bol;
      },
      average(price){
        this.$refs.appraisement.pirce(price)
      },
      queryFirstAccessRate () {
        if(this.custBaseInfo.areaCode){
          $.post(this._path + "/business/queryMortgageRate",
            {
              cityCode: this.custBaseInfo.areaCode,
              firstPledge: this.assessGuaInfoVo.firstPledge,
              houseType: this.houseType,
              natureCode:this.houseNature,
              locationCode:this.location
            }, res => {
              let conMortgageRateDTO = res.data.conMortgageRateDTO;
              this.collateralRate = conMortgageRateDTO.mortgageRate
              this.introduction.collateralRate = conMortgageRateDTO.mortgageRate
              this.$refs.appraisement.getcollateralRate(this.collateralRate)
            })
        }else{
          setTimeout(()=>{
            this.queryFirstAccessRate()
          },100)
        }
      },
      showThree() {
        if(this.tableData.length == 3){
          this.tableData = tableData;
        }else{
          this.tableData = tableData.slice(0,3);
        }

      },
      number(str){
        this[str] = this[str].replace(/[^\d.]/g,'');
        console.log(this[str])
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
      // 必填项行验证
      andatoryVerification(type) {
        switch (type) {
          case "地址":
            if (!this.address) {
              this.$message({
                type: "warning",
                message: "请输入地址",
                duration: 1500,
                showClose: true
              });
            }
            break;
          case "楼栋":
            if (!this.building) {
              this.$message({
                type: "warning",
                message: "请输入楼栋",
                duration: 1500,
                showClose: true
              });
            }
            break;
          case "门牌号":
            if (!this.houseNumber) {
              this.$message({
                type: "warning",
                message: "请输入门牌号",
                duration: 1500,
                showClose: true
              });
            }
            break;
          case "房产证号":
            this.$refs.changeOwnershipType.initOwnershipNo(this.ownershipType)
            if (!this.ownershipType) {
              this.isHouseCardType = true;
            } else {
              this.isHouseCardType = false;
            }
            break;
          case "社区名称":
            if (!this.communityName || this.communityName.length > 50) {
              this.isCommunityName = true;
            } else {
              this.isCommunityName = false;
              this.introduction.communityName = this.communityName
            }
            break;
          case "所在区域":
            if (!this.area) {
              this.isArea = true;
            } else {
              this.isArea = false;
            }
            break;
          case "建筑面积":
            // this.guaEffectiveArea = (this.guaEffectiveArea * 1).toFixed(2);
            if (this.guaArea && this.guaEffectiveArea) {
              if (this.guaArea/1 < this.guaEffectiveArea/1) {
                this.$message({
                  message: "有效面积不能大于建筑面积",
                  type: "error",
                  duration: 1500,
                  showClose: 1
                });
              }
            }
            if (!this.guaArea || this.guaArea/1 < 1 || !this._utils.isDecimals(this.guaArea)) {
              this.isGuaArea = true;
            } else {
              if (this._utils.isDecimals(this.guaArea) && this._utils.isDecimals(this.guaEffectiveArea) && this.guaArea * 1 < this.guaEffectiveArea * 1) {
                this.isGuaAreaGTEArea = true;
              } else {
                this.isGuaAreaGTEArea = false;
                this.isEAreaLTGuaArea = false;
              }
              let b = this.guaArea/1;
              this.guaArea = b.toFixed(2);
              //建筑面积传进来
              this.introduction.guaEffectiveArea = this.guaArea
              this.introduction.guaArea = this.guaArea
              this.$refs.appraisement.guaEffectiveAreaFn(this.guaArea)
              this.isGuaArea = false;
            }
            break;
          case "有效面积":
            // this.guaEffectiveArea = (this.guaEffectiveArea * 1).toFixed(2);
            if (this.guaArea && this.guaEffectiveArea) {
              if (this.guaArea/1 < this.guaEffectiveArea/1) {
                this.$message({
                  message: "有效面积不能大于建筑面积",
                  type: "error",
                  duration: 1500,
                  showClose: 1
                });
              }
            }
            if (
              !this.guaEffectiveArea ||
              this.guaEffectiveArea.length > 10 ||
              !this._utils.isDecimals(this.guaEffectiveArea)
            ) {
              this.isGuaEffectiveArea = true;
            } else {
              if (
                this._utils.isDecimals(this.guaArea) &&
                this._utils.isDecimals(this.guaEffectiveArea) &&
                this.guaArea * 1 < this.guaEffectiveArea * 1
              ) {
                this.isEAreaLTGuaArea = true;
              } else {
                this.isGuaAreaGTEArea = false;
                this.isEAreaLTGuaArea = false;
              }
              let b = this.guaEffectiveArea/1
              this.guaEffectiveArea = b.toFixed(2)
              this.isGuaEffectiveArea = false;
            }
            break;
          case "规划用途":
            if (!this.houseType) {
              this.isHouseType = true;
            } else {
              this.isHouseType = false;
            }
            this.queryFirstAccessRate();
            break;
          case "房屋性质":
            if (!this.houseNature) {
              this.isHouseNature = true;
            } else {
              this.isHouseNature = false;
            }
            this.queryFirstAccessRate();

            break;
          case "初评单价":
            if (!this.unitPrice|| this.unitPrice <= 0) {
              this.isUnitPrice = true;
            }else if(!this._utils.isDecimals(this.unitPrice)){
              this.isUnitPrice = true;
              this.unitPrice = ''
            }else {
              let b = this.unitPrice/1
              this.unitPrice = b
              this.isUnitPrice = false;
            }
            break;
          case "所在楼层":
            this.introduction.floorIn = this.floorIn;
            if(!this.floorIn){
              this.floorInBol = true;
            }else{
              this.floorInBol = false;
            }
            break;
          case "总楼层":
            this.introduction.floorSum = this.floorSum;
            if(!this.floorSum){
              this.floorSumBol = true;
            }else{
              this.floorSumBol = false;
            }
            break;
          case "抵押物地理位置":
            if(!this.location){
              this.errorShow.location = true;
            }else{
              this.errorShow.location = false;
            }
            this.queryFirstAccessRate();
            break
        }
      },

      // choose(item){
      // 	if(item.id == 7 && item.isChecked){
      // 		for(let i = 0,j = this.refusalCause.length; i < j; i ++){
      // 			if(this.refusalCause[i].content != '其他') {
      // 				this.refusalCause[i].isChecked = false;
      // 				this.refusalCauseText = ''
      // 			}
      // 		}
      // 		this.refusalCause[6].isChecked = false;

      // 	}
      // 	if(item.id != 7){
      // 	}
      // },
      submit(){
        this.$refs.searchValue.returnEnquiryInfo();
      },
      save() {
        this.$refs.searchValue.sub();
        if(!this.systemBol){
          this.$message({
            type: "warning",
            message: "请勿选择或输入相同的询值系统名称！",
            duration: 1500,
            showClose: true
          });
          return
        }
        /*$.post(this._path + "/busAssessValue/insertSystemName",{bussNo:this.$route.query.bussNo ,assessValueVos:JSON.stringify(this.systemList)},res => {
            if (res.resultCode == "0000") {

            }else{
              this.requestError(res,this)
            }
          }
        );*/
        // 拒绝原因判断
        let cause = [];
        for (let i = 0, j = this.refusalCause.length; i < j; i++) {
          if (this.refusalCause[i].isChecked) {
            if (this.refusalCause[i].id == 8) {
              if (this.refusalCauseText) {
                cause.push( this.refusalCauseText);
              }
            } else {
              cause.push(this.refusalCause[i].content);
            }
          }
        }
        cause = cause.join(",");
        this.$refs.changeOwnershipType.finish();
        this.$refs.appraisement.andatoryVerification();
        let params = {
          guaNo: this.assessGuaInfoVo.guaNo,
          guaAddress: this.address,
          guaBuilding: this.building,
          guaNumber: this.houseNumber,
          guaProper: this.area,
          plotName: this.communityName,
          ownershipType: this.ownershipType,
          ownershipNo:this.ownershipNo,
          guaArea: this.guaArea,
          guaEffectiveArea: this.guaEffectiveArea,
          houseType: this.houseType,
          houseNature: this.houseNature,
          firstPledge: this.assessGuaInfoVo.firstPledge,
          pledgeAmount: this.assessGuaInfoVo.pledgeAmount,
          ownershipIsClear: this.assessGuaInfoVo.ownershipIsClear,
          bussNo: this.$route.query.bussNo,
          assessResult: this.isAdmittance,
          refusalReason: cause,
          remark: this.remark,
          mortgageRate: this.collateralRate,
          location: this.location,

          floorSum:this.floorSum,
          floorIn:this.floorIn,

          assessValueVos:JSON.stringify(this.systemList)
        };
        params.maxLoanAmount = this.maxLoanAmountFn;
        params.assessUnitPrice = this.unitPrice;
        params.assessTotalPrice = this.unitPrice * this.guaEffectiveArea;

        //根据城市传值
        /*       switch (this.custBaseInfo.areaCode){
                 case '110100':
                   this.assessOrgValueVoList.forEach((item,index)=>{
                     switch (item.assessCode){
                       case 'BJ-001':
                         this.assessOrgValueVoList[index].assessValue = this.fggPrice
                         break;
                       case 'BJ-002':
                         this.assessOrgValueVoList[index].assessValue = this.sLprice
                         break
                     }
                     if(!this.assessOrgValueVoList[index].assessTime){
                       this.assessOrgValueVoList[index].assessTime = ''
                     }
                   })

                   break;
                 case '340100':
                   this.assessOrgValueVoList.forEach((item,index)=>{
                     switch (item.assessCode){
                       case 'HF-001':
                         this.assessOrgValueVoList[index].assessValue = this.housePrice
                         break;
                     }
                     if(!this.assessOrgValueVoList[index].assessTime){
                       this.assessOrgValueVoList[index].assessTime = ''
                     }
                   })
                   params.assessTotalPrice = this.housePrice
                   params.maxLoanAmount = this.housePrice;
                   break
               }
               params.assessValueVos = JSON.stringify(this.assessOrgValueVoList)*/
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        $.post(this._path + "/assess/insertAssessSave", params, res => {
          loading.close();
          if (res.resultCode == "0000") {
            this.$message({
              type: "success",
              message: "保存成功",
              duration: 1500,
              showClose: true
            });
            this.$router.push("/accessToValueList");
          } else {
            this.$message({
              type: "error",
              message: "保存失败",
              duration: 1500,
              showClose: true
            });
          }
        });
      },
      present(enquiryString) {

        if(this.assessGuaInfoVo.ownershipIsClear ==='1'){
          this.$refs.changeOwnershipType.finish();
        }
        if(this.isAdmittance == '1'){
          // 必填项验证

          if(this.assessGuaInfoVo.ownershipIsClear ==='1'){
            if(!this.location){
              this.errorShow.location = true;
              return
            }
            if (!this.address) {
              this.$message({
                type: "warning",
                message: "请输入地址",
                duration: 1500,
                showClose: true
              });
              return;
            }
            if (!this.building) {
              this.$message({
                type: "warning",
                message: "请输入楼栋",
                duration: 1500,
                showClose: true
              });
              return;
            }
            if (!this.houseNumber) {
              this.$message({
                type: "warning",
                message: "请输入门牌号",
                duration: 1500,
                showClose: true
              });
              return;
            }
            if (!this.area) {
              this.isArea = true;
              return;
            }

            if (!this.communityName || this.communityName.length > 50) {
              this.isCommunityName = true;
              return;
            }
            if (!this.ownershipType) {
              this.isHouseCardType = true;
              return;
            }
            // if(this.ownershipType === '0'){
            //   if(!this.oldHouse1 || !this.oldHouse2 || !this.oldHouse3){
            //     this.$message({
            //       type: "warning",
            //       message: "请填写完整房产证信息",
            //       duration: 1500,
            //       showClose: true
            //     });
            //     return
            //   }
            // }
            // if(this.ownershipType === '1'){
            //   if(!this.newHouse0 || !this.newHouse1 || !this.newHouse2){
            //     this.$message({
            //       type: "warning",
            //       message: "请填写完整房产证信息",
            //       duration: 1500,
            //       showClose: true
            //     });
            //     return
            //   }
            // }
            // if(this.ownershipNoBol){
            //   this.$message({type:'warning',message:'请输入房产证信息',duration:1500,showClose:true})
            //   return
            // }
            if (!this._utils.isDecimals(this.guaArea)) {
              this.isGuaArea = true;
              return;
            }
            if (
              !this.guaEffectiveArea ||
              this.guaEffectiveArea.length > 10 ||
              !this._utils.isDecimals(this.guaEffectiveArea)
            ) {
              this.isGuaEffectiveArea = true;
              return;
            }

            if (!this.houseType) {
              this.isHouseType = true;
              return;
            }
            if (!this.houseNature) {
              this.isHouseNature = true;
              return;
            }
            if(!this.floorIn){
              this.floorInBol = true;
              return
            }
            if(!this.floorSum){
              this.floorSumBol = true;
              return
            }
            this.$refs.appraisement.andatoryVerification()
            if(this.isUnitPrice){
              return
            }
            console.log(123);
            if(this.maxLoanAmountFn <= 0){
              this.$message({
                type: "warning",
                message: "最大综合可贷款额应大于0",
                duration: 1500,
                showClose: true
              });
              return
            }

          }

        }
        this.$refs.searchValue.sub();
        if(!this.systemBol){
          this.$message({
            type: "warning",
            message: "请勿选择或输入相同的询值系统名称！",
            duration: 1500,
            showClose: true
          });
          return
        }
        /*$.post(this._path + "/busAssessValue/insertSystemName",{bussNo:this.$route.query.bussNo ,assessValueVos:JSON.stringify(this.systemList)},res => {
            if (res.resultCode == "0000") {
            }else{
              this.requestError(res,this)
            }
          }
        );*/
        let cause = [];
        if (this.isAdmittance == "0") {
          // 拒绝原因判断
          for (let i = 0, j = this.refusalCause.length; i < j; i++) {
            if (this.refusalCause[i].isChecked) {
              if (this.refusalCause[i].id == 8) {
                if (this.refusalCauseText) {
                  cause.push(this.refusalCauseText);
                }else{
                  this.$message({
                    type: "warning",
                    message: "请选择或填写拒绝原因",
                    duration: 1500,
                    showClose: true
                  })
                  return
                }
              } else {
                cause.push(this.refusalCause[i].content);
              }
            }
          }
          cause = cause.join(",");
          if (cause.length=='0') {
            this.$message({
              type: "warning",
              message: "请选择或填写拒绝原因",
              duration: 1500,
              showClose: true
            });
            return
          }
        }
        let price = this.unitPrice
        let params = {
          guaNo: this.assessGuaInfoVo.guaNo,
          guaAddress: this.address,
          guaBuilding: this.building,
          guaNumber: this.houseNumber,
          guaProper: this.area,
          plotName: this.communityName,
          ownershipType: this.ownershipType,
          ownershipNo:this.ownershipNo,
          guaArea: this.guaArea,
          guaEffectiveArea: this.guaEffectiveArea,
          location: this.location,
          houseType: this.houseType,
          houseNature: this.houseNature,
          firstPledge: this.assessGuaInfoVo.firstPledge,
          pledgeAmount: this.assessGuaInfoVo.pledgeAmount,
          ownershipIsClear: this.assessGuaInfoVo.ownershipIsClear,
          bussNo: this.$route.query.bussNo,
          assessResult: this.isAdmittance,
          refusalReason: cause,
          remark: this.remark,
          mortgageRate: this.collateralRate,
          enquiryString,
          assessValueVos:JSON.stringify(this.systemList),
          floorSum:this.floorSum,
          floorIn:this.floorIn,
        };
        params.maxLoanAmount = this.maxLoanAmountFn;
        params.assessUnitPrice = this.unitPrice;
        params.assessTotalPrice = this.unitPrice * this.guaEffectiveArea;
        //根据城市传值
        /*  switch (this.custBaseInfo.areaCode){
            case '110100':
              this.assessOrgValueVoList.forEach((item,index)=>{
                switch (item.assessCode){
                  case 'BJ-001':
                    this.assessOrgValueVoList[index].assessValue = this.fggPrice
                    break;
                  case 'BJ-002':
                    this.assessOrgValueVoList[index].assessValue = this.sLprice
                    break
                }
                if(!this.assessOrgValueVoList[index].assessTime){
                  this.assessOrgValueVoList[index].assessTime = ''
                }
              })

              break;
            case '340100':
              this.assessOrgValueVoList.forEach((item,index)=>{
                switch (item.assessCode){
                  case 'HF-001':
                    this.assessOrgValueVoList[index].assessValue = this.housePrice
                    break;
                }
                if(!this.assessOrgValueVoList[index].assessTime){
                  this.assessOrgValueVoList[index].assessTime = ''
                }
              })
              params.assessTotalPrice = this.housePrice
              params.maxLoanAmount = this.housePrice;
              break
          }
          params.assessValueVos = JSON.stringify(this.assessOrgValueVoList)*/

        //
        $.get(this._path + "/business/userChannel",{bussNo:this.$route.query.bussNo}, res => {
          if (res.resultCode == "0000") {
            let path = ''
            if(res.data.busModel=='01'){
              path = '/capitalSale/capitalSaleAssessSubmit'
            }else{
              path = '/assess/insertAssessSubmit'
            }
            this.$confirm("是否提交?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info"
            }).then(() => {
              let loading = this.$loading({
                lock: true,
                text: "正在加载...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.5)"
              });
              $.post(this._path + path, params, res => {
                loading.close();
                if (res.resultCode == "0000") {
                  this.$message({
                    type: "success",
                    message: "提交成功",
                    duration: 1500,
                    showClose: true
                  });
                  this.$router.push("/accessToValueList");
                }else if(res.resultCode == "9999"){
                  this.$message({
                    type: "error",
                    message: "本订单状态已经改变!",
                    duration: 1500,
                    showClose: true
                  });
                  this.$router.push("/accessToValueList");
                } else {
                  this.requestError(res,this)
                }
              });
            });
          } else {

          }
        });
      },
      getGuaBaseInfo(){
        // 抵押物信息
        $.post(this._path + '/assess/selectAssessInfo', { bussNo: this.$route.query.bussNo }, (res) => {
          this.ownershipTypeBol = true
          this.assessGuaInfoVo = res.data.assessGuaInfoVo;
          this.location = res.data.assessInfoVo.location;
          this.consummateRemark = res.data.consummateRemark;
          let gua = res.data.assessGuaInfoVo;
          $.post(this._path + '/assess/selectAssessInfoHis', { bussNo: this.$route.query.bussNo,ownershipNo:gua.ownershipNo }, (res) => {
            this.tableData = res.data.assessHisInfoVos.slice(0,3);
            tableData = res.data.assessHisInfoVos;
          })
          this.address = gua.guaAddress;
          this.building = gua.guaBuilding;
          this.guaEffectiveArea = gua.guaEffectiveArea/1 == 0?'':gua.guaEffectiveArea;
          // this.fgg.keyword = gua.guaAddress +  gua.guaBuilding + gua.guaNumber
          this.houseNumber = gua.guaNumber;
          this.area = gua.guaProper;
          this.houseType = gua.houseType;
          this.assessGuaInfoVo.firstPledge = gua.firstPledge;
          this.guaArea = gua.guaArea/1 == 0?'':gua.guaArea;
          this.houseNature = gua.houseNature;
          this.assessGuaInfoVo.ownershipIsClear = gua.ownershipIsClear;
          this.ownershipType = gua.ownershipType;


          this.assessGuaInfoVo.pledgeAmount = gua.pledgeAmount;
          this.communityName = gua.plotName;
          this.ownershipNo = gua.ownershipNo;

          this.floorIn = gua.floorIn;
          this.floorSum = gua.floorSum;
          // this.isAdmittance = res.data.assessInfoVo.assessResult;
          // 获取传入的数据
          this.introduction.floorIn = gua.floorIn;
          this.introduction.floorSum = gua.floorSum;

          this.introduction.communityName = this.communityName
          this.introduction.guaArea = this.guaArea
          this.introduction.fggKeyword = this.fggKeyword
          this.introduction.firstPledge = this.assessGuaInfoVo.firstPledge
          this.introduction.pledgeAmount = this.assessGuaInfoVo.pledgeAmount
          this.introduction.guaEffectiveArea = this.guaArea
          this.introductionBol = true
          this.introduction.guaProperName = this.assessGuaInfoVo.guaProperName

          if(!res.data.assessInfoVo.assessResult){
            this.isAdmittance = '1'
          }else{
            this.isAdmittance = res.data.assessInfoVo.assessResult;
          }
          if(res.data.assessInfoVo.refusalReason){
            let refusalReason = res.data.assessInfoVo.refusalReason.split(',');
            for(let i = 0;i < refusalReason.length; i++){
              for(let j = 0;j < this.refusalCause.length;j++){
                if(refusalReason[i] == this.refusalCause[j].content) {
                  this.refusalCause[j].isChecked = true
                }
              }
            }
            let bol = true;
            for(let j = 0;j < this.refusalCause.length;j++) {
              if(refusalReason[refusalReason.length -2] == this.refusalCause[j].content) {
                bol = false
              }
            }

            if(bol){
              this.refusalCauseText = refusalReason[refusalReason.length -2];
              this.refusalCause[this.refusalCause.length -2].isChecked = true
            }
          }
          this.remark = res.data.assessInfoVo.remark;
          this.unitPrice = res.data.assessInfoVo.assessUnitPrice == '0'?'':res.data.assessInfoVo.assessUnitPrice

          this.housePrice = res.data.assessInfoVo.assessTotalPrice

          this.introduction.unitPrice = this.unitPrice

          if(this.remark){
            if(this.remark.indexOf('房估估人工录入') == -1){
              this.introduction.is98 = 0
            }else{
              this.introduction.is98 = 1
            }
          }
          this.$nextTick(function () {
            this.queryFirstAccessRate();

          })
          /*if(res.data.assessValueVos.length){
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
                    this.fggPrice= res.data.assessValueVos[i].assessValue;
                    this.introduction.housePrice = this.housePrice
                    break;
                }
              }
            }
          }*/
          // 	switch(this.ownershipType){
          // 	case '1':
          // 		let ownershipNo_1=gua.ownershipNo;
          // 		let str = ownershipNo_1.replace(/[()]/g,',')
          // let arr = str.split(',')
          // 		this.newHouse0=arr[1]
          // 		this.newHouse1=ownershipNo_1.substr(ownershipNo_1.indexOf(')')+1,ownershipNo_1.indexOf('不动产权第')-ownershipNo_1.indexOf(')')-')'.length);
          // 		this.newHouse2=ownershipNo_1.substr(ownershipNo_1.indexOf('不动产权第')+5,ownershipNo_1.indexOf('号')-ownershipNo_1.indexOf('不动产权第')-'不动产权第'.length);
          // 		break;
          // 	case '0':
          // 		let ownershipNo_0=gua.ownershipNo;
          // 		this.oldHouse1=ownershipNo_0.substr(0,ownershipNo_0.indexOf('京房权证'));
          // 		this.oldHouse2=ownershipNo_0.substr(ownershipNo_0.indexOf('京房权证')+'京房权证'.length,ownershipNo_0.indexOf('字第')-ownershipNo_0.indexOf('京房权证')-'京房权证'.length);
          // 		this.oldHouse3=ownershipNo_0.substr(ownershipNo_0.indexOf('字第')+'字第'.length,ownershipNo_0.indexOf('号')-ownershipNo_0.indexOf('字第')-'字第'.length);
          // 		break;
          // 	default:break;
          // }
          // this.isHouseNumChange = true
        })
      }
    },
    created(){
      this.getCityConfig();
    },
    beforeCreate() {
      // 查询借款人信息
      $.post(this._path + '/business/queryCustBaseInfoHide', { bussNo: this.$route.query.bussNo }, (res) => {
        this.custBaseInfo = res.data.custBaseInfo;
        this.introduction.areaCode = res.data.custBaseInfo.areaCode;
        this.introduction.areaName = res.data.custBaseInfo.areaName;
        $.post(this._path + '/business/queryAreasByCityCode', { cityCode: res.data.custBaseInfo.areaCode }, (res) => {
          this.areas = res.data.areaList
        })
        this.cityCongif(this,'/configuration/selectHouseTypeConf',this.custBaseInfo.areaCode,(res)=>{
          this.houseTypeList = res.data.conHouseTypeVoList
        })
        this.cityCongif(this,'/configuration/selectHouseNatureConf',this.custBaseInfo.areaCode,(res)=>{
          this.conHouseNatureVoList = res.data.conHouseNatureVoList
        })
        //查询城市配置 /configuration/selectAssessOrgInfo
        $.post(this._path + '/configuration/selectAssessOrgInfo', { cityCode: res.data.custBaseInfo.areaCode }, (res) => {
          this.assessOrgValueVoList = res.data.assessOrgValueVoList
        })
        $.post(this._path + '/configuration/selectHouseOwnershipConf',{cityCode:res.data.custBaseInfo.areaCode},(res)=>{
          if(res.resultCode == '0000'){
            this.houseOwnershipDTOList = res.data.houseOwnershipDTOList;


            this.getGuaBaseInfo()

          }else{
            this.requestError(res,this)
          }
        });

      });
    }
  }

</script>
<style scoped>
  .borrowerInfTd {
    border: none !important;
    font-size: 14px !important;
  }

  .el-dialog__wrapper {
    overflow-y: hidden;
  }

  .el-dialog__wrapper .el-dialog--small {
    width: 33% !important;
  }

  #dialog .el-dialog {
    top: 30% !important;
    width: 35% !important;
  }

  .el-dialog {
    width: 35% !important;
  }

  .el-dialog__body {
    padding: 0 !important;
  }
  .porp{
    display: none;
    position: relative;
    z-index: 1000;
    text-align: left;
    text-indent: 10px;
    background-color: #fff;
    height: auto;
    max-height: 200px;
    cursor:pointer;
    overflow-y:auto;
    border: 1px solid #ccc;
    border-top:0px;
  }
  .porp::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
    opacity: 0.6
  }
  /*定义滚动条轨道 内阴影+圆角*/
  porp::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background: #fff ;
  }
  /*定义滑块 内阴影+圆角*/
  porp::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#f4f4f4;
  }
  porp::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#E4E2E2;
  }

</style>
