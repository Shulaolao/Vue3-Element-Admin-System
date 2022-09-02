<template>
  <div class="uploadExcel-container">
    <UploadExcelCom :before-upload="beforeUpload" :on-success="handleSuccess"  />
    <el-table :data="tableData" border stripe max-height="500px">
      <el-table-column v-for="col in tableHeader"
        :prop="col"
        :key="col"
        :label="col">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import UploadExcelCom from '@/components/UploadExcel/UploadExcel.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const tableData = ref(null)
const tableHeader = ref(null)

const beforeUpload = (file) => {
  const isLt1M = file.size / 1024 / 1024 < 1

  if (isLt1M) {
    return true
  }

  ElMessage({
    message: 'Please do not upload files larger than 1m in size.',
    type: 'warning'
  })
  return false
}

const handleSuccess = ({ results, header }) => {
  tableData.value = results
  tableHeader.value = header
}
</script>

<style lang='scss' scoped>
.uploadExcel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  .el-table {
    margin: 20px 10px;
  }
}
</style>
