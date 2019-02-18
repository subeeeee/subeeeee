<template>
<div>
  <input type="file" @change="asdf">
</div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: "excel",
    data(){
      return {
        result:{},
        pager:{
          pageNumber:1,
          pageSize:10,
          pageCount:0,
          recordCount:0
        },
        jsono:
          [{ //测试数据
            "id": 1,//A
            "合并的列头1": "数据11",//B
            "合并的列头2": "数据12",//C
            "合并的列头3": "数据13",//D
            "合并的列头4": "数据14",//E
          }, {
            "id": 2,
            "合并的列头1": "数据21",
            "合并的列头2": "数据22",
            "合并的列头3": "数据23",
            "合并的列头4": "数据24",
          }],
        wopts: { bookType: 'xlsx', bookSST: true, type: 'binary' }
      }
    },
//     methods: {
//       saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式
//         console.log(URL.createObjectURL)
//         var tmpa = document.createElement("a");
//         tmpa.download = fileName || "下载";
//         tmpa.href = URL.createObjectURL(obj); //绑定a标签
//         tmpa.click(); //模拟点击实现下载
//         setTimeout(function () { //延时释放
//           URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
//         }, 100);
//       },
//
//       downloadExl(data, type) {
//         var wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
// //wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
//         data = XLSX.utils.json_to_sheet(data);
// // data["B1"] = { t: "s", v: "asdad" };
// // data["!merges"] = [{//合并第一行数据[B1,C1,D1,E1]
// // s: {//s为开始
// // c: 1,//开始列
// // r: 0//开始取值范围
// // },
// // e: {//e结束
// // c: 4,//结束列
// // r: 0//结束范围
// // }
// // }];
//         wb.Sheets['Sheet1'] = data;
//         this.saveAs(new Blob([this.s2ab(XLSX.write(wb, this.wopts))], { type: "application/octet-stream"}), "这里是下载的文件名" + '.' + (this.wopts.bookType == "biff2" ? "xls" : this. wopts.bookType));
//       },
//       s2ab(s) {
//         if (typeof ArrayBuffer !== 'undefined') {
//           var buf = new ArrayBuffer(s.length);
//           var view = new Uint8Array(buf);
//           for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//           return buf;
//         } else {
//           var buf = new Array(s.length);
//           for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
//           return buf;
//         }
//       },
//
//         //这里是我自己从后台获取的对象集合（自己用时获取自己的数据）
//       flash(url){
//         if(!url){
//           url='waterflow/all';
//         }
//         this.$http.post(url,{
//           pageNumber:this.pager.pageNumber,
//           pageSize:this.pager.pageSize,
//           pageCount:this.pager.pageCount,
//           recordCount:this.pager.recordCount
//         }).then(function(response){
//           if(response.body.status==1){
//             this.result= response.body.items;
//             this.pager=response.body.page;
//           }else{
//             if(response.body.status==10101){
//               this.$Message.info("请登陆!");
//               this.$router.push ('/');
//             }
//             this.$Message.info(response.body.message);
//           }
//         }, function(){
//
//         });
//       },
//
//     },
    methods: {
      asdf(e){
        console.log(e.target.files)
        this.readExcel(e);
      },
      readExcel(e) {//表格导入
        var that = this;
        const files = e.target.files;
        if(files.length<=0){//如果没有文件名
          return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
          return false;
        }

        const fileReader = new FileReader();
        console.log(fileReader)
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            const wsname = workbook.SheetNames[0];//取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
            console.log(JSON.stringify(ws));

            that.outputs = [];//清空接收数据
            for(var i= 0;i<ws.length;i++){
              var sheetData = {
                address: ws[i].addr,
                value: ws[i].value
              }
              that.outputs.push(sheetData);
            }
            this.$refs.upload.value = '';

          } catch (e) {

            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
      }
    },

    mounted:function(){
      // this.flash();
      // console.log(this.XLSX);
      // this.downloadExl([[1,2,3],[1,2,3],[1,2,3],[1,2,3],[1,2,3]])
    },
  }
</script>

<style scoped>

</style>
