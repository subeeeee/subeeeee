<template>
  <div class="public">
    <h2>详情</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">城市<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueInfoVO.cityName}}
          </el-col>
        </el-col>
        <el-col class="table_td" :span="3">建筑面积(m²)<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueInfoVO.area}}
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title" v-if="queryValueFlowVo1Bol">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价1</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height" v-if="queryValueFlowVo1Bol">
      <el-col class="table_tr">
        <el-col class="table_td" :span="4">抵押物坐落关键字<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="13">
          <el-col :span="16">
            {{queryValueFlowVo1.address}}
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">社区名称<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo1.construction}}
          </el-col>
        </el-col>
        <el-col class="table_td" :span="3">楼栋<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo1.building}}
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">门牌号<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo1.house}}
          </el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title" v-if="queryValueFlowVo2Bol">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价2</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo table_height" v-if="queryValueFlowVo2Bol">
      <el-col class="table_tr">
        <el-col class="table_td" :span="4">抵押物坐落关键字<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="13">
          <el-col :span="16">
            {{queryValueFlowVo2.address}}
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">社区名称<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.construction}}
          </el-col>
        </el-col>
        <el-col class="table_td" :span="3">楼栋<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.building}}
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">单元<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.unit}}
          </el-col>
        </el-col>

        <el-col class="table_td" :span="3">门牌号<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.house}}
          </el-col>
        </el-col>
      </el-col>
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">所在楼层<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.floor}}
          </el-col>
        </el-col>
        <el-col class="table_td" :span="3">总楼层<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            {{queryValueFlowVo2.totalFloor}}
          </el-col>
        </el-col>
      </el-col>
    </el-row><div class="show_list_title">
    <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价结果</span></h3>
  </div>

    <el-card class="result module_margin_bottom">
      <el-row class="module_margin_bottom tableInfo table_height">
        <el-col class="table_tr">
          <el-col class="table_td" :span="12">询价结果</el-col>
          <el-col class="table_td" :span="12">{{queryValueInfoVO.queryResult | enquiry}}</el-col>
        </el-col>
        <el-col class="table_tr" v-if="queryValueInfoVO.queryResult == '1'">
          <el-col class="table_td" :span="12">询价单价（万元/m²）</el-col>
          <el-col class="table_td" :span="12">{{queryValueInfoVO.price}}</el-col>
        </el-col>
        <el-col class="table_tr" v-if="queryValueInfoVO.queryResult == '1'">
          <el-col class="table_td" :span="12">房屋估值（万元）</el-col>
          <el-col class="table_td" :span="12">{{queryValueInfoVO.valuation}}</el-col>
        </el-col>
        <el-col class="table_tr" v-if="queryValueInfoVO.queryResult=='1'">
          <el-col class="table_td" :span="12">建成年代</el-col>
          <el-col class="table_td" :span="12">{{queryValueInfoVO.remark}}</el-col>
        </el-col>
      </el-row>
      <div class="font_red">提示：房屋估值仅供参考，若欲取得精准估值，请报单。</div>
    </el-card>
    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="goback">返回列表</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "enquiryInfo",
    data () {
      return{
        cityName:'',
        coveredArea:'',

        keywords1:'',
        community1:'',
        building1:'',
        housNnumber1:'',

        keywords2:'',
        community2:'',
        building2:'',
        cell2:'',
        housNnumber2:'',
        queryValueFlowVo1:{},
        queryValueFlowVo2:{},
        queryValueInfoVO:{},
        queryValueFlowVOList:[],
        queryValueFlowVo1Bol:false,
        queryValueFlowVo2Bol:false
      }
    },
    methods:{
      goback(){
        this.$router.push({
          path:'/enquiryList'
        })
      },
      queryBaseInfo(){
        $.post(this._path + '/queryValueController/queryValueInfo',{id:this.$route.query.id},res=>{
          /*  this.queryValueFlowVo1 = res.data.queryValueFlowVo1;
            this.queryValueFlowVo2 = res.data.queryValueFlowVo2;*/
            this.queryValueFlowVOList = res.data.queryValueFlowVOList;
            this.queryValueFlowVOList.forEach((item)=>{
              if(item.orgType == '1'){
                this.queryValueFlowVo1 = item;
                this.queryValueFlowVo1Bol = true
              }else if(item.orgType == '2'){
                this.queryValueFlowVo2 = item;
                this.queryValueFlowVo2Bol = true
              }
            });
            this.queryValueInfoVO = res.data.queryValueInfoVO
        })
      }
    },
    created(){
      this.queryBaseInfo()
    }
  }
</script>

<style scoped>
  .result{
    width: 600px;
    margin:0 auto;
  }
</style>
