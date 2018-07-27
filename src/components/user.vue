<template>
  <div class="hello">
    {{count}}
    {{countPlusLocalState}}
    {{countAlias}}
    <button @click="calculate('+')">+</button>
    <button @click="calculate('-')">-</button>
    <br>
    <button @click="log">console</button>
    <div>
      {{$route.params.id}}
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        localCount:11
      }
    },
    computed: mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
      }
    }),
    methods:{
      calculate (type){
        this.$store.commit('increment',{
          type,
          step:1
        })
      },
      log(){
        console.log(this.$route)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
