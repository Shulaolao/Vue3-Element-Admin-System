<template>
  <div class="baseTable-container">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px" :inline="false" size="default">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>
      <el-form-item label="爱好">
        <el-select v-model="form.hobby" value-key="" placeholder="" clearable filterable>
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio v-for="item in radioItems" :key="item.label" :label="item.label">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input class="input-textarea" v-model="form.remarks" placeholder="" type="textarea" size="default" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!-- <el-upload action="" ref="upload" :on-remove="" :auto-upload="false" multiple :limit="5" :on-exceed=""
          :file-list="">
          <el-button slot="trigger" size="small" type="primary">select file</el-button> -->
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="">upload to server</el-button> -->
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
        <!-- </el-upload> -->
      </el-form-item>
      <el-form-item label="创建时间">
        <el-time-picker v-model="form.createTime" size="default" arrow-control :picker-options="{
          selectableRange: '18:30:00 - 20:30:00'
        }" placeholder="任意时间点">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="喜欢的天气">
        <el-checkbox v-model="form.weatherLike" label="" :indeterminate="false">{{}}</el-checkbox>
      </el-form-item>
      <el-form-item label="生日" size="default">
        <el-calendar v-model="form.birthday" :first-day-of-week="1"></el-calendar>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader :options="cityList" v-model="form.location" size="large" separator=">" :debounce="600" clearable
          filterable :show-all-levels="true" :props="{ expandTrigger: 'hover', checkStrictly: false }"
          @change="handleLocation">
          <template #empty>
            <div>None city or province you search!</div>
          </template>
        </el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getAllCity } from '@/api/user'
import { reactive, ref } from 'vue'

const form = reactive({
  name: null,
  hobby: null,
  gender: '',
  remarks: '',
  avatar: null,
  createTime: new Date(),
  weatherLike: null,
  birthday: new Date(),
  location: ''
})

const valAccount = (rule, value, callback) => {
  console.log(rule, value, callback)
  callback()
}
const valPassword = (rule, value, callback) => {
  callback()
}
const formRules = reactive({
  account: [
    { validator: valAccount, required: true, trigger: 'blur' }
  ],
  password: [
    { validator: valPassword, required: true, trigger: 'blur' }
  ]
})

const selectOptions = ref([])
const radioItems = ref([
  {
    label: 'male'
  }, {
    label: 'female'
  }])

const handleSubmit = () => { }

const cityList = ref([])

const handleLocation = () => { }

getAllCity().then(res => {
  const { data } = res.data
  cityList.value = formatCascader(data)
  setTimeout(() => {
  }, 2000)
})

const formatCascader = (list) => {
  list = list.map(item => {
    if (item.pchilds) {
      item.pchilds = item.pchilds.map(subitem => {
        if (subitem.cchilds) {
          subitem.cchilds = subitem.cchilds.map(granditem => {
            return { value: granditem.name, label: granditem.name }
          })
        }
        return { value: subitem.name, label: subitem.name, children: subitem.cchilds || [] }
      })
    }
    return { value: item.name, label: item.name, children: item.pchilds || [] }
  })
  return list
}
</script>

<style lang='scss' scoped>
.baseTable-container {
  padding: 20px;

  .el-form {
    padding: 10px;

    .el-form-item:deep(.el-input) {
      width: 240px;
    }

    .el-form-item:deep(.el-textarea) {
      width: 360px;
    }
  }
}
</style>
