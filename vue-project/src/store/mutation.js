const mutations = {
  increment(state,obj) {
    if(obj.type == '+'){
      state.count = state.count + obj.step
    }else if (obj.type =='-') {
      state.count = state.count - obj.step
    }
  }
}
export default mutations
