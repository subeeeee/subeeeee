  <template>
  <div class="infoInspectList survey public">
    <h2>资料核查任务列表</h2>
    <div class="show_list_title">
      <h3><img src="./../../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <!-- 筛选条件 -->
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.orderNum"></el-input>
        </el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.borrowerName"></el-input>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="condition.city" placeholder="请选择"  class="select_width" size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in condition.citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="condition.taskState" placeholder="请选择" class="select_width" size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option :label="'未完成审核'" :value="'06'"></el-option>
            <el-option :label="'待处理'" :value="'10'"></el-option>
            <el-option :label="'进行中'" :value="'30'"></el-option>
            <el-option :label="'补充材料'" :value="'60'"></el-option>
            <el-option :label="'上传已补充材料'" :value="'62'"></el-option>
            <el-option :label="'初审打回'" :value="'70'"></el-option>
            <el-option :label="'终审打回'" :value="'80'"></el-option>
            <el-option :label="'初审打回,终审打回'" :value="'85'"></el-option>
            <el-option :label="'已完成'" :value="'90'"></el-option>
            <el-option :label="'已拒单'" :value="'95'"></el-option>
            <el-option :label="'已过期'" :value="'101'"></el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">任务员姓名</el-col>
        <el-col :span="6">
          <el-input size='small' v-model="condition.taskperName"></el-input>
        </el-col>
        <el-col :span="4" class="condition">任务完成时间</el-col>
        <el-col :span="6">
          <el-date-picker v-model="condition.time" class="select_width"  size='small' :editable="false" type="daterange"  placeholder="选择日期范围"></el-date-picker>
        </el-col>
      </el-col>
      <!--新筛选-->
   <!--   <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">打回产品</el-col>
        <el-col :span="6">
          <el-select v-model="condition.proCode" placeholder="请选择" class="select_width" size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in products" :key="item.proCode" :label="item.proName" :value="item.proCode"> </el-option>
          </el-select>
        </el-col>
      </el-col>-->
      <el-col :offset='10' :span='2' class="inquireBtn_warp">
        <el-button type="primary" class="inquireBtn" @click="inquire">查询</el-button>
      </el-col>
    </el-row>
    <!-- 列表展示 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border class="table">
     <el-table-column header-align="center" align="center" prop="bussNo" label="订单编号" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="120"></el-table-column>
     <el-table-column header-align="center" align="center" prop="areaName" label="城市" width="80"></el-table-column>
    <!-- <el-table-column header-align="center" align="center" label="打回产品" width="250">
        <tamplate slot-scope="scope">
            <span :title="scope.row.proName">{{scope.row.proName}}</span>
        </tamplate>
      </el-table-column>-->
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="circulationTime" label="任务流转时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" width="200">
        <template scope="scope">
          <el-button type="text" size="small" @click="dispose(scope.row)" v-show="scope.row.taskStatus != '已完成' && scope.row.taskStatus != '已过期' &&scope.row.taskStatus != '已拒单'&&scope.row.taskStatus != '未完成审核'&&scope.row.taskStatus != '补充材料'" v-if="currentUserPermissions.indexOf('business:survey:datacheck:handle') != -1">处理</el-button>
            <!--<el-button type="text" size="small" @click="replenish(scope.row)"  v-show="scope.row.taskStatus == '终审打回'" v-if="currentUserPermissions.indexOf('business:survey:datacheck:supplement') != -1">补充材料</el-button>-->
          <el-button type="text" size="small" @click="info(scope.row)" v-if="currentUserPermissions.indexOf('business:survey:datacheck:query') != -1">详情</el-button>
          <el-button type="text" size="small" @click="checkFn(scope.row)">查看初评信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页按钮 -->
    <el-pagination class="pageBtn" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="page.currentPage"
      :page-sizes="[10, 20, 30, 40]" :page-size="page.numPerPage" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount"></el-pagination>

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
<style>
  .el_dialog_40 .el-dialog--small{
    width: 40% !important;
  }
</style>
<script>
export default {
  name: "infoInspectList",
  data() {
    return {
      maxLoanAmount:'',
      assessTotalPrice:'',
      remark:'',
      guaAddress:'',

      dialogVisible:false,
      currentUserPermissions:this.currentUserPermissions,
      // 查询条件
      condition: {
        orderNum: "",
        borrowerName: "",
        city: "",
        citys: [],
        investigatorName: "",
        investigatorNameList: [],
        surveyTime: "",
        taskState: "",
        proCode:'',
        taskperName:'',
        time:[]
      },
      // 列表数据
      tableData: [{}],
      // 分页变量
      page: {
        currentPage: 1,
        numPerPage: 10,
        totalCount: 1
      },
      params: {},
      productInfoVoList:[],
      products:[]
    };
  },
  methods: {
    productsListFn(){
      $.post(this._path + "/loanInfo/selectProductInfo",{cityCode:this.condition.city},res => {
        if (res.resultCode == "0000") {
          this.products = res.data.productInfoVoList
        }else{
          this.requestError(res,this)
        }
      });
    },
    handleClose(done) {
      done()
    },
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
    paramsFn() {
      let taskBeginTime = this.condition.time[0]?Date.parse(this.condition.time[0]):'';
      let taskEndTime = this.condition.time[1]?Date.parse(this.condition.time[1]):'';
      this.params = {
        currentPage: this.page.currentPage,
        numPerPage: this.page.numPerPage,
        bussNo: this.condition.orderNum,
        custName: this.condition.borrowerName,
        areaCode: this.condition.city,
        taskStatus: this.condition.taskState,
        proCode:this.condition.proCode,
        taskPerName:this.condition.taskperName,
        taskBeginTime,
        taskEndTime
      };
    },
    info(obj) {
      this.$router.push({
        path: "/infoInspect_details/inspectBorrowMoney_details",
        query: {
          bussNo: obj.bussNo,
          areaCode: obj.areaCode,
          custName:obj.custName,
          taskStatus:obj.taskStatus,
          proName:obj.proName,
            type:'detail'
        }
      });
    },
    dispose(obj) {
      let loading = this.$loading({
        lock: true,
        text: "正在跳转...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.5)"
      });
      $.post(
        this._path + "/dataCheck/toDataCheck",
        { bussNo: obj.bussNo },
        res => {
          loading.close()
          if (res.resultCode == "0000") {
            let path = '/infoInspect/inspectBorrowMoney';
            if(obj.taskStatus == '初审打回'||obj.taskStatus == '终审打回'){
              path = '/infoInspect/inspectConclusion';
            }else if(obj.taskStatus == '上传已补充材料'){
              path = '/infoInspect/inspectHistory';
            }
            this.$router.push({
              path: path,
              query: {
                bussNo: obj.bussNo,
                areaCode: obj.areaCode,
                custName:obj.custName,
                taskStatus:obj.taskStatus,
                proName:obj.proName
              }
            });
          } else {
            this.requestError(res,this)
          }
        }
      );
    },
    replenish(obj) {
      $.post(
        this._path + "/dataCheck/toDataCheck",
        { bussNo: obj.bussNo },
        res => {
          if (res.resultCode == "0000") {
            this.$router.push({
              path: "/again/borrowerInfoAgain",
              query: {
                bussNo: obj.bussNo,
                custName:obj.custName,
                areaCode:obj.areaCode,
                taskStatus:obj.taskStatus
              }
            });
          } else {
           this.requestError(res,this)
          }
        }
      );

    },
    pageSizeChange(val) {
      this.page.numPerPage = val;
      this.paramsFn();
      $.post(this._path + "/dataCheck/assessPageList", this.params, res => {
        this.page.currentPage = res.data.currentPage;
        this.page.numPerPage = res.data.numPerPage;
        this.tableData = res.data.dataCheckList;
        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].proName){
            let endIndex = this.tableData[i].proName.lastIndexOf('；');
            if(endIndex > -1){
              this.tableData[i].proName = this.tableData[i].proName.substr(0,endIndex);
            }
          }
        }
        this.page.totalCount = res.data.totalCount;
      });
    },
    pageCurrentChange(val) {
      this.page.currentPage = val;
      this.paramsFn();
      $.post(this._path + "/dataCheck/assessPageList", this.params, res => {
        this.page.currentPage = res.data.currentPage;
        this.page.numPerPage = res.data.numPerPage;
        this.tableData = res.data.dataCheckList;
        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].proName){
            let endIndex = this.tableData[i].proName.lastIndexOf('；');
            if(endIndex > -1){
              this.tableData[i].proName = this.tableData[i].proName.substr(0,endIndex);
            }
          }
        }
        this.page.totalCount = res.data.totalCount;
      });
    },
    inquire() {
      this.paramsFn();
      $.post(this._path + "/dataCheck/assessPageList", this.params, res => {
        this.page.currentPage = res.data.currentPage;
        this.page.numPerPage = res.data.numPerPage;
        this.tableData = res.data.dataCheckList;
        for(let i = 0;i < this.tableData.length;i++){
          if(this.tableData[i].proName){
            let endIndex = this.tableData[i].proName.lastIndexOf('；');
            if(endIndex > -1){
              this.tableData[i].proName = this.tableData[i].proName.substr(0,endIndex);
            }
          }
        }
        this.page.totalCount = res.data.totalCount;
      });
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
    $.post(this._path + "/dataCheck/assessPageList", this.params, res => {
      this.page.currentPage = res.data.currentPage;
      this.page.numPerPage = res.data.numPerPage;
      this.tableData = res.data.dataCheckList;
      for(let i = 0;i < this.tableData.length;i++){
        if(this.tableData[i].proName){
          let endIndex = this.tableData[i].proName.lastIndexOf('；');
          if(endIndex > -1){
            this.tableData[i].proName = this.tableData[i].proName.substr(0,endIndex);
          }
        }
      }
      this.page.totalCount = res.data.totalCount;
    });
    $.post(this._path + "/business/getAreaCode", res => {
      this.condition.citys = res.data.permissionVoList;
    });
    $.post(this._path + "/loanInfo/selectProductInfo", res => {
      // this.condition.citys = res.data.permissionVoList;
      if(res.resultCode == '0000'){
         this.products = res.data.productInfoVoList
      }
    });
  }
};
</script>
