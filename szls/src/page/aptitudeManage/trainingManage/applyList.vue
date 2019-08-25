<template>
  <div class="applyList">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">申请时间：</span>
        <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="startTime" placeholder="选择日期"
                        style="width: 180px"
                        clearable></el-date-picker>
        <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="endTime" placeholder="选择日期" style="width: 180px"
                        clearable></el-date-picker>
      </div>
      <div class="search-item chooseType">
        <span class="title-span">单据状态：</span>
        <el-select v-model="applyStatus" placeholder="请选择" style="width: 160px" clearable>
          <el-option
            v-for="item in applyStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="iconfont iconchaxun" @click="btnSearch">查询</el-button>
    </div>
    <div class="applyList-action">
      <el-Button type="primary" class="iconfont iconxinzeng" @click="handleAdd">新增</el-Button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        @handleSelectionChange="handleSelectionChange"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <applyModal v-if="applyInfoModal.centerDialogVisible" :applyInfoModal="applyInfoModal"
                @closeCallBack="closeCallBack"/>
  </div>
</template>

<script>
  import applyModal from "./component/applyModal";
  import tableView from '../../../components/table/el-index.vue';
  import {getApplyList} from '../../../api/aptitudeManage/trainingManage/index.js';


  export default {
    name: "applyList",
    components: {
      applyModal,
      tableView
    },
    data() {
      let self = this;
      return {
        applyInfoModal: {
          centerDialogVisible: false,
          id: '',
          type: ''
        },
        startTime: '',
        endTime: '',
        applyStatusOptions: [
          {
            value: '1',
            label: '待提交'
          }, {
            value: '2',
            label: '待市科员审核'
          }, {
            value: '3',
            label: '待市处长审核'
          }, {
            value: '4',
            label: '待省科员审核'
          }, {
            value: '5',
            label: '待省处长审核'
          }, {
            value: '6',
            label: '已通过'
          }, {
            value: '7',
            label: '已完成'
          }, {
            value: '8',
            label: '已过期'
          }, {
            value: '9',
            label: '驳回'
          }],
        applyStatus: '',
        list: [], // table数据
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: true, // 是否支持列表项选中功能
        }, // table 的参数
        columns: [
          {
            prop: 'ryxm',
            label: '申请人',
            align: 'center',
          },
          {
            prop: 'sqrq',
            label: '申请时间',
            align: 'center'
          },
          {
            prop: 'applyStatus',
            label: '单据状态',
            align: 'center',
            render: (h, params) => {
              return h('span', self.getStatusText(params.row.applyStatus));
            }
          },
          {
            label: '操作',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '5px'
                  }, // 组件的props
                  on: {
                    click: () => {
                      self.applyInfoModal.id = params.row.zzsqbh;
                      self.applyInfoModal.type = 1;
                      self.handleAdd();
                    }
                  }
                }, '详情'),
                h('a', {
                  on: {
                    click: () => {
                      self.applyInfoModal.id = params.row.zzsqbh;
                      self.handleAdd();
                    }
                  }
                }, '编辑')
              ])
            }
          },

        ],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          handleCurrentChange: (val) => {
            self.pageInfo.currentPage = val;
            self.renderPage();
          }
        }
      }
    },
    created: function () {

    },
    mounted: function () {
      this.getList();
    },
    methods: {
      // 选中行
      handleSelectionChange(val) {
        console.log('val:', val)
      },
      //新增
      handleAdd() {
        let self = this;
        self.applyInfoModal.centerDialogVisible = true;
      },
      btnSearch() {
        let self = this;
        self.renderPage();
      },
      renderPage() {
        this.pageInfo.currentPage = 1;
        this.getList();
      },
      //查询列表
      getList() {
        let self = this;
        let params = {
          pageIndex: self.pageInfo.currentPage,
          pageSize: self.pageInfo.pageSize,
          applyStatus: self.applyStatus,
          applyStartDate: self.startTime,
          applyEndDate: self.endTime
        };
        self.options.loading = true;
        getApplyList(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          self.options.loading = false;
          if (response && response.infoCode === 200) {
            self.list = response.data.list;
            self.pageInfo.total = response.data.total || 0;
          }
        }
      },
      getStatusText(value) {
        if (!value) return;
        let textIndex = this.applyStatusOptions.findIndex((item) => {
          return value == item.value;
        });
        if (textIndex == -1) return;
        return this.applyStatusOptions[textIndex].label
      },
      //弹层关闭回调函数
      closeCallBack() {
        this.applyInfoModal.id = '';
        this.applyInfoModal.type = '';
      }
    }
  };
</script>

<style scoped>
  .applyList {
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
    width: 48%;
    height: 40px;
  }

  .chooseType {
    width: 26%;
  }

  .applyList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }
</style>
