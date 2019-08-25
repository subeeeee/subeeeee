<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <span class="site iconfont iconweizhi">当前位置：</span>
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index" v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== "dashboard") {
        matched = [
          { path: "", meta: { title: "储备粮管理" } }
        ].concat(matched);
      }
      this.levelList = matched;
      // console.log(this.levelList)
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
}
.site {
  color: #0357ab;
  float: left;
}
.el-breadcrumb__item /deep/ .el-breadcrumb__inner,
.el-breadcrumb__item /deep/ .el-breadcrumb__separator {
  color: #0357ab !important;
}
</style>
