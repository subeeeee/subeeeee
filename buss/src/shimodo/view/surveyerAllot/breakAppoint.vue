<template>
  <div class="public">
    <h2>爽约</h2>
    <allot-public-com></allot-public-com>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>当前预约信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">当前预约下户时间</el-col>
        <el-col :span="8" class="table_td">
          {{busDistributionInfoVO.orderTime}}&nbsp;
        </el-col>
        <el-col :span="4" class="table_td">分配下户员</el-col>
        <el-col :span="8" class="table_td">
          {{busDistributionInfoVO.returnPreName}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人及联系方式</el-col>
        <el-col :span="8" class="table_td">
          {{busDistributionInfoVO.contactName}}&nbsp;/  {{busDistributionInfoVO.contactMobile}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">爽约原因 <span class="importent">*</span> </el-col>
        <el-col :span="20" class="table_td">
          <el-radio-group v-model="breakReason" @change="breakReasonFn" :disabled="disabled">
            <el-radio label="01">临近预约下户时间，客户无法取消预约，已线下联系下户员取消下户</el-radio>
            <el-radio label="02">下户员未去下户</el-radio>
            <el-radio label="03">下户员抵达抵押物周边，未进入抵押物</el-radio>
          </el-radio-group>
        </el-col>
      </el-col>
    </el-row>
    <pic-module v-show="breakReason == '01'" v-if="flowId" class="module_margin_bottom" :bussNo="flowId"  dataType="2" taskType="130" :details="true"></pic-module>
    <pic-module v-show="breakReason == '03'" v-if="flowId" class="module_margin_bottom" :bussNo="flowId"  dataType="1" taskType="130" :details="true"></pic-module>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注<i class="importent">*</i></el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea :rows="10"  v-model="refuseReason"  placeholder="可填写备注信息，100字以内" maxlength="100"></textarea></div></el-col>
      </el-col>
    </el-row>
    <p v-if="title" class="importent">{{title}}</p>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="btnClick">爽约</el-button></li>
      </ul>
    </div>

  </div>
</template>

<script>
  import AllotPublicCom from "./allotPublicCom";

  export default {
    components: {AllotPublicCom},
    name: "break-appoint",
    data(){
      return {
        busDistributionInfoVO:{},
        breakReason:'',
        flowId:'',
        title:"",
      }
    },
    methods:{
      breakReasonFn(){
        this.title = '';
      },
      sub(){
        this.$http({
          url:'/busDistributionInfo/breakAgreeMentSubmit',
          data:{bussNo:this.$route.query.bussNo,breakReason:this.breakReason,flowId:this.flowId},
          callback:res=>{
            this.$router.push('/surveyerAllotList');
            this.$message.success('提交成功')
          },
          callback9999:res=>{
            this.$message.error(res.resultMsg);
            this.title = res.resultMsg
          }
        })
      },
      btnClick(){
        if(!this.breakReason){
          this.$message.error('请选择爽约原因');
          return
        }
        let message;
        const h = this.$createElement;
        message = h('div',null,[
          h('p', null, `请确认以下信息是否正确？`),
          h('p', null, `借款人姓名: ${this.busDistributionInfoVO.returnPreName};`),
          h('p', null, `预约下户时间: ${this.busDistributionInfoVO.orderTime}`),
          h('p', null, `请确认客户是否爽约？`)
        ]);
        this.$msgbox({
          title: '请确认以下信息',
          message: message,
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.sub();
            } else {
              done();
            }
          }
        });
      }
    },
    created(){
      this.$http({
        url:'/busDistributionInfo/selectOneDistributionDetail',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.busDistributionInfoVO = res.data.busDistributionInfoVO;
          this.flowId = res.data.flowId
        }
      })
    }
  }
</script>

<style scoped>

</style>
