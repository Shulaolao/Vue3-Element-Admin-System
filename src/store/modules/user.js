import { getInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/authToken.js'
import { i18n } from '@/locales/i18n.js'
import router, { resetRouter } from '@/router'

export default {
  namespaced: true,
  state () {
    return {
      token: getToken(),
      name: '',
      avatar: '',
      roles: [],
      information: '',
      nickname: '',
      city: '' || '广州市',
      weatherInfo: {}
    }
  },
  mutations: {
    Set_Token (state, token) {
      state.token = token
    },
    Set_Name (state, name) {
      state.name = name
    },
    Set_Avatar (state, avatar) {
      state.avatar = avatar
    },
    Set_Roles (state, roles) {
      state.roles = roles
    },
    Set_Information (state, information) {
      state.information = information
    },
    Set_Nickname (state, nickname) {
      state.nickname = nickname
    },
    Set_City (state, city) {
      state.city = city
    },
    Set_WeatherInfo (state, weatherInfo) {
      state.weatherInfo = weatherInfo
    }
  },
  actions: {
    clearUserInfo ({ commit }) {
      commit('Set_Token', '')
      commit('Set_Name', '')
      commit('Set_Avatar', '')
      commit('Set_Roles', [])
      commit('Set_Information', '')
      commit('Set_Nickname', '')
      commit('Set_City', '')
      commit('Set_WeatherInfo', '')
    },
    // 登录时拿到用户的 token，将拿到的 token 去获取用户的信息
    async login ({ commit }, userInfo) {
      // 用 async await 语法糖
      try {
        const response = await login(userInfo)
        const { data } = response
        commit('Set_Token', data.token)
        setToken(data.token)
      } catch (error) {
        console.log(error)
      }
    },
    getInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response.data
          if (!data) {
            reject(new Error(i18n.global.t('login.loginFail')))
          }

          const { roles, name, avatar, information, nickname } = data
          if (!roles || roles.length < 0) {
            reject(new Error(i18n.global.t('login.getInfo')))
          }
          commit('Set_Roles', roles)
          commit('Set_Name', name)
          commit('Set_Avatar', avatar)
          commit('Set_Information', information)
          commit('Set_Nickname', nickname)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout ({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(res => {
          const { data = '' } = res
          if (res.status === 200 && data.code === 20000) {
            removeToken()
            dispatch('clearUserInfo')
            resetRouter()
          } else {
            reject(new Error('fail to logout'))
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('Set_Token', '')
        commit('Set_Roles', [])
        removeToken()
        resolve()
      })
    },
    async changeRoles ({ commit, dispatch }, role) {
      const token = role + '-token'
      commit('Set_Token', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()
      // https://vuex.vuejs.org/zh/guide/modules.html#%E5%9C%A8%E5%B8%A6%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4%E7%9A%84%E6%A8%A1%E5%9D%97%E5%86%85%E8%AE%BF%E9%97%AE%E5%85%A8%E5%B1%80%E5%86%85%E5%AE%B9%EF%BC%88global-assets%EF%BC%89
      // 在一个命名模块空间给另一个模块空间分发 action，需要带上第三个参数即可在全局命名空间分发 action，
      // 否则会拼接上自己的空间名：user/permission/setRoutes
      const accessRoutes = await dispatch('permission/setRoutes', roles, { root: true })
      accessRoutes.forEach(route => {
        router.addRoute(route)
      })
    }
  },
  getters: {
    roles: state => state.roles,
    weather: state => state.weatherInfo?.weather,
    windPower: state => state.weatherInfo?.windPower,
    temp: state => state.weatherInfo?.temp,
    humidity: state => state.weatherInfo?.humidity
  }
}
