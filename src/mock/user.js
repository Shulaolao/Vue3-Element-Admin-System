import superAvatar from '@/assets/images/Big tree.jpg'
import smallAvatar from '@/assets/images/Small tree.jpg'

export const tokens = {
  superAdmin: {
    token: 'super-token'
  },
  commonAdmin: {
    token: 'common-token'
  }
}

export const users = {
  'super-token': {
    nickname: '树佬',
    city: '',
    roles: ['superAdmin'],
    information: 'I am a super administrator',
    avatar: superAvatar,
    name: 'Super Admin'
  },
  'common-token': {
    nickname: '老树',
    roles: ['commonAdmin'],
    information: 'I am an common administrator',
    avatar: smallAvatar,
    name: 'Common Admin'
  }
}

export const userMock = [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { account } = config.body
      const { token } = tokens[account]

      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        code: 20000,
        token: token
      }
    }
  },
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const { token } = config.body
      const info = users[token]

      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
