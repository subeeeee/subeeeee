<template>
  <div>
    <!-- 左侧导航nav -->
    <div class="allNav" >
      <el-col  class="nav">
        <el-menu :default-active="activeNavRoute" router class="el-menu-vertical-demo" theme="dark">
          <el-menu-item index="/orderList" @click="skip('orderList')" v-if="currentUserPermissions.indexOf('business:order') != -1"><i class="el-icon-document"></i>订单列表</el-menu-item>
          <el-submenu v-if="currentUserPermissions.indexOf('business:accept') != -1" index="1" >
            <template slot="title"><i class="el-icon-document"></i>订单受理</template>
            <el-menu-item index="/enquiryList" @click="skip('enquiryList')" v-if="currentUserPermissions.indexOf('business:accept:query:list') != -1"><i class="el-icon-document"></i>&nbsp;询&emsp;价&nbsp;</el-menu-item>
            <el-menu-item index="/addOrderList" @click="skip('addOrderList')" v-if="currentUserPermissions.indexOf('business:accept:neworder:list') != -1"><i class="el-icon-document"></i>新增订单</el-menu-item>
            <el-menu-item index="/trialPhaseList" @click="skip('trialPhaseList')" v-if="currentUserPermissions.indexOf('business:accept:face:list') != -1"><i class="el-icon-document"></i>&nbsp;审&emsp;核&nbsp;</el-menu-item>
            <el-menu-item index="/initialConsummate" @click="skip('initialConsummate')" v-if="currentUserPermissions.indexOf('business:accept:consummate:list') != -1"><i class="el-icon-document"></i>初评完善</el-menu-item>
            <el-menu-item index="/accessToValueList"  @click="skip('accessToValueList')" v-if="currentUserPermissions.indexOf('business:accept:assess:list') != -1"><i class="el-icon-document"></i>准入询值</el-menu-item>
          </el-submenu>
          <el-submenu index="2" v-if="currentUserPermissions.indexOf('business:survey') != -1">
            <template slot="title"><i class="el-icon-document"></i>下户调查</template>
            <el-menu-item index="/appointmentList"  @click="skip('appointmentList')"  v-if="currentUserPermissions.indexOf('business:survey:order') != -1"><i class="el-icon-document"></i>下户预约</el-menu-item>
            <el-menu-item index="/surveyerManage"  @click="skip('surveyerManage')" v-if="currentUserPermissions.indexOf('business:survey:returnmanage') != -1"><i class="el-icon-document"></i>下户员管理</el-menu-item>
            <el-menu-item index="/surveyerAllotList"  @click="skip('surveyerAllotList ')" v-if="currentUserPermissions.indexOf('business:survey:distribute') != -1"><i class="el-icon-document"></i>下户员分配</el-menu-item>
            <el-menu-item index="/surveyEvidenceUploadList"  @click="skip('surveyEvidenceUploadList ')" v-if="currentUserPermissions.indexOf('business:survey:returncost') != -1"><i class="el-icon-document"></i>下户费凭证上传</el-menu-item>
            <el-menu-item index="/infoPassHaulList"  @click="skip('infoPassHaulList')" v-if="currentUserPermissions.indexOf('business:survey:datareturn') != -1"><i class="el-icon-document"></i>资料上传</el-menu-item>
            <el-menu-item index="/infoInspectList" @click="skip('infoInspectList')" v-if="currentUserPermissions.indexOf('business:survey:datacheck') != -1"><i class="el-icon-document"></i>资料核查</el-menu-item>
            <el-menu-item index="/packageList" @click="skip('packageList')" v-if="currentUserPermissions.indexOf('business:survey:package') != -1"><i class="el-icon-document"></i>资料包列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3" v-if="currentUserPermissions.indexOf('business:passage') != -1">
            <template slot="title"><i class="el-icon-document"></i>通道确认</template>
            <el-menu-item index="/aisleAffirmList"  @click="skip('aisleAffirmList')" v-if="currentUserPermissions.indexOf('business:passage:list') != -1" ><i class="el-icon-document"></i>通道确认</el-menu-item>
          </el-submenu>

          <el-submenu index="4" v-if="currentUserPermissions.indexOf('business:contract') != -1">
            <template slot="title"><i class="el-icon-document"></i>面签管理</template>
            <el-menu-item index="/contractPreparingList"  @click="skip('contractPreparingList')" v-if="currentUserPermissions.indexOf('business:contract:prepare') != -1"><i class="el-icon-document"></i>合同准备</el-menu-item>

            <el-menu-item index="/greffierManage" v-if="currentUserPermissions.indexOf('business:contract:notarymanage') != -1"  @click="skip('/greffierManage')" ><i class="el-icon-document"></i>面签员管理</el-menu-item>
            <el-menu-item index="/greffierDistribution" v-if="currentUserPermissions.indexOf('business:contract:notarydistribution') != -1"  @click="skip('/greffierDistribution')" ><i class="el-icon-document"></i>面签员分配</el-menu-item>

            <!--<el-menu-item index="/contractReviewList"  @click="skip('contractReviewList')" v-if="currentUserPermissions.indexOf('business:contract:recheck') != -1" ><i class="el-icon-document"></i>合同复核</el-menu-item>-->
            <el-menu-item index="/uploadEvidenceList"  @click="skip('uploadEvidenceList')" v-if="currentUserPermissions.indexOf('business:contract:upload') != -1" ><i class="el-icon-document"></i>公证费凭证上传</el-menu-item>
            <!--<el-menu-item index="/costAffirmList"  @click="skip('costAffirmList')" v-if="currentUserPermissions.indexOf('business:contract:costconfirm') != -1" ><i class="el-icon-document"></i>费用确认</el-menu-item>-->
            <!--<el-menu-item index="/aisleAffirmList"  @click="skip('aisleAffirmList')" v-if="currentUserPermissions.indexOf('business:contract:channelconfirm') != -1" ><i class="el-icon-document"></i>通道确认</el-menu-item>-->
            <el-menu-item index="/contractConfirmList"  @click="skip('contractConfirmList')" v-if="currentUserPermissions.indexOf('business:contract:recheck') != -1" ><i class="el-icon-document"></i>合同信息确认</el-menu-item>
            <el-menu-item index="/contractMakeList"  @click="skip('contractMakeList')" v-if="currentUserPermissions.indexOf('business:contract:management') != -1" ><i class="el-icon-document"></i>合同制作</el-menu-item>
            <el-menu-item index="/creditUploadList"  @click="skip('creditUploadList')" v-if="currentUserPermissions.indexOf('business:contract:print') != -1" ><i class="el-icon-document"></i>陪打征信上传</el-menu-item>
            <el-menu-item index="/creditCheckList"  @click="skip('creditCheckList')" v-if="currentUserPermissions.indexOf('business:contract:printview') != -1" ><i class="el-icon-document"></i>陪打征信审核</el-menu-item>
            <el-menu-item index="/contractManageList"  @click="skip('contractManageList')" v-if="currentUserPermissions.indexOf('business:contract:manage') != -1"><i class="el-icon-document"></i>合同管理</el-menu-item>
            <el-menu-item index="/dataCheckList"  @click="skip('dataCheckList')" v-if="currentUserPermissions.indexOf('business:contract:verification') != -1"><i class="el-icon-document"></i>面签资料核查</el-menu-item>
            <el-menu-item index="/faceTrialList"  @click="skip('faceTrialList')" v-if="currentUserPermissions.indexOf('business:contract:trial') != -1"><i class="el-icon-document"></i>面审</el-menu-item>
            <el-menu-item index="/notrizationRegusterList"  @click="skip('notrizationRegusterList')" v-if="currentUserPermissions.indexOf('business:contract:notarization') != -1"><i class="el-icon-document"></i>公证登记</el-menu-item>
          </el-submenu>
          <el-submenu index="5" v-if="currentUserPermissions.indexOf('business:arrived') != -1">
            <template slot="title"><i class="el-icon-document"></i>权证进抵</template>
            <el-menu-item index="/distributionList"  @click="skip('distributionList')" v-if="currentUserPermissions.indexOf('business:arrived:distribute') != -1"><i class="el-icon-document"></i>进抵分配</el-menu-item>
            <el-menu-item index="/registerList"  @click="skip('registerList')" v-if="currentUserPermissions.indexOf('business:arrived:register') != -1"><i class="el-icon-document"></i>进抵登记</el-menu-item>
          </el-submenu>
          <el-submenu index="6" v-if="currentUserPermissions.indexOf('business:loan') != -1">
            <template slot="title"><i class="el-icon-document"></i>放款审核</template>
            <el-menu-item index="/firstCheckList"  @click="skip('firstCheckList')" v-if="currentUserPermissions.indexOf('business:loan:fitst') != -1"><i class="el-icon-document"></i>放款初审</el-menu-item>
            <el-menu-item index="/lastCheckList"  @click="skip('lastCheckList')" v-if="currentUserPermissions.indexOf('business:loan:final') != -1"><i class="el-icon-document"></i>放款终审</el-menu-item>
            <el-menu-item index="/loanApplyList"  @click="skip('loanApplyList')" v-if="currentUserPermissions.indexOf('business:loan:apply') != -1"><i class="el-icon-document"></i>放款申请</el-menu-item>
            <!--<el-menu-item index="/loanList"  @click="skip('loanList')" v-if="currentUserPermissions.indexOf('business:loan:finance') != -1"><i class="el-icon-document"></i>&nbsp;放&emsp;款&nbsp;</el-menu-item>-->
            <el-menu-item index="/loanAffirmList"  @click="skip('loanAffirmList')" v-if="currentUserPermissions.indexOf('business:loan:confirm') != -1"><i class="el-icon-document"></i>放款确认</el-menu-item>
          </el-submenu>

          <el-submenu index="7" v-if="currentUserPermissions.indexOf('business:package') != -1">
            <template slot="title"><i class="el-icon-document"></i>资料包配置</template>
            <el-menu-item index="/dataPackage" @click="skip('dataPackage')" v-if="currentUserPermissions.indexOf('business:package:zip') != -1"><i class="el-icon-document"></i>资料包</el-menu-item>
            <el-menu-item index="/pdfPackage" @click="skip('pdfPackage')" v-if="currentUserPermissions.indexOf('business:package:pdf') != -1"><i class="el-icon-document"></i>pdf资料包</el-menu-item>
          </el-submenu>
          <el-submenu index="8" v-if="currentUserPermissions.indexOf('business:callback') != -1">
            <template slot="title"><i class="el-icon-document"></i>初次回访</template>
            <el-menu-item index="/firstCallBackList" @click="skip('firstCallBackList')" v-if="currentUserPermissions.indexOf('business:callback:list') != -1"><i class="el-icon-document"></i>初次回访列表</el-menu-item>
            <el-menu-item index="/firstCallBackAffirmList" @click="skip('firstCallBackAffirmList')" v-if="currentUserPermissions.indexOf('business:callback:confirm') != -1"><i class="el-icon-document"></i>初次回访确认</el-menu-item>
          </el-submenu>

          <el-submenu index="9" v-if="currentUserPermissions.indexOf('business:declare') != -1">
            <template slot="title"><i class="el-icon-document"></i>解抵押</template>
            <el-menu-item index="/declareList" @click="skip('declareList')" v-if="currentUserPermissions.indexOf('business:declare:list') != -1"><i class="el-icon-document"></i>解抵押网上申报</el-menu-item>
          </el-submenu>


        </el-menu>
      </el-col>
    </div>
    <!-- 所有右侧内容，包括视图 -->
    <div class="allRight">
      <!-- 页面顶部title -->
      <div class="tittleWrap">
        <div class="allTitle">
          <!-- 控制导航栏的按钮 -->
          <div class="showNavBtn">
            asdf
          </div>
          <img src="./assets/logo.png"/><span>业务管理系统</span>
          <i class="goHomePage" @click="goHome"></i>
        </div>
      </div>

      <keep-alive :include="arr">
        <router-view class="view"></router-view>
      </keep-alive>

    </div>

    <pic-preview></pic-preview>
  </div>
</template>

<script>
  import './style/public.css'
  import './style/moduleStyle.css'
  import './style/index.css'
  import PicPreview from "./picModule/picPreview";
  export default {
    components: {PicPreview},
    name: 'app',
    data () {
      return {
        allRoute:[
          "/greffierManage",
          "/dataPackage",
          "/pdfPackage",
          "/firstCallBackList",
          "/firstCallBackAffirmList",
          "/greffierDistribution",
          '/enquiryList',
          "/orderList",
          "/creditCheckList",
          "/addOrderList",
          "/trialPhaseList",
          "/surveyerAllotList",
          "/surveyEvidenceUploadList",
          "/initialConsummate",
          "/accessToValueList",
          "/survey",
          "/infoPassHaulList",
          "/infoInspectList",
          "/packageList",
          "/contractPreparingList",
          "/contractReviewList",
          "/surveyerManage",
          "/uploadEvidenceList",
          "/costAffirmList",
          "/contractMakeList",
          "/contractManageList",
          "/dataCheckList",
          "/notrizationRegusterList",
          "/distributionList",
          "/registerList",
          "/firstCheckList",
          "/lastCheckList",
          "/loanApplyList",
          "/loanList",
          "/loanAffirmList",
          "/dataPackage",
          "/pdfPackage",
          "/orderList",
          "/addOrderList",
          "/trialPhaseList",
          "/initialConsummate",
          "/accessToValueList",
          "/survey",
          "/infoPassHaulList",
          "/creditUploadList",
          "/infoInspectList",
          "/packageList",
          "/contractPreparingList",
          "/uploadEvidenceList",
          "/costAffirmList",
          "/contractMakeList",
          "/contractManageList",
          "/dataCheckList",
          "/notrizationRegusterList",
          "/distributionList",
          "/registerList",
          "/firstCheckList",
          "/lastCheckList",
          "/loanApplyList",
          "/loanList",
          "/loanAffirmList",
          "/dataPackage",
          "/pdfPackage",
          "/faceTrialList",
          "/aisleAffirmList",
          "/contractConfirmList",
          "/declareList",
          "/appointmentList"
        ],
        activeNavRoute:'',
        currentUserPermissions:this.currentUserPermissions,
        showImageBoxBol : false,
        nowImageUrlIndex:0,
        allImageUrls:[],
        imgRotateZ:0,
        scale:1,
        arr:[],
      }
    },
    watch : {
      $route (to,from){
        if(this.allRoute.indexOf(to.path) != -1){
          this.activeNavRoute = to.path;
          sessionStorage.activeNavRouter = to.path;
          this.showImageBoxBol = false
        }
      }
    },
    methods : {
      skip(str){
        if(this.arr.length){
          this.arr = [];
        }
        this.arr.push(str);
      },
      goHome () {
        window.location.href = this.homePage
      }
    },
    created () {
      this.activeNavRoute = sessionStorage.activeNavRouter
    },
    beforeDestroy(){
      delete sessionStorage.activeNavRouter
    }
  }
</script>

