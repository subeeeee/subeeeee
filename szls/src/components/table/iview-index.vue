<template>
  <div class="main-table">
    <Table stripe border ref="selection" :highlight-row="tableData.highlightRow" :loading="tableData.loading"
           :columns="tableData.columns"
           :data="tableData.data"
           :no-data-text="tableData.noDataText"
           @on-select-all="handleSelecetAll" @on-selection-change="handleSelectionChange"
           @on-current-change="handleCurrentChange"
           @on-row-click="handleRowClick"></Table>
    <div class="page-info" v-if="tableData.page">
      <Page :id="pageId" :current="tableData.page.currentPage"
            :total="tableData.page.total"
            :page-size="tableData.page.pageSize"
            :page-size-opts="[10,20,30,50]"
            @on-change="tableData.page.onChange"
            @on-page-size-change="tableData.page.onPageSizeChange"
            size="small"  show-total
            show-elevator/>
      <div style="margin: 5px;position: relative;top:-8px;display: inline-block;">
        <Button type="primary" size="small" @click="goElevatorPage">跳转</Button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: Object
    },
    data() {
      return {
        pageId: 'page'
      }
    },
    created: function () {
    },
    methods: {
      handleSelecetAll: function (data) {
        this.tableData.handleSelectAll && this.tableData.handleSelectAll(data);
      },
      handleSelectionChange: function (data) {
        this.tableData.handleSelectionChange && this.tableData.handleSelectionChange(data);
      },
      //取消选择
      cancelHandleSelectAll: function (status) {
        this.$refs.selection.selectAll(status);
      },
      handleCurrentChange: function (data) {
        this.tableData.handleCurrentChange && this.tableData.handleCurrentChange(data);
      },
      handleRowClick: function (data) {
        this.tableData.handleRowClick && this.tableData.handleRowClick(data);
      },
      //点击跳转到输入的页码
      goElevatorPage() {
        var evtObj;
        var thisPage = document.getElementById(this.pageId);
        var elevatorDiv = thisPage.getElementsByClassName("ivu-page-options-elevator");
        if (elevatorDiv && elevatorDiv.length > 0) {
          var pageInput = elevatorDiv[0].getElementsByTagName("input")[0];
          if (window.KeyEvent) {//firefox 浏览器下模拟事件
            evtObj = document.createEvent('KeyEvents');
            evtObj.initKeyEvent("keyup", true, true, window, true, false, false, false, 13, 0);
          } else {//chrome 浏览器下模拟事件
            evtObj = document.createEvent('UIEvents');
            evtObj.initUIEvent("keyup", true, true, window, 1);
            delete evtObj.keyCode;
            if (typeof evtObj.keyCode === "undefined") {//为了模拟keycode
              Object.defineProperty(evtObj, "keyCode", {value: 13});
            } else {
              evtObj.key = String.fromCharCode(13);
            }
          }
          pageInput.dispatchEvent(evtObj);
        }
      }

    }
  }
</script>

<style  scoped>

    .page-info {
      margin-top: 10px;
      text-align: right;
    }

    a {
      cursor: pointer;
      color: #2F90C2;
    }
    .ivu-page a {
      color: #515a6e;
    }
    .ivu-page-item-active a {
      cursor: pointer;
      color: #2F90C2;
    }
    /*.ivu-select-arrow{*/
      /*margin-top: 0!important;*/
    /*}*/
    .ivu-page {
      position: relative;
      display: inline-block;
      margin-left: 42px;
    }
    .ivu-page-options .ivu-page-options-sizer {
      position: absolute;
      left: -96px;
    }


</style>
