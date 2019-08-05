<template>
  <div class="public">
    <h2>预约下户</h2>
    <p class="orderNo">订单编号:{{$route.query.bussNo}}</p>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom wz_table_border doNotChange">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">城市</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.cityName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">借款人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{custBaseInfo.custName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">抵押物坐落</el-col>
        <el-col :span="9" class="borrowerInfTd">{{guaAddress}}</el-col>
        <el-col :span="3" class="borrowerInfTd">所在区域</el-col>
        <el-col :span="9" class="borrowerInfTd">{{guaProperName}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">经纪人姓名</el-col>
        <el-col :span="9" class="borrowerInfTd">{{brokerName}}</el-col>
        <el-col :span="3" class="borrowerInfTd">经纪人手机号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{brokerMobile}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>预约下户信息</span></h3>
    </div>
    <p class="time">预约下户时间 <span class="importent" style="margin-left: 20px" v-if="interviewTimeBol">请选择预约下户时间</span></p>
    <el-tabs v-model="editableTabsValue" v-if="editableTabs.length" :value="0" @tab-click="tabClick" type="card">
      <el-tab-pane v-for="(item, index) in editableTabs" :name='JSON.stringify(item.timeList)' :label='item.date' :value='JSON.stringify(item.timeList)'>
      </el-tab-pane>
    </el-tabs>
    <div class="appointment" v-if="editableTabs.length">
      <el-row >
        <el-col v-if="timestamp" :span="5" :offset="(index+1)%4 == 1?.5:1"  class="make" :class="makeConditionNative == (index+'')?'makeConditionNative':''"  v-for="(item,index) in makeCondition">
          <div @click="makeConditionFn(index,item)" class="mackNative" :class="item.num == 0?'make_div':''">
            {{item.time}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="noAppintment" v-else>无可约时间，请联系下户调度员</div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人姓名<span class="importent">*</span></el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1"><el-input  size="small" :maxlength="10" @blur="verification('contactName')"  placeholder="请输入联系人姓名,便于下户员联系" v-model="contactName"></el-input></el-col>
          <el-col :span="9" v-if="contactNameBol" class="importent">请填写联系人姓名!</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人手机号<span class="importent">*</span></el-col>
        <el-col :span="20" class="table_td">
          <el-col :span="14" :offset="1"><el-input  size="small" @blur="verification('contactMobile')" @keyup.native="contactMobileFn" placeholder="请输入联系人手机号,便于下户员联系" :maxlength="11" v-model="contactMobile"></el-input></el-col>
          <el-col :span="9" v-if="contactMobileBol" class="importent">请填写联系人手机号!</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea  placeholder="可填写备注信息，此条备注下户员可见，200字以内" :rows="10" v-model="remark" maxlength="200"></textarea></div></el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="submit">提交</el-button></li>
      </ul>
    </div>
    <el-dialog title="预约下户" :visible.sync="isDialog" size="tiny">
      <el-row>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">预约下户时间</el-col>
          <el-col :span="15" class="mark_table_div importent">
            <!--{{interviewTime}}-->
            {{_utils.timestampToTime(this.interviewTime)}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">联系人姓名</el-col>
          <el-col :span="15" class="mark_table_div">
            {{contactName}}
          </el-col>
        </el-col>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">联系人手机号</el-col>
          <el-col :span="15" class="mark_table_div">
            {{contactMobile}}
          </el-col>
        </el-col>
      </el-row>
      <p>是否确认预约下户信息无误可提交？</p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isDialog = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog title="预约下户" :visible.sync="isDialog2" size="tiny">
      <el-row>
        <el-col :span="24" class="mark_table_line">
          <el-col :span="9" class="mark_table_div">预约下户时间</el-col>
          <el-col :span="15" class="mark_table_div importent">
            {{_utils.timestampToTime(interviewTime)}}
          </el-col>
        </el-col>
      </el-row>
      <p>当前预约下户时间已约满或不可约，请预约其他时间</p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isDialog2 = false">重新预约</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "appointment-info",
    data(){
      return {
        custBaseInfo:{},
        editableTabsValue:'0',
        editableTabs:[],
        makeCondition:[],
        makeConditionNative:'',
        timestamp:true,
        contactName:"",
        contactMobile:'',
        contactMobileBol:false,
        contactNameBol:false,
        interviewTime:'',
        interviewTimeBol:false,
        remark:'',
        isDialog:false,
        isDialog2:false,
        guaAddress:'',
        guaProperName:'',
        brokerName:'',
        brokerMobile:'',
      }
    },
    methods:{
      contactMobileFn(){
        this.contactMobile = this.contactMobile.replace(/[^0-9\.]/g,'')
      },
      dialogVisible(){
        this.$http({
          url:'/busOrderInfo/checkConflictOrder',
          data:{bussNo:this.$route.query.bussNo,orderTime:this.interviewTime},
          callback:(res)=>{
            //发请求验证 信息
            if(res.data == '2'||res.data == '3'){
              this.isDialog = false;
              this.isDialog2 = true
            }else if(res.data == '1'){
              this.$message.error('订单状态已变化');
              this.$router.push({path:'/appointmentList'})
            } else if(!res.data){
              //发提交接口
              let params = {
                contactName:this.contactName,
                contactMobile:this.contactMobile,
                orderTime:this.interviewTime,
                bussNo:this.$route.query.bussNo,
                remark:this.remark
              }
              this.$http({
                url:'/busOrderInfo/orderSubmit',
                data:params,
                callback:(res)=>{
                  this.$message.success('提交成功');
                  this.$router.push({path:'/appointmentList'})
                }
              })
            }
          }
        })
      },
      submit(){
        this.verification('contactName');
        this.verification('contactMobile');
        this.verification('interviewTime');
        if(this.contactMobileBol || this.contactNameBol || this.interviewTimeBol){
          return
        }
        this.isDialog = true;
      },
      verification(str){
        this[str + "Bol"] = !this[str]? true:false;
        if(str == 'contactMobile'){
          if(this[str].length != '11') {
            this[str + "Bol"] = true
          }else{
            this[str + "Bol"] = false
          }
        }
      },
      getTime(str){ //日期请求时间
        this.$http({
          url:'/busOrderInfo/getAppointmentNum',
          data:{cityCode:this.custBaseInfo.cityCode,timeListStr:str},
          callback:res=>{
            this.makeConditionNative = '';
            this.interviewTime = '';
            this.makeCondition = res.data.appointmentNumDTOList
          }
        })
      },
      getDate(str){ // 区域请求日期
        this.$http({
          url:'/busOrderInfo/getAppointmentTimeList',
          data:{cityCode:str},
          callback:res=>{
            if(res.data.appointmentTimeVO.dateList){
              this.editableTabs = res.data.appointmentTimeVO.dateList;
              this.editableTabsValue = JSON.stringify(this.editableTabs[0].timeList);
              this.getTime(JSON.stringify(this.editableTabs[0].timeList))
            }else{
              this.editableTabs = []
            }
          }
        });

      },
      makeConditionFn(index,item){
        this.makeConditionNative = index;
        this.interviewTime = item.timestamp;
        this.verification('interviewTime')
      },
      tabClick(obj){
        // 那点击日期 请求时间
        this.getTime(obj.name)
      }
    },
    created(){

      this.$http({
        url:'/busOrderInfo/selectOneOrder',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.custBaseInfo = res.data.busOrderInfoVO;
          this.getDate(this.custBaseInfo.cityCode)
        }
      });
      this.$http({
        url:'/assess/selectAssessInfo',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.guaAddress = res.data.assessGuaInfoVo.guaAddress + res.data.assessGuaInfoVo.guaBuilding + res.data.assessGuaInfoVo.guaNumber;
          this.guaProperName = res.data.assessGuaInfoVo.guaProperName
        }
      });
      this.$http({
        url:'/business/queryCustBaseInfoHide',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.brokerName = res.data.custBaseInfo.brokerName;
          this.brokerMobile = res.data.custBaseInfo.brokerMobile
        }
      });


    }
  }
</script>

<style scoped>
  .noAppintment{
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size:20px ;
    color: #ccc;
  }
  .time{
    font-size: 16px;
    line-height: 30px;
    padding: 10px 0;
    display: block;
  }
</style>
