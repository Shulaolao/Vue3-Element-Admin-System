import router from './router/index.js'
import store from '@/store'
import NProgress from 'nprogress'
import { getToken } from './utils/authToken.js'
import { ElMessage } from 'element-plus'

const whiteList = ['/Login', '/Auth-redirect']

// 全局路由拦截
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/Login') {
      next({ path: '/WorkTable' })
      // console.log('hasToken but to Login')
    } else {
      const hasRoles = store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        // console.log('next')
        next()
      } else {
        // console.log('hasToken but no userInfo')
        try {
          const { roles } = await store.dispatch('user/getInfo', getToken())

          const accessRoutes = await store.dispatch('permission/setRoutes', roles)
          // vue-router v3.0 有 addRoutes 可以直接添加路线数组
          // router.addRoute(accessRoutes)
          // 而 vue-router v4.0 已弃用该方法，使用 addRoute 异步、动态添加单个路线
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          // console.log('hasToken and catch error')
          await store.dispatch('user/resetToken')
          ElMessage({
            message: error || 'Has Error',
            type: 'error'
          })
          next(`/Login?redirect==${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // console.log('no token and to whiteList', to.path)
      next()
    } else {
      // console.log('no token and to blackList')
      next(`/Login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
