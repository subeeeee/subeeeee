<template>
  <div class="picModule">
    <div class="loadingBox " v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="fullscreenLoading_text"></div>
    <input type="file" multiple ref="searchDom" @change="onUpload" style="display:none" />
    <el-row class="module_margin_buttom addImageBtn" v-if="details == false ? false :true">
      <el-col :offset="19" :span="5">
        <el-select class="input_width_95" v-model="imageType" multiple placeholder="请选择" size="small">
          <el-option v-for="item in imageTypeArr" :key="item.imageType" :label="item.name" :value="item.imageType" :class="item.required == '1'?'required':''" ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class=" module_margin_buttom tableInfo">
      <div class="imgRow">
        <div class="imgTableLeft">影像类型</div>
        <div class="imgTableCenter imgTitle">影像预览</div>
        <div class="imgTableright">操作</div>
      </div>
      <div class="imgRow imgRowList" v-for="(picType,ind) in picTypes"  v-if="imageType.indexOf(picType.imageType) != -1">
        <div class="imgTableLeft"><!--影像类型--><span class="discription">{{picType.name}}</span></div>
        <div class="imgTableCenter">
          <!--影像预览-->
          <div class="imgBox_warp color-list">
            <div class="imgBox imgBoxcolor-item" v-for="(img,index) in picType.bussImageList" v-dragging="{ item: img, list: picType.isAmend?picTypes[ind].bussImageList:[], group: 'id'+ ind }" :key="index">
              <div class="img">
                <img @click="showImage(picType,img,index)" :style="'transform: rotateZ('+img.imgRotate+'deg)'" :src="img.thumbnailUrl" v-if="img.fileType == 'png' || img.fileType == 'jpg'|| img.fileType == 'jpeg' || img.fileType == 'gif' || img.fileType == 'svg'">
                <img :src="localImageUrl(img.fileType)" v-else @click="showFile(img)">

              </div>
              <div class="operationalData" v-if="picType.isAmend" v-show="img.fileType == 'png' || img.fileType == 'jpg'|| img.fileType == 'jpeg' || img.fileType == 'gif' || img.fileType == 'svg'">
                <div class="rotate" >
                  <!--@click="rotateImage(img)"-->
                  <button class="rotateBtn" @click="rotateImage(img)"></button>
                </div>
                <div class="quality">
                  <input class="qualityInput" v-model="img.quality" @keyup="qualityTextChange(img.quality,ind,index)" type="text">%
                </div>
              </div>
              <i v-if="details == false ? false :true" v-show="picType.isDelete" class="delBtn" title="删除" @click="delImg(img,picType,ind)"></i>
            </div>
          </div>
        </div>
        <div class="imgTableright">
          <!--操作栏-->
          <div class="discription">
            <el-button v-if="details == false ? false:true" type="text" @click="load(picType,ind)">上传</el-button>
            <el-button v-if="!picType.isDelete && picType.bussImageList.length > 0" type="text" @click="delBtn(picType,'amend',false,ind)">编辑</el-button>
            <el-button v-if="picType.isDelete" type="text" @click="delBtn(picType,'finish',false,ind)">完成</el-button>
            <el-button v-if="!picType.cover && coverBol"  type="text"  @click="cover(picType)">覆盖</el-button>
            <el-button v-if="picType.cover && coverBol"  type="text" disabled >已覆盖</el-button>
            <el-button type="text" @click="browse(picType)">浏览</el-button>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "image-his-com",
    props: {
      details: "",
      dataType: "",
      taskType: "",
      custId: "",
      otherNo:'',
      flowId: "",
      coverBol:{
        type:Boolean,
        default:false
      },
      _imageTypeArr: []
    },
    computed:{
    },
    data() {
      return {
        showImageBoxBol:false,
        //多选框绑定选中的图片类型
        imageType: [],
        picTypes: [],
        picType: "",
        activeImageTypeObj: {},
        uploadIndex: 0,
        delCode: "",
        imageTypeArr: [],
        imgRotateZ:0,
        bigFiles:[],
        allImageUrls:[],
        nowImageUrlIndex:'',
        scale:1,
        fullscreenLoading:false,
        fullscreenLoading_text:`正在准备上传,请耐心等待...`,
        interval:null
      }
    },
    methods: {
      cover(imageType){
        this.$http({
          url:'/flowImage/coverImage',
          data:{
            bussNo:this.$route.query.bussNo,
            flowId:this.flowId,
            custId:this.custId?this.custId:'',
            dataType:imageType.dataType,
            imageType:imageType.imageType,
            imageName:imageType.name,
          },
          callback:res=>{
            this.$message.success('覆盖成功');
            for (let i = 0, j = this.picTypes.length; i < j; i++) {
              if (this.picTypes[i].imageType === imageType.imageType) {
                this.$set(this.picTypes[i], "cover", true);
              }
            }
          }
        })
      },
      localImageUrl (fileType) {
        if(fileType == 'doc' ||fileType == 'docx'){
          return this.localImgUrl.word
        }else if(fileType == 'xls' ||fileType == 'xlsx'){
          return  this.localImgUrl.excel
        }else if(fileType == 'txt'){
          return  this.localImgUrl.txt
        }else if(fileType == 'pdf'){
          return  this.localImgUrl.pdf
        }else if(fileType == 'wma' ||fileType == 'mp3' ||fileType == 'ogg' ||fileType == 'mid' ||fileType == 'wav' ||fileType == 'mpa' ||fileType == 'm4a'){
          return  this.localImgUrl.audio
        }else if(fileType == 'aiff' ||fileType == 'avi' ||fileType == 'mov' ||fileType == 'mpeg' ||fileType == 'mpg' ||fileType == 'ram' ||fileType == 'mp4'){
          return  this.localImgUrl.video
        }else{
          return  this.localImgUrl.otherFiles
        }
      },
      qualityTextChange(content,ind,index){
        let text = content.replace(/\D/g,'');
        if(text * 1 > 100 || text * 1 < 1){
          text = '';
          this.$message({
            type:'success',
            message:"压缩比应为1-100的整数字",
            duration:1500,
            showClose:1
          })
        }
        this.$set(this.picTypes[ind].bussImageList[index],'quality',text);
      },

      //旋转图片
      rotateImage(imageInfo){
        imageInfo.imgRotate=90 + imageInfo.imgRotate * 1;
        if(imageInfo.imgRotate >= 360){
          imageInfo.imgRotate = 0
        }
      },
      // 点击展示查看图片的浮窗
      showImage(fileList, img,i) {
        let imgList = [];
        // 过滤文件类型
        for (let i = 0, j = fileList.bussImageList.length; i < j; i++) {
          let fileType = fileList.bussImageList[i].fileType
          if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'svg') {
            imgList.push(fileList.bussImageList[i].url)
          }
        }
        let nowImageIndex = imgList.indexOf(img.url);
        window.bus.$emit('changeIsImageBoxShow',imgList,nowImageIndex);
        return;
      },
      downLoadFile(img, type, index) {
        if (type == "doc" || type == "xls") {
          this.$refs["downLoad_" + type + index][0].click();
        }
      },
      // 初始化图片
      initImageBefore() {
        // 查询imageTypeList
        $.get(this._path + "/flowImage/getImageListByTaskTypeAndDataTypeFlow", { dataType: this.dataType,taskType:this.taskType,flowId:this.flowId,custId:this.custId?this.custId:'',}, res => {
          if (res.resultCode == "0000") {
            let imageTypeList = res.data.imageTypeList;
            this.imageTypeArr = imageTypeList;
            this.initImage(this.imageTypeArr);
          } else {
            this.requestError(res, this);
          }
        });
      },
      initImage(imageTypeList) {
        // 初始化图片
        if(this.custId && this.custId === '?'){
          setTimeout(()=>{
            this.initImage(imageTypeList)
          },100)
        }else{
          this.imageTypeArr = this.picTypes = JSON.parse(JSON.stringify(imageTypeList));
          for (let i = 0, j = imageTypeList; i < j.length; i++) {
            let params = {
              dataType: imageTypeList[i].dataType,
              flowId: this.flowId,
              imageType: imageTypeList[i].imageType,
              taskType: this.taskType,
              custId: this.custId ? this.custId : "",
              otherNo:this.otherNo ? this.otherNo : ""
            };
            this.queryImage(i,params,(bussImageList)=>{
              if(bussImageList.length > 0){
                this.imageType.push(this.picTypes[i].imageType);
              }
            })
          }
        }
      },
      queryImage(index,data,callback){
        this.$http({
          url:'/flowImage/queryFlowImage',
          type:'get',
          data,
          callback:res=>{
            if(res.data.flowImageList){
              for(let i = 0;i < res.data.flowImageList.length;i++){
                res.data.flowImageList[i].imgRotate = '0'
              }
            }
            this.$set(this.picTypes[index], "bussImageList", res.data.flowImageList);

            if(callback){
              callback(res.data.flowImageList)
            }
          }
        })
      },
      showFile(img) {
        let params = {
          fileType: img.fileType,
          imgURL: img.url,
          imgName: img.name
        };
        StandardPost2NewWindow(
          this._path + "/flowImage/showFileInNewWindow",
          params
        );
      },
      load(picType,index) {
        this.activeImageTypeObj = picType;
        this.uploadIndex = index;
        this.$refs.searchDom.click();
      },
      delBtn(picType, type,bol,index) {
        if (type == "amend") {
          if(picType.bussImageList.length === 0){
            this.imageType.splice(this.imageType.indexOf(picType.imageType),1);
            return
          }
          for (let i = 0, j = this.picTypes.length; i < j; i++) {
            if (this.picTypes[i].imageType == picType.imageType) {
              if(this.picTypes[i].bussImageList.length > 0){
                this.$set(this.picTypes[i], "isDelete", true);
                this.$set(this.picTypes[i], "isAmend", true);
              }
            }
          }
        }
        if (type == "finish") {
          let orderList = [];
          picType.bussImageList.map((option)=>{
            let o = {
              id:option.id,
              quality:option.quality,
              rotate:option.rotate * 1 + option.imgRotate * 1
            }
            orderList.push(o)
          })
          let params = {
            taskType:this.taskType,
            dataType:picType.dataType,
            imageType:picType.imageType,
            orderList:JSON.stringify(orderList)
          }
          for(let i = 0;i < picType.bussImageList.length;i++){
            if(!picType.bussImageList[i].quality){
              this.$message({
                type:'success',
                message:`请输入${picType.name}第${i+1}个文件的压缩比例`,
                duration:3000,
                showClose:1
              })
              return
            }
          }
          if(bol){
            return
          }
          $.post(this._path + '/flowImage/save',params,res=>{
            if (res.resultCode == "0000") {
              let params = {
                dataType: picType.dataType,
                flowId: this.flowId,
                imageType: picType.imageType,
                taskType: this.taskType,
                custId: this.custId ? this.custId : "",
                otherNo:this.otherNo ? this.otherNo : ""
              };
              this.queryImage(index,params,(bussImageList)=>{
                this.$set(this.picTypes[index], "bussImageList",bussImageList);
                this.$set(this.picTypes[index], "isDelete", false);
                this.$set(this.picTypes[index], "isAmend", false);

              })
            } else {
              this.requestError(res, this);
            }
          })

        }
      },
      delImg(img, picType,index) {
        let params = {
          imageId: img.id,
          flowId: this.flowId,
          dataType: picType.dataType,
          imageType: picType.imageType,
          taskType: this.taskType,
          custId: this.custId ? this.custId : "",
          otherNo:this.otherNo ? this.otherNo : ""
        };
        $.post(this._path + "/flowImage/deleteFlowImage", params, res => {
          if (res.resultCode == "0000") {
            this.$message({
              type: "success",
              message: "删除成功",
              duration: 1500,
              showClose: 1
            });
            let data = {
              dataType: picType.dataType,
              flowId: this.flowId,
              imageType: picType.imageType,
              taskType: this.taskType,
              custId: this.custId ? this.custId : ""
            };
            this.queryImage(index,data,(bussImageList)=>{
              if (bussImageList.length === 0) {
                this.imageType.splice(this.imageType.indexOf(picType.imageType),1);
                this.delBtn(picType,'finish',true);
                this.$set(this.picTypes[index],'isDelete',false);
                this.$set(this.picTypes[index],'isAmend',false)
              }
            })
          } else {
            this.requestError(res, this);
          }
        });
      },

      onUpload(e) {
        var formData = new FormData();
        if (e.target.files.length == 0) {
          return;
        }
        let sizeOfFiles = 0
        let filesLength = e.target.files.length
        for (let i = 0, j = e.target.files.length; i < j; i++) {
          let sizeOfFile =e.target.files[i].size/1024/1024
          sizeOfFiles = sizeOfFiles + sizeOfFile
          formData.append(e.target.files[i].name, e.target.files[i]);
        }
        formData.append("flowId", this.flowId);
        formData.append("dataType", this.activeImageTypeObj.dataType);
        formData.append("imageType", this.activeImageTypeObj.imageType);
        formData.append("taskType", this.taskType);
        formData.append("custId", this.custId ? this.custId : "");
        formData.append("otherNo", this.otherNo ? this.otherNo : "");
        this.fullscreenLoading = true;
        this.fullscreenLoading_text = `正在准备上传,请耐心等待...`;
        $.ajax({
          url: this._path + "/flowImage/uploadFile",
          type: "POST",
          dataType: "json",
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          success: res => {
            this.clearInterval()
            this.fullscreenLoading = false;
            $.post(this._path + '/businessImage/clearUploadPercent');
            if(res.resultCode === '0000'){
              this.$message({
                type: "success",
                message: "上传成功",
                duration: 1500,
                showClose: 1
              });
              let data = {
                dataType: this.activeImageTypeObj.dataType,
                flowId: this.flowId,
                imageType: this.activeImageTypeObj.imageType,
                taskType: this.taskType,
                custId: this.custId ? this.custId : "",
                otherNo:this.otherNo ? this.otherNo : ""
              };
              this.queryImage(this.uploadIndex,data)
            }else{
              this.requestError(res,this)
            }

          },
          error: err => {
            this.clearInterval();
            this.$alert("上传失败！原因可能为：\n" +
              "1、该影像文件太大，上传时间已超过2分钟，请刷新当前页面，查看该影像的最新上传动态，若刷新后发现影像正常上传，请忽略“上传失败”提示！\n" +
              "2、网络中断，请检查网络连接状态",'提示信息',{
              confirmButtonText:'确认',
              callback:action => {

              }
            })
          }
        });
// 添加进度条
        this.interval = setInterval(this.showPercent,500)
        e.target.value = "";
      },
      clearInterval(){
        clearInterval(this.interval)
      },
      showPercent() {
        $.ajax( {
          type : "GET",
          async : false,
          url : this._path + "/businessImage/getUploadPercent",
          dataType : "json",
          success : (res) =>{
            if(res.data.end == 0){
              if(res.data.number == 0){
                this.fullscreenLoading_text = '正在准备上传,请耐心等待...'
              }else{
                this.fullscreenLoading_text = `正在上传第${res.data.number}个文件(${res.data.percent}%)`;
              }
            }else{
              // this.fullscreenLoading = false
              this.clearInterval()
            }

          },
          error : (data) => {

          }
        });
      },
      // 点击按钮添加
      addImageType() {
        if (!this.imageType) {
          this.$message({
            type: "warning",
            message: "请选择图片类型",
            duration: 1500,
            showClose: 1
          });
          return;
        }
        for (let i = 0, j = this.imageTypeArr.length; i < j; i++) {
          if (this.imageType == this.picTypes[i].imageType) {
            if (this.picTypes[i].bussImageList.length == 0) {
              this.picTypes[i].bussImageList = [{}];
            }
          }
        }
        this.dialogVisible = false;
      },
      //  点击浏览按钮
      browse (ss) {
        let {href} = this.$router.resolve({
          path:'/browseImage',
          query: {
            dataType:ss.dataType,
            imageType:ss.imageType,
            flowId:this.flowId,
            taskType:this.taskType,
            custId: this.custId
          }
        })
        window.open(href, '_blank')

      }
    },
    mounted () {
      this.$dragging.$on('dragged', ({ value }) => {
      })
      this.$dragging.$on('dragend', () => {

      })

     /* window.bus.$on('queryImage',(params)=>{
        $.get(this._path + "/flowImage/queryFlowImage", params, res => {
          if (res.resultCode == "0000") {
            for(let i = 0;i < res.data.bussImageList.length;i++){
              res.data.bussImageList[i].imgRotate = '0';
            }
            for (let i = 0, j = this.picTypes.length; i < j; i++) {
              if (this.picTypes[i].imageType == params.imageType) {
                this.$set(this.picTypes[i], "bussImageList", res.data.bussImageList);
              }
            }
            if(this.imageType.indexOf(params.imageType) === -1){
              this.imageType.push(params.imageType);
            }
          } else {
            this.requestError(res, this);
          }
        });
      })*/

    },
    created() {
      this.initImageBefore();
    }
  };
  function StandardPost2NewWindow(url, args) {
    var body = $(document.body);
    var form = $("<form method='post' target='_blank'></form>");
    var input;
    form.attr({
      action: url
    });
    if (args) {
      $.each(args, function (key, value) {
        input = $("<input type='hidden'>");
        input.attr({
          name: key
        });
        input.val(value);
        form.append(input);
      });
    }
    form.appendTo(body);
    form.submit();
  }

</script>
<style scoped>
  @import "./picModule.css";
</style>

