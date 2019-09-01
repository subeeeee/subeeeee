<template>
  <div>
    <button @click="changeRouter">vuex-learn</button>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    changeRouter(){
      this.$router.push({
        name:'vuex_father',
        params:{
          name:'vuex_father',
          code:'1'
        }
      })
    }
  }
}

</script>

<style scoped>
</style>
