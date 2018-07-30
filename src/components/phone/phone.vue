<template>
    <div>
      phone
      <button @click="routerpush('iphone')">iphone</button>
      <button @click="routerpush('huawei')">huawei</button>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "phone",
      methods :{
        routerpush(path){
          this.$router.push({
            name:'huawei',
            params:{
              id:1,
              name:4
            },
            query:{
              username:'123123123'
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
