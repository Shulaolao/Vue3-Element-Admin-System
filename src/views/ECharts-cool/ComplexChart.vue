<template>
  <div class="complexChart-container">
    <MixChart id="mixChart" />
  </div>
</template>

<script setup>
import MixChart from '@/components/ECharts/MixChart.vue'

</script>

<style lang='scss' scoped>
.complexChart-container {
  padding: 10px;
  height: calc(100vh - 100px);
  margin-bottom: 20px;
}
</style>
