<template>
  <div>
    <button @click="btnclick('excel')">excel</button>
    <button @click="btnclick('read-excel')">readExcel</button>
  </div>
</template>

<script>
  export default {
    name: "demo-list",
    methods:{
      btnclick(route){
        this.$router.push({
          name:route
        })
      }
    }
  }
</script>

<style scoped>


</style>
