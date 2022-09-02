<template>
  <div ref="footer" class="footer-container">{{ $t('main.footer') }}</div>
</template>

<script setup>
import { useScroll } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const footer = ref(null)

const el = ref(null)

const showFooter = ref(false)

const { x, y, isScrolling } = useScroll(el.value)
// const { left, right, top, bottom } = toRefs(arrivedState)
// console.log(x, y, isScrolling, arrivedState, left, right, top, bottom)

watch([x, y, isScrolling], (x, y, isScrolling) => {
  console.log(x, y, isScrolling)
})

const bottom = computed(() => {
  return (el.value.scrollTop + el.value.clientHeight > el.value.scrollHeight)
})

if (el.value) {
  watch(bottom, (val) => {
    console.log(val)
    if (val) {
      showFooter.value = true
    } else {
      showFooter.value = false
    }
  })
}

onMounted(() => {
  el.value = document.querySelector('.footer-container').previousElementSibling
  console.log()
})

onUnmounted(() => {
})
</script>

<style lang='scss' scoped>
.footer-container {
  width: 100%;
  height: 20px;
  margin-top: 10px;
  line-height: 20px;
  user-select: none;
  color: #78dec7;
  font-size: 16px;
  text-align: center;
  transition: all .5s;
}
</style>
