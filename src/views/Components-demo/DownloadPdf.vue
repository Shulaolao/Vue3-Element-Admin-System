<template>
  <div>
    <router-link target="_blank" to="/DownloadPdf/pdf">
      <el-button type="primary" size="default">
        Click to download PDF
      </el-button>
    </router-link>
    <div class="html2pdf">
      <el-input v-model="url" placeholder="输入外链" size="default" clearable @keydown="handlePDF"></el-input>
      <router-link target="_blank" :to="`/DownloadPdf/pdf?url=${completeUrl}`">
        <el-button type="primary" size="default">转pdf</el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const url = ref('')

const completeUrl = computed(() => {
  return url.value.includes('http') ? url.value : 'https://' + url.value
})

const handlePDF = (e) => {
  if (e.code === 'Enter') {
    new Promise(resolve => {
      // const newW = window.open(url.value, '_self')
      // resolve(newW)
      resolve()
    }).then(newW => {
      setTimeout(() => {
        console.log(newW)
        // window.print()
      }, 2000)
    })
  }
}

</script>

<style lang='scss' scoped>
.html2pdf {
  display: flex;
  height: 100%;
  width: 400px;
  margin-top: 20px;
  .el-input {
    margin: 0 10px;
  }
}
</style>
