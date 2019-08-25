<template>
  <div class="trainingModal">
    <el-dialog
      title="执法人员培训"
      :visible.sync="lookOverModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
      
    >
      <div v-loading="loading">
        <el-form :label-width="labelwidthStyle">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="培训期数：">
                <el-input disabled  v-model="dataList.pxqs"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训单位：">
                <el-input v-model="dataList.pxzzdw" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="培训日期：">
                <el-date-picker type="date" placeholder="选择日期" style="width: 180px"
                  v-model="dataList.pxsj"
                disabled ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主持人：">
                <el-input v-model="dataList.pxzcr" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="培训主题：">
            <el-input v-model="dataList.pxztmc" disabled></el-input>
          </el-form-item>
          <el-form-item label="培训内容：">
            <el-input type="textarea" :rows="4" v-model="dataList.pxnr" disabled></el-input>
          </el-form-item>
        </el-form>

        <div class="wrapper">
          <el-row :gutter="10">
            <el-col :span="8">
              <span>培训人员：{{dataList.pxqs }}</span>
            </el-col>
            <el-col :span="8">
              <span>培训人数：{{dataList.pxrs  }}</span>
            </el-col>
            <el-col :span="8">
              <span>实际到场人数：{{dataList.sjdcrs  }}</span>
            </el-col>
          </el-row>
          <el-table :data="personData" class="S" >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="company" label="单位及职务"></el-table-column>
            <el-table-column property="train" label="是否参加培训">
              <template slot-scope="scope" >       
                <el-radio v-model="scope.row.train" label="1" name="train" disabled>是</el-radio>
                <el-radio v-model="scope.row.train" label="2" name="train" disabled>否</el-radio>             
              </template>
            </el-table-column>
            <el-table-column property="remarks" label="备注">
              <template slot-scope="scope">           
                <el-input v-show="true" v-model="scope.row.remarks" placeholder="备注" size="small" name="remarks"
                  disabled
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      


      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lookOverModal.cancle">取 消</el-button>
        <el-button type="primary" @click="lookOverModal.check">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
// 查看 按钮 的页面

import {getTopicByNum,getSignInList } from '@/api/aptitudeManage/trainingManage/index'
export default {
  name: "lookOverModal",
  components: {},
  data() {
    return {
      labelwidthStyle: "120px",
      dataList:{
        // pxqs:"1",//期数
        // pxzzdw:"",//单位
        // pxsj:"",//时间
        // pxzcr:"",//主持人
        // pxztmc:"",//主题
        // pxnr:""//内容
      },
      personData:[
        {
          name: "王小虎",
          company:"1",
          train:"2",
          
          remarks: "3",

        },
        {

          name: "王二虎",
          company:"888",
          train:"1",
          
          remarks: "666",

        },
        {

          name: "王大虎",
          company:"88988",
          train:"1",
          
          remarks: "888",

        }
      ],
      loading:false
    };
  },
  props: {
    lookOverModal: Object
  },
  methods: {  
    check(){     
      console.log("确定了");
      self.lookOverModal.centerDialogVisible = false;
    },
    cancle(){
      console.log("取消了");
      self.lookOverModal.centerDialogVisible = false;
    },
    init(){
      this.loading = true;
      //获取头部数据
      this.dataList = this.lookOverModal.info;
      //获取列表数据
      getSignInList({ 
        "pxjssj": this.lookOverModal.info.pxjssj,
        "pxkssj": this.lookOverModal.info.pxkssj,
      }).then(res=>{
        if(res.infoCode && res.infoCode == 200){
          console.log(res.data);
          this.personData = res.data;
          console.log("---------------");
          console.log(this.personData);
        }else {
          this.$message.error("网络异常"); 
        }
        this.loading = false;
      }).catch(res=>{
        this.loading = false;
        this.$message.error("网络异常");
      })
      
    }
  },
  created(){
    this.init();
  },
  beforeDestroy(){
    console.log("关闭啦");
  }
};
</script>

<style scoped="scoped">
  .wrapper {
    padding-left:40px; 
  }
</style>
