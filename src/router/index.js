import { createRouter, createWebHashHistory } from 'vue-router'
import ExcelVariable from './modules/Excel-variable/excel-variable.js'
import PermissionSettings from './modules/Permission-settings/permission-settings.js'
import Components from './modules/Components-demo/components-demo.js'
import Layout from '@/layout/index.vue'
import { i18n } from '@/locales/i18n.js'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/RedirectIndex.vue')
      }
    ]
  }, {
    path: '/Login',
    name: i18n.global.t('routes.Login'),
    hidden: true,
    component: () => import('@/views/Login/LoginPage.vue')
  }, {
    path: '/Auth-redirect',
    component: () => import('@/views/Login/auth-redirect.vue'),
    hidden: true
  }, {
    path: '/404',
    name: 'Error404',
    hidden: true,
    component: () => import('@/views/Error-page/404.vue')
  }, {
    path: '/403',
    name: 'Error403',
    hidden: true,
    component: () => import('@/views/Error-page/403.vue')
  }, {
    path: '/WorkTable',
    name: i18n.global.t('routes.WorkTable'),
    redirect: '/WorkTable',
    component: Layout,
    alwaysShow: true,
    meta: {
      icon: 'workTable'
    },
    children: [
      {
        path: '',
        name: 'WorkTable',
        meta: {
          title: i18n.global.t('routes.WorkTable')
        },
        component: () => import('@/views/WorkTable/WorkTable.vue')
      }
    ]
  }, {
    path: '/Guide',
    name: 'Guide',
    component: Layout,
    redirect: '/Guide/Start',
    alwaysShow: true,
    meta: {
      title: i18n.global.t('routes.Project_Guide'),
      icon: 'guide'
    },
    children: [
      {
        path: 'Start',
        name: 'Guide Start',
        meta: {
          title: i18n.global.t('routes.Guide_Start')
        },
        component: () => import('@/views/Guide/index.vue')
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/Icon',
    name: 'Icon',
    component: Layout,
    redirect: '/Icon/Copy',
    meta: {
      title: i18n.global.t('routes.Icon_Copy'),
      icon: 'icon',
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: 'Copy',
        name: 'Copy',
        component: () => import('@/views/IconCopy/index.vue'),
        meta: {
          title: i18n.global.t('routes.Copy')
        }
      }
    ]
  },
  PermissionSettings,
  Components,
  {
    path: '/DownloadPdf/pdf',
    hidden: true,
    name: 'pdf',
    component: () => import('@/views/Components-demo/pdfPage.vue'),
    meta: {
      title: 'pdf',
      icon: 'pdf'
    }
  },
  ExcelVariable,
  {
    path: '/EChartsCool',
    name: 'EChartsCool',
    component: Layout,
    redirect: 'EChartsCool/BrokenLine',
    meta: {
      icon: 'pieChart',
      title: i18n.global.t('routes.ECharts_Cool'),
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: 'BrokenLine',
        name: 'BrokenLine',
        component: () => import('@/views/ECharts-cool/BrokenLine.vue'),
        meta: {
          icon: 'lineChart',
          title: i18n.global.t('routes.BrokenLine_EChart')
        }
      }, {
        path: 'KeyBoard',
        name: 'KeyBoard',
        component: () => import('@/views/ECharts-cool/KeyBoard.vue'),
        meta: {
          icon: 'keyboard',
          title: i18n.global.t('routes.KeyBoard_EChart')
        }
      }, {
        path: 'ComplexChart',
        name: 'ComplexChart',
        component: () => import('@/views/ECharts-cool/ComplexChart.vue'),
        meta: {
          icon: 'complexChart',
          title: i18n.global.t('routes.ComplexTable_EChart')
        }
      }
    ]
  },
  {
    path: '/Form',
    name: 'Form',
    component: Layout,
    redirect: '/Form/BaseForm',
    meta: {
      icon: 'form',
      title: i18n.global.t('routes.Form'),
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: 'BaseForm',
        name: 'BaseForm',
        component: () => import('@/views/Form/BaseForm.vue'),
        meta: {
          icon: 'simpleForm',
          title: i18n.global.t('routes.Base_Form')
        }
      }, {
        path: 'DragForm',
        name: 'DragForm',
        component: () => import('@/views/Form/DragForm.vue'),
        meta: {
          icon: 'dragForm',
          title: i18n.global.t('routes.Drag_Form')
        }
      }, {
        path: 'StepByStep',
        name: 'StepByStep',
        component: () => import('@/views/Form/StepByStep.vue'),
        meta: {
          icon: 'stepByStep',
          title: i18n.global.t('routes.StepByStep_Form')
        }
      }
    ]
  }, {
    path: '/Error',
    name: 'Error',
    component: Layout,
    redirect: '/Error/404',
    meta: {
      title: i18n.global.t('routes.Error_Pages'),
      icon: 'error',
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: '403',
        component: () => import('@/views/Error-page/403.vue'),
        name: '403',
        meta: {
          icon: '403',
          title: 403
        }
      }, {
        path: '404',
        component: () => import('@/views/Error-page/404.vue'),
        name: '404',
        meta: {
          icon: '404',
          title: 404
        }
      }
    ]
  }, {
    path: '/InlineDoc',
    name: 'InlineDoc',
    component: Layout,
    redirect: '/InlineDoc/InlineComponent',
    meta: {
      icon: 'document',
      title: i18n.global.t('routes.Inline_Document'),
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: 'InlineComponent',
        name: 'InlineComponent',
        link: 'https://element-plus.org/zh-CN/',
        component: () => import('@/views/InlineDoc/InlineComponent.vue'),
        meta: {
          icon: 'inlineComponent',
          title: i18n.global.t('routes.Element_Plus')
        }
      }, {
        path: 'InlineProject',
        name: 'InlineProject',
        component: () => import('@/views/InlineDoc/InlineProject.vue'),
        meta: {
          icon: 'inlineProject',
          title: i18n.global.t('routes.Project')
        }
      }
    ]
  }, {
    path: '/Link',
    name: 'About',
    redirect: '/Link/To',
    component: Layout,
    meta: {
      title: i18n.global.t('routes.External_Link'),
      icon: 'link',
      roles: ['superAdmin', 'commonAdmin']
    },
    children: [
      {
        path: 'https://github.com/Shulaolao/vue3-element-admin-system',
        name: 'External Link',
        meta: {
          title: i18n.global.t('routes.External_Link')
        }
      }
    ]
  },
  {
    // 最后的 ‘*’ 忽略与否的区别：'/' 编码与否
    // https://router.vuejs.org/guide/migration/index.html#removed-star-or-catch-all-routes
    path: '/:pathMatch(.*)*',
    name: 'fallback path',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(''),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: constantRoutes
})

export function resetRouter () {
  asyncRoutes.forEach(route => {
    if (route?.name && router.hasRoute(route.name)) {
      router.removeRoute(route.name)
    }
  })
}

export default router
