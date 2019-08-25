<template>
  <div class="enterpriseInformationList">
    <div class="search-content">
      <div class="search-item">
        <span class="title-span">企业名称：</span>
        <el-input v-model="qymc" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span span-inline-block span-right">组织机构代码：</span>
        <el-input v-model="zzjgdm" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span">是否具有粮食收购资格许可：</span>
        <el-select v-model="PermitValue"  style="width: 120px" clearable>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>检查类型：</span>
        <el-input disabled v-model="jc_type" style="width: 180px" clearable></el-input>
      </div>
      <div class="search-item">
        <span class="title-span span-inline-block span-right">状态：</span>
        <!-- <el-input v-model="status" style="width: 180px" clearable></el-input> -->
        <template>
          <el-select v-model="searchValue" placeholder="请选择" style="width: 180px" clearable>
            <el-option v-for="item in status" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="search-item">
          <el-button type="primary" class="iconfont iconchaxun" @click="btnSearch">查询</el-button>
        <!-- <el-button type="primary" class="btn_Search" @click="btnSearch()">查询</el-button> -->
      </div>
    </div>
    <div class="table-view">
      <tableView :list="list" :options="options" :columns="columns" :pageInfo="pageInfo"></tableView>
    </div>
  </div>
</template>

<script>
  import tableView from '../../components/table/el-index.vue';
  import {
    getEnterpriseInformationList
  } from '../../api/enterpriseInformation/index.js'
  import axios from "axios";
  export default {
    name: "enterpriseInformationList",
    components: {
      tableView
    },
    data() {
      let self = this;
      return {
        value: '',
        qymc: '', //企业名称
        zzjgdm: '', //组织机构代码
        jc_type: "全部",//检查类型
        current_status:"",//当前状态
        current_Permit:"",//当前许可
        searchValue:"",
        PermitValue:"",
        status: [{
          id: 0,
          label: '全部'
        }, {
          id: 1,
          label: '已提交'
        }, {
          id: 2,
          label: '待提交'
        }, {
          id: 3,
          label: '生效中'
        }, {
          id: 4,
          label: '已驳回'
        }],
        value: '', //状态jk
        searchValue:"",
        form: {
          region: ""
        },
        list: [], // table数据
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false, // 是否支持列表项选中功能
          showIndex: true,
        }, // table 的参数
        columns: [{
            prop: 'qymc',
            label: '企业名称',
            align: 'center',
          },
          {
            prop: 'zzjgdm',
            label: '组织机构代码',
            align: 'center',
          },
          {
            prop: 'qylx',
            label: '检查类型',
            align: 'center',
          },
          {
            prop: 'fddbr',
            label: '法定代表人',
            align: 'center',
          },
          {
            prop: 'bgdh',
            label: '联系人',
            align: 'center',
          },
          {
            prop: 'bgdh',
            label: '联系电话',
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
                      self.jumpDetail(params);
                    }
                  }
                }, '查看'),
                h('a', {
                  on: {
                    click: () => {
                      this.$message.success('指标禁用成功');
                    }
                  }
                }, '禁用'),
                h('a', {
                  on: {
                    click: () => {
                      this.$message.success('指标启用成功');
                    }
                  }
                }, ' 启用')
              ])
            }
          },

        ],
        pageInfo: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          handleSizeChange: (val) => {
            console.log(val)
          },
          handleCurrentChange: (val) => {
            self.pageInfo.currentPage = val;
            self.renderPage();
          }
        }
      }
    },
    mounted(){

    },
    created: function() {
      this.getList();
    },
    methods: {

      jumpDetail: function(id) {
        if (!id) return;
        let self = this;
        self.$router.push({
          path: 'enterpriseInformationDetail',
          query: {
            id: '1'
          }
        })
      },
      getList: function() {
        // console.log(this.searchValue)
        let self = this;
        let params = {
          pageIndex: 1,
          pageSize: 10,
          qymc: self.qymc,
          zzjgdm: self.zzjgdm,
          status: self.searchValue,
        }
        getEnterpriseInformationList(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          if (response && response.infoCode === 200) {
            self.pageInfo.total = response.data.total;
            self.list = response.data.list;
          }

        }
      },
      renderPage() {
        this.getList();
      },
      btnSearch() {

        this.renderPage();
      }
    },
    mounted() {
      // this.get_msg();
    }
  }
</script>

<style scoped>
  .enterpriseInformationList .search-content {
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

  .btn_Search {
    margin-left: 70px;
  }

  .chooseType {
    width: 26%;
  }

  .search-item .span-inline-block {
    display: inline-block;
    width: 85px;
  }

  .applyList-action {
    text-align: left;
    padding-top: 10px;
  }

  .table-view {
    margin-top: 10px;
  }

  .span-right {
    text-align: right;
  }
</style>
