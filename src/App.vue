<template>
  <!-- 通过控制router-view 的显示与隐藏，来重渲染路由区域，从而达到页面刷新的效果，show -> false -> show -->
  <router-view v-if="activeReload"/>
</template>

<script setup>
import { nextTick, provide, ref } from 'vue'

const activeReload = ref(true)

const reload = () => {
  activeReload.value = false
  nextTick(() => {
    activeReload.value = true
    console.log('reload')
  })
}
// 提供注入
provide('viewReload', reload)

</script>

<style lang="scss">

</style>
