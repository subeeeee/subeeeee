<template>
  <div  class="browseImage">
    <ul>
      <li v-for="(img,index) in imageList" v-if="img.fileType === 'png' || img.fileType === 'jpg'|| img.fileType === 'jpeg' || img.fileType === 'gif' || img.fileType === 'svg'">
        <img :src="img.url" :alt="img.name + '照片'" :title="img.name + '照片'">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "browseImage",
    data(){
      return {
        imageList:[]
      }
    },
    methods: {

    },
    created() {
      let params = {
        dataType: this.$route.query.dataType,
        bussNo: this.$route.query.bussNo,
        imageType: this.$route.query.imageType,
        taskType: this.$route.query.taskType,
        custId: this.$route.query.custId,
        flowId: this.$route.query.flowId,
      };
      let path = '';
      if(this.$route.query.flowId){
        path = '/flowImage/queryFlowImage'
      }else{
        path = '/businessImage/queryImage'
      }
      $.get(this._path + path, params, res => {
        if (res.resultCode == "0000") {
          if(this.$route.query.flowId){
            this.imageList = res.data.flowImageList
          }else{
            this.imageList = res.data.bussImageList
          }
        } else {
          this.requestError(res, this);
        }
      });
    }
  }
</script>

<style scoped>
  @import "./browseImage.css";
</style>
