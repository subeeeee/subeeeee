<template>
  <div class="again public infoPassBaul">

    <h2>补充材料</h2>
	<p class="title">订单编号 ：{{$route.query.bussNo}}
    <!--<span style="margin-left: 20px;">申报产品 : <span :class="choosePro=='没有申报产品'?'red_span':''">{{choosePro}}</span></span>-->
  </p>
	  <el-tabs v-model="activeName"   @tab-click="handleClick">
	    <el-tab-pane label="借款信息" name="1">
	    </el-tab-pane>
      <i class="red title1" v-show="isFullLoan == 0"></i>
	    <el-tab-pane label="借款人信息"  name="2">
	    </el-tab-pane>
      <i class="red person1" v-show="isFullCust == 0"></i>
	    <el-tab-pane label="抵押物信息" name="3">
	    </el-tab-pane>
      <i class="red pledeg11" v-show="isFullGua != 11"></i>
	    <el-tab-pane label="调查环节综述"  name="4">
	    </el-tab-pane>
	  </el-tabs>


  <router-view></router-view>
	<!-- 返回 -->
    <backTop></backTop>
	</div>
</template>

<script>
  import backTop from '@/component/com/backTop'
export default {
  name:'again',
   data () {
    return{
       activeName:'1',
      choosePro:'',
      isFullCust:'1',
      isFullGua:'11',
      isFullLoan:'1',
    }
  },
  components:{
    backTop
  },
  methods:{
		goBack () {
			this.$router.push('/infoInspectList')
		},
  	handleClick(b){
       let path = ''
  		 if(b.index == '0'){
  		 	  path = '/again/borrowerInfoAgain'
  		 }else if(b.index == '1'){
  		 	  path = '/again/borrowInfoAagin'
  		 }else if(b.index == '2'){
  		 	 path = '/again/guaInfoAgain'
  		 }else{
  		 	 path = '/again/surveyLinkInfoAgain'
  		 }
  		 this.$router.push({path,
       query:this.$route.query})
  	}
	},
	created () {
    window.bus.$on('isFullLoan',(reg)=>{
      this.isFullLoan = reg;
      window.bus.isFullLoanB = this.isFullLoan
    });

    window.bus.$on('isFullCust',(reg)=>{
      this.isFullCust = reg;
      window.bus.isFullCustB = this.isFullCust
    })

    window.bus.$on('isFullGua',(reg)=>{
      this.isFullGua = reg
      window.bus.isFullGuaB = this.isFullGua
    })

		let path  = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
		switch (path) {
			case 'borrowerInfoAgain':
			this.activeName = '1';
			break;
			case 'borrowInfoAagin':
			this.activeName = '2';
			break;
			case 'guaInfoAgain':
			this.activeName = '3';
			break;
			case 'surveyLinkInfoAgain':
			this.activeName = '4';
			break;
		}
    $.post(this._path + '/dataCheck/querySummaryInfo',{bussNo:this.$route.query.bussNo},res=>{
      this.choosePro = res.data.dataCheckSummaryInfo.choosePro

      this.isFullCust= res.data.dataCheckSummaryInfo.isFullCust
      this.isFullGua= res.data.dataCheckSummaryInfo.isFullGua
      this.isFullLoan= res.data.dataCheckSummaryInfo.isFullLoan

      window.bus.isFullLoanB  =  this.isFullLoan
      window.bus.isFullCustB = this.isFullCust
      window.bus.isFullGuaB  = this.isFullGua
    })
	}
}
</script>
<style scoped="scoped">
  .red_span{
    color:red;
  }
</style>
