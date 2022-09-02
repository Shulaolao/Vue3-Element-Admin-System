<template>
  <div class="todoList-container">
    <el-divider direction="horizontal" content-position="left">
      <el-header height="40px" style="font-size: 18px;">
        Draggable To Do List
      </el-header>
    </el-divider>
    <el-row :gutter="20">
      <el-col :span="10" :offset="1">
        <div class="add-todo-item">
          <el-input v-model="newTodo" placeholder="" size="default" clearable>
            <template #prefix>
              <el-tooltip content="Add New Todo" placement="top" effect="dark">
                <SvgIcon icon-name="plus" @click="handleAdd(newTodo)" />
              </el-tooltip>
            </template>
          </el-input>
        </div>
        <VueDraggableNext :list="unDoneList" animation="200" item-key="Id" touchStartThreshold="40" @end="onUnDone"
          :forceFallback="true" ghost-class="ghost-undone" drag-class="drag-unDone" chosen-class="chosen-unDone"
          group="todoList">
          <transition-group>
            <div v-for="(item, index) in unDoneList" :key="item.Id" class="undone-list-item">
              <SvgIcon icon-name="circle" class="icon-circle" />
              <span>{{ item.Title }}</span>
              <div class="icon-delete" @click="handleDelete('undone', index)">
                <SvgIcon icon-name="delete" />
              </div>
            </div>
          </transition-group>
        </VueDraggableNext>
      </el-col>
      <el-col :span="10" :offset="1">
        <div>
          <div class="icon-clear-container" @click="handleClear">
            <el-tooltip content="Clear All" placement="top" effect="dark">
              <SvgIcon icon-name="clear" :width="20" :height="20" />
            </el-tooltip>
          </div>
        </div>
        <VueDraggableNext :list="doneList" animation="200" item-key="Id" touchStartThreshold="40" @end="onDone"
          ghost-class="ghost-done" :forceFallback="true" drag-class="drag-done" chosen-class="chosen-done"
          group="todoList">
          <transition-group>
            <div v-for="(item, index) in doneList" :key="item.Id" class="done-list-item">
              <SvgIcon icon-name="right" class="icon-right" />
              <span>{{ item.Title }}</span>
              <div class="icon-delete" @click="handleDelete('done', index)">
                <SvgIcon icon-name="delete" />
              </div>
            </div>
          </transition-group>
        </VueDraggableNext>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineComponent, ref, toRefs } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import SvgIcon from '@/icons/SvgIcon.vue'

const props = defineProps({
  doneList: {
    type: Array,
    default: () => []
  },
  unDoneList: {
    type: Array,
    default: () => []
  }
})

const { doneList, unDoneList } = toRefs(props)

const newTodo = ref(null)

const handleAdd = val => {
  if (!val) return
  unDoneList.value.splice(0, 0, { Id: new Date(), Title: val })
  newTodo.value = null
}

const onUnDone = (evt) => {
  const newIndex = evt.newDraggableIndex
  const oldIndex = evt.oldDraggableIndex
  const tempIndex = unDoneList.value.splice(oldIndex, 1)[0]
  unDoneList.value.splice(newIndex, 0, tempIndex)
}
const onDone = (evt) => {
  const newIndex = evt.newDraggableIndex
  const oldIndex = evt.oldDraggableIndex
  const tempIndex = doneList.value.splice(oldIndex, 1)[0]
  doneList.value.splice(newIndex, 0, tempIndex)
}

const handleDelete = (group, index) => {
  if (group === 'undone') {
    unDoneList.value.splice(index, 1)
  } else {
    doneList.value.splice(index, 1)
  }
}

const handleClear = () => {
  doneList.value.splice(0, doneList.value.length)
}

defineComponent('TodoList')

</script>

<style lang='scss' scoped>
.todoList-container {
  padding: 20px;

  .el-col {
    padding: 10px;
    border: 1px solid #d3d3d3;

    .icon-clear-container {
      margin: 0 10px;
      padding: 5px 10px;
      border: 1px solid #d3d3d3;
      border-radius: 5px;
    }
  }

  .undone-list-item,
  .done-list-item {
    position: relative;
    height: 40px;
    line-height: 40px;
    border: 1px solid #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px;
    user-select: none;
    transition: all .5s cubic-bezier(0.5, 1, 0.89, 1);
    border-radius: 10px;

    .icon-circle,
    .icon-right,
    .icon-delete {
      margin: auto 10px;
    }

    .icon-delete {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 40px;
    }
  }

  .done-list-item {
    color: #999;
    text-decoration-line: line-through;
    text-decoration-color: #888;
  }

  .ghost-undone {
    background: lightseagreen;
  }

  .ghost-done {}

  .drag-unDone {
    // background: lightseagreen;
  }

  .drag-done {}

  .chosen-unDone {
    &:active {
      background: lightseagreen;
    }
  }

  .chosen-done {}

  .done-list-item {}

  .list-item-id {
    margin: 0 10px;
  }
}
</style>
