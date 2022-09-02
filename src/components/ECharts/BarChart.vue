<template>
  <div :id="id" ref="chartInstance" :style="{ 'width': width, 'height': height }"></div>
</template>

<script setup>
import { debounce } from '@/utils/utils'
import * as ECharts from 'echarts'
import initObserve from '@/components/ECharts/resize'
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, toRefs, watch } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'eChart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '350px'
  },
  xData: {
    type: Array,
    required: true
  },
  yData: {
    type: Array,
    required: true
  },
  xAxis: {
    type: String,
    default: 'x'
  },
  yAxis: {
    type: String,
    default: 'y'
  },
  yMax: {
    type: Number,
    default: 1000
  }
})

const { width, height, id, xData, yData } = toRefs(props)

const eChart = shallowRef(null)
const chartInstance = ref(null)

const eChartWidth = ref(0)

const resizeObserver = new ResizeObserver(entries => {
  if (eChartWidth.value !== entries[0].contentRect.width) {
    debounce(() => {
      eChart.value.resize()
    }, 300)()
    eChartWidth.value = entries[0].contentRect.width
  }
})

watch([xData, yData], (val) => {
  setOption(toRefs(props))
})

onMounted(() => {
  nextTick(() => {
    initChart()
    initObserve(id.value, eChart, 300)()
  })
})

const initChart = () => {
  eChart.value = ECharts.init(document.querySelector(`#${id.value}`), 'dark')
  setOption(toRefs(props))
}

const setOption = ({ xData, yData, xAxis, yAxis, yMax } = {}) => {
  const options = reactive({
    // backgroundColor: '#fff',
    tooltip: {
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff'
        },
        label: {
          show: true
        }
      }
    },
    toolbox: {
      right: '60px',
      feature: {
        dataView: {
          show: true
        },
        magicType: {
          show: true,
          type: ['line', 'bar']
        },
        dataZoom: {
          show: true
        },
        restore: {
          show: true
        }
      }
    },
    // legend: {},
    xAxis: [
      {
        type: 'category',
        name: xAxis.value,
        data: xData.value
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: yAxis.value,
        min: 0,
        max: yMax.value,
        axisLabel: {
          formatter: '{value} /人次'
        }
      }
    ],
    series: [
      {
        name: xAxis.value,
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + '/人次'
          }
        },
        data: yData.value,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ],
          label: {
            color: '#fff'
          }
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      }
    ],
    aria: {
      enabled: true,
      decal: {
        show: true
      }
    }
  })
  eChart.value.setOption(options)
}

// 切换路由前卸载
onBeforeUnmount(() => {
  unMountChart()
  destroyListener()
})

// 卸载 eChart
const unMountChart = () => {
  if (!eChart.value) {
    return
  }
  eChart.value.dispose()
  eChart.value = null
}

const destroyListener = () => {
  resizeObserver.unobserve(document.querySelector(`#${id.value}`))
}

</script>

<style lang='scss' scoped>
div {
  transition: width 2s;
  margin: 20px 10px;
}
</style>
