<template>
  <div class="multiHeader-container">
    <div class="header-table">
      <div class="header-table-item">
        <span style="margin-right: 10px;">FileName:</span>
        <el-input placeholder="excel-list" v-model="fileName" size="default" clearable style="width: 200px;">
          <template #prefix>
            <SvgIcon icon-name="document" />
          </template>
        </el-input>
      </div>
      <div class="header-table-item">
        <span style="line-height: 32px; margin-right: 10px;">Col AutoWidth:</span>
        <el-radio-group v-model="autoWidth">
          <el-radio-button label="true">
          </el-radio-button>
          <el-radio-button label="false">
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="header-table-item">
        <span style="margin-right: 10px;">BookType:</span>
        <el-select v-model="bookType" value-key="name" clearable filterable>
          <el-option v-for="item in typeOptions" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class="header-table-item">
        <el-button type="primary" size="default" :loading="exportLoading" @click="exportExcel"> 导出Excel </el-button>
      </div>
    </div>
    <el-table :data="articleList" border stripe v-loading="loading" min-height="300px"
      :row-style="{ 'user-select': 'none' }" ref="table">
      <el-table-column align="center" prop="Id" label="Id" :min-width="40"></el-table-column>
      <el-table-column align="center" prop="Timestamp" label="Timestamp" :min-width="120"></el-table-column>
      <el-table-column align="center" label="Main Information">
        <el-table-column align="center" prop="Author" label="Author" :min-width="120"></el-table-column>
        <el-table-column align="center" prop="Reviewer" label="Reviewer" :min-width="100"></el-table-column>
        <el-table-column align="center" prop="Title" label="Title" :min-width="320"></el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="Display_time" label="Display_time" :min-width="160"></el-table-column>
      <el-table-column align="center" prop="Forecast" label="Forecast" :min-width="80"></el-table-column>
      <el-table-column align="center" prop="importance" label="Importance" :width="120">
        <template #default="scope">
          <SvgIcon v-for="n in scope.row.Importance" :key="n"
            :icon-name="n === 1 ? 'starG' : n === 2 ? 'starP' : 'starB'" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getArticle } from '@/api/article'
import { parseTime } from '@/utils/utils'
import { ref } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'

const articleList = ref([])
const loading = ref(true)

getArticle({ page: 1, limit: 20 }).then(res => {
  const { data } = res.data
  articleList.value = data.items
  loading.value = false
})

const fileName = ref('')
const autoWidth = ref(true)
const bookType = ref('xlsx')
const typeOptions = [
  {
    name: 'xlsx'
  },
  {
    name: 'csv'
  },
  {
    name: 'txt'
  }
]

const exportLoading = ref(false)
const exportExcel = () => {
  exportLoading.value = true
  import('@/vendor/Export2Excel.js').then(excel => {
    const multiHeader = [['Id', 'Timestamp', 'Main Information', '', '', 'Display_time', 'Forecast']]
    const header = ['', '', 'Author', 'Reviewer', 'Title', '', '']
    const filterVal = ['Id', 'Timestamp', 'Author', 'Reviewer', 'Title', 'Display_time', 'Forecast']
    const list = articleList.value
    const data = formatJson(filterVal, list)
    const merges = ['A1:A2', 'B1:B2', 'C1:E1', 'F1:F2', 'G1:G2']
    excel.exportJsonToExcel({
      multiHeader,
      header,
      data,
      fileName: fileName.value,
      merges,
      autoWidth: autoWidth.value,
      bookType: bookType.value
    })
    exportLoading.value = false
  })
}
const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => {
    if (j === 'timestamp') {
      return parseTime(v[j])
    } else {
      return v[j]
    }
  }))
}
</script>

<style lang='scss' scoped>
.multiHeader-container {
  padding: 20px;

  .header-table {
    display: flex;
    margin-bottom: 10px;
    background: #fff;

    .header-table-item {
      display: inline-block;
      margin: 20px;
      height: 36px;
    }
  }
}
</style>
