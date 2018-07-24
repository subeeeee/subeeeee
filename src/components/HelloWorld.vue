<template>
  <div class="hello">
    {{count}}

    {{msg | sex}}
    <button @click="calculate('+')">+</button>
    <button @click="calculate('-')">-</button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed :{
      count () {
        return this.$store.state.count
      }
    },
    methods:{
      calculate (type){
        this.$store.commit('increment',{
          type,
          step:3
        })
      }
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
