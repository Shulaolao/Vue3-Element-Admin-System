import { constantRoutes, asyncRoutes } from '@/router/index.js'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 只需要给需要 super 的路由加上 roles: ['super']
    return true
  }
}

export function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  namespaced: true,
  state () {
    return {
      routes: [],
      addRoutes: [],
      adminList: []
    }
  },
  mutations: {
    Set_routes: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    Set_adminList: (state, adminList) => {
      state.adminList = adminList
    }
  },
  actions: {
    setRoutes ({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('superAdmin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        // console.log(accessedRoutes)
        commit('Set_routes', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    setAdminList ({ commit }, adminList) {
      commit('Set_adminList', adminList)
    }
  },
  getters: {
    routes: state => state.routes,
    addRoutes: state => state.addRoutes,
    adminList: state => state.adminList
  }
}
