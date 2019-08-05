<template>
  <div>
    <el-dialog title="工作量配置" :visible.sync="onOrOff"   custom-class="custom_class_550" :close-on-click-modal="false">
      <el-table :data="tableData" border class="table">
        <el-table-column align="center" header-align="center" prop="time" label="时间"></el-table-column>
        <el-table-column align="center" header-align="center" label="周一">
          <template scope="scope"><el-checkbox :disabled="scope.row.week1 == undefined" v-model="scope.row.week1"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周二">
          <template scope="scope"><el-checkbox :disabled="scope.row.week2 == undefined" v-model="scope.row.week2"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周三">
          <template scope="scope"><el-checkbox :disabled="scope.row.week3 == undefined" v-model="scope.row.week3"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周四">
          <template scope="scope"><el-checkbox :disabled="scope.row.week4 == undefined" v-model="scope.row.week4"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周五">
          <template scope="scope"><el-checkbox :disabled="scope.row.week5 == undefined" v-model="scope.row.week5"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周六">
          <template scope="scope"><el-checkbox :disabled="scope.row.week6 == undefined" v-model="scope.row.week6"></el-checkbox></template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="周日">
          <template scope="scope"><el-checkbox :disabled="scope.row.week7 == undefined" v-model="scope.row.week7"></el-checkbox></template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onOrOff = false">取 消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "workload",
    data(){
      return {
        onOrOff:false,
        bussData:{},
        tableData:[]
      }
    },
    props:{

    },
    methods:{
      submit(){
        let timeConfig = JSON.parse(JSON.stringify(this.tableData));
        let timeConfigStr = []
        timeConfig.forEach((item)=>{
          let obj = {};
          obj.time = item.time;
          obj.weeks = [];
          for(let i = 1;i<=7;i++){
            if(item['week' + i]) obj.weeks.push(i)
          }
          if(obj.weeks.length != 0){
            timeConfigStr.push(obj)
          }
        });
        this.$http({
          url:'/returnManage/saveReturnTimeConfig;',
          data:{userId:this.bussData.userId,userName:this.bussData.userName,timeConfigStr:JSON.stringify(timeConfigStr)},
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
        })
      },
      isShow(bussData){
        this.bussData = bussData;
        this.$http({
          url:'/returnManage/queryReturnTimeConfig',
          data:{userId:this.bussData.userId,cityCode:this.bussData.cityCode},
          callback:res=>{
            let table = res.data.returnTimeConfigVO.table;
            this.tableData = [];
            table.forEach((item)=>{
              let obj = {};
              obj.time = item.time;
              item.weeks.forEach((item)=>{
                obj['week' + item] = false
              });
              this.tableData.push(obj)
            });
            if(res.data.returnTimeConfigVO.content){
              let content = res.data.returnTimeConfigVO.content;
              content.forEach((item)=>{
                let length = this.tableData.length;
                for(let i = 0;i<length;i++){
                  if(this.tableData[i].time == item.time){
                    item.weeks.forEach((item1)=>{
                      this.tableData[i]['week'+ item1] = true
                    })
                  }
                }
              })
            }
            this.onOrOff = true;
          }
        })

      }
    },
    created(){
    }
  }
</script>

<style scoped>

</style>
