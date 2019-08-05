<template>
  <div>
    <el-col :span="24" class="table_tr border" v-if="ownerBol&&disabled">
      <el-col :span="3" class="table_td">房屋所有权人</el-col>
      <el-col :span="9" class="table_td">
          {{this.ownerBol}}
      </el-col>
    </el-col>

    <el-col :span="24" class="table_tr border" v-if="!ownerBol">
      <el-col :span="3" class="table_td">共有持证类型<i class="importent">*</i></el-col>
      <el-col :span="9" class="table_td">
        <el-col :span="14" :offset="1">
          <el-select class="select_width" v-model="ownerType" @change="verify('ownerType')" placeholder="请选择" size="small" :disabled="disabled">
            <el-option :label="'共持一证'" :value="'01'"> </el-option>
            <el-option :label="'分别持证'" :value="'02'"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="9" class="error_title" v-show="errorShow.ownerType">请完善信息！</el-col>
      </el-col>
      <el-col :span="3" class="table_td">共有类型<i class="importent">*</i></el-col>
      <el-col :span="9" class="table_td" style="border:none">
        <el-col :span="14">
          <el-radio-group v-model="commonType" @change="verify('commonType')" :disabled="disabled">
            <el-radio label="01">共同共有</el-radio>
            <el-radio label="02">按份共有</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="9" class="error_title" v-show="errorShow.commonType">请完善信息！</el-col>
      </el-col>
    </el-col>


    <!--房屋所有权情况-->
    <div v-for="(item,i) in owerList" v-if="ownerType ==='01'">
      <el-col :span="24" class="table_tr border " >
        <el-col :span="3" class="table_td">房屋所有权人</el-col>
        <el-col :span="9" class="table_td">{{item.owenName}}</el-col>
        <el-col :span="3" class="table_td"  v-if="commonType ==='02'">共有比例(%)<i class="importent">*</i> </el-col>
        <el-col :span="9" class="table_td"  v-if="commonType ==='02'">
          <el-col :span="14" :offset="1">
            <el-input size="small" v-model="item.scale" :maxlength="5" @blur="verifyAll(i,item.scale)" @keyup.native="rate(i)" :disabled="disabled" v-if="(i+1) != owerList.length "></el-input>
            <el-input size="small" v-model="item.scale" :maxlength="5"  disabled v-if="(i+1) == owerList.length "></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-if="item.scaleBol&&(i+1) != owerList.length" >共有比例之和应为100%</el-col>
        </el-col>
      </el-col>
    </div>

    <div v-for="(item,i) in owerList"  v-if="ownerType ==='02'" >
      <el-col :span="24" class="table_tr " >
        <el-col :span="3" class="table_td">房屋所有权人</el-col>
        <el-col :span="21" class="table_td">{{item.owenName}}</el-col>
      </el-col>

      <el-col class="table_tr border" :span="24">
        <el-col class="table_td" :span="3">房产证号/共有证号<i class="importent">*</i></el-col>
        <el-col class="table_td" :span="9">
          <el-col :offset='1' :span="14">
            <el-select v-model="item.ownershipType" placeholder="请选择" class="select_width"  size='small' @change="ownershipTypeChange(i)" :disabled="disabled">
              <el-option v-for="item in ownershipList" :label="item.ownershipType" :value="item.ownershipCode"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" class="error_title" v-if="item.ownershipNoBol">请完善信息！</el-col>
        </el-col>
        <el-col class="table_td" :span="3" v-if="disabled">房产证号</el-col>
        <el-col class="table_td" :span="9" v-if="disabled">{{item.ownership}}</el-col>
      </el-col>
      <el-col class="table_tr border" :span="24" v-show="!disabled" v-if="ownershipBol&&owerBol" >
        <el-col class="table_td " style="text-align: center">
          <ownership-no v-if="!disabled" :ownershipList="ownershipList" :ownershipNo="item.ownership" :ownershipType="item.ownershipType" ref="changeOwnershipType" :index="i" @finish="finish($event,i)" ></ownership-no>
        </el-col>
      </el-col>
      <el-col class="table_tr border" v-if="commonType ==='02'" :span="24" >
        <el-col :span="3" class="table_td"  >共有比例(%)<i class="importent">*</i> </el-col>
        <el-col :span="9" class="table_td" >
          <el-col :span="14" :offset="1">
            <el-input :disabled="disabled" size="small" @blur="verifyAll(i,item.scale)" v-model="item.scale" :maxlength="5" @keyup.native="rate(i)" v-if="(i+1) != owerList.length "></el-input>
            <el-input size="small" v-model="item.scale" :maxlength="5"  disabled v-if="(i+1) == owerList.length "></el-input>
          </el-col>
          <el-col :span="9" class="error_title" v-if="item.scaleBol&&(i+1) != owerList.length">共有比例之和应为100%</el-col>
        </el-col>
      </el-col>
    </div>


  </div>
</template>
<script>

  import ownershipNo from './ownershipNo';
  export default {
    name: "mutual-cert",
    components:{
      ownershipNo
    },
    props:{
      taskName:{
        type:String,
        default:'dataCheck'
      },
      disabled:{
        type:Boolean,
        default:false
      },
      isType:String
    },
    data(){
      return{
        ownerBol:"",
        ownerType:'',
        commonType:'',
        ownershipBol:false,
        owerBol:false,

        owerList:[],
        propertyList:[],
        ownershipList:[],
        errorShow:{
          ownerType:false,
          commonType:false,
        }
      }
    },
    methods:{
      bolAll(){
        let bol  = false;
        if(this.errorShow.ownerType){bol  = true}
        if(this.errorShow.commonType){bol  = true}
        if(this.ownerType == '01'&&this.commonType == '02'){
          let num = 0;
          let bolScale = false;
          for(let i = 0,length = this.owerList.length;i<length;i++){
            if((i+1) != length){

            }
            num += this.owerList[i].scale/1;
            if(this.owerList[i].scale == '0'){
              bolScale = true
            }
            if(this.owerList[i].scaleBol){
              bol  = true;
            }
          }
          if(num !== 100){
            bol  = true;
            this.$message.error('共有比例和值应为100')
          }
          if(bolScale){
            bol  = true;
            this.$message.error('共有比例值不可为0')
          }
        }else if(this.ownerType == '02'){
          let num = 0;
          let bolScale = false;
          for(let i = 0,length = this.owerList.length;i<length;i++){
            if(this.owerList[i].ownershipNoBol){
              bol  = true;
            }
            if(this.commonType == '02'){
              num += this.owerList[i].scale/1;
              if(this.owerList[i].scaleBol){
                bol  = true;
              }
              if(this.owerList[i].scale == '0'){
                bolScale = true
              }
            }
          }
          if(this.commonType == '02'){
            if(bolScale){
              bol  = true;
              this.$message.error('共有比例值不可为0')
            }
            if(num !== 100){
              bol  = true;
              this.$message.error('共有比例和值应为100')
            }
          }
        }
        return bol
      },
      verifyAll(index,val){
        if(val){
          let num = 0;
          for(let i = 0,length = this.owerList.length;i<length;i++){
            if(i != length-1){
              num += this.owerList[i].scale/1
            }
          }
          if(num>100||num<=0){
            this.owerList[index].scaleBol = true
          }else{
            this.owerList[index].scaleBol = false;
            this.owerList[this.owerList.length -1].scale = this._utils.subtraction(100,(num*1))
            if(this.owerList[this.owerList.length -1].scale  == '0'){
              this.owerList[index].scaleBol = true
            }
          }
        }
      },
      verify(str){
        !this[str]?this.errorShow[str] = true:this.errorShow[str] = false
      },
      rate(i,name){
        if(i > -1){
          this.owerList[i].scale = this._utils.sixNum2(this.owerList[i].scale)
        }else{
          this[i][name] = this[i][name].replace(/\D/g,'')
        }
      },
      finish(obj,i){
        this.owerList[i].ownershipNo = obj.ownershipNo;
        this.owerList[i].ownershipNoBol = obj.ownershipNoBol
      },
      emitFinish(){
        !this.ownerType?this.errorShow.ownerType = true:this.errorShow.ownerType = false;
        !this.commonType?this.errorShow.commonType = true:this.errorShow.commonType = false;
        if(this.ownerType === '01'){
        }else if(this.ownerType === '02'){
          this.propertyList = [];
          for(let i = 0;i < this.owerList.length;i++){
            !this.owerList[i].ownershipType?this.owerList[i].ownershipNoBol = true:this.owerList[i].ownershipNoBol = false;
            this.$refs.changeOwnershipType[i].finish();
            !this.owerList[i].ownershipType?this.owerList[i].ownershipNoBol = true:'';
          }
        }
        for(let i = 0;i < this.owerList.length;i++){
          this.owerList[i].ownerType = this.ownerType;
          this.owerList[i].commonType = this.commonType;
          this.owerList[i].ownership = this.owerList[i].ownershipNo;
          if(this.commonType == '02'){
            !this.owerList[i].scale?this.owerList[i].scaleBol = true:this.owerList[i].scaleBol = false
          }
        }
        this.$emit('finish',{
          owerListString: this.owerList,
          bol:this.bolAll()
        });
      },
      queryOwnerList(){

        let url = `/${this.taskName}/selectBusHouseOwnershipLogBybussNo`;
        this.$http({
          url,
          data:{bussNo:this.$route.query.bussNo},
          callback:res=>{
            for(let i = 0;i < res.data.voList.length;i++){
              res.data.voList[i].ownershipNoBol = false;
              res.data.voList[i].ownershipBol = true;
              res.data.voList[i].scaleBol = false;
              if(res.data.voList[i].scale === '0'){
                res.data.voList[i].scale = ''
              }
            }
            this.owerList = res.data.voList;
            if(res.data.voList){
              this.ownerBol = res.data.voList.length === 1?res.data.voList[0].owenName:''
            }
            this.commonType = !res.data.commonType?'':res.data.commonType;
            this.ownerType = !res.data.ownerType?'':res.data.ownerType;
            this.owerBol = true
          }
        })
      },
      ownershipTypeChange (i) {
        if(!this.owerList[i].ownershipType){
          this.owerList[i].ownershipNoBol = true
        }else{
          this.owerList[i].ownershipNoBol = false
        }
        this.$refs.changeOwnershipType[i].initOwnershipNo(this.owerList[i].ownershipType);
      },
      queryOwnershipCity(){
        this.$http({
          url:'/configuration/selectHouseOwnershipConf',
          data:{cityCode:this.$route.query.areaCode},
          callback:res=>{
            this.ownershipList = res.data.houseOwnershipDTOList;
            this.ownershipBol = true
          }
        })
      }
    },
    created(){
      this.queryOwnerList();
      this.queryOwnershipCity();
    }
  }
</script>

<style scoped>
  .border{
    border-bottom:1px solid #BAC4CF !important;
  }
</style>
