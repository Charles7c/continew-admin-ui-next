import api from '../../../index.ts'
import type * as Captcha from './type.ts'

export default {

  // 获取图形验证码
  captchaImg: () => api.get<Captcha.CaptchaImgRes>('captcha/img'),
}
