<template>
  <div>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>打回及补充材料历史</span></h3>
    </div>
    <div v-for="(item,index) in tableList" class="margin_top">
      <el-row class="module_margin_bottom tableInfo" >
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">记录</el-col>
          <el-col :span="20" class="table_td">
            {{index + 1}}
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" >
          <el-col :span="4" class="table_td">风控打回操作时间</el-col>
          <el-col :span="20" class="table_td">
            {{item.creatTime}}&nbsp;
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">需补充材料</el-col>
          <el-col :span="20 " class="textareawrap" >
            <div class="textarea"><textarea class="textarea_disabled disabled_fff"  :rows="5" disabled  v-model="item.material" ></textarea></div>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">风控打回说明</el-col>
          <el-col :span="20 " class="textareawrap" >
            <div class="textarea"><textarea class="textarea_disabled disabled_fff"  :rows="5" disabled  v-model="item.returnMsg" ></textarea></div>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr" >
          <el-col :span="4" class="table_td">补充材料时间 </el-col>
          <el-col :span="20" class="table_td">{{item.finishTime}}</el-col>
        </el-col>
        <el-col :span="24" class="table_tr" >
          <el-col :span="4" class="table_td">补充材料任务员 </el-col>
          <el-col :span="20" class="table_td">
            {{item.taskPerName}}
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">补充说明</el-col>
          <el-col :span="20 " class="textareawrap" >
            <div class="textarea"><textarea class="textarea_disabled disabled_fff"  :rows="5" disabled  v-model="item.attachMsg" ></textarea></div>
          </el-col>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" v-if="item.id">
        <el-tab-pane :label="`借款人--${cust.custName}`" :name="index" v-for="(cust,index) in custList">
          <image-his-com :flowId="item.id" dataType="a"  taskType="136" class="image-cover-style margin_top" :details="false" :custId="cust.id"></image-his-com>
        </el-tab-pane>
        <el-tab-pane label="其他" name="其他">
          <image-his-com :flowId="item.id" dataType="b"  taskType="136" class="image-cover-style margin_top" :details="false" ></image-his-com>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    import ImageHisCom from "../../../picModule/imageHisCom";

    export default {
      components: {ImageHisCom},
      name: "supplement-history",
        data(){
          return {
            tableList:[{},{}],
            custList:[],
          }
        },
        methods:{

        },
        created(){
          this.$http({
            url: "/dataCheck/selectDataMaterialFlow",
            data:{
              bussNo:this.$route.query.bussNo
            },
            callback: res => {
              this.tableList = res.data.busDataMaterialFlowVoList;
              this.$http({
                url: "/custInfo/selectCustInfo",
                data:{
                  bussNo:this.$route.query.bussNo
                },
                callback: res => {
                  this.custList = res.data.busLoanInfoVoList
                }
              })
            }
          })
        }
    }
</script>

<style scoped>

</style>
