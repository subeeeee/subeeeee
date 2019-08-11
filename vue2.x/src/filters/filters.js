import Vue from 'vue'

Vue.filter('sex',(sex)=>{
  if(sex === '1'){
    return 'man'
     }else if(sex === '2'){
     return 'woman'
     }
})
Vue.filter('formate',(val)=>{
  return 'asdfasdfasdfasdf'
})
