<template>
  <div class="borrowLink firstOpinion">
    <!-- 有利于贷款审批的额外信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/message.png" class="listTitleImg"><span>有利于贷款审批的额外信息</span></h3>
    </div>
    <el-col :span="24">
    </el-col>&emsp;
    <picModule :bussNo="$route.query.bussNo" dataType="5" taskType="136" class="module_margin_bottom"/>
    <!--  其他强调或补充信息 -->
    <div class="show_list_title">
      <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 其他强调或补充信息</span></h3>
    </div>
    <el-row class=" module_margin_bottom tableInfo">

      <el-col :span="24" class="table_tr">
        <el-col :span="24" class="table_tr textarea_module">
          <el-col :span="3" class="table_td textarea_title">其他强调或补充信息</el-col>
          <el-col :span="21" class="textareawrap">
            <div class="textarea"><textarea  :rows="10" @blur="promiseFn" v-model="supplement" placeholder="请输入内容，最多1000字。" maxlength="1000"></textarea></div>
          </el-col>
        </el-col>
      </el-col>
      <el-col :span="24" class="table_tr promise">
        <el-col :span="22" :offset="1">
          <el-checkbox v-model="promise"></el-checkbox>
          本人承诺 : 家访调查流程已按照公司规定，遵循“诚实守信，尽职尽责”原则完成，如存在协助借款人欺瞒公司，导致贷款审批决策失误造成的相关损失，本人愿意承担一切责任。
        </el-col>
      </el-col>
    </el-row>
    <el-col :span="24">
      <el-col :span="2" :offset="10">
        <el-button size="small" class="saveBtn" @click="btnClick('save')">保存</el-button>
      </el-col>
      <el-col :span="2">
        <el-button size="small" class="saveBtn" type="primary" @click="btnClick('submit')">提交</el-button>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import "./../../style/borrowLink.css";
  export default {
    name: "borrowLink",
    data() {
      return {
        picTypes: [],
        promise: false,
        supplement: "",
        isFullCust: '',
        isFullGua: '',
      };
    },
    methods: {
      promiseFn(){
        if(/\s+/g.test(this.promise)){
          this.$message({
            type: "error",
            message: "不可输入空格",
            duration: 1500,
            showClose: true
          })
        }
      },
      btnClick(type,fn,str) {
        let msg = ''
        if (type == "submit") {
          msg = '提交成功'
        }else if(type == "save"){
          msg = '保存成功'
        }
        let params = {
          promise: this.promise ? "1" : "0",
          supplement: this.supplement,
          isSaveOrSubmit: type,
          bussNo: this.$route.query.bussNo,
          isFullCust: this.isFullCust,
          isFullLoan: this.isFullLoan,
          isFullGua: this.isFullGua,
          isFullSurvey: "1"
        };
        if (type == "submit") {
          if ( params.isFullLoan == '0' || params.isFullGua != "11"||params.isFullCust == '0') {
            this.$message({
              type: "error",
              message: "请完成选项卡有小红点下的必填项",
              duration: 1500,
              showClose: true
            })
            return
          }
          if(!this.promise){
            this.$message({
              type: 'info',
              message: '请确认勾选本人承诺',
              duration:1500,
              showClose:true
            });
            return
          }
          if(/\s+/g.test(this.addInfo)){
            this.$message({
              type: "error",
              message: "不可输入空格",
              duration: 1500,
              showClose: true
            })
            return
          }
        }
        if(type == 'save') {
          let loading = this.$loading({
            lock: true,
            text: "正在加载...",
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.5)"
          });
          $.post(this._path + "/dataReturn/insertReturnSaveOrSubmit", params, res => {
            loading.close();
            if (res.resultCode == "0000") {
              this.$message({
                type: "success",
                message: msg,
                duration: 1500,
                showClose: true
              });
              if(!!fn && !!str){
                fn(str)
              }
            } else {
              this.$message({
                type: "error",
                message: res.resultMsg,
                duration: 1500,
                showClose: true
              });
            }
          })
        }
        if(type == 'submit'){
          this.$confirm('是否提交到资料核查?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let loading = this.$loading({
              lock: true,
              text: "正在加载...",
              spinner: "el-icon-loading",
              background: "rgba(255, 255, 255, 0.5)"
            });
            $.post(this._path + "/dataReturn/insertReturnSaveOrSubmit", params, res => {
              loading.close();
              if (res.resultCode == "0000") {
                this.$message({
                  type: "success",
                  message: msg,
                  duration: 1500,
                  showClose: true
                });
                this.$router.push('/infoPassHaulList')


              } else {
                this.$message({
                  type: "error",
                  message: res.resultMsg,
                  duration: 1500,
                  showClose: true
                });
              }
            })
          })
        }

      },
    },
    beforeCreate() {
      window.bus.$on('/infoPassHaul/borrowLink',(fn,str) => {
        this.btnClick('save',fn,str);
      });
      $.post(
        this._path + "/dataReturn/queryBusDataReturnByBussNo",
        { bussNo: this.$route.query.bussNo },
        res => {
          if(res.data.busDataVo.promise){
            this.promise = res.data.busDataVo.promise == "1" ? true : false;
          }else{
            this.promise = true
          }
          this.supplement = res.data.busDataVo.supplement;
          this.isFullCust = res.data.busDataVo.isFullCust;
          this.isFullGua = res.data.busDataVo.isFullGua;
          this.isFullLoan = res.data.busDataVo.isFullLoan;

          !this.isFullGua ? this.isFullGua = '00' : this.isFullGua = this.isFullGua
          !this.isFullCust ? this.isFullCust = '0' : this.isFullCust = this.isFullCust

          window.bus.isFullCust = this.isFullCust
          window.bus.isFullGua = this.isFullGua
        }
      )
    },
    beforeDestroy () {
      window.bus.$off('/infoPassHaul/borrowLink');
    }
  };

</script>
