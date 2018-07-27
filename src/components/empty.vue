<template>
  <div>
    asdfasdfasdfasdf
    <br>
    <button @click="btnclick">jump</button>
  </div>
</template>
<script>
  export default {
    name:'empty',
    methods:{
      btnclick(){
        this.$router.push({
          path : "/phone",
          // name:'HelloWorld',
          params:{
            id:123,
            user:1233232
          }

        })
      }
    }
  }
</script>
