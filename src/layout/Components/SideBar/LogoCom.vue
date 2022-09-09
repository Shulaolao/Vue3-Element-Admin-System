<template>
  <div class="Logo-container" :class="{ 'collapse': collapse }">
    <Transition name="sideBarLogoFade">
      <router-link class="sideBar-logo-link" v-if="!collapse" :key="new Date()" to="/WorkTable"  @click="handleReload">
        <img :src="LogoImg" alt="" id="logo-container">
        <span>{{ title }}</span>
      </router-link>
      <router-link class="sideBar-logo-link" v-else key="expand" to="/DashBoard/WorkTable">
        <img :src="LogoImg" alt="">
      </router-link>
    </Transition>
  </div>
</template>

<script>
import LogoImg from '@/assets/images/Small tree.jpg'
import useGetters from '@/store/hooks/useGetters'
import { debounce } from '@/utils/utils'
import { inject } from 'vue'

export default {
  setup () {
    const settingsGetters = useGetters('settings', ['collapse'])
    const systemInfo = {
      title: 'ShuLao Admin',
      LogoImg
    }
    const handleReload = debounce(inject('viewReload'), 600)
    return {
      ...settingsGetters,
      ...systemInfo,
      handleReload
    }
  }
}
</script>

<style lang='scss' scoped>
.sideBarLogoFade-enter-active {
  transition: $collapse;
}

.sideBarLogoFade-enter-from,
.sideBarLogoFade-leave-to {
  opacity: 0;
}

.Logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  background: $logoBg;

  &.collapse {
    .sideBar-logo-link {
      img {
        margin-left: 0;
      }
    }
  }

  .sideBar-logo-link {
    height: 100%;
    width: 100%;

    img {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-left: 10px;
      vertical-align: middle;
    }

    span {
      display: inline-block;
      height: 50px;
      margin-left: 10px;
      line-height: 50px;
      font-size: 18px;
      color: white;
      font-weight: 600;
      vertical-align: middle;
    }
  }
}
</style>
