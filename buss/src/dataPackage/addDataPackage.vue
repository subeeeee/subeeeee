<template>
  <div class="public">

    <h2>资料包配置选择</h2>
    <el-row>
      <el-row>
        <!--<el-col :span="8" :offset="2">
          <el-col :span="6"><span>产品</span></el-col>
          <el-col :span="18">
            <el-select v-model="productType" placeholder="请选择" class="select_width"  size='small'>
              <el-option label="全部" value=""></el-option>
              <el-option v-for="(item,index) in products" :key="index" :label="item.proName" :value="item.proCode"></el-option>

            </el-select>
          </el-col>
        </el-col>-->
        <el-col :span="8"  :offset="2">
          <el-col :span="6"><span>文件夹名称</span></el-col>
          <el-col :span="18"> <el-input size='small' v-model="name"></el-input></el-col>
        </el-col>
        <el-col :span="8" :offset="2">
          <el-col :span="6"><span>包类型</span></el-col>
          <el-col :span="18">
            <el-select v-model="packageType" placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in packageTypeList" :label="item.name" :value="item.code"></el-option>

            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :offset="2" :span="20">
          <el-col :span="3"><span>包含文件</span></el-col>
          <el-col :span="18">
            <el-checkbox-group v-model="checkList">
              <!--<el-col :span="5" v-for="item in imageList" >-->
              <div class="files_item" v-for="item in imageList" >
                <el-checkbox :checked="item.checked == '1'" :label="item" :value="item" >{{item.name}}</el-checkbox>
              </div>
              <!--</el-col>-->
            </el-checkbox-group>
          </el-col>
        </el-col>
      </el-row>
    </el-row>

    <el-col span="4" offset="10" style="margin-top:40px;">
      <el-button @click="btn()">添加资料包</el-button>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        packageType:'',
        products:[],
        arr:[{},{},{}],
        proCode:'',
        pValue:'',
        name:'',
        imageList:[],
        productType:'',
        checkList:[],
        imgFileList:[],
        packageTypeList:[],
      }
    },
    mounted(){

    },
    methods:{
      btn(){
       /* if(!this.productType){
          this.$message({
            type: 'warning',
            message: '请选择产品!',
            duration: 1500,
            showClose: true
          })
          return
        }*/
        if(!this.name){
          this.$message({
            type: 'warning',
            message: '请填写文件夹名称!',
            duration: 1500,
            showClose: true
          })
          return
        }
        if(!this.packageType){
          this.$message({
            type: 'warning',
            message: '请选择包类型!',
            duration: 1500,
            showClose: true
          })
          return
        }

        let params = {
          imageListStr:JSON.stringify(this.checkList),
          productType:this.productType,
          name:this.name,
          pId:'1',
          packageType:this.packageType
        };

        //
        $.post(this._path +"/package/insert",params,res=>{
          if(res.resultCode == '0000'){
            this.$message({
              type:'success',
              message:'提交成功',
              duration:1500,
              showClose:1
            });
            this.$router.push('/dataPackage')
          }else{
            this.requestError(res,this)
          }
        })
      },
      filter(code,list){
        let bol = false;
        for (let i = 0,length = list.length;i<length;i++){
          if(code == list[i]){
            bol = true;
            break
          }
        }
        if(bol){
          return ''
        }else{
          return code
        }
      },
    },
    beforeCreate(){

      $.get(this._path +"/package/getImageList",{},res=>{
        this.imageList = res.data.imageList
      })

      // packageTypeList
      $.get(this._path +"/package/getPackageType",{},res=>{
        // this.packageTypeList = res.data.packageType
        let packageList = res.data.packageType;
        let packageTreeList = res.data.packageTreeList;
        for (let i = 0,j = packageList.length;i<j;i++){
          let code = this.filter(packageList[i].code,packageTreeList);
          // console.log(code);
          if(code){
            this.packageTypeList.push(packageList[i])
          }
        }
      })


      $.post(this._path + "/package/selectProductInfo",{},res => {
        if (res.resultCode == "0000") {
          this.products = res.data.packageType
        }else{
          this.requestError(res,this)
        }
      });
    }
  }
</script>

