<template>
  <svg :class="svgClass" aria-hidden="true"
    :style="{ 'width': width + 'px', 'height': height + 'px', 'color': color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 16
  },
  height: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: ''
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
</script>

<style scoped>
.svg-icon {
  width: 15px;
  height: 15px;
  outline: none;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
