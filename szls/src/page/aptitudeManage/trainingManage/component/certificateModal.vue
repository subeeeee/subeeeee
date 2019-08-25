<template>
  <div class="certificateModal">
    <el-dialog
      title="执法人员证书发放"
      :visible.sync="certificateModal.centerDialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-form label-width="100px" ref="ruleForm">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="证书编号：">
              <el-input  v-model="certificateModal.id" placeholder="请输入证书编号" style="width: 180px" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="有效期：">
              <el-date-picker type="date" v-model="startTime" value-format="yyyy-MM-dd" placeholder="选择日期"
                              style="width: 180px"></el-date-picker>
              <el-date-picker type="date" v-model="endTime" value-format="yyyy-MM-dd" placeholder="选择日期"
                              style="width: 180px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="certificateModal.centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {updateCertificate} from '../../../../api/aptitudeManage/trainingManage/index.js';

  export default {
    name: "certificateModal",
    props: {
      certificateModal: {
        type: Object,
        default: {
          centerDialogVisible: false
        }
      }
    },
    data() {
      return {
        startTime: '',
        endTime: ''
      }
    },
    created() {

    },
    methods: {
      btnSave() {
        this.update();
      },
      update() {
        let self = this,
          params = {
            zfzbh: self.certificateModal.id,
            zfzyxjsri: self.startTime,
            zfzyxksri: self.endTime
          };
        updateCertificate(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          self.certificateModal.centerDialogVisible = false;
          if (response && response.infoCode === 200) {
            self.$message.success('操作成功');
            self.$emit('handleCallBack');
          } else {
            self.$message.error(response.msg);
          }
        }
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
