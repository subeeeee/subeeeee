<template>
  <div>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>风控打回意见</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">风控打回操作时间</el-col>
        <el-col :span="21" class="table_td">
          {{busDataMaterialFlow.creatTime}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">需补充材料</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" class="textarea_disabled" disabled v-model="busDataMaterialFlow.material"  placeholder="请输入内容，最多200字。" maxlength="2000"></textarea></div></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">风控打回说明</el-col>
        <el-col :span="21" class="table_td">
          {{busDataMaterialFlow.returnMsg}}
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>补充影像</span></h3>
    </div>
    <p class="font_red module_margin_bottom">
      提示:下方为风控审批后确定的本订单缺失材料或需重新上传的材料，请将材料影像上传至对应位置，且保证上传后的信息为齐全、正确信息，以免风控人员再次打回补充
    </p>
    <el-tabs v-model="activeName" type="card"  @tab-click="handleClick" v-if="imageBol">
      <el-tab-pane :label="`借款人--${cust.custName}`" :name="index" v-for="(cust,index) in custList">
        <image-his-com :flowId="busDataMaterialFlow.id" dataType="a" v-if="cust.id" taskType="136" class="image-cover-style margin_top" :details="$route.query.type !== 'detail'"  :custId="cust.id"></image-his-com>
      </el-tab-pane>
      <el-tab-pane label="其他" name="其他">
        <image-his-com :flowId="busDataMaterialFlow.id" dataType="b"  taskType="136" class="image-cover-style margin_top" :details="$route.query.type !== 'detail'"></image-his-com>
      </el-tab-pane>
    </el-tabs>
    <el-row class=" module_margin_bottom tableInfo margin_top">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">补充说明</el-col>
          <el-col :span="21" class="textareawrap"><div class="textarea"><textarea  :rows="10" :disabled="$route.query.type === 'detail'" v-model="attachMsg"  placeholder="请输入内容，最多500字。" maxlength="500"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <p v-if="imageMustMsg" class="importent">{{imageMustMsg}}</p>
    <div class="last_btn_wrap" v-if="this.$route.query.type !== 'detail'">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="verifyImage">提 交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
    import ImageHisCom from "../../../picModule/imageHisCom";

    export default {
      components: {ImageHisCom},
      name: "attachMsg",
        data(){
          return {
            attachMsg:"",
            custList:[],
            activeName:"0",
            flowId:'',
            imageMustMsg:"",
            busDataMaterialFlow:{},
            isFullCust:"",
            isFullGua:"",
            isFullLoan:"",
            isFullSurvey:"",
            imageBol:false
          }
        },
        methods:{
          handleClick(){},
          verifyImage(){
            this.$http({
              type:'get',
              url:'/flowImage/validateRequiredImageFlow',
              data:{
                flowId:this.busDataMaterialFlow.id,
                taskType:'136'
              },
              callback:res=>{
                if(!res.data.isAllExist){
                  this.imageMustMsg = res.data.isNotExist;
                  return
                }else{
                  this.imageMustMsg = ''
                }
                this.submit()
              }
            })
          },
          submit(){
            let params = {
              attachMsg: this.attachMsg,
              isSaveOrSubmit: 'attach',
              bussNo: this.$route.query.bussNo,
              isFullCust:this.isFullCust,
              isFullGua:this.isFullGua,
              isFullLoan:this.isFullLoan,
              isFullSurvey:this.isFullSurvey,
            };
            this.$confirm('是否确定已提交的材料为准确、完整的材料？点击“确定”即可提交', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http({
                url: "/dataReturn/insertReturnSaveOrSubmit",
                data:params,
                callback: res => {
                  this.$message.success('提交成功');
                  this.$router.push({
                    path:'/infoPassHaulList'
                  })
                }
              })
            })
          }
        },
        created(){
          this.$http({
            url: "/dataReturn/queryBusDataReturnByBussNo",
            data:{
              bussNo:this.$route.query.bussNo
            },
            callback:res=>{
              this.isFullCust = res.data.busDataVo.isFullCust;
              this.isFullGua = res.data.busDataVo.isFullGua;
              this.isFullLoan = res.data.busDataVo.isFullLoan;
              this.isFullSurvey = res.data.busDataVo.isFullSurvey;
            }
          });
          this.$http({
            url: "/custInfo/selectCustInfo",
            data:{
              bussNo:this.$route.query.bussNo
            },
            callback: res => {
              this.custList = res.data.busLoanInfoVoList;
              this.$http({
                url: "/dataReturn/queryCheckReturnInfo",
                data:{
                  bussNo:this.$route.query.bussNo
                },
                callback: res => {
                  this.busDataMaterialFlow  = res.data.busDataMaterialFlowVo;
                  this.imageBol  = true;
                  if(this.$route.query.type == 'detail'){
                    this.attachMsg = res.data.busDataMaterialFlowVo.attachMsg
                  }
                }
              })
            }
          })

        }
    }
</script>

<style scoped>

</style>
