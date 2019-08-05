<template>
<div class="contractPreparingList public">

    <h2>面签资料核查列表</h2>
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
          <el-col :span="4" class="condition">渠道简称</el-col>
          <el-col :span="6"><el-input size='small' v-model="orgName"></el-input></el-col>
        </el-col>
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="1" class="condition">任务状态</el-col>
          <el-col :span="6">
						<el-select v-model="taskState" placeholder="请选择" class="select_width"  size='small'>
							<el-option key='' label='全部' value=''></el-option>
							<el-option key='10' label='待核查' value='10'></el-option>
							<el-option key='90' label='已完成' value='90'></el-option>
							<el-option key='99' label='已拒单' value='99'></el-option>
						</el-select>
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
         <el-table-column header-align="center" align="center" prop="city" label="城市" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="orgName" label="渠道简称" width="200"></el-table-column>
          <!--<el-table-column prop="area" label="所在区域" width="200"></el-table-column>-->
          <!--<el-table-column prop="interviewTime" label="预约面签时间" width="200"></el-table-column>-->
         <el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" prop="taskPreName" label="任务员姓名" width="200"></el-table-column>
         <el-table-column header-align="center" align="center" fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="btnClick(scope.row,'/dataChack')" v-show="scope.row.taskStatus == '待核查'" v-if="currentUserPermissions.indexOf('business:contract:verification:handle') != -1">核查</el-button>
              <el-button type="text" size="small" @click="btnClick(scope.row,'/dataCheckDetails')" v-if="currentUserPermissions.indexOf('business:contract:verification:query') != -1">详情</el-button>
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
			tableData:[],
			pagecurrentPage:1,
			pagenumPerPage:10,
      pagetotalCount:1,
      surveyTime:[],
      page:"",
      orgName:'',
		}
	},
	methods: {
    requestQuery() {
			this.params = {
				currentPage:this.page,
				numPerPage:this.pagenumPerPage,
				bussNo:this.bussNo,
				custName:this.custName,
        areaCode:this.city,
        proCode:this.proCode,
				taskStatus:this.taskState,
        orgName:this.orgName
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
			$.post(this._path + '/verification/tasks',this.params,res=>{
				if(res.code == 'SUCCESS'){
        this.tableData = res.data.page.content;
        this.pagetotalCount = res.data.page.totalElements;
      }else{
        this.requestError(res,this)
      }
			})
		},
		btnClick (row,url) {
      if('/dataChack' == url){
        $.post(this._path + '/verification/toVerify',{bussNo:row.bussNo},res=>{
          if(res.resultCode == '0000'){
            this.$router.push({
              path:url,
              query:{
                  bussNo:row.bussNo
                }
            })
          }else{
            this.requestError(res,this)
          }

        })
      }
      if('/dataCheckDetails' == url){
        this.$router.push({
          path:url,
          query:{
              bussNo:row.bussNo,
              taskStatus:row.taskStatus
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
    $.post(this._path + '/verification/tasks',{},res=>{
      if(res.code == 'SUCCESS'){
        this.tableData = res.data.page.content;
        this.pagetotalCount = res.data.page.totalElements;
      }else{
        this.requestError(res,this)
      }
    })
    // 城市列表
		$.post(this._path + '/business/getAreaCode',{},res=>{
			if(res.resultCode == '0000'){
				this.citys = res.data.permissionVoList
			}else{
				this.requestError(res,this)
			}
		})
  }
}
</script>
<style scoped>

</style>


