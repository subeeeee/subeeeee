<template>
  <div class="applications-wrap clearFloat">

    <router-link :to="item.path" :key="index" v-for="(item,index) in routerList" class="applications-item floatLeft" :class="item.className"  :active-class="item.classNameSel" >
      <span>{{item.name}}</span>
    </router-link>
<!--    :class="'router-link-exact-active'? item.classNameSel :item.className"-->
  </div>
</template>

<script>

  export default {
    name: "applications",
    data() {
      return {
        routerList: [
          {
            "path": "/",
            "name": "储备粮管理",
            "className": "cbl",
            "classNameSel": "cblSel",
          },
          {
            "path": "/2",
            "name": "粮食储备处",
            "className": "lscb",
            "classNameSel": "lscbSel",
          },
          {
            "path": "/3",
            "name": "监督检查平台",
            "className": "jdjc",
            "classNameSel": "jdjcSel",
          },
          {
            "path": "/4",
            "name": "监督检查处",
            "className": "jdjcc",
            "classNameSel": "jdjccSel",
          },
          {
            "path": "/5",
            "name": "综合调控处",
            "className": "zhtk",
            "classNameSel": "zhtkSel",
          },
          {
            "path": "/6",
            "name": "政策法规处",
            "className": "zcfg",
            "classNameSel": "zcfgSel",
          },
          {
            "path": "/7",
            "name": "交易管理",
            "className": "jygl",
            "classNameSel": "jyglSel",
          },
          {
            "path": "/8",
            "name": "质量管理",
            "className": "zlgl",
            "classNameSel": "zlglSel",
          },

          {
            "path": "/9",
            "name": "涉粮企业管理",
            "className": "slqy",
            "classNameSel": "slqySel",
          },
        ]
      }
    }
  }
</script>

<style scoped>
  .applications-wrap {
    border: 1px solid #2A5199;
    height: 110px;
    padding: 10px;
    border-top: none;
  }

  .applications-item {
    display: inline-block;
    width: 90px;
    text-align: center;
    margin-right: 45px;
    color: #000;
    height: 100px;

  }

  .applications-item img {
    width: 76px;
  }

  .applications-item span {
    display: inline-block;
    margin-top: 80px;
  }

  .applications-wrap a:last-child {
    margin-right: 0;
  }

  /*  .applications-item:visited {
      color: #000;
      text-decoration: none;
    }

    .applications-item:hover {
      color: #000;
      text-decoration: none;
    }

    .applications-item:active {
      color: #000;
      text-decoration: none;
    }*/
  .cbl {
    background: url("./img/cbl.png") no-repeat center top;
  }

  .cblSel {
    background: url("./img/cbl-sel.png") no-repeat center top;
  }

  .lscb {
    background: url("./img/lscb.png") no-repeat center top;
  }

  .lscbSel {
    background: url("./img/lscb-sel.png") no-repeat center top;
  }

  .jdjc {
    background: url("./img/jdjc.png") no-repeat center top;
  }

  .jdjcSel {
    background: url("./img/jdjc-sel.png") no-repeat center top;
  }

  .jdjcc {
    background: url("./img/jdjcc.png") no-repeat center top;
  }

  .jdjccSel {
    background: url("./img/jdjcc-sel.png") no-repeat center top;
  }

  .zhtk {
    background: url("./img/zhtk.png") no-repeat center top;
  }

  .zhtkSel {
    background: url("./img/zhtk-sel.png") no-repeat center top;
  }

  .zcfg {
    background: url("./img/zcfg.png") no-repeat center top;
  }

  .zcfgSel {
    background: url("./img/zcfg-sel.png") no-repeat center top;
  }

  .jygl {
    background: url("./img/jygl.png") no-repeat center top;
  }

  .jyglSel {
    background: url("./img/jygl-sel.png") no-repeat center top;
  }

  .zlgl {
    background: url("./img/zlgl.png") no-repeat center top;
  }

  .zlglSel {
    background: url("./img/zlgl-sel.png") no-repeat center top;
  }

  .slqy {
    background: url("./img/slqy.png") no-repeat center top;
  }

  .slqySel {
    background: url("./img/slqy-sel.png") no-repeat center top;
  }

</style>
