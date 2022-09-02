<template>
  <div class="cssCarousel-container">
    <CSSCarousel :imgList="imgList1" :number="imgLength1" slideMode="row" ref="css" />
    <CSSCarousel :imgList="imgList2" :number="imgLength2" slideMode="column" ref="css" />
  </div>
</template>

<script>
import CSSCarousel from '@/components/CarouselByCss/CSSCarouselCom.vue'

const imgContext1 = require.context('./CarouselImg1', false, /\.jpg$/)
const imgContext2 = require.context('./CarouselImg2', false, /\.jpg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}

const imgList1 = requireAll(imgContext1).map(item => {
  return {
    imgSrc: item
  }
})
const imgList2 = requireAll(imgContext2).map(img => {
  return {
    imgSrc: img
  }
})

export default {
  name: 'CssCarousel',
  components: {
    CSSCarousel
  },
  setup (props) {
    const imgLength1 = imgList1.length
    const imgLength2 = imgList2.length
    return {
      imgList1,
      imgLength1,
      imgList2,
      imgLength2
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
