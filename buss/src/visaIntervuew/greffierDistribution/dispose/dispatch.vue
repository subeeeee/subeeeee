<template>
  <div class="putInPoint public">
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">订单编号</el-col>
        <el-col class="table_td" :span="18">{{$route.query.bussNo}}</el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="6">借款人姓名</el-col>
        <el-col class="table_td" :span="18">{{$route.query.custName}}</el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>审批结论</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">产品类型</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.proName}}
        </el-col>
        <el-col :span="4" class="table_td">最高批贷金额(万元)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.maxAppAmount}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">最高批贷期限(月)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.maxAppTerm}}
        </el-col>
        <el-col :span="4" class="table_td">月利率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.interest}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">年化保险费率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.insuranceService}}
        </el-col>
        <el-col :span="4" class="table_td">年化服务费率(%)</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.serviceCharge}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">审批意见</el-col>
        <el-col :span="8" class="table_td">
          {{contractPreInfoVos.approvalResult}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">审批信息</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="contractPreInfoVos.capitalOpinion" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
      <el-col :span="24" class="table_tr textarea_module" >
        <el-col :span="4" class="table_td textarea_title">备注</el-col>
        <el-col :span="20" class="textareawrap"><div class="textarea"><textarea disabled v-model="contractPreInfoVos.remark" :rows="5" class="textarea_disabled"></textarea></div></el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>提交历史</span></h3>
    </div>
    <el-table :data="busContractPreFlowVoList" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="opTime"  label="提交时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="amount"  label="借款金额(万元)" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="term"  label="借款期限" ></el-table-column>
    </el-table>

    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>预约历史</span></h3>
    </div>
    <el-table :data="putInHistory" border stripe class="module_margin_bottom">
      <el-table-column header-align="center" align="center" prop="notaryName"  label="面签员" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="appointTime"  label="预约时间" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactName"  label="联系人" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="contactMobile"  label="联系方式" ></el-table-column>
      <el-table-column header-align="center" align="center" prop="taskStatus" label="任务状态"></el-table-column>
      <el-table-column header-align="center" align="center" prop="remark" label="备注"></el-table-column>
    </el-table>
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>当前预约信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">当前预约公证时间</el-col>
        <el-col :span="8" class="table_td">
          {{notaryAppointFlowVO.appointTime}}&nbsp;
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
        <el-col :span="4" class="table_td">分配面签员</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="16" :offset="1">
            <el-select v-model="notaryId" @visible-change="(val)=>verificationFn('notaryId',val)" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in notaryWithStatusVOList" :key="item.notaryId" :label="item.notaryName + '-' + item.notaryStatus" :value="item.notaryId"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" v-if="notaryIdBol" class="importent">
            请完善信息
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="4" class="table_td">联系人及联系方式</el-col>
        <el-col :span="8" class="table_td">
          {{notaryAppointFlowVO.contactName}} / {{notaryAppointFlowVO.contactMobile}}
        </el-col>
      </el-col>
    </el-row>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="btncilck">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dispatch",
    data(){
      return {
        adjustmentBol:false,
        contractPreInfoVos:{},
        busContractPreFlowVoList:[],
        putInHistory:[],
        custName:"",
        time:"",
        adjustment:"0",
        adjustmentTime:"",
        adjustmentTimeBol:false,
        notaryIdBol:false,
        notaryId:"",
        notaryIdList:[{label:'a',value:'123'}],
        notaryAppointFlowVO:{},
        cityCode:"",
        interviewTime:"",
        notaryId:"",
        notaryWithStatusVOList:[],
        notaryName:"",
        interviewFlowId:"",
      }
    },
    methods:{
      verificationFn(str,val){
        if(!val){
          !this[str]?this[str+"Bol"] = true:this[str + "Bol"] = false;
          this.notaryWithStatusVOList.forEach((item)=>{
            if(item.notaryId == this.notaryId) this.notaryName = item.notaryName
          })
        }
        if(str == 'adjustment'&&val == '1'){
          this.adjustmentTime = '';
          this.notaryId = '';
          this.notaryWithStatusVOList = [];
          if(this.adjustment == '0'){
            let data = {
              time: Date.parse(this.notaryAppointFlowVO.appointTime),
              cityCode:this.cityCode
            };
            $.post(this._path + '/notaryDistribution/notaryList',data,res=>{
              if(res.resultCode == '0000'){
                this.notaryWithStatusVOList = res.data.notaryWithStatusVOList;
              }else{
                this.requestError(res,this)
              }
            });
          }
        }

      },
      sub(){
        let appointTime = '';
        if(this.adjustment == '1'){
          appointTime = Date.parse(this.adjustmentTime)
        }else{
          appointTime = this.interviewTime
        }
        let data = {
          appointTime,
          isModity:this.adjustment,
          notaryName:this.notaryName,
          notaryId:this.notaryId,
          interviewFlowId:this.interviewFlowId,
          bussNo:this.$route.query.bussNo
        };
        /*$.post(this._path + '/notaryDistribution/dispatchSubmit',data,res=>{
          if(res.resultCode == '0000'){
            this.$router.push("/greffierDistribution")
          }else{
            this.requestError(res,this)
          }
        });*/
        this.$http({
          url:'/notaryDistribution/dispatchSubmit',
          data:data,
          callback:res=>{
            this.$router.push('/greffierDistribution')
          },
          callback9999:res=>{
            this.$message.error(res.resultMsg);
          },
          callback1234:res=>{
            this.$message.error(res.resultMsg);
            this.$router.push('/greffierDistribution')
          }
        });
      },
      adjustmentTimeFn(val){
        let time = '';
        this.verificationFn('adjustmentTime');
        if(val){
          time = Date.parse(val);
          this.notaryId = '';
          //发请求
          let data = {
            time:time,
            cityCode:this.cityCode
          };
          $.post(this._path + '/notaryDistribution/notaryList',data,res=>{
            if(res.resultCode == '0000'){
              this.notaryWithStatusVOList = res.data.notaryWithStatusVOList
            }else{
              this.requestError(res,this)
            }
          });
        }
      },
      btncilck(){
        this.verificationFn('adjustment');
        if(this.adjustment == '0'){
          this.verificationFn('notaryId');
          if(this.notaryIdBol){
            this.$message.error('请完善信息');
            return
          }
        }else if(this.adjustment == '1'){
          this.verificationFn('adjustmentTime');
          this.verificationFn('notaryId');
          if(this.adjustmentTimeBol||this.notaryIdBol){
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
            h('p', null, `当前面签员: ${this.notaryName}`)
          ])
        }else if(this.adjustment == '1'){
          let time1  = Date.parse(this.adjustmentTime);
          message = h('div',null,[
            h('p', null, `请确认以下信息是否正确？`),
            h('p', null, `调整后预约时间: ${this._utils.timestampToTime(time1)};`),
            h('p', null, `当前面签员: ${this.notaryName}`)
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
      }
    },
    created(){
      //审批结论
      $.post(this._path + '/visaInterview/selectContractPreInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          let data = res.data.contractPreInfoVos;
          this.proCode = data.proCode;
          this.cityCode = data.areaCode;
          this.interviewFlowId = data.interviewFlowId
          $.post(this._path + '/notaryDistribution/queryNotaryDistributionFlow',{interviewFlowId:data.interviewFlowId},res=>{
            if(res.resultCode == '0000'){
              // this.putInHistory = res.data.notaryAppointFlowVOList;
              this.notaryAppointFlowVO = res.data.notaryAppointFlowVO;
              this.notaryName = res.data.notaryAppointFlowVO.notaryName;
              this.notaryId = res.data.notaryAppointFlowVO.notaryId*1;
              this.interviewTime = Date.parse(res.data.notaryAppointFlowVO.appointTime);
              //发请求
              let data = {
                time: Date.parse(res.data.notaryAppointFlowVO.appointTime),
                cityCode:this.cityCode
              };
              $.post(this._path + '/notaryDistribution/notaryList',data,res=>{
                if(res.resultCode == '0000'){
                  this.notaryWithStatusVOList = res.data.notaryWithStatusVOList
                  let bol = false;
                  this.notaryWithStatusVOList.forEach((item)=>{
                    if(item.notaryId == this.notaryId){
                      bol = true
                    }
                  });
                  if(!bol){
                    this.notaryId = ''
                  }
                }else{
                  this.requestError(res,this)
                }
              });
            }else{
              this.requestError(res,this)
            }
          });
          $.post(this._path + '/visaInterview/queryBussProductInfoByBussNo',{bussNo:this.$route.query.bussNo},res=>{
            if(res.resultCode == '0000'){
              this.approveVerdicts = res.data.bussProductInfoVoList;
              this.approveVerdicts.forEach((item)=>{
                if(item.proCode == this.proCode) this.contractPreInfoVos = item
              })
            }else{
              this.requestError(res,this)
            }
          });
        }else{
          this.requestError(res,this)
        }
      });
      //预约历史
      $.post(this._path + '/notaryDistribution/queryNotaryDistributionFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.putInHistory = res.data.notaryAppointFlowVOList;
        }else{
          this.requestError(res,this)
        }
      });
      //提交历史
      $.post(this._path + '/visaInterview/selectContractPreFlowList',{bussNo:this.$route.query.bussNo},res=>{
        if(res.resultCode == '0000'){
          this.busContractPreFlowVoList = res.data.busContractPreFlowVoList;
        }else{
          this.requestError(res,this)
        }
      });
    }
  }
</script>

<style scoped>

</style>
