const imgsList = require.context('./images', false, /\.jpg$/)

const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
const list = requireAll(imgsList)

export default list
