<template>
  <div class="certificateList">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">申请人：</span>
        <el-input v-model="ryxm" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">所在部门：</span>
        <el-input v-model="bmmc" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">地区：</span>
        <el-cascader :options="dqmcOptions" :show-all-levels="false" :props="props"></el-cascader>
      </div>
      <div class="search-item">
        <span class="title-span">单据状态：</span>
        <el-select v-model="zfzzt" placeholder="请选择" style="width: 180px" clearable>
          <el-option
            v-for="item in zfzztOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item time">
        <span class="title-span">申请时间：</span>
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="sqStartTime" placeholder="选择日期"
                        style="width: 180px" clearable></el-date-picker>
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="sqEndTime" placeholder="选择日期"
                        style="width: 180px" clearable></el-date-picker>
      </div>

      <el-button type="primary" class="iconfont iconchaxun" @click="btnSearch">查询</el-button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <certificateModal v-if="certificateModal.centerDialogVisible" :certificateModal="certificateModal"
                      @handleCallBack="handleCallBack"/>
    <certificateDetailModal v-if="certificateDetailModal.centerDialogVisible"
                            :certificateDetailModal="certificateDetailModal"/>
  </div>
</template>

<script>
  import tableView from '../../../components/table/el-index.vue';
  import certificateModal from './component/certificateModal.vue';
  import certificateDetailModal from './component/certificateDetailModal.vue';
  import {getCertificateList, getAreaList} from '../../../api/aptitudeManage/trainingManage/index.js';

  export default {
    name: "certificateList",
    components: {
      tableView,
      certificateModal,
      certificateDetailModal
    },
    data() {
      let self = this;
      return {
        certificateModal: {
          centerDialogVisible: false,
          id: ''
        },
        certificateDetailModal: {
          centerDialogVisible: false,
          id: ''
        },
        ryxm: '',
        bmmc: '',
        dqmc: '',
        dqmcOptions: [],
        zfzzt: '',
        zfzztOptions: [
          {
            label: '已发放',
            value: '1'
          },
          {
            label: '未发放',
            value: '0'
          }
        ],
        sqStartTime: '',
        sqEndTime: '',
        selectItemIdData: [],
        props: {
          label: 'areaName',
          value: 'area',
          children: 'childsArea'
        },
        list: [
          {
            id: '24',
            title: '天津利达粮油',
            state: 0,
            checkType: '日常检查'
          },
          {
            id: '23',
            title: '编号3',
            state: 1,
            checkType: '日常检查'
          },
          {
            id: '23',
            title: '编号3',
            state: 2
          },
          {
            id: '2',
            title: '编号3',
            state: 0
          },
          {
            id: '223',
            title: '编号3',
            state: 1
          },
          {
            id: '2444',
            title: '编号3',
            state: 1
          },
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
            prop: 'ryxm',
            label: '申请人',
            align: 'center',
          },
          {
            prop: 'dqmc',
            label: '地区',
            align: 'center'
          },
          {
            prop: 'bmmc',
            label: '所在部门',
            align: 'center',
          },
          {
            prop: 'zsffsj',
            label: '发放时间',
            align: 'center',
          },
          {
            prop: 'zfzzt',
            label: '单据状态',
            align: 'center',
            formatter: (row, column, cellValue) => {
              return `<span>${row.zfzzt == 1 ? '已发放' : '未发放'}</span>`
            }
          },
          {
            prop: 'state',
            label: '操作',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('a', {
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      self.showAddDialog();
                    }
                  }
                }, params.row.zfzzt == 1 ? '' : '证书发放'),
                h('a', {
                  on: {
                    click: () => {
                      self.certificateDetailModal.centerDialogVisible = true;
                      self.certificateDetailModal.id = params.row.rybh;
                    }
                  }
                }, '详情')
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
    created() {
      this.getList();
      this.getAreaList();
    },
    methods: {
      showAddDialog() {
        this.certificateModal.centerDialogVisible = true;
      },
      getList() {
        let self = this,
          params = {
            pageIndex: self.pageInfo.currentPage,
            pageSize: self.pageInfo.pageSize,
            ryxm: self.ryxm,
            bmmc: self.bmmc,
            dqmc: self.dqmc,
            sqStartTime: self.sqStartTime,
            sqEndTime: self.sqEndTime,
            zfzzt: self.zfzzt
          };
        getCertificateList(params).then(actionMethod).catch(actionMethod);
        self.options.loading = true;

        function actionMethod(response) {
          self.options.loading = false;
          if (response && response.infoCode === 200) {
            self.list = response.data.list;
            self.pageInfo.total = response.data.total;
          }
        }
      },
      getAreaList() {
        let self = this;
        getAreaList().then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          if (response && response.infoCode === 200) {
            self.dqmcOptions = response.data;
          }
        }
      },
      renderPage() {
        this.getList();
      },
      btnSearch() {
        this.pageInfo.currentPage = 1;
        this.renderPage();
      },
      handleCallBack() {
        this.renderPage();
      },

    }
  }
</script>

<style scoped>
  .certificateList {
    width: 98%;
    margin: auto;
  }

  .search-content {
    padding: 10px 28px 0;
    border: 1px solid #dedede;
    height: 120px;
  }

  .search-item {
    float: left;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 32%;
    height: 40px;
  }

  .time {
    width: 48%;
  }

  .title-span {
    display: inline-block;
    width: 60px;
    text-align: right;
  }

  .table-view {
    margin-top: 10px;
  }

</style>
