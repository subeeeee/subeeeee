<template>
  <div>
    <el-form>
      <el-row>
        <el-col :span="12">
          <span>任务编号：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="12">
          <span>任务名称：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="12">
          <span>检查范围：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="12">
          <span>检查任务：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="12">
          <span>检查单位：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="12">
          <span>被检单位类型：</span>
          <el-input style="width: 57%" class="inputWidth"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-radio-group v-model="form.resource" style="width: 100%;">
              <el-form-item label="检查方式：">
                <el-radio label="现场检查"></el-radio>
                <el-radio label="远程检查"></el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <span>检查开始时间：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 57%;"></el-date-picker>
        </el-col>
        <el-col :span="12">
          <span>检查结束时间：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 57%;"></el-date-picker>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col>
          <h1>待查表单</h1>
        </el-col>
      </el-row>
      <el-row>
        <tobeInvestigated
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :options="tablePar"
          :columns="columns"
        >

        </tobeInvestigated>
      </el-row>
      <br />
      <el-row>
        <el-col>
          <h1>检查组</h1>
        </el-col>
      </el-row>
      <el-row>
        <tobeInvestigated
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :options="tablePar"
          :columns="columns"
        >

        </tobeInvestigated>
      </el-row>
      <br />
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-radio-group v-model="form.resource2" style="width: 100%;">
              <el-form-item label="整改类型：">
                <el-radio label="现场整改"></el-radio>
                <el-radio label="行政处罚"></el-radio>
                <el-radio label="限期整改"></el-radio>
                <el-radio label="无需整改"></el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <span>整改截止时间：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 57%;"></el-date-picker>
        </el-col>
        <el-col :span="12">
          <span>延期申请：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 57%;"></el-date-picker>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-radio-group v-model="form.resource3" style="width: 100%;">
              <el-form-item label="是否下达责令整改通知单：">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form>
        </el-col>

      </el-row>
      <br />
      <el-row>
        <el-col>
          <h1>整改通知单</h1>
        </el-col>
      </el-row>
      <el-row>
        <tobeInvestigated
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :options="tablePar"
          :columns="columns"
        >

        </tobeInvestigated>
      </el-row>
      <br />
      <el-row>
        <el-col :span="12">
          <el-form>
            <el-radio-group v-model="form.resource4" style="width: 50%;">
              <el-form-item label="是否延期：">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form>
        </el-col>
        <el-col :span="12">
          <span>延期申请：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 57%;"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span style="display:inline-block;padding-top:20px;">延期原因：</span>
        </el-col>
        <el-col :span="20">
          <el-input type="textarea" style="width: 98%" v-model="form.desc"></el-input>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <tobeInvestigated
          :list="list"
          @handleSelectionChange="handleSelectionChange"
          :options="tablePar"
          :columns="columns"
        >
        </tobeInvestigated>
      </el-row>
      <br />
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-radio-group v-model="form.resource5" style="width: 100%;">
              <el-form-item label="是否上传至天津市执法平台上：">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-form-item>
            </el-radio-group>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h1>审批意见</h1>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col>
          <div class="approval_border">
            <el-radio-group v-model="form.resource4" style="width: 50%;">
              <el-form-item label="是否延期：">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-form-item>
            </el-radio-group>
            <el-row>
              <el-col :span="12">
                <span>检查范围：</span>
                <el-input class="inputWidth"></el-input>
              </el-col>
              <el-col :span="12">
                <span>检查任务：</span>
                <el-input class="inputWidth"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="12">
          <span>任务编号：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
        <el-col :span="12">
          <span>任务名称：</span>
          <el-input class="inputWidth"></el-input>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    import tobeInvestigated from "../../../../components/table/el-index"
    export default {
        components:{
            tobeInvestigated,
        },
        data(){
            return{
                labelwidthStyle: "120px",
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    resource2: '',
                    resource3: '',
                    resource4: '',
                    resource5: '',
                    desc: ''
                },
                list: [
                    {
                        id: "24",
                        title: "编号3",
                        state: 0
                    }
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
  .approval_border{
    border: 1px dashed #ccc;
    border-radius: 8px;
    padding: 10px;
  }
</style>
