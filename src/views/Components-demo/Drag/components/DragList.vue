<template>
  <div class="dragList-container">
    <TodoList :unDoneList="unDoneList" :doneList="doneList" />
  </div>
</template>

<script setup>
import { getArticle } from '@/api/article'
import { defineComponent, ref } from 'vue'
import TodoList from '@/components/TodoList/TodoList'

const unDoneList = ref([])
const doneList = ref([])

getArticle({ limit: 20, page: 1 }).then(res => {
  const { data } = res.data
  unDoneList.value = data.items.slice(0, 10)
  doneList.value = data.items.slice(10, 20)
})

defineComponent('DragList')

</script>

<style lang='scss' scoped>
.dragList-container {
  background: #fff;
}
</style>
