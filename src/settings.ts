import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all = {
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
    enableMobileAdaptation: true,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'head',
    enableMainMenu: false,
    switchMainMenuAndPageJump: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: true,
    enableHotkeys: false,
    isRounded: false,
  },
  topbar: {
    mode: 'static',
    switchTabbarAndToolbar: false,
  },
  tabbar: {
    enable: false,
    style: 'fashion',
    enableIcon: true,
    enableHotkeys: true,
  },
  toolbar: {
    breadcrumb: true,
    enableBreadcrumbIcon: true,
    navSearch: true,
    fullscreen: true,
    pageReload: false,
    colorScheme: true,
  },
  mainPage: {
    enableHotkeys: true,
  },
  navSearch: {
    enableHotkeys: true,
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
