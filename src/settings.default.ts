// 该文件为系统默认配置，请勿修改！！！

import type { RecursiveRequired, Settings } from '#/global'

const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    enablePermission: false,
    enableProgress: true,
    enableDynamicTitle: false,
    routeBaseOn: 'frontend',
  },
  home: {
    enable: true,
    title: '主页',
    fullPath: '/',
  },
  layout: {
    enableMobileAdaptation: false,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'side',
    enableMainMenu: true,
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
    isRounded: false,
  },
  topbar: {
    mode: 'static',
    switchTabbarAndToolbar: false,
  },
  tabbar: {
    enable: false,
    style: '',
    enableIcon: false,
    enableHotkeys: false,
  },
  toolbar: {
    breadcrumb: true,
    navSearch: true,
    fullscreen: false,
    pageReload: false,
    colorScheme: false,
  },
  mainPage: {
    enableHotkeys: true,
  },
  navSearch: {
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
}

export default globalSettingsDefault
