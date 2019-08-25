<template>
  <div class="signInModal">
    <el-dialog
      title="执法人员培训签到"
      :visible.sync="signInInfoModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-row :gutter="10">
        <el-col :span="8">

          <span>培训人员：{{trainData.pxqs }}</span>
        </el-col>
        <el-col :span="8">
          <span>培训人数：{{trainData.pxrs  }}</span>
        </el-col>
        <el-col :span="8">
          <span>实际到场人数：{{trainData.sjdcrs  }}</span>
        </el-col>
      </el-row>
      <el-table :data="personData" class="S" v-loading="loading">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="ryxm" label="姓名"></el-table-column>
        <el-table-column property="dwjzw" label="单位及职务"></el-table-column>
        <el-table-column property="pxqdzt" label="是否参加培训">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.pxqdzt" label="y" name="pxqdzt" @change="stateChange">是</el-radio>
            <el-radio v-model="scope.row.pxqdzt" label="n" name="pxqdzt" @change="stateChange">否</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="remarks" label="备注">
          <template slot-scope="scope">
            <el-input v-show="true" v-model="scope.row.remark" placeholder="备注" size="small" name="remarks"/>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancle">提 交</el-button>
        <el-button type="primary" @click="check">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//签到 按钮 的 组件
import { getSignInList,modifySignStatus,submit } from '@/api/aptitudeManage/trainingManage/index.js'
//还有一个批量修改接口

export default {
  props: {
    signInInfoModal: Object
  },
  name: "signInModal",
  components: {},
  data() {
    return {
      labelwidthStyle: "120px",
      trainData:{
        pxqs:"",
        pxrs:0,
        sjdcrs:0
      },
      loading:false,
      personData:[

      ],
    };
  },
  created() {},
  methods: {
    check(){
      this.loading = false; 
      //调用接口 目前还没有
      //批量修改数据
      let d = this.personData.map(item=>{
        return {
          zzsqbh:item.zzsqbh,
          pxqdzt:item.pxqdzt,
          remark:item.remark
        }
      })
      modifySignStatus('0',d).then(res=>{
        if(res.infoCode && res.infoCode == 200){
          this.loading = false;
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })         
          this.signInInfoModal.centerDialogVisible = false;
        }else {
          this.$message.error("网络异常");
        }
        
      }).catch(res=>{
        this.$message.error("网络异常");e;
      })
      console.log("确定了");
      
    },
    cancle(){
      console.log("取消了");
      submit({
        "pxjssj": this.signInInfoModal.info.pxjssj,
        "pxkssj": this.signInInfoModal.info.pxkssj,
      }).then(res=>{
        if(res.infoCode && res.infoCode == 200){
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })    
          this.signInInfoModal.centerDialogVisible = false;
          this.signInInfoModal.update();
        }else {
          this.$message.error("网络异常");
        }
      }).catch(error=>{
        this.$message.error("网络异常");
      })
      
    },


    stateChange(){
      //遍历
      /*let num = 0;
      this.personData.forEach(res=>{
        if(res.pxqdzt == "1"){
          num++;
        }
      });
      this.trainData.nowinNum = num;*/
    },
    //获取用户签到列表
    init(){
      this.loading = true;
      this.trainData = this.signInInfoModal.info;
      getSignInList({
        "pxjssj": this.signInInfoModal.info.pxjssj, //培训结束时间
        "pxkssj": this.signInInfoModal.info.pxkssj, //培训开始时间
      }).then(res=>{
        if(res.infoCode && res.infoCode == 200){
          console.log("------------------------");
          console.log(res.data);
          this.personData = res.data;

          // this.trainData.trainNum = this.personData.length;
          // this.trainData.trainPerson = this.signInInfoModal.info.pxqs;

          //this.stateChange();
          
          
        }else {
          this.$message.error('网络异常');
        }
        this.loading = false;
      }).catch(res=>{
        this.loading = false;
        this.$message.error('网络异常');
      })
    },

  },
  created(){    
    this.init();
  },
  beforeDestroy(){
    console.log("退出啦");
  }
};
</script>

<style scoped="scoped">
  .S .el-form-item {
    margin-bottom: 0px;
}
</style>
