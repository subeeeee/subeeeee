<template>
  <div class="checkTalentPoolList">
    <div class="search-content">
      <el-row :gutter="10">

        <el-col :span="7">
          <span class="title-span chooseType">工作单位：</span>
          <el-select v-model="value" placeholder="请选择" style="width: 160px" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="7">
          <span class="title-span">人员属性：</span>
          <el-select v-model="value" placeholder="请选择" style="width: 160px" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <span class="title-span">状态：</span>
          <el-select v-model="value" placeholder="请选择" style="width: 160px" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="btnSearch()" class="iconfont iconchaxun">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="applyList-action">
      <el-Button type="primary" class="iconfont iconxinzeng" @click="handleAdd">新增</el-Button>
    </div>
    <div class="table-view">
      <template>
        <tableView
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :options="tablePar"
          :columns="columns"
          :pageInfo="pageInfo"
        ></tableView>
      </template>
      <div>
        <el-dialog title="查看" center :visible.sync="dialogVisible" width="68%" :before-close="handleClose">
          <operationSee></operationSee>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
         <el-dialog title="编辑" center :visible.sync="editVisible" width="68%" :before-close="handleClose">
          <operationEdit></operationEdit>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">保 存</el-button>
            <el-button type="primary" @click="editVisible = false">推 荐</el-button>
          </span>
        </el-dialog>
        <el-dialog title="审批" center :visible.sync="approvalVisible" width="68%" :before-close="handleClose">
          <operationApproval></operationApproval>
          <span slot="footer" class="dialog-footer">
            <el-button @click="approvalVisible = false">提 交</el-button>
            <el-button type="primary" @click="approvalVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <checkTalentPoolModal :talentPoolModal="talentPoolModal" />
  </div>
</template>

<script>
  import checkTalentPoolModal from "./component/checkTalentPoolModal";
  import tableView from "../../components/table/el-index.vue";
  import operationSee from "./component/operation_see";
  import operationEdit from "./component/operation_edit";
  import operationApproval from "./component/operation_approval";
  export default {
    name: "checkTalentPoolList",
    components: {
      tableView,
      checkTalentPoolModal,
      operationSee,
      operationEdit,
      operationApproval,
    },
    data() {
      return {
        talentPoolModal: {
          centerDialogVisible: false,
        },
        value: "",
        dialogVisible: false,
        editVisible:false,
        prohibitVisible:false,
        approvalVisible:false,
        // 选中行
        handleSelectionChange(val) {
          console.log("val:", val);
        },
        list: [
          {
            id: "24",
            title: "编号3",
            state: 0
          },
          {
            id: "23",
            title: "编号3",
            state: 1
          },
          {
            id: "23",
            title: "编号3",
            state: 2
          },
          {
            id: "2",
            title: "编号3",
            state: 0
          },
          {
            id: "223",
            title: "编号3",
            state: 1
          },
          {
            id: "2444",
            title: "编号3",
            state: 1
          }
        ],
        pageInfo: {
          currentPage: 2,
          pageSize: 10,
          total: 100,
          handleSizeChange: val => {
            console.log(val);
          },
          handleCurrentChange: val => {
            console.log(val);
          }
        },
        tablePar: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false, // 是否支持列表项选中功能
          showIndex: true //是否显示选择框
        },
        options: {
          stripe: true, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: true, // 是否支持当前行高亮显示
          mutiSelect: false // 是否支持列表项选中功能
        }, // table 的参数
        columns: [
          {
            prop: "title",
            label: "名称",
            align: "center"
          },
          {
            prop: "title",
            label: "电话号码",
            align: "center"
          },
          {
            prop: "title",
            label: "工作单位",
            align: "center"
          },
          {
            prop: "title",
            label: "职称",
            align: "center"
          },
          {
            prop: "title",
            label: "职务",
            align: "center"
          },
          {
            prop: "title",
            label: "检查类型",
            align: "center"
          },
          {
            prop: "title",
            label: "状态",
            align: "center"
          },
          {
            prop: "state",
            label: "操作",
            align: "center",
            render:(h , params) => {
              return h("a" , [
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.dialogVisible = true
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.editVisible = true
                      }
                    }
                  },
                  " 编辑"
                ),
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.approvalVisible = true
                      }
                    }
                  },
                  " 审批"
                ),
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.btnDisable()
                      }
                    }
                  },
                  " 禁用"
                ),
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.btnEnable()
                      }
                    }
                  },
                  " 启用"
                ),
                h(
                  "span",
                  {
                    on:{
                      click: () => {
                        this.btnRecommend()
                      }
                    }
                  },
                  " 推荐"
                ),
              ])
            }
          }
        ],
      };
    },
    methods: {
      //新增
      handleAdd() {
        let that = this;
        that.talentPoolModal.centerDialogVisible = true;
      },
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      btnDisable(){
       this.$message.success('指标禁用成功');
      },
      btnEnable(){
       this.$message.success('指标启用成功');
      },
      btnRecommend() {
        this.$confirm('是否将该人才推荐给市局?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '推荐成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消推荐'
          });
        });
      }
  },
  }
</script>

<style scoped>
  .checkTalentPoolList {
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
    width: 200px;
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
