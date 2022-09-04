// export default {
//   namespaced: true,
//   state () {
//     return {
//       device: 'desktop',
//       sideBar: {
//         opened: false,
//         withoutAnimation: false
//       }
//     }
//   },
//   mutations: {
//     Toggle_device (state, device) {
//       state.device = device
//     },
//     Close_sideBar (state, withoutAnimation) {
//       state.sideBar.opened = false
//       state.sideBar.withoutAnimation = withoutAnimation
//     }
//   },
//   actions: {
//     toggleDevice ({ commit }, device) {
//       commit('Toggle_device', device)
//     },
//     closeSideBar ({ commit }, { withoutAnimation }) {
//       commit('Close_sideBar', withoutAnimation)
//     }
//   },
//   getters: {
//     device: state => state.device,
//     sideBar: state => state.sideBar
//   }
// }
