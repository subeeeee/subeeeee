<template>
  <div>
      <el-form :label-width="labelwidthStyle">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="姓名：">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别：">
              <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="出生年月：">
              <el-select v-model="value" placeholder="请输入关键词">
                <el-option :value="value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="学历：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="毕业院校：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="工作单位：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="职务：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="检查类型：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="专业方向：">
              <el-input placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-radio-group v-model="ruleForm.resource">
            <el-form-item label="是否有执法证：">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-form-item>
          </el-radio-group>
        </el-row>
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
        <el-row>
            <el-form-item label="审批：">
                <template>
                  <div class="sp_border">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-form-item label="审批：">
                        <el-radio label="通过"></el-radio>
                        <el-radio label="驳回"></el-radio>
                      </el-form-item>
                    </el-radio-group>
                    <br /><br />
                    <el-row :gutter="10">
                      <el-col :span="10">
                        <el-form-item label="审批人：">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="审批时间：">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <br />

                  </div>
                </template>
            </el-form-item>
        </el-row>
        <el-form-item label="附件：">
          <el-upload class="upload-demo" action multiple :limit="3">
            <el-button size="small" type="primary">上传照片</el-button>
            <div slot="tip" class="el-upload__tip">照片大小：高清照片大小5M格式：jpg png</div>
          </el-upload>
        </el-form-item>
        <!-- <el-row style="float: right;">
          <el-button type="primary">提交</el-button>
          <el-button type="primary">取消</el-button>
        </el-row> -->
      </el-form>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        labelwidthStyle: "120px",
        value:"",
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
      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style scoped>
  .sp_border{
    width: 70%;
    height: auto;
    border: 1px dashed #ccc;
    border-radius: 7px;
  }
</style>
