<template>
  <div class="public pdf">

    <h2>PDF资料包配置选择</h2>
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
        <!--<el-col :span="8" :offset="2">
          <el-col :span="6"><span>包类型</span></el-col>
          <el-col :span="18">
            <el-select v-model="packageType" placeholder="请选择" class="select_width"  size='small'>
              <el-option label="01包" value="01包"></el-option>
              <el-option label="02包" value="02包"></el-option>
            </el-select>
          </el-col>
        </el-col>-->
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
                <el-checkbox  @change="checkboxFn(item,index)"  :label="JSON.stringify(item)" :value="item" >{{item.name}}</el-checkbox>
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
        packageType:''
      }
    },
    mounted(){

    },
    methods:{
      addPDf(){
        this.dialogVisible = true
        this.clearPdf()
      },
      deletePdf(index){
        this.dialogVisible = false;
        this.pdfList.splice(index,1)
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
        this.currentIndex = index;
      },
      clearPdf(){
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
        /*if(!this.productType){
          this.$message({
            type: 'warning',
            message: '请选择产品!',
            durduration: 1500,
            showClose: true
          });
          return
        }*/
        if(!this.name){
          this.$message({
            type: 'warning',
            message: '请填写文件夹名称!',
            durduration: 1500,
            showClose: true
          });
          return
        }
        /*if(!this.packageType){
          this.$message({
            type: 'warning',
            message: '请选择包类型!',
            durduration: 1500,
            showClose: true
          });
          return
        }*/




        let params = {
          imageListStr:JSON.stringify(this.pdfList),
          productType:'pdf',
          name:this.name,
          pId:'1',
          packageType:'pdf'
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
<style>
 .pdf .el-dialog--small{
    width: 70% !important;
  }
</style>
