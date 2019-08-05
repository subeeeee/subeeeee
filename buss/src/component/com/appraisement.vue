<template>
  <div class="accessToValue">
    <!--v-if="areaCode === '110100'"-->
    <div >
      <el-row class=" module_margin_bottom wz_table_border">
        <el-col :span="24" class="borrowerInfTr">
          <el-col :span="4" class="borrowerInfTd">初评单价(万元/m²)<span class="importent">*</span></el-col>
          <el-col :span="8" class="borrowerInfTd">
            <el-col :span="15">
              <el-input size="small" class="input_width" placeholder="请输入初评单价" @blur="andatoryVerification" v-model="unitPrice"></el-input>
            </el-col>
            <el-col :span="9" class="error_title" v-if="isUnitPrice"> *请输入大于0的数</el-col>
          </el-col>
          <el-col :span="3" class="borrowerInfTd doNotChange">初评总价(万元)</el-col>
          <el-col :span="9" class="borrowerInfTd doNotChange	">{{allUnitPrice}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr doNotChange">
          <el-col :span="3" class="borrowerInfTd">抵押顺位</el-col>
          <el-col :span="9" class="borrowerInfTd">{{srcData.firstPledge | pledgeFilter}}</el-col>
          <el-col :span="3" class="borrowerInfTd" v-if="srcData.firstPledge == '02'|| srcData.firstPledge == '04'">已抵押金额(万元)</el-col>
          <el-col :span="9" class="borrowerInfTd" v-if="srcData.firstPledge == '02'|| srcData.firstPledge == '04'">{{srcData.pledgeAmount}}</el-col>
        </el-col>
        <el-col :span="24" class="borrowerInfTr doNotChange">
          <el-col :span="3" class="borrowerInfTd">初评抵押率(%)</el-col>
          <el-col :span="8" class="borrowerInfTd">{{collateralRate}}</el-col>
          <el-col :span="5" class="borrowerInfTd">最大综合可贷款额(万元)</el-col>
          <el-col :span="8" class="borrowerInfTd">{{maxLoanAmountFn}}</el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // import '../../style/sLFgg.css'
  export default {
    name: "accessToValue",
    data() {
      return {
        loading1:false,
        loading2:false,

        fggPrice:'',
        fggPriceVisible:false,
        fggPriceBol:false,
        fgg:{   // 房估估所需字段
          keyword:'',//抵押物坐落
          city:'',//市
          pawnKeyword:'', //抵押物坐落关键字
          uptownName:'',//小区名称
          buildingId:'',//楼栋
          builds:[],//楼栋数组
          unit:'',//单元
          units:[],//单元数组
          floor:'',//所在层
          allFloor:'',//总层
          houseId:'',//门牌号
          houses:[],// 门牌号数组
          tenementType:'',//物业类型
          tenementTypeList:[],//物业类型数组
          orientation:'无',//朝向
          orientationList:[],//朝向数组
          completedTime:'',//建成年代
          special:'无',//特殊因素
          specialList:[],//特殊因素数组
          area:'',//房屋面积
          buildsName:'',//楼名
          unitsName:'',//单元名
          houseName:'',
        },

        dialogVisible: false,
        keyword: "",
        constructions: [],
        buildings: [],
        slArea: "",
        houseId: "",
        buildingId: "",
        constructionId: "",
        builds: [],
        houses: [],
        sLprice: "",
        sLpriceBol: false,
        sLBol: false,
        // 初评单价
        unitPrice: 0,
        address: '',
        building: '',
        houseNumber: '',
        area: '',
        areas: [],
        communityName: "",
        houseType: '',
        houseNature: '',
        guaArea: '',

        custBaseInfo: {},
        remark: '',


        cityCode: "",
        isConstructionId: false,
        isUnitPrice: false,
        isBuildingId: false,
        isHouseId: false,
        isSlArea: false,
        priceBol: true,
        fggConstructions:[],
        constructionsBol:false,

        areaCode:'',
        fggKeyword:'',
        areaName:'',
        collateralRate:'',
        //合肥
        housePrice:'',

        //名字 sl
        constructionName:'',
        buildingName:'',
        housesName:'',
        reportBol:false,
        sLassessBol:false,
        times:'',
        //fgg
        contentBol:false,
        alltimes:'',
        fggassessBol:false,
        fggPriceF:'',

        fggPriceDan:'',
        allfggPriceF:'',
        guaEffectiveArea:''
      };
    },
    props:{
      srcData:Object,
    },
    computed:{
      maxLoanAmountFn(){
        let n = '';
        if(this.collateralRate!=''&&this.collateralRate){
          n = this.srcData.guaEffectiveArea * this.unitPrice * this.collateralRate / 100 - this.srcData.pledgeAmount;
          n = n.toFixed(0);
        }else{
          n = ''
        }
        return n
      },
      allUnitPrice(){
        let n = '';
        if(this.guaEffectiveArea&&this.unitPrice){
          n = this._utils.floatRide(this.guaEffectiveArea,this.unitPrice)
        }else{
          n = ''
        }
        return n
      },
      fggKeyword(){
        return (this.address + this.building + this.houseNumber)
      },
    },
    methods: {
      guaEffectiveAreaFn(obj){
        this.guaEffectiveArea = obj;
      },
      //根据base64 内容 取得 bolb
      getBlobBydataURI(dataURI,type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type:type });
      },
      //保存sl评估报告
      saveSl(){
        html2canvas(document.querySelector("#report")).then(canvas => {
          let dataUrl =canvas.toDataURL("image/png");
          let $Blob= this.getBlobBydataURI(dataUrl,'image/png');
          let formData = new FormData();
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




          // //下载本地
          // document.querySelector('#btn_download').setAttribute('href',dataUrl);
          // document.querySelector('#btn_download').setAttribute('download','myImg')
        })
      },
      pirce(pirce){
        this.unitPrice = pirce
      },
      saveFgg(){
        html2canvas(document.querySelector(".content")).then(canvas => {
          let dataUrl =canvas.toDataURL("image/png");
          let imageURL= this.getBlobBydataURI(dataUrl,'image/png');
          let formData = new FormData();
          formData.append("房估估评估报告", imageURL,'房估估评估报告.png');
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
              this.contentBol = !this.contentBol
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
          // //下载本地
          // document.querySelector('#btn_download').setAttribute('href',dataUrl);
          // document.querySelector('#btn_download').setAttribute('download','myImg')
        })
      },
      //查询抵押率的方法
      getcollateralRate(item){
        this.collateralRate = item
      },
      andatoryVerification(){
        let typeStr = '初评单价';

        if (!this.unitPrice|| this.unitPrice <= 0) {
          this.isUnitPrice = true;
        }else if(!this._utils.isDecimals(this.unitPrice)){
          this.isUnitPrice = true;
        }else {
          let b = this.unitPrice/1
          this.unitPrice = b;
          this.isUnitPrice = false;
        }
        this.$emit('priceBol',{isUnitPrice:this.isUnitPrice,price:this.unitPrice})
        //区分城市的写法
        /*    switch (this.srcData.areaCode){
              case '110100':
                typeStr = "初评单价";
                break
              case '340100':
                typeStr = '房产价值';
                break
            }
            switch (typeStr){
              case '初评单价':

                break;
              case '房产价值':
                if (!this.housePrice|| this.housePrice <= 0) {
                  this.isUnitPrice = true;
                }else if(!this._utils.isDecimals(this.housePrice)){
                  this.isUnitPrice = true;
                }else {
                  this.isUnitPrice = false;
                }
                this.$emit('priceBol',{isUnitPrice:this.isUnitPrice,price:this.housePrice})
                break
            }*/
      },
      SLForvalue () {
        this.keyword = this.srcData.communityName;
        this.areaCode = this.srcData.areaCode;
        this.slArea = this.srcData.guaArea;

        this.dialogVisible  = true;
        this.cityCode = this.areaCode.slice(0, 4);
        let params = {
          cityCode: this.cityCode,
          keyword: this.keyword
        };
        $.post(this._path + "/business/getConstructions", params, res => {
          if (res.resultCode == "0000") {
            this.constructions = res.data.constructions;
          }
        })
      },
      FGGForvalue () {
        this.areaName = this.srcData.areaName
        this.fggKeyword = this.srcData.fggKeyword;
        this.fgg.pawnKeyword =  this.srcData.communityName;
        this.fgg.tenementType = '住宅';
        this.fgg.area = this.srcData.guaArea;
        this.fggPriceVisible    = true;

        this.areaCode = this.srcData.areaCode;
        this.cityCode = this.areaCode.slice(0, 4);
      },
      keyWordblur(type){
        if (type=='blur') {
          this.constructionsBol = false;
          setTimeout(()=>{
            $('.porp').slideUp(200)
          },200)

        } else {
          let params = {
            cityCode:this.areaCode,
            keyword:this.fgg.pawnKeyword
          }
          // /business/searchCommunities
          $.post(this._path + "/business/searchCommunities", params, res => {
            if (res.resultCode == "0000") {
              this.fggConstructions = res.data.constructions
              this.constructionsBol = true
              $('.porp').slideDown(200)
            } else {
              this.requestError(res,this)
            }
          })
        }
      },
      //门牌
      fgghouseFn(val){
        for(let i = 0;i<this.fgg.houses.length;i++){
          if(val == this.fgg.houses[i].code){
            this.fgg.houseName = this.fgg.houses[i].name
            break
          }
        }
      },
      //单元
      fggUnitFn(val){
        this.fgg.houseId = ''
        this.fgg.houses = []
        this.fggpriceBol = false
        this.fggPrice = ''
        for(let i = 0;i<this.fgg.units.length;i++){
          if(val == this.fgg.units[i].code){
            this.fgg.unitsName = this.fgg.units[i].name
            break
          }
        }
        let params = {
          cityCode:this.areaCode,
          communityName:this.fgg.uptownName,
          buildingCode:this.fgg.buildingId,
          buildingName:this.fgg.buildsName,
          unitCode:val,
          unitName: this.fgg.unitsName,
        }
        $.post(this._path + "/business/searchApartments", params, res => {
          if (res.resultCode == "0000") {
            this.fgg.houses = res.data.builds
          } else {
            this.requestError(res,this)
          }
        })
      },
      //房估估楼栋
      fggBuildingFn(val){
        this.fgg.unit = ''
        this.fgg.units = []
        this.fgg.houseId = ''
        this.fgg.houses = []
        this.fggpriceBol = false
        this.fggPrice = ''
        for(let i = 0;i<this.fgg.builds.length;i++){
          if(val == this.fgg.builds[i].code){
            this.fgg.buildsName = this.fgg.builds[i].name
            break
          }
        }
        let params = {
          cityCode:this.areaCode,
          communityName:this.fgg.uptownName,
          buildingCode:val,
          buildingName:this.fgg.buildsName,
        }
        $.post(this._path + "/business/searchApartments", params, res => {
          if (res.resultCode == "0000") {
            this.fgg.units = res.data.builds
          } else {
            this.requestError(res,this)
          }
        })
      },
      pawnKeywordName(val){
        this.fgg.uptownName = val
        this.fgg.pawnKeyword = val
        this.constructionsBol = false
        let params = {
          cityCode:this.areaCode,
          communityName:val
        }
        this.fgg.buildingId = ''
        this.fgg.builds = []
        this.fgg.unit = ''
        this.fgg.units = []
        this.fgg.houseId = ''
        this.fgg.houses = []
        this.fggpriceBol = false
        this.fggPrice = ''
        $.post(this._path + "/business/searchApartments", params, res => {
          if (res.resultCode == "0000") {
            this.fgg.builds = res.data.builds
            //清空
          } else {
            this.requestError(res,this)
          }
        })
      },
      pawnKeywordFn(){
        let params = {
          cityCode:this.areaCode,
          keyword:this.fgg.pawnKeyword
        }
        // /business/searchCommunities
        $.post(this._path + "/business/searchCommunities", params, res => {
          if (res.resultCode == "0000") {
            this.fggConstructions = res.data.constructions
            this.constructionsBol = true
            $('.porp').slideDown(200)
            //清空
            this.fgg.uptownName = ''
            this.fgg.buildingId = ''
            this.fgg.builds = []
            this.fgg.unit = ''
            this.fgg.units = []
            this.fgg.houseId = ''
            this.fgg.houses = []
            this.fggpriceBol = false
            this.fggPrice = ''
          } else {
            this.requestError(res,this)
          }
        })
      },
      inquireBlur(type,str){
        if(!str){
          this.calculate('1');
          return
        }
        let num = '';
        if('sl'==type){
          num = this.sLprice;
          this.sLprice = num.substring(0,num.lastIndexOf('.')+7)
        }else{
          num = this.fggPrice;
          this.fggPrice = num.substring(0,num.lastIndexOf('.')+7);
          this.fggPriceF = this.fggPrice
        }
        this.calculate('1')
      },
      //询值
      inquire(str,type){
        if('sl'==type){
          this.sLprice = this._utils.clearTwoNum(str)
        }else if('fgg' == type){
          this.fggPrice = this._utils.clearTwoNum(str)
          this.fggPriceF = this.fggPrice
        }else{
          this.housePrice = this._utils.clearTwoNum(str);
          var re = /([0-9]+\.[0-9]{0,4})[0-9]*/;
          this.housePrice = this.housePrice.replace(re,"$1");
        }
        this.calculate()
      },
      //生成评估报告fgg
      dialogLoanFgg(){
        this.timeFn();
        this.contentBol = true
      },
      //dialogFgg查询房估估
      dialogFgg(){
        if(!this.fgg.area||!this.fgg.pawnKeyword||!this.fgg.tenementType||!this.fgg.buildingId){
          this.$message({
            message: "请填写必填项",
            type: "error",
            duration: 1500,
            showClose: 1
          });
          return
        }
        let params = {
          cityCode:this.areaCode,
          communityName:this.fgg.uptownName,
          buildingCode:this.fgg.buildingId,
          buildingName:this.fgg.buildsName,
          unitCode:this.fgg.unit,
          unitName: this.fgg.unitsName,
          houseType:this.fgg.tenementType,
          area:this.fgg.area,
          toward:this.fgg.orientation,
          specialFactors:this.fgg.special,
          houseNumber:this.fgg.houseId,

        }
        if(this.fgg.floor){
          params.floor = this.fgg.floor
        }
        if(this.fgg.allFloor){
          params.totalFloor = this.fgg.allFloor
        }
        if(this.fgg.completedTime){
          params.builtedTime = this.fgg.completedTime
        }

        // /business/enquiryPrice
        // let loading = this.$loading({
        //   lock: true,
        //   text: "询值中，请稍后......",
        //   spinner: "el-icon-loading",
        //   background: "rgba(255, 255, 255, 0.5)"
        // });
        this.loading2 = true
        $.post(this._path + "/business/enquiryPrice", params, res => {
          // loading.close();
          this.loading2 = false
          if (res.resultCode == "0000") {
            // this.fggConstructions = res.data.constructions
            // this.constructionsBol = true
            if(res.data.enquiryPriceResult){
              this.fggpriceBol = true;
              this.fggPriceF = res.data.enquiryPriceResult.price/10000;
              let num = this.fggPriceF *0.98 + '';
              this.fggPrice = num.substring(0,num.lastIndexOf('.')+7);
              let price = this.fggPrice/1;
              this.fggPriceDan = this._utils.floatRide(price,10000);
              this.allfggPriceF = this._utils.floatRide((((this.fggPriceF/1 * this.fgg.area/1).toFixed(0))),0.98);
              this.fggassessBol = true;
            }else{
              this.fggassessBol = false;
              this.$message({
                message: "未询到房估估单价",
                type: "error",
                duration: 1500,
                showClose: 1
              });
            }
            this.calculate()
          } else {
            this.requestError(res,this)
          }
        })

      },
      //当前时间
      timeFn(){
        let mydate = new Date()
        let times = "" + mydate.getFullYear() + "年";
        times += (mydate.getMonth() + 1) + "月";
        times += mydate.getDate() + "日";
        this.times = times;

        let Week = ['日', '一', '二', '三', '四', '五', '六'];
        let _alltimes = "星期" + Week[mydate.getDay()] + " ";
        _alltimes += mydate.getHours()  + ":";
        _alltimes += mydate.getMinutes()  + ":";
        _alltimes += mydate.getSeconds()  + " ";
        this.alltimes = _alltimes
      },
      //生成评估报告 sl
      dialogLoan(){
        this.reportBol = true;
        this.timeFn();
      },
      //计算初评单件
      calculate(type){
        if(!this.sLprice&&!this.fggPrice){
          return
        }
        let fggPrice = '';
        if(type=='1'){
          fggPrice = this._utils.floatRide(this.fggPrice,0.98)
        }else{
          fggPrice = this.fggPrice
        }
        if(fggPrice&&this.sLprice&&this.sLprice/1!=0&&fggPrice/1!=0){
          this.unitPrice =this._utils.accDiv((this._utils.accAdd(fggPrice/1,this.sLprice/1)),2)
        }else if(!fggPrice||fggPrice/1 == 0){
          this.unitPrice = this.sLprice/1
        }else if(!this.sLprice||this.sLprice/1 == 0){
          this.unitPrice = fggPrice/1
        }
        this.unitPrice = (this.unitPrice+'').substring(0,(this.unitPrice+'').lastIndexOf('.')+7);
        this.$emit('message',{fggPrice:this.fggPriceF,sLprice:this.sLprice,unitPrice:this.unitPrice,remark:this.remark})
      },
      //未询到值
      dialogVbFgg(){
        this.fggPriceBol = true
        this.fggPriceVisible = false
        // if(this.remark){
        //   if(this.remark.indexOf('房估估人工录入') == -1){
        //     this.remark =   this.remark + '；房估估人工录入；'
        //   }
        // }else{
        this.remark = '房估估人工录入'
        // }
        let fggPrice = this.fggPrice
        this.$emit('message',{fggPrice:fggPrice,sLprice:this.sLprice,unitPrice:this.unitPrice,remark:this.remark})
      },
      //handleCloseFgg
      handleCloseFgg(){
        this.fggPriceVisible = false
        this.fggPriceVisible = false
      },
      clearNum(str,type){
        if(type=='1'){
          this.fgg.floor = this._utils.clearNum(str)
        }else{
          this.fgg.allFloor = this._utils.clearNum(str)
        }
      },
      dialogV() {
        this.dialogVisible = false;
        this.isConstructionId = false;
        this.isBuildingId = false;
        this.isHouseId = false;
        this.isSlArea = false;
        this.priceBol = false;
        this.$emit('message',{fggPrice:this.fggPriceF,sLprice:this.sLprice,unitPrice:this.unitPrice,remark:this.remark})
      },
      dialogVb() {
        this.dialogVisible = false;
        this.sLpriceBol = true;
        this.isConstructionId = false;
        this.isBuildingId = false;
        this.isHouseId = false;
        this.isSlArea = false;
        this.priceBol = false;

        //备注
        // if(this.remark){
        //   if(this.remark.indexOf('世联人工录入') == -1){
        //     this.remark =   this.remark + '；世联人工录入'
        //   }
        // }else{
        this.remark = '世联人工录入';
        // }
        this.$emit('message',{fggPrice:this.fggPriceF,sLprice:this.sLprice,unitPrice:this.unitPrice,remark:this.remark})
      },
      dialog() {
        let params = {
          area: this.slArea,
          houseId: this.houseId,
          buildingId: this.buildingId,
          constructionId: this.constructionId
        };

        this.priceBol = true;
        if (
          params.area == "" ||
          params.houseId == "" ||
          params.buildingId == "" ||
          params.constructionId == ""
        ) {
          this.$message({
            message: "请将上述字段填写完整",
            type: "error",
            duration: 1500,
            showClose: 1
          });
          return;
        }
        // /business/assessment
        // let loading = this.$loading({
        //   lock: true,
        //   text: "询值中，请稍后......",
        //   spinner: "el-icon-loading",
        //   background: "rgba(255, 255, 255, 0.5)"
        // });
        this.loading1 = true
        $.post(this._path + "/business/assessment", params, res => {
          // loading.close();
          this.loading1 = false
          if (res.resultCode == "0000") {
            this.sLprice = res.data.assessmentDTO.price / 1000000;
            if (this.sLprice == "") {
              this.$message({
                message: "未询到世联单价",
                type: "error",
                duration: 1500,
                showClose: 1
              });
              this.sLassessBol = false
            }else{
              this.sLassessBol = true
            }
            this.calculate()
          }
        }).error(err => {
          this.loading1 = false
          this.$message({
            message: "未询到世联单价",
            type: "error",
            duration: 1500,
            showClose: 1
          })
        });
      },
      keywordFn() {
        this.cityCode = this.areaCode.slice(0, 4);
        let params = {
          cityCode: this.cityCode,
          keyword: this.keyword
        };
        this.constructions = [];
        this.houses = [];
        this.builds = [];
        $.post(this._path + "/business/getConstructions", params, res => {
          if (res.resultCode == "0000") {
            this.constructions = res.data.constructions;
            this.constructionId = "";
            this.buildingId = "";
            this.houseId = "";
          }
        });
        if (this.cityCode && this.keyword) {
          this.isConstructionId = true;
        }
      },
      shilianCitieFn(val) {
        this.cityCode = val;
        let params1 = {
          cityCode: val,
          keyword: this.keyword
        };
        this.houses = [];
        $.post(this._path + "/business/getConstructions", params1, res => {
          if (res.resultCode == "0000") {
            this.constructions = res.data.constructions;
          }
        });
        if (this.cityCode && this.keyword) {
          this.isConstructionId = true;
        }
      },
      shilianConstructionFn(val) {
        let params2 = {
          constructionId: val
        };
        this.constructions.forEach((value)=>{
          if(value.id == val){
            this.constructionName = value.name;
          }
        });

        this.houses = [];
        this.builds = [];
        $.post(this._path + "/business/getBuild", params2, res => {
          if (res.resultCode == "0000") {
            this.builds = res.data.builds;
            this.buildingId = "";
            this.houseId = "";
          }
        });
        this.isBuildingId = true;
      },
      shilianBuildingFn(val) {
        let params3 = {
          buildingId: val
        };
        this.houses = [];
        this.builds.forEach((value)=>{
          if(value.id == val){
            this.buildingName = value.name;
          }
        });
        $.post(this._path + "/business/getHouse", params3, res => {
          if (res.resultCode == "0000") {
            this.houses = res.data.houses;
            this.houseId = "";
          }
        });
        this.isHouseId = true;
      },
      houseFn(val){
        this.houses.forEach((value)=>{
          if(value.id == val){
            this.housesName = value.name;
          }
        });
      },
      handleClose(done) {
        this.dialogVisible = false;
      },
    },
    mounted(){
      this.areaCode = this.srcData.areaCode;
      this.guaEffectiveArea = this.srcData.guaEffectiveArea;
      this.collateralRate = this.srcData.collateralRate;
      this.unitPrice = this.srcData.unitPrice;
      this.fggPriceF = this.srcData.fggPrice;
      if(this.fggPriceF){
        if(this.srcData.is98){
          this.fggPrice = this.fggPriceF
        }else{
          this.fggPrice =  (this.fggPriceF*0.98 + '').substring(0,(this.fggPriceF*0.98+ '').lastIndexOf('.')+7)
        }
      }else{
        this.fggPrice = ''
      }
      this.sLprice = this.srcData.sLprice;
      this.housePrice = this.srcData.housePrice;
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
  .porp{
    display: none;
    position: relative;
    z-index: 1000;
    text-align: left;
    text-indent: 10px;
    background-color: #fff;
    height: auto;
    max-height: 200px;
    cursor:pointer;
    overflow-y:auto;
    border: 1px solid #ccc;
    border-top:0px;
  }
  .porp::-webkit-scrollbar {
    width: 5px;
    height: 4px;
    background-color: #F5F5F5;
    opacity: 0.6
  }
  /*定义滚动条轨道 内阴影+圆角*/
  porp::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background: #fff ;
  }
  /*定义滑块 内阴影+圆角*/
  porp::-webkit-scrollbar-thumb {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#f4f4f4;
  }
  porp::-webkit-scrollbar-thumb:hover {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#E4E2E2;
  }

</style>

