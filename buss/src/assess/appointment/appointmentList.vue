<template>
  <div class="contractPreparingList public">
    <h2>预约下户</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">订单编号</el-col>
        <el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
        <el-col :span="4" class="condition">借款人姓名</el-col>
        <el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">渠道简称</el-col>
        <el-col :span="6"><el-input size='small' v-model="orgName"></el-input></el-col>
        <el-col :span="4" class="condition">任务状态</el-col>
        <el-col :span="6">
          <el-select v-model="taskStatus"   placeholder="请选择" class="select_width"  size='small'>
            <el-option label="全部" :value="''"> </el-option>
            <el-option label="待预约" :value="'10'"> </el-option>
            <el-option label="已预约" :value="'60'"> </el-option>
            <el-option label="已完成" :value="'90'"> </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="cityCode"   placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">

      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="request" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="cityName" label="城市" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskPreName" label="任务员姓名" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dispose(scope.row)" v-if="currentUserPermissions.indexOf('business:survey:order:order') != -1" v-show="scope.row.taskStatus === '待预约'" >预约</el-button>
          <el-button type="text" size="small" @click="cancel(scope.row)" v-if="currentUserPermissions.indexOf('business:survey:order:cancelorder') != -1" v-show="scope.row.taskStatus === '已预约'" >取消预约</el-button>
          <el-button type="text" size="small" @click="info(scope.row,'info')" v-if="currentUserPermissions.indexOf('business:survey:order:query') != -1">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pageBtn"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.numPerPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount">
    </el-pagination>

    <el-dialog title="取消预约" :visible.sync="isDialog" size="tiny">
      <el-row>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">抵押物坐落</el-col>
          <el-col :span="15" class="mark_table_div importent">
            {{dialogObj.guaAddress}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">预约下户时间</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.orderTime}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">联系人姓名</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.contactName}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">联系人手机号</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.contactMobile}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">预约备注</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.remark}}
          </el-col>
        </el-col>
       <!-- <el-col :span="24" class="mark_table_line" v-if="dialogObj.returnPreName">
          <el-col :span="9" class="mark_table_div">下户员姓名</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.returnPreName}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line" v-if="dialogObj.returnMobile">
          <el-col :span="9" class="mark_table_div">下户员手机号</el-col>
          <el-col :span="15" class="mark_table_div">
            {{dialogObj.returnMobile}}
          </el-col>
        </el-col>-->
      </el-row>
      <p style="text-align: center">是否确认取消预约下户？</p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isDialog = false">取 消</el-button>
          <el-button type="primary" @click="dialogDelete">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name:'appointment-list',
    data() {
      return {
        currentUserPermissions:this.currentUserPermissions,
        params:{},
        cityCode:'',
        bussNo:'',
        taskStatus:'',
        orgName:'',
        custName:'',
        citys:[],
        page:{
          currentPage:1,
          totalCount:0,
          numPerPage:10,
        },
        tableData:[{bussNo:'1',taskStatus:'待预约'},{bussNo:'2',taskStatus:'已预约'}],
        isDialog:false,
        dialogObj:{}
      };
    },

    methods: {
      cancel(row){
        // 查接口
        this.dialogObj.bussNo = row.bussNo;
        this.$http({
          url:'/busOrderInfo/selectOneOrder',
          data:{bussNo:this.dialogObj.bussNo},
          callback:res=>{
            this.dialogObj.contactName = res.data.busOrderInfoVO.contactName;
            this.dialogObj.contactMobile = res.data.busOrderInfoVO.contactMobile;
            this.dialogObj.orderTime = res.data.busOrderInfoVO.orderTime;
            this.dialogObj.remark = res.data.busOrderInfoVO.remark;
            this.$http({
              url:'/assess/selectAssessInfo',
              data:{bussNo:this.dialogObj.bussNo},
              callback:res=>{
                this.dialogObj.guaAddress = res.data.assessGuaInfoVo.guaAddress;
                this.isDialog = true;
               /* this.$http({
                  url:'/busDistributionInfo/selectOneDistributionDetail',
                  data:{bussNo:this.dialogObj.bussNo},
                  callback:res=>{
                    this.dialogObj.returnMobile = res.data.busDistributionInfoVO.returnMobile;
                    this.dialogObj.returnPreName = res.data.busDistributionInfoVO.returnPreName;

                  }
                })*/
              }
            });
          }
        });

      },
      dialogDelete(row){
        //删除接口
        this.isDialog = false;
        this.$http({
          url:'/busOrderInfo/cancelOrderSubmit',
          data:{bussNo:this.dialogObj.bussNo},
          callback:res=>{
            this.$message.success('取消成功');
            this.request()
          }
        });
      },
      dispose (row) {
        this.$http({
          url:'/busOrderInfo/toOrder',
          data:{bussNo:row.bussNo},
          callback:res=>{
            this.$router.push({
              path:'/appointment',
              query:{
                bussNo:row.bussNo
              },
            })
          }
        });
      },
      info (row,type) {
        this.$router.push({
          path:'/appointmentInfo',
          query:{
            bussNo:row.bussNo
          }
        })
      },
      pageSizeChange(val) {
        this.page.numPerPage = val;
        this.paramsFn();
        this.requestFn();
      },
      pageCurrentChange(val) {
        this.page.currentPage = val;
        this.paramsFn();
        this.requestFn();
      },
      //请求参数
      paramsFn() {
        this.params = {
          currentPage: this.page.currentPage,
          numPerPage: this.page.numPerPage,
          bussNo: this.bussNo,
          custName: this.custName,
          cityCode: this.cityCode,
          taskStatus: this.taskStatus,
          orgName:this.orgName
        };
      },
      //requestFn请求
      requestFn() {
        let loading = this.$loading({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.5)"
        });
        $.post(
          this._path + "/busOrderInfo/returnOrderPageList",
          this.params,
          res => {
            if (res.resultCode == "0000") {
              loading.close();
              this.tableData = res.data.busOrderInfoVOList;
              this.page.totalCount = res.data.totalCount;
            }else{
              this.requestError(res,this)
            }
          }
        );
      },
      //查询
      request() {
        this.paramsFn();
        this.requestFn();
      }
    },
    mounted () {
      $(document).on('keydown',(e)=>{
        if(e.which === 13){
          this.request()
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
          this.request()
        }
      })
      this.request()
    },
    created() {
      this.request();
      $.post(this._path + "/business/getAreaCode", {}, res => {
        this.citys = res.data.permissionVoList;
      });
    }
  }
</script>
<style scoped>

</style>


