<template>
  <div class="vuex-father">
    {{'name: '+$route.params.name}}<br>
    {{'code: '+$route.params.code}}<br>
    <button @click="count">count++</button>
    <button @click="addCount">mapMutations</button>
    <button @click="ASYNC_ADD_COUNT">异步执行</button>
    <button @click="async_add_count">异步执行后回调结果</button>
    <vuex-son></vuex-son>

  </div>
</template>

<script>
  import VuexSon from "./son";
import {mapMutations,mapActions} from 'vuex'
  export default {
    components: {VuexSon},
    name: 'vuex-father',
    data () {
      return {

      }
    },
    methods:{
      count(){
        this.$store.commit('ADD_COUNT');
      },
      async_add_count(){
        this.$store.dispatch('ASYNC_ADD_COUNT').then(count=>{
          alert(`异步添加成功,结果是${count}`)
        })
      },
      ...mapMutations ({
        addCount:'ADD_COUNT'
      }),
      ...mapActions(['ASYNC_ADD_COUNT'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
