<template>
  <div class="public completeInfo addOrder">
    <h2>完善信息</h2>
    <!-- 借款人信息 -->
    <div class="show_list_title">
      <h3><img src="./../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class="borrowerInfo module_margin_bottom showBorrowerInfo">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">订单编号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.bussNo}}</el-col>
        <el-col :span="3" class="borrowerInfTd">城市</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.areaName}}</el-col>
      </el-col>


      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">借款人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.custName}}	</el-col>
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

    <el-row class="module_margin_bottom borrowerInfo table_height">
      <el-col class="borrowerInfTr" :span="24">
        <el-col class="borrowerInfTd" :span="3">图片是否清晰<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="21">
          <el-col :span="4"><el-radio class="radio" v-model="isImgClear" label="1">清晰</el-radio></el-col>
          <el-col :span="4"><el-radio class="radio" v-model="isImgClear" label="0">不清晰</el-radio></el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
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
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">抵押物坐落<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="21">
          <el-col :span="3">地址</el-col>
          <el-col :span="8"><el-input size="small" v-model="address" @blur="andatoryVerification('地址')"></el-input></el-col>
          <el-col :span="3">楼栋</el-col>
          <el-col :span="3"><el-input size="small" v-model="building"  @blur="andatoryVerification('楼栋')" ></el-input></el-col>
          <el-col :span="3">门牌号</el-col>
          <el-col :span="3"><el-input size="small"  v-model="houseNumber"  @blur="andatoryVerification('门牌号')" ></el-input></el-col>

        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">所在区域<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="15"  class="addordertableselect">
            <el-select v-model="area" placeholder="请选择" class="select_width"  size='small'  @change="andatoryVerification('所在区域')">
              <el-option v-for="item in areas" :key="item.value" :label="item.areaName" :value="item.areaCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="isArea"> *请选择所在区域</el-col>
        </el-col>
        <el-col class="borrowerInfTd" :span="3">社区名称<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="15"><el-input  size="small" class="input_width" placeholder="请输入社区名称"  @blur="andatoryVerification('社区名称')" v-model="communityName"></el-input></el-col>
          <el-col :span="9" class="error_title" v-if="isCommunityName"> *名称为1-50个字符</el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">房产证号<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="15"  class="addordertableselect">
            <el-select  v-model="ownershipType" placeholder="请选择" class="select_width"  size='small' @change="ownershipTypeChange">
              <el-option v-for="item in houseOwnershipDTOList" :label="item.ownershipType" :value="item.ownershipCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="isHouseCardType"> *请选择房产证号类型</el-col>
        </el-col>
        <!-- 房产证号类型 -->
        <el-col class="borrowerInfTd":span="12">
          <ownership-no :ownershipList="houseOwnershipDTOList" :ownershipNo="ownershipNo" :changeValue="false" @valueChange="valueChange" :ownershipType="ownershipType" ref="changeOwnershipType" @finish="finish"></ownership-no>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">建筑面积(m²)<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入建筑面积"  @blur="andatoryVerification('建筑面积')" v-model="guaArea"></el-input></el-col>
          <el-col :span="11" class="error_title" v-if="isGuaArea"> *请输入大于0的数</el-col>
        </el-col>
        <el-col class="borrowerInfTd" :span="3">有效面积(m²)<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入有效面积" @blur="andatoryVerification('有效面积')" v-model="guaEffectiveArea"></el-input></el-col>
          <el-col :span="11" class="error_title" v-if="isGuaEffectiveArea"> *请输入大于0的数</el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">所在楼层<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入所在楼层"  @blur="andatoryVerification('所在楼层')" @keyup.native="number('floorIn')" v-model="floorIn"></el-input></el-col>
          <el-col :span="11" class="error_title" v-if="errorShow.floorIn"> *请输入大于0的数</el-col>
        </el-col>
        <el-col class="borrowerInfTd" :span="3">总楼层<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="13"  class="addordertableselect"><el-input  size="small"  placeholder="请输入总楼层" @blur="andatoryVerification('总楼层')" @keyup.native="number('floorSum')" v-model="floorSum"></el-input></el-col>
          <el-col :span="11" class="error_title" v-if="errorShow.floorSum"> *请输入大于0的数</el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">规划用途<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="15"  class="addordertableselect">
            <el-select  v-model="houseType" placeholder="请选择" class="select_width"  size='small' @change="andatoryVerification('规划用途')">
              <el-option v-for="item in houseTypeList" :label="item.typeName" :value="item.typeCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="isHouseType"> *请选择规划用途</el-col>
        </el-col>
        <el-col class="borrowerInfTd" :span="3">房屋性质<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="9">
          <el-col :span="15"  class="addordertableselect">
            <el-select  v-model="houseNature" placeholder="请选择" class="select_width"  size='small' @change="andatoryVerification('房屋性质')">
              <el-option v-for="item in conHouseNatureVoList" :label="item.natureName" :value="item.natureCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="isHouseNature"> *请选择规房屋性质</el-col>
        </el-col>
      </el-col>
      <el-col class="borrowerInfTr doNotChange" :span="24" v-if="isImgClear == '1'">
        <el-col class="borrowerInfTd" :span="3">抵押顺位</el-col>
        <el-col class="borrowerInfTd" :span="9">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
        <el-col class="borrowerInfTd" :span="3" v-if="assessGuaInfoVo.firstPledge == '02'||assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
        <el-col class="borrowerInfTd" :span="9" v-if="assessGuaInfoVo.firstPledge == '02'||assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
      </el-col>
    </el-row>
    <!-- 备注信息 -->
    <div class="show_list_title">
      <h3><img src="./../assets/task.png" class="listTitleImg"><span>备注</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module">
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="21" class="textareawrap">
            <div class="textarea"><textarea v-model="remark" :rows="5" placeholder="请输入内容，最多200字。" maxlength="2000"></textarea></div>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-col :offset='10' :span='2'  class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="submit">提交</el-button></el-col>
  </div>
</template>
<script>
  import './../style/addOrder.css'
  import './../style/completeInfo.css'
  import OwnershipNo from "../component/com/ownershipNo";
  // let isownershipType = false
  export default {
    components: {OwnershipNo},
    name:"completeInfo",
    data (){
      return{
        floorIn:'',
        floorSum:'',
        houseTypeList:[],
        positionList:[],
        conHouseNatureVoList:[],
        houseOwnershipDTOList:[],
        ownershipNo:'',
        isownershipType:false,
        address:'',
        building:'',
        houseNumber:'',
        area:'',
        areas:[],
        location:'',
        communityName:'',
        ownershipType:'?',
        houseType:'',
        houseNature:'',
        pawnAmount:'',
        guaEffectiveArea : '',
        guaArea:'',
        isArea:false,
        isCommunityName:false,
        isHouseCardType:false,
        isHouseType:false,
        isPawnAmount:false,
        isPurpose:false,
        isRoomType:false,
        isGuaArea:false,
        isGuaEffectiveArea:false,
        isHouseNature:false,
        isImgClear:'1',
        custBaseInfo:{},
        bussNo:'',
        // 房产证号
        // 新
        newHouse0:'',
        newHouse1:'',
        newHouse2:'',
        // 旧
        oldHouse1:'',
        oldHouse2:'',
        oldHouse3:'',
        // 抵押物信息
        assessGuaInfoVo:{},
        remark:'',
        errorShow:{
          floorIn:false,
          floorSum:false,
          location:false,

        }
      }
    },
    methods : {
      getCityConfig(){
        let data = {
            cityCode:this.$route.query.cityCode
          };
        this.$http({
          url:'/business/selectCityConfigByCityCode',
          data,
          callback:res=>{
            this.positionList = res.data.conLocationDTOList
          }
        })
      },
      valueChange(obj){
        this.$alert("房产证号已修改，请核对清楚后提交！",'提示信息',{
          confirmButtonText:'确认',
        })
      },
      finish(obj){
        this.ownershipNo = obj.ownershipNo;
        this.ownershipNoBol = obj.ownershipNoBol
      },
      ownershipTypeChange () {
        this.$refs.changeOwnershipType.initOwnershipNo(this.ownershipType)
      },
      number(str){
        this[str] = this[str].replace(/[^\d.]/g,'');
        console.log(this[str])
      },
      andatoryVerification (type) {
        switch (type) {
          case "地址":
            if(!this.address){
              this.$message({type:'warning',message:'请输入地址',duration:1500,showClose:true})
            }
            break;
          case "楼栋":
            if(!this.building){
              this.$message({type:'warning',message:'请输入楼栋',duration:1500,showClose:true})
            }
            break;
          case "门牌号":
            if(!this.houseNumber){
              this.$message({type:'warning',message:'请输入门牌号',duration:1500,showClose:true})
            }
            break;
          case "社区名称":
            if(!this.communityName || this.communityName.length > 50){
              this.isCommunityName = true;
            }else{
              this.isCommunityName = false;
            }
            break;
          case "建筑面积":
            // this.guaArea = (this.guaArea * 1).toFixed(2);
            if(!this.guaArea || this.guaArea.length > 10	|| !this._utils.isDianNumber(this.guaArea)){
              this.isGuaArea = true
            }else{
              this.isGuaArea = false
              let b = this.guaArea/1
              this.guaArea = b.toFixed(2)
              this.guaEffectiveArea = this.guaArea
            }
            if(this.guaArea && this.guaEffectiveArea){
              if(this.guaArea < this.guaEffectiveArea){
                this.$message({type:'warning',message:'有效面积不能大于建筑面积',duration:1500,showClose:true})
              }
            }
            break;
          case "有效面积":
            // this.guaEffectiveArea = (this.guaEffectiveArea * 1).toFixed(2);
            if(!this.guaEffectiveArea || this.guaEffectiveArea.length > 10	|| !this._utils.isDianNumber(this.guaEffectiveArea)){
              this.isGuaEffectiveArea = true
            }else{
              this.isGuaEffectiveArea = false;
              let b = this.guaEffectiveArea/1;
              this.guaEffectiveArea = b.toFixed(2)
            }
            if(this.guaArea && this.guaEffectiveArea){
              if(this.guaArea < this.guaEffectiveArea){
                this.$message({type:'warning',message:'有效面积不能大于建筑面积',duration:1500,showClose:true})
              }
            }
            break;
          case "所在楼层":
            if(!this.floorIn){
              this.errorShow.floorIn = true;
            }else{
              this.errorShow.floorIn = false;
            }
            break;
          case "总楼层":
            if(!this.floorSum){
              this.errorShow.floorSum = true;
            }else{
              this.errorShow.floorSum = false;
            }
            break;
          case "所在区域":
            if(!this.area){
              this.isArea = true;
            }else{
              this.isArea = false;
            }
            break;
          case "房产证号":
            this.$refs.changeOwnershipType.initOwnershipNo(this.ownershipType)
            if(!this.ownershipType){
              this.isHouseCardType = true;
            }else{
              this.isHouseCardType = false;
            }
            if(!this.isownershipType){
              this.isownershipType = true
            }
            break;
          case "规划用途":
            if(!this.houseType){
              this.isHouseType = true;
            }else{
              this.isHouseType = false;
            }
            break;
          case "房屋性质":
            if(!this.houseNature){
              this.isHouseNature = true;
            }else{
              this.isHouseNature = false;
            }
            break;
          case "抵押物地理位置":
            if(!this.location){
              this.errorShow.location = true;
            }else{
              this.errorShow.location = false;
            }

        }
      },
      submit () {
        // 检测必填项
        if(this.isImgClear == '1'){
          this.$refs.changeOwnershipType.finish();
          if(!this.location){
            this.errorShow.location = true;
            return
          }
          if(!this.address){
            this.$message({type:'error',message:'请输入地址',duration:1500,showClose:true});
            return
          }
          if(!this.building){
            this.$message({type:'error',message:'请输入楼栋',duration:1500,showClose:true});
            return
          }
          if(!this.houseNumber){
            this.$message({type:'error',message:'请输入门牌号',duration:1500,showClose:true})
          }
          if(!this.area){
            this.isArea = true;
            return
          }
          if(!this.communityName || this.communityName.length > 50){
            this.isCommunityName = true;
            return
          }
          if(!this.ownershipType){
            this.isHouseCardType = true;
            return
          }
          // if(this.ownershipType == '1'){
          // 	if(!this.newHouse1 || !this.newHouse2||!this.newHouse0){
          // 		this.$message({type:'error',message:'请输入房产证信息',duration:1500,showClose:true})
          // 		return
          // 	}
          // }else if(this.ownershipType == '0'){
          // 	if(!this.oldHouse1 || !this.oldHouse2 || !this.oldHouse3){
          // 		this.$message({type:'error',message:'请输入房产证信息',duration:1500,showClose:true})
          // 		return
          // 	}
          // }

          if(this.ownershipNoBol){
            this.$message({type:'error',message:'请输入房产证信息',duration:1500,showClose:true})
            return
          }

          if(!this.guaArea || this.guaArea.length > 10	|| !this._utils.isDianNumber(this.guaArea)){
            this.isGuaArea = true
            return
          }
          if(!this.guaEffectiveArea || this.guaEffectiveArea.length > 10	|| !this._utils.isDianNumber(this.guaEffectiveArea)){
            this.isGuaEffectiveArea = true
            return
          }
          if(!this.floorIn){
            this.errorShow.floorIn = true;
            return
          }
          if(!this.floorSum){
            this.errorShow.floorSum = true;
            return
          }
          if(!this.houseType){
            this.isHouseType = true;
            return
          }
          if(!this.houseNature){
            this.isHouseNature = true;
            return
          }
          if(this.guaArea*1 < this.guaEffectiveArea*1){
            this.$message({type:'error',message:'有效面积不能大于建筑面积',duration:1500,showClose:true})
            return
          }
        }
        this.$confirm('是否提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {

          var params = {
            floorSum:this.floorSum,
            floorIn:this.floorIn,
            guaNo:this.assessGuaInfoVo.guaNo,
            guaAddress : this.address,
            guaBuilding: this.building,
            guaNumber : this.houseNumber,
            guaProper : this.area,
            plotName : this.communityName,
            ownershipType : this.ownershipType,
            ownershipNo:this.ownershipNo,
            guaArea : this.guaArea,
            guaEffectiveArea : this.guaEffectiveArea,
            houseType:this.houseType,
            houseNature:this.houseNature,
            firstPledge:this.assessGuaInfoVo.firstPledge,
            pledgeAmount:this.assessGuaInfoVo.pledgeAmount,
            ownershipIsClear:this.isImgClear === '2' ? '0' :this.isImgClear,
            remark:this.remark,
            bussNo: this.$route.query.params,
            location:this.location
          }
          let loading = this.$loading({
            lock: true,
            text: "正在加载...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          $.post(this._path + '/consummate/insertConsummateSubmit',params,(res)=>{
            loading.close();
            if('0000' == res.resultCode){
              this.$message({
                type:'success',
                message:'提交成功',
                duration:1500,
                showClose:true
              })
              this.$router.push('/initialConsummate');
            }else{
              this.$message({
                type:'error',
                message:res.resultMsg,
                duration:1500,
                showClose:true
              })
            }
          })
        })
      }
    },
    created () {
      this.getCityConfig()
// 查询借款人基本信息
      $.post(this._path + '/business/queryCustBaseInfoHide',{bussNo:this.$route.query.params},(res)=>{
        this.custBaseInfo = res.data.custBaseInfo
        $.post(this._path + '/configuration/selectHouseOwnershipConf',{cityCode:this.custBaseInfo.areaCode},(res)=>{
          if(res.resultCode == '0000'){
            this.houseOwnershipDTOList = res.data.houseOwnershipDTOList
          }else{
            this.requestError(res,this)
          }
        })
        this.cityCongif(this,'/configuration/selectHouseTypeConf',this.custBaseInfo.areaCode,(res)=>{
          this.houseTypeList = res.data.conHouseTypeVoList
        })
        this.cityCongif(this,'/configuration/selectHouseNatureConf',this.custBaseInfo.areaCode,(res)=>{
          this.conHouseNatureVoList = res.data.conHouseNatureVoList
        })
        // 区域
        $.post(this._path + '/business/queryAreasByCityCode',{cityCode:this.custBaseInfo.areaCode},(res)=>{
          this.areas = res.data.areaList;
        })
      })
      // 抵押物信息
      $.post(this._path + '/consummate/selectConsummateInfo',{bussNo:this.$route.query.params},(res)=>{
        this.assessGuaInfoVo.firstPledge = res.data.firstPledge;
        this.assessGuaInfoVo = res.data.assessGuaInfoVo;
        this.remark=res.data.ConsummateInfoVo.remark;
        this.ownershipType=res.data.assessGuaInfoVo.ownershipType;
        this.ownershipNo = res.data.assessGuaInfoVo.ownershipNo;
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
        if(guaInfo.floorIn){
          this.floorIn = guaInfo.floorIn;
        }
        if(guaInfo.floorSum){
          this.floorSum = guaInfo.floorSum;
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




    },
    mounted() {
    }
  }
</script>
