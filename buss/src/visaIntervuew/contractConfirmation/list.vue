<template>
<div class="contractPreparingList public">

	<h2>合同信息确认</h2>
	<div class="show_list_title">
		<h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
	</div>
	<el-row :getters='30' class="module_margin_bottom">
		<el-col class="condition_space_between">
			<el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
			<el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small'  v-model="borrower"></el-input></el-col>
		</el-col>
		<el-col class="condition_space_between">
			<el-col :span="4" :offset="1" class="condition">城市</el-col>
			<el-col :span="6">
				<el-select v-model="city" placeholder="请选择" class="select_width"  size='small'>
					<el-option key='' label='全部' value=''> </el-option>
					<el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
				</el-select>
			</el-col>
      <el-col :span="4" class="condition">任务创建时间</el-col>
      <el-col :span="6">
        <el-date-picker :editable="false" size="small"  class="select_width" v-model="createTime"  type="daterange" placeholder="选择时间范围" ></el-date-picker>
      </el-col>
		</el-col>
		<el-col class="condition_space_between">
			<el-col :span="4" :offset="1" class="condition">任务状态</el-col>
			<el-col :span="6">
				<el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
					<el-option key='' label='全部' value=''></el-option>
					<el-option key='10' label='待确认' value='10'></el-option>
					<el-option key='90' label='已确认' value='90'></el-option>
				</el-select>
			</el-col>
      <el-col :span="4" class="condition">预约公证时间</el-col>
      <el-col :span="6"><el-date-picker :editable="false" size="small" class="select_width" v-model="appointmentTime" type="datetimerange" placeholder="选择时间范围" ></el-date-picker></el-col>
		</el-col>
		<el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
	</el-row>
	<div class="show_list_title">
		<h3><img src="./../../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
	</div>
	<el-table :data="tableData" border stripe class="table">
		<el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号" width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="cityName" label="城市" width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="interviewTime" label="预约公证时间" min-width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间" min-width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="200"></el-table-column>
		<el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
    <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
    <el-table-column header-align="center" align="center" fixed="right" label="操作" width="140">
			<template slot-scope="scope">
				<el-button type="text" size="small"  v-show="scope.row.taskStatus == '待确认'" @click="btnClick(scope.row,'affirm')" v-if="currentUserPermissions.indexOf('business:contract:recheck:handle') != -1">确认</el-button>
				<el-button type="text" size="small"  @click="btnClick(scope.row,'info')" v-if="currentUserPermissions.indexOf('business:contract:recheck:query') != -1">详情</el-button>
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
		:total="totalCount">
	</el-pagination>
</div>
</template>
<script>
export default {
	name:'contractConfirmList',
	data () {
		return {
      pdf:require('./../../assets/contractPreparing.pdf'),
			currentUserPermissions:this.currentUserPermissions,
			condition:{},
			tableData:[{}],
			pagecurrentPage:1,
			pagenumPerPage:10,
			totalCount:1,
    params:{},
			bussNo:'',
			borrower:'',
			city:'',
			citys:[],
			appointmentTime:'',
			createTime:'',
			taskStatus:'',
		}
	},
	methods: {
		requestQuery() {
			let interviewBeginTime = Date.parse(this.appointmentTime[0])?Date.parse(this.appointmentTime[0]):'';
			let interviewEndTime = Date.parse(this.appointmentTime[1])?Date.parse(this.appointmentTime[1]):'';
			let beginTime = Date.parse(this.createTime[0])?Date.parse(this.createTime[0]):'';
			let endTime = Date.parse(this.createTime[1])?Date.parse(this.createTime[1]):'';
			this.params = {
				currentPage:this.pagecurrentPage,
				numPerPage:this.pagenumPerPage,
				bussNo:this.bussNo,
				custName:this.borrower,
        cityCode:this.city,
        interviewBeginTime,
        interviewEndTime,
        beginTime,
        endTime,
				taskStatus:this.taskStatus
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
			this.pagecurrentPage = val;
			this.requestQuery();
			this.request()
		},
		request () {
			$.post(this._path + '/busChannelConfirmInfo/channelConfirmPageList',this.params,res=>{
				if(res.resultCode == '0000'){
					this.tableData = res.data.busChannelConfirmInfoVos;
					this.totalCount = res.data.totalCount;
				}else{
					this.requestError(res,this)
				}
			})
		},
    btnClick (row,type){
      switch (type){
        case 'affirm':
          this.$http({
            url:'/busChannelConfirmInfo/toChannelConfirmInfo',
            data:{
              bussNo:row.bussNo
            },
            callback:res=>{
              this.$router.push({
                path:"/contractConfirmTab/borrow",
                query:{
                  bussNo:row.bussNo,
                  proCode:row.proCode,
                  compactNum:row.compactNum,
                  custName:row.custName,
                  cityCode:row.cityCode,
                }
              })
            }
          })
          break;
        case 'info':
          this.$router.push({
            path:"/contractConfirmInfoTab/borrow",
            query:{
              bussNo:row.bussNo,
              proCode:row.proCode,
              compactNum:row.compactNum,
              custName:row.custName,
              cityCode:row.cityCode
            }
          })
          break;
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
	beforeCreate () {
		$.post(this._path + '/busChannelConfirmInfo/channelConfirmPageList',{},res=>{
			if(res.resultCode == '0000'){

				this.tableData = res.data.busChannelConfirmInfoVos;
				this.totalCount = res.data.totalCount;
			}else{
				this.requestError(res,this)
			}
		})
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


