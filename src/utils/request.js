import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000,
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'http://localhost:7891',
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(config => {
  nProgress.start()
  return config
})

request.interceptors.response.use(response => {
  if (response.status === 200 && response.data && response.data.code !== 1) {
    ElMessage({
      message: response.message || 'Error',
      type: 'error',
      duration: 0
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

// id 与 secret 可通过 https://www.mxnzp.com/doc/list 平台免费申请
const id = 'sqnmugmnspqditkh'
const secret = 'akw0SkhCOVoweWhWT3FQQ3dJNHgxUT09'

export default (url, method = 'GET') => {
  method = method.toUpperCase()
  url += '?' + 'app_id=' + id + '&app_secret=' + secret
  return request({
    url,
    method
  })
}
