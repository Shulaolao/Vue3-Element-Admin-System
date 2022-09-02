import SvgIcon from './SvgIcon.vue'

// 导入全部图标
const svgAll = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
requireAll(svgAll)

const registerCom = app => {
  app.component('svg-icon', SvgIcon)
}

// 全局注册 SvgIcon 组件
export default registerCom
