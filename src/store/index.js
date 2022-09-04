import { createStore } from 'vuex'

// import screen from './modules/screen'
import settings from './modules/settings'
import permission from './modules/permission'
import user from './modules/user'
import components from './modules/components'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // screen,
    settings,
    permission,
    user,
    components
  }
})
