<template>
  <div class="pledge">
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>

    <!-- 抵押物基本信息 -->
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证号<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{pawnInfo.houseCardNum}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-if="ownerBol">
        <el-col :span="3" class="table_td">房屋所有权人</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            {{this.ownerBol}}
          </el-col>
        </el-col>
      </el-col>
      <mutual-cert ref="mutualCert"  v-if="!ownerBol" task-name="dataReturn" :disabled="true"></mutual-cert>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="3">抵押物坐落<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="21">
          <el-col :span="3">地址</el-col>
          <el-col :span="8"><el-input disabled size="small" v-model="pawnInfo.address"></el-input></el-col>
          <el-col :span="3">楼栋</el-col>
          <el-col :span="3"><el-input disabled size="small" v-model="pawnInfo.build"></el-input></el-col>
          <el-col :span="3">门牌号</el-col>
          <el-col :span="3"><el-input disabled size="small" v-model="pawnInfo.houseNum"></el-input></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">社区名称<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" v-model="pawnInfo.communityName" @blur="inspectFormat('社区名称')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isCommunityName"> *请填写社区名</el-col>
        </el-col>
        <el-col :span="3" class="table_td">所在楼层/总层数<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="8" :offset="1">
            <el-col :span="9" :offset="1">
              <el-input disabled size="small" v-model="pawnInfo.floor" @blur="inspectFormat('所在楼层总楼层')"></el-input>
            </el-col>
            <el-col :span="2">/</el-col>
            <el-col :span="11" :offset="1">
              <el-input disabled size="small" v-model="pawnInfo.allFloor"  @blur="inspectFormat('所在楼层总楼层')"></el-input>
            </el-col>
          </el-col>
          <el-col :span="15" class="error_title" v-show="errorShow.isHouseFloor"> *所在楼层和总层数应为正整数</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建成年代 <span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select disabled class="select_width" v-model="pawnInfo.year" placeholder="请选择"  size='small'>
              <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isYear"> *请填写建成年代</el-col>
        </el-col>
        <el-col :span="3" class="table_td">房龄(年)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <span>{{pawnInfo.houseAge}}</span>
            <!--<el-input disabled size="small" v-model="pawnInfo.houseAge" @blur="inspectFormat('房龄')"></el-input>-->
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseAge"> *房龄为数字1-50</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证取得时间 <span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1"><el-date-picker :editable="false" disabled v-model="pawnInfo.getHouseCardTime" size="small" class="date_width" type="date" placeholder="选择日期时间"></el-date-picker></el-col>
          <el-col :span="9" class="error_title"></el-col>
        </el-col>
        <el-col :span="3" class="table_td">土地使用年限(年)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" :maxlength="10" v-model="pawnInfo.landLine" @blur="inspectFormat('土地使用年限')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.landLine">*请输入土地使用年限</el-col>
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">产权获取方式<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select disabled class="select_width" v-model="pawnInfo.getEquityWay" placeholder="请选择" size="small">
              <el-option :key="'01'" :label="'购买'" :value="'01'"> </el-option>
              <el-option :key="'02'" :label="'赠与'" :value="'02'"> </el-option>
              <el-option :key="'03'" :label="'继承'" :value="'03'"> </el-option>
              <el-option :key="'04'" :label="'分割'" :value="'04'"> </el-option>
              <el-option :key="'05'" :label="'法判'" :value="'05'"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isGetEquityWay">*请选择产权获取方式</el-col>
        </el-col>

        <el-col :span="3" class="table_td">权利性质<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="23" :offset="1">
            {{pawnInfo.powerNature}}
            <!--<el-input size="small" disabled :maxlength="50" v-model="pawnInfo.powerNature" ></el-input>-->
          </el-col>
        </el-col>

      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">建筑面积(m²)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" v-model="pawnInfo.coveredArea" @blur="inspectFormat('建筑面积')"></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isCoveredArea"> *建筑面积为数字</el-col>
        </el-col>
        <el-col :span="3" class="table_td">所在区域<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-select disabled class="select_width" v-model="area" placeholder="请选择" size="small">
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
            <el-select disabled v-model="pawnInfo.purpose"  placeholder="请选择" class="select_width"  size='small'  @change="inspectFormat('规划用途')">
              <el-option v-for="item in houseTypeList" :label="item.typeName" :value="item.typeCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isPurpose"> *请选择规划用途</el-col>
        </el-col>
        <el-col class="table_td" :span="3">房屋性质<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select disabled v-model="pawnInfo.houseNature" placeholder="请选择" class="select_width"  size='small' @change="inspectFormat('房屋性质')">
              <el-option v-for="item in conHouseNatureVoList" :label="item.natureName" :value="item.natureCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.isHouseNature"> *请选择规房屋性质</el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col class="table_td" :span="3">产权性质<span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select disabled v-model="pawnInfo.propertyRight" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('规划用途')">
              <el-option v-for="item in _utils.propertyRightList" :label="item.typeName" :value="item.typeCode"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col class="table_td" :span="3">土地来源 <span class="importent">*</span></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="14" :offset="1">
            <el-select disabled v-model="pawnInfo.landSource" placeholder="请选择" class="select_width" size='small'>
              <el-option v-for="item in _utils.landSourceList" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">是否满五<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="13" :offset="1">
            <el-radio-group v-model="pawnInfo.coverfive">
              <el-radio disabled :label="'1'">满五</el-radio>
              <el-radio disabled :label="'2'">满二</el-radio>
              <el-radio disabled :label="'3'">非满二</el-radio>
            </el-radio-group>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">是否唯一<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td" style="border:none">
          <el-radio disabled v-model="pawnInfo.sole" label="1">唯一</el-radio>
          <el-radio disabled v-model="pawnInfo.sole" label="0">非唯一</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">原购价(万元)</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" :maxlength="20"  v-model="pawnInfo.formerPrice" @blur="inspectFormat('原购价')"></el-input>
          </el-col>
          <!--<el-col :span="9" class="error_title" v-show="errorShow.isFormerPrice"> *原购价为正数</el-col>-->
        </el-col>

        <el-col :span="9" class=" table_td error_title" v-show="errorShow.theSameWithAddress && !pawnInfo.theSameWithAddress">*请选择下户地址与产权证记载地址是否一致 </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">下户地址与产权证记载地址是否一致<span class="importent">*</span></el-col>
        <el-col :span="18" class="table_td">
          <el-col :span="12" :offset="6">
            <el-radio disabled v-model="pawnInfo.theSameWithAddress" label="1">一致</el-radio>
            <el-radio disabled v-model="pawnInfo.theSameWithAddress" label="0">不一致</el-radio>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">当前是否在押<span class="importent">*</span></el-col>
        <el-col :span="6" class="table_td">
          <el-col :span="24">
            <el-radio disabled v-model="pawnInfo.isPledged" label="1">是</el-radio>
            <el-radio disabled v-model="pawnInfo.isPledged" label="0">否</el-radio>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module">
        <el-col :span="3" class="table_td textarea_title" v-show="pawnInfo.isPledged == '1'">抵押情况<span class="importent">*</span></el-col>
        <el-col :span="21" class="textareawrap" v-show="pawnInfo.isPledged == '1'">
          <el-col :span="19" :offset="1">
            <div class="textarea">
              <textarea :rows="5" disabled v-model="pawnInfo.pledgeState"  class="textarea_disabled"   :maxlength="200"></textarea>
            </div>
          </el-col>
        </el-col>
      </el-col>








      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">抵押状态<i class="importent">*</i></el-col>
        <el-col :span="14" class="table_td">
          <el-radio-group disabled v-model="pawnInfo.mortStatus">
            <el-radio v-for="item in mortStatusEnumList" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.mortStatus"> 请选择抵押状态</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">是否有争议<i class="importent">*</i></el-col>
        <el-col :span="14" class="table_td">
          <el-radio-group disabled v-model="pawnInfo.isDispute">
            <el-radio v-for="item in isDisputeEnumList" :label="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="4" class="error_title" style="line-height: 40px" v-show="errorShow.isDispute"> 请选择是否有争议</el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">承租人是否已缴付一年及以上租金<i class="importent">*</i></el-col>
        <el-col :span="10" class="table_td">
          <el-radio-group disabled v-model="pawnInfo.isOneRent">
            <el-radio label="01">是</el-radio>
            <el-radio label="02">否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="error_title" style="line-height: 40px" v-show="errorShow.isOneRent"> 请选择承租人是否已缴付一年及以上租金</el-col>
      </el-col>




    </el-row>
    <!--<el-row class="module_margin_bottom tableInfo"  v-if="businessType == '02'||businessType=='04'">
			<el-col :span="24" class="table_tr "><el-col :span="24" class="table_td doNotChange">抵押情况</el-col></el-col>
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
					<el-select disabled v-model="valueLogVos[0].pledgeForm" placeholder="请选择" class="pledgeType" size='small'>
						<el-option :key="'01'" :label="'银行贷款'" :value="'01'"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" class="table_td">
					<el-input disabled size="small" class="pledgeType" v-model="valueLogVos[0].orgName"></el-input>
				</el-col>
				<el-col :span="4" class="table_td">
					<el-input disabled size="small" class="pledgeType" v-model="valueLogVos[0].amount"></el-input>
				</el-col>
				<el-col :span="4" class="table_td">
					<el-input disabled size="small" class="pledgeType" v-model="valueLogVos[0].term"></el-input>
				</el-col>
				<el-col :span="3" class="table_td">
					<el-input disabled size="small" class="pledgeType" v-model="valueLogVos[0].monthRale"></el-input>
				</el-col>
				<el-col :span="3" class="table_td">
					<el-input disabled size="small" class="pledgeType" v-model="valueLogVos[0].surplusAmount"></el-input>
				</el-col>
				<el-col :span="3" class="table_td">
					<el-radio disabled  v-model="valueLogVos[0].isMaxAmount" label="1">是</el-radio><el-radio disabled  v-model="valueLogVos[0].isMaxAmount" label="0">否</el-radio>
				</el-col>
			</el-col>

		</el-row>-->
    <!-- 抵押物基本影像信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物基本影像信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="3" taskType="136" :details="false" class="module_margin_bottom"/>
    <!-- 抵押物勘察影像信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物勘察影像信息</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="4" taskType="136" :details="false" class="module_margin_bottom"/>
    <!-- 抵押物状态及室内信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物状态及室内信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">内部结构<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td">
          <el-col :span="24">
            <el-select disabled v-model="roomInfo.roomStructure" placeholder="请选择内部结构" size="small">
              <el-option v-for="item in structureEnumList" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-col>
          <!--<el-col :span="12">-->
          <!--<el-input disabled size="small" v-show="roomInfo.roomStructure == '04'" v-model="roomInfo.remould"></el-input>-->
          <!--</el-col>-->
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">户型情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-col :span="2" :offset="1"><el-input disabled size="small" v-model="roomInfo.houseType.bedroom"></el-input></el-col>
          <el-col :span="2">室</el-col>
          <el-col :span="2"><el-input disabled size="small" v-model="roomInfo.houseType.livingRoom"></el-input></el-col>
          <el-col :span="2">厅</el-col>
          <el-col :span="2"><el-input disabled size="small" v-model="roomInfo.houseType.kitchen"></el-input></el-col>
          <el-col :span="2">厨</el-col>
          <el-col :span="2"><el-input disabled size="small" v-model="roomInfo.houseType.toilet"></el-input></el-col>
          <el-col :span="2">卫</el-col>
          <el-col :span="2"><el-input disabled size="small" v-model="roomInfo.houseType.balcony"></el-input></el-col>
          <el-col :span="2">阳台</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">朝向情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-col :span="8">
            <el-radio disabled class="radio" v-model="roomInfo.orientation.choose" label="01">东西</el-radio>
            <el-radio disabled class="radio" v-model="roomInfo.orientation.choose" label="02">南北</el-radio>
            <el-radio disabled class="radio" v-model="roomInfo.orientation.choose" label="03">纯</el-radio>
          </el-col>
          <el-col :span="4">
            <el-select disabled v-model="roomInfo.orientation.direction" placeholder="请选择方向" size="small" v-show="roomInfo.orientation.choose == '03'">
              <el-option :key="'E'" :label="'东'" :value="'E'"></el-option>
              <el-option :key="'W'" :label="'西'" :value="'W'"></el-option>
              <el-option :key="'S'" :label="'南'" :value="'S'"></el-option>
              <el-option :key="'N'" :label="'北'" :value="'N'"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-radio disabled class="radio" v-model="roomInfo.orientation.choose" label="04">其他</el-radio>
          </el-col>
          <el-col :span="9">
            <el-input disabled size="small" class="input_width" v-show="roomInfo.houseType.choose == '04'" v-model="roomInfo.houseType.direction"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">是否有电梯<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-radio disabled class="radio" v-model="roomInfo.hasElevator" label="1">是</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.hasElevator" label="0">否</el-radio>
        </el-col>
        <el-col :span="3" class="table_td">家装情况<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">
          <el-radio disabled class="radio" v-model="roomInfo.decoration" label="01">豪华</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.decoration" label="02">精装</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.decoration" label="03">简装</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.decoration" label="04">毛坯</el-radio>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">使用情况<span class="importent">*</span></el-col>
        <el-col :span="15" class="table_td">
          <el-radio disabled class="radio" v-model="roomInfo.serviceCondition" label="01">自住</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.serviceCondition" label="02">出租</el-radio>
          <el-radio disabled class="radio" v-model="roomInfo.serviceCondition" label="03">空置</el-radio>
        </el-col>
      </el-col>
      <!--<el-col :span="24" class="table_tr" v-show="roomInfo.serviceCondition == '02'">
				<el-col :span="3" class="table_td">承租人</el-col>
				<el-col :span="9" class="table_td">
					<el-col :span="14" :offset="1"><el-input disabled size="small" v-model="roomInfo.tenantName"></el-input></el-col>
					<el-col :span="8" class="error_title" v-show="errorShow.isTenantName">*承租人姓名</el-col>
				</el-col>
				<el-col :span="3" class="table_td">身份证号</el-col>
				<el-col :span="9" class="table_td">
					<el-col :span="14" :offset="1"><el-input disabled size="small" v-model="roomInfo.tenantIDCard"></el-input></el-col>
					<el-col :span="8" class="error_title" v-show="errorShow.isTenantIDCard">*承租人身份证号</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="table_tr"  v-show="roomInfo.serviceCondition == '02'">
				<el-col :span="3" class="table_td">月租金(元)</el-col>
				<el-col :span="9" class="table_td">
					<el-col :span="14" :offset="1"><el-input disabled size="small" v-model="roomInfo.monthlyPrice"></el-input></el-col>
					<el-col :span="8" class="error_title" v-show="errorShow.isMonthlyPrice">*月租金</el-col>
				</el-col>
			</el-col>
			<el-col :span="24" class="table_tr"  v-show="roomInfo.serviceCondition == '02'" 	>
				<el-col :span="3" class="table_td rentInfo">出租情况</el-col>
				<el-col :span="21" class="table_td table_tr">
					<el-col :span="6">
						<el-radio disabled class="radio" v-model="roomInfo.rentPrice" label="1">承租人已缴付一年及以上租金</el-radio>
					</el-col>
					<el-col :span="2" v-show="roomInfo.rentPrice == '1'">描述</el-col>
					<el-col :span="13" v-show="roomInfo.rentPrice == '1'">
						<el-input disabled size="small" v-model="roomInfo.rentPriceRemark"></el-input>
					</el-col>
					<el-col :span="2">
						<el-radio disabled class="radio" v-model="roomInfo.rentPrice" label="0">否</el-radio>
					</el-col>
				</el-col>
				<el-col :span="21" class="table_td table_tr clear_border">
					<el-col :span="6">
						<el-radio disabled class="radio" v-model="roomInfo.rentUse" label="1">抵押物出租用途为非居住用途</el-radio>
					</el-col>
					<el-col :span="2" v-show="roomInfo.rentUse == '1'">描述</el-col>
					<el-col :span="13" v-show="roomInfo.rentUse == '1'">
						<el-input disabled size="small" v-model="roomInfo.rentUseDetail"></el-input>
					</el-col>
					<el-col :span="2">
						<el-radio disabled class="radio" v-model="roomInfo.rentUse" label="0">否</el-radio>
					</el-col>
				</el-col>
			</el-col>-->
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">居住情况<span class="importent">*</span></el-col>
        <el-col :span="21" class="table_td table_tr">
          <el-col :span="6">
            <el-radio disabled class="radio" v-model="roomInfo.dwell" label="1">抵押物内有老人、婴幼、病残居住</el-radio>
          </el-col>
          <el-col :span="2" v-show="roomInfo.dwell == '1'">描述</el-col>
          <el-col :span="13" v-show="roomInfo.dwell == '1'">
            <el-input disabled size="small" v-model="roomInfo.dwellDetall"></el-input>
          </el-col>
          <el-col :span="2">
            <el-radio disabled class="radio" v-model="roomInfo.dwell" label="0">否</el-radio>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="5" class="table_td">是否送花园或露台<span class="importent">*</span></el-col>
        <el-col :span="7" class="table_td">
          <el-col :span="24">
            <el-radio disabled v-model="roomInfo.isGardenGiven" label="1">是</el-radio>
            <el-radio disabled v-model="roomInfo.isGardenGiven" label="0">否</el-radio>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">层高(米)</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="14" :offset="1">
            <el-input disabled size="small" v-model="roomInfo.floorHeight" @blur="inspectFormat('层高')"></el-input>
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr" :span="24">
        <el-col :span="5" class="table_td">是否为原始格局<span class="importent">*</span></el-col>
        <el-col :span="7" class="table_td">
          <el-col :span="24">
            <el-radio disabled v-model="roomInfo.isOriginalPattern" label="1">是</el-radio>
            <el-radio disabled v-model="roomInfo.isOriginalPattern" label="0">否</el-radio>
          </el-col>
        </el-col>
        <!--<el-col class="table_td" :span="3">实际用房<span class="importent">*</span></el-col>-->
        <!--<el-col class="table_td" :span="9">-->
        <!--<el-col :span="14" :offset="1">-->
        <!--<el-select disabled v-model="roomInfo.practicalApplication" placeholder="请选择" class="select_width" size='small' @change="inspectFormat('房屋性质')">-->
        <!--<el-option v-for="item in _utils.practicalApplicationList" :label="item.name" :value="item.code"></el-option>-->
        <!--</el-select>-->
        <!--</el-col>-->
        <!--</el-col>-->
      </el-col>
    </el-row>
    <!-- 抵押物社区及周边信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物社区及周边信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">社区建筑构成</el-col>
                <el-col :span="21" class="table_td">
                    <el-checkbox disabled v-model="aroundGua.buildConstitute[0].flag">低层板楼</el-checkbox>
                    <el-checkbox disabled v-model="aroundGua.buildConstitute[1].flag">塔楼</el-checkbox>
                    <el-checkbox disabled v-model="aroundGua.buildConstitute[2].flag">洋房</el-checkbox>
                    <el-checkbox disabled v-model="aroundGua.buildConstitute[3].flag">联排别墅</el-checkbox>
                    <el-checkbox disabled v-model="aroundGua.buildConstitute[4].flag">独栋别墅</el-checkbox>
                </el-col>
            </el-col>-->
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">社区规模</el-col>
                <el-col :span="15" class="table_td">
                    <el-radio disabled class="radio" v-model="aroundGua.communityScale" label="01">10栋及以上</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.communityScale" label="02">6-9栋</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.communityScale" label="03">4-5栋</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.communityScale" label="04">1-3栋</el-radio>
                </el-col>
            </el-col>-->
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">社区成熟情况</el-col>
                <el-col :span="9" class="table_td">
                    <el-radio disabled class="radio" v-model="aroundGua.ripe" label="01">成熟</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.ripe" label="02">一般</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.ripe" label="03">差</el-radio>
                </el-col>
                <el-col :span="3" class="table_td">社区绿化卫生</el-col>
                <el-col :span="9" class="table_td">
                    <el-radio disabled class="radio" v-model="aroundGua.afforest" label="01">较好</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.afforest" label="02">一般</el-radio>
                    <el-radio disabled class="radio" v-model="aroundGua.afforest" label="03">差</el-radio>
                </el-col>
            </el-col>-->
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">社区地理位置</el-col>
                <el-col :span="9" class="table_td">
                    <el-col :span="15">
                        <el-select disabled v-model="aroundGua.buildPosition" placeholder="请选择" size="small">
              <el-option v-for="item in locations" :key="item.lineCode" :label="item.lineName" :value="item.lineCode"></el-option>
                            </el-select>
                    </el-col>
                </el-col>
                <el-col :span="3" class="table_td">社区车位情况</el-col>
                <el-col :span="9" class="table_td">
                        <el-checkbox disabled v-model="aroundGua.carportList[0].flag">地上</el-checkbox>
                        <el-checkbox disabled v-model="aroundGua.carportList[1].flag">地下</el-checkbox>
                </el-col>
            </el-col>-->
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td">是否为学区房</el-col>
                <el-col :span="21" class="table_td">
                    <el-col :span="6">
                        <el-radio disabled class="radio" v-model="aroundGua.schoolHouse" label="0">否</el-radio>
                        <el-radio disabled class="radio" v-model="aroundGua.schoolHouse" label="1">是</el-radio>
                    </el-col>
                    <el-col :span="17" v-show="aroundGua.schoolHouse == '1'">
                        <el-input disabled size="small" v-model="aroundGua.schoolHouseRemark"></el-input>
                    </el-col>
                </el-col>
            </el-col>-->
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">社区交通情况</el-col>
        <el-col :span="21" class="table_td">
          <el-col :span="6">
            <el-radio disabled class="radio" v-model="aroundGua.traffic" label="0">无地铁</el-radio>
            <el-radio disabled class="radio" v-model="aroundGua.traffic" label="1">临近地铁站</el-radio>
          </el-col>
          <el-col :span="17" v-show="aroundGua.traffic == '1'">
            <el-col :span="2">描述</el-col>
            <el-col :span="4"><el-input disabled size="small" v-model="aroundGua.line"></el-input></el-col>
            <el-col :span="2">号线</el-col>
            <el-col :span="4"><el-input disabled size="small" v-model="aroundGua.subway"></el-input></el-col>
            <el-col :span="4">站，步行距离</el-col>
            <el-col :span="5"><el-input disabled size="small" v-model="aroundGua.distance"></el-input></el-col>
            <el-col :span="2">m</el-col>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="6" class="table_td">是否在闹市区、学区或商业集中区</el-col>
        <el-col :span="18" class="table_td">
          <el-col :span="6">
            <el-radio disabled class="radio" v-model="isDowntown" label="0">是</el-radio>
            <el-radio disabled class="radio" v-model="isDowntown" label="1">否</el-radio>
          </el-col>
        </el-col>
      </el-col>
      <!--<el-col :span="24" class="table_tr">
                <el-col :span="3" class="table_td rentInfo">附近嫌恶设施</el-col>
                <el-col :span="21" class="table_td table_tr">
                    <el-col :span="5" class="table_td">
                        <el-radio disabled class="radio" v-model="aroundGua.hasDisfacility" label="0">无</el-radio>
                        <el-radio disabled class="radio" v-model="aroundGua.hasDisfacility" label="1">有</el-radio>

                    </el-col>
                    <el-col :span="19" class="table_td">
                         <el-checkbox disabled v-for="item in aroundGua.disfacility" v-model="item.flag">{{item.name}}</el-checkbox>
                    </el-col>
                </el-col>
                <el-col :span="21"  class="table_td table_tr">
                    <el-col :span="2">描述</el-col>
                    <el-col :span="21"><el-input disabled size="small" v-model="aroundGua.disfacilityDescribe"></el-input></el-col>
                </el-col>
            </el-col>-->
    </el-row>
    <!-- 抵押物价值信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物价值信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <!--<el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">中介机构<span class="importent">*</span></el-col>
        <el-col :span="5" class="table_td">
          <el-col :span="22" :offset="1">
            <el-input size="small" disabled v-model="guaValue.intermediaryOrgan" @blur="inspectFormat('中介机构')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">市场价(万元)<span class="importent">*</span></el-col>
        <el-col :span="5" class="table_td">
          <el-col :span="22" :offset="1">
            <el-input size="small" disabled v-model="guaValue.marketPrice" @blur="inspectFormat('市场价')"></el-input>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">快卖价格(万元)<span class="importent">*</span></el-col>
        <el-col :span="5" class="table_td">
          <el-col :span="22" :offset="1">
            <el-input size="small" disabled v-model="guaValue.immediateSelaPrice" @blur="inspectFormat('快卖价格')"></el-input>
          </el-col>
        </el-col>
      </el-col>-->
      <el-col :span="24" class="table_tr" v-for="(item,index) in guaValue.assess">
        <el-col :span="4" class="table_td">中介机构<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-col :span="22" :offset="1">
            <el-input disabled size="small" v-model="item.orgName"></el-input>
          </el-col>
        </el-col>
        <el-col :span="4" class="table_td">市场价(万元)<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-input disabled size="small" class="price" v-model="item.unitPrice"></el-input>
        </el-col>
        <el-col :span="4" class="table_td">快卖价格(万元)<span v-if="!index" class="importent">*</span></el-col>
        <el-col :span="4" class="table_td">
          <el-input disabled size="small" class="price" v-model="item.totalPrice"></el-input>
        </el-col>
      </el-col>
      <!--	<el-col :span="24" class="table_tr" v-for="(item,index) in guaValue.assess">
                  <el-col :span="3" class="table_td">评估机构</el-col>
                  <el-col :span="5" class="table_td">
            <el-col :span="22" :offset="1">
              <el-input disabled size="small" v-model="item.orgName"></el-input>
            </el-col>
                  </el-col>
                  <el-col :span="2" class="table_td">单价(万元)</el-col>
                  <el-col :span="4" class="table_td">
                      <el-input disabled size="small" class="price" v-model="item.unitPrice"></el-input>
                  </el-col>
                  <el-col :span="2" class="table_td">总价(万元)</el-col>
                  <el-col :span="4" class="table_td">
                      <el-input disabled size="small" class="price" v-model="item.totalPrice"></el-input>
                  </el-col>
                  <el-col :span="3" class="table_td">
                  </el-col>
              </el-col>-->
    </el-row>
    <!-- 抵押物网询信息及网询截图 -->
    <!--<div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>抵押物网询信息及网询截图</span></h3>
    </div>-->
    <!--<el-row class=" module_margin_bottom tableInfo">
            <el-col class="table_tr table_tr_header doNotChange" :span="24">
                <el-col class="table_td" :span="24">网询结果</el-col>
            </el-col>
            <el-col class="table_tr doNotChange" :span="24">
                <el-col class="table_td" :span="4">成交日期</el-col>
                <el-col class="table_td" :span="4">成交周期(月)</el-col>
                <el-col class="table_td" :span="4">成交价格(万元)</el-col>
                <el-col class="table_td" :span="4">成交面积</el-col>
                <el-col class="table_td" :span="4">网询价格是否存在</el-col>
                <el-col class="table_td" :span="4">操作</el-col>
            </el-col>
            &lt;!&ndash; {dealTime:'',dealPeriod:'',dealPrice:'',dealArea:'',isInternet:'1'} &ndash;&gt;
            <el-col class="table_tr " :span="24" v-for="(item,index) in networkInquiry.maleBargain">
                <el-col class="table_td" :span="4">
                    <el-date-picker disabled size="small" class="resultWidth" v-model="item.dealTime" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
                </el-col>
                <el-col class="table_td" :span="4">
                    <el-select disabled size="small" v-model="item.dealPeriod" placeholder="请选择"  class="resultWidth">
                    <el-option v-for="item in mounths" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-col>
                <el-col class="table_td" :span="4"><el-input disabled size="small" class="resultWidth" v-model="item.dealPrice"></el-input></el-col>
                <el-col class="table_td" :span="4"><el-input disabled size="small" class="resultWidth" v-model="item.dealArea"></el-input></el-col>
                <el-col class="table_td" :span="4">
                    <el-radio disabled class="radio" v-model="item.isInternet" label="1">是</el-radio>
                  <el-radio disabled class="radio" v-model="item.isInternet" label="0">否</el-radio>
                </el-col>
            </el-col>
        </el-row>-->
    <!-- 网询截图 -->
    <!--<picModule :bussNo="$route.query.bussNo" dataType="5" taskType="136" :details="false"/>-->
    <!-- 以下是弹框 -->
    <el-dialog title="房屋共有情况" :visible.sync="markShow.isAmendHouseOwnedInfoMark" size="tiny">
      <el-row>
        <el-col :span="24" v-for="item in pawnInfo.allot" class="mark_table_line">
          <el-col :span="6" class="mark_table_div">{{item.owenName}}</el-col>
          <el-col :span="15"><el-input disabled size="small" v-model="item.scale"></el-input></el-col>
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
    name: "gua_add",
    data() {
      return {
        structureEnumList:[],
        mortStatusEnumList:[],
        isDisputeEnumList:[],
        ownerBol: '',
        isDowntown:'',//闹市区
        houseTypeList:[],
        conHouseNatureVoList:[],

        businessType:'',
        mainID: "",
        // 必填项是否填写完成 false   完成为true  未完成未false

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
        pickerOptions0: "",
        value: "",
        value1: "",
        //有用的
        locations: [],
        area: "",
        years: [
          "2018",
          "2017",
          "2016",
          "2015",
          "2014",
          "2013",
          "2012",
          "2011",
          "2010",
          "2009",
          "2008",
          "2007",
          "2006",
          "2005",
          "2004",
          "2003",
          "2002",
          "2001",
          "2000",
          "1999",
          "1998",
          "1997",
          "1996",
          "1995",
          "1994",
          "1993",
          "1992",
          "1991",
          "1990",
          "1989",
          "1988",
          "1987",
          "1986",
          "1985",
          "1984",
          "1983",
          "1982",
          "1981",
          "1980",
          "1979",
          "1978",
          "1977",
          "1976",
          "1975",
          "1974",
          "1973",
          "1972",
          "1971",
          "1970",
          "1969",
          "1968",
          "1967",
          "1966",
          "1965",
          "1964",
          "1963",
          "1962",
          "1961",
          "1960"
        ],
        mounths: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        // 抵押物信息
        pawnInfo: {
          powerNature:"",
          pledgeState:'',
          isPledged:'',
          pledgee:'',
          landSource:'',
          propertyRight:'',
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
          assess: [{ orgName: "", unitPrice: "", totalPrice: "" }]
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
    methods: {
      amendHouseOwnedInfo() {
        this.markShow.isAmendHouseOwnedInfoMark = true;
      },
      dialogVisible() {
        let sum = 0;
        for (let i = 0; i < this.pawnInfo.allot.length; i++) {
          sum += this.pawnInfo.allot[i].scale * 1;
        }
        if (sum != 100) {
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
            if (!this.pawnInfo.floor && !this.pawnInfo.allFloor) {
              // 数字
              if (
                !this._utils.isNumber(this.pawnInfo.floor) ||
                !this._utils.isNumber(this.pawnInfo.allFloor)
              ) {
                // this.$message({
                // 	type:'warning',
                // 	message:'所在楼层、总楼层应为正整数',
                // 	duration:1500,
                // 	showClose:true
                // })
                this.errorShow.isHouseFloor = true;
                return;
              } else {
                this.errorShow.isHouseFloor = true;
              }
              // 大小
              if (this.pawnInfo.floor > this.pawnInfo.allFloor) {
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
            if (
              this.pawnInfo.houseAge * 1 < 50 &&
              this.pawnInfo.houseAge * 1 >= 1
            ) {
              this.errorShow.isHouseAge = false;
            } else {
              this.errorShow.isHouseAge = true;
            }
            break;
          case "建筑面积":
            if (this.pawnInfo.coveredArea * 1 < 0) {
              this.errorShow.isCoveredArea = false;
            } else {
              this.errorShow.isCoveredArea = true;
            }
            break;
          case "规划用途":
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
              this.errorShow.isIntermediaryOrgan = false;
            } else {
              this.errorShow.isIntermediaryOrgan = true;
            }
            break;
          case "快卖价格":
            if (this.guaValue.immediateSelaPrice * 1 >= 0) {
              this.errorShow.isImmediateSelaPrice = false;
            } else {
              this.errorShow.isImmediateSelaPrice = true;
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
                !assessObj.orgName ||
                !assessObj.unitPrice ||
                !assessObj.totalPrice
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
            break;
          case "删除评估":
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
            this.networkInquiry.maleBargain.splice(index, 1);
            break;
        }
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
    },
    created() {
      this.queryEnum();
      $.post(this._path + '/business/queryAreasByCityCode',{cityCode:this.$route.query.areaCode},res=>{
        this.areas = res.data.areaList
      });
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
        this._path + "/dataReturn/selectBusGuaInfoLogBybussNo",
        { bussNo: this.$route.query.bussNo },
        res => {
          let data = res.data.guaLogVo;
          // return
          this.mainID = data.id; //主键id
          this.pawnInfo.powerNature = data.powerNature;
          this.pawnInfo.address = data.guaAddress;
          this.pawnInfo.build = data.guaBuilding;
          this.pawnInfo.houseNum = data.guaNumber;
          this.area = data.guaProper;
          this.pawnInfo.communityName = data.plotName;
          this.pawnInfo.houseCardNum = data.ownershipNo;
          this.pawnInfo.coveredArea = data.guaArea;
          this.pawnInfo.purpose = data.houseType;
          this.pawnInfo.houseNature = data.houseNature;
          this.pawnInfo.floor = data.floorIn;
          this.pawnInfo.allFloor = data.floorSum;
          this.pawnInfo.year = data.builtYear;
          this.pawnInfo.houseAge = data.houseAge;
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

          this.pawnInfo.propertyRight = data.propertyRight;
          this.pawnInfo.isPledged =  data.isPledged;
          this.pawnInfo.pledgeState = data.pledgeState;
          this.pawnInfo.landSource = data.landSource;
          this.roomInfo.isGardenGiven = data.isGardenGiven;
          this.roomInfo.floorHeight = data.floorHeight;
          this.roomInfo.isOriginalPattern = data.isOriginalPattern;
          this.roomInfo.practicalApplication = data.practicalApplication;
          this.isDowntown = data.isDowntown;
          this.guaValue.marketPrice = data.marketPrice;

          this.pawnInfo.landLine = data.landLine;
          this.pawnInfo.mortStatus = data.mortStatus;
          this.pawnInfo.isDispute = data.isDispute;
          this.pawnInfo.isOneRent = data.isOneRent;

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
          this.pawnInfo.coverfive = data.isFullFive?data.isFullFive:'';
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
                if (
                  data.architecture[i] == this.aroundGua.buildConstitute[n].id
                ) {
                  this.aroundGua.buildConstitute[n].flag = true;
                }
              }
            }
          }

          // data.trafficRemark;   交通备注
          if (data.trafficRemark != null) {
            data.trafficRemark = data.trafficRemark
              .replace("号线", ",")
              .replace("站", ",")
              .replace("m", "")
              .split(",");
            this.aroundGua.line = data.trafficRemark[0];
            this.aroundGua.subway = data.trafficRemark[1];
            this.aroundGua.distance = data.trafficRemark[2];
          }

          // data.aversionRemark;   嫌恶设施
          if (data.aversionRemark != null) {
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
        }
      );
      $.post(
        this._path + "/dataReturn/selectBusGuaranValueLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          this.guaValue.assess = res.data.voList;
        }
      );
      $.post(
        this._path +
        "/dataReturn/selectBusInternetConsulteLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          this.networkInquiry.maleBargain = res.data.voList;
        }
      );
      this.$http({
        url:'/dataReturn/selectBusHouseOwnershipLogBybussNo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          if(res.data.voList){
            this.ownerBol = res.data.voList.length === 1?res.data.voList[0].owenName:''
          }
        }
      });
      $.post(
        this._path + "/dataReturn/selectBusPledgeFormLogByBussNoAndtaskType",
        { bussNo: this.$route.query.bussNo },
        res => {
          if (res.data.voList.length) {
            this.valueLogVos = res.data.voList;
          }
        }
      );
      $.post(this._path + '/dataReturn/queryBusLoanByBussNoAndtaskTypeReturn', {bussNo:this.$route.query.bussNo}, (res) => {
        this.businessType = res.data.busLoanLogVo.bussType
      })
    }
  };
</script>
