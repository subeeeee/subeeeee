<template>
  <div class="jdm-toolbar-footer" v-if="scrollBol">
    <div data-type="link" class="J-trigger jdm-toolbar-tab jdm-tbar-tab-top" >
      <span @click="backFn" title="回到顶部">
        <img src="../../assets/arrows_top.png" />
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "back-top",
        data(){
          return {
            scrollBol:false,
          }
        },
        methods: {
          backFn(){
            $("html,body").animate({scrollTop:0}, 500);
          },
          onScroll () {
            if(document.documentElement.scrollTop + document.body.scrollTop  > 150){
              this.scrollBol =true
            }else{
              this.scrollBol =false
            }
          }
        },
        mounted(){
          this.$nextTick(function () {
            window.addEventListener('scroll', this.onScroll)
          })
        },
    }
</script>

<style scoped>
  .jdm-toolbar-tab .tab-ico {
    width: 34px;
    height: 35px;
    margin-left: 1px;
    position: relative;
    z-index: 2;
    background-color: #7a6e6e;
  }
  .jdm-toolbar-footer:hover {
    opacity: .9;
  }
  .jdm-toolbar-footer img{
    width: 100%;
  }
  .jdm-toolbar-footer{
    position: fixed;
    bottom: 50px;
    overflow: hidden;
    right: 10px;
    z-index: 200;
    text-align: center;
    width: 44px;
    height: 45px;
    opacity: .7;
    background: #d0d2d4;
  }
</style>
