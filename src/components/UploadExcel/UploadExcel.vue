<template>
  <div class="uploadExcelCom-container">
    <input type="file" accept=".xlsx, .xls" ref="excelUploadInput" class="excel-upload-input" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drag the file here or
      <el-button :loading="loading" size="default" type="primary" @click="handleUpload">click to upload</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import * as XLSX from 'xlsx/xlsx.mjs'

const excelUploadInput = ref(null)
const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
const excelData = reactive({
  header: null,
  results: null
})

const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleClick = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
const handleDrop = (e) => {
  e.stopPropagation()
  e.preventDefault()
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('Only support uploading one file!')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.warning('Only support upload .xlsx, .xls, .csv files!')
    return false
  }
  upload(rawFile)
}
const handleDragover = (e) => {
  e.stopPropagation()
  e.preventDefault()
  // dataTransfer 用于所有可拖动事件的对象属性，可以获取多种数据
  // dropEffect 拖放操作类型
  e.dataTransfer.dropEffect = 'copy'
}
const upload = (rawFile) => {
  // 解决不能拖放同个文件
  excelUploadInput.value = null
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 判断文件大小是否符合
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // 浏览器自带文件阅读器API FileReader
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const header = getHeaderRow(worksheet)
      const results = XLSX.utils.sheet_to_json(worksheet)
      generateData({ header, results })
      loading.value = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
const getHeaderRow = (sheet) => {
  console.log(sheet)
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  // 多级表头处理不好，关键点：合并多个单元格
  const R = range.s.r
  // for (R = range.s.r; R <= range.e.r; ++R) {
  //   for (C = range.s.c; C <= range.e.c; ++C) {
  //     const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
  //     console.log(cell)
  //     let hdr = 'UNKNOWN ' + C
  //     // t 为单元格数据类型
  //     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
  //     headers.push(hdr)
  //   }
  // }
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    console.log(cell)
    let hdr = 'UNKNOWN ' + C
    // t 为单元格数据类型
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  // console.log(headers)
  return headers
}
const generateData = ({ header, results }) => {
  excelData.header = header
  excelData.results = results
  props.onSuccess && props.onSuccess(excelData)
}
const isExcel = (file) => {
  return /\.(xlsx|xls|csv)/.test(file.name)
}
</script>

<style lang='scss' scoped>
.excel-upload-input {
  display: none;
}

.drop {
  width: 600px;
  height: 160px;
  border: 1px dashed #bbb;
  line-height: 160px;
  text-align: center;
  border-radius: 10px;
  background: #f1f1f1;
  font-size: 18px;
}
</style>
