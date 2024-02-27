import banner from 'vite-plugin-banner'

export default function createBanner() {
  return banner(`
/**
 * 由 ContiNew Admin 提供技术支持
 * Powered by Fantastic Admin
 * Gitee  https://gitee.com/continew/continew-admin
 * GitHub https://github.com/Charles7c/continew-admin
 */
`)
}
