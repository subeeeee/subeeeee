<template>
  <div>
    <button @click="vuexRouterChange">vuex-learn</button>
    <button @click="axiosRouterChange">axios-learn</button>
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{
      vuexRouterChange(){
        this.$router.push({
          name:'vuex_father',
          params:{
            name:'vuex_father',
            code:'1'
          }
        })
      },
      axiosRouterChange(){
        this.$router.push({
          name:'axios_learn',
          params:{
            pagename:'axios_learn',
            code:'1'
          }
        })
      }
    }
  }

</script>

<style scoped>
</style>
