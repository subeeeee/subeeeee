<template>
    <div class="btn_warp">
      <el-button type="text" size="small" @click="limit" class="btn">查看银行卡还款扣款额度</el-button>
      <el-dialog title="银行卡扣款单笔限额" :visible.sync="dialogVisible" width="30%">
        <span>因扣款单笔限额会调整，以下信息仅供参考</span>
        <div class="height_350">
          <el-table :data="list" border stripe class="table">
            <el-table-column header-align="center" align="center" prop="bank"  label="银行" ></el-table-column>
            <el-table-column header-align="center" align="center" prop="single" label="单笔限额(元)" ></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "card-limit",
        props:{
          bussNo:{
            type:String,
            require:true,
          }
        },
        data(){
          return {
            dialogVisible:false,
           list:[]
          }
        },
        methods:{
          limit(){
            this.dialogVisible = true
          }
        },
        mounted(){
          this.$http({
            url:"/visaInterview/singleQuota",
            data:{bussNo:this.bussNo},
            callback:res=>{
                this.list = res.data.singleQuota
            }
          })
        }
    }
</script>

<style scoped>
  .btn_warp{
    display: inline-block;
    float: right;
    margin-right: 10px;
    font-size: 14px;
  }
  .btn{
    padding: 0;
  }
  .height_350{
    height: 280px;
    overflow-y:auto;
  }
</style>
