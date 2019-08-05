<template>
  <div class="infoPassBaul public">
    <h2>资料上传</h2>
    <p class="title">订单编号 ：{{$route.query.bussNo}}</p >
    <el-tabs v-model="activeName"   @tab-click="handleClick">
      <!--<el-tab-pane label="借款信息" name="borrow_add"></el-tab-pane>-->
      <!--<el-tab-pane label="借款人信息"  name="borrower_add"></el-tab-pane>-->
      <!--<el-tab-pane label="抵押物信息" name="gua_add"></el-tab-pane>-->
      <!--<el-tab-pane label="调查环节综述"  name="borrowLink_add"></el-tab-pane>-->
      <el-tab-pane label="补充材料"  name="supplement_add"></el-tab-pane>
      <el-tab-pane label="打回及补充材料历史"  name="supplementHistory"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <backTop></backTop>
  </div>
</template>

<script>
  import './../../style/infoPassBaul.css';
  import backTop from '@/component/com/backTop'
  export default {
    name:'dataReturn_add',
    components:{
      backTop
    },
    data () {
      return{
        activeName:'1',
      }
    },
    methods:{
      handleClick(b){
        this.$router.push({
          path:'/dataReturn_add/'+b.name,
          query:this.$route.query
        })
      },
      goback () {
        this.$router.push('/infoPassHaulList')
      }
    },
    created () {
      let path  = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
      this.activeName = path;
    }
  }
</script>
