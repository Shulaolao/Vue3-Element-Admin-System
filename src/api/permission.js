import mockRequest from '@/utils/mockRequest'

export const getAdminMenu = (token) => {
  return mockRequest('/admin/menu', 'post', { token })
}
