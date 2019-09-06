<template>
  <div>
    <button @click="vuexRouterChange">vuex-learn</button>
    <button @click="axiosRouterChange">axios-learn</button>
    <button @click="routeRouterChange">router-learn</button>
    <button @click="flexRouterChange">flex-learn</button>
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
      },
      routeRouterChange(){
        this.$router.push({
          name:'router_son1',
          params:{
            name:'route_son_1',
            f_name:'f_name_1'
          }
        })
      },
      flexRouterChange(){
        this.$router.push({
          name:'flex'
        })
      }
    }
  }

</script>

<style scoped>
</style>
