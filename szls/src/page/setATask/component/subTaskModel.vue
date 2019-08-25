<template>
  <div class="subTaskModel">
    <el-dialog
      title="子任务查看"
      :visible.sync="subTaskModel.dialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <tableView
        :list="options"
        @handleSelectionChange="handleSelectionChange"
        :options="tablePar"
        :columns="columns"
      ></tableView>
       <tableView
        :list="options"
        @handleSelectionChange="handleSelectionChange"
        :options="tablePar"
        style="margin-top:20px"
        :columns="columns"
      ></tableView>
       <tableView
        :list="options"
        @handleSelectionChange="handleSelectionChange"
        :options="tablePar"
        style="margin-top:20px"
        :columns="columns"
      ></tableView>
    </el-dialog>
  </div>
</template>

<script>
import tableView from "../../../components/table/el-index";
export default {
  props: {
    subTaskModel: Object
  },
  components: {
    tableView
  },
  data() {
    return {
      tablePar: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        showIndex: true //是否显示选择框
      }, // table 的参数
      radio: "1",
      labelwidthStyle: "155px",
      genderOptions: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "2"
        }
      ],
      dataaaa: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      columns: [
        {
          prop: "label",
          label: "任务编号",
          align: "center"
        },
        {
          prop: "label",
          label: "检查组",
          align: "center"
        },
        {
          prop: "label",
          label: "被查单位",
          align: "center"
        },
        {
          prop: "label",
          label: "组长",
          align: "center"
        },
        {
          prop: "label",
          label: "检查时间",
          align: "center"
        },
        {
          prop: "label",
          label: "状态",
          align: "center"
        }
      ],
      searchData: {
        taskType: "" //任务类型
      },
      fileList: []
    };
  },
  created() {},
  methods: {
    save() {
      this.subTaskModel.dialogVisible = false;
    },
    handleSelectionChange(){
        
    }
  }
};
</script>

<style scoped="scoped">
</style>
