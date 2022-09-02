import { tokens } from './user'

const setVisitsData = () => {
  const all = Math.floor(Math.random() * 16000000)

  const today = new Date()

  const getDaysOfMonth = (month) => {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31
    }
    return 30
  }
  const daysLen = getDaysOfMonth(today.getMonth() + 1)

  const months = [...new Array(12).keys()]
  const days = [...new Array(daysLen).keys()]

  months.forEach((item, index) => {
    const nowMonth = (today.getMonth() + 1 - index + 12) % 12
    months[index] = {
      Month: nowMonth !== 0 ? nowMonth : 12,
      num: Math.floor(Math.random() * 20000)
    }
  })

  days.forEach((item, index) => {
    const nowDate = (today.getDate() - index + daysLen) % daysLen
    days[index] = {
      Day: nowDate !== 0 ? nowDate : daysLen,
      num: Math.floor(Math.random() * 200)
    }
  })

  return {
    all, months, days
  }
}

export const superNum = Math.floor(Math.random() * 200) + 5
export const commonNum = Math.floor(Math.random() * 2000) + 10

export default [
  {
    url: '/master',
    type: 'post',
    response: config => {
      const { token } = config.body
      if (token !== tokens.superAdmin.token) {
        return {
          code: 40300,
          message: "Sorry you don't have permission!"
        }
      }

      const { all, months, days } = setVisitsData()

      return {
        code: 20000,
        data: {
          users: {
            super: superNum,
            common: commonNum
          },
          orders: Math.floor(Math.random() * 90000),
          visits: {
            all,
            months,
            days
          },
          sale: Math.floor(Math.random() * Math.pow(10, 8)),
          messages: Math.floor(Math.random() * 20)
        },
        message: 'success'
      }
    }
  }
]
