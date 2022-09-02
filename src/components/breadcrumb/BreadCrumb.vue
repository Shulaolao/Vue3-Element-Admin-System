<template>
  <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
    <TransitionGroup appear name="breadcrumb" mode="out-in">
      <el-breadcrumb-item key="WorkTable" :to="{ path: '/DashBoard/WorkTable', name: 'WorkTable' }">{{$t('routes.WorkTable')}}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadList" :key="item">{{ item }}</el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const breadList = computed(() => {
  // 利用 route 的 matched 属性拿到每个路由组的所有 children
  const list = route.matched.map(item => {
    return item.meta.title
  })
  return list.includes(t('routes.WorkTable')) ? [] : list
})
</script>

<style lang='scss' scoped>
.breadcrumb-container {
  display: inline-block;
  height: 50px;
  margin-left: 10px;
  line-height: 50px;
}
</style>
