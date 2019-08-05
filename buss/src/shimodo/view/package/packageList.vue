<template>
  <div class="infoInspectList survey public">
    <h2>资料包列表</h2>
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
          <el-select v-model="condition.city" placeholder="请选择" class="select_width" size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in condition.citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="condition.taskState" placeholder="请选择" class="select_width" size='small'>
            <el-option :label="'全部'" :value="''"> </el-option>
            <el-option :label="'待处理'" :value="'10'"></el-option>
            <el-option :label="'已上传'" :value="'60'"></el-option>
          </el-select>
        </el-col>
      </el-col>
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
     <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
     <el-table-column header-align="center" align="center" prop="packageSize" label="文件大小" width="150">
        <template scope="scope">
          {{scope.row.packageSize | filterddd }}M
        </template>
      </el-table-column>
     <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="150"></el-table-column>
     <el-table-column header-align="center" align="center" fixed="right" label="操作" width="150">
        <template scope="scope">
          <el-button type="text" size="small" @click="uploadFiles(scope.row)" v-show="scope.row.taskStatus == '待处理'">上传</el-button>
          <el-button type="text" size="small" @click="uploadFiles(scope.row)" v-show="scope.row.taskStatus == '已上传'">重新上传</el-button>
          <el-button type="text" size="small" @click="download(scope.row)"v-show="scope.row.taskStatus == '已上传'">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <input type="file" ref="uploadFile" @change="onUpload" style="display:none" />
    <!-- 分页按钮 -->
    <el-pagination class="pageBtn" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="page.currentPage"
                   :page-sizes="[10, 20, 30, 40]" :page-size="page.numPerPage" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount"></el-pagination>
  </div>
</template>
<script>
  export default {
    name: "packageList",
    data() {
      return {
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
          proCode:''
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
        uploadParams :{}
      };
    },
    filters : {
      filterddd (val){
        let  size = 0;
        size = (val * 1 / 1024 / 1024).toFixed(2);
        return size
      }
    },
    methods: {
      uploadFiles (row) {
        this.uploadParams = row;
        this.$refs.uploadFile.click();
      },
      onUpload (e) {
        if (e.target.files.length == 0) {
          return;
        }
        let formData = new FormData();
        formData.append(e.target.files[0].name, e.target.files[0]);
        formData.append("bussNo", this.uploadParams.bussNo);
        $.ajax({
          url: this._path + "/dataPackage/uploadFile",
          type: "POST",
          dataType: "json",
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          success: res => {
            if(res.resultCode === '0000'){
              this.inquire()
              this.$message({
                type: "success",
                message: "上传成功",
                duration: 1500,
                showClose: 1
              });
            }

          },
          error: err => {
            this.$message({
              type: "error",
              message: "上传失败",
              duration: 1500,
              showClose: 1
            });
          }
        });






















      },
      download (row){
        let params = {
          fileType:row.fileType,
          imgURL:row.imgURL,
          imgName:row.imgName,

        }
        this.downloadPackage(this._path + '/businessImage/showFileInNewWindow',params);
        this.downloadPackage(this._path + '/businessImage/showFileInNewWindow',params);
      },
      paramsFn() {
        let self = this;
        this.params = {
          currentPage: self.page.currentPage,
          numPerPage: self.page.numPerPage,
          bussNo: self.condition.orderNum,
          custName: self.condition.borrowerName,
          areaCode: self.condition.city,
          taskStatus: self.condition.taskState,
          proCode:self.condition.proCode,
        };
      },
      pageSizeChange(val) {
        this.page.numPerPage = val;
        this.inquire()
      },
      pageCurrentChange(val) {
        this.page.currentPage = val;
        this.inquire()
      },
      inquire() {
        this.paramsFn();
        $.post(this._path + "/dataPackage/selectBusPackageFlow", this.params, res => {
          this.page.currentPage = res.data.currentPage;
          this.page.numPerPage = res.data.numPerPage;
          this.tableData = res.data.busPackageFlowVoList;
          this.page.totalCount = res.data.totalCount;
        });
      }
    },
    activated(){
      this.inquire()
    },
    beforeCreate() {
      $.post(this._path + "/dataPackage/selectBusPackageFlow", this.params, res => {
        this.page.currentPage = res.data.currentPage;
        this.page.numPerPage = res.data.numPerPage;
        this.tableData = res.data.busPackageFlowVoList;
        this.page.totalCount = res.data.totalCount;
      });
      $.post(this._path + "/business/getAreaCode", res => {
        this.condition.citys = res.data.permissionVoList;
      });
    }
  };
</script>
