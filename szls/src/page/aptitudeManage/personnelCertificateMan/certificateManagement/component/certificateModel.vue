<template>
  <div class="trainingModal">
    <el-dialog
      title="执法延续申请"
      :visible.sync="certificateModel.dialogVisible"
      width="800px"
      center
      :close-on-click-modal="false"
    >
      <el-form :label-width="labelwidthStyle">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input v-model="formData.ryxm" disabled="disabled" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <!-- <el-select v-model="formData.xb" disabled="disabled" placeholder="请选择" clearable>
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <el-input placeholder="请填写性别" disabled="disabled" v-model="formData.xb"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出生年月：">
              <!-- <el-date-picker
                type="date"
                v-model="formData.csrq"
                disabled="disabled"
                placeholder="年/月/日"
                clearable
              ></el-date-picker>-->
              <el-input placeholder="请填写出生年月" disabled="disabled" v-model="formData.csrq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄：">
              <el-input placeholder="根据出生日期自动计算" disabled="disabled" v-model="formData.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="单位及职务：">
              <el-input placeholder="请填写单位" disabled="disabled" v-model="formData.zzjgmc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="民族：">
              <!-- <el-select placeholder="请选择" disabled="disabled" v-model="formData.rymz" clearable>
                <el-option
                  v-for="item in educationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <el-input placeholder="请填写民族" disabled="disabled" v-model="formData.rymz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="学历：">
              <!-- <el-select placeholder="请选择学历" disabled="disabled" v-model="formData.xl" clearable>
                <el-option
                  v-for="item in educationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <el-input placeholder="请填写学历" disabled="disabled" v-model="formData.xl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业：">
              <!-- <el-select placeholder="请选择" disabled="disabled" v-model="formData.xxzy" clearable>
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>-->
              <el-input placeholder="请填写专业" disabled="disabled" v-model="formData.xxzy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="执法证编号：">
              <el-input v-model="formData.zfzbh" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="执法证有效期：">
              <el-date-picker
                type="date"
                v-model="formData.zfzyxksri"
                placeholder="选择日期"
                style="width: 180px"
                clearable
              ></el-date-picker>&nbsp;-
              <el-date-picker
                type="date"
                v-model="formData.zfzyxjsri"
                placeholder="选择日期"
                style="width: 180px"
                clearable
              ></el-date-picker>
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
import {} from "../../../../../api/aptitudeManage/personnelCertificateMan/index";
import { getCertificateDetail } from "../../../../../api/aptitudeManage/trainingManage/index.js";
export default {
  props: {
    certificateModel: Object
  },
  components: {},
  data() {
    return {
      labelwidthStyle: "120px",
      // genderOptions: [
      //   {
      //     label: "男",
      //     value: "1"
      //   },
      //   {
      //     label: "女",
      //     value: "2"
      //   }
      // ],
      // educationOptions: [
      //   {
      //     label: "高中及以下",
      //     value: "1"
      //   },
      //   {
      //     label: "专科",
      //     value: "2"
      //   },
      //   {
      //     label: "本科",
      //     value: "3"
      //   },
      //   {
      //     label: "硕士",
      //     value: "4"
      //   },
      //   {
      //     label: "博士",
      //     value: "5"
      //   }
      // ],
      formData: {
        ryxm: "", // 姓名
        xb: "", //性别
        csrq: "", //出生年月
        age: "", //年龄
        zzjgmc: "", //单位及职务
        rymz: "", //名族
        xl: "", //学历
        xxzy: "", //专业
        zfzbh: "", //执法证编号
        zfzyxksri: "", //执法证有效期开始时间
        zfzyxjsri: "" //执法证有效期结束时间
      }
    };
  },
  created() {
    if (this.certificateModel.id) {
      this.getDetail(this.certificateModel.id);
    }
  },
  methods: {
    save(type) {
      // console.log(this.formData);
      this.certificateModel.dialogVisible = false;
    },
    getDetail(id) {
      let self = this,
        params = {
          rybh: id
        };
      getCertificateDetail(params)
        .then(actionMethod)
        .catch(actionMethod);
      function actionMethod(response) {
        if (response && response.infoCode === 200) {
          console.log(response.data)
          self.formData = response.data;
          // self.timeSpan = `${response.data.zfzyxksri}-${response.data.zfzyxjsri}`;
        }
      }
    }
  }
};
</script>

<style scoped="scoped">
</style>
