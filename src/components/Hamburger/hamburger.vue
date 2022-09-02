<template>
  <div class="hamburger-container" id="hamburger-container" @click="toggleCollapse">
    <svg t="1660185702188" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      p-id="4008" width="200" height="200" :class="{ 'isCollapse': !collapse }">
      <path
        d="M408 442h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8z m-8 204a8 8 0 0 0 8 8h480a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8H408a8 8 0 0 0-8 8v56z m504-486H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8z m0 632H120a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h784a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8zM142.4 642.1L298.7 519a8.8 8.8 0 0 0 0-13.9L142.4 381.9a8.9 8.9 0 0 0-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        p-id="4009"></path>
    </svg>
  </div>
</template>

<script setup>
import useActions from '@/store/hooks/useActions.js'
import useGetters from '@/store/hooks/useGetters.js'

const settingsActions = useActions('settings', ['setCollapse'])
const { setCollapse } = settingsActions

const settingsGetters = useGetters('settings', ['collapse'])
const { collapse } = settingsGetters

const toggleCollapse = () => {
  setCollapse(!collapse)
}
</script>

<style lang='scss' scoped>
.hamburger-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: background .8s;
  &:hover {
    background: #f3f3f3;
  }

  svg {
    width: 20px;
    height: 20px;

    &.isCollapse {
      transform: rotate(180deg);
    }
  }
}
</style>
