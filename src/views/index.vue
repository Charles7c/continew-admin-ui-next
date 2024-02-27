<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const starterInfo = ref({
  feature: [
    '已发布至 Maven 中央仓库，快捷引用',
    '基于“约定优于配置”的理念精简配置',
    '提供诸多常规默认实现，且可轻松覆盖',
    '统一管理依赖版本，告别依赖冲突',
    '丰富的扩展组件，并提供灵活的配置',
    'Web 模块：跨域、统一异常处理',
    '安全模块：字段加/解密、数据脱敏',
    '日志模块：灵活的请求/操作日志记录',
    '验证码模块：静态验证码、行为验证码',
    '模块示例请查看 ContiNew Admin',
  ],
})

const adminInfo = ref({
  feature: [
    '甄选成熟、流行技术栈',
    '开箱即用，无需导入初始数据脚本',
    '提供代码生成功能，生成80%代码',
    '深度封装的 CRUD 组件，适配后端各层',
    'CI 已集成 Sonar、Codacy、Qodana',
    '有颜有料，持续打磨 UI 设计与主题',
    '注释覆盖率>45%，接口参数示例100%',
    '后端严格遵循阿里巴巴 Java 编码规范',
    '前端严格遵循 ESLint、StyleLint 检查',
    'Talk is cheap, show me the code',
  ],
})

const uiInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    '/screenshot/screenshot01.png',
    '/screenshot/screenshot02.png',
    '/screenshot/screenshot03.png',
    '/screenshot/screenshot04.png',
    '/screenshot/screenshot05.png',
    '/screenshot/screenshot06.png',
  ],
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 ContiNew Admin
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            🔥Almost最佳后端规范🔥持续迭代优化的前后端分离中后台管理系统框架，开箱即用，持续提供舒适的开发体验。
          </div>
          <div>
            当前采用技术栈：Spring Boot3（Java17）、Vue3 & TS & Vite & Arco Design、Sa-Token、MyBatisPlus、Redisson、JetCache、JustAuth、Crane4j、EasyExcel、Liquibase、Hutool 等。
          </div>
        </div>
      </template>
      <HButton outline @click="open('https://doc.charles7c.top')">
        <SvgIcon name="i-ri:file-text-line" />
        开发文档
      </HButton>
      <HDropdownMenu
        :items="[
          [
            { label: 'Gitee', handle: () => open('https://gitee.com/continew/continew-admin') },
            { label: 'GitHub', handle: () => open('https://github.com/Charles7c/continew-admin') },
          ],
        ]"
      >
        <HButton class="ml-2">
          <SvgIcon name="i-ri:code-s-slash-line" />
          代码仓库
          <SvgIcon name="i-ep:arrow-down" />
        </HButton>
      </HDropdownMenu>
    </PageHeader>
    <PageMain class="rounded-lg text-white" style="background: linear-gradient(50deg, rgb(14 76 253), rgb(106 142 255));">
      v2.4.0 现已发布，适配字段加/解密存储，JSON 数据脱敏，点击查看<span class="cursor-pointer px-1 text-yellow font-bold hover:op-70" @click="open('https://doc.charles7c.top/admin/other/changelog.html')">更新介绍</span>。
    </PageMain>
    <div class="w-full flex flex-col gap-4 px-4 xl:flex-row">
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://doc.charles7c.top/logo.svg">
            <div>
              <h1 class="c-[#0057FE]">
                ContiNew Starter
              </h1>
              <h2>一系列经过企业实践优化的 Starter</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://doc.charles7c.top/starter/intro/what-is.html')">
              访问官网
            </HButton>
            <HButton outline class="ml-2" @click="open('https://gitee.com/continew/continew-starter')">
              备用地址
            </HButton>
          </div>
        </template>
        <ul class="m-0 pr-8 text-size-sm leading-6">
          <li v-for="item in starterInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://doc.charles7c.top/logo.svg">
            <div>
              <h1 class="c-[#12D2AC]">
                ContiNew Admin
              </h1>
              <h2>开箱即用，持续优化的中后台框架</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://doc.charles7c.top/admin/intro/what-is.html')">
              访问官网
            </HButton>
            <HButton outline class="ml-2" @click="open('https://gitee.com/continew/continew-admin')">
              备用地址
            </HButton>
          </div>
        </template>
        <ul class="m-0 pr-8 text-size-sm leading-6">
          <li v-for="item in adminInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://doc.charles7c.top/logo.svg">
            <div>
              <h1 class="c-[#41b883]">
                ContiNew Admin UI
              </h1>
              <h2>基于Arco Design Pro前端模板开发</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://doc.charles7c.top/admin/intro/what-is.html')">
              访问官网
            </HButton>
            <HButton outline class="ml-2" @click="open('https://gitee.com/continew/continew-admin-ui')">
              备用地址
            </HButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in uiInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="uiInfo.imageVisible = true; uiInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="uiInfo.imageVisible" :url-list="uiInfo.data" :initial-index="uiInfo.index" @close="uiInfo.imageVisible = false" />
      </PageMain>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.ecology {
  --at-apply: flex-1 m-0;

  :deep(.title-container) {
    --at-apply: flex items-center justify-between flex-wrap gap-4;

    .title-info {
      --at-apply: flex items-center gap-4;

      img {
        --at-apply: block w-12 h-12;
      }

      h1 {
        --at-apply: m-0 text-2xl;
      }

      h2 {
        --at-apply: m-0 text-base text-stone-5 font-normal;
      }
    }
  }
}
</style>
