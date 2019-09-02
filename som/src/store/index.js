import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'

Vue.use(Vuex)

let state = {
  count: 0,
  language: [
    { name: 'Tom', sex:'1', score:'96' },
    { name: 'Jack', sex:'1', score:'83' },
    { name: 'xiaoming', sex:'2', score:'90' },
    { name: 'Marry', sex:'2', score:'100' }
  ],
  router_change_name:''
};
let getters = {
  count:state=>state.count,
  router_change_name:state=>state.router_change_name,
  excellent:(state,getter)=>{
    // getter.count
    return state.language.filter(item=>item.score>=90)
  },
  queryResult:state=>{
    return name=>{
      return state.language.find(item=>item.name === name)
    }
  }

};
let mutations = {
  ADD_COUNT (state) {
    state.count++
  },
  CHANGE_ROUTE_SON_NAME(state,{name,index,params}){
    console.log(name);
    state.router_change_name = name;
    router.push({
      name:`router_son${index}`,
      params
    })
  }
};
 const actions = {
   ASYNC_ADD_COUNT:({commit,state})=>{
     return new Promise((resolve, reject)=>{
       setTimeout(()=>{
         commit('ADD_COUNT')
         resolve(state.count)
       },1000)
     })

   }
 }

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});


export default store
