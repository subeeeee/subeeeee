<template>
    <div>
        <h3>如有共借人,请点击下方按钮"新增共借人",并填写对应信息.</h3>
        <p>根据我司风控大纲,以下几种情况需要提供共借人信息:</p>
        <p>1、借款人1年龄在18-23岁之间(包含18岁、23岁)，需新增"父母"为共借人;</p>
        <p>2、借款人1身份证年龄+申请期限大于等于60岁，需新增“子女”为共借人；</p>
        <p>3、借款人婚姻状态为已婚（已婚有子女/已婚无子女），需新增“配偶”为共借人;</p>
        <p>4、若实际用款人不是借款人1（是借款人1的配偶/父母/子女/亲戚朋友/兄弟姐妹），需新增实际用款人为共借人;</p>
    </div>
</template>

<script>
    export default {
        name: "msg-title"
    }
</script>

<style scoped>
  h3{
    line-height: 32px;
    background: #feff00;
    background-image:url("./../../assets/laba.png") ;
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 5px;
    text-indent: 30px;
  }
  p{
    line-height: 20px;
  }
</style>
