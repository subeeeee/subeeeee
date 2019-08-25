<template>
  <div class="trainingList">
    <div class="search-content">
      <div class="search-item time">
        <span class="title-span">培训日期：</span>
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable v-model="startTime"
          :picker-options="selectStartTime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable v-model="endTime"
         :picker-options="selectEndTime"
         format="yyyy-MM-dd"
         value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="search-item">
        <span class="title-span">期数：</span>
        <el-select v-model="selectStage" placeholder="请选择" style="width: 180px" clearable >
          <el-option
            v-for="item in dropDown"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="iconfont iconchaxun" @click="clickQuery">查询</el-button>
    </div>
    <div class="trainingList-action">
      <el-Button type="primary" class="iconfont iconxinzeng" @click="showAddDialog(1)">新增</el-Button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <trainingModal :trainingInfoModal="trainingInfoModal" v-if="trainingInfoModal.centerDialogVisible"/>
    <signInModal :signInInfoModal="signInInfoModal" v-if="signInInfoModal.centerDialogVisible"/>
    <lookOverModal :lookOverModal="lookOverModal" v-if="lookOverModal.centerDialogVisible"/>
  </div>
</template>

<script>
  import tableView from '../../../components/table/el-index.vue';
  import trainingModal from './component/trainingModal.vue';
  import signInModal from './component/signInModal.vue';
  //查看按钮
  import lookOverModal from './component/lookOverModal.vue'

  import { getTopicByNum,addTrainTopic,updateTrainTopicInfo,submit,getMaxQS } from '@/api/aptitudeManage/trainingManage/index'

  export default {
    name: "trainingList",
    components: {
      tableView,
      trainingModal,
      signInModal,
      lookOverModal
    },
    data() {
      let self = this;
      return {
        //查询信息
        startTime:"",//开始时间
        endTime:"",//结束时间
        selectStage:"",//期数
        //临时保存
        tempStartTime:"",
        tempEndTime:"",
        tempSelectStage:"",
        //下拉菜单数据
        dropDown: [],
        //新增按钮 点击
        trainingInfoModal: {
          centerDialogVisible: false, 
        },
        //签到按钮 点击
        signInInfoModal: {
          centerDialogVisible: false,
          info:"",
          //需要传递的数据
          update:this.init
        },
        //查看按钮
        lookOverModal:{
          centerDialogVisible:false,
          info:{},
          // pxztbh:"", //主题编号
          // applyEndDate:"",//培训结束时间
          // applyStartDate: "",//培训结束时间
          // applyStatus:"",//期数
          
        },
        list: [
          
        ], // table数据
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false, // 是否支持列表项选中功能
          showIndex: true,
        }, // table 的参数
        columns: [
          {
            prop: 'pxztmc',
            label: '培训主题',
            align: 'center',
          },
          {
            prop: 'pxsj',
            label: '培训时间',
            align: 'center',
            // formatter: (row, column, cellValue) => {
            //   return `<span>${row.pxsj}</span>`
            // }
          },
          {
            prop: 'pxqs',
            label: '培训期数',
            align: 'center',
          },
          {
            prop: 'pxrs',
            label: '培训人数',
            align: 'center',
          },
          {
            prop: 'sjdcrs',
            label: '实际到场人数',
            align: 'center',
          },
          {
            prop: 'pxzcr',
            label: '主持人',
            align: 'center',
          },
          {
            prop: 'state',
            label: '操作',
            align: 'center',
            width: 150,
            render: (h, params) => {
              if(params.row.pxzt == 0){
                return h('div', [
                  h('a', {
                    style: {
                      marginRight: '5px'
                    }, // 组件的props
                    on: {
                      click: () => {
                        
                        self.showAddDialog(0,params.row);
                        
                      }
                    }
                  }, '签到'),
                  h('a', {
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {

                        //http请求
                        this.submitInfo(params.row);
                      }
                    }
                  }, '提交'),
                  h('a', {
                    on:{
                      click:()=>{
                        //显示弹框
                        self.showAddDialog(2,params.row);
                        //请求获取数据 
                      }
                    }
                  }, '查看')
                ])
              }else {
                return h('div', [
                h('a', {
                  style: {
                    marginRight: '5px'
                  }, // 组件的props
                  on: {
                    click: () => {                 
                      self.showAddDialog(0,params.row);
                      
                    }
                  }
                }, '签到'),
                h('a', {
                  on:{
                    click:()=>{
                      //显示弹框
                      self.showAddDialog(2,params.row);

                      //请求获取数据 
                    }
                  }
                }, '查看')
              ])
              }
              
            }
          },

        ],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 1,
          handleSizeChange: (val) => {
          },
          handleCurrentChange: (val) => { //点击分页           
            self.pageInfo.currentPage = val;           
            this.query();
          }
        },
        //用来选择 开始与结束的时间段
        selectStartTime:{
          disabledDate(time){
            if(!self.endTime) return false;
            
            return new Date(time).getTime() >= new Date(self.endTime).getTime()- 86400000;
          }
        },
        selectEndTime:{
          disabledDate(time){
            if(!self.startTime) return false;
            return new Date(time).getTime() <= new Date(self.startTime).getTime() ;
          }
        },
      }
      
    },
    methods: {
      //显示弹层
      showAddDialog(type,info) {
        
        if (type && type == 1){//增加       
          //调用接口 得获取培训期数  
          this.trainingInfoModal.centerDialogVisible = true;
        }else if(type && type == 2){//查看
          this.lookOverModal.centerDialogVisible = true,
          this.lookOverModal.info = info;
        }else {//签到
          this.signInInfoModal.info = info;
          this.signInInfoModal.centerDialogVisible = true;
        }       
      },
      //点击查询按钮
      clickQuery(){
        this.tempStartTime = this.startTime;
        this.tempEndTime = this.endTime;
        this.tempSelectStage = this.selectStage;
        this.pageInfo.currentPage = 1;
        this.query();
      },
      //根据输入框信息 查询
      query(){    
        this.options.loading = true;
        let queryData = {
          pxkssj:this.tempStartTime,//开始时间
          pxjssj:this.tempEndTime,//结束时间
          pxqs:this.tempSelectStage,//期数                 
        }
        //调用请求
        getTopicByNum(this.pageInfo.currentPage,this.pageInfo.pageSize,queryData).then(res=>{
          if(res.infoCode && res.infoCode  == 200){//成功
            this.pageInfo.total = res.data.total;
            this.list = res.data.list;
            //
          }else {
            //获取失败
            this.$message.error('网络异常');
          }
          this.options.loading = false;         
        }).catch(res=>{
          this.options.loading = false;     
          this.$message.error('网络异常');
        })             
      },
      //提交
      submitInfo(info){
        submit({
          "pxjssj": info.pxjssj,
          "pxkssj": info.pxkssj
        }).then(res=>{
          if(res.infoCode && res.infoCode == 200){
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
          }else {
            this.$message.error("网络异常");
          }
        }).catch(res=>{
          this.$message.error("网络异常");
        })
      },
      init(){
        new Promise((resolve,reject)=>{
          this.options.loading = true;
          getMaxQS({}).then(res=>{
            if(res.infoCode && res.infoCode == 200){
              this.dropDown = [];
              for(let i = 1;i<=res.data;i++){
                this.dropDown.push({
                  value:i,
                  label:`第 ${i} 期`
                })

              }
              resolve();
            }else {           
              reject();
            }
          }).catch(res=>{
            reject();
          })
        }).then(res=>{
          this.query();
          this.options.loading = false;
        }).catch(res=>{
          this.$message.error("网络异常")
          this.options.loading = false;
        })
      }
    },
    created(){
      this.init();
      
    }
    
  }
</script>

<style scoped>
  .trainingList {
    width: 98%;
    margin: auto;
  }

  .search-content {
    padding: 10px 28px 0;
    border: 1px solid #dedede;
    height: 60px;
  }

  .search-item {
    float: left;
    margin-left: 10px;
    width: 32%;
    height: 40px;
  }

  .time {
    width: 48%;
  }

  .trainingList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }
</style>
