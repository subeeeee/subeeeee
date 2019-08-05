<template>
<div class="contractPreparingList public">
    <h2>陪打征信上传</h2>
    <div class="show_list_title">
			<h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
		</div>
     <el-row :getters='30' class="module_margin_bottom">
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
          <el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="custName"></el-input></el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">城市</el-col>
          <el-col :span="6">
						<el-select v-model="city" placeholder="请选择" class="select_width"  size='small'>
							<el-option :key="''" :label="'全部'" :value="''"> </el-option>
							<el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
						</el-select>
          </el-col>
          <el-col :span="4" class="condition">任务创建时间</el-col>
          <el-col :span="6">
            <el-date-picker  :editable="false" size="small" class="select_width" v-model="createTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
          </el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
          <el-col :span="6">
						<el-select v-model="taskState" placeholder="请选择" class="select_width"  size='small'>
							<el-option key='' label='全部' value=''></el-option>
							<el-option key='30' label='待处理' value='30'></el-option>
							<el-option key='10' label='打回待处理' value='10'></el-option>
							<el-option key='70' label='进行中' value='70'></el-option>
							<el-option key='90' label='已完成' value='90'></el-option>
						</el-select>
          </el-col>
          <el-col :span="4" class="condition">任务流转时间</el-col>
          <el-col :span="6">
            <el-date-picker  :editable="false" size="small" class="select_width" v-model="circulationTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
          </el-col>
        </el-col>
       <el-col class="condition_space_between">
         <el-col :span="4" :offset="1" class="condition">任务完成时间</el-col>
         <el-col :span="6">
           <el-date-picker  :editable="false" size="small" class="select_width" v-model="finishTime" type="daterange" placeholder="选择时间范围" ></el-date-picker>
         </el-col>
         <el-col :span="4" class="condition">任务员姓名</el-col>
         <el-col :span="6">
           <el-input size='small'  v-model="taskPreName"></el-input>
         </el-col>
       </el-col>
        <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
      </el-row>
        <div class="show_list_title">
          <h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
        </div>
        <el-table :data="tableData" border stripe class="table">
         <el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="cityName" label="城市" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="creatTime" label="任务创建时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="circulationTime" label="任务流转时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="btnClick(scope.row,'/creditUpload')" v-show="scope.row.taskStatus !== '已完成'" v-if="currentUserPermissions.indexOf('business:contract:print:handle') != -1">处理</el-button>
              <el-button type="text" size="small" @click="btnClick(scope.row,'/creditUploadInfo')" v-if="currentUserPermissions.indexOf('business:contract:print:query') != -1">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
					class="pageBtn"
					@size-change="pageSizeChange"
					@current-change="pageCurrentChange"
					:current-page="pagecurrentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pagenumPerPage"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagetotalCount">
				</el-pagination>
</div>
</template>
<script>
export default {
	name:'dataCheckList',
	data () {
		return {
      currentUserPermissions:this.currentUserPermissions,
      city:'',
      citys:[],
      bussNo:'',
      custName:'',
      taskState:'',
			tableData:[{}],
			pagecurrentPage:1,
			pagenumPerPage:10,
      pagetotalCount:1,
      page:"",
      orgName:'',
      createTime:[],
      circulationTime:[],
      finishTime:[],
      taskPreName:'',
		}
	},
	methods: {
    requestQuery() {
      let createTimeBegin = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
      let createTimeEnd = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
      let circulationTimeBegin = Date.parse(this.circulationTime[0])?Date.parse(this.circulationTime[0]):'';
      let circulationTimeEnd = Date.parse(this.circulationTime[1])?Date.parse(this.circulationTime[1]):'';
      let finishTimeBegin = Date.parse(this.finishTime[0])?Date.parse(this.finishTime[0]):'';
      let finishTimeEnd = Date.parse(this.finishTime[1])?Date.parse(this.finishTime[1]):'';
			this.params = {
				currentPage:this.page,
				numPerPage:this.pagenumPerPage,
				bussNo:this.bussNo,
				custName:this.custName,
        cityCode:this.city,
        status:this.taskState,
        createTimeBegin,
        createTimeEnd,
        circulationTimeBegin,
        circulationTimeEnd,
        finishTimeBegin,
        finishTimeEnd,
        taskPerName:this.taskPreName
      }
		},
		inquire () {
			this.requestQuery();
			this.request()
		},
		pageSizeChange (val) {
			this.pagenumPerPage = val;
			this.requestQuery();
			this.request()
		},
		pageCurrentChange (val) {
			this.page = val;
			this.requestQuery();
			this.request()
		},
		request () {
      this.$http({
        url:'/busPrint/busPrintPageList',
        data:this.params,
        callback:res=>{
          this.tableData = res.data.busPrintInfoVoList
        }
      });
		},
		btnClick (row,url) {
      if(url == '/creditUpload'){
        this.$http({
          url:'/busPrint/intoPrint',
          data:{id:row.id},
          callback:res=>{
            this.$router.push({
              path:url,
              query:{
                bussNo:row.bussNo,
                custName:row.custName,
                id:row.id
              }
            })
          }
        });
      }else{
        this.$router.push({
          path:url,
          query:{
            bussNo:row.bussNo,
            custName:row.custName,
            id:row.id
          }
        })
      }
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
  beforeCreate(){
    this.$http({
      url:'/busPrint/busPrintPageList',
      data:{},
      callback:res=>{
        this.tableData = res.data.busPrintInfoVoList
      }
    });
    this.$http({
      url:'/business/getAreaCode',
      callback:res=>{
        this.citys = res.data.permissionVoList
      }
    });
  }
}
</script>
<style scoped>

</style>


