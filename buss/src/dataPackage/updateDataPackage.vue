<template>
  <div class="public">

    <h2>资料包配置选择</h2>
    <el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="8"  :offset="2">
          <el-col :span="6"><span>文件夹名称</span></el-col>
          <el-col :span="18"> <el-input size='small' v-model="name"></el-input></el-col>
        </el-col>
        <el-col :span="8"  :offset="2">
          <el-col :span="6"><span>包类型</span></el-col>
          <el-col :span="18">
            <el-select v-model="packageType" disabled placeholder="请选择" class="select_width"  size='small'>
              <el-option v-for="item in packageTypeList" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col offset="2" :span="20">
          <el-col :span="3"><span>包含文件</span></el-col>
          <el-col :span="18">
            <el-checkbox-group @change="checkFn" v-model="checkList">
              <el-col :span="5" v-for="item in imageList" >
                <el-checkbox :checked="item.checked == '1'" @change="checkboxFn(item.checked)"  :label="item" :value="item" >{{item.name}}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-col>
        </el-col>
      </el-row>
    </el-row>

    <el-col span="4" offset="10" style="margin-top:40px;">
      <el-button @click="btn()">保存</el-button>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        arr:[{},{},{}],
        proCode:'',
        pValue:'',
        imageList:[],
        checkList:[],
        imgFileList:[],
        packageType:'',
        name:'',
        packageTypeList:[],
      }
    },
    mounted(){

    },
    methods:{
      checkboxFn(val){
      },
      checkFn(val){
      },
      btn(){

        let params = {
          imageListStr:JSON.stringify(this.checkList) ,
          id:this.$route.query.value,
          name:this.name,
        };
        //
        $.post(this._path+ '/package/update',params,(res)=>{
          if(res.resultCode === '0000'){
            this.$router.push('/dataPackage')
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    created(){
      this.pValue = this.$route.query.value;
      this.name = this.$route.query.text
    },
    beforeCreate(){
      $.get(this._path +"/package/getPackageType",{},res=>{
        // this.packageTypeList = res.data.packageType
        this.packageTypeList = res.data.packageType;
      })

      //编辑页方法
      this.imgFileList = this.$route.query.imgFileList;


      let imgList = '';
      if(this.imgFileList){
        for(var i=0;i<this.imgFileList.length;i++){
          imgList = imgList + '"' +this.imgFileList[i].imageType +'"' +  ','
        }
      }
      imgList = imgList.substr(0, imgList.length - 1);
      imgList = '[' + imgList + ']';


      $.get(this._path +"/package/getImageList",{checked:imgList},res=>{
        this.imageList = res.data.imageList
      });
      //查询单个文件夹结构
      $.get(this._path+ '/package/query',{id:this.$route.query.value},(res)=>{
        if(res.resultCode === '0000'){
          this.packageType = res.data.packageTree.packageType
        }else{
          this.requestError(res,this)
        }
      })

    }
  }
</script>

