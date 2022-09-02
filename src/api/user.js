import request from '@/utils/request'
import mockRequest from '@/utils/mockRequest'

export const login = (data) => {
  return mockRequest('/user/login', 'post', data)
}

export const logout = () => {
  return mockRequest('/user/logout', 'post')
}

export const getInfo = (token) => {
  return mockRequest('/user/info', 'get', { token: token })
}

export const getCity = () => {
  return request('/api/ip/self', 'get')
}

export const getWeather = city => {
  return request(`/api/weather/current/${city}`, 'get')
}

export const getAllCity = () => {
  return request('api/address/list', 'get')
}
