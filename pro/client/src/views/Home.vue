<template>
  <div class="home">
    <h1>home</h1>
    <button @click="request">request</button>
    <br>
    <button @click="requestName">requestName</button>
  </div>
</template>

<script>
  import requestMock from './../api/api'

export default {
  name: "home",
  components: {
  },
  methods:{
    request(){
      requestMock.getdata()
    },
    requestName(){
      requestMock.getName()
    }
  }
};
</script>
