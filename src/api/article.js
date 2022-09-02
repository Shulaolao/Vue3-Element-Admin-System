import mockRequest from '@/utils/mockRequest'

export const getArticle = query => {
  return mockRequest('/article/list', 'get', query)
}
