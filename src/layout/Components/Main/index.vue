<template>
  <section :class="{ 'fixTop': settings.fixTop }">
    <router-view v-slot="{ Component }" :key="key">
      <Transition name="fade-transform" mode="out-in" appear>
        <KeepAlive>
          <component :is="Component" :key="key"></component>
        </KeepAlive>
      </Transition>
    </router-view>
    <Footer />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import useGetters from '@/store/hooks/useGetters'
import { useRoute } from 'vue-router'
import Footer from './footer.vue'

const route = useRoute()
const settings = useGetters('settings', ['fixTop'])
const key = computed(() => {
  return route.name
})
</script>

<style lang='scss' scoped>

section {
  &.fixTop {
    // top: $tagsViewHeight;
  }

  .el-scrollbar {
    width: 100%;
    height: 100%;
  }
}
</style>
