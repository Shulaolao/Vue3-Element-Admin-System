import store from '@/store'

function checkPermission (el, binding) {
  // 从指令解构出后面输入的值
  const { value } = binding
  const roles = store.getters['user/roles']

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error("Sorry, you don't have authority")
  }
}

const permission = {
  mounted (el, binding) {
    checkPermission(el, binding)
  },
  updated (el, binding) {
    checkPermission(el, binding)
  }
}

export default permission
