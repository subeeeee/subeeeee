<template>
  <div class="assessmentList">
    <div class="search-content">
      <div class="search-item time">
        <span class="title-span">考核日期：</span>
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable
          :picker-options="selectStartTime"
          v-model="startTime"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-date-picker type="date" placeholder="选择日期" style="width: 180px" clearable
          :picker-options="selectEndTime"
          v-model="endTime"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="search-item">
        <span class="title-span">期数：</span>
        <el-select v-model="stage" placeholder="请选择" style="width: 180px" clearable>
          <el-option
            v-for="item in stages"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="iconfont iconchaxun" @click="query">查询</el-button>
    </div>
    <div class="assessmentList-action">
      <el-Button type="primary" class="iconfont iconxinzeng" @click="showAddDialog(0)">新增</el-Button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <assessmentModal :assessmentInfoModal="assessmentInfoModal" v-if="assessmentInfoModal.centerDialogVisible"/>
    <assessmentResultModal :assessmentResultInfoModal="assessmentResultInfoModal" v-if="assessmentResultInfoModal.centerDialogVisible"/>
  </div>
</template>

<script>
  import tableView from '../../../components/table/el-index.vue';
  import assessmentModal from './component/assessmentModal.vue';
  import assessmentResultModal from './component/assessmentResultModal.vue';


  import {getList,getSubmit,getAssessmentList} from '@/api/aptitudeManage/trainingManage/index'
  export default {
    name: "assessmentList",
    components: {
      tableView,
      assessmentModal,
      assessmentResultModal
    },
    data() {
      let self = this;
      return {
        //新增
        assessmentInfoModal: {
          centerDialogVisible: false,         
          info:"",
          update:self.query
        },
        //考核结果弹框
        assessmentResultInfoModal:{
          centerDialogVisible:false,
          //khjssj:"", //考核结束时间
          //khkssj:"",//考核开始时间
          //khqs:"",//考核期数
          //判断是查看 还是 新增
          // 1 表示新增  
          // 2 表示查看
          info:{},
          resultOrcheck:"",
          update:self.query

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
            prop: 'khdw',
            label: '考核单位',
            align: 'center',
          },
          {
            prop: 'khrq',
            label: '考核时间',
            align: 'center',
            // formatter: (row, column, cellValue) => {
            //   return `<span>${row.title}</span>`
            // }
          },
          {
            prop: 'khqs',
            label: '考核期数',
            align: 'center',
          },
          {
            prop: 'khrs',
            label: '考核人数',
            align: 'center',
          },
          {
            prop: 'khsjrs',
            label: '实际考核人数',
            align: 'center',
          },
          {
            prop: 'khjkrmc',
            label: '考核人',
            align: 'center',
          },
          {
            prop: 'state',
            label: '操作',
            align: 'center',
            width: 150,
            render: (h, params) => {
              if(params.row.khstatus == 0){
                return h('div', [
                  h('a', {
                    style: {
                      marginRight: '5px'
                    }, // 组件的props
                    on: {
                      click: () => {
                        console.log(params.row);
                        self.assessmentResultInfoModal.resultOrcheck = 1;
                        self.showAddDialog(1,params.row);
                      }
                    }
                  }, '考核结果'),
                  h('a', {
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        self.submission(params.row);
                        //console.log(params.row);
                
                      }
                    }
                  }, '提交'),
                  h('a', {
                    on: {
                      click: () => {
                        //表示点击了查看按钮
                        self.assessmentResultInfoModal.resultOrcheck = 2;
                        console.log(params.row);
                        self.showAddDialog(2,params.row);
                        
                      }
                    }
                  }, '查看')
                ])
              }else {
                return  h('div', [
                  h('a', {
                    style: {
                      marginRight: '5px'
                    }, // 组件的props
                    on: {
                      click: () => {
                        console.log(params.row);
                        self.assessmentResultInfoModal.resultOrcheck = 1;
                        self.showAddDialog(1,params.row);
                      }
                    }
                  }, '考核结果'),
                  h('a', {
                    on: {
                      click: () => {
                        //表示点击了查看按钮
                        self.assessmentResultInfoModal.resultOrcheck = 2;
                        console.log(params.row);
                        self.showAddDialog(2,params.row);
                        
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
          pageSize: 3,
          total: 1,
          handleSizeChange: (val) => {            
            //console.log(val)
          },
          handleCurrentChange: (val) => {
           console.log("当前是第"+val+"页");
           this.pageInfo.currentPage = val;
           this.query();
          }
        },
        //开始时间 与 结束时间 选择
        startTime:"", //这个是与输入框双向绑定的
        endTime:"", //这个是与输入框双向绑定的
        stage:"", //期数结果 与输入框双向绑定的
        tempStartTime:"", //用于暂时保存这个数据
        tempEndTime:"", //用于暂时保存这个数据
        tempStage:"",  //临时保存的数据
        
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
        //期数下拉
        stages:[
          
        ],
      }
    },
    methods: {
      showAddDialog(type,info) {
        if(type == 0){
          this.assessmentInfoModal.centerDialogVisible = true;
        }else {
          console.log(info);
          this.assessmentResultInfoModal.info  = info;
          this.assessmentResultInfoModal.centerDialogVisible = true;
          this.assessmentResultInfoModal.resultOrcheck=type==1?1:2;
        }     
      },
      //查询按钮
      query(){       
        this.options.loading = true;
        //临时保存
        this.tempStartTime = this.startTime;
        this.tempEndTime = this.endTime;
        this.tempStage = this.stage;

        const d = {
          "khEndDate":this.tempEndTime,
          "khStartDate":this.tempStartTime,
          "khqs":this.stage,
        }
        getList(this.pageInfo.currentPage,this.pageInfo.pageSize,d).then(res=>{
          if(res.infoCode && res.infoCode == 200){
            this.pageInfo.total = res.data.total;
            this.list = res.data.list;
          }else {
            throw new Error("网络异常");
          }
          this.options.loading = false;
        }).catch(res=>{
          throw new Error("网络异常");
          this.options.loading = false
        });
      },
      //提交按钮
      submission(info){
        getSubmit('1',
          {
            "khEndDate": info.khjssj,//考核结束时间
            "khStartDate": info.khkssj,//考核开始时间 
            "khqs":""           
          },
          
        ).then(res=>{
          if(res.infoCode && res.infoCode == 200){
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
            //再次调用获取数据
            this.query();
          }else {
            this.$message.error("网络异常,操作失败");
          }
        })
        
      },
      //获取期数列表
      getQSList(){
        getAssessmentList().then(res=>{
          if(res.infoCode && res.infoCode == 200){
            const result = res.data.map(item=>{
              return {               
                value:item,
                label:`第 ${item} 期`,
              }
            })
            this.stages = result;            
          }else {
            throw new Error("网络异常");
          }
        }).catch(error=>{
          throw new Error("网络异常");
        })
      },
      async init(){
        await this.getQSList()
        await this.query();
      }
    },
    created(){  

     this.init().catch(res=>{
       this.$message.error("网络异常");
     })
    }
  }
</script>

<style scoped>
  .assessmentList {
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

  .assessmentList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }
</style>
