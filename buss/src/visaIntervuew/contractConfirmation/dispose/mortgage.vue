<template>
  <div >
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr" v-for="item in OwnershipLogList">
        <el-col :span="3" class="table_td">房屋所有权人</el-col>
        <el-col :span="9" class="table_td">
          {{item.owenName}}
        </el-col>
        <el-col :span="3" class="table_td">产权证号</el-col>
        <el-col :span="9" class="table_td">
          {{item.ownership}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">抵押物坐落</el-col>
        <el-col :span="9" class="table_td">
          {{guaInfo.guaAddress}}{{guaInfo.guaBuilding}}{{guaInfo.guaNumber}}
        </el-col>
        <el-col :span="3" class="table_td">建筑面积（m²）</el-col>
        <el-col :span="9" class="table_td">
          {{guaInfo.guaArea}}
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>影像</span></h3>
    </div>
    <picModule :bussNo="$route.query.bussNo" dataType="3" taskType="218" :details="false" class="module_margin_bottom"></picModule>
  </div>
</template>

<script>


  export default {
    name: "contractConfirmMortgage",
    data() {
      return {
        OwnershipLogList: [],
        guaInfo: {},
      };
    },
    components:{

    },
    methods: {
      handleClick(b) {
        let path = b.name;
        this.$router.push({
          path:path,
          query:this.$route.query
        })
      },
      queryOwmerLog(){
        this.$http({
          url:'/dataCheck/selectBusHouseOwnershipLogBybussNo',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.OwnershipLogList = res.data.voList
          }
        });
      },
      queryGuaInfo(){
        this.$http({
          url:'/dataCheck/selectBusGuaInfoLogBybussNo',
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            this.guaInfo = res.data.guaLogVo
          }
        });
      }
    },
    created() {
      this.queryOwmerLog();
      this.queryGuaInfo()
    },
  };
</script>
