<template>
  <div class="public">
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}} &emsp;&emsp;借款人 ：{{$route.query.custName}}&emsp;&emsp;放款通道 ：{{$route.query.passageName}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/pic.png" class="listTitleImg"><span>回访影像</span></h3>
    </div>
    <pic-module class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="1" taskType="330" :details="false"></pic-module>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>初次回访确认</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo table_height">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">回访确认结果<i class="importent">*</i></el-col>
        <el-col :span="9" class="table_td" style="border:none">
          <el-col :span="14">
            <el-radio-group v-model="callbackResult" @change="checkMust('callbackResult')" :disabled="isInfo">
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">打回</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="9" class="error_title" v-show="errorShow.callbackResult">请完善信息！</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr" v-if="callbackResult === '2'">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">确认说明<i class="importent">*</i></el-col>
          <el-col :span="18" class="textareawrap"><div class="textarea"><textarea  :rows="10" @blur="checkMust('refuseDetail')" :class="isInfo?'textarea_disabled':''" :disabled="isInfo" v-model="refuseDetail"  placeholder="如果打回，请填写打回原因" maxlength="200"></textarea></div></el-col>
          <el-col :span="3" class="table_td error_title" v-show="errorShow.refuseDetail">请完善信息！</el-col>

        </el-col>

      </el-col>
    </el-row>


    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span> 初次回访提交及确认记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="previousName"  label="提交任务员" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="previousTime" label="提交时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromName" label="确认任务员" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fromTime" label="确认时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="result" label="确认结果" min-width="100"></el-table-column>
      <el-table-column header-align="center" align="left" prop="supplement" label="确认说明" min-width="300"></el-table-column>
    </el-table>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn" v-if="isInfo"><el-button @click="goback">返回</el-button></li>
        <li class="last_btn" v-if="!isInfo"><el-button type="primary" @click="submit">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PicModule from "../../picModule/picModule";

  export default {
    components: {PicModule},
    name: "first-call-back-affirm",
    props:{
      isInfo:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        callbackResult:'',
        tableData:[],
        errorShow:{
          callbackResult:false,
          refuseDetail:false
        }
      }
    },
    methods:{
      checkMust(name){
        switch (name){
          case 'refuseDetail':
            if(this.callbackResult === '2'){
              if(!this[name]){
                this.errorShow[name] = true
              }else{
                this.errorShow[name] = false
              }
            }else{
              console.log(1)
              this.errorShow[name] = false
            }
            break;
          default:
            if(!this[name]){
              this.errorShow[name] = true
            }else{
              this.errorShow[name] = false
            }
        }
        return this.errorShow[name]
      },
      mustWrite(){
        let bol = false;
        this.checkMust('callbackResult')?bol = true:'';
        this.checkMust('refuseDetail')?bol = true:'';
        return bol
      },
      submit(){
        if(this.mustWrite()){
          return
        }

        this.$confirm('请确认是否提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$http({
            url:'/busLoanCallbackConfirm/callbackConfirmSubmit',
            data:{
              bussNo:this.$route.query.bussNo,
              callbackResult:this.callbackResult,
              refuseDetail:this.refuseDetail,
            },
            callback:res=>{
              this.$message.success('提交成功!');
              this.$router.push('/firstCallBackAffirmList')
            }
          })
        })


      },
      goback(){
        this.$router.push('/firstCallBackList')
      },
      queryHis(){
        this.$http({
          url:'/loanFinalInfo/queryBusOpinionFlow',
          data:{
            fromType:'332',
            taskType:'330',
            bussNo:this.$route.query.bussNo,
          },
          callback:res=>{
            // fromOpinion
            let data = res.data.busOpinionFlowVOList;
            for(let i= 0,j = data.length;i < j;i++){
              console.log(data[i].fromOpinion)
              let opinionList =  data[i].fromOpinion.split(',');
              data[i].result = opinionList[0];
              console.log(opinionList)
              console.log(opinionList[1] === 'null')
              data[i].supplement = opinionList[1]?opinionList[1]:'';
            }
            this.tableData = data
          }
        })
      }
    },
    created(){
      if(this.isInfo){
        this.refuseDetail = this.$route.query.refuseDetail;
        this.callbackResult = this.$route.query.callbackResult;
      }
      this.queryHis()
    }

  }
</script>

<style scoped>

</style>
