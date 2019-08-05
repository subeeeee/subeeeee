<template>
  <div class="infoPassBaul public">
    <h2>合同信息确认</h2>
    <el-row :span="24" class="module_margin_bottom">
      <el-col :span="8">
        <p class="orderNo">订单编号 ：{{$route.query.bussNo}}</p>
      </el-col>
      <!--<el-col :span="8">-->
        <!--<p class="orderNo">合同序号 ：{{$route.query.compactNum?$route.query.bussNo:'&#45;&#45;'}}</p>-->
      <!--</el-col>-->
      <el-col :span="8">
        <p class="orderNo">借款人姓名 ：{{$route.query.custName}}</p>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>请核对以下信息</span></h3>
    </div>
    <el-tabs class="module_margin_bottom" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="借款合同信息" name="borrow"></el-tab-pane>
      <el-tab-pane label="抵押合同信息" name="mortgage"></el-tab-pane>
      <el-tab-pane label="通道及面签确认" name="affirm"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
    <back-top></back-top>
  </div>
</template>

<script>

  import BackTop from "../../../component/com/backTop";

  export default {
    name: "contractConfirmTab",
    data() {
      return {
        activeName: "1",
        borrowINfo:{}
      };
    },
    components:{
      BackTop

    },
    methods: {
      handleClick(b) {
        let path = '/contractConfirmTab/'+b.name;
        this.$router.push({
          path:path,
          query:this.$route.query
        })
      }
    },
    created() {
      this.previousUrl = location.href.split('#')[1].split('?')[0];
      this.activeName = this.$route.path.substring( this.$route.path.lastIndexOf("/") + 1 );
    },
  };
</script>
