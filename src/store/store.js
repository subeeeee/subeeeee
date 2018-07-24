import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
console.log(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state,obj) {
      if(obj.type == '+'){
        state.count = state.count + obj.step
      }else if (obj.type =='-') {
        state.count = state.count - obj.step
      }

    }
  }
})
export default store
