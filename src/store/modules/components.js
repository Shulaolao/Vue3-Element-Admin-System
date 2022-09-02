export default {
  namespaced: true,
  state () {
    return {
      stepForm: {}
    }
  },
  mutations: {
    Set_stepForm: (state, stepForm) => {
      state.stepForm = stepForm
    }
  },
  actions: {
    SetStepForm ({ commit }, stepForm) {
      commit('Set_stepForm', stepForm)
    }
  }
}
