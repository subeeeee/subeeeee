<template>
  <div class="checkIndicatorDetail">
    <el-dialog title="指标详情" :visible.sync="checkIndicatorDetailModal.centerDialogVisible" width="800px"
               center>
      <el-form label-width="120px" :model="ruleForm" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="指标项内容:" prop="name">
              <el-input class="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据类型:" prop="name">
              <el-input class="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="关联字典:">
              <el-input class="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指标范围:">
              <el-input class="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="业务类型:">
              <el-input class="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="提交人:">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交时间:">
              <el-date-picker></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnSave">保 存</el-button>
        <el-button @click="btnCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "checkIndicatorDetail",
    props: {
      checkIndicatorDetailModal: Object
    },
    data() {
      return {
        ruleForm: {
          resource: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      btnSave() {

      },
      btnCancel() {
        this.checkIndicatorDetailModal.centerDialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .inputStyle {
    width: 95%;
  }
</style>
