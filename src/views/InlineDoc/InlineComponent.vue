<template>
  <div class="inlineComponent-container">
    <iframe src="https://element-plus.org/zh-CN/" frameborder="0" loading="lazy"></iframe>
  </div>
</template>

<script>
export default {
  name: 'InlineComponent',
  setup () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.inlineComponent-container {
  height: 100%;
  width: 100%;
  iframe {
    width: 100%;
    height: 100vh;
  }
}
</style>
