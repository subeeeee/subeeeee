<template>
  <div class="infoPassBaul public">
    <h2>资料上传</h2>
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}}</p>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借款信息" name="1">
      </el-tab-pane>
      <i class="red title1" v-show="isFullLoan == 0"></i>
      <el-tab-pane label="借款人信息" name="2">
      </el-tab-pane>
      <i class="red person1" v-show="isFullCust == 0"></i>
      <el-tab-pane label="抵押物信息" name="3">
      </el-tab-pane>
      <i class="red pledeg11" v-show="isFullGua != 11"></i>
      <el-tab-pane label="调查环节综述" name="4">
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <backTop></backTop>
  </div>
</template>

<script>
  import "./../../style/infoPassBaul.css";
  import backTop from '@/component/com/backTop'
  export default {
    name: "infoPassBaul",
    data() {
      return {
        activeName: "1",
        bussNo: "",
        isFullCust:'1',
        isFullGua:'11',
        isFullLoan:'1',
        //  isFullSurvey:'1',
        previousUrl:'/infoPassHaul/borrowMoney'
      };
    },
    components:{
      backTop
    },
    methods: {
      callBack (str) {
        this.$router.push({
          path:str,
          query :this.$route.query
        })
      },
      handleClick(b) {
        let path = "";
        if (b.index == "0") {
          path = "/infoPassHaul/borrowMoney";
        } else if (b.index == "1") {
          path = "/infoPassHaul/borrowMoneyPerson";
        } else if (b.index == "2") {
          path = "/infoPassHaul/pledge";
        } else {
          path = "/infoPassHaul/borrowLink";
        }
        if(this.previousUrl == '/infoPassHaul/borrowMoneyPerson'){
          this.$confirm('请确保信息已保存再切换，否则信息将遗失。','提示',{
            confirmButtonText: '我已保存，切换页面',
            cancelButtonText: '去保存',
          }).then(() => {
            this.previousUrl = path;
            this.$router.push({
              path:path,
              query :{
                bussNo:this.$route.query.bussNo,
                areaCode : this.$route.query.areaCode
              }
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
      let path = this.$route.path.substring( this.$route.path.lastIndexOf("/") + 1 );
      switch (path) {
        case "borrowMoney":
          this.activeName = "1";
          break;
        case "borrowMoneyPerson":
          this.activeName = "2";
          break;
        case "pledge":
          this.activeName = "3";
          break;
        case "borrowLink":
          this.activeName = "4";
          break;
      }
      window.bus.$on('isFullLoanShow',(reg)=>{
        this.isFullLoan = reg;
        window.bus.isFullLoan = this.isFullLoan
      });

      window.bus.$on('isFullCustShow',(reg)=>{
        this.isFullCust = reg;
        window.bus.isFullCust = this.isFullCust
      })

      window.bus.$on('isFullGuaShow',(reg)=>{
        this.isFullGua = reg
        window.bus.isFullGua = this.isFullGua
      })

      // window.bus.$on('isFullSurveyShow',(reg)=>{
      //   this.isFullSurvey = reg
      // })
      $.post(this._path + '/dataReturn/queryBusDataReturnByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        this.isFullCust= res.data.busDataVo.isFullCust;
        this.isFullGua= res.data.busDataVo.isFullGua;
        this.isFullLoan= !res.data.busDataVo.isFullLoan?'0':res.data.busDataVo.isFullLoan;

        !this.isFullGua?this.isFullGua = '00':this.isFullGua = this.isFullGua
        !this.isFullCust?this.isFullCust = '0':this.isFullCust = this.isFullCust
        window.bus.isFullLoan =  this.isFullLoan;
        window.bus.isFullCust = res.data.busDataVo.isFullCust;
        window.bus.isFullGua  = res.data.busDataVo.isFullGua
      })
      // window.bus.$on('dataReturn',() => {
      //
      // })
    },
    beforeDestroy () {
      // window.bus.$off('dataReturn')
    }
  };
</script>
