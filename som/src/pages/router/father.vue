<template>
  <div>
    <button v-for="btn in btns" :key="btn.index" @click="CHANGE_ROUTE_SON_NAME(btn)" style="margin-right: 10px;">{{btn.name}}</button>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "father",
    data(){
      return{
        btns:[
          {index:'1',name:'son1',params:{name:'Tom',f_name:'TTT'}},
          {index:'2',name:'son2',params:{name:'Jat',f_name:'JJJ'}},
          {index:'3',name:'son3',params:{name:'May',f_name:'MMM'}}
        ]
      }
    },
    methods:{
      ...mapMutations(['CHANGE_ROUTE_SON_NAME']),
    }
  }
</script>

<style scoped>

</style>
