<script>
import ElSvgIcon from '@/components/ElSvgIcon/ElSvgIcon.vue'
export default {
  name: 'MenuIconItem',
  // (迁移)vue3 所有函数式组件都是由普通函数创建的，不需要定义该组件选项
  // functional: true,
  props: {
    icon: {
      type: String,
      require: true
    },
    meta: {
      type: Object,
      require: false
    }
  },
  setup (props) {
    return {
    }
  },
  render (props) {
    const icon = props.icon
    const vnodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<ElSvgIcon name={icon} />)
      } else {
        vnodes.push(<svg-icon icon-name={icon} class='sub-el-icon' />)
      }
    }
    // if (props.meta?.title) {
    //   vnodes.push(<span v-slot='title'>{(props.meta?.title)}</span>)
    // }
    // 返回一个 h（）函数，用来创建虚拟节点 VNodes，更准确的函数名称是 createVNode（），
    // 它接收三个参数：
    // 1）div 标签/组件（required）
    // 2）{} attribute/props/事件对象（可选）
    // 3）h(childComponent, {someProps: 'name'}) h('h1', {'I am h1 tag!'}) 子 VNodes，用 h（）函数构建
    return vnodes
  }
}
</script>

<style lang='scss' scoped>
.sub-el-icon {
  color: currentColor;
  width: 15px;
  height: 15px;
  margin: 0 10px 0 0;
}
</style>
