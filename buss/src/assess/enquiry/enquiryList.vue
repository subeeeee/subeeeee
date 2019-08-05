<template>
  <div class="contractPreparingList public">

    <h2>询价列表 <a class="help" :href="pdf" target="_blank">查看系统操作手册</a></h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row :getters='30' class="module_margin_bottom">
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">城市</el-col>
        <el-col :span="6">
          <el-select v-model="cityCode"   placeholder="请选择" class="select_width"  size='small'>
            <el-option :key="''" :label="'全部'" :value="''"> </el-option>
            <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="condition">渠道简称</el-col>
        <el-col :span="6"><el-input size='small'  v-model="orgName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">房产地址</el-col>
        <el-col :span="6"><el-input size='small' v-model="address"></el-input></el-col>
        <el-col :span="4" class="condition">询价结果</el-col>
        <el-col :span="6">
          <el-select v-model="result"   placeholder="请选择" class="select_width"  size='small'>
            <el-option label="全部" :value="''"> </el-option>
            <el-option label="询价成功" :value="'1'"> </el-option>
            <el-option label="询价失败" :value="'0'"> </el-option>
          </el-select>
        </el-col>
      </el-col>
      <el-col class="condition_space_between">
        <el-col :span="4" :offset="1" class="condition">询价时间</el-col>
        <el-col :span="6">
          <el-date-picker v-model="enquiryTime" class="select_width"  size='small' :editable="false" type="daterange"  placeholder="选择日期范围"></el-date-picker>
        </el-col>
        <el-col :span="4" class="condition">任务员姓名</el-col>
        <el-col :span="6"><el-input size='small'  v-model="taskPerName"></el-input></el-col>
      </el-col>
      <el-col class="condition_space_between">

      </el-col>
      <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="request" class="inquireBtn">查询</el-button></el-col>
    </el-row>
    <el-row v-if="currentUserPermissions.indexOf('business:accept:query:handle') != -1">
      <el-col :offset='21' :span='2' class="inquireBtn_warp"><el-button size="small" class="inquireBtn" @click="enquiry">+ 询价 </el-button></el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>询价记录</span></h3>
    </div>
    <el-table :data="tableData" border stripe class="table">
      <el-table-column header-align="center" align="center" prop="cityName"  label="城市" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="address" label="房产地址" min-width="250"></el-table-column>
      <el-table-column header-align="center" align="center" label="询价结果" width="200">
        <template slot-scope="scope">
          <span :class="scope.row.queryResult === '询价成功'?'':'font_red'">{{scope.row.queryResult}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="valuation" label="房屋估值(万元)" width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="queryTime" label="询价时间" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" prop="lastEditName" label="任务员姓名" min-width="200"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <!--v-if="currentUserPermissions.indexOf('business:contract:upload:query') != -1"-->
          <el-button type="text" size="small" @click="info(scope.row)" v-if="currentUserPermissions.indexOf('business:accept:query:query') != -1">详情</el-button>
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
  </div>
</template>
<script>

  export default {
    name:'enquiryList',
    data() {
      return {
        pdf:require('../../assets/enquiry.pdf'),
        enquiryTime:[],
        currentUserPermissions:this.currentUserPermissions,
        params:{},
        cityCode:'',
        address:'',
        result:'',
        taskPerName:'',
        bussNo:'',
        orgName:'',
        citys:[],
        page:{
          currentPage:1,
          totalCount:0,
          numPerPage:10,
        },
        tableData:[{bussNo:'1'}]
      };
    },

    methods: {
      enquiry () {
        this.$router.push({
          path:'/enquiry',
          query:{

          }
        })
      },
      info (row) {
        this.$router.push({
          path:'/enquiry_info',
          query:{
            id:row.id
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
        let queryTimeStart = this.enquiryTime[0]?Date.parse(this.enquiryTime[0]):'';
        let queryTimeEnd = this.enquiryTime[1]?Date.parse(this.enquiryTime[1]):'';
        this.params = {
          currentPage: this.page.currentPage,
          numPerPage: this.page.numPerPage,
          cityCode: this.cityCode,
          address:this.address,
          queryResult:this.result,
          orgName:this.orgName,
          lastEditName:this.taskPerName,
          queryTimeStart,
          queryTimeEnd

        };
        console.log(this.enquiryTime)
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
          this._path + "/queryValueController/queryValuePageList",
          this.params,
          res => {
            if (res.resultCode == "0000") {
              loading.close();
              this.tableData = res.data.queryValueInfoVOList;
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
      this.request()
      $.post(this._path + "/business/getAreaCode", {}, res => {
        this.citys = res.data.permissionVoList;
      });
    }
  }
</script>
<style scoped>

</style>


