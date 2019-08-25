<template>
  <div class="headerOa">
    <!--头部-->
    <el-row>
      <el-col :span="24">
        <div>
          <div class="head-bj">
            <div class="logo">
              <div style="height:90px;">
                <img src="./img/tjLogo.svg" style="width: 90px;height: 90px;display: inline-block;" />
                <img src="./img/head.svg" style="width: 900px;height: 90px;display: inline-block;" />
              </div>
            </div>

            <!--用户头像-->
            <!-- <div class="user-avatar">
              <img src="../indexBusinessImages/user.png" alt="1" style="border-radius:50%;background:#fff">
              <span style="font-size:13px;color:#fff;margin-left:5px">张仁明</span>
              <i class="iconfont icon-xiala1" style="color:#fff;margin-left:5px"></i>
              <i class="iconfont icon-xinfeng" style="color:#fff"></i>
            </div> -->

            <!-- 遮盖层 如果导航_面包屑bug可以解决 此div可以删除 -->
            <!-- <div id="zgaiceng" class="zgaiceng"></div> -->
            <!--头部导航-->

            <div class="operateBox">
              <span>欢迎！{{loginPeople}}</span>
              <a @click="goHome" style="cursor: pointer;"><i class="iconfont icon-cangku"></i>平台主页</a>
              <a @click="logout" style="cursor: pointer;"><i class="iconfont icon-tuichu"></i>退出</a>
            </div>

          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :span="24">
      <div class="tjnav">

        <div style="margin: 0 auto;width:1200px;height:49px;position:relative;top:-10px;">
          <div class="leftNav">
            <!-- <div style="float:left"></div> -->
          </div>
          <template v-if="xzdata">
            <!-- <div class="icon-left " v-show="xzdata.children.length>6" @click="translate(true)" :class="isleft?'isleft':''"></div> -->
            <div class="menu" id="menu">
              <ul class="menu-navHome">
                <li class="nav-child" @mouseover="changeMaskOver(item)"  @mouseout="changeMaskOut()"  v-for="(item,index) in xzdata" :key="item.key"
                    :class="isClick==index ?'click_back':''">
                  <!-- <i class="iconfont" :class="item.icon" style="font-size:14px;margin-right:0"></i> -->
                  <a style="color: #fff;" :href="item.url" target="_blank">{{item.name}}</a>
                </li>
              </ul>
            </div>
            <!-- <div class="icon-right" v-show="xzdata.children.length>6" @click="translate(false)" :class="isright?'isright':''"></div> -->
          </template>
          <el-col class="rigthNav">
            <!-- <div style="float:left" ></div> -->
          </el-col>
        </div>
      </div>
    </el-row>
    <div class="menuList"  v-show="flag" @mouseover="changeMaskOver()"  @mouseout="changeMaskOut()" >
      <Applications></Applications>
    </div>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import { loginUrl } from '@/api/index.build'
  import Applications from "@/components/common/applications"
  export default {
    components: {
      Applications
    },
    data() {
      return {
        flag: false,
        loginPeople: '',
        isClick: 0,
        leftNum: 0,
        rightNum: 0,
        isleft: false,
        isright: true,
        xzdata: [{
          name: '首页',
          key: 0,
          url: '/'
        },{
          name: '政务管理',
          key: 1,
          url: 'http://117.50.54.75:88/wui/index.html#/main/portal/portal-3-1?_key=12nfpg'
        },{
          name: '业务管理',
          key: 2,
          url: 'http://218.241.206.66:8097/web/business/#/'
        },{
          name: '指挥调度',
          key: 3,
          url: '/'
        },{
          name: '辅助决策',
          key: 4,
          url: '/'
        },{
          name: '系统管理',
          key: 5,
          url: 'http://218.241.206.66:8097/web/myuser/#/userManager/userManagerHome'
        }]
      }
    },
    computed: {
      // ...mapGetters(['data', 'sidebar', 'index']),
      // ...mapGetters(['sidebar', 'index'])
      // navData() {
      //   console.log('navData', this.data[0].children)
      //   return this.data[0].children

      // }

    },
    methods: {
      welcome() {
        this.loginPeople = sessionStorage.getItem('userName') + '-' + sessionStorage.getItem('deptName') + '-' + sessionStorage.getItem('userTitle') // 昵称
      },
      // 返回total
      goHome() {
        this.isClick = -1;
        window.location.href = 'http://218.241.206.66:8097/web/total/#/'
      },
      // 退出
      logout() {
        // 为了重新实例化vue-router对象 避免bug
        let logoutUrl = sessionStorage.getItem("loginout")
        let hrefUrl = window.location.href.split("#")[0]+ "#/login"
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = loginUrl +"/login/idslogout?targeturl=" + hrefUrl
      },
      // // 退出
      // logout() {
      //   sessionStorage.clear()
      //   localStorage.clear()
      //   // 为了重新实例化vue-router对象 避免bug
      //   window.location.href = location.origin + '/web/total/#/login'
      // },

      //点击哪一个导航内容，就显示哪一个内容下的二级菜单
      changeMaskOver(item){
        this.flag = true
      },
      changeMaskOut(){
        this.flag = false

      }
    },

    created() {
      this.welcome();
    },
    mounted() {
      // if (this.xzdata.children && this.xzdata.children.length != 0) {
      // const ulContainer = document.querySelector('.menu-navHome')
      // ulContainer.style.width = 172 * 7 + 'px'
      // }

      // const menuwidth = document.querySelector('.tjnav');
      // const liWitch = document.getElementsByClassName('leftNav');
      // const liright = document.getElementsByClassName('rigthNav');
      // const num = (menuwidth.offsetWidth - 1032)/2;
      // console.log(num);
      // liWitch[0].style.width = num + 'px';
      // liright[0].style.width = num + 'px';
      // console.log(menuwidth.offsetWidth)
      // console.log(parseInt(menuwidth.offsetWidth/7))
    }
  }
</script>
<style lang="scss" scoped>
  .zgaiceng {
    width: 600px;
    height: 30px;
    background: #145b9b;
    position: absolute;
    top: 105px;
    left: 173px;
  }
  .headerOa {
    overflow-x: hidden;
    // ---------头部--------/-------
    .tjnav{
      width:100%;
      height: 40px;
      margin-top: -14px;
      margin: 0 auto;
      // background-repeat: no-repeat;
      background-color: #006bd5;
      // background-position: center;
    }
    .leftNav{
      position: absolute;
      top: 0;
      left:-8px;
      width:9px;
      height:10px;
      background-repeat: no-repeat;
      background-image: url("./img/left-nav-bg.png");
      // background-position: right;
    }
    .rigthNav{
      position: absolute;
      top: 0;
      right:-13px;
      width:13px;
      height:11px;
      background-repeat: no-repeat;
      background-image: url("./img/right-nav-bg.png");
      // background-position: left;
    }
    .head-bj {
      height: 135px;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("./img/head.png");
      position: relative;
    }
    .head-bj .logo {
      width: 100%;
      position: absolute;
      top: 25px;
      left: 150px;
      // background: url("./img/tjLogo.svg") no-repeat;

      /*left: 114px;*/
      overflow: hidden;
    }
    // .head-bj .logo .logoIma {
    //   font-size: 34px;
    //   color: #f3f3f3;
    //   width: 59px;
    //   height: 58px;
    //   // padding: 12px 0 0 65px;
    //   // background-image: url("../indexBusinessImages/guohui.png");
    //   // background-repeat: no-repeat;
    //   // background-size: contain;
    //   float: left;
    // }
    .head-bj .logo .logoWordes {
      width: 1000px;
      height: 38px;
      // background: url("../indexBusinessImages/zhyw.png")  center top;
      // background: url("./img/head.svg") no-repeat;
      // background: url("../indexBusinessImages/zhyw.png") no-repeat 80% 80%;
      background-size: cover;
      float: left;
      margin: 10px 0 0 160px;
    }
    .head-bj .logo-on {
      width: 226px;
      height: 42px;
      color: #f3f3f3;
      font-size: 14px;
      background-color: #5fac9e;
      border-radius: 15px;
      position: absolute;
      top: 47px;
      right: 124px;
      line-height: 42px;
    }
    .logo-on span:nth-child(1) {
      padding-left: 51px;
      margin-right: 45px;
    }
    .head-bj .head-nav {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.5);
      line-height: 50px;
    }
    .head-nav ul {
      padding-left: 116px;
      list-style: none;
      margin-top: 0px;
    }
    .head-nav li {
      color: #fff;
      font-size: 18px;
      float: left;
      margin-right: 52px;
    }
    // ------注销功能----/----
    .operateBox {
      width: 100%;
      // float: right;
      color: #666666;
      background-color: #fafafa;
      // margin: 5px 20px;
      font-size: 14px;
      text-align: right;
      // padding: 10px 20px;
      border-bottom: 1px solid #e3e2e2;
      a {
        padding: 3px 7px;
        color: #666666;
        // background-color: #145b9b;
        border-radius: 3px;
        margin: 0px 0px 0px 5px;
        &:hover {
          text-decoration: underline;
        }
        i {
          margin: 0px 5px 0px 0px;
        }
      }
    }
    .greetPub {
      font-size: 14px;
      font-weight: 510;
      position: absolute;
      cursor: pointer;
    }
    .greet {
      top: 2px;
      left: 55px;
    }
    .mail {
      top: 1px;
      left: 145px;
    }
    .logFf {
      top: 2px;
      left: 175px;
    }
    .icon-xinfeng {
      font-size: 20px;
    }
    // ------注销功能----\----
    // ---------头部--------\-------
  }
  .menu {
    width: 100%;
    height: 50px;
    line-height: 50px;
    // background-color: #145b9b;
    // position: absolute;
    // top: 50px;
    // right: 40px;
    // margin: 0 auto;
    // left: 167px;

    // background-position: center;
    overflow: hidden;
    list-style: none;
    padding-left: 0px;
    margin: 0;
  }
  .icon-right {
    width: 20px;
    height: 50px;
    position: absolute;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    // top: 50px;
    right: 147px;
    top:-10px;
    // background-color: #145b9b;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 8px;
  }

  .isright {
    background-image: url("./img/right-arrow.png");
  }
  .icon-left {
    width: 20px;
    height: 50px;
    position: absolute;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    left: 147px;
    // top: 50px;
    // right: 820px;
    // background-color: #145b9b;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 8px;
  }
  .icon-left:before {
    content: "";
    width: 1px;
    height: 50%;
    background-image: url("./img/nav_x.png");
    background-repeat: no-repeat;
    background-size: 50% 100%;
    position: absolute;
    top: 25%;
    right: 0px;
  }
  .isleft {
    background-image: url("./img/left-arrow.png");
  }
  .menu .menu-navHome {
    /*left: 114px;*/
    list-style: none;
    padding-left: 0px;
    margin: 0;

    /* Firefox 17- */
  }
  .nav-child {
    background-image: url("./img/center-nav-bg.png");
    width: 200px;
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    float: left;
    line-height: 50px;
    // border-radius: 5px;
    color: #fff;
    text-align: center;
    position: relative;
    font-size: 14px;
  }
  .nav-child:before {
    content: "";
    width: 1px;
    height: 50%;
    background-image: url("./img/nav_x.png");
    background-repeat: no-repeat;
    background-size: 50% 100%;
    position: absolute;
    top: 25%;
    right: 0px;
  }
  .nav-child:hover {
    background-image: url("./img/pre.png");
    color: #fff;
    // border-radius: 4px;
    cursor: pointer;
  }

  .click_back {
    background-image: url("./img/pre.png");
    background-origin: padding-box;
    color: #fff;
    // border-radius: 4px;
    cursor: pointer;
  }
  .user-avatar {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 7px;
  }
  .menuList{
    width: 1200px;
    margin: 0 auto;
  }
</style>

