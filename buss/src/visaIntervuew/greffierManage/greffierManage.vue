<template>
    <div class="public">
      <h2>面签员管理列表</h2>
      <div class="show_list_title">
        <h3><img src="./../../assets/filter.png" class="listTitleImg"><span>筛选条件</span></h3>
      </div>
      <el-row :getters='30' class="module_margin_bottom">
        <el-col class="condition_space_between">
          <el-col :span="4" :offset="4" class="condition">城市</el-col>
          <el-col :span="6">
            <el-select v-model="cityCode" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
            </el-select>
          </el-col>
        </el-col>
        <br/>
        <el-col :offset='10' :span='2'   class="inquireBtn_warp"><el-button type="primary" @click="inquire" class="inquireBtn">查询</el-button></el-col>
      </el-row>
      <el-table :data="tableData" border stripe class="table">
        <el-table-column header-align="center" align="center" prop="userName"  label="员工姓名" width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="mobile" label="手机号" width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="numCurrent" label="当前待公证单数" width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="numSubmit" label="已完成单数" min-width="200"></el-table-column>
        <el-table-column header-align="center" align="center" prop="role" label="职务" min-width="200"></el-table-column>
        <el-table-column header-align="center" align="center" fixed="right" label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-show="scope.row.role == '面签员'" v-if="currentUserPermissions.indexOf('business:contract:notarymanage:time') != -1" @click="btnClick(scope.row,'工作')">工作量配置</el-button>
            <el-button type="text" size="small" v-show="scope.row.role == '面签员'" v-if="currentUserPermissions.indexOf('business:contract:notarymanage:leave') != -1" @click="btnClick(scope.row,'出勤')">出勤配置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="出勤配置" :visible.sync="dialogDutyVisible" size="small" :close-on-click-modal="false">
        <el-row :getters='30' class="module_margin_bottom">
          <el-col class="condition_space_between">
            <el-col :span="4" :offset="1" class="condition">请假时间</el-col>
            <el-col :span="8">
              <el-date-picker :editable="false" size="small"  class="select_width" v-model="dutyTime"  type="datetimerange" placeholder="选择时间范围" ></el-date-picker>
            </el-col>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dutyTimeFn">确 定</el-button>
        </div>
        <p style="text-indent: 30px">提醒：如果面签员请假后，提前归岗，请立即修改请假时间</p>
      </el-dialog>

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" size="small" :close-on-click-modal="false">
        <el-table class="module_margin_buttom" :data="timeHorizonlist" border stripe header-align="center">
          <el-table-column align="center" header-align="center" prop="time" label="时间"></el-table-column>
          <el-table-column align="center" header-align="center" label="周一">
            <template scope="scope"><el-checkbox :disabled="scope.row.week1 == undefined" v-model="scope.row.week1"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周二">
            <template scope="scope"><el-checkbox :disabled="scope.row.week2 == undefined" v-model="scope.row.week2"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周三">
            <template scope="scope"><el-checkbox :disabled="scope.row.week3 == undefined" v-model="scope.row.week3"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周四">
            <template scope="scope"><el-checkbox :disabled="scope.row.week4 == undefined" v-model="scope.row.week4"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周五">
            <template scope="scope"><el-checkbox :disabled="scope.row.week5 == undefined" v-model="scope.row.week5"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周六">
            <template scope="scope"><el-checkbox :disabled="scope.row.week6 == undefined" v-model="scope.row.week6"></el-checkbox></template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="周日">
            <template scope="scope"><el-checkbox :disabled="scope.row.week7 == undefined" v-model="scope.row.week7"></el-checkbox></template>
          </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeTimeInfo">确 定</el-button>
      </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "greffier-manage",
        data(){
          return {
            currentUserPermissions:this.currentUserPermissions,
            cityCode:"",
            tableData:[{duty:'面签员'}],
            dialogFormTitle:'工作安排',
            dialogFormVisible:false,
            dialogDutyVisible:false,
            userId:"",
            userName:"",
            dutyTime:[],
            timeHorizonlist:[],
          }
        },
        methods:{
          inquire(){
            let data = {
              cityCode:this.cityCode
            }
            //请求
            $.post(this._path + "/notaryManage/notaryManagePageList",data,res => {
                if (res.resultCode == "0000") {
                  this.tableData = res.data.notaryManageVOList;
                }else{
                  this.requestError(res,this)
                }
            });
          },
          changeTimeInfo(){
            let timeConfig = JSON.parse(JSON.stringify(this.timeHorizonlist));
            let timeConfigStr = []
            timeConfig.forEach((item)=>{
              let obj = {};
              obj.time = item.time;
              obj.weeks = [];
              for(let i = 1;i<=7;i++){
                if(item['week' + i]) obj.weeks.push(i)
              }
              if(obj.weeks.length != 0){
                timeConfigStr.push(obj)
              }
            });
            let data = {
              userName:this.userName,
              userId:this.userId,
              timeConfigStr:JSON.stringify(timeConfigStr)
            };
            $.post(this._path + "/notaryManage/saveNotaryTimeConfig",data,res => {
              if (res.resultCode == "0000") {
                this.dialogFormVisible = false;
                if(res.data.num&&res.data.num*1>0){
                   this.$alert('取消的时间点，有'+ res.data.num +'条单子待调度', '提示', {
                     confirmButtonText: '去调度',
                   }).then(() => {
                     this.$router.push('/greffierDistribution');
                   })
                }else{
                  this.$message.success('操作成功')
                }
              }else{
                this.requestError(res,this)
              }
            });
          },
          dutyTimeFn(){
            let data = {
              leaveStartTime:Date.parse(this.dutyTime[0])?Date.parse(this.dutyTime[0]):'',
              leaveEndTime:Date.parse(this.dutyTime[1])?Date.parse(this.dutyTime[1]):'',
              userName:this.userName,
              userId:this.userId
            };
            $.post(this._path + "/notaryManage/saveNotaryLeaveConfig",data,res => {
              if (res.resultCode == "0000") {
                this.dialogDutyVisible = false;
                if(res.data.num&&res.data.num*1>0){
                  this.$alert('取消的时间点，有'+ res.data.num +'条单子待公证,请及时调度给其他面签员', '提示', {
                    confirmButtonText: '去调度',
                  }).then(() => {
                    this.$router.push('/greffierDistribution');
                  })
                }else{
                  this.$message.success('操作成功')
                }
              }else{
                this.requestError(res,this)
              }
            });
          },
          btnClick(row,type){
            this.userId = row.userId;
            this.userName = row.userName;
            switch (type){
              case '工作':
                $.post(this._path + "/notaryManage/queryNotaryTimeConfigByNotaryId",{userId:row.userId,cityCode:row.cityCode},res => {
                  if (res.resultCode == "0000") {
                    let table = res.data.notaryTimeConfigVO.table;
                    this.timeHorizonlist = [];
                    table.forEach((item)=>{
                      let obj = {};
                      obj.time = item.time;
                      item.weeks.forEach((item)=>{
                           obj['week' + item] = false
                      });
                      this.timeHorizonlist.push(obj)
                    });
                    if(res.data.notaryTimeConfigVO.content){
                      let content = res.data.notaryTimeConfigVO.content;
                      content.forEach((item)=>{
                        let length = this.timeHorizonlist.length;
                        for(let i = 0;i<length;i++){
                          if(this.timeHorizonlist[i].time == item.time){
                            item.weeks.forEach((item1)=>{
                              this.timeHorizonlist[i]['week'+ item1] = true
                            })
                          }
                        }
                      })
                    }
                    this.dialogFormVisible = true;
                  }else{
                    this.requestError(res,this)
                  }
                });
                //处理展示效果
                break;
              case '出勤':
                this.dutyTime = [];
                this.dialogDutyVisible = true;
                break
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
        created(){
          $.post(this._path + '/business/getAreaCode',{},res=>{
            if(res.resultCode == '0000'){
              this.citys = res.data.permissionVoList;
              this.cityCode = this.citys[0].code;
              this.inquire();
            }else{
              this.requestError(res,this)
            }
          })
        }
    }
</script>

<style scoped>

</style>
