import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import state from './state'
import getters from './getters'
import mutations from './mutation'
Vue.use(Vuex);
console.log(Vuex);
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
export default store
