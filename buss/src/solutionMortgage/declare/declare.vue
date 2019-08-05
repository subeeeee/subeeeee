<template>
  <div class="public">
    <h2>解抵押申报</h2>
    <div class="show_list_title ">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">订单编号</el-col>
        <el-col :span="9" class="table_td">
          {{$route.query.bussNo}}
        </el-col>
        <el-col :span="3" class="table_td">借款人姓名</el-col>
        <el-col :span="9" class="table_td">
          {{$route.query.custName}}
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">身份证号码</el-col>
        <el-col :span="9" class="table_td">
          {{loanInfo.certNo}}
        </el-col>
        <el-col :span="3" class="table_td">社会信用代码</el-col>
        <el-col :span="9" class="table_td">
          {{socialCode}}
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">放款通道</el-col>
        <el-col :span="9" class="table_td">
          {{passagewayName}}&emsp;
          {{trustPlan}}&emsp;
          {{subAccount}}
        </el-col>
      </el-col>

    </el-row>

    <div class="show_list_title ">
      <h3><img src="./../../assets/task.png" class="listTitleImg"><span>抵押物信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height">

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">房产证号</el-col>
        <el-col :span="9" class="table_td">
          {{guaInfo.ownershipNo}}
        </el-col>
        <el-col :span="3" class="table_td">抵押物坐落</el-col>
        <el-col :span="9" class="table_td">
          {{guaInfo.guaAddress}}
        </el-col>
      </el-col>

      <el-col :span="24" class="table_tr" v-for="(item,index) in ownerList">
        <el-col :span="3" class="table_td">房屋所有权人{{index + 1}}姓名</el-col>
        <el-col :span="9" class="table_td">
          {{item.owenName}}
        </el-col>
        <el-col :span="3" class="table_td">房屋所有权人{{index + 1}}身份证号码</el-col>
        <el-col :span="9" class="table_td">
          {{item.certNo}}
        </el-col>
      </el-col>


    </el-row>

    <div class="show_list_title ">
      <h3><img src="./../../assets/pic.png" class="listTitleImg"><span>房屋所有权人户口本</span></h3>
    </div>
    <el-tabs v-model="custTabsName" :value="0"  type="card">
      <el-tab-pane v-for="(cust, index) in ownerList" :key="'borrower' + index" :label="cust.owenName" :name="'borrower' + index">
        <pic-module class="module_margin_bottom" :bussNo="$route.query.bussNo" :custId="cust.custNo" dataType="2" taskType="316" :details="false"></pic-module>
      </el-tab-pane>
    </el-tabs>

    <div class="show_list_title ">
      <h3><img src="./../../assets/pic.png" class="listTitleImg"><span>解抵押申报</span></h3>
    </div>

    <el-row class="module_margin_bottom tableInfo table_height">

      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">申报时间</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="15" class="table_td">
            <el-date-picker v-model="time" class="select_width_80" :clearable="false" size='small' :editable="false" type="datetime"  placeholder="选择日期范围"></el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="3" class="table_td">申报编号</el-col>
        <el-col :span="9" class="table_td">
          <el-col :span="15" class="table_td">
            <el-input v-model="number" class="select_width_80" size="small" :maxlength="20"></el-input>
          </el-col>

        </el-col>
      </el-col>
    </el-row>

    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button type="primary" @click="submit">提交</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PicModule from "../../picModule/picModule";

  export default {
    components: {PicModule},
    name: "make",
    data(){
      return{
        custTabsName:'borrower0',
        loanInfo:{},
        guaInfo:{},
        ownerList:[],
        custInfoList:[],
        tableData:[],
        time:new Date(),
        number:'',
        passagewayName:'',
        subAccount:'',
        trustPlan:'',
        socialCode:'',
      }
    },
    methods: {
      getPassInfo(){
        this.$http({
          url:'/busPassageConfirm/selectBusPassageConfirmInfo',
          data:{
            bussNo:this.$route.query.bussNo
          },
          callback:res=>{
            this.passagewayName = res.data.busPassageConfirmVO.passageName;
            this.subAccount = res.data.busPassageConfirmVO.subAccountName;
            this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
            this.socialCode = res.data.busPassageConfirmVO.socialCode;
          }
        });
        this.$http({
          url:'/busChannelConfirmInfo/selectChannelConfirmInfo',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.loanInfo = res.data.busChannelConfirmInfoVo;
          }
        })
      },
      queryGuaInfo(){
        this.$http({
          url:'/dataCheck/selectBusGuaInfoLogBybussNo',
          data:{
            bussNo:this.$route.query.bussNo
          },
          callback:res=>{
            this.guaInfo = res.data.guaLogVo;
          }
        })
      },
      queryBusHouseOwnershipLog(){
        this.$http({
          url:'/declare/selectHouseOwenByBussNo',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.ownerList = res.data.houseOwershipVoList
          }
        });
      },
      queryCustInfo(){
        this.$http({
          url:'/dataCheck/selectBusCustLogListBybussNo',
          data:{
            bussNo: this.$route.query.bussNo
          },
          callback:res=>{
            this.custInfoList = res.data.busCustLogListVo
          }
        })
      },
      submit(){
        this.$confirm("请确认是否提交？",'提示',{
          cancelButtonText:'取消',
          confirmButtonText:'确认',
        }).then(()=>{
          this.$http({
            url:'/declare/declareSubmit',
            data:{
              id:this.$route.query.id,
              declareNo:this.number,
              inputTime:Date.parse(this.time),
            },
            callback:res=>{
              this.$message.success('提交成功');
              this.$router.push('/declareList')
            }
          })
        })
      },
    },
    created(){
      this.getPassInfo();
      this.queryGuaInfo();
      this.queryBusHouseOwnershipLog();
      this.queryCustInfo();
    }
  }
</script>

<style scoped>

</style>
