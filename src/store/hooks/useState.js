import { mapState, createNamespacedHelpers } from 'vuex'
import { useStateMapper } from './useMapper'
import checkType from './checkType.js'

export default (moduleName, mapper) => {
  let mapperFn = mapState
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    // createNamespacedHelpers 创建基于某个命名空间辅助函数。
    // 它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数
    console.log(createNamespacedHelpers(moduleName))
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }

  return useStateMapper(mapper, mapperFn)
}
