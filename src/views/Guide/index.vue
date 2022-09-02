<template>
  <div class="guide-container">
    <el-button type="primary" size="default" @click.stop.prevent="start" @keydown.space.prevent.stop="nexGuide">
      Start By Mouse!
    </el-button>
    <el-button type="primary" size="default" @click.stop.prevent="autoplay">Start Automatic!</el-button>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { ref } from 'vue'
import steps from './steps.js'

const driver = new Driver({
  animate: true,
  opacity: 0.75,
  allowClose: true,
  overlayClickNext: false,
  doneBtnText: 'Done',
  closeBtnText: 'Close',
  nextBtnText: 'Next',
  prevBtnText: 'Previous',
  showButtons: true,
  // 中途取消
  onDeselected: (Element) => interrupt
})

// 导航中断处理
const interrupt = () => {
  driver.reset()
}

// 正在导航否，解决到了最后一个 step 时使用空格还可以导航的 bug
const isGuiding = ref(false)

// 自动导航
const autoplay = function (e) {
  e.target.disabled = true
  start(e)
  let timer = null
  if (driver.hasNextStep() && isGuiding.value !== true) {
    isGuiding.value = true
    timer = setInterval(() => {
      driver.moveNext()
      isGuiding.value = false
      if (timer && isGuiding.value === false && !driver.hasNextStep()) {
        clearInterval(timer)
        // 在最后一个 step 显示2s后 reset 清屏
        const timeOut = setTimeout(() => {
          driver.reset()
          e.target.blur()
          e.target.disabled = false
          clearTimeout(timeOut)
        }, 2000)
      }
    }, 2000)
  }
}

// 键盘空格进行导航
const nexGuide = (e) => {
  if (isGuiding.value === false && driver.hasNextStep()) {
    driver.moveNext()
  } else if (!driver.hasNextStep()) {
    isGuiding.value = false
    // reset 清屏之后会有 step，即 hasNextStep() 为 true
    driver.reset()
    e.target.blur()
  }
}

const start = (e) => {
  driver.defineSteps(steps)
  driver.start()
}

</script>

<style lang='scss'>
.guide-container {
  padding: 20px;
}

#driver-highlighted-element-stage {
  border: 1px solid #fff !important;
}
</style>
