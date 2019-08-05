<template>
  <div>
    <div class="showImgInfowarp"  v-show="showImageBoxBol">
      <!-- 关闭 -->
      <div class="closeBtn" @click="showImageBoxBol = false"></div>
      <!-- 上一个 下一个 -->
      <div class="left" @click="preOrNext('pre',nowImageUrlIndex)"></div>
      <div class="right" @click="preOrNext('next',nowImageUrlIndex)"></div>
      <!-- 图片展示 -->
      <div class="imgMain">
        <div class="mainImgBox"><img :src="allImageUrlsList  && allImageUrlsList.length > 0 ? allImageUrlsList[nowImageUrlIndex]:''" alt=""></div>
        <div class="pageTurnbox">

        </div>
        <div class="rotateBox">
          <div class="rotateLeft" @click="rotate('left')"></div>
          <div class="add" @click="addOrsubtract('+')"></div>
          <div class="subtract" @click="addOrsubtract('-')"></div>
          <div class="rotateRight" @click="rotate('right')"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pic-preview",
    data(){
      return{
        showImageBoxBol : false,
        allImageUrlsList : [],
        nowImageUrlIndex : 0,
        scale:1,
        imgRotateZ:0,
      }
    },
    watch : {
      '$route' (to,from){
        this.showImageBoxBol = false

      }
    },
    methods:{
      addOrsubtract(type){
        switch (type){
          case '+':
            if(this.scale > 5){
              return
            }
            this.scale= this.scale + 0.1
            break;
          case '-':
            if(this.scale < 0.7){
              return
            }
            this.scale= this.scale - 0.1
            break;
        }
        $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(${this.imgRotateZ}deg) scale(${this.scale})`})
      },
      // 上一个下一个
      preOrNext (n,i) {
        $('.mainImgBox').css({top:0, left:0, width:'100%', heigth:'100%'});
        $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(0deg)`})
        switch (n) {
          case 'pre':
            if(this.nowImageUrlIndex < 1){
              this.nowImageUrlIndex = this.allImageUrlsList.length -1;
              return
            }
            this.nowImageUrlIndex--;
            break;
          case 'next':
            if(this.nowImageUrlIndex > this.allImageUrlsList.length -2){
              this.nowImageUrlIndex = 0;
              return
            }
            this.nowImageUrlIndex++;
            break;
        }
      },
      // 旋转
      rotate (type) {
        $('.mainImgBox').css({top:0, left:0, width:'100%', heigth:'100%'});
        this.scale = 1;
        if(type == 'left'){
          this.imgRotateZ += 90
          $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(${this.imgRotateZ}deg)`})
        }
        if(type == 'right'){
          this.imgRotateZ -= 90
          $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(${this.imgRotateZ}deg)`})
        }
      },
      // 切换列表中的图片
      hmgeSwilcher (i) {
        this.imgRotateZ = 0
        $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(0deg)`})
        $('.mainImgBox').css({top:0, left:0, width:'100%', heigth:'100%'});
        this.scale = 1
        this.nowImageUrlIndex = i;
      },
    },
    mounted() {
      $('.imgMain').on('mousewheel', (e) => {
        e.preventDefault();  // 取消默认事件  阻止屏幕滚动
        let delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        let left = $('.mainImgBox').css('left').replace('px','') * 1;
        let top = $('.mainImgBox').css('top').replace('px','') * 1;

        switch (delta) {
          case 1:
           this.addOrsubtract('+');
            break;
          case -1:
            // 缩小
            this.addOrsubtract('-');
            break
        }
      })
      //拖动外边框
      let gapX = '';
      let gapY = '';
      let drag=function(obj){
        obj.bind("mousedown",start);
        function start(event){
          if(event.button==0){
            gapX=event.clientX-obj.position().left;
            gapY=event.clientY-obj.position().top;
            $(document).bind("mousemove",move);
            $(document).bind("mouseup",stop);
          }
          return false;//阻止默认事件或冒泡
        }
        function move(event){
          obj.css({
            "left":(event.clientX-gapX)+"px",
            "top":(event.clientY-gapY)+"px"
          });
          return false;
        }
        function stop(){
          $(document).unbind("mousemove",move);
          $(document).unbind("mouseup",stop);
        }
      }
      drag($('.showImgInfowarp'))
      drag($('.mainImgBox'));
      window.bus.$on('changeIsImageBoxShow',(imageList,index)=>{
        console.log(imageList,index)
        let baseLength = window.innerHeight-40;
        let warpWidth = baseLength-10;
        $('.showImgInfowarp').css({width:`${warpWidth}px`, height:`${warpWidth+40}px`});
        $('.left').css({top:`${warpWidth/2-15}px`});
        $('.right').css({top:`${warpWidth/2-15}px`});
        $('.showImgInfowarp').css({top:`5px`,right:`20px`});
        $('.mainImgBox').css({top:`0px`,left:`0px`});
        this.imgRotateZ = 0;
        this.scale = 1;
        $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(${this.imgRotateZ}deg)`})

        $('.imgMain').css({width:`${warpWidth-50}px`, height:`${baseLength-10}px`});

        this.showImageBoxBol = true;
        this.allImageUrlsList = imageList;
        this.nowImageUrlIndex = index;


        return
        let screenWidth = window.innerWidth;
        if(screenWidth > screenHeight){
          let width = screenWidth * 0.4;
          let height = width * 1.05;
          $('.showImgInfowarp').css({width:`${width}px`, height:`${height}px`});
          $('.left').css({top:`${width *0.4}px`,});
          $('.right').css({top:`${width *0.4}px`,});
          $('.mainImgBox').css({top:0, left:0, width:'100%', heigth:'100%'});
          this.imgRotateZ = 0;
          this.scale = 1;
          $('.mainImgBox img').css({transform:`translate(-50%,-50%) rotateZ(${this.imgRotateZ}deg)`})
        }
        this.showImageBoxBol = true;
        this.allImageUrlsList = imageList;
        this.nowImageUrlIndex = index;
      });
    },
  }
</script>

<style scoped>

</style>
