<route lang="yaml">
meta:
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import Copyright from '@/layouts/components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import apiCaptcha from '@/api/modules/common/captcha'
import type CaptchaImgRes from '@/api/modules/common/captcha'

defineOptions({
  name: 'Login',
})

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const banner = new URL('../assets/images/banner.png', import.meta.url).href
const logo = new URL('../assets/images/logo.svg', import.meta.url).href
const title = import.meta.env.VITE_APP_TITLE

// 表单类型，login 登录
const formType = ref('login')
const loading = ref(false)
const captchaImgBase64 = ref()
const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath)

// 登录
const loginFormRef = ref<FormInstance>()
const loginForm = ref({
  account: localStorage.login_account || 'admin', // 演示默认值
  password: 'admin123', // 演示默认值
  captcha: '',
  uuid: '',
  remember: !!localStorage.login_account,
})

const loginRules = ref<FormRules>({
  account: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  captcha: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
})

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value && loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.login(loginForm.value).then(() => {
        loading.value = false
        if (loginForm.value.remember) {
          localStorage.setItem('login_account', loginForm.value.account)
        }
        else {
          localStorage.removeItem('login_account')
        }
        router.push(redirect.value)
      }).catch(() => {
        getCaptchaImg()
        loginForm.value.captcha = ''
      }).finally(() => {
        loading.value = false
      })
    }
  })
}

/**
 * 获取图形验证码
 */
function getCaptchaImg() {
  apiCaptcha.captchaImg().then((res: CaptchaImgRes) => {
    loginForm.value.uuid = res.data.uuid
    captchaImgBase64.value = res.data.img
  })
}

onMounted(() => {
  getCaptchaImg()
})
</script>

<template>
  <div>
    <div class="bg-banner" />
    <div id="login-box">
      <div class="login-banner">
        <img :src="logo" class="logo">
        <img :src="banner" class="banner">
      </div>
      <ElForm v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="title-container">
          <h3 class="title">
            欢迎使用 {{ title }}
          </h3>
        </div>
        <div>
          <ElFormItem prop="account">
            <ElInput v-model="loginForm.account" placeholder="用户名" type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput v-model="loginForm.password" type="password" placeholder="密码" tabindex="2" autocomplete="new-password" show-password @keyup.enter="handleLogin">
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput v-model="loginForm.captcha" placeholder="验证码" :maxlength="4" type="text" tabindex="3" style="flex: 1 1;" @keyup.enter="handleLogin">
              <template #prefix>
                <SvgIcon name="i-ri:checkbox-circle-fill" />
              </template>
            </ElInput>
            <img
              :src="captchaImgBase64"
              alt="验证码"
              class="captcha"
              @click="getCaptchaImg"
            >
          </ElFormItem>
        </div>
        <div class="flex-bar">
          <ElCheckbox v-model="loginForm.remember">
            记住我
          </ElCheckbox>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">
          登录
        </ElButton>
        <div style="margin-top: 20px; margin-bottom: -20px; text-align: center;">
          <ElDivider>其他登录方式</ElDivider>
          <ElButton circle class="social">
            <template #icon>
              <svg
                class="icon"
                fill="#C71D23"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>码云</title>
                <path
                  d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"
                />
              </svg>
            </template>
          </ElButton>
          <ElButton circle class="social">
            <template #icon>
              <svg
                class="icon"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </template>
          </ElButton>
        </div>
      </ElForm>
    </div>
    <Copyright />
  </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
  #login-box {
    position: relative;
    top: inherit;
    left: inherit;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(0) translateY(0);

    .login-banner {
      width: 0;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }

  .copyright {
    position: relative;
  }
}

:deep(input[type="password"]::-ms-reveal) {
  display: none;
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
}

#login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--g-container-bg);
  border-radius: 2px;
  box-shadow: var(--el-box-shadow);
  transform: translateX(-50%) translateY(-50%);

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: #5e98ff;

    .banner {
      width: 100%;

      @include position-center(xy);
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 30px;
      background-color: var(--g-container-bg);
      border-radius: 4px;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    min-height: 500px;
    padding: 50px;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 30px;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }

    .captcha {
      width: 111px;
      height: 36px;
      margin: 0 0 0 5px;
      cursor: pointer;
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-input) {
      width: 100%;
      height: 48px;
      line-height: inherit;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }
  }

  :deep(.el-divider__text) {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    background-color: var(--g-container-bg);
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}
</style>
