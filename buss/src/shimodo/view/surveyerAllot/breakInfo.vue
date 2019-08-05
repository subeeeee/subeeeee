<template>
  <div class="public">
    <h2>爽约详情</h2>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">预约下户时间</el-col>
        <el-col :span="9" class="table_td">{{$route.query.orderTime}}</el-col>
        <el-col :span="3" class="table_td">分配下户员</el-col>
        <el-col :span="9" class="table_td">{{$route.query.taskPreName}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">联系人及联系方式</el-col>
        <el-col :span="9" class="table_td">{{$route.query.contactName}}/{{$route.query.contactMobile}}</el-col>
        <el-col :span="3" class="table_td">爽约时间</el-col>
        <el-col :span="9" class="table_td">{{$route.query.createTime}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">爽约原因</el-col>
        <el-col :span="18" class="table_td">{{$route.query.breakReason|breakReasonFn}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="3" class="table_td textarea_title">备注<i class="importent">*</i></el-col>
        <el-col :span="21" class="textareawrap"><div class="textarea"><textarea disabled class="textarea_disabled" :rows="10"  v-model="refuseReason"  placeholder="可填写备注信息，100字以内" maxlength="100"></textarea></div></el-col>
      </el-col>
    </el-row>
    <pic-module v-if="$route.query.breakReason == '01'" class="module_margin_bottom" :bussNo="$route.query.id"  dataType="2" taskType="130" :details="false"></pic-module>
    <pic-module v-if="$route.query.breakReason == '03'" class="module_margin_bottom" :bussNo="$route.query.id"  dataType="1" taskType="130" :details="false"></pic-module>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="goBack">返回</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "break-info",
        data(){
          return {
            selectOrderVO:{}
          }
        },
        methods:{
          goBack(){
            this.$router.go(-1)
          }
        },
        created(){

        },
        filters:{
          breakReasonFn(val){
            let str = '';
            switch (val){
              case '01':
                str = '临近预约下户时间，客户无法取消预约，已线下联系下户员取消下户';
                break;
              case '02':
                str = '下户员未去下户';
                break;
              case '03':
                str = '下户员抵达抵押物周边，未进入抵押物';
                break;
            }
            return str
          }
        }
    }
</script>

<style scoped>

</style>
