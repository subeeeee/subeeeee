<template>
  <div class="public">

    <h2>调度</h2>
    <allot-public-com></allot-public-com>

    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>当前预约信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">当前预约下户时间</el-col>
        <el-col :span="8" class="table_td">
          {{busDistributionInfoVO.orderTime}}&nbsp;
        </el-col>
        <el-col :span="4" class="table_td">预约时间是否需要调整</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="18">
            <el-radio-group @change="verificationFn('adjustment','1')" v-model="adjustment">
              <el-radio :label="'0'">否</el-radio>
              <el-radio :label="'1'">是</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6" v-if="adjustmentBol" class="importent">
            请完善信息
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td" v-if="adjustment == '1'">调整后预约时间</el-col>
        <el-col :span="8" class="table_td" v-if="adjustment == '1'">
          <el-col :span="18">
            <el-date-picker  size="small"  @change="adjustmentTimeFn" v-model="adjustmentTime" type="datetime" placeholder="请选择日期"></el-date-picker>
          </el-col>
          <el-col :span="6" v-if="adjustmentTimeBol" class="importent">
            请完善信息
          </el-col>
        </el-col>
        <el-col :span="4" class="table_td">分配下户员</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="16" :offset="1">
            <el-select v-model="notaryId" @visible-change="(val)=>verificationFn('notaryId',val)" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in returnPreVOList" :key="item.id+ ''" :label="item.realname" :value="item.id+''"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" v-if="notaryIdBol" class="importent">
            请完善信息
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <h2>当前下户员当天工作量</h2>
    <el-table :data="tableData" border class="table">
      <el-table-column header-align="center" align="center" prop="orderTime"  label="下户时间" min-width="150"></el-table-column>
      <el-table-column header-align="center" align="center" prop="areaName" label="所在区域" min-width="120"></el-table-column>
      <el-table-column header-align="center" align="center" prop="guaAddress" label="抵押物坐落" min-width="120"></el-table-column>
    </el-table>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module" >
          <el-col :span="3" class="table_td textarea_title">备注</el-col>
          <el-col :span="18" class="textareawrap"><div class="textarea"><textarea @blur="verify('remark')" :rows="10" v-model="remark" maxlength="200"></textarea></div></el-col>
          <el-col :span="3" v-if="remarkBol" class="table_td importent textarea_title">请完善信息</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">联系人及联系方式</el-col>
        <el-col :span="8" class="table_td">
          {{busDistributionInfoVO.contactName}} / {{busDistributionInfoVO.contactMobile}}
        </el-col>
      </el-col>
    </el-row>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="btnClick">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import AllotPublicCom from "./allotPublicCom";

  export default {
    components: {AllotPublicCom},
    name: "dispatch",
    data(){
      return {
        returnPreVOList:[{notaryId:'199',notaryName:'对的'}],
        notaryId:'',
        adjustmentTime:"",
        adjustmentBol:false,
        adjustment:'0',
        busDistributionInfoVO:{},
        tableData:[],
        cityCode:'',
        notaryName:"",
        remark:"",
        remarkBol:false,
      }
    },
    methods:{
      checkTime(i){
        if (i<10){
          i="0" + i
        }
        return i;
      },
      timeChange(str){
        let date = new Date(str);
        let date_value=date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + this.checkTime(date.getHours()) + ':' + this.checkTime(date.getMinutes()) + ':' + this.checkTime(date.getSeconds());
        return  date_value
      },
      sub(){
        let orderTime = '';
        let timeStr = '';
        if(this.adjustment == '0'){
          timeStr = this.busDistributionInfoVO.orderTime.replace(/\-/g,'/');
          orderTime = Date.parse(timeStr);
        }else{
          timeStr = this.timeChange(this.adjustmentTime)
          orderTime = Date.parse(timeStr)
        }
        let data = {
          bussNo:this.$route.query.bussNo,
          orderTime,
          returnPreNo:this.notaryId,
          returnPreName:this.notaryName.substr(0,this.notaryName.indexOf('-')),
          remark:this.remark
        };
        this.$http({
          url:'/busDistributionInfo/distributionSubmit',
          data:data,
          callback:res=>{
            this.$router.push('/surveyerAllotList');
            this.$message.success('提交成功')
          }
        });
      },
      btnClick(){
        this.verify('adjustment');
        this.verify('remark');
        if(this.adjustment == '0'){
          this.verify('notaryId');
          if(this.notaryIdBol||this.remarkBol){
            this.$message.error('请完善信息');
            return
          }
        }else if(this.adjustment == '1'){
          this.verify('adjustmentTime');
          this.verify('notaryId');
          if(this.adjustmentTimeBol||this.notaryIdBol||this.remarkBol){
            this.$message.error('请完善信息');
            return
          }
        }else{
          this.$message.error('请完善信息');
          return
        }
        let message;
        const h = this.$createElement;
        if(this.adjustment == '0'){
          message = h('div',null,[
            h('p', null, `请确认以下信息是否正确？`),
            h('p', null, `当前下户员: ${this.notaryName.substr(0,this.notaryName.indexOf('-'))}`)
          ])
        }else if(this.adjustment == '1'){
          let timeStr =  this.timeChange(this.adjustmentTime)
          let time1  = Date.parse(timeStr);
          message = h('div',null,[
            h('p', null, `请确认以下信息是否正确？`),
            h('p', null, `调整后预约时间: ${this._utils.timestampToTime(time1)};`),
            h('p', null, `当前下户员: ${this.notaryName.substr(0,this.notaryName.indexOf('-'))}`)
          ])
        }
        this.$msgbox({
          title: '请确认以下信息',
          message: message,
          showCancelButton: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              done();
              this.sub();
            } else {
              done();
            }
          }
        });
      },
      adjustmentTimeFn(val){
        let time = '';
        this.verificationFn('adjustmentTime');
        if(val){
          let valStr = val.replace(/\-/g,'/');
          time = Date.parse(valStr);
          this.notaryId = '';
          this.cityTimeGetReturnPre(this.cityCode,time)
        }
      },
      verify(str){
        !this[str]?this[str+"Bol"] = true:this[str + "Bol"] = false;
      },
      verificationFn(str,val){
        if(!val){
          !this[str]?this[str+"Bol"] = true:this[str + "Bol"] = false;
          if(str == 'notaryId'){
            this.returnPreVOList.forEach((item)=>{
              if(item.id == this.notaryId) this.notaryName = item.realname
            });
            if(this.adjustmentTime){
              let time =  this.timeChange(this.adjustmentTime);
              this.getIdWorkload(this.notaryId,Date.parse(time))
            }else{
              let time = this.busDistributionInfoVO.orderTime.replace(/\-/g,'/');
              this.getIdWorkload(this.notaryId,Date.parse(time))
            }
          }
        }
        if(str == 'adjustment'&&val == '1'){
          this.adjustmentTime = '';
          this.notaryId = '';
          this.returnPreVOList = [];
          if(this.adjustment == '0'){
            let time = this.busDistributionInfoVO.orderTime.replace(/\-/g,'/');
            this.cityTimeGetReturnPre(this.cityCode,Date.parse(time))
          }
        }
      },
      //根据时间区域查下户员
      cityTimeGetReturnPre(cityCode,time,initialize){
        let data = {
          orderTime: time,
          cityCode:cityCode
        };
        this.$http({
          url:'/busDistributionInfo/selectTaskPreByOrderTime',
          data:data,
          callback:res=>{
            this.returnPreVOList = res.data;
            if(initialize){
              let bol = false;
              for(let i = 0,j = this.returnPreVOList.length;i<j;i++){
                if(this.notaryId == this.returnPreVOList[i].id){
                  bol = true
                }
              }
              if(!bol){
                this.notaryId = ''
              }else{
                let time = this.busDistributionInfoVO.orderTime.replace(/\-/g,'/');
                this.getIdWorkload(this.notaryId,Date.parse(time))
              }
            }
          }
        });
      },
      //根据下户员查 工作量
      getIdWorkload(id,time){
        this.$http({
          url:'/busDistributionInfo/returnPreTask',
          data:{returnPreNo:id,orderTime:time},
          callback:res=>{
            this.tableData = res.data;
          }
        });
      },
    },
    created(){
      this.$http({
        url:'/busDistributionInfo/selectOneDistributionDetail',
        data:{bussNo:this.$route.query.bussNo},
        callback:res=>{
          this.cityName = res.data.busDistributionInfoVO.cityName;
          this.custName = res.data.busDistributionInfoVO.custName;
          this.busDistributionInfoVO = res.data.busDistributionInfoVO;
          this.cityCode = res.data.busDistributionInfoVO.cityCode;
          this.notaryId = this.busDistributionInfoVO.returnPreNo;
          this.notaryName = this.busDistributionInfoVO.returnPreName;
          let time = this.busDistributionInfoVO.orderTime.replace(/\-/g,'/');
          this.cityTimeGetReturnPre(this.cityCode,Date.parse(time),'initialize');
        }
      })
    }
  }
</script>

<style scoped>

</style>
