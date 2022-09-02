<template>
  <header>
    <Hamburger class="hamburger" />
    <div class="reload-container" id="reload-container">
      <div class="reload-box" v-show="settings.showReload.value">
        <el-tooltip content="refresh" placement="bottom" effect="dark">
          <SvgIcon class="reload-icon" icon-name="reload" :width="20" :height="20" @click="reload" />
        </el-tooltip>
      </div>
    </div>
    <BreadCrumb class="breadcrumb" id="breadcrumb-container" v-show="settings.showBread.value" />
    <div class="nav-right">
      <HeaderSearch class="nav-right-menu-item" id="header-search" />
      <ScreenLock />
      <div class="nav-right-menu-item" v-for="item in iconList" :key="item.name" :id="item.id">

        <!-- i18n 国际化 -->
        <el-dropdown v-if="item.name === 'language'" trigger="click" size="default" type="primary"
          @command="item.event">
          <component :is="item.component" v-bind="item.attrs" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(subitem, subindex) in item.options" :key="subindex" :command="subitem">
                {{ subitem }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 普通图标：github、screenfull、screenLock、settings -->
        <el-tooltip v-else-if="item.name !== 'language' && item.name !== 'personal'" :content="item.name" effect="dark"
          placements="bottom">
          <component v-bind="item.attrs" :is="item.component" v-on="item.event" />
        </el-tooltip>

        <!-- 个人主页（工作台） -->
        <el-dropdown class="personal-dropdown" v-else trigger="click" size="default" type="primary"
          @command="item.event">
          <img :src="avatar" alt="">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(subitem, subindex) in item.options" :key="subindex" :command="subitem">
                {{ subitem }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import useGetters from '@/store/hooks/useGetters'
import Hamburger from '@/components/Hamburger/hamburger.vue'
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
import BreadCrumb from '@/components/breadcrumb/BreadCrumb.vue'
import { useStore } from 'vuex'
import { computed, inject } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/icons/SvgIcon.vue'
import { setLocaleI18n } from '@/utils/localStorage'
import { useRoute, useRouter } from 'vue-router'
import ScreenLock from '@/components/ScreenLock/ScreenLock.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

// 组件上 v-model 的实现
const props = defineProps(['showSettings'])
const emit = defineEmits(['update:showSettings'])
computed({
  get () {
    return props.showSettings
  },
  set (value) {
    emit('update:showSettings', value)
  }
})

const viewReload = inject('viewReload')

const settings = useGetters('settings',
  ['collapse', 'fixHeader', 'screenFull', 'screenLock', 'language', 'showBread', 'showReload']
)

const { avatar } = store.state.user

const screenFullIcon = computed(() => {
  return settings.screenFull.value === true ? 'disExpand' : 'expand'
})

const languageIcon = computed(() => {
  return settings.language.value === 'cn' ? 'chinese' : 'english'
})

const reload = () => {
  viewReload()
}

const clickScreenFull = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('your browser can not work!')
    return false
  }
  screenfull.toggle()
  store.dispatch('settings/setScreenFull').then(() => {
  })
}

const handlePersonal = async (val) => {
  if (val === '退出登录') {
    // 异步分发 action 清除路由和用户信息、token，若没用 await，
    // 在 token 没清除完之前路由就进行了跳转到 Login，所以会被重定向到 '/404'
    await store.dispatch('user/logout').then(res => {
      ElMessage.success('success')
    }).catch(() => {
      ElMessage.error('fail')
    })
    router.push({ path: '/Login?redirect=' + route.fullPath })
    console.log('/Login?redirect=' + route.fullPath)
  }
}

const handleI18n = (val) => {
  const map = {
    简中: 'cn',
    English: 'en'
  }
  setLocaleI18n(map[val])
  // 【 ! 缺陷 】 此时 vuex 中的 permission/routes 已经拿到了由 i18n 国际化解析出来后的路由名称 name，
  //             1】重新分发 actions 无法更新 name，此时拿到的 constantRoutes、asyncRoutes 都是已经是未更新的路由
  //             2】按照 分发action获取权限路由 -- 计算属性computed拿到routes进行渲染
  // 使用页面重载方式进行刷新 vuex
  location.reload()
  // store.dispatch('settings/setLanguage', map[val]).then(() => {
  //   store.dispatch('permission/setRoutes', store.state.user.roles)
  // })
}

const iconList = computed(() => [
  {
    icon: 'github',
    component: 'svg-icon',
    name: 'github',
    id: 'github',
    attrs: {
      // SvgIcon
      width: 18,
      height: 18,
      iconName: 'github',
      // ElSvgIcon
      name: ''
    },
    event: {
      click: () => window.open('https://github.com/Shulaolao/vue-element-admin-system')
    }
  }, {
    icon: languageIcon.value,
    name: 'language',
    id: 'language',
    locale: languageIcon.value,
    component: 'svg-icon',
    attrs: {
      width: 20,
      height: 20,
      iconName: languageIcon.value
    },
    options: [
      '简中',
      'English'
    ],
    event: handleI18n
  }, {
    icon: screenFullIcon.value,
    component: 'svg-icon',
    name: screenFullIcon.value,
    id: 'screenFull',
    attrs: {
      width: 18,
      height: 18,
      iconName: screenFullIcon.value
    },
    event: {
      click: () => {
        clickScreenFull()
      }
    }
  },
  // {
  //   icon: 'lock',
  //   component: 'svg-icon',
  //   name: 'lock',
  //   id: 'lock',
  //   attrs: {
  //     width: 18,
  //     height: 18,
  //     iconName: 'lock'
  //   },
  //   event: {
  //     keypress: (event) => {
  //       console.log(event)
  //     },
  //     click: () => {
  //     }
  //   }
  // },
  {
    name: 'personal',
    id: 'personal',
    options: [
      '个人设置',
      '退出登录'
    ],
    event: handlePersonal
  }, {
    icon: 'setting',
    component: 'svg-icon',
    name: 'setting',
    id: 'setting',
    attrs: {
      width: 18,
      height: 18,
      iconName: 'setting'
    },
    event: {
      click: () => {
        emit('update:showSettings', true)
      }
    }
  }
])
</script>

<style lang='scss' scoped>
header {
  border: 1px solid #f3f3f3;

  .hamburger {
    float: left;
  }

  .reload-container {
    display: flex;
    align-items: center;
    float: left;
    height: 50px;

    .reload-box {
      margin: auto 10px;
      height: 20px;
      cursor: pointer;

      .reload-icon {}
    }
  }

  .breadcrumb {}

  .nav-right {
    display: flex;
    align-items: center;
    float: right;
    height: 50px;
    margin-right: 10px;

    .nav-right-menu-item {
      margin: auto 15px;

      svg {
        outline: none;
      }

      .personal-dropdown {
        width: 42px;
        height: 42px;
        border-radius: 21px;
        transition: all .5s;

        &:hover {
          background: #e3e3e3;
        }

        img {
          width: 42px;
          height: 42px;
          border-radius: 21px;
        }
      }
    }
  }
}
</style>
