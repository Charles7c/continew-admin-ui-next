import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
  // 请在此处编写或粘贴配置代码
  menu: {
    menuMode: 'side',
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  topbar: {
    mode: 'fixed',
    switchTabbarAndToolbar: true,
  },
  tabbar: {
    enable: true,
    style: 'fashion',
    enableIcon: true,
    enableHotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  copyright: {
    enable: true,
    dates: `2022-${new Date().getFullYear()}`,
    company: 'ContiNew Admin',
    website: 'https://gitee.com/continew/continew-admin',
    beian: '津ICP备2022005864号-2',
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
