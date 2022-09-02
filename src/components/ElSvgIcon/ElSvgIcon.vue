<template>
  <el-icon :size="size" :color="color" aria-hidden="true">
    <component :is="ElSvg[name]" />
  </el-icon>
</template>

<script setup>
import { firstLetterUpper } from '@/utils/utils.js'
import * as ElSvg from '@element-plus/icons-vue'
const props = defineProps({
  name: {
    type: String,
    require: true
  },
  size: {
    type: Number,
    default: 15
  },
  color: {
    type: String,
    default: 'black'
  }
})
const name = firstLetterUpper(props.name)
</script>

<style lang='scss' scoped>
</style>
