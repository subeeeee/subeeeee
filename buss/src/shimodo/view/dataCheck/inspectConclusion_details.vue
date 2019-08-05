<template>
  <div>
    <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 风控打回记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%" class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="fromType" label="打回节点" width="180"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="fromName" label="操作任务员" width="180"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="操作时间" min-width="180"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回意见" min-width="200"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="previousTime" label="资料核查提交时间" min-width="180"> </el-table-column>
      <el-table-column header-align="center" align="center" prop="previousName" label="资料核查任务员" width="180"> </el-table-column>
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 核查结论</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">是否需要打回补充材料<span class="importent">*</span></el-col>
        <el-col :span="14" class="table_td">
          <el-col :span="14" :offset="1">
            <el-radio-group size="small" disabled  v-model="isMaterial">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="module_margin_bottom tableInfo table_height" v-if="isMaterial == '1'">
      <el-col :span="24" class="table_tr textarea_module">
        <el-col :span="3" class="table_td textarea_title">补充材料<span class="importent">*</span></el-col>
        <el-col :span="21" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled class="disabled_fff textarea_disabled" placeholder="请输入补充材料。" v-model="material" ></textarea></div>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module">
        <el-col :span="3" class="table_td textarea_title">打回说明<span class="importent">*</span></el-col>
        <el-col :span="21" class="textareawrap"><div class="textarea"><textarea :rows="10" disabled class="disabled_fff textarea_disabled" placeholder="请输入打回意见。" v-model="returnMsg" ></textarea></div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "inspect-conclusion_details",
        data(){
          return {
            isMaterial:"",
            tableData:"",
            riskOpinion:"",
            busDataMaterialFlow:{},
            returnMsg:"",
          }
        },
        methods:{

        },
        created(){
          this.$http({
            url:'/dataCheck/querySummaryInfo',
            data:{bussNo:this.$route.query.bussNo},
            callback:res=>{
              this.isMaterial= res.data.dataCheckSummaryInfo.isMaterial;
              this.material= res.data.dataCheckSummaryInfo.material
              this.returnMsg= res.data.dataCheckSummaryInfo.returnMsg
            }
          });
          this.$http({
            url:'/dataCheck/riskOpinionFlowList',
            data:{bussNo:this.$route.query.bussNo},
            callback:res=>{
              this.tableData  = res.data.riskOpinionFlowVoList
            }
          });
        }
    }
</script>

<style scoped>

</style>
