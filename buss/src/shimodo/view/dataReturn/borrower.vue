<template>
  <div class="borrowMoneyPerson">

    <div class="show_list_title">
      <h3><img src="../../../assets/contacts.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <msgTitle></msgTitle>
    <br>
    <div style="margin-bottom: 20px;">
      <el-button  type="primary" @click="addTab()">
        +新增共借人
      </el-button>
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
              <el-select v-model="item.relType" size="small"  @change="verify(item.relType,1,index,item.relName,item.relationship)" class="bmp_selectWidth" placeholder="房屋所有权人">
                <el-option value="01" label="房屋所有权人" key="01"></el-option>
                <el-option value="03" label="共借人" key="03"></el-option>
              </el-select>
              与
              <el-select v-model="item.relName"  @change="verify(item.relType,1,index,item.relName,item.relationship)" size="small" placeholder="已添加借款人、房屋所有权人列表">
                <el-option v-for="data in nameTotalList" :key="data.label" :label="data.label" :value="data.label"></el-option>
              </el-select>
              关系
              <el-select v-model="item.relationship"  @change="verify(item.relType,1,index,item.relName,item.relationship)" size="small" class="bmp_selectWidth" placeholder="关系">
                <el-option v-for="data in _utils.abrList" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="error_title" v-if="borrowerBolList[index].isErrorBrower">关系不可为空</el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">借款人姓名<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" @blur="verify(item.custName,3,index)" :disabled="index == 0" :maxlength="50" v-model="item.custName" placeholder="请输入借款人姓名"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].certName"> *姓名为2-20位汉字</el-col>
          </el-col>
          <el-col :span="3" class="table_td">联系电话<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small"  @blur="verify(item.mobile,15,index)" v-model="item.mobile" :maxlength="30" placeholder="联系电话"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].mobile"> *请输入11位手机号</el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">户籍<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td bmp_selectleft idcart">
            <el-col :span="19">
              <el-select v-model="item.shen" @visible-change="(val)=>getarea(val,item.shen,index)" size="small" class="bmp_selectWidth" placeholder="省">
                <el-option v-for="data in provinceListVoList" :value="data.provinceCode" :label="data.provinceName" :key="data.provinceCode"></el-option>
              </el-select>
              <el-select v-model="item.shi" size="small"@visible-change="(val)=> getare(val,item.shi,index)" class="bmp_selectWidth" placeholder="市">
                <el-option v-for="data in cityListVoList" :value="data.cityCode" :label="data.cityName" :key="data.cityCode"></el-option>
              </el-select>
              <el-select v-model="item.famregisterCode" size="small" class="bmp_selectWidth" placeholder="区">
                <el-option v-for="data in areaList" :value="data.areaCode" :label="data.areaName" :key="data.areaCode"></el-option>
              </el-select>
              <el-input size="small" @blur="verify(item.famregisterCode, 14, index,item.famregisterDetail)" v-model="item.famregisterDetail" class="bmp_input" :maxlength="50" placeholder="详细地址"></el-input>
            </el-col>
            <el-col :span="5" class="error_title" style="text-align:left;" v-if="borrowerBolList[index].famregisterCode">户籍不可为空</el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">民族</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" class="bmp_selectleft" :offset="1">
              <el-select v-model="item.nation" size="small" placeholder="民族">
                <el-option v-for="data in _utils.natian" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="3" class="table_td">最高学历<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select  v-model="item.highestEducation" @visible-change="(val)=>verify(item.highestEducation,18,index,val)" size="small"  placeholder="最高学历">
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
        </el-col>






        <el-col :span="24" class="table_tr">

          <el-col :span="3" class="table_td">最高学位<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select  v-model="item.highestDegree" @visible-change="(val)=>verify(item.highestDegree,19,index,val)" size="small"  placeholder="最高学位">
                <el-option v-for="item in highestDegreeList"  :value="item.key" :label="item.value" :key="item.key"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].highestDegree">请选择最高学位</el-col>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">身份证号<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" @blur="verify(item.certNo,2,index,item.custName)" @keyup.native="clearSpeace(item.certNo,index,'certNo')" :maxlength="32" v-model="item.certNo" placeholder="请输入18位身份证号码">
              </el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].certNo">实名认证不匹配</el-col>
          </el-col>
        </el-col>


        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">身份证有效期<span class="importent">*</span></el-col>
          <el-col :span="21" class="table_td">
            <el-col :span="4" >
              <el-radio-group v-model="item.isLong" @change="(val)=>val?verify(val,'cardLine',index,'isLong'):''">
                <el-radio label="01">长期</el-radio>
                <el-radio label="02">短期</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="5" v-if="item.isLong === '02'">
              <el-date-picker  :editable="false" size="small" class="select_width" v-model="item.cardLine" type="date" placeholder="身份证有效期" @change="(val)=>verify(val,'cardLine',index,'cardLine')"></el-date-picker>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].cardLine ">请选择身份证有效期</el-col>
          </el-col>
        </el-col>





        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">婚姻状况<span class="importent">*</span></el-col>
          <el-col :span="10" class="table_td">
            <el-col :span="23" :offset="1" class="bmp_selectleft">
              <el-radio v-model="item.marStatus" label="10">未婚</el-radio>
              <el-radio v-model="item.marStatus" label="20">已婚无子女</el-radio>
              <el-radio v-model="item.marStatus" label="21">已婚有子女</el-radio>
              <el-radio v-model="item.marStatus" label="22">离异</el-radio>
              <el-radio v-model="item.marStatus" label="30">丧偶</el-radio>
            </el-col>
            <!--<el-col :span="9" class="error_title" v-if="borrowerBolList[index].isErrorradio"> *婚姻状态不可为空</el-col>-->
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">性别</el-col>
          <el-col :span="9" class="table_td">{{item.sex|isMan}}&nbsp;</el-col>
          <el-col :span="3" class="table_td">年龄</el-col>
          <el-col :span="9" class="table_td">{{item.age}}&nbsp;</el-col>
        </el-col>


        <el-col  :span="24" class="table_tr">
          <el-col :span="3" class="table_td">单位性质<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td">
            <el-col :span="16" style="margin-left: 2%" class="bmp_selectleft">
              <el-select v-model="item.properties" @change="fnVal(index,0)" size="small" class="bmp_nature" placeholder="单位性质">
                <el-option v-for="data in _utils.unit" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>

              <el-select v-model="item.propertiesDetail" @visible-change="(val)=>fnValDeta(index,0,val)" size="small" class="bmp_nature" placeholder="单位性质">
                <el-option v-for="data in _utils.ulitList" :value="data.code" v-if="filters(data.code,item.properties)" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="error_title" v-if="borrowerBolList[index].properties"> 单位性质不可为空</el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">所属行业<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1" class="bmp_selectleft">
              <el-select v-model="item.unitIndustry"  @visible-change="(val)=>verify(item.unitIndustry,7,index,val)" size="small" placeholder="所属行业">
                <el-option v-for="da in _utils.data" :value="da.code" :label="da.label" :key="da.code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].unitIndustry">所属行业不可为空</el-col>
          </el-col>
          <!--<el-col :span="3" class="table_td">岗位</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" disabled v-model="item.custPost" placeholder="请输入岗位"></el-input>
            </el-col>
          </el-col>-->
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">职位<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td">
            <el-col :span="16" style="margin-left: 2%" class="bmp_selectleft">
              <el-select v-model="item.occupation" size="small" @change="fnVal(index,1)" class="bmp_nature" placeholder="职位">
                <el-option v-for="data in _utils.occupa" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
              <el-select v-model="item.occupationDetail" @visible-change="(val)=>fnValDeta(index,1,val)" size="small" class="bmp_nature" placeholder="职位">
                <el-option v-for="data in _utils.occupaList" v-if="occupaFn(data.code,item.occupation)" :value="data.code" :label="data.label" :key="data.code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" class="error_title" v-if="borrowerBolList[index].occupation">职位不可为空</el-col>
          </el-col>
        </el-col>


        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">工作单位<span class="importent">*</span></el-col>
          <el-col :span="18" class="textareawrap"><div class="textarea"><textarea v-model="item.workUnit" :rows="3"  @blur="verify(item.workUnit,'work',index)" placeholder="" :maxlength="100"></textarea></div></el-col>
          <el-col :span="3" class=" table_td error_title" v-if="borrowerBolList[index].workUnit">请输入工作单位</el-col>
        </el-col>


        <!--	<el-col :span="24" class="table_tr">
                      <el-col :span="3" class="table_td">工作年限(年)</el-col>
                      <el-col :span="9" class="table_td">
                          <el-col :span="14" :offset="1">
                  <el-input size="small" disabled v-model="item.workYear" @blur="verify(item.workYear,8,index)" placeholder="输入整数的年份"></el-input>
                          </el-col>
                          <el-col :span="9" class="error_title" v-if="borrowerBolList[index].workYear">输入整数的年份</el-col>
                      </el-col>
                      <el-col :span="3" class="table_td">年收入(万元)</el-col>
                      <el-col :span="9" class="table_td">
                          <el-col :span="14" :offset="1">
                  <el-input disabled size="small" v-model="item.income" @blur="verify(item.income,10,index)" placeholder="请输入年收入"></el-input>
                          </el-col>
                          <el-col :span="9" class="error_title" v-if="borrowerBolList[index].income ">*输入数字应为整数</el-col>
                      </el-col>

                  </el-col>-->

        <!-- <el-col :span="24" class="table_tr">
           &lt;!&ndash;<el-col :span="3" class="table_td">家庭年收入(万元)</el-col>
                     <el-col :span="9" class="table_td">
                         <el-col :span="14" :offset="1">
                 <el-input disabled size="small" @blur="verify(item.familyIncome,9,index)" v-model="item.familyIncome" placeholder="请输入家庭年收入(万元)"></el-input>
                         </el-col>
                         <el-col :span="9" class="error_title" v-if="borrowerBolList[index].familyIncome "> *输入数字应为整数</el-col>
                     </el-col>&ndash;&gt;
           <el-col :span="3" class="table_td">征信逾期情况<span class="importent">*</span>
           </el-col>
           <el-col :span="9" class="table_td">
             <el-col :span="14" class="bmp_selectleft" :offset="1">
               <el-radio-group  v-model="item.overdueReporting"  size="mini">
                 <el-radio @click.native.prevent="overdueReportingFn(index,'1')" label="1">有逾期</el-radio>
                 <el-radio @click.native.prevent="overdueReportingFn(index,'2')" label="2">无逾期</el-radio>
               </el-radio-group>
             &lt;!&ndash;  <el-radio @change="verify(item.overdueReporting,28,index)" v-model="item.overdueReporting" label="1">有逾期</el-radio>
               <el-radio @change="verify(item.overdueReporting,28,index)" v-model="item.overdueReporting" label="2">无逾期</el-radio>&ndash;&gt;
             </el-col>
             <el-col :span="9" class="error_title" v-if="borrowerBolList[index].overdueReporting"> 请选择征信逾期情况</el-col>
           </el-col>
         </el-col>-->


        <!-- <el-col :span="24" class="table_tr">
           <el-col :span="3" class="table_td">个人征信(贷款)<span class="importent">*</span></el-col>
           <el-col :span="9" class="table_td">
             <el-col :span="14" :offset="1" class="bmp_selectleft">
               连
               <el-input size="small" :maxlength="4" class="bmp_credit" @blur="verify(item.loanEven,11,index,1,item.loanTired)" v-model="item.loanEven"></el-input>
               累
               <el-input size="small" :maxlength="4" class="bmp_credit" @blur="verify(item.loanTired,11,index,0,item.loanEven)" v-model="item.loanTired"></el-input>
             </el-col>
             <el-col :span="9" class="error_title" v-if="borrowerBolList[index].loan">连累值应为整数</el-col>
           </el-col>
           <el-col :span="3" class="table_td">个人征信(信用卡)<span class="importent">*</span>
           </el-col>
           <el-col :span="9" class="table_td">
             <el-col :span="14" :offset="1" class="bmp_selectleft">
               连
               <el-input size="small" :maxlength="4" class="bmp_credit" @blur="verify(item.cardEven,12,index,1,item.cardTired)" v-model="item.cardEven"></el-input>
               累
               <el-input size="small" :maxlength="4" class="bmp_credit" @blur="verify(item.cardTired,12,index,0,item.cardEven)" v-model="item.cardTired"></el-input>
             </el-col>
             <el-col :span="9" class="error_title" v-if="borrowerBolList[index].card">连累值应为整数</el-col>
           </el-col>
         </el-col>-->

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">常住地址<span class="importent">*</span></el-col>
          <el-col :span="18" class="table_td bmp_selectleft idcart">
            <el-col :span="19">
              <el-select v-model="item.liveshen"@visible-change="(val)=>liveCode(val,item.liveshen,index)" size="small" class="bmp_selectWidth" placeholder="省">
                <el-option v-for="data in provinceListVoList" :value="data.provinceCode" :label="data.provinceName" :key="data.provinceCode"></el-option>
              </el-select>
              <el-select v-model="item.liveshi" @visible-change="(val)=>livegetare(val,item.liveshi,index)" size="small" class="bmp_selectWidth" placeholder="市">
                <el-option v-for="data in livecityListVoList" :value="data.cityCode" :label="data.cityName" :key="data.cityCode"></el-option>
              </el-select>
              <el-select v-model="item.residentAddressCode" size="small" class="bmp_selectWidth" placeholder="区">
                <el-option v-for="data in liveareaList" :value="data.areaCode" :label="data.areaName" :key="data.areaCode"></el-option>
              </el-select>
              <el-input size="small" @blur="verify(item.residentAddressCode, 22, index,item.residentAddressDetail)" v-model="item.residentAddressDetail" class="bmp_input" :maxlength="50" placeholder="常住地址"></el-input>
            </el-col>
            <el-col :span="5" class="error_title" style="text-align:left;" v-if="borrowerBolList[index].residentAddressCode">常住地址不可为空</el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <!--<el-col :span="3" class="table_td">居住年限(年)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
                <el-input disabled size="small" v-model="item.livingYears" @blur="verify(item.livingYears,13,index)" placeholder="居住年限(年)"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].livingYears "> *输入数字应为整数</el-col>
          </el-col>-->
          <el-col :span="3" class="table_td">家庭人数<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="10" :offset="1">
              <el-input size="small" v-model="item.familiesNum" @blur="verify(item.familiesNum,23,index)" :maxlength="4"  placeholder="请输入家庭人数(整数)"></el-input>
            </el-col>
            <el-col :span="12" class="error_title" v-if="borrowerBolList[index].familiesNum">家庭人数应为整数且不可为空</el-col>
          </el-col>
          <el-col :span="3" class="table_td">固定电话</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.telephone" :maxlength="20"  placeholder="请输入固定电话"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>
        </el-col>
        <!-- <el-col :span="3" class="table_td">企业名称</el-col>
         <el-col :span="9" class="table_td">
           <el-col :span="14" :offset="1">
             <el-input size="small" v-model="item.enterpriseName" :maxlength="255"  placeholder="请输入企业名称"></el-input>
           </el-col>
           <el-col :span="9" class="error_title"> </el-col>
         </el-col>-->
        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">关联企业名称</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea v-model="item.enterpriseName" :rows="3" placeholder="请输入企业名称" :maxlength="255"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr ">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="3" class="table_td textarea_title">关联企业经营状况</el-col>
            <el-col :span="21" class="textareawrap"><div class="textarea"><textarea v-model="item.stateOfBusiness" :rows="3" placeholder="请输入企业经营状况" :maxlength="255"></textarea></div></el-col>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">占股比例(占用款企业)</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.ratioOfShare" :maxlength="10" placeholder="请输入占股比例"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>
          <!--<el-col :span="3" class="table_td">企业经营状况</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.stateOfBusiness" :maxlength="255"  placeholder="请输入企业经营状况"></el-input>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>-->
          <!--<el-col :span="3" class="table_td">负债(万元)<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.liabilities" @blur="verify(item.liabilities,27,index)" @keyup.native="clearTwoNum(item.liabilities,index)" :maxlength="20" placeholder="请填写负债(万元)"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].liabilities">负债不可为空 </el-col>
          </el-col>-->
        </el-col>

        <!--是否为黑户-->
        <el-col :span="24" class="table_tr">
          <!--<el-col :span="3" class="table_td">是否为黑户</el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-radio v-model="item.isUnregistered" label="1">是</el-radio>
              <el-radio v-model="item.isUnregistered" label="0">否</el-radio>
            </el-col>
            <el-col :span="9" class="error_title"> </el-col>
          </el-col>-->
          <el-col :span="3" class="table_td">电子邮箱<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-input size="small" v-model="item.email" @blur="verify(item.email,24,index)" @keyup.native="clearSpeace(item.email,index,'email')" :maxlength="50" placeholder="电子邮箱"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].email">
              电子邮箱格式错误
            </el-col>
          </el-col>
          <el-col :span="3" class="table_td">健康状况<span class="importent">*</span></el-col>
          <el-col :span="9" class="table_td">
            <el-col :span="14" :offset="1">
              <el-select v-model="item.healthStatus"  @visible-change="(val)=>verify(item.healthStatus,25,index,val)" size="small" placeholder="健康状况">
                <el-option v-for="da in _utils.healthStatusList" :value="da.code" :label="da.name" :key="da.code"></el-option>
              </el-select>
            </el-col>
            <el-col :span="9" class="error_title" v-if="borrowerBolList[index].healthStatus"> 健康状况不可为空</el-col>
          </el-col>
        </el-col>
        <!--  <el-col :span="24" class="table_tr">
            <el-col :span="3" class="table_td">征信行业<span class="importent">*</span></el-col>
            <el-col :span="9" class="table_td">
              <el-col :span="14" :offset="1">
                <el-input size="small" v-model="item.creditIndustry" @blur="verify(item.creditIndustry,26,index)" @keyup.native="clearSpeace(item.creditIndustry,index,'creditIndustry')" :maxlength="32" placeholder="征信行业"></el-input>
              </el-col>
              <el-col :span="9" class="error_title" v-if="borrowerBolList[index].creditIndustry">
                征信行业不可为空
              </el-col>
            </el-col>
          </el-col>-->
        <!-- <el-col :span="24" class="table_tr">

         </el-col>-->
      </el-row>



      <div class="show_list_title">
        <h3><img src="../../../assets/pic.png" class="listTitleImg"><span>借款人影像信息</span></h3>
      </div>
      <picModule :bussNo="$route.query.bussNo" dataType="2" taskType="136" :custId="item.releId" class="module_margin_bottom"/>
      <div class="show_list_title">
        <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>借款人家庭信息</span></h3>
      </div>
      <el-button @click="addrelationList(activeIndex)">新增</el-button>




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
            <el-select v-model="data.mainReletion" size="small" placeholder="关系">
              <el-option v-for="datafamily in relati" :value="datafamily.code" :label="datafamily.label" :key="datafamily.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input :class="borrowerBolList[index].relationBolList[inde].borrowerName" @blur="verifyPerson('借款人姓名',inde,index,data.familyCust)"
                        title="输入姓名应为汉字" size="small" v-model="data.familyCust" placeholder="请输入借款人姓名"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input :class="borrowerBolList[index].relationBolList[inde].brokerMobile" @blur="verifyPerson('联系方式',inde,index,data.familyMobile)"
                        size="small" title="输入11位手机号码" v-model="data.familyMobile" placeholder="请输入联系方式"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input size="small" title="工作单位" v-model="data.company" placeholder="请输入工作单位"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-col :span="20" :offset="1">
              <el-input size="small" title="职位" v-model="data.position" placeholder="请输入职位"></el-input>
            </el-col>
          </el-col>
          <el-col :span="4" class="table_td">
            <el-button @click="del(inde,index)">删除</el-button>
          </el-col>


        </el-col>
      </el-row>





      <el-col :span="8" :offset="10" class="btn">
        <el-button @click="delBorrower(activeIndex,item)"  v-show="index != 0 ">删除该借款人信息</el-button>
        <el-button @click="save(item,index)">保存借款人基本信息</el-button>
      </el-col>

    </el-row>
    <backTop></backTop>

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
  import msgTitle from './../../../component/com/msgTitle'
  export default {
    name: 'borrowMoneyPerson',
    data() {
      return {
        //借款人初始化
        borrowBol:false,
        borrowBol2:false,
        //所有都填写正确
        allIsbol: false,
        //验证判断
        highestDegreeList:[],
        borrowerBolList: [
          {
            highestDegree: false,
            highestEducation: false,
            custPost: false,
            famregisterCode: false,
            residentAddressCode:false,
            nation: false,
            university: false,
            isfullCust:'0',
            marStatus:false,
            relationBolList: [
              {
                relation: '', //关系
                borrowerName: '',//姓名
                brokerMobile: '',//联系方式
                textarea: ''//备注
              }
            ],
            isErrorBrower: false,
            certNo: false,
            cardLine: false,
            certName: false,
            workUnit: false,
            properties: false,
            occupation: false,
            unitIndustry: false,
            workYear: false,
            familyIncome: false,
            income: false,
            loan: false,
            mobile: false,
            card: false,
            familiesNum:false,
            email:false,
            healthStatus:false,
            creditIndustry:false,
            liabilities:false,
            livingYears: false,
          },
        ],
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


        //单位性质

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

        borrowerPersonList: [
          {
            custNo: '', //借款人id
            mobile: '',
            custName: '',

            certNo: '',//身份证
            cardLine: '',//身份证
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

            properties: '', //性质
            propertiesDetail: '',//性质详情

            custPost: '',//岗位
            workYear: '',//年限
            income: '',//收入
            overdueReporting: "",//预期
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
            // creditIndustry:'',//征信行业
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
                familyMobile: '',
                company:'',
                position:'',
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
        nameTotalList: [],
        propertiesDetailBol:false,
        occupationDetailBol:false,
        unitIndustryBol:false,
        propertiesBol:false,
        occupationBol:false,
      }
    },
    components:{
      msgTitle
    },
    methods: {
      clearTwoNum(str,index){
        this.borrowerPersonList[index].liabilities = this._utils.clearTwoNum(str)
      },
      clearSpeace(str,index,style){
        this.borrowerPersonList[index][style] = this._utils.clearSpeace(str)
      },

      fnVal(index,val) {
        if(val == '0'){
          if(!this.propertiesDetailBol){
            this.propertiesDetailBol = true
            return
          }
          this.borrowerPersonList[index].propertiesDetail = ''
        }else{
          if(!this.occupationDetailBol){
            this.occupationDetailBol = true
            return
          }
          this.borrowerPersonList[index].occupationDetail = ''
        }
      },
      fnValDeta(index,val,data){
        if(val == '0'){
          if(!data){
            if(!this.borrowerPersonList[index].propertiesDetail){
              this.borrowerBolList[index].properties = true
            } else {
              this.borrowerBolList[index].properties = false
            }
          }
        } else {
          if(!data){
            if(!this.borrowerPersonList[index].occupationDetail){
              this.borrowerBolList[index].occupation = true
            } else {
              this.borrowerBolList[index].occupation = false
            }
          }
        }
      },
      fn() {
      },
      overdueReportingFn(index,value){
        this.borrowerPersonList[index].overdueReporting = value;
        this.borrowerBolList[index].overdueReporting = false
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
          case 'cardLine':
            if(this.borrowerPersonList[index].isLong) {
              if (this.borrowerPersonList[index].isLong === '02') {
                if (!this.borrowerPersonList[index].cardLine) {
                  this.borrowerBolList[index].cardLine = true
                } else {
                  this.borrowerBolList[index].cardLine = false
                }
              }else if (this.borrowerPersonList[index].isLong === '01'){
                this.borrowerBolList[index].cardLine = false
              }
            }else{
              this.borrowerBolList[index].cardLine = true
            }

            break;
          case 'work':
            if(!data){
              this.borrowerBolList[index].workUnit = true
            }else{
              this.borrowerBolList[index].workUnit = false
            }
            break;
          case 1:
            if (!data || !data1 || !data2) {
              this.borrowerBolList[index].isErrorBrower = true
            } else {
              this.borrowerBolList[index].isErrorBrower = false
            }
            break
          case 2:
            //身份证号
            if (18 == data.length||15 == data.length) {
              $.post(this._path + '/business/realNameAuthentication', { name: data1, certNo: data }, (res) => {
                if (res.resultCode && res.resultCode == '0000') {
                  // 实名认证
                  if (res.data.isVerified) {
                    this.borrowerPersonList[index].sex = res.data.sex == '男' ? "1" : '0';
                    this.borrowerPersonList[index].age = res.data.age;
                    this.borrowerBolList[index].certNo = false;
                  } else {
                    this.borrowerBolList[index].certNo = true;
                    this.borrowerPersonList[index].sex = '';
                    this.borrowerPersonList[index].age = "";
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
                this.borrowerBolList[index].certNo = true;
                this.$message({
                  type: 'error',
                  message: "实名认证失败：系统错误，请与管理员联系",
                  duration: 1500,
                  showClose: true
                })
              });
            } else {
              this.borrowerBolList[index].certNo = true;
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
            if (!data) {
              this.borrowerBolList[index].workUnit = true;
            } else if (this._utils.isNbsp(data)) {
              this.borrowerBolList[index].workUnit = true;
            } else {
              this.borrowerBolList[index].workUnit = false;
            }
            break
          case 5:
            if (!data||!data1) {
              this.borrowerBolList[index].properties = true;
            } else {
              this.borrowerBolList[index].properties = false;
            }
            break
          case 6:
            if (!data||!data1) {
              this.borrowerBolList[index].occupation = true;
            } else {
              this.borrowerBolList[index].occupation = false;
            }
            break
          case 7:
            if(!data1) {
              if (!data) {
                this.borrowerBolList[index].unitIndustry = true;
              } else {
                this.borrowerBolList[index].unitIndustry = false;
              }
            }
            break
          case 8:
            if (!data) {
              this.borrowerBolList[index].workYear = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].workYear = false;
            } else {
              this.borrowerBolList[index].workYear = true;
            }
            break
          case 9:
            if (!data) {
              this.borrowerBolList[index].familyIncome = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].familyIncome = false;
            } else {
              this.borrowerBolList[index].familyIncome = true;
            }
            break
          case 10:
            if (!data) {
              this.borrowerBolList[index].income = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].income = false;
            } else {
              this.borrowerBolList[index].income = true;
            }
            break
          case 11:
            if (!data1) {
              if (this._utils.isNumber(data) &&this._utils.isNumber(data2)) {
                this.borrowerBolList[index].loan = false
              } else {
                this.borrowerBolList[index].loan = true
              }
            } else {
              if (this._utils.isNumber(data) &&this._utils.isNumber(data2)) {
                this.borrowerBolList[index].loan = false
              } else {
                this.borrowerBolList[index].loan = true
              }
            }
            break
          case 12:
            if (!data1) {
              if (this._utils.isNumber(data) &&this._utils.isNumber(data2)) {
                this.borrowerBolList[index].card = false
              } else {
                this.borrowerBolList[index].card = true
              }
            } else {
              if (this._utils.isNumber(data) &&this._utils.isNumber(data2)) {
                this.borrowerBolList[index].card = false
              } else {
                this.borrowerBolList[index].card = true
              }
            }
            break
          case 13:
            if (!data) {
              this.borrowerBolList[index].livingYears = false;
            } else if (this._utils.isNumber(data)) {
              this.borrowerBolList[index].livingYears = false;
            } else {
              this.borrowerBolList[index].livingYears = true;
            }
            break;
          case 14:
            if (!data||!data1) {
              this.borrowerBolList[index].famregisterCode = true;
            } else {
              this.borrowerBolList[index].famregisterCode = false;
            }
            break
          case 15:
            if (!data) {
              this.borrowerBolList[index].mobile = true;
            } else if (!this._utils.isMobile(data)) {
              this.borrowerBolList[index].mobile = true;
            } else {
              this.borrowerBolList[index].mobile = false;
            }
            break
          case 16:

            if (!data) {
              this.borrowerBolList[index].nation = true;
            } else {
              this.borrowerBolList[index].nation = false;
            }
            break
          case 17:
            if (!data) {
              this.borrowerBolList[index].university = true;
            } else {
              this.borrowerBolList[index].university = false;
            }
            break
          case 18:
            if(!data1) {
              if (!data) {
                this.borrowerBolList[index].highestEducation = true;
              } else {
                this.borrowerBolList[index].highestEducation = false;
              }
            }
            break
          case 19:
            if (!data) {
              this.borrowerBolList[index].highestDegree = true;
            } else {
              this.borrowerBolList[index].highestDegree = false;
            }
            break
          case 21:
            if (!data) {
              this.borrowerBolList[index].custPost = true;
            } else {
              this.borrowerBolList[index].custPost = false;
            }
            break
          case 22:
            if (!data||!data1) {
              this.borrowerBolList[index].residentAddressCode = true;
            } else {
              this.borrowerBolList[index].residentAddressCode = false;
            }
            break
          case 23:
            if (!data) {
              this.borrowerBolList[index].familiesNum = true
            } else if (!this._utils.isNumber(data)) {
              this.borrowerBolList[index].familiesNum = true
            }else{
              this.borrowerBolList[index].familiesNum = false
            }
            break
          case 24:
            if (!data) {
              this.borrowerBolList[index].email = true
            } else{
              if(this._utils.isEmail(data)){
                this.borrowerBolList[index].email = false
              }else{
                this.borrowerBolList[index].email = true
              }
            }
            break
          case 25:
            if(!data1) {
              if (!data) {
                this.borrowerBolList[index].healthStatus = true
              } else{
                this.borrowerBolList[index].healthStatus = false
              }
            }
            break
          case 26:
            // if (!data) {
            //   this.borrowerBolList[index].creditIndustry = true
            // } else{
            //   this.borrowerBolList[index].creditIndustry = false
            // }
            break
          case 27:
            if (!data) {
              this.borrowerBolList[index].liabilities = true
            } else{
              this.borrowerBolList[index].liabilities = false
            }
            break
          case 28:
            if (!data) {
              this.borrowerBolList[index].overdueReporting = true
            } else{
              this.borrowerBolList[index].overdueReporting = false
            }
            break
        }
      },
      //获取市
      getarea(val,data,index) {
        if(!val){
          let params = { provinceCode: data }
          let cityListVoList = JSON.stringify(this.cityListVoList)
          $.post(this._path + '/business/queryCitysByProvinceCode', params, (res) => {
            this.cityListVoList = res.data.cityListVoList
            if(cityListVoList !=  JSON.stringify(this.cityListVoList)){
              this.$set(this.borrowerPersonList[index],'shi','')
              this.borrowerPersonList[index].famregisterCode = '';
              this.areaList = []
            }
          })
        }
      },
      //获取区
      getare(val,data,index) {
        if(!val){
          let params = { cityCode: data }
          let areaList = JSON.stringify(this.areaList)
          $.post(this._path + '/business/queryAllAreasByCityCode', params, (res) => {
            this.areaList = res.data.areaList
            if(areaList != JSON.stringify(this.areaList)){
              this.borrowerPersonList[index].famregisterCode = '';
            }
          })
        }
      },
      //获取居住地市
      liveCode(val,data,index) {
        if(!val){
          let params = { provinceCode: data }
          let livecityListVoList = JSON.stringify(this.livecityListVoList)
          $.post(this._path + '/business/queryCitysByProvinceCode', params, (res) => {
            this.livecityListVoList = res.data.cityListVoList
            if(livecityListVoList != JSON.stringify(this.livecityListVoList)){
              this.$set(this.borrowerPersonList[index],'liveshi','')
              this.borrowerPersonList[index].residentAddressCode = '';
            }
          })
        }
      },
      livegetare(val,data,index) {
        if(!val){
          let params = { cityCode: data }
          let liveareaList = JSON.stringify(this.liveareaList)
          $.post(this._path + '/business/queryAllAreasByCityCode', params, (res) => {
            this.liveareaList = res.data.areaList
            if(liveareaList != JSON.stringify(this.liveareaList)){
              this.borrowerPersonList[index].residentAddressCode = '';
            }
          })
        }
      },
      //删除
      del(inde, index) {
        this.borrowerPersonList[index].familyLogVos.splice(inde, 1)
        this.borrowerBolList[index].relationBolList.splice(inde, 1)
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
        })
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

        for(let j = 0;j<this.borrowerBolList.length;j++){
          this.verify(this.borrowerPersonList[j].relType, 1, j, this.borrowerPersonList[j].relName, this.borrowerPersonList[j].relationship)
          this.verify(this.borrowerPersonList[j].certNo, 2, j,this.borrowerPersonList[j].custName)
          this.verify(this.borrowerPersonList[j].custName, 3, j)
          this.verify(this.borrowerPersonList[j].workUnit, 'work', j) //工作单位
          this.verify(this.borrowerPersonList[j].properties, 5, j,this.borrowerPersonList[j].propertiesDetail)
          this.verify(this.borrowerPersonList[j].occupation, 6, j,this.borrowerPersonList[j].occupationDetail)
          this.verify(this.borrowerPersonList[j].unitIndustry, 7, j)
          this.verify(this.borrowerPersonList[j].famregisterCode, 14, j,this.borrowerPersonList[j].famregisterDetail)
          this.verify(this.borrowerPersonList[j].mobile, 15, j) //联系电话

          this.verify(this.borrowerPersonList[j].residentAddressCode, 22, j,this.borrowerPersonList[j].residentAddressDetail);
          this.verify(this.borrowerPersonList[j].familiesNum, 23, j)

          this.verify(this.borrowerPersonList[j].email, 24, j); //邮箱
          this.verify(this.borrowerPersonList[j].healthStatus, 25, j); //健康状况
          // this.verify(this.borrowerPersonList[j].creditIndustry, 26, j); //征信行业
          // this.verify(this.borrowerPersonList[j].liabilities, 27, j); //负债
          this.verify(this.borrowerPersonList[j].overdueReporting,28,j);//预期情况

          // this.verify(this.borrowerPersonList[j].nation, 16, j) //民族
          // this.verify(this.borrowerPersonList[j].university, 17, j)  //毕业院校
          this.verify(this.borrowerPersonList[j].highestEducation, 18, j);//最高学历

          this.verify(this.borrowerPersonList[j].highestDegree, 19, j) //最高学位
          // this.verify(this.borrowerPersonList[j].custPost, 21, j) //岗位
          this.verify(this.borrowerPersonList[j].cardEven, 12, j, 1,this.borrowerPersonList[j].cardTired)
          this.verify('','cardLine',index);
          // this.verify(this.borrowerPersonList[j].loanTired, 11, j, 0,this.borrowerPersonList[j].loanEven)
          // this.verify(this.borrowerPersonList[j].cardTired, 12, j, 0)
          if(!this.borrowerPersonList[j].marStatus){
            this.borrowerBolList[j].marStatus = true
          }else{
            this.borrowerBolList[j].marStatus = false
          }
        }

        if(!item.marStatus){
          this.$message({
            type: 'error',
            message: '婚姻状态不可为空!',
            duration: 3000,
            showClose: true
          })
        }

        for (let i = 0; i < this.borrowerPersonList.length; i++) {
          if(i==0){
            this.borrowerBolList[0].isErrorBrower = false
          }
          // healthStatus ,creditIndustry ,liabilities
          if (!this.borrowerBolList[i].workUnit&&!this.borrowerBolList[i].cardLine&&!this.borrowerBolList[i].creditIndustry&&!this.borrowerBolList[i].healthStatus&&!this.borrowerBolList[i].email&&!this.borrowerBolList[i].highestEducation&&!this.borrowerBolList[i].familiesNum&&!this.borrowerBolList[i].residentAddressCode&&!this.borrowerBolList[i].mobile&&!this.borrowerBolList[i].marStatus && !this.borrowerBolList[i].loan && !this.borrowerBolList[i].card  && !this.borrowerBolList[i].famregisterCode && !this.borrowerBolList[i].isErrorBrower && !this.borrowerBolList[i].certNo && !this.borrowerBolList[i].certName  && !this.borrowerBolList[i].properties && !this.borrowerBolList[i].occupation && !this.borrowerBolList[i].unitIndustry) {
            this.allIsbol = true
          } else {
            this.allIsbol = false;
            break
          }
        }

        this.addObj = JSON.parse(JSON.stringify(item));






        console.log(!this.borrowerBolList[index].highestDegree,!this.borrowerBolList[index].workUnit,this.borrowerBolList[index].cardLine,this.borrowerBolList[index].healthStatus,this.borrowerBolList[index].email,this.borrowerBolList[index].highestEducation,this.borrowerBolList[index].familiesNum,this.borrowerBolList[index].residentAddressCode,this.borrowerBolList[index].mobile,this.borrowerBolList[index].marStatus , this.borrowerBolList[index].famregisterCode , this.borrowerBolList[index].isErrorBrower , this.borrowerBolList[index].certNo , this.borrowerBolList[index].certName  , this.borrowerBolList[index].properties , this.borrowerBolList[index].occupation , this.borrowerBolList[index].unitIndustry)





        if (!this.borrowerBolList[index].highestDegree&&!this.borrowerBolList[index].workUnit&&!this.borrowerBolList[index].cardLine&&!this.borrowerBolList[index].healthStatus&&!this.borrowerBolList[index].email&&!this.borrowerBolList[index].highestEducation&&!this.borrowerBolList[index].familiesNum&&!this.borrowerBolList[index].residentAddressCode&&!this.borrowerBolList[index].mobile&&!this.borrowerBolList[index].marStatus && !this.borrowerBolList[index].famregisterCode && !this.borrowerBolList[index].isErrorBrower && !this.borrowerBolList[index].certNo && !this.borrowerBolList[index].certName  && !this.borrowerBolList[index].properties && !this.borrowerBolList[index].occupation && !this.borrowerBolList[index].unitIndustry) {
          this.addObj.isFullCust = '1'
        } else {
          this.addObj.isFullCust = '0'
        }

        if(this.allIsbol){
          window.bus.$emit('isFullCustShow', 1)
        }else{
          window.bus.$emit('isFullCustShow', 0)
        }
        this.addObj.cardLine = Date.parse(this.addObj.cardLine)?Date.parse(this.addObj.cardLine):'';
        this.addObj.familyLogVosString = JSON.stringify(this.addObj.familyLogVos);
        this.addObj.bussNo = this.$route.query.bussNo;
        var b = this.addObj.id;
        this.addObj.custNo = b;
        delete this.addObj.familyLogVos;
        delete this.addObj.id;
        delete this.addObj.shen;
        delete this.addObj.shi;
        delete this.addObj.liveshen;
        delete this.addObj.liveshi;

        $.post(this._path + '/dataReturn/insertCustLogSave', this.addObj, (res) => {
          if (res.resultCode == '0000') {
            this.borrowerBolList[index].isfullCust = res.data.isFullCust
            let bol = false
            for(let k = 0;k<this.borrowerBolList.length;k++){
              if(this.borrowerBolList[k].isfullCust == '0'){
                bol = true;
                break
              }
            }

            if(!bol){
              window.bus.$emit('isFullCustShow', 1);
              this.$message({
                type: 'success',
                message: '保存成功!',
                duration: 1500,
                showClose: true
              })
            }else{
              window.bus.$emit('isFullCustShow', 0);
              if(res.data.isNotExist){
                this.$message({
                  type: 'success',
                  message:res.data.isNotExist ,
                  duration: 1500,
                  showClose: true
                })
              }else{
                this.$message({
                  type: 'success',
                  message: '新增借款人信息不完整!',
                  duration: 1500,
                  showClose: true
                })
              }
            }
            if(index==0&&this.borrowerBolList[0].isfullCust == '1'){
              this.$confirm('如有其他借款人，请点击当前页签顶部蓝色“新增共借人”按钮，完善共借人信息（支持新增多个共借人）', '提示', {
                cancelButtonText: '我知道了',
                showConfirmButton:false,
                type: 'warning'
              })
            }
          } else {
            this.requestError(this,res)
          }
        })

      },
      delBorrower(data,item){
        this.$confirm('是否确认删除该借款人信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delAddBorrowerPerson(data,item)
        })
      },
      //删除
      delAddBorrowerPerson(data, item) {
        if (item.id) {
          let cust = { custNo: item.id }

          $.post(this._path + '/dataReturn/deleteCustLog', cust, (res) => {
            if (res.resultCode == "0000") {
              this.borrowerPersonList.splice(data, 1)
              this.borrowerBolList.splice(data, 1)
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 1500,
                showClose: true
              })
              this.editableTabs2.length = 0
              for (let i = 0; i < this.borrowerPersonList.length; i++) {
                let b = {
                  title: '借款人' + (i + 1) +  (i==0?this.borrowerPersonList[0].custName:''),
                  name: i + '',
                  content: '借款人'
                }
                this.tabsNum = i

                this.editableTabs2.push(b)
              }
              this.editableTabsValue = (data / 1 - 1) + ''
              this.activeIndex = (data / 1 - 1)
            } else {
              this.$message({
                type: 'warning',
                message: '请再次尝试！',
                duration: 1500,
                showClose: true
              })
            }
          })

        } else {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1500,
            showClose: true
          })
          // this.editableTabsValue = data*1 - 1
          this.borrowerPersonList.splice(data, 1)
          this.borrowerBolList.splice(data, 1)
          this.editableTabs2.length = 0
          for (let i = 0; i < this.borrowerPersonList.length; i++) {
            let b = {
              title: '借款人' + (i + 1) + (i==0?this.borrowerPersonList[0].custName:''),
              name: i + '',
              content: '借款人'
            }
            this.tabsNum = i

            this.editableTabs2.push(b)
          }
          this.editableTabsValue = (data / 1 - 1) + ''
          this.activeIndex = (data / 1 - 1)
        }
      },

      //添加
      addTab() {
        $.post(this._path + '/consummate/getBussNo', {}, res => {
          if (res.resultCode == '0000') {
            let c = {
              custNo: '', //借款人id
              mobile: '',
              custName: '',

              certNo: '',//身份证
              cardLine: '',//身份证有效期
              birthday: '',//
              id: '',
              releId: res.data.custNo,
              marStatus: '', //婚姻

              famregister: '',  //
              famregisterCode: '', // 码
              famregisterDetail: "",   //
              province: '', //省
              detailedAddress: '', //详细地址
              //民族
              nation: '',
              //单选婚姻状态
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
              email:"",//邮箱
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
              familyLogVos: []
            }

            let bol = {
              residentAddressCode:false,

              isErrorBrower: false,
              certNo: false,
              cardLine: false,
              certName: false,
              workUnit: false,
              highestDegree: false,
              highestEducation: false,
              properties: false,
              occupation: false,
              custPost: false,
              unitIndustry: false,
              workYear: false,
              familyIncome: false,
              income: false,
              loan: false,
              card: false,
              familiesNum:false,
              email:false,
              healthStatus:false,
              creditIndustry:false,
              liabilities:false,
              overdueReporting:false,
              livingYears: false,
              famregisterCode: false,
              mobile: false,
              nation: false,
              university: false,
              isfullCust:'0',
              marStatus:false,
              relationBolList: []
            }

            this.borrowerBolList.push(bol)
            this.borrowerPersonList.push(c)

            this.tabsNum++
            let b = {
              title: '借款人' + (this.tabsNum + 1),
              name: this.tabsNum + '',
              content: '借款人'
            }

            this.editableTabs2.push(b)
          } else {
            this.requestError(this, res)
          }
        })

      },
      // 验证
      switchin(index) {
        if (18 == this.borrowerPersonList[index].certNo.length) {
          // this.borrowerBolList[index].isErrorcertNo = false;
          this.borrowerPersonList[index].sex = this._utils.discriCard(this.borrowerPersonList[index].certNo)
          this.borrowerPersonList[index].age = this._utils.discriCardAge(this.borrowerPersonList[index].certNo)
        } else {
          // this.borrowerBolList[index].isErrorcertNo = true;
          this.borrowerPersonList[index].sex = ''
          this.borrowerPersonList[index].age = ''
        }
      },
      //验证联系人
      verifyPerson(data, inde, index, content, data2) {
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
          /*case "身份证号":
                        let i = index
                        if (18 == content.length||15 == content.length) {
                            $.post(this._path + '/business/realNameAuthentication', { name: data2, certNo: content }, (res) => {
                                if (res.resultCode && res.resultCode == '0000') {
                                    // 实名认证
                                    if (res.data.isVerified) {
                                        this.borrowerPersonList[i].familyLogVos[inde].familySex = res.data.sex == '男' ? "1" : '0';
                                        this.borrowerPersonList[i].familyLogVos[inde].familyAge = res.data.age;
                                        this.borrowerBolList[i].relationBolList[inde].identityID = ''
                                    } else {
                                        this.borrowerBolList[i].relationBolList[inde].identityID = 'bmp_borderRed'
                                        this.borrowerPersonList[i].familyLogVos[inde].familySex = '';
                                        this.borrowerPersonList[i].familyLogVos[inde].familyAge = '';
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
                                this.borrowerBolList[i].relationBolList[inde].identityID = 'bmp_borderRed'
                                this.$message({
                                    type: 'error',
                                    message: "实名认证失败：系统错误，请与管理员联系",
                                    duration: 1500,
                                    showClose: true
                                })
                            });
                        } else {
                            this.borrowerBolList[i].relationBolList[inde].identityID = 'bmp_borderRed'
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
      //guolv
      filters(value, val) {
        if (val && value) {
          if (value.slice(0, 3) == val) {
            return true
          }else if(value == val){
            return true
          }
          return false
        }
      },

      //请求刷新类别
      ajax() {
        let params = {
          bussNo: this.$route.query.bussNo
        }
        $.post(this._path + "/dataReturn/selectBusCustLogListBybussNo", params, (res) => {
          // let data = res.data.busCustLogListVo
          this.borrowerPersonList = res.data.busCustLogListVo

          for (let i = 0; i < this.borrowerPersonList.length; i++) {
            var b = this.borrowerPersonList[i].certNo
            let params = { custNo: b }
            $.post(this._path + "/dataReturn/selectBusFamilyInfoLogBycustNo", params, (res) => {
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
      },
      queryEnum(){
        this.$http({
          url:'/dataReturn/getCustEnumList',
          callback:res=>{
            let data = res.data;
            this.highestDegreeList = data.degreeEnum;
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
      $.post(this._path + "/dataReturn/selectBusCustLogListBybussNo", params, (res) => {
        let data = res.data.busCustLogListVo


        let bbList = []
        if (!data.length) {
          for (let i = 0; i < data.length; i++) {
            let b = {
              title: '借款人' + (i + 1)+(i==0?("-" + data[0].custName):''),
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
            residentAddressCode:false,
            cardLine: false,

            isErrorBrower: false,
            certNo: false,
            certName: false,
            workUnit: false,
            highestDegree: false,
            properties: false,
            occupation: false,
            custcustPost: false,
            unitIndustry: false,
            workYear: false,
            familyIncome: false,
            income: false,
            loan: false,
            card: false,
            familiesNum:false,
            email:false,
            healthStatus:false,
            creditIndustry:false,
            liabilities:false,
            overdueReporting:false,
            livingYears: false,
            famregisterCode: false,
            highestEducation: false,
            isfullCust:'0',
            mobile: false,
            nation: false,
            university: false,
            marStatus:false,
            relationBolList: []
          }

          bbList[i].isfullCust = !data[i].isFullCust?'0':data[i].isFullCust

          $.post(this._path + "/dataReturn/selectBusFamilyInfoLogBycustNo", params, (res) => {




            this.borrowerPersonList = data
            this.$set(this.borrowerPersonList[i],'familyLogVos',res.data.busFamilyInfoLogListVo)
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
      },

    }
  }

</script>
