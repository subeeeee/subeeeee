
<template>
  <div class="table">
    <el-table id="iTable" v-loading.iTable="options.loading" :data="list" :stripe="options.stripe"
              ref="mutipleTable"
              :border="true"
              @selection-change="handleSelectionChange" :header-cell-style="{'background':'#FAFAFA','color':'#333','font-weight':'600'}">
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;">
      </el-table-column>
      <el-table-column v-if="options.showIndex" type="index" label="序号" width="55px;" align="center">
      </el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column :prop="column.prop"
                         :key='column.label'
                         :label="column.label"
                         :align="column.align"
                         :width="column.width">
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>
              <template v-else>
                <span>{{scope.row[column.prop]}}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
    </el-table>
    <div class="pagination-info" v-if="pageInfo">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  export default {
    name: "index",
    props: {
      list: {
        type: Array,
        default: []
      }, // 数据列表
      columns: {
        type: Array,
        default: []
      }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
      options: {
        type: Object,
        default: {
          stripe: false, // 是否为斑马纹 table
          highlightCurrentRow: false, // 是否要高亮当前行
          loading: false,
          showIndex:false,//是否显示序号
        },
      }, // table 表格的控制参数
      pageInfo: Object //分页信息
    },
    components: {
      expandDom: {
        functional: true,
        props: {
          row: Object,
          render: Function,
          index: Number,
          column: {
            type: Object,
            default: null
          }
        },
        render: (h, ctx) => {
          const params = {
            row: ctx.props.row,
            index: ctx.props.index
          }
          if (ctx.props.column) params.column = ctx.props.column
          return ctx.props.render(h, params)
        }
      }
    },
    data() {
      return {
        pageIndex: 1,
        multipleSelection: [] // 多行选中
      }
    },
    mounted() {
    },
    computed: {},
    methods: {

      // 多行选中
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.$emit('handleSelectionChange', val)
      },
      // 显示 表格操作弹窗
      showActionTableDialog() {
        this.$emit('handelAction')
      },
      //点击页显示行数回调
      handleSizeChange(val) {
        this.pageInfo.handleSizeChange && this.pageInfo.handleSizeChange(val);
      },
      //点击当前页码回调
      handleCurrentChange(val) {
        this.pageInfo.handleCurrentChange && this.pageInfo.handleCurrentChange(val);
      }

    }
  }
</script>

<style scoped>
  .pagination-info {
    margin-bottom: 10px;
  }
</style>
