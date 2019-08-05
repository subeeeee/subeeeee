<template>
  <div class="addOrder public">
    <h2>新增订单</h2>

    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>借款人基本信息</span></h3>

    </div>
    <el-row class="borrowerInfo module_margin_bottom">
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">订单编号</el-col>
        <el-col :span="9" class="borrowerInfTd">{{bussNo}}</el-col>
        <el-col :span="3" class="borrowerInfTd">城市<span class="importent">*</span></el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="15" class="addordertableselect">
            <el-select v-model="city" placeholder="请选择" class="select_width"  size='small' @change="cityChange">
              <el-option v-for="item in citys" :key="item.value" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="isCityChoose"> *请选择城市</el-col>
          <!-- 提交时检测城市是否选择 -->
        </el-col>

      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">借款人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="15"><el-input size="small" class="input_width"  v-model="borrowerName" :maxlength="20" placeholder="请输入借款人姓名" @blur="verify('借款人姓名')"></el-input></el-col>
          <el-col :span="9" class="error_title" v-if="isErrorBrower"> *姓名为1-20位汉字</el-col>
        </el-col>
        <el-col :span="3" class="borrowerInfTd">身份证号<span class="importent">*</span></el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="13"><el-input size="small" v-model="identityID" class="input_width" @keyup.native="clearSpeace('identityID')" placeholder="请输入18位身份证号码" @blur="verify('身份证号码')" ></el-input></el-col>
          <el-col :span="11" class="error_title" v-if="isErrorIdentityID"> *姓名与身份证号不匹配</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">性别</el-col>
        <el-col :span="9" class="borrowerInfTd">{{sex | isMan}}</el-col>
        <el-col :span="3" class="borrowerInfTd">出生日期</el-col>
        <el-col :span="9" class="borrowerInfTd">{{birthday}}</el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">年龄</el-col>
        <el-col :span="9" class="borrowerInfTd">{{age}}</el-col>
        <el-col :span="3" class="borrowerInfTd">机构代码</el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="15"><el-input disabled size="small" class="input_width" v-model="organizationID" placeholder="请输入四位机构代码" @keyup.native='organizationIDVarify()' @blur="verify('机构代码')" maxLength='4'></el-input></el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="borrowerInfTr">
        <el-col :span="3" class="borrowerInfTd">经纪人姓名<span class="importent">*</span></el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="15"><el-input size="small" class="input_width" v-model="brokerName" placeholder="请输入经纪人姓名" :maxlength="20" @blur="verify('经纪人姓名')"></el-input></el-col>
          <el-col :span="9" class="error_title" v-if="isErrorbrokerName"> *姓名为1-20位汉字</el-col>
        </el-col>
        <el-col :span="3" class="borrowerInfTd">经纪人手机号<span class="importent">*</span></el-col>
        <el-col :span="9" class="borrowerInfTd">
          <el-col :span="15"><el-input size="small" class="input_width" v-model="brokerMobile" placeholder="请输入经纪人手机号" @blur="verify('经纪人手机号')"></el-input></el-col>
          <el-col :span="9" class="error_title" v-if="isErrorbrokerMobile"> *请输入11位手机号</el-col>
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../assets/figure.png" class="listTitleImg"><span>抵押物基本信息</span></h3>
    </div>
    <picModule dataType="1" :bussNo="bussNo" taskType='110' class="addImg"/>
    <el-row class="module_margin_bottom borrowerInfo">
      <el-col class="borrowerInfTr" :span="24">
        <el-col class="borrowerInfTd" :span="3">房产证号<span class="importent">*</span></el-col>
        <el-col class="borrowerInfTd" :span="21">
          <el-col :offset='1' :span="7">
            <el-select v-model="ownershipType" placeholder="请选择" class="select_width"  size='small' @change="ownershipTypeChange">
              <el-option v-for="item in houseOwnershipDTOList" :label="item.ownershipType" :value="item.ownershipCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="14">
            <ownership-no v-if="ownershipBol" :ownershipList="houseOwnershipDTOList" :changeValue="changeValue" :ownershipNo="ownershipNo" :ownershipType="ownershipType" ref="changeOwnershipType" @finish="finish"></ownership-no>
          </el-col>

        </el-col>
      </el-col>
      <el-col class="borrowerInfTd" :span="3">抵押顺位<span class="importent">*</span></el-col>
      <el-col class="borrowerInfTd" :span="9">
        <el-col :span="15" class="addordertableselect">
          <el-select v-model="pledgeOrder" placeholder="请选择" class="select_width"  size='small' @change="pledgeOrderChange">
            <el-option  :label="'一抵'" :value="'01'"></el-option>
            <el-option  :label="'二抵'" :value="'02'"></el-option>
            <el-option  :label="'一抵转单'" :value="'03'"></el-option>
            <el-option  :label="'二抵转单'" :value="'04'"></el-option>
          </el-select>
        </el-col>
        <el-col :span="9" class="error_title" v-if="isPledgeOrder"> *请选择抵押顺位</el-col>
      </el-col>
      <el-col class="borrowerInfTd" :span="4" v-if="pledgeOrder == '02'||pledgeOrder == '04'">已抵押金额(万元)<span class="importent">*</span></el-col>
      <el-col class="borrowerInfTd" :span="8" v-if="pledgeOrder == '02'||pledgeOrder == '04'">
        <!-- @keyup.native='pledgeMoneyVarify(1)' -->
        <el-col :span="13"><el-input size="small" class="input_width"  v-model="pledgeMoney" placeholder="请输入已抵押金额"   @blur="verify('已抵押金额')"></el-input></el-col>
        <el-col :span="11" class="error_title" v-if="isPledgeMoney"> *请输入大于0的数字</el-col></el-col>

    </el-row>
    <el-col :offset='10' :span='2' class="inquireBtn_warp"><el-button type="primary" class="inquireBtn" @click="submit">提交</el-button></el-col>
  </div>
</template>
<script>
  import './../../style/addOrder.css'
  var err = (_this)=>{
    _this.$message({
      type:'error',
      message:'信息输入有误或不完整，请重新输入',
      durition:1500,
      showClose:1
    })
  }
  export default {
    name:'addOrder',
    data () {
      return {
        ownershipBol:false,
        changeValue:true,
        ownershipList:[],
        ownershipNo:'',
        bussNo:'?',
        citys:[],
        pledgeOrder:'01',
        city:'',
        borrowerName:'',
        identityID:'',
        sex:'',
        age:'',
        organizationID:'',
        brokerName:'',
        brokerMobile:'',
        pledgeMoney:'',
        isErrorbrokerMobile:false,
        isErrorbrokerName:false,
        isErrorBrower:false,
        isErrorIdentityID:false,
        isCityChoose:false,
        isPledgeOrder:false,
        isPledgeMoney:false,
        dialogVisible:false,
        dialogImageUrl:'',
        custNo:'',
        birthday:'',
        ownershipType:'',
        loanNo:'',
        areaName:'',
        // 房产证号
        // 新
        newHouse0:'',
        newHouse1:'',
        newHouse2:'',
        // 旧
        oldHouse1:'',
        oldHouse2:'',
        oldHouse3:'',

        ownershipNoBol:false,
        houseOwnershipDTOList:[]
      }
    },
    methods:{
      clearSpeace(str){
        this[str] = this._utils.clearSpeace(this[str])
      },
      finish(obj){
        this.ownershipNo = obj.ownershipNo;
        this.ownershipNoBol = obj.ownershipNoBol
      },
      ownershipTypeChange () {
        this.$refs.changeOwnershipType.initOwnershipNo(this.ownershipType)
      },
      pledgeMoneyVarifyFn(){
        this._utils.formatnumber(this.pledgeMoney,4)
      },
      pledgeOrderChange () {
        this.isPledgeOrder = false
      },
      // 机构代码 keyup
      organizationIDVarify(){
        this.organizationID=this.organizationID.replace(/[^a-zA-Z]/,'')
      },
      pledgeMoneyVarify(str){
        switch(str){
          case 0:
            this.pledgeMoney=this.pledgeMoney.replace(/[^\d.]/,'');
            break;
          case 1:
            let pledgeMoneyTest=/^(\d+|\d+\.\d{1,4})$/;
            let pledgeMoneyTemp=this.pledgeMoney;
            if(!pledgeMoneyTest.test(pledgeMoneyTemp)){
              this.pledgeMoney=pledgeMoneyTemp.replace(/\D/g,'')
            }
            break;
          default:break;
        }

      },
      cityChange () {
        for(let i = 0,j = this.citys.length;i<j;i++){

          if(this.citys[i].code == this.city){
            this.areaName = this.citys[i].name
          }
        }
        if(this.city){
          this.isCityChoose = false;

          // /configuration/selectHouseOwnershipConf
          this.houseOwnershipDTOList = [];
          this.ownershipType = '';
          this.ownershipNo = '';
          this.ownershipBol = false
          $.post(this._path + '/configuration/selectHouseOwnershipConf',{cityCode:this.city},(res)=>{
            this.ownershipBol = true
            if(res.resultCode == '0000'){
              this.houseOwnershipDTOList = res.data.houseOwnershipDTOList
            }else{
              this.requestError(res,this)
            }
          })

        }else{
          this.isCityChoose = true;

        }
      },
      // 借款人基本信息条件检测
      verify(type){
        switch (type){
          case '借款人姓名':
            if(this.borrowerName){
              if(!this._utils.isHanzi(this.borrowerName)){
                this.isErrorBrower = true;
              }else{
                this.isErrorBrower = false;
                this.verify('身份证号码')
              }
            }else{
              this.isErrorBrower = true;
              return
            }
            break;
          case '经纪人姓名':
            if(this.brokerName){
              if(!this._utils.isHanzi(this.brokerName)){
                this.isErrorbrokerName = true;
              }else{
                this.isErrorbrokerName = false;
              }
            }else{
              this.isErrorbrokerName = true;
              return
            }
            break;
          case '身份证号码':
            if(18 === this.identityID.length||15 === this.identityID.length){
              $.post(this._path + '/business/realNameAuthentication',{name:this.borrowerName,certNo:this.identityID},(res)=>{
                if(res.resultCode&&res.resultCode=='0000'){
                  // 实名认证
                  if(res.data.isVerified){
                    this.sex=res.data.sex == '男'?'1':'0';
                    this.age=res.data.age;
                    this.birthday= (new Date(res.data.birthday)).toLocaleDateString()
                    this.isErrorIdentityID = false;
                  }else{
                    this.isErrorIdentityID = true;
                  }
                }else{
                  this.$message({
                    type:'error',
                    message:"实名认证失败：系统错误，请与管理员联系",
                    duration:1500,
                    showClose:true
                  })
                }

              }).error(()=>{
                this.$message({
                  type:'error',
                  message:"实名认证失败：系统错误，请与管理员联系",
                  duration:1500,
                  showClose:true
                })
              });
            }else{
              this.isErrorIdentityID = true;
            }
            break;
          case '机构代码':
            // if(4 === this.organizationID.length){
            //   $.post(this._path + '/business/validateOrgCode',{orgCode:this.organizationID},(res)=>{
            //
            //   })
            // }else{
            // }
            break;
          case '经纪人手机号':
            if(this.brokerMobile){
              if(!this._utils.isMobile(this.brokerMobile)){
                this.isErrorbrokerMobile = true
              }else{
                this.isErrorbrokerMobile = false
              }this
            }else{
              this.isErrorbrokerMobile = true;
              return
            }
            break;
          case '已抵押金额':
            if(!this.pledgeMoney){
              this.isPledgeMoney = true;
            }else if(!/\d{1,}.{0,4}/g.test(this.pledgeMoney)||this.pledgeMoney <= 0){
              this.isPledgeMoney = true;
            }else{
              this.pledgeMoney = this._utils.formatnumber(this.pledgeMoney,5)
              let a = this.pledgeMoney*1
              this.pledgeMoney = a.toFixed(4)
              this.isPledgeMoney = false
            }
            break;
        }
      },
      mustWrite () {
        if(!this.city){
          this.isCityChoose = true;
          return false
        }
        if(!this.borrowerName){
          this.isErrorBrower = true;
          return false
        }
        if(!this.identityID){
          this.isErrorIdentityID = true;
          return false
        }else{
          if(this.isErrorIdentityID){
            return false
          }
        }
        // if(!this.organizationID){
        //   return false
        // }
        if(!this.brokerMobile){
          this.isErrorbrokerMobile = true;
          return false
        }
        if(!this.brokerName){
          this.isErrorbrokerName = true;
          return false
        }
        if(!this.ownershipType){
          err(this);
          return false
        }
        if(!this.pledgeOrder){
          this.isPledgeOrder = true;
          err(this)
          return false
        }else if (this.pledgeOrder == '02'||this.pledgeOrder == '04') {
          if(!this.pledgeMoney){
            this.isPledgeMoney = true;
            err(this)
            return false
          }else if(this.pledgeMoney <= 0){
            this.isPledgeMoney = true;
            err(this)
            return false
          }
        }
        return true
      },
      submit () {
        if(!this.mustWrite()){
          this.$message({
            type:'error',
            message:'请填写完整信息'
          })
          return
        }

        $.get(this._path + "/business/userChannel",{bussNo:this.bussNo},res => {
          if (res.resultCode == "0000") {
            let path = '';
            if(res.data.busModel=='01'){
              path = '/capitalSale/capitalSaleInsertBuss'
            }else{
              path = '/consummate/insertBussSubmit'
            }
            this.$refs.changeOwnershipType.finish();
            if(this.ownershipNoBol){
              this.$message({
                type:'warning',
                message:'请填写完整房产证号码',
                duration:1500,
                showClose:1
              })
              return
            }
            this.$confirm('是否提交?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 提交信息
              var params = {
                bussNo:this.bussNo,
                custNo:this.custNo,
                custName : this.borrowerName,
                certNo : this.identityID,
                sex:this.sex,
                birthday:this.birthday,
                age:this.age,
                brokerName:this.brokerName,
                brokerMobile:this.brokerMobile,
                loanNo:this.loanNo,
                orgCode:this.organizationID,
                pledgeAmount:this.pledgeMoney,
                firstPledge:this.pledgeOrder,
                areaCode:this.city,
                areaName:this.areaName,
                custSource:'3',
                guaNo:this.guaNo,
                ownershipType : this.ownershipType,
                ownershipNo:this.ownershipNo,
              }
              let loading = this.$loading({
                lock: true,
                text: "正在加载...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.5)"
              });
              $.post(this._path + path,params,(res)=>{
                loading.close();
                if('0000' === res.resultCode){
                  this.$message({
                    type:'success',
                    message:'提交成功',
                    duration:1500,
                    showClose:true
                  })
                  this.$router.push('/addOrderList')
                }else{
                  this.$message({
                    type:'error',
                    message:res.resultMsg,
                    duration:1500,
                    showClose:true
                  })
                }

              })
            });
          } else {

          }
        });
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    },
    beforeCreate () {
      // 默认一抵
      this.pledgeOrder = '01';
      $.post(this._path + '/consummate/getBussNo',{},(res)=>{
        this.bussNo = res.data.bussNo;
        this.custNo = res.data.custNo;
        this.loanNo = res.data.loanNo;
        this.guaNo = res.data.guaNo;
      });
      $.post(this._path + '/configuration/selectConCityConfigList',(res)=>{
        this.citys = res.data.permissionVoList;
        this.city = this.citys[0].code;
      })
    },
    filters: {
      isMan: function (value) {
        if (value) {
          if (value == 1) {
            return "男"
          } else {
            return "女"
          }
        }
      }
    }
  }
</script>
