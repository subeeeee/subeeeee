<template>
  <div class="public">
    <h2>下户费凭证上传</h2>
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}}</p>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
        <el-col :span="3" class="table_td">抵押物坐落<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">经纪人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
        <el-col :span="3" class="table_td">经纪人手机号<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>预约下户信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">预约下户时间<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
        <el-col :span="3" class="table_td">应缴纳下户费金额(元)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <pic-module class="module_margin_bottom" :bussNo="flowId" :custId="custNo" dataType="1" taskType="132" :details="false"></pic-module>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">备注</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :class="isInfo?'textarea_disabled':''" placeholder="可填写转账备注，200字以内" :disabled="isInfo" :rows="10" v-model="applyOpinion" maxlength="200"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>凭证上传记录</span></h3>
    </div>
    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="上传任务员" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="areaName" label="上传时间" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" min-width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="info(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn" v-if="!isInfo"><el-button @click="submit">提 交</el-button></li>
        <li class="last_btn" v-if="isInfo"><el-button @click="goback">返 回</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PicModule from "../../../picModule/picModule";

  export default {
    components: {PicModule},
    name: "survey-evidence-check",
    props:{
      isInfo:Boolean
    },
    data(){
      return{

      }
    },
    methods:{
      info(row){

      },

    }
  }
</script>

<style scoped>

</style>
