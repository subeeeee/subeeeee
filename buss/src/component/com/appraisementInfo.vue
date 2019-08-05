<template>
    <div >
      <!--v-if="area=='110100'"-->
      <div >
        <!--<el-row class=" module_margin_bottom wz_table_border doNotChange">
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="6" class="borrowerInfTd">世联评估单价(万元/m²)</el-col>
            <el-col :span="18" class="borrowerInfTd">{{sLprice}}</el-col>
          </el-col>
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="6" class="borrowerInfTd">房估估评估单价(万元/m²)</el-col>
            <el-col :span="18" class="borrowerInfTd">{{fggPrice}}</el-col>
          </el-col>
        </el-row>-->
        <el-row class=" module_margin_bottom wz_table_border doNotChange">
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="4" class="borrowerInfTd">初评单价(万元/m²)</el-col>
            <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.assessUnitPrice}}</el-col>
            <el-col :span="3" class="borrowerInfTd">初评总价(万元)</el-col>
            <el-col :span="9" class="borrowerInfTd">{{assessInfoVo.assessTotalPrice}}</el-col>
          </el-col>
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="3" class="borrowerInfTd">抵押顺位</el-col>
            <el-col :span="9" class="borrowerInfTd">{{assessGuaInfoVo.firstPledge | pledgeFilter}}</el-col>
            <el-col :span="3" class="borrowerInfTd" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">已抵押金额(万元)</el-col>
            <el-col :span="9" class="borrowerInfTd" v-if="assessGuaInfoVo.firstPledge == '02'|| assessGuaInfoVo.firstPledge == '04'">{{assessGuaInfoVo.pledgeAmount}}</el-col>
          </el-col>
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="3" class="borrowerInfTd">初评抵押率(%)</el-col>
            <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.mortgageRate}}</el-col>
            <el-col :span="5" class="borrowerInfTd">最大综合可贷款额(万元)</el-col>
            <el-col :span="8" class="borrowerInfTd">{{assessInfoVo.maxLoanAmount}}</el-col>
          </el-col>
        </el-row>
      </div>
      <!--<div v-if="area == '340100'">
        <el-row class=" module_margin_bottom wz_table_border doNotChange">
          <el-col :span="24" class="borrowerInfTr">
            <el-col :span="6" class="borrowerInfTd">房产价值(万元)</el-col>
            <el-col :span="18" class="borrowerInfTd">{{housePrice}}</el-col>
          </el-col>
        </el-row>
      </div>-->
    </div>
</template>

<script>
    export default {
        name: "appraisement-info.vue",
        data(){
          return {
            assessGuaInfoVo:{},
            assessInfoVo:{},
            sLprice:'',
            fggPrice:'',
            areaCode:'',
            housePrice:'',
          }
        },
      props:{
        srcData:Object,
        area:String
      },

      methods(){

      },
      created(){
          this.assessInfoVo = JSON.parse(JSON.stringify(this.srcData.assessInfoVo));
          this.assessGuaInfoVo = JSON.parse(JSON.stringify(this.srcData.assessGuaInfoVo));
          if(this.srcData.fggPrice){
            if(this.srcData.is98){
              this.fggPrice =this.srcData.fggPrice
            }else{
              this.fggPrice = (this.srcData.fggPrice*0.98 + '').substring(0,(this.srcData.fggPrice*0.98+ '').lastIndexOf('.')+7);
            }
          }
          this.sLprice = this.srcData.sLprice;
          this.areaCode = this.srcData.areaCode;
          this.housePrice = this.srcData.housePrice;
      }
    }
</script>

<style scoped>

</style>
