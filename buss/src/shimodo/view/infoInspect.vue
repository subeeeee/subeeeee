<template>
  <div class="infoInspect public">
    <h2>资料核查</h2>
    <p class="title">订单编号 ：{{$route.query.bussNo}}
     <!--<span style="margin-left: 20px;">申报产品 : <span :class="choosePro=='没有申报产品'?'red_span':''">{{choosePro}}</span></span>-->
    </p>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借款信息" name="1"></el-tab-pane>
      <i class="red title" v-show="isFullLoan == 0"></i>
      <el-tab-pane label="借款人信息" name="2"></el-tab-pane>
      <i class="red person" v-show="isFullCust == 0"></i>
      <el-tab-pane label="抵押物信息" name="3"></el-tab-pane>
      <i class="red pledeg1" v-show="isFullGua != 11"></i>
      <el-tab-pane label="调查环节综述" name="4"></el-tab-pane>
      <i class="red pledeg2" v-show="isFullSurvey == 0"></i>
      <el-tab-pane label="核查结论" name="5"></el-tab-pane>
      <el-tab-pane label="打回及补充材料历史" name="6"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <backTop></backTop>
  </div>
</template>

<script>
  import backTop from '@/component/com/backTop'
  export default {
    name:'infoInspect',
    data () {
      return{
        activeName:'1',
        isFullCust:'1',
        isFullGua:'11',
        isFullLoan:'1',
        isFullSurvey:'1',
        perName :'1',
        choosePro:'',
        //上次跳转的页面(需要保存的页面)
        previousUrl:'/infoInspect/inspectBorrowMoney'
      }
    },
    components:{
      backTop
    },
    methods:{
      callBack (str) {
        this.$router.push({
          path:str,
          query :this.$route.query
        })
      },
      handleClick(b){
        let path = ''
        if(b.index == '0'){
          path = '/infoInspect/inspectBorrowMoney'
        }else if(b.index == '1'){
          path = '/infoInspect/inspectbmPerson'
        }else if(b.index == '2'){
          path = '/infoInspect/inspectPledge'
        }else if(b.index == '3'){
          path = '/infoInspect/inspectBorrowLink'
        }else if(b.index == '4'){
          path = '/infoInspect/inspectConclusion'
        }else {
          path = '/infoInspect/inspectHistory'
        }
        if(this.previousUrl == '/infoInspect/inspectbmPerson') {
          this.$confirm('请确保信息以保存再切换，否则信息将遗失。','提示',{
            confirmButtonText: '我已保存，切换页面',
            cancelButtonText: '去保存',
          }).then(_ => {
            this.previousUrl = path;
            this.$router.push({
              path:path,
              query :this.$route.query
            });
          }).catch(() => {
            this.activeName = '2'
          })
        }else{
          window.bus.$emit(this.previousUrl,this.callBack,path);
          this.previousUrl = path;
        }

      }
    },
    created() {
      this.previousUrl = location.href.split('#')[1].split('?')[0];
      let path = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
      switch (path) {
        case 'inspectBorrowMoney':
          this.activeName = '1';
          break;
        case 'inspectbmPerson':
          this.activeName = '2';
          break;
        case 'inspectPledge':
          this.activeName = '3';
          break;
        case 'inspectBorrowLink':
          this.activeName = '4';
          break;
        case 'inspectConclusion':
          this.activeName = '5';
          break;
        case 'inspectHistory':
          this.activeName = '6';
         break;

      }
      window.bus.$on('isFullLoanShowR', (reg) => {
        this.isFullLoan = reg;
        window.bus.isFullLoanR = this.isFullLoan
      })

      window.bus.$on('isFullCustShowR', (reg) => {
        this.isFullCust = reg;
        window.bus.isFullCustR = this.isFullCust
      })

      window.bus.$on('isFullGuaShowR', (reg) => {
        this.isFullGua = reg;
        window.bus.isFullGuaR = this.isFullGua
      })
      window.bus.$on('isFullSurveyR', (reg) => {
        this.isFullSurvey = reg;
        console.log(reg);
        window.bus.isFullSurveyR = this.isFullSurvey
      })

      $.post(this._path + '/dataCheck/querySummaryInfo',{bussNo:this.$route.query.bussNo},res=>{
        this.isFullCust= res.data.dataCheckSummaryInfo.isFullCust
        this.isFullGua= res.data.dataCheckSummaryInfo.isFullGua
        this.isFullLoan= res.data.dataCheckSummaryInfo.isFullLoan
        this.isFullSurvey= res.data.dataCheckSummaryInfo.isFullSurvey
        this.choosePro = res.data.dataCheckSummaryInfo.choosePro

        !this.isFullGua?this.isFullGua = '00':this.isFullGua = this.isFullGua
        !this.isFullCust?this.isFullCust = '0':this.isFullCust = this.isFullCust
        !this.isFullLoan?this.isFullLoan = '0':this.isFullLoan = this.isFullLoan
        !this.isFullSurvey?this.isFullSurvey = '0':this.isFullSurvey = this.isFullSurvey

        window.bus.isFullLoanR  =  res.data.dataCheckSummaryInfo.isFullLoan
        window.bus.isFullCustR = res.data.dataCheckSummaryInfo.isFullCust
        window.bus.isFullGuaR  = res.data.dataCheckSummaryInfo.isFullGua
        window.bus.isFullSurveyR  = res.data.dataCheckSummaryInfo.isFullSurvey
      })
    }
  }

</script>
<style scoped="scoped">
  .red_span{
    color:red;
  }
</style>
