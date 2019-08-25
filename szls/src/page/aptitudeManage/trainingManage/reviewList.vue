<template>
  <div class="reviewList">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">申请人：</span>
        <el-input placeholder="请输入申请人" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">所在部门：</span>
        <el-input placeholder="请输入所在部门" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">地区：</span>
        <el-select v-model="value" placeholder="请选择" style="width: 160px" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item chooseType">
        <span class="title-span">单据状态：</span>
        <el-select v-model="value" placeholder="请选择" style="width: 180px" clearable>
          <el-option
            v-for="item in reviewOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="search-item time">
        <span class="title-span">申请时间：</span>
        <el-date-picker type="date" placeholder="选择日期" style="width: 160px" clearable></el-date-picker>
        <el-date-picker type="date" placeholder="选择日期" style="width: 160px" clearable></el-date-picker>
      </div>
      <el-button type="primary" class="iconfont iconchaxun" @click="btnSearch">查询</el-button>
    </div>
    <div class="reviewList-action">
      <el-Button type="primary" class="iconfont iconshenpi" @click="btnBatchReview">批量审核</el-Button>
    </div>
    <div class="table-view">
      <tableView
        :list="list"
        :options="options"
        :columns="columns"
        :pageInfo="pageInfo"
        @handleSelectionChange="handleSelectionChange"
      ></tableView>
    </div>
    <detailModal v-if="detailModal.centerDialogVisible" :applyInfoModal="detailModal"/>
    <reviewModal v-if="checkInfoModal.centerDialogVisible" :checkInfoModal="checkInfoModal" @="handleCallBack"/>
  </div>
</template>

<script>
  import tableView from '../../../components/table/el-index.vue';
  import detailModal from './component/applyModal.vue';
  import reviewModal from './component/checkModal.vue';
  import {batchReview} from '../../../api/aptitudeManage/trainingManage/index.js';

  export default {
    name: "reviewList",
    components: {
      tableView,
      detailModal,
      reviewModal
    },
    data() {
      return {
        detailModal: {
          centerDialogVisible: false,
          id: '',
          type: ''
        },
        checkInfoModal: {
          centerDialogVisible: false,
          type: ''
        },
        singleReviewModal: {
          centerDialogVisible: false
        },
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        value: '',
        reviewOptions: [
          {
            value: '1',
            label: '已提交'
          },
          {
            value: '2',
            label: '通过'
          },
          {
            value: '3',
            label: '驳回'
          }
        ],
        selectItemIdData: [],
        list: [
          {
            id: '24',
            title: '编号3',
            state: 0
          },
          {
            id: '23',
            title: '编号3',
            state: 1
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
          mutiSelect: true, // 是否支持列表项选中功能
        }, // table 的参数
        columns: [
          {
            prop: 'id',
            label: '申请人',
            align: 'center',
          },
          {
            prop: 'id',
            label: '地区',
            align: 'center',
          },
          {
            prop: 'id',
            label: '所在部门',
            align: 'center',
          },
          {
            prop: 'id',
            label: '申请时间',
            align: 'center',
          },
          {
            prop: 'title',
            label: '单据状态',
            align: 'center',
            formatter: (row, column, cellValue) => {
              return `<span>${row.title}</span>`
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
                  }, // 组件的props
                }, '详情'),
                h('a', {
                  style: {
                    marginRight: '5px'
                  }, // 组件的props
                  on: {
                    click: () => {
                      this.$confirm('此操作将通过审核', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.$message.success('操作成功');
                      }).catch(() => {

                      })
                    }
                  }
                }, '通过'),
                h('a', {
                  on: {
                    click: () => {
                      this.btnSingleReview();
                    }
                  }
                }, '驳回')
              ])
            }
          },

        ],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          handleCurrentChange: (val) => {
            this.pageInfo.currentPage = val;
            this.renderPage();
          }
        }

      }
    },
    methods: {
      btnBatchReview() {
        if (!this.selectItemIdData.length) {
          this.$message.error("请至少选择一项");
          return;
        }
        this.checkInfoModal.type = 1;
        this.checkInfoModal.ids = this.selectItemIdData;
        this.checkInfoModal.centerDialogVisible = true;
      },
      handleSelectionChange(data) {
        let self = this,
          resultArray = [];
        if (!data) return;
        data.forEach(function (item) {
          resultArray.push(item.id);
        })
        self.selectItemIdData = resultArray;
      },
      btnSearch() {
        this.pageInfo.currentPage = 1;
        this.renderPage();
      },
      renderPage() {

      },
      btnSingleReview() {
        this.singleReviewModal.centerDialogVisible = true;
      },
      handleCallBack() {
        this.selectItemIdData.length = 0;
      }
    }
  }
</script>

<style scoped>
  .reviewList {
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

  .chooseType {
    width: 32%;
  }

  .title-span {
    display: inline-block;
    width: 60px;
    text-align: right;
  }

  .reviewList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }
</style>
