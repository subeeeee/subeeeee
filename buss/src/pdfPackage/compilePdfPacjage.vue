<template>
  <div class="public pdf">

    <h2>PDF资料包配置选择</h2>
    <el-row>
      <el-row>
        <el-col :span="8"  :offset="2">
          <el-col :span="6"><span>文件夹名称</span></el-col>
          <el-col :span="18"> <el-input size='small' v-model="name"></el-input></el-col>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :offset="2" :span="20">
          <el-col :span="3"><span>包含文件</span></el-col>
          <el-col :span="18">
            <el-col :span="23" :offset="1" >
              <el-button  v-for="(item,index) in pdfList" @click="pdfemand(item,index)" style="margin-right: 10px;display: inline-block;margin-bottom: 10px;">{{item.pdfName}}</el-button>
              <el-button @click="addPDf">添加PDF文件</el-button>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-row>
    <el-col :span="4" :offset="10" style="margin-top:40px;">
      <el-button @click="btn">添加资料包</el-button>
    </el-col>

    <el-dialog :visible.sync="dialogVisible"  width="100%" :modal="false" id="dialog">
      <el-row>
        <el-col :span="20"  :offset="2">
          <el-col :span="6"><span>PDF名称</span></el-col>
          <el-col :span="18"> <el-input size='small' v-model="pdf.pdfName"></el-input></el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="2"><span>产品</span></el-col>
          <el-col :span="22">
            <el-checkbox-group @change="checkFn" v-model="pdfImageList">
              <el-col :span="6" v-for="(item,index) in imageList" >
                <!--:checked="item.checked == '1'"-->
                <el-checkbox  @change="checkboxFn(item,index)"  :label="JSON.stringify(item)" :key="JSON.stringify(item)" :value="item" >{{item.name}}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="6" :offset="10" style="margin-top:40px;">
        <el-button @click="addPDF">添加</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="deletePdf(currentIndex)">删除</el-button>
      </el-col>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        products:[],
        msg: 'Welcome to Your Vue.js App',
        arr:[{},{},{}],
        proCode:'',
        pValue:'',
        name:'',
        imageList:[],
        productType:'',
        checkList:[],
        imgFileList:[],
        pdfImageList:[],
        dialogVisible:false,
        currentIndex:0,
        pdf:{
          id:'',
          treeId:'',
          pdfName:'',
          imageList:'',
        },
        pdfList:[],
      }
    },
    mounted(){

    },
    methods:{
      addPDf(){
        this.dialogVisible = true;
        this.clearPdf()
      },
      deletePdf(index){
        this.dialogVisible = false;
        this.pdfList.splice(index,1);
        this.clearPdf()
      },
      pdfemand(item,index){
        let itemObj = JSON.parse(JSON.stringify(item));
        this.pdfImageList = [];
        itemObj.imageList = JSON.parse(itemObj.imageList);
        for(let i = 0 ; i<itemObj.imageList.length;i++){
          this.pdfImageList.push(JSON.stringify(itemObj.imageList[i]))
        }
        this.pdf.id= item.id;
        this.pdf.treeId = item.treeId;
        this.pdf.pdfName = item.pdfName;
        this.dialogVisible = true;
        this.currentIndex = index
      },
      clearPdf(){
        // this.name = '';
        this.pdf.id= '';
        this.pdf.treeId = '';
        this.pdf.pdfName = '';
        this.pdf.imageList=[];
        this.pdfImageList = []
      },
      addPDF(){
        for(let i = 0;i<this.pdfImageList.length;i++){
          let arr = JSON.parse(this.pdfImageList[i])
          this.pdfImageList[i] = arr
        }
        let params = {
          id:this.pdf.id,
          treeId:this.pdf.treeId,
          pdfName:this.pdf.pdfName,
          imageList:JSON.stringify(this.pdfImageList)
        };
        let num = 0;
        let pdfbol= false;
        for(let i = 0;i<this.pdfList.length;i++){
          if(this.pdfList[i].pdfName == params.pdfName){
            num = i
            pdfbol = true
          }
        }
        if(!pdfbol){
          this.pdfList.push(params);
        }else{
          this.pdfList[num] = params
        }
        this.dialogVisible = false;
        this.clearPdf()
      },
      checkboxFn(val,index){
      },
      checkFn(val){
      },
      btn(){
        let params = {
          imageListStr:JSON.stringify(this.pdfList),
          name:this.name,
          pId:this.$route.query.pId,
        }

        //
        $.post(this._path +"/pdf/insert",params,res=>{
          if(res.resultCode == '0000'){
            this.$message({
              type:'success',
              message:'提交成功',
              duration:1500,
              showClose:1
            })
            this.$router.push('/pdfPackage')
          }else{
            this.requestError(res,this)
          }
        })
      }
    },
    beforeCreate(){
      this.pId = this.$route.query.pId
      $.get(this._path +"/pdf/getImageList",{},res=>{
        this.imageList = res.data.imageList
      })

      /*$.post(this._path + "/package/selectProductInfo",{},res => {
        if (res.resultCode == "0000") {
          this.products = res.data.productInfoVoList
        }else{
          this.requestError(res,this)
        }
      });*/
    }
  }
</script>
<style >
  .pdf .el-dialog--small{
    width: 70% !important;
  }
</style>
