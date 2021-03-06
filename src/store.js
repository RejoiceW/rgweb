import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 设置属性
  state: {
    isLogin: false,
    itemnum: ''
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    setItemNum(state, num) {
      state.itemnum = num;
    }
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
  },
  // 应用mutations
  actions: {
    //获取登录状态
    userLogin({
      commit
    }, flag) {
      commit("userStatus", flag)
    },
  }
})

export default store;
