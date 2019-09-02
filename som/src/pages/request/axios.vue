<template>
<div>
  {{$route.params.pagename}}<br>
  <button @click="request">request</button>
</div>
</template>

<script>
  import {axiosData} from '@/api/request/axios'
  export default {
    name: "axios-request",
    methods:{
      request(){
      }
    }
  }
</script>

<style scoped>

</style>
