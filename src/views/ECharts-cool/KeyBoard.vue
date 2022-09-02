<template>
  <div class="keyboard-container">
    <KeyBoard id="KeyBoard-chart" />
  </div>
</template>

<script setup>
import KeyBoard from '@/components/ECharts/KeyBoard.vue'

</script>

<style lang='scss' scoped>
.keyboard-container {
  padding: 20px;
  height: calc(100vh - 100px);
  margin-bottom: 20px;
}
</style>
