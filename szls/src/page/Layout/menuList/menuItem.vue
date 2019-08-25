<template>
  <div class="menuItem-wrapper">
    <template v-for="(item,index) in routes">
        <el-menu-item v-if="item.children.length === 0" :index="item.resourceUrl" :class="{'submenu-title-noDropdown':!isNest}" >
         <span class="iconfont icondian iconStyle" ></span>
          <span v-if="item.resourceName" slot="title" class="test">{{item.resourceName}}</span>
        </el-menu-item>
      <el-submenu v-else :index="index + ''" :key="item.resourceCode">
        <template slot="title">
          <span class="iconfont icondian iconStyle"></span>
          <span v-if="item.resourceName" slot="title">{{item.resourceName}}</span>
        </template>
<!--        <template  >-->
<!--          <router-link :key="child.resourceCode" :to="child.resourceUrl">-->
            <el-menu-item :index="child.resourceUrl" v-for="(child,childIndex) in item.children" :key="childIndex">
              <span  v-if="child.resourceName" slot="title">{{child.resourceName}}</span>
            </el-menu-item>
<!--          </router-link>-->
<!--        </template>-->
      </el-submenu>
    </template>
   <!-- <template v-for="(item,itemIndex) in routes">
      <el-menu-item :index="item.resourceUrl" v-if="item.children.length === 0"  >
        <i class="iconfont icon-shouye"></i>
        <span slot="title">{{item.resourceName}}</span>
      </el-menu-item>

      <el-submenu :index="itemIndex+''" v-else >
        <template slot="title">
          <i class="iconfont icon-zonghechaxun"></i>
          <span>{{item.resourceName}}</span>
        </template>
        <template v-for="(items,itemsIndex) in item.children">
          <el-menu-item :index="items.resourceUrl" v-if="items.children.length === 0"  >
            <i class="iconfont icon-wenjianjia"></i>
            {{items.resourceName}}
          </el-menu-item>
          <el-submenu :index="itemIndex+'-'+itemsIndex" v-else >
            <template slot="title"><i class="iconfont icon-wenjianjia"></i>{{items.resourceName}}</template>
            <el-menu-item :index="items1.resourceUrl" v-if="items1.children.length === 0" v-for="(items1,itemsIndex1) in items.children" :key="items1.powerId">
              <i class="iconfont icon-dian"></i>
              {{items1.resourceName}}
            </el-menu-item>
            <el-submenu :index="itemIndex+'-'+itemsIndex+'-'+itemsIndex1" v-if="items1.children.length !== 0" v-for="(items1,itemsIndex1) in items.children" :key="items1.powerId">
              <template slot="title"><i class="iconfont icon-wenjianjia"></i>{{items1.resourceName}}</template>
              <el-menu-item :index="items2.resourceUrl" v-if="items2.children.length === 0" v-for="(items2,itemsIndex1) in items1.children" :key="items2.powerId">
                <i class="iconfont icon-dian"></i>
                {{items2.resourceName}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </template>

      </el-submenu>

    </template>-->
  </div>
</template>

<script>
    export default {
        name: "menuItem",
      props: {
        routes: {
          type: Array
        },
      },
        data() {
          return {
          }
        },
      created(){
          console.log(this.routes)
      },
        methods: {}

      }
</script>

<style scoped>
.router-link-active {
    text-decoration: none;
}
.iconStyle {
  color: #0357AB!important;
  font-size: 20px
}
</style>
