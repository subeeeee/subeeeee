<template>
  <div class="certificateDetailModal">
    <el-dialog
      title="证书管理"
      :visible.sync="certificateDetailModal.centerDialogVisible"
      width="650px"
      center
      :close-on-click-modal="false"
    >
      <el-form label-width="110px" ref="ruleForm" :model="ruleForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input v-model="ruleForm.ryxm" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-input v-model="ruleForm.xb" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出生年月：">
              <el-input v-model="ruleForm.csrq" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄：">
              <el-input v-model="ruleForm.age" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="单位及职务：">
              <el-input v-model="ruleForm.zzjgmc" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名族：">
              <el-input v-model="ruleForm.rymz" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="学历：">
              <el-input v-model="ruleForm.xl" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业：">
              <el-input v-model="ruleForm.xxzy" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="执法证编号：">
              <el-input v-model="ruleForm.zfzbh" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执法证有效期：">
              <el-input v-model="timeSpan" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="发放时间：">
              <el-input v-model="ruleForm.zsffsj" style="width: 180px" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getCertificateDetail} from '../../../../api/aptitudeManage/trainingManage/index.js';

  export default {
    name: "certificateDetailModal",
    props: {
      certificateDetailModal: Object
    },
    data() {
      let self = this;
      return {
        ruleForm: {
          ryxm: '',
          xb: '',
          csrq: '',
          age: '',
          zzjgmc: '',
          rymz: '',
          xl: '',
          xxzy: '',
          zfzbh: '',
          zfzyxksri: '',
          zfzyxjsri: '',
          zsffsj: ''
        },
        timeSpan: ''
      }
    },
    created() {
      if (this.certificateDetailModal.id) {
        this.getDetail(this.certificateDetailModal.id);
      }
    },
    methods: {
      getDetail(id) {
        let self = this,
          params = {
            rybh: id
          };
        getCertificateDetail(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          if (response && response.code === 200) {
            self.ruleForm = response.data;
            self.timeSpan = `${response.data.zfzyxksri}-${response.data.zfzyxjsri}`
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
