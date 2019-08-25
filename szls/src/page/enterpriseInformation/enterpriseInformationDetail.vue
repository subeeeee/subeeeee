<template>
  <div class="enterpriseInformationDetail">
    <el-row>
      <el-col :span="20">
        <span class="span-inline-block">检查类型:</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="日常检查"></el-checkbox>
          <el-checkbox label="库存检查"></el-checkbox>
          <el-checkbox label="专项检查"></el-checkbox>
          <el-checkbox label="三防检查"></el-checkbox>
        </el-checkbox-group>
      </el-col>
      <el-col :span="4">
        <!-- <a @click="is_show()">仓库基本信息</a> -->
        <el-button type="text" @click="dialogVisible = true">仓库基本信息</el-button>
      </el-col>
    </el-row>
    <div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
        <template>
          <ckjbxxTable></ckjbxxTable>
        </template>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">企业名称:</span>
        <el-input class="inputWidth" v-model="list.qymc"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block" >统一社会信用代码:</span>
        <el-input class="inputWidth"  v-model="list.tyshxydm"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">单位性质:</span>
        <el-input class="inputWidth"  v-model="list.qyxz"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">单位类型:</span>
        <el-input class="inputWidth" v-model="list.qylx"></el-input>

      </el-col>
      <el-col :span="16">
        <span class="span-inline-block">所在地:</span>
        <el-input style="width: 85%" v-model="list.qyszqy"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">联系人:</span>
        <el-input class="inputWidth" v-model="list.creator"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">法定代表人:</span>
        <el-input class="inputWidth" v-model="list.fddbr"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">是否独立法人资格:</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">注册日期:</span>
        <el-input class="inputWidth" v-model="list.qyzcsj"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">手机:</span>
        <el-input class="inputWidth" ></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">电话:</span>
        <el-input class="inputWidth" v-model="list.bgdh"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">传真:</span>
        <el-input class="inputWidth" v-model="list.qyczhm"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">邮政编码:</span>
        <el-input class="inputWidth" v-model="list.qyyb"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">电子邮箱:</span>
        <el-input class="inputWidth" v-model="list.qydzyx"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">经度:</span>
        <el-input class="inputWidth" v-model="list.qyjd"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">纬度:</span>
        <el-input class="inputWidth" v-model="list.qywd"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <span class="span-inline-block">单位主要业务:</span>
        <el-checkbox-group v-model="radio" style="width: 90%">
          <el-checkbox :label="1">粮油质检</el-checkbox>
          <el-checkbox :label="0">粮油科研</el-checkbox>
          <el-checkbox :label="0">中央储备粮承储</el-checkbox>
          <el-checkbox :label="0">地方储备粮承储</el-checkbox>
          <el-checkbox :label="0">粮油机械制造</el-checkbox>
          <el-checkbox :label="0">其他</el-checkbox>
          <el-checkbox :label="0">行政管理</el-checkbox>
          <el-checkbox :label="0">粮油转化</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <span class="span-inline-block">企业类型:</span>
        <el-checkbox-group v-model="radio" style="width: 90%">
          <el-checkbox :label="1">粮食收储企业</el-checkbox>
          <el-checkbox :label="0">粮油科研</el-checkbox>
          <el-checkbox :label="0">粮油批发市场</el-checkbox>
          <el-checkbox :label="0">地方储备粮承储</el-checkbox>
          <el-checkbox :label="0">粮油机械制造</el-checkbox>
          <el-checkbox :label="0">其他</el-checkbox>
          <el-checkbox :label="0">行政管理</el-checkbox>
          <el-checkbox :label="0">粮油转化</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">企业层级:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">在岗职工:</span>
        <el-input class="inputWidth" v-model="list.qycyrys"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">下属企业个数:</span>
        <el-input class="inputWidth" ></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">是否具有粮食收购资格许可:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="16">
        <span class="span-inline-block">注册地:</span>
        <el-input class="inputWidth" style="width: 85%" ></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">企业状态:</span>
        <el-input class="inputWidth" v-model="list.status"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">入统状态:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">粮食收购许可证发证机关:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">收购资格证编号:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">企业工商登记机关:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">市级承储企业:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">区级承储企业:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">占地面积:</span>
        <el-input class="inputWidth"></el-input>
        <span>m2</span>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">所属粮食行政管理部门:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">申请仓房竣工验收时间:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">设施占地面积:</span>
        <el-input class="inputWidth"></el-input>
        <span>m2</span>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <h1 class="h3">企业应急信息</h1>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">应急级别:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">企业应急类型:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <h1 class="h3">上级集团信息</h1>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">上级集团:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">上级集团统一社会信用代码:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <h1 class="h3">加工企业信息</h1>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">产业化龙头企业:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">放心粮油示范工程:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">全国工业产品生产许可证品种:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">是否主食加工中央厨房:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">研发中心级别:</span>
        <el-select v-model="value" placeholder="请选择" class="inputWidth" disabled="disabled">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <h1 class="h3">企业经济数据</h1>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">营业收入:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">工业总产值:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">产品销售收入:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">利税总额:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">利润总额:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">资产总额:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">当年研究开发投入:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">政府支持投入:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">当年专利获得数:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">发明专利:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="24">
        <h1 class="h3">企业设备及能耗</h1>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">年产粮油机械制造:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">大米加工主机:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">小麦粉加工主机:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">油脂加工主机:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">饲料加工主机:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">仓储设备:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">通用设备:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">能源耗电:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">能源消耗水:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">能源消耗标准煤:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">能源消耗溶剂:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">总仓容(以三等小麦计):</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8">
        <span class="span-inline-block">罐容:</span>
        <el-input class="inputWidth"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="span-inline-block">仓房:</span>
        <el-input style="width: 80px"></el-input>
        <span>栋</span>
        <el-input style="width: 80px"></el-input>
        <span>间</span>
      </el-col>
    </el-row>
    <br>
    <el-row >
      <el-col :span="2">
        <span class="span-inline-block">备注:</span>
        <el-input type="textarea" style="width: 50%" v-model="list.remark"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ckjbxxTable from "./component/ckjbxx_table"
  export default {
    name: "enterpriseInformationDetail",
    components:{
      ckjbxxTable,
    },
    data() {
      return {
        list: {
          qymc: "111",
          tyshxydm:"111",
          qyxz:"111",
          qylx:"111",
          qyszqy:"111",
          creator:"111",
          fddbr:"111",
          qyzcsj:"111",
          bgdh:"111",
          qyczhm:"111",
          qyyb:"111",
          qydzyx:"111",
          qyjd:"111",
          qywd:"111",
          qycyrys:"111",
          status:"111"
        } ,
        checkList: [],
        value: '',
        options: [],
        radio: '',
        dialogVisible: false,//控制是否显示仓库基本信息
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    },
    mounted(){
      // console.log(this.$route.query.id)
    }
  }
</script>

<style scoped>
  .enterpriseInformationDetail {
    border: 1px solid #e8e8e8;
    padding: 10px;
    width: 98%;
    margin: auto;
    margin-bottom: 10px;
  }

  .span-inline-block {
    display: inline-block;
    float: left;
    width: 80px;
    text-align: right;
    margin-right: 5px;
    line-height: 30px;
  }

  .inputWidth {
    width: 200px;
  }

  .h3 {
    width: 98%;
    text-align: center;
    color: #fff;
    background: #1b68c0;
  }
</style>
