<template>
  <div class="scrollToTop-container" :visibilityHeight="400">
    <el-image v-for="(img, index) in imgList" :key="index" :src="img" fit="fill"></el-image>
    <el-image v-for="(img, index) in imgList" :key="index" :src="img" fit="fill"></el-image>
    <el-image v-for="(img, index) in imgList" :key="index" :src="img" fit="fill"></el-image>
    <BackToTop />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import BackToTop from '@/components/BackToTop/BackToTop.vue'

const imgContext = require.context('./CarouselImg1', false, /\.jpg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}

const imgList = requireAll(imgContext)

defineComponent('scrollToTop')
</script>

<style lang='scss' scoped>
.scrollToTop-container {
  width: 40vw;
  overflow: scroll;
  .el-image {
    margin: 40px;
  }
}
</style>
