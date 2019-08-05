<template>
  <div class="infoPassBaul public">
    <h2>资料上传详情</h2>
    <p class="title">订单编号 ：{{$route.query.bussNo}}</p >
    <el-tabs v-model="activeName"   @tab-click="handleClick">
      <el-tab-pane label="借款信息" name="1"></el-tab-pane>
      <el-tab-pane label="借款人信息"  name="2"></el-tab-pane>
      <el-tab-pane label="抵押物信息" name="3"></el-tab-pane>
      <el-tab-pane label="调查环节综述"  name="4"></el-tab-pane>
      <el-tab-pane label="补充材料"  name="5"></el-tab-pane>
      <el-tab-pane label="打回及补充材料历史"  name="6"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="goback()">返 回</el-button></li>
      </ul>
    </div>
    <backTop></backTop>
  </div>
</template>

<script>
  import './../../style/infoPassBaul.css';
  import backTop from '@/component/com/backTop'
  export default {
    name:'infoPassBaul',
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
        let path = ''
        if(b.index == '0'){
          path = '/infoPassHaul_detail/borrowMoney_detail'
        }else if(b.index == '1'){
          path = '/infoPassHaul_detail/borrowMoneyPerson_detail'
        }else if(b.index == '2'){
          path = '/infoPassHaul_detail/pledge_detail'
        }else if(b.index == '3'){
          path = '/infoPassHaul_detail/borrowLink_detail'
        }else if(b.index == '4'){
          path = '/infoPassHaul_detail/supplement_detail'
        }else{
          path = '/infoPassHaul_detail/supplementHistory'
        }
        this.$router.push({
          path:path,
          query:this.$route.query
        })
      },
      goback () {
        this.$router.push('/infoPassHaulList')
      }
    },
    created () {
      let path  = this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1);
      switch (path) {
        case 'borrowMoney_detail':
          this.activeName = '1';
          break;
        case 'borrowMoneyPerson_detail':
          this.activeName = '2';
          break;
        case 'pledge_detail':
          this.activeName = '3';
          break;
        case 'borrowLink_detail':
          this.activeName = '4';
          break;
        case 'supplement_detail':
          this.activeName = '5';
          break;
        case 'supplementHistory':
          this.activeName = '5';
          break;

      }
    }
  }
</script>
