<template>
  <Transition name="fade">
    <div class="back-to-top" v-show="visible"  @click="scrollToTop">
      <SvgIcon icon-name="scroll" :width="30" :height="30" />
    </div>
  </Transition>
</template>

<script setup>
import SvgIcon from '@/icons/SvgIcon.vue'
import { onBeforeUnmount, onMounted, ref, toRefs } from 'vue'

const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 400
  }
})
const { visibilityHeight } = toRefs(props)

const visible = ref(false)
const isMoving = ref(false)
const interval = ref(null)
const scrollTop = ref(0)

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
const handleScroll = () => {
  scrollTop.value = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop
  visible.value = scrollTop.value > visibilityHeight.value
}
const easeInOutQuad = (step, start, s, d) => {
  if ((step /= d / 2) < 1) return (s / 2) * Math.pow(step, 2) + start
  return (-s / 2) * ((step - 1) * (step - 2) - 1) + start
}
const scrollToTop = () => {
  if (isMoving.value) return
  isMoving.value = true
  let i = 0
  interval.value = setInterval(() => {
    const next = Math.floor(easeInOutQuad(10 * i, scrollTop.value, -scrollTop.value, 500))
    if (next <= 50) {
      document.body.scrollTo({ top: 50, behavior: 'auto' })
      clearInterval(interval.value)
      isMoving.value = false
    } else {
      document.body.scrollTo({ top: next, behavior: 'auto' })
    }
    i++
  }, 16.7)
}
</script>

<style lang='scss' scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 80px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  transition: all 1s;
}
</style>
