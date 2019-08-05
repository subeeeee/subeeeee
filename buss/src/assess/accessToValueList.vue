<template>
    <div class="accessToValueList public">
			<h2>准入询值列表</h2>
		<div class="show_list_title">
			<h3><img src="./../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
		</div>
		<el-row :getters='20' class="module_margin_bottom">
			<el-col class="condition_space_between">
				<el-col :span="4" :offset="1" class="condition">订单编号</el-col><el-col :span="6"><el-input size='small' v-model="bussNo"></el-input></el-col>
				<el-col :span="4" class="condition">借款人姓名</el-col><el-col :span="6"><el-input size='small' v-model="custName"></el-input></el-col>
			</el-col>
			<el-col class="condition_space_between">
				<el-col :span="4" :offset="1" class="condition">城市</el-col>
				<el-col :span="6">
						<el-select v-model="areaCode" placeholder="请选择" class="select_width"  size='small'>
								<el-option :key="''" :label="'全部'" :value="''"> </el-option>
								<el-option v-for="item in citys" :key="item.value" :label="item.name" :value="item.code"> </el-option>
						</el-select>
				</el-col>
				<el-col :span="4" class="condition">任务状态</el-col>
				<el-col :span="6">
						<el-select v-model="taskStatus" placeholder="请选择" class="select_width"  size='small'>
								<el-option :key="''" :label="'全部'" :value="''"> </el-option>
								<el-option :key="'10'" :label="'待处理'" :value="'10'"></el-option>
								<el-option :key="'30'" :label="'进行中'" :value="'30'"></el-option>
								<el-option :key="'90'" :label="'已准入'" :value="'90'"></el-option>
								<el-option :key="'99'" :label="'已拒绝'" :value="'99'"></el-option>
						</el-select>
				</el-col>
			</el-col>
			<el-col :offset='10' :span='2' class="inquireBtn_wrap"><el-button type="primary" class="inquireBtn" @click="inquireBtn">查询</el-button></el-col>
		</el-row>
		<!-- 任务列表 -->
		<div class="show_list_title">
			<h3><img src="./../assets/task.png" class="listTitleImg"><span>任务列表</span></h3>
		</div>
		<el-table :data="tableData" border class="table">
			<el-table-column header-align="center" align="center" prop="bussNo"  label="订单编号"  width="200"></el-table-column>
			<el-table-column header-align="center" align="center" prop="custName" label="借款人姓名" width="200"></el-table-column>
			<el-table-column header-align="center" align="center" prop="areaName" label="城市" width="200"></el-table-column>
			<el-table-column header-align="center" align="center" prop="createTime" label="任务创建时间"  min-width="220"></el-table-column>
			<el-table-column header-align="center" align="center" prop="finishTime" label="任务完成时间" min-width="220" ></el-table-column>
			<el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态" width="200"></el-table-column>
			<el-table-column header-align="center" align="center" prop="taskPerName" label="任务员姓名" width="200"></el-table-column>
			<el-table-column header-align="center" align="center" fixed="right" label="操作" width="150">
				<template scope="scope">
					<el-button type="text" size="small" @click="operation('处理',scope.row)" v-show="scope.row.taskStatus != '已完成' && scope.row.taskStatus != '已准入' && scope.row.taskStatus != '已拒绝'" v-if="currentUserPermissions.indexOf('business:accept:assess:handle') != -1">处理</el-button>
					<el-button type="text" size="small" @click="operation('详情',scope.row)" v-if="currentUserPermissions.indexOf('business:accept:assess:query') != -1">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
			<!-- 分页按钮 -->
			<el-pagination
				class="pageBtn"
				@size-change="pageSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="numPerPage"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount">
			</el-pagination>
    </div>
</template>

<script>
export default {
	name:'accessToValueList',
	data () {
		return{
			currentUserPermissions:this.currentUserPermissions,
			citys:[],
			currentPage:1,
			taskStatus:'',
			tableData:[],
			bussNo:'',
			custName:'',
			areaCode:'',
			numPerPage:10,
			totalCount:0

		}
	},
	filter : {
		taskStatus (a) {
			return'ddd'
		}
	},
	methods: {
		inquireBtn () {
			var params = {
				bussNo:this.bussNo,
				custName:this.custName,
				areaCode:this.areaCode,
				taskStatus : this.taskStatus,
				numPerPage: this.numPerPage,
				currentPage : this.currentPage
			}
			$.post(this._path + '/assess/assessPageList',params,(res)=>{
				this.tableData = res.data.assessPageList;
				this.totalCount = res.data.totalCount;
			})
		},
		operation (type,row) {
			switch (type) {
				case '处理':
				$.post(this._path + '/assess/toAssess',{bussNo:row.bussNo},(res)=>{
					if(res.resultCode == '0000'){
						this.$router.push({
							path:'/accessToValue',
							query:{
                bussNo:row.bussNo,
                cityCode:row.areaCode
							}
						})
					}else if (res.resultCode == '9999'){
            location.reload()
          }else{
						this.requestError(res,this)
					}
				})

				break;
				case '详情':
					this.$router.push({
						path:'/accessDetail',
						query:{
              bussNo:row.bussNo,
              cityCode:row.areaCode
						}
					})
				break
			}
		},
		pageSizeChange (val) {
			this.numPerPage = val;
			var params = {
				bussNo:this.bussNo,
				custName:this.custName,
				areaCode:this.areaCode,
				taskStatus : this.taskStatus,
				numPerPage: this.numPerPage,
				currentPage : this.currentPage
			}
			$.post(this._path + '/assess/assessPageList',params,(res)=>{
				this.tableData = res.data.assessPageList;
				this.totalCount = res.data.totalCount
			})
		},
		handleCurrentChange (val) {
			this.currentPage = val;
			var params = {
				bussNo:this.bussNo,
				custName:this.custName,
				areaCode:this.areaCode,
				taskStatus : this.taskStatus,
				numPerPage: this.numPerPage,
				currentPage : this.currentPage
			}
			$.post(this._path + '/assess/assessPageList',params,(res)=>{
				this.tableData = res.data.assessPageList;
				this.totalCount = res.data.totalCount
			})
		}
	},
  mounted () {
    $(document).on('keydown',(e)=>{
      if(e.which === 13){
        this.inquireBtn()
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
        this.inquireBtn()
      }
    })
    this.inquireBtn()
  },
	beforeCreate () {
		// 请求页列表数据
		$.post(this._path + '/assess/assessPageList',{},(res)=>{
			this.tableData = res.data.assessPageList;
			this.totalCount = res.data.totalCount
		})
		// 请求地区编码
		$.post(this._path + '/business/getAreaCode',(res)=>{
			this.citys = res.data.permissionVoList;
		})
	}
}
</script>

