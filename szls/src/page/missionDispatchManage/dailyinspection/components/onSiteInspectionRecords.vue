<template>
  <div class="my_form">
<!--    <h2 style="text-align: center;">现场检查记录（首页）</h2>-->
    <div class="left_box">
      <h2 class="left_tatle" style="font-size: 18px; text-align: center; padding-top:10px;">现场检查记录（首页）</h2>
      <p>
        第 <input type="text"> 页共 <input type="text"> 页
      </p>
    </div>
    <div class="center_box">

    </div>
    <div class="right_box">

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{

      }
    },
    methods:{

    },
    mounted(){

    }
  }
</script>

<style scoped>
  .my_form{
    display: flex;
    justify-content: space-around;
  }
  .left_box{
    background: pink;
    width: 31%;
    height: 1000px;
  }
  .center_box{
    background: skyblue;
    width: 31%;
    height: 1000px;
  }
  .right_box{
    background: yellow;
    width: 31%;
    height: 1000px;
  }
  .left_tatle{
    font-size: 18px;
    text-align: center;
    padding-top:10px;
  }
  input {
    border: nones;
  }
</style>
