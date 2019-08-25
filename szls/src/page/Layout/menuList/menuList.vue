<template>
  <div class="menuList-wrap">
    <el-scrollbar class="live-scrollbar">
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#F4F5F8"
        text-color="#797979"
        unique-opened
        active-text-color="#fff">

        <Menu-item :routes="routes"></Menu-item>
      </el-menu>
    </el-scrollbar>
  </div>


</template>

<script>
  import MenuItem from "@/page/Layout/menuList/menuItem"

  export default {
    name: "menuList",
    components: {
      MenuItem,
    },
    computed: {
      routes() {
        // 拿到业务管理数据
        const myroutes = JSON.parse(sessionStorage.getItem('xzdata'))
        
        //if (!myroutes) return;
        // const routes = myroutes.children[0].children||this.menuData
        const routes = this.menuData;
        return routes
      },
    },
    data() {
      return {
        menuData: [
          {
            "version": 0,
            "stateCode": 1,
            "createDate": null,
            "creatorCode": null,
            "creator": null,
            "refreshTime": null,
            "refresher": null,
            "refresherCode": null,
            "remark": null,
            "resourceCode": "RM1001007001001",
            "resourceName": "执法人员培训管理",
            "parentCode": "RM1001007001",
            "resourceType": "10440001",
            "resourceIndex": 1,
            "resourcePic": null,
            "functionPic": null,
            "resourceExpic": null,
            "resourceDesc": null,
            "resourceUrl": null,
            "resourceTable": null,
            "resourceKey": null,
            "children": [
              {
                "version": 2,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001001001",
                "resourceName": "执法人员资质申请",
                "parentCode": "RM1001007001001",
                "resourceType": "10440001",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/applyList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              },
              {
                "version": 2,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001001001",
                "resourceName": "执法人员资质审核",
                "parentCode": "RM1001007001001",
                "resourceType": "10440001",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/reviewList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              },
              {
                "version": 2,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001001001",
                "resourceName": "执法人员资质培训",
                "parentCode": "RM1001007001001",
                "resourceType": "10440001",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/trainingList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              },
              {
                "version": 2,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001001001",
                "resourceName": "执法人员资质考核",
                "parentCode": "RM1001007001001",
                "resourceType": "10440001",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/assessmentList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              },
              {
                "version": 2,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001001001",
                "resourceName": "证书发放",
                "parentCode": "RM1001007001001",
                "resourceType": "10440001",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/certificateList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              }
            ]
          },
          {
            "version": 0,
            "stateCode": 1,
            "createDate": null,
            "creatorCode": null,
            "creator": null,
            "refreshTime": null,
            "refresher": null,
            "refresherCode": null,
            "remark": null,
            "resourceCode": "RM1001007001002",
            "resourceName": "执法人员证书管理",
            "parentCode": "RM1001007002",
            "resourceType": "10440002",
            "resourceIndex": 1,
            "resourcePic": null,
            "functionPic": null,
            "resourceExpic": null,
            "resourceDesc": null,
            "resourceUrl": null,
            "resourceTable": null,
            "resourceKey": null,
            "children": [
              {
                "version": 0,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001002",
                "resourceName": "执法人员证书管理",
                "parentCode": "RM1001007002",
                "resourceType": "10440002",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/certificateManagementList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              },
              {
                "version": 0,
                "stateCode": 1,
                "createDate": null,
                "creatorCode": null,
                "creator": null,
                "refreshTime": null,
                "refresher": null,
                "refresherCode": null,
                "remark": null,
                "resourceCode": "RM1001007001002",
                "resourceName": "执法人员证书审核",
                "parentCode": "RM1001007002",
                "resourceType": "10440002",
                "resourceIndex": 1,
                "resourcePic": null,
                "functionPic": null,
                "resourceExpic": null,
                "resourceDesc": null,
                "resourceUrl": '/certificateAuditList',
                "resourceTable": null,
                "resourceKey": null,
                "children": []
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .menuList-wrap {
    height: 500px;
  }

  .live-scrollbar {
    height: 100%;
  }

  /*   隐藏 横向滚动条*/
  .el-scrollbar /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }

</style>
