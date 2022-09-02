import { userMock } from './user.js'
import master from './master'
import { params2Obj } from './utils.js'
import permission from './permission'
import article from './article.js'

const Mock = require('mockjs')

const mocks = [
  ...userMock,
  ...master,
  ...permission,
  ...article
]

function mockXHR () {
  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body = '', type = 'GET', url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: params2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

export default mockXHR
