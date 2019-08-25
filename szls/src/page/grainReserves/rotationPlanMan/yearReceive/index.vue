<template>
    <div class="content-main">
        <el-row>
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item label="承储企业">
								<el-input clearable v-model="formInline.ssqy" placeholder="承储企业"></el-input>
						</el-form-item>
						<el-form-item label="上报年度">
								<el-input clearable v-model="formInline.jhnd" placeholder="上报年度"></el-input>
						</el-form-item>
						<el-form-item>
								<el-button type="primary"  size="small" class="iconfont iconchaxun" @click="getList"> 查询</el-button>
						</el-form-item>
					</el-form>
        </el-row>
				<el-row>
					<el-table
						:data="tableData"
						stripe
						v-loading="listLoading"
						border fit highlight-current-row
						style="width: 100%">
						<el-table-column align="center" label="序号" width="70">
            <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
          </el-table-column>
						<el-table-column
							align="center"
							prop="ssqy"
							label="承储企业">
						</el-table-column>
						<el-table-column
							align="center"
							prop="lhslhj"
							width="110"
							label="轮换数量合计">
						</el-table-column>
						<el-table-column
							align="center"
							prop="lccsl"
							label="轮出仓数量">
						</el-table-column>
						<el-table-column
							align="center"
							prop="jhnd"
							label="上报年度">
						</el-table-column>
						<el-table-column
							align="center"
							prop="sbsj"
							width="200"
							label="上报时间">
						</el-table-column>
						<el-table-column
							align="center"
							prop="sbr"
							label="填报人">
						</el-table-column>
						<el-table-column
							align="center"
							fixed="right"
							label="操作"
							width="150">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small" class="iconfont iconchaxun"> 查看</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-row>
				<el-row>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageForm.page"
            :page-sizes="[10,20,30,40]" :page-size="pageForm.size" layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
          </el-pagination>
				</el-row>
				<el-dialog title="年度轮换计划查看" :visible.sync="dialogTableVisible">
					<div class="title"><span class="line">{{this.detailStr.ssqy}}</span>市级储备粮油<span class="line">{{this.detailStr.jhnd}}</span>年度轮换计划表</div>
					<el-table v-loading="detailLoading"   :data="detailData" border fit highlight-current-row show-summary :summary-method="getSummaries">
						<el-table-column align="center" label="序号" width="70">
            <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
          </el-table-column>
						<el-table-column align="center" property="lcpzbm" label="品种" width="150"></el-table-column>
						<el-table-column align="center" property="lcds" label="数量(吨)" width="200"></el-table-column>
						<el-table-column align="center" property="scnf" label="生产年限"></el-table-column>
							<el-table-column align="center" property="cfbh" label="轮出仓号"></el-table-column>
					</el-table>
					<el-row style="margin-top:50px;height:150px;">
						<el-col :span="6">
							单位负责人: &nbsp;&nbsp;&nbsp;<span class="line">&nbsp;&nbsp;&nbsp;{{this.detailStr.sbr}}&nbsp;&nbsp;&nbsp;</span>
						</el-col>
						<el-col :span="6">
							制表: &nbsp;&nbsp;&nbsp;<span class="line">&nbsp;&nbsp;&nbsp;{{this.detailStr.sbr}}&nbsp;&nbsp;&nbsp;</span>
						</el-col>
						<el-col :span="12">承储单位(公章): </el-col>
					</el-row>
				</el-dialog>
    </div>
</template>

<script>
  import { selectList, selectDetail } from '@/api/grainReserves/rotationPlanMan/yearReceive/index'
  export default {
    // components: {},
    // name: 'userInfo',
    data() {
      return {
				listLoading: true,
				detailLoading: true,
				formInline: {
					jhnd: '',
					ssqy: ''
				},
				pageForm: {
					page: 1,
					size: 10,
					total: 0
				},
				tableData: [],
				detailData: [],
				detailStr: {},
				currentPage4: 4,
				dialogTableVisible: false
      }
    },
    methods: {
			getList(){
				let data = {
					// jhbm: "string",
					jhnd: this.formInline.jhnd,
					// lccsl: 0,
					// lhslhj: 0,
					pageNum: this.pageForm.page,
					// pageNumDb: 0,
					pageSize: this.pageForm.size,
					// sbr: "string",
					// sbsj: "string",
					ssqy: this.formInline.ssqy
				}
				selectList(data).then(res=>{
					if(res.infoCode == '200'){
						this.listLoading = false;
						// console.log(res.data.list)
						this.tableData = res.data.items;
						this.pageForm.total = res.data.total;
					}
				})
			},
			handleClick(row){
				this.dialogTableVisible = true;
				selectDetail(row.jhbm).then(res=>{
					this.detailLoading = false;
					this.detailData = res.data.list;
					this.detailStr = res.data.detail;
				})
				// row.jhbm
			},
			handleSizeChange(val){
				this.pageForm.size = val
        this.getList()
			},
			handleCurrentChange(val) {
        this.pageForm.page = val
        this.getList()
			},
			getSummaries(param) {
				console.log(param)
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
						}, 0);
						if(column.label == '数量(吨)'){
							sums[index] += ''
						}else{
							sums[index] = ''
						}
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
    },
    created() {
			this.getList();
		},
    mounted() {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
	.line {
		border-bottom: 1px solid #000;
	}
	.title {
		margin-bottom: 20px;
		text-align: center;
		font-size: 16px;
	}
	.text {
		text-align:center;
	}
</style>
