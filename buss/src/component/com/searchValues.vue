<template>
  <div>
    <br v-if="!disabled">
    <el-row :span="24" v-if="!disabled">
      <el-col span="3">
        <el-button size="small" class="inquireBtn" @click="add">新增</el-button>
      </el-col>
    </el-row>
    <br v-if="!disabled">
    <el-row :span="24" class="tableInfo">
      <el-col :span="24" class="table_tr" v-for="(item,index) in systemList">
        <el-col :span="10" class="table_td">
          <el-col :span="5" class="table_td">
            系统名称:
          </el-col>
          <el-col :span="19">
            <el-select :disabled="disabled" v-model="item.assessCode" placeholder="请选择" size='small'>
              <el-option v-for="systemitem in lists" :key="systemitem.dataType" :label="systemitem.name"
                         :value="systemitem.dataType"></el-option>
            </el-select>
            <el-button type="primary" size="small" v-show="!disabled"
                       v-if="item.assessCode == '1'||item.assessCode == '2'" @click="dialogFn(item.assessCode,index)">
              询值
            </el-button>
            <el-input v-if="item.assessCode == '99'" :disabled="disabled" size="small" style="width: 35%"
                      placeholder="请输入系统名称" maxlength="30" @keyup.native="clearSpeace(item.assessName,index)"
                      v-model="item.assessName"></el-input>
          </el-col>
        </el-col>
        <el-col :span="7" class="table_td">
          <el-col :span="12" class="table_td">
            询值单价(万元/m²):
          </el-col>
          <el-col :span="12" class="table_td">
            <el-input size="small" :disabled="disabled" @blur="average"
                      @keyup.native="assessValueFn(item.assessValue,index)" placeholder="请输入询值单价" class="input_width_80"
                      v-model="item.assessValue"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6" class="table_td">
          <el-col :span="12" class="table_td">
            询值总价(万元):
          </el-col>
          <el-col :span="12" class="table_td">
            <el-col :span="10" :offset="2">
              {{totalPriceFn(item.assessValue)}}&nbsp;
            </el-col>
            <el-col :span="4" :offset="8">
              <el-button v-if="!disabled" size="small" @click="deleteFn(index)"
                         style="position: relative;margin-left: 6px">删除
              </el-button>
            </el-col>
          </el-col>
        </el-col>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" width="70%" :before-close="handleClose" :modal="false" id="dialog"
               style="top:2%;">
      <div id="slpng">
        <span style="font-size:14px;color:#20a0ff;">请输入以下信息完成{{searchValue=="1"?"世联":"房估估"}}询值</span>
        <el-row v-loading="loading1">
          <el-col style="margin-top:5px" :span="24">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">抵押物坐落关键字</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-input v-model="paramsDa.keyword" @change.native="keywordFn" placeholder="请输入社区名称关键字"></el-input>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">社区名称</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-select v-model="paramsDa.constructionId" placeholder="请选择社区名称" class="select_width" size='small'
                         @change="constructionFn">
                <el-option v-for="item in constructions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">楼 栋</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-select v-model="paramsDa.buildingId" placeholder="请选择楼栋" class="select_width" size='small'
                         @change="buildingFn">
                <el-option v-for="item in builds" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24" v-if="searchValue == '2'">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">单 元</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-select v-model="paramsDa.unitCode" placeholder="请选择单元" class="select_width" size='small'
                         @change="unitFn">
                <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">门牌号</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-select v-model="paramsDa.houseId" placeholder="请选择门牌号" class="select_width" size='small'
                         @change="houseFn">
                <el-option v-for="item in houses" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24" v-if="searchValue == '2'">
            <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">所在楼层/总楼层数</el-col>
            <el-col :span="10" class="borrowerInfTd">
              <el-col :span="12" :offset="1">
                <el-col :span="10">
                  <el-input size="small" v-model="paramsDa.floor"></el-input>
                </el-col>
                <el-col :span="2">/</el-col>
                <el-col :span="11" :offset="1">
                  <el-input size="small" v-model="paramsDa.totalFloor"></el-input>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24"></el-col>
          <el-col :span="8" :offset="2" class="borrowerInfTd" style="color: black">建筑面积(m)²</el-col>
          <el-col :span="10" class="borrowerInfTd">
            <el-input v-model="paramsDa.area" placeholder="请输入房屋面积"></el-input>
          </el-col>
          <el-col style="margin-top:5px" :span="24">
            <el-col :span="8" class="borrowerInfTd"></el-col>
            <el-col :span="8" class="borrowerInfTd">
              <el-button type="primary" @click="dialog">查 询</el-button>
            </el-col>
            <el-col :span="4" class="borrowerInfTd" v-if="searchValue == '2'&&fggAppraisemetBol">
              <el-button type="primary" @click="dialogLoanFgg">生成评估报告</el-button>
            </el-col>
          </el-col>
          <el-col style="margin-top:5px" :span="24" v-if="paramsDa.price">
            <el-col :span="4" class="borrowerInfTd"></el-col>
            <el-col :span="8" style="text-align: left" class="borrowerInfTd">
              单价：{{paramsDa.price}}万元
            </el-col>
            <el-col :span="8" class="borrowerInfTd">
              总价：{{_utils.floatRide(paramsDa.price,paramsDa.area)}}万元
            </el-col>
          </el-col>
          <el-col :span="24" v-if="paramsDa.price&&searchValue == '1'">
            <el-col :span="4" class="borrowerInfTd"></el-col>
            <el-col :span="16" style="text-align: left" class="borrowerInfTd">
              询值时间:{{times}}&nbsp;{{alltimes}}
            </el-col>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="dialogV">关 闭</el-button>
      </span>
    </el-dialog>

    <br>

    <!--房估估评估报告部分-->
    <div class="report_kua" style="height:730px;top:6%;" v-if="contentBol">
      <el-button type="primary" style="position: absolute;z-index: 8;top: 2%;" @click="saveFgg">保存至“评估报告”</el-button>
      <!--<a id="btn_download">下载</a>-->
      <p style="text-align: right;position: relative;top:-25px;"><span style="font-size: 30px;cursor:pointer;" @click="contentBol = false">×</span></p>
      <div class="content">
        <div class="header">
          <div class="logo"><img src="../../assets/fgglogo.png" alt=""></div>
          <div class="header_title "><span>{{paramsDa.keyword}}</span> <i>快速评估单</i></div>
        </div>
        <div class="clearfix"></div>
        <div class="content_body" style="margin-top: 20px;">
          <el-row>
            <el-col class="bannerFgg" :span="1">
              <img src="../../assets/img_08.png">
            </el-col>
            <el-col :span="11" style="width: 93%; margin-left: 10px;">
              <table cellspacing="0" cellpadding="0" class="table table-bordered">
                <tbody>
                <tr>
                  <td colspan="4">抵押评估价</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 0px;">
                    <img src="../../assets/img_07.png"><span class="fonts">{{paramsDa.price*10000}}</span> 元/㎡
                  </td>
                  <td colspan="2" style="padding: 0px;">
                    <img src="../../assets/img_06.png"><span class="fonts">{{_utils.floatRide(paramsDa.price,paramsDa.area/1)}}</span>万元
                  </td>
                </tr>
                <tr>
                  <td colspan="4" style="text-align: right;">估价时点&nbsp;{{times}}&nbsp;{{alltimes}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1">
              <img src="../../assets/img_05.png">
            </el-col>
            <el-col :span="11" style="width: 93%; margin-left: 10px;">
              <table cellspacing="0" cellpadding="0" class="table table-bordered" style="text-align: center;">
                <tbody>
                <tr>
                  <td>房屋坐落</td>
                  <td colspan="3">{{srcData.areaName}}&nbsp; {{constructionName}} &nbsp; {{buildingName}}&nbsp;
                    {{unitsName}}&nbsp; {{housesName}}
                  </td>
                </tr>
                <tr>
                  <td>建筑面积</td>
                  <td>{{paramsDa.area/1}}㎡</td>
                  <td>楼层情况</td>
                  <td>{{paramsDa.floor}} <span v-if="paramsDa.floor&&paramsDa.totalFloor">/</span> {{paramsDa.totalFloor}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
          <el-row style="margin-top: 5px">
            <el-col :span="1">
              <img src="../../assets/img_01.png">
            </el-col>
            <el-col :span="6" style="width: 93%; margin-left: 10px;">
              <p> 1 、本报告结果完全依据客户提供的房产数据和云房大数据中心提供的数据分析所得， 且只分析和测算影响估价对象房地产的主要因素，未考虑房屋室内因素（房屋装修、维护及使用状况等）
                和未知的不确定因素对估价结果的影响，且并不对因数据本身可能存在的错误、缺失和偏差所导致的结果负责。</p>
              <p> 2、 本报告结果为价格咨询结果，且本报告为非鉴定性非正式房地产评估报告。 客户不能仅以此结果而不行使独立判断，最终结果以正式估价报告为准。 </p>
              <p> 3 、本报告由自动估值系统自动生成，报告出具机构未对估价对象入户查勘，不承担对估价对象建筑结构、 设备等的内在质量及其他被遮盖、未暴露或难以接触到的部分进行调查、检测的责任。 </p>
              <p> 4、本咨询报告自报告出具之日起一个月内有效。 </p>
              <p> 5、本报告最终解释权归北京云房数据技术有限责任公司。 </p>
            </el-col>
            <el-col id="date" :span="6" :offset="16">
              <p>北京云房数据技术有限责任公司 </p>
              <p id="date2">{{times}}</p>
              <p id="zhang"></p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .borrowerInfTd{
    border: none;
  }
</style>
<script>
  export default {
    name: "search-values",
    data() {
      return {
        systemList: [{assessCode: '', assessName: "", assessValue: ''}],
        RDarea:'',
        SLarea:'',
        lists: [],
        dialogVisible: false,
        RDfloorSum:'',
        RDfloorIn:'',
        SLaddress:'',
        paramsDa: {
          keyword: '',
          areaCode: '',
          price: "",
          constructionId: '',
          buildingId: '',
          houseId: '',
          area: '',
          unitCode: '',
          floor: '',
          totalFloor: '',
        },

        loading1: false,
        constructions: [{id: 1, name: '113'}, {id: 2, name: '223'}],
        builds: [{id: 1, name: '113'}, {id: 2, name: '223'}],
        houses: [{id: 1, name: '113'}, {id: 2, name: '223'}],
        units: [],
        searchValueIndex: '',
        searchValue: '',
        //  评估
        reportBol: false,
        times: '',
        alltimes: '',
        //名字 sl
        constructionName: '1',
        buildingName: '2',
        housesName: '3',
        unitsName: '4',
        contentBol: false,
        fggAppraisemetBol: false,
        slAppraisemetBol:false,
        fgg: {},
        firstRules:null,
        rules:{},
      }
    },
    props: {
      guaArea: String,
      bussNo: String,
      disabled: Boolean,
      keyword: String,
      areaCode: String,
      srcData: Object,
    },
    computed: {},
    methods: {
      average() {
        let list = [];
        this.systemList.forEach((res)=>{
          list.push({assessOrg:res.assessCode,price:res.assessValue})
        });
        this.$http({
          url:'/assess/calculateAssessPrice',
          data:{
            cityCode:this.$route.query.cityCode,
            queryValueFlowVoString:JSON.stringify(list)
          },
          callback:res=>{
            if(!res.data.price){
              this.$emit('average', '')
            }else if(!isNaN(res.data.price/1)){
              this.$emit('average',res.data.price )
            }else{
              this.$emit('average', '')
            }
          }
        });

      },
      //评估报告生成方法
      saveFgg() {
        this.systemList[this.searchValueIndex].assessValue = this.paramsDa.price;
        html2canvas(document.querySelector(".content")).then(canvas => {
          setTimeout(()=>{
            let dataUrl = canvas.toDataURL("image/png");
            let imageURL = this.getBlobBydataURI(dataUrl, 'image/png');
            console.log(dataUrl,imageURL);
            let formData = new FormData();
            formData.append("房估估评估报告", imageURL, '房估估评估报告.png');
            formData.append("bussNo", this.$route.query.bussNo);
            formData.append("dataType", "3");
            formData.append("imageType", '35');
            formData.append("taskType", '114');
            formData.append("custId", "");
            formData.append("otherNo", "");
            $.ajax({
              url: this._path + "/businessImage/uploadFile",
              type: "POST",
              dataType: "json",
              cache: false,
              data: formData,
              processData: false,
              contentType: false,
              success: res => {
                if (res.resultCode == '0000') {
                  this.$message({
                    type: "success",
                    message: "上传成功",
                    duration: 1500,
                    showClose: 1
                  })
                }
                this.average();
                this.dialogVisible = false;
                this.contentBol = !this.contentBol;
                window.bus.$emit('queryImage', {
                  dataType: '3',
                  imageType: '35',
                  taskType: '114',
                  bussNo: this.$route.query.bussNo,
                  custId: "",
                  otherNo: ''
                })
              },
              error: err => {
                this.$message({
                  type: "error",
                  message: "上传失败",
                  duration: 1500,
                  showClose: 1
                });
              }
            });
            // //下载本地
           /* document.querySelector('#btn_download').setAttribute('href',dataUrl);
            document.querySelector('#btn_download').setAttribute('download','myImg')*/
          },1000)
        })
      },
      //保存sl评估报告
      saveSl(){
        html2canvas(document.querySelector("#slpng"),{useCORS:true}).then(canvas => {
          setTimeout(()=>{
            let dataUrl =canvas.toDataURL("image/png");
            let $Blob= this.getBlobBydataURI(dataUrl,'image/png');
            let formData = new FormData();
            console.log(dataUrl);
            formData.append("files", $Blob ,"世联评估报告.png");
            formData.append("bussNo", this.$route.query.bussNo);
            formData.append("dataType", "3");
            formData.append("imageType",'35');
            formData.append("taskType", '114');
            formData.append("custId","");
            formData.append("otherNo","");
            $.ajax({
              url: this._path + "/businessImage/uploadFile",
              type: "POST",
              dataType: "json",
              cache: false,
              data: formData,
              processData: false,
              contentType: false,
              success: res => {
                if(res.resultCode == '0000'){
                  this.$message({
                    type: "success",
                    message: "上传成功",
                    duration: 1500,
                    showClose: 1
                  })
                }
                this.reportBol = !this.reportBol
                window.bus.$emit('queryImage',{dataType:'3',imageType:'35',taskType:'114',bussNo:this.$route.query.bussNo,custId:"",otherNo:''})
              },
              error: err => {
                this.$message({
                  type: "error",
                  message: "上传失败",
                  duration: 1500,
                  showClose: 1
                });
              }
            });
          },1000);
        })
      },
      //生成评估报告fgg
      dialogLoanFgg() {
        this.timeFn();
        this.contentBol = true;
      },
      //根据base64 内容 取得 bolb
      getBlobBydataURI(dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },
      dialogLoan() {
        this.reportBol = true;
        this.timeFn();
      },
      //当前时间
      timeFn() {
        let mydate = new Date();
        let times = "" + mydate.getFullYear() + "年";
        times += (mydate.getMonth() + 1) + "月";
        times += mydate.getDate() + "日";
        this.times = times;

        let Week = ['日', '一', '二', '三', '四', '五', '六'];
        let _alltimes = "星期" + Week[mydate.getDay()] + " ";
        _alltimes += mydate.getHours() + ":";
        _alltimes += mydate.getMinutes() + ":";
        _alltimes += mydate.getSeconds() + " ";
        this.alltimes = _alltimes
      },
      //截止
      assessValueFn(str, index) {
        this.$set(this.systemList[index], 'assessValue', this._utils.numSix(str))
      },
      // 弹出框 及 清空内容 区分何处点击
      dialogFn(searchValue, index) {
        this.dialogVisible = true;
        this.searchValue = searchValue;
        this.searchValueIndex = index;
        this.constructions = [];
        this.builds = [];
        this.houses = [];
        this.units = [];
        this.fggAppraisemetBol = false;
        this.slAppraisemetBol = false;
        for (let item in this.paramsDa) {
          this.paramsDa[item] = ''
        }
        this.paramsDa.keyword = this.keyword;
        this.paramsDa.area = this.guaArea;
        this.paramsDa.floor = this.srcData.floorIn;
        this.paramsDa.totalFloor = this.srcData.floorSum;

        let cityCode = this.areaCode.slice(0, 4);
        let params = {};
        let path = '';
        if (this.searchValue == "1") {
          path = '/business/getConstructions';
          params.cityCode = cityCode;
          params.keyword = this.paramsDa.keyword
        } else if (this.searchValue == "2") {
          path = '/business/searchCommunities';
          params.cityCode = cityCode + '00';
          params.keyword = this.paramsDa.keyword
        }
        $.post(this._path + path, params, res => {
          if (res.resultCode == "0000") {
            if (this.searchValue == '1') {
              this.constructions = res.data.constructions;
            } else if (this.searchValue == "2") {
              this.constructions = res.data.villageList;
            }
          } else {
            this.requestError(res, this)
          }
        });

      },
      handleClose(done) {
        this.dialogVisible = false;
      },
      keywordFn() {
        this.constructions = [];
        this.houses = [];
        this.builds = [];
        this.units = [];
        let cityCode = this.areaCode.slice(0, 4);
        let params = {};
        let path = '';
        if (this.searchValue == "1") {
          path = '/business/getConstructions';
          params.cityCode = cityCode;
          params.keyword = this.paramsDa.keyword
        } else if (this.searchValue == "2") {
          path = '/business/searchCommunities';
          params.cityCode = cityCode + '00';
          params.keyword = this.paramsDa.keyword
        }

        this.paramsDa.constructionId = "";
        this.paramsDa.buildingId = "";
        this.paramsDa.houseId = "";
        this.paramsDa.price = '';
        this.paramsDa.unitCode = '';
        $.post(this._path + path, params, res => {
          if (res.resultCode == "0000") {
            if (this.searchValue == '1') {
              this.constructions = res.data.constructions;
            } else if (this.searchValue == "2") {
              this.constructions = res.data.villageList;
            }
          } else {
            this.requestError(res, this)
          }
        });
      },
      constructionFn(val) {
        this.houses = [];
        this.builds = [];
        this.units = [];
        let params = {};
        let path = '';
        if (this.searchValue == "1") {
          path = '/business/getBuild';
          params.constructionId = val
        } else if (this.searchValue == "2") {
          path = '/business/searchApartments';
          params.communityId = val;
          params.cityCode = this.areaCode.slice(0, 4) + '00'
        }
        this.paramsDa.buildingId = "";
        this.paramsDa.houseId = "";
        this.paramsDa.unitCode = "";
        this.paramsDa.price = '';
        $.post(this._path + path, params, res => {
          if (res.resultCode == "0000") {
            if (this.searchValue == '1') {
              this.builds = res.data.builds;
            } else if (this.searchValue == "2") {
              this.builds = res.data.builds;
            }
          }
        });
      },
      buildingFn(val) {
        this.houses = [];
        this.units = [];
        let params = {};
        let path = '';
        if (this.searchValue == "1") {
          path = '/business/getHouse';
          params.buildingId = val
        } else if (this.searchValue == "2") {
          path = '/business/searchApartments';
          params.communityId = this.paramsDa.constructionId;
          params.buildingCode = val;
          params.cityCode = this.areaCode.slice(0, 4) + '00'
        }
        this.paramsDa.houseId = "";
        this.paramsDa.unitCode = "";
        this.paramsDa.price = '';
        $.post(this._path + path, params, res => {
          if (res.resultCode == "0000") {
            if (this.searchValue == '1') {
              this.houses = res.data.houses;
            } else if (this.searchValue == "2") {
              this.units = res.data.builds;
            }
          }
        });
      },
      unitFn(val) {
        this.houses = [];
        let params = {};
        let path = '/business/searchApartments';
        params.communityId = this.paramsDa.constructionId;
        params.buildingCode = this.paramsDa.buildingId;
        params.unitCode = val;
        params.cityCode = this.areaCode.slice(0, 4) + '00';
        this.paramsDa.houseId = "";
        this.paramsDa.price = '';
        $.post(this._path + path, params, res => {
          if (res.resultCode == "0000") {
            this.houses = res.data.builds;
          }
        });
      },
      houseFn() {
        this.paramsDa.price = '';
      },
      forEachData(str, code, list) {
        list.forEach((item) => {
          if (item.id == code) {
            this[str] = item.name
          }
        })
      },
      //查询
      dialog() {
        let params = {};
        let path = '';
        if (this.searchValue == '1') {
          path = "/business/assessment"
          this.SLarea = this.paramsDa.area;
          params.houseId = this.paramsDa.houseId;
          params.buildingId = this.paramsDa.buildingId;
          params.constructionId = this.paramsDa.constructionId;
          params.area = this.paramsDa.area;
        } else if (this.searchValue == '2') {
          this.RDfloorIn = this.paramsDa.floor;
          this.RDfloorSum = this.paramsDa.totalFloor;
          this.RDarea = this.paramsDa.area;
          this.forEachData('constructionName', this.paramsDa.constructionId, this.constructions);
          this.forEachData('buildingName', this.paramsDa.buildingId, this.builds);
          this.forEachData('unitsName', this.paramsDa.unitCode, this.units);
          this.forEachData('housesName', this.paramsDa.houseId, this.houses);
          path = '/business/enquiryPrice';
          params.area = this.paramsDa.area;
          params.cityCode = this.areaCode.slice(0, 4) + '00';
          params.communityId = this.paramsDa.constructionId;
          params.buildingId = this.paramsDa.buildingId;
          params.houseNumber = this.paramsDa.houseId;
          params.floor = this.paramsDa.floor;
          params.totalFloor = this.paramsDa.totalFloor
        }
        this.loading1 = true;
        this.paramsDa.price = '';
        this.fggAppraisemetBol = false;
        this.slAppraisemetBol = false;
        this.timeFn();
        $.post(this._path + path, params, res => {
          this.loading1 = false;
          if (res.resultCode == "0000") {
            if (this.searchValue == '1') {
              if (res.data.assessmentDTO) {
                this.slAppraisemetBol = true;
                this.paramsDa.price = res.data.assessmentDTO.price / 1000000;
                this.SLaddress = res.data.assessmentDTO.address
              } else {
                this.paramsDa.price == ""
              }
            } else if (this.searchValue == '2') {
              console.log(1,this.searchValue);
              if (res.data.enquiryPriceResult) {
                this.fggAppraisemetBol = true;
                if(this.rules.rdValue == '01'){
                  this.paramsDa.price = res.data.enquiryPriceResult.price / 10000
                }else if(this.rules.rdValue == '02'){
                  this.paramsDa.price = res.data.enquiryPriceResult.dyPrice / 10000
                }
              } else {
                this.paramsDa.price == ""
              }
            }
            if (this.paramsDa.price == "") {
              this.fggAppraisemetBol = false;
              this.$message({
                message: "未询到单价",
                type: "error",
                duration: 1500,
                showClose: 1
              });
            }
          }
        })
      },
      dialogV() {
        this.dialogVisible = false;
        if(this.paramsDa.price){
          this.systemList[this.searchValueIndex].assessValue = this.paramsDa.price;
          this.average();
          if(this.searchValue == '1'&&this.slAppraisemetBol){
            this.saveSl()
          }
        }
      },
      totalPriceFn(assessValue) {
        let num = '';
        if (isNaN((assessValue * 10000 / 10000) * (this.guaArea * 10000 / 10000)) || (assessValue * 10000 / 10000) * (this.guaArea * 10000 / 10000) == '0') {
          num = ''
        } else {
          num = this._utils.floatRide((assessValue * 1000000 / 1000000), (this.guaArea * 1000000 / 1000000))
        }
        return num
      },
      clearSpeace(str, index) {
        this.systemList[index].assessName = this._utils.clearSpeace(str)
      },
      add() {
        this.systemList.push({assessCode: '', assessName: "", assessValue: ''});
      },
      deleteFn(index) {
        this.$confirm('是否确认删除！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.systemList.splice(index, 1);
          this.average()
        })
      },
      isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
          if (hash[arr[i]]) {
            return true;
          }
          hash[arr[i]] = true;
        }
        return false;
      },
      returnEnquiryInfo() {
        let enquiryString = ''
        this.systemList.forEach(option=>{
          this.lists.forEach(opt=>{
            if(opt.dataType == option.assessCode && opt.dataType !=='99'){
              option.assessName = opt.name
            }
          })
          if(option.assessCode == '1'){
            option.address = this.SLaddress;
            option.area = this.SLarea;

          }else if(option.assessCode == '2'){
            option.address = `${this.srcData.areaName}${this.constructionName}${this.buildingName}${this.unitsName}${this.housesName}`
            option.area = this.RDarea;
          }
          if(option.assessCode == '1'){
            enquiryString +=`系统名称：${option.assessName}<br/>房产地址：${option.address}<br/>建筑面积(m²)：${option.area}<br/>询值单价(万元/m²)：${option.assessValue*1}<br/><br/>`
          }else if(option.assessCode == '2'){
            enquiryString +=`系统名称：${option.assessName}<br/>房产地址：${option.address}<br/>所在楼层/总楼层：${this.RDfloorIn?this.RDfloorIn:''}/${this.RDfloorSum?this.RDfloorSum:''}<br/>建筑面积(m²)：${option.area}<br/>询值单价(万元/m²)：${option.assessValue*1}<br/><br/>`
          }else{
            enquiryString +=`系统名称：${option.assessName} <br/>询值单价（万元/m²）：${option.assessValue*1}<br/><br/>`
          }

        })
        this.$emit('getEnquiryInfo',enquiryString)
      },
      sub() {
        let arrcode = [];
        let arrName = [];
        for (let i = 0; i < this.systemList.length; i++) {
          if (this.systemList[i].assessCode != '99') {
            if(!this.systemList[i].assessCode){
              arrcode.push(this.systemList[i].assessCode)
            }
          } else {
            if(!this.systemList[i].assessName){
              arrcode.push(this.systemList[i].assessName)
            }
          }
        }
        let bol = false;
        if (this.isRepeat(arrcode) || this.isRepeat(arrName)) {
          bol = false
        } else {
          bol = true
        }
        this.$emit('messageValue', {bol: bol, systemList: this.systemList})
      }
    },
    created() {
      // /busAssessValue/queryAssessValue
      $.post(this._path + "/busAssessValue/queryAssessValue", {bussNo: this.bussNo}, res => {
          if (res.resultCode == "0000") {
            this.systemList = res.data.busAssessValueVos;
            if (this.systemList.length == '0') {
              this.systemList = [{assessCode: '', assessName: "", assessValue: ''}]
            }
            //初评规则给出
          } else {
            this.requestError(res, this)
          }
        }
      );
    },
    beforeCreate() {
      this.$http({
        url:'/assess/queryConAssess',
        data:{
          cityCode:this.$route.query.cityCode
        },
        callback:res=>{
          if(res.data.conAssessVo){
            this.rules = res.data.conAssessVo;
            // this.firstRules = this._utils.firstRules(this.rules)
            let list = [];
            this.rules.assessOrg.indexOf('1') != -1?list.push({dataType:'1',name:'世联'}):'';
            this.rules.assessOrg.indexOf('2') != -1?list.push({dataType:'2',name:'房估估'}):'';
            list.push({dataType:'99',name:'其他'});
            this.lists = list;
          }else{
            this.lists = [{dataType:'99',name:'其他'}]
          }

        }
      });
      /*// /busAssessValue/getSystemName
      $.post(this._path + "/busAssessValue/getSystemName", res => {
          if (res.resultCode == "0000") {
            this.lists = res.data.typeList;
          } else {
            this.requestError(res, this)
          }
        }
      );*/
    }
  }
</script>

<style scoped>
  @import "./../../style/sLFgg.css";

  .borrowerInfTd {
    border: none !important;
    font-size: 14px !important;
  }

  .el-dialog__wrapper {
    overflow-y: hidden;
  }

  .el-dialog__wrapper .el-dialog--small {
    width: 33% !important;
  }

  #dialog .el-dialog {
    top: 30% !important;
    width: 35% !important;
  }

  .el-dialog {
    width: 35% !important;
  }

  .el-dialog__body {
    padding: 0 !important;
  }

  .porp {
    display: none;
    position: relative;
    z-index: 1000;
    text-align: left;
    text-indent: 10px;
    background-color: #fff;
    height: auto;
    max-height: 200px;
    cursor: pointer;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-top: 0px;
  }

  .porp::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
    opacity: 0.6
  }

  /*定义滚动条轨道 内阴影+圆角*/
  porp::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #fff;
  }

  /*定义滑块 内阴影+圆角*/
  porp::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #f4f4f4;
  }

  porp::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #E4E2E2;
  }
</style>
