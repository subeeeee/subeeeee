<template>
  <div>
    <el-dialog title="出勤配置" :visible.sync="onOrOff"   custom-class="custom_class_550" :close-on-click-modal="false">
      <el-row style="margin: 0 auto;width:90%;line-height:1.1">
        <el-col :span="24" style="margin-bottom: 10px">
          <el-col :span="8">请假时间</el-col>
          <el-col :span="16">
            <el-date-picker v-model="queryTime" class="select_width"  size='small' :editable="false" type="datetimerange" placeholder="选择日期范围"></el-date-picker>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onOrOff = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
      <p style="text-indent: 30px">提醒：如果下户员请假后，提前归岗，请立即修改请假时间。</p>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "work-out",
    data(){
      return {
        onOrOff:false,
        queryTime:[],
        bussData:{}
      }
    },
    props:{
    },
    methods:{
      submit(){
        let data = {
          leaveStartTime:Date.parse(this.queryTime[0])?Date.parse(this.queryTime[0]):'',
          leaveEndTime:Date.parse(this.queryTime[1])?Date.parse(this.queryTime[1]):'',
          userName:this.bussData.userName,
          userId:this.bussData.userId
        };
        this.$http({
          url:'/returnManage/saveReturnLeaveConfig',
          data,
          callback:res=>{
            this.onOrOff = false;
            if(res.data.num&&res.data.num*1>0){
              this.$alert('此段时间内有'+ res.data.num +'单待下户，请及时调度给其他下户员', '提示', {
                confirmButtonText: '去调度',
              }).then(() => {
                this.$router.push('/surveyerAllotList');
              })
            }else{
              this.$message.success('操作成功')
            }
          }
        });
      },
      isShow(obj){
        this.bussData = obj;
        this.queryTime = [];
        this.onOrOff = true
      }
    }
  }
</script>

<style scoped>

</style>
