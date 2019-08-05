<template>
  <div class="public">
    <h2>合同制作</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>筛选条件</span></h3>
    </div>
    <el-row style="margin: 40px 0 40px 0">
      <el-col :span="24" class="table_tr">
        <el-col :span="2" class="table_td" style="text-align: right;line-height: 30px">放款通道:</el-col>
        <el-col :span="8" class="table_td">
          <el-col :span="22" :offset="1" style="line-height: 30px">
            {{passageName}}&nbsp;
            {{trustPlan}}&nbsp;
            {{subAccount}}
            <!-- <el-select placeholder="请选择" disabled  v-model="passagewayCode" @change="tableFn" class="select_width"  size='small'>
               <el-option  :key='""' :label='"请选择"' :value='""'></el-option>
               <el-option v-for="item in passageWayList" :key='item.passageCode' :label='item.passageName' :value='item.passageCode'></el-option>
             </el-select>-->
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>制作列表</span></h3>
    </div>

    <div class="kuang" v-if="!tableBol">
      <!--todo 判断条件-->
      <p v-if="1">请先选择放款通道，选择后将展示合同信息</p>
      <p v-if="1">当前放款通道不支持合同制作</p>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="tableBol">
      <el-tab-pane :label="item.name" :name="index" v-for="(item,index) in contractMakelist"></el-tab-pane>
    </el-tabs>
    <div class="wz_table_border"  v-if="tableBol">
      <el-table :data="tableData" border stripe class="table size_80">
        <el-table-column header-align="center" align="center" prop="name" label="合同参数" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="code" label="对应字段" >
        </el-table-column>
        <el-table-column header-align="center" align="center"  prop="none"   label="值">
          <template slot-scope="scope">
            <el-input type="text" size="small" v-model="scope.row.value" :disabled="scope.row.source =='0'"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :offset="10" span="4" style="padding-bottom: 20px">
          <el-button @click="preview">预览</el-button>
          <el-button @click="present">套打</el-button>
        </el-col>
      </el-row>

    </div>
    <el-row v-if="!tableBol">
      <el-col :offset="10" span="4" style="padding-bottom: 20px">
        <el-button @click="$router.push('/contractMakeList')">返回</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  export default {
    name: "contract-make",
    data() {
      return {
        activeName: '0',
        contractMakelist:[],
        tableData:[],
        tempId:'',
        passageWayList:[],
        tableBol:false,
        passagewayCode:'',
        passageName:'',
        trustPlan:"",
        subAccount:"",
      }
    },
    methods: {
      handleClick(tab) {
        //请求
        let params = {
          dataType:this.contractMakelist[tab.index].dataType,
          proCode:this.$route.query.proCode,
          passageCode:this.passagewayCode,
          bussNo:this.$route.query.bussNo,
        };
        $.post(this._path + '/contractManagement/contractManageData',params,res=>{
          if(res.resultCode == '0000'){
            this.tableData = res.data.templateValueVos;
            this.tempId = res.data.tempId
          }else{
            this.requestError(res,this)
          }
        })
      },
      //预览
      preview(){
        let params = {
          listMapStr:JSON.stringify(this.tableData),
          bussNo:this.$route.query.bussNo,
          previewOrDownload:'preview',
          tempId:this.tempId,
        };
        this._download(this._path + "/contractTemplate/preview", params);
      },
      //套打
      present(){
        let params = {
          listMapStr:JSON.stringify(this.tableData),
          bussNo:this.$route.query.bussNo,
          previewOrDownload:'download',
          tempId:this.tempId,
        };
        this._download(this._path + "/contractTemplate/preview", params);
      },
      tableFn(data){
        $.post(this._path + '/contractManagement/contractManageTableList',res=>{
          if(res.resultCode == '0000'){
            this.contractMakelist = res.data.typeList;
            let params = {
              dataType:this.contractMakelist[0].dataType,
              proCode:this.$route.query.proCode,
              passageCode:data,
              bussNo:this.$route.query.bussNo,
            }
            $.post(this._path + '/contractManagement/contractManageData',params,res=>{
              if(res.resultCode == '0000'){
                this.tableData = res.data.templateValueVos;
                this.tempId = res.data.tempId;
                this.tableBol = true
              }else{
                this.requestError(res,this)
              }
            })
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    beforeCreate(){
      /*$.post(this._path + "/visaInterview/selectPassageWay", {proCode:this.$route.query.proCode}, res => {
        if (res.resultCode == "0000") {
          this.passageWayList = res.data.passageWayVoList;
        } else {
          this.requestError(res, this);
        }
      });*/
      //passagewayCode passagewayName  获取放款通道的接口
      $.post(this._path + '/busPassageConfirm/selectBusPassageConfirmInfo',{bussNo:this.$route.query.bussNo},res=>{
        if (res.resultCode == "0000") {
          this.passageName = res.data.busPassageConfirmVO.passageName;
          this.subAccount = res.data.busPassageConfirmVO.subAccountName;
          this.trustPlan = res.data.busPassageConfirmVO.trustPlan;
          this.passagewayCode = res.data.busPassageConfirmVO.passageName;
          this.tableFn(res.data.busPassageConfirmVO.passageName);
        }else{
          this.requestError(res,this)
        }
      });

    }
  }
</script>

<style scoped>
  .wz_table_border{
    padding-top: 20px;
  }
  .size_80{
    width: 90%;

  }
  .kuang{
    width: 95%;
    margin: auto;
    border-radius: 10px;
    height: 200px;
    border: 1px solid #ccc;
  }
  .kuang p{
    text-align: center;
    line-height: 200px;
    font-size: 25px;
    color: #BAC4CF;
  }
</style>
