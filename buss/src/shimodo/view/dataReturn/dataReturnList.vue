<template>
  <div class="survey public">
    <h2>资料上传任务列表<a class="help" :href="pdf" target="_blank">查看系统操作手册</a></h2>
    <div class="show_list_title">
      <h3><img src="./../../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="condition.orderNum"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="condition.borrowerName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="condition.city" placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in condition.citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务完成时间</el-col>
        <el-col :span="6">
          <el-date-picker  :editable="false" size="small" class="select_width" v-model="condition.surveyTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1"  class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="condition.taskState" placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option :key="'10'" :label="'待处理'" :value="'10'"></el-option>
            <el-option :key="'30'" :label="'进行中'" :value="'30'"></el-option>
            <el-option :key="'90'" :label="'已完成'" :value="'90'"></el-option>
            <el-option :key="'60'" :label="'补充材料'" :value="'60'"></el-option>
            <el-option :key="'80'" :label="'公众号已上传'" :value="'80'"></el-option>
            <el-option :key="'101'" :label="'已过期'" :value="'101'"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">渠道简称</el-col>
        <el-col :span="6">
          <el-input size='small'  v-model="condition.orgName"></el-input>
        </el-col>
      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <!-- 列表展示 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>

    <el-table :data="tableData" border class="table">
     <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="120"></el-table-column>
     <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="140"></el-table-column>
     <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="140"></el-table-column>
     <el-table-column header-align="center" align="center" prop="guaLocal" label="抵押物坐落" min-width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="plotName" label="社区名称" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="circulationTime" label="任务流转时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskperName" label="任务员姓名" width="120"></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="160">
        <template scope="scope">
          <el-button type="text" size="small" @click="btnClick(scope.row,'处理')" v-show="scope.row.taskStatus == '待处理' || scope.row.taskStatus == '公众号已上传' || scope.row.taskStatus == '进行中' || scope.row.taskStatus == '初审打回'" v-if="currentUserPermissions.indexOf('business:survey:datareturn:handle') != -1">处理</el-button>
          <el-button type="text" size="small" @click="btnClick(scope.row,'补充材料')" v-if="currentUserPermissions.indexOf('business:survey:datareturn:supplement') != -1" v-show="scope.row.taskStatus == '补充材料'" >补充材料</el-button>
          <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:survey:datareturn:query') != -1">详情</el-button>
          <el-button type="text" size="small" @click="checkFn(scope.row)">查看初评信息</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.numPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"></el-pagination>

    <el-dialog
      title="初评信息"
      :visible.sync="dialogVisible"
      width="20%"
      :before-close="handleClose" class="el_dialog_40">
      <el-row class="tableInfo table_height">
        <el-col :span="24"   class="table_tr">
          <el-col :span="10"  class="table_td">抵押物坐落</el-col>
          <el-col :span="14" class="col_text_right table_td">{{guaAddress}}</el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="10" class="table_td">最大综合可贷款额(万元)</el-col>
          <el-col :span="14" class="col_text_right table_td">{{maxLoanAmount}}</el-col>
        </el-col>
        <!--<el-col :span="24" class="table_tr">-->
          <!--<el-col :span="10" class="table_td">初评总价(万元)</el-col>-->
          <!--<el-col :span="14" class="col_text_right table_td">{{assessTotalPrice}}</el-col>-->
        <!--</el-col>-->
        <el-col :span="24" class="table_tr">
          <el-col :span="10" class="table_td">备注</el-col>
          <el-col :span="14" class="col_text_right table_td">{{remark}}</el-col>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "infoPassHaulList",
    data() {
      return {
        pdf:require('./../../../assets/dataUpload.pdf'),
        currentUserPermissions:this.currentUserPermissions,
        // 查询条件
        condition: {
          orderNum: "",
          borrowerName: "",
          city: "",
          citys: [],
          investigatorName: "",
          investigatorNameList: [],
          surveyTime: [],
          taskState: "",
          orgName:'',
        },
        // 列表数据
        tableData: [],
        // 分页变量
        page: {
          currentPage: 1,
          numPerPage: 10,
          totalCount: 1
        },
        params: {},









        guaAddress:'',
        maxLoanAmount:'',
        assessTotalPrice:'',
        remark:'',
        dialogVisible:false,

      };
    },
    methods: {
      checkFn(obj){
        let params = {
          bussNo:obj.bussNo
        };
        $.post(this._path + "/dataCheck/queryAssessInfo",params,res => {
          if(res.resultCode == '0000'){
            //弹框信息..展示
            this.guaAddress = res.data.assessInfoVo.guaAddress + res.data.assessInfoVo.guaBuilding + res.data.assessInfoVo.guaNumber;
            this.maxLoanAmount = res.data.assessInfoVo.maxLoanAmount;
            this.assessTotalPrice = res.data.assessInfoVo.assessTotalPrice;
            this.remark = res.data.assessInfoVo.remark;
            this.dialogVisible = true;
          }else{
            this.requestError(res,this)
          }
        });
      },
      btnClick(row, type) {
        let path = "";
        if ("详情" == type) {
          path = "/infoPassHaul_detail/borrowMoney_detail";
          this.$router.push({
            path,
            query: {
              bussNo: row.bussNo,
              areaCode:row.areaCode,
              type:'detail'
            }
          });
        }
        if ("处理" == type) {
          $.post(this._path + "/dataReturn/toDataReturn", { bussNo: row.bussNo }, res => {
            if (res.resultCode == "0000") {
              this.$router.push({
                path: "/infoPassHaul/borrowMoney",
                query: {
                  bussNo: row.bussNo,
                  areaCode: row.areaCode
                }
              });
            } else {
              this.requestError(res,this)
            }
          })
        }
        if ("补充材料" == type) {
          $.post(this._path + "/dataReturn/toDataReturn", { bussNo: row.bussNo }, res => {
            if (res.resultCode == "0000") {
              this.$router.push({
                path: "/dataReturn_add/supplement_add",
                query: {
                  bussNo: row.bussNo,
                  areaCode: row.areaCode
                }
              });
            } else {
              this.requestError(res,this)
            }
          })

        }
      },

      pageSizeChange(val) {
        this.page.numPerPage = val;
        this.ajaxData();
        this.ajax();
      },
      pageCurrentChange(val) {
        this.page.currentPage = val;
        this.ajaxData();
        this.ajax();
      },
      //请求参数
      ajaxData() {
        this.params = {
          currentPage: this.page.currentPage,
          numPerPage: this.page.numPerPage,
          bussNo: this.condition.orderNum,
          custName: this.condition.borrowerName,
          areaCode: this.condition.city,
          taskStatus: this.condition.taskState,
          taskperName: this.condition.investigatorName,
          orgName: this.condition.orgName
        };

        // if (this.condition.surveyTime != "") {
        //   this.params.beginTime = Date.parse(this.condition.surveyTime[0]);
        //   this.params.finishTime = Date.parse(this.condition.surveyTime[1]);
        // }
        if (Object.prototype.toString.call(this.condition.surveyTime) == '[object Array]') {
          if(this.condition.surveyTime[0] != null && this.condition.surveyTime[1] != null){
            this.params.beginTime = Date.parse(this.condition.surveyTime[0]);
            this.params.finishTime = Date.parse(this.condition.surveyTime[1]);
          }else{
            this.params.beginTime = '';
            this.params.finishTime = '';
          }
        }
      },
      //ajax请求
      ajax() {
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });

        $.post(
          this._path + "/dataReturn/queryBusDataReturnByRequire",
          this.params,
          res => {
            if (res.resultCode == "0000") {
              this.tableData = res.data.voList;
              this.page.totalCount = res.data.totalCount;
              loading.close();
            }
          }
        );
      },
      //查询
      inquire() {
        this.ajaxData();
        this.ajax();
      }
    },
    mounted () {
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.inquire()
        }
      })
    },
    watch:{
      $route () {
        $(document).off('keydown')
      }
    },
    activated(){
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.inquire()
        }
      })
      this.inquire()
    },
    beforeCreate() {
      //获取回传任务列表
      let page = {
        currentPage: "1",
        numPerPage: "10"
      };
      $.post(
        this._path + "/dataReturn/queryBusDataReturnByRequire",
        page,
        res => {
          if (res.resultCode == "0000") {
            this.tableData = res.data.voList;
            this.page.totalCount = res.data.totalCount;
          }
        }
      );
      $.post(this._path + "/business/getAreaCode", {}, res => {
        this.condition.citys = res.data.permissionVoList;
      });
      /*$.post(
        this._path + "/orderDistribution/selectAllInvestigator",
        page,
        res => {
          if (res.resultCode == "0000") {
            this.condition.investigatorNameList = res.data
          }
        }
      );*/
    }
  };
</script>
