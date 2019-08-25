<template>
  <div class="applyModal">
    <el-dialog title="执法人员资质申请" :visible.sync="applyInfoModal.centerDialogVisible" width="800px" center
               :close-on-click-modal="false" @close="closeCallBack">
      <el-form :label-width="labelwidthStyle">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="申请单位：">
              <span>{{getOrgName()}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期：">
              <el-date-picker v-model="detailInfo.sqrq" type="date" placeholder="选择日期"
                              :disabled="isEdit" style="width: 250px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-select v-model="value" clearable placeholder="请选择" style="width: 250px" @change="userChange">
                <el-option
                  v-for="item in options"
                  :key="item.rybh"
                  :label="item.ryxm"
                  :value="item.rybh"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-input v-model="detailInfo.xb" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="民族：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期：">
              <el-input v-model="detailInfo.csrq" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="年龄：">
              <el-input v-model="detailInfo.nl" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位及职务：">
              <el-input v-model="detailInfo.dwjzw" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="学历：">
              <el-input v-model="detailInfo.xl" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业：">
              <el-input v-model="detailInfo.xxzy" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="是否为新申请：">
              <el-input v-model="detailInfo.sfxsq" placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input v-model="detailInfo.remark" placeholder="请输入内容" clearable :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件：">
          <el-upload class="avatar-uploader"
                     list-type="picture-card"
                     :action="actionUrl"
                     accept=".jpg,.png,.JPG"
                     :on-success="handleSuccess"
                     :on-error="handleError"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :limit="1"
                     :disabled="dialogImageUrl?true:false">
            <el-button size="small" type="primary" :disabled="dialogImageUrl?true:false">上传照片
            </el-button>
            <div slot="tip" class="el-upload__tip">照片大小：高清照片大小5M格式：jpg png</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div v-if="!applyInfoModal.type" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="btnSave(0)">保 存</el-button>
        <el-button type="primary" @click="btnSave(1)">提 交</el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible" append-to-body title="图片预览" center>
        <img width="100%" :src="getFileAddress(dialogImageUrl)" alt="">
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>
  import {
    addApplyInfo,
    updateApplyInfo,
    getApplyInfo,
    getUserList
  } from '../../../../api/aptitudeManage/trainingManage/index.js';
  import {fileApi, fileDownload} from '@/api/index.build'

  export default {
    props: {
      applyInfoModal: Object
    },
    name: "applyModal",
    data() {
      return {
        iptDisabled: true,
        isEdit: false,
        labelwidthStyle: "120px",
        centerDialogVisible: false,
        /** 搜索查询*/
        options: [],
        value: [],
        list: [],
        loading: false,
        states: [],
        detailInfo: {
          sqrq: '',//申请日期
          ryxm: '',//姓名
          xb: '',//性别
          rymz: '',//民族
          csrq: '',//出生日期
          nl: '',//年龄
          dwjzw: '',//单位及职务
          xl: '',//学历
          xxzy: '',//专业
          sfxsq: '',//是否新申请
          remark: '',//备注
          photo: '',//照片
          rybh: '',//人员编号
          status: '',//0.保存 1.提交
        },
        actionUrl: fileApi + '/file/upload',
        dialogVisible: false,
        dialogImageUrl: ''
      };
    },
    components: {},
    created() {
      this.getUser();
      //type 1.预览
      if (this.applyInfoModal.type) {
        this.isEdit = true;
      } else {
        this.isEdit = false;
      }
      if (this.applyInfoModal.id)
        this.getDetailInfo(this.applyInfoModal.id);
    },
    mounted() {
      this.list = this.states.map(item => {
        return {value: item, label: item};
      });
    },
    methods: {
      getOrgName: function () {
        return sessionStorage.getItem('orgName') || '123';
      },
      //新增保存资质申请
      saveInfo() {
        let self = this,
          params = self.detailInfo;

        addApplyInfo(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          self.closeCallBack();
          switch (response && response.infoCode) {
            case 200:
              break;
            default:
              self.$message.error(response.msg);
              break;
          }
        }
      },
      updateApplyInfo() {
        let self = this,
          params = self.detailInfo;
        updateApplyInfo(params).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          self.closeCallBack();
          switch (response && response.infoCode) {
            case 200:
              self.$message.success('保存成功');
              break;
            default:
              self.$message.error(response.msg);
              break;
          }
        }
      },
      getDetailInfo(id) {
        if (!id) return;
        let self = this;
        getApplyInfo(id).then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          if (response && response.infoCode === 200) {
            self.detailInfo = response.data;
          }
        }
      },
      getUser() {
        let self = this;
        getUserList().then(actionMethod).catch(actionMethod);

        function actionMethod(response) {
          if (response && response.infoCode === 200) {
            self.options = response.data;
          }
        }
      },
      //保存
      //params type 0.保存 1.提交
      btnSave(type) {
        if (!this.detailInfo.rybh) {
          this.$message.error('请输入姓名');
          return;
        }
        this.detailInfo.status = type;
        if (this.applyInfoModal.id)
          this.updateApplyInfo();
        else
          this.saveInfo();

      },
      closeCallBack() {
        this.applyInfoModal.centerDialogVisible = false;
        this.dialogImageUrl = '';
        this.$emit('closeCallBack');
      },
      handleSuccess(response) {
        if (response && response.infoCode === 200) {
          this.dialogImageUrl = response.data.id;
          this.detailInfo.photo = response.data.id;
        }
      },
      handleError(response) {
        this.$message.error('上传失败,请重新上传')
      },
      handlePictureCardPreview() {
        this.dialogVisible = true;
      },
      handleRemove() {
        this.dialogImageUrl = '';
        this.detailInfo.photo = '';
      },
      getFileAddress(id) {
        return `${fileDownload}/download?id=${id}`
      },
      userChange(val) {

        let temp = this.options.find(item => item.rybh == val);
        this.detailInfo.ryxm = temp.ryxm;
        this.detailInfo.xb = temp.xb;
        this.detailInfo.rymz = temp.rymz;
        this.detailInfo.csrq = temp.csrq;
        this.detailInfo.nl = temp.nl;
        this.detailInfo.dwjzw = temp.dwjzw;
        this.detailInfo.xl = temp.xl;
        this.detailInfo.xxzy = temp.xxzy;
        this.detailInfo.rybh = temp.rybh;
        if (temp) {

        }
      }
    }
  };
</script>

<style scoped>
  .dialogClass {
    height: 500px;
  }
</style>
