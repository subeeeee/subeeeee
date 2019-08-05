<template>
  <div class="infoInspect_details public">

    <h2>资料核查详情</h2>
    <p class="title">订单编号 ：{{$route.query.bussNo}}
      <!--<span style="margin-left: 20px;">申报产品 : <span :class="choosePro=='没有申报产品'?'red_span':''">{{choosePro}}</span></span>-->
    </p>

	  <el-tabs v-model="activeName"   @tab-click="handleClick">
	    <el-tab-pane label="借款信息" name="1">
	    </el-tab-pane>
	    <el-tab-pane label="借款人信息"  name="2">
	    </el-tab-pane>
	    <el-tab-pane label="抵押物信息" name="3">
	    </el-tab-pane>
	    <el-tab-pane label="调查环节综述"  name="4">
	    </el-tab-pane>
      <el-tab-pane label="核查结论"  name="5">
      </el-tab-pane>
      <el-tab-pane label="打回及补充材料历史"  name="6">
      </el-tab-pane>
	  </el-tabs>


  <router-view></router-view>
	<!-- 返回 -->
	<el-col :span="24" class="buttom_btn_warp">
		<el-col :span="4" :offset="offsetNum"><el-button size="small" class="buttom_btn" @click="goBack">返回</el-button></el-col>
	</el-col>
    <backTop></backTop>
	</div>
</template>

<script>
  import backTop from '@/component/com/backTop'
export default {
  name: "infoInspect_details",
  data() {
    return {
      activeName: "1",
      offsetNum:11,
      choosePro:''
    };
  },
  components:{
    backTop
  },
  methods: {
    goBack() {
      this.$router.push("/infoInspectList");
    },
    handleClick(b) {
      let path = "";
      if (b.index == "0") {
        path = "/infoInspect_details/inspectBorrowMoney_details";
        this.offsetNum = 11
      } else if (b.index == "1") {
        path = "/infoInspect_details/inspectbmPerson_details";
        this.offsetNum = 11
      } else if (b.index == "2") {
        path = "/infoInspect_details/inspectPledge_details";
        this.offsetNum = 11
      } else if(b.index == '3'){
        path = "/infoInspect_details/inspectBorrowLink_details";
        this.offsetNum = 9
      }else if(b.index == '4'){
        path = "/infoInspect_details/inspectConclusion";
        this.offsetNum = 11
      }else{
        path = "/infoInspect_details/inspectHistory";
        this.offsetNum = 11
      }
      this.$router.push({ path: path ,query:this.$route.query});
    }
  },
  created() {
    let path = this.$route.path.substring(
      this.$route.path.lastIndexOf("/") + 1
    );
    switch (path) {
      case "inspectBorrowMoney_details":
        this.activeName = "1";
        this.offsetNum = 11;
        break;
      case "inspectbmPerson_details":
        this.activeName = "2";
        this.offsetNum = 11;
        break;
      case "inspectPledge_details":
        this.activeName = "3";
        this.offsetNum = 11;
        break;
      case "inspectBorrowLink_details":
        this.activeName = "4";
        this.offsetNum = 9;
        break;
      case "inspectConclusion":
        this.activeName = "5";
        this.offsetNum = 11;
        break;
      case "inspectHistory":
        this.activeName = "6";
        this.offsetNum = 11;
        break;
    }
    $.post(this._path + '/dataCheck/querySummaryInfo',{bussNo:this.$route.query.bussNo},res=>{
      this.choosePro = res.data.dataCheckSummaryInfo.choosePro
    })
  }
};
</script>
<style scoped>
  .red_span{
    color: red;
  }
</style>
