<template>
  <div>
    <el-dialog title="发送邮件" :visible.sync="onOrOff"   custom-class="custom_class_550" :close-on-click-modal="false">
      <el-row style="margin: 0 auto;width:90%;line-height:1.1">
        <el-col :span="24" v-for="(emailObj,index) in emailList" style="margin-bottom: 10px">
          <el-col :span="2"><el-checkbox v-model="emailObj.isChecked"></el-checkbox></el-col>
          <el-col :span="9">{{emailObj.name }}&nbsp;</el-col>
          <el-col :span="9"><el-input class="input_width_95" size="small" v-model="emailObj.email"></el-input></el-col>
          <el-col :span="4" style="text-align: center">
            <el-button size="small" v-if="index === 0" @click="addEmail">新增邮箱</el-button>
            <el-button size="small" v-else @click="delEmail(index)">删 除</el-button>
          </el-col>

        </el-col>
      </el-row>
      <p class="emailHint"><i class="importent">提示</i>:<br>1、请确认批贷的产品信息无误后，再点击“确认发送”按钮；<br>2、点击“确认发送”后，请稍后前往“详情”页面查看邮件发送结果</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onOrOff = false">取 消</el-button>
        <el-button type="primary" @click="send()">确定发送</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "send-email",
    props:{
      orgName:String,
      orgCode:String
    },
    data () {
      return {
        onOrOff:false,
        ccListString:[],
        emailList:[
          {isChecked:false,name:"",email:""}
        ]
      }
    },
    methods :{
      addEmail(){
        this.emailList.push({isChecked:false,name:"",email:""})
      },
      delEmail(index){
        this.emailList.splice(index, 1)
      },
      showBox () {
        this.onOrOff = true
      },
      send () {
        let emailList = [];
        for(let i= 0,j = this.emailList.length;i < j ;i++){
          if(this.emailList[i].isChecked){
            if(!this.emailList[i].email){
              this.$message.warning(`请填写${this.emailList[i].name}邮箱!`);
              return
            }
            if(!this._utils.isEmail(this.emailList[i].email)){
              this.$message.warning(`请检查${this.emailList[i].name}邮箱格式!`);
              return
            }

            emailList.push(this.emailList[i].email);
          }

        }
        if(emailList.length < 1){
          this.$message.success('请至少选择一个邮箱发送邮件！')
          return
        }
        this.saveInLocal();

        this.$emit('request',{emailList,ccListString:this.ccListString});
        this.onOrOff = false
      },
      saveInLocal(){
        let saveEmailList = [];
        for(let i= 0,j = this.emailList.length;i< j;i++){
          if(this.emailList[i].isChecked){
            saveEmailList.push(this.emailList[i]);
            if(saveEmailList.length >= 5){
              break;
            }
          }
        }
        let localEmail = JSON.parse(localStorage.getItem('localEmail'));
        console.log(localEmail);
        if(localEmail === null ){
          localEmail = {}
        }
        localEmail[this.orgCode] = saveEmailList;
        localStorage.setItem('localEmail',JSON.stringify(localEmail));
      },
      queryCcListString () {
        $.post(this._path +'/appParController/selectAppparByType',{parType:'PIDAN-CC'},res=>{
          if(res.resultCode === '0000'){
            this.ccListString = res.data.appparVoList
          }else{
            this.requestError(res,this)
          }
        })
      },
      queryOrgEmail(list) {
        if(list){
          this.emailList =list
        }else{
          this.emailList =[]
        }

        this.$http({
          url:'/business/queryOrg',
          data:{
            orgCode:this.orgCode
          },
          callback:res=>{
            this.$set(this.emailList,0,{isChecked:false,name:this.orgName + "批贷邮件接收邮箱",email:res.data.rerChannelOrg.loanEmail})

            // this.emailList[0] = {isChecked:false,name:this.orgName + "批贷邮件接收邮箱",email:res.data.rerChannelOrg.loanEmail};
          }
        })
      }
    },
    created() {
      //抄送邮箱
      // this.queryCcListString();
      let localEmail = JSON.parse(localStorage.getItem('localEmail'));
      console.log(localEmail);
      let emailFlag = true;
      if(localEmail === null){

      }
      else{
        console.log(localEmail,1);
        for(var key in localEmail){
          if(key === this.orgCode){
            if(localEmail[key].length) {
              this.queryOrgEmail(localEmail[key]);
              emailFlag = !emailFlag
            }else{
              this.queryOrgEmail()
            }
          }
        }
      }
      if(emailFlag){
        this.queryOrgEmail()
      }
    }
  }
</script>

<style scoped>

</style>
