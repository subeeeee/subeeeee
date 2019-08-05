<template>
  <div class="borrowMoneyPerson">

    <div class="show_list_title">
      <h3><img src="../../../assets/contacts.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>

    <div style="margin-bottom: 20px;">
      <!--<el-button size="small" @click="addTab()">
     新增
  </el-button>-->
    </div>
    <el-tabs v-model="editableTabsValue" :value="0" @tab-click="tabClick" type="card">
      <el-tab-pane v-for="(item, index) in editableTabs2" :key="item.name" :label="item.title" :name="item.name">
      </el-tab-pane>
    </el-tabs>
    <el-row v-for="(item,index) in borrowerPersonList" v-show="activeIndex == index">
      <el-row class="tableInfo table_height">
        <el-col :span="24" class="table_tr" v-if="index">
          <el-col :span="3" class="table_td">
            新增<span class="importent">*</span>
          </el-col>
          <el-col :span="20" :offset="1" class="table_td" style="text-align:left">
            <el-col :span="15" :offset="1">
              <el-select disabled v-model="item.relType" size="small" class="bmp_selectWidth" placeholder="房屋所有权人">
                <el-option value="01" label="房屋所有权人" key="01"></el-option>
                <el-option value="03" label="共借人" key="03"></el-option>
              </el-select>
              与
              <el-select disabled v-model="item.relName" size="small" placeholder="已添加借款人、房屋所有权人列表">
                <el-option v-for="data in nameTotalList" :key="data.label" :label="data.label" :value="data.label"></el-option>
              </el-select>
              关系
              <el-select disabled v-model="item.relationship" size="small" class="bmp_selectWidth" placeholder="关系">
                <el-option v-for="data in _utils.abrList" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="4" class="error_title" v-if="borrowerBolList[index].isErrorBrower">关系不可为空</el-col>-->
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">借款人姓名<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" @blur="verify(item.custName,3,index)" v-model="item.custName" placeholder="请输入借款人姓名"></el-input>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].certName"> *姓名为2-20位汉字</el-col>-->
          </el-col>
          <el-col :span="3" class="table_td">联系电话<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" @blur="verify(item.mobile,15,index)" v-model="item.mobile" placeholder="联系电话"></el-input>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].mobile"> *请输入11位手机号</el-col>-->
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">户籍<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td bmp_selectleft idcart">
            <el-col :span="19">
              <el-select disabled v-model="item.shen" @change="getarea" size="small" class="bmp_selectWidth" placeholder="省">
                <el-option v-for="data in provinceListVoList" :value="data.provinceCode" :label="data.provinceName" :key="data.provinceCode"></el-option>
              </el-select>
              <el-select disabled v-model="item.shi" size="small" @change="getare" class="bmp_selectWidth" placeholder="市">
                <el-option v-for="data in cityListVoList" :value="data.cityCode" :label="data.cityName" :key="data.cityCode"></el-option>
              </el-select>
              <el-select disabled v-model="item.famregisterCode" size="small" class="bmp_selectWidth" placeholder="区">
                <el-option v-for="data in areaList" :value="data.areaCode" :label="data.areaName" :key="data.areaCode"></el-option>
              </el-select>
              <el-input disabled size="small" v-model="item.famregisterDetail" class="bmp_input" placeholder="详细地址"></el-input>
            </el-col>
            <!--<el-col :span="5" class="error_title" style="text-align:left;" v-if="borrowerBolList[index].famregisterCode">不可为空</el-col>-->
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">民族</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" class="bmp_selectleft" :offset="1">
              <el-select disabled v-model="item.nation" @change="verify(item.nation,16,index)" size="small" placeholder="民族">
                <el-option v-for="data in _utils.natian" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].nation">民族不可为空</el-col>-->
          </el-col>
          <el-col :span="3" class="table_td">最高学历<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select  v-model="item.highestEducation" disabled size="small"  placeholder="最高学历">
                <el-option value="10" label="研究生" key="10"></el-option>
                <el-option value="20" label="大学本科" key="20"></el-option>
                <el-option value="30" label="大学专科" key="30"></el-option>
                <el-option value="40" label="中专/中等技校" key="40"></el-option>
                <el-option value="50" label="技术学校" key="50"></el-option>
                <el-option value="60" label="高中" key="60"></el-option>
                <el-option value="70" label="初中" key="70"></el-option>
                <el-option value="80" label="小学" key="80"></el-option>
                <el-option value="90" label="文盲或半文盲" key="90"></el-option>
                <el-option value="99" label="未知" key="99"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">

          <el-col :span="3" class="table_td">最高学位<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select disabled v-model="item.highestDegree" @visible-change="(val)=>verify(item.highestDegree,18,index,val)" size="small"  placeholder="最高学位">
                <el-option v-for="item in highestDegreeList"  :value="item.key" :label="item.value" :key="item.key"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">身份证号<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" @blur="verify(item.certNo,2,index)" v-model="item.certNo" placeholder="请输入18位身份证号码">
              </el-input>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].certNo">填写错误且不可为空</el-col>-->
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">身份证有效期<span class="importent">*</span></el-col>
          <el-col :span="21" class="table_td">
            <el-col :span="4" >
              <el-radio-group disabled v-model="item.isLong" @change="(val)=>verify(val,'cardLine',index)">
                <el-radio label="01">长期</el-radio>
                <el-radio label="02">短期</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="5" v-if="item.isLong === '02'">
              <el-date-picker disabled :editable="false" size="small" class="select_width" v-model="item.cardLine" type="date" placeholder="身份证有效期" @change="(val)=>verify(val,'cardLine',index)"></el-date-picker>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].cardLine ">请选择身份证有效期</el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="2" class="table_td">婚姻状况<span class="importent">*</span></el-col>
          <el-col :span="10" class="table_td">
            <el-col :span="23" :offset="1" class="bmp_selectleft">
              <el-radio disabled v-model="item.marStatus" label="10">未婚</el-radio>
              <el-radio disabled v-model="item.marStatus" label="20">已婚无子女</el-radio>
              <el-radio disabled v-model="item.marStatus" label="21">已婚有子女</el-radio>
              <el-radio disabled v-model="item.marStatus" label="22">离异</el-radio>
              <el-radio disabled v-model="item.marStatus" label="30">丧偶</el-radio>
            </el-col>

          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">性别</el-col>
          <el-col :span="9" class="table_td">{{item.sex | isMan }}&nbsp;</el-col>
          <el-col :span="3" class="table_td">年龄</el-col>
          <el-col :span="9" class="table_td">{{item.age}}&nbsp;</el-col>
        </el-col>


        <!--<el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">毕业院校</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.university" placeholder="请输入毕业院校">
              </el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].university">请输入工作单位</el-col>
          </el-col>
          <el-col :span="3" class="table_td">最高学历</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select disabled v-model="item.highestEducation" @change="verify(item.highestEducation,18,index)" size="small" placeholder="最高学历">
                <el-option value="10" label="研究生" key="10"></el-option>
                <el-option value="20" label="大学本科" key="20"></el-option>
                <el-option value="30" label="大学专科" key="30"></el-option>
                <el-option value="40" label="中专/中等技校" key="40"></el-option>
                <el-option value="50" label="技术学校" key="50"></el-option>
                <el-option value="60" label="高中" key="60"></el-option>
                <el-option value="70" label="初中" key="70"></el-option>
                <el-option value="80" label="小学" key="80"></el-option>
                <el-option value="90" label="文盲或半文盲" key="90"></el-option>
                <el-option value="99" label="未知" key="99"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].highestEducation">最高学历不可为空</el-col>
          </el-col>
        </el-col>-->

        <!--<el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">工作单位</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.workUnit" @blur="verify(item.workUnit,4,index)" placeholder="请输入工作单位">
              </el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].workUnit">请输入工作单位</el-col>
          </el-col>
          <el-col :span="3" class="table_td">最高学位</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select disabled v-model="item.highestDegree" @change="verify(item.highestDegree,19,index)" size="small" placeholder="最高学位">
                <el-option value="0" label="其他" key="0"></el-option>
                <el-option value="1" label="名誉博士" key="1"></el-option>
                <el-option value="2" label="博士" key="2"></el-option>
                <el-option value="3" label="硕士" key="3"></el-option>
                <el-option value="4" label="学士" key="4"></el-option>
                <el-option value="9" label="其他" key="9"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].highestDegree">请选择最高学位</el-col>
          </el-col>
        </el-col>-->


        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">单位性质<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td">
            <el-col :span="16" style="margin-left: 2%"  class="bmp_selectleft">
              <el-select disabled v-model="item.properties" size="small" class="bmp_nature" placeholder="单位性质">
                <el-option v-for="data in _utils.unit" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>

              <el-select disabled v-model="item.propertiesDetail" size="small" class="bmp_nature" placeholder="单位性质">
                <el-option v-for="data in _utils.ulitList" :value="data.code" v-if="filters(data.code,item.properties)" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="6" class="error_title" v-if="borrowerBolList[index].properties"> *单位性质不可为空</el-col>-->
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">所属行业<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select disabled v-model="item.unitIndustry" @change="verify(item.unitIndustry,7,index)" size="small" placeholder="所属行业">
                <el-option v-for="da in _utils.data" :value="da.code" :label="da.label" :key="da.code"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].unitIndustry"> *所属行业不可为空</el-col>-->
          </el-col>
          <!--<el-col :span="3" class="table_td">岗位</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.custPost" @blur="verify(item.custPost,21,index)" placeholder="请输入岗位"></el-input>
            </el-col>
            <el-col :span="8" class="error_title" v-if="borrowerBolList[index].custcustPost">*岗位不可为空</el-col>
          </el-col>-->
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">职位<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td">
            <el-col :span="16" style="margin-left: 2%" class="bmp_selectleft">
              <el-select disabled v-model="item.occupation" size="small" class="bmp_nature" placeholder="职位">
                <el-option v-for="data in _utils.occupa" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
              <el-select disabled v-model="item.occupationDetail" size="small" class="bmp_nature" placeholder="职位">
                <el-option v-for="data in _utils.occupaList" v-if="occupaFn(data.code,item.occupation)" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="6" class="error_title" v-if="borrowerBolList[index].occupation"> *职位不可为空</el-col>-->
          </el-col>
        </el-col>



        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">工作单位<span class="importent">*</span></el-col>
          <el-col :span="18" class="textareawrap"><div class="textarea"><textarea disabled class="textarea_disabled" v-model="item.workUnit" :rows="3"  @blur="verify(item.workUnit,'work',index)" placeholder="" :maxlength="100"></textarea></div></el-col>
          <el-col :span="3" class=" table_td error_title" v-if="borrowerBolList[index].workUnit">请输入工作单位</el-col>
        </el-col>
<!--        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">工作年限(年)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.workYear" @blur="verify(item.workYear,8,index)" placeholder="请输入工作单位"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].workYear">输入整数的年份</el-col>
          </el-col>
          <el-col :span="3" class="table_td">年收入(万元)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.income" @blur="verify(item.income,10,index)" placeholder="请输入工作单位"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].income ">*输入数字为应整数</el-col>
          </el-col>

        </el-col>-->

        <!--<el-col :span="24" class="table_tr">
          &lt;!&ndash;<el-col :span="3" class="table_td">家庭年收入(万元)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" @blur="verify(item.familyIncome,9,index)" v-model="item.familyIncome" placeholder="请输入家庭年收入(万元)"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].familyIncome "> *输入数字为应整数</el-col>
          </el-col>&ndash;&gt;
          <el-col :span="3" class="table_td">征信逾期情况<span class="importent">*</span>
          </el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" class="bmp_selectleft" :offset="1">
              <el-radio disabled v-model="item.overdueReporting" label="1">有逾期</el-radio>
              <el-radio disabled v-model="item.overdueReporting" label="2">无逾期</el-radio>
            </el-col>
          </el-col>
        </el-col>-->


        <!--<el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">个人征信(贷款)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              连
              <el-input disabled size="small" class="bmp_credit" @blur="verify(item.loanEven,11,index,1)" v-model="item.loanEven"></el-input>
              累
              <el-input disabled size="small" class="bmp_credit" @blur="verify(item.loanTired,11,index,0)" v-model="item.loanTired"></el-input>
            </el-col>
            &lt;!&ndash;<el-col :span="9" class="error_title" v-if="borrowerBolList[index].loan">连累值应为整数</el-col>&ndash;&gt;
          </el-col>
          <el-col :span="3" class="table_td">个人征信(信用卡)<span class="importent">*</span>
          </el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              连
              <el-input disabled size="small" class="bmp_credit" @blur="verify(item.cardEven,12,index,1)" v-model="item.cardEven"></el-input>
              累
              <el-input disabled size="small" class="bmp_credit" @blur="verify(item.cardTired,12,index,0)" v-model="item.cardTired"></el-input>
            </el-col>
            &lt;!&ndash;<el-col :span="9" class="error_title" v-if="borrowerBolList[index].card">连累值应为整数</el-col>&ndash;&gt;
          </el-col>
        </el-col>-->
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">常住地址<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td bmp_selectleft idcart">
            <el-select disabled v-model="item.liveshen" @change="liveCode" size="small" class="bmp_selectWidth" placeholder="省">
              <el-option v-for="data in provinceListVoList" :value="data.provinceCode" :label="data.provinceName" :key="data.provinceCode"></el-option>
            </el-select>
            <el-select disabled v-model="item.liveshi" @change="livegetare" size="small" class="bmp_selectWidth" placeholder="市">
              <el-option v-for="data in livecityListVoList" :value="data.cityCode" :label="data.cityName" :key="data.cityCode"></el-option>
            </el-select>
            <el-select disabled v-model="item.residentAddressCode" size="small" class="bmp_selectWidth" placeholder="区">
              <el-option v-for="data in liveareaList" :value="data.areaCode" :label="data.areaName" :key="data.areaCode"></el-option>
            </el-select>
            <el-input disabled size="small" v-model="item.residentAddressDetail" class="bmp_input" placeholder="常住地址"></el-input>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <!--<el-col :span="3" class="table_td">居住年限(年)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.livingYears" @blur="verify(item.livingYears,13,index)" placeholder="居住年限(年)"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].livingYears "> *输入数字为应整数</el-col>
          </el-col>-->
          <el-col :span="3" class="table_td">家庭人数<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="10" :offset="1">
              <el-input disabled size="small" v-model="item.familiesNum"  placeholder="请输入家庭人数(整数)"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>
          <el-col :span="3" class="table_td">固定电话</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.telephone"  placeholder="请输入固定电话"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>
        </el-col>
        <!--<el-col :span="24" class="table_tr">

          &lt;!&ndash;<el-col :span="3" class="table_td">企业名称</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.enterpriseName"  placeholder="请输入企业名称"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>&ndash;&gt;
        </el-col>-->
        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">关联企业名称</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.enterpriseName" :rows="3" placeholder="请输入企业名称" ></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">关联企业经营状况</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled v-model="item.stateOfBusiness" :rows="3" placeholder="请输入企业经营状况" ></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">占股比例(占用款企业)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.ratioOfShare"  placeholder="请输入占股比例"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>
         <!-- <el-col :span="3" class="table_td">负债(万元)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled v-model="item.liabilities"   placeholder="请填写负债(万元)"></el-input>
            </el-col>
          </el-col>-->
          <!--<el-col :span="3" class="table_td">企业经营状况</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input disabled size="small" v-model="item.stateOfBusiness"  placeholder="请输入企业经营状况"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>-->
        </el-col>
        <!--是否为黑户-->
        <el-col :span="24" class="table_tr">
          <!--<el-col :span="3" class="table_td">是否为黑户</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-radio disabled v-model="item.isUnregistered" label="1">是</el-radio>
              <el-radio disabled v-model="item.isUnregistered" label="0">否</el-radio>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>-->
          <el-col :span="3" class="table_td">电子邮箱<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.email" disabled :maxlength="50" placeholder="电子邮箱"></el-input>
            </el-col>
          </el-col>
          <el-col :span="3" class="table_td">健康状况<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-select v-model="item.healthStatus" disabled   size="small" placeholder="健康状况">
                <el-option v-for="da in _utils.healthStatusList" :value="da.code" :label="da.name" :key="da.code"></el-option>
              </el-select>
            </el-col>
          </el-col>
        </el-col>
       <!-- <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">征信行业<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled v-model="item.creditIndustry"   placeholder="征信行业"></el-input>
            </el-col>
          </el-col>
        </el-col>-->

      </el-row>



      <div class="show_list_title">
        <h3><img src="../../../assets/pic.png" class="listTitleImg"><span>借款人影像信息</span></h3>
      </div>

      <picModule :bussNo="$route.query.bussNo" dataType="2" taskType="138" :custId="item.releId" class="module_margin_bottom" :details="false"/>

      <div class="show_list_title">
        <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>借款人家庭信息</span></h3>
      </div>

      <!--<el-button @click="addrelationList(activeIndex)">新增</el-button>-->

      <el-row class="tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">关系</el-col>
          <el-col :span="4" class="table_td">姓名</el-col>
          <el-col :span="4" class="table_td">联系方式</el-col>
          <el-col :span="4" class="table_td">工作单位</el-col>
          <el-col :span="4" class="table_td">职务</el-col>
          <el-col :span="4" class="table_td">
            操作
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" v-for="(data,inde) in item.familyLogVos">
          <el-col :span="4" class="table_td">
            <el-select disabled v-model="data.mainReletion" size="small" placeholder="关系">
              <el-option v-for="datafamily in relati" :value="datafamily.code" :label="datafamily.label" :key="datafamily.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input disabled :class="borrowerBolList[index].relationBolList[inde].borrowerName" @blur="verifyPerson('借款人姓名',inde,index,data.familyCust)"
                        title="输入姓名应为汉字" size="small" v-model="data.familyCust" placeholder="请输入借款人姓名"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input disabled :class="borrowerBolList[index].relationBolList[inde].brokerMobile" @blur="verifyPerson('联系方式',inde,index,data.familyMobile)"
                        size="small" title="输入11位手机号码" v-model="data.familyMobile" placeholder="请输入联系方式"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input disabled size="small" title="工作单位" v-model="data.company" placeholder="请输入工作单位"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input disabled size="small" title="职位" v-model="data.position" placeholder="请输入职位"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <!--<el-button @click="del(inde,index)">删除</el-button>-->
          </el-col>


        </el-col>
      </el-row>


      <el-col :span="2" :offset="11" class="btn"></el-col>

      <!--<el-col :span="8" :offset="10" class="btn">
        <el-button @click="delAddBorrowerPerson(activeIndex,item)">删除该借款人信息</el-button>
        <el-button @click="save(item,index)">保存借款人基本信息</el-button>
       </el-col>-->

    </el-row>


  </div>
</template>
<style scoped>
  .textareawrap{
    border-left:none;
  }
  .textarea_module .table_td{
    border-right: 1px #BAC4CF solid;
  }
</style>
<script>
  import './../../style/borrowMoneyPerson.css';
  export default {
    name: 'borrowMoneyPerson',
    data() {
      return {
        //所有都填写正确
        allIsbol: false,
        //验证判断
        highestDegreeList:[],
        borrowerBolList: [{
          isErrorBrower: false,
          certNo: false,
          certName: false,
          workUnit: false,
          highestDegree: false,
          highestEducation: false,
          properties: false,
          occupation: false,
          custcustPost: false,
          unitIndustry: false,
          workYear: false,
          familyIncome: false,
          income: false,
          loan: false,
          card: false,
          livingYears: false,
          famregisterCode: false,
          mobile: false,
          nation: false,
          university: false,
          relationBolList: [
            {
              relation: '', //关系
              borrowerName: '',//姓名
              brokerMobile: '',//联系方式
              identityID: '',
              sex: '',
              age: '',
              textarea: ''//备注
            }
          ]
        }],
        //单位性质
        //省
        provinceListVoList: [],
        //市
        cityListVoList: [],
        //区
        areaList: [],
        //居住地市

        livecityListVoList: [],
        liveareaList: [],
        //上传的对象
        addObj: {},
        //关系

        //所属行业
        activeIndex: 0,//选中项
        editableTabsValue2: '2',
        editableTabs2: [],
        editableTabsValue: '0',//选中的默认选项卡
        //存储 选项卡的数量
        tabsNum: 0,
        //关系
        relation: [],
        //图片
        picImgs: [{}],

        imgType: '',
        ///省市区

        provinceList: [],
        nationList: [],
        picTypes: [{}],
        picImgs: [{}],

        borrowerPersonList: [
          {
            custNo: '', //借款人id
            mobile: '',
            custName: '',

            certNo: '',//身份证
            birthday: '',//
            id: "?",
            releId:'?',
            marStatus: '1', //婚姻


            famregister: '',  //

            famregisterCode: '', // 码

            famregisterDetail: "",   //

            province: '', //省
            detailedAddress: '', //详细地址
            //民族
            nation: '',
            //单选婚姻状态

            occupationDetail: '',//职业详细

            university: '',//毕业院校
            highestEducation: '', //学历
            highestDegree: '',//学位
            workUnit: '',
            nature: '',//单位性质


            position: '',//职位

            occupation: '',//职业
            occupationDetail: "",//职业详情

            properties: '', //性质
            propertiesDetail: '',//性质详情

            custPost: '',//岗位
            workYear: '',//年限
            income: '',//收入
            overdueReporting: "2",//预期
            familyIncome: '',//年收入
            sex: '',
            age: '',///
            livingYears: '',//居住年限

            familiesNum:'', //家庭人数
            telephone:'', //固定电话
            enterpriseName:'', //企业名称
            ratioOfShare:'',  //占股比例
            stateOfBusiness:'', //企业经营状况
            isUnregistered:'', //是否为黑户
            email:'',//邮箱
            healthStatus:'',//健康状况
            creditIndustry:'',//征信行业
            liabilities:'',//负债

            //贷款
            loanEven: '',  //连
            loanTired: '', //累

            //信用卡
            cardEven: '',  //连
            cardTired: '', //累


            unitIndustry: "",

            residentAddressCode: '',//码

            residentAddress: '',

            residentRemark: '',

            residentAddressDetail: '',//详细

            relType: '',//新增 01 02 03
            relName: '',
            relationship: '', //关联
            familyLogVos: [
              {
                mainReletion: '',
                familyCust: '',
                company:'',
                position:'',
                familyMobile: '',
              }
            ]
          }
        ],
        //联系人
        relationList: [   //
          {
            mainReletion: '', //关系
            familyCust: '',//姓名
            familyMobile: '',//联系方式
            familyCert: '',
            familyAge: '',
            familySex: '',
            remark: ''//备注
          }
        ],
        //借款人家庭关系
        relati: [
          { code: '00', label:'配偶'  },
          { code: "01", label: '父母' },
          { code: '02', label: '子女' },
          { code: '03', label: '兄弟姐妹' },
          { code: '04', label: '亲戚朋友' }
        ],
        nameTotalList: []
      }
    },
    methods: {
      queryEnum(){
        this.$http({
          url:'/dataReturn/getCustEnumList',
          callback:res=>{
            let data = res.data;
            this.highestDegreeList = data.degreeEnum;
          }
        })
      },
      //过滤职业
      occupaFn(value, val) {
        if(value && val) {
          if (val.length == 1) {
            if (value.slice(0, 1) == val && value.length > 2) {
              return true
            }else if(value == val){
              return true
            }
          } else {
            if (value.slice(0, 2) == val) {
              return true
            }
          }
          return false
        }
      },
      //验证必填项
      verify(data, type, index, data1, data2) {
        switch (type) {
          case 1:
            if (data == '' || data1 == "" || data2 == '') {
              this.borrowerBolList[index].isErrorBrower = true
            } else {
              this.borrowerBolList[index].isErrorBrower = false
            }
            break
          case 2:
            //身份证号
            if (18 == data.length) {
              this.borrowerBolList[index].certNo = false;
              this.borrowerPersonList[index].sex = this._utils.discriCard(data)
              this.borrowerPersonList[index].age = this._utils.discriCardAge(data)
            } else {
              this.borrowerBolList[index].certNo = true;
              this.borrowerPersonList[index].sex = ''
              this.borrowerPersonList[index].age = ''
            }
            break
          case 3:
            if (data) {
              if (!this._utils.isHanzi(data)) {
                this.borrowerBolList[index].certName = true;
              } else {
                this.borrowerBolList[index].certName = false;
              }
            } else {
              this.borrowerBolList[index].certName = true;
              return
            }
            break
          case 4:
            if (data == '') {
              this.borrowerBolList[index].workUnit = true;
            } else if (this._utils.isNbsp(data)) {
              this.borrowerBolList[index].workUnit = true;
            } else {
              this.borrowerBolList[index].workUnit = false;
            }
            break
          case 5:
            if (data == '') {
              this.borrowerBolList[index].properties = true;
            } else {
              this.borrowerBolList[index].properties = false;
            }
            break
          case 6:
            if (data == '') {
              this.borrowerBolList[index].occupation = true;
            } else {
              this.borrowerBolList[index].occupation = false;
            }
            break
          case 7:
            if (data == '') {
              this.borrowerBolList[index].unitIndustry = true;
            } else {
              this.borrowerBolList[index].unitIndustry = false;
            }
            break
          case 8:
            if (data == '') {
              this.borrowerBolList[index].workYear = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].workYear = false;
            } else {
              this.borrowerBolList[index].workYear = true;
            }
            break
          case 9:
            if (data == '') {
              this.borrowerBolList[index].familyIncome = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].familyIncome = false;
            } else {
              this.borrowerBolList[index].familyIncome = true;
            }
            break
          case 10:
            if (data == '') {
              this.borrowerBolList[index].income = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].income = false;
            } else {
              this.borrowerBolList[index].income = true;
            }
            break
          case 11:
            if (!data1) {
              if (this._utils.isNumber(data)) {
                this.borrowerBolList[index].loan = false
              } else if (data == '') {
                this.borrowerBolList[index].loan = true
              } else {
                this.borrowerBolList[index].loan = true
              }
            } else {
              if (this._utils.isNumber(data)) {
                this.borrowerBolList[index].loan = false
              } else if (data == '') {
                this.borrowerBolList[index].loan = true
              } else {
                this.borrowerBolList[index].loan = true
              }
            }
            break
          case 12:
            if (!data1) {
              if (this._utils.isNumber(data)) {
                this.borrowerBolList[index].card = false
              } else if (data == '') {
                this.borrowerBolList[index].card = true
              } else {
                this.borrowerBolList[index].card = true
              }
            } else {
              if (this._utils.isNumber(data)) {
                this.borrowerBolList[index].card = false
              } else if (data == '') {
                this.borrowerBolList[index].card = true
              } else {
                this.borrowerBolList[index].card = true
              }
            }
            break
          case 13:
            if (data == '') {
              this.borrowerBolList[index].livingYears = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].livingYears = false;
            } else {
              this.borrowerBolList[index].livingYears = true;
            }
            break
          case 14:
            if (data == '') {
              this.borrowerBolList[index].famregisterCode = true;
            } else {
              this.borrowerBolList[index].famregisterCode = false;
            }
            break
          case 15:
            if (data == '') {
              this.borrowerBolList[index].mobile = true;
            } else if (!this._utils.isMobile(data)) {
              this.borrowerBolList[index].mobile = true;
            } else {
              this.borrowerBolList[index].mobile = false;
            }
            break
          case 16:
            if (data == '') {
              this.borrowerBolList[index].nation = true;
            } else {
              this.borrowerBolList[index].nation = false;
            }
            break
          case 17:
            if (data == '') {
              this.borrowerBolList[index].university = true;
            } else {
              this.borrowerBolList[index].university = false;
            }
            break
          case 18:
            if (data == '') {
              this.borrowerBolList[index].highestEducation = true;
            } else {
              this.borrowerBolList[index].highestEducation = false;
            }
            break
          case 19:
            if (data == '') {
              this.borrowerBolList[index].highestDegree = true;
            } else {
              this.borrowerBolList[index].highestDegree = false;
            }
            break
          case 21:
            if (data == '') {
              this.borrowerBolList[index].custcustPost = false;
            } else {
              this.borrowerBolList[index].custcustPost = true;
            }
            break
        }
      },
      //获取市
      getarea(data) {
        let params = { provinceCode: data }
        $.post(this._path + '/business/queryCitysByProvinceCode', params, (res) => {
          this.cityListVoList = res.data.cityListVoList
        })
      },
      //获取区
      getare(data) {
        let params = { cityCode: data }
        $.post(this._path + '/business/queryAllAreasByCityCode', params, (res) => {
          this.areaList = res.data.areaList
        })
      },
      //获取居住地市
      liveCode(data) {
        let params = { provinceCode: data }
        $.post(this._path + '/business/queryCitysByProvinceCode', params, (res) => {
          this.livecityListVoList = res.data.cityListVoList
        })
      },
      livegetare(data) {
        let params = { cityCode: data }
        $.post(this._path + '/business/queryAllAreasByCityCode', params, (res) => {
          this.liveareaList = res.data.areaList
        })
      },
      //删除
      del(inde, index) {
        this.borrowerPersonList[index].familyLogVos.splice(inde, 1)
      },
      tabClick(data) {
        this.activeIndex = data.index
        this.getBorrower()

        var c = this.borrowerPersonList[data.index]["famregisterCode"]
        if (c != '' && c != null) {
          this.borrowerPersonList[data.index]['shen'] = c.slice(0, 2) + '0000'
          this.borrowerPersonList[data.index]['shi'] = c.slice(0, 4) + '00'

          var pa = { provinceCode: this.borrowerPersonList[data.index]['shen'] }
          $.post(this._path + '/business/queryCitysByProvinceCode', pa, (res) => {
            this.cityListVoList = res.data.cityListVoList
          })
          var par = { cityCode: this.borrowerPersonList[data.index]['shi'] }
          $.post(this._path + '/business/queryAllAreasByCityCode', par, (res) => {

            this.areaList = res.data.areaList
          })
        }

        var live = this.borrowerPersonList[data.index]["residentAddressCode"]
        if (live != '' && live != null) {
          this.borrowerPersonList[data.index]['liveshen'] = live.slice(0, 2) + '0000'
          this.borrowerPersonList[data.index]['liveshi'] = live.slice(0, 4) + '00'

          var pa = { provinceCode: this.borrowerPersonList[data.index]['liveshen'] }

          $.post(this._path + '/business/queryCitysByProvinceCode', pa, (res) => {
            this.livecityListVoList = res.data.cityListVoList
          })
          var par = { cityCode: this.borrowerPersonList[data.index]['liveshi'] }
          $.post(this._path + '/business/queryAllAreasByCityCode', par, (res) => {
            this.liveareaList = res.data.areaList
          })
        }

      },
      //获取借款人
      getBorrower() {
        this.nameTotalList.length = 0
        for (let i = 0; i < this.borrowerPersonList.length; i++) {
          if (this.borrowerPersonList[i].custName != "") {
            let label = this.borrowerPersonList[i].custName
            let obj = { label: label }
            this.nameTotalList.push(obj)
          }
        }
      },
      //添加联系人
      addrelationList(index) {
        this.borrowerPersonList[index].familyLogVos.push({
          mainReletion: '', //关系
          familyCust: '',//姓名
          familyMobile: '',//联系方式
          company:'',
          position:'',
        });
        let relationBolList = {
          relation: '', //关系
          borrowerName: '',//姓名
          brokerMobile: '',//联系方式
          identityID: '',
          sex: '',
          age: '',
          textarea: ''//备注
        }
        this.borrowerBolList[index].relationBolList.push(relationBolList)
      },

      // 保存
      save(item, index) {
        //保存接口


        this.verify(item.relType, 1, index, item.relName, item.relationship)
        this.verify(item.certNo, 2, index)
        this.verify(item.custName, 3, index)
        this.verify(item.workUnit, 4, index)
        this.verify(item.properties, 5, index)
        this.verify(item.occupation, 6, index)
        this.verify(item.unitIndustry, 7, index)
        this.verify(item.famregisterCode, 14, index)
        this.verify(item.mobile, 15, index)
        this.verify(item.nation, 16, index)
        this.verify(item.university, 17, index)
        this.verify(item.highestEducation, 18, index)

        this.verify(item.highestDegree, 19, index)
        this.verify(item.custPost, 21, index)
        this.verify(item.cardEven, 12, index, 1)
        this.verify(item.loanEven, 11, index, 1)
        this.verify(item.loanTired, 11, index, 1)
        this.verify(item.cardTired, 12, index, 0)

        //  this.verify(item.custcustPost,20,index)

        for (let i = 0; i < this.borrowerPersonList.length; i++) {
          if (!this.borrowerBolList[i].loan && !this.borrowerBolList[i].card && !this.borrowerBolList[i].highestDegree && !this.borrowerBolList[i].custcustPost && !this.borrowerBolList[i].nation && !this.borrowerBolList[i].university && !this.borrowerBolList[i].highestEducation && !this.borrowerBolList[i].mobile && !this.borrowerBolList[i].famregisterCode && !this.borrowerBolList[i].isErrorBrower && !this.borrowerBolList[i].certNo && !this.borrowerBolList[i].certName && !this.borrowerBolList[i].workUnit && !this.borrowerBolList[i].properties && !this.borrowerBolList[i].occupation && this.borrowerBolList[i].unitIndustry) {
            this.allIsbol = true
          } else {
            this.allIsbol = false
          }
          //  for(let j = 0;j < this.borrowerPersonList[i].relationBolList.length;j++){
          //    if(this.borrowerPersonList[i].relationBolList[j].borrowerName=="bmp_borderRed"||this.borrowerPersonList[i].relationBolList[j].brokerMobile=="bmp_borderRed"||this.borrowerPersonList[i].relationBolList[j].identityID=="bmp_borderRed"){
          //      this.allIsbol = false
          //    }
          //  }
        }



        this.addObj = JSON.parse(JSON.stringify(item))


        this.addObj.familyLogVosString = JSON.stringify(this.addObj.familyLogVos)
        this.addObj.bussNo = this.$route.query.bussNo
        var b = this.addObj.id
        this.addObj.custNo = b
        delete this.addObj.familyLogVos
        delete this.addObj.id
        delete this.addObj.shen
        delete this.addObj.shi
        delete this.addObj.liveshen
        delete this.addObj.liveshi
        $.post(this._path + '/dataCheck/insertCustLogSave', this.addObj, (res) => {
        })

      },

      //删除
      delAddBorrowerPerson(data, item) {
        if (item.id) {
          let cust = { custNo: item.id }

          $.post(this._path + '/dataCheck/deleteCustLog', cust, (res) => {
            if (res.resultCode == "0000") {
              this.borrowerPersonList.splice(data, 1)
            }
          })

        } else {
          this.borrowerPersonList.splice(data, 1)
        }
        this.editableTabs2.splice(data, 1)
      },
      //guolv
      filters(value, val) {
        if (value.slice(0, 3) == val) {
          return true
        }
        return false
      },
      //添加
      addTab() {
        let c = {
          custNo: '', //借款人id
          mobile: '',
          custName: '',

          certNo: '',//身份证
          birthday: '',//
          id: "",
          marStatus: '1', //婚姻


          famregister: '',  //

          famregisterCode: '', // 码

          famregisterDetail: "",   //

          province: '', //省
          detailedAddress: '', //详细地址
          //民族
          nation: '',
          //单选婚姻状态

          occupationDetail: '',//职业详细

          university: '',//毕业院校
          highestEducation: '', //学历
          highestDegree: '',//学位
          workUnit: '',
          nature: '',//单位性质


          position: '',//职位

          occupation: '',//职业
          occupationDetail: "",//职业详情

          properties: '', //性质
          propertiesDetail: '',//性质详情

          custPost: '',//岗位
          workYear: '',//年限
          income: '',//收入
          overdueReporting: "2",//预期
          familyIncome: '',//年收入
          sex: '',
          age: '',///
          livingYears: '',//居住年限

          familiesNum:'', //家庭人数
          telephone:'', //固定电话
          enterpriseName:'', //企业名称
          ratioOfShare:'',  //占股比例
          stateOfBusiness:'', //企业经营状况
          isUnregistered:'', //是否为黑户
          email:'',//邮箱
          healthStatus:'',//健康状况
          creditIndustry:'',//征信行业
          liabilities:'',//负债

          //贷款
          loanEven: '',  //连
          loanTired: '', //累

          //信用卡
          cardEven: '',  //连
          cardTired: '', //累


          unitIndustry: "",

          residentAddressCode: '',//码

          residentAddress: '',

          residentRemark: '',

          residentAddressDetail: '',//详细

          relType: '',//新增 01 02 03
          relName: '',
          relationship: '',  //关联
          familyLogVos: [
            {
              mainReletion: '',
              familyCust: '',
              company:'',
              position:'',
              familyMobile: '',
            }
          ]
        }

        let bol = {
          isErrorBrower: false,
          certNo: false,
          certName: false,
          workUnit: false,
          highestDegree: false,
          highestEducation: false,
          properties: false,
          occupation: false,
          custcustPost: false,
          unitIndustry: false,
          workYear: false,
          familyIncome: false,
          income: false,
          loan: false,
          card: false,
          livingYears: false,
          famregisterCode: false,
          mobile: false,
          nation: false,
          university: false,
          relationBolList: [
            {
              relation: '', //关系
              borrowerName: '',//姓名
              brokerMobile: '',//联系方式
              identityID: '',
              sex: '',
              age: '',
              textarea: ''//备注
            }
          ]
        }

        this.borrowerBolList.push(bol)
        this.borrowerPersonList.push(c)

        this.tabsNum++
        let b = {
          title: '借款人',
          name: this.tabsNum + '',
          content: '借款人'
        }

        this.editableTabs2.push(b)
      },

      //验证联系人
      verifyPerson(data, inde, index, content) {
        switch (data) {
          case "借款人姓名":
            if (content) {
              if (!this._utils.isHanzi(content)) {
                this.borrowerBolList[index].relationBolList[inde].borrowerName = 'bmp_borderRed'
              } else {
                this.borrowerBolList[index].relationBolList[inde].borrowerName = ''
              }
            } else {
              this.borrowerBolList[index].relationBolList[inde].borrowerName = ''
              return
            }
            break
         /* case "身份证号":
            let i = index
            var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
            if (content) {
              if (!reg.test(content)) {
                this.borrowerBolList[i].relationBolList[inde].identityID = 'bmp_borderRed'
                this.borrowerPersonList[i].familyLogVos[inde].sex = ""
                this.borrowerPersonList[i].familyLogVos[inde].age = ''
              } else {

                this.borrowerBolList[i].relationBolList[inde].identityID = ''
                this.borrowerPersonList[i].familyLogVos[inde].sex = this._utils.discriCard(content)
                this.borrowerPersonList[i].familyLogVos[inde].age = this._utils.discriCardAge(content)
              }
            } else {
              this.borrowerBolList[i].relationBolList[inde].identityID = ''
              this.borrowerPersonList[i].familyLogVos[inde].sex = ""
              this.borrowerPersonList[i].familyLogVos[inde].age = ''
            }
            break*/
          case '联系方式':
            if (content) {
              if (!this._utils.isMobile(content)) {
                this.borrowerBolList[index].relationBolList[inde].brokerMobile = 'bmp_borderRed'
              } else {
                this.borrowerBolList[index].relationBolList[inde].brokerMobile = ''
              }
            } else {
              this.borrowerBolList[index].relationBolList[inde].brokerMobile = '';
              return
            }
            break
        }
      },


      //请求刷新类别
      ajax() {
        let params = {
          bussNo: this.$route.query.bussNo
        }
        $.post(this._path + "/dataCheck/selectBusCustLogListBybussNo", params, (res) => {
          // let data = res.data.busCustLogListVo
          this.borrowerPersonList = res.data.busCustLogListVo

          for (let i = 0; i < this.borrowerPersonList.length; i++) {
            var b = this.borrowerPersonList[i].certNo
            let params = { custNo: b }
            $.post(this._path + "/dataCheck/selectBusFamilyInfoLogBycustNo", params, (res) => {
              this.borrowerPersonList[i].familyLogVos = res.data.busFamilyInfoLogListVo
            })
          }


          this.editableTabs2.length = 0
          for (let i = 0; i < this.borrowerPersonList.length; i++) {
            let b = {
              title: '借款人',
              name: i + '',
              content: '借款人'
            }
            this.tabsNum = i

            this.editableTabs2.push(b)
          }
        })
      }

    },

    created() {
      this.queryEnum()

    },
    mounted() {
      $('input').blur()
    },
    beforeCreate() {

      $.post(this._path + "/business/queryProvince", (res) => {
        this.provinceListVoList = res.data.provinceListVoList

      })

      let params = {
        bussNo: this.$route.query.bussNo
      }
      $.post(this._path + "/dataCheck/selectBusCustLogListBybussNo", params, (res) => {
        let data = res.data.busCustLogListVo
        this.borrowerPersonList = data
        let bbList = []
        if (!data.length) {
          for (let i = 0; i < data.length; i++) {
            let b = {
              title: '借款人' + (i + 1) + (i==0?("-" + data[0].custName):''),
              name: i + '',
              content: '借款人'
            }
            this.tabsNum = i

            this.editableTabs2.push(b)
          }

          return
        }



        for (let i = 0; i < data.length; i++) {
          let b = {
            title: '借款人' + (i + 1) + (i==0?("-" + data[0].custName):''),
            name: i + '',
            content: '借款人'
          }
          this.tabsNum = i

          this.editableTabs2.push(b)
        }



        for (let i = 0; i < data.length; i++) {
          var b = data[i]['id']
          let params = { custNo: b }

          var c = data[i]["famregisterCode"]
          if (c != null && c != '') {
            data[i]['shen'] = c.slice(0, 2) + '0000'
            data[i]['shi'] = c.slice(0, 4) + '00'

            var pa = { provinceCode: data[i]['shen'] }

            $.post(this._path + '/business/queryCitysByProvinceCode', pa, (res) => {
              this.cityListVoList = res.data.cityListVoList
            })
            var par = { cityCode: data[i]['shi'] }
            $.post(this._path + '/business/queryAllAreasByCityCode', par, (res) => {
              this.areaList = res.data.areaList
            })
          }

          var live = data[i]["residentAddressCode"]
          if (live != '' && live != null) {
            data[i]['liveshen'] = live.slice(0, 2) + '0000'
            data[i]['liveshi'] = live.slice(0, 4) + '00'

            var pa = { provinceCode: data[i]['liveshen'] }

            $.post(this._path + '/business/queryCitysByProvinceCode', pa, (res) => {
              this.livecityListVoList = res.data.cityListVoList
            })
            var par = { cityCode: data[i]['liveshi'] }
            $.post(this._path + '/business/queryAllAreasByCityCode', par, (res) => {
              this.liveareaList = res.data.areaList
            })
          }

          bbList[i] = {
            isErrorBrower: false,
            certNo: false,
            certName: false,
            workUnit: false,
            highestDegree: false,
            highestEducation: false,
            properties: false,
            occupation: false,
            custcustPost: false,
            unitIndustry: false,
            workYear: false,
            familyIncome: false,
            income: false,
            cardLine: false,
            loan: false,
            card: false,
            livingYears: false,
            famregisterCode: false,
            mobile: false,
            nation: false,
            university: false,
            relationBolList: []
          }


          $.post(this._path + "/dataCheck/selectBusFamilyInfoLogBycustNo", params, (res) => {


            if (!res.data.busFamilyInfoLogListVo.length) {
              data[i].familyLogVos = []
            }

            this.borrowerPersonList[i]['familyLogVos'] = res.data.busFamilyInfoLogListVo


            for (let u = 0; u < this.borrowerPersonList[i]['familyLogVos'].length; u++) {
              bbList[i].relationBolList[u] = {
                relation: '', //关系
                borrowerName: '',//姓名
                brokerMobile: '',//联系方式
                identityID: '',
                sex: '',
                age: '',
                textarea: ''//备注
              }
            }

            this.borrowerBolList = bbList


          })
        }


      })

    },
    filters: {
      isMan: function (value) {
        if (value) {
          if (value == 1) {
            return "男"
          } else {
            return "女"
          }
        }
      }
    }
  }

</script>
