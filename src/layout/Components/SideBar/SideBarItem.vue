<template>
  <div v-if="!item?.hidden" class="sideBar-item-container">
    <template v-if="hasOneShowingChild(item?.children, item)">
      <app-link v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild?.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <IconItem :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template v-if="onlyOneChild?.meta" #title>
            <span class="onlyOneChild-title" style="font-weight: 600">{{ onlyOneChild.meta?.title }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template v-slot:title>
        <IconItem v-if="item.meta" :icon="item.meta && item.meta.icon" />
        <span class="parent-title" v-if="item?.meta">{{ item.meta?.title }}</span>
      </template>
      <!-- 递归组件 -->
      <SideBarItem v-for="child in item.children" :key="child.name" :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu>
  </div>
</template>

<script setup>
import IconItem from './IconItem.vue'
import AppLink from './AppLink.vue'
import { isExternal } from '@/utils/validate.js'
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ''
  }
})
const onlyOneChild = ref(null)
const hasOneShowingChild = (children = [], parent) => {
  // console.log('children', children)
  const showingChildren = children.filter(item => {
    if (item?.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      // console.log('item: ', item)
      return true
    }
  })
  // console.log('showingChildren', showingChildren)
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    // console.log('onlyOneChild: ', onlyOneChild.value)
    return true
  }
  return false
}

const path = require('path')
const resolvePath = (routePath) => {
  // 判断是否为外部链接
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

</script>

<style lang='scss' scoped>
.sideBar-item-container {
  padding: 0;

  .onlyOneChild-title,
  .parent-title {
    position: absolute;
    font-weight: 600;
    margin-left: 45px;
    transition: width 1s;
  }
}
</style>
