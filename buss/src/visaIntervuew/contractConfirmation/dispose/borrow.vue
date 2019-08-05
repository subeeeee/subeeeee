<template>
  <div>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>借款人信息</span></h3>
    </div>
    <el-tabs class="module_margin_bottom" v-model="activeBorrow" @tab-click="handleClick" type="card">
      <el-tab-pane v-for="(item, index) in borrowerList":label="item.custName" :name="item.id"></el-tab-pane>
    </el-tabs>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款人姓名</el-col>
        <el-col :span="9" class="table_td">
          {{showCustInfo.custName}}
        </el-col>
        <el-col :span="3" class="table_td">身份证号码</el-col>
        <el-col :span="9" class="table_td">
          {{showCustInfo.certNo}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">联系电话</el-col>
        <el-col :span="9" class="table_td">
          {{showCustInfo.mobile}}
        </el-col>
        <el-col :span="3" class="table_td">电子邮箱</el-col>
        <el-col :span="9" class="table_td">
          {{showCustInfo.email}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">常住地址</el-col>
        <el-col :span="21" class="table_td">
          {{showCustInfo.ownerAddress}}
        </el-col>
      </el-col>
    </el-row>
    <picModule v-for="(item, index) in borrowerList" v-show="activeBorrow === item.id"   :bussNo="$route.query.bussNo" dataType="1" taskType="218" :custId="item.releId" :details="false" class="module_margin_bottom"></picModule>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>借款信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">借款金额（万元)</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.loanAmount}}
        </el-col>
        <el-col :span="3" class="table_td">年利率（%）</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.capitalIntY}}
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">月利率（%）</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.interestRate}}
        </el-col>
        <el-col :span="3" class="table_td">借款期限（月）</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.term}}
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/task.png" class="listTitleImg"><span>放款卡信息</span></h3>
    </div>
    <el-row class="module_margin_bottom tableInfo">
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">户名</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.accName}}&emsp;
        </el-col>
        <el-col :span="3" class="table_td">账号</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.account}}&emsp;
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr">
        <el-col :span="3" class="table_td">开户行</el-col>
        <el-col :span="9" class="table_td">
          {{borrowInfo.accBank}}&emsp;
        </el-col>
      </el-col>
    </el-row>
    <div class="show_list_title">
      <h3><img src="./../../../assets/pic.png" class="listTitleImg"><span>影像</span></h3>
    </div>

    <picModule :bussNo="$route.query.bussNo" dataType="2" taskType="218" :details="false" class="module_margin_bottom"></picModule>

  </div>
</template>

<script>
  export default {
    name: "contractConfirmBorrow",
    data() {
      return {
        activeBorrow:'',
        showCustInfo:{},
        borrowInfo:{},
        borrowerList:[],
        provinceListVoList:[],
        cityListVoList:[],
        areaList:[],

      };
    },
    methods: {
      handleClick(card) {
        this.activeBorrow = card.name;
        this.borrowerList.forEach(option=>{
          if(option.id === card.name){
            this.addressFormat(option)
          }
        })

      },
      addressFormat(option){
        option.sheng = option.residentAddressCode.slice(0, 2) + '0000';
        option.shi = option.residentAddressCode.slice(0, 4) + '00';

        this.$http({
          url:'/business/queryCitysByProvinceCode',
          data:{
            provinceCode:option.sheng,
          },
          callback:res=>{
            this.cityListVoList = res.data.cityListVoList;
            this.$http({
              url:'/business/queryAllAreasByCityCode',
              data:{
                cityCode:option.shi,
              },
              callback:res=>{
                this.areaList = res.data.areaList;
                // console.log(option.sheng,this._utils.forCodeName(option.sheng,'provinceName','provinceCode',this.provinceListVoList),this.provinceListVoList)
                // console.log(option.shi,this._utils.forCodeName(option.shi,'cityName','cityCode',this.cityListVoList),this.cityListVoList)
                // console.log(option.residentAddressCode,this._utils.forCodeName(option.residentAddressCode,'areaName','areaCode',this.areaList),this.areaList)
                option.ownerAddress = this._utils.forCodeName(option.sheng,'provinceName','provinceCode',this.provinceListVoList) +
                  this._utils.forCodeName(option.shi,'cityName','cityCode',this.cityListVoList)+
                  this._utils.forCodeName(option.residentAddressCode,'areaName','areaCode',this.areaList)+
                  option.residentAddressDetail;
                // console.log(option.ownerAddress);
                // console.log(option)
                this.showCustInfo = JSON.parse(JSON.stringify(option));
              }
            })
          }
        })
      },
      queryCustInfo(){
        this.$http({
          url:'/dataCheck/selectBusCustLogListBybussNo',
          data:{
            bussNo: this.$route.query.bussNo
          },
          callback:res=>{
            this.activeBorrow = res.data.busCustLogListVo[0].id;
            this.addressFormat(res.data.busCustLogListVo[0]);
            this.borrowerList = res.data.busCustLogListVo;
          }
        })
      },
      queryborrowInfo(){
        this.$http({
          url:'/visaInterview/selectContractPreInfoByBussNo',
          data:{
            bussNo: this.$route.query.bussNo
          },
          callback:res=>{
            this.borrowInfo =  res.data.contractPreInfoVos;
            sessionStorage.setItem("loanAmount",this.borrowInfo.loanAmount);
            sessionStorage.setItem("term",this.borrowInfo.term);
            sessionStorage.setItem("accMobile",this.borrowInfo.accMobile);
            sessionStorage.setItem("accBank",this.borrowInfo.accBank);
            sessionStorage.setItem("accName",this.borrowInfo.accName);
            sessionStorage.setItem("proCode",this.borrowInfo.proCode);
            sessionStorage.setItem("account",this.borrowInfo.account);
            sessionStorage.setItem("bussNo",this.$route.query.bussNo);
          }
        })
      },
      getprovinceList(){
        this.$http({
          url:'/business/queryProvince',
          callback:res=>{
            this.provinceListVoList = res.data.provinceListVoList;
            this.queryCustInfo();
          }
        });
      }

    },
    created() {
      this.queryborrowInfo();
      this.getprovinceList();

      // 借款金额、期限、借款产品、放款卡 存sessionStorage
      // sessionStorage.setItem("key", "value");
      // var value = sessionStorage.getItem("key");
      //  sessionStorage.clear();
    },
  };
</script>
