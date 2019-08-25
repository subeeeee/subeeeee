import {
  // userLogin,
  logout,
  getInfo
} from '@/api/login/login.js'

import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
  getPhoto,
  // setPhoto,
  removePhoto
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    name: '',
    avatar: '',
    photo: getPhoto(), // 用户头像
    data: [],
    index: 0,   //显示哪一个菜单下的二级菜单
    formDatas: [],
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_DATA: (state, data) => {
      state.data = data
    },
    SET_FORMDATAS: (state, formDatas) => {
      state.formDatas = formDatas
    },
    SET_INDEX: (state, index) => {
      state.index = index
    },
    SET_ORGID: (state, orgid) => {
      state.orgid = orgid
    },
    SET_USER_NODE_LEVEL: (state, userNodeLevel) => {
      state.userNodeLevel = userNodeLevel
    }
  },

  actions: {
    // 登录
 /*   Login({
      commit
    }, userInfo) {
      const name = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        userLogin(name, userInfo.password).then(response => {
          const data = response.data
          // setToken(data.token)
          // commit('SET_NAME', data.lsUser.name)
          // setUserId(data.lsUser.id)
          localStorage.setItem('token', data.token)
          sessionStorage.setItem('TOKENL', data.token)
          commit('SET_TOKEN', data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },*/
    // 清空data
    clearData({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_DATA', [])
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (response.infoCode === 200) { // 验证返回的data是否是一个非空数组
            commit('SET_DATA', data)
            resolve(response)
            sessionStorage.setItem('orgName', data.orgName)
            sessionStorage.setItem('orgCode', data.orgCode)
            sessionStorage.setItem('userName', data.userName)
            sessionStorage.setItem('deptName', data.deptName)
            sessionStorage.setItem('userCode', data.userCode)
            sessionStorage.setItem('userType', data.userType)
            sessionStorage.setItem('userTitle', data.userTitle)
            sessionStorage.setItem('userRole', data.userRole)
            sessionStorage.setItem('userNodeLevel', data.userNodeLevel)
          } else {
            reject('getInfo: data must be a non-null array !')
          }

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_DATA', [])
          removeToken()
          window.localStorage.removeItem('token');
          sessionStorage.clear();
          localStorage.clear();
          resolve()
          // sessionStorage.removeItem('photo');
          removePhoto()
          removeUserId()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_DATA', [])
        removeToken()
        window.localStorage.removeItem('token');
        sessionStorage.clear();
        localStorage.clear();
        removeUserId()
        removePhoto()
        resolve()
      })
    },


    //设置二级的菜单
    ChangeMenu({ commit }, index) {
      return new Promise(resolve => {
        commit('SET_INDEX', index)
      })
    },
    //本地存储token
    setTokens({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_DATA', [])
      })
    }
  }
}

export default user
