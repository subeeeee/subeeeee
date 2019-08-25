<template>
  <div class="checkModal">
    <el-dialog
      title="执法人员资质审核"
      :visible.sync="checkInfoModal.centerDialogVisible"
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
      <div v-if="checkInfoModal.type==1" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnSubmit(1)">同 意</el-button>
        <el-button @click="btnSubmit(0)">驳 回</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnSubmit">确 定</el-button>
        <el-button @click="checkInfoModal.centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {batchReview} from '../../../../api/aptitudeManage/trainingManage/index.js';

  export default {
    props: {
      checkInfoModal: {
        type: Object,
        default: {
          centerDialogVisible: false,
          type: 1, //1.批量审批 2.单个审批
          ids: [],
        }
      }
    },
    name: "checkModal",
    components: {},
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
      };
    },
    created() {
    },
    methods: {
      //审批
      reviewInfo(params) {
        let self = this;
        batchReview(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          self.checkInfoModal.centerDialogVisible = false;
          if (response && response.infoCode === 200) {
            self.$message.success('操作成功');
          } else {
            self.$message.error(response.msg);
          }
          self.$emit('handleCallBack')
        }
      },
      btnSubmit(type) {
        let self = this;
        let params = {
          lcids: self.checkInfoModal.ids,
          message: self.ruleForm.remark,
          status: type
        };
        if (!type)
          self.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              self.reviewInfo(params);
            }
          });
        else
          self.reviewInfo(params);
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  };
</script>

<style scoped="scoped">
</style>
