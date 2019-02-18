<template>
  <div>
    <button @click="btnclick('excel')">excel</button>
  </div>
</template>

<script>
  export default {
    name: "demo-list",
    methods:{
      btnclick(params){
        this.$router.push({
          name:'excel'
        })
      }
    }
  }
</script>

<style scoped>


</style>
