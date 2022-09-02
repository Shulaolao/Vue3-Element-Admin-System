<template>
  <div class="changeRoles-container">
    <el-switch v-model="identify" active-value="super" inactive-value="common" :active-text="'super admin'"
      :inactive-text="'common admin'" size="large">
    </el-switch>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const identify = computed({
  get () {
    return store.state.user.roles[0].slice(0, 5)
  },
  set (val) {
    store.dispatch('user/changeRoles', val)
  }
})
</script>

<style lang='scss' scoped>
.changeRoles-container {
}
</style>
