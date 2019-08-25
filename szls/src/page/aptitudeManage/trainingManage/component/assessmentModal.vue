<template>
  <div class="assessmentModal">
    <el-dialog
      title="执法人员考核"
      :visible.sync="assessmentInfoModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-form :label-width="labelwidthStyle" :model="dataList" ref="ruleForm" :rules="rules"
        v-loading="loading"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="考核期数：" prop="stage">
              <el-select v-model="dataList.stage" placeholder="请选择">
                <el-option
                  v-for="item in StageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考核单位：" prop="company">
              <el-input v-model="dataList.company" 
                
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="考核日期：" prop="time">
              <el-date-picker type="date" placeholder="选择日期" style="width: 180px" v-model="dataList.time"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="监考人：" prop="invigilator">
              <el-input v-model="dataList.invigilator"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="考核内容：" prop="content">
          <el-input type="textarea" :rows="4" placeholder="可以填写考卷发放的规则等等信息" v-model="dataList.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="check()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addAssessmentInfo,getAssessmentStageAndCompany} from '@/api/aptitudeManage/trainingManage/index'
  export default {
    name: "assessmentModal",
    props: {
      assessmentInfoModal: Object
    },
    data() {
      return {
        labelwidthStyle: "120px",
        StageOptions:[
         
        ],
        dataList:{
          stage:"",
          company:"",
          time:"",
          invigilator:"",
          content:"",
        },
        rules:{
          stage:[{ required: true, message: '选择考核期数', trigger: 'blur' }],
          company:[{ required: true, message: '输入考核单位', trigger: 'blur' }],
          time:[{ required: true, message: '选择考核日期', trigger: 'blur' }],
          invigilator:[{ required: true, message: '输入监考人', trigger: 'blur' }],
          content:[{ required: true, message: '输入考核内容', trigger: 'blur' }]
        },
        loading:false
      }
    },
    methods:{
      check(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            addAssessmentInfo({
              "khdw": this.dataList.company,//考核单位
              "khrq": this.dataList.time,//考核日期
              "khqs": this.dataList.stage,//考核期数
              "khnr": this.dataList.content,//考核内容
              "khjkrmc":this.dataList.invigilator,//监考人名称
            }).then(res=>{
              if(res.infoCode && res.infoCode == 200){
                 this.$message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                });
                
                this.assessmentInfoModal.centerDialogVisible = false;     
                this.assessmentInfoModal.update();         
              }else {             
                this.$message.error("网络异常")
              }
              this.loading = false;
            }).catch(res=>{
              this.loading = false;
              this.$message.error("网络异常")
            })            
          } else {
            console.log('error submit!!');
          }
        });    
      },
      cancel(){ 
        this.$refs['ruleForm'].resetFields();
        this.assessmentInfoModal.centerDialogVisible = false;
      },
      //获取考核期数
      getAssessmentInfo(){
        this.loading=true;
        getAssessmentStageAndCompany({}).then(res=>{
          if(res.infoCode && res.infoCode == 200){
            console.log(res.data);
            let arr = res.data.map(item=>{
              return {
                value:item.pxqs,
                label:`第${item.pxqs}期`
              }
            })            
            this.StageOptions = arr.sort((a,b)=>a.value - b.value);
          }else {
            this.$message.error("网络异常");
          }
          this.loading =false;
        }).catch(res=>{
          this.$message.error("网络异常");
          this.loading =false
        })
      },

    },
    created(){      
        //获取期数
        this.getAssessmentInfo();;
    },
    beforeDestroy(){
      this.$refs['ruleForm'].resetFields();
    }
  }
</script>

<style scoped>

</style>
