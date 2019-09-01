<template>
  <div class="vuex-son">
    {{$store.state.count}}<br>
    {{count}}<br>
    {{excellent}}<br>

    <div>
      <p>查询成绩</p>
      <input type="text" v-model="queryName"/> <button @click="queryResult">查询</button>
      <br>
      {{filterQuery}}
    </div>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
export default {
  name: 'vuex-son',
  data () {
    return {
      queryName:'',
      filterQuery:''
    }
  },
  computed:{
    ...mapState(['count']),
    ...mapGetters(['excellent'])

  },
  methods:{
    queryResult(){
     let resultOfStudent = this.queryName&&this.$store.getters.queryResult(this.queryName);
     this.filterQuery = resultOfStudent?resultOfStudent.score:'未查询到该学生成绩'
    }
  },
  mounted(){
    // console.log(...mapGetters(['excellent']))
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
