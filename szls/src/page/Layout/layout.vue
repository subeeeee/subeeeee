<template>
    <div class="content-wrap">
      <el-row>
        
        <!-- <BreadCrumb></BreadCrumb> -->
        <div class="project-title iconfont iconchubeiliangguanli"> 储备粮管理</div>
      </el-row>
      <el-row >
        <el-col :span="4">
          <MenuList></MenuList>
        </el-col>
        <el-col :span="20">
          <BreadCrumb></BreadCrumb>
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import MenuList from "@/page/Layout/menuList/menuList"
  import BreadCrumb from "@/components/common/breadcrumb"
  // import Applications from "@/components/common/applications"
    export default {
        name: "layout",
      components: {
        MenuList,
        BreadCrumb,
        // Applications
      },
      data() {
        return {
          id: this.$route.params.id,
          dat: {
            name: 'admin',
            password: 'admin'
          }
        }
      },
    }
</script>

<style scoped>
.content-wrap {
  width: 1200px;
  margin: 0 auto;
}
.project-title {
  color: #fff;
  background: #0357AB;
  line-height: 40px;
  height: 40px;
 padding-left: 10px;
  font-size: 14px;
}

</style>
