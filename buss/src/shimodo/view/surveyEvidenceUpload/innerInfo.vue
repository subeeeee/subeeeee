<template>
  <div class="public">
    <h2>下户费凭证详情</h2>
    <p class="orderNo">上传任务员 : {{$route.query.reTaskPreName}} &emsp;上传时间 : {{$route.query.reCreateTime}}</p>

    <pic-module class="module_margin_bottom" :bussNo="$route.query.id"  dataType="1" taskType="132" :details="false"></pic-module>

    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">备注</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea   :disabled="true" :rows="10" v-model="$route.query.reRemark" maxlength="200"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div>
      <p class="orderNo">{{$route.query.isReturn == '1'?'财务打回时间':'财务确认时间'}} : {{$route.query.appCreateTime}}</p>
      <pic-module class="module_margin_bottom" v-if="$route.query.isReturn == '0'" :bussNo="$route.query.id"  dataType="1" taskType="133" :details="false"></pic-module>
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="24" class="table_tr textarea_module" >
            <el-col :span="4" class="table_td textarea_title">{{$route.query.isReturn == '1'?'打回原因':'备注'}}</el-col>
            <el-col :span="20" class="textareawrap"><div class="textarea"><textarea   :disabled="true" :rows="10" v-model="$route.query.appRemark" maxlength="200"></textarea></div></el-col>
          </el-col>
        </el-col>
      </el-row>
    </div>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="goBack">返 回</el-button></li>
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
    },
    data(){
      return{

      }
    },
    methods:{
      goBack(){
        this.$router.push({
          path:'/surveyEvidenceUploadList'
        })
      },

    }
  }
</script>

<style scoped>

</style>
