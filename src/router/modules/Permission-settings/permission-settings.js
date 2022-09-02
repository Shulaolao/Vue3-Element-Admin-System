import { i18n } from '@/locales/i18n.js'

const PermissionSettings = {
  path: '/Permission',
  name: 'Permission',
  alwaysShow: true,
  redirect: '/PermissionSettings/RolesPermission',
  component: () => import('@/layout'),
  meta: {
    title: i18n.global.t('routes.Permission'),
    icon: 'role',
    roles: ['superAdmin', 'commonAdmin']
  },
  children: [
    {
      path: 'MasterStation',
      name: 'MasterStation',
      meta: {
        title: i18n.global.t('routes.Master_Station'),
        roles: ['superAdmin'],
        icon: 'dashboard'
      },
      component: () => import('@/views/Permission-settings/MasterStation.vue')
    },
    {
      path: 'RolesPermission',
      name: 'RolesPermission',
      meta: {
        icon: 'rolesPermission',
        title: i18n.global.t('routes.Roles_Permission')
      },
      component: () => import('@/views/Permission-settings/RolesPermission.vue')
    },
    {
      path: 'ChangeRoles',
      name: 'ChangeRoles',
      meta: {
        icon: 'changeRoles',
        title: i18n.global.t('routes.Change_Roles')
      },
      component: () => import('@/views/Permission-settings/ChangeRoles.vue')
    }
  ]
}

export default PermissionSettings
