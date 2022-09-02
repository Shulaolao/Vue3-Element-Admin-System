const Mock = require('mockjs')

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    Id: '@increment',
    Timestamp: +Mock.Random.date('T'),
    Author: '@first',
    Reviewer: '@first',
    Title: '@title(5, 10)',
    Content_short: 'mock data',
    Forecast: '@float(0, 100, 2, 2)',
    Importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    Display_time: '@datetime',
    Comment_disabled: true,
    Pageviews: '@integer(300, 5000)',
    Platforms: ['a-platform']
  }))
}

module.exports = [
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query
      let mockList = list.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexof(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]
