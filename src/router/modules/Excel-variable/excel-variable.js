import { i18n } from '@/locales/i18n'

const ExcelVariable = {
  path: '/ExcelVariable',
  name: 'excelVariable',
  redirect: '/ExcelVariable/ExportSelected',
  component: () => import('@/layout/index.vue'),
  meta: {
    icon: 'excel',
    title: i18n.global.t('routes.Excel_Variable'),
    roles: ['superAdmin', 'commonAdmin']
  },
  children: [
    {
      path: 'ExportExcel',
      name: 'ExportExcel',
      component: () => import('@/views/Excel-variable/ExportExcel.vue'),
      meta: {
        icon: 'export',
        title: i18n.global.t('routes.Export_Excel')
      }
    }, {
      path: 'ExportSelected',
      name: 'ExportSelected',
      component: () => import('@/views/Excel-variable/ExportSelected.vue'),
      meta: {
        title: i18n.global.t('routes.Export_Selected'),
        icon: 'select'
      }
    }, {
      path: 'MultiHeader',
      name: 'MultiHeader',
      component: () => import('@/views/Excel-variable/MultiHeader.vue'),
      meta: {
        icon: 'multiHeader',
        title: i18n.global.t('routes.Multi_Header')
      }
    }, {
      path: 'UploadExcel',
      name: 'UploadExcel',
      component: () => import('@/views/Excel-variable/UploadExcel.vue'),
      meta: {
        icon: 'upload',
        title: i18n.global.t('routes.Upload_Excel')
      }
    }
  ]
}

export default ExcelVariable
