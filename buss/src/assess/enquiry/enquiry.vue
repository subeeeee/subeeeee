<template>
  <div class="public">
    <h2>询价</h2>
    <div class="show_list_title">
      <h3><img src="./../../assets/message.png" class="listTitleImg"><span>基本信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col class="table_tr">
        <el-col class="table_td" :span="3">城市<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            <el-select v-model="cityCode"   placeholder="请选择" class="select_width_80"  size='small' @change="check('cityCode')">
              <el-option v-for="item in citys" :key="item.code" :label="item.name" :value="item.code"> </el-option>
            </el-select>
          </el-col>
          <el-col class="error_title" :span="8" v-show="errorShow.cityCode">请选择城市</el-col>
        </el-col>
        <el-col class="table_td" :span="3">建筑面积(m²)<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :span="16">
            <el-input type="text" size="small" class="input_width_80" v-model="coveredArea" @keyup.native="number" @blur="check('coveredArea')"></el-input>
          </el-col>
          <el-col class="error_title" :span="8" v-show="errorShow.coveredArea">请填写建筑面积</el-col>
        </el-col>
      </el-col>
    </el-row>

    <div v-if="jurisdiction">
      <div class="show_list_title" v-if="slShow">
        <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价1</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo table_height" v-if="slShow" v-loading.body="enquiryLoading1">
        <el-col class="table_tr">
          <el-col class="table_td" :span="4">抵押物坐落关键字<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="13">
            <el-col :span="16">
              <el-input type="text" size="small" class="input_width_80" v-model="keywords1"  @blur="queryInfo('keywords1')"></el-input>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.keywords1">请填写抵押物坐落关键字</el-col>
          </el-col>
        </el-col>
        <el-col class="table_tr">
          <el-col class="table_td" :span="3">社区名称<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="community1"   placeholder="请选择" class="select_width_80"  size='small' @change="check('community1')">
                <el-option v-for="item in communityList1" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.community1">请选择社区名称</el-col>
          </el-col>
          <el-col class="table_td" :span="3">楼栋<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="building1"   placeholder="请选择" class="select_width_80"  size='small' @change="check('building1')">
                <el-option v-for="item in buildingList1" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.building1">请选择楼栋</el-col>
          </el-col>
        </el-col>
        <el-col class="table_tr">
          <el-col class="table_td" :span="3">门牌号<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="houseNumber1"   placeholder="请选择" class="select_width_80"  size='small' @change="check('houseNumber1')">
                <el-option v-for="item in houseNumberList1" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.houseNumber1">请选择门牌号</el-col>
          </el-col>
        </el-col>
      </el-row>
      <div class="show_list_title" v-if="fggShow">
        <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价2</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo table_height" v-if="fggShow" v-loading.body="enquiryLoading2">
        <el-col class="table_tr">
          <el-col class="table_td" :span="4">抵押物坐落关键字<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="13">
            <el-col :span="16">
              <el-input type="text" size="small" class="input_width_80" v-model="keywords2" @blur="queryInfo('keywords2')"></el-input>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.keywords2">请填写抵押物坐落关键字</el-col>
          </el-col>
        </el-col>
        <el-col class="table_tr">
          <el-col class="table_td" :span="3">社区名称<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="community2"   placeholder="请选择" class="select_width_80"  size='small' @change="check('community2')">
                <el-option v-for="item in communityList2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.community2">请选择社区名称</el-col>
          </el-col>
          <el-col class="table_td" :span="3">楼栋<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="building2" placeholder="请选择" class="select_width_80"  size='small' @change="check('building2')">
                <el-option v-for="item in buildingList2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.building2">请选择楼栋</el-col>
          </el-col>
        </el-col>
        <el-col class="table_tr">
          <el-col class="table_td" :span="3">单元<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="cell2"   placeholder="请选择" class="select_width_80"  size='small' @change="check('cell2')">
                <el-option v-for="item in cellList2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.cell2">请选择单元</el-col>
          </el-col>

          <el-col class="table_td" :span="3">门牌号<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="9">
            <el-col :span="16">
              <el-select v-model="houseNumber2"   placeholder="请选择" class="select_width_80"  size='small'  @change="check('houseNumber2')">
                <el-option v-for="item in houseNumberList2" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.houseNumber2">请选择门牌号</el-col>
          </el-col>
        </el-col>
        <el-col class="table_tr">
          <el-col class="table_td" :span="4">所在楼层/总楼层数<i class="importent">*</i></el-col>
          <el-col class="table_td" :span="12">
            <el-col :span="16">
              <el-col :span="8" :offset="1">
                <el-col :span="9" :offset="1">
                  <el-input size="small" v-model="floor" @blur="floorFn"></el-input>
                </el-col>
                <el-col :span="2">/</el-col>
                <el-col :span="11" :offset="1">
                  <el-input  size="small" v-model="totalFloor" @blur="floorFn"></el-input>
                </el-col>
              </el-col>
            </el-col>
            <el-col class="error_title" :span="8" v-show="errorShow.floor||errorShow.totalFloor">请输入所在楼层/总楼层数</el-col>
          </el-col>
        </el-col>
      </el-row>
      <div class="last_btn_wrap">
        <ul class="last_btn_box">
          <li class="last_btn"><el-button type="primary" @click="enquiry()" :disabled="enquirydisabled">询 价</el-button></li>
        </ul>
      </div>

      <div class="show_list_title">
        <h3><img src="./../../assets/message.png" class="listTitleImg"><span>询价结果</span></h3>
      </div>

      <el-card class="result module_margin_bottom">
        <el-row class="module_margin_bottom tableInfo table_height">
          <el-col class="table_tr">
            <el-col class="table_td" :span="12">询价结果</el-col>
            <el-col class="table_td" :span="12">{{queryResult|enquiry}}</el-col>
          </el-col>
          <el-col class="table_tr" v-if="queryResult=='1'">
            <el-col class="table_td" :span="12">询价单价（万元/m²）</el-col>
            <el-col class="table_td" :span="12">{{price}}</el-col>
          </el-col>
          <el-col class="table_tr" v-if="queryResult=='1'">
            <el-col class="table_td" :span="12">房屋估值（万元）</el-col>
            <el-col class="table_td" :span="12">{{valuation}}</el-col>
          </el-col>
          <el-col class="table_tr" v-if="queryResult=='1'">
            <el-col class="table_td" :span="12">建成年代</el-col>
            <el-col class="table_td" :span="12">{{builtAt}}</el-col>
          </el-col>
        </el-row>
        <div class="font_red">提示：房屋估值仅供参考，若欲取得精准估值，请报单。</div>
      </el-card>
    </div>

    <div v-if="!jurisdiction" class="city_jurisdiction">
        <div class="city_text">当前城市未开通第三方询价功能</div>
    </div>


    <div class="last_btn_wrap">
      <ul class="last_btn_box">
        <li class="last_btn"><el-button @click="goback">返回列表</el-button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "enquiry",
    data(){
      return{
        jurisdiction:false,
        enquiryLoading1:false,
        enquiryLoading2:false,
        floor:'',
        totalFloor:'',

        enquirydisabled:false,
        cityCode:'',
        citys:[],
        coveredArea:'',

        keywords1:'',
        keywords2:'',
        community1:'',
        communityList1:[],
        building1:'',
        buildingList1:[],
        houseNumber1:'',
        houseNumberList1:[],

        community2:'',
        communityList2:[],
        building2:'',
        buildingList2:[],
        houseNumber2:'',
        houseNumberList2:[],
        cell2:'',
        cellList2:[],
        enquiry1:{},
        enquiry2:'',

        valuation:'',
        builtAt:'',
        price:'',
        queryResult:'',
        errorShow:{
          cityCode:false,
          coveredArea:false,
          keywords1:false,
          community1:false,
          building1:false,
          houseNumber1:false,
          keywords2:false,
          community2:false,
          building2:false,
          houseNumber2:false,
          cell2:false,
          totalFloor:false,
          floor:false,
        },
        slShow:false,
        fggShow:false,
        rdValue:'',
      }
    },
    watch:{
      keywords2(){
        this.enquirydisabled = false;
      },
      keywords1(){
        this.enquirydisabled = false;
      }
    },
    methods:{
      floorFn(){
        !this.totalFloor?this.errorShow.totalFloor = true:this.errorShow.totalFloor = false;
        !this.floor?this.errorShow.floor = true:this.errorShow.floor = false
        this.fggEnquiry()
      },
      number(){
        this.coveredArea = this.coveredArea.replace(/[^0-9.]/g,'')
      },
      fggEnquiry(){
        if(!this.keywords2||!this.community2||!this.building2||!this.houseNumber2||!this.cell2||!this.totalFloor||!this.floor){
          return
        }
        this.enquiryLoading2 = true;
        let params = {
          cityCode:this.cityCode,
          communityId:this.community2,
          area:this.coveredArea,
          buildingId:this.building2,
          houseNumber:this.houseNumber2,
          floor:this.floor,
          totalFloor:this.totalFloor,
        };
        $.post(this._path + "/business/enquiryPrice",params,res=>{
          this.enquiry2 = res.data.enquiryPriceResult;
          this.enquiryLoading2 = false;
          this.enquirydisabled = false;
        })
      },
      enquiry(){
        if(!this.mustWrite()){
          this.$message.error('请填写完整信息后询价');
          return
        }
        this.enquirydisabled = true;
        let cityName = '';
        this.citys.forEach(option=>{
          if(this.cityCode === option.code){
            cityName = option.name
          }
        });
        let params1 = {
          cityCode:this.cityCode,
          cityName,
          area:this.coveredArea,
          remark:this.enquiry1.builtAt
        };
        let queryValueFlowVoString =[];
        if(this.slShow){
          queryValueFlowVoString.push({
            assessOrg:'1',
            address:this.keywords1,
            construction:this.ergodic(this.communityList1,this.community1),
            building:this.ergodic(this.buildingList1,this.building1),
            house:this.ergodic(this.houseNumberList1,this.houseNumber1),
            area:this.coveredArea,
            price:this.enquiry1.price/1000000,
            builtAt:this.enquiry1.builtAt,
          });
          if(!/^[0-9]+.?[0-9]*/.test(this.enquiry1.price)){
            this.$message.error('正在询值中，请稍后点击');
            return
          }
        }
        if(this.fggShow){
          queryValueFlowVoString.push({
            assessOrg:'2',
            caseId:this.enquiry2.caseId,
            address:this.keywords2,
            construction:this.ergodic(this.communityList2,this.community2),
            building:this.ergodic(this.buildingList2,this.building2),
            house:this.ergodic(this.houseNumberList2,this.houseNumber2),
            unit:this.ergodic(this.cellList2,this.cell2),
            area:this.coveredArea,
            price:this.rdValue == '01'?this.enquiry2.price/10000:this.enquiry2.dyPrice/10000,
            floor:this.floor,
            totalFloor:this.totalFloor,
          });
          let price = this.rdValue == '01'?this.enquiry2.price/1:this.enquiry2.dyPrice/1;
          if(!/^[0-9]+.?[0-9]*/.test(price)){
            this.$message.error('正在询值中，请稍后点击');
            return
          }
        }
        params1.queryValueFlowVoString = JSON.stringify(queryValueFlowVoString);

        $.post(this._path+'/queryValueController/insertQueryValueInfo',params1,res=>{
          if(res.resultCode === '0000'){
            this.price = res.data.queryValueInfoVO.price;
            this.queryResult = res.data.queryValueInfoVO.queryResult;
            this.valuation = res.data.queryValueInfoVO.valuation;
            this.builtAt = res.data.queryValueInfoVO.remark;
          }else{
            this.requestError(res,this)
          }
        })
      },
      queryInfo(str){
        if(str == 'keywords1'){
          this.community1 = '';
          this.communityList1 = [];
          this.building1 = '';
          this.buildingList1 = [];
          this.houseNumber1 = '';
          this.houseNumberList1 = [];
          if(!this.keywords2){
            this.keywords2 = this.keywords1;
          }
          if(!this.keywords1){
            this.errorShow.keywords1 = true;
          }else{
            this.errorShow.keywords1 = false;
          }
        }else if(str == 'keywords2'){

          this.community2 = '';
          this.communityList2 = [];
          this.building2 = '';
          this.buildingList2 = [];
          this.cell2 = '';
          this.cellList2 = [];
          this.houseNumber2 = '';
          this.houseNumberList2 = [];
          if(!this.keywords1){
            this.keywords1 = this.keywords2;
          }
          if(!this.keywords2){
            this.errorShow.keywords2 = true;
          }else{
            this.errorShow.keywords2 = false;
          }
        }
        if (!this.cityCode) {
          this.errorShow.cityCode = true;
          return
        }
        if (!this.coveredArea) {
          this.errorShow.coveredArea = true;
          return
        }
        if(this.slShow){
          $.post(this._path + "/business/getConstructions", {
            cityCode: this.cityCode.slice(0, 4),
            keyword: this.keywords1
          }, res => {
            this.communityList1 = res.data.constructions
          });
        }
        if(this.fggShow){
          $.post(this._path + "/business/searchCommunities", {
            cityCode: this.cityCode.slice(0, 4) + '00',
            keyword: this.keywords2
          }, res => {
            this.communityList2 = res.data.villageList
          })
        }
        this.enquirydisabled = false
      },
      check(str){
        if(!this[str]){
          this.errorShow[str] = true;
          return
        }else{
          this.errorShow[str] = false
        }
        switch (str){
          case "community1":
            this.building1 = '';
            this.buildingList1 = [];
            this.houseNumber1 = '';
            this.houseNumberList1 = [];
            this.enquiryLoading1 = true;
            $.post(this._path + "/business/getBuild",{constructionId:this.community1},res=>{
              this.buildingList1 = res.data.builds;
              this.enquiryLoading1 = false;
            })
            break;
          case "building1":
            this.houseNumber1 = '';
            this.houseNumberList1 = [];
            this.enquiryLoading1 = true;
            $.post(this._path + "/business/getHouse",{buildingId:this.building1},res=>{
              this.houseNumberList1 = res.data.houses;
              this.enquiryLoading1 = false;
            })
            break;
          case "houseNumber1":
            this.enquiryLoading1 = true;
            $.post(this._path + "/business/assessment",{constructionId:this.community1,buildingId:this.building1,houseId:this.houseNumber1,area:this.coveredArea},res=>{
              this.enquiry1 = res.data.assessmentDTO;

              this.enquiryLoading1 = false;
            })
            break;
          case "community2":
            this.building2 = '';
            this.buildingList2 = [];
            this.cell2 = '';
            this.cellList2 = [];
            this.houseNumber2 = '';
            this.houseNumberList2 = [];
            this.enquiryLoading2 = true;
            $.post(this._path + "/business/searchApartments",{cityCode:this.cityCode.slice(0, 4)+'00',communityId:this.community2},res=>{
              this.buildingList2 = res.data.builds;
              this.enquiryLoading2 = false;
            })
            break;
          case "building2":
            this.cell2 = '';
            this.cellList2 = [];
            this.houseNumber2 = '';
            this.houseNumberList2 = [];
            this.enquiryLoading2 = true;
            $.post(this._path + "/business/searchApartments",{cityCode:this.cityCode.slice(0, 4)+'00',buildingCode:this.building2,communityId:this.community2},res=>{
              this.cellList2 = res.data.builds
              this.enquiryLoading2 = false;
            })
            break;
          case "cell2":
            this.houseNumber2 = '';
            this.houseNumberList2 = [];
            this.enquiryLoading2 = true;
            $.post(this._path + "/business/searchApartments",{cityCode:this.cityCode.slice(0, 4)+'00',buildingCode:this.building2,communityId:this.community2,unitCode:this.cell2},res=>{
              this.houseNumberList2 = res.data.builds
              this.enquiryLoading2 = false;
            })
            break;
          case "houseNumber2":
            this.fggEnquiry()
            break;
          case 'cityCode':
            this.$http({
              url:'/queryValueController/queryConAssess',
              data:{
                cityCode:this.cityCode
              },
              callback:res=>{
                if(res.data.conAssessVo){
                  this.slShow = res.data.conAssessVo.assessOrg.indexOf('1') != -1?true:false;
                  this.fggShow = res.data.conAssessVo.assessOrg.indexOf('2') != -1?true:false;
                  this.rdValue = res.data.conAssessVo.rdValue;
                  this.jurisdiction = true
                }else {
                  this.jurisdiction = false
                }
              }
            });
            break
        }
        this.enquirydisabled = false
      },
      ergodic(arr,code){
        for(let i = 0;i<arr.length;i++){
          if(arr[i].id === code){
            return arr[i].name
          }
        }
      },
      mustWrite(){
        let bol = true;
        if(!this.cityCode){
          this.errorShow.cityCode = true;
          bol = false
        }
        if(!this.coveredArea){
          this.errorShow.coveredArea = true;
          bol = false
        }
        if(this.slShow){
          if(!this.keywords1){
            this.errorShow.keywords1 = true;
            bol = false
          }
          if(!this.community1){
            this.errorShow.community1 = true;
            bol = false
          }
          if(!this.building1){
            this.errorShow.building1 = true;
            bol = false
          }
          if(!this.houseNumber1){
            this.errorShow.houseNumber1 = true;
            bol = false
          }
        }
        if(this.fggShow){
          if(!this.keywords2){
            this.errorShow.keywords2 = true;
            bol = false
          }
          if(!this.community2){
            this.errorShow.community2 = true;
            bol = false
          }
          if(!this.building2){
            this.errorShow.building2 = true;
            bol = false
          }
          if(!this.cell2){
            this.errorShow.cell2 = true;
            bol = false
          }
          if(!this.houseNumber2){
            this.errorShow.houseNumber2 = true;
            bol = false
          }
          if(!this.floor){
            this.errorShow.floor = true;
            bol = false
          }
          if(!this.totalFloor){
            this.errorShow.totalFloor = true;
            bol = false
          }
        }
        return bol
      },
      goback(){
        this.$router.push({
          path:'/enquiryList'
        })
      }
    },
    created(){
      $.post(this._path + "/business/getEAreaCode", {}, res => {
        this.citys = res.data.permissionVoList;
        this.cityCode = this.citys[0].code;
      });
    }
  }
</script>

<style scoped>
  .result{
    width: 600px;
    margin:0 auto;
  }
  .city_jurisdiction{
    width: 100%;
    height: 400px;
    background-image: url("./../../assets/city_jurisdiction.png");
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
  }
  .city_text{
    position: absolute;
    width: 250px;
    text-align: center;
    font-size: 16px;
    left:48%;
    margin-left: -130px;
    top: 70%;
    color: #999999;
  }
</style>
