<template>
  <div class="public">
    <el-col :span="4" :offset="20">
      <el-button v-if="showPdf" @click="btn">添加资料包</el-button>
    </el-col>


    <div class="tree">
      <el-tree
        class="tree"
        :accordion='true'
        :data="listData"
        :props="defaultProps"
        node-key="id"
        :default-expand-all="false"
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
    </div>

  </div>
</template>

<script>
  let id = 1000;

  export default {
    name:'pdfPackage',
    data() {
      return {
        showPdf:false,
        listData: [],
        defaultProps: {
          children: 'children',
          label: 'text'
        }
      }
    },

    methods: {
      btn(){
        this.$router.push({
          path:'/addPdfPackage'
        })
      },

      append(node,data) {
        this.$router.push({
          path:'/compilePdfPacjage',
          query:{pId:data}
        })
      },

      remove(node, data) {
        this.$confirm("确认删除该资料表", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          $.post(this._path+'/pdf/delete',{id:data.value},(res)=>{
            if(res.resultCode == '0000'){
              $.get(this._path + "/pdf/tree",{},res=>{
                let tree = res.data.tree?[res.data.tree]:[]
                this.listData = tree;
              })
            }else{
              this.requestError(res,this)
            }
          })
        })

      },

      // 编辑
      redact (store,data) {
        this.$router.push({
          path:'/upPdfDataPackage',
          query:{pId:data.value,name:data.text}
        })
      },

      renderContent(h, { node, data, store }) {
        let add = null,edit = null,del=null
        if(1){
          add =  <el-button size="mini" on-click={ () => this.append(node, data.value) }>添加</el-button>;
        }
        if(1){
          edit = <el-button size="mini" on-click={ () => this.redact(node, data) }>编辑</el-button>;
        }
        if(1){
          del = <el-button size="mini" on-click={ () => this.remove(node, data) }>删除</el-button>;
        }
        return (
          <span style="border-bottom:1px soild #ccc">
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
                {add}{edit}{del}
            </span>
          </span>);
      }
    },
    created () {
      $.get(this._path + "/pdf/tree",{},res=>{
        let tree = res.data.tree?[res.data.tree]:[]
        this.listData = tree;
        if(res.data.tree){
          this.showPdf = false
        }else{
          this.showPdf = true
        }
      })
    }
  };
</script>

<style>
  .organization{
    width:80%;
    margin:0 auto;
    padding-top:30px;
  }

  .organization .tree{
    margin-top: 50px
  }
  .organization .addNewOrg{
    float: right;
    margin-right: 30px
  }

  .organization .el-tree-node__expand-icon{
    width:14px !important;
    height: 24px !important
  }

  .tree{
    padding: 20px;
  }
</style>
