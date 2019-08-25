<template>
  <div class="checkIndicatorList">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">指标项内容：</span>
        <el-input style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">指标范围：</span>
        <el-input style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">任务类型：</span>
        <el-input style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">状态：</span>
        <el-input style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item time">
        <span class="title-span">提交时间：</span>
        <el-date-picker style="width: 120px" clearable></el-date-picker>
        <el-date-picker style="width: 120px" clearable></el-date-picker>
      </div>
      <el-button type="primary" class="iconfont iconchaxun">查询</el-button>
    </div>
    <div class="checkIndicatorList-action">
      <el-button type="primary" icon="iconfont iconxinzeng" @click="btnAdd">新增</el-button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
      ></tableView>
    </div>
    <detailModal :checkIndicatorDetailModal="detailModal"/>
  </div>
</template>

<script>
  import tableView from '../../components/table/el-index.vue';
  import detailModal from './checkIndicatorDetail.vue';

  export default {
    name: "checkIndicatorList",
    components: {
      tableView,
      detailModal
    },
    data() {
      let self = this;
      return {
        list: [
          {
            id: '24',
            title: '天津利达粮油',
            state: 0,
            checkType: '日常检查'
          }
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
            prop: 'qymc',
            label: '企业名称',
            align: 'center',
          },
          {
            prop: 'zzjgdm',
            label: '指标项内容',
            align: 'center',
          },
          {
            prop: 'qylx',
            label: '指标范围',
            align: 'center',
          },
          {
            prop: 'fddbr',
            label: '任务类型',
            align: 'center',
          },
          {
            prop: 'bgdh',
            label: '数据类型',
            align: 'center',
          },
          {
            prop: 'bgdh',
            label: '提交人',
            align: 'center',
          },
          {
            prop: 'status',
            label: '提交时间',
            align: 'center',
          },
          {
            prop: 'status',
            label: '状态',
            align: 'center',
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
                      self.btnAdd(params);
                    }
                  }
                }, '查看'),
                h('a', {
                  on: {
                    click: () => {

                    }
                  }
                }, '禁用')
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
        },
        detailModal: {
          centerDialogVisible: false
        }
      }
    },
    methods: {
      renderPage() {

      },
      btnAdd() {
        this.detailModal.centerDialogVisible = true;
      }
    }
  }
</script>

<style scoped>
  .checkIndicatorList {
    margin: auto;
    width: 98%;
  }

  .checkIndicatorList .search-content {
    padding: 10px 28px 0;
    border: 1px solid #dedede;
    height: 120px;
  }

  .search-item {
    float: left;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 30%;
    height: 40px;
  }

  .time {
    width: 40%;
  }

  .checkIndicatorList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }
</style>
