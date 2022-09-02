import { i18n } from '@/locales/i18n'

const Components = {
  path: '/Components-demos',
  name: 'Components-demos',
  redirect: '/Components-demos/CssCarousel',
  component: () => import('@/layout/index.vue'),
  meta: {
    icon: 'component',
    title: i18n.global.t('routes.Components'),
    roles: ['superAdmin', 'commonAdmin']
  },
  children: [
    {
      path: 'CssCarousel',
      name: 'CssCarousel',
      meta: {
        icon: 'carousel',
        title: i18n.global.t('routes.Css_Carousel')
      },
      component: () => import('@/views/Components-demo/CssCarousel.vue')
    }, {
      path: 'DownloadPdf',
      name: 'DownloadPdf',
      meta: {
        icon: 'pdf',
        title: i18n.global.t('routes.Download_Pdf')
      },
      component: () => import('@/views/Components-demo/DownloadPdf.vue')
    }, {
      path: 'Drag',
      name: 'Drag Components',
      redirect: '/Components-demos/Drag/Form',
      component: () => import('@/views/Components-demo/Drag/DragIndex.vue'),
      meta: {
        title: i18n.global.t('routes.Drag_Com'),
        icon: 'drag'
      },
      children: [
        {
          path: 'Table',
          name: 'DragTable',
          component: () => import('@/views/Components-demo/Drag/components/DragTable.vue'),
          meta: {
            icon: 'table',
            title: i18n.global.t('routes.Drag_Table')
          }
        }, {
          path: 'DragList',
          name: 'DragList',
          component: () => import('@/views/Components-demo/Drag/components/DragList.vue'),
          meta: {
            icon: 'list',
            title: i18n.global.t('routes.Drag_List')
          }
        }, {
          path: 'DragDialog',
          name: 'DragDialog',
          component: () => import('@/views/Components-demo/Drag/components/DragDialog.vue'),
          meta: {
            icon: 'dragDialog',
            title: i18n.global.t('routes.Drag_Dialog')
          }
        }
      ]
    }, {
      path: 'MarkdownEdit',
      name: 'MarkdownEdit',
      meta: {
        icon: 'edit',
        title: i18n.global.t('routes.MarkDown_Edit')
      },
      component: () => import('@/views/Components-demo/MarkdownEdit.vue')
    }, {
      path: 'DragToUpload',
      name: 'DragToUpload',
      meta: {
        icon: 'upload',
        title: i18n.global.t('routes.Drag_To_Upload')
      },
      component: () => import('@/views/Components-demo/DragToUpload.vue')
    }, {
      path: 'ScrollToTop',
      name: 'ScrollToTop',
      meta: {
        icon: 'scrollTop',
        title: i18n.global.t('routes.Scroll_To_Top')
      },
      component: () => import('@/views/Components-demo/ScrollToTop.vue')
    }
  ]
}

export default Components
