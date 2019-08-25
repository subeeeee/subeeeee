<template>
  <div class="trainingModal">
    <el-dialog
      title="批准单位意见"
      :visible.sync="auditModel.dialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-form :label-width="labelwidthStyle">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="姓名：">
              <el-input placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="批准意见：">
              <el-radio v-model="radio" label="1">同意</el-radio>
              <el-radio v-model="radio" label="2">不同意</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="批准说明">
              <el-input placeholder="请输入批准说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="批准时间：">
              <el-input placeholder="自动记录提交时的系统时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save(1)">保 存</el-button>
        <el-button type="primary" @click="save(2)">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {} from "../../../../../api/aptitudeManage/personnelCertificateMan/index"
export default {
  props: {
    auditModel: Object
  },
  components: {},
  data() {
    return {
      radio: "1",
      labelwidthStyle: "120px",
      genderOptions: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "2"
        }
      ],
      dataaaa: ""
    };
  },
  created() {},
  methods: {
      save(){
          this.auditModel.dialogVisible = false;
      }
  },
};
</script>

<style scoped="scoped">

</style>
