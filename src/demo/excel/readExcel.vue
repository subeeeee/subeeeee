<template>
  <div>
    <input type="file" @change="sendFile" ref="sendFile">
    {{dadtaImportantData}}
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  export default {
    name: "excel",
    data(){
      return{
        dadtaImportantData:''
      }
    },
    methods:{
      sendFile(e){
        let obj = e.target;
        if(!obj.files){
          return
        }
        let wb;
        let file = obj.files[0];
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = e=>{
          let data = e.target.result;
          wb = this.XLSX.read(data,{
            type:'binary'
          });
console.log(wb)
          // console.log(wb.Sheets['法拍预算表'].D2.v)
          // this.dadtaImportantData = this.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]])
          // console.log(this.dadtaImportantData)
          // let a  = [...this.dadtaImportantData]
          // console.log(a)
        }
      }
    },

  }
</script>

<style scoped>

</style>
