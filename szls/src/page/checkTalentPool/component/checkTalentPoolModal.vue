<template>
  <div class="checkTalentPoolModal">
    <el-dialog title="新增检查人才" :visible.sync="talentPoolModal.centerDialogVisible" width="800px" center :close-on-click-modal="false">
      <el-form :label-width="labelwidthStyle">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别：">
              <el-date-picker type="date" placeholder="选择日期"></el-date-picker>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="出生年月：">
              <el-select
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="毕业院校：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工作单位：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="职务：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="检查类型：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专业方向：">
              <el-input placeholder="请输入内容" :disabled="iptDisabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-radio-group v-model="ruleForm.resource">
          <el-form-item label="是否有执法证：">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-form-item>
        </el-radio-group>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="国家证号：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发证机关：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="国家证有效期：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="至：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="市级证号：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发证机关：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="市级证有效期：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="至：">
              <el-input placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="职称：">
              <el-input placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="发证机关：">
              <el-input placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-radio-group v-model="ruleForm.resource">
            <el-form-item label="状态：">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-form-item>
          </el-radio-group>
        </el-row>
        <el-row>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="操作人：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="操作时间：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件：">
          <el-upload class="upload-demo" action multiple :limit="3">
            <el-button size="small" type="primary">上传照片</el-button>
            <div slot="tip" class="el-upload__tip">照片大小：高清照片大小5M格式：jpg png</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="talentPoolModal.centerDialogVisible = false">保 存</el-button>
        <el-button type="primary" @click="talentPoolModal.centerDialogVisible = false">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
	  talentPoolModal: Object
  },
  name: "checkTalentPoolModal",
  data() {
    return {
      textarea:"",
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      iptDisabled: true,
      labelwidthStyle: "120px",
      centerDialogVisible: false,
      /** 搜索查询*/
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  components: {},
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style scoped>
</style>
