import { tokens } from './user'
import { superNum, commonNum } from './master'

const getRandomTime = () => {
  return new Date(new Date().getTime() - Math.floor(Math.random() * Math.pow(10, 12))).toLocaleString()
}
const roles = ['super', 'common']
const randomRoles = () => roles[Math.round(Math.random())]

const gender = ['male', 'female']
const RandomGender = () => gender[Math.round(Math.random())]

const departments = [
  {
    depart: '技术部',
    identify: ['前端', '后端', '测试', '产品经理', 'UI设计']
  }, {
    depart: '财务部',
    identify: ['文员', '会计']
  }, {
    depart: '销售部',
    identify: ['商务市场', '面销', '电话销售']
  }, {
    depart: '品牌部',
    identify: ['采购', '运营', '渠道开发']
  }
]

const getRandom = (n) => {
  return Math.floor(Math.random() * n)
}

const getIdentify = () => {
  const item = departments[getRandom(4)]
  return {
    depart: item.depart,
    identify: item.identify[getRandom(item.identify.length)]
  }
}

const lastName = ['苏', '王', '张', '刘', '谭', '唐', '李', '黎', '洪', '司马', '司徒']
const firstName = ['', '珊', '霖', '祺', '氏', '', '丹', '咏', '轩', '戈', '亚', '仕', '孑', '魏', '昂', '袁', '政', '玟', '逵', '珞']
const getName = () => {
  return lastName[getRandom(lastName.length)] + firstName[getRandom(firstName.length)] + firstName[getRandom(firstName.length)]
}

const getHuman = () => {
  return { id: getRandom(250), name: getName(), role: randomRoles(), gender: RandomGender(), createTime: getRandomTime(), department: getIdentify() }
}

const adminMenu = []

for (let k = 0; k < Math.pow(10, 3); k++) {
  adminMenu.push(getHuman())
}

export default [
  {
    url: '/admin/menu',
    type: 'post',
    response: config => {
      const { token } = config.body
      for (const k of Object.keys(tokens)) {
        if (tokens[k].token === token) {
          return {
            code: 20000,
            data: {
              adminAll: superNum + commonNum,
              adminList: adminMenu,
              account: {
                super: superNum,
                common: commonNum
              }
            }
          }
        }
      }
      return {
        code: 40310,
        message: "Sorry you don't have permission!"
      }
    }
  }
]
