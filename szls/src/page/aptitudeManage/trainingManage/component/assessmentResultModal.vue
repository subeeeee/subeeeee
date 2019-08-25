<template>
  <div class="assessmentModal">
    <el-dialog
      title="执法人员考核"
      :visible.sync="assessmentResultInfoModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <div v-loading="loading">
        <el-form :label-width="labelwidthStyle" >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="考核期数：" prop="khqs">
                <el-input disabled placeholder="带出" v-model="assessmentResultInfoModal.info.khqs"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="考核单位：" prop="khdw">
                <el-input v-model="assessmentResultInfoModal.info.khdw" 
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="考核日期：" prop="khrq">
                <el-date-picker type="date" placeholder="选择日期" style="width: 180px"
                  v-model="assessmentResultInfoModal.info.khrq" 
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监考人：" prop="khjkrmc">
                <el-input v-model="assessmentResultInfoModal.info.khjkrmc" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="考核内容：" prop="khnr">
            <el-input type="textarea" :rows="4" placeholder="可以填写考卷发放的规则等等信息"
              v-model="assessmentResultInfoModal.info.khnr"
              disabled
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="wrapper">
          <el-row :gutter="10">
            <el-col :span="6">
              <span>考核人员：{{ assessmentResultInfoModal.info.khqs }}</span>
            </el-col>
            <el-col :span="6">
              <span>考核人数：{{ assessmentResultInfoModal.info.khrs }}</span>
            </el-col>
            <el-col :span="6">
              <span>实际考核人数：{{ assessmentResultInfoModal.info.khsjrs }}</span>
            </el-col>
            <el-col :span="6">
              <span>合格人数：{{ assessmentResultInfoModal.info.hgrs }}</span>
            </el-col>
            
          </el-row>
          <el-table :data="dataArr" class="S">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column property="ryxm" label="姓名"></el-table-column>
            <el-table-column property="dwjzw" label="单位及职务"></el-table-column>
            <el-table-column property="pxqdzt" label="是否参加培训">
              <template slot-scope="scope">
                {{scope.row.pxqdzt == 1?"是":"否"}}
              </template>
            </el-table-column>
            <el-table-column property="sfcjkh" label="是否参加考核">
              <!-- <template slot-scope="scope">
                {{scope.row.sfcjkh == "y"?"是":"否"}}
              </template> -->
              <template slot-scope="scope">       
                <el-radio v-model="scope.row.sfcjkh" label="y" name="sfcjkh" :disabled="updateOrCheck"  @change="modifyFactAssessmentNum(scope.row)">是</el-radio>
                <el-radio v-model="scope.row.sfcjkh" label="n" name="sfcjkh" :disabled="updateOrCheck"  @change="modifyFactAssessmentNum(scope.row)">否</el-radio>             
              </template>
            </el-table-column>
            <el-table-column property="khsfhg" label="是否合格" width="110">
              <template slot-scope="scope">       
                <el-radio v-model="scope.row.khsfhg" label="y" name="khsfhg" @change="modifyFactAssessmentNum(scope.row)" 
                  :disabled="updateOrCheck || scope.row.sfcjkh == 'n'"
                >是</el-radio>
                <el-radio v-model="scope.row.khsfhg" label="n" name="khsfhg" @change="modifyFactAssessmentNum(scope.row)" 
                  :disabled="updateOrCheck || scope.row.sfcjkh == 'n'"
                >否</el-radio>             
              </template>
            </el-table-column>
            <el-table-column property="fj" label="附件" width="50">
              <template slot-scope="scope">            
                <a :href="scope.row.khfjbh" :class="{gray:updateOrCheck}">下载</a>
              </template>
              
            </el-table-column>
            <!-- <el-table-column property="cz" label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="add" :class="{gray:updateOrCheck}">增加</el-button>
                <el-button type="text" size="mini" @click="deleteOne(scope.row)" :class="{gray:updateOrCheck}">删除</el-button>
              </template>
              
            </el-table-column> -->
          </el-table>
          
          <!-- <div class="bottom"  >
            <el-form :inline="true"  class="demo-form-inline zdy_form"  v-for="(item,index) in hideModelData" :key="index">
              <el-form-item prop="ryxm">
                <el-input  placeholder="姓名" v-model="item.ryxm"></el-input>
              </el-form-item>
              <el-form-item prop="dwjzw">
                <el-input  placeholder="单位及职务" v-model="item.dwjzw"></el-input>
              </el-form-item>
              <el-form-item prop="pxqdzt">
                  {{ item.pxqdzt == 1?"是":"否" }}
              </el-form-item>
              <el-form-item prop="sfcjkh">
                  {{ item.sfcjkh == 'y'?"是":"否" }}
              </el-form-item >
              <el-form-item  prop="khsfhg">
                  <el-radio  label="y" name="khsfhg" v-model="item.khsfhg" @change="modifyFactAssessmentNum">是</el-radio>
                  <el-radio  label="n" name="khsfhg" v-model="item.khsfhg" @change="modifyFactAssessmentNum">否</el-radio>
              </el-form-item>
              <el-form-item class="fj center">
                <span class="">无</span>
              </el-form-item>
              <el-form-item class="operate">
                  <el-button type="text" size="mini" @click="add">增加</el-button>
                  <el-button type="text" size="mini" @click="deleteTemp(index)">删除</el-button>              
              </el-form-item>
            </el-form>
          </div> -->
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveOperate" v-show="!updateOrCheck">保存</el-button>
        <el-button type="primary" @click="submit" v-show="!updateOrCheck">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getAssessmentResult,updateAssessmentResult,getList,getSubmit} from '@/api/aptitudeManage/trainingManage/index'
  export default {
    name: "assessmentResultModal",
    props: {
      assessmentResultInfoModal:Object
    },
    data() {
      return {
        labelwidthStyle: "120px",
        loading:false,

        //上面部分
        // topData:{
        //   khqs:"555",//考核期数
        //   khdw:"",//考核单位
        //   khrq:"",//考核日期
        //   khjkrmc:"", //监考人名称
        //   khnr:"",//考核内容
        // },
        //考核数据
        // assessmentData:{
        //   assessmentPerson:"1", //考核人员
        //   assessmentNum:"0", //考核人数
        //   factAssessmentNum:"0", //实际考核人数
        //   qualifiedNum:"0" //合格人数
        // },
        //下面部分
        dataArr:[],

        //隐藏的添加用户部分
        //hideModelData:[],

        //判断当前是 查看状态 还是 修改状态
        updateOrCheck:false,
      }
    },
    methods:{
      //删除
      // deleteOne(info){
      //   //判断 是 查看 还是修改
      //   if(this.assessmentResultInfoModal.resultOrcheck == 2) return;
      //   console.log(info);
      //   this.modifyFactAssessmentNum();
        
      // },
      //新增的数据的删除
      // deleteTemp(index){
      //   this.hideModelData.splice(index,1);
      //   this.modifyFactAssessmentNum();
      //   console.log(index);
      // },
      // add(){
      //   //判断 是 查看 还是修改
      //   if(this.assessmentResultInfoModal.resultOrcheck == 2) return;
      //   //显示增加的表单
      //   if(this.hideModelData.length > 0){
      //     let d = this.hideModelData[this.hideModelData.length-1];
      //     if(d.ryxm.trim() == "" || d.dwjzw.trim() == "" || d.khsfhg.trim() == ""){
      //       this.$message({
      //         message: '请填写完整',
      //         type: 'warning'
      //       });
      //       return;
      //     }
      //   }
      //   this.hideModelData.push({
      //     "ryxm": "",//姓名
      //     "dwjzw": "",//单位及职务
      //     "pxqdzt": "1",//是否参加培训
      //     "sfcjkh": "y",//是否参加考核
      //     "khsfhg": "",//是否合格
      //   })   
      //   this.modifyFactAssessmentNum();  
      // },
      //提交 和 
      
      //保存接口
      async save(){
        let d = this.dataArr;
        
        await updateAssessmentResult(d).then(res=>{
          if(res.infoCode == 200){
            //成功
            // this.$message({
            //   showClose: true,
            //   message: '保存成功',
            //   type: 'success'
            // });
            //弹框退出
            //this.hideModelData = [];
          }else {
            throw new Error("网络异常")
          }
        })
      },
      saveOperate(){
        this.loading = true;
        this.save().then(res=>{
          this.loading = false;
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          })
          this.assessmentResultInfoModal.centerDialogVisible = false;
        }).catch(res=>{
          this.loading = false;
          this.$message.error("网络异常")
        })
      },

      //提交接口
      submit(){
        const self = this;
        this.loading = true;
        this.save().then(res=>{
          getSubmit('1',{
            "khEndDate": this.assessmentResultInfoModal.info.khjssj,
            "khStartDate": this.assessmentResultInfoModal.info.khkssj,
            "khqs": this.assessmentResultInfoModal.info.khqs
          }).then(res=>{
            if(res.infoCode && res.infoCode == 200){
              this.$message({
                showClose: true,
                message: '保存成功',
                type: 'success'
              })
              this.loading = false;
              this.assessmentResultInfoModal.centerDialogVisible = false;
              this.assessmentResultInfoModal.update();
            }else {
              throw new Error("网络异常")
            }
          }).catch(res=>{
            this.$message.error("网络异常");
            this.loading = false;
          })
        })
         
          
        
      },
      
     
      //修改实际考核人数/合格人数/考核人数
      modifyFactAssessmentNum(info){
        console.log(info);
        let 
          FactAssessmentNum = 0,//实际考核人数
          qualifiedNum = 0;//合格人数


        this.dataArr.forEach(res=>{
          if(res.sfcjkh == 'y') FactAssessmentNum++;
          
          if(res.khsfhg == 'y') qualifiedNum++;
        })
        this.assessmentResultInfoModal.info.khsjrs = FactAssessmentNum
        this.assessmentResultInfoModal.info.hgrs = qualifiedNum;
        if(info.sfcjkh == 'n' && info.khsfhg == 'y'){
          this.assessmentResultInfoModal.info.hgrs--;
        }
        //修改值

      },
      init(){//初始化       
        // let p1 = new Promise((resolve,reject)=>{
        //   getList(1,1,{
        //     "khEndDate":this.assessmentResultInfoModal.khjssj,
        //     "khStartDate":this.assessmentResultInfoModal.khkssj,
        //     "khqs":this.assessmentResultInfoModal.khqs,
        //   }).then(res=>{
        //     if(res.infoCode && res.infoCode == 200){
        //       //获取上部分数据
        //       this.topData=this.data.list[0];
        //       //获取考核人数的信息
        //       // this.assessmentData.assessmentPerson = this.topData.khqs;
        //       // this.assessmentData.assessmentNum = this.topData.khrs;
        //       // this.assessmentData.factAssessmentNum = this.topData.khsjrs;
        //       // this.assessmentData.qualifiedNum = this.topData.hgrs;
        //       this.assessmentResultInfoModal = {
        //         assessmentPerson:this.topData.khqs,
        //         assessmentNum:this.topData.khrs,
        //         factAssessmentNum:this.topData.khsjrs,
        //         qualifiedNum:this.topData.hgrs
        //       }
        //       resolve();
        //     }else {
        //       reject();
        //     }
        //   }).catch(res=>{
        //     this.loading = false
        //   })
        // })
        console.log("-------------------");
        console.log(this.assessmentResultInfoModal)
          getAssessmentResult({
            "khEndDate":this.assessmentResultInfoModal.info.khjssj,
            "khStartDate":this.assessmentResultInfoModal.info.khkssj,
            "khqs":this.assessmentResultInfoModal.info.khqs
          }).then(res=>{
            if(res.infoCode && res.infoCode == 200){
              //获取到数据
              console.log("数据拿到了");
              this.dataArr = res.data;             
            }else {
              this.$message.error("网络异常");
            }
            this.loading = false;
          }).catch(res=>{
            this.loading = false;
            this.$message.error("网络异常");
          })
        

        
      },
    },
    created(){
      console.log(this.assessmentResultInfoModal.info);
      this.loading = true;
      //判断 是 查看 还是修改
      if(this.assessmentResultInfoModal.resultOrcheck == 2) {
        //修改样式
        this.updateOrCheck = true;       
      }
      this.init();
      
    },
    
    beforeDestroy(){
      console.log("退出啦");
    }
  }
</script>

<style scoped>
.wrapper {
    padding-left:40px; 
}
.el-table__body-wrapper.is-scrolling-none .cell .el-radio {
  margin-right: 0;
}

.el-button+.el-button {
  margin-left: 0px;
}
.el-radio {
  margin-right: 0;
}
.bottom  .el-form--inline .el-form-item {
  width: 103px;
}
.bottom .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
.bottom .el-input .el-input__inner {
  height:30px;
  line-break: 30px;
}
.bottom {
  
  margin-top: 10px;
  
  
}
.zdy_form {
  border-bottom:1px solid #EBEEF5;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 50px;
}
.zdy_form:first-child {
  padding-top: 0;
  
}
.bottom .btn {
  width: 99px!important;
}
.bottom .el-input {
  font-size: 12px;
}
.fj {
  width: 40px!important;
}
.operate{
  width: 70px!important;
  margin-left: 10px;
}

.center {
  text-align: center;
}
.gray {
  color: #C0C4CC;
}
</style>
