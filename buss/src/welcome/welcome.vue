<template>
  <div class="welcome">
    <div class="userInfo">
    <div class="handPic">
        <img src="./../assets/user.png">
    </div>
    <p class="username">
        {{msg}}
    </p>
    <p class="comeText">欢迎登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      msg: 'welcome'
    }
  },
  beforeCreate () {

  }
}
</script>

<style scoped>
@import './welcome.css';
</style>
