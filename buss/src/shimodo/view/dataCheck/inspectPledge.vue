<template>
  <div class="pledge">
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>

    <!-- 抵押物基本信息 -->
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证号<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" v-model="pawnInfo.houseCardNum" :maxlength="50" @blur="inspectFormat('房产证号')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseCardNum"> *请填写房产证号</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-if="ownerBol">
        <el-col :span="3" class="table_td">房屋所有权人</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            {{this.ownerBol}}
          </el-col>
        </el-col>
      </el-col>
      <mutual-cert ref="mutualCert" @finish="finish"  v-if="!ownerBol"></mutual-cert>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="3">抵押物坐落<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="21">
          <el-col :span="3" :class="errorShow.address">地址</el-col>
          <el-col :span="8">
            <el-input size="small" :maxlength="200" @change="changeColor('address')" v-model="pawnInfo.address"></el-input>
          </el-col>
          <el-col :span="3" :class="errorShow.build">楼栋</el-col>
          <el-col :span="3">
            <el-input size="small" :maxlength="50" @change="changeColor('build')" v-model="pawnInfo.build"></el-input>
          </el-col>
          <el-col :span="3" :class="errorShow.houseNum">门牌号</el-col>
          <el-col :span="3">
            <el-input size="small" :maxlength="50" @change="changeColor('houseNum')" v-model="pawnInfo.houseNum"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">社区名称<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" v-model="pawnInfo.communityName" @blur="inspectFormat('社区名称')" :maxlength="50"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isCommunityName"> *请填写社区名</el-col>
        </el-col>
        <el-col :span="3" class="table_td">所在楼层/总层数<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="8" :offset="1">
            <el-col :span="9" :offset="1">
              <el-input :maxlength="4" size="small" v-model="pawnInfo.floor" @blur="inspectFormat('所在楼层总楼层')"></el-input>
            </el-col>
            <el-col :span="2">/</el-col>
            <el-col :span="11" :offset="1">
              <el-input :maxlength="4" size="small" v-model="pawnInfo.allFloor" @blur="inspectFormat('所在楼层总楼层')"></el-input>
            </el-col>
          </el-col>
          <el-col :span="15" class="error_title" v-show="errorShow.isHouseFloor"> *所在楼层和总层数应为正整数</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建成年代<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select class="select_width" @change="inspectFormat('建成年代')"  v-model="pawnInfo.year" placeholder="请选择" size='small'>
              <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isYear"> *请填写建成年代</el-col>
        </el-col>
        <el-col :span="3" class="table_td">房龄(年)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <span>{{houseAge}}</span>
            <!--<el-input disabled size="small" :maxlength="4" v-model="houseAge" @blur="inspectFormat('房龄')"></el-input>-->
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseAge"> *房龄为数字1-50</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证取得时间<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-date-picker :editable="false" v-model="pawnInfo.getHouseCardTime" :picker-options="pickerOptions0" size="small" class="date_width" @change="pickerFn" type="date" placeholder="选择日期时间"></el-date-picker>
          </el-col>
          <el-col :span="9" class="error_title" v-if="errorShow.getHouseCardTime">请选择</el-col>
        </el-col>
        <el-col :span="3" class="table_td">土地使用年限(年)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" :maxlength="10" v-model="pawnInfo.landLine" @blur="inspectFormat('土地使用年限')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.landLine">*请输入土地使用年限</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">产权获取方式<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select class="select_width" v-model="pawnInfo.getEquityWay" @change="getEquityWayFn" placeholder="请选择" size="small">
              <el-option :key="'01'" :label="'购买'" :value="'01'"> </el-option>
              <el-option :key="'02'" :label="'赠与'" :value="'02'"> </el-option>
              <el-option :key="'03'" :label="'继承'" :value="'03'"> </el-option>
              <el-option :key="'04'" :label="'分割'" :value="'04'"> </el-option>
              <el-option :key="'05'" :label="'法判'" :value="'05'"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isGetEquityWay">*请选择产权获取方式</el-col>
        </el-col>
        <el-col :span="3" class="table_td">
          权利性质<span class="importent">*</span>
          <el-tooltip effect="dark" content="（按房本填写，如果没有，填写“无”）" placement="top-start">
            <span size="small"  class="current">?</span>
          </el-tooltip>
        </el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" :maxlength="50" v-model="pawnInfo.powerNature" @blur="inspectFormat('权利性质')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.powerNature">*请填写权利性质</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建筑面积(m²)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" :maxlength="20" v-model="pawnInfo.coveredArea" @blur="inspectFormat('建筑面积')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isCoveredArea"> *建筑面积为数字</el-col>
        </el-col>
        <el-col :span="3" class="table_td">所在区域<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select class="select_width" v-model="area" placeholder="请选择" size="small">
              <el-option v-for="area in areas" :key="area.areaCode" :label="area.areaName" :value="area.areaCode"> </el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="9" class="error_title">*请选择所在区域</el-col> -->
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="3">规划用途<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select v-model="pawnInfo.purpose" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('规划用途')">
              <el-option v-for="item in houseTypeList" :label="item.typeName" :value="item.typeCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isPurpose"> *请选择规划用途</el-col>
        </el-col>
        <el-col class="table_td" :span="3">房屋性质<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select v-model="pawnInfo.houseNature" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('房屋性质')">
              <el-option v-for="item in conHouseNatureVoList" :label="item.natureName" :value="item.natureCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseNature"> *请选择房屋性质</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="3">产权性质<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select v-model="pawnInfo.propertyRight" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('产权性质')">
              <el-option v-for="item in _utils.propertyRightList" :label="item.typeName" :value="item.typeCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isPurpose"> *请选择产权性质</el-col>
        </el-col>
        <el-col class="table_td" :span="3">土地来源<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select v-model="pawnInfo.landSource" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('土地来源')">
              <el-option v-for="item in _utils.landSourceList" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseNature"> *请选择土地来源</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">是否满五<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="13" :offset="1">
            <el-radio-group v-model="pawnInfo.coverfive">
              <el-radio :label="'1'">满五</el-radio>
              <el-radio :label="'2'">满二</el-radio>
              <el-radio :label="'3'">非满二</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.coverfive">*请选择是否满五</el-col>
        </el-col>
        <el-col :span="3" class="table_td">是否唯一<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td" style="border:none">
          <el-radio v-model="pawnInfo.sole" label="1">唯一</el-radio>
          <el-radio v-model="pawnInfo.sole" label="0">非唯一</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">原购价(万元)</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small" :maxlength="20"  v-model="pawnInfo.formerPrice" @blur="inspectFormat('原购价')"></el-input>
          </el-col>
          <!--<el-col :span="9" class="error_title" v-show="errorShow.isFormerPrice"> *原购价为正数</el-col>-->
        </el-col>

        <el-col :span="9" class=" table_td error_title" v-show="errorShow.theSameWithAddress && !pawnInfo.theSameWithAddress">*请选择下户地址与产权证记载地址是否一致 </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">下户地址与产权证记载地址是否一致<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td">
          <el-radio v-model="pawnInfo.theSameWithAddress" label="1">一致</el-radio>
          <el-radio v-model="pawnInfo.theSameWithAddress" label="0">不一致</el-radio>

        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">当前是否在押<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td">
          <el-col :span="24">
            <el-radio v-model="pawnInfo.isPledged" label="1">是</el-radio>
            <el-radio v-model="pawnInfo.isPledged" label="0">否</el-radio>
          </el-col>
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr textarea_module">
        <el-col :span="3" class="table_td textarea_title" v-show="pawnInfo.isPledged == '1'">抵押情况<span class="importent">*</span></el-col>
        <el-col :span="21" class="textareawrap" v-show="pawnInfo.isPledged == '1'">
          <el-col :span="19" :offset="1">
            <div class="textarea">
              <textarea :rows="5" v-model="pawnInfo.pledgeState"  @blur="inspectFormat('抵押情况')"   :maxlength="200"></textarea>
            </div>
          </el-col>
          <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.pledgeState"> 请输入抵押情况</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">抵押状态<i class="importent">*</i></el-col>
        <el-col :span="14" class="table_td">
          <el-radio-group v-model="pawnInfo.mortStatus">
            <el-radio v-for="item in mortStatusEnumList" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.mortStatus"> 请选择抵押状态</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">是否有争议<i class="importent">*</i></el-col>
        <el-col :span="14" class="table_td">
          <el-radio-group v-model="pawnInfo.isDispute">
            <el-radio v-for="item in isDisputeEnumList" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.isDispute"> 请选择是否有争议</el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">承租人是否已缴付一年及以上租金</el-col>
        <el-col :span="10" class="table_td">
          <el-radio-group v-model="pawnInfo.isOneRent">
            <el-radio label="01">是</el-radio>
            <el-radio label="02">否</el-radio>
          </el-radio-group>
        </el-col>
        <!--<el-col :span="8" class="error_title" style="line-height: 40px" v-show="errorShow.isOneRent"> 请选择承租人是否已缴付一年及以上租金</el-col>-->
      </el-col>
    </el-row>
    <!--<el-row class="module_margin_bottom tableInfo" v-if="businessType == '02'|| businessType=='04'">
      <el-col :span="24" class="table_tr ">
        <el-col :span="24" class="table_td doNotChange">抵押情况</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押形式</el-col>
        <el-col :span="4" class="table_td">贷款银行支行</el-col>
        <el-col :span="4" class="table_td">贷款金额(万元)</el-col>
        <el-col :span="4" class="table_td">贷款期限(月)</el-col>
        <el-col :span="3" class="table_td">贷款利率(%/月)</el-col>
        <el-col :span="3" class="table_td">银行尾款(万元)</el-col>
        <el-col :span="3" class="table_td">是否最高额贷款</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">
          <el-select v-model="valueLogVos[0].pledgeForm" placeholder="请选择" class="pledgeType" size='small'>
            <el-option :key="'01'" :label="'银行贷款'" :value="'01'"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="table_td">
          <el-input size="small" :maxlength="200" @keyup.native="clearSpeace('贷款银行支行')" class="pledgeType" v-model="valueLogVos[0].orgName"></el-input>
        </el-col>
        <el-col :span="4" class="table_td">
          <el-input size="small" :maxlength="20" @keyup.native="clearTwoNum(valueLogVos[0].amount)" @blur="clearTnum" class="pledgeType" v-model="valueLogVos[0].amount"></el-input>
        </el-col>
        <el-col :span="4" class="table_td">
          <el-input size="small" :maxlength="20"  @keyup.native="clearNum(valueLogVos[0].term)" class="pledgeType" v-model="valueLogVos[0].term"></el-input>
        </el-col>
        <el-col :span="3" class="table_td">
          <el-input size="small" :maxlength="20"  @keyup.native="clearRale(valueLogVos[0].monthRale)" @blur="clearTrale" class="pledgeType" v-model="valueLogVos[0].monthRale"></el-input>
        </el-col>
        <el-col :span="3" class="table_td">
          <el-input size="small" :maxlength="20" class="pledgeType" v-model="valueLogVos[0].surplusAmount"></el-input>
        </el-col>
        <el-col :span="3" class="table_td">
          <el-radio v-model="valueLogVos[0].isMaxAmount" label="1">是</el-radio>
          <el-radio v-model="valueLogVos[0].isMaxAmount" label="0">否</el-radio>
        </el-col>
      </el-col>

    </el-row>-->
    <!-- 抵押物基本影像信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物基本影像信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="3" taskType="138" class="module_margin_bottom"/>
    <!-- 抵押物勘察影像信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物勘察影像信息</span></h3>
    </div>
    <el-col :span="24" class="redtips">提示：录像、录音文件较大，可将文件上传至微信“文件传输助手”，再导出文件上传系统</el-col>
    <picModule :bussNo="$route.query.bussNo" dataType="4" taskType="138" class="module_margin_bottom"/>
    <!-- 抵押物状态及室内信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物状态及室内信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">内部结构<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-col :span="20">
            <el-select v-model="roomInfo.roomStructure" placeholder="请选择内部结构" size="small">
              <el-option v-for="item in structureEnumList" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-input size="small" v-show="roomInfo.roomStructure == '04'" @keyup.native="structureSpeace(roomInfo.remould)" v-model="roomInfo.remould"></el-input>-->
          <!--</el-col>-->
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">户型情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-col :span="2" :offset="1">
            <el-input :maxlength="2" size="small" @blur="inspectFormat('户型情况')" @keyup.native="houseTypeNum(roomInfo.houseType.bedroom,'1')" v-model="roomInfo.houseType.bedroom"></el-input>
          </el-col>
          <el-col :span="2">室</el-col>
          <el-col :span="2">
            <el-input :maxlength="2" size="small" @blur="inspectFormat('户型情况')" @keyup.native="houseTypeNum(roomInfo.houseType.livingRoom,'2')" v-model="roomInfo.houseType.livingRoom"></el-input>
          </el-col>
          <el-col :span="2">厅</el-col>
          <el-col :span="2">
            <el-input :maxlength="2" size="small" @blur="inspectFormat('户型情况')"  @keyup.native="houseTypeNum(roomInfo.houseType.kitchen,'3')" v-model="roomInfo.houseType.kitchen"></el-input>
          </el-col>
          <el-col :span="2">厨</el-col>
          <el-col :span="2">
            <el-input :maxlength="2" size="small" @blur="inspectFormat('户型情况')" @keyup.native="houseTypeNum(roomInfo.houseType.toilet,'4')" v-model="roomInfo.houseType.toilet"></el-input>
          </el-col>
          <el-col :span="2">卫</el-col>

          <el-col :span="2">
            <el-input :maxlength="2" size="small" @blur="inspectFormat('户型情况')" @keyup.native="houseTypeNum(roomInfo.houseType.balcony,'5')" v-model="roomInfo.houseType.balcony"></el-input>
          </el-col>
          <el-col :span="2">阳台</el-col>
        </el-col>
        <el-col :span="5" class=" table_td error_title" style="border: none" v-show="errorShow.houseTypeText">*请选择户型情况</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">朝向情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-col :span="8">
            <el-radio class="radio" v-model="roomInfo.orientation.choose" label="01">东西</el-radio>
            <el-radio class="radio" v-model="roomInfo.orientation.choose" label="02">南北</el-radio>
            <el-radio class="radio" v-model="roomInfo.orientation.choose" label="03">纯</el-radio>
          </el-col>
          <el-col :span="4">
            <el-select v-model="roomInfo.orientation.direction" placeholder="请选择方向" size="small" v-show="roomInfo.orientation.choose == '03'">
              <el-option :key="'E'" :label="'东'" :value="'E'"></el-option>
              <el-option :key="'W'" :label="'西'" :value="'W'"></el-option>
              <el-option :key="'S'" :label="'南'" :value="'S'"></el-option>
              <el-option :key="'N'" :label="'北'" :value="'N'"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-radio class="radio" v-model="roomInfo.orientation.choose" label="04">其他</el-radio>
          </el-col>
          <el-col :span="9">
            <el-input size="small" class="input_width" v-show="roomInfo.houseType.choose == '04'" v-model="roomInfo.houseType.direction"></el-input>
          </el-col>
        </el-col>
        <el-col :span="5" class=" table_td error_title" style="border: none" v-show="errorShow.roomStructure">*请选择朝向情况</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">是否有电梯<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-radio class="radio" v-model="roomInfo.hasElevator" label="1">是</el-radio>
          <el-radio class="radio" v-model="roomInfo.hasElevator" label="0">否</el-radio>
        </el-col>
        <el-col :span="3" class="table_td">家装情况<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-radio class="radio" v-model="roomInfo.decoration" label="01">豪华</el-radio>
          <el-radio class="radio" v-model="roomInfo.decoration" label="02">精装</el-radio>
          <el-radio class="radio" v-model="roomInfo.decoration" label="03">简装</el-radio>
          <el-radio class="radio" v-model="roomInfo.decoration" label="04">毛坯</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">使用情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-radio-group v-model="roomInfo.serviceCondition" >
            <el-radio :label="'01'">自住</el-radio>
            <el-radio :label="'02'">出租</el-radio>
            <el-radio :label="'03'">空置</el-radio>
          </el-radio-group>
          <span class="error_title" style="margin-left: 20px" v-show="errorShow.isServiceCondition">*使用情况不可为空</span>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">居住情况<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td table_tr">
          <el-col :span="6">
            <el-radio class="radio" v-model="roomInfo.dwell" label="1">抵押物内有老人、婴幼、病残居住</el-radio>
          </el-col>
          <el-col :span="2" v-show="roomInfo.dwell == '1'" :class="errorShow.dwellDetall">描述</el-col>
          <el-col :span="13" v-show="roomInfo.dwell == '1'">
            <el-input size="small" v-model="roomInfo.dwellDetall" :maxlength="200"></el-input>
          </el-col>
          <el-col :span="2">
            <el-radio class="radio" v-model="roomInfo.dwell" label="0">否</el-radio>
          </el-col>
        </el-col>
      </el-col>


      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">是否送花园或露台<span class="importent">*</span></el-col>
        <el-col :span="7" class="table_td">
          <el-col :span="24">
            <el-radio v-model="roomInfo.isGardenGiven" label="1">是</el-radio>
            <el-radio v-model="roomInfo.isGardenGiven" label="0">否</el-radio>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">层高(米)</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input size="small"  :maxlength="2" v-model="roomInfo.floorHeight" @blur="inspectFormat('层高')"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col :span="5" class="table_td">是否为原始格局<span class="importent">*</span></el-col>
        <el-col :span="7" class="table_td">
          <el-col :span="24">
            <el-radio v-model="roomInfo.isOriginalPattern" label="1">是</el-radio>
            <el-radio v-model="roomInfo.isOriginalPattern" label="0">否</el-radio>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <!-- 抵押物社区及周边信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物社区及周边信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">社区交通情况</el-col>
        <el-col :span="21" class="table_td">
          <el-col :span="6">
            <el-radio class="radio" v-model="aroundGua.traffic" label="0">无地铁</el-radio>
            <el-radio class="radio" v-model="aroundGua.traffic" label="1">临近地铁站</el-radio>
          </el-col>
          <el-col :span="17" v-show="aroundGua.traffic == '1'">
            <el-col :span="2">描述</el-col>
            <el-col :span="4">
              <el-input size="small" :maxlength="32" v-model="aroundGua.line"></el-input>
            </el-col>
            <el-col :span="2">号线</el-col>
            <el-col :span="4">
              <el-input size="small" :maxlength="20" v-model="aroundGua.subway"></el-input>
            </el-col>
            <el-col :span="4">站，步行距离</el-col>
            <el-col :span="5">
              <el-input size="small" :maxlength="20" v-model="aroundGua.distance"></el-input>
            </el-col>
            <el-col :span="2">m</el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">是否在闹市区、学区或商业集中区</el-col>
        <el-col :span="18" class="table_td">
          <el-col :span="6">
            <el-radio class="radio" v-model="isDowntown" label="0">是</el-radio>
            <el-radio class="radio" v-model="isDowntown" label="1">否</el-radio>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <!-- 抵押物价值信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物价值信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr" v-for="(item,index) in guaValue.assess">
        <el-col :span="2" class="table_td">中介机构<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-col :span="22" :offset="1">
            <el-input :maxlength="32" @keyup.native="clearSpeaceAssess(item.intermediary,index,'orgName')" size="small" v-model="item.intermediary"></el-input>
          </el-col>
        </el-col>
        <el-col :span="4" class="table_td">市场价(万元)<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-input :maxlength="20" @keyup.native="clearNumAssess(item.marketPrice,index,'unitPrice')" size="small" class="price" v-model="item.marketPrice"></el-input>
        </el-col>
        <el-col :span="4" class="table_td">快卖价格(万元)<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-input :maxlength="20" @keyup.native="clearNumAssess(item.fastPrice,index,'totalPrice')" size="small" class="price" v-model="item.fastPrice"></el-input>
        </el-col>
        <el-col :span="2" class="table_td">
          <el-button v-show="index" v-if="deleteAssess" size="small" @click="btnClick('删除评估',index)">删 除</el-button>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_td">
        <el-col :span="4" :offset="10"><el-button size="small" class="resultWidth" type="primary" @click="btnClick('新增评估')">新增评估</el-button></el-col>
      </el-col>

    </el-row>

    <el-col :span="2" :offset="11">
      <el-button @click="saveAll">保存抵押物信息</el-button>
    </el-col>
    <!-- 以下是弹框 -->
    <el-dialog title="房屋共有情况" :visible.sync="markShow.isAmendHouseOwnedInfoMark" size="tiny">
      <el-row>
        <el-col :span="24" v-for="item in pawnInfo.allot" class="mark_table_line">
          <el-col :span="6" class="mark_table_div">{{item.owenName}}</el-col>
          <el-col :span="15">
            <el-input size="small" v-model="item.scale"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import "./../../style/pledge.css";
  import MutualCert from "../../../com/mutualCert";
  export default {
    components: {MutualCert},
    name: "pledge",
    data() {
      return {
        housingSituationList:[],
        housingBol:false,
        isDowntown:'',//闹市区
        houseTypeList:[],
        conHouseNatureVoList:[],

        yearBol:false,
        purposeBol:false,
        businessType:'',
        mainID: "",
        // 必填项是否填写完成 false   完成为true  未完成未false
        deleteAssess:true,
        deleteMaleBargain:true,
        isSuccess: false,
        // 不用的
        way: "",
        areas: [],
        houseType: "",
        houseNature: "",
        radio: "1",
        pledgeType: "",
        picTypes: "",
        checked: true,
        something: "",
        pickerOptions0:  {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value: "",
        value1: "",
        //有用的
        locations: [],
        area: "",
        years: ["2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971","1970","1969","1968","1967","1966","1965","1964","1963","1962","1961","1960"],
        mounths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        // 抵押物信息
        pawnInfo: {
          powerNature:'',
          isOneRent:'',
          isDispute:'',
          mortStatus:'',
          landLine:'',
          landSource:'',
          propertyRight:'',
          isOneRent:'',
          isPledged:'',
          pledgeState:'',
          pledgee:'',


          housePercent: "",
          address: "",
          build: "",
          houseNum: "",
          communityName: "",
          floor: "",
          allFloor: "",
          year: "",
          houseAge: "",
          getHouseCardTime: "",
          getEquityWay: "",
          coveredArea: "",
          purpose: "",
          houseNature: "",
          // 是否满5唯一
          coverfive: false,
          covertwo: false,
          formerPrice: "",
          sole: "",
          theSameWithAddress: "",
          // 分配所有权
          allot: []
        },
        // 室内信息
        structureEnumList:[],
        mortStatusEnumList:[],
        isDisputeEnumList:[],
        roomInfo: {
          practicalApplication:'',//实际用房
          isOriginalPattern:'',//原始格局
          floorHeight:'',//层高
          isGardenGiven:'',//花园

          decoration: "",
          rentUse: "",
          rentUseDetail: "",
          dwellDetail: "",
          dwell: "",
          roomStructure: "",
          remould: "",
          dwellDetall: "",
          houseType: {
            bedroom: "",
            livingRoom: "",
            toilet: "",
            kitchen: "",
            balcony: ""
          },
          orientation: {
            choose: "",
            direction: ""
          },
          hasElevator: "",
          serviceCondition: "",
          tenantName: "",
          tenantIDCard: "",
          monthlyPrice: "",
          rentPrice: ""
        },
        // 抵押物周边
        aroundGua: {
          buildConstitute: [
            { flag: false, id: "01" },
            { flag: false, id: "02" },
            { flag: false, id: "03" },
            { flag: false, id: "04" },
            { flag: false, id: "05" },
            { flag: false, id: "06" }
          ],
          communityScale: "01",
          ripe: "02",
          afforest: "02",
          carportList: [
            { flag: false, id: "up" },
            { flag: false, id: "down" }
          ],
          buildPosition: "",
          schoolHouse: "0",
          schoolHouseRemark: "",
          traffic: "0",
          line: "",
          subway: "",
          distance: "",
          hasDisfacility: "0",
          disfacility: [
            { flag: false, name: "垃圾场", id: "01" },
            { flag: false, name: "高压电站", id: "02" },
            { flag: false, name: "工厂", id: "03" },
            { flag: false, name: "火车或地铁下穿", id: "04" },
            { flag: false, name: "加油站", id: "05" },
            { flag: false, name: "墓地/殡仪馆", id: "06" }
          ],
          disfacilityDescribe: ""
        },
        // 抵押物价值信息
        guaValue: {
          marketPrice:'',
          intermediaryOrgan: "",
          immediateSelaPrice: "",
          assess: [{ intermediary: "", marketPrice: "", fastPrice: "" }]
        },
        // 网询信息
        networkInquiry: {
          maleBargain: [
            {
              dealTime: "",
              dealPeriod: "",
              dealPrice: "",
              dealArea: "",
              isInternet: "1"
            }
          ]
        },
        // 模态框
        markShow: {
          isAmendHouseOwnedInfoMark: false
        },
        // 控制显示隐藏
        errorShow: {
          powerNature:false,
          isOneRent:false,
          isDispute:false,
          mortStatus:false,
          landLine:false,
          coverfive:false,
          houseTypeText:false,
          immediateSelaPrice:false,
          marketPrice:false,
          intermediaryOrgan:false,
          dwellDetall:'',
          roomStructure:false,
          isOneRent:false,
          pledgeState:false,
          address:'',
          build:'',
          houseNum:'',
          getHouseCardTime:false,
          isHouseCardNum: false,
          isCommunityName: false,
          isHouseFloor: false,
          isYear: false,
          isHouseAge: false,
          isGetEquityWay: false,
          isCoveredArea: false,
          isPurpose: false,
          isHouseNature: false,
          isFormerPrice: false,
          isTenantName: false,
          isTenantIDCard: false,
          isMonthlyPrice: false,
          isIntermediaryOrgan: false,
          isImmediateSelaPrice: false,
          isServiceCondition: false
        },
        valueLogVos: [
          {
            pledgeForm: "",
            orgName: "",
            amount: "",
            term: "",
            surplusAmount: "",
            monthRale: "",
            isMaxAmount: ""
          }
        ]
      };
    },
    computed :{
      houseAge (){
        if(this.pawnInfo.year){
          return new Date().getFullYear() - this.pawnInfo.year * 1
        }
        return ''
      }
    },
    methods: {
      finish(obj){
        let owerListString = JSON.parse(JSON.stringify(obj.owerListString))
        owerListString.forEach((item)=>{
          delete  item.scaleBol;
          delete  item.ownershipNoBol
        });
        this.housingSituationList = owerListString;
        this.housingBol = obj.bol;
      },
      //抵押物价值信息
      clearSpeaceAssess(str,index,type){
        this.$set(this.guaValue.assess[index],type,this._utils.clearSpeace(str))
      },
      clearNumAssess(str,index,type){
        this.$set(this.guaValue.assess[index],type,this._utils.clearTwoNum(str))
      },
      changeColor (type) {
        if(this.pawnInfo[type]){
          this.errorShow[type] = ''
        }else{
          this.errorShow[type] = 'font_red'
        }

      },
      ifCartId(){
        if (this.roomInfo.tenantName!=''&&this.roomInfo.tenantIDCard!=''){
          $.post(this._path + '/business/realNameAuthentication', { name: this.roomInfo.tenantName, certNo: this.roomInfo.tenantIDCard }, (res) => {
            if (res.resultCode && res.resultCode == '0000') {
              // 实名认证
              if (!res.data.isVerified) {
                this.$message({
                  type: 'error',
                  message: "实名认证失败",
                  duration: 1500,
                  showClose: true
                })
              }
            } else {
              this.$message({
                type: 'error',
                message: "实名认证失败：系统错误，请与管理员联系",
                duration: 1500,
                showClose: true
              })
            }
          }).error(() => {
            this.$message({
              type: 'error',
              message: "实名认证失败：系统错误，请与管理员联系",
              duration: 1500,
              showClose: true
            })
          });
        }
      },
      structureSpeace(str){
        switch(str){
          case '贷款银行支行':
            this.valueLogVos[0].orgName = this._utils.clearSpeace(this.valueLogVos[0].orgName);
            break;
          case '抵押情况':
            this.pawnInfo.pledgeState = this._utils.clearSpeace(this.pawnInfo.pledgeState);
            break;
        }
      },
      //户型情况
      houseTypeNum(str,type){
        let num = this._utils.clearTwoNum(str)
        switch (type){
          case '1':
            this.roomInfo.houseType.bedroom =num
            break
          case '2':
            this.roomInfo.houseType.livingRoom =num
            break
          case '3':
            this.roomInfo.houseType.kitchen =num
            break
          case '4':
            this.roomInfo.houseType.toilet =num
            break
          case '5':
            this.roomInfo.houseType.balcony =num
            break
        }
      },
      pickerFn(){
        if(!this.getHouseCardTime){
          this.errorShow.getHouseCardTime = false
        }else{
          this.errorShow.getHouseCardTime = true
        }
      },
      clearTnum(){
        let b = this.valueLogVos[0].amount/1
        this.valueLogVos[0].amount = b.toFixed(4)
      },
      clearTrale(){
        let b = this.valueLogVos[0].monthRale/1
        this.valueLogVos[0].monthRale = b.toFixed(2)
      },
      clearRale(str){
        this.valueLogVos[0].monthRale = this._utils.clearTwoNum(str)
      },
      queryEnum(){
        this.$http({
          url:'/dataReturn/getGuaEnumList',
          callback:res=>{
            let data = res.data;
            this.structureEnumList = data.structureEnum;
            this.mortStatusEnumList = data.mortStatusEnum;
            this.isDisputeEnumList = data.isDisputeEnum;
          }
        })
      },
      getEquityWayFn(val){
        if(val){
          this.errorShow.isGetEquityWay = false
        }
      },
      clearSpeace(str){
        switch(str){
          case '贷款银行支行':
            this.valueLogVos[0].orgName = this._utils.clearSpeace(this.valueLogVos[0].orgName);
            break;
          case '抵押情况':
            this.pawnInfo.pledgeState = this._utils.clearSpeace(this.pawnInfo.pledgeState);
            break
        }
      },
      clearTwoNum(str){
        this.valueLogVos[0].amount = this._utils.clearTwoNum(str)
      },
      clearNum(str){
        this.valueLogVos[0].term = this._utils.clearNum(str)
      },
      amendHouseOwnedInfo() {
        this.markShow.isAmendHouseOwnedInfoMark = true;
      },
      dialogVisible() {
        let sum = 0,haveZero = false;
        for (let i = 0; i < this.pawnInfo.allot.length; i++) {
          sum += this.pawnInfo.allot[i].scale * 1;
          if(this.pawnInfo.allot[i].scale == 0){
            haveZero = true
          }
        }
        if (sum != 100 || haveZero) {
          this.$message({
            message: "共有占比之和不为100%，请检查"
          });
          return;
        }

        let specific = [];
        for (let i = 0; i < this.pawnInfo.allot.length; i++) {
          specific.push(this.pawnInfo.allot[i].scale);
        }
        this.pawnInfo.housePercent = specific.join(":");
        this.markShow.isAmendHouseOwnedInfoMark = false;
      },
      inspectFormat(type) {
        switch (type) {
          case "权利性质":
            if (!this.pawnInfo.powerNature) {
              this.errorShow.powerNature = true;
            } else {
              this.errorShow.powerNature = false;
            }
            break;
          case "土地使用年限":
            if (!this.pawnInfo.landLine) {
              this.errorShow.landLine = true;
            } else {
              this.errorShow.landLine = false;
            }
            break;
          case "抵押情况":
            if (!this.pawnInfo.pledgeState) {
              this.errorShow.pledgeState = true;
            } else {
              this.errorShow.pledgeState = false;
            }
            break;
          case "户型情况":
            if (this.roomInfo.houseType.bedroom && this.roomInfo.houseType.livingRoom && this.roomInfo.houseType.kitchen && this.roomInfo.houseType.toilet && this.roomInfo.houseType.balcony) {
              this.errorShow.houseTypeText = false;
            }else{
              this.errorShow.houseTypeText = true;
            }
            break;
          case '建成年代':
            if(!this.yearBol){
              this.yearBol = true
              return
            }
            if(!this.pawnInfo.year){
              this.errorShow.isYear = true;
            } else {
              this.errorShow.isYear = false;
            }
            break
          case "房产证号":
            if (!this.pawnInfo.houseCardNum) {
              this.errorShow.isHouseCardNum = true;
            } else {
              this.errorShow.isHouseCardNum = false;
            }
            break;
          case "社区名称":
            if (!this.pawnInfo.communityName) {
              this.errorShow.isCommunityName = true;
            } else {
              this.errorShow.isCommunityName = false;
            }
            break;
          case "所在楼层总楼层":
            // 所在楼层等都存在
            if (this.pawnInfo.floor && this.pawnInfo.allFloor) {
              // 数字
              if (!this._utils.isNumber(this.pawnInfo.floor) ||!this._utils.isNumber(this.pawnInfo.allFloor)) {
                this.$message({
                  type:'warning',
                  message:'所在楼层、总楼层应为正整数',
                  duration:1500,
                  showClose:true
                })
                this.errorShow.isHouseFloor = true;
                return;
              } else {
                this.errorShow.isHouseFloor = false;
              }
              // 大小
              if (this.pawnInfo.floor/1 > this.pawnInfo.allFloor/1) {
                this.$message({
                  type: "warning",
                  message: "所在楼层不能大于总楼层",
                  duration: 1500,
                  showClose: true
                });
                return;
              }
            }
            break;
          case "房龄":
            /*if ( this.pawnInfo.houseAge * 1 <= 50 && this.pawnInfo.houseAge * 1 >= 1 ) {
              this.errorShow.isHouseAge = false;
            } else {
              this.pawnInfo.houseAge = '';
              this.errorShow.isHouseAge = true;
            }*/
            break;
          case "建筑面积":
            if (this.pawnInfo.coveredArea * 1 > 0) {
              this.errorShow.isCoveredArea = false;
            } else {
              this.errorShow.isCoveredArea = true;
            }
            break;
          case "规划用途":
            if(!this.purposeBol){
              this.purposeBol = true;
              return
            }
            if (this.pawnInfo.purpose) {
              this.errorShow.isPurpose = false;
            } else {
              this.errorShow.isPurpose = true;
            }
            break;
          case "原购价":
            if (this.pawnInfo.formerPrice * 1 >= 1) {
              this.errorShow.isFormerPrice = false;
            } else {
              this.errorShow.isFormerPrice = true;
            }
            break;
          case "中介机构":
            if (this.guaValue.intermediaryOrgan) {
              this.errorShow.intermediaryOrgan = false;
            } else {
              this.errorShow.intermediaryOrgan = true;
            }
            break;
          case "市场价":
            if (this.guaValue.marketPrice) {
              this.errorShow.marketPrice = false;
            } else {
              this.errorShow.marketPrice = true;
            }
            break;
          case "快卖价格":
            if (this.guaValue.immediateSelaPrice * 1 > 0) {
              this.errorShow.immediateSelaPrice = false;
            } else {
              this.errorShow.immediateSelaPrice = true;
            }
            break;
        }
      },
      btnClick(type, index) {
        switch (type) {
          case "新增评估":
            let assessIndex = this.guaValue.assess.length - 1;
            let assessObj = this.guaValue.assess[assessIndex];
            if (assessIndex > -1) {
              if (
                !assessObj.intermediary ||
                !assessObj.marketPrice ||
                !assessObj.fastPrice
              ) {
                this.$message({
                  message: "请填写完整评估机构信息后再增加新机构",
                  duration: 1500,
                  showClose: true
                });
                return;
              }
            }
            this.guaValue.assess.push({
              orgName: "",
              unitPrice: "",
              totalPrice: ""
            });
            this.deleteAssess = true
            break;
          case "删除评估":
            if(this.guaValue.assess.length == 1){
              return
            }
            if(this.guaValue.assess.length == 2){
              this.deleteAssess = false
            }
            this.guaValue.assess.splice(index, 1);
            break;
          case "新增网询结果":
            let maleBargainResultIndex =
              this.networkInquiry.maleBargain.length - 1;
            let maleBargainResultObj = this.networkInquiry.maleBargain[
              maleBargainResultIndex
              ];
            if (maleBargainResultIndex > -1) {
              if (
                !maleBargainResultObj.dealTime ||
                !maleBargainResultObj.dealPeriod ||
                !maleBargainResultObj.dealPrice ||
                !maleBargainResultObj.dealArea ||
                !maleBargainResultObj.isInternet
              ) {
                this.$message({
                  message: "请填写完整评估网询结果后再增加新网询结果",
                  duration: 1500,
                  showClose: true
                });
                return;
              }
              this.deleteMaleBargain = true
            }
            this.networkInquiry.maleBargain.push({
              dealTime: "",
              dealPeriod: "",
              dealPrice: "",
              dealArea: "",
              isInternet: "1"
            });
            break;
          case "删除网询结果":
            if(this.networkInquiry.maleBargain.length == 1){
              return
            }
            if(this.networkInquiry.maleBargain.length == 2){
              this.deleteMaleBargain = false
            }
            this.networkInquiry.maleBargain.splice(index, 1);
            break;
        }
      },
      mustWrite () {
        this.isSuccess = true;
        if(!this.pawnInfo.powerNature){
          this.errorShow.powerNature = true;
          this.isSuccess = false;
        }else{
          this.errorShow.powerNature = false;
        }
        // 房产证号
        if(!this.pawnInfo.houseCardNum){
          this.errorShow.isHouseCardNum = true;
          this.isSuccess = false;
        }else{
          this.errorShow.isHouseCardNum = false;
        }
        if(!this.ownerBol){
          if(this.housingBol){
            this.isSuccess = false;
          }
        }
        if(!this.pawnInfo.landLine){
          this.errorShow.landLine = true;
          this.isSuccess = false;
        }else{
          this.errorShow.landLine = false;
        }

        //   共有情况
        /*let ratio = this.pawnInfo.allot;
        let sum = 0;
        for(let i = 0;i < ratio.length;i++){
          sum = ratio[i].scale * 1 + sum
        }
        if(sum == 100){
          this.errorShow.allotClass = '';
        }else{
          this.errorShow.allotClass = 'font_red';
          this.isSuccess = false;
        }*/
        //  抵押物坐落
        if(!this.pawnInfo.address){
          this.errorShow.address = 'font_red';
          this.isSuccess = false
        }else{
          this.errorShow.address = '';
        }
        if(!this.pawnInfo.build){
          this.errorShow.build = 'font_red';
          this.isSuccess = false
        }else{
          this.errorShow.build = '';
        }
        if(!this.pawnInfo.houseNum){
          this.errorShow.houseNum = 'font_red';
          this.isSuccess = false
        }else{
          this.errorShow.houseNum = '';
        }
        //  社区名称
        if(!this.pawnInfo.communityName){
          this.errorShow.isCommunityName = true;
          this.isSuccess = false
        }else{
          this.errorShow.isCommunityName = false;
        }
        //  所在楼层/总层数
        if(!this.pawnInfo.allFloor || !this.pawnInfo.allFloor){
          this.errorShow.isHouseFloor = true;
          this.isSuccess = false
        }else{
          this.errorShow.isHouseFloor = false;
        }
        // 建成年代
        if(!this.pawnInfo.year){
          this.errorShow.isYear = true;
          this.isSuccess = false
        }else{
          this.errorShow.isYear = false;
        }
        // 房龄
        /*if(!this.pawnInfo.houseAge){
          this.errorShow.isHouseAge = true;
          this.isSuccess = false
        }else{
          this.errorShow.isHouseAge = false;
        }*/
        //房产证取得时间
        if(!this.pawnInfo.getHouseCardTime){
          this.errorShow.getHouseCardTime = true;
          this.isSuccess = false
        }else{
          this.errorShow.getHouseCardTime = false;
        }
        //产权获取方式
        if(!this.pawnInfo.getEquityWay){
          this.errorShow.isGetEquityWay = true;
          this.isSuccess = false
        }else{
          this.errorShow.isGetEquityWay = false;
        }
        //建筑面积(m²)
        if(!this.pawnInfo.coveredArea){
          this.errorShow.isCoveredArea = true;
          this.isSuccess = false
        }else{
          this.errorShow.isCoveredArea = false;
        }
        //规划用途
        if(!this.pawnInfo.purpose){
          this.errorShow.isPurpose = true;
          this.isSuccess = false
        }else{
          this.errorShow.isPurpose = false;
        }
        //房屋性质
        if(!this.pawnInfo.houseNature){
          this.errorShow.isHouseNature = true;
          this.isSuccess = false
        }else{
          this.errorShow.isHouseNature = false;
        }
        //产权性质
        if(!this.pawnInfo.propertyRight){
          this.errorShow.propertyRight = true;
          this.isSuccess = false
        }else{
          this.errorShow.propertyRight = false;
        }
        //土地来源
        if(!this.pawnInfo.landSource){
          this.errorShow.landSource = true;
          this.isSuccess = false
        }else{
          this.errorShow.landSource = false;
        }
        //满五

        if(!this.pawnInfo.coverfive){
          this.errorShow.coverfive = true;
          this.isSuccess = false
        }else{
          this.errorShow.coverfive = false;
        }
        //户地址与产权证记载地址是否一致
        if(this.pawnInfo.theSameWithAddress!== '1'&& this.pawnInfo.theSameWithAddress !== '0'){
          this.errorShow.theSameWithAddress = true;
          this.isSuccess = false
        }else{
          this.errorShow.theSameWithAddress = false;
        }
        // 当前是否在押
        if(this.pawnInfo.isPledged== '1') {
          if (!this.pawnInfo.pledgeState) {
            this.errorShow.pledgeState = true;
            this.isSuccess = false
          } else {
            this.errorShow.pledgeState = false;
          }
        }
        //内部结构
        if(this.roomInfo.roomStructure < 0){
          this.errorShow.roomStructure = true;
          this.isSuccess = false
        }else{
          this.errorShow.roomStructure = false;
        }

        //抵押状态
        if(!this.pawnInfo.mortStatus){
          this.errorShow.mortStatus = true;
          this.isSuccess = false
        }else{
          this.errorShow.mortStatus = false;
        }

        //是否有争议
        if(!this.pawnInfo.isDispute){
          this.errorShow.isDispute = true;
          this.isSuccess = false
        }else{
          this.errorShow.isDispute = false;
        }

        //承租人是否已缴付一年及以上租金
        /*if(!this.pawnInfo.isOneRent){
          this.errorShow.isOneRent = true;
          this.isSuccess = false
        }else{
          this.errorShow.isOneRent = false;
        }*/



        //户型情况
        if(!this.roomInfo.houseType.bedroom || !this.roomInfo.houseType.livingRoom || !this.roomInfo.houseType.kitchen || !this.roomInfo.houseType.toilet || !this.roomInfo.houseType.balcony ){
          this.errorShow.houseTypeText = true;
          this.isSuccess = false
        }else{
          this.errorShow.houseTypeText = false;
        }
        //朝向情况
        if(!this.roomInfo.orientation.choose){
          this.errorShow.orientation = true;
          this.isSuccess = false
        }else{
          this.errorShow.orientation = false;
        }
        //是否有电梯
        if(this.roomInfo.hasElevator != '1' && this.roomInfo.hasElevator != '0'){
          this.errorShow.hasElevator = true;
          this.isSuccess = false
        }else{
          this.errorShow.hasElevator = false;
        }
        //家装情况*
        if(!this.roomInfo.decoration){
          this.errorShow.decoration = true;
          this.isSuccess = false
        }else{
          this.errorShow.decoration = false;
        }


        //使用情况
        if(!this.roomInfo.serviceCondition){
          this.errorShow.serviceCondition = true;
          this.isSuccess = false
        }else{
          this.errorShow.serviceCondition = false;
        }
        //居住情况
        if(this.roomInfo.dwell === '1'&& !this.roomInfo.dwellDetall){
          this.errorShow.dwellDetall = 'font_red';
          this.isSuccess = false
        }else{
          this.errorShow.dwellDetall = '';
        }
        //是否送花园或露台
        if(this.roomInfo.isGardenGiven!== '1'&& this.roomInfo.isGardenGiven !== '0'){
          this.errorShow.isGardenGiven = true;
          this.isSuccess = false
        }else{
          this.errorShow.isGardenGiven = false
        }
        //是否为原始格局
        if(this.roomInfo.isOriginalPattern!== '1'&& this.roomInfo.isOriginalPattern !== '0'){
          this.errorShow.isOriginalPattern = true;
          this.isSuccess = false
        }else{
          this.errorShow.isOriginalPattern = false
        }
        //抵押物价值信息下模块验证
        let bol = false;
        this.guaValue.assess.forEach((itemObj)=>{
          if(!!itemObj.intermediary&&!!itemObj.marketPrice&&!!itemObj.fastPrice){
            bol = true
          }
        });
        if(!bol){
          this.isSuccess = false;
          setTimeout(()=>{
            this.$message({
              type:'error',
              message:'抵押物价值信息下须有一列信息填写完整',
              showClose:true,
              duration:1500
            })
          },1500);
        }
      },
      saveAll(fn,str) {

        if(!this.ownerBol){
          this.$refs.mutualCert.emitFinish();
        }
        this.mustWrite();

        if (
          this.roomInfo.serviceCondition == "01" ||
          this.roomInfo.serviceCondition == "03"
        ) {
          this.roomInfo.tenantName = "";
          this.roomInfo.tenantIDCard = "";
          this.roomInfo.monthlyPrice = "";
          this.roomInfo.rentPrice = "";
          this.roomInfo.rentPriceRemark = "";
          this.roomInfo.rentUseDetail = "";
          this.roomInfo.rentUse = "";
        }
        // 社区建筑构成
        let architecture = [];
        let architectureArr = this.aroundGua.buildConstitute;
        for (let i = 0, j = architectureArr.length; i < j; i++) {
          if (architectureArr[i].flag) {
            architecture.push(architectureArr[i].id);
          }
        }
        architecture = architecture.join(",");
        //户型情况
        let apartmentType = `${this.roomInfo.houseType.bedroom}室${this.roomInfo.houseType.livingRoom}厅${this.roomInfo.houseType.kitchen}厨${this.roomInfo.houseType.toilet}卫${this.roomInfo.houseType.balcony}阳台`;
        // aversionRemark:this.  附近嫌恶设施备注

        let aversionRemark = [];
        let aversionRemarkArr = this.aroundGua.disfacility;
        for (let i = 0, j = aversionRemarkArr.length; i < j; i++) {
          if (aversionRemarkArr[i].flag) {
            aversionRemark.push(aversionRemarkArr[i].id);
          }
        }
        aversionRemark = aversionRemark.join(",");
        aversionRemark = `${aversionRemark},备注,${this.aroundGua.disfacilityDescribe}`;

        // 	交通情况
        let trafficRemark = `${this.aroundGua.line}号线${this.aroundGua
          .subway}站${this.aroundGua.distance}m`;
        // 满五 满二
        let isFullFive = this.pawnInfo.coverfive
        // guaInternetConsuleLogVos  网询
        let gLogVos = JSON.stringify(this.networkInquiry.maleBargain);
        let guaInternetConsuleLogVos = JSON.parse(gLogVos)
        for (let i = 0, j = guaInternetConsuleLogVos.length; i < j; i++) {
          if (guaInternetConsuleLogVos[i]) {
            guaInternetConsuleLogVos[i].dealTime = Date.parse(
              guaInternetConsuleLogVos[i].dealTime
            );
          }
        }
        // 车位情况
        let parking = [];
        for(let i = 0;i <this.aroundGua.carportList.length;i++){
          if(this.aroundGua.carportList[i].flag){
            parking.push(this.aroundGua.carportList[i].id)
          }
        }
        parking = parking.join(',');
        let assessArr = [];
        this.guaValue.assess.forEach((item)=>{
          if(!!item.intermediary &&!!item.marketPrice && !!item.fastPrice){
            assessArr.push(item)
          }
        });
        let params = {
          id: this.mainID, //主键id
          guaAddress: this.pawnInfo.address,
          powerNature: this.pawnInfo.powerNature,
          guaBuilding: this.pawnInfo.build,
          guaNumber: this.pawnInfo.houseNum,
          guaProper: this.area,
          plotName: this.pawnInfo.communityName,
          ownershipNo: this.pawnInfo.houseCardNum,
          guaArea: this.pawnInfo.coveredArea,
          houseType: this.pawnInfo.purpose,
          houseNature: this.pawnInfo.houseNature,

          propertyRight:this.pawnInfo.propertyRight,
          isPledged:this.pawnInfo.isPledged,
          pledgeState:this.pawnInfo.pledgeState,
          landSource:this.pawnInfo.landSource,
          isDowntown:this.isDowntown,
          owenLogVoString:!this.ownerBol?JSON.stringify(this.housingSituationList):'',
          floorIn: this.pawnInfo.floor,
          floorSum: this.pawnInfo.allFloor,
          builtYear: this.pawnInfo.year,
          houseAge: this.houseAge,
          getOwenTime: this.pawnInfo.getHouseCardTime
            ? Date.parse(this.pawnInfo.getHouseCardTime)
            : "",
          getOwenType: this.pawnInfo.getEquityWay,
          isFullFive,
          isOnly: this.pawnInfo.sole,
          buyPrice: this.pawnInfo.formerPrice,
          addressIdentical: this.pawnInfo.theSameWithAddress,
          structure: this.roomInfo.roomStructure,
          structureRemark: this.roomInfo.remould,
          apartmentType,
          orientation: this.roomInfo.orientation.choose,
          orientationRemark: this.roomInfo.orientation.direction, // 朝向情况    东西南北
          isElevator: this.roomInfo.hasElevator,
          decoration: this.roomInfo.decoration,
          guaUsage: this.roomInfo.serviceCondition,
          lessee: this.roomInfo.tenantName,
          lesseeCert: this.roomInfo.tenantIDCard,
          rent: this.roomInfo.monthlyPrice,
          isOneRent: this.pawnInfo.isOneRent,
          isOneRentRemark: this.roomInfo.rentPriceRemark,
          isUseResidential: this.roomInfo.rentUse,
          isUseResidentialRemark: this.roomInfo.rentUseDetail,
          conditions: this.roomInfo.dwell,
          conditionsRemark: this.roomInfo.dwellDetall,

          isGardenGiven:this.roomInfo.isGardenGiven,
          floorHeight:this.roomInfo.floorHeight,

          landLine:this.pawnInfo.landLine,
          mortStatus:this.pawnInfo.mortStatus,
          isDispute:this.pawnInfo.isDispute,
          isOriginalPattern:this.roomInfo.isOriginalPattern,
          practicalApplication:this.roomInfo.practicalApplication,
          marketPrice:this.guaValue.marketPrice,

          architecture, //社区建筑构成是数组 是否变化
          scale: this.aroundGua.communityScale,
          maturity: this.aroundGua.ripe,
          greening: this.aroundGua.afforest,
          location: this.aroundGua.buildPosition,
          parking,
          isSchoolHouse: this.aroundGua.schoolHouse,
          isSchoolHouseRemark: this.aroundGua.schoolHouseRemark,
          traffic: this.aroundGua.traffic,
          trafficRemark, //:交通情况备注
          aversion: this.aroundGua.hasDisfacility,
          aversionRemark,
          bussNo: this.$route.query.bussNo,
          valueLogVoString: JSON.stringify(assessArr),
          pledgeLogVoString: JSON.stringify(this.valueLogVos),
          internetLogVoString: JSON.stringify(guaInternetConsuleLogVos),
          intermediary: this.guaValue.intermediaryOrgan,
          fastPrice: this.guaValue.immediateSelaPrice
        };
        if (this.isSuccess) {
          window.bus.$emit("isFullGuaShowR", '11');
          params.isFullGua = '11'
        } else {
          window.bus.$emit("isFullGuaShowR", '00');
          params.isFullGua = '00'
        }
        $.post(this._path + "/dataCheck/insertGuaLogSave", params, res => {
          if (res.resultCode == "0000") {
            if(res.data.isNotExist){
              this.$message({
                type: "info",
                message: res.data.isNotExist,
                duration: 1500,
                showClose: true
              });
            }else{
              this.$message({
                type: "success",
                message: "保存成功",
                duration: 1500,
                showClose: true
              });
            }
            if(!!fn && !!str){
              fn(str)
            }
            window.bus.$emit("isFullGuaShowR", res.data.isFullGua);
          } else {
            this.$message({
              type: "error",
              message: "保存失败",
              duration: 1500,
              showClose: true
            });
          }
        });
      }
    },
    created() {
      this.queryEnum()
      this.$http({
        url:'/dataCheck/selectBusHouseOwnershipLogBybussNo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          if(res.data.voList){
            this.ownerBol = res.data.voList.length === 1?res.data.voList[0].owenName:''
          }
        }
      });
      window.bus.$on('/infoInspect/inspectPledge',(fn,str) => {
        this.saveAll(fn,str);
      });
      $.post(
        this._path + "/business/queryAreasByCityCode",
        { cityCode: this.$route.query.areaCode },
        res => {
          this.areas = res.data.areaList;
        }
      );
      //规划用途*房屋性质*
      this.cityCongif(this,'/configuration/selectHouseTypeConf',this.$route.query.areaCode,(res)=>{
        this.houseTypeList = res.data.conHouseTypeVoList
      })
      this.cityCongif(this,'/configuration/selectHouseNatureConf',this.$route.query.areaCode,(res)=>{
        this.conHouseNatureVoList = res.data.conHouseNatureVoList
      })

      this.cityCongif(this,'/configuration/selectPositionLineConf',this.$route.query.areaCode,(res)=>{
        this.locations = res.data.conPositionLineVoList
      })
      $.post(
        this._path + "/dataCheck/selectBusGuaInfoLogBybussNo",
        { bussNo: this.$route.query.bussNo },
        res => {
          let data = res.data.guaLogVo;
          this.mainID = data.id;
          this.pawnInfo.powerNature = data.powerNature;
          this.pawnInfo.address = data.guaAddress;
          this.pawnInfo.build = data.guaBuilding;
          this.pawnInfo.houseNum = data.guaNumber;
          this.pawnInfo.landLine = data.landLine;
          this.pawnInfo.mortStatus = data.mortStatus;
          this.pawnInfo.isDispute = data.isDispute;
          this.pawnInfo.isOneRent = data.isOneRent;
          this.area = data.guaProper;
          this.pawnInfo.communityName = data.plotName;
          this.pawnInfo.houseCardNum = data.ownershipNo;
          this.pawnInfo.coveredArea = data.guaArea;
          this.pawnInfo.purpose = data.houseType;
          this.pawnInfo.houseNature = data.houseNature;

          this.pawnInfo.propertyRight = data.propertyRight;
          this.pawnInfo.isPledged =  data.isPledged;
          this.pawnInfo.pledgeState = data.pledgeState;
          this.pawnInfo.landSource = data.landSource;

          this.pawnInfo.floor = data.floorIn;
          this.pawnInfo.allFloor = data.floorSum;
          this.pawnInfo.year = data.builtYear;
          // this.pawnInfo.houseAge = data.houseAge;
          this.pawnInfo.getHouseCardTime = data.getOwenTime;
          this.pawnInfo.getEquityWay = data.getOwenType;
          this.pawnInfo.sole = data.isOnly;
          this.pawnInfo.formerPrice = data.buyPrice;
          this.pawnInfo.theSameWithAddress = data.addressIdentical;
          this.roomInfo.roomStructure = data.structure;
          this.roomInfo.remould = data.structureRemark;
          this.roomInfo.orientation.choose = data.orientation;
          this.roomInfo.orientation.direction = data.orientationRemark;
          this.roomInfo.hasElevator = data.isElevator;
          this.roomInfo.decoration = data.decoration;
          this.roomInfo.serviceCondition = data.guaUsage;
          this.roomInfo.tenantName = data.lessee;
          this.roomInfo.tenantIDCard = data.lesseeCert;
          this.roomInfo.monthlyPrice = data.rent;
          this.roomInfo.rentPrice = data.isOneRent;
          this.roomInfo.rentPriceRemark = data.isOneRentRemark;
          this.roomInfo.rentUse = data.isUseResidential;
          this.roomInfo.rentUseDetail = data.isUseResidentialRemark;
          this.roomInfo.dwell = data.conditions;
          this.roomInfo.dwellDetall = data.conditionsRemark;

          this.roomInfo.isGardenGiven = data.isGardenGiven;
          this.roomInfo.floorHeight = data.floorHeight;
          this.roomInfo.isOriginalPattern = data.isOriginalPattern;
          this.roomInfo.practicalApplication = data.practicalApplication;
          this.isDowntown = data.isDowntown;
          this.guaValue.marketPrice = data.marketPrice;

          this.aroundGua.communityScale = data.scale;
          this.aroundGua.afforest = data.greening;
          this.aroundGua.buildPosition = data.location;
          this.aroundGua.carport = data.parking;
          this.aroundGua.schoolHouse = data.isSchoolHouse;
          this.aroundGua.schoolHouseRemark = data.isSchoolHouseRemark;
          this.aroundGua.traffic = data.traffic;
          this.guaValue.intermediaryOrgan = data.intermediary;
          this.guaValue.immediateSelaPrice = data.fastPrice;
          this.aroundGua.hasDisfacility = data.aversion;
          this.aroundGua.ripe = data.maturity;
          // data.apartmentType  几室几厅
          if (data.apartmentType) {
            data.apartmentType = data.apartmentType
              .replace(/[\u4e00-\u9fa5]/g, ",")
              .split(",");
            this.roomInfo.houseType.bedroom = data.apartmentType[0];
            this.roomInfo.houseType.livingRoom = data.apartmentType[1];
            this.roomInfo.houseType.kitchen = data.apartmentType[2];
            this.roomInfo.houseType.toilet = data.apartmentType[3];
            this.roomInfo.houseType.balcony = data.apartmentType[4];
          }

          // data.isFullFive满五
          this.pawnInfo.coverfive = data.isFullFive;

          // 车位
          if(data.parking!=null){
            data.parking = data.parking.split(',');
            for(let i = 0;i < data.parking.length;i++){
              for(let j = 0;j < this.aroundGua.carportList.length; j++){
                if(data.parking[i] == this.aroundGua.carportList[j].id){
                  this.aroundGua.carportList[j].flag = true
                }
              }
            }

          }
          // data.architecture; 社区建筑构成
          if (data.architecture != null) {
            data.architecture = data.architecture.split(",");
            for (let i = 0, j = data.architecture.length; i < j; i++) {
              for (
                let n = 0, m = this.aroundGua.buildConstitute.length;
                n < m;
                n++
              ) {
                if (data.architecture[i] == this.aroundGua.buildConstitute[n].id) {
                  this.aroundGua.buildConstitute[n].flag = true;
                }
              }
            }
          }
          // data.trafficRemark;   交通备注
          data.trafficRemark = data.trafficRemark.replace("号线", ",").replace("站", ",").replace("m", "").split(",");
          this.aroundGua.line = data.trafficRemark[0];
          this.aroundGua.subway = data.trafficRemark[1];
          this.aroundGua.distance = data.trafficRemark[2];
          // data.aversionRemark;   嫌恶设施
          data.aversionRemark = data.aversionRemark.split(",");
          this.aroundGua.disfacilityDescribe = data.aversionRemark.pop();
          data.aversionRemark.pop();
          for (let i = 0, j = data.aversionRemark.length; i < j; i++) {
            for (let n = 0, m = this.aroundGua.disfacility.length; n < m; n++) {
              if (data.aversionRemark[i] == this.aroundGua.disfacility[n].id) {
                this.aroundGua.disfacility[n].flag = true;
              }
            }
          }
        }
      );
      $.post(
        this._path + "/dataCheck/selectBusGuaranValueLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          if(res.data.voList.length==0){
            this.guaValue.assess =  [{ orgName: "", unitPrice: "", totalPrice: "" }]
          }else{
            this.guaValue.assess = res.data.voList;
          }
          if(this.guaValue.assess.length == 1){
            this.deleteAssess = false
          }
        }
      );
      $.post(
        this._path + "/dataCheck/selectBusInternetConsulteLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          if(res.data.voList.length==0){
            this.networkInquiry.maleBargain =  [
              {
                dealTime: "",
                dealPeriod: "",
                dealPrice: "",
                dealArea: "",
                isInternet: "1"
              }
            ]
          }else{
            this.networkInquiry.maleBargain = res.data.voList;
          }
          if(this.guaValue.assess.length == 1){
            this.deleteMaleBargain = false
          }
        }
      );
      $.post(
        this._path + "/dataCheck/selectBusPledgeFormLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          if (res.data.voList.length) {
            this.valueLogVos = res.data.voList;
          }
        }
      );
      $.post(this._path + '/dataCheck/queryBusLoanByBussNoAndtaskType', {bussNo:this.$route.query.bussNo}, (res) => {
        this.businessType = res.data.busLoanLogVo.bussType
      })
    },
    beforeDestroy () {
      window.bus.$off('/infoInspect/inspectPledge');
    }
  };
</script>
