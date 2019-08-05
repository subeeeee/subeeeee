<template>
        <div class="registerList public">
              <h2>进抵登记任务列表</h2>
          <div class="show_list_title">
                  <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
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
                <el-col :span="4" class="condition">权证员姓名</el-col>
                <el-col :span="6">
                  <!-- <el-input size='small'  v-model="condition.investigatorName"></el-input> -->
                    <el-select v-model="condition.investigatorName" placeholder="请选择" class="select_width"  size='small'>
                        <el-option :key="''" :label="'全部'" :value="''"></el-option>
                        <el-option v-for="item in investigatorNameList" :key="item.realname" :label="item.realname" :value="item.realname"></el-option>
                    </el-select>
                </el-col>
              </el-col>
              <el-col class="condition_space_between">
                <!--<el-col :span="4" :offset="1" class="condition">预约进抵时间</el-col>-->
                <!--<el-col :span="6">-->
                   <!--<el-date-picker :editable="false" size="small" class="select_width" v-model="condition.surveyTime" type="datetimerange" placeholder="选择时间范围" ></el-date-picker>-->
                <!--</el-col>-->
                <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
                <el-col :span="6">
                    <el-select v-model="condition.taskState" placeholder="请选择" class="select_width"  size='small'>
                        <el-option :key="''" :label="'全部'" :value="''"></el-option>
                        <el-option :key="'10'" :label="'待处理'" :value="'10'"></el-option>
                        <el-option :key="'30'" :label="'进行中'" :value="'30'"></el-option>
                        <el-option :key="'95'" :label="'进抵失败'" :value="'95'"></el-option>
                        <el-option :key="'60'" :label="'未上传他证'" :value="'60'"></el-option>
                        <el-option :key="'90'" :label="'已完成'" :value="'90'"></el-option>
                    </el-select>
                </el-col>
              </el-col>
              <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
            </el-row>
              <!-- 列表展示 -->
              <div class="show_list_title">
                <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
              </div>

              <el-table :data="tableData" border stripe class="table">
               <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="areaName" label="城市"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="guaProper" label="所在区域"  width="200"></el-table-column>
                <!--<el-table-column prop="arrivalTime" label="预约进抵时间"  width="200"></el-table-column>-->
               <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" prop="warrantName" label="任务员姓名"  width="200"></el-table-column>
               <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" v-show="scope.row.taskStatus=='待处理'||scope.row.taskStatus=='进行中'" @click="btnClick(scope.row,'处理')" v-if="currentUserPermissions.indexOf('business:arrived:register:handle') != -1">处理</el-button>
                    <el-button type="text" size="small" v-show="scope.row.taskStatus=='未上传他证'" @click="btnClick(scope.row,'补充材料')" v-if="currentUserPermissions.indexOf('business:arrived:register:supplement') != -1">上传他证</el-button>
                    <el-button type="text" size="small" v-show="scope.row.taskStatus=='已完成'" @click="btnClick(scope.row,'完补充材料')" v-if="currentUserPermissions.indexOf('business:arrived:register:supplement-s') != -1">补充材料</el-button>
                    <el-button type="text" size="small" @click="btnClick(scope.row,'详情')" v-if="currentUserPermissions.indexOf('business:arrived:register:query') != -1">详情</el-button>
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
          </div>
      </template>

      <script>
      export default {
        name: "registerList",
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
              surveyTime: [],
              taskState: ""
            },
            investigatorNameList:[],
            // 列表数据
            tableData: [{}],
            // 分页变量
            page: {
              currentPage: 1,
              numPerPage: 10,
              totalCount: 1
            },
            params: {}
          };
        },
        methods: {
          btnClick(row, type) {
            let path = "";
            if ("处理" == type) {
              path = "/registerDispose";
            let params = {bussNo:row.bussNo}
            $.post(this._path + "/busArrivalInfo/toBusArrival",params,res => {
                  if (res.resultCode == "0000") {
                    this.$router.push({
                        path,
                        query: {
                          bussNo: row.bussNo,
                          areaCode:row.areaCode
                        }
                      })
                      return
                  }else{
                    this.requestError(res,this)
                    return
                  }
                }
              );

            }
            if ("详情" == type) {
              path = "/registerInfo";
              this.$router.push({
              path,
              query: {
                bussNo: row.bussNo,
                areaCode:row.areaCode
              }
            });
            }
            if ("补充材料" == type) {
              path = "/supplement";
              this.$router.push({
              path,
              query: {
                bussNo: row.bussNo,
                areaCode:row.areaCode
              }
            });
            }
            if ("完补充材料" == type) {
              path = "/comSupplement";
              this.$router.push({
              path,
              query: {
                bussNo: row.bussNo,
                areaCode:row.areaCode
              }
            });
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
              warrantName: this.condition.investigatorName
            };
            if (Object.prototype.toString.call(this.condition.surveyTime) == '[object Array]') {
              if(this.condition.surveyTime[0] != null && this.condition.surveyTime[1] != null){
                this.params.taskBeginTime = Date.parse(this.condition.surveyTime[0]);
                this.params.taskEndTime = Date.parse(this.condition.surveyTime[1]);
              }else{
                this.params.taskBeginTime = '';
                this.params.taskEndTime = '';
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
              this._path + "/busArrivalInfo/busArrivalInfoPageList",
              this.params,
              res => {
                loading.close();
                if (res.resultCode == "0000") {
                  this.tableData = res.data.busArrivalInfoVoList;
                  this.page.totalCount = res.data.totalCount;
                }else{
                  this.requestError(res,this)
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
          $.post(this._path + "/busArrivalInfo/busArrivalInfoPageList",{},res => {
              if (res.resultCode == "0000") {
                this.tableData = res.data.busArrivalInfoVoList;
                this.page.totalCount = res.data.totalCount;
              }else{
                this.requestError(res,this)
              }
            }
          );
          $.post(this._path + "/business/getAreaCode", {}, res => {
            this.condition.citys = res.data.permissionVoList;
          });
          $.post(this._path + "/arrivalDisInfo/selectAllWarrant",res => {
              if (res.resultCode == "0000") {
                this.investigatorNameList = res.data
              }else{
                this.requestError(res,this)
              }
          })
        }
      };
      </script>
