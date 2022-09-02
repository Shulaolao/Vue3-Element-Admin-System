<template>
  <div :id="id" :style="{ 'width': width, 'height': height }"></div>
</template>

<script setup>
import { onMounted, shallowRef, toRefs } from 'vue'
import * as ECharts from 'echarts'
import initObserve from './resize'

const props = defineProps({
  id: {
    type: String,
    default: 'mixChart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
})
const { id, width, height } = toRefs(props)
const chartInstance = shallowRef(null)
onMounted(() => {
  initChart()
  initObserve(id.value, chartInstance, 100)()
})
const initChart = () => {
  chartInstance.value = ECharts.init(document.querySelector(`#${id.value}`), 'dark')
  setOption()
}
const setOption = () => {
  const xData = (function () {
    const data = []
    for (let i = 1; i < 13; i++) {
      data.push(i + 'month')
    }
    return data
  }())
  chartInstance.value.setOption({
    backgroundColor: '#344b58',
    title: {
      text: 'statistics',
      x: '20',
      top: '20',
      color: '#fff',
      fontSize: '22',
      subtextStyle: {
        color: '#90979c',
        fontSize: '16'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        color: '#fff'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      borderWidth: 0,
      top: 150,
      bottom: 95,
      color: '#fff'
    },
    legend: {
      x: '5%',
      top: '10%',
      color: '#90979c',
      data: ['female', 'male', 'average']
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#90979c'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitArea: {
        show: false
      },
      axisLabel: {
        interval: 0

      },
      data: xData
    }],
    yAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#90979c'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0
      },
      splitArea: {
        show: false
      }
    }],
    dataZoom: [{
      show: true,
      height: 30,
      xAxisIndex: [
        0
      ],
      bottom: 30,
      start: 10,
      end: 80,
      handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle: {
        color: '#d3dee5'
      },
      color: '#fff',
      borderColor: '#90979c'
    }, {
      type: 'inside',
      show: true,
      height: 15,
      start: 1,
      end: 35
    }],
    series: [{
      name: 'female',
      type: 'bar',
      stack: 'total',
      barMaxWidth: 35,
      barGap: '10%',
      itemStyle: {
        color: 'rgba(255,144,128,1)',
        label: {
          show: true,
          color: '#fff',
          position: 'insideTop',
          formatter (p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: [
        709,
        1917,
        2455,
        2610,
        1719,
        1433,
        1544,
        3285,
        5208,
        3372,
        2484,
        4078
      ]
    },

    {
      name: 'male',
      type: 'bar',
      stack: 'total',
      itemStyle: {
        color: 'rgba(0,191,183,1)',
        borderRadius: 0,
        label: {
          show: true,
          position: 'top',
          formatter (p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: [
        327,
        1776,
        507,
        1200,
        800,
        482,
        204,
        1390,
        1001,
        951,
        381,
        220
      ]
    }, {
      name: 'average',
      type: 'line',
      stack: 'total',
      symbolSize: 10,
      symbol: 'circle',
      itemStyle: {
        color: 'rgba(252,230,48,1)',
        barBorderRadius: 0,
        label: {
          show: true,
          position: 'top',
          formatter (p) {
            return p.value > 0 ? p.value : ''
          }
        }
      },
      data: [
        1036,
        3693,
        2962,
        3810,
        2519,
        1915,
        1748,
        4675,
        6209,
        4323,
        2865,
        4298
      ]
    }
    ]
  })
}
</script>

<style lang='scss' scoped>
</style>
