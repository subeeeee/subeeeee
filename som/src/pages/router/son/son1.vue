<template>
  <div>
    我是son1

    进入页面检测parent是{{$route.params.f_name}}
    <br>
    {{son1_content}}

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "son1",
    data(){
      return{
        son1_content:''
      }
    },
    computed:{
      ...mapGetters(['router_change_name'])
    },
    methods:{
      reloadRouterState(to,from){
        if(to.params.f_name === 'f_name_1'){
          this.son1_content = '从主页跳转过来的'
        }else{
          this.son1_content = '在本页面切换'
        }
      }
    },
    beforeRouteEnter(to,from,next){
      console.log(to,from,next)
      next(vm=>{
        vm.reloadRouterState(to,from)
      })
    },
    beforeRouteUpdate(to,from,next){
      this.reloadRouterState(to,from);
      next()
    },
    beforeRouteLeave(to,from,next){
      let answer = window.confirm('是否跳转到'+ this.router_change_name);
      next(answer)
    }
  }
</script>

<style scoped>

</style>
