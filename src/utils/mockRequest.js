import store from '@/store'
import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/authToken.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const request = axios.create({
  baseURL: process.env.VUE_APP_MOCK_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Authorization = getToken()
  }
  nProgress.start()
  return config
})

request.interceptors.response.use(response => {
  if (response.data && response.data.code !== 20000) {
    ElMessage({
      message: response.message || 'Error',
      type: 'error',
      duration: 0
    })
    console.log(response)
  }

  // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  if (response.code === 50008 || response.code === 50012 || response.code === 50014) {
    ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      confirmButtonText: 'Re-Login',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      store.dispatch('user/resetRoles').then(() => {
        location.reload()
      })
    })
  }
  nProgress.done()
  return response
}, (error) => {
  ElMessage({
    type: 'error',
    message: error.message,
    duration: 5 * 1000
  })
  return Promise.reject(new Error(error))
})

export default (url, method = 'GET', data, query) => {
  method = method.toUpperCase()
  return request({
    url,
    method,
    data,
    query
  })
}
