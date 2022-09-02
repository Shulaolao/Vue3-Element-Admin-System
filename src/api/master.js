import mockRequest from '@/utils/mockRequest'

export const getMaster = token => {
  return mockRequest('/master', 'post', { token })
}
