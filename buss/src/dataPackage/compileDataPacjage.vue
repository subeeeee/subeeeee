<template>
  <div class="public">
    <h2>资料包配置选择</h2>
    <el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="8"  :offset="2">
          <el-col :span="6"><span>文件夹名称</span></el-col>
          <el-col :span="18"> <el-input size='small' v-model="name"></el-input></el-col>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col offset="2" :span="20">
          <el-col :span="3"><span>包含文件</span></el-col>
          <el-col :span="18">
            <el-checkbox-group @change="checkFn" v-model="checkList">
              <div class="files_item" v-for="item in imageList" >
                <el-checkbox :checked="item.checked == '1'" :label="item" :value="item" >{{item.name}}</el-checkbox>
              </div>
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
        msg: 'Welcome to Your Vue.js App',
        arr:[{},{},{}],
        proCode:'',
        pValue:'',
        name:'',
        imageList:[],
        checkList:[],
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
          imageListStr:JSON.stringify(this.checkList),
          pId:this.$route.query.value,
          name:this.name,
        }
        // return

        $.post(this._path +"/package/insert",params,res=>{
          if(res.resultCode == '0000'){
            this.$message({
              type:'success',
              message:'提交成功',
              duration:1500,
              showClose:1
            })
            this.$router.push('/dataPackage')
          }else{
            this.requestError(res,this)
          }
        })

      }
    },
    beforeCreate(){
      this.pValue = this.$route.query.value


      $.get(this._path +"/package/getImageList",{},res=>{
        this.imageList = res.data.imageList
      })
    }
  }
</script>

