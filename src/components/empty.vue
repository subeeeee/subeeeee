<template>
  <div>
    asdfasdfasdfasdf
    <br>
    <button @click="btnclick">jump</button>
    <button @click="btnclick('demo')">其余demo</button>

  </div>
</template>
<script>
  export default {
    name:'empty',
    methods:{
      btnclick(demo){
        if(demo){
          this.$router.push({
            name : "demoList",

          })
          return
        }
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
