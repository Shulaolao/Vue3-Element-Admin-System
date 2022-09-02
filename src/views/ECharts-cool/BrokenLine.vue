<template>
  <div class="brokenline-conainer">
    <LineChart id="BrokenLine-chart" />
  </div>
</template>

<script setup>
import LineChart from '@/components/ECharts/LineChart.vue'

</script>

<style lang='scss' scoped>
.brokenline-conainer {
  padding: 20px;
  height: calc(100vh - 100px);
  margin-bottom: 20px;
}
</style>
