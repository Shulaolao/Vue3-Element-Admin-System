<template>
  <div class="dragForm-container">
    <el-table :data="articleList" border stripe v-loading="loading" max-height="400px" min-height="300px"
      :row-style="{ 'user-select': 'none', 'cursor': 'move' }" ref="table">
      <el-table-column v-for="col in tableColumns" :prop="col.name" :key="col.name" :label="col.name"
        :width="col?.width" :min-width="col?.minWidth">
      </el-table-column>
      <el-table-column prop="importance" label="Importance" :width="120">
        <template #default="scope">
          <SvgIcon v-for="n in scope.row.Importance" :key="n"
            :icon-name="n === 1 ? 'starG' : n === 2 ? 'starP' : 'starB'" />
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="10" :offset="1">
        <el-divider direction="horizontal" content-position="left">
          <span class="card-header">Old Order</span>
        </el-divider>
        <el-card v-for="id in oldList" :key="id" shadow="hover"
          :body-style="{ padding: '5px', textAlign: 'center', transition: 'all .2s' }">
          <div>{{ id }}</div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-divider direction="horizontal" content-position="left">
          <span class="card-header">New Order</span>
        </el-divider>
        <el-card v-for="id in newList" :key="id" shadow="hover"
          :body-style="{ padding: '5px', textAlign: 'center', transition: 'all .2s' }">
          <div>{{ id }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getArticle } from '@/api/article'
import { onMounted, ref } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'
import Sortable from 'sortablejs'

const table = ref(null)

const articleList = ref([])
const tableColumns = ref([
  {
    name: 'Id',
    width: 40
  },
  {
    name: 'Timestamp',
    width: 160
  },
  {
    name: 'Author',
    width: 120
  },
  {
    name: 'Reviewer',
    width: 100
  },
  {
    name: 'Title',
    minWidth: 320
  },
  {
    name: 'Display_time',
    width: 160
  },
  {
    name: 'Forecast',
    width: 80
  }
])

const loading = ref(true)

const oldList = ref([])
const newList = ref([])

getArticle({ page: 1, limit: 20 }).then(res => {
  const { data } = res.data
  articleList.value = data.items
  loading.value = false
  oldList.value = data.items.map(item => {
    return item.Id
  })
  newList.value = data.items.map(item => {
    return item.Id
  })
})

onMounted(() => {
  Sortable.create(table.value.$el.querySelectorAll('.el-table__body>tbody')[0], {
    animation: 200,
    touchStartThreshold: 10,
    easing: 'cubic-bezier(0.5, 1, 0.89, 1)',
    onEnd: evt => {
      const newIndex = evt.newDraggableIndex
      const oldIndex = evt.oldDraggableIndex
      const tempIndex = newList.value.splice(oldIndex, 1)[0]
      newList.value.splice(newIndex, 0, tempIndex)
    }
  })
})

</script>

<style lang='scss' scoped>
.dragForm-container {
  height: 100%;
  padding: 10px;

  .el-row {
    margin: 20px 10px;

    .el-col {
      padding: 0px 20px;
      background: #fff;

      .card-header {
        font-size: 18px;
      }
    }
  }
}
</style>
