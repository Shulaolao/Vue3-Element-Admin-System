<template>
  <div class="sideBar-container">
    <Logo :class="{'fixLogo': fixLogo}" v-show="showLogo" class="logo-com" />
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        :background-color="variables.menuBgColor"
        :text-color="variables.textColor"
        :active-color="variables.activeColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        id="sideBar-menu"
      >
        <SideBarItem v-for="route in routes" :key="route.name" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.module.scss'
import Logo from './LogoCom.vue'
import useState from '@/store/hooks/useState.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SideBarItem from './SideBarItem.vue'
export default {
  name: 'SideBar',
  components: {
    Logo,
    SideBarItem
  },
  setup () {
    const settingsState = useState('settings', ['showLogo', 'collapse', 'fixLogo'])
    const permissionState = useState('permission', ['routes'])

    const route = useRoute()

    const activeMenu = computed(() => {
      return route.path
    })

    return {
      variables,
      ...settingsState,
      ...permissionState,
      activeMenu
    }
  }
}
</script>

<style lang='scss' scoped>
.fixLogo {
  position: fixed;
}
.el-scrollbar {
  .el-menu {
    border: none;
  }
}
</style>
