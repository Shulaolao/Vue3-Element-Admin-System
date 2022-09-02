import { i18n } from '@/locales/i18n'
import { getLocaleI18n } from '@/utils/localStorage'
export default {
  namespaced: true,
  state () {
    return {
      collapse: false,
      // fix or not
      fixLogo: false,
      fixHeader: false,
      fixTagsView: false,
      fixTop: false,
      // screen full or not
      screenFull: false,
      screenLock: false,
      // locale
      language: getLocaleI18n() || 'cn',
      // show or not
      showBread: true,
      showLogo: true,
      showTagsView: false,
      showReload: true
    }
  },
  mutations: {
    Set_showLogo: (state) => {
      state.showLogo = !state.showLogo
    },
    Set_collapse: (state) => {
      state.collapse = !state.collapse
    },
    Set_fixLogo: (state) => {
      state.fixLogo = !state.fixLogo
    },
    Set_fixHeader: state => {
      state.fixHeader = !state.fixHeader
    },
    Set_screenFull: state => {
      state.screenFull = !state.screenFull
    },
    Set_screenLock: state => {
      state.screenLock = !state.screenLock
    },
    Set_language: (state, language) => {
      state.language = language
    },
    Set_showBread: state => {
      state.showBread = !state.showBread
    },
    Set_showTagsView: state => {
      state.showTagsView = !state.showTagsView
    },
    Set_showReload: state => {
      state.showReload = !state.showReload
    },
    Set_fixTagsView: state => {
      state.fixTagsView = !state.fixTagsView
    },
    Set_fixTop: state => {
      state.fixTop = !state.fixTop
    }
  },
  actions: {
    setShowLogo ({ commit }) {
      commit('Set_showLogo')
    },
    setCollapse ({ commit }) {
      commit('Set_collapse')
    },
    setFixLogo ({ commit }) {
      commit('Set_fixLogo')
    },
    setFixHeader ({ commit }) {
      commit('Set_fixHeader')
    },
    setScreenFull ({ commit }) {
      commit('Set_screenFull')
    },
    setScreenLock ({ commit }) {
      commit('Set_screenLock')
    },
    setLanguage ({ commit }, language) {
      return new Promise((resolve, reject) => {
        i18n.global.locale.value = language
        commit('Set_language', language)
        resolve()
      })
    },
    setShowBread ({ commit }) {
      commit('Set_showBread')
    },
    setShowTagsView ({ commit }) {
      commit('Set_showTagsView')
    },
    setShowReload ({ commit }) {
      commit('Set_showReload')
    },
    setFixTagsView ({ commit }) {
      commit('Set_fixTagsView')
    },
    setFixTop ({ commit }) {
      commit('Set_fixTop')
    }
  },
  getters: {
    showLogo: state => state.showLogo,
    roles: state => state.roles,
    fixLogo: state => state.fixLogo,
    collapse: state => state.collapse,
    fixHeader: state => state.fixHeader,
    screenFull: state => state.screenFull,
    screenLock: state => state.screenLock,
    language: state => state.language,
    showBread: state => state.showBread,
    showTagsView: state => state.showTagsView,
    showReload: state => state.showReload,
    fixTagsView: state => state.fixTagsView,
    fixTop: state => state.fixTop
  }
}
