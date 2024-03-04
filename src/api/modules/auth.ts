import api from '../index'

export default {
  // 账号登录
  accountLogin: (data: {
    account: string
    password: string
    captcha: string
    uuid: string
  }) => api.post('auth/account', data),

  // 用户退出
  logout: () => api.post('auth/logout'),

  // 获取权限
  permission: () => api.get('user/permission', {
    baseURL: '/mock/',
  }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password/edit', data, {
    baseURL: '/mock/',
  }),
}
