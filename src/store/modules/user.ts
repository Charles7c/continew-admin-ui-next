import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'
import apiAuth from '@/api/modules/auth'
import { encryptByRsa } from '@/utils/encrypt'

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const gender = ref(localStorage.gender ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const nickname = ref(localStorage.nickname ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      return !!token.value
    })

    // 登录
    async function login(data: {
      account: string
      password: string
      captcha: string
      uuid: string
    }) {
      const res = await apiAuth.accountLogin({
        account: data.account,
        password: encryptByRsa(data.password),
        captcha: data.captcha,
        uuid: data.uuid,
      })
      localStorage.setItem('account', data.account)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('gender', res.data.gender)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      gender.value = res.data.gender
      avatar.value = res.data.avatar
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      await apiAuth.logout()
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('gender')
      localStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
      gender.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // 获取权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      gender,
      avatar,
      nickname,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
