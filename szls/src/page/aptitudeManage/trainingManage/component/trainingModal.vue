<template>
  <div class="trainingModal">
    <el-dialog
      title="执法人员培训"
      :visible.sync="trainingInfoModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-form :label-width="labelwidthStyle" :model="dataList" :rules="rules" ref="ruleForm"
        v-loading="loading"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="培训期数：" prop="stage">
              <el-input v-model="dataList.stage" placeholder="请选择" disabled>
                
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训单位：" prop="company">
              <el-input v-model="dataList.company"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="培训日期：" prop="time">
              <el-date-picker type="date" placeholder="选择日期" style="width: 180px" 
                value-format="yyyy-MM-dd"
                v-model="dataList.time"
              ></el-date-picker>
              
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主持人：" prop="host">
              <el-input v-model="dataList.host"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10" type="flex">
          <el-col :span="8">
            
              <el-form-item label="培训对象的申请时间：" prop="startTime">
                <el-date-picker type="date" placeholder="选择开始日期" style="width: 180px" 
                  value-format="yyyy-MM-dd"
                  v-model="dataList.startTime"
                  :picker-options="selectStartTime"
                ></el-date-picker>
                
              </el-form-item>
           

            
          </el-col>
          <el-col :span="8">
            <el-form-item  prop="endTime">
              <el-date-picker type="date" placeholder="选择结束日期" style="width: 180px" 
                value-format="yyyy-MM-dd"
                v-model="dataList.endTime"
                :picker-options="selectEndTime"
              ></el-date-picker>             
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="培训主题：" prop="topic">
          <el-input v-model="dataList.topic"></el-input>
        </el-form-item>
        <el-form-item label="培训内容：" prop="content">
          <el-input type="textarea" :rows="4" v-model="dataList.content"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancle">取 消</el-button>
        <el-button type="primary" @click="check">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
// 新增 
import { addTrainTopic,getMaxQS} from '@/api/aptitudeManage/trainingManage/index'

export default {
  props: {
    trainingInfoModal: Object 
  },
  name: "trainingModal",
  components: {},
  data() {
    let self = this;
    return {
      labelwidthStyle: "170px",
      loading:false,
      dataList:{
        stage:"",
        company:"",
        time:"",
        host:"",//主持人
        topic:"",
        content:"",
        startTime:"",
        endTime:""
      },
      rules:{
        stage:[{ required: true, message: '请选择期数', trigger: 'blur' },],
        company:[{ required: true, message: '输入培训单位', trigger: 'blur' },],
        time:[{ required: true, message: '选择培训日期', trigger: 'blur' }],
        startTime:[{ required: true, message: '选择开始日期', trigger: 'blur' }],
        endTime:[{ required: true, message: '选择结束日期', trigger: 'blur' }],
        host:[{ required: true, message: '输入主持人', trigger: 'blur' }],
        topic:[{ required: true, message: '输入配置主题', trigger: 'blur' }],
        content:[{ required: true, message: '输入培训内容', trigger: 'blur' }],
      },
      selectStartTime:{
        disabledDate(time){
          if(!self.dataList.endTime) {
            console.log("后面是空的");
            return false;
          }
          console.log(new Date(self.dataList.endTime).getTime());
          return new Date(time).getTime() >= new Date(self.dataList.endTime).getTime()- 86400000;
        }
      },
      selectEndTime:{
        disabledDate(time){
          // console.log(time);
          if(!self.dataList.startTime) {
            console.log("前面是空的");
            return false;
          }
          return new Date(time).getTime() <= new Date(self.dataList.startTime).getTime();
        }
      },
          
    };
  },
  methods: {
    check(){     
      this.$refs['ruleForm'].validate(valid=>{
        if(valid){
          this.loading = true;
          //调用接口
          addTrainTopic({ 
            pxqs:this.dataList.stage, //编号
            pxzzdw:this.dataList.company,//单位
            pxsj:this.dataList.time,//时间
            pxzcr:this.dataList.host,//主持人
            pxztmc:this.dataList.topic,//培训主题名称
            pxnr:this.dataList.content,//培训主题内容
            pxjssj:this.dataList.endTime,//培训结束时间
            pxkssj:this.dataList.startTime

          }).then(res=>{
            if(res.infoCode && res.infoCode == 200){
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              });
              this.trainingInfoModal.centerDialogVisible = false; //关闭
            }else {
              this.$message({
                showClose: true,
                message: '添加失败',
                type: 'error'
              });
            }
            this.loading = false;
          }).catch(res=>{
            this.loading = false;
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            });
          })
        }
      })      
    },
    cancle(){           
      console.log("取消");
      this.trainingInfoModal.centerDialogVisible = false;    
    },
    getQS(){//获取期数
      this.loading = true;
      getMaxQS({}).then(res=>{
        if(res.infoCode && res.infoCode == 200){         
          let v = res.data + 1;
          this.dataList.stage = v;
          
        }else {
          this.$message.error("网络异常")
        }
        this.loading = false;
      }).catch(res=>{
        this.loading = false;
        this.$message.error("网络异常")

      })
      /******************************************************** */
      
    }
  },
  created(){
    this.getQS();
  },
  beforeDestroy(){
     this.$refs['ruleForm'].resetFields();
    console.log("我关闭啦");
  }
}
</script>

<style scoped="scoped">
  .wrapper {
    padding-left:40px; 
  }
</style>
