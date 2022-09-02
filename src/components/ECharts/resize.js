import { debounce } from '@/utils/utils'
import { ref } from 'vue'

/**
 *  在 onMounted 中使用
 * @param {String} id
 * @param {String && Ref} eChartRef
 * @param {Number} delay
**/
export default function (id, eChart, delay = 300) {
  const resizeObserver = ref(null)
  const listenToResize = () => {
    const width = ref(0)
    const height = ref(0)
    resizeObserver.value = new ResizeObserver(entries => {
      if (width.value !== entries[0].contentRect.width || height.value !== entries[0].contentRect.height) {
        debounce(() => {
          eChart.value.resize()
          width.value = entries[0].contentRect.width
        }, delay)()
      }
    })
    resizeObserver.value.observe(document.querySelector(`#${id}`))
  }
  return listenToResize
}
