<template>
  <div>
    <el-button  size="small"  class="buttom_btn"  @click="derive" v-if="type != 'text'">导出资料包</el-button>
    <el-button  type="text" size="small"  class="buttom_btn"  v-if="type == 'text'" @click="derive">导出资料包</el-button>
    <el-dialog :title="'导出资料包 （'+ custName + packageType +'）'"  :modal-append-to-body="modalAppend" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" type="index" class="module_margin_bottom">
       <el-table-column header-align="center" align="center" property="proName" label="产品名称" ></el-table-column>
       <el-table-column header-align="center" align="center" label="操作">
          <template scope="scope">
            <el-button size="small"  @click="downloadFn(scope.row,scope.$index)">导出</el-button>
            <el-button size="small" @click="downloadCreateFn(scope.row)">生成</el-button>
            <el-button size="small" @click="downloadSize(scope.row,scope.$index)">查询大小</el-button>
          </template>
        </el-table-column>
       <el-table-column header-align="center" align="center" label="大小">
          <template scope="scope">
            {{scope.row.size}}
          </template>
        </el-table-column>
      </el-table>
      <div class="hint">
        如您希望下载修改影像后的资料包,需要重新生成再下载哦。
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  .el-dialog--small {
    width: 50% !important;
  }
</style>
<script>
  export default {
    name: "package-data",
    data(){
      return {
        gridData:[],
        dialogTableVisible:false,
        modalAppend:false
      }
    },
    props:{
      gridList:Array,
      custName:String,
      packageType:String,
      bussNo:String,
      type:String,
      taskType:String
    },
    methods:{
      derive(){
        this.gridData = [];
        for(let i= 0;i<this.gridList.length;i++){
          let params = {
            productType:this.gridList[i].proCode,
            bussNo:this.bussNo,
            packageType:this.packageType
          };
          $.get(this._path + '/businessImage/queryAccessOfPackage',params,res=>{
            if(res.resultCode == '0000'){
              if(res.data.access){
                // 改生成大小 index
                let size = '';
                if(res.data.size/1<1024){
                    size = res.data.size + 'kb'
                }else{
                    size = (res.data.size/1/1024).toFixed(2) + 'M'
                }
                this.gridData.push({proCode:this.gridList[i].proCode,proName:this.gridList[i].proName,size:size})
              }else{
                this.gridData.push({proCode:this.gridList[i].proCode,proName:this.gridList[i].proName,size:'待生成'})
              }
            }else{
              this.requestError(res,this)
            }
          });
          this.dialogTableVisible = true
        }
      },
      downloadSize(row,index){
        let params = {
          productType:row.proCode,
          bussNo:this.bussNo,
          packageType:this.packageType
        };
        $.get(this._path + '/businessImage/queryAccessOfPackage',params,res=>{
          if(res.resultCode == '0000'){
            if(res.data.access){
              let size = '';
              if(res.data.size/1<1024){
                size = res.data.size + 'kb'
              }else{
                size = (res.data.size/1/1024).toFixed(2) + 'M'
              }
              this.$set(this.gridData[index],'size',size);
            }else{
              this.$message({
                type:'success',
                message:'您需要先点击“生成”，两分钟后回来导出哦！',
                duration:1500,
                showClose:true
              })
            }
          }else{
            this.requestError(res,this)
          }
        })
      },
      downloadCreateFn(row){
        let params = {
          productType:row.proCode,
          bussNo:this.bussNo,
          packageType:this.packageType,
          taskType:this.taskType
        };
        $.post(this._path + '/businessImage/package',params,res=>{
          if(res.resultCode == '0000'){
            this.$alert('正在为您生成资料包，您可以2分钟后，返回此页面导出资料包', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.modalAppend = false;
                $('.v-modal').css('display','none')
              }
            });
          }else{
            this.requestError(res,this)
          }
        })
        // this.dialogTableVisible = false
      },
      downloadFn(obj,index) {
        let params = {
          productType: obj.proCode,
          bussNo: this.bussNo,
          packageType:this.packageType
        };
        $.get(this._path + '/businessImage/queryAccessOfPackage',params,res=>{
          if(res.resultCode == '0000'){
            if(res.data.access){
              let size = '';
              if(res.data.size/1<1024){
                size = res.data.size + 'kb'
              }else{
                size = (res.data.size/1/1024).toFixed(2) + 'M'
              }
              this.$set(this.gridData[index],'size',size);
              this._download(this._path + '/businessImage/download',params)
            }else{
              this.$message({
                type:'success',
                message:'您需要先点击“生成”，两分钟后回来导出哦！',
                duration:1500,
                showClose:true
              })
            }
          }else{
            this.requestError(res,this)
          }
        })
      },
    }
  }
</script>

<style scoped>
  .el-dialog--small{
    width: 50% !important;
  }
</style>
