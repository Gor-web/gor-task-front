import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null,
    friend: null,
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setFriend(state,friend){
      state.friend = friend;
    }
  },
  getters:{
    user:(state) => {
      return state.user
    },
    friend:(state) => {
      return state.friend
    }
  }
})
export default store
