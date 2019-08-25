<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="任务列表">
        <taskList></taskList>
      </el-tab-pane>
      <el-tab-pane label="日常检查记录表">
        <onSiteInspectionRecords></onSiteInspectionRecords>
      </el-tab-pane>
      <el-tab-pane label="责令改正通知单">
        <noticeOfOrderingCorrection></noticeOfOrderingCorrection>
      </el-tab-pane>
      <el-tab-pane label="整改反馈单">
        <rectificationFeedbackList></rectificationFeedbackList>
      </el-tab-pane>
    </el-tabs>
    <br />
  </div>
</template>

<script>
  import noticeOfOrderingCorrection from "./components/noticeOfOrderingCorrection";
  import taskList from "./components/taskList";
  import rectificationFeedbackList from "./components/rectificationFeedbackList";
  import onSiteInspectionRecords from "./components/onSiteInspectionRecords";
  export default{
    components: {
        noticeOfOrderingCorrection,
        taskList,
        rectificationFeedbackList,
        onSiteInspectionRecords
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
</style>
