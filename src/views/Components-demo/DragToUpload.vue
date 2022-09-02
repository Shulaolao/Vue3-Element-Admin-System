<template>
  <div>
    <el-header style="padding: 20px; font-size: 20px;">
    基于 <a href="https://github.com/dai-siki/vue-image-crop-upload" style="color: lightseagreen;" target="_blank">vue-image-crop-upload</a> 组件
  </el-header>
  <div>
    <el-button type="primary" size="default" @click="toggleShow">上传图片</el-button>
    <el-image :src="imageUrl" fit="fill" :lazy="true">
      <template #error>
        <img :src="avatar" alt="">
      </template>
    </el-image>
    <div id="imageCrap">
      <a class="btn" @click="toggleShow"></a>
      <my-upload field="img" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail" v-model="show" :width="200" :height="200" :url="url" :params="params"
        :headers="headers" img-format="jpg/png" :withCredentials="true">
        <img :src="imageUrl" alt="">
      </my-upload>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import myUpload from 'vue-image-crop-upload'
import avatar from '@/assets/images/Big tree.jpg'

const url = ref('https://httpbin.org/post')

const show = ref(false)

const headers = ref({})
const params = ref({})
const imageUrl = ref('')
const toggleShow = () => {
  show.value = !show.value
}

const cropSuccess = (imgUrl, field) => {
  imageUrl.value = imgUrl
  console.log('imgUrl:', imgUrl)
}
const cropUploadSuccess = (jsonData, field) => {
  console.log('upload success:', jsonData)
}
const cropUploadFail = (status, field) => {
  console.log('fail:', status)
}

</script>

<style lang='scss' scoped>
.el-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
