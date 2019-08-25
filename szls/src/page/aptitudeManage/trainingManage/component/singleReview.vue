<template>
  <div class="singleReview">
    <el-dialog
      title="执法人员资质审核"
      :visible.sync="singleReviewModal.centerDialogVisible"
      width="600px"
      center
      :close-on-click-modal="false">
      <el-row :gutter="10">
        <el-col :span="20">
          <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="审核说明：" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnSubmit">确定</el-button>
        <el-button @click="singleReviewModal.centerDialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "singleReview",
    props: {
      singleReviewModal: Object
    },
    data() {
      return {
        ruleForm: {
          remark: ''
        },
        rules: {
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      btnSubmit() {
        let self = this;
        self.$refs['ruleForm'].validate((valid) => {
          if (valid) {

          }
        });
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
