import picModule from './picModule.vue'
const pic = {
  install:function (vue) {
    vue.component('picModule',picModule)
  }
}
export default pic
