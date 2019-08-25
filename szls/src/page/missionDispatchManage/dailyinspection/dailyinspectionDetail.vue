<template>
  <div>
    <div class="dailyinspectionDetail_title">
        <h2 style="font-size: 16px;margin-left: 5px;">任务列表</h2>
    </div>
    <div class="dailyinspectionDetail_content">
      <el-form>
        <el-row>
          <el-col :span="12">
            <span>任务编号：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
          <el-col :span="10">
            <span>任务名称：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="12">
            <span>检查项目：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
          <el-col :span="10">
            <span>检查子项：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="24">
            <span>检查内容：</span>
            <el-input style="width:81.3%;"></el-input>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="11">
            <span>检查单位：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
          <el-col :span="11">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;被检单位类型：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="12">
            <el-form-item label="被检单位选择方式：">
              <el-radio-group v-model="form.resource">
                <el-radio label="单一"></el-radio>
                <el-radio label="组合"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 检查方式:">
              <el-radio-group v-model="form.resource">
                <el-radio label="现场检查"></el-radio>
                <el-radio label="远程检查"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>检查开始时间：</span>
            <el-date-picker type="date" style="width:276px;" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="11">
            <span>检查结束时间：</span>
            <el-date-picker type="date" style="width:276px;" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="24">
            <el-form-item label="检查组取得方式：">
              <el-radio-group v-model="form.resource">
                <el-radio label="双随机"></el-radio>
                <el-radio label="被查单位抽取"></el-radio>
                <el-radio label="指定"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span>关联文件：</span>
          </el-col>
          <el-col :span="12">
            <span>附件：</span>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="24" >
            <h1>检查表单</h1>
            <inspectTableView
              :list="list"
              @handleSelectionChange="handleSelectionChange"
              :options="tablePar"
              :columns="columns"
            ></inspectTableView>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h1>检查组</h1>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h2 style="font-size: 16px;">&nbsp;&nbsp;&nbsp;检查组一</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <h2>&nbsp;检查人员</h2>
            <inspectTableView
              :list="list"
              @handleSelectionChange="handleSelectionChange"
              :options="tablePar"
              :columns="columns"

            ></inspectTableView>
          </el-col>
           <el-col :span="1" >
            <span>&nbsp;</span>

          </el-col>
          <el-col :span="10" >
            <h2>被查单位</h2>
            <inspectTableView
              :list="list"
              @handleSelectionChange="handleSelectionChange"
              :options="tablePar"
              :columns="columns"

            ></inspectTableView>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h2 style="font-size: 16px;">&nbsp;&nbsp;&nbsp;检查组二</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
            <h2>&nbsp;检查人员</h2>
            <inspectTableView
              :list="list"
              @handleSelectionChange="handleSelectionChange"
              :options="tablePar"
              :columns="columns"

            ></inspectTableView>
          </el-col>
           <el-col :span="1" >
            <span>&nbsp;</span>

          </el-col>
          <el-col :span="10" >
            <h2>被查单位</h2>
            <inspectTableView
              :list="list"
              @handleSelectionChange="handleSelectionChange"
              :options="tablePar"
              :columns="columns"

            ></inspectTableView>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="12">
            <span>下发人：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
          <el-col :span="12">
            <span>下发时间：</span>
            <el-input class="inputWidth"></el-input>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br />
  </div>
</template>

<script>
  import inspectTableView from "../../../components/table/el-index.vue";
  export default{
    components: {
      inspectTableView
    },
    data(){
      return{
          form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
        ],
        handleSelectionChange(val) {
          console.log("val:", val);
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
        },
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
        columns: [
          {
            prop: "title",
            label: "表单名称",
            align: "center"
          },
          {
            prop: "state",
            label: "操作",
            align: "center",
            render:(h,params)=>{
              return h("a",[
                h(
                  "span",
                  {
                    on:{
                      click: ()=> {

                      this.$router.push("/dailyinspectionDetail_see")
                      }
                    }
                  },
                  "查看"
                )
              ]

              )
            }
          }
        ],
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style scoped>
  .inputWidth {
    width: 300px;
  }
  .dailyinspectionDetail_content{
    border: 1px solid #ccc;
    padding: 10px 10px 10px 30px;
  }
</style>
