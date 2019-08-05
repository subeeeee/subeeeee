<template>
  <div class="public">
    <p class="orderNo">订单编号 ：{{$route.query.bussNo}} &emsp;&emsp;借款人 ：{{$route.query.custName}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/pic.png" class="listTitleImg"><span> 回访影像</span> <a class="help" :href="docx" target="_blank" download>电话回访模板下载</a></h3>
    </div>
    <pic-module class="module_margin_bottom" :bussNo="$route.query.bussNo" dataType="1" taskType="330" :details="!isInfo"></pic-module>
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
    name: "first-call-back",
    props:{
      isInfo:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        docx:require('../../assets/callBack.docx'),
        tableData:[]
      }
    },
    methods:{
      submit(){
        this.$confirm('请确认是否提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$http({
            url:'/busLoanCallback/callbackSubmit',
            data:{
              bussNo:this.$route.query.bussNo,
            },
            callback:res=>{
              this.$message.success('提交成功!');
              this.$router.push('/firstCallBackList')
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
              let opinionList =  data[i].fromOpinion.split(',');
              data[i].result = opinionList[0];
              data[i].supplement = opinionList[1]?opinionList[1]:'';
            }
            this.tableData = data
          }
        })
      }
    },
    created(){
      this.queryHis()
    }

  }
</script>

<style scoped>

</style>
