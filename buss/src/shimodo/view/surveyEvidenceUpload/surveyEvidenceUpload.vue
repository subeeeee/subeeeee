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
        <el-col :span="9" class="table_td">{{busReturnCostInfoVO.custName}}</el-col>
        <el-col :span="3" class="table_td">抵押物坐落<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{guaAddress}}</el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">经纪人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{brokerName}}</el-col>
        <el-col :span="3" class="table_td">经纪人手机号<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{brokerMobile}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>预约下户信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">预约下户时间<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{busReturnCostInfoVO.orderTime}}</el-col>
        <el-col :span="3" class="table_td">应缴纳下户费金额(元)<span class="importent">*</span></el-col>
        <el-col :span="9" class="table_td">{{busReturnCostInfoVO.returnCost}}</el-col>
      </el-col>
    </el-row>
    <pic-module class="module_margin_bottom" v-if="flowId" :bussNo="flowId"  dataType="1" taskType="132" :details="!isInfo"></pic-module>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="4" class="table_td textarea_title">备注</el-col>
          <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :class="isInfo?'textarea_disabled':''" placeholder="可填写转账备注，200字以内" :disabled="isInfo" :rows="10" v-model="remark" maxlength="200"></textarea></div></el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>凭证上传记录</span></h3>
    </div>
    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="reTaskPreName"  label="上传任务员" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="reCreateTime" label="上传时间" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" label="操作" min-width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="info(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn" v-if="!isInfo"><el-button @click="sub">提 交</el-button></li>
        <li class="last_btn" v-if="isInfo"><el-button @click="goback">返 回</el-button></li>
      </ul>
    </div>

    <el-dialog title="提示信息" :visible.sync="isShow" size="tiny">
      <el-row>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="12" class="mark_table_div">应缴纳下户费金额(元)</el-col>
          <el-col :span="12"  class="mark_table_div">
            <span class="importent">{{busReturnCostInfoVO.returnCost}}</span>
          </el-col>
        </el-col>
        <p style="padding: 0 20px">是否确认客户已足额缴纳下户费？</p>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定提交</el-button>
      </span>
    </el-dialog>

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
        busReturnCostInfoVO:{},
        remark:'',
        tableData:[],
        flowId:"",
        guaAddress:"",
        brokerName:"",
        brokerMobile:'',
        isShow:false
      }
    },
    methods:{
      sub(){
        this.isShow = true
      },
      submit(){
        this.$http({
          url:"/busReCostInfo/busReCostSubmit",
          data:{flowId:this.flowId,bussNo:this.$route.query.bussNo,remark:this.remark,oldFlowId:this.busReturnCostInfoVO.flowId},
          callback:res=>{
            this.$message.success('提交成功');
            this.$router.push({
              path:'/surveyEvidenceUploadList',
            })
          },
          callback9999:res=>{
            this.$message.error(res.resultMsg);
            this.$router.push({
              path:'/surveyEvidenceUploadList',
            })
          },
          callback1234:res=>{
            location.reload()
          }
        })
      },
      goback(){
        this.$router.push({
          path:'/surveyEvidenceUploadList',
        })
      },
      info(row){
        this.$router.push({
          path:'/surveyEvidenceUpRecordInfo',
          query:row
        })
      },

    },
    created(){
      this.$http({
        url:'/busReCostInfo/selectBusReCostInfo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.busReturnCostInfoVO = res.data.busReturnCostInfoVO;
          this.remark = res.data.busReturnCostInfoVO.remark;
          if(this.isInfo){
            this.flowId = res.data.busReturnCostInfoVO.flowId;
          }else{
            this.flowId = res.data.flowId;
          }
        }
      })
      this.$http({
        url:'/busReCostInfo/selectBusReCostFlow',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
         this.tableData = res.data.busReCostFlowVOList
        }
      })
      this.$http({
        url:'/assess/selectAssessInfo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.guaAddress = res.data.assessGuaInfoVo.guaAddress + res.data.assessGuaInfoVo.guaBuilding + res.data.assessGuaInfoVo.guaNumber;
        }
      });
      this.$http({
        url:'/business/queryCustBaseInfoHide',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.brokerName = res.data.custBaseInfo.brokerName;
          this.brokerMobile = res.data.custBaseInfo.brokerMobile
        }
      });

    }
  }
</script>

<style scoped>

</style>
